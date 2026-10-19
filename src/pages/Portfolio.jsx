import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { PROJECTS_DATA, PROJECT_CATEGORIES } from '../data/projects'
import ProjectCard from '../components/ProjectCard'
import PortfolioLaptop from '../components/PortfolioLaptop'
import './Portfolio.css'

const portfolioReveal = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const shouldReduceMotion = useReducedMotion()

  const filteredProjects =
    selectedCategory === 'All'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((project) => project.category === selectedCategory)

  return (
    <div className="portfolio-page py-12 md:py-20 bg-[#071B17] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="portfolio-hero" aria-labelledby="portfolio-title">
          <motion.div
            className="portfolio-hero-copy"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.12 } } }}
          >
            <motion.div variants={portfolioReveal} className="mb-7">
              <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[#9CB8AE] hover:text-white transition-colors py-1">
                <ArrowLeft className="w-4 h-4" /> Back to Home
              </Link>
            </motion.div>
            <motion.div variants={portfolioReveal} className="portfolio-eyebrow">
              <span className="portfolio-eyebrow-dot" /> Portfolio Directory
            </motion.div>
            <motion.h1 id="portfolio-title" variants={portfolioReveal} className="portfolio-title">
              Digital Products<br />That Move <span>Businesses Forward.</span>
            </motion.h1>
            <motion.p variants={portfolioReveal} className="portfolio-description">
              Browse our project showcase of digital systems, enterprise applications, and bespoke software solutions.
            </motion.p>
            <motion.div variants={portfolioReveal} className="portfolio-actions">
              <a href="#portfolio-projects" className="portfolio-primary-button">Explore Our Work <ArrowRight /></a>
              <Link to="/#contact" className="portfolio-secondary-button">Start a Project <ArrowRight /></Link>
            </motion.div>
          </motion.div>

          <PortfolioLaptop reducedMotion={shouldReduceMotion} />
        </section>

        {/* Category Filters */}
        <div id="portfolio-projects" className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-[#1B4539]/80 scroll-mt-28">
          {PROJECT_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#45D6A0] ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#45D6A0] to-[#31C48D] text-white shadow-md shadow-[#45D6A0]/25'
                    : 'bg-[#102D26] text-[#9CB8AE] hover:text-white hover:bg-[#102D26]/60 border border-[#1B4539]'
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>

        {/* Projects Grid: 3 columns desktop, 2 columns tablet, 1 column mobile */}
        <motion.div
          layout={!shouldReduceMotion}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout={!shouldReduceMotion}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

