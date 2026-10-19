import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import './motion.css'

/**
 * Wraps a button or link so it drifts gently toward the cursor.
 * Mouse-only; touch and reduced-motion users get a static element.
 */
export default function Magnetic({ strength = 0.28, children, className = '' }) {
  const reduceMotion = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 })

  const handleMove = (event) => {
    if (reduceMotion || event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    x.set((event.clientX - rect.left - rect.width / 2) * strength)
    y.set((event.clientY - rect.top - rect.height / 2) * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.span
      className={`magnetic ${className}`}
      style={{ x: springX, y: springY }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.span>
  )
}
