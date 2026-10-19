import { useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  FileText,
  Handshake,
  Mail,
  MapPin,
  Maximize2,
  MessageSquareText,
  Phone,
  Send,
  User,
  Users,
  Zap,
} from 'lucide-react'
import { COMPANY_INFO, INQUIRY_SERVICES } from '../data/company'
import { submitProjectInquiry } from '../utils/inquiryService'
import './ContactSection.css'

const { contact } = COMPANY_INFO
const encodedAddress = encodeURIComponent(contact.address)
const MAP_EMBED_URL = `https://www.google.com/maps?q=${encodedAddress}&z=15&output=embed`
const MAP_VIEW_URL = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`

const HIGHLIGHTS = [
  { icon: Zap, title: 'Quick Response', text: 'Fast replies on workdays' },
  { icon: Users, title: 'Expert Consultation', text: 'Get the right guidance' },
  { icon: MessageSquareText, title: 'Project Discussion', text: 'Share your requirements' },
  { icon: Handshake, title: 'Long-term Partnership', text: "Let's grow together" },
]

const CONTACT_CARDS = [
  {
    icon: Mail,
    title: 'Email Us',
    lines: [contact.email, "We'll get back to you soon"],
    href: `mailto:${contact.email}`,
    action: `Email ${contact.email}`,
  },
  {
    icon: Phone,
    title: 'Call Us',
    lines: [contact.phone, contact.businessHoursShort],
    href: `tel:${contact.phoneRaw}`,
    action: `Call ${contact.phone}`,
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    lines: [contact.city, contact.countryLine],
    href: DIRECTIONS_URL,
    action: 'Get directions to our office',
    external: true,
  },
]

const EMPTY_FORM = { fullName: '', email: '', phone: '', service: '', details: '' }
const MESSAGE_MAX = 2000
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const EASE = [0.22, 1, 0.36, 1]

function validateForm(data) {
  const errs = {}
  if (!data.fullName.trim()) {
    errs.fullName = 'Please enter your name.'
  } else if (data.fullName.trim().length < 2) {
    errs.fullName = 'Name should be at least 2 characters.'
  }

  if (!data.email.trim()) {
    errs.email = 'Please enter your email address.'
  } else if (!EMAIL_PATTERN.test(data.email.trim())) {
    errs.email = 'Please enter a valid email address.'
  }

  if (data.phone.trim()) {
    const digits = data.phone.replace(/\D/g, '')
    if (!/^\+?[\d\s()-]+$/.test(data.phone.trim()) || digits.length < 7 || digits.length > 15) {
      errs.phone = 'Please enter a valid phone number.'
    }
  }

  if (!data.service) {
    errs.service = 'Please select a subject.'
  }

  if (!data.details.trim()) {
    errs.details = 'Please tell us a little about your project.'
  } else if (data.details.trim().length < 10) {
    errs.details = 'Please write at least 10 characters.'
  }
  return errs
}

function buildMailtoUrl(data) {
  const subject = encodeURIComponent(`Project Inquiry: ${data.service || 'General'} — ${data.fullName}`)
  const body = encodeURIComponent(
    `Name: ${data.fullName}\nEmail: ${data.email}\nPhone: ${data.phone || 'Not provided'}\nSubject: ${data.service}\n\nMessage:\n${data.details}`
  )
  return `mailto:${contact.email}?subject=${subject}&body=${body}`
}

function Field({ id, label, required, icon: Icon, error, children, hint }) {
  return (
    <div className={`contact-field${error ? ' has-error' : ''}`}>
      <label htmlFor={id} className="contact-label">
        {label}
        {required && (
          <span className="contact-required" aria-hidden="true">
            {' '}*
          </span>
        )}
      </label>
      <div className="contact-control">
        <Icon className="contact-control-icon" aria-hidden="true" />
        {children}
      </div>
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={`${id}-error`}
            className="contact-error"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <AlertCircle aria-hidden="true" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
      {hint}
    </div>
  )
}

function InquiryForm() {
  const [searchParams] = useSearchParams()
  // Service pages link here with ?service=<label> so the subject is preselected
  const [formData, setFormData] = useState(() => {
    const requested = searchParams.get('service')
    return INQUIRY_SERVICES.includes(requested) ? { ...EMPTY_FORM, service: requested } : EMPTY_FORM
  })
  const [errors, setErrors] = useState({})
  const [hasAttempted, setHasAttempted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const formRef = useRef(null)

  const handleChange = (event) => {
    const { name, value } = event.target
    const next = { ...formData, [name]: value }
    setFormData(next)
    // After the first submit attempt, re-validate live so errors clear as they are fixed
    if (hasAttempted) {
      setErrors(validateForm(next))
    }
  }

  const describedBy = (name) => (errors[name] ? `${name}-error` : undefined)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setFeedback(null)
    setHasAttempted(true)

    const errs = validateForm(formData)
    setErrors(errs)
    const firstInvalid = Object.keys(errs)[0]
    if (firstInvalid) {
      formRef.current?.querySelector(`[name="${firstInvalid}"]`)?.focus()
      return
    }

    setIsSubmitting(true)
    const submitted = { ...formData, fullName: formData.fullName.trim(), email: formData.email.trim() }
    const result = await submitProjectInquiry(submitted)
    setIsSubmitting(false)

    if (result.success) {
      setFeedback({
        type: 'success',
        message: `Thank you, ${submitted.fullName.split(' ')[0]}! Your message has been sent. Our team will get back to you shortly.`,
      })
      setFormData(EMPTY_FORM)
      setHasAttempted(false)
      setErrors({})
    } else {
      setFeedback({
        type: 'error',
        message: "We couldn't send your message automatically. You can send it from your email app instead — your details are already filled in.",
        mailto: buildMailtoUrl(submitted),
      })
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="contact-form" aria-describedby="contact-form-note">
      <div className="contact-form-grid">
        <Field id="fullName" label="Your Name" required icon={User} error={errors.fullName}>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            placeholder="Enter your name"
            value={formData.fullName}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={!!errors.fullName}
            aria-describedby={describedBy('fullName')}
          />
        </Field>

        <Field id="email" label="Your Email" required icon={Mail} error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={describedBy('email')}
          />
        </Field>

        <Field id="phone" label="Phone Number" icon={Phone} error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            aria-invalid={!!errors.phone}
            aria-describedby={describedBy('phone')}
          />
        </Field>

        <Field id="service" label="Subject" required icon={FileText} error={errors.service}>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className={formData.service ? '' : 'is-placeholder'}
            aria-required="true"
            aria-invalid={!!errors.service}
            aria-describedby={describedBy('service')}
          >
            <option value="" disabled>
              Select a subject
            </option>
            {INQUIRY_SERVICES.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
          <ChevronDown className="contact-select-chevron" aria-hidden="true" />
        </Field>

        <Field
          id="details"
          label="Your Message"
          required
          icon={MessageSquareText}
          error={errors.details}
          hint={
            <span className="contact-counter" aria-hidden="true">
              {formData.details.length}/{MESSAGE_MAX}
            </span>
          }
        >
          <textarea
            id="details"
            name="details"
            rows={3}
            maxLength={MESSAGE_MAX}
            placeholder="Tell us about your project or how we can help you..."
            value={formData.details}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={!!errors.details}
            aria-describedby={describedBy('details')}
          />
        </Field>
      </div>

      <div aria-live="polite" aria-atomic="true">
        <AnimatePresence mode="wait">
          {feedback && (
            <motion.div
              key={feedback.type}
              className={`contact-feedback contact-feedback--${feedback.type}`}
              role={feedback.type === 'error' ? 'alert' : 'status'}
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              {feedback.type === 'success' ? <CheckCircle2 aria-hidden="true" /> : <AlertCircle aria-hidden="true" />}
              <div>
                <p>{feedback.message}</p>
                {feedback.mailto && (
                  <a href={feedback.mailto} className="contact-feedback-action">
                    Open in your email app <ArrowUpRight aria-hidden="true" />
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <button type="submit" className="contact-submit" disabled={isSubmitting}>
        <span className="contact-submit-shine" aria-hidden="true" />
        {isSubmitting ? (
          <>
            <span className="contact-spinner" aria-hidden="true" />
            <span>Sending…</span>
          </>
        ) : (
          <>
            <Send className="contact-submit-plane" aria-hidden="true" />
            <span>Send Message</span>
            <ArrowRight className="contact-submit-arrow" aria-hidden="true" />
          </>
        )}
      </button>

      <p id="contact-form-note" className="contact-form-note">
        Your message goes straight to {contact.email}. See our <Link to="/privacy">privacy policy</Link>.
      </p>
    </form>
  )
}

export default function ContactSection() {
  const reduceMotion = useReducedMotion()

  const stagger = (gap, delay = 0) => ({
    hidden: {},
    visible: { transition: { staggerChildren: reduceMotion ? 0 : gap, delayChildren: reduceMotion ? 0 : delay } },
  })

  const lineReveal = {
    hidden: { y: reduceMotion ? 0 : '105%', opacity: reduceMotion ? 0 : 1 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: EASE } },
  }

  const fadeUp = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  }

  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-heading">
      <div className="contact-bg" aria-hidden="true">
        <span className="contact-bg-glow contact-bg-glow--violet" />
        <span className="contact-bg-glow contact-bg-glow--blue" />
        <span className="contact-bg-beam contact-bg-beam--1" />
        <span className="contact-bg-beam contact-bg-beam--2" />
        <span className="contact-bg-grid" />
      </div>

      <div className="contact-container">
        <div className="contact-layout">
          {/* Left: intro, channels + map */}
          <div className="contact-left">
          {/* Intro */}
          <motion.div
            className="contact-intro"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={stagger(0.12)}
          >
            <motion.span variants={fadeUp} className="contact-eyebrow">
              <span className="contact-eyebrow-dot" aria-hidden="true" />
              Let&apos;s Connect
            </motion.span>

            <h2 id="contact-heading" className="contact-heading">
              <span className="contact-heading-line">
                <motion.span variants={lineReveal}>Get In Touch</motion.span>
              </span>{' '}
              <span className="contact-heading-line">
                <motion.span variants={lineReveal}>
                  With <span className="contact-heading-gradient">CosmoGeek</span>
                </motion.span>
              </span>
            </h2>

            <motion.p variants={fadeUp} className="contact-lead">
              Have a project idea, a question, or just want to say hello? We&apos;d love to hear from you.
              Let&apos;s build something amazing together.
            </motion.p>

            <motion.ul variants={stagger(0.08)} className="contact-highlights">
              {HIGHLIGHTS.map(({ icon: Icon, title, text }) => (
                <motion.li key={title} variants={fadeUp} className="contact-highlight">
                  <span className="contact-highlight-icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <span>
                    <strong>{title}</strong>
                    <small>{text}</small>
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

            <motion.ul
              className="contact-cards"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={stagger(0.1)}
            >
              {CONTACT_CARDS.map(({ icon: Icon, title, lines, href, action, external }) => (
                <motion.li key={title} variants={fadeUp}>
                  <a
                    href={href}
                    className="contact-card"
                    aria-label={`${title}: ${action}`}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <span className="contact-card-top">
                      <span className="contact-card-icon" aria-hidden="true">
                        <Icon />
                      </span>
                      <strong className="contact-card-title">{title}</strong>
                      <span className="contact-card-arrow" aria-hidden="true">
                        <ArrowRight />
                      </span>
                    </span>
                    {lines.map((line) => (
                      <span key={line} className="contact-card-line">
                        {line}
                      </span>
                    ))}
                  </a>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              className="contact-map"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, ease: EASE, delay: reduceMotion ? 0 : 0.15 }}
            >
              <div className="contact-map-frame">
                <iframe
                  src={MAP_EMBED_URL}
                  title={`Map showing the Cosmogeek office: ${contact.address}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
                <span className="contact-map-tint" aria-hidden="true" />
                <a
                  href={MAP_VIEW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-map-expand"
                  aria-label="Open the office location in Google Maps"
                >
                  <Maximize2 aria-hidden="true" />
                </a>
              </div>

              <div className="contact-map-bar">
                <span className="contact-map-pin" aria-hidden="true">
                  <MapPin />
                </span>
                <span className="contact-map-address">
                  <strong>Our Office Location</strong>
                  <span>{contact.address}</span>
                </span>
                <a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className="contact-directions">
                  Get Directions <ArrowRight aria-hidden="true" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right: inquiry form */}
          <motion.div
            id="inquiry-form"
            className="contact-form-card"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: EASE, delay: reduceMotion ? 0 : 0.1 }}
          >
            <span className="contact-eyebrow contact-eyebrow--small">
              <span className="contact-eyebrow-dot" aria-hidden="true" />
              Send Us a Message
            </span>
            <h3 className="contact-form-title">
              Let&apos;s Discuss <span className="contact-heading-gradient">Your Project</span>
            </h3>
            <p className="contact-form-lead">
              Fill out the form and our team will get back to you soon.
            </p>
            <InquiryForm />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
