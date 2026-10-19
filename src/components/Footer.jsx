import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { AlertCircle, CheckCircle2, ChevronRight, Mail, MapPin, Phone, Send } from 'lucide-react'
import { siFacebook, siInstagram, siX } from 'simple-icons'
import { COMPANY_INFO } from '../data/company'
import { FEATURED_SERVICES } from '../data/services'
import { subscribeToNewsletter } from '../utils/inquiryService'
import './Footer.css'

const CURRENT_YEAR = new Date().getFullYear()
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const EASE = [0.22, 1, 0.36, 1]

// LinkedIn was removed from recent simple-icons releases; official path from simple-icons v11.15.0
const LINKEDIN_PATH =
  'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'

// Brand glyphs keyed by the social names in COMPANY_INFO
const SOCIAL_ICONS = {
  Facebook: { path: siFacebook.path, tone: 'blue' },
  'Twitter / X': { path: siX.path, tone: 'blue' },
  LinkedIn: { path: LINKEDIN_PATH, tone: 'blue' },
  Instagram: { path: siInstagram.path, tone: 'violet' },
}

const QUICK_LINKS = [
  { label: 'Home', href: '/#home' },
  { label: 'About Us', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Tech Stack', href: '/#technologies' },
  { label: 'Contact', href: '/#contact' },
]

const SERVICE_LINKS = FEATURED_SERVICES.map((service) => ({
  label: service.cardTitle,
  href: `/services/${service.slug}`,
}))

function ColumnHeading({ id, tone, children }) {
  return (
    <h2 id={id} className={`footer-heading footer-heading--${tone}`}>
      <span className="footer-heading-ring" aria-hidden="true" />
      {children}
    </h2>
  )
}

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | success | error | invalid

  const handleSubmit = async (event) => {
    event.preventDefault()
    const value = email.trim()
    if (!EMAIL_PATTERN.test(value)) {
      setStatus('invalid')
      return
    }
    setStatus('sending')
    const result = await subscribeToNewsletter(value)
    if (result.success) {
      setStatus('success')
      setEmail('')
    } else {
      setStatus('error')
    }
  }

  const messages = {
    invalid: { tone: 'error', text: 'Please enter a valid email address.' },
    error: { tone: 'error', text: `Couldn't subscribe right now. Please try again or email ${COMPANY_INFO.contact.email}.` },
    success: { tone: 'success', text: "You're subscribed! Thanks for joining our newsletter." },
  }
  const message = messages[status]

  return (
    <form className="footer-newsletter" onSubmit={handleSubmit} noValidate>
      <div className={`footer-newsletter-group${status === 'invalid' ? ' is-invalid' : ''}`}>
        <Mail className="footer-newsletter-icon" aria-hidden="true" />
        <label htmlFor="footer-newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="footer-newsletter-email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="your@email.com"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value)
            if (status === 'invalid' || status === 'error') setStatus('idle')
          }}
          aria-invalid={status === 'invalid'}
          aria-describedby={message ? 'footer-newsletter-status' : undefined}
        />
        <button type="submit" className="footer-subscribe" disabled={status === 'sending'}>
          {status === 'sending' ? (
            <span className="footer-spinner" aria-hidden="true" />
          ) : (
            <>
              <span>Subscribe</span>
              <Send aria-hidden="true" />
            </>
          )}
          {status === 'sending' && <span className="sr-only">Subscribing…</span>}
        </button>
      </div>

      <div aria-live="polite">
        <AnimatePresence mode="wait">
          {message && (
            <motion.p
              key={status}
              id="footer-newsletter-status"
              className={`footer-newsletter-status footer-newsletter-status--${message.tone}`}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
            >
              {message.tone === 'success' ? <CheckCircle2 aria-hidden="true" /> : <AlertCircle aria-hidden="true" />}
              {message.text}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  )
}

