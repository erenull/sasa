import test from 'node:test';
import assert from 'node:assert/strict';
import {
  averageSpeed,
  averageVelocity,
  constantAccelMotion,
  convertKmhToMs,
  convertSiPrefix,
  cosineLawResultant,
  quadraticAverageVelocity,
  quadraticInstantVelocity,
  resultantFromVectors,
  verticalThrowSolver,
} from './kinematics';

test('unit conversions work accurately', () => {
  assert.equal(Math.round(convertKmhToMs(72) * 100) / 100, 20);
  // 5 mA to uA = 5000 uA
  assert.equal(convertSiPrefix(5, -3, -6), 5000);
});

test('PDF page 5 vector resultant matches 8-15-17 triangle', () => {
  // F1 = 25N at 37 deg (cos37=0.8, sin37=0.6)
  // F2 = 20N at 180-53 = 127 deg
  // F3 = 16N downward = 270 deg
  const res = resultantFromVectors([
    { label: 'F1', magnitude: 25, angleDeg: 37 },
    { label: 'F2', magnitude: 20, angleDeg: 127 },
    { label: 'F3', magnitude: 16, angleDeg: 270 },
  ]);
  // Standard trig gives ~7.93 and ~15.02, very close to 8, 15, 17
  assert.ok(Math.abs(res.sumX - 8) < 0.15);
  assert.ok(Math.abs(res.sumY - 15) < 0.15);
  assert.ok(Math.abs(res.resultant - 17) < 0.15);
});

test('tablet cosine law example (20 km north, 35 km at 60 deg)', () => {
  const dist = cosineLawResultant(20, 35, 60, 'add');
  assert.ok(Math.abs(dist - Math.sqrt(2325)) < 1e-6);
  assert.ok(Math.abs(dist - 48.218) < 0.01);
});

test('tablet number line problem: average velocity vs average speed', () => {
  // Start at +30m, go to +52m (+22m), turn back to -53m (52 + 53 = 105m) in 50s
  const vOrt = averageVelocity(30, -53, 0, 50);
  const surat = averageSpeed(22 + 52 + 53, 50);
  assert.equal(vOrt, -1.66);
  assert.equal(surat, 2.54);
});

test('whiteboard derivative problem: x(t) = -4t + 2t^2', () => {
  // a = 2, b = -4, c = 0
  const vAvg01 = quadraticAverageVelocity(2, -4, 0, 0, 1);
  const vAvg13 = quadraticAverageVelocity(2, -4, 0, 1, 3);
  const vInst25 = quadraticInstantVelocity(2, -4, 2.5);

  assert.equal(vAvg01, -2);
  assert.equal(vAvg13, 4);
  assert.equal(vInst25, 6);
});

test('whiteboard constant acceleration problem: 10 m/s to 30 m/s in 10s', () => {
  const a = (30 - 10) / 10;
  assert.equal(a, 2);
  const half = constantAccelMotion(10, a, 5);
  const full = constantAccelMotion(10, a, 10);
  assert.equal(half.displacement, 75);
  assert.equal(full.displacement, 200);
});

test('PDF page 8 vertical throw problem: h0=80m, V0=30m/s, g=10', () => {
  const res = verticalThrowSolver(80, 30, 10);
  assert.equal(res.tUp, 3);
  assert.equal(res.hExtra, 45);
  assert.equal(res.hMax, 125);
  assert.equal(res.tDown, 5);
  assert.equal(res.tTotal, 8);
  assert.equal(res.vImpact, 50);
});
