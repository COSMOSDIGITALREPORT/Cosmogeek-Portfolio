import { motion, useReducedMotion } from 'framer-motion'
import { CheckCircle2, Shield } from 'lucide-react'
import { COMPANY_STATS } from '../data/company'

export default function CompanyHighlights() {
  const shouldReduceMotion = useReducedMotion()

  // Only display verified metrics; unverified metrics are safely held back
  const verifiedStats = COMPANY_STATS.filter((stat) => stat.isVerified)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <section
      aria-label="Company Key Metrics"
      className="relative bg-[#0B241F] border-y border-[#1B4539]/80 py-10 sm:py-14 overflow-hidden"
    >
      {/* Background subtle illumination */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#45D6A0]/5 via-transparent to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/80"
        >
          {verifiedStats.map((stat, idx) => (
            <motion.div
              key={stat.id}
              variants={itemVariants}
              className={`flex flex-col items-center sm:items-start text-center sm:text-left ${
                idx > 0 ? 'sm:pl-8 pt-4 sm:pt-0' : ''
              }`}
            >
              {/* Metric Number / Badge */}
              <div className="flex items-baseline gap-1.5 mb-1.5">
                <span className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-[#9CB8AE] bg-clip-text text-transparent">
                  {stat.value}
                </span>
                {stat.unit && (
                  <span className="text-xs font-semibold text-[#45D6A0] uppercase tracking-wider">
                    {stat.unit}
                  </span>
                )}
              </div>

              {/* Label */}
              <div className="flex items-center gap-1.5 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#31C48D]" />
                <h3 className="text-sm font-bold text-white tracking-wide">
                  {stat.label}
                </h3>
              </div>

              {/* Verified Description */}
              <p className="text-xs text-[#9CB8AE] leading-relaxed max-w-[200px]">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Small Data Integrity Footnote */}
        <div className="mt-8 pt-4 border-t border-[#1B4539]/50 flex items-center justify-center gap-2 text-[11px] text-[#DFF8EF]0">
          <Shield className="w-3 h-3 text-[#9CB8AE]" />
          <span>Verified Capabilities & Documented Technical Catalog</span>
        </div>
      </div>
    </section>
  )
}
