import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Navigation link definitions with planned section anchors
const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Our Projects', href: '#projects' },
  { label: 'Technologies', href: '#technologies' },
  { label: 'Contact', href: '#contact' },
]

// Active nav item for routed pages outside the homepage
function getRouteActiveItem(pathname) {
  if (pathname.startsWith('/about')) return 'About Us'
  if (pathname.startsWith('/services')) return 'Services'
  if (pathname.startsWith('/portfolio')) return 'Our Projects'
  return null
}

/**
 * BrandMark Component
 * Temporary text-based brand mark for CosmoGeek Software Solution.
 * Easily swappable when the official logo graphic is provided.
 */
function BrandMark() {
  return (
    <a
      href="/"
      className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#45D6A0] rounded-lg p-1 transition-transform"
      aria-label="Cosmogeek Software Solutions - Home"
    >
      {/* Official corporate orbital globe mark */}
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1F9D6E] via-[#168D68] to-[#83F0C2] flex items-center justify-center text-white shadow-md shadow-[#168D68]/25 border border-white/10 group-hover:scale-105 transition-transform duration-200">
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
      </div>

      <div className="flex flex-col text-left leading-none">
        <span className="text-base sm:text-lg font-black tracking-wider text-white group-hover:text-[#DFF8EF] transition-colors uppercase">
          COSMOGEEK
        </span>
        <span className="text-[9px] sm:text-[10px] tracking-[0.22em] font-bold text-[#83F0C2] uppercase mt-1">
          SOFTWARE SOLUTIONS
        </span>
      </div>
    </a>
  )
}

export default function Navbar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [homeActiveItem, setHomeActiveItem] = useState('Home')
  // Scroll-spy drives the homepage; routed pages highlight their own section
  const activeItem = isHome ? homeActiveItem : getRouteActiveItem(pathname)

  // Detect scroll position to apply elevated navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Automatic scroll-spy: updates activeItem as the user scrolls down through the sections in sequence
  useEffect(() => {
    if (!isHome) return undefined

    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 140

      // The last section can be too short to reach the threshold; highlight it at the page bottom
      const atPageBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      const lastItem = NAV_ITEMS[NAV_ITEMS.length - 1]
      if (atPageBottom && document.querySelector(lastItem.href)) {
        setHomeActiveItem(lastItem.label)
        return
      }

      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const item = NAV_ITEMS[i]
        const element = document.querySelector(item.href)
        if (element) {
          const offsetTop = element.offsetTop
          if (scrollPosition >= offsetTop) {
            setHomeActiveItem(item.label)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScrollSpy, { passive: true })
    handleScrollSpy()
    return () => window.removeEventListener('scroll', handleScrollSpy)
  }, [isHome])

  // Close mobile menu on Escape key press for accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleNavClick = (label, href) => {
    setHomeActiveItem(label)
    setIsOpen(false)

    // Smooth scroll if element exists, or navigate to homepage with anchor
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
      window.history.pushState(null, '', href)
    } else {
      navigate('/' + href)
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#071B17]/95 backdrop-blur-md border-b border-[#1B4539]/80 shadow-lg shadow-black/25'
          : 'bg-[#071B17]/75 backdrop-blur-sm border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* LEFT: Logo & Company Name */}
          <div className="flex-shrink-0">
            <BrandMark />
          </div>

          {/* CENTER / RIGHT: Desktop Navigation Links */}
          <nav
            className="hidden lg:flex items-center gap-1.5 xl:gap-2.5"
            aria-label="Main Navigation"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeItem === item.label
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(item.label, item.href)
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-3 xl:px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#45D6A0] border border-transparent ${
                    isActive
                      ? 'text-white'
                      : 'text-[#B7CCC4] hover:text-white hover:bg-[#102D26]/40'
                  }`}
                >
                  {item.label}
                  {/* Animated blue-violet underline that glides between active links */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-underline"
                      className="absolute left-3 right-3 -bottom-[7px] h-[3px] rounded-full bg-gradient-to-r from-[#31C48D] via-[#35C18E] to-[#45D6A0] shadow-[0_0_12px_rgba(56, 200, 146,0.75)]"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      aria-hidden="true"
                    />
                  )}
                </a>
              )
            })}
          </nav>

          {/* CTA: Desktop "Start a Project" Button */}
          <div className="hidden xl:flex items-center">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                handleNavClick('Contact', '#contact')
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#45D6A0] to-[#31C48D] hover:from-[#28A879] hover:to-[#168d68] shadow-md shadow-[#45D6A0]/20 hover:shadow-[#45D6A0]/30 transition-all duration-200 transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#45D6A0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#071B17]"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* MOBILE / TABLET: Hamburger Menu Button */}
          <div className="flex lg:hidden items-center">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl text-[#B7CCC4] hover:text-white bg-[#102D26]/50 hover:bg-[#102D26]/80 border border-[#31594D]/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#45D6A0]"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE / TABLET: Dropdown Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden border-t border-[#1B4539]/90 bg-[#071B17]/98 backdrop-blur-xl overflow-hidden shadow-2xl"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-3">
              <nav className="flex flex-col space-y-1.5" aria-label="Mobile Navigation">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeItem === item.label
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault()
                        handleNavClick(item.label, item.href)
                      }}
                      aria-current={isActive ? 'page' : undefined}
                      className={`px-4 py-3 rounded-xl text-base font-medium transition-all duration-150 flex items-center justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#45D6A0] ${
                        isActive
                          ? 'text-white bg-[#102D26]/80 border-l-4 border-[#45D6A0]'
                          : 'text-[#B7CCC4] hover:text-white hover:bg-[#102D26]/40'
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-[#45D6A0]" />
                      )}
                    </a>
                  )
                })}
              </nav>

              {/* Mobile CTA */}
              <div className="pt-3 border-t border-[#1B4539]/70">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick('Contact', '#contact')
                  }}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-[#45D6A0] to-[#31C48D] hover:from-[#28A879] hover:to-[#168d68] shadow-md shadow-[#45D6A0]/25 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#45D6A0]"
                >
                  <span>Start a Project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
