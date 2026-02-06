import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import ExternalLink from '../components/ExternalLink'
import { Link } from 'react-router-dom'
import useSEO from '../hooks/useSEO'

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

// Cinematic Section with Parallax
const CinematicSection = ({ image, label, title }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-50px', '50px'])

  return (
    <Reveal className="relative w-full h-[70vh] min-h-[500px] max-h-[800px] overflow-hidden my-20">
      <div ref={ref} className="absolute inset-0">
        <motion.div
          style={{ y }}
          className="absolute inset-[-50px] bg-cover bg-center bg-no-repeat scale-110"
          initial={{ scale: 1.1 }}
        >
          <img src={image} alt="" className="w-full h-full object-cover" />
        </motion.div>
        
        {/* Vignette effects */}
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.3)_70%,rgba(0,0,0,0.6)_100%)]" />
        <div className="absolute inset-0 z-[2]">
          <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-black via-black/80 to-transparent" />
          <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-black/90 via-black/40 to-transparent" />
        </div>
        <div className="absolute inset-0 z-[3] bg-gradient-to-r from-black/70 via-transparent to-black/70" style={{ backgroundSize: '20% 100%, 20% 100%', backgroundPosition: 'left, right', backgroundRepeat: 'no-repeat' }} />
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-[60px] z-10 text-center">
          <p className="text-[11px] font-semibold text-white/50 uppercase tracking-[0.15em] mb-3">{label}</p>
          <h3 className="text-2xl md:text-4xl font-semibold text-white/95 tracking-[-0.02em] leading-tight max-w-[500px] mx-auto" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
            {title}
          </h3>
        </div>
      </div>
    </Reveal>
  )
}

// Framed Cinematic
const CinematicFramed = ({ image, label, title }) => (
  <Reveal className="my-20 max-w-[1000px] mx-auto px-6">
    <motion.div 
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.6 }}
      className="relative rounded-[32px] overflow-hidden bg-black shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_25px_80px_-20px_rgba(0,0,0,0.8)]"
    >
      {/* Gradient border */}
      <div className="absolute inset-0 rounded-[32px] p-px bg-gradient-to-br from-white/20 via-white/5 to-white/[0.02] pointer-events-none z-20" style={{ WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor' }} />
      
      <div className="relative aspect-video overflow-hidden">
        <motion.img 
          src={image} 
          alt="" 
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      
      {/* Shadows */}
      <div className="absolute inset-0 pointer-events-none z-10 rounded-[32px] shadow-[inset_0_80px_80px_-40px_rgba(0,0,0,0.6),inset_0_-80px_80px_-40px_rgba(0,0,0,0.8)]" />
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-10 z-[15] text-center bg-gradient-to-t from-black/90 to-transparent rounded-b-[32px]">
        <p className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.2em] mb-2">{label}</p>
        <p className="text-lg font-medium text-white/90 tracking-[-0.01em]">{title}</p>
      </div>
    </motion.div>
  </Reveal>
)

// Principle Card
const Principle = ({ icon, title, text, delay = 0 }) => (
  <Reveal delay={delay}>
    <motion.div
      whileHover={{ y: -4, backgroundColor: 'rgba(17,17,17,1)' }}
      transition={{ duration: 0.4 }}
      className="p-8 bg-[#0a0a0a] border border-white/[0.08] rounded-2xl"
    >
      <div className="w-12 h-12 mb-5 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-[19px] font-semibold text-white/95 mb-2.5 tracking-[-0.01em]">{title}</h3>
      <p className="text-[15px] text-white/56 leading-relaxed m-0">{text}</p>
    </motion.div>
  </Reveal>
)

// Timeline Item
const TimelineItem = ({ icon, title, text }) => (
  <div className="flex gap-8 py-8 relative">
    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-black border border-white/[0.08] rounded-full relative z-[1]">
      {icon}
    </div>
    <div>
      <h4 className="text-[17px] font-semibold text-white/95 mb-2">{title}</h4>
      <p className="text-[15px] text-white/56 leading-relaxed m-0">{text}</p>
    </div>
  </div>
)

