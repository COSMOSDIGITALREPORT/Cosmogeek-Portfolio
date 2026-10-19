import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { PROJECTS_DATA } from '../data/projects'
import ProjectCard from '../components/ProjectCard'
import DirectionalTrack from '../components/motion/DirectionalTrack'

export default function FeaturedProjects() {
  const shouldReduceMotion = useReducedMotion()

  // Display the 6 primary company projects on the homepage featured section
  const featuredProjects = PROJECTS_DATA.filter((project) => project.featured)

  return (
    <section
      id="projects"
      className="relative py-20 md:py-28 lg:py-32 bg-[#0B241F] border-t border-[#1B4539]/60 overflow-hidden"
    >
      {/* Background radial ambient illumination */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-[#31C48D]/10 via-[#45D6A0]/10 to-transparent blur-3xl pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#102D26] border border-[#31594D]/60 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-[#45D6A0] animate-pulse" />
            <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-[#B7CCC4]">
              OUR WORK
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#DFF8EF] leading-[1.15]">
            Projects That Turn Ideas Into Reality.
          </h2>

          <p className="text-base sm:text-lg text-[#9CB8AE] leading-relaxed font-normal">
            Explore digital solutions designed to solve business problems, improve workflows and create better user experiences.
          </p>
        </div>

      </div>

      {/* Full-width track: project cards travel left → right as the page scrolls */}
      <DirectionalTrack direction="right" label="Featured projects" className="relative z-10" continuous speed={68}>
        {featuredProjects.map((project, index) => (
          <motion.li
            key={project.id}
            className="flex w-[min(86vw,340px)] sm:w-[340px] xl:w-[360px] [&>*]:w-full"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: shouldReduceMotion ? 0 : Math.min(index, 4) * 0.08 }}
          >
            <ProjectCard project={project} compact />
          </motion.li>
        ))}
      </DirectionalTrack>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Bottom CTA: View All Projects */}
        <div className="mt-8 sm:mt-10 text-center">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-[#45D6A0] to-[#31C48D] hover:from-[#28A879] hover:to-[#168d68] shadow-lg shadow-[#45D6A0]/25 hover:shadow-[#45D6A0]/35 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#45D6A0]"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
