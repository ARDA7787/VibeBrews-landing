import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'

// SEO
const SEO_TITLE = 'Free AI & Creator Tools | VibeBrews Utility Suite 2026'
const SEO_DESC = 'Discover free AI-powered tools for creators: Color Palette Generator, Legal Doc Generator, Token Calculator, AI Model Picker, Prompt Remix, and more. No signup required.'
const SEO_KEYWORDS = 'free ai tools, creator tools, color palette generator, legal document generator, token calculator, ai model picker, prompt remix, context window visualizer, vibe cost estimator, developer tools, design tools'

// Tool data
const tools = [
  {
    id: 'color-palette',
    path: '/color-palette-generator',
    title: 'Color Palette',
    subtitle: 'Generator',
    description: 'Create beautiful color combinations with harmony, warm, cool & pastel modes',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="8" r="2" fill="#E57373" />
        <circle cx="8" cy="14" r="2" fill="#81C784" />
        <circle cx="16" cy="14" r="2" fill="#64B5F6" />
      </svg>
    ),
    color: '#C9A9A6',
    image: '/assets/palette-hero-spheres.png',
    tags: ['Design', 'Colors']
  },
  {
    id: 'legal-doc',
    path: '/legal-doc-generator',
    title: 'Legal Doc',
    subtitle: 'Generator',
    description: 'Privacy policies, Terms of Service & GDPR-compliant templates',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: '#3b82f6',
    image: '/assets/legal-doc-icon.png',
    tags: ['Legal', 'Business']
  },
  {
    id: 'token-calc',
    path: '/ai-token-calculator',
    title: 'Token',
    subtitle: 'Calculator',
    description: 'Calculate AI token costs for GPT-4, Claude, Gemini & more',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v8m-2-6h4m-4 4h4" strokeLinecap="round" />
      </svg>
    ),
    color: '#10b981',
    image: '/assets/token-calc-icon.png',
    tags: ['AI', 'Cost']
  },
  {
    id: 'prompt-remix',
    path: '/prompt-remix',
    title: 'Prompt',
    subtitle: 'Remix',
    description: 'Transform and enhance your prompts with AI-powered suggestions',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: '#8b5cf6',
    image: '/assets/prompt-remix-icon.png',
    tags: ['AI', 'Writing']
  },
  {
    id: 'context-window',
    path: '/context-window-visualizer',
    title: 'Context',
    subtitle: 'Visualizer',
    description: 'Visualize and optimize your AI context window usage',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 10h18M9 10v10" strokeLinecap="round" />
      </svg>
    ),
    color: '#06b6d4',
    image: '/assets/context-window-icon.png',
    tags: ['AI', 'Tech']
  },
  {
    id: 'model-picker',
    path: '/ai-model-picker',
    title: 'AI Model',
    subtitle: 'Picker',
    description: 'Find the best AI model for your task with smart recommendations',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path d="M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707" strokeLinecap="round" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 16v5m-3-3h6" strokeLinecap="round" />
      </svg>
    ),
    color: '#f59e0b',
    image: '/assets/designer-workspace.png',
    tags: ['AI', 'Selection']
  },
  {
    id: 'vibe-cost',
    path: '/vibe-cost-calculator',
    title: 'Vibe Cost',
    subtitle: 'Estimator',
    description: 'Estimate development costs for your app or game idea',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M8 8h.01M12 8h.01M16 8h.01M8 12h.01M12 12h.01M16 12h.01M8 16h4" strokeLinecap="round" />
      </svg>
    ),
    color: '#ec4899',
    image: '/assets/abstract-creativity-3d.png',
    tags: ['Business', 'Planning']
  },
  {
    id: 'ship-safe',
    path: '/ship-safe-scanner',
    title: 'Ship-Safe',
    subtitle: 'Scanner',
    description: 'Scan your code for security issues before shipping',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path d="M9 12l2 2 4-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      </svg>
    ),
    color: '#22c55e',
    image: '/assets/human-ai-creativity.png',
    tags: ['Security', 'Dev']
  },
]