export default function OurVision() {
  useSEO({
    title: 'Our Vision - Making Game Creation Universal | VibeBrews',
    description: 'VibeBrews believes everyone should be able to create games. Our vision is to democratize game development through AI, making creation as easy as conversation.',
    keywords: 'vibebrews vision, ai game creation, democratize game development, future of game making, game creation for everyone',
    canonical: 'https://vibebrews.com/our-vision',
  })

  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-white/56">
        {/* Hero */}
        <section className="min-h-[85vh] flex items-center justify-center relative overflow-hidden border-b border-white/[0.08]">
          {/* Animated Background Orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{ 
                x: [0, 30, 0, -20, 0],
                y: [0, -30, 0, 20, 0],
                scale: [1, 1.05, 1, 0.95, 1]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-[600px] h-[600px] rounded-full blur-[80px] opacity-[0.08] bg-gradient-to-br from-white to-[#666] -top-[200px] -right-[100px]"
            />
            <motion.div
              animate={{ 
                x: [0, -20, 0, 30, 0],
                y: [0, 20, 0, -30, 0],
                scale: [1, 0.95, 1, 1.05, 1]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: -5 }}
              className="absolute w-[400px] h-[400px] rounded-full blur-[80px] opacity-[0.08] bg-gradient-to-br from-[#888] to-white -bottom-[100px] -left-[100px]"
            />
          </div>
          
          <div className="text-center relative z-[2] py-20 px-6">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[11px] font-semibold text-white/32 uppercase tracking-[0.12em] mb-6"
            >
              Our Vision
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white/95 leading-[1.05] tracking-[-0.04em] mb-7"
            >
              Everyone has a game<br />inside them.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-2xl font-normal text-white/56 leading-relaxed tracking-[-0.01em] max-w-[560px] mx-auto"
            >
              We're building the shortest path from imagination to reality. No gatekeepers. No learning curves. Just pure creation.
            </motion.p>
          </div>
        </section>

        {/* Article */}
        <article className="py-20 pb-32">
          <div className="max-w-[700px] mx-auto px-6">
            <Reveal>
              <p className="text-xl leading-relaxed text-white/95 mb-12 tracking-[-0.01em]">
                Somewhere right now, a kid has an idea for a game. It's vivid in their mind—the characters, the mechanics, the feeling of playing it. But between that idea and a playable reality stands years of learning, thousands of dollars in software, and the brutal economics of game development.
              </p>
            </Reveal>
            
            <Reveal delay={0.1}>
              <p className="mb-6">We started VibeBrews because we believe that's fundamentally broken.</p>
            </Reveal>
            
            <Reveal delay={0.15}>
              <p className="mb-6">Games are humanity's newest art form. They combine storytelling, visual art, music, and interactivity into experiences that no other medium can match. But unlike writing, painting, or making music, creating games has required specialized technical knowledge that most people will never have the time or resources to acquire.</p>
            </Reveal>
            
            <Reveal delay={0.2}>
              <p className="mb-6"><strong className="text-white/95 font-semibold">Until now.</strong></p>
            </Reveal>
          </div>
          
          {/* Cinematic Section 1 */}
          <CinematicSection 
            image="/assets/vision-imagination.png"
            label="The spark"
            title="Every game begins as a thought floating in the void"
          />
          
          <div className="max-w-[700px] mx-auto px-6">
            <Reveal>
              <h2 className="text-[28px] font-semibold text-white/95 leading-tight tracking-[-0.02em] mt-20 mb-6">
                The moment everything changed
              </h2>
            </Reveal>
            
            <Reveal delay={0.1}>
              <p className="mb-6">In 2025, AI reached a tipping point. Language models became capable of understanding not just words, but intent. They could interpret "make a game where I'm a cat knocking things off a table" and translate that into working code, physics, 3D models, and game logic.</p>
            </Reveal>
            
            <Reveal delay={0.15}>
              <p className="mb-6">We realized this wasn't just a technical advancement. It was a <Link to="/how-to-make-a-game-without-coding" className="text-white/95 underline decoration-white/32 underline-offset-[3px] hover:decoration-white/95 transition-colors">democratization of creative power</Link> that happens maybe once a generation.</p>
            </Reveal>
            
            <Reveal delay={0.2}>
              <p className="mb-6">Photography didn't kill painting—it liberated it. Word processors didn't diminish writing—they amplified it. AI won't replace game developers. It will create millions of new ones.</p>
            </Reveal>
          </div>
          
          {/* Animated Illustration */}
          <div className="max-w-[900px] mx-auto px-6 my-16">
            <Reveal>
              <svg viewBox="0 0 480 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                {/* Brain/Idea */}
                <g className="animate-pulse">
                  <circle cx="60" cy="100" r="40" fill="url(#grad1)" opacity="0.1"/>
                  <circle cx="60" cy="100" r="25" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
                  <path d="M50 95 Q55 85 60 95 Q65 85 70 95" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none"/>
                  <circle cx="55" cy="105" r="2" fill="rgba(255,255,255,0.3)"/>
                  <circle cx="65" cy="105" r="2" fill="rgba(255,255,255,0.3)"/>
                </g>
                
                {/* Connecting Flow */}
                <path d="M100 100 C150 100 150 100 180 100" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="4 4"/>
                <path d="M300 100 C350 100 350 100 380 100" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="4 4"/>
                
                {/* AI Processing */}
                <g className="animate-pulse" style={{ animationDelay: '-1s' }}>
                  <rect x="180" y="60" width="120" height="80" rx="12" fill="url(#grad2)" opacity="0.08"/>
                  <rect x="180" y="60" width="120" height="80" rx="12" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
                  <text x="240" y="105" fill="rgba(255,255,255,0.5)" fontSize="12" textAnchor="middle" fontFamily="monospace">AI</text>
                  {/* Neural network dots */}
                  <circle cx="200" cy="80" r="3" fill="rgba(255,255,255,0.2)"/>
                  <circle cx="220" cy="90" r="3" fill="rgba(255,255,255,0.25)"/>
                  <circle cx="240" cy="80" r="3" fill="rgba(255,255,255,0.2)"/>
                  <circle cx="260" cy="90" r="3" fill="rgba(255,255,255,0.25)"/>
                  <circle cx="280" cy="80" r="3" fill="rgba(255,255,255,0.2)"/>
                  <circle cx="200" cy="120" r="3" fill="rgba(255,255,255,0.2)"/>
                  <circle cx="220" cy="110" r="3" fill="rgba(255,255,255,0.25)"/>
                  <circle cx="260" cy="110" r="3" fill="rgba(255,255,255,0.25)"/>
                  <circle cx="280" cy="120" r="3" fill="rgba(255,255,255,0.2)"/>
                </g>
                
                {/* Game Output */}
                <g className="animate-pulse" style={{ animationDelay: '-2s' }}>
                  <rect x="380" y="65" width="80" height="70" rx="8" fill="url(#grad3)" opacity="0.1"/>
                  <rect x="380" y="65" width="80" height="70" rx="8" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
                  {/* Game screen elements */}
                  <rect x="390" y="75" width="60" height="35" rx="4" fill="rgba(255,255,255,0.05)"/>
                  <circle cx="420" cy="92" r="8" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none"/>
                  <polygon points="418,89 418,95 423,92" fill="rgba(255,255,255,0.3)"/>
                  <rect x="390" y="115" width="30" height="10" rx="5" fill="rgba(255,255,255,0.15)"/>
                </g>
                
                {/* Labels */}
                <text x="60" y="160" fill="rgba(255,255,255,0.3)" fontSize="10" textAnchor="middle" letterSpacing="0.1em">IDEA</text>
                <text x="240" y="160" fill="rgba(255,255,255,0.3)" fontSize="10" textAnchor="middle" letterSpacing="0.1em">PROCESS</text>
                <text x="420" y="160" fill="rgba(255,255,255,0.3)" fontSize="10" textAnchor="middle" letterSpacing="0.1em">GAME</text>
                
                <defs>
                  <radialGradient id="grad1" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#fff"/>
                    <stop offset="100%" stopColor="#333"/>
                  </radialGradient>
                  <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fff"/>
                    <stop offset="100%" stopColor="#555"/>
                  </linearGradient>
                  <radialGradient id="grad3" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#fff"/>
                    <stop offset="100%" stopColor="#444"/>
                  </radialGradient>
                </defs>
              </svg>
            </Reveal>
          </div>
          
          <div className="max-w-[700px] mx-auto px-6">
            <Reveal>
              <h2 className="text-[28px] font-semibold text-white/95 leading-tight tracking-[-0.02em] mt-20 mb-6">
                Three beliefs that guide us
              </h2>
            </Reveal>
          </div>
          
          {/* Principles */}
          <div className="max-w-[900px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
              <Principle
                delay={0.1}
                icon={
                  <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
                    <circle cx="24" cy="24" r="20" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
                    <path d="M24 12 L24 24 L32 28" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" fill="none"/>
                    <circle cx="24" cy="24" r="3" fill="rgba(255,255,255,0.4)"/>
                  </svg>
                }
                title="Speed is everything"
                text="The time between having an idea and seeing it work should be measured in seconds, not months. Every minute of waiting is creative energy lost."
              />
              
              <Principle
                delay={0.2}
                icon={
                  <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
                    <circle cx="16" cy="20" r="6" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
                    <circle cx="32" cy="20" r="6" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
                    <circle cx="24" cy="32" r="6" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
                    <line x1="20" y1="23" x2="28" y2="23" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
                    <line x1="18" y1="25" x2="21" y2="29" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
                    <line x1="30" y1="25" x2="27" y2="29" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
                  </svg>
                }
                title="Connection over isolation"
                text="Games are meant to be shared. Multiplayer shouldn't be a feature you add later—it should be built into the foundation of every creation."
              />
              
              <Principle
                delay={0.3}
                icon={
                  <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
                    <rect x="12" y="12" width="24" height="24" rx="4" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
                    <path d="M20 24 L22 26 L28 20" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  </svg>
                }
                title="Complexity is the enemy"
                text="If something requires a tutorial, we've failed. The best tools disappear. You shouldn't feel like you're using software—you should feel like you're creating."
              />
            </div>
          </div>
          
          {/* Cinematic Framed */}
          <CinematicFramed
            image="/assets/vision-connection.png"
            label="Connection"
            title="Games bring people together"
          />
          
          <div className="max-w-[700px] mx-auto px-6">
            <Reveal>
              <h2 className="text-[28px] font-semibold text-white/95 leading-tight tracking-[-0.02em] mt-20 mb-6">
                What we're actually building
              </h2>
            </Reveal>
            
            <Reveal delay={0.1}>
              <p className="mb-6">VibeBrews isn't just an app. It's infrastructure for a new kind of creative ecosystem.</p>
            </Reveal>
            
            {/* Timeline */}
            <div className="my-16 relative">
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-white/[0.08] to-transparent" />
              
              <TimelineItem
                icon={
                  <svg className="w-5 h-5 text-white/32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19 14.5M14.25 3.104c.251.023.501.05.75.082M5 14.5l-.94 2.06a1.5 1.5 0 001.14 2.065l1.8.24M19 14.5l.94 2.06a1.5 1.5 0 01-1.14 2.065l-1.8.24"/>
                  </svg>
                }
                title="The Creation Engine"
                text="AI that understands game design at a fundamental level—not just syntax, but intent. It knows what makes a game feel good, what creates tension, what produces joy."
              />
              
              <TimelineItem
                icon={
                  <svg className="w-5 h-5 text-white/32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"/>
                  </svg>
                }
                title="Peer-to-Peer Infrastructure"
                text="Direct connections between players, anywhere in the world. No servers to maintain. No monthly fees. Just two phones talking to each other at the speed of light."
              />
              
              <TimelineItem
                icon={
                  <svg className="w-5 h-5 text-white/32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/>
                  </svg>
                }
                title="A Community of Creators"
                text="Every game created joins a living feed. Discover what others are imagining. Remix ideas. Build on top of each other's work. A collective imagination made playable."
              />
            </div>
            
            {/* Quote Block */}
            <Reveal>
              <div className="my-16 p-12 bg-[#0a0a0a] rounded-[20px] border border-white/[0.08] text-center relative">
                <span className="absolute top-6 left-12 text-7xl font-semibold text-white/10 leading-none">"</span>
                <p className="text-2xl font-medium text-white/95 leading-relaxed tracking-[-0.02em] mb-4 relative z-[1]">
                  The best way to predict the future is to invent it.
                </p>
                <p className="text-sm text-white/32">— Alan Kay</p>
              </div>
            </Reveal>
          </div>
          
          {/* Cinematic Section 2 */}
          <CinematicSection 
            image="/assets/vision-simplicity.png"
            label="Emergence"
            title="From a single line, worlds unfold"
          />
          
          <div className="max-w-[700px] mx-auto px-6">
            <Reveal>
              <h2 className="text-[28px] font-semibold text-white/95 leading-tight tracking-[-0.02em] mt-20 mb-6">
                The future we're working toward
              </h2>
            </Reveal>
            
            <Reveal delay={0.1}>
              <p className="mb-6">Imagine a world where:</p>
            </Reveal>
            
            <Reveal delay={0.15}>
              <p className="mb-6">A teacher creates a custom educational game for their classroom in 5 minutes. A parent makes a personalized adventure starring their child as the hero. Two friends invent a game during lunch and play it that same afternoon. A professional designer rapidly prototypes 50 concepts before breakfast.</p>
            </Reveal>
            
            <Reveal delay={0.2}>
              <p className="mb-6">This isn't science fiction. Every piece of this technology exists today. We're just connecting the dots.</p>
            </Reveal>
            
            <Reveal delay={0.25}>
              <p className="mb-6">The game industry generates over $200 billion annually. But more importantly, games have become the primary way the next generation experiences stories, learns skills, and connects with friends. The ability to create games shouldn't be concentrated in the hands of a few thousand professionals in a few cities.</p>
            </Reveal>
            
            <Reveal delay={0.3}>
              <p className="mb-12"><strong className="text-white/95 font-semibold">It should belong to everyone.</strong></p>
            </Reveal>
            
            <Reveal>
              <h2 className="text-[28px] font-semibold text-white/95 leading-tight tracking-[-0.02em] mt-20 mb-6">
                Join us
              </h2>
            </Reveal>
            
            <Reveal delay={0.1}>
              <p className="mb-6">We're at the beginning of something significant. The tools are ready. The technology works. Now we need creators—people with ideas worth building, stories worth telling, experiences worth sharing.</p>
            </Reveal>
            
            <Reveal delay={0.15}>
              <p className="mb-6">You don't need permission. You don't need a degree. You don't need to know what a game engine is.</p>
            </Reveal>
            
            <Reveal delay={0.2}>
              <p className="mb-6">You just need an idea.</p>
            </Reveal>
            
            <Reveal delay={0.25}>
              <p className="mb-12">And now, for the first time in history, that's enough.</p>
            </Reveal>
            
            {/* Related Links */}
            <Reveal>
              <div className="mt-20 pt-12 border-t border-white/[0.08]">
                <h3 className="text-sm font-semibold text-white/32 uppercase tracking-[0.06em] mb-6">Continue exploring</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link 
                    to="/"
                    className="group flex items-center gap-4 p-5 bg-[#0a0a0a] border border-white/[0.08] rounded-xl hover:bg-[#111] hover:translate-x-2 transition-all duration-300"
                  >
                    <svg className="w-6 h-6 text-white/32 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
                    </svg>
                    <div className="flex-1">
                      <div className="text-[15px] font-medium text-white/95 mb-0.5">Home</div>
                      <div className="text-[13px] text-white/32">See VibeBrews in action</div>
                    </div>
                    <svg className="w-4 h-4 text-white/32 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                    </svg>
                  </Link>
                  
                  <Link 
                    to="/how-to-make-a-game-without-coding"
                    className="group flex items-center gap-4 p-5 bg-[#0a0a0a] border border-white/[0.08] rounded-xl hover:bg-[#111] hover:translate-x-2 transition-all duration-300"
                  >
                    <svg className="w-6 h-6 text-white/32 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/>
                    </svg>
                    <div className="flex-1">
                      <div className="text-[15px] font-medium text-white/95 mb-0.5">How to Make Games</div>
                      <div className="text-[13px] text-white/32">Start creating in 5 minutes</div>
                    </div>
                    <svg className="w-4 h-4 text-white/32 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                    </svg>
                  </Link>
                </div>
              </div>
            </Reveal>
            
            {/* CTA */}
            <Reveal>
              <div className="mt-20 p-16 text-center bg-[#0a0a0a] rounded-3xl border border-white/[0.08] relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_50%)] pointer-events-none" />
                <h2 className="text-[32px] font-semibold text-white/95 tracking-[-0.02em] mb-3 relative">Ready to create?</h2>
                <p className="text-[17px] text-white/56 mb-8 relative">Your first game is five minutes away.</p>
                <ExternalLink 
                  href="https://play.google.com/store/apps/details?id=com.nextap.vibebrews"
                  className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-black text-[15px] font-medium rounded-full hover:opacity-90 active:scale-[0.98] transition-all relative"
                >
                  <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  Download for Android
                </ExternalLink>
              </div>
            </Reveal>
          </div>
        </article>
        
        {/* Footer */}
        <footer className="py-12 border-t border-white/[0.04]">
          <div className="max-w-[980px] mx-auto px-6 flex flex-col items-center gap-6">
            <div className="flex flex-wrap justify-center gap-8 text-[13px] text-white/32">
              <Link to="/" className="hover:text-white/56 transition-colors">Home</Link>
              <Link to="/how-to-make-a-game-without-coding" className="hover:text-white/56 transition-colors">How to Make Games</Link>
              <Link to="/our-vision" className="hover:text-white/56 transition-colors">Our Vision</Link>
              <Link to="/productive-things-to-do-on-phone" className="hover:text-white/56 transition-colors">Productive Play</Link>
              <Link to="/why-i-stopped-learning-unity" className="hover:text-white/56 transition-colors">Why I Quit Unity</Link>
              <span className="hover:text-white/56 transition-colors cursor-pointer">Privacy</span>
              <span className="hover:text-white/56 transition-colors cursor-pointer">Terms</span>
            </div>
            <div className="text-xs text-white/32">
              © 2026 VibeBrews. A product by{' '}
              <ExternalLink href="https://www.linkedin.com/company/nextap-ai/" className="underline hover:text-white/56 transition-colors">
                Nextap AI
              </ExternalLink>
            </div>
          </div>
        </footer>
      </div>
    </PageTransition>
  )
}
