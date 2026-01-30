import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import { Link } from 'react-router-dom'

// Tool items data
const tools = [
  {
    id: 'color-palette',
    title: 'Color Palette Generator',
    description: 'Create beautiful color combinations instantly',
    path: '/color-palette-generator',
    gradient: 'from-[#C9A9A6] to-[#A3B899]',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    id: 'token-calculator',
    title: 'AI Token Calculator',
    description: 'Estimate API costs before you build',
    path: '/ai-token-calculator',
    gradient: 'from-[#8FA6B8] to-[#B5A8C6]',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'model-picker',
    title: 'AI Model Picker',
    description: 'Find the perfect AI model for your task',
    path: '/ai-model-picker',
    gradient: 'from-[#D4C17C] to-[#C4856A]',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    id: 'prompt-remix',
    title: 'Prompt Remix',
    description: 'Transform your prompts into powerful variants',
    path: '/prompt-remix',
    gradient: 'from-[#A3B899] to-[#8FA6B8]',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    id: 'legal-doc',
    title: 'Legal Doc Generator',
    description: 'Privacy policies and terms in seconds',
    path: '/legal-doc-generator',
    gradient: 'from-[#B5A8C6] to-[#C9A9A6]',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    id: 'cost-estimator',
    title: 'Vibe Cost Estimator',
    description: 'Calculate your project costs instantly',
    path: '/vibe-cost-calculator',
    gradient: 'from-[#C4856A] to-[#D4C17C]',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
]

// Hero images for the carousel
const heroImages = [
  '/tools-hero-1.png',
  '/tools-hero-2.png',
  '/tools-hero-3.png',
  '/tools-hero-4.png',
  '/tools-hero-5.png',
]

// Floating Image Carousel Component
const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={heroImages[currentIndex]}
          alt="Tools illustration"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.05, y: -20 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[400px] h-auto object-contain drop-shadow-2xl"
        />
      </AnimatePresence>
      
      {/* Carousel indicators */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2">
        {heroImages.map((_, idx) => (
          <motion.button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'bg-[#2D2A26] w-6' : 'bg-[#2D2A26]/20'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  )
}

// Tool Card Component
const ToolCard = ({ tool, index }) => {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1] 
      }}
    >
      <Link
        to={tool.path}
        className="block group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="relative bg-white/70 backdrop-blur-xl rounded-[2rem] p-6 border border-[#2D2A26]/5 overflow-hidden"
          whileHover={{ 
            y: -8,
            boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.15), 0 18px 36px -18px rgba(0, 0, 0, 0.1)'
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Gradient background on hover */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0`}
            animate={{ opacity: isHovered ? 0.1 : 0 }}
            transition={{ duration: 0.4 }}
          />
          
          {/* Icon */}
          <motion.div
            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-white mb-4 shadow-lg`}
            animate={{ 
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? 5 : 0
            }}
            transition={{ duration: 0.3 }}
          >
            {tool.icon}
          </motion.div>
          
          {/* Content */}
          <h3 className="text-lg font-semibold text-[#2D2A26] mb-2 group-hover:text-[#2D2A26] transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {tool.title}
          </h3>
          <p className="text-sm text-[#2D2A26]/60 leading-relaxed">
            {tool.description}
          </p>
          
          {/* Arrow indicator */}
          <motion.div
            className="absolute bottom-6 right-6 w-8 h-8 rounded-full bg-[#2D2A26]/5 flex items-center justify-center"
            animate={{ 
              x: isHovered ? 4 : 0,
              backgroundColor: isHovered ? 'rgba(45, 42, 38, 0.1)' : 'rgba(45, 42, 38, 0.05)'
            }}
            transition={{ duration: 0.3 }}
          >
            <svg className="w-4 h-4 text-[#2D2A26]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  )
}

// Main Tools Page Component
export default function Tools() {
  // SEO
  useEffect(() => {
    document.title = 'Free AI & Design Tools - VibeBrews | 2026'
    
    const updateMeta = (name, content, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name'
      let meta = document.querySelector(`meta[${attr}="${name}"]`)
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute(attr, name)
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', content)
    }
    
    updateMeta('description', 'Explore free AI tools and design utilities. Color palette generator, AI model picker, token calculator, prompt remix, and more. No signup required.')
    updateMeta('keywords', 'free ai tools, design tools, color palette, ai model, token calculator, prompt generator')
    
    return () => {
      document.title = 'VibeBrews - Create Multiplayer Games by Talking'
    }
  }, [])
  
  return (
    <PageTransition>
      <div className="min-h-screen bg-[#F8F5F0] overflow-hidden">
        
        {/* Hero Section - Single screen, no scroll needed */}
        <section className="min-h-screen flex flex-col lg:flex-row items-center justify-center px-6 py-12 lg:py-0 gap-8 lg:gap-16 max-w-7xl mx-auto">
          
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 max-w-xl text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full text-sm font-medium text-[#2D2A26]/70 mb-6 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Free Utilities
            </motion.div>
            
            {/* Headline */}
            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2D2A26] leading-[1.05] mb-6"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Tools that
              <br />
              <span className="text-[#2D2A26]/30">just work.</span>
            </h1>
            
            {/* Subhead */}
            <p className="text-lg text-[#2D2A26]/60 mb-8 max-w-md mx-auto lg:mx-0">
              Simple utilities for designers, developers, and creators. No signup. No friction. Just results.
            </p>
            
            {/* Quick links */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#2D2A26] text-white rounded-full font-medium text-sm shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all"
              >
                <svg style={{ width: '20px', height: '20px', flexShrink: 0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                VibeBrews Home
              </Link>
              <Link
                to="/how-to-make-a-game-without-coding"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 text-[#2D2A26] rounded-full font-medium text-sm border border-[#2D2A26]/10 hover:bg-white hover:shadow-lg transition-all"
              >
                <svg style={{ width: '20px', height: '20px', flexShrink: 0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                All Blogs
              </Link>
            </div>
          </motion.div>
          
          {/* Right: Image Carousel + Tool Grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 w-full max-w-2xl"
          >
            {/* Image carousel for larger screens */}
            <div className="hidden lg:block mb-8 h-[280px]">
              <ImageCarousel />
            </div>
            
            {/* Tool Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {tools.map((tool, index) => (
                <ToolCard key={tool.id} tool={tool} index={index} />
              ))}
            </div>
          </motion.div>
        </section>
        
        {/* Mobile Image Carousel - Shows only on mobile at bottom */}
        <motion.div 
          className="lg:hidden px-6 pb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="h-[200px]">
            <ImageCarousel />
          </div>
        </motion.div>
        
        {/* Minimal Footer */}
        <footer className="absolute bottom-0 left-0 right-0 py-6 px-6">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <img 
                src="/logo-white-48x48.png"
                alt="VibeBrews"
                className="w-6 h-6 rounded-md opacity-60"
              />
              <span className="text-sm text-[#2D2A26]/40">A free collection by VibeBrews</span>
            </div>
            <nav className="flex gap-6 text-sm text-[#2D2A26]/40">
              <Link to="/" className="hover:text-[#2D2A26]/70 transition-colors">Home</Link>
              <Link to="/our-vision" className="hover:text-[#2D2A26]/70 transition-colors">About</Link>
              <a 
                href="https://play.google.com/store/apps/details?id=com.nextap.vibebrews" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-[#2D2A26]/70 transition-colors"
              >
                Get App
              </a>
            </nav>
          </div>
        </footer>
      </div>
    </PageTransition>
  )
}
