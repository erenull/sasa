import express, { type Request, type Response } from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildStudyPdfBuffer } from './src/pdf/generateStudyPdf.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const port = Number(process.env.PORT) || 3000;

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ ok: true });
  });

  app.get('/api/export-pdf', async (_req: Request, res: Response) => {
    try {
      const pdfBuffer = await buildStudyPdfBuffer();
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader(
        'Content-Disposition',
        'attachment; filename="NKU_Corlu_MYO_Fizik1_Vize_Ders_Notu.pdf"'
      );
      res.setHeader('Content-Length', String(pdfBuffer.length));
      res.send(pdfBuffer);
    } catch (error) {
      console.error('PDF export error:', error);
      res.status(500).json({ error: 'PDF oluşturulurken bir hata oluştu.' });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
}

startServer();
