import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useInView } from 'framer-motion'
import {
  ArrowRight,
  Brain,
  TrendingUp,
  Code2,
  Rocket,
  Target,
  Eye,
  Gem,
  Users,
  Building2,
  Star,
} from 'lucide-react'

// Import extracted visual assets
import techOfficeImg from '../assets/about/tech-office-emerald.jpg'
import missionTargetImg from '../assets/about/mission-target-emerald.jpg'
import visionEyeImg from '../assets/about/vision-eye-emerald.jpg'
import valuesDiamondImg from '../assets/about/values-diamond-emerald.jpg'
import { COMPANY_INFO, COMPANY_STATS } from '../data/company'
import './AboutPreview.css'

/**
 * Animated number counter component
 */
function CountUpNumber({ target, suffix = '', duration = 1800, start = false }) {
  const [count, setCount] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion) {
      setCount(target)
      return
    }

    if (!start) return

    let startTime = null
    let animationFrameId

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - (1 - progress) * (1 - progress)
      setCount(Math.floor(eased * target))

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step)
      } else {
        setCount(target)
      }
    }

    animationFrameId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animationFrameId)
  }, [target, duration, start, shouldReduceMotion])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}
export default function AboutPreview() {
  const shouldReduceMotion = useReducedMotion()
  const sectionRef = useRef(null)
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.18 })

  // 3D Parallax tilt state for the office visual container
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const handleMouseMove = (e) => {
    if (shouldReduceMotion) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16
    setMousePos({ x, y })
  }
  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 })
  }

  // Heading animated words
  const headingLines = [
    { words: ['Turning', 'Ideas', 'Into'] },
    { words: ['Impactful', 'Digital'] },
    { words: ['Solutions.'], isGradient: true },
  ]

  // Use only company metrics recorded as verified in the shared company data.
  const stats = [
    {
      id: 'projects',
      value: Number(COMPANY_INFO.since),
      suffix: '',
      label: 'Established',
      icon: Users,
      iconColor: '#45D6A0',
      bgGlow: 'rgba(69, 214, 160, 0.15)',
      borderColor: 'rgba(69, 214, 160, 0.35)',
    },
    {
      id: 'clients',
      value: Number(COMPANY_STATS.find((stat) => stat.id === 'services')?.value),
      suffix: '',
      label: 'Service Offerings',
      icon: Building2,
      iconColor: '#31C48D',
      bgGlow: 'rgba(69, 214, 160, 0.15)',
      borderColor: 'rgba(69, 214, 160, 0.35)',
    },
    {
      id: 'satisfaction',
      value: Number.parseInt(COMPANY_STATS.find((stat) => stat.id === 'projects')?.value ?? '0', 10),
      suffix: '+',
      label: 'Documented Solutions',
      icon: Star,
      iconColor: '#83F0C2',
      bgGlow: 'rgba(131, 240, 194, 0.15)',
      borderColor: 'rgba(131, 240, 194, 0.35)',
    },
  ]
  // Floating technology badges around the office scene
  const floatingCards = [
    {
      id: 'innovation',
      title: 'Innovation Driven',
      icon: Brain,
      className: 'about-float-card about-fc-innovation',
      iconWrapClass: 'bg-[#45D6A0]/20 text-[#45D6A0] border border-[#45D6A0]/40',
      initialY: -6,
      floatY: [ -6, 6, -6 ],
      duration: 4.8,
      delay: 0,
    },
    {
      id: 'client-focused',
      title: 'Client Focused',
      icon: TrendingUp,
      className: 'about-float-card about-fc-client',
      iconWrapClass: 'bg-[#31C48D]/20 text-[#31C48D] border border-[#31C48D]/40',
      initialY: 6,
      floatY: [ 6, -6, 6 ],
      duration: 5.4,
      delay: 0.6,
    },
    {
      id: 'quality-dev',
      title: 'Quality Development',
      icon: Code2,
      className: 'about-float-card about-fc-quality',
      iconWrapClass: 'bg-[#83F0C2]/15 text-[#83F0C2] border border-[#83F0C2]/40',
      initialY: -8,
      floatY: [ -8, 8, -8 ],
      duration: 5.0,
      delay: 1.1,
    },
    {
      id: 'partnership',
      title: 'Long-Term Partnership',
      icon: Rocket,
      className: 'about-float-card about-fc-longterm',
      iconWrapClass: 'bg-[#31C48D]/20 text-[#31C48D] border border-[#31C48D]/40',
      initialY: 6,
      floatY: [ 6, -6, 6 ],
      duration: 5.6,
      delay: 1.6,
    },
  ]

  // Bottom 3 Cards: Mission, Vision, Values
  const mvvCards = [
    {
      id: 'mission',
      title: 'Our Mission',
      description:
        'To empower businesses with innovative and reliable digital solutions that create real value and sustainable growth.',
      icon: Target,
      iconColor: '#7EE8C0',
      badgeBg: 'rgba(69, 214, 160, 0.15)',
      badgeBorder: 'rgba(69, 214, 160, 0.35)',
      imgSrc: missionTargetImg,
      imgAlt: 'Our Mission - 3D Target Bullseye',
      glowColor: 'rgba(69, 214, 160, 0.22)',
      hoverBorder: 'rgba(69, 214, 160, 0.55)',
    },
    {
      id: 'vision',
      title: 'Our Vision',
      description:
        'To be a leading technology partner known for innovation, quality and long-term client success.',
      icon: Eye,
      iconColor: '#6FE0B6',
      badgeBg: 'rgba(110, 224, 180, 0.15)',
      badgeBorder: 'rgba(110, 224, 180, 0.35)',
      imgSrc: visionEyeImg,
      imgAlt: 'Our Vision - 3D Holographic Eye',
      glowColor: 'rgba(69, 214, 160, 0.22)',
      hoverBorder: 'rgba(69, 214, 160, 0.55)',
    },
    {
      id: 'values',
      title: 'Our Values',
      description:
        'Innovation, integrity, quality, collaboration and a strong commitment to client success.',
      icon: Gem,
      iconColor: '#83F0C2',
      badgeBg: 'rgba(131, 240, 194, 0.15)',
      badgeBorder: 'rgba(131, 240, 194, 0.35)',
      imgSrc: valuesDiamondImg,
      imgAlt: 'Our Values - 3D Luminous Diamond',
      glowColor: 'rgba(42, 180, 130, 0.22)',
      hoverBorder: 'rgba(42, 180, 130, 0.55)',
    },
  ]

  return (
    <section
      id="about"
      ref={sectionRef}
      className="about-section"
      aria-label="About Cosmogeek Software Solutions"
    >
      {/* Background ambient lighting effects */}
      <div className="about-bg-ambient-top" aria-hidden="true" />
      <div className="about-bg-ambient-bottom" aria-hidden="true" />
      <div className="about-bg-grid-overlay" aria-hidden="true" />

      <div className="about-container">
        {/* TOP SECTION: Split Grid (Left Text & Stats | Right Tech Office Visual) */}
        <div className="about-main-grid">
          {/* ================= LEFT COLUMN ================= */}
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -35 }}
            animate={isSectionInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="about-left"
          >
            {/* Pill Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="about-eyebrow"
            >
              <span className="about-eyebrow-dot" />
              <span className="about-eyebrow-text">ABOUT US</span>
            </motion.div>

            {/* Main Animated Heading */}
            <h2 className="about-heading" aria-label="Turning Ideas Into Impactful Digital Solutions.">
              {headingLines.map((line, lineIdx) => (
                <span key={lineIdx} className="about-heading-line">
                  {line.words.map((word, wordIdx) => {
                    const globalDelay = 0.2 + lineIdx * 0.12 + wordIdx * 0.05
                    return (
                      <motion.span
                        key={wordIdx}
                        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 22 }}
                        animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
                        transition={{
                          duration: 0.55,
                          delay: globalDelay,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className={`inline-block mr-[0.28em] ${
                          line.isGradient ? 'about-heading-gradient' : 'text-white'
                        }`}
                      >
                        {word}
                      </motion.span>
                    )
                  })}
                </span>
              ))}
            </h2>

            {/* Company Introduction Description */}
            <motion.p
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
              animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="about-desc"
            >
              Cosmogeek Software Solutions is a technology-driven company focused on building innovative software, mobile applications and AI-powered solutions. We help businesses automate processes, improve efficiency and create exceptional digital experiences.
            </motion.p>

            {/* Key Statistics Row */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="about-stats-row"
            >
              {stats.map((stat, idx) => {
                const IconComponent = stat.icon
                return (
                  <div key={stat.id} className="about-stat-item">
                    <div className="about-stat-icon" style={{ backgroundColor: stat.bgGlow, borderColor: stat.borderColor }}>
                      <IconComponent className="w-5 h-5" style={{ color: stat.iconColor }} />
                    </div>
                    <div className="about-stat-content">
                      <div className="about-stat-value">
                        <CountUpNumber target={stat.value} suffix={stat.suffix} duration={1600 + idx * 250} start={isSectionInView} />
                      </div>
                      <div className="about-stat-label">{stat.label}</div>
                    </div>
                  </div>
                )
              })}
            </motion.div>
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
              animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="about-cta-row"
            >
              <Link
                to="/about"
                className="about-btn-primary group"
                id="about-cta-story"
              >
                <span>Our Story</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <Link
                to="/about"
                className="about-btn-secondary group"
                id="about-cta-services"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>

          {/* ================= RIGHT COLUMN: TECH OFFICE VISUAL ================= */}
          <motion.div
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
            animate={isSectionInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="about-right"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* 3D tilt container */}
            <div
              className="about-visual-tilt-wrapper"
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x}deg) rotateX(${mousePos.y}deg)`,
                transition: mousePos.x === 0 ? 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)' : 'transform 0.1s ease-out',
              }}
            >
              {/* Image Frame with glowing border */}
              <div className="about-photo-frame">
                <img
                  src={techOfficeImg}
                  alt="Cosmogeek Software Solutions Engineering Team"
                  className="about-office-img"
                  loading="lazy"
                />

                {/* Soft gradient vignetting for seamless dark theme integration */}
                <div className="about-photo-vignette" aria-hidden="true" />
              </div>

              {/* Glowing Orbital Neon Rings with orbiting particles */}
              <div className="about-orbital-wrapper" aria-hidden="true">
                <div className="about-orbital-ring-outer">
                  <span className="about-orbit-particle about-orbit-particle-cyan" />
                </div>
                <div className="about-orbital-ring-inner">
                  <span className="about-orbit-particle about-orbit-particle-violet" />
                </div>
              </div>

              {/* Floating Glassmorphism Cards with smooth physics animations */}
              {floatingCards.map((card) => {
                const CardIcon = card.icon
                return (
                  <motion.div
                    key={card.id}
                    className={card.className}
                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                    animate={{
                      opacity: 1,
                      y: shouldReduceMotion ? 0 : card.floatY,
                    }}
                    transition={{
                      opacity: { duration: 0.5, delay: 0.3 + card.delay },
                      y: {
                        repeat: Infinity,
                        repeatType: 'reverse',
                        duration: card.duration,
                        ease: 'easeInOut',
                        delay: card.delay,
                      },
                    }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: '0 12px 30px rgba(69, 214, 160, 0.35)',
                      borderColor: 'rgba(42, 180, 130, 0.65)',
                    }}
                  >
                    <div className={`about-float-card-icon ${card.iconWrapClass}`}>
                      <CardIcon className="w-3.5 h-3.5" />
                    </div>
                    <span className="about-float-card-label">{card.title}</span>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* ================= BOTTOM ROW: 3 PREMIUM CARDS (MISSION, VISION, VALUES) ================= */}
        <div className="about-bottom-grid">
          {mvvCards.map((card, idx) => {
            const BadgeIcon = card.icon
            return (
              <motion.article
                key={card.id}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 35 }}
                animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.4 + idx * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -6,
                  transition: { duration: 0.25, ease: 'easeOut' },
                }}
                className="about-mvv-card group"
                style={{
                  '--card-glow-color': card.glowColor,
                  '--card-hover-border': card.hoverBorder,
                }}
              >
                {/* Ambient corner light glow */}
                <div
                  className="about-mvv-glow"
                  style={{ backgroundColor: card.glowColor }}
                  aria-hidden="true"
                />

                <div className="about-mvv-inner">
                  {/* Left content block */}
                  <div className="about-mvv-content">
                    {/* Top small icon badge */}
                    <div
                      className="about-mvv-badge"
                      style={{
                        backgroundColor: card.badgeBg,
                        borderColor: card.badgeBorder,
                      }}
                    >
                      <BadgeIcon
                        className="w-4 h-4"
                        style={{ color: card.iconColor }}
                      />
                    </div>

                    <h3 className="about-mvv-title">{card.title}</h3>

                    <p className="about-mvv-desc">{card.description}</p>
                  </div>

                  {/* Right side: 3D Animated Illustration */}
                  <div className="about-mvv-visual-wrap">
                    <motion.div
                      animate={
                        shouldReduceMotion
                          ? {}
                          : {
                              y: idx % 2 === 0 ? [-3, 4, -3] : [4, -3, 4],
                              rotate: idx % 2 === 0 ? [-1, 1, -1] : [1, -1, 1],
                            }
                      }
                      transition={{
                        repeat: Infinity,
                        repeatType: 'reverse',
                        duration: 4.2 + idx * 0.6,
                        ease: 'easeInOut',
                      }}
                      className="about-mvv-3d-asset"
                    >
                      <img
                        src={card.imgSrc}
                        alt={card.imgAlt}
                        className="about-mvv-3d-img"
                        loading="lazy"
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
