import { useState } from 'react';
import {
  degToRad,
  quadraticInstantVelocity,
  quadraticPosition,
  resultantFromVectors,
  verticalThrowSolver,
} from '../physics/kinematics';

export function VectorLab() {
  const [f1, setF1] = useState(25);
  const [a1, setA1] = useState(37);
  const [f2, setF2] = useState(20);
  const [a2, setA2] = useState(127); // 180 - 53 deg

  const res = resultantFromVectors([
    { label: 'F₁', magnitude: f1, angleDeg: a1 },
    { label: 'F₂', magnitude: f2, angleDeg: a2 },
  ]);

  const cx = 160;
  const cy = 140;
  const scale = 2.2;
  const x1 = cx + res.components[0].fx * scale;
  const y1 = cy - res.components[0].fy * scale;
  const x2 = cx + res.components[1].fx * scale;
  const y2 = cy - res.components[1].fy * scale;
  const xr = cx + res.sumX * scale;
  const yr = cy - res.sumY * scale;

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 no-print">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div>
          <p className="text-xs font-medium text-sky-700">Etkileşimli Laboratuvar · Vektör Bileşkesi</p>
          <h4 className="text-base font-semibold text-slate-900">
            İki Kuvvetin Dik Bileşenleri ve Bileşke Vektör Hesaplayıcı
          </h4>
        </div>
        <button
          type="button"
          onClick={() => {
            setF1(25);
            setA1(37);
            setF2(20);
            setA2(127);
          }}
          className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0"
        >
          PDF Örneğine Sıfırla
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-6">
          <svg
            viewBox="0 0 320 260"
            className="w-full h-auto bg-white border border-slate-200 rounded-lg"
            role="img"
            aria-label="Etkileşimli vektör koordinat düzlemi"
          >
            <defs>
              <marker id="lab-b" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#0284C7" />
              </marker>
              <marker id="lab-s" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#475569" />
              </marker>
              <marker id="lab-r" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#DC2626" />
              </marker>
            </defs>
            <line x1="20" y1={cy} x2="300" y2={cy} stroke="#CBD5E1" strokeWidth="1.5" />
            <line x1={cx} y1="15" x2={cx} y2="245" stroke="#CBD5E1" strokeWidth="1.5" />
            <line x1={cx} y1={cy} x2={x1} y2={y1} stroke="#0284C7" strokeWidth="2.5" markerEnd="url(#lab-b)" />
            <line x1={cx} y1={cy} x2={x2} y2={y2} stroke="#475569" strokeWidth="2.5" markerEnd="url(#lab-s)" />
            <line x1={cx} y1={cy} x2={xr} y2={yr} stroke="#DC2626" strokeWidth="2.5" strokeDasharray="4 2" markerEnd="url(#lab-r)" />
            <text x="275" y={cy - 6} fontSize="10" fill="#64748B" fontFamily="IBM Plex Mono">+x</text>
            <text x={cx + 6} y="24" fontSize="10" fill="#64748B" fontFamily="IBM Plex Mono">+y</text>
            <text x={Math.min(275, Math.max(20, x1 + 6))} y={Math.max(24, y1 - 4)} fontSize="10" fontWeight="600" fill="#0284C7">F₁</text>
            <text x={Math.min(275, Math.max(20, x2 - 14))} y={Math.max(24, y2 - 4)} fontSize="10" fontWeight="600" fill="#475569">F₂</text>
            <text x={Math.min(275, Math.max(20, xr + 6))} y={Math.max(24, yr - 6)} fontSize="10" fontWeight="700" fill="#DC2626">Fb</text>
          </svg>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="vec-f1" className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <span>F₁ Büyüklüğü</span>
                <span className="font-mono-tabular text-sky-700">{f1} N</span>
              </label>
              <input
                id="vec-f1"
                type="range"
                min="5"
                max="40"
                step="1"
                value={f1}
                onChange={(e) => setF1(Number(e.target.value))}
                className="w-full accent-sky-600"
              />
            </div>
            <div>
              <label htmlFor="vec-a1" className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <span>F₁ Açısı (θ₁)</span>
                <span className="font-mono-tabular text-sky-700">{a1}°</span>
              </label>
              <input
                id="vec-a1"
                type="range"
                min="0"
                max="180"
                step="1"
                value={a1}
                onChange={(e) => setA1(Number(e.target.value))}
                className="w-full accent-sky-600"
              />
            </div>
            <div>
              <label htmlFor="vec-f2" className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <span>F₂ Büyüklüğü</span>
                <span className="font-mono-tabular text-slate-900">{f2} N</span>
              </label>
              <input
                id="vec-f2"
                type="range"
                min="5"
                max="40"
                step="1"
                value={f2}
                onChange={(e) => setF2(Number(e.target.value))}
                className="w-full accent-slate-700"
              />
            </div>
            <div>
              <label htmlFor="vec-a2" className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <span>F₂ Açısı (θ₂)</span>
                <span className="font-mono-tabular text-slate-900">{a2}°</span>
              </label>
              <input
                id="vec-a2"
                type="range"
                min="0"
                max="180"
                step="1"
                value={a2}
                onChange={(e) => setA2(Number(e.target.value))}
                className="w-full accent-slate-700"
              />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-3.5 grid grid-cols-3 gap-3 text-center">
            <div>
              <div className="text-xs text-slate-500">ΣFx (Yatay)</div>
              <div className="text-sm font-semibold font-mono-tabular text-slate-900" data-testid="vec-sum-x">
                {res.sumX.toFixed(1)} N
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500">ΣFy (Düşey)</div>
              <div className="text-sm font-semibold font-mono-tabular text-slate-900" data-testid="vec-sum-y">
                {res.sumY.toFixed(1)} N
              </div>
            </div>
            <div>
              <div className="text-xs text-red-700 font-medium">Bileşke |Fb|</div>
              <div className="text-sm font-bold font-mono-tabular text-red-700" data-testid="vec-resultant">
                {res.resultant.toFixed(1)} N
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-600 font-mono-tabular">
            cos({a1}°) = {Math.cos(degToRad(a1)).toFixed(2)} · sin({a1}°) = {Math.sin(degToRad(a1)).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}

export function DerivativeLab() {
  const [t, setT] = useState(2.5);
  // Professor's exact equation: x(t) = 2t^2 - 4t
  const a = 2;
  const b = -4;
  const c = 0;

  const pos = quadraticPosition(a, b, c, t);
  const vel = quadraticInstantVelocity(a, b, t);

  // Map t in [0, 4] to xPx in [40, 300], x(t) in [-4, 16] to yPx in [180, 25]
  const mapX = (time: number) => 40 + (time / 4) * 260;
  const mapY = (xVal: number) => 180 - ((xVal + 4) / 20) * 155;

  const curvePoints: string[] = [];
  for (let i = 0; i <= 40; i++) {
    const ti = (i / 40) * 4;
    const xi = quadraticPosition(a, b, c, ti);
    curvePoints.push(`${mapX(ti).toFixed(1)},${mapY(xi).toFixed(1)}`);
  }

  // Tangent line segment from t-0.7 to t+0.7
  const tLeft = Math.max(0, t - 0.7);
  const tRight = Math.min(4, t + 0.7);
  const xLeft = pos + vel * (tLeft - t);
  const xRight = pos + vel * (tRight - t);

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 no-print">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div>
          <p className="text-xs font-medium text-sky-700">
            Etkileşimli Laboratuvar · Tahtadaki x(t) = −4t + 2t² Sorusu
          </p>
          <h4 className="text-base font-semibold text-slate-900">
            Konum-Zaman Eğrisi ve Teğet Eğimiyle Anlık Hız
          </h4>
        </div>
        <button
          type="button"
          onClick={() => setT(2.5)}
          className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0"
        >
          t = 2,5 s Sınav Değerine Dön
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-6">
          <svg
            viewBox="0 0 340 215"
            className="w-full h-auto bg-white border border-slate-200 rounded-lg"
            role="img"
            aria-label="x(t) = -4t + 2t kare parabolü ve anlık hız teğeti"
          >
            {/* Zero horizontal axis x=0 */}
            <line x1="35" y1={mapY(0)} x2="315" y2={mapY(0)} stroke="#CBD5E1" strokeWidth="1.5" />
            <line x1="40" y1="20" x2="40" y2="195" stroke="#CBD5E1" strokeWidth="1.5" />
            <text x="305" y={mapY(0) - 5} fontSize="10" fill="#64748B" fontFamily="IBM Plex Mono">t (s)</text>
            <text x="46" y="26" fontSize="10" fill="#64748B" fontFamily="IBM Plex Mono">x (m)</text>

            {/* Parabola */}
            <polyline fill="none" stroke="#0284C7" strokeWidth="2.5" points={curvePoints.join(' ')} />

            {/* Tangent line */}
            <line
              x1={mapX(tLeft)}
              y1={mapY(xLeft)}
              x2={mapX(tRight)}
              y2={mapY(xRight)}
              stroke="#DC2626"
              strokeWidth="2"
              strokeDasharray="4 2"
            />
            <circle cx={mapX(t)} cy={mapY(pos)} r="5" fill="#DC2626" />

            {[0, 1, 2, 3, 4].map((tick) => (
              <text
                key={tick}
                x={mapX(tick)}
                y="204"
                textAnchor="middle"
                fontSize="10"
                fill="#64748B"
                fontFamily="IBM Plex Mono"
              >
                {tick}s
              </text>
            ))}
          </svg>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <div>
            <label htmlFor="deriv-t" className="flex justify-between text-xs font-medium text-slate-700 mb-1">
              <span>Zaman (t)</span>
              <span className="font-mono-tabular text-sky-700">{t.toFixed(1)} s</span>
            </label>
            <input
              id="deriv-t"
              type="range"
              min="0"
              max="4"
              step="0.1"
              value={t}
              onChange={(e) => setT(Number(e.target.value))}
              className="w-full accent-sky-600"
            />
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Konum x({t.toFixed(1)}):</span>
              <span className="font-mono-tabular font-semibold text-slate-900" data-testid="deriv-pos">
                {pos.toFixed(2)} m
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Türev Formülü v(t) = dx/dt:</span>
              <span className="font-mono-tabular font-medium text-sky-700">−4 + 4t</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-slate-100">
              <span className="font-medium text-red-700">Anlık Hız v({t.toFixed(1)}):</span>
              <span className="font-mono-tabular font-bold text-red-700" data-testid="deriv-vel">
                {vel.toFixed(1)} m/s
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-600">
            t = 1,0 s anında v(1) = 0 m/s olur; bu nokta cismin yön değiştirdiği tepe/dip noktasıdır.
          </p>
        </div>
      </div>
    </div>
  );
}

