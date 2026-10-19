import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  Boxes,
  BrainCircuit,
  ChartColumn,
  Cloud,
  CodeXml,
  Globe,
  MessageCircle,
  Settings,
  ShieldCheck,
  Smartphone,
  Users,
  Zap,
} from 'lucide-react'
import { FEATURED_SERVICES } from '../data/services'
import {
  AIVisual,
  CodeVisual,
  DataVisual,
  MarketingVisual,
  MobileVisual,
  ShieldVisual,
  WebVisual,
} from './services/ServiceVisuals'
import FeatureStrip from '../components/FeatureStrip'
import DirectionalTrack from '../components/motion/DirectionalTrack'
import useTilt from '../hooks/useTilt'
import './ServicesPreview.css'

// Card artwork per service; titles and copy come from data/services.js
const CARD_ART = {
  'web-development': { icon: Globe, Visual: WebVisual },
  'mobile-app-development': { icon: Smartphone, Visual: MobileVisual },
  'ai-solutions': { icon: BrainCircuit, Visual: AIVisual },
  'whatsapp-automation': { icon: MessageCircle, Visual: MobileVisual },
  'custom-software': { icon: CodeXml, Visual: CodeVisual },
  'erp-billing-software': { icon: Boxes, Visual: DataVisual },
  'digital-marketing': { icon: ChartColumn, Visual: MarketingVisual },
  'it-consulting': { icon: ShieldCheck, Visual: ShieldVisual },
}

const SERVICE_CARDS = FEATURED_SERVICES.map((service) => ({
  slug: service.slug,
  title: service.cardTitle,
  description: service.cardDescription,
  icon: CARD_ART[service.slug]?.icon ?? service.icon,
  Visual: CARD_ART[service.slug]?.Visual ?? CodeVisual,
}))

const VALUE_PROPS = [
  { icon: Settings, title: 'End-to-End Solutions', text: 'From idea to deployment' },
  { icon: Users, title: 'Client-Centric Approach', text: 'Your goals, our priority' },
  { icon: Zap, title: 'Latest Technologies', text: 'Modern tools for better results' },
  { icon: ShieldCheck, title: 'Long-Term Partnership', text: 'Reliable support always' },
]

const ORBIT_TILES = [
  { label: 'Web Development', icon: Globe, className: 'svc-tile--web' },
  { label: 'AI & Automation', icon: BrainCircuit, className: 'svc-tile--ai' },
  { label: 'Cloud Solutions', icon: Cloud, className: 'svc-tile--cloud' },
  { label: 'Mobile Applications', icon: Smartphone, className: 'svc-tile--mobile' },
]

const EASE = [0.22, 1, 0.36, 1]
function ServiceCard({ service, index, reduceMotion }) {
  const { ref: tiltRef, style: tiltStyle, handlers: tiltHandlers } = useTilt({ max: 4, reduceMotion })
  const { icon: Icon, Visual } = service
  const number = String(index + 1).padStart(2, '0')

  return (
    <motion.li
      className="svc-card-wrap"
      initial={{ opacity: 0, y: reduceMotion ? 0 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: EASE, delay: reduceMotion ? 0 : Math.min(index, 4) * 0.08 }}
    >
      <motion.article ref={tiltRef} className="svc-card group" style={tiltStyle} {...tiltHandlers}>
        <span className="svc-card-glow" aria-hidden="true" />

        <div className="svc-card-visual" aria-hidden="true">
          <Visual />
        </div>

        <div className="svc-card-body">
          <div className="svc-card-head">
            <span className="svc-card-number">{number}</span>
            <span className="svc-card-icon">
              <Icon strokeWidth={1.8} />
            </span>
          </div>

          <h3 className="svc-card-title">
            <Link to={`/services/${service.slug}`} className="svc-card-link">
              {service.title}
            </Link>
          </h3>
          <p className="svc-card-desc">{service.description}</p>
        </div>

        <Link
          to={`/services/${service.slug}`}
          className="svc-card-arrow"
          aria-label={`Learn more about ${service.title}`}
        >
          Learn More <ArrowRight aria-hidden="true" />
        </Link>
      </motion.article>
    </motion.li>
  )
}

