import { useRef } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'

/**
 * Pointer-driven 3D tilt for cards.
 * Returns a ref, spring-smoothed rotate values for a motion element's `style`,
 * and pointer handlers. Also exposes the cursor position as --mx / --my CSS
 * variables for spotlight effects. Tilt is skipped for touch and reduced motion.
 */
export default function useTilt({ max = 6, reduceMotion = false } = {}) {
  const ref = useRef(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 170, damping: 18 })
  const springY = useSpring(rotateY, { stiffness: 170, damping: 18 })

  const onPointerMove = (event) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height
    el.style.setProperty('--mx', `${px * 100}%`)
    el.style.setProperty('--my', `${py * 100}%`)
    if (reduceMotion || event.pointerType !== 'mouse') return
    rotateY.set((px - 0.5) * max * 2)
    rotateX.set((0.5 - py) * max * 2)
  }

  const onPointerLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return {
    ref,
    style: { rotateX: springX, rotateY: springY, transformPerspective: 1000 },
    handlers: { onPointerMove, onPointerLeave },
  }
}
