import { AnimatePresence, motion } from 'framer-motion'
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Bell,
  Building2,
  CheckCircle2,
  CircleCheck,
  Database,
  FileText,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Package,
  Phone,
  RefreshCw,
  ScanLine,
  Search,
  Server,
  ShieldCheck,
  Sparkles,
  Ticket,
  TrendingUp,
  UserCheck,
  WifiOff,
} from 'lucide-react'
import { COMPANY_INFO } from '../../data/company'

const EASE = [0.22, 1, 0.36, 1]

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: EASE, delay },
})

const pop = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.85 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: EASE, delay },
})

function itemState(index, highlight) {
  if (index === highlight) return ' is-active'
  if (highlight >= 0 && index < highlight) return ' is-done'
  return ''
}

function SceneHeading({ eyebrow, children }) {
  const words = String(children).split(' ')
  return (
    <header className="vs-heading">
      {eyebrow && (
        <motion.span className="vs-eyebrow" {...rise(0)}>
          <Sparkles aria-hidden="true" />
          {eyebrow}
        </motion.span>
      )}
      <h3>
        {words.map((word, index) => (
          <motion.span key={`${word}-${index}`} className="vs-word" {...rise(0.08 + index * 0.06)}>
            {word}
          </motion.span>
        ))}
      </h3>
      <motion.span className="vs-heading-line" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, ease: EASE, delay: 0.3 }} />
    </header>
  )
}

/* ==========================================================================
   Scene templates
   ========================================================================== */