function OrbitVisual() {
  return (
    <div className="svc-orbit" aria-hidden="true">
      <div className="svc-orbit-globe">
        <svg viewBox="0 0 200 200">
          <defs>
            <radialGradient id="svc-globe-fill" cx="38%" cy="32%" r="70%">
              <stop offset="0%" stopColor="#31C48D" stopOpacity="0.55" />
              <stop offset="55%" stopColor="#0F3D31" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#071B17" />
            </radialGradient>
            <linearGradient id="svc-globe-line" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#83F0C2" />
              <stop offset="100%" stopColor="#45D6A0" />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="92" fill="url(#svc-globe-fill)" stroke="url(#svc-globe-line)" strokeWidth="1.5" />
          <g fill="none" stroke="url(#svc-globe-line)" strokeOpacity="0.35" strokeWidth="0.8">
            {[18, 40, 62, 80].map((rx) => (
              <ellipse key={rx} cx="100" cy="100" rx={rx} ry="92" />
            ))}
            {[-60, -30, 0, 30, 60].map((dy) => (
              <ellipse key={dy} cx="100" cy={100 + dy} rx={Math.sqrt(92 * 92 - dy * dy)} ry={Math.max(4, 14 - Math.abs(dy) / 6)} />
            ))}
          </g>
          {[[62, 58], [128, 70], [90, 128], [140, 122], [74, 92], [112, 40]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="2.2" fill="#BAE6FD" className="svc-orbit-node" style={{ animationDelay: `${i * 0.4}s` }} />
          ))}
        </svg>
      </div>
      <div className="svc-orbit-ring svc-orbit-ring--outer" />
      <div className="svc-orbit-ring svc-orbit-ring--inner" />
      <span className="svc-cube svc-cube--1" />
      <span className="svc-cube svc-cube--2" />
      <span className="svc-cube svc-cube--3" />
      {ORBIT_TILES.map(({ label, icon: Icon, className }) => (
        <div key={label} className={`svc-tile ${className}`}>
          <Icon strokeWidth={1.7} />
          <span>{label}</span>
        </div>
      ))}
    </div>
  )
}

export default function ServicesPreview() {
  const reduceMotion = useReducedMotion()

  const stagger = (gap) => ({
    hidden: {},
    visible: { transition: { staggerChildren: reduceMotion ? 0 : gap } },
  })

  const reveal = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  }

  return (
    <section id="services" className="svc-section" aria-labelledby="services-heading">
      <div className="svc-bg" aria-hidden="true">
        <span className="svc-bg-glow svc-bg-glow--left" />
        <span className="svc-bg-glow svc-bg-glow--right" />
        <span className="svc-bg-grid" />
      </div>

      <div className="svc-container">
        <div className="svc-header">
          <motion.div
            className="svc-header-copy"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={stagger(0.12)}
          >
            <motion.div variants={reveal} className="svc-eyebrow">
              <span className="svc-eyebrow-dot" aria-hidden="true" />
              Our Services
            </motion.div>
            <motion.h2 variants={reveal} id="services-heading" className="svc-heading">
              Innovative Solutions
              <br />
              for a <span className="svc-heading-gradient">Digital Tomorrow.</span>
            </motion.h2>
            <motion.p variants={reveal} className="svc-subheading">
              We offer end-to-end software development and digital solutions that help businesses grow,
              automate and stay ahead in a rapidly evolving digital world.
            </motion.p>
          </motion.div>

          <motion.div
            className="svc-header-visual"
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: EASE, delay: reduceMotion ? 0 : 0.2 }}
          >
            <OrbitVisual />
          </motion.div>
        </div>

      </div>

      {/* Full-width track: cards travel right → left as the page scrolls */}
      <DirectionalTrack direction="left" label="Our services" className="svc-track" continuous speed={68}>
        {SERVICE_CARDS.map((service, index) => (
          <ServiceCard
            key={service.slug}
            service={service}
            index={index}
            reduceMotion={reduceMotion}
          />
        ))}
      </DirectionalTrack>

      <div className="svc-container">
        <FeatureStrip items={VALUE_PROPS} />
      </div>
    </section>
  )
}
