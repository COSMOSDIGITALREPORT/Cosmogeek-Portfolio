import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { ArrowRight, CodeXml, PenTool, Rocket, Search, Settings } from 'lucide-react'
import { DEVELOPMENT_STAGES } from '../data/technologies'
import useTilt from '../hooks/useTilt'
import './DevelopmentProcess.css'

const STAGE_ICONS = [Search, PenTool, CodeXml, Rocket, Settings]
const EASE = [0.22, 1, 0.36, 1]

function StageCard({ stage, index, isLast, reduceMotion }) {
  const { ref: tiltRef, style: tiltStyle, handlers: tiltHandlers } = useTilt({ max: 4, reduceMotion })
  const Icon = STAGE_ICONS[index] || CodeXml
  const delay = reduceMotion ? 0 : index * 0.13

  return (
    <motion.li
      className="process-step"
      initial={{ opacity: 0, y: reduceMotion ? 0 : 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.75, ease: EASE, delay }}
    >
      {/* Timeline node (vertical layout only) */}
      <span className="process-node" aria-hidden="true">
        {stage.step}
      </span>

      <motion.article
        ref={tiltRef}
        className="process-card"
        style={tiltStyle}
        {...tiltHandlers}
        aria-labelledby={`process-stage-${stage.step}`}
      >
        <span className="process-card-glow" aria-hidden="true" />

        <div className="process-card-top">
          <span className="process-icon" aria-hidden="true">
            <Icon strokeWidth={1.9} />
          </span>
          <span className="process-number" aria-hidden="true">
            {stage.step}
          </span>
        </div>

        <p className="process-subtitle">{stage.subtitle}</p>
        <h3 id={`process-stage-${stage.step}`} className="process-title">
          Stage {stage.step} —{' '}
          <br />
          <span className="process-title-accent">{stage.title}</span>
        </h3>
        <p className="process-desc">{stage.description}</p>

        <div className="process-card-footer">
          <span className="process-status">{stage.status}</span>
          <span className="process-card-arrow" aria-hidden="true">
            <ArrowRight />
          </span>
        </div>
      </motion.article>

      {/* Connector arrow to the next stage (horizontal layout only) */}
      {!isLast && (
        <motion.span
          className="process-connector"
          aria-hidden="true"
          initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.4 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE, delay: reduceMotion ? 0 : delay + 0.45 }}
        >
          <ArrowRight />
        </motion.span>
      )}
    </motion.li>
  )
}

export default function DevelopmentProcess() {
  const reduceMotion = useReducedMotion()
  const flowRef = useRef(null)
  // Workflow line fills progressively as the visitor scrolls through the stages
  const { scrollYProgress } = useScroll({ target: flowRef, offset: ['start 75%', 'end 55%'] })
  const lineProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })

  const header = {
    hidden: {},
    visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.12 } },
  }

  const reveal = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  }

  return (
    <section id="process" className="process-section" aria-labelledby="process-heading">
      <div className="process-bg" aria-hidden="true">
        <span className="process-glow process-glow--left" />
        <span className="process-glow process-glow--right" />
        <span className="process-grid-bg" />
        <svg className="process-trails" viewBox="0 0 1440 640" preserveAspectRatio="none">
          <defs>
            <linearGradient id="process-trail" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#31c48d" stopOpacity="0" />
              <stop offset="50%" stopColor="#35c18e" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#45d6a0" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path className="process-trail" d="M-20 300 C 120 220, 250 120, 330 -20" />
          <path className="process-trail process-trail--2" d="M1100 300 C 1250 220, 1360 130, 1460 40" />
          <path className="process-trail process-trail--3" d="M1240 640 C 1330 560, 1400 500, 1460 470" />
        </svg>
        <motion.span
          className="process-cube process-cube--left"
          animate={reduceMotion ? undefined : { y: [0, -14, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.span
          className="process-cube process-cube--right"
          animate={reduceMotion ? undefined : { y: [0, -12, 0], rotate: [0, -12, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        />
      </div>

      <div className="process-container">
        <motion.header
          className="process-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={header}
        >
          <motion.div variants={reveal} className="process-eyebrow-row">
            <span className="process-eyebrow-line" aria-hidden="true" />
            <span className="process-eyebrow">
              <span className="process-eyebrow-dot" aria-hidden="true" />
              How We Work
            </span>
            <span className="process-eyebrow-line process-eyebrow-line--right" aria-hidden="true" />
          </motion.div>
          <motion.h2 variants={reveal} id="process-heading" className="process-heading">
            From First Idea to <span className="process-heading-gradient">Final Launch.</span>
          </motion.h2>
          <motion.p variants={reveal} className="process-subheading">
            A structured development process helps keep requirements, implementation and delivery aligned.
          </motion.p>
        </motion.header>

        <div className="process-flow" ref={flowRef}>
          {/* Vertical workflow line (stacked layout) and horizontal line (row layout) */}
          <span className="process-line process-line--base" aria-hidden="true" />
          <motion.span
            className="process-line"
            aria-hidden="true"
            style={{ scaleY: reduceMotion ? 1 : lineProgress }}
          />
          <span className="process-hline process-hline--base" aria-hidden="true" />
          <motion.span
            className="process-hline"
            aria-hidden="true"
            style={{ scaleX: reduceMotion ? 1 : lineProgress }}
          />
          <ol className="process-steps">
            {DEVELOPMENT_STAGES.map((stage, index) => (
              <StageCard
                key={stage.step}
                stage={stage}
                index={index}
                isLast={index === DEVELOPMENT_STAGES.length - 1}
                reduceMotion={reduceMotion}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
