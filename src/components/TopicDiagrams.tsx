interface DiagramProps {
  type: 'vector-17n' | 'number-line' | 'vertical-throw' | 'oblique-throw' | 'river' | 'circular';
}

export function TopicDiagram({ type }: DiagramProps) {
  if (type === 'vector-17n') {
    return (
      <svg
        viewBox="0 0 360 220"
        className="w-full max-w-md h-auto bg-white border border-slate-200 rounded-lg"
        role="img"
        aria-label="Kuvvetlerin dik bileşenlere ayrılması diyagramı: F1=25N (37 derece), F2=20N (53 derece), F3=16N"
      >
        <defs>
          <marker id="arrow-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#0284C7" />
          </marker>
          <marker id="arrow-slate" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#475569" />
          </marker>
          <marker id="arrow-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#DC2626" />
          </marker>
        </defs>
        {/* Axes */}
        <line x1="30" y1="120" x2="330" y2="120" stroke="#CBD5E1" strokeWidth="1.5" />
        <line x1="180" y1="15" x2="180" y2="205" stroke="#CBD5E1" strokeWidth="1.5" />
        <text x="322" y="114" fontSize="11" fill="#64748B" fontFamily="IBM Plex Mono">+x</text>
        <text x="28" y="114" fontSize="11" fill="#64748B" fontFamily="IBM Plex Mono">-x</text>
        <text x="186" y="24" fontSize="11" fill="#64748B" fontFamily="IBM Plex Mono">+y</text>
        <text x="186" y="202" fontSize="11" fill="#64748B" fontFamily="IBM Plex Mono">-y</text>

        {/* F1 = 25N at 37 deg */}
        <line x1="180" y1="120" x2="290" y2="48" stroke="#0284C7" strokeWidth="2.5" markerEnd="url(#arrow-blue)" />
        <line x1="290" y1="48" x2="290" y2="120" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4 3" />
        <line x1="290" y1="48" x2="180" y2="48" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4 3" />
        <text x="235" y="42" fontSize="11" fontWeight="600" fill="#0284C7">F₁ = 25 N</text>
        <text x="218" y="113" fontSize="10" fill="#334155">37°</text>
        <text x="242" y="134" fontSize="10" fill="#475569" fontFamily="IBM Plex Mono">F₁x = 20 N</text>

        {/* F2 = 20N at 53 deg in Q2 */}
        <line x1="180" y1="120" x2="108" y2="40" stroke="#0284C7" strokeWidth="2.5" markerEnd="url(#arrow-blue)" />
        <line x1="108" y1="40" x2="108" y2="120" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4 3" />
        <line x1="108" y1="40" x2="180" y2="40" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4 3" />
        <text x="48" y="34" fontSize="11" fontWeight="600" fill="#0284C7">F₂ = 20 N</text>
        <text x="142" y="113" fontSize="10" fill="#334155">53°</text>
        <text x="72" y="134" fontSize="10" fill="#475569" fontFamily="IBM Plex Mono">F₂x = -12 N</text>

        {/* F3 = 16N downward */}
        <line x1="180" y1="120" x2="180" y2="188" stroke="#DC2626" strokeWidth="2.5" markerEnd="url(#arrow-red)" />
        <text x="190" y="182" fontSize="11" fontWeight="600" fill="#DC2626">F₃ = 16 N</text>
      </svg>
    );
  }

  if (type === 'number-line') {
    return (
      <svg
        viewBox="0 0 400 130"
        className="w-full max-w-lg h-auto bg-white border border-slate-200 rounded-lg"
        role="img"
        aria-label="Sayı doğrusu üzerinde hareket: +30m'den +52m'ye, oradan -53m'ye gidiş"
      >
        <defs>
          <marker id="nl-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#0284C7" />
          </marker>
          <marker id="nl-arrow-amber" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#D97706" />
          </marker>
        </defs>
        {/* Number line */}
        <line x1="30" y1="78" x2="370" y2="78" stroke="#334155" strokeWidth="2" />
        {/* Ticks: -53 (x=65), 3 (x=135), 0 (x=210), 1:+30 (x=280), 2:+52 (x=340) */}
        {[
          { x: 65, top: '-53 m', bot: '4. Nokta' },
          { x: 138, top: '', bot: '3' },
          { x: 210, top: '0', bot: 'Referans' },
          { x: 280, top: '+30 m', bot: '1. Nokta' },
          { x: 340, top: '+52 m', bot: '2. Nokta' },
        ].map((t) => (
          <g key={t.bot}>
            <line x1={t.x} y1="72" x2={t.x} y2="84" stroke="#0F172A" strokeWidth="2" />
            {t.top && (
              <text x={t.x} y="64" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0F172A" fontFamily="IBM Plex Mono">
                {t.top}
              </text>
            )}
            <text x={t.x} y="102" textAnchor="middle" fontSize="10" fill="#64748B">
              {t.bot}
            </text>
          </g>
        ))}

        {/* Forward path 1 -> 2 (+22m) */}
        <path d="M 280 46 Q 310 26 338 46" fill="none" stroke="#0284C7" strokeWidth="2" markerEnd="url(#nl-arrow)" />
        <text x="310" y="25" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0284C7" fontFamily="IBM Plex Mono">
          +22 m
        </text>

        {/* Return path 2 -> 4 (-105m total distance) */}
        <path d="M 338 50 Q 200 10 68 50" fill="none" stroke="#D97706" strokeWidth="2" strokeDasharray="5 3" markerEnd="url(#nl-arrow-amber)" />
        <text x="200" y="20" textAnchor="middle" fontSize="10" fontWeight="600" fill="#B45309" fontFamily="IBM Plex Mono">
          Geri dönüş: 52 + 53 = 105 m
        </text>
      </svg>
    );
  }

  if (type === 'vertical-throw') {
    return (
      <svg
        viewBox="0 0 320 220"
        className="w-full max-w-sm h-auto bg-white border border-slate-200 rounded-lg"
        role="img"
        aria-label="80 m yükseklikten 30 m/s hızla yukarı atılan cismin hareketi"
      >
        <defs>
          <marker id="vt-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#0284C7" />
          </marker>
        </defs>
        {/* Ground */}
        <line x1="25" y1="196" x2="295" y2="196" stroke="#334155" strokeWidth="2" />
        {/* Cliff 80m */}
        <rect x="40" y="106" width="55" height="90" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="1.5" />
        <text x="67" y="154" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155" fontFamily="IBM Plex Mono">
          80 m
        </text>

        {/* Trajectory */}
        <path d="M 105 102 C 105 28, 155 28, 155 194" fill="none" stroke="#0284C7" strokeWidth="2" strokeDasharray="4 3" />
        <circle cx="105" cy="102" r="5" fill="#0F172A" />
        <line x1="105" y1="95" x2="105" y2="66" stroke="#0284C7" strokeWidth="2" markerEnd="url(#vt-arrow)" />
        <text x="115" y="76" fontSize="10" fontWeight="600" fill="#0284C7" fontFamily="IBM Plex Mono">V₀ = 30 m/s</text>

        {/* Top point */}
        <line x1="100" y1="45" x2="220" y2="45" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" />
        <text x="172" y="42" fontSize="10" fill="#475569" fontFamily="IBM Plex Mono">V_tepe = 0 (t=3 s)</text>
        <text x="172" y="78" fontSize="10" fill="#059669" fontFamily="IBM Plex Mono">h_ek = 45 m</text>
        <text x="172" y="132" fontSize="10" fill="#0F172A" fontFamily="IBM Plex Mono">H_top = 125 m</text>
        <text x="172" y="186" fontSize="10" fontWeight="600" fill="#DC2626" fontFamily="IBM Plex Mono">V_çarpma = 50 m/s</text>
      </svg>
    );
  }

  if (type === 'oblique-throw') {
    return (
      <svg
        viewBox="0 0 340 210"
        className="w-full max-w-sm h-auto bg-white border border-slate-200 rounded-lg"
        role="img"
        aria-label="45 m yükseklikten 30 derece açıyla 20 m/s hızla eğik atış diyagramı"
      >
        <line x1="20" y1="185" x2="320" y2="185" stroke="#334155" strokeWidth="2" />
        <rect x="35" y="95" width="45" height="90" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="1.5" />
        <text x="57" y="144" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155" fontFamily="IBM Plex Mono">
          45 m
        </text>
        <line x1="80" y1="95" x2="170" y2="95" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" />
        <path d="M 80 95 Q 145 35 265 184" fill="none" stroke="#0284C7" strokeWidth="2.2" />
        <circle cx="80" cy="95" r="4.5" fill="#0F172A" />
        <line x1="80" y1="95" x2="122" y2="66" stroke="#DC2626" strokeWidth="2" />
        <text x="115" y="62" fontSize="10" fontWeight="600" fill="#DC2626" fontFamily="IBM Plex Mono">V=20 m/s (30°)</text>
        <text x="150" y="42" fontSize="10" fill="#059669" fontFamily="IBM Plex Mono">H_max = 50 m</text>
        <text x="175" y="176" fontSize="10" fontWeight="600" fill="#0F172A" fontFamily="IBM Plex Mono">Menzil x = 56 m</text>
      </svg>
    );
  }

  if (type === 'river') {
    return (
      <svg
        viewBox="0 0 320 170"
        className="w-full max-w-sm h-auto bg-white border border-slate-200 rounded-lg"
        role="img"
        aria-label="Nehirde karşıya geçen kayık 3-4-5 hız üçgeni"
      >
        <defs>
          <marker id="rv-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#0284C7" />
          </marker>
        </defs>
        <rect x="20" y="34" width="280" height="102" fill="#F0F9FF" />
        <line x1="20" y1="34" x2="300" y2="34" stroke="#334155" strokeWidth="2" />
        <line x1="20" y1="136" x2="300" y2="136" stroke="#334155" strokeWidth="2" />
        <circle cx="95" cy="126" r="6" fill="#0F172A" />
        {/* Vk = 4 m/s */}
        <line x1="95" y1="120" x2="95" y2="55" stroke="#0284C7" strokeWidth="2" markerEnd="url(#rv-arrow)" />
        <text x="32" y="88" fontSize="10" fontWeight="600" fill="#0284C7" fontFamily="IBM Plex Mono">Vk = 4 m/s</text>
        {/* Vn = 3 m/s */}
        <line x1="101" y1="126" x2="175" y2="126" stroke="#475569" strokeWidth="2" markerEnd="url(#rv-arrow)" />
        <text x="122" y="118" fontSize="10" fontWeight="600" fill="#475569" fontFamily="IBM Plex Mono">Vn = 3 m/s</text>
        {/* Vb = 5 m/s */}
        <line x1="95" y1="126" x2="170" y2="40" stroke="#DC2626" strokeWidth="2.2" strokeDasharray="4 3" markerEnd="url(#rv-arrow)" />
        <text x="160" y="72" fontSize="10" fontWeight="600" fill="#DC2626" fontFamily="IBM Plex Mono">Vb = 5 m/s</text>
        <text x="296" y="26" textAnchor="end" fontSize="10" fill="#334155" fontFamily="IBM Plex Mono">Sürüklenme = 30 m</text>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 260 190"
      className="w-full max-w-xs h-auto bg-white border border-slate-200 rounded-lg"
      role="img"
      aria-label="Düşey düzlemde dairesel hareket saat 6 noktasında ip gerilmesi"
    >
      <circle cx="130" cy="86" r="56" fill="none" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="4 3" />
      <circle cx="130" cy="86" r="3" fill="#0F172A" />
      <line x1="130" y1="86" x2="130" y2="142" stroke="#0F172A" strokeWidth="2" />
      <circle cx="130" cy="142" r="6" fill="#0284C7" />
      <text x="136" y="115" fontSize="10" fill="#0F172A" fontFamily="IBM Plex Mono">T ↑</text>
      <text x="188" y="90" fontSize="10" fill="#64748B" fontFamily="IBM Plex Mono">Saat 3</text>
      <text x="122" y="160" fontSize="10" fontWeight="600" fill="#DC2626" fontFamily="IBM Plex Mono">
        G + Fmer = 910 N ↓
      </text>
    </svg>
  );
}
