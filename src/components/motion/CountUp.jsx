import { useEffect, useRef } from 'react'
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'

/**
 * Counts up to `value` once the number scrolls into view.
 * Screen readers get the final value straight away via aria-label.
 */
export default function CountUp({ value, suffix = '', duration = 1.8, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduceMotion = useReducedMotion()
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v))

  useEffect(() => {
    if (!inView) return undefined
    if (reduceMotion) {
      count.set(value)
      return undefined
    }
    const controls = animate(count, value, { duration, ease: [0.22, 1, 0.36, 1] })
    return () => controls.stop()
  }, [inView, reduceMotion, value, duration, count])

  return (
    <span ref={ref} className={className} aria-label={`${value}${suffix}`}>
      <motion.span aria-hidden="true">{rounded}</motion.span>
      <span aria-hidden="true">{suffix}</span>
    </span>
  )
}
