export interface VectorInput {
  label?: string;
  magnitude: number;
  angleDeg: number; // Standard polar angle counterclockwise from +x axis
}

export interface VectorResult {
  sumX: number;
  sumY: number;
  resultant: number;
  angleDeg: number;
  components: Array<{
    label: string;
    magnitude: number;
    angleDeg: number;
    fx: number;
    fy: number;
  }>;
}

export interface VerticalThrowResult {
  tUp: number;
  hExtra: number;
  hMax: number;
  tDown: number;
  tTotal: number;
  vImpact: number;
}

export interface ObliqueThrowResult {
  vx: number;
  vy: number;
  tUp: number;
  hExtra: number;
  hMax: number;
  tDown: number;
  tTotal: number;
  rangeX: number;
  vyImpact: number;
  vImpact: number;
}

export function degToRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

export function radToDeg(rad: number): number {
  return (rad * 180) / Math.PI;
}

export function convertKmhToMs(kmh: number): number {
  return kmh / 3.6;
}

export function convertMsToKmh(ms: number): number {
  return ms * 3.6;
}

export function convertSiPrefix(value: number, fromExp: number, toExp: number): number {
  return value * Math.pow(10, fromExp - toExp);
}

export function vectorComponents(magnitude: number, angleDeg: number): { fx: number; fy: number } {
  const rad = degToRad(angleDeg);
  return {
    fx: magnitude * Math.cos(rad),
    fy: magnitude * Math.sin(rad),
  };
}

export function resultantFromVectors(vectors: VectorInput[]): VectorResult {
  let sumX = 0;
  let sumY = 0;
  const components = vectors.map((v, idx) => {
    const { fx, fy } = vectorComponents(v.magnitude, v.angleDeg);
    sumX += fx;
    sumY += fy;
    return {
      label: v.label ?? `F${idx + 1}`,
      magnitude: v.magnitude,
      angleDeg: v.angleDeg,
      fx,
      fy,
    };
  });

  const resultant = Math.hypot(sumX, sumY);
  const rawAngle = radToDeg(Math.atan2(sumY, sumX));
  const angleDeg = rawAngle < 0 ? rawAngle + 360 : rawAngle;

  return {
    sumX,
    sumY,
    resultant,
    angleDeg,
    components,
  };
}

export function cosineLawResultant(
  a: number,
  b: number,
  angleDeg: number,
  mode: 'add' | 'subtract' = 'add'
): number {
  const cosVal = Math.cos(degToRad(angleDeg));
  const sign = mode === 'add' ? 1 : -1;
  return Math.sqrt(Math.max(0, a * a + b * b + sign * 2 * a * b * cosVal));
}

export function averageVelocity(x1: number, x2: number, t1: number, t2: number): number {
  const dt = t2 - t1;
  if (dt === 0) {
    throw new Error('Zaman farkı sıfır olamaz.');
  }
  return (x2 - x1) / dt;
}

export function averageSpeed(totalDistance: number, totalTime: number): number {
  if (totalTime <= 0) {
    throw new Error('Toplam süre pozitif olmalıdır.');
  }
  return totalDistance / totalTime;
}

/**
 * Evaluates x(t) = a*t^2 + b*t + c
 */
export function quadraticPosition(a: number, b: number, c: number, t: number): number {
  return a * t * t + b * t + c;
}

/**
 * Evaluates first derivative v(t) = dx/dt = 2*a*t + b
 */
export function quadraticInstantVelocity(a: number, b: number, t: number): number {
  return 2 * a * t + b;
}

export function quadraticAverageVelocity(
  a: number,
  b: number,
  c: number,
  t1: number,
  t2: number
): number {
  const x1 = quadraticPosition(a, b, c, t1);
  const x2 = quadraticPosition(a, b, c, t2);
  return averageVelocity(x1, x2, t1, t2);
}

export function constantAccelMotion(
  v0: number,
  a: number,
  t: number
): { vFinal: number; displacement: number; vAvg: number } {
  const vFinal = v0 + a * t;
  const displacement = v0 * t + 0.5 * a * t * t;
  const vAvg = 0.5 * (v0 + vFinal);
  return { vFinal, displacement, vAvg };
}

/**
 * Solves vertical throw from height h0 (>=0) with upward initial velocity v0 (can be >=0 or <0).
 */
export function verticalThrowSolver(h0: number, v0: number, g = 10): VerticalThrowResult {
  const safeH0 = Math.max(0, h0);
  const safeG = g > 0 ? g : 10;

  if (v0 >= 0) {
    const tUp = v0 / safeG;
    const hExtra = v0 * tUp - 0.5 * safeG * tUp * tUp;
    const hMax = safeH0 + hExtra;
    const tDown = Math.sqrt((2 * hMax) / safeG);
    const tTotal = tUp + tDown;
    const vImpact = safeG * tDown;
    return { tUp, hExtra, hMax, tDown, tTotal, vImpact };
  }

  // Thrown downward (v0 < 0): speed increases downward from |v0|
  const vDown0 = Math.abs(v0);
  const vImpact = Math.sqrt(vDown0 * vDown0 + 2 * safeG * safeH0);
  const tDown = (vImpact - vDown0) / safeG;
  return {
    tUp: 0,
    hExtra: 0,
    hMax: safeH0,
    tDown,
    tTotal: tDown,
    vImpact,
  };
}

export function obliqueThrowFromHeight(
  h0: number,
  v0: number,
  angleDeg: number,
  g = 10
): ObliqueThrowResult {
  const safeG = g > 0 ? g : 10;
  const vx = v0 * Math.cos(degToRad(angleDeg));
  const vy = v0 * Math.sin(degToRad(angleDeg));
  const vert = verticalThrowSolver(h0, vy, safeG);
  const rangeX = vx * vert.tTotal;
  const vImpact = Math.hypot(vx, vert.vImpact);

  return {
    vx,
    vy,
    tUp: vert.tUp,
    hExtra: vert.hExtra,
    hMax: vert.hMax,
    tDown: vert.tDown,
    tTotal: vert.tTotal,
    rangeX,
    vyImpact: vert.vImpact,
    vImpact,
  };
}
