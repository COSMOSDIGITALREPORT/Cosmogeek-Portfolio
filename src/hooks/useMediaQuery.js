import { useSyncExternalStore } from 'react'

/** Subscribes to a CSS media query and returns whether it currently matches. */
export default function useMediaQuery(query) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => false
  )
}
