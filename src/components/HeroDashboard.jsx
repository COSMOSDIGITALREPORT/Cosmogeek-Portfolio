import { motion, useReducedMotion, useTransform } from 'framer-motion'
import {
  Boxes,
  CheckCircle2,
  Code2,
  LayoutDashboard,
  Layers,
  Settings,
  Smartphone,
  Sprout,
  Sun,
  Users,
} from 'lucide-react'
import { PROJECTS_DATA } from '../data/projects'
import { DEVELOPMENT_STAGES } from '../data/technologies'
import './HeroDashboard.css'

const EASE = [0.22, 1, 0.36, 1]

// Real featured projects shown as previews (no invented metrics)
const PREVIEW_PROJECTS = ['pyb', 'sunplus-energy', 'digital-agro']
  .map((slug) => PROJECTS_DATA.find((p) => p.slug === slug))
  .filter(Boolean)

const PROJECT_ICONS = { pyb: Boxes, 'sunplus-energy': Sun, 'digital-agro': Sprout }

// Decorative chart shapes — illustrative only, no values are shown
const AREA_PATH = 'M0 70 C 30 62, 45 40, 75 44 S 120 22, 150 30 S 200 8, 240 14 L 240 90 L 0 90 Z'
const LINE_PATH = 'M0 70 C 30 62, 45 40, 75 44 S 120 22, 150 30 S 200 8, 240 14'
const BARS = [38, 56, 44, 70, 62, 84, 76]

// Deterministic particle field
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  left: (i * 37 + 11) % 100,
  top: (i * 53 + 7) % 100,
  size: 2 + (i % 3),
  delay: (i % 6) * 0.7,
  duration: 6 + (i % 5),
}))

function panelEntrance(reduceMotion, delay) {
  return {
    initial: { opacity: 0, y: reduceMotion ? 0 : 24, scale: reduceMotion ? 1 : 0.94 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.9, ease: EASE, delay: reduceMotion ? 0 : delay },
  }
}

/**
 * Floating glass software dashboard for the hero.
 * pointerX / pointerY are motion values in the range -0.5…0.5 supplied by the
 * hero section, so the whole scene responds to the cursor with parallax depth.
 */
