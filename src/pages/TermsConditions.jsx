import { Link } from 'react-router-dom'
import { ArrowLeft, FileText } from 'lucide-react'

export default function TermsConditions() {
  return (
    <div className="py-12 md:py-20 bg-[#071B17] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#9CB8AE] hover:text-white transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#45D6A0] rounded-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#102D26] border border-[#31594D]/60 shadow-inner">
            <FileText className="w-3.5 h-3.5 text-[#31C48D]" />
            <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-[#B7CCC4]">
              TERMS OF SERVICE
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Terms & Conditions
          </h1>
          <p className="text-sm text-[#9CB8AE]">
            Last Updated: October 2026 • CosmoGeek Software Solution
          </p>
        </div>

        <div className="rounded-3xl bg-[#102D26]/80 border border-[#1B4539] p-8 sm:p-10 space-y-6 text-sm text-[#B7CCC4] leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">1. Scope of Services</h2>
            <p>
              CosmoGeek Software Solution delivers professional software engineering, mobile application development, enterprise ERP implementation, and digital automation services governed by individualized statements of work (SOW) executed between CosmoGeek and our clients.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">2. Intellectual Property</h2>
            <p>
              All proprietary digital architecture, documentation, and source code developed for designated client engagements are assigned in accordance with contractual terms upon completion of milestone commitments.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">3. Estimates & Consultations</h2>
            <p>
              Preliminary project estimates, consultations, and architectural reviews submitted through this portfolio website are informational and subject to formal specification validation prior to development agreement execution.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">4. Governing Law</h2>
            <p>
              Any disputes arising from or relating to digital services provided by CosmoGeek Software Solution shall be subject to applicable commercial jurisdiction in West Bengal, India.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
