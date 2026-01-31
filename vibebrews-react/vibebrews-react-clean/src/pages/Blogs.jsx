import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import ContinuousCard from '../components/ContinuousCard'
import ContinuousImage from '../components/ContinuousImage'

// SEO
const SEO_TITLE = 'Blog | VibeBrews - Insights for Creators & Game Developers'
const SEO_DESC = 'Explore articles on game development, creativity, AI tools, and building without code. Tips, insights, and honest stories for indie creators.'
const SEO_KEYWORDS = 'game development blog, indie creator, no code games, AI tools, creativity tips, game dev insights, unity alternatives, creative block, game ideas'

// Blog data
const blogs = [
  {
    id: 'how-to-make',
    path: '/how-to-make-a-game-without-coding',
    title: 'How to Make a Game Without Coding',
    description: 'Build your first game without writing a single line of code. A complete guide for beginners.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    color: '#8b5cf6',
    image: '/assets/abstract-creativity-3d.png',
    tags: ['Guide', 'Beginner'],
    readTime: '8 min'
  },
  {
    id: 'i-have-idea',
    path: '/i-have-a-game-idea',
    title: 'I Have a Game Idea',
    description: 'Everyone has game ideas. Learn how to turn yours from a shower thought into something real.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    color: '#f59e0b',
    image: '/assets/human-ai-creativity.png',
    tags: ['Ideas', 'Motivation'],
    readTime: '5 min'
  },
  {
    id: 'productive-play',
    path: '/productive-things-to-do-on-phone',
    title: 'Productive Things to Do on Your Phone',
    description: 'Transform your screen time into creative time. Practical tips for mobile productivity.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    color: '#10b981',
    image: '/assets/designer-workspace.png',
    tags: ['Productivity', 'Mobile'],
    readTime: '6 min'
  },
  {
    id: 'why-quit-unity',
    path: '/why-i-stopped-learning-unity',
    title: 'Why I Stopped Learning Unity',
    description: 'An honest look at why traditional game engines might not be for everyone.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: '#ef4444',
    image: '/assets/palette-hero-spheres.png',
    tags: ['Opinion', 'Unity'],
    readTime: '7 min'
  },
  {
    id: 'death-of-coding',
    path: '/the-death-of-coding',
    title: 'The Death of Coding',
    description: 'Is coding dying? How AI is changing what it means to build software.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    color: '#6366f1',
    image: '/assets/abstract-creativity-3d.png',
    tags: ['AI', 'Future'],
    readTime: '9 min'
  },
  {
    id: 'creative-block',
    path: '/the-creative-block-is-a-lie',
    title: 'The Creative Block is a Lie',
    description: "Creative block isn't real. Here's what's actually stopping you and how to break through.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: '#ec4899',
    image: '/assets/human-ai-creativity.png',
    tags: ['Creativity', 'Mindset'],
    readTime: '5 min'
  },
  {
    id: 'game-never-make',
    path: '/the-game-you-will-never-make',
    title: "The Game You'll Never Make",
    description: "That dream game in your head? Let's talk about why it might stay there forever.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    ),
    color: '#78716c',
    image: '/assets/designer-workspace.png',
    tags: ['Reality', 'Motivation'],
    readTime: '6 min'
  },
  {
    id: '3am-scroll',
    path: '/the-3am-scroll',
    title: 'The 3AM Scroll',
    description: "We've all been there. A reflection on late-night scrolling and what it really means.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    ),
    color: '#1e3a5f',
    image: '/assets/abstract-creativity-3d.png',
    tags: ['Life', 'Reflection'],
    readTime: '4 min'
  },
  {
    id: 'ideas-die',
    path: '/why-your-ideas-die-in-your-notes-app',
    title: 'Why Your Ideas Die in Your Notes App',
    description: 'Your notes app is where ideas go to die. Here\'s how to rescue them.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    color: '#0891b2',
    image: '/assets/human-ai-creativity.png',
    tags: ['Ideas', 'Productivity'],
    readTime: '5 min'
  },
  {
    id: 'ai-race',
    path: '/everyone-racing-against-ai',
    title: 'Everyone is Racing Against AI',
    description: 'The AI race is on. Are you competing, adapting, or getting left behind?',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: '#dc2626',
    image: '/assets/palette-hero-spheres.png',
    tags: ['AI', 'Industry'],
    readTime: '8 min'
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
      setTimeout(() => {
        document.addEventListener('click', handleClickOutside)
      }, 0)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isExpanded, setIsExpanded, onSearch])

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
          placeholder="Search blogs..."
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