function TitleScene({ scene, icon: Icon }) {
  return (
    <div className="vs-title">
      <motion.div className="vs-title-badge" initial={{ opacity: 0, scale: 0.5, rotate: -20 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.9, ease: EASE }}>
        <span className="vs-ring vs-ring--1" />
        <span className="vs-ring vs-ring--2" />
        {Icon && <Icon aria-hidden="true" />}
      </motion.div>
      <motion.p className="vs-brand" {...rise(0.25)}>
        Cosmogeek Solutions
      </motion.p>
      <h2 className="vs-title-heading">
        {scene.heading.split(' ').map((word, index) => (
          <motion.span key={`${word}-${index}`} className="vs-word" {...rise(0.35 + index * 0.08)}>
            {word}
          </motion.span>
        ))}
      </h2>
      <motion.p className="vs-title-sub" {...rise(0.7)}>
        {scene.subheading}
      </motion.p>
      <ul className="vs-chips">
        {scene.chips?.map((chip, index) => (
          <motion.li key={chip} {...pop(0.9 + index * 0.12)}>
            <CheckCircle2 aria-hidden="true" />
            {chip}
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

function ProblemsScene({ scene, highlight }) {
  return (
    <div className="vs-pad">
      <SceneHeading eyebrow="The challenge">{scene.heading}</SceneHeading>
      <ul className="vs-grid vs-grid--2">
        {scene.items.map((item, index) => (
          <motion.li key={item} className={`vs-card vs-card--problem${itemState(index, highlight)}`} {...rise(0.3 + index * 0.1)}>
            <span className="vs-card-icon vs-card-icon--warn">
              <AlertTriangle aria-hidden="true" />
            </span>
            <span className="vs-card-text">
              <small>Problem {index + 1}</small>
              <strong>{item}</strong>
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

function FeaturesScene({ scene, highlight }) {
  return (
    <div className="vs-pad">
      <SceneHeading eyebrow="Capabilities">{scene.heading}</SceneHeading>
      <ul className="vs-grid vs-grid--3">
        {scene.items.map((item, index) => (
          <motion.li key={item.title} className={`vs-card${itemState(index, highlight)}`} {...rise(0.3 + index * 0.08)}>
            <span className="vs-card-icon">
              <CircleCheck aria-hidden="true" />
            </span>
            <span className="vs-card-text">
              <strong>{item.title}</strong>
              <small>{item.desc}</small>
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

function FlowScene({ scene, highlight }) {
  const last = scene.items.length - 1
  const fill = highlight < 0 ? 0 : (Math.min(highlight, last) / last) * 100
  return (
    <div className="vs-pad">
      <SceneHeading eyebrow="Process">{scene.heading}</SceneHeading>
      <div className="vs-flow" style={{ '--vs-steps': scene.items.length }}>
        <div className="vs-flow-track">
          <motion.span className="vs-flow-fill" animate={{ width: `${fill}%` }} transition={{ duration: 0.8, ease: EASE }} />
        </div>
        <ol className="vs-flow-steps">
          {scene.items.map((item, index) => (
            <motion.li key={item.title} className={`vs-flow-step${itemState(index, highlight)}`} {...rise(0.3 + index * 0.1)}>
              <span className="vs-flow-node">{index < highlight ? <CheckCircle2 aria-hidden="true" /> : String(index + 1).padStart(2, '0')}</span>
              <strong>{item.title}</strong>
              <small>{item.desc}</small>
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  )
}

function TechScene({ scene, icon: Icon }) {
  const count = scene.items.length
  return (
    <div className="vs-pad vs-tech">
      <SceneHeading eyebrow="Technology">{scene.heading}</SceneHeading>
      <div className="vs-orbit">
        <span className="vs-orbit-ring" />
        <span className="vs-orbit-ring vs-orbit-ring--inner" />
        <motion.span className="vs-orbit-core" {...pop(0.2)}>
          {Icon && <Icon aria-hidden="true" />}
        </motion.span>
        {scene.items.map((item, index) => {
          const angle = (index / count) * Math.PI * 2 - Math.PI / 2
          return (
            <motion.span
              key={item}
              className="vs-orbit-chip"
              style={{ left: `${50 + Math.cos(angle) * 40}%`, top: `${50 + Math.sin(angle) * 38}%`, animationDelay: `${index * -0.7}s` }}
              {...pop(0.4 + index * 0.15)}
            >
              {item}
            </motion.span>
          )
        })}
      </div>
    </div>
  )
}

function BenefitsScene({ scene, highlight }) {
  return (
    <div className="vs-pad">
      <SceneHeading eyebrow="Business value">{scene.heading}</SceneHeading>
      <ul className="vs-grid vs-grid--2">
        {scene.items.map((item, index) => (
          <motion.li key={item.title} className={`vs-card vs-card--benefit${itemState(index, highlight)}`} {...rise(0.3 + index * 0.1)}>
            <span className="vs-card-icon">
              <TrendingUp aria-hidden="true" />
            </span>
            <span className="vs-card-text">
              <strong>{item.title}</strong>
              <small>{item.desc}</small>
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

function UseCasesScene({ scene }) {
  return (
    <div className="vs-pad">
      <SceneHeading eyebrow="Use cases">{scene.heading}</SceneHeading>
      <div className="vs-usecases">
        <ul className="vs-list">
          {scene.items.map((item, index) => (
            <motion.li key={item} {...rise(0.3 + index * 0.12)}>
              <ArrowRight aria-hidden="true" />
              {item}
            </motion.li>
          ))}
        </ul>
        <ul className="vs-industries">
          {scene.industries?.map((industry, index) => (
            <motion.li key={industry} {...pop(0.6 + index * 0.1)}>
              <Building2 aria-hidden="true" />
              {industry}
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function CtaScene({ scene, icon: Icon }) {
  const { contact } = COMPANY_INFO
  const items = [
    { icon: Phone, label: contact.phone },
    { icon: MessageCircle, label: 'WhatsApp us' },
    { icon: Mail, label: contact.email },
    { icon: MapPin, label: 'Wardha, Maharashtra' },
  ]
  return (
    <div className="vs-cta">
      <motion.span className="vs-cta-icon" {...pop(0)}>
        {Icon && <Icon aria-hidden="true" />}
      </motion.span>
      <h2 className="vs-title-heading">
        {scene.heading.split(' ').map((word, index) => (
          <motion.span key={`${word}-${index}`} className="vs-word" {...rise(0.15 + index * 0.07)}>
            {word}
          </motion.span>
        ))}
      </h2>
      <motion.p className="vs-title-sub" {...rise(0.5)}>
        Cosmogeek Solutions Pvt. Ltd. · Since {COMPANY_INFO.since}
      </motion.p>
      <motion.span className="vs-cta-button" {...pop(0.7)}>
        Start a Project <ArrowRight aria-hidden="true" />
      </motion.span>
      <ul className="vs-cta-contacts">
        {items.map(({ icon: ItemIcon, label }, index) => (
          <motion.li key={label} {...rise(0.9 + index * 0.1)}>
            <ItemIcon aria-hidden="true" />
            {label}
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

/* ==========================================================================
   Illustrative UI demonstrations
   ========================================================================== */
function BrowserDemo({ step }) {
  const mobile = step >= 2
  return (
    <motion.div className={`vs-browser${mobile ? ' is-mobile' : ''}`} animate={{ width: mobile ? '30%' : '76%' }} transition={{ duration: 0.9, ease: EASE }}>
      <div className="vs-browser-bar">
        <i /><i /><i />
        <span>yourbusiness.in</span>
      </div>
      <div className="vs-browser-body">
        <div className="vs-site-nav">
          <b />
          {mobile ? <span className="vs-burger" /> : <span className="vs-site-links"><i /><i /><i /><i /></span>}
        </div>
        <motion.div className="vs-site-hero" {...rise(0.2)}>
          <span className="vs-line vs-line--lg" />
          <span className="vs-line vs-line--md" />
          <span className="vs-line vs-line--sm" />
          <span className={`vs-site-btn${step >= 1 ? ' is-pulse' : ''}`}>Get a Quote</span>
        </motion.div>
        <div className="vs-site-cards">
          {[0, 1, 2].map((index) => (
            <motion.span key={index} className={step >= 1 ? 'is-on' : ''} {...rise(0.4 + index * 0.1)}>
              <i />
              <b />
              <em />
            </motion.span>
          ))}
        </div>
        {step >= 1 && (
          <motion.span className="vs-site-wa" {...pop(0.2)}>
            <MessageCircle aria-hidden="true" />
          </motion.span>
        )}
      </div>
    </motion.div>
  )
}

function PhoneDemo({ step }) {
  return (
    <div className="vs-phone">
      <div className="vs-phone-screen">
        <div className="vs-phone-top">
          <strong>{step >= 2 ? 'Track order' : 'Shop'}</strong>
          <Bell aria-hidden="true" />
        </div>
        <AnimatePresence mode="wait">
          {step < 2 ? (
            <motion.ul key="list" className="vs-phone-list" exit={{ opacity: 0 }}>
              {['Fresh basket', 'Daily essentials', 'Weekly pack', 'Special offer'].map((item, index) => (
                <motion.li key={item} {...rise(0.15 + index * 0.1)}>
                  <Package aria-hidden="true" />
                  <span>{item}</span>
                  <b>Add</b>
                </motion.li>
              ))}
            </motion.ul>
          ) : (
            <motion.div key="map" className="vs-phone-map" {...rise(0)}>
              <svg viewBox="0 0 120 160" aria-hidden="true">
                <path className="vs-map-road" d="M10 150 C 40 120, 20 90, 60 80 S 100 40, 110 10" />
                <path className="vs-map-route" d="M10 150 C 40 120, 20 90, 60 80 S 100 40, 110 10" />
                <circle className="vs-map-dot" r="5" />
                <circle cx="110" cy="10" r="5" className="vs-map-pin" />
              </svg>
              <span className="vs-phone-eta">Arriving soon</span>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {step === 1 && (
            <motion.div className="vs-phone-toast" initial={{ y: '-120%' }} animate={{ y: 0 }} exit={{ y: '-120%' }} transition={{ duration: 0.5, ease: EASE }}>
              <Bell aria-hidden="true" />
              <span>
                <strong>Order confirmed</strong>
                <small>We will notify you at every step</small>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        {step >= 3 && (
          <motion.div className="vs-phone-sync" {...pop(0)}>
            <span className="vs-sync-offline"><WifiOff aria-hidden="true" /> Saved offline</span>
            <span className="vs-sync-online"><RefreshCw aria-hidden="true" /> Synced</span>
          </motion.div>
        )}
      </div>
    </div>
  )
}

function PipelineDemo({ step }) {
  const stages = [
    { icon: FileText, title: 'Invoice received', note: 'Email / WhatsApp' },
    { icon: ScanLine, title: 'AI extraction', note: 'Fields detected' },
    { icon: UserCheck, title: 'Manager approval', note: 'Human review' },
    { icon: Database, title: 'ERP & dashboard', note: 'Entry posted' },
  ]
  const fields = [['Supplier', 'Agro Traders'], ['Amount', '₹ 18,450'], ['GST', '18%'], ['Date', '12 Oct']]
  return (
    <div className="vs-pipeline">
      {stages.map(({ icon: StageIcon, title, note }, index) => (
        <motion.div key={title} className={`vs-stage-card${itemState(index, step)}`} {...rise(0.15 + index * 0.12)}>
          <span className="vs-card-icon">
            <StageIcon aria-hidden="true" />
          </span>
          <strong>{title}</strong>
          <small>{note}</small>
          {index === 1 && step >= 1 && (
            <ul className="vs-fields">
              {fields.map(([label, value], i) => (
                <motion.li key={label} {...rise(0.2 + i * 0.25)}>
                  <span>{label}</span>
                  <b>{value}</b>
                </motion.li>
              ))}
            </ul>
          )}
          {index === 2 && step >= 2 && (
            <motion.span className="vs-approved" {...pop(0.6)}>
              <CheckCircle2 aria-hidden="true" /> Approved
            </motion.span>
          )}
          {index === 3 && step >= 3 && (
            <div className="vs-mini-bars">
              {[40, 62, 50, 78, 66].map((h, i) => (
                <motion.i key={i} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.6, delay: 0.3 + i * 0.08 }} style={{ height: `${h}%` }} />
              ))}
            </div>
          )}
          {index < stages.length - 1 && <span className={`vs-connector${step > index ? ' is-on' : ''}`} />}
        </motion.div>
      ))}
    </div>
  )
}

const CHAT = [
  { step: 0, from: 'user', text: 'Hi' },
  { step: 1, from: 'bot', text: 'Welcome! 👋 How can we help you today?' },
  { step: 1, from: 'menu', items: ['Products', 'Prices', 'Book a visit', 'Talk to team'] },
  { step: 2, from: 'user', text: 'Book a visit' },
  { step: 2, from: 'bot', text: 'Great! Please share your name and a preferred time.' },
  { step: 3, from: 'user', text: 'Priya, Saturday 11 AM' },
  { step: 3, from: 'bot', text: '✅ Booked for Saturday, 11 AM. See you then!' },
  { step: 3, from: 'system', text: 'Lead saved to CRM' },
  { step: 4, from: 'user', text: 'Can I talk to someone?' },
  { step: 4, from: 'system', text: 'Connected to your team · full history shared' },
]

function ChatDemo({ step }) {
  return (
    <div className="vs-chat">
      <div className="vs-chat-head">
        <span className="vs-chat-avatar">
          <MessageCircle aria-hidden="true" />
        </span>
        <span>
          <strong>Your Business</strong>
          <small>Official business account</small>
        </span>
      </div>
      <div className="vs-chat-body">
        <AnimatePresence initial={false}>
          {CHAT.filter((message) => message.step <= step).map((message, index) => {
            // Messages of the current step arrive one after another, like a real chat
            const order = CHAT.filter((m) => m.step === message.step).indexOf(message)
            return (
            <motion.div key={index} layout className={`vs-msg vs-msg--${message.from}`} initial={{ opacity: 0, y: 12, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.4, ease: EASE, delay: message.step === step ? 0.2 + order * 0.9 : 0 }}>
              {message.from === 'menu' ? (
                message.items.map((item) => <span key={item}>{item}</span>)
              ) : (
                message.text
              )}
            </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}

const CODE_LINES = [
  ['kw', 'const '], ['fn', 'approveOrder'], ['', ' = async (order) => {'],
  null,
  ['', '  '], ['kw', 'if '], ['', '(order.total > '], ['nu', 'limit'], ['', ') '], ['kw', 'return '], ['fn', 'requestApproval'], ['', '(order)'],
  null,
  ['', '  '], ['kw', 'await '], ['fn', 'inventory.reserve'], ['', '(order.items)'],
  null,
  ['', '  '], ['kw', 'await '], ['fn', 'notify'], ['', '(order.customer, '], ['st', "'confirmed'"], ['', ')'],
  null,
  ['', '}'],
]

function codeRows() {
  const rows = [[]]
  for (const token of CODE_LINES) {
    if (token === null) rows.push([])
    else rows[rows.length - 1].push(token)
  }
  return rows
}

function CodeDemo({ step }) {
  return (
    <AnimatePresence mode="wait">
      {step === 0 && (
        <motion.div key="code" className="vs-editor" {...rise(0)} exit={{ opacity: 0, y: -12 }}>
          <div className="vs-browser-bar">
            <i /><i /><i />
            <span>orders/rules.js</span>
          </div>
          <pre>
            {codeRows().map((row, index) => (
              <motion.span key={index} className="vs-code-row" initial={{ clipPath: 'inset(0 100% 0 0)' }} animate={{ clipPath: 'inset(0 0% 0 0)' }} transition={{ duration: 0.8, delay: 0.3 + index * 0.6, ease: 'linear' }}>
                <em>{index + 1}</em>
                {row.map(([kind, text], i) => <span key={i} className={kind ? `tk-${kind}` : undefined}>{text}</span>)}
              </motion.span>
            ))}
          </pre>
        </motion.div>
      )}
      {step === 1 && (
        <motion.div key="modules" className="vs-modules" {...rise(0)} exit={{ opacity: 0, y: -12 }}>
          <motion.span className="vs-module-hub" {...pop(0.1)}>API</motion.span>
          {['Users', 'Orders', 'Inventory', 'Reports'].map((name, index) => (
            <motion.span key={name} className={`vs-module vs-module--${index}`} {...pop(0.3 + index * 0.2)}>
              {name}
            </motion.span>
          ))}
          <svg className="vs-module-lines" viewBox="0 0 100 60" preserveAspectRatio="none" aria-hidden="true">
            {[[20, 14], [80, 14], [20, 46], [80, 46]].map(([x, y], index) => (
              <motion.line key={index} x1="50" y1="30" x2={x} y2={y} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.5 + index * 0.2 }} />
            ))}
          </svg>
        </motion.div>
      )}
      {step >= 2 && <DashboardDemo key="dash" />}
    </AnimatePresence>
  )
}

function DashboardDemo({ title = 'Operations dashboard' }) {
  return (
    <motion.div className="vs-dash" {...rise(0)} exit={{ opacity: 0, y: -12 }}>
      <div className="vs-dash-head">
        <strong>{title}</strong>
        <span>Live</span>
      </div>
      <div className="vs-dash-tiles">
        {['Orders', 'Pending', 'Completed'].map((label, index) => (
          <motion.span key={label} {...pop(0.2 + index * 0.12)}>
            <small>{label}</small>
            <b className="vs-skeleton" />
          </motion.span>
        ))}
      </div>
      <div className="vs-dash-chart">
        {[35, 52, 44, 68, 58, 80, 72, 90].map((h, index) => (
          <motion.i key={index} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.6, delay: 0.4 + index * 0.06, ease: EASE }} style={{ height: `${h}%` }} />
        ))}
      </div>
    </motion.div>
  )
}

function BillingDemo({ step }) {
  const rows = [['Rice 5 kg', '1', '₹ 450'], ['Cooking oil 1 L', '2', '₹ 320'], ['Tea 500 g', '1', '₹ 240'], ['Biscuits', '4', '₹ 160']]
  return (
    <div className="vs-billing">
      <div className="vs-invoice">
        <div className="vs-invoice-head">
          <strong>Tax Invoice</strong>
          <span><ScanLine aria-hidden="true" /> Scanning…</span>
        </div>
        <ul>
          {rows.map(([item, qty, amount], index) => (
            <motion.li key={item} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.3 + index * 0.7 }}>
              <span>{item}</span>
              <span>{qty}</span>
              <span>{amount}</span>
            </motion.li>
          ))}
        </ul>
        <div className={`vs-invoice-tax${step >= 1 ? ' is-on' : ''}`}>
          <span>Taxable value</span><b>₹ 1,170</b>
          <span>CGST + SGST</span><b>{step >= 1 ? 'Auto-calculated' : '—'}</b>
          <span>HSN codes</span><b>{step >= 1 ? 'Applied' : '—'}</b>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {step < 2 && (
          <motion.div key="idle" className="vs-side-card vs-side-card--idle" {...rise(0.4)} exit={{ opacity: 0 }}>
            <Package aria-hidden="true" />
            <strong>Inventory</strong>
            <small>Updates the moment the bill is saved</small>
          </motion.div>
        )}
        {step === 2 && (
          <motion.div key="stock" className="vs-side-card" {...rise(0)} exit={{ opacity: 0 }}>
            <Package aria-hidden="true" />
            <strong>Cooking oil 1 L</strong>
            <span className="vs-stock">
              <motion.b initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ delay: 0.8, duration: 0.3 }}>8</motion.b>
              <motion.b initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.3 }}>6</motion.b>
              <small>in stock</small>
            </span>
            <motion.span className="vs-alert" {...pop(1.6)}>
              <AlertTriangle aria-hidden="true" /> Low stock alert
            </motion.span>
          </motion.div>
        )}
        {step >= 3 && (
          <motion.div key="dash" className="vs-side-card vs-side-card--dash" {...rise(0)} exit={{ opacity: 0 }}>
            <BarChart3 aria-hidden="true" />
            <strong>Owner dashboard</strong>
            <ul className="vs-kpis">
              <li><small>Today's sales</small><b>Updated</b></li>
              <li><small>Outstanding dues</small><b>3 reminders</b></li>
              <li><small>GST report</small><b>Ready</b></li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function MarketingDemo({ step }) {
  const results = step >= 1 ? ['Your Business', 'Competitor A', 'Directory listing', 'Competitor B'] : ['Competitor A', 'Directory listing', 'Competitor B', 'Your Business']
  return (
    <AnimatePresence mode="wait">
      {step <= 1 && (
        <motion.div key="search" className="vs-search" {...rise(0)} exit={{ opacity: 0, y: -12 }}>
          <div className="vs-search-box">
            <Search aria-hidden="true" />
            <motion.span initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1.6, ease: 'linear', delay: 0.3 }}>
              software company near me
            </motion.span>
          </div>
          <ul className="vs-results">
            {results.map((result) => (
              <motion.li key={result} layout transition={{ duration: 0.8, ease: EASE }} className={result === 'Your Business' ? 'is-you' : ''}>
                <Globe aria-hidden="true" />
                <span>
                  <strong>{result}</strong>
                  <small>{result === 'Your Business' ? 'Fast site · Google Business Profile · Reviews' : 'Search result'}</small>
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
      {step === 2 && (
        <motion.div key="landing" className="vs-landing" {...rise(0)} exit={{ opacity: 0, y: -12 }}>
          <span className="vs-line vs-line--lg" />
          <span className="vs-line vs-line--md" />
          <div className="vs-landing-actions">
            <span className="vs-site-btn is-pulse">Send Inquiry</span>
            <span className="vs-site-btn vs-site-btn--wa"><MessageCircle aria-hidden="true" /> WhatsApp</span>
          </div>
          <div className="vs-site-cards">
            <span className="is-on"><i /><b /><em /></span>
            <span className="is-on"><i /><b /><em /></span>
            <span className="is-on"><i /><b /><em /></span>
          </div>
        </motion.div>
      )}
      {step >= 3 && (
        <motion.div key="report" className="vs-dash" {...rise(0)} exit={{ opacity: 0 }}>
          <div className="vs-dash-head">
            <strong>Leads by channel</strong>
            <span>Monthly report</span>
          </div>
          <ul className="vs-channels">
            {[['Search (SEO)', 82], ['Google Ads', 64], ['Social media', 48], ['Referrals', 30]].map(([label, value], index) => (
              <li key={label}>
                <span>{label}</span>
                <motion.i initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 0.9, delay: 0.3 + index * 0.15, ease: EASE }} />
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function SupportDemo({ step }) {
  const services = ['Website', 'ERP server', 'Database', 'Backups']
  return (
    <div className="vs-support">
      <div className="vs-monitor">
        <div className="vs-dash-head">
          <strong>System health</strong>
          <span>Uptime monitoring</span>
        </div>
        <ul>
          {services.map((name, index) => {
            const down = name === 'ERP server' && step === 1
            return (
              <motion.li key={name} className={down ? 'is-down' : ''} {...rise(0.2 + index * 0.1)}>
                <Server aria-hidden="true" />
                <span>{name}</span>
                <b>{down ? 'High CPU' : 'Healthy'}</b>
              </motion.li>
            )
          })}
        </ul>
      </div>
      <AnimatePresence>
        {step >= 1 && (
          <motion.div className={`vs-ticket${step >= 2 ? ' is-resolved' : ''}`} {...rise(0.3)}>
            <Ticket aria-hidden="true" />
            <strong>Ticket #1042</strong>
            <small>ERP server · high CPU usage</small>
            <span className="vs-ticket-status">
              {step >= 2 ? (
                <>
                  <ShieldCheck aria-hidden="true" /> Resolved · update shared
                </>
              ) : (
                <>
                  <AlertTriangle aria-hidden="true" /> Alert raised · team notified
                </>
              )}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const DEMOS = {
  browser: BrowserDemo,
  phone: PhoneDemo,
  pipeline: PipelineDemo,
  chat: ChatDemo,
  code: CodeDemo,
  billing: BillingDemo,
  marketing: MarketingDemo,
  support: SupportDemo,
}

function UiScene({ scene, highlight }) {
  const Demo = DEMOS[scene.variant] ?? BrowserDemo
  return (
    <div className="vs-pad vs-ui">
      <SceneHeading eyebrow="See it in action">{scene.heading}</SceneHeading>
      <div className="vs-ui-stage">
        <Demo step={Math.max(0, highlight)} />
      </div>
      <span className="vs-ui-tag">Illustrative demo</span>
    </div>
  )
}

const TEMPLATES = {
  title: TitleScene,
  problems: ProblemsScene,
  features: FeaturesScene,
  flow: FlowScene,
  tech: TechScene,
  benefits: BenefitsScene,
  usecases: UseCasesScene,
  cta: CtaScene,
  ui: UiScene,
}

export default function VideoScene({ scene, highlight, icon, serviceTitle }) {
  const Template = TEMPLATES[scene.template] ?? TitleScene
  return (
    <div className={`vs-root vs-root--${scene.template}`} aria-hidden="true">
      <span className="vs-bg-glow" />
      <span className="vs-bg-grid" />
      <Template scene={scene} highlight={highlight} icon={icon} />
      <span className="vs-watermark">
        {serviceTitle} · Cosmogeek
      </span>
    </div>
  )
}
