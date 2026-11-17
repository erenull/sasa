import { KISAMUZ_TABLE, SI_PREFIXES, TRIG_VALUES } from '../data/physicsNotes';
import { MathFormula } from './MathFormula';

export function FormulaSheet() {
  return (
    <section
      id="formul-ozeti"
      className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 print-break-before print-shadow-none"
    >
      <div className="border-b border-slate-200 pb-4 mb-6">
        <p className="text-xs font-medium text-sky-700 mb-1">
          Sınav Öncesi Hızlı Tekrar · Tek Sayfalık Başvuru Tablosu
        </p>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Fizik I Vize Formül ve Referans Kartı
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Kinematics & Free Fall */}
        <div className="space-y-4">
          <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/70 print-break-inside-avoid">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">
              Sabit İvmeli Hareket (Tahtadaki 5 Denklem)
            </h3>
            <div className="space-y-2 text-sm text-slate-800">
              <div className="flex flex-wrap justify-between items-center gap-2 py-1 border-b border-slate-200/70">
                <span>Son Hız</span>
                <MathFormula latex="V_s = V_0 + a \cdot t" />
              </div>
              <div className="flex flex-wrap justify-between items-center gap-2 py-1 border-b border-slate-200/70">
                <span>Konum Değişimi</span>
                <MathFormula latex="x_s - x_0 = V_0 \cdot t + \frac{1}{2} a t^2" />
              </div>
              <div className="flex flex-wrap justify-between items-center gap-2 py-1 border-b border-slate-200/70">
                <span>Zamansız Hız</span>
                <MathFormula latex="V_s^2 = V_0^2 + 2 a (x_s - x_0)" />
              </div>
              <div className="flex flex-wrap justify-between items-center gap-2 py-1 border-b border-slate-200/70">
                <span>Ortalama İvme</span>
                <MathFormula latex="a = \frac{V_s - V_0}{t}" />
              </div>
              <div className="flex flex-wrap justify-between items-center gap-2 py-1">
                <span>Ortalama Hızla Yol</span>
                <MathFormula latex="x_s - x_0 = \frac{1}{2}(V_0 + V_s)\cdot t" />
              </div>
            </div>
          </div>

          <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/70 print-break-inside-avoid">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">
              Anlık Hız, Vektörler ve Serbest Düşme
            </h3>
            <div className="space-y-2 text-sm text-slate-800">
              <div className="flex flex-wrap justify-between items-center gap-2 py-1 border-b border-slate-200/70">
                <span>Ortalama Hız / Sürat</span>
                <MathFormula latex="V_{\text{ort}} = \frac{x_2 - x_1}{t_2 - t_1}, \quad \text{Sürat} = \frac{\text{Yol}}{\Delta t}" />
              </div>
              <div className="flex flex-wrap justify-between items-center gap-2 py-1 border-b border-slate-200/70">
                <span>Anlık Hız (Türev)</span>
                <MathFormula latex="v(t) = \frac{dx}{dt}, \quad (at^2+bt)' = 2at+b" />
              </div>
              <div className="flex flex-wrap justify-between items-center gap-2 py-1 border-b border-slate-200/70">
                <span>Vektör Bileşke</span>
                <MathFormula latex="F_x = F\cos\theta, \quad F_b = \sqrt{F_{x}^2 + F_{y}^2}" />
              </div>
              <div className="flex flex-wrap justify-between items-center gap-2 py-1 border-b border-slate-200/70">
                <span>Kosinüs Teoremi</span>
                <MathFormula latex="c = \sqrt{a^2 + b^2 \pm 2ab\cos\theta}" />
              </div>
              <div className="flex flex-wrap justify-between items-center gap-2 py-1 border-b border-slate-200/70">
                <span>Serbest Düşme (V₀=0)</span>
                <MathFormula latex="h = \frac{1}{2}gt^2, \quad V_s = gt, \quad V_s^2 = 2gh" />
              </div>
              <div className="flex flex-wrap justify-between items-center gap-2 py-1">
                <span>Yukarı Düşey Atış</span>
                <MathFormula latex="V_s = V_0 - gt, \quad y_s - y_0 = V_0 t - \frac{1}{2}gt^2" />
              </div>
            </div>
          </div>
        </div>

        {/* Trig & KISAMUZ & Prefixes */}
        <div className="space-y-4">
          <div className="border border-slate-200 rounded-lg p-4 print-break-inside-avoid">
            <h3 className="text-sm font-semibold text-slate-900 mb-2">
              Trigonometri &amp; Özel Dik Üçgenler
            </h3>
            <p className="text-xs text-slate-600 mb-3">
              Özel üçgenler: <span className="font-mono-tabular font-semibold text-slate-900">3-4-5</span> ·{' '}
              <span className="font-mono-tabular font-semibold text-slate-900">6-8-10</span> ·{' '}
              <span className="font-mono-tabular font-semibold text-slate-900">5-12-13</span> ·{' '}
              <span className="font-mono-tabular font-semibold text-slate-900">8-15-17</span>
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="py-1.5 pr-2 font-medium">Açı</th>
                    <th className="py-1.5 px-2 font-medium">sin θ</th>
                    <th className="py-1.5 px-2 font-medium">cos θ</th>
                    <th className="py-1.5 pl-2 font-medium">tan θ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono-tabular">
                  {TRIG_VALUES.map((row) => (
                    <tr key={row.angle}>
                      <td className="py-1.5 pr-2 font-semibold text-sky-700">{row.angle}</td>
                      <td className="py-1.5 px-2 text-slate-800">{row.sin}</td>
                      <td className="py-1.5 px-2 text-slate-800">{row.cos}</td>
                      <td className="py-1.5 pl-2 text-slate-800">{row.tan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="border border-slate-200 rounded-lg p-4 print-break-inside-avoid">
            <h3 className="text-sm font-semibold text-slate-900 mb-2">
              KISAMUZ Temel Büyüklükler ve Elektronik Ön Ekleri
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs mb-3">
              {KISAMUZ_TABLE.map((k) => (
                <div key={k.letter} className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-700">
                    <strong className="text-sky-700 font-mono-tabular">{k.letter}</strong> · {k.quantity}
                  </span>
                  <span className="font-mono-tabular font-medium text-slate-900">{k.unitSymbol}</span>
                </div>
              ))}
            </div>
            <div className="pt-2 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono-tabular">
              {SI_PREFIXES.map((p) => (
                <div key={p.symbol} className="text-slate-700">
                  <strong className="text-slate-900">{p.symbol}</strong> ({p.prefix}): {p.factor}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
