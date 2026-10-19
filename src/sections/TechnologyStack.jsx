import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Settings, ShieldCheck, Users, Zap } from 'lucide-react'
import FeatureStrip from '../components/FeatureStrip'
import DirectionalTrack from '../components/motion/DirectionalTrack'
import useTilt from '../hooks/useTilt'
import { TECH_FILTERS, TECH_STACK } from './techstack/techStackData'
import './TechnologyStack.css'

const HIGHLIGHTS = [
  { icon: Settings, title: 'Modern Technologies', text: 'Always up-to-date' },
  { icon: Zap, title: 'Scalable Architecture', text: 'For future growth' },
  { icon: ShieldCheck, title: 'Secure & Reliable', text: 'Best industry practices' },
  { icon: Users, title: 'Experienced Team', text: 'Skilled in multiple technologies' },
]

const EASE = [0.22, 1, 0.36, 1]

function TechLogo({ logo }) {
  if (logo.src) {
    return <img src={logo.src} alt="" loading="lazy" decoding="async" draggable="false" />
  }
  if (logo.svg) {
    // Trusted, build-time SVG markup from the devicon package
    return <span className="tech-logo-raw" dangerouslySetInnerHTML={{ __html: logo.svg }} />
  }
  if (logo.lucide) {
    const Icon = logo.lucide
    return <Icon className="tech-logo-lucide" strokeWidth={1.8} />
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={logo.path} fill={logo.color} />
    </svg>
  )
}

function TechCard({ category, index, reduceMotion, as = 'div' }) {
  const { ref: tiltRef, style: tiltStyle, handlers: tiltHandlers } = useTilt({ max: 4, reduceMotion })
  const Icon = category.icon
  const Wrapper = as === 'li' ? motion.li : motion.div

  const cardVariants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 30, scale: reduceMotion ? 1 : 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: EASE,
        delay: reduceMotion ? 0 : Math.min(index, 4) * 0.08,
      },
    },
  }

  // Tiles pop in one by one once the card has started entering
  const gridVariants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: reduceMotion ? 0 : 0.25 + (index % 4) * 0.09,
        staggerChildren: reduceMotion ? 0 : 0.045,
      },
    },
  }

  const tileVariants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 14, scale: reduceMotion ? 1 : 0.85 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: EASE } },
  }

  return (
    <Wrapper
      layout={!reduceMotion && as !== 'li'}
      className="tech-card-wrap"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.article
        ref={tiltRef}
        className="tech-card"
        style={tiltStyle}
        {...tiltHandlers}
        aria-labelledby={`tech-${category.id}`}
      >
        <span className="tech-card-glow" aria-hidden="true" />

        <header className="tech-card-head">
          <span className="tech-card-icon" aria-hidden="true">
            <Icon strokeWidth={1.8} />
          </span>
          <div>
            <h3 id={`tech-${category.id}`} className="tech-card-title">
              {category.title}
            </h3>
            <p className="tech-card-desc">{category.description}</p>
          </div>
        </header>

        <motion.ul
          className="tech-grid"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {category.techs.map((tech) => (
            <motion.li
              key={tech.name}
              variants={tileVariants}
              className="tech-tile"
              style={{ '--glow': tech.glow }}
            >
              <span className={`tech-logo${tech.logo.wide ? ' tech-logo--wide' : ''}`}>
                <TechLogo logo={tech.logo} />
              </span>
              <span className="tech-name">{tech.name}</span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.article>
    </Wrapper>
  )
}

export default function TechnologyStack() {
  const [activeId, setActiveId] = useState('all')
  const reduceMotion = useReducedMotion()

  const visibleCategories =
    activeId === 'all' ? TECH_STACK : TECH_STACK.filter((category) => category.id === activeId)

  const headerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.12 } },
  }

  const reveal = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  }

  return (
    <section id="technologies" className="tech-section" aria-labelledby="technologies-heading">
      <div className="tech-bg" aria-hidden="true">
        <span className="tech-bg-glow tech-bg-glow--left" />
        <span className="tech-bg-glow tech-bg-glow--right" />
        <span className="tech-bg-grid" />
        <span className="tech-cube tech-cube--left" />
        <span className="tech-cube tech-cube--right" />
      </div>

      <div className="tech-container">
        <motion.div
          className="tech-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={headerVariants}
        >
          <motion.div variants={reveal} className="tech-eyebrow-row">
            <span className="tech-eyebrow-line" aria-hidden="true" />
            <span className="tech-eyebrow">
              <span className="tech-eyebrow-dot" aria-hidden="true" />
              Technology Stack
            </span>
            <span className="tech-eyebrow-line tech-eyebrow-line--right" aria-hidden="true" />
          </motion.div>
          <motion.h2 variants={reveal} id="technologies-heading" className="tech-heading">
            Technologies <span className="tech-heading-gradient">We Work With</span>
          </motion.h2>
          <motion.p variants={reveal} className="tech-subheading">
            We use modern and industry-leading technologies to build secure, scalable, and future-ready digital
            solutions.
          </motion.p>

          <motion.div variants={reveal} className="tech-filters" role="group" aria-label="Filter technologies by category">
            {TECH_FILTERS.map((filter) => {
              const isActive = activeId === filter.id
              return (
                <button
                  key={filter.id}
                  type="button"
                  className={`tech-filter${isActive ? ' is-active' : ''}`}
                  aria-pressed={isActive}
                  onClick={() => setActiveId(filter.id)}
                >
                  {isActive && (
                    <motion.span
                      layoutId="tech-filter-pill"
                      className="tech-filter-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="tech-filter-label">{filter.short}</span>
                </button>
              )
            })}
          </motion.div>
        </motion.div>

        {activeId !== 'all' && (
          <div className="tech-cards is-filtered">
            <AnimatePresence mode="popLayout">
              {visibleCategories.map((category, index) => (
                <TechCard key={category.id} category={category} index={index} reduceMotion={reduceMotion} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Full-width track: technology cards travel right → left as the page scrolls */}
      {activeId === 'all' && (
        <DirectionalTrack direction="left" label="Technology categories" className="tech-track" continuous speed={68}>
          {TECH_STACK.map((category, index) => (
            <TechCard key={category.id} as="li" category={category} index={index} reduceMotion={reduceMotion} />
          ))}
        </DirectionalTrack>
      )}

      <div className="tech-container">
        <FeatureStrip items={HIGHLIGHTS} />
      </div>
    </section>
  )
}
