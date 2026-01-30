import { useRef, useEffect, useState, useMemo } from 'react'
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import ExternalLink from '../components/ExternalLink'

// Reveal animation wrapper
const Reveal = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Three.js Cinematic Scene Component
const CinematicScene = () => {
  const containerRef = useRef(null)
  const [threeLoaded, setThreeLoaded] = useState(false)
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 })
  
  useEffect(() => {
    if (window.THREE) { setThreeLoaded(true); return }
    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'
    script.onload = () => setThreeLoaded(true)
    document.body.appendChild(script)
  }, [])

  useEffect(() => {
    if (!threeLoaded || !containerRef.current) return
    
    const THREE = window.THREE
    const container = containerRef.current
    const w = window.innerWidth
    const h = window.innerHeight
    
    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x050508)
    scene.fog = new THREE.FogExp2(0x050508, 0.015)
    
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000)
    camera.position.set(0, 0, 30)
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.innerHTML = ''
    container.appendChild(renderer.domElement)
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.15)
    scene.add(ambientLight)
    
    const pointLight = new THREE.PointLight(0xD4A574, 1.5, 100)
    pointLight.position.set(10, 10, 20)
    scene.add(pointLight)
    
    const pointLight2 = new THREE.PointLight(0x6B8DD6, 0.8, 80)
    pointLight2.position.set(-15, -5, 15)
    scene.add(pointLight2)
    
    // Create floating geometric particles (representing AI/data)
    const particleGeometry = new THREE.BufferGeometry()
    const particleCount = 800
    const positions = new Float32Array(particleCount * 3)
    const velocities = []
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100
      velocities.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02
      })
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.15,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending
    })
    const particles = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particles)
    
    // Create floating wireframe cubes (AI systems)
    const cubes = []
    for (let i = 0; i < 15; i++) {
      const size = 1 + Math.random() * 3
      const geometry = new THREE.BoxGeometry(size, size, size)
      const edges = new THREE.EdgesGeometry(geometry)
      const material = new THREE.LineBasicMaterial({ 
        color: i % 3 === 0 ? 0xD4A574 : i % 3 === 1 ? 0x6B8DD6 : 0x888888,
        transparent: true,
        opacity: 0.3 + Math.random() * 0.3
      })
      const cube = new THREE.LineSegments(edges, material)
      cube.position.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40 - 20
      )
      cube.userData = {
        rotationSpeed: { x: (Math.random() - 0.5) * 0.01, y: (Math.random() - 0.5) * 0.01 },
        floatSpeed: 0.5 + Math.random() * 0.5,
        floatOffset: Math.random() * Math.PI * 2,
        originalY: cube.position.y
      }
      cubes.push(cube)
      scene.add(cube)
    }
    
    // Create connection lines between cubes
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: 0xffffff, 
      transparent: true, 
      opacity: 0.05 
    })
    const lines = []
    for (let i = 0; i < cubes.length - 1; i++) {
      const points = [cubes[i].position, cubes[i + 1].position]
      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const line = new THREE.Line(geometry, lineMaterial)
      lines.push(line)
      scene.add(line)
    }
    
    // Animation variables
    let scrollValue = 0
    let time = 0
    
    const unsubscribe = smoothProgress.on('change', (v) => {
      scrollValue = v
    })
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      time += 0.01
      
      // Camera movement based on scroll
      const targetZ = 30 - scrollValue * 50
      const targetY = scrollValue * 15
      const targetRotationX = scrollValue * 0.3
      
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05)
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05)
      camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, -targetRotationX, 0.05)
      
      // Animate particles
      const pos = particles.geometry.attributes.position.array
      for (let i = 0; i < particleCount; i++) {
        pos[i * 3] += velocities[i].x
        pos[i * 3 + 1] += velocities[i].y
        pos[i * 3 + 2] += velocities[i].z
        
        // Wrap around
        if (pos[i * 3] > 50) pos[i * 3] = -50
        if (pos[i * 3] < -50) pos[i * 3] = 50
        if (pos[i * 3 + 1] > 50) pos[i * 3 + 1] = -50
        if (pos[i * 3 + 1] < -50) pos[i * 3 + 1] = 50
        if (pos[i * 3 + 2] > 50) pos[i * 3 + 2] = -50
        if (pos[i * 3 + 2] < -50) pos[i * 3 + 2] = 50
      }
      particles.geometry.attributes.position.needsUpdate = true
      
      // Animate cubes
      cubes.forEach(cube => {
        cube.rotation.x += cube.userData.rotationSpeed.x
        cube.rotation.y += cube.userData.rotationSpeed.y
        cube.position.y = cube.userData.originalY + Math.sin(time * cube.userData.floatSpeed + cube.userData.floatOffset) * 1.5
      })
      
      // Update light positions
      pointLight.position.x = Math.sin(time * 0.5) * 20
      pointLight.position.y = Math.cos(time * 0.3) * 15
      
      renderer.render(scene, camera)
    }
    
    animate()
    
    // Handle resize
    const handleResize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
      unsubscribe()
      container.innerHTML = ''
    }
  }, [threeLoaded, smoothProgress])
  
  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  )
}

