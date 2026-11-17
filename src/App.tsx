import { useState } from 'react';
import { Download, Printer, AlertTriangle, Check } from 'lucide-react';
import {
  CHAPTERS,
  COURSE_META,
  KISAMUZ_TABLE,
  SI_PREFIXES,
  TRIG_VALUES,
  type ChapterData,
} from './data/physicsNotes';
import { MathFormula } from './components/MathFormula';
import { TopicDiagram } from './components/TopicDiagrams';
import { DerivativeLab, FreeFallLab, VectorLab } from './components/InteractiveLabs';
import { FormulaSheet } from './components/FormulaSheet';
import { ExamPractice } from './components/ExamPractice';

type ChapterFilter = 'all' | ChapterData['id'];

export default function App() {
  const [activeFilter, setActiveFilter] = useState<ChapterFilter>('all');
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [pdfMessage, setPdfMessage] = useState<string | null>(null);

  const visibleChapters =
    activeFilter === 'all' ? CHAPTERS : CHAPTERS.filter((c) => c.id === activeFilter);

  const handleDownloadPdf = async () => {
    setDownloadingPdf(true);
    setPdfMessage(null);
    try {
      const response = await fetch('/api/export-pdf');
      if (!response.ok) {
        throw new Error('PDF oluşturulamadı.');
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'NKU_Corlu_MYO_Fizik1_Vize_Ders_Notu.pdf';
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      setPdfMessage('PDF indirildi.');
    } catch {
      setPdfMessage('PDF indirme başarısız oldu, Yazdır (A4) seçeneğini deneyebilirsiniz.');
    } finally {
      setDownloadingPdf(false);
    }
  };

  return (
    <div id="top" className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top Bar Contract: strictly 3 zones separated by gap-8 */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200 no-print">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          <a
            href="#top"
            className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
          >
            NKÜ Fizik I
          </a>

          <nav
            aria-label="Konu Başlıkları"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600"
          >
            <a
              href="#olcu"
              onClick={() => setActiveFilter('all')}
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Ölçü
            </a>
            <a
              href="#vektorler"
              onClick={() => setActiveFilter('all')}
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Vektörler
            </a>
            <a
              href="#hiz-ivme"
              onClick={() => setActiveFilter('all')}
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Hız ve Sürat
            </a>
            <a
              href="#anlik-hiz"
              onClick={() => setActiveFilter('all')}
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Anlık Hız
            </a>
            <a
              href="#serbest-dusme"
              onClick={() => setActiveFilter('all')}
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Serbest Düşme
            </a>
          </nav>

          <div className="shrink-0">
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={downloadingPdf}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-sky-600 rounded-lg hover:bg-sky-700 disabled:opacity-60 transition-colors whitespace-nowrap shrink-0"
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{downloadingPdf ? 'Hazırlanıyor...' : 'PDF İndir'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Print-only A4 Header */}
      <div className="print-only border-b-2 border-slate-900 pb-3 mb-6">
        <p className="text-xs font-semibold text-sky-700">
          {COURSE_META.university} · {COURSE_META.school} · {COURSE_META.department}
        </p>
        <h1 className="text-xl font-bold text-slate-900">
          {COURSE_META.course} — Ders Notları ve Formül Özeti
        </h1>
        <p className="text-xs text-slate-600">{COURSE_META.gValue}</p>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-10 space-y-10">
        {/* Hero / Course Brief */}
        <section className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 no-print">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500 mb-2">
                <span>{COURSE_META.university}</span>
                <span aria-hidden="true">·</span>
                <span>{COURSE_META.school}</span>
                <span aria-hidden="true">·</span>
                <span>{COURSE_META.department}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-3">
                Fizik I — 1. Vize Sınavı Kapsamlı Ders Notu ve Formül Özeti
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Ders PDF’indeki tanımlar, sınıf tahta fotoğraflarındaki 5 temel hareket denklemi ve
                tablet notlarındaki tüm örnek sorular tek yerde; formüller, SVG çizimler,
                etkileşimli laboratuvarlar ve doğrudan indirilebilir A4 PDF çıktısıyla.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 border border-slate-200 rounded-lg hover:bg-slate-200 transition-colors whitespace-nowrap shrink-0"
              >
                <Printer className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Yazdır (A4)</span>
              </button>
              <a
                href="#formul-ozeti"
                onClick={() => setActiveFilter('all')}
                className="px-4 py-2 text-xs font-medium text-sky-700 bg-sky-50 border border-sky-200 rounded-lg hover:bg-sky-100 transition-colors whitespace-nowrap shrink-0"
              >
                Formül Kartına Git
              </a>
              <a
                href="#kendini-dene"
                onClick={() => setActiveFilter('all')}
                className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
              >
                Mini Vize (8 Soru)
              </a>
            </div>
          </div>

          {pdfMessage && (
            <div className="mt-4 text-xs font-medium text-sky-800 bg-sky-50 border border-sky-200 rounded-lg px-3.5 py-2 flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-sky-600 shrink-0" aria-hidden="true" />
              <span>{pdfMessage}</span>
            </div>
          )}

          {/* Workspace Topic Filter Bar */}
          <div className="mt-6 pt-5 border-t border-slate-200 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div
              role="group"
              aria-label="Konu Filtresi"
              className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg"
            >
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  activeFilter === 'all'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Tüm Konular
              </button>
              {CHAPTERS.map((ch) => (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => setActiveFilter(ch.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    activeFilter === ch.id
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {ch.number}. {ch.shortTitle}
                </button>
              ))}
            </div>

            <div className="text-xs text-slate-500 font-mono-tabular whitespace-nowrap shrink-0">
              {COURSE_META.gValue}
            </div>
          </div>
        </section>

        {/* Lecture Chapters */}
        {visibleChapters.map((chapter) => (
          <section
            key={chapter.id}
            id={chapter.id}
            className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 space-y-8 print-shadow-none"
          >
            {/* Chapter Title */}
            <div className="border-b border-slate-200 pb-5">
              <p className="text-xs font-medium text-sky-700 mb-1">
                Bölüm {chapter.number} · Vize Sınav Konusu
              </p>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">
                {chapter.number}. {chapter.title}
              </h2>
              <p className="text-sm text-slate-600">{chapter.subtitle}</p>
            </div>

            {/* Definitions */}
            <div>
              <h3 className="text-base font-semibold text-slate-900 mb-4">
                Temel Tanımlar ve Kavramlar
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {chapter.definitions.map((def) => (
                  <div
                    key={def.term}
                    className="border border-slate-200 rounded-lg p-4 bg-slate-50/50 print-break-inside-avoid"
                  >
                    <div className="flex items-baseline justify-between gap-2 mb-1.5">
                      <h4 className="text-sm font-semibold text-slate-900">{def.term}</h4>
                      {def.unit && (
                        <span className="text-xs font-mono-tabular text-sky-700 shrink-0">
                          Birim: {def.unit}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">{def.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Chapter 1 Reference Tables: KISAMUZ & SI Prefixes */}
            {chapter.id === 'olcu' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 print-break-inside-avoid">
                <div className="lg:col-span-7 border border-slate-200 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-slate-900 mb-3">
                    SI Temel Büyüklükler (KISAMUZ Kodlaması)
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-500">
                          <th className="py-2 pr-2 font-medium">Kod</th>
                          <th className="py-2 px-2 font-medium">Büyüklük</th>
                          <th className="py-2 px-2 font-medium">Sembol</th>
                          <th className="py-2 px-2 font-medium">SI Birimi</th>
                          <th className="py-2 pl-2 font-medium">Ölçüm Aleti</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {KISAMUZ_TABLE.map((row) => (
                          <tr key={row.letter}>
                            <td className="py-2 pr-2 font-bold text-sky-700 font-mono-tabular">
                              {row.letter}
                            </td>
                            <td className="py-2 px-2 font-medium text-slate-900">{row.quantity}</td>
                            <td className="py-2 px-2 font-mono-tabular text-slate-700">{row.symbol}</td>
                            <td className="py-2 px-2 font-mono-tabular text-slate-900">
                              {row.unit} ({row.unitSymbol})
                            </td>
                            <td className="py-2 pl-2 text-slate-600">{row.tool}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="lg:col-span-5 border border-slate-200 rounded-lg p-4 bg-slate-50/50">
                  <h3 className="text-sm font-semibold text-slate-900 mb-3">
                    Elektronik Teknolojisi SI Ön Ekleri
                  </h3>
                  <div className="divide-y divide-slate-200/70 text-xs">
                    {SI_PREFIXES.map((p) => (
                      <div key={p.symbol} className="py-2 flex items-center justify-between gap-2">
                        <div>
                          <span className="font-semibold text-slate-900">{p.prefix}</span>{' '}
                          <span className="font-mono-tabular text-sky-700">({p.symbol})</span>
                        </div>
                        <div className="font-mono-tabular text-slate-700">
                          {p.factor} · <span className="text-slate-500">{p.example}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Chapter 2 Trigonometry Table */}
            {chapter.id === 'vektorler' && (
              <div className="border border-slate-200 rounded-lg p-4 print-break-inside-avoid">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                  <h3 className="text-sm font-semibold text-slate-900">
                    Vektör Bileşenleri İçin Trigonometri Tablosu (PDF Sayfa 2)
                  </h3>
                  <span className="text-xs text-slate-500 font-mono-tabular">
                    sin = karşı/hipotenüs · cos = komşu/hipotenüs
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500">
                        <th className="py-2 pr-3 font-medium">Açı (θ)</th>
                        <th className="py-2 px-3 font-medium">sin θ</th>
                        <th className="py-2 px-3 font-medium">cos θ</th>
                        <th className="py-2 pl-3 font-medium">tan θ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono-tabular">
                      {TRIG_VALUES.map((row) => (
                        <tr key={row.angle}>
                          <td className="py-2 pr-3 font-semibold text-sky-700">{row.angle}</td>
                          <td className="py-2 px-3 text-slate-900">{row.sin}</td>
                          <td className="py-2 px-3 text-slate-900">{row.cos}</td>
                          <td className="py-2 pl-3 text-slate-700">{row.tan}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  *PDF Sayfa 7’deki eğik atış çözümünde hoca cos 30° değerini yaklaşık 0,7 olarak kullanmıştır.
                </p>
              </div>
            )}

            {/* Formulas */}
            <div>
              <h3 className="text-base font-semibold text-slate-900 mb-4">Temel Formüller</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {chapter.formulas.map((f) => (
                  <div
                    key={f.title}
                    className="border border-slate-200 rounded-lg p-4 bg-white print-break-inside-avoid"
                  >
                    <p className="text-xs font-semibold text-sky-700 mb-2">{f.title}</p>
                    <div className="bg-slate-50 border border-slate-200/80 rounded-md px-3 py-2.5 text-slate-900 mb-2 overflow-x-auto">
                      <MathFormula latex={f.latex} display />
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{f.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Solved Examples from PDF & Whiteboard */}
            <div>
              <h3 className="text-base font-semibold text-slate-900 mb-4">
                Hocanın PDF, Tablet ve Tahta Örnekleri (Adım Adım Çözüm)
              </h3>
              <div className="space-y-6">
                {chapter.examples.map((ex) => (
                  <article
                    key={ex.id}
                    className="border border-slate-200 rounded-xl p-5 bg-slate-50/40 print-break-inside-avoid"
                  >
                    <div className="text-xs font-medium text-sky-700 mb-1">
                      {ex.sourceLabel}
                    </div>
                    <h4 className="text-base font-semibold text-slate-900 mb-2">{ex.title}</h4>
                    <p className="text-sm text-slate-800 leading-relaxed mb-4">{ex.question}</p>

                    <div
                      className={
                        ex.diagramType
                          ? 'grid grid-cols-1 lg:grid-cols-12 gap-6 items-start'
                          : ''
                      }
                    >
                      {ex.diagramType && (
                        <div className="lg:col-span-5 flex justify-center">
                          <TopicDiagram type={ex.diagramType} />
                        </div>
                      )}

                      <div className={ex.diagramType ? 'lg:col-span-7 space-y-3' : 'space-y-3'}>
                        {ex.steps.map((step) => (
                          <div
                            key={step.label}
                            className="bg-white border border-slate-200 rounded-lg p-3.5"
                          >
                            <p className="text-xs font-semibold text-slate-900 mb-1">
                              {step.label}
                            </p>
                            {step.latex && (
                              <div className="text-sm text-slate-900 overflow-x-auto my-1">
                                <MathFormula latex={step.latex} display />
                              </div>
                            )}
                            <p className="text-xs text-slate-600 leading-relaxed">{step.detail}</p>
                          </div>
                        ))}

                        <div className="bg-emerald-50/80 border border-emerald-200 rounded-lg px-4 py-2.5 text-xs font-semibold text-emerald-900 font-mono-tabular">
                          Sonuç: {ex.result}
                        </div>

                        {ex.examTip && (
                          <div className="bg-amber-50/80 border border-amber-200 rounded-lg px-4 py-2.5 text-xs text-amber-900 flex items-start gap-2">
                            <AlertTriangle
                              className="w-4 h-4 text-amber-700 shrink-0 mt-0.5"
                              aria-hidden="true"
                            />
                            <div>
                              <strong>Sınav İpucu: </strong>
                              {ex.examTip}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Interactive Labs aligned to specific chapters */}
            {chapter.id === 'vektorler' && <VectorLab />}
            {chapter.id === 'anlik-hiz' && <DerivativeLab />}
            {chapter.id === 'serbest-dusme' && <FreeFallLab />}

            {/* Chapter Key Takeaways */}
            <div className="border-t border-slate-200 pt-5 print-break-inside-avoid">
              <h3 className="text-sm font-semibold text-slate-900 mb-2">
                Bölüm {chapter.number} — Sınav Kontrol Noktaları
              </h3>
              <ul className="space-y-1.5 text-sm text-slate-700 list-disc pl-5">
                {chapter.keyTakeaways.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </div>
          </section>
        ))}

        {/* 1-Page Formula Summary Card */}
        <FormulaSheet />

        {/* Interactive Exam Practice */}
        <ExamPractice />
      </main>

      <footer className="border-t border-slate-200 bg-white py-6 mt-12 no-print">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span>
            {COURSE_META.university} · {COURSE_META.school} · {COURSE_META.department}
          </span>
          <span>Fizik I Vize Çalışma Notu · PDF ve Etkileşimli Özet</span>
        </div>
      </footer>
    </div>
  );
}
