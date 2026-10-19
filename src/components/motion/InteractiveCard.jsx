import { motion, useReducedMotion } from 'framer-motion'
import useTilt from '../../hooks/useTilt'
import './motion.css'

/**
 * Glass card with a cursor-following mint spotlight and a restrained 3D tilt.
 * Tilt is mouse-only and disabled for reduced motion; the spotlight also
 * follows touch so it works as press feedback on phones.
 */
export default function InteractiveCard({ as = 'div', className = '', tiltMax = 6, style, children, ...rest }) {
  const reduceMotion = useReducedMotion()
  const { ref: tiltRef, style: tiltStyle, handlers } = useTilt({ max: tiltMax, reduceMotion })
  const Component = motion[as]

  return (
    <Component ref={tiltRef} className={`icard ${className}`} style={{ ...tiltStyle, ...style }} {...handlers} {...rest}>
      <span className="icard-spotlight" aria-hidden="true" />
      {children}
    </Component>
  )
}
