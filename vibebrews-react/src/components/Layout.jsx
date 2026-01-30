import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import { motion, AnimatePresence } from 'framer-motion'

// Tool pages that have light themes
const lightThemePages = ['/tools', '/color-palette-generator', '/ai-token-calculator', '/ai-model-picker', '/prompt-remix']

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const location = useLocation()
  const isLightTheme = lightThemePages.includes(location.pathname)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 968)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Close sidebar on route change (mobile)
  useEffect(() => {
    if (isMobile) setSidebarOpen(false)
  }, [location.pathname, isMobile])

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobile && sidebarOpen) {
        const sidebar = document.getElementById('sidebar')
        const toggle = document.getElementById('menu-toggle')
        if (sidebar && !sidebar.contains(e.target) && toggle && !toggle.contains(e.target)) {
          setSidebarOpen(false)
        }
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isMobile, sidebarOpen])

  return (
    <div className={`min-h-screen ${isLightTheme ? 'bg-[#F8F5F0]' : 'bg-[#050505]'} text-[var(--color-text)]`}>
      {/* Skip link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Mobile menu toggle */}
      <AnimatePresence>
        {isMobile && (
          <motion.button
            id="menu-toggle"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="fixed top-4 left-4 z-[101] w-10 h-10 bg-[#111111]/80 backdrop-blur-xl border border-white/[0.06] rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white/10 hover:border-white/10"
            aria-label="Toggle menu"
          >
            <motion.svg
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              className="w-5 h-5 text-white/80"
              animate={{ rotate: sidebarOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {sidebarOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </motion.svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen || !isMobile} isMobile={isMobile} />

      {/* Mobile overlay */}
      <AnimatePresence>
        {isMobile && sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99]"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Main content */}
      <main
        id="main-content"
        className={`min-h-screen transition-all duration-500 ease-[var(--ease-out-expo)] ${
          isMobile ? 'ml-0' : 'ml-[260px]'
        }`}
      >
        {children}
      </main>
    </div>
  )
}