export default function Footer() {
  const reduceMotion = useReducedMotion()
  const { contact } = COMPANY_INFO

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.12 } },
  }

  const column = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: EASE, staggerChildren: reduceMotion ? 0 : 0.04 },
    },
  }

  const item = {
    hidden: { opacity: 0, x: reduceMotion ? 0 : -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE } },
  }

  return (
    <footer className="site-footer">
      <div className="footer-bg" aria-hidden="true">
        <span className="footer-glow footer-glow--left" />
        <span className="footer-glow footer-glow--right" />
        <svg className="footer-trails" viewBox="0 0 1440 520" preserveAspectRatio="none">
          <defs>
            <linearGradient id="footer-trail-a" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#31c48d" stopOpacity="0" />
              <stop offset="45%" stopColor="#31c48d" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#45d6a0" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="footer-trail-b" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#45d6a0" stopOpacity="0" />
              <stop offset="55%" stopColor="#35c18e" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#83F0C2" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path className="footer-trail footer-trail--1" d="M-40 140 C 120 300, 260 420, 560 520" stroke="url(#footer-trail-a)" />
          <path className="footer-trail footer-trail--2" d="M-40 330 C 140 430, 300 470, 470 520" stroke="url(#footer-trail-b)" />
          <path className="footer-trail footer-trail--3" d="M1180 -10 C 1330 60, 1420 160, 1480 300" stroke="url(#footer-trail-b)" />
          <path className="footer-trail footer-trail--4" d="M1100 520 C 1280 470, 1390 400, 1480 330" stroke="url(#footer-trail-a)" />
        </svg>
        <span className="footer-dots footer-dots--left" />
        <span className="footer-dots footer-dots--right" />
        <span className="footer-gem footer-gem--left" />
        <span className="footer-gem footer-gem--right" />
      </div>

      <div className="footer-container">
        <motion.div
          className="footer-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={container}
        >
          {/* Column 1: Brand & social */}
          <motion.div variants={column} className="footer-col footer-col--brand">
            <Link to="/" className="footer-brand" aria-label="Cosmogeek Solutions Pvt. Ltd. — Home">
              <span className="footer-brand-mark" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
              </span>
              <span className="footer-brand-text">
                <span className="footer-brand-name">COSMOGEEK</span>
                <span className="footer-brand-sub">SOFTWARE SOLUTIONS</span>
              </span>
            </Link>

            <p className="footer-summary">{COMPANY_INFO.summary}</p>

            <ul className="footer-social" aria-label="Social media">
              {contact.social.map((social) => {
                const icon = SOCIAL_ICONS[social.name]
                return (
                  <motion.li key={social.name} variants={item}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`footer-social-link footer-social-link--${icon?.tone ?? 'blue'}`}
                      aria-label={`${social.name} (opens in a new tab)`}
                    >
                      {icon ? (
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d={icon.path} fill="currentColor" />
                        </svg>
                      ) : (
                        social.name.charAt(0)
                      )}
                    </a>
                  </motion.li>
                )
              })}
            </ul>
          </motion.div>

          {/* Column 2: Quick links */}
          <motion.nav variants={column} className="footer-col" aria-labelledby="footer-quick-links">
            <ColumnHeading id="footer-quick-links" tone="violet">
              Quick Links
            </ColumnHeading>
            <ul className="footer-links footer-links--violet">
              {QUICK_LINKS.map((link) => (
                <motion.li key={link.label} variants={item}>
                  <a href={link.href} className="footer-link">
                    <ChevronRight aria-hidden="true" />
                    <span>{link.label}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>

          {/* Column 3: Services */}
          <motion.nav variants={column} className="footer-col" aria-labelledby="footer-services">
            <ColumnHeading id="footer-services" tone="blue">
              Services
            </ColumnHeading>
            <ul className="footer-links footer-links--blue">
              {SERVICE_LINKS.map((link) => (
                <motion.li key={link.label} variants={item}>
                  <Link to={link.href} className="footer-link">
                    <ChevronRight aria-hidden="true" />
                    <span>{link.label}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>

          {/* Column 4: Newsletter & contact */}
          <motion.div variants={column} className="footer-col footer-col--newsletter">
            <ColumnHeading id="footer-newsletter" tone="violet">
              Subscribe to Our Newsletter
            </ColumnHeading>
            <p className="footer-newsletter-lead">
              Enter your email address to get latest updates, insights and offers.
            </p>
            <NewsletterForm />

            <ul className="footer-contact" aria-label="Contact details">
              <motion.li variants={item}>
                <a href={`mailto:${contact.email}`} className="footer-contact-item">
                  <span className="footer-contact-icon footer-contact-icon--violet" aria-hidden="true">
                    <Mail />
                  </span>
                  <span>{contact.email}</span>
                </a>
              </motion.li>
              <motion.li variants={item}>
                <a href={`tel:${contact.phoneRaw}`} className="footer-contact-item">
                  <span className="footer-contact-icon footer-contact-icon--blue" aria-hidden="true">
                    <Phone />
                  </span>
                  <span>{contact.phone}</span>
                </a>
              </motion.li>
              <motion.li variants={item}>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-contact-item"
                  aria-label={`Office address: ${contact.address} (opens Google Maps)`}
                >
                  <span className="footer-contact-icon footer-contact-icon--violet" aria-hidden="true">
                    <MapPin />
                  </span>
                  <span>{contact.address}</span>
                </a>
              </motion.li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Divider + copyright bar */}
        <div className="footer-divider" aria-hidden="true">
          <span className="footer-divider-spark" />
        </div>

        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: reduceMotion ? 0 : 0.3 }}
        >
          <p>© {CURRENT_YEAR} Cosmogeek Solutions Pvt. Ltd. All rights reserved.</p>
          <nav className="footer-legal" aria-label="Legal">
            <Link to="/privacy">Privacy Policy</Link>
            <span className="footer-legal-dot" aria-hidden="true" />
            <Link to="/terms">Terms &amp; Conditions</Link>
          </nav>
        </motion.div>
      </div>
    </footer>
  )
}