// Cinematic Image Section with Parallax
const CinematicSection = ({ image, quote, attribution }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-30px', '30px'])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3])

  return (
    <motion.section 
      ref={ref}
      style={{ opacity }}
      className="relative h-[70vh] min-h-[500px] max-h-[800px] flex items-center justify-center overflow-hidden my-20"
    >
      <motion.div
        style={{ y }}
        className="absolute inset-[-30px]"
      >
        <img 
          src={image} 
          alt="" 
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#050508]/70 via-[#050508]/50 to-[#050508]/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050508]/60 via-transparent to-[#050508]/60" />
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <p className="text-xl md:text-3xl lg:text-4xl font-medium text-white/95 leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          "{quote}"
        </p>
        {attribution && (
          <p className="mt-6 text-sm text-white/40">{attribution}</p>
        )}
      </div>
    </motion.section>
  )
}

// Stat Block Component
const StatBlock = ({ number, label, sublabel, color = 'amber' }) => {
  const colorClasses = {
    amber: 'text-amber-400 from-amber-500/10 to-orange-500/5 border-amber-500/20',
    blue: 'text-blue-400 from-blue-500/10 to-cyan-500/5 border-blue-500/20',
    red: 'text-red-400 from-red-500/10 to-rose-500/5 border-red-500/20',
    green: 'text-green-400 from-green-500/10 to-emerald-500/5 border-green-500/20'
  }
  
  return (
    <Reveal>
      <div className={`my-10 p-8 flex flex-col md:flex-row items-center gap-6 bg-gradient-to-r ${colorClasses[color]} border rounded-2xl`}>
        <div className={`text-5xl md:text-6xl font-bold ${colorClasses[color].split(' ')[0]}`} style={{ textShadow: '0 0 40px currentColor' }}>
          {number}
        </div>
        <div>
          <p className="text-white/90 font-medium text-lg mb-1">{label}</p>
          <p className="text-sm text-white/50">{sublabel}</p>
        </div>
      </div>
    </Reveal>
  )
}

