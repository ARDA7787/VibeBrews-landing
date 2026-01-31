import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView, useReducedMotion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import ExternalLink from '../components/ExternalLink'
import { Link } from 'react-router-dom'
import ContinuousImage from '../components/ContinuousImage'
import ContinuousButton from '../components/ContinuousButton'
import ContinuousCard from '../components/ContinuousCard'
import ContinuousInput from '../components/ContinuousInput'

// Reveal animation wrapper with reduced motion support
const Reveal = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const prefersReducedMotion = useReducedMotion()
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReducedMotion ? 0 : 40 }}
      transition={{ duration: prefersReducedMotion ? 0.1 : 0.8, delay: prefersReducedMotion ? 0 : delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}


// Hero Section
const HeroSection = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [autoplayFailed, setAutoplayFailed] = useState(false)
  const videoRef = useRef(null)
  const sectionRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        videoRef.current.play()
          .then(() => {
            setIsPlaying(true)
            setAutoplayFailed(false)
          })
          .catch(() => {
            setAutoplayFailed(true)
          })
      }
    }
  }

  useEffect(() => {
    if (prefersReducedMotion) return // Don't autoplay if user prefers reduced motion
    
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && videoRef.current) { 
        videoRef.current.play()
          .then(() => {
            setIsPlaying(true)
            setAutoplayFailed(false)
          })
          .catch(() => {
            setAutoplayFailed(true)
            setIsPlaying(false)
          })
      } else if (videoRef.current) { 
        videoRef.current.pause()
        setIsPlaying(false)
      }
    }, { threshold: 0.3 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [prefersReducedMotion])

  return (
    <section ref={sectionRef} className="relative min-h-[100dvh] w-full flex items-center justify-center px-4 sm:px-6 bg-black overflow-hidden">
      {/* Simple gradient background - cleaner than animated waves */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-neutral-950 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.03)_0%,_transparent_70%)] pointer-events-none" />
      
      <div className="relative z-10 max-w-5xl mx-auto w-full py-12 sm:py-20">
        {/* Mobile: Stack vertically with phone first for visual impact */}
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-16">
          
          {/* Text + Animated Steps */}
          <div className="flex-1 text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight leading-[1.1] mb-4 sm:mb-5"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <span className="text-white/50">Type a sentence.</span><br />
              <span className="text-white">Get a game.</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm sm:text-base text-white/60 max-w-sm mx-auto lg:mx-0 mb-5 sm:mb-6"
            >
              AI turns your words into playable 3D games in minutes.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <ExternalLink 
                href="https://play.google.com/store/apps/details?id=com.nextap.vibebrews&pli=1" 
                className="group relative inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-7 py-3 sm:py-3.5 bg-white text-black font-semibold text-sm rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-[0_0_20px_rgba(255,255,255,0.15)]"
              >
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-black/5 to-transparent" />
                </div>
                <span className="relative">Get the app — free</span>
                <svg className="relative w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </ExternalLink>
            </motion.div>
          </div>
          
          {/* Phone with Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex-shrink-0"
          >
            <div className="relative">
              {/* Subtle white glow behind phone */}
              <div className="absolute -inset-6 sm:-inset-8 rounded-[3rem] sm:rounded-[4rem] blur-2xl bg-white/[0.07]" />
              
              <div className="relative w-[180px] sm:w-[220px] md:w-[260px] bg-[#1C1C1E] rounded-[2rem] sm:rounded-[2.5rem] p-1.5 sm:p-2 shadow-2xl">
                <div className="absolute top-2 sm:top-3 left-1/2 -translate-x-1/2 w-14 sm:w-20 h-4 sm:h-6 bg-black rounded-full z-10" />
                <div className="relative rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden bg-black" style={{ aspectRatio: '9/19.5' }}>
                  {/* Video with poster fallback - shows a game screenshot if autoplay fails */}
                  <video 
                    ref={videoRef} 
                    className="absolute inset-0 w-full h-full object-cover" 
                    muted 
                    playsInline 
                    loop
                    poster="/screenshots/gameplay-dissolved.jpg"
                  >
                    <source src="/hero-demo.webm" type="video/webm" />
                  </video>
                  
                  {/* Center play button when autoplay fails or video is paused */}
                  {(autoplayFailed || !isPlaying) && (
                    <button
                      onClick={togglePlayPause}
                      aria-label="Play video"
                      className="absolute inset-0 flex items-center justify-center bg-black/30 z-10 transition-opacity duration-300"
                    >
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 active:scale-95 transition-all duration-200">
                        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-black ml-1" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </button>
                  )}
                  
                  {/* Play/Pause button with 44px touch target - only show when playing */}
                  {isPlaying && (
                    <button 
                      onClick={togglePlayPause}
                      aria-label="Pause video"
                      className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 w-11 h-11 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/90 hover:bg-black/80 hover:text-white hover:scale-105 active:scale-95 transition-all duration-200 z-20"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="4" width="4" height="16" rx="1" />
                        <rect x="14" y="4" width="4" height="16" rx="1" />
                      </svg>
                    </button>
                  )}
                </div>
                <div className="absolute bottom-1.5 sm:bottom-2 left-1/2 -translate-x-1/2 w-14 sm:w-20 h-0.5 sm:h-1 bg-white/20 rounded-full" />
              </div>
              
            </div>
          </motion.div>
        </div>
      </div>
      
    </section>
  )
}

// Icon component for the animation section
const Icon = ({ path, className, ariaLabel, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} role="img" aria-label={ariaLabel || 'icon'} {...props}>{path}</svg>
)

