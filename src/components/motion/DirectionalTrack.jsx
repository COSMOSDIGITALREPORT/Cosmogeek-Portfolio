import { Children, cloneElement, isValidElement, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import useMediaQuery from '../../hooks/useMediaQuery'
import './motion.css'

/**
 * Directional card track: desktop uses a seamless autoplay loop; touch devices
 * and reduced-motion users get a native swipe scroller instead.
 */
export default function DirectionalTrack({ direction = 'left', label, className = '', children, continuous = false, speed = 48 }) {
  const viewportRef = useRef(null)
  const groupRef = useRef(null)
  const [distance, setDistance] = useState(0)
  const reduceMotion = useReducedMotion()
  const touchOrSmall = useMediaQuery('(hover: none), (pointer: coarse), (max-width: 767px)')
  const mode = reduceMotion || (!continuous && touchOrSmall) ? 'swipe' : 'marquee'
  const items = Children.toArray(children)
  const duplicateItems = items.map((child, index) =>
    isValidElement(child)
      ? cloneElement(child, {
          key: `loop-${child.key ?? index}`,
          'aria-hidden': true,
          inert: true,
        })
      : child,
  )

  useEffect(() => {
    const viewport = viewportRef.current
    const group = groupRef.current
    if (!viewport || !group) return undefined

    const measure = () => setDistance(group.getBoundingClientRect().width)
    const observer = new ResizeObserver(measure)
    observer.observe(viewport)
    observer.observe(group)
    measure()
    return () => observer.disconnect()
  }, [children])

  const duration = Math.max(22, distance / speed)
  const trackStyle = mode === 'marquee'
    ? { '--dtrack-distance': `${distance}px`, '--dtrack-duration': `${duration}s` }
    : undefined

  return (
    <div
      ref={viewportRef}
      className={`dtrack dtrack--${mode} dtrack--${direction} ${className}`}
      role="region"
      aria-label={label}
      tabIndex={mode === 'swipe' ? 0 : undefined}
    >
      <div className="dtrack-list" style={trackStyle}>
        <div ref={groupRef} className="dtrack-group">
          {items}
        </div>
        {mode === 'marquee' && (
          <div className="dtrack-group" aria-hidden="true" inert>
            {duplicateItems}
          </div>
        )}
      </div>
    </div>
  )
}
