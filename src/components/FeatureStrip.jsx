import { motion, useReducedMotion } from 'framer-motion'
import './FeatureStrip.css'

// Glass strip of value propositions shown under homepage sections.
// items: [{ icon: LucideIcon, title: string, text: string }]
export default function FeatureStrip({ items }) {
  const reduceMotion = useReducedMotion()

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.1 } },
  }

  const item = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <motion.ul
      className="feature-strip"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={container}
    >
      {items.map(({ icon: Icon, title, text }) => (
        <motion.li key={title} variants={item} className="feature-strip-item">
          <span className="feature-strip-icon">
            <Icon strokeWidth={1.9} />
          </span>
          <span>
            <strong>{title}</strong>
            <small>{text}</small>
          </span>
        </motion.li>
      ))}
    </motion.ul>
  )
}