const Icons = {
  Search: (p) => <Icon path={<><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></>} ariaLabel="Search" {...p} />,
  Share2: (p) => <Icon path={<><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" x2="15.42" y1="13.51" y2="17.49" /><line x1="15.41" x2="8.59" y1="6.51" y2="10.49" /></>} ariaLabel="Share" {...p} />,
  Globe: (p) => <Icon path={<><circle cx="12" cy="12" r="10" /><line x1="2" x2="22" y1="12" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></>} ariaLabel="Globe" {...p} />,
  ArrowRight: (p) => <Icon path={<><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></>} ariaLabel="Arrow right" {...p} />
}

// Three.js loader hook
const useThree = () => {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    if (window.THREE) { setLoaded(true); return }
    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'
    script.onload = () => setLoaded(true)
    document.body.appendChild(script)
  }, [])
  return loaded
}

// ThreeGame Component - 3D Flappy Bird demo
const ThreeGame = ({ config, isActive, shouldRender = true }) => {
  const mountRef = useRef(null)
  const threeLoaded = useThree()
  const frameId = useRef(null)

  useEffect(() => {
    if (!threeLoaded || !mountRef.current || !shouldRender) return
    const THREE = window.THREE
    const w = config.width || 500, h = config.height || 340
    const scene = new THREE.Scene()
    if (config.fogColor) scene.fog = new THREE.FogExp2(config.fogColor, config.fogDensity)
    scene.background = new THREE.Color(config.bg)
    const camera = new THREE.PerspectiveCamera(config.fov, w / h, 0.1, 100)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(w, h)
    mountRef.current.innerHTML = ''
    mountRef.current.appendChild(renderer.domElement)
    scene.add(new THREE.AmbientLight(0xffffff, 0.6))
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8)
    dirLight.position.set(10, 20, 10)
    scene.add(dirLight)
    const bird = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({ color: config.birdColor, emissive: config.birdEmissive, roughness: 0.2 }))
    scene.add(bird)
    const pipes = []
    const pipeGeo = new THREE.CylinderGeometry(1.5, 1.5, 20, 16)
    const pipeMat = new THREE.MeshStandardMaterial({ color: config.pipeColor, roughness: 0.1, metalness: 0.3 })
    if (config.showFloor) {
      const floor = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshStandardMaterial({ color: 0x222222 }))
      floor.rotation.x = -Math.PI / 2; floor.position.y = -10
      scene.add(floor)
    }
    let snowSystem
    if (config.snow) {
      const particles = new THREE.BufferGeometry()
      const positions = [], velocities = []
      for (let i = 0; i < 200; i++) { positions.push((Math.random() - 0.5) * 50, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 20); velocities.push(0.05 + Math.random() * 0.1) }
      particles.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
      snowSystem = new THREE.Points(particles, new THREE.PointsMaterial({ color: 0xFFFFFF, size: 0.3, transparent: true, opacity: 0.8 }))
      snowSystem.userData = { velocities }
      scene.add(snowSystem)
    }
    let birdY = 0, velocity = 0, time = 0
    camera.position.set(0, 0, 15)
    const animate = () => {
      frameId.current = requestAnimationFrame(animate)
      time += 0.01
      velocity -= 0.015; birdY += velocity
      if (birdY < -8) { birdY = -8; velocity = 0 }
      if (birdY > 8) { birdY = 8; velocity = 0 }
      bird.position.y = THREE.MathUtils.lerp(bird.position.y, birdY, 0.2)
      bird.rotation.z = Math.min(Math.PI / 4, Math.max(-Math.PI / 4, velocity * 3))
      if (!config.activePhysics) bird.position.y = Math.sin(time * 3)
      if (pipes.length === 0 || pipes[pipes.length - 1].x < 10) {
        const gapY = (Math.random() - 0.5) * 8
        const top = new THREE.Mesh(pipeGeo, pipeMat); top.position.set(25, gapY + 12.5, 0); scene.add(top)
        const bot = new THREE.Mesh(pipeGeo, pipeMat); bot.position.set(25, gapY - 12.5, 0); scene.add(bot)
        pipes.push({ meshTop: top, meshBot: bot, x: 25, gapY })
      }
      for (let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].x -= config.speed * 0.1
        pipes[i].meshTop.position.x = pipes[i].x
        pipes[i].meshBot.position.x = pipes[i].x
        if (pipes[i].x < -20) { scene.remove(pipes[i].meshTop); scene.remove(pipes[i].meshBot); pipes.splice(i, 1) }
      }
      if (config.activePhysics) {
        const upcoming = pipes.find(p => p.x > bird.position.x - 1)
        if (upcoming && birdY < upcoming.gapY - 1.5) velocity = 0.25
      }
      if (snowSystem) {
        const pos = snowSystem.geometry.attributes.position.array
        const vels = snowSystem.userData.velocities
        for (let i = 0; i < pos.length; i += 3) { pos[i + 1] -= vels[i / 3]; if (pos[i + 1] < -15) pos[i + 1] = 15; pos[i] -= 0.02; if (pos[i] < -25) pos[i] = 25 }
        snowSystem.geometry.attributes.position.needsUpdate = true
      }
      if (config.cinematic) {
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, bird.position.x - 2, 0.05)
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, bird.position.y * 0.5, 0.05)
        camera.lookAt(bird.position.x + 5, 0, 0)
        camera.position.z = 12 + Math.sin(time * 0.5) * 2
      } else { camera.position.set(0, 0, 18); camera.lookAt(0, 0, 0) }
      renderer.render(scene, camera)
    }
    animate()
    return () => { cancelAnimationFrame(frameId.current); if (mountRef.current) mountRef.current.innerHTML = '' }
  }, [threeLoaded, shouldRender, config])

  return (
    <div className={`relative rounded-[1.5rem] shadow-2xl overflow-hidden border border-white/10 transition-all duration-700 ${isActive ? 'opacity-100 scale-110 z-20' : 'opacity-40 scale-90 grayscale z-0'}`}
      style={{ width: config.width || 500, height: config.height || 340, backgroundColor: config.bg }}>
      <div ref={mountRef} className="w-full h-full bg-black/90" />
      {config.label && <div className="absolute top-6 left-6 z-20 max-w-[280px]"><h3 className="text-3xl font-display font-bold drop-shadow-lg" style={{ color: config.accent, fontFamily: "'Space Grotesk', sans-serif" }}>{config.label}</h3></div>}
    </div>
  )
}

