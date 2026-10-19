// Futuristic, hand-built SVG illustrations for each service card.
// Each visual uses prefixed gradient IDs so they never collide on the page.

const BLUE = '#31C48D'
const VIOLET = '#45D6A0'
const CYAN = '#83F0C2'

function Defs({ id }) {
  return (
    <defs>
      <linearGradient id={`${id}-bv`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={CYAN} />
        <stop offset="50%" stopColor={BLUE} />
        <stop offset="100%" stopColor={VIOLET} />
      </linearGradient>
      <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1E2A4D" stopOpacity="0.95" />
        <stop offset="100%" stopColor="#071B17" stopOpacity="0.95" />
      </linearGradient>
      <linearGradient id={`${id}-bar`} x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor={BLUE} stopOpacity="0.35" />
        <stop offset="100%" stopColor="#7EE8C0" />
      </linearGradient>
      <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={VIOLET} stopOpacity="0.55" />
        <stop offset="60%" stopColor={BLUE} stopOpacity="0.15" />
        <stop offset="100%" stopColor={BLUE} stopOpacity="0" />
      </radialGradient>
      <filter id={`${id}-blur`} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" />
      </filter>
    </defs>
  )
}

/* 01 — Laptop with live code + charts */
export function WebVisual() {
  const id = 'sv-web'
  return (
    <svg viewBox="0 0 220 180" aria-hidden="true">
      <Defs id={id} />
      <ellipse cx="120" cy="100" rx="95" ry="70" fill={`url(#${id}-glow)`} />
      {/* back window */}
      <g className="sv-float-slow" opacity="0.7">
        <rect x="128" y="8" width="78" height="52" rx="6" fill={`url(#${id}-glass)`} stroke={`url(#${id}-bv)`} strokeOpacity="0.6" />
        <circle cx="146" cy="30" r="10" fill="none" stroke={CYAN} strokeWidth="3" strokeDasharray="40 30" />
        <rect x="162" y="22" width="34" height="3" rx="1.5" fill="#6F8C82" />
        <rect x="162" y="30" width="24" height="3" rx="1.5" fill="#31594D" />
        <rect x="136" y="46" width="60" height="3" rx="1.5" fill={VIOLET} opacity="0.7" />
      </g>
      {/* screen */}
      <g transform="translate(30 40) skewY(-6)">
        <rect x="0" y="0" width="150" height="96" rx="7" fill="#0A231C" stroke={`url(#${id}-bv)`} strokeWidth="1.5" />
        <rect x="6" y="6" width="138" height="84" rx="4" fill={`url(#${id}-glass)`} />
        <rect x="6" y="6" width="34" height="84" fill="#123a30" />
        {[14, 24, 34, 44, 54].map((y, i) => (
          <rect key={y} x="11" y={y} width={i % 2 ? 16 : 22} height="3" rx="1.5" fill={i === 1 ? VIOLET : '#24483E'} />
        ))}
        {[14, 22, 30, 38, 46, 54].map((y, i) => (
          <g key={y}>
            <rect x="46" y={y} width={[14, 10, 18, 8, 12, 16][i]} height="3" rx="1.5" fill={[VIOLET, CYAN, BLUE, VIOLET, CYAN, BLUE][i]} />
            <rect x={64 + [0, -4, 4, -6, 0, 2][i]} y={y} width={[40, 52, 30, 46, 36, 24][i]} height="3" rx="1.5" fill="#31594D" />
          </g>
        ))}
        {[18, 26, 14, 30, 22, 34].map((h, i) => (
          <rect key={i} className="sv-bar" style={{ animationDelay: `${i * 0.15}s` }} x={100 + i * 7} y={84 - h} width="4.5" height={h} rx="1" fill={`url(#${id}-bar)`} />
        ))}
      </g>
      {/* keyboard base */}
      <path d="M18 146 L184 128 L206 142 L40 162 Z" fill="#12352C" stroke={`url(#${id}-bv)`} strokeOpacity="0.7" />
      <path d="M40 162 L206 142 L206 146 L40 167 Z" fill="#0A231C" />
      <path d="M92 150 L132 145.5 L138 149 L98 154 Z" fill="#163B32" />
      <path d="M30 147 L188 129" stroke={CYAN} strokeOpacity="0.5" strokeWidth="0.8" />
    </svg>
  )
}

/* 02 — Pair of floating smartphones */
export function MobileVisual() {
  const id = 'sv-mob'
  const phone = (w, h, extra) => (
    <>
      <rect x="0" y="0" width={w} height={h} rx="14" fill="#0A231C" stroke={`url(#${id}-bv)`} strokeWidth="1.8" />
      <rect x="4" y="4" width={w - 8} height={h - 8} rx="11" fill={`url(#${id}-screen)`} />
      <rect x={w / 2 - 10} y="8" width="20" height="5" rx="2.5" fill="#05070F" />
      {extra}
    </>
  )
  return (
    <svg viewBox="0 0 220 180" aria-hidden="true">
      <Defs id={id} />
      <defs>
        <linearGradient id={`${id}-screen`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0F3D31" />
          <stop offset="55%" stopColor="#14503E" />
          <stop offset="100%" stopColor="#071B17" />
        </linearGradient>
      </defs>
      <ellipse cx="120" cy="95" rx="90" ry="75" fill={`url(#${id}-glow)`} />
      <g className="sv-float-slow">
        <g transform="translate(62 18) rotate(-14)">
          {phone(62, 128, (
            <>
              <path d="M8 90 Q30 50 54 70 L54 118 L8 118 Z" fill={VIOLET} opacity="0.35" />
              {[30, 40, 50].map((y) => <rect key={y} x="12" y={y} width={y === 30 ? 30 : 38} height="4" rx="2" fill="#9CB8AE" opacity="0.35" />)}
            </>
          ))}
        </g>
      </g>
      <g className="sv-float">
        <g transform="translate(118 30) rotate(10)">
          {phone(64, 132, (
            <>
              <path d="M6 70 Q24 40 40 64 T60 50 L60 126 L6 126 Z" fill={`url(#${id}-bv)`} opacity="0.55" />
              <circle cx="32" cy="38" r="11" fill="none" stroke={CYAN} strokeWidth="2.5" strokeDasharray="44 30" />
              {[96, 104, 112].map((y, i) => <rect key={y} x="12" y={y} width={[40, 28, 34][i]} height="3.5" rx="1.75" fill="#DFF8EF" opacity="0.5" />)}
            </>
          ))}
        </g>
      </g>
      <ellipse cx="128" cy="170" rx="64" ry="5" fill={BLUE} opacity="0.25" filter={`url(#${id}-blur)`} />
    </svg>
  )
}

/* 03 — Isometric AI processor with circuit traces */
export function AIVisual() {
  const id = 'sv-ai'
  return (
    <svg viewBox="0 0 220 180" aria-hidden="true">
      <Defs id={id} />
      <ellipse cx="118" cy="92" rx="95" ry="72" fill={`url(#${id}-glow)`} />
      {/* circuit traces */}
      <g stroke={`url(#${id}-bv)`} strokeWidth="1.2" fill="none" opacity="0.7">
        <path className="sv-trace" d="M20 120 L60 120 L78 108" />
        <path className="sv-trace" d="M200 60 L170 60 L152 72" style={{ animationDelay: '0.6s' }} />
        <path className="sv-trace" d="M190 140 L160 140 L148 126" style={{ animationDelay: '1.2s' }} />
        <path className="sv-trace" d="M40 40 L72 40 L88 58" style={{ animationDelay: '1.8s' }} />
      </g>
      {[[20, 120], [200, 60], [190, 140], [40, 40]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="2.5" fill={CYAN} />
      ))}
      <g className="sv-float">
        {/* chip side (depth) */}
        <path d="M60 92 L118 122 L118 132 L60 102 Z" fill="#0F3D31" />
        <path d="M118 122 L176 92 L176 102 L118 132 Z" fill="#0c3328" />
        {/* chip top */}
        <path d="M60 92 L118 62 L176 92 L118 122 Z" fill="#0A231C" stroke={`url(#${id}-bv)`} strokeWidth="2" />
        <path d="M78 92 L118 71 L158 92 L118 113 Z" fill={`url(#${id}-bv)`} opacity="0.22" />
        <path d="M78 92 L118 71 L158 92 L118 113 Z" fill="none" stroke={CYAN} strokeWidth="1" className="sv-pulse" />
        <text x="118" y="98" textAnchor="middle" fontSize="19" fontWeight="800" fill="#DFF8EF" transform="rotate(-27 118 92) skewX(20)" fontFamily="Inter, sans-serif">
          AI
        </text>
        {/* pins */}
        {Array.from({ length: 6 }).map((_, i) => (
          <g key={i} fill="#6F8C82">
            <rect x={66 + i * 8.5} y={99 + i * 4.3} width="3" height="7" />
            <rect x={122 + i * 8.5} y={119 - i * 4.3} width="3" height="7" />
          </g>
        ))}
      </g>
    </svg>
  )
}

/* 04 — Cloud with upload arrow over glowing server stacks */
export function CloudVisual() {
  const id = 'sv-cloud'
  return (
    <svg viewBox="0 0 220 180" aria-hidden="true">
      <Defs id={id} />
      <ellipse cx="120" cy="100" rx="92" ry="70" fill={`url(#${id}-glow)`} />
      {/* server towers */}
      {[[36, 40, 70], [178, 30, 90], [152, 56, 50]].map(([x, y, h], i) => (
        <g key={i} opacity="0.75">
          <rect x={x} y={y} width="22" height={h} rx="3" fill={`url(#${id}-glass)`} stroke={BLUE} strokeOpacity="0.5" />
          {Array.from({ length: Math.floor(h / 12) }).map((_, j) => (
            <rect key={j} x={x + 4} y={y + 6 + j * 12} width="14" height="3" rx="1.5" fill={j % 2 ? VIOLET : CYAN} opacity="0.7" className="sv-blink" style={{ animationDelay: `${(i + j) * 0.3}s` }} />
          ))}
        </g>
      ))}
      {/* platform */}
      <ellipse cx="112" cy="150" rx="70" ry="14" fill="#123A30" stroke={`url(#${id}-bv)`} strokeWidth="1.5" />
      <ellipse cx="112" cy="146" rx="52" ry="9" fill="none" stroke={CYAN} strokeOpacity="0.6" className="sv-pulse" />
      <g className="sv-float">
        <path
          d="M70 118 a24 24 0 0 1 6 -47 a32 32 0 0 1 60 -10 a24 24 0 0 1 22 46 a14 14 0 0 1 -6 11 Z"
          fill={`url(#${id}-glass)`}
          stroke={`url(#${id}-bv)`}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path d="M80 112 a18 18 0 0 1 4 -34" fill="none" stroke="#DFF8EF" strokeOpacity="0.25" strokeWidth="2" strokeLinecap="round" />
        <path d="M112 112 L112 80 M100 92 L112 79 L124 92" fill="none" stroke="#DFF8EF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  )
}

/* 05 — Layered code editor windows */
export function CodeVisual() {
  const id = 'sv-code'
  const win = (w, h, rows) => (
    <>
      <rect x="0" y="0" width={w} height={h} rx="7" fill={`url(#${id}-glass)`} stroke={`url(#${id}-bv)`} strokeWidth="1.3" />
      <circle cx="9" cy="8" r="2" fill="#7EE8C0" />
      <circle cx="16" cy="8" r="2" fill="#FBBF24" />
      <circle cx="23" cy="8" r="2" fill="#34D399" />
      {rows.map(([indent, len, color], i) => (
        <rect key={i} x={8 + indent} y={18 + i * 8} width={len} height="3" rx="1.5" fill={color} />
      ))}
    </>
  )
  return (
    <svg viewBox="0 0 220 180" aria-hidden="true">
      <Defs id={id} />
      <ellipse cx="125" cy="92" rx="90" ry="72" fill={`url(#${id}-glow)`} />
      <g className="sv-float-slow" opacity="0.55">
        <g transform="translate(118 8) skewY(-8)">
          {win(90, 70, [[0, 40, VIOLET], [8, 56, '#31594D'], [8, 40, CYAN], [16, 44, '#31594D'], [8, 30, BLUE], [0, 20, VIOLET]])}
        </g>
      </g>
      <g className="sv-float">
        <g transform="translate(36 52) skewY(-8)">
          {win(120, 92, [[0, 36, VIOLET], [10, 70, '#6F8C82'], [10, 50, CYAN], [20, 60, '#6F8C82'], [20, 38, BLUE], [10, 66, '#6F8C82'], [0, 26, VIOLET], [0, 46, '#31594D']])}
        </g>
      </g>
      <g className="sv-float-slow" style={{ animationDelay: '1s' }}>
        <g transform="translate(140 98) skewY(-8)">
          <rect x="0" y="0" width="62" height="44" rx="7" fill="#0A231C" stroke={CYAN} strokeOpacity="0.6" />
          <path d="M22 14 L13 22 L22 30 M40 14 L49 22 L40 30 M34 11 L28 33" stroke="#DFF8EF" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
    </svg>
  )
}

/* 06 — Rising bar chart with growth arrow */
export function MarketingVisual() {
  const id = 'sv-mkt'
  const bars = [30, 46, 62, 84, 108]
  return (
    <svg viewBox="0 0 220 180" aria-hidden="true">
      <Defs id={id} />
      <ellipse cx="130" cy="100" rx="88" ry="70" fill={`url(#${id}-glow)`} />
      <path d="M40 160 L200 146 L212 154 L52 170 Z" fill="#123A30" stroke={`url(#${id}-bv)`} strokeOpacity="0.6" />
      {bars.map((h, i) => {
        const x = 60 + i * 28
        const base = 160 - i * 2.6
        return (
          <g key={i} className="sv-rise" style={{ animationDelay: `${i * 0.12}s` }}>
            <rect x={x} y={base - h} width="18" height={h} rx="2" fill={`url(#${id}-bar)`} stroke={CYAN} strokeOpacity="0.35" />
            <rect x={x + 18} y={base - h + 3} width="6" height={h - 3} fill={VIOLET} opacity="0.35" />
            <rect x={x} y={base - h} width="18" height="3" fill="#DFF8EF" opacity="0.6" />
          </g>
        )
      })}
      <g className="sv-float">
        <path d="M30 124 Q80 114 108 80 T178 26" fill="none" stroke={`url(#${id}-bv)`} strokeWidth="5" strokeLinecap="round" pathLength="100" className="sv-draw" />
        <path d="M163 23 L181 22 L179 40" fill="none" stroke="#B8F2DA" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  )
}

/* 07 — Analytics dashboard panels with bars and donut */
export function DataVisual() {
  const id = 'sv-data'
  const bars = [16, 26, 20, 34, 28, 40, 30]
  return (
    <svg viewBox="0 0 220 180" aria-hidden="true">
      <Defs id={id} />
      <ellipse cx="125" cy="92" rx="92" ry="72" fill={`url(#${id}-glow)`} />
      <g className="sv-float-slow">
        <g transform="translate(20 22) skewY(-6)">
          <rect width="100" height="70" rx="6" fill={`url(#${id}-glass)`} stroke={`url(#${id}-bv)`} />
          <rect x="8" y="8" width="34" height="3" rx="1.5" fill="#6F8C82" />
          {bars.map((h, i) => (
            <rect key={i} className="sv-bar" style={{ animationDelay: `${i * 0.1}s` }} x={10 + i * 12} y={62 - h} width="7" height={h} rx="1" fill={`url(#${id}-bar)`} />
          ))}
        </g>
      </g>
      <g className="sv-float">
        <g transform="translate(130 30) skewY(-6)">
          <rect width="72" height="74" rx="6" fill={`url(#${id}-glass)`} stroke={`url(#${id}-bv)`} />
          <circle cx="36" cy="38" r="20" fill="none" stroke="#163B32" strokeWidth="9" />
          <circle cx="36" cy="38" r="20" fill="none" stroke={`url(#${id}-bv)`} strokeWidth="9" strokeDasharray="88 126" transform="rotate(-90 36 38)" className="sv-spin-dash" />
          <circle cx="36" cy="38" r="20" fill="none" stroke={CYAN} strokeWidth="9" strokeDasharray="20 126" strokeDashoffset="-92" transform="rotate(-90 36 38)" />
        </g>
      </g>
      <g className="sv-float-slow" style={{ animationDelay: '1.4s' }}>
        <g transform="translate(64 108) skewY(-6)">
          <rect width="104" height="52" rx="6" fill={`url(#${id}-glass)`} stroke={CYAN} strokeOpacity="0.5" />
          <polyline points="8,40 22,30 36,34 50,20 64,26 78,12 96,16" fill="none" stroke={`url(#${id}-bv)`} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
          {[22, 50, 78].map((x, i) => <circle key={x} cx={x} cy={[30, 20, 12][i]} r="2.5" fill="#DFF8EF" />)}
        </g>
      </g>
    </svg>
  )
}

/* 08 — Shield with checkmark on a glowing pedestal */
export function ShieldVisual() {
  const id = 'sv-shield'
  return (
    <svg viewBox="0 0 220 180" aria-hidden="true">
      <Defs id={id} />
      <ellipse cx="118" cy="96" rx="90" ry="74" fill={`url(#${id}-glow)`} />
      {/* pedestal */}
      <ellipse cx="118" cy="156" rx="64" ry="14" fill="#123A30" stroke={`url(#${id}-bv)`} strokeWidth="1.5" />
      <ellipse cx="118" cy="152" rx="48" ry="9" fill="none" stroke={CYAN} strokeOpacity="0.7" className="sv-pulse" />
      <ellipse cx="118" cy="150" rx="36" ry="6" fill={BLUE} opacity="0.5" filter={`url(#${id}-blur)`} />
      <g className="sv-float">
        <path
          d="M118 18 L166 36 L166 78 C166 110 146 130 118 142 C90 130 70 110 70 78 L70 36 Z"
          fill={`url(#${id}-glass)`}
          stroke={`url(#${id}-bv)`}
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M118 32 L154 46 L154 78 C154 102 140 118 118 128 C96 118 82 102 82 78 L82 46 Z"
          fill={`url(#${id}-bv)`}
          opacity="0.25"
        />
        <path d="M98 80 L113 95 L140 66" fill="none" stroke="#DFF8EF" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  )
}