export function FreeFallLab() {
  const [h0, setH0] = useState(80);
  const [v0, setV0] = useState(30);

  const res = verticalThrowSolver(h0, v0, 10);
  const maxDisplayH = Math.max(140, res.hMax + 15);
  const groundY = 195;
  const topPad = 25;
  const usableH = groundY - topPad;
  const hToY = (h: number) => groundY - (h / maxDisplayH) * usableH;

  const startY = hToY(h0);
  const peakY = hToY(res.hMax);

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 no-print">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div>
          <p className="text-xs font-medium text-sky-700">
            Etkileşimli Laboratuvar · PDF Sayfa 8 Örneği (g = 10 m/s²)
          </p>
          <h4 className="text-base font-semibold text-slate-900">
            Serbest Düşme ve Yukarı Düşey Atış Simülatörü
          </h4>
        </div>
        <button
          type="button"
          onClick={() => {
            setH0(80);
            setV0(30);
          }}
          className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0"
        >
          80 m / 30 m/s PDF Örneğine Dön
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-5">
          <svg
            viewBox="0 0 280 220"
            className="w-full h-auto bg-white border border-slate-200 rounded-lg"
            role="img"
            aria-label="Düşey atış ve serbest düşme yükseklik simülasyonu"
          >
            <line x1="20" y1={groundY} x2="260" y2={groundY} stroke="#334155" strokeWidth="2" />
            {h0 > 0 && (
              <rect
                x="35"
                y={startY}
                width="45"
                height={groundY - startY}
                fill="#F1F5F9"
                stroke="#94A3B8"
                strokeWidth="1.5"
              />
            )}
            <path
              d={`M 95 ${startY} C 95 ${peakY}, 145 ${peakY}, 145 ${groundY}`}
              fill="none"
              stroke="#0284C7"
              strokeWidth="2.2"
              strokeDasharray="4 3"
            />
            <circle cx="95" cy={startY} r="4.5" fill="#0F172A" />
            <line x1="90" y1={peakY} x2="245" y2={peakY} stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" />
            <text x="155" y={Math.max(16, peakY - 5)} fontSize="10" fontWeight="600" fill="#059669" fontFamily="IBM Plex Mono">
              H_max = {res.hMax.toFixed(1)} m
            </text>
            <text x="155" y="185" fontSize="10" fontWeight="600" fill="#DC2626" fontFamily="IBM Plex Mono">
              V_çarpma = {res.vImpact.toFixed(1)} m/s
            </text>
          </svg>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="ff-h0" className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <span>Başlangıç Yüksekliği (h₀)</span>
                <span className="font-mono-tabular text-sky-700">{h0} m</span>
              </label>
              <input
                id="ff-h0"
                type="range"
                min="0"
                max="125"
                step="5"
                value={h0}
                onChange={(e) => setH0(Number(e.target.value))}
                className="w-full accent-sky-600"
              />
            </div>
            <div>
              <label htmlFor="ff-v0" className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <span>İlk Hız V₀ (0 = Serbest Düşme)</span>
                <span className="font-mono-tabular text-sky-700">{v0} m/s</span>
              </label>
              <input
                id="ff-v0"
                type="range"
                min="0"
                max="50"
                step="5"
                value={v0}
                onChange={(e) => setV0(Number(e.target.value))}
                className="w-full accent-sky-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white border border-slate-200 rounded-lg p-3">
              <div className="text-xs text-slate-500">Ek Çıkış (h_ek)</div>
              <div className="text-sm font-semibold font-mono-tabular text-slate-900" data-testid="ff-hextra">
                {res.hExtra.toFixed(1)} m
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-3">
              <div className="text-xs text-slate-500">Max Yükseklik</div>
              <div className="text-sm font-semibold font-mono-tabular text-emerald-700" data-testid="ff-hmax">
                {res.hMax.toFixed(1)} m
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-3">
              <div className="text-xs text-slate-500">Toplam Süre</div>
              <div className="text-sm font-semibold font-mono-tabular text-slate-900" data-testid="ff-ttotal">
                {res.tTotal.toFixed(2)} s
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-3">
              <div className="text-xs text-red-700">Çarpma Hızı</div>
              <div className="text-sm font-bold font-mono-tabular text-red-700" data-testid="ff-vimpact">
                {res.vImpact.toFixed(1)} m/s
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
