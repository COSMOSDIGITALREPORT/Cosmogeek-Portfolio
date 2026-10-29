import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Laptop, Smartphone, Boxes, Cpu, Sprout, TrendingUp, Layers } from 'lucide-react'
import { PROJECTS_DATA } from '../data/projects'
import useTilt from '../hooks/useTilt'

// Static icon component complying with React Compiler static-components rules
function CategoryIcon({ category, className = 'w-7 h-7' }) {
  switch (category) {
    case 'Web Development':
      return <Laptop className={className} />
    case 'Mobile Applications':
      return <Smartphone className={className} />
    case 'ERP & Business Software':
      return <Boxes className={className} />
    case 'AI & Automation':
      return <Cpu className={className} />
    case 'Agriculture Technology':
      return <Sprout className={className} />
    case 'Digital Marketing':
      return <TrendingUp className={className} />
    default:
      return <Layers className={className} />
  }
}

/**
 * Project preview image with the concept / status badges. Falls back to the
 * icon placeholder below when a project has no image or it fails to load.
 */
function ProjectThumbnail({ project }) {
  const [failed, setFailed] = useState(false)
  if (!project.image || failed) return <ConceptThumbnail project={project} />

  return (
    <div className="relative w-full aspect-[16/9] overflow-hidden border-b border-[#1B4539]/80 bg-[#0D2822]">
      <img
        src={project.image}
        alt={`${project.title} — ${project.conceptType || project.category} preview`}
        loading="lazy"
        decoding="async"
        width="800"
        height="450"
        onError={() => setFailed(true)}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
      />
      {/* Mint glow and fade into the card body */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#102D26] via-transparent to-transparent opacity-80 pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[inset_0_0_40px_rgba(69,214,160,0.35)] pointer-events-none" aria-hidden="true" />

      <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-[#071B17]/85 border border-[#31594D]/50 text-[10px] font-medium text-[#9CB8AE] backdrop-blur-sm">
        Concept Preview
      </div>
      {project.status && (
        <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-[#071B17]/85 border border-emerald-500/40 text-[10px] font-semibold text-emerald-400 backdrop-blur-sm">
          {project.status}
        </div>
      )}
    </div>
  )
}

/**
 * Concept Thumbnail Placeholder
 * Displays a clean, elegant visual concept container when client screenshots are not available.
 * Explicitly labeled as a concept preview to maintain transparency.
 */
function ConceptThumbnail({ project }) {
  return (
    <div className="relative w-full h-48 bg-gradient-to-br from-[#163B32] via-[#0D2822] to-[#102D26] border-b border-[#1B4539]/80 overflow-hidden flex flex-col items-center justify-center p-6 group-hover:from-[#1B4539] transition-colors duration-300">
      {/* Background ambient mesh */}
      <div
        className="absolute -top-10 -right-10 w-36 h-36 bg-[#45D6A0]/15 rounded-full blur-2xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-10 -left-10 w-36 h-36 bg-[#31C48D]/15 rounded-full blur-2xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#24483E15_1px,transparent_1px),linear-gradient(to_bottom,#24483E15_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none transition-transform duration-700 ease-out group-hover:scale-125" />

      {/* Center Icon & Project Mark */}
      <div className="relative z-10 w-14 h-14 rounded-2xl bg-[#071B17]/90 border border-[#31594D]/80 flex items-center justify-center text-[#45D6A0] group-hover:text-white group-hover:bg-gradient-to-br group-hover:from-[#45D6A0] group-hover:to-[#31C48D] group-hover:border-transparent group-hover:scale-110 group-hover:shadow-[0_0_28px_rgba(69,214,160,0.55)] transition-all duration-500 shadow-lg">
        <CategoryIcon category={project.category} className="w-7 h-7" />
      </div>

      <div className="relative z-10 text-center mt-2.5">
        <span className="text-xs font-semibold text-[#B7CCC4] tracking-wide block">
          {project.conceptType || 'Architecture Blueprint'}
        </span>
      </div>

      {/* Discreet Concept Label Badge */}
      <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-[#071B17]/80 border border-[#31594D]/50 text-[10px] font-medium text-[#9CB8AE] backdrop-blur-sm">
        Concept Preview
      </div>

      {/* Verified Status Badge */}
      {project.status && (
        <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-semibold text-emerald-400">
          {project.status}
        </div>
      )}
    </div>
  )
}

export default function ProjectCard({ project, compact = false }) {
  const projectIndex = PROJECTS_DATA.findIndex((p) => p.slug === project.slug)
  const reduceMotion = useReducedMotion()
  const { ref, style, handlers } = useTilt({ max: 4, reduceMotion })

  return (
    <motion.article ref={ref} style={style} {...handlers} className="project-card group flex flex-col justify-between h-full rounded-2xl bg-[#102D26]/80 hover:bg-[#163B32]/90 border border-[#1B4539]/80 hover:border-[#45D6A0]/40 shadow-xl shadow-black/20 hover:shadow-[#45D6A0]/10 transition-all duration-300 overflow-hidden">
      <span className="project-card-spotlight" aria-hidden="true" />
      {/* Top Section: Visual Thumbnail & Content */}
      <div>
        <ProjectThumbnail project={project} />

        {compact ? (
          <div className="px-5 py-4">
            <h3 className="text-lg font-bold text-white group-hover:text-[#DFF8EF] transition-colors">
              {project.title}
            </h3>
          </div>
        ) : (
        <div className="p-6">
          {/* Category Badge & Case Study Step Number */}
          <div className="mb-2.5 flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#45D6A0] bg-[#45D6A0]/10 px-2.5 py-1 rounded-md border border-[#45D6A0]/20">
              {project.category}
            </span>
            {projectIndex !== -1 && (
              <span className="text-[10px] font-mono text-[#9CB8AE] bg-[#102D26]/80 px-2 py-0.5 rounded border border-[#31594D]/50">
                Case #{projectIndex + 1}
              </span>
            )}
          </div>

          {/* Project Title */}
          <h3 className="text-xl font-bold text-white group-hover:text-[#DFF8EF] transition-colors">
            <Link to={`/portfolio/${project.slug}`}>
              {project.title}
            </Link>
          </h3>

          {/* Description */}
          <p className="mt-2.5 text-sm text-[#9CB8AE] leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* Technology Tags (if verified) */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-[11px] font-medium text-[#9CB8AE] bg-[#102D26]/60 px-2 py-0.5 rounded border border-[#31594D]/40"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
        )}
      </div>
    </motion.article>
  )
}