// FeedScreen Component
const FeedScreen = ({ config, isActive, shouldRender }) => (
  <div className={`relative w-[400px] h-[640px] bg-[#050505] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col transition-all duration-1000 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}>
    <div className="flex items-center justify-between px-6 pt-6 pb-4 bg-black/40 backdrop-blur-md border-b border-white/5">
      <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500" /><span className="font-bold text-lg text-white">VibeBrews</span></div>
      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"><Icons.Search className="w-4 h-4 text-white/50" /></div>
    </div>
    <div className="flex-1 overflow-y-auto p-4 space-y-8 scrollbar-hide">
      <div className="space-y-3">
        <div className="flex items-center gap-2 px-1"><div className="w-5 h-5 rounded-full bg-blue-500" /><span className="text-xs font-semibold text-white/80">You</span><span className="text-[10px] text-white/40">• Just now</span></div>
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
          <div className="absolute inset-0"><ThreeGame isActive={isActive} shouldRender={shouldRender} config={{ ...config, width: 366, height: 274, label: null }} /></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4"><h3 className="text-lg font-bold text-white mb-1">Flappy Cinematic</h3><p className="text-xs text-white/60">AI generated physics & snow.</p></div>
        </div>
      </div>
    </div>
  </div>
)

// Connector Component
const Connector = ({ active, width }) => width <= 0 ? null : (
  <div className="absolute top-1/2 -translate-y-1/2 pointer-events-none" style={{ width, height: 4 }}>
    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] bg-white/5 rounded-full" />
    <div className={`absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-1000 ${active ? 'w-full opacity-100' : 'w-0 opacity-0'}`} />
  </div>
)

// PromptNode Component
const PromptNode = ({ text, active }) => (
  <div className={`relative w-[320px] bg-[#0A0A0A] border border-white/10 rounded-full p-2 pl-5 shadow-2xl transition-all duration-700 ${active ? 'opacity-100 scale-110 ring-1 ring-white/10' : 'opacity-40 scale-90 blur-sm'}`}>
    <div className="flex items-center justify-between gap-3">
      <div className="text-sm font-medium text-white/90 truncate">{text || <span className="text-white/20">Describe your game...</span>}{active && text && <span className="animate-pulse text-[#FF5C00] ml-0.5">|</span>}</div>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${text ? 'bg-white text-black' : 'bg-white/10 text-white/30'}`}><Icon path={<line x1="12" y1="19" x2="12" y2="5" />} className="w-4 h-4" /></div>
    </div>
  </div>
)

// ActionNode Component
const ActionNode = ({ active, clicked }) => (
  <div className={`relative w-[260px] bg-[#0A0A0A] border border-white/10 rounded-2xl p-1.5 shadow-2xl transition-all duration-500 ${active ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
    <button className={`w-full py-4 rounded-xl text-sm font-bold uppercase tracking-wider transition-all ${clicked ? 'bg-green-500 text-black scale-95' : 'bg-white text-black'}`}>
      <div className="flex items-center justify-center gap-2">{clicked ? <Icons.Globe className="w-4 h-4 animate-bounce" /> : <Icons.Share2 className="w-4 h-4" />}{clicked ? "Published!" : "Publish to Feed"}</div>
    </button>
  </div>
)

// Hero Animation Section - Interactive Three.js demo
const HeroAnimation = () => {
  const [step, setStep] = useState(0)
  const [typedText, setTypedText] = useState("")
  const [publishClicked, setPublishClicked] = useState(false)
  const prompts = { initial: "Can you make a flappy bird in 3d?", edit1: "Make some snow fall", edit2: "Camera should be cinematic" }
  const POS = { START: 0, V1: 800, EDIT1: 1600, V2: 2400, EDIT2: 3200, V3: 4000, EDIT3: 4800, FEED: 5600 }
  const [cameraX, setCameraX] = useState(0)
  const [zoomLevel, setZoomLevel] = useState(1)

  useEffect(() => {
    let timeout
    if (step === 0) { setZoomLevel(1.5); if (typedText.length < prompts.initial.length) timeout = setTimeout(() => setTypedText(prompts.initial.slice(0, typedText.length + 1)), 40); else timeout = setTimeout(() => { setZoomLevel(1); setStep(1); setCameraX(POS.V1); setTypedText(""); }, 800) }
    else if (step === 1) timeout = setTimeout(() => { setStep(2); setCameraX(POS.EDIT1); }, 2200)
    else if (step === 2) { setZoomLevel(1.5); if (typedText.length < prompts.edit1.length) timeout = setTimeout(() => setTypedText(prompts.edit1.slice(0, typedText.length + 1)), 40); else timeout = setTimeout(() => { setZoomLevel(1); setStep(3); setCameraX(POS.V2); setTypedText(""); }, 800) }
    else if (step === 3) timeout = setTimeout(() => { setStep(4); setCameraX(POS.EDIT2); }, 2200)
    else if (step === 4) { setZoomLevel(1.5); if (typedText.length < prompts.edit2.length) timeout = setTimeout(() => setTypedText(prompts.edit2.slice(0, typedText.length + 1)), 40); else timeout = setTimeout(() => { setZoomLevel(1); setStep(5); setCameraX(POS.V3); setTypedText(""); }, 800) }
    else if (step === 5) timeout = setTimeout(() => { setStep(6); setCameraX(POS.EDIT3); }, 3200)
    else if (step === 6) { setZoomLevel(1.3); timeout = setTimeout(() => { setPublishClicked(true); setTimeout(() => { setZoomLevel(1); setStep(7); setCameraX(POS.FEED); }, 600); }, 1500) }
    else if (step === 7) timeout = setTimeout(() => { setStep(0); setCameraX(0); setTypedText(""); setPublishClicked(false); }, 6000)
    return () => clearTimeout(timeout)
  }, [step, typedText])

  const v3Config = { label: 'Polished and ready to ship.', bg: '#2e0b29', fogColor: '#2e0b29', fogDensity: 0.04, birdColor: '#F472B6', birdEmissive: '#DB2777', pipeColor: '#F97316', accent: '#F472B6', activePhysics: true, snow: true, cinematic: true, showFloor: false, speed: 3, fov: 60 }

  return (
    <section id="demo" className="relative z-10 w-full min-h-[60vh] sm:min-h-screen overflow-hidden bg-black border-t border-white/5">
      {/* Section header */}
      <div className="absolute top-8 sm:top-12 left-0 right-0 z-40 text-center px-4 sm:px-6">
        <p className="text-[10px] sm:text-sm font-medium tracking-widest text-white/30 uppercase mb-1.5 sm:mb-2">How it works</p>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-semibold text-white/80" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Watch the magic happen</h2>
      </div>
      
      {/* Mobile: Simplified steps display */}
      <div className="sm:hidden flex flex-col items-center justify-center h-full min-h-[50vh] pt-24 pb-8 px-4">
        <motion.div 
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="flex justify-center gap-1.5 mb-6">
            {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === step ? 'bg-white scale-125' : i < step ? 'bg-white/40' : 'bg-white/15'}`}
              />
            ))}
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 max-w-xs mx-auto">
            <p className="text-sm text-white/80 font-medium mb-2">
              {step === 0 ? 'Describe your idea' : 
               step === 1 ? 'AI generates game' : 
               step === 2 ? 'Add snow effects' :
               step === 3 ? 'More refinements' :
               step === 4 ? 'Cinematic camera' :
               step === 5 ? 'Polish complete' :
               step === 6 ? 'Publish to feed' :
               'Live on feed!'}
            </p>
            <p className="text-xs text-white/40">
              {step === 0 ? '"Make a flappy bird in 3D"' : 
               step === 1 ? 'Core mechanics built' : 
               step === 2 ? '"Make some snow fall"' :
               step === 3 ? 'Winter atmosphere added' :
               step === 4 ? '"Camera should be cinematic"' :
               step === 5 ? 'Ready to ship!' :
               step === 6 ? 'Publishing...' :
               'Others can play now'}
            </p>
          </div>
        </motion.div>
      </div>
      
      {/* Desktop: Full animation */}
      <div className="hidden sm:block absolute left-1/2 h-full items-center transition-all duration-[1000ms] ease-[cubic-bezier(0.25,1,0.5,1)]" style={{ transform: `translateX(calc(-50% - ${cameraX}px)) scale(${zoomLevel})`, transformOrigin: `${cameraX}px 50%` }}>
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10" style={{ left: POS.START }}><PromptNode text={step === 0 ? typedText : prompts.initial} active={true} /></div>
        <div className="absolute top-1/2 pointer-events-none" style={{ left: POS.START + 170 }}><Connector active={step >= 1} width={POS.V1 - 260 - POS.START - 170} /></div>
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10" style={{ left: POS.V1 }}><ThreeGame isActive={step >= 1} shouldRender={step >= 1 && step <= 2} config={{ label: 'Core mechanics built.', bg: '#111', fogColor: '#111', fogDensity: 0.02, birdColor: '#888', birdEmissive: '#000', pipeColor: '#444', accent: '#666', activePhysics: true, snow: false, cinematic: false, showFloor: true, speed: 2, fov: 50 }} /></div>
        <div className="absolute top-1/2 pointer-events-none" style={{ left: POS.V1 + 260 }}><Connector active={step >= 2} width={POS.EDIT1 - 170 - POS.V1 - 260} /></div>
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10" style={{ left: POS.EDIT1 }}><PromptNode text={step === 2 ? typedText : prompts.edit1} active={step >= 2} /></div>
        <div className="absolute top-1/2 pointer-events-none" style={{ left: POS.EDIT1 + 170 }}><Connector active={step >= 3} width={POS.V2 - 260 - POS.EDIT1 - 170} /></div>
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10" style={{ left: POS.V2 }}><ThreeGame isActive={step >= 3} shouldRender={step >= 3 && step <= 4} config={{ label: "Winter atmosphere added.", bg: '#0F172A', fogColor: '#0F172A', fogDensity: 0.03, birdColor: '#38BDF8', birdEmissive: '#0EA5E9', pipeColor: '#94A3B8', accent: '#38BDF8', activePhysics: true, snow: true, cinematic: false, showFloor: false, speed: 2.5, fov: 50 }} /></div>
        <div className="absolute top-1/2 pointer-events-none" style={{ left: POS.V2 + 260 }}><Connector active={step >= 4} width={POS.EDIT2 - 170 - POS.V2 - 260} /></div>
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10" style={{ left: POS.EDIT2 }}><PromptNode text={step === 4 ? typedText : prompts.edit2} active={step >= 4} /></div>
        <div className="absolute top-1/2 pointer-events-none" style={{ left: POS.EDIT2 + 170 }}><Connector active={step >= 5} width={POS.V3 - 260 - POS.EDIT2 - 170} /></div>
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10" style={{ left: POS.V3 }}><ThreeGame isActive={step >= 5} shouldRender={step >= 5 && step <= 6} config={v3Config} /><div className={`absolute -top-10 left-1/2 -translate-x-1/2 bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-green-500/30 ${step >= 5 ? 'opacity-100' : 'opacity-0'}`}>Release Candidate</div></div>
        <div className="absolute top-1/2 pointer-events-none" style={{ left: POS.V3 + 260 }}><Connector active={step >= 6} width={POS.EDIT3 - 140 - POS.V3 - 260} /></div>
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10" style={{ left: POS.EDIT3 }}><ActionNode active={step >= 6} clicked={publishClicked} /></div>
        <div className="absolute top-1/2 pointer-events-none" style={{ left: POS.EDIT3 + 140 }}><Connector active={step >= 7} width={POS.FEED - 210 - POS.EDIT3 - 140} /></div>
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10" style={{ left: POS.FEED }}><FeedScreen isActive={step >= 7} shouldRender={step >= 7} config={v3Config} /></div>
      </div>
    </section>
  )
}

// Tools Section - Compact cards for creator tools
const ToolsSection = () => {
  const tools = [
    {
      path: '/color-palette-generator',
      title: 'Color Palette',
      description: 'Create beautiful color combinations',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="8" r="2" fill="#E57373" />
          <circle cx="8" cy="14" r="2" fill="#81C784" />
          <circle cx="16" cy="14" r="2" fill="#64B5F6" />
        </svg>
      ),
      color: '#C9A9A6',
    },
    {
      path: '/ai-token-calculator',
      title: 'Token Calculator',
      description: 'Calculate AI token costs',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v8m-2-6h4m-4 4h4" strokeLinecap="round" />
        </svg>
      ),
      color: '#10b981',
    },
    {
      path: '/ai-model-picker',
      title: 'AI Model Picker',
      description: 'Find the best AI for your task',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
          <path d="M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707" strokeLinecap="round" />
          <circle cx="12" cy="12" r="4" />
          <path d="M12 16v5m-3-3h6" strokeLinecap="round" />
        </svg>
      ),
      color: '#f59e0b',
    },
    {
      path: '/prompt-remix',
      title: 'Prompt Remix',
      description: 'Enhance your prompts with AI',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
          <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      color: '#8b5cf6',
    },
    {
      path: '/legal-doc-generator',
      title: 'Legal Docs',
      description: 'Privacy policies & Terms',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      color: '#3b82f6',
    },
    {
      path: '/vibe-cost-calculator',
      title: 'Cost Estimator',
      description: 'Estimate dev costs',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M8 8h.01M12 8h.01M16 8h.01M8 12h.01M12 12h.01M16 12h.01M8 16h4" strokeLinecap="round" />
        </svg>
      ),
      color: '#ec4899',
    },
  ]

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-black to-[#0a0a0a] relative z-20">
      <div className="max-w-5xl mx-auto">
        <Reveal className="text-center mb-8 sm:mb-12">
          <p className="text-[10px] sm:text-xs font-medium tracking-widest text-white/50 uppercase mb-2">Free Tools</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold text-white mb-2 sm:mb-3 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Creator Tools Suite
          </h2>
          <p className="text-xs sm:text-sm text-white/60 max-w-md mx-auto">Useful AI-powered tools to help you create. No signup required.</p>
        </Reveal>
        
        {/* Mobile: Horizontal scroll | Desktop: Grid */}
        <div className="relative">
          {/* Mobile scroll hint gradient */}
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none lg:hidden" />
          
          <div className="flex lg:grid lg:grid-cols-3 gap-3 sm:gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 lg:mx-0 lg:px-0">
            {tools.map((tool, i) => (
              <Reveal key={tool.path} delay={i * 0.05}>
                <Link 
                  to={tool.path}
                  className="flex-shrink-0 w-[260px] sm:w-[280px] lg:w-full group"
                >
                  <ContinuousCard
                    hoverScale={1.02}
                    tiltAmount={8}
                    className="relative h-full bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] rounded-2xl p-4 sm:p-5 transition-colors duration-300"
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div 
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center p-2 sm:p-2.5 flex-shrink-0"
                        style={{ backgroundColor: `${tool.color}15`, color: tool.color }}
                      >
                        {tool.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm sm:text-base font-semibold text-white mb-0.5 sm:mb-1 group-hover:text-white/90 transition-colors">
                          {tool.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-white/55 leading-snug line-clamp-2">
                          {tool.description}
                        </p>
                      </div>
                      <svg className="w-4 h-4 text-white/20 group-hover:text-white/40 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </ContinuousCard>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
        
        <Reveal delay={0.3} className="text-center mt-4 sm:mt-6">
          <Link 
            to="/tools"
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] rounded-full text-xs sm:text-sm font-medium text-white/80 transition-all"
          >
            View all tools
            <svg className="w-3 sm:w-3.5 h-3 sm:h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

// Game Showcase Section
const GameShowcaseSection = () => {
  const games = [
    { image: "/screenshots/gameplay-farm-tycoon.jpg", alt: "Farm Tycoon game" },
    { image: "/screenshots/gameplay-dissolved.jpg", alt: "Dissolved puzzle game" },
    { image: "/screenshots/gameplay-urban-mini.jpg", alt: "Urban Mini game" },
    { image: "/screenshots/gameplay-docking.jpg", alt: "Docking simulation game" },
    { image: "/screenshots/gameplay-demolisher.jpg", alt: "Demolisher action game" },
    { image: "/screenshots/gameplay-racer.jpg", alt: "Racing game" },
    { image: "/screenshots/gameplay-baller-maze.jpg", alt: "Baller Maze puzzle game" },
    { image: "/screenshots/gameplay-ludo-3d.jpg", alt: "3D Ludo board game" }
  ]

  return (
    <section id="showcase" className="min-h-[80vh] sm:min-h-screen py-12 sm:py-20 px-4 sm:px-6 bg-black relative z-20 overflow-hidden flex flex-col justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_70%)]" />
      
      <div className="max-w-5xl mx-auto relative w-full">
        <Reveal className="text-center mb-6 sm:mb-10 px-2">
          <p className="text-[10px] sm:text-xs font-medium tracking-widest text-white/50 uppercase mb-2">Community</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold text-white mb-2 sm:mb-3 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Made by users like you.
          </h2>
          <p className="text-xs sm:text-sm text-white/60 max-w-md mx-auto">Every game started as a single sentence. No code required.</p>
        </Reveal>
        
        {/* Mobile: Horizontal scroll | Desktop: Flex wrap */}
        <div className="relative">
          {/* Mobile scroll hint gradient */}
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none sm:hidden" />
          
          <div className="flex sm:flex-wrap sm:justify-center gap-3 pb-6 overflow-x-auto scrollbar-hide px-2 sm:px-0 -mx-4 sm:mx-0 pl-4 sm:pl-0">
            {games.map((game, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <ContinuousCard
                  hoverScale={1.05}
                  tiltAmount={12}
                  className="relative flex-shrink-0"
                  style={{ transform: `translateY(${i % 2 === 0 ? '0' : '24px'})` }}
                >
                  <div className="relative bg-[#1C1C1E] rounded-[1.75rem] sm:rounded-[2.5rem] p-[4px] sm:p-[6px] shadow-lg hover:shadow-2xl transition-shadow duration-300">
                    <div className="relative bg-black rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden">
                      <div className="relative" style={{ width: 'clamp(120px, 30vw, 160px)', height: 'clamp(240px, 60vw, 320px)' }}>
                        <ContinuousImage 
                          src={game.image} 
                          alt={game.alt}
                        />
                      </div>
                      <div className="absolute bottom-1.5 sm:bottom-2 left-1/2 -translate-x-1/2 w-12 sm:w-16 h-[2px] sm:h-[3px] bg-white/20 rounded-full" />
                    </div>
                  </div>
                </ContinuousCard>
              </Reveal>
            ))}
          </div>
        </div>
        
        <Reveal delay={0.4} className="text-center mt-2 sm:mt-0">
          <ExternalLink 
            href="https://play.google.com/store/apps/details?id=com.nextap.vibebrews&pli=1" 
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] rounded-full text-xs sm:text-sm font-medium text-white/80 transition-all"
          >
            Explore the feed
            <svg className="w-3 sm:w-3.5 h-3 sm:h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </ExternalLink>
        </Reveal>
      </div>
    </section>
  )
}

// iOS Waitlist - with Continuous UI components
const IOSWaitlist = () => {
  const [email, setEmail] = useState('')
  const [buttonState, setButtonState] = useState('idle') // idle | loading | success | error
  const [inputError, setInputError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setInputError('')
    
    if (!email || !email.includes('@')) {
      setInputError('Please enter a valid email')
      setButtonState('error')
      setTimeout(() => setButtonState('idle'), 2000)
      return
    }
    
    setButtonState('loading')
    setTimeout(() => {
      setButtonState('success')
      setEmail('')
      setTimeout(() => setButtonState('idle'), 3000)
    }, 800)
  }

  return (
    <section className="min-h-[40vh] sm:min-h-[50vh] py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-b from-[#0a0a0a] to-black relative z-20 flex items-center">
      <div className="max-w-lg mx-auto text-center w-full">
        <Reveal>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-semibold text-white mb-2 sm:mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            iOS coming soon.
          </h2>
          <p className="text-xs sm:text-sm text-white/60 mb-5 sm:mb-6">Join the waitlist to be first to know.</p>
        </Reveal>
        
        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 sm:gap-3 max-w-md mx-auto items-start">
            <div className="flex-1 w-full">
              <ContinuousInput
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (inputError) setInputError('')
                }}
                placeholder="your@email.com"
                disabled={buttonState === 'loading' || buttonState === 'success'}
                error={inputError}
                className="text-sm sm:text-base"
              />
            </div>
            <ContinuousButton
              type="submit"
              state={buttonState}
              disabled={buttonState === 'loading' || buttonState === 'success'}
              idleText="Notify me"
              successText="Joined!"
              errorText="Try again"
              className="w-full sm:w-auto text-sm sm:text-base"
            />
          </form>
          <p className="mt-4 sm:mt-6 text-[10px] sm:text-xs text-white/30">No spam. Unsubscribe anytime.</p>
        </Reveal>
      </div>
    </section>
  )
}

// Feed Section - with Continuous UI image loading
const FeedSection = () => (
  <section className="min-h-[70vh] sm:min-h-screen py-12 sm:py-16 px-4 sm:px-6 bg-[#0a0a0a] relative z-20 overflow-hidden flex items-center">
    <div className="max-w-5xl mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <Reveal className="space-y-3 sm:space-y-4 text-center lg:text-left order-2 lg:order-1">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Discover. Play. Share.
          </h2>
          <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm md:text-base text-white/60 leading-relaxed">
            <p>Every game lives in a scrollable feed. Find something interesting, tap to play — no downloads needed.</p>
            <p>Your games go to the same feed. Others can discover, play, and share them instantly.</p>
          </div>
        </Reveal>
        <Reveal delay={0.2} className="flex justify-center lg:justify-end order-1 lg:order-2">
          <ContinuousCard
            hoverScale={1.03}
            tiltAmount={10}
            className="relative w-[180px] sm:w-[220px] md:w-[240px] bg-[#1C1C1E] rounded-[2rem] sm:rounded-[2.5rem] p-1.5 sm:p-2 border border-white/10 shadow-xl"
          >
            <div className="absolute top-3 sm:top-4 left-1/2 -translate-x-1/2 w-14 sm:w-20 h-4 sm:h-6 bg-black rounded-full z-10" />
            <div className="relative rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden bg-black">
              <ContinuousImage 
                src="/screenshots/gameplay-dissolved.jpg" 
                alt="Game being played in the VibeBrews feed"
                className="w-full h-auto" 
              />
            </div>
            <div className="absolute bottom-1.5 sm:bottom-2 left-1/2 -translate-x-1/2 w-14 sm:w-20 h-0.5 sm:h-1 bg-white/20 rounded-full" />
          </ContinuousCard>
        </Reveal>
      </div>
    </div>
  </section>
)

// P2P Section - Reduced animation cycle for better engagement
const P2PSection = () => {
  const [step, setStep] = useState(0)
  const prefersReducedMotion = useReducedMotion()
  
  useEffect(() => {
    // Reduced from 21s total to 14s for better engagement
    const STEP_DURATIONS = [2500, 2500, 2500, 2500, 4000]
    const timeout = setTimeout(() => {
      setStep(prev => (prev + 1) % 5)
    }, prefersReducedMotion ? STEP_DURATIONS[step] * 0.5 : STEP_DURATIONS[step])
    return () => clearTimeout(timeout)
  }, [step, prefersReducedMotion])
  
  const isConnected = step >= 4
  
  const tutorialSteps = [
    { title: "So here's the thing", body: "Both of you need to download the app first. It's on iOS and Android. Takes like 30 seconds.", detail: "No web version for multiplayer - the app handles all the peer-to-peer stuff under the hood." },
    { title: "Open the app", body: "You'll see two things: a TikTok-style feed of games people made, and a gallery you can browse.", detail: "Find something fun. There's puzzle games, racing, card games - all created by other users." },
    { title: "Pick a game", body: "Let's say you find one made by @2player. Tap it. You're now the host.", detail: "The app generates a 6-digit code automatically. That's your room." },
    { title: "Share the code", body: "Just tell your friend the code. Text it, say it out loud, whatever.", detail: "They open the same game from the feed or gallery, tap 'Join', enter the code." },
    { title: "You're connected", body: "That's it. Direct connection between your phones. No server in the middle.", detail: "Latency is usually 8-15ms on the same wifi. Works across the internet too." }
  ]
  
  const current = tutorialSteps[step]
  
  return (
    <section className="min-h-[80vh] sm:min-h-screen py-12 sm:py-20 px-4 sm:px-6 bg-black relative z-20 flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 items-center">
          {/* Text content - Order changes on mobile */}
          <Reveal className="space-y-3 sm:space-y-4 order-2 lg:order-1 text-center lg:text-left">
            <div className="flex gap-1 sm:gap-1.5 justify-center lg:justify-start">
              {[0, 1, 2, 3, 4].map(i => (
                <motion.div
                  key={i}
                  animate={{ width: i === step ? 20 : 5 }}
                  className={`h-0.5 rounded-full transition-all duration-500 ${i === step ? 'bg-white' : 'bg-white/20'}`}
                />
              ))}
            </div>
            <motion.h2
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white leading-[1.1] tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {current.title}
            </motion.h2>
            <motion.p
              key={`body-${step}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm sm:text-lg md:text-xl text-white/70 leading-relaxed font-light"
            >
              {current.body}
            </motion.p>
            <motion.p
              key={`detail-${step}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs sm:text-sm text-white/40 leading-relaxed"
            >
              {current.detail}
            </motion.p>
            {isConnected && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4 sm:gap-6 pt-2 justify-center lg:justify-start"
              >
                <div><div className="text-lg sm:text-xl font-semibold text-[#30D158]">12ms</div><div className="text-[10px] sm:text-xs text-white/40">Latency</div></div>
                <div><div className="text-lg sm:text-xl font-semibold text-white">P2P</div><div className="text-[10px] sm:text-xs text-white/40">Connection</div></div>
                <div><div className="text-lg sm:text-xl font-semibold text-white">0</div><div className="text-[10px] sm:text-xs text-white/40">Servers</div></div>
              </motion.div>
            )}
          </Reveal>
          
          {/* Phone animation */}
          <div className="relative h-[280px] sm:h-[350px] flex items-center justify-center order-1 lg:order-2">
            {/* Connection line */}
            {step >= 3 && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <svg width="80" height="20" className="overflow-visible sm:w-[110px]">
                  <line
                    x1="0" y1="10" x2="80" y2="10"
                    stroke={isConnected ? "rgba(48,209,88,0.4)" : "rgba(255,255,255,0.1)"}
                    strokeWidth="1.5"
                    strokeDasharray={isConnected ? "0" : "6 3"}
                    className="transition-all duration-1000 sm:x2-[110]"
                  />
                </svg>
              </div>
            )}
            
            {/* Phones - Smaller on mobile */}
            {['Your phone', "Friend's phone"].map((label, idx) => (
              <motion.div
                key={label}
                animate={{
                  x: step < 2 ? (idx === 0 ? -70 : 70) : step < 4 ? (idx === 0 ? -55 : 55) : (idx === 0 ? -40 : 40)
                }}
                transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                className="absolute top-1/2 left-1/2 flex flex-col items-center -translate-x-1/2 -translate-y-1/2"
              >
                <div className={`relative w-[90px] sm:w-[120px] h-[180px] sm:h-[240px] bg-[#1C1C1E] rounded-[1.25rem] sm:rounded-[1.5rem] border overflow-hidden transition-all duration-700 ${isConnected ? 'border-[#30D158]/50 shadow-[0_0_40px_rgba(48,209,88,0.15)]' : 'border-white/[0.1] shadow-xl'}`}>
                  <div className="absolute top-1.5 sm:top-2 left-1/2 -translate-x-1/2 w-9 sm:w-12 h-3 sm:h-4 bg-black rounded-full" />
                  <div className="absolute inset-2 sm:inset-3 top-6 sm:top-8 rounded-lg sm:rounded-xl bg-black/40 flex flex-col items-center justify-center p-1.5 sm:p-2">
                    {step === 1 && (
                      <div className="w-full space-y-1 sm:space-y-1.5">
                        <div className="text-[5px] sm:text-[6px] text-white/40 uppercase tracking-wider">Feed</div>
                        <div className="w-full h-7 sm:h-10 bg-white/5 rounded" />
                        <div className="w-full h-7 sm:h-10 bg-white/5 rounded" />
                        <div className="w-full h-7 sm:h-10 bg-white/5 rounded" />
                      </div>
                    )}
                    {step >= 2 && step < 4 && idx === 0 && (
                      <div className="text-center space-y-1 sm:space-y-2">
                        <div className="text-[6px] sm:text-[8px] text-white/40 uppercase tracking-wider">Room Code</div>
                        <div className="text-base sm:text-xl font-bold text-white tracking-[0.15em] sm:tracking-[0.2em] font-mono">829-104</div>
                        <div className="text-[6px] sm:text-[8px] text-white/30">Share with friend</div>
                      </div>
                    )}
                    {isConnected && (
                      <div className="text-center space-y-0.5 sm:space-y-1">
                        <div className="w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-[#30D158]/20 flex items-center justify-center mx-auto">
                          <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#30D158]" />
                        </div>
                        <div className="text-[10px] sm:text-xs font-medium text-white/90">Connected</div>
                        <div className="text-[6px] sm:text-[8px] text-white/30">12ms ping</div>
                      </div>
                    )}
                    {!isConnected && step >= 2 && step < 4 && idx === 1 && (
                      <div className="text-center space-y-0.5 sm:space-y-1">
                        <div className="text-[10px] sm:text-xs font-medium text-white/60">{label}</div>
                        <div className="text-[6px] sm:text-[8px] text-white/25">Waiting...</div>
                      </div>
                    )}
                    {step < 2 && (
                      <div className="text-center space-y-0.5 sm:space-y-1">
                        <div className="text-[10px] sm:text-xs font-medium text-white/60">{label}</div>
                        <div className="text-[6px] sm:text-[8px] text-white/25">Waiting...</div>
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-1 sm:bottom-1.5 left-1/2 -translate-x-1/2 w-10 sm:w-14 h-0.5 bg-white/20 rounded-full" />
                </div>
                <div className="mt-1.5 sm:mt-2 text-center">
                  <div className="text-[10px] sm:text-xs font-medium text-white/60">{label}</div>
                  {isConnected && <div className="text-[7px] sm:text-[9px] text-white/30">WebRTC P2P</div>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// CTA Section
const CTASection = () => (
  <section className="min-h-[50vh] sm:min-h-[60vh] py-12 sm:py-20 px-4 sm:px-6 bg-black relative z-20 overflow-hidden flex items-center justify-center">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_60%)]" />
    
    <div className="max-w-2xl mx-auto relative text-center">
      <Reveal>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-white leading-[1.1] tracking-tight mb-4 sm:mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Start creating.
        </h2>
        <p className="text-sm sm:text-base text-white/60 mb-6 sm:mb-8">Free on Android. Your first game is 2 minutes away.</p>
        
        <ExternalLink 
          href="https://play.google.com/store/apps/details?id=com.nextap.vibebrews&pli=1" 
          className="group inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-white text-black font-semibold text-xs sm:text-sm rounded-full hover:bg-white/90 transition-all"
        >
          <svg className="w-4 sm:w-5 h-4 sm:h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
          </svg>
          Get it on Google Play
          <svg className="w-3.5 sm:w-4 h-3.5 sm:h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </ExternalLink>
      </Reveal>
    </div>
  </section>
)

// Footer
const Footer = () => (
  <footer className="py-12 sm:py-20 border-t border-white/5 bg-black relative z-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      {/* Mobile: Stack everything | Desktop: Row layout */}
      <div className="flex flex-col gap-8 sm:gap-10 mb-8 sm:mb-12">
        {/* Logo & Download - Row on all screens */}
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 sm:gap-3">
            <img 
              src="https://play-lh.googleusercontent.com/lOGaWbwoVmJcBKAatXi0TFhY-XcZEPhat-f1sI6WRo2pd7uOq-kBv6f7t8N2GEljlPQwMxbpDWOt-XPzToP5fpE=w480-h960-rw" 
              alt="" 
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg shadow-lg" 
            />
            <span className="font-display font-bold text-lg sm:text-xl" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>VibeBrews</span>
          </Link>
          
          <ExternalLink 
            href="https://play.google.com/store/apps/details?id=com.nextap.vibebrews&pli=1" 
            className="bg-white text-black text-xs sm:text-sm font-semibold px-4 sm:px-6 py-2 sm:py-2.5 rounded-full hover:bg-gray-200 transition-colors"
          >
            Download App
          </ExternalLink>
        </div>
        
        {/* Navigation Links - Horizontal scroll on mobile */}
        <nav className="flex gap-4 sm:gap-6 md:gap-8 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center text-xs sm:text-sm text-white/50">
          <Link to="/tools" className="hover:text-white transition-colors whitespace-nowrap flex-shrink-0">Creator Tools</Link>
          <Link to="/how-to-make-a-game-without-coding" className="hover:text-white transition-colors whitespace-nowrap flex-shrink-0">How to Make Games</Link>
          <Link to="/our-vision" className="hover:text-white transition-colors whitespace-nowrap flex-shrink-0">Our Vision</Link>
          <Link to="/productive-things-to-do-on-phone" className="hover:text-white transition-colors whitespace-nowrap flex-shrink-0">Productive Play</Link>
        </nav>
      </div>
      
      {/* Bottom bar */}
      <div className="border-t border-white/5 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-white/40 text-xs sm:text-sm order-2 sm:order-1">© 2026 VibeBrews. All rights reserved.</div>
        <div className="flex items-center gap-2 text-white/40 text-xs sm:text-sm order-1 sm:order-2">
          <span>A product by</span>
          <ExternalLink href="https://www.linkedin.com/company/nextap-ai/" className="flex items-center gap-1.5 sm:gap-2 hover:text-white transition-colors">
            <img 
              src="https://media.licdn.com/dms/image/v2/C4D0BAQHQtpdwrTZmHg/company-logo_100_100/company-logo_100_100/0/1634746976872?e=1770854400&v=beta&t=0befFxIWgatWxkCsIcePbvdnSB2t5dinEwnBsmfqeDg" 
              alt="" 
              className="w-5 h-5 sm:w-6 sm:h-6 rounded" 
            />
            <span className="font-medium">Nextap AI</span>
          </ExternalLink>
        </div>
      </div>
    </div>
  </footer>
)

// Main Home Component
export default function Home() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-[#050505] text-white selection:bg-[#FF5C00]/30">
        <HeroSection />
        <HeroAnimation />
        <ToolsSection />
        <GameShowcaseSection />
        <FeedSection />
        <P2PSection />
        <IOSWaitlist />
        <CTASection />
        <Footer />
      </div>
    </PageTransition>
  )
}