// Search Bar Component
const SearchBar = ({ onSearch, isExpanded, setIsExpanded }) => {
  const inputRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isExpanded])

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isExpanded && containerRef.current && !containerRef.current.contains(e.target)) {
        setIsExpanded(false)
        onSearch('')
        if (inputRef.current) {
          inputRef.current.value = ''
        }
      }
    }

    if (isExpanded) {
      // Delay to prevent immediate close
      setTimeout(() => {
        document.addEventListener('click', handleClickOutside)
      }, 0)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isExpanded, setIsExpanded, onSearch])

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isExpanded) {
        setIsExpanded(false)
        onSearch('')
        if (inputRef.current) {
          inputRef.current.value = ''
          inputRef.current.blur()
        }
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isExpanded, setIsExpanded, onSearch])

  return (
    <div 
      ref={containerRef}
      className={`relative z-50 mx-auto transition-all duration-300 ease-out ${isExpanded ? 'w-full max-w-2xl' : 'w-full max-w-md'}`}
    >
      <div
        className={`relative flex items-center bg-white backdrop-blur-xl rounded-2xl overflow-hidden transition-all duration-300 outline-none ${
          isExpanded 
            ? 'shadow-2xl border border-[#2D2A26]/10' 
            : 'shadow-lg border border-[#2D2A26]/5 hover:shadow-xl hover:border-[#2D2A26]/10'
        }`}
      >
        <div className="pl-4 text-[#2D2A26]/40 flex-shrink-0">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search tools..."
          className="w-full py-4 px-3 bg-transparent text-[#2D2A26] placeholder-[#2D2A26]/40 focus:outline-none focus:ring-0 text-lg border-none"
          style={{ outline: 'none', boxShadow: 'none' }}
          onFocus={() => setIsExpanded(true)}
          onChange={(e) => onSearch(e.target.value)}
        />
        {isExpanded && (
          <button 
            onClick={(e) => {
              e.stopPropagation()
              setIsExpanded(false)
              onSearch('')
              if (inputRef.current) {
                inputRef.current.value = ''
              }
            }}
            className="pr-4 text-[#2D2A26]/40 hover:text-[#2D2A26] transition-colors flex-shrink-0 outline-none focus:outline-none"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

// Minimal Tool Card
const ToolCard = ({ tool, index }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.05 }}
      className="group"
    >
      <Link to={tool.path} className="block h-full">
        <div className="relative h-full bg-white rounded-3xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 overflow-hidden">
          
          {/* Top Section: Icon & Tags */}
          <div className="flex justify-between items-start mb-4">
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center p-2.5"
              style={{ backgroundColor: `${tool.color}15`, color: tool.color }}
            >
              {tool.icon}
            </div>
            {tool.tags && (
              <div className="flex gap-1">
                {tool.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-medium px-2 py-1 rounded-full bg-[#2D2A26]/5 text-[#2D2A26]/60">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div>
            <h3 className="text-lg font-bold text-[#2D2A26] mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {tool.title}
            </h3>
            <p className="text-sm text-[#2D2A26]/50 leading-relaxed line-clamp-2">
              {tool.description}
            </p>
          </div>

          {/* Hover Image Reveal */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none translate-x-8 -translate-y-8">
             <img src={tool.image} alt="" className="w-full h-full object-contain" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

// Featured Large Card
const FeaturedCard = ({ tool }) => {
  return (
    <Link to={tool.path} className="block group relative w-full h-full min-h-[280px]">
      <div className="absolute inset-0 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgb(0,0,0,0.08)] transition-all duration-500 group-hover:shadow-[0_30px_60px_rgb(0,0,0,0.12)] group-hover:scale-[1.01] overflow-hidden">
        {/* Background Image with Gradient */}
        <div className="absolute inset-0">
          <img src={tool.image} alt="" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative h-full p-8 md:p-12 flex flex-col justify-center max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2D2A26] text-white text-xs font-medium w-fit mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
            Featured Tool
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-[#2D2A26] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {tool.title} <span className="text-[#2D2A26]/40">{tool.subtitle}</span>
          </h2>
          
          <p className="text-lg text-[#2D2A26]/70 mb-8 leading-relaxed">
            {tool.description}
          </p>

          <div className="flex items-center gap-2 text-[#2D2A26] font-semibold group-hover:gap-4 transition-all">
            Open Tool
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function Tools() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  
  // SEO
  useEffect(() => {
    document.title = SEO_TITLE
    // ... (meta tags logic same as before)
  }, [])

  const filteredTools = tools.filter(tool => 
    tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const featuredTool = tools[0] // Color Palette
  const otherTools = filteredTools.filter(t => t.id !== featuredTool.id)

  // Check if we're actively searching (has search term)
  const isActivelySearching = searchTerm.length > 0

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#F5F5F7] text-[#1d1d1f] overflow-x-hidden">
        
        {/* Blur Overlay when search is expanded but not actively searching */}
        <AnimatePresence>
          {isSearchExpanded && !isActivelySearching && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />
          )}
        </AnimatePresence>

        <div className="max-w-7xl mx-auto px-6 py-12 relative">
          {/* Header & Search */}
          <div className={`mb-16 text-center ${isSearchExpanded ? 'relative z-50' : ''}`}>
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-8 tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              animate={{ 
                opacity: isSearchExpanded && !isActivelySearching ? 0.3 : 1,
                scale: isSearchExpanded && !isActivelySearching ? 0.95 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              Creator Tools
            </motion.h1>
            
            <SearchBar 
              onSearch={setSearchTerm} 
              isExpanded={isSearchExpanded} 
              setIsExpanded={setIsSearchExpanded}
            />
          </div>

          {/* Content Area */}
          <motion.div
            animate={{ 
              opacity: isSearchExpanded && !isActivelySearching ? 0.3 : 1,
              scale: isSearchExpanded && !isActivelySearching ? 0.98 : 1,
            }}
            transition={{ duration: 0.3 }}
            className={isSearchExpanded && !isActivelySearching ? 'pointer-events-none' : ''}
          >
            {/* Featured Section (Only show if not searching) */}
            {!isActivelySearching && (
              <div className="mb-12">
                <FeaturedCard tool={featuredTool} />
              </div>
            )}

            {/* Search Results Header */}
            {isActivelySearching && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <p className="text-sm text-[#2D2A26]/50">
                  {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'} found for "{searchTerm}"
                </p>
              </motion.div>
            )}

            {/* Grid */}
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {(isActivelySearching ? filteredTools : otherTools).map((tool, index) => (
                  <ToolCard key={tool.id} tool={tool} index={index} />
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredTools.length === 0 && isActivelySearching && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 text-[#2D2A26]/40"
              >
                <p className="text-xl mb-2">No tools found matching "{searchTerm}"</p>
                <p className="text-sm">Try a different search term</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
