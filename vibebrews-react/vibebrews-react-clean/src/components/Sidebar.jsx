import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ExternalLink from './ExternalLink'

// Main navigation items
const mainNavItems = [
  { path: '/', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { path: '/tools', label: 'Creator Tools', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
  { path: '/blogs', label: 'Blogs', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
  { path: '/our-vision', label: 'Our Vision', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' },
]

export default function Sidebar({ isOpen, isMobile, onToggle }) {
  return (
    <>
      {/* Desktop Toggle Button - Shows when sidebar is closed */}
      <AnimatePresence>
        {!isMobile && !isOpen && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
            onClick={onToggle}
            className="fixed left-4 top-4 z-[101] w-10 h-10 bg-black/90 hover:bg-black rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 group"
            aria-label="Open sidebar"
          >
            <svg 
              className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      <motion.aside
        id="sidebar"
        initial={false}
        animate={{
          x: isOpen ? 0 : -280,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ 
          duration: 0.35, 
          ease: [0.32, 0.72, 0, 1]
        }}
        className={`fixed left-0 bottom-0 w-[260px] z-[100] flex flex-col overflow-hidden ${
          isMobile ? 'top-14' : 'top-0'
        }`}
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.98) 100%)',
        }}
      >
        {/* Subtle gradient border on the right - almost invisible */}
        <div className="absolute top-0 right-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/[0.03] to-transparent" />
        
        {/* Header - Only show on desktop */}
        {!isMobile && (
          <div className="px-5 py-5 flex items-center justify-between">
            <NavLink 
              to="/" 
              className="flex items-center gap-2.5 group"
            >
              <motion.img
                src="/vibebrews-logo.png"
                alt="VibeBrews"
                className="w-8 h-8 rounded-lg object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              />
              <span className="text-[15px] font-medium text-white/90 tracking-[-0.01em] group-hover:text-white transition-colors">
                VibeBrews
              </span>
            </NavLink>
            
            {/* Close button */}
            <motion.button
              onClick={onToggle}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-white/[0.06] transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Close sidebar"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </motion.button>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-3 py-2 overflow-y-auto scrollbar-hide">
          <div className="mb-4">
            <div className="px-3 py-2 text-[10px] font-semibold text-white/20 uppercase tracking-[0.1em]">
              Navigation
            </div>
            
            <div className="space-y-0.5">
              {mainNavItems.map((item, index) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `
                    group relative flex items-center gap-2.5 px-3 py-2.5 rounded-lg
                    text-[13px] font-normal tracking-[-0.01em]
                    transition-all duration-300 ease-[var(--ease-out-expo)]
                    ${isActive 
                      ? 'text-white/95 bg-white/[0.06]' 
                      : 'text-white/45 hover:text-white/80 hover:bg-white/[0.03]'
                    }
                  `}
                >
                  {({ isActive }) => (
                    <>
                      {/* Active indicator - subtle line */}
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute left-0 top-[20%] bottom-[20%] w-[2px] bg-[#FF5C00] rounded-r-full"
                          initial={false}
                          transition={{ 
                            type: 'spring', 
                            stiffness: 400, 
                            damping: 30 
                          }}
                        />
                      )}
                      
                      <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        className={`w-4 h-4 transition-opacity duration-300 ${
                          isActive ? 'opacity-80' : 'opacity-40 group-hover:opacity-60'
                        }`}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                      </svg>
                      
                      <span className="truncate">{item.label}</span>
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        </nav>

        {/* Footer CTA */}
        <div className="px-4 py-4">
          <ExternalLink
            href="https://play.google.com/store/apps/details?id=com.nextap.vibebrews"
            className="block w-full text-center py-2.5 px-4 bg-white text-black text-[13px] font-medium rounded-lg hover:bg-white/90 transition-all duration-200 hover:scale-[0.98] active:scale-[0.96]"
          >
            Download App
          </ExternalLink>
        </div>
      </motion.aside>
    </>
  )
}
