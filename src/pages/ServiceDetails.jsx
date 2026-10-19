import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Cpu,
  Mail,
  MapPin,
  MessageCircle,
  PackageCheck,
  Phone,
  PlayCircle,
  Sparkles,
  Target,
  TrendingUp,
} from 'lucide-react'
import { FEATURED_SERVICES, findService } from '../data/services'
import { PROJECTS_DATA } from '../data/projects'
import { COMPANY_INFO } from '../data/company'
import ProjectCard from '../components/ProjectCard'
import Reveal from '../components/motion/Reveal'
import ServiceVideoPlayer from '../components/service-video/ServiceVideoPlayer'
import './ServiceDetails.css'

const EASE = [0.22, 1, 0.36, 1]
const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

function SectionHeading({ eyebrow, title, text }) {
  return (
    <Reveal className="sd-section-head">
      <span className="sd-eyebrow">
        <span className="sd-eyebrow-dot" aria-hidden="true" />
        {eyebrow}
      </span>
      <h2>{title}</h2>
      <motion.span
        className="sd-head-line"
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
      />
      {text && <p>{text}</p>}
    </Reveal>
  )
}

/** Normalizes featured and legacy service entries into one shape for the page. */
function describe(service) {
  return {
    intro: service.intro ?? [service.fullDescription],
    features: service.features ?? (service.capabilities ?? []).map((title) => ({ title })),
    benefits: service.benefits ?? [],
    deliverables: service.deliverables ?? [],
    useCases: service.useCases ?? [],
    industries: service.industries ?? [],
  }
}

