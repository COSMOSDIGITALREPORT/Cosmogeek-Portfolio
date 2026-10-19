import { Link } from 'react-router-dom'
import { Home, Briefcase, Mail } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="py-24 md:py-32 bg-[#071B17] min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md mx-auto space-y-6">
        {/* 404 Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#102D26] border border-[#45D6A0]/40 text-[#45D6A0] text-xs font-bold tracking-wider uppercase">
          404 Error • Page Not Found
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          Lost in Cyberspace?
        </h1>

        <p className="text-[#9CB8AE] text-sm sm:text-base leading-relaxed">
          The requested page could not be located. It may have been moved, renamed, or is currently under development.
        </p>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#45D6A0] to-[#31C48D] hover:from-[#28A879] hover:to-[#168d68] shadow-lg shadow-[#45D6A0]/25 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>

          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-[#B7CCC4] hover:text-white bg-[#102D26] border border-[#31594D]/80 transition-colors"
          >
            <Briefcase className="w-4 h-4" />
            <span>Explore Portfolio</span>
          </Link>
        </div>

        {/* Quick Route Links */}
        <div className="pt-6 border-t border-[#1B4539]/80 text-xs text-[#DFF8EF]0 flex flex-wrap justify-center gap-4">
          <a href="/#services" className="hover:text-[#B7CCC4] transition-colors">
            Our Services
          </a>
          <span>•</span>
          <Link to="/about" className="hover:text-[#B7CCC4] transition-colors">
            About CosmoGeek
          </Link>
          <span>•</span>
          <a href="/#contact" className="hover:text-[#B7CCC4] transition-colors flex items-center gap-1">
            <Mail className="w-3 h-3" />
            <span>Contact Us</span>
          </a>
        </div>
      </div>
    </div>
  )
}
