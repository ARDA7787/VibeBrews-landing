import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import ExternalLink from './ExternalLink'

const navItems = [
  { path: '/', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { path: '/tools', label: 'Creator Tools', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z', isNew: true },
  { path: '/how-to-make-a-game-without-coding', label: 'How to Make Games', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
  { path: '/i-have-a-game-idea', label: 'I Have an Idea', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
  { path: '/our-vision', label: 'Our Vision', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' },
  { path: '/productive-things-to-do-on-phone', label: 'Productive Play', icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z' },
  { path: '/why-i-stopped-learning-unity', label: 'Why I Quit Unity', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { path: '/the-death-of-coding', label: 'The Death of Coding', icon: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { path: '/the-creative-block-is-a-lie', label: 'The Creative Lie', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
  { path: '/the-game-you-will-never-make', label: "The Game You'll Never Make", icon: 'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636' },
  { path: '/the-3am-scroll', label: 'The 3AM Scroll', icon: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z' },
  { path: '/why-your-ideas-die-in-your-notes-app', label: 'Why Ideas Die', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { path: '/everyone-racing-against-ai', label: 'Racing Against AI', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
]

export default function Sidebar({ isOpen, isMobile }) {
  return (
    <motion.aside
      id="sidebar"
      initial={false}
      animate={{
        x: isOpen ? 0 : isMobile ? -280 : 0,
        opacity: isOpen ? 1 : isMobile ? 0 : 1,
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
        <div className="px-5 py-5">
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
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 overflow-y-auto scrollbar-hide">
        <div className="mb-4">
          <div className="px-3 py-2 text-[10px] font-semibold text-white/20 uppercase tracking-[0.1em]">
            Pages
          </div>
          
          <div className="space-y-0.5">
            {navItems.map((item, index) => (
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
                    {item.isNew && (
                      <span className="ml-auto px-1.5 py-0.5 text-[9px] font-bold bg-[#FF5C00] text-white rounded-full uppercase tracking-wide">
                        New
                      </span>
                    )}
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
  )
}
