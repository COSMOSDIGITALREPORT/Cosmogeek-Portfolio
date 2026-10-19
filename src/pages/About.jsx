import { Link } from 'react-router-dom'
import { ArrowLeft, Target, Compass, CheckCircle2, ArrowRight } from 'lucide-react'
import { COMPANY_INFO } from '../data/company'
import CompanyHighlights from '../sections/CompanyHighlights'

export default function About() {
  return (
    <div className="py-12 md:py-20 bg-[#071B17] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#9CB8AE] hover:text-white transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#45D6A0] rounded-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="max-w-3xl mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#102D26] border border-[#31594D]/60 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-[#45D6A0] animate-pulse" />
            <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-[#B7CCC4]">
              {COMPANY_INFO.eyebrow}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#DFF8EF]">
            {COMPANY_INFO.name}
          </h1>

          <p className="text-lg sm:text-xl text-[#9CB8AE] leading-relaxed">
            {COMPANY_INFO.summary}
          </p>
        </div>

        {/* Supporting Narrative */}
        <div className="rounded-3xl bg-[#102D26]/80 border border-[#1B4539] p-8 sm:p-10 mb-12 space-y-4">
          <h2 className="text-xl font-bold text-white">Our Engineering Philosophy</h2>
          <p className="text-base text-[#B7CCC4] leading-relaxed">
            {COMPANY_INFO.supportingText}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#1B4539]">
            {COMPANY_INFO.coreValues.map((val) => (
              <div key={val.title} className="p-4 rounded-xl bg-[#163B32]/60 border border-[#31594D]/50 space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-sm font-bold text-white">{val.title}</span>
                </div>
                <p className="text-xs text-[#9CB8AE] leading-relaxed">{val.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Verified Statistics Strip */}
        <div className="rounded-2xl overflow-hidden mb-12">
          <CompanyHighlights />
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="p-7 rounded-2xl bg-[#102D26] border border-[#1B4539] space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#163B32] border border-[#31594D] flex items-center justify-center text-[#45D6A0]">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">{COMPANY_INFO.mission.title}</h3>
            </div>
            <p className="text-sm text-[#B7CCC4] leading-relaxed">
              &ldquo;{COMPANY_INFO.mission.statement}&rdquo;
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-[#102D26] border border-[#1B4539] space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#163B32] border border-[#31594D] flex items-center justify-center text-[#31C48D]">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">{COMPANY_INFO.vision.title}</h3>
            </div>
            <p className="text-sm text-[#B7CCC4] leading-relaxed">
              &ldquo;{COMPANY_INFO.vision.statement}&rdquo;
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-[#102D26] border border-[#1B4539]">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#B7CCC4] hover:text-white"
          >
            <span>Explore Our Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href="/#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#45D6A0] to-[#31C48D] hover:from-[#28A879] hover:to-[#168d68]"
          >
            <span>Start a Project</span>
          </a>
        </div>
      </div>
    </div>
  )
}
