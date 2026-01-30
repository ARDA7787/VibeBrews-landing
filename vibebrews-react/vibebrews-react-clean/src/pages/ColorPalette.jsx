import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import { Link } from 'react-router-dom'

// SEO Meta Tags
const SEO_TITLE = 'Color Palette Generator - Free Color Scheme Maker | 2026'
const SEO_DESC = 'Create beautiful color palettes instantly. Free online color scheme generator with harmony, warm, cool, pastel & earth modes. Export CSS. No signup required.'
const SEO_KEYWORDS = 'color palette generator, color scheme generator, color picker, color combinations, brand colors, website colors, aesthetic color palettes, free color tool, CSS colors, hex colors'

// Debug log to ensure component is loading
console.log('ColorPalette module loaded')

// ============================================================================
// THREE.JS CINEMATIC SCENE - Optimized Floating Orbs
// ============================================================================
const ThreeScene = () => {
  const containerRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)
  
  useEffect(() => {
    if (!containerRef.current) return
    let cleanup = null
    
    const initScene = () => {
      const THREE = window.THREE
      if (!THREE || !containerRef.current) return
      
      const container = containerRef.current
      const width = window.innerWidth
      const height = window.innerHeight
      
      // Scene setup
      const scene = new THREE.Scene()
      scene.background = new THREE.Color('#F8F5F0')
      
      // Camera
      const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
      camera.position.set(0, 0, 30)
      
      // Renderer - optimized settings
      const renderer = new THREE.WebGLRenderer({ 
        antialias: window.devicePixelRatio < 2,
        alpha: true,
        powerPreference: 'high-performance'
      })
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
      container.appendChild(renderer.domElement)
      
      // Simplified lighting
      scene.add(new THREE.AmbientLight(0xffffff, 0.9))
      const dirLight = new THREE.DirectionalLight(0xffffff, 0.5)
      dirLight.position.set(10, 20, 15)
      scene.add(dirLight)
      
      // Muted color palette
      const colors = ['#C9A9A6', '#A3B899', '#C4856A', '#B5A8C6', '#D4C17C', '#8FA6B8']
      
      // Create orbs - reduced count & geometry for performance
      const orbs = []
      const sharedGeometry = new THREE.SphereGeometry(1, 16, 16) // Shared geometry
      
      for (let i = 0; i < 12; i++) {
        const material = new THREE.MeshStandardMaterial({
          color: colors[i % colors.length],
          roughness: 0.5,
          metalness: 0.05,
        })
        const orb = new THREE.Mesh(sharedGeometry, material)
        
        const scale = Math.random() * 1.2 + 0.4
        orb.scale.setScalar(scale)
        
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(Math.random() * 2 - 1)
        const radius = Math.random() * 12 + 6
        
        orb.position.set(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi) - 8
        )
        
        orb.userData = {
          baseY: orb.position.y,
          baseX: orb.position.x,
          speed: Math.random() * 0.4 + 0.15,
          offset: Math.random() * Math.PI * 2,
          amp: Math.random() * 1.5 + 0.8,
        }
        
        scene.add(orb)
        orbs.push(orb)
      }
      
      setIsLoaded(true)
      
      // Optimized animation loop
      let time = 0
      let animId
      
      const animate = () => {
        animId = requestAnimationFrame(animate)
        time += 0.008
        
        const scrollY = window.scrollY
        const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
        const scrollPos = Math.min(scrollY / maxScroll, 1)
        
        // Smooth camera
        camera.position.x = Math.sin(scrollPos * Math.PI * 1.5) * 12
        camera.position.y = scrollPos * 15 - 3
        camera.position.z = 28 - scrollPos * 15
        camera.lookAt(0, scrollPos * 8, 0)
        
        // Animate orbs
        for (let i = 0; i < orbs.length; i++) {
          const orb = orbs[i]
          const { baseY, baseX, speed, offset, amp } = orb.userData
          orb.position.y = baseY + Math.sin(time * speed + offset) * amp
          orb.position.x = baseX + Math.cos(time * speed * 0.6 + offset) * amp * 0.4
        }
        
        renderer.render(scene, camera)
      }
      
      animate()
      
      const handleResize = () => {
        const w = window.innerWidth, h = window.innerHeight
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        renderer.setSize(w, h)
      }
      window.addEventListener('resize', handleResize)
      
      cleanup = () => {
        cancelAnimationFrame(animId)
        window.removeEventListener('resize', handleResize)
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement)
        }
        renderer.dispose()
        sharedGeometry.dispose()
        orbs.forEach(o => o.material.dispose())
      }
    }
    
    // Load Three.js
    if (window.THREE) {
      initScene()
    } else {
      const script = document.createElement('script')
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'
      script.async = true
      script.onload = initScene
      document.head.appendChild(script)
    }
    
    return () => cleanup?.()
  }, [])
  
  return (
    <div 
      ref={containerRef} 
      className={`fixed inset-0 -z-10 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      style={{ background: 'linear-gradient(180deg, #F8F5F0 0%, #EDE8E0 100%)' }}
    />
  )
}

// ============================================================================
// COLOR PALETTE GENERATOR TOOL
// ============================================================================
const PaletteGenerator = () => {
  const [colors, setColors] = useState([
    '#C9A9A6', '#A3B899', '#C4856A', '#B5A8C6', '#D4C17C'
  ])
  const [mode, setMode] = useState('harmony')
  const [copied, setCopied] = useState(null)
  const [locked, setLocked] = useState([false, false, false, false, false])
  
  // Color generation function
  const generateColors = useCallback((selectedMode, lockedColors, currentColors) => {
    const modes = {
      harmony: () => {
        const baseHue = Math.random() * 360
        return [
          hslToHex(baseHue, 35 + Math.random() * 20, 65 + Math.random() * 15),
          hslToHex((baseHue + 30) % 360, 30 + Math.random() * 20, 60 + Math.random() * 15),
          hslToHex((baseHue + 60) % 360, 40 + Math.random() * 20, 55 + Math.random() * 15),
          hslToHex((baseHue + 180) % 360, 25 + Math.random() * 20, 70 + Math.random() * 15),
          hslToHex((baseHue + 210) % 360, 35 + Math.random() * 20, 60 + Math.random() * 15),
        ]
      },
      warm: () => {
        const baseHue = Math.random() * 60
        return [
          hslToHex(baseHue, 40 + Math.random() * 25, 60 + Math.random() * 20),
          hslToHex((baseHue + 15) % 60 + 10, 35 + Math.random() * 25, 65 + Math.random() * 15),
          hslToHex((baseHue + 30) % 60 + 20, 45 + Math.random() * 20, 55 + Math.random() * 20),
          hslToHex((baseHue + 45) % 60 + 10, 30 + Math.random() * 25, 70 + Math.random() * 15),
          hslToHex((baseHue + 350) % 360, 35 + Math.random() * 20, 60 + Math.random() * 15),
        ]
      },
      cool: () => {
        const baseHue = 180 + Math.random() * 80
        return [
          hslToHex(baseHue, 30 + Math.random() * 25, 60 + Math.random() * 20),
          hslToHex((baseHue + 20) % 360, 35 + Math.random() * 20, 65 + Math.random() * 15),
          hslToHex((baseHue + 40) % 360, 25 + Math.random() * 25, 70 + Math.random() * 15),
          hslToHex((baseHue - 20 + 360) % 360, 40 + Math.random() * 20, 55 + Math.random() * 20),
          hslToHex(140 + Math.random() * 40, 30 + Math.random() * 20, 60 + Math.random() * 15),
        ]
      },
      pastel: () => {
        return Array(5).fill(0).map(() => hslToHex(Math.random() * 360, 25 + Math.random() * 20, 78 + Math.random() * 12))
      },
      earth: () => {
        return [25, 35, 45, 85, 15].map(h => hslToHex(h + Math.random() * 20 - 10, 30 + Math.random() * 25, 50 + Math.random() * 25))
      },
    }
    
    const newColors = modes[selectedMode]()
    return currentColors.map((c, i) => lockedColors[i] ? c : newColors[i])
  }, [])
  
  // Generate palette
  const generatePalette = useCallback(() => {
    setColors(prev => generateColors(mode, locked, prev))
  }, [mode, locked, generateColors])
  
  // Handle mode change - generate new palette immediately
  const handleModeChange = useCallback((newMode) => {
    setMode(newMode)
    setColors(prev => generateColors(newMode, locked, prev))
  }, [locked, generateColors])
  
  const copyColor = (color, index) => {
    navigator.clipboard.writeText(color)
    setCopied(index)
    setTimeout(() => setCopied(null), 1500)
  }
  
  const toggleLock = (index) => {
    setLocked(prev => prev.map((l, i) => i === index ? !l : l))
  }
  
  const exportPalette = () => {
    const css = colors.map((c, i) => `--color-${i + 1}: ${c};`).join('\n')
    navigator.clipboard.writeText(`:root {\n${css}\n}`)
    setCopied('all')
    setTimeout(() => setCopied(null), 1500)
  }
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Mode selector */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {['harmony', 'warm', 'cool', 'pastel', 'earth'].map(m => (
          <button
            key={m}
            onClick={() => handleModeChange(m)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              mode === m 
                ? 'bg-[#2D2A26] text-white shadow-lg' 
                : 'bg-white/60 text-[#2D2A26]/70 hover:bg-white hover:text-[#2D2A26]'
            }`}
          >
            {m.charAt(0).toUpperCase() + m.slice(1)}
          </button>
        ))}
      </div>
      
      {/* Color swatches */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        {colors.map((color, i) => (
          <motion.div
            key={i}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex-1 group"
          >
            <div 
              className="relative h-32 sm:h-48 rounded-3xl cursor-pointer overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              style={{ backgroundColor: color }}
              onClick={() => copyColor(color, i)}
            >
              {/* Lock button */}
              <button
                onClick={(e) => { e.stopPropagation(); toggleLock(i) }}
                className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  locked[i] 
                    ? 'bg-white/90 text-[#2D2A26]' 
                    : 'bg-black/20 text-white/80 opacity-0 group-hover:opacity-100'
                }`}
              >
                {locked[i] ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
              
              {/* Copied indicator */}
              <AnimatePresence>
                {copied === i && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/30"
                  >
                    <span className="text-white font-medium">Copied!</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Color code */}
            <div className="mt-3 text-center">
              <span className="font-mono text-sm text-[#2D2A26]/70">{color.toUpperCase()}</span>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Action buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <motion.button
          data-generate-btn
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={generatePalette}
          className="px-8 py-4 bg-[#2D2A26] text-white rounded-full font-semibold text-base shadow-xl hover:shadow-2xl transition-all flex items-center gap-3"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Generate
          <span className="text-white/50 text-sm">(Space)</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={exportPalette}
          className="px-6 py-4 bg-white text-[#2D2A26] rounded-full font-medium text-base shadow-lg hover:shadow-xl transition-all flex items-center gap-2 border border-[#2D2A26]/10"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          {copied === 'all' ? 'Copied CSS!' : 'Export CSS'}
        </motion.button>
      </div>
      
      {/* Keyboard shortcut hint */}
      <p className="text-center text-sm text-[#2D2A26]/40 mt-6">
        Press <kbd className="px-2 py-1 bg-white/60 rounded text-xs font-mono">Space</kbd> to generate
      </p>
    </div>
  )
}

// HSL to Hex conversion
function hslToHex(h, s, l) {
  s /= 100
  l /= 100
  const a = s * Math.min(l, 1 - l)
  const f = n => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color).toString(16).padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

// ============================================================================
// SCROLL-TRIGGERED CONTENT SECTIONS
// ============================================================================
const ContentSection = ({ children, className = '' }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 0, 0, -60])
  
  return (
    <motion.section 
      ref={ref}
      style={{ opacity, y }}
      className={`relative ${className}`}
    >
      {children}
    </motion.section>
  )
}

// ============================================================================
// AI INSIGHT SECTION - The 2026-2028 Deep Take
// ============================================================================
const AIInsightSection = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] p-8 md:p-12 shadow-xl border border-[#2D2A26]/5">
        {/* Headline */}
        <div className="mb-8">
          <span className="inline-block px-3 py-1 bg-[#2D2A26]/5 rounded-full text-xs font-semibold text-[#2D2A26]/60 uppercase tracking-wider mb-4">
            2026 Perspective
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2D2A26] leading-tight mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            The Last Generation of Creators Who Had to Learn Tools
          </h2>
        </div>
        
        {/* Content */}
        <div className="space-y-6 text-[#2D2A26]/70 text-lg leading-relaxed">
          <p>
            Here's something nobody's talking about: <strong className="text-[#2D2A26]">we're witnessing the death of the learning curve</strong>.
          </p>
          
          <p>
            For decades, creativity had a gatekeeper. Photoshop. After Effects. Unity. Figma. You wanted to create? First, you had to become fluent in someone else's interface. Spend 200 hours just to move pixels the way you imagined them.
          </p>
          
          <p>
            <strong className="text-[#2D2A26]">That era ended sometime in 2024, and most people haven't noticed yet.</strong>
          </p>
          
          <blockquote className="border-l-4 border-[#C9A9A6] pl-6 py-2 my-8 italic text-[#2D2A26]/60">
            "The best interface is no interface. The best tool is one that understands your intent."
          </blockquote>
          
          <p>
            By 2028, the most prolific creators won't be the ones who mastered tools. They'll be the ones who mastered <em>articulating what they want</em>. The skill shifts from "how do I do this in X software" to "how do I describe this clearly enough."
          </p>
          
          <p>
            Color palettes used to require understanding color theory, complementary angles, HSL values. Now you say "warm sunset but make it cozy" and the machine understands.
          </p>
          
          <div className="bg-[#F8F5F0] rounded-2xl p-6 my-8">
            <p className="text-[#2D2A26] font-medium mb-2">The uncomfortable truth:</p>
            <p className="text-[#2D2A26]/70">
              Every hour you spend learning complex software in 2026 is an hour you could've spent actually creating. The tools are converging toward thought. The winners will be those who stopped optimizing their workflow and started optimizing their vision.
            </p>
          </div>
          
          <p>
            We're not building tools anymore. We're building translators between human intention and digital output. And the gap between "I have an idea" and "it exists" is shrinking to zero.
          </p>
        </div>
        
        {/* Subtle CTA */}
        <div className="mt-10 pt-8 border-t border-[#2D2A26]/10">
          <p className="text-sm text-[#2D2A26]/50 mb-4">
            Curious what happens when you describe something more complex? Like a whole interactive experience?
          </p>
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-[#2D2A26] font-medium hover:gap-3 transition-all"
          >
            See what people are creating with just words
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// IMAGE GALLERY SECTION - Optimized lazy loading
// ============================================================================
const GallerySection = () => {
  const images = useMemo(() => [
    { src: '/assets/palette-hero-spheres.png', alt: 'Color palette spheres for design inspiration', span: 'col-span-2' },
    { src: '/assets/color-psychology-poster.png', alt: 'Color psychology guide - emotions and colors', span: 'row-span-2' },
    { src: '/assets/abstract-creativity-3d.png', alt: '3D abstract shapes for creative projects', span: '' },
    { src: '/assets/designer-workspace.png', alt: 'Designer workspace with color swatches', span: 'col-span-2' },
    { src: '/assets/human-ai-creativity.png', alt: 'AI and human creativity collaboration', span: 'col-span-2' },
    { src: '/assets/palette-app-mockup.png', alt: 'Color palette generator app mockup', span: '' },
  ], [])
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
      {images.map((img, i) => (
        <motion.div
          key={img.src}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05, duration: 0.4 }}
          viewport={{ once: true, margin: '-50px' }}
          className={`${img.span} rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300`}
        >
          <img 
            src={img.src} 
            alt={img.alt}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </motion.div>
      ))}
    </div>
  )
}

// ============================================================================
// QUICK TIPS SECTION
// ============================================================================
const QuickTips = () => {
  const tips = [
    { icon: '60', label: '60-30-10', desc: 'Rule: 60% dominant, 30% secondary, 10% accent' },
    { icon: '3', label: 'Max colors', desc: 'Most successful brands use only 2-3 colors' },
    { icon: '4.5', label: 'Contrast ratio', desc: 'Minimum for accessible text readability' },
  ]
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
      {tips.map((tip, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          viewport={{ once: true }}
          className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/80 transition-colors"
        >
          <div className="text-4xl font-bold text-[#2D2A26] mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {tip.icon}
          </div>
          <div className="font-semibold text-[#2D2A26] mb-1">{tip.label}</div>
          <p className="text-sm text-[#2D2A26]/60">{tip.desc}</p>
        </motion.div>
      ))}
    </div>
  )
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================
export default function ColorPalette() {
  console.log('ColorPalette component rendering')
  
  // SEO - Update document head
  useEffect(() => {
    document.title = SEO_TITLE
    
    // Update or create meta tags
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
    
    updateMeta('description', SEO_DESC)
    updateMeta('keywords', SEO_KEYWORDS)
    updateMeta('og:title', SEO_TITLE, true)
    updateMeta('og:description', SEO_DESC, true)
    updateMeta('og:type', 'website', true)
    updateMeta('twitter:card', 'summary_large_image')
    updateMeta('twitter:title', SEO_TITLE)
    updateMeta('twitter:description', SEO_DESC)
    
    // Structured Data for SEO
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      'name': 'Color Palette Generator',
      'description': SEO_DESC,
      'applicationCategory': 'DesignApplication',
      'operatingSystem': 'Any',
      'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
      'featureList': ['Color harmony generation', 'Warm/Cool/Pastel/Earth modes', 'CSS export', 'Lock colors feature'],
    }
    
    let script = document.querySelector('script[data-palette-schema]')
    if (!script) {
      script = document.createElement('script')
      script.type = 'application/ld+json'
      script.setAttribute('data-palette-schema', 'true')
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(structuredData)
    
    // Cleanup
    return () => {
      document.title = 'VibeBrews - Create Multiplayer Games by Talking'
      script?.remove()
    }
  }, [])
  
  // Keyboard shortcut for generating
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault()
        document.querySelector('[data-generate-btn]')?.click()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])
  
  return (
    <PageTransition>
      {/* Three.js Background */}
      <ThreeScene />
      
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6 pt-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="inline-block px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full text-sm font-medium text-[#2D2A26]/70 mb-6 shadow-sm">
                Free Color Tool
              </span>
              
              <h1 
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#2D2A26] leading-[1.05] mb-6"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Color Palette
                <br />
                <span className="text-[#2D2A26]/30">Generator</span>
              </h1>
              
              <p className="text-lg md:text-xl text-[#2D2A26]/60 max-w-xl mx-auto mb-12">
                Create beautiful color combinations in seconds. No signup. No watermarks. Just colors that work.
              </p>
            </motion.div>
            
            {/* Palette Generator Tool */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <PaletteGenerator />
            </motion.div>
          </div>
        </section>
        
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="flex justify-center pb-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-[#2D2A26]/30"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7" />
            </svg>
          </motion.div>
        </motion.div>
        
        {/* Quick Tips Section */}
        <ContentSection className="py-20 px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#2D2A26] mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Color Rules That Actually Work
            </h2>
            <p className="text-[#2D2A26]/50">Used by designers at Apple, Airbnb, and Stripe</p>
          </div>
          <QuickTips />
        </ContentSection>
        
        {/* Gallery Section */}
        <ContentSection className="py-20 px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#2D2A26] mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Color Inspiration
            </h2>
            <p className="text-[#2D2A26]/50">Visual references for your next project</p>
          </div>
          <GallerySection />
        </ContentSection>
        
        {/* AI Insight Section */}
        <ContentSection className="py-20 px-6">
          <AIInsightSection />
        </ContentSection>
        
        {/* Final CTA */}
        <section className="py-32 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 
                className="text-3xl md:text-4xl font-bold text-[#2D2A26] mb-4"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Beyond Colors
              </h2>
              <p className="text-lg text-[#2D2A26]/60 mb-8">
                What if you could describe an entire interactive experience — and have it built for you?
              </p>
              
              <Link
                to="/"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#2D2A26] text-white rounded-full font-semibold text-base shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all"
              >
                Discover VibeBrews
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="py-12 px-6 border-t border-[#2D2A26]/10">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <img 
                src="https://play-lh.googleusercontent.com/lOGaWbwoVmJcBKAatXi0TFhY-XcZEPhat-f1sI6WRo2pd7uOq-kBv6f7t8N2GEljlPQwMxbpDWOt-XPzToP5fpE=w480-h960-rw"
                alt="VibeBrews"
                className="w-8 h-8 rounded-lg"
              />
              <span className="text-[#2D2A26]/70 text-sm">A free tool by <strong>VibeBrews</strong></span>
            </div>
            
            <nav className="flex gap-6 text-sm text-[#2D2A26]/50">
              <Link to="/" className="hover:text-[#2D2A26] transition-colors">Home</Link>
              <Link to="/our-vision" className="hover:text-[#2D2A26] transition-colors">About</Link>
              <a href="https://play.google.com/store/apps/details?id=com.nextap.vibebrews" target="_blank" rel="noopener noreferrer" className="hover:text-[#2D2A26] transition-colors">
                Get App
              </a>
            </nav>
          </div>
        </footer>
      </div>
    </PageTransition>
  )
}