export default function TheAIRace() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-[#050508] text-white/60 relative">
        {/* Three.js Background */}
        <CinematicScene />
        
        {/* Content Overlay */}
        <div className="relative z-10">
          {/* Hero */}
          <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0">
              <img 
                src="/assets/ai-overwhelm-hero.png" 
                alt="" 
                className="w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#050508]/60 via-[#050508]/40 to-[#050508]" />
            </div>
            
            <div className="text-center relative z-10 px-6 py-20 max-w-4xl mx-auto">
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="font-mono text-xs text-amber-400/80 uppercase tracking-[0.2em] mb-6"
              >
                Opinion / January 27, 2026
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl md:text-5xl lg:text-6xl font-bold text-white/95 leading-[1.08] tracking-[-0.03em] mb-8"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Everyone's Racing Against AI.<br />
                <span className="text-amber-400/90">I Found a Better Game.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed mb-10"
              >
                I spent 18 months trying to outrun the machine. Three certifications. Two bootcamps. Endless nights grinding. Then I realised I'd been playing the wrong game entirely.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center justify-center gap-5 text-sm text-white/40"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-semibold text-sm">JM</div>
                  <div className="text-left">
                    <p className="text-white/70">By James Mitchell</p>
                    <p className="text-xs">Tech Correspondent, Brisbane</p>
                  </div>
                </div>
                <span className="text-white/20">|</span>
                <span>11 min read</span>
              </motion.div>
            </div>
            
            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-white/20"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7" />
                </svg>
              </motion.div>
            </motion.div>
          </section>

          {/* Article Content */}
          <article className="py-20 px-6">
            <div className="max-w-[700px] mx-auto">
              <Reveal>
                <p className="text-xl text-white/90 leading-relaxed mb-8">
                  Let me tell you about the most exhausting 18 months of my life.
                </p>
              </Reveal>
              
              <Reveal delay={0.1}>
                <p className="mb-6 text-lg leading-relaxed">It started in mid-2024. I was covering the tech beat for a regional outlet — decent gig, nothing special. Then ChatGPT started writing articles. Midjourney started making images. GitHub Copilot started writing code better than half the developers I knew.</p>
              </Reveal>
              
              <Reveal delay={0.15}>
                <p className="mb-6 text-lg leading-relaxed">And everywhere I looked, the same advice: <strong className="text-white/90">upskill or die</strong>.</p>
              </Reveal>
              
              <Reveal delay={0.2}>
                <p className="mb-6 text-lg leading-relaxed">"Learn prompt engineering." "Get certified in AI tools." "Become indispensable." The courses. The bootcamps. The YouTube gurus selling survival guides for the AI apocalypse.</p>
              </Reveal>
              
              <Reveal delay={0.25}>
                <p className="mb-12 text-lg leading-relaxed">So I did what everyone told me to do. I raced.</p>
              </Reveal>

              <Reveal>
                <h2 className="text-2xl md:text-3xl font-semibold text-white/95 tracking-[-0.02em] mt-16 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  The Hamster Wheel From Hell
                </h2>
              </Reveal>
              
              <Reveal delay={0.1}>
                <p className="mb-6 text-lg leading-relaxed">Here's what my calendar looked like for 18 months:</p>
              </Reveal>
              
              <Reveal delay={0.15}>
                <ul className="space-y-3 mb-8 text-lg">
                  <li className="flex gap-3 items-start">
                    <span className="text-amber-400 mt-1.5">•</span>
                    <span>5:30 AM: Online course modules before work</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="text-amber-400 mt-1.5">•</span>
                    <span>9-5: Actual job (while secretly terrified I'd be replaced)</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="text-amber-400 mt-1.5">•</span>
                    <span>7-10 PM: Building "portfolio projects" no one would see</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="text-amber-400 mt-1.5">•</span>
                    <span>Weekends: More courses. Always more courses.</span>
                  </li>
                </ul>
              </Reveal>
              
              <Reveal delay={0.2}>
                <p className="mb-6 text-lg leading-relaxed">I got three certifications. Google AI. AWS Machine Learning. Some prompt engineering credential that cost $400 and taught me nothing I couldn't have learned from a Reddit thread.</p>
              </Reveal>
              
              <Reveal delay={0.25}>
                <p className="mb-6 text-lg leading-relaxed">And you know what happened?</p>
              </Reveal>
              
              <Reveal delay={0.3}>
                <p className="mb-6 text-lg leading-relaxed"><strong className="text-white/90">AI got better. Again.</strong> Every skill I'd just acquired was suddenly table stakes. The goalposts moved. They always move.</p>
              </Reveal>
            </div>

            {/* Diagram: The Race You Can't Win */}
            <div className="max-w-[900px] mx-auto px-6 my-16">
              <Reveal>
                <img 
                  src="/assets/ai-race-diagram.png" 
                  alt="The race you can't win - showing humans on a treadmill while AI progress bars fill" 
                  className="w-full rounded-2xl border border-white/10"
                  loading="lazy"
                />
                <p className="text-center text-sm text-white/40 mt-4 italic">
                  Fig 1. The hamster wheel of competitive upskilling. No matter how fast you run, the wheel spins faster.
                </p>
              </Reveal>
            </div>

            <div className="max-w-[700px] mx-auto">
              <StatBlock 
                number="$12,400"
                label="What I spent on courses, certifications, and tools in 18 months"
                sublabel="That's a nice holiday. That's six months of rent. That's money I'll never get back racing a machine that doesn't sleep."
                color="red"
              />
              
              <Reveal>
                <p className="mb-6 text-lg leading-relaxed">Meanwhile, my actual life was disintegrating. I missed my niece's first birthday. I hadn't seen my mates in months. My girlfriend started calling me "the ghost who pays half the rent."</p>
              </Reveal>
              
              <Reveal delay={0.1}>
                <p className="mb-12 text-lg leading-relaxed">I was technically "keeping up." But with what? For what? I was winning at a game that had no finish line.</p>
              </Reveal>
              
              <Reveal>
                <h2 className="text-2xl md:text-3xl font-semibold text-white/95 tracking-[-0.02em] mt-16 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  The Conversation That Changed Everything
                </h2>
              </Reveal>
              
              <Reveal delay={0.1}>
                <p className="mb-6 text-lg leading-relaxed">December 2025. I'm at my cousin's place in Gold Coast, four beers deep, venting about how Claude 4 just passed some legal exam and now even lawyers are cooked.</p>
              </Reveal>
              
              <Reveal delay={0.15}>
                <p className="mb-6 text-lg leading-relaxed">My cousin's 16-year-old walks in. She's got her phone out, grinning like an idiot.</p>
              </Reveal>
              
              <Reveal delay={0.2}>
                <p className="mb-6 text-lg leading-relaxed">"Uncle James, look what I made today."</p>
              </Reveal>
              
              <Reveal delay={0.25}>
                <p className="mb-6 text-lg leading-relaxed">She shows me her phone. It's a game. A proper 3D puzzle game where you're guiding light through prisms. It's beautiful. It works. She made it in her lunch break.</p>
              </Reveal>
              
              <Reveal delay={0.3}>
                <p className="mb-6 text-lg leading-relaxed">"How long did that take you to code?" I ask, already feeling old.</p>
              </Reveal>
              
              <Reveal delay={0.35}>
                <p className="mb-6 text-lg leading-relaxed">She laughs. "Code? I didn't code anything. I just described what I wanted and it built it."</p>
              </Reveal>
              
              {/* Quote Block */}
              <Reveal delay={0.4}>
                <div className="my-12 p-8 border-l-4 border-amber-500 bg-gradient-to-r from-amber-500/10 to-orange-500/5 rounded-r-2xl">
                  <p className="text-xl md:text-2xl font-medium text-white/90 leading-relaxed mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    "You're trying to become the machine. Why don't you just use it?"
                  </p>
                  <p className="text-sm text-white/40">— My 16-year-old cousin, casually destroying my worldview</p>
                </div>
              </Reveal>
              
              <Reveal delay={0.45}>
                <p className="mb-6 text-lg leading-relaxed">I sat there, holding my VB, feeling like the world's biggest idiot.</p>
              </Reveal>
              
              <Reveal delay={0.5}>
                <p className="mb-6 text-lg leading-relaxed">I'd spent 18 months trying to <em className="text-amber-400">compete</em> with AI. She'd spent 20 minutes <em className="text-amber-400">collaborating</em> with it. And she had something to show for it. Something real. Something she made.</p>
              </Reveal>
              
              <Reveal delay={0.55}>
                <p className="mb-12 text-lg leading-relaxed">I had certifications. She had creations.</p>
              </Reveal>
            </div>
          </article>

          {/* Cinematic Break: Compete vs Create */}
          <CinematicSection 
            image="/assets/ai-compete-vs-create.png"
            quote="Two paths. Same technology. Completely different outcomes."
          />

          <article className="py-20 px-6">
            <div className="max-w-[700px] mx-auto">
              <Reveal>
                <h2 className="text-2xl md:text-3xl font-semibold text-white/95 tracking-[-0.02em] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  The Uncomfortable Truth About 2026
                </h2>
              </Reveal>
              
              <Reveal delay={0.1}>
                <p className="mb-6 text-lg leading-relaxed">Here's what nobody's saying out loud: <strong className="text-white/90">you cannot out-skill AI</strong>. Not in the long run. Maybe not even in the medium run.</p>
              </Reveal>
              
              <Reveal delay={0.15}>
                <p className="mb-6 text-lg leading-relaxed">Every skill that can be defined, can be automated. Every process that can be described, can be replicated. The more "technical" you get, the more replaceable you become.</p>
              </Reveal>
              
              <Reveal delay={0.2}>
                <p className="mb-6 text-lg leading-relaxed">I'm not saying this to scare you. I'm saying it because the sooner you accept it, the sooner you can stop running and start <em className="text-amber-400">leveraging</em>.</p>
              </Reveal>
              
              {/* Insight Box */}
              <Reveal delay={0.25}>
                <div className="my-10 p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/5 border border-blue-500/20 rounded-xl">
                  <p className="font-mono text-xs uppercase tracking-wider text-blue-400 mb-3">The Shift</p>
                  <p className="text-white/90 text-lg">The question isn't "how do I stay ahead of AI?" — it's "how do I use AI to do things I couldn't do before?"</p>
                </div>
              </Reveal>
              
              <Reveal delay={0.3}>
                <p className="mb-6 text-lg leading-relaxed">Think about it. What separated my cousin from me wasn't technical skill. She had zero coding knowledge. What she had was:</p>
              </Reveal>
              
              <Reveal delay={0.35}>
                <ul className="space-y-3 mb-8 text-lg">
                  <li className="flex gap-3 items-start">
                    <span className="text-green-400 mt-1.5">✓</span>
                    <span><strong className="text-white/90">An idea</strong> (a puzzle game about light)</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="text-green-400 mt-1.5">✓</span>
                    <span><strong className="text-white/90">The ability to describe it</strong> (natural language, not code)</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="text-green-400 mt-1.5">✓</span>
                    <span><strong className="text-white/90">Tools that translated description into creation</strong> (AI doing the heavy lifting)</span>
                  </li>
                </ul>
              </Reveal>
              
              <Reveal delay={0.4}>
                <p className="mb-12 text-lg leading-relaxed">That's it. That's the new stack. Ideas + Language + AI Tools = Creation. <Link to="/the-death-of-coding" className="text-amber-400 underline decoration-amber-400/30 underline-offset-4 hover:decoration-amber-400 transition-colors">Technical skill is being abstracted away</Link>.</p>
              </Reveal>
            </div>

            {/* Leverage Diagram */}
            <div className="max-w-[900px] mx-auto px-6 my-16">
              <Reveal>
                <img 
                  src="/assets/ai-leverage-diagram.png" 
                  alt="The Leverage Model - AI as a fulcrum amplifying human creativity" 
                  className="w-full rounded-2xl border border-white/10"
                  loading="lazy"
                />
                <p className="text-center text-sm text-white/40 mt-4 italic">
                  Fig 2. AI as leverage, not competition. You bring the direction. It brings the muscle.
                </p>
              </Reveal>
            </div>

            <div className="max-w-[700px] mx-auto">
              <Reveal>
                <h2 className="text-2xl md:text-3xl font-semibold text-white/95 tracking-[-0.02em] mt-16 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  What I Did Next (And What Changed)
                </h2>
              </Reveal>
              
              <Reveal delay={0.1}>
                <p className="mb-6 text-lg leading-relaxed">I cancelled my course subscriptions. All of them. $400/month back in my pocket.</p>
              </Reveal>
              
              <Reveal delay={0.15}>
                <p className="mb-6 text-lg leading-relaxed">Instead, I started asking a different question every morning: <strong className="text-white/90">"What do I want to create today?"</strong></p>
              </Reveal>
              
              <Reveal delay={0.2}>
                <p className="mb-6 text-lg leading-relaxed">Not "what skill do I need to acquire." Not "what certification looks good." Just: what do I want to make?</p>
              </Reveal>
              
              <Reveal delay={0.25}>
                <p className="mb-6 text-lg leading-relaxed">First week: I made a little game based on a dream I'd had. Took maybe 20 minutes to describe what I wanted. Played it with my nephew that afternoon.</p>
              </Reveal>
              
              <Reveal delay={0.3}>
                <p className="mb-6 text-lg leading-relaxed">Second week: I made an interactive explainer for a story I was working on. Embedded it in my article. Editor loved it. Readers engaged with it for 4x longer than normal text.</p>
              </Reveal>
              
              <Reveal delay={0.35}>
                <p className="mb-6 text-lg leading-relaxed">Third week: I started <Link to="/productive-things-to-do-on-phone" className="text-amber-400 underline decoration-amber-400/30 underline-offset-4 hover:decoration-amber-400 transition-colors">treating my phone differently</Link>. Instead of doom-scrolling at night, I'd open a creation app and make something stupid. A game about my cat. A weird art piece. A <Link to="/the-3am-scroll" className="text-amber-400 underline decoration-amber-400/30 underline-offset-4 hover:decoration-amber-400 transition-colors">3AM creation</Link> instead of a 3AM scroll.</p>
              </Reveal>
              
              <StatBlock 
                number="23"
                label="Things I've created in the past two months"
                sublabel="Games, interactive stories, prototypes, experiments. Most are terrible. Some are genuinely good. All of them are mine."
                color="green"
              />
              
              <Reveal delay={0.4}>
                <p className="mb-6 text-lg leading-relaxed">The anxiety hasn't completely disappeared. I still read the headlines. I still see AI getting more capable every month. But something fundamental has shifted.</p>
              </Reveal>
              
              <Reveal delay={0.45}>
                <p className="mb-12 text-lg leading-relaxed">I'm not racing against the machine anymore. I'm riding it.</p>
              </Reveal>
            </div>
          </article>

          {/* Cinematic Break: Dawn Creator */}
          <CinematicSection 
            image="/assets/ai-creator-dawn.png"
            quote="Same technology that scared me is now my creative superpower."
          />

          <article className="py-20 px-6">
            <div className="max-w-[700px] mx-auto">
              <Reveal>
                <h2 className="text-2xl md:text-3xl font-semibold text-white/95 tracking-[-0.02em] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  The 2026-2028 Reality Check
                </h2>
              </Reveal>
              
              <Reveal delay={0.1}>
                <p className="mb-6 text-lg leading-relaxed">Let me be clear: I'm not saying "stop learning." Learning is good. Curiosity is essential.</p>
              </Reveal>
              
              <Reveal delay={0.15}>
                <p className="mb-6 text-lg leading-relaxed">What I'm saying is: <strong className="text-white/90">stop learning to compete</strong>. Start learning to <em className="text-amber-400">create</em>.</p>
              </Reveal>
              
              <Reveal delay={0.2}>
                <p className="mb-6 text-lg leading-relaxed">The next two years are going to be wild. AI will get better at code. It'll get better at images. It'll get better at analysis, research, writing, design, music — everything.</p>
              </Reveal>
              
              <Reveal delay={0.25}>
                <p className="mb-6 text-lg leading-relaxed">And every single one of those capabilities becomes a superpower you can wield.</p>
              </Reveal>
            </div>

            {/* Timeline Diagram */}
            <div className="max-w-[1000px] mx-auto px-6 my-16">
              <Reveal>
                <img 
                  src="/assets/ai-timeline-hope.png" 
                  alt="2024-2028 AI timeline showing the shift from fear to creative opportunity" 
                  className="w-full rounded-2xl border border-white/10"
                  loading="lazy"
                />
                <p className="text-center text-sm text-white/40 mt-4 italic">
                  Fig 3. Every AI capability is a new tool in your creative arsenal. The question is: what will you build?
                </p>
              </Reveal>
            </div>

            <div className="max-w-[700px] mx-auto">
              <Reveal>
                <p className="mb-6 text-lg leading-relaxed">The people who will thrive aren't the ones with the most certifications. They're the ones who ask the most interesting questions. Who have ideas worth building. Who see AI as a collaborator, not a competitor.</p>
              </Reveal>
              
              <Reveal delay={0.1}>
                <p className="mb-6 text-lg leading-relaxed">My cousin's generation already gets this instinctively. They don't think about "learning to code" — they think about "making cool stuff." The tools are invisible. The creation is the point.</p>
              </Reveal>
              
              <Reveal delay={0.15}>
                <p className="mb-6 text-lg leading-relaxed">Maybe the rest of us need to catch up.</p>
              </Reveal>

              <Reveal>
                <h2 className="text-2xl md:text-3xl font-semibold text-white/95 tracking-[-0.02em] mt-16 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  The Better Game
                </h2>
              </Reveal>
              
              <Reveal delay={0.1}>
                <p className="mb-6 text-lg leading-relaxed">I still read the AI news. I still follow the developments. But it doesn't make me anxious anymore.</p>
              </Reveal>
              
              <Reveal delay={0.15}>
                <p className="mb-6 text-lg leading-relaxed">Every headline that used to trigger panic — "AI can now do X" — now triggers a different response: "Cool, what can I create with that?"</p>
              </Reveal>
              
              <Reveal delay={0.2}>
                <p className="mb-6 text-lg leading-relaxed">That's the better game. That's the one worth playing.</p>
              </Reveal>
              
              <Reveal delay={0.25}>
                <p className="mb-6 text-lg leading-relaxed">You can keep racing against the machine. You can keep grinding certifications, chasing goalposts that never stop moving, burning out trying to stay "relevant."</p>
              </Reveal>
              
              <Reveal delay={0.3}>
                <p className="mb-6 text-lg leading-relaxed">Or you can stop running. Turn around. And start creating.</p>
              </Reveal>
              
              <Reveal delay={0.35}>
                <p className="mb-12 text-lg leading-relaxed">The machine isn't going to slow down for you. But maybe — just maybe — it can carry you somewhere interesting. <Link to="/our-vision" className="text-amber-400 underline decoration-amber-400/30 underline-offset-4 hover:decoration-amber-400 transition-colors">If you let it</Link>.</p>
              </Reveal>

              {/* CTA */}
              <Reveal>
                <div className="mt-16 py-16 text-center">
                  <h2 className="text-2xl md:text-4xl font-bold text-white/95 tracking-[-0.02em] mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Stop Racing.<br />Start Creating.
                  </h2>
                  <p className="text-white/50 mb-10 max-w-md mx-auto">
                    The next thing you create could take 5 minutes. No code. No courses. Just you and an idea.
                  </p>
                  <ExternalLink
                    href="https://play.google.com/store/apps/details?id=com.nextap.vibebrews"
                    className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold rounded-full hover:scale-105 transition-transform shadow-[0_20px_60px_rgba(212,165,116,0.25)]"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                    </svg>
                    Make Your First Thing
                  </ExternalLink>
                  <p className="mt-4 text-sm text-white/30">(Free. Takes 2 minutes. No certification required.)</p>
                </div>
              </Reveal>

              {/* Related Articles */}
              <Reveal>
                <div className="mt-16 pt-12 border-t border-white/[0.06]">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-white/30 mb-8 text-center">Keep Reading</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Link to="/the-death-of-coding" className="group p-6 bg-white/[0.02] border border-white/[0.06] rounded-xl hover:bg-white/[0.04] transition-colors">
                      <h4 className="text-base font-medium text-white/90 mb-2 group-hover:text-amber-400 transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>The Death of Coding</h4>
                      <p className="text-sm text-white/40">I made my son learn Python. Then I apologised.</p>
                    </Link>
                    <Link to="/the-3am-scroll" className="group p-6 bg-white/[0.02] border border-white/[0.06] rounded-xl hover:bg-white/[0.04] transition-colors">
                      <h4 className="text-base font-medium text-white/90 mb-2 group-hover:text-amber-400 transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>The 3AM Scroll</h4>
                      <p className="text-sm text-white/40">What if you created instead of consumed?</p>
                    </Link>
                    <Link to="/our-vision" className="group p-6 bg-white/[0.02] border border-white/[0.06] rounded-xl hover:bg-white/[0.04] transition-colors">
                      <h4 className="text-base font-medium text-white/90 mb-2 group-hover:text-amber-400 transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Our Vision</h4>
                      <p className="text-sm text-white/40">Everyone has a game inside them.</p>
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>
          </article>

          {/* Footer */}
          <footer className="py-12 border-t border-white/[0.04] relative z-10">
            <div className="max-w-4xl mx-auto px-6 flex flex-col items-center gap-6">
              <nav className="flex flex-wrap justify-center gap-8 text-sm text-white/40">
                <Link to="/" className="hover:text-white/70 transition-colors">Home</Link>
                <Link to="/how-to-make-a-game-without-coding" className="hover:text-white/70 transition-colors">How to Make Games</Link>
                <Link to="/our-vision" className="hover:text-white/70 transition-colors">Our Vision</Link>
                <Link to="/productive-things-to-do-on-phone" className="hover:text-white/70 transition-colors">Productive Play</Link>
                <Link to="/the-death-of-coding" className="hover:text-white/70 transition-colors">Death of Coding</Link>
              </nav>
              <p className="text-xs text-white/30">© 2026 VibeBrews. A product by <ExternalLink href="https://www.linkedin.com/company/nextap-ai/" className="underline hover:text-white/50 transition-colors">Nextap AI</ExternalLink></p>
            </div>
          </footer>
        </div>
      </div>
    </PageTransition>
  )
}