export default function HeroDashboard({ pointerX, pointerY }) {
  const reduceMotion = useReducedMotion()

  const rotateX = useTransform(pointerY, [-0.5, 0.5], [7, -7])
  const rotateY = useTransform(pointerX, [-0.5, 0.5], [-9, 9])
  const nearX = useTransform(pointerX, (v) => v * 34)
  const nearY = useTransform(pointerY, (v) => v * 26)
  const farX = useTransform(pointerX, (v) => v * -18)
  const farY = useTransform(pointerY, (v) => v * -14)

  return (
    <div className="hd-scene" aria-hidden="true">
      {/* Ambient layer: orbit rings, light trails, particles */}
      <motion.div className="hd-ambient" style={{ x: farX, y: farY }}>
        <svg className="hd-orbits" viewBox="0 0 600 520">
          <defs>
            <linearGradient id="hd-orbit" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#45d6a0" stopOpacity="0" />
              <stop offset="50%" stopColor="#45d6a0" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#dff8ef" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g className="hd-orbit hd-orbit--a">
            <ellipse cx="300" cy="270" rx="280" ry="96" />
            <circle className="hd-comet" cx="580" cy="270" r="4" />
          </g>
          <g className="hd-orbit hd-orbit--b">
            <ellipse cx="300" cy="270" rx="230" ry="150" />
            <circle className="hd-comet" cx="300" cy="120" r="3" />
          </g>
          <path className="hd-trail" d="M-20 420 C 140 360, 260 470, 620 300" />
          <path className="hd-trail hd-trail--2" d="M-20 140 C 160 60, 360 180, 620 70" />
        </svg>
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="hd-particle"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </motion.div>

      {/* Tilting stage that follows the cursor */}
      <motion.div className="hd-stage" style={{ rotateX, rotateY, transformPerspective: 1200 }}>
        {/* Main dashboard window */}
        <motion.div className="hd-panel hd-main" {...panelEntrance(reduceMotion, 0.9)}>
          <div className="hd-titlebar">
            <span className="hd-dots"><i /><i /><i /></span>
            <span className="hd-url">cosmogeek / delivery-overview</span>
            <span className="hd-live"><i />Live</span>
          </div>
          <div className="hd-main-body">
            <nav className="hd-sidebar">
              <LayoutDashboard />
              <Layers />
              <Code2 />
              <Users />
              <Settings />
            </nav>
            <div className="hd-content">
              <div className="hd-row">
                <div className="hd-card hd-chart">
                  <span className="hd-label">Project Activity</span>
                  <svg viewBox="0 0 240 90" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="hd-area" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#45d6a0" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#45d6a0" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d={AREA_PATH} fill="url(#hd-area)" />
                    <motion.path
                      d={LINE_PATH}
                      fill="none"
                      stroke="#45d6a0"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      initial={{ pathLength: reduceMotion ? 1 : 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.6, ease: EASE, delay: reduceMotion ? 0 : 1.3 }}
                    />
                  </svg>
                </div>
                <div className="hd-card hd-bars">
                  <span className="hd-label">Sprints</span>
                  <div className="hd-bar-row">
                    {BARS.map((h, i) => (
                      <motion.span
                        key={i}
                        style={{ height: `${h}%` }}
                        initial={{ scaleY: reduceMotion ? 1 : 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 0.7, ease: EASE, delay: reduceMotion ? 0 : 1.4 + i * 0.07 }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="hd-card hd-pipeline">
                <span className="hd-label">Delivery Pipeline</span>
                <div className="hd-track">
                  <motion.span
                    className="hd-track-fill"
                    initial={{ scaleX: reduceMotion ? 0.78 : 0 }}
                    animate={{ scaleX: 0.78 }}
                    transition={{ duration: 1.8, ease: EASE, delay: reduceMotion ? 0 : 1.6 }}
                  />
                </div>
                <ol className="hd-stages">
                  {DEVELOPMENT_STAGES.map((stage, i) => (
                    <li key={stage.step} className={i < 4 ? 'is-done' : ''}>
                      <i />
                      {stage.title.split(' ')[0]}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Project previews — floating nearer the viewer */}
        <motion.div className="hd-float hd-float--projects" style={{ x: nearX, y: nearY }}>
          <motion.div className="hd-panel hd-projects" {...panelEntrance(reduceMotion, 1.15)}>
            <span className="hd-label">Featured Projects</span>
            <ul>
              {PREVIEW_PROJECTS.map((project) => {
                const Icon = PROJECT_ICONS[project.slug] || Smartphone
                return (
                  <li key={project.slug}>
                    <span className="hd-project-icon"><Icon /></span>
                    <span className="hd-project-text">
                      <strong>{project.title}</strong>
                      <small>{project.category}</small>
                    </span>
                    <span className="hd-badge">{project.technologies[0]}</span>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        </motion.div>

        {/* Code panel */}
        <motion.div className="hd-float hd-float--code" style={{ x: nearX, y: nearY }}>
          <motion.div className="hd-panel hd-code" {...panelEntrance(reduceMotion, 1.3)}>
            <span className="hd-label">deploy.js</span>
            <pre>
              <code>
                <span className="t-k">const</span> app = <span className="t-f">build</span>({'{'}{'\n'}
                {'  '}stack: <span className="t-s">&apos;react&apos;</span>,{'\n'}
                {'  '}scale: <span className="t-s">&apos;auto&apos;</span>,{'\n'}
                {'}'}){'\n'}
                <span className="t-k">await</span> <span className="t-f">launch</span>(app)
              </code>
            </pre>
          </motion.div>
        </motion.div>

        {/* Status toast */}
        <motion.div className="hd-float hd-float--toast" style={{ x: nearX, y: nearY }}>
          <motion.div className="hd-panel hd-toast" {...panelEntrance(reduceMotion, 1.5)}>
            <CheckCircle2 />
            <span>
              <strong>Build ready</strong>
              <small>Tested &amp; deployed</small>
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
