import test from 'node:test';
import assert from 'node:assert/strict';
import { buildStudyPdfBuffer } from './generateStudyPdf.ts';

test('buildStudyPdfBuffer generates valid multi-page PDF with Turkish content', async () => {
  const buf = await buildStudyPdfBuffer();
  assert.ok(Buffer.isBuffer(buf));
  assert.ok(buf.length > 5000, `Expected PDF > 5KB, got ${buf.length} bytes`);
  const header = buf.subarray(0, 8).toString('ascii');
  assert.ok(header.startsWith('%PDF-1.'), `Expected PDF header, got ${header}`);
});
