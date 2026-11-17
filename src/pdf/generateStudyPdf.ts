import PDFDocument from 'pdfkit';
import fs from 'node:fs';
import {
  CHAPTERS,
  COURSE_META,
  KISAMUZ_TABLE,
  SI_PREFIXES,
  TRIG_VALUES,
} from '../data/physicsNotes.ts';

const FONT_REGULAR = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf';
const FONT_BOLD = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';
const FONT_MONO = '/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf';

export async function buildStudyPdfBuffer(): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: 'A4',
      margins: { top: 44, bottom: 48, left: 42, right: 42 },
      bufferPages: true,
      info: {
        Title: 'NKU Corlu MYO - Elektronik Teknolojisi Fizik I Vize Ders Notu',
        Author: 'NKU Corlu MYO Fizik I Calisma Rehberi',
        Subject: 'Olcu, Vektorler, Ortalama Hiz ve Surat, Anlik Hiz, Serbest Dusme',
      },
    });

    const chunks: Buffer[] = [];
    doc.on('data', (chunk: Buffer) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', (err) => reject(err));

    const hasDejaVu = fs.existsSync(FONT_REGULAR) && fs.existsSync(FONT_BOLD);
    if (hasDejaVu) {
      doc.registerFont('Sans', FONT_REGULAR);
      doc.registerFont('Sans-Bold', FONT_BOLD);
      doc.registerFont('Mono', fs.existsSync(FONT_MONO) ? FONT_MONO : FONT_REGULAR);
    }

    const fontRegular = hasDejaVu ? 'Sans' : 'Helvetica';
    const fontBold = hasDejaVu ? 'Sans-Bold' : 'Helvetica-Bold';
    const fontMono = hasDejaVu ? 'Mono' : 'Courier';

    const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
    const leftX = doc.page.margins.left;
    const bottomLimit = doc.page.height - doc.page.margins.bottom;

    const ensureSpace = (neededHeight: number) => {
      if (doc.y + neededHeight > bottomLimit) {
        doc.addPage();
      }
    };

    const drawSectionHeader = (num: string, title: string, subtitle: string) => {
      ensureSpace(64);
      doc.moveDown(0.3);
      const startY = doc.y;
      doc
        .rect(leftX, startY, pageWidth, 34)
        .fillAndStroke('#F1F5F9', '#CBD5E1');

      doc
        .font(fontBold)
        .fontSize(12)
        .fillColor('#0284C7')
        .text(`${num}.`, leftX + 10, startY + 9, { continued: true })
        .fillColor('#0F172A')
        .text(` ${title}`, { width: pageWidth - 20 });

      doc.y = startY + 40;
      doc
        .font(fontRegular)
        .fontSize(9)
        .fillColor('#475569')
        .text(subtitle, leftX, doc.y, { width: pageWidth });
      doc.moveDown(0.5);
    };

    // Cover / Title Header on Page 1
    doc.rect(leftX, doc.y, pageWidth, 74).fill('#0F172A');
    const headerTop = doc.y;
    doc
      .font(fontBold)
      .fontSize(9)
      .fillColor('#38BDF8')
      .text(
        `${COURSE_META.university} · ${COURSE_META.school} · ${COURSE_META.department}`,
        leftX + 14,
        headerTop + 12,
        { width: pageWidth - 28 }
      );
    doc
      .font(fontBold)
      .fontSize(16)
      .fillColor('#FFFFFF')
      .text('FİZİK I — 1. VİZE KAPSAMLI DERS NOTU VE FORMÜLLER', leftX + 14, headerTop + 28, {
        width: pageWidth - 28,
      });
    doc
      .font(fontRegular)
      .fontSize(9)
      .fillColor('#CBD5E1')
      .text(
        `Konular: Ölçü & Birimler · Vektörler · Ortalama Hız & Sürat · Anlık Hız (Türev) · Serbest Düşme  |  ${COURSE_META.gValue}`,
        leftX + 14,
        headerTop + 52,
        { width: pageWidth - 28 }
      );
    doc.y = headerTop + 86;

    // Render all 5 chapters
    for (const chapter of CHAPTERS) {
      drawSectionHeader(chapter.number, chapter.title, chapter.subtitle);

      // Definitions
      doc
        .font(fontBold)
        .fontSize(10)
        .fillColor('#0F172A')
        .text('Temel Tanımlar ve Kavramlar', leftX);
      doc.moveDown(0.25);

      for (const def of chapter.definitions) {
        doc.font(fontRegular).fontSize(9);
        const textHeight = doc.heightOfString(`${def.term}: ${def.text}`, {
          width: pageWidth - 12,
        });
        ensureSpace(textHeight + 10);
        doc
          .font(fontBold)
          .fontSize(9)
          .fillColor('#0F172A')
          .text(`• ${def.term}${def.unit ? ` [${def.unit}]` : ''}: `, leftX + 4, doc.y, {
            continued: true,
            width: pageWidth - 8,
          })
          .font(fontRegular)
          .fillColor('#334155')
          .text(def.text);
        doc.moveDown(0.22);
      }

      // Extra tables for Chapter 01 (KISAMUZ + SI Prefixes)
      if (chapter.id === 'olcu') {
        ensureSpace(135);
        doc.moveDown(0.2);
        doc
          .font(fontBold)
          .fontSize(10)
          .fillColor('#0F172A')
          .text('SI Temel Büyüklükler Tablosu (KISAMUZ)', leftX);
        doc.moveDown(0.2);

        const colWidths = [35, 115, 55, 110, 55, pageWidth - 370];
        const headers = ['Kod', 'Büyüklük', 'Sembol', 'SI Birimi', 'Birim', 'Ölçüm Aleti'];
        let rowY = doc.y;

        doc.rect(leftX, rowY, pageWidth, 18).fill('#E2E8F0');
        let cx = leftX;
        headers.forEach((h, i) => {
          doc
            .font(fontBold)
            .fontSize(8)
            .fillColor('#0F172A')
            .text(h, cx + 4, rowY + 5, { width: colWidths[i] - 8 });
          cx += colWidths[i];
        });
        rowY += 18;

        for (const item of KISAMUZ_TABLE) {
          doc.rect(leftX, rowY, pageWidth, 16).strokeColor('#CBD5E1').lineWidth(0.5).stroke();
          cx = leftX;
          const cells = [
            item.letter,
            item.quantity,
            item.symbol,
            item.unit,
            item.unitSymbol,
            item.tool,
          ];
          cells.forEach((cell, i) => {
            doc
              .font(i === 0 || i === 4 ? fontBold : fontRegular)
              .fontSize(8)
              .fillColor('#1E293B')
              .text(cell, cx + 4, rowY + 4, { width: colWidths[i] - 8 });
            cx += colWidths[i];
          });
          rowY += 16;
        }
        doc.y = rowY + 6;

        // Electronic SI prefixes compact row
        ensureSpace(38);
        const prefixLine = SI_PREFIXES.map((p) => `${p.prefix} (${p.symbol}): ${p.factor}`).join('   |   ');
        doc
          .font(fontBold)
          .fontSize(8.5)
          .fillColor('#0284C7')
          .text('Elektronik İçin Kritik SI Ön Ekleri: ', leftX, doc.y, { continued: true })
          .font(fontRegular)
          .fillColor('#334155')
          .text(prefixLine, { width: pageWidth });
        doc.moveDown(0.4);
      }

      // Extra Trig table & SVG-style vector sketch for Chapter 02
      if (chapter.id === 'vektorler') {
        ensureSpace(105);
        doc.moveDown(0.2);
        doc
          .font(fontBold)
          .fontSize(10)
          .fillColor('#0F172A')
          .text('Sınavda En Çok Kullanılan Trigonometri Değerleri', leftX);
        doc.moveDown(0.2);

        const tCols = [70, 120, 160, pageWidth - 350];
        const tHeaders = ['Açı (θ)', 'sin θ (Karşı / Hip.)', 'cos θ (Komşu / Hip.)', 'tan θ'];
        let ty = doc.y;
        doc.rect(leftX, ty, pageWidth, 17).fill('#E2E8F0');
        let tx = leftX;
        tHeaders.forEach((h, i) => {
          doc.font(fontBold).fontSize(8).fillColor('#0F172A').text(h, tx + 4, ty + 4, { width: tCols[i] - 8 });
          tx += tCols[i];
        });
        ty += 17;
        for (const row of TRIG_VALUES) {
          doc.rect(leftX, ty, pageWidth, 15).strokeColor('#CBD5E1').lineWidth(0.5).stroke();
          tx = leftX;
          [row.angle, row.sin, row.cos, row.tan].forEach((val, i) => {
            doc
              .font(i === 0 ? fontBold : fontRegular)
              .fontSize(8)
              .fillColor('#1E293B')
              .text(val, tx + 4, ty + 3.5, { width: tCols[i] - 8 });
            tx += tCols[i];
          });
          ty += 15;
        }
        doc.y = ty + 8;
      }

      // Formulas block
      ensureSpace(46);
      doc.moveDown(0.2);
      doc.font(fontBold).fontSize(10).fillColor('#0F172A').text('Temel Formüller', leftX);
      doc.moveDown(0.25);

      for (const f of chapter.formulas) {
        const boxH = 38;
        ensureSpace(boxH + 6);
        const by = doc.y;
        doc.rect(leftX, by, pageWidth, boxH).fillAndStroke('#F8FAFC', '#CBD5E1');
        doc
          .font(fontBold)
          .fontSize(8.5)
          .fillColor('#0284C7')
          .text(f.title, leftX + 8, by + 5, { width: pageWidth - 16 });
        doc
          .font(fontMono)
          .fontSize(9.5)
          .fillColor('#0F172A')
          .text(f.plain, leftX + 8, by + 17, { width: pageWidth - 16 });
        doc.y = by + boxH + 4;
        doc
          .font(fontRegular)
          .fontSize(8)
          .fillColor('#475569')
          .text(`↳ ${f.description}`, leftX + 4, doc.y, { width: pageWidth - 8 });
        doc.moveDown(0.35);
      }

      // Solved Examples
      ensureSpace(48);
      doc.moveDown(0.2);
      doc
        .font(fontBold)
        .fontSize(10)
        .fillColor('#0F172A')
        .text('Hocanın PDF, Tablet ve Tahta Örnekleri (Çözümlü)', leftX);
      doc.moveDown(0.25);

      for (const ex of chapter.examples) {
        ensureSpace(75);
        doc
          .font(fontBold)
          .fontSize(9.5)
          .fillColor('#0284C7')
          .text(`[${ex.sourceLabel}] ${ex.title}`, leftX, doc.y, { width: pageWidth });
        doc.moveDown(0.15);
        doc
          .font(fontRegular)
          .fontSize(9)
          .fillColor('#0F172A')
          .text(`Soru: ${ex.question}`, leftX, doc.y, { width: pageWidth });
        doc.moveDown(0.25);

        for (const step of ex.steps) {
          ensureSpace(26);
          doc
            .font(fontBold)
            .fontSize(8.5)
            .fillColor('#1E293B')
            .text(`• ${step.label}: `, leftX + 6, doc.y, { continued: true, width: pageWidth - 12 })
            .font(fontRegular)
            .fillColor('#334155')
            .text(step.detail);
          if (step.latex) {
            // Print clean readable math line if plain readable or simplified
            const readableMath = step.latex
              .replace(/\\vec\{([^}]+)\}/g, '$1')
              .replace(/\\hat\{([^}]+)\}/g, '$1')
              .replace(/\\text\{([^}]+)\}/g, '$1')
              .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1)/($2)')
              .replace(/\\sqrt\{([^}]+)\}/g, '√($1)')
              .replace(/\\cdot/g, '·')
              .replace(/\\times/g, '×')
              .replace(/\\implies/g, '⇒')
              .replace(/\\approx/g, '≈')
              .replace(/\\circ/g, '°')
              .replace(/\\mu/g, 'μ')
              .replace(/\\sin/g, 'sin')
              .replace(/\\cos/g, 'cos')
              .replace(/\\quad/g, '  ')
              .replace(/\\qquad/g, '   ')
              .replace(/\\,/g, ' ')
              .replace(/\\;/g, ' ')
              .replace(/\\Delta/g, 'Δ')
              .replace(/\\_/g, '_')
              .replace(/[{}]/g, '');
            doc
              .font(fontMono)
              .fontSize(8.5)
              .fillColor('#0F172A')
              .text(`  ${readableMath}`, leftX + 10, doc.y, { width: pageWidth - 16 });
          }
          doc.moveDown(0.15);
        }

        ensureSpace(26);
        doc
          .font(fontBold)
          .fontSize(9)
          .fillColor('#059669')
          .text(`Sonuç: ${ex.result}`, leftX + 6, doc.y, { width: pageWidth - 12 });
        if (ex.examTip) {
          doc.moveDown(0.15);
          doc
            .font(fontBold)
            .fontSize(8)
            .fillColor('#B45309')
            .text(`Sınav İpucu: `, leftX + 6, doc.y, { continued: true, width: pageWidth - 12 })
            .font(fontRegular)
            .text(ex.examTip);
        }
        doc.moveDown(0.5);
      }
    }

    // Final Page: Quick 1-Page Exam Cheat Sheet
    doc.addPage();
    drawSectionHeader(
      'ÖZET',
      'Vize Öncesi Son Bakış — Tek Sayfalık Formül ve Özel Üçgen Kartı',
      'Sınav sabahı hızlı tekrar için tüm kritik bağıntılar bir arada.'
    );

    const summaryGroups = [
      {
        title: '1. Ölçü ve Temel Bağıntılar',
        lines: [
          '• KISAMUZ: Kütle (kg), Işık Şiddeti (cd), Sıcaklık (K), Akım Şiddeti (A), Madde (mol), Uzunluk (m), Zaman (s)',
          '• Dönüşüm: 1 m/s = 3,6 km/h  |  1 dk = 60 s  |  1 mA = 10⁻³ A  |  1 μA = 10⁻⁶ A',
          '• Özkütle: d = m / V  |  Kuvvet: F = m · a  |  Ağırlık: G = m · g',
        ],
      },
      {
        title: '2. Vektörler ve Trigonometri',
        lines: [
          '• Bileşenler: Fx = F·cosθ,  Fy = F·sinθ,  Fb = √(Fx_top² + Fy_top²)',
          '• Kosinüs Teoremi: c = √(a² + b² ± 2ab·cosθ)  (Toplamada +, çıkarmada −)',
          '• Özel Dik Üçgenler: (3-4-5), (6-8-10), (5-12-13), (8-15-17), (7-24-25)',
        ],
      },
      {
        title: '3. Doğrusal Hareket ve Sabit İvme (Tahtadaki 5 Denklem)',
        lines: [
          '• Ortalama Hız (vektörel): V_ort = (x₂ − x₁) / (t₂ − t₁)   |   Ortalama Sürat (skaler): Toplam Yol / Süre',
          '• Sabit İvme: a = (Vs − V0) / t   |   Vs = V0 + a·t',
          '• Konum: xs − x0 = V0·t + ½·a·t²   |   xs − x0 = ½·(V0 + Vs)·t',
          '• Zamansız Hız: Vs² = V0² + 2·a·(xs − x0)',
        ],
      },
      {
        title: '4. Anlık Hız (Türev)',
        lines: [
          '• Anlık Hız: v(t) = dx/dt  (Konum denkleminin zamana göre 1. dereceden türevi)',
          '• Türev Kuralı: x(t) = a·t² + b·t + c  ⇒  v(t) = 2a·t + b',
          '• Örnek (Tahta): x(t) = −4t + 2t²  ⇒  v(t) = −4 + 4t  ⇒  v(2,5) = 6 m/s',
        ],
      },
      {
        title: '5. Serbest Düşme, Atışlar ve Dairesel Hareket',
        lines: [
          '• Serbest Bırakılma (V0 = 0): h = ½·g·t²,  Vs = g·t,  Vs² = 2·g·h  (g = 10 m/s²)',
          '• Yukarı Atış: Vs = V0 − g·t,  ys − y0 = V0·t − ½·g·t²,  Vs² = V0² − 2g(ys − y0)',
          '• Tepe noktasında Vy = 0  ⇒  t_çıkış = V0 / g,  h_ek = V0² / (2g)',
          '• Dairesel Hareket: a_mer = V² / r,  F_mer = m·V² / r,  Saat 6 noktasında T = mg + mV²/r',
        ],
      },
    ];

    for (const grp of summaryGroups) {
      ensureSpace(70);
      const gy = doc.y;
      const blockHeight = 20 + grp.lines.length * 15;
      doc.rect(leftX, gy, pageWidth, blockHeight).fillAndStroke('#F8FAFC', '#CBD5E1');
      doc.font(fontBold).fontSize(9.5).fillColor('#0284C7').text(grp.title, leftX + 10, gy + 6);
      let ly = gy + 21;
      for (const line of grp.lines) {
        doc.font(fontRegular).fontSize(8.5).fillColor('#0F172A').text(line, leftX + 10, ly, { width: pageWidth - 20 });
        ly += 14;
      }
      doc.y = gy + blockHeight + 8;
    }

    // Add page footers with total page count
    const range = doc.bufferedPageRange();
    for (let i = 0; i < range.count; i++) {
      doc.switchToPage(i);
      const footerY = doc.page.height - 30;
      doc
        .font(fontRegular)
        .fontSize(8)
        .fillColor('#64748B')
        .text(
          'NKÜ Çorlu MYO · Elektronik Teknolojisi · Fizik I (1. Vize)',
          leftX,
          footerY,
          { lineBreak: false }
        );
      doc
        .font(fontBold)
        .fontSize(8)
        .fillColor('#475569')
        .text(`Sayfa ${i + 1} / ${range.count}`, leftX, footerY, {
          width: pageWidth,
          align: 'right',
          lineBreak: false,
        });
    }

    doc.end();
  });
}
