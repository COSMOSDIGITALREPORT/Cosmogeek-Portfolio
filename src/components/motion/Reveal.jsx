import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

/**
 * Scroll reveal. Use <Reveal stagger> as a container and <Reveal.Item> for
 * children to get a staggered entrance; use <Reveal> alone for a single block.
 */
export default function Reveal({ as = 'div', stagger = 0, delay = 0, y = 26, amount = 0.25, className, children, ...rest }) {
  const reduceMotion = useReducedMotion()
  const Component = motion[as]
  const variants = stagger
    ? { hidden: {}, visible: { transition: { staggerChildren: reduceMotion ? 0 : stagger, delayChildren: reduceMotion ? 0 : delay } } }
    : {
        hidden: { opacity: 0, y: reduceMotion ? 0 : y },
        visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE, delay: reduceMotion ? 0 : delay } },
      }

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={variants}
      {...rest}
    >
      {children}
    </Component>
  )
}

function RevealItem({ as = 'div', y = 22, className, children, ...rest }) {
  const reduceMotion = useReducedMotion()
  const Component = motion[as]
  return (
    <Component
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduceMotion ? 0 : y },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
      }}
      {...rest}
    >
      {children}
    </Component>
  )
}

Reveal.Item = RevealItem
