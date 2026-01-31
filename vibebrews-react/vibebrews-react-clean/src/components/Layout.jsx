import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import Sidebar from './Sidebar'
import { motion, AnimatePresence } from 'framer-motion'

// Tool pages that have light themes
const lightThemePages = ['/tools', '/blogs', '/color-palette-generator', '/ai-token-calculator', '/ai-model-picker', '/prompt-remix', '/legal-doc-generator', '/context-window-visualizer', '/ship-safe-scanner', '/vibe-cost-calculator']

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true) // Default open on desktop
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

      {/* Mobile Header - Fixed top bar with logo and hamburger */}
      <AnimatePresence>
        {isMobile && (
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-0 left-0 right-0 z-[101] px-4 py-3 flex items-center justify-between ${
              isLightTheme 
                ? 'bg-[#F8F5F0]/90 backdrop-blur-xl border-b border-black/5' 
                : 'bg-[#050505]/90 backdrop-blur-xl border-b border-white/5'
            }`}
          >
            {/* Hamburger Button */}
            <motion.button
              id="menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                isLightTheme
                  ? 'bg-black/5 hover:bg-black/10'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
              aria-label="Toggle menu"
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="w-5 h-5 flex flex-col justify-center items-center gap-1.5"
                animate={sidebarOpen ? "open" : "closed"}
              >
                <motion.span
                  className={`block w-5 h-0.5 rounded-full origin-center ${isLightTheme ? 'bg-black/70' : 'bg-white/70'}`}
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 4 }
                  }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                />
                <motion.span
                  className={`block w-5 h-0.5 rounded-full ${isLightTheme ? 'bg-black/70' : 'bg-white/70'}`}
                  variants={{
                    closed: { opacity: 1, x: 0 },
                    open: { opacity: 0, x: -10 }
                  }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className={`block w-5 h-0.5 rounded-full origin-center ${isLightTheme ? 'bg-black/70' : 'bg-white/70'}`}
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -4 }
                  }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                />
              </motion.div>
            </motion.button>

            {/* Logo - Centered */}
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/vibebrews-logo.png"
                alt="VibeBrews"
                className="w-7 h-7 rounded-lg object-cover"
              />
              <span className={`text-sm font-semibold ${isLightTheme ? 'text-black/90' : 'text-white/90'}`}>
                VibeBrews
              </span>
            </Link>

            {/* Spacer for balance */}
            <div className="w-10 h-10" />
          </motion.header>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <Sidebar 
        isOpen={isMobile ? sidebarOpen : sidebarOpen} 
        isMobile={isMobile} 
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Mobile overlay */}
      <AnimatePresence>
        {isMobile && sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99]"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Main content */}
      <motion.main
        id="main-content"
        initial={false}
        animate={{
          marginLeft: isMobile ? 0 : sidebarOpen ? 260 : 0,
        }}
        transition={{ 
          duration: 0.35, 
          ease: [0.32, 0.72, 0, 1]
        }}
        className={`min-h-screen ${isMobile ? 'pt-14' : ''}`}
      >
        {children}
      </motion.main>
    </div>
  )
}