export default function ServiceDetails() {
  const { slug } = useParams()
  const service = findService(slug)
  const reduceMotion = useReducedMotion()
  const [openFaq, setOpenFaq] = useState(0)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 })

  if (!service) {
    return (
      <div className="sd-missing">
        <h1>Service Not Found</h1>
        <p>The requested service page does not exist or may have been updated.</p>
        <Link to="/#services" className="sd-btn sd-btn--primary">
          <ArrowLeft aria-hidden="true" /> Browse All Services
        </Link>
      </div>
    )
  }

  const Icon = service.icon
  const content = describe(service)
  const featuredIndex = FEATURED_SERVICES.findIndex((s) => s.id === service.id)
  const ring = featuredIndex === -1 ? null : FEATURED_SERVICES
  const prevService = ring && ring[(featuredIndex - 1 + ring.length) % ring.length]
  const nextService = ring && ring[(featuredIndex + 1) % ring.length]
  const relatedProjects = (service.relatedProjectSlugs || [])
    .map((pSlug) => PROJECTS_DATA.find((p) => p.slug === pSlug))
    .filter(Boolean)

  const { contact } = COMPANY_INFO
  const inquiryHref = `/?service=${encodeURIComponent(service.inquiryLabel ?? 'General Inquiry')}#contact`
  const whatsappHref = `https://wa.me/${contact.phoneRaw.replace('+', '')}?text=${encodeURIComponent(
    `Hello Cosmogeek, I'd like to discuss ${service.title} for my business.`,
  )}`
  const mailHref = `mailto:${contact.email}?subject=${encodeURIComponent(`${service.title} inquiry`)}`

  const scrollToVideo = (event) => {
    event.preventDefault()
    document.getElementById('explainer')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={service.id}
        className="sd-page"
        initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <motion.div className="sd-progress" style={{ scaleX: progress }} aria-hidden="true" />
        <div className="sd-bg" aria-hidden="true">
          <span className="sd-bg-glow sd-bg-glow--a" />
          <span className="sd-bg-glow sd-bg-glow--b" />
          <span className="sd-bg-grid" />
        </div>

        <div className="sd-container">
          {/* Breadcrumb + quick navigation */}
          <nav className="sd-topbar" aria-label="Breadcrumb">
            <ol className="sd-crumbs">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/#services">Services</Link></li>
              <li aria-current="page">{service.title}</li>
            </ol>
            {ring && (
              <div className="sd-topbar-nav">
                <Link to={`/services/${prevService.slug}`} className="sd-chip-btn" aria-label={`Previous service: ${prevService.title}`}>
                  <ChevronLeft aria-hidden="true" />
                </Link>
                <span className="sd-counter">
                  {featuredIndex + 1} / {ring.length}
                </span>
                <Link to={`/services/${nextService.slug}`} className="sd-chip-btn" aria-label={`Next service: ${nextService.title}`}>
                  <ChevronRight aria-hidden="true" />
                </Link>
              </div>
            )}
          </nav>

          {/* Hero */}
          <header className="sd-hero">
            <div className="sd-hero-copy">
              <motion.div className="sd-hero-meta" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}>
                <span className="sd-tag">{service.category}</span>
                {service.verificationNote && (
                  <span className="sd-tag sd-tag--warn">
                    <AlertTriangle aria-hidden="true" /> Proposed Capability
                  </span>
                )}
              </motion.div>

              <h1 className="sd-title" aria-label={service.title}>
                {service.title.split(' ').map((word, index) => (
                  <span key={`${word}-${index}`} className="sd-title-mask" aria-hidden="true">
                    <motion.span
                      className="sd-title-word"
                      initial={{ y: reduceMotion ? 0 : '105%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.8, ease: EASE, delay: reduceMotion ? 0 : 0.15 + index * 0.08 }}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </h1>

              <motion.p className="sd-headline" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay: 0.45 }}>
                {service.headline}
              </motion.p>
              <motion.p className="sd-lead" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay: 0.55 }}>
                {service.fullDescription}
              </motion.p>

              <motion.div className="sd-actions" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay: 0.65 }}>
                <Link to={inquiryHref} className="sd-btn sd-btn--primary">
                  Start a Project <ArrowRight aria-hidden="true" />
                </Link>
                {service.featured && (
                  <a href="#explainer" onClick={scrollToVideo} className="sd-btn sd-btn--ghost">
                    <PlayCircle aria-hidden="true" /> Watch the explanation
                  </a>
                )}
              </motion.div>
            </div>

            <motion.div
              className="sd-hero-visual"
              aria-hidden="true"
              initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
            >
              <span className="sd-orbit sd-orbit--outer" />
              <span className="sd-orbit sd-orbit--inner" />
              <span className="sd-hero-icon">
                <Icon />
              </span>
              {service.technologies.slice(0, 4).map((tech, index) => (
                <span key={tech} className={`sd-float-chip sd-float-chip--${index}`}>
                  {tech}
                </span>
              ))}
            </motion.div>
          </header>

          {service.verificationNote && <p className="sd-note">{service.verificationNote}</p>}

          {/* Explanation video */}
          {service.featured && (
            <section id="explainer" className="sd-section sd-video-section" aria-labelledby="explainer-heading">
              <Reveal className="sd-section-head">
                <span className="sd-eyebrow">
                  <span className="sd-eyebrow-dot" aria-hidden="true" />
                  Explanation video
                </span>
                <h2 id="explainer-heading">{service.title}, explained</h2>
                <p>
                  A complete walkthrough with Hindi / Hinglish narration and English subtitles: what it is, the problems it
                  solves, features, process, technologies and real-world uses.
                </p>
              </Reveal>
              <Reveal y={30}>
                <ServiceVideoPlayer key={service.slug} slug={service.slug} title={service.title} icon={Icon} />
              </Reveal>
            </section>
          )}

          {/* Overview */}
          <section className="sd-section sd-overview">
            <SectionHeading eyebrow="Overview" title={`What is ${service.title}?`} />
            <div className="sd-overview-body">
              <Reveal stagger={0.12} className="sd-prose">
                {content.intro.map((paragraph) => (
                  <motion.p key={paragraph.slice(0, 24)} variants={itemVariants}>
                    {paragraph}
                  </motion.p>
                ))}
              </Reveal>
              <Reveal className="sd-glance" delay={0.15}>
                <h3>At a glance</h3>
                <dl>
                  <div>
                    <dt><Target aria-hidden="true" /> Category</dt>
                    <dd>{service.category}</dd>
                  </div>
                  <div>
                    <dt><Cpu aria-hidden="true" /> Core stack</dt>
                    <dd>{service.technologies.slice(0, 3).join(', ')}</dd>
                  </div>
                  <div>
                    <dt><MapPin aria-hidden="true" /> Delivered from</dt>
                    <dd>{contact.city}</dd>
                  </div>
                  <div>
                    <dt><Clock aria-hidden="true" /> Support hours</dt>
                    <dd>{contact.businessHoursShort}</dd>
                  </div>
                </dl>
              </Reveal>
            </div>
          </section>

          {/* Problems & benefits */}
          <section className="sd-section">
            <SectionHeading
              eyebrow="Business impact"
              title="Problems we solve & the value you get"
              text="Every engagement starts from a real business problem and ends with a measurable improvement in how your team works."
            />
            <div className="sd-two-col">
              <Reveal stagger={0.08} as="ul" className="sd-problem-list">
                {service.challenges.map((challenge) => (
                  <motion.li key={challenge} variants={itemVariants}>
                    <span className="sd-icon sd-icon--warn"><AlertTriangle aria-hidden="true" /></span>
                    {challenge}
                  </motion.li>
                ))}
              </Reveal>
              {content.benefits.length > 0 && (
                <Reveal stagger={0.08} as="ul" className="sd-benefit-grid">
                  {content.benefits.map((benefit) => (
                    <motion.li key={benefit.title} variants={itemVariants}>
                      <span className="sd-icon"><TrendingUp aria-hidden="true" /></span>
                      <strong>{benefit.title}</strong>
                      <p>{benefit.desc}</p>
                    </motion.li>
                  ))}
                </Reveal>
              )}
            </div>
          </section>

          {/* Features */}
          <section className="sd-section">
            <SectionHeading eyebrow="Features & capabilities" title="What's included" />
            <Reveal stagger={0.07} as="ul" className="sd-feature-grid">
              {content.features.map((feature, index) => (
                <motion.li key={feature.title} variants={itemVariants} className="sd-feature">
                  <span className="sd-feature-num">{String(index + 1).padStart(2, '0')}</span>
                  <CheckCircle2 aria-hidden="true" className="sd-feature-check" />
                  <strong>{feature.title}</strong>
                  {feature.desc && <p>{feature.desc}</p>}
                </motion.li>
              ))}
            </Reveal>
          </section>

          {/* Technologies */}
          <section className="sd-section">
            <SectionHeading eyebrow="Technology" title="Technologies we use" />
            <Reveal stagger={0.05} as="ul" className="sd-tech">
              {service.technologies.map((tech) => (
                <motion.li key={tech} variants={itemVariants}>
                  <Cpu aria-hidden="true" />
                  {tech}
                </motion.li>
              ))}
            </Reveal>
          </section>

          {/* Process & deliverables */}
          <section className="sd-section">
            <SectionHeading eyebrow="Methodology" title="Development process & deliverables" />
            <div className="sd-process-wrap">
              <Reveal stagger={0.1} as="ol" className="sd-timeline">
                {service.approach.map((step) => (
                  <motion.li key={step.step} variants={itemVariants}>
                    <span className="sd-timeline-node">{step.step}</span>
                    <div>
                      <strong>{step.title}</strong>
                      <p>{step.desc}</p>
                      {step.deliverable && (
                        <span className="sd-deliverable-tag">
                          <PackageCheck aria-hidden="true" /> {step.deliverable}
                        </span>
                      )}
                    </div>
                  </motion.li>
                ))}
              </Reveal>
              {content.deliverables.length > 0 && (
                <Reveal className="sd-deliverables" delay={0.15}>
                  <h3>
                    <PackageCheck aria-hidden="true" /> What you receive
                  </h3>
                  <ul>
                    {content.deliverables.map((item) => (
                      <li key={item}>
                        <CheckCircle2 aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}
            </div>
          </section>

          {/* Use cases & industries */}
          {(content.useCases.length > 0 || content.industries.length > 0) && (
            <section className="sd-section">
              <SectionHeading eyebrow="Use cases" title="Where it fits best" />
              <div className="sd-two-col">
                <Reveal stagger={0.07} as="ul" className="sd-usecases">
                  {content.useCases.map((useCase) => (
                    <motion.li key={useCase} variants={itemVariants}>
                      <ArrowRight aria-hidden="true" />
                      {useCase}
                    </motion.li>
                  ))}
                </Reveal>
                <Reveal stagger={0.06} as="ul" className="sd-industries">
                  {content.industries.map((industry) => (
                    <motion.li key={industry} variants={itemVariants}>
                      <Building2 aria-hidden="true" />
                      {industry}
                    </motion.li>
                  ))}
                </Reveal>
              </div>
            </section>
          )}

          {/* Related projects */}
          {relatedProjects.length > 0 && (
            <section className="sd-section">
              <div className="sd-row-head">
                <SectionHeading eyebrow="Proven execution" title="Related projects" />
                <Link to="/portfolio" className="sd-text-link">
                  View full portfolio <ArrowUpRight aria-hidden="true" />
                </Link>
              </div>
              <div className="sd-projects">
                {relatedProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </section>
          )}

          {/* FAQs */}
          {service.faqs?.length > 0 && (
            <section className="sd-section">
              <SectionHeading eyebrow="Questions answered" title="Frequently asked questions" />
              <div className="sd-faqs">
                {service.faqs.map((faq, index) => {
                  const open = openFaq === index
                  return (
                    <div key={faq.q} className={`sd-faq${open ? ' is-open' : ''}`}>
                      <h3>
                        <button
                          type="button"
                          aria-expanded={open}
                          aria-controls={`faq-${index}`}
                          id={`faq-q-${index}`}
                          onClick={() => setOpenFaq(open ? null : index)}
                        >
                          {faq.q}
                          <ChevronDown aria-hidden="true" />
                        </button>
                      </h3>
                      <AnimatePresence initial={false}>
                        {open && (
                          <motion.div
                            id={`faq-${index}`}
                            role="region"
                            aria-labelledby={`faq-q-${index}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: EASE }}
                          >
                            <p>{faq.a}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            </section>
          )}

          {/* Inquiry CTA */}
          <section className="sd-cta" aria-labelledby="sd-cta-heading">
            <span className="sd-cta-glow" aria-hidden="true" />
            <Reveal className="sd-cta-copy">
              <span className="sd-eyebrow">
                <Sparkles aria-hidden="true" /> Start your project
              </span>
              <h2 id="sd-cta-heading">Ready to discuss your {service.title} project?</h2>
              <p>
                Share your requirements with our team in {contact.city}. We will review them, suggest the right approach
                and send you a clear proposal.
              </p>
              <div className="sd-actions">
                <Link to={inquiryHref} className="sd-btn sd-btn--primary">
                  Send a Project Inquiry <ArrowRight aria-hidden="true" />
                </Link>
                <a href={whatsappHref} target="_blank" rel="noreferrer" className="sd-btn sd-btn--ghost">
                  <MessageCircle aria-hidden="true" /> Chat on WhatsApp
                </a>
              </div>
            </Reveal>
            <Reveal as="ul" stagger={0.08} className="sd-contact-list">
              <motion.li variants={itemVariants}>
                <a href={`tel:${contact.phoneRaw}`}>
                  <Phone aria-hidden="true" />
                  <span><small>Call us</small>{contact.phone}</span>
                </a>
              </motion.li>
              <motion.li variants={itemVariants}>
                <a href={mailHref}>
                  <Mail aria-hidden="true" />
                  <span><small>Email</small>{contact.email}</span>
                </a>
              </motion.li>
              <motion.li variants={itemVariants}>
                <div>
                  <Clock aria-hidden="true" />
                  <span><small>Business hours</small>{contact.businessHours}</span>
                </div>
              </motion.li>
              <motion.li variants={itemVariants}>
                <div>
                  <MapPin aria-hidden="true" />
                  <span><small>Office</small>{contact.address}</span>
                </div>
              </motion.li>
            </Reveal>
          </section>

          {/* Other services */}
          <section className="sd-section">
            <SectionHeading eyebrow="Explore more" title="Other services" />
            <Reveal stagger={0.05} as="ul" className="sd-others">
              {FEATURED_SERVICES.filter((s) => s.id !== service.id).map((other) => {
                const OtherIcon = other.icon
                return (
                  <motion.li key={other.id} variants={itemVariants}>
                    <Link to={`/services/${other.slug}`}>
                      <span className="sd-icon"><OtherIcon aria-hidden="true" /></span>
                      <span>
                        <strong>{other.cardTitle}</strong>
                        <small>{other.category}</small>
                      </span>
                      <ArrowRight aria-hidden="true" className="sd-others-arrow" />
                    </Link>
                  </motion.li>
                )
              })}
            </Reveal>
          </section>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
