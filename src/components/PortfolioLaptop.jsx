import { useCallback } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { Brain, Cloud, Code2, Smartphone, Sparkles } from 'lucide-react'

const globeDots = Array.from({ length: 340 }, (_, index) => {
  const y = 1 - (index / 339) * 2
  const radius = Math.sqrt(1 - y * y)
  const angle = index * Math.PI * (3 - Math.sqrt(5))
  const x = Math.cos(angle) * radius
  const z = Math.sin(angle) * radius
  return {
    cx: 200 + x * 164,
    cy: 145 + y * 120,
    opacity: Math.max(0.12, (z + 1) / 2),
    size: z > -0.1 ? 1.2 + (z + 1) * 0.75 : 0.9,
    key: index,
  }
})

const serviceCards = [
  { className: 'portfolio-card-ai', icon: Brain, title: 'AI & Automation', note: 'Smarter Solutions', delay: 0 },
  { className: 'portfolio-card-web', icon: Code2, title: 'Web Development', note: 'Modern & Scalable', delay: 0.8 },
  { className: 'portfolio-card-mobile', icon: Smartphone, title: 'Mobile Apps', note: 'iOS & Android', delay: 1.4 },
  { className: 'portfolio-card-cloud', icon: Cloud, title: 'Cloud Solutions', note: 'Secure & Scalable', delay: 2 },
]

export default function PortfolioLaptop({ reducedMotion: pageReducedMotion }) {
  const systemReducedMotion = useReducedMotion()
  const reduceMotion = pageReducedMotion || systemReducedMotion
  const tiltX = useSpring(useMotionValue(0), { stiffness: 90, damping: 20, mass: 0.45 })
  const tiltY = useSpring(useMotionValue(0), { stiffness: 90, damping: 20, mass: 0.45 })

  const handlePointerMove = useCallback((event) => {
    if (reduceMotion || event.pointerType !== 'mouse') return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    tiltX.set(-y * 5)
    tiltY.set(x * 7)
  }, [reduceMotion, tiltX, tiltY])

  const resetTilt = useCallback(() => {
    tiltX.set(0)
    tiltY.set(0)
  }, [tiltX, tiltY])

  return (
    <motion.div
      className="portfolio-visual"
      initial={{ opacity: 0, x: reduceMotion ? 0 : 35, scale: reduceMotion ? 1 : 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: reduceMotion ? 0 : 0.2 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      aria-label="Silver laptop with software interface, orbital rings, digital globe, and service cards"
      role="img"
    >
      <div className="portfolio-orbit portfolio-orbit-one" />
      <div className="portfolio-orbit portfolio-orbit-two" />
      <svg className="portfolio-digital-globe" viewBox="0 0 400 300" aria-hidden="true">
        <defs>
          <radialGradient id="portfolio-globe-glow"><stop stopColor="#168BFF" stopOpacity=".38" /><stop offset="1" stopColor="#168BFF" stopOpacity="0" /></radialGradient>
        </defs>
        <ellipse cx="200" cy="145" rx="178" ry="132" fill="url(#portfolio-globe-glow)" />
        <ellipse cx="200" cy="145" rx="164" ry="120" fill="none" stroke="#258BFF" strokeOpacity=".38" strokeDasharray="2 7" />
        <ellipse cx="200" cy="145" rx="164" ry="53" fill="none" stroke="#39BDF8" strokeOpacity=".28" />
        <ellipse cx="200" cy="145" rx="105" ry="120" fill="none" stroke="#7C5CFF" strokeOpacity=".24" />
        {globeDots.map((dot) => (
          <circle key={dot.key} cx={dot.cx} cy={dot.cy} r={dot.size} fill="#83F0C2" opacity={dot.opacity} className="portfolio-globe-dot" />
        ))}
        <path d="M57 162 119 111l53 13 50-42 62 23 54-36M70 205l59-31 48 18 59-35 58 18 42-29" fill="none" stroke="#318BFF" strokeWidth="1" strokeOpacity=".42" />
        {[ [119,111], [222,82], [284,105], [177,192], [294,175], [338,140] ].map(([cx, cy], index) => (
          <circle key={`node-${index}`} cx={cx} cy={cy} r="2.4" fill="#A5F3FC" className="portfolio-globe-node" />
        ))}
      </svg>
      <div className="portfolio-particles" aria-hidden="true" />
      <div className="portfolio-rock" aria-hidden="true" />

      <motion.div
        className="portfolio-laptop-wrap"
        style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1200 }}
        animate={reduceMotion ? undefined : { y: [0, -7, 0] }}
        transition={{ y: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }}
      >
        <div className="portfolio-laptop">
          <div className="portfolio-screen">
            <div className="portfolio-screen-top"><span /><span /><span /><i>cosmogeek.app</i></div>
            <div className="portfolio-screen-body">
              <div className="portfolio-code-lines" aria-hidden="true">
                <b /><b /><b /><b /><b /><b /><b /><b /><b /><b />
                <small>import &#123; createApp &#125; from '@cosmogeek/core';</small>
              </div>
              <div className="portfolio-screen-panel">
                <Sparkles />
                <strong>Build<br />Innovate<br />Scale</strong>
                <div className="portfolio-chart"><i /><i /><i /><i /><i /></div>
              </div>
            </div>
          </div>
          <div className="portfolio-laptop-base">
            <div className="portfolio-keyboard" aria-hidden="true">
              {Array.from({ length: 4 }, (_, row) => <div className="portfolio-key-row" key={row}>{Array.from({ length: row === 3 ? 10 : 14 }, (_, key) => <i key={key} />)}</div>)}
            </div>
            <div className="portfolio-trackpad" />
            <span className="portfolio-base-notch" />
          </div>
        </div>
      </motion.div>

      {serviceCards.map((card) => (
        <FloatingServiceCard key={card.className} {...card} reducedMotion={reduceMotion} />
      ))}
    </motion.div>
  )
}

function FloatingServiceCard({ className, icon: Icon, title, note, delay, reducedMotion }) {
  return (
    <motion.div
      className={`portfolio-glass-card ${className}`}
      animate={reducedMotion ? undefined : { y: [0, -9, 0], rotate: [0, -1, 0] }}
      transition={{ duration: 4.5, delay, repeat: Infinity, ease: 'easeInOut' }}
      whileHover={{ scale: 1.06, y: -5 }}
    >
      <span className="portfolio-card-icon"><Icon /></span>
      <span><strong>{title}</strong><small>{note}</small></span>
    </motion.div>
  )
}
