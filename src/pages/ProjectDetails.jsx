import { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Layers,
  Cpu,
  ShieldCheck,
  Maximize2,
  X,
  Target,
  Lightbulb,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { PROJECTS_DATA } from '../data/projects'
import ProjectCard from '../components/ProjectCard'

/**
 * Concept Gallery Card
 * Renders an architectural concept visual with a consistent aspect ratio,
 * clear transparency label, and click-to-enlarge trigger.
 */
function GalleryItem({ item, projectTitle, onEnlarge }) {
  return (
    <div
      onClick={() => onEnlarge(item)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onEnlarge(item)
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Enlarge concept blueprint: ${item.title}`}
      className="group relative rounded-2xl bg-gradient-to-br from-[#163B32] via-[#151E2E] to-[#102D26] border border-[#1B4539] hover:border-[#45D6A0]/50 overflow-hidden cursor-pointer transition-all duration-300 shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#45D6A0]"
    >
      {/* 16:9 Aspect Ratio Container */}
      <div className="relative aspect-video w-full flex flex-col justify-between p-6 overflow-hidden">
        {/* Ambient background glow */}
        <div
          className="absolute -top-12 -right-12 w-48 h-48 bg-[#45D6A0]/15 rounded-full blur-2xl pointer-events-none group-hover:bg-[#45D6A0]/25 transition-colors"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#31C48D]/15 rounded-full blur-2xl pointer-events-none group-hover:bg-[#31C48D]/25 transition-colors"
          aria-hidden="true"
        />

        {/* Blueprint Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#24483E18_1px,transparent_1px),linear-gradient(to_bottom,#24483E18_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

        {/* Top Header: Badge & Enlarge hint */}
        <div className="relative z-10 flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#9CB8AE] bg-[#071B17]/90 px-2.5 py-1 rounded-md border border-[#31594D]/60 backdrop-blur-sm">
            Concept Preview
          </span>
          <div className="w-8 h-8 rounded-lg bg-[#071B17]/80 border border-[#31594D]/60 flex items-center justify-center text-[#9CB8AE] group-hover:text-white group-hover:bg-[#45D6A0] group-hover:border-transparent transition-all shadow">
            <Maximize2 className="w-4 h-4" />
          </div>
        </div>

        {/* Center: Conceptual Architecture Diagram Mockup */}
        <div className="relative z-10 my-auto text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-[#071B17]/80 border border-[#31594D]/80 mx-auto flex items-center justify-center text-[#45D6A0] group-hover:text-[#83F0C2] group-hover:scale-110 transition-all duration-300 shadow-md">
            <Cpu className="w-6 h-6" />
          </div>
          <p className="text-sm font-bold text-white tracking-wide">
            {item.title}
          </p>
          <p className="text-xs text-[#9CB8AE] font-mono">
            {item.label}
          </p>
        </div>

        {/* Bottom Banner */}
        <div className="relative z-10 pt-2 border-t border-[#1B4539]/80 flex items-center justify-between text-[11px] text-[#DFF8EF]0">
          <span>{projectTitle} • Technical Schematic</span>
          <span className="group-hover:text-[#B7CCC4] transition-colors">Click to expand</span>
        </div>
      </div>
    </div>
  )
}

export default function ProjectDetails() {
  const { slug } = useParams()
  const [activeModalItem, setActiveModalItem] = useState(null)

  // Find project by slug
  const currentIndex = PROJECTS_DATA.findIndex((p) => p.slug === slug)
  const project = currentIndex !== -1 ? PROJECTS_DATA[currentIndex] : null
  const totalProjects = PROJECTS_DATA.length

  // Previous & Next navigation
  const prevProject =
    currentIndex > 0
      ? PROJECTS_DATA[currentIndex - 1]
      : PROJECTS_DATA[PROJECTS_DATA.length - 1]
  const nextProject =
    currentIndex < PROJECTS_DATA.length - 1
      ? PROJECTS_DATA[currentIndex + 1]
      : PROJECTS_DATA[0]

  // Related projects (same category or featured, excluding current)
  const relatedProjects = PROJECTS_DATA.filter(
    (p) => p.slug !== slug && (p.category === project?.category || p.featured)
  ).slice(0, 2)

  // Accessible lightbox Escape key handler
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape' && activeModalItem) {
        setActiveModalItem(null)
      }
    },
    [activeModalItem]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  if (!project) {
    return (
      <div className="py-24 text-center bg-[#071B17] min-h-[60vh] flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl font-bold text-white mb-4">Project Not Found</h1>
        <p className="text-[#9CB8AE] mb-8 max-w-md text-sm leading-relaxed">
          The requested project case study could not be found or may have been reorganized.
        </p>
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#45D6A0] to-[#31C48D]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse All Projects</span>
        </Link>
      </div>
    )
  }

  return (
    <div className="py-12 md:py-20 bg-[#071B17] min-h-screen text-[#DFF8EF]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Step-by-Step Navigation Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#102D26]/90 border border-[#1B4539] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg">
          {/* Breadcrumbs with Case Study Step Indicator */}
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#9CB8AE]">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-slate-600">/</span>
            <Link to="/portfolio" className="hover:text-white transition-colors">
              Portfolio
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-[#45D6A0] font-semibold">
              Case Study {currentIndex + 1} of {totalProjects}
            </span>
            <span className="text-slate-600">/</span>
            <span className="text-[#DFF8EF] font-semibold truncate max-w-xs sm:max-w-none">
              {project.title}
            </span>
          </div>

          {/* Quick Prev / Next Case Study Controls */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link
              to={`/portfolio/${prevProject.slug}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#163B32] border border-[#31594D]/60 text-xs font-semibold text-[#B7CCC4] hover:text-white hover:border-[#45D6A0]/60 transition-colors"
              title={`Previous: Case Study ${currentIndex === 0 ? totalProjects : currentIndex} - ${prevProject.title}`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Prev Study</span>
            </Link>

            <span className="px-2.5 py-1 rounded-md bg-[#071B17] text-xs font-mono font-bold text-sky-400 border border-[#1B4539]">
              {currentIndex + 1} / {totalProjects}
            </span>

            <Link
              to={`/portfolio/${nextProject.slug}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#45D6A0] to-[#31C48D] text-xs font-semibold text-white shadow-md shadow-[#45D6A0]/20 hover:opacity-95 transition-opacity"
              title={`Next: Case Study ${currentIndex + 2 > totalProjects ? 1 : currentIndex + 2} - ${nextProject.title}`}
            >
              <span>Next Study</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Sequential Stepper across all 12 Projects */}
        <div className="p-4 rounded-2xl bg-[#102D26]/60 border border-[#1B4539]/80 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[760px] gap-2">
            {PROJECTS_DATA.map((p, idx) => {
              const isCurrent = idx === currentIndex
              const isCompleted = idx < currentIndex

              return (
                <Link
                  key={p.id}
                  to={`/portfolio/${p.slug}`}
                  className={`flex-1 flex flex-col items-center p-2 rounded-xl text-center transition-all group ${
                    isCurrent
                      ? 'bg-[#163B32] border border-[#45D6A0] shadow-md shadow-[#45D6A0]/20'
                      : 'hover:bg-[#163B32]/50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-1 mb-1">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isCurrent
                          ? 'bg-[#45D6A0] text-white'
                          : isCompleted
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-[#102D26] text-[#9CB8AE] border border-[#31594D]'
                      }`}
                    >
                      {idx + 1}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-semibold line-clamp-1 ${
                      isCurrent
                        ? 'text-white font-bold'
                        : 'text-[#9CB8AE] group-hover:text-[#DFF8EF]'
                    }`}
                  >
                    {p.title}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>

        {/* 2. Hero Header Card */}
        <div className="rounded-3xl bg-[#102D26]/90 border border-[#1B4539] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div
            className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-[#45D6A0]/15 to-[#31C48D]/15 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#45D6A0] bg-[#45D6A0]/10 px-3 py-1 rounded-md border border-[#45D6A0]/20">
                Case Study {currentIndex + 1} of {totalProjects}: {project.category}
              </span>

              {project.status && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{project.status}</span>
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
              {project.title}
            </h1>

            <p className="text-base sm:text-xl text-[#9CB8AE] leading-relaxed max-w-3xl">
              {project.overview || project.description}
            </p>

            {/* External / Live Demo Link (shown only if available and authorized) */}
            {project.liveDemo && (
              <div className="pt-2">
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#45D6A0] to-[#31C48D] hover:opacity-90 transition-opacity"
                >
                  <span>Visit Live Demonstration</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* 3. Business Problem & Solution Grid */}
        {(project.problem || project.solution) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.problem && (
              <div className="rounded-2xl bg-[#102D26]/80 border border-[#1B4539] p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2.5 text-rose-400">
                  <Target className="w-5 h-5" />
                  <h2 className="text-lg font-bold text-white">
                    The Business Challenge
                  </h2>
                </div>
                <p className="text-sm text-[#B7CCC4] leading-relaxed">
                  {project.problem}
                </p>
              </div>
            )}

            {project.solution && (
              <div className="rounded-2xl bg-[#102D26]/80 border border-[#1B4539] p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2.5 text-[#83F0C2]">
                  <Lightbulb className="w-5 h-5" />
                  <h2 className="text-lg font-bold text-white">
                    Delivered Solution
                  </h2>
                </div>
                <p className="text-sm text-[#B7CCC4] leading-relaxed">
                  {project.solution}
                </p>
              </div>
            )}
          </div>
        )}

        {/* 4. Key Features Delivered */}
        {project.features && project.features.length > 0 && (
          <section className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#45D6A0]">
                FUNCTIONAL SCOPE
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Key Features & Capabilities
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#102D26]/80 border border-[#1B4539] flex items-start gap-3.5"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-[#DFF8EF] leading-relaxed font-medium">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 5. Concept Gallery / Approved Visuals with Lightbox */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#31C48D]">
                    SYSTEM ARCHITECTURE BLUEPRINTS
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Project Visuals & Interface Concepts
                  </h2>
                </div>
              </div>
              <p className="text-xs text-[#9CB8AE]">
                Transparent conceptual schematics and architectural blueprints illustrating the software layout.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.gallery.map((item) => (
                <GalleryItem
                  key={item.id}
                  item={item}
                  projectTitle={project.title}
                  onEnlarge={setActiveModalItem}
                />
              ))}
            </div>
          </section>
        )}

        {/* 6. Verified Technology Stack */}
        {project.technologies && project.technologies.length > 0 && (
          <section className="p-8 rounded-2xl bg-[#102D26]/70 border border-[#1B4539] space-y-4">
            <div className="flex items-center gap-2 text-sky-400">
              <Layers className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Verified Technology Stack
              </span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3.5 py-1.5 rounded-xl bg-[#163B32] border border-[#31594D]/60 text-xs font-semibold text-[#DFF8EF]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* 7. Verified Outcomes (shown if verified) */}
        {project.outcomes && project.outcomes.length > 0 && (
          <section className="p-8 rounded-2xl bg-[#102D26]/80 border border-[#1B4539] space-y-4">
            <div className="flex items-center gap-2 text-emerald-400">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Verified Project Impact & Outcomes
              </span>
            </div>
            <ul className="space-y-2.5">
              {project.outcomes.map((outcome, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-[#B7CCC4]">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 8. Sequential Step-by-Step Project Navigation: Prev & Next in Order */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#102D26] border border-[#1B4539] space-y-4">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#9CB8AE] pb-3 border-b border-[#1B4539]/80">
            <span>Portfolio Step Progression</span>
            <span className="text-[#45D6A0]">
              Case Study {currentIndex + 1} of {totalProjects}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevProject && (
              <Link
                to={`/portfolio/${prevProject.slug}`}
                className="p-5 rounded-2xl bg-[#071B17] hover:bg-[#163B32] border border-[#1B4539]/80 hover:border-[#45D6A0]/40 transition-all flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#163B32] border border-[#31594D]/60 flex items-center justify-center text-[#9CB8AE] group-hover:text-white group-hover:bg-[#45D6A0] transition-colors flex-shrink-0">
                  <ChevronLeft className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#9CB8AE] block">
                    Previous Case Study ({currentIndex === 0 ? totalProjects : currentIndex}/{totalProjects})
                  </span>
                  <span className="text-sm font-bold text-white truncate block group-hover:text-[#83F0C2] transition-colors">
                    {prevProject.title}
                  </span>
                </div>
              </Link>
            )}

            {nextProject && (
              <Link
                to={`/portfolio/${nextProject.slug}`}
                className="p-5 rounded-2xl bg-[#071B17] hover:bg-[#163B32] border border-[#1B4539]/80 hover:border-[#45D6A0]/40 transition-all flex items-center justify-between gap-4 group text-right"
              >
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#45D6A0] block">
                    Next Case Study ({currentIndex + 2 > totalProjects ? 1 : currentIndex + 2}/{totalProjects})
                  </span>
                  <span className="text-sm font-bold text-white truncate block group-hover:text-[#83F0C2] transition-colors">
                    {nextProject.title}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#45D6A0] to-[#31C48D] flex items-center justify-center text-white transition-transform group-hover:translate-x-1 flex-shrink-0 shadow-md">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </Link>
            )}
          </div>
        </div>

        {/* 9. Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="space-y-6 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#45D6A0]">
                  RELATED INITIATIVES
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Explore Related Case Studies
                </h2>
              </div>
              <Link
                to="/portfolio"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#45D6A0] hover:text-[#8BE8C1]"
              >
                <span>View Full Portfolio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedProjects.map((p) => (
                <div key={p.id} className="h-full">
                  <ProjectCard project={p} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 10. CTA: Discuss a Similar Project */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#102D26] via-[#163B32] to-[#102D26] border border-[#1B4539] text-center space-y-5 shadow-2xl relative overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#45D6A0]/10 via-[#31C48D]/10 to-transparent pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ready to Build a Similar Solution?
            </h2>

            <p className="text-sm sm:text-base text-[#B7CCC4] leading-relaxed">
              Let&apos;s evaluate your business goals and architecture requirements. CosmoGeek engineers practical, high-impact digital products tailored to your operational workflows.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-[#45D6A0] to-[#31C48D] hover:from-[#28A879] hover:to-[#168d68] shadow-lg shadow-[#45D6A0]/25 transition-all"
              >
                <span>Discuss a Similar Project</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-[#B7CCC4] hover:text-white bg-[#071B17] border border-[#1B4539] transition-colors"
              >
                <span>Browse All Work</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Accessible Lightbox Modal */}
      {activeModalItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeModalItem.title}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveModalItem(null)}
        >
          <div
            className="relative max-w-3xl w-full rounded-3xl bg-[#102D26] border border-[#31594D] p-6 sm:p-8 space-y-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#1B4539]">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#45D6A0]">
                  Architecture Concept Blueprint
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">
                  {activeModalItem.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setActiveModalItem(null)}
                className="w-9 h-9 rounded-xl bg-[#102D26] hover:bg-[#163B32] text-[#B7CCC4] hover:text-white flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#45D6A0]"
                aria-label="Close image preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Blueprint Body */}
            <div className="relative aspect-video w-full rounded-2xl bg-gradient-to-br from-[#163B32] via-[#102D26] to-[#020617] border border-[#31594D]/80 p-8 flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#24483E25_1px,transparent_1px),linear-gradient(to_bottom,#24483E25_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

              <div className="relative z-10 flex justify-between items-start text-xs text-[#9CB8AE]">
                <span className="font-mono bg-[#071B17]/90 px-2 py-1 rounded border border-[#1B4539]">
                  {activeModalItem.label}
                </span>
                <span className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded border border-emerald-500/30">
                  Approved Architectural Concept
                </span>
              </div>

              <div className="relative z-10 text-center space-y-3 my-auto">
                <div className="w-16 h-16 rounded-2xl bg-[#071B17] border border-[#45D6A0]/40 mx-auto flex items-center justify-center text-[#45D6A0] shadow-xl">
                  <Cpu className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-white">
                  {activeModalItem.title}
                </h4>
                <p className="text-xs text-[#9CB8AE] max-w-md mx-auto leading-relaxed">
                  Conceptual interface diagram designed to visualize operational flow, component modularity, and data structures for {project.title}.
                </p>
              </div>

              <div className="relative z-10 text-[11px] text-[#DFF8EF]0 text-center">
                Press <kbd className="px-1.5 py-0.5 rounded bg-[#102D26] text-[#B7CCC4] font-mono">ESC</kbd> or click outside to dismiss
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
