import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import ServicesPreview from './sections/ServicesPreview'
import FeaturedProjects from './sections/FeaturedProjects'
import AboutPreview from './sections/AboutPreview'
import TechnologyStack from './sections/TechnologyStack'
import DevelopmentProcess from './sections/DevelopmentProcess'
import ContactSection from './sections/ContactSection'
import Footer from './components/Footer'
import Portfolio from './pages/Portfolio'
import ProjectDetails from './pages/ProjectDetails'
import ServiceDetails from './pages/ServiceDetails'
import About from './pages/About'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsConditions from './pages/TermsConditions'
import NotFound from './pages/NotFound'

// Automatically scrolls window to top or target hash on route change
function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const timer = setTimeout(() => {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 60)
      return () => clearTimeout(timer)
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return null
}

function HomePage() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <ServicesPreview />
      <FeaturedProjects />
      <TechnologyStack />
      <DevelopmentProcess />
      <ContactSection />
    </>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#071B17] text-[#DFF8EF] flex flex-col font-sans selection:bg-[#45D6A0]/30 selection:text-white">
      <ScrollToTop />
      <Navbar />

      <main className="flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:slug" element={<ProjectDetails />} />
          <Route path="/services/:slug" element={<ServiceDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}
