import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import './Hero.css'
import HeroVisual from '../components/HeroVisual'
import Magnetic from '../components/motion/Magnetic'
import CountUp from '../components/motion/CountUp'
import { COMPANY_STATS } from '../data/company'

const HEADLINE_LINES = [
  [{ text: 'Transforming', accent: false }, { text: 'Ideas', accent: true }],
  [{ text: 'Into', accent: false }, { text: 'Digital', accent: true }],
  [{ text: 'Reality.', accent: true }],
]
// Give every word its position in the sentence for the word-by-word reveal
let wordCounter = 0
const HEADLINE = HEADLINE_LINES.map((line) => line.map((word) => ({ ...word, order: wordCounter++ })))
const WORD_COUNT = wordCounter
const DESCRIPTION =
  'We combine thoughtful design and dependable engineering to turn ambitious ideas into digital products that are ready to grow.'
const EASE = [0.22, 1, 0.36, 1]

// Verified company statistics with a numeric value, e.g. "5+" → 5 with suffix "+"
const HERO_STATS = COMPANY_STATS.filter((stat) => stat.isVerified && /^\d+/.test(stat.value)).map((stat) => {
  const [, number, suffix] = stat.value.match(/^(\d+)(.*)$/)
  return { id: stat.id, value: Number(number), suffix, label: stat.label }
})

export default function Hero() {
  const reduceMotion = useReducedMotion()

  const handleScrollTo = (event, selector) => {
    event.preventDefault()
    document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' })
  }

  // Sequenced entrance: headline words, then description, CTAs and stats
  const afterHeadline = reduceMotion ? 0 : 0.25 + WORD_COUNT * 0.09
  const fadeUp = (delay) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: EASE, delay: reduceMotion ? 0 : delay },
  })

  return (
    <section
      id="home"
      className="hero-section"
      aria-label="Introduction"
    >
      <div className="hero-celestial-canvas" aria-hidden="true">
        <div className="hero-light-beam" />
        <div className="hero-grid-overlay" />
      </div>

      <div className="hero-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hero-main-grid">
          <div className="hero-content">
            <motion.div {...fadeUp(0)}>
              <div className="hero-eyebrow">
                <span className="hero-eyebrow-dot" aria-hidden="true" />
                <span className="hero-eyebrow-text">
                  <span>Software</span>
                  <span className="hero-eyebrow-item">AI</span>
                  <span className="hero-eyebrow-item">Digital Innovation</span>
                </span>
              </div>
            </motion.div>

            <h1 className="hero-headline" aria-label="Transforming Ideas Into Digital Reality.">
              {HEADLINE.map((line, lineIndex) => (
                <span key={lineIndex} className="hero-headline-line" aria-hidden="true">
                  {line.map((word) => {
                    const delay = reduceMotion ? 0 : 0.2 + word.order * 0.09
                    return (
                      <span key={word.text} className="hero-word-mask">
                        <motion.span
                          className={`hero-word${word.accent ? ' hero-word-gradient' : ''}`}
                          initial={{ y: reduceMotion ? 0 : '110%', opacity: reduceMotion ? 1 : 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.8, ease: EASE, delay }}
                        >
                          {word.text}
                        </motion.span>
                      </span>
                    )
                  })}
                </span>
              ))}
            </h1>

            <motion.p className="hero-desc" {...fadeUp(afterHeadline)}>
              {DESCRIPTION}
            </motion.p>

            <motion.div className="hero-actions" {...fadeUp(afterHeadline + 0.15)}>
              <Magnetic>
                <a href="#contact" onClick={(event) => handleScrollTo(event, '#contact')} className="hero-btn-primary">
                  Start a Project <ArrowRight aria-hidden="true" />
                </a>
              </Magnetic>
              <Magnetic>
                <Link to="/portfolio" className="hero-btn-secondary">
                  Explore Our Work <ArrowRight aria-hidden="true" />
                </Link>
              </Magnetic>
            </motion.div>

            <motion.dl className="hero-stats" {...fadeUp(afterHeadline + 0.3)}>
              {HERO_STATS.map((stat) => (
                <div key={stat.id} className="hero-stat">
                  <dt>{stat.label}</dt>
                  <dd>
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          <div className="hero-stage">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  )
}
