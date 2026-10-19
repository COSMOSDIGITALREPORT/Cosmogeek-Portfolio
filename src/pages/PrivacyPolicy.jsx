import { Link } from 'react-router-dom'
import { ArrowLeft, Shield } from 'lucide-react'
import { COMPANY_INFO } from '../data/company'

export default function PrivacyPolicy() {
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
            <Shield className="w-3.5 h-3.5 text-[#45D6A0]" />
            <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-[#B7CCC4]">
              LEGAL NOTICE
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Privacy Policy
          </h1>
          <p className="text-sm text-[#9CB8AE]">
            Last Updated: October 2026 • CosmoGeek Software Solution
          </p>
        </div>

        <div className="rounded-3xl bg-[#102D26]/80 border border-[#1B4539] p-8 sm:p-10 space-y-6 text-sm text-[#B7CCC4] leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">1. Information Collection</h2>
            <p>
              CosmoGeek Software Solution collects information provided voluntarily when you submit an inquiry regarding our software engineering, web development, mobile application, or automation services. This includes your name, email address, phone number, and project specifications.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">2. Use of Information</h2>
            <p>
              Information collected is utilized exclusively for evaluating project requirements, establishing commercial proposals, and communicating technical specifications. We do not sell or rent client data to third parties.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">3. Data Security</h2>
            <p>
              We implement industry-standard technical measures and secure communication channels to protect the confidentiality and integrity of your submitted project information.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">4. Inquiries & Contact</h2>
            <p>
              For privacy-related questions or data clarification, please contact our team directly at{' '}
              <a href={`mailto:${COMPANY_INFO.contact.email}`} className="text-[#45D6A0] hover:underline">
                {COMPANY_INFO.contact.email}
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