// Blog Card Component
const BlogCard = ({ blog, index }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.05 }}
      className="group"
    >
      <Link to={blog.path} className="block h-full">
        <ContinuousCard
          hoverScale={1.02}
          tiltAmount={8}
          enableSpotlight={true}
          className="relative h-full bg-white rounded-3xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden"
        >
          {/* Top Section: Icon & Tags */}
          <div className="flex justify-between items-start mb-4">
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center p-2.5"
              style={{ backgroundColor: `${blog.color}15`, color: blog.color }}
            >
              {blog.icon}
            </div>
            <div className="flex items-center gap-2">
              {blog.readTime && (
                <span className="text-[10px] font-medium px-2 py-1 rounded-full bg-[#2D2A26]/5 text-[#2D2A26]/60">
                  {blog.readTime}
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div>
            <h3 className="text-lg font-bold text-[#2D2A26] mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {blog.title}
            </h3>
            <p className="text-sm text-[#2D2A26]/50 leading-relaxed line-clamp-2 mb-3">
              {blog.description}
            </p>
            {blog.tags && (
              <div className="flex gap-1 flex-wrap">
                {blog.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-medium px-2 py-1 rounded-full bg-[#2D2A26]/5 text-[#2D2A26]/60">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Hover Image Reveal */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none translate-x-8 -translate-y-8">
             <ContinuousImage src={blog.image} alt="" className="w-full h-full object-contain" />
          </div>

          {/* Read indicator */}
          <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-1 text-[#2D2A26]/40 text-xs font-medium">
              Read
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </ContinuousCard>
      </Link>
    </motion.div>
  )
}

// Featured Blog Card
const FeaturedCard = ({ blog }) => {
  return (
    <Link to={blog.path} className="block group relative w-full h-full min-h-[280px]">
      <ContinuousCard
        hoverScale={1.01}
        tiltAmount={5}
        enableSpotlight={true}
        className="absolute inset-0 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgb(0,0,0,0.08)] overflow-hidden"
      >
        {/* Background Image with Gradient */}
        <div className="absolute inset-0">
          <ContinuousImage 
            src={blog.image} 
            alt="" 
            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative h-full p-8 md:p-12 flex flex-col justify-center max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2D2A26] text-white text-xs font-medium w-fit mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6] animate-pulse" />
            Featured Article
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-[#2D2A26] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {blog.title}
          </h2>
          
          <p className="text-lg text-[#2D2A26]/70 mb-6 leading-relaxed">
            {blog.description}
          </p>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[#2D2A26] font-semibold group-hover:gap-4 transition-all">
              Read Article
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
            {blog.readTime && (
              <span className="text-sm text-[#2D2A26]/40">{blog.readTime} read</span>
            )}
          </div>
        </div>
      </ContinuousCard>
    </Link>
  )
}

export default function Blogs() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  
  // SEO
  useEffect(() => {
    document.title = SEO_TITLE
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) metaDesc.setAttribute('content', SEO_DESC)
    const metaKeywords = document.querySelector('meta[name="keywords"]')
    if (metaKeywords) metaKeywords.setAttribute('content', SEO_KEYWORDS)
  }, [])

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const featuredBlog = blogs[0] // How to Make a Game Without Coding
  const otherBlogs = filteredBlogs.filter(b => b.id !== featuredBlog.id)

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
              className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              animate={{ 
                opacity: isSearchExpanded && !isActivelySearching ? 0.3 : 1,
                scale: isSearchExpanded && !isActivelySearching ? 0.95 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              Blog
            </motion.h1>
            <motion.p 
              className="text-[#2D2A26]/50 text-lg mb-8 max-w-xl mx-auto"
              animate={{ 
                opacity: isSearchExpanded && !isActivelySearching ? 0.3 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              Insights, stories, and guides for creators
            </motion.p>
            
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
                <FeaturedCard blog={featuredBlog} />
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
                  {filteredBlogs.length} {filteredBlogs.length === 1 ? 'article' : 'articles'} found for "{searchTerm}"
                </p>
              </motion.div>
            )}

            {/* Grid */}
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {(isActivelySearching ? filteredBlogs : otherBlogs).map((blog, index) => (
                  <BlogCard key={blog.id} blog={blog} index={index} />
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredBlogs.length === 0 && isActivelySearching && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 text-[#2D2A26]/40"
              >
                <p className="text-xl mb-2">No articles found matching "{searchTerm}"</p>
                <p className="text-sm">Try a different search term</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
