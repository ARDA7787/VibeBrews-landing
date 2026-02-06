import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import ExternalLink from '../components/ExternalLink'
import useSEO from '../hooks/useSEO'

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

// Cinematic section with parallax background
const CinematicSection = ({ image, quote, children }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3])

  return (
    <section ref={ref} className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
      <motion.div 
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{ 
          backgroundImage: `url('${image}')`,
          y
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      <motion.div 
        className="relative z-10 text-center px-6 max-w-3xl"
        style={{ opacity }}
      >
        {quote && (
          <h2 className="text-2xl md:text-4xl font-semibold text-white/95 leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {quote}
          </h2>
        )}
        {children}
      </motion.div>
    </section>
  )
}

// Floating image with hover effects
const FloatingImage = ({ src, alt, caption }) => {
  return (
    <Reveal>
      <motion.div 
        className="my-10 relative group"
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.4 }}
      >
        <div className="relative overflow-hidden rounded-xl border border-white/10">
          <motion.img 
            src={src} 
            alt={alt} 
            loading="lazy" 
            className="w-full transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        {caption && (
          <p className="text-center text-sm text-white/40 mt-3 italic">{caption}</p>
        )}
      </motion.div>
    </Reveal>
  )
}

const steps = [
  { number: 1, title: "Download the app", description: "VibeBrews is free on Android. Install takes about 30 seconds." },
  { number: 2, title: "Describe your game", description: 'Open the app and type what you want to create. Be as specific or as vague as you like.', code: '"Make a 3D maze game where you\'re a ball trying to escape"' },
  { number: 3, title: "Wait for generation", description: "The AI processes your description and builds the game. This typically takes 30 to 90 seconds depending on complexity." },
  { number: 4, title: "Refine with follow-up prompts", description: "Want changes? Tell the AI what to adjust.", code: '"Make the ball faster and add glowing walls"' },
  { number: 5, title: "Share and play multiplayer", description: "Publish to the community feed. Friends can join using a 6-digit room code. Multiplayer works automatically with no additional setup." },
]

const ideas = [
  { category: "Casual", text: '"Flappy bird but underwater with a submarine"' },
  { category: "Puzzle", text: '"2048 but with emoji instead of numbers"' },
  { category: "Racing", text: '"Top-down racing on a kitchen table with toy cars"' },
  { category: "Board Game", text: '"3D ludo with a space theme and asteroid obstacles"' },
  { category: "Action", text: '"Brick breaker with power-ups and neon graphics"' },
  { category: "Multiplayer", text: '"2-player tank battle in a destructible arena"' },
  { category: "Simulation", text: '"City builder where you place buildings and watch traffic"' },
  { category: "Sports", text: '"Basketball free throw game with realistic physics"' },
  { category: "Horror", text: '"Dark maze game where something is chasing you"' },
  { category: "Card Game", text: '"Memory match game with animal cards"' },
]

const faqs = [
  { q: "Can I really make a game without coding?", a: "Yes. You describe what you want in plain English. The AI handles all programming, physics, rendering, and game logic." },
  { q: "How long does it actually take?", a: "Simple games generate in 30-60 seconds. Complex games with multiple features take 2-5 minutes." },
  { q: "What kinds of games can I make?", a: "Almost anything: platformers, puzzles, racing, board games, shooters, simulations, card games. If you can describe it, the AI can build it." },
  { q: "Can I play with friends?", a: "Yes. Every game has built-in peer-to-peer multiplayer. Share a 6-digit code and friends join instantly." },
  { q: "Is it free?", a: "Yes. VibeBrews is free on Android with no hidden paywalls for basic features." },
  { q: "What about iOS?", a: "Coming soon. Join the waitlist on the homepage to get notified." },
]

// Reading progress bar
const ReadingProgress = () => {
  const { scrollYProgress } = useScroll()
  const width = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  
  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 h-[2px] bg-white/30 z-50 origin-left"
      style={{ width, marginLeft: '260px' }}
    />
  )
}

export default function HowToMake() {
  useSEO({
    title: 'How to Make a Game Without Coding - Complete 2026 Guide | VibeBrews',
    description: 'Build your first game without writing a single line of code. A complete guide covering AI game generators, no-code tools, and the fastest path from idea to playable game.',
    keywords: 'how to make a game, game without coding, no code game maker, ai game generator, beginner game development, make a game for free',
    canonical: 'https://vibebrews.com/how-to-make-a-game-without-coding',
  })

  return (
    <PageTransition>
      <ReadingProgress />
      <div className="min-h-screen bg-black text-white/60">
        {/* Header with animated background */}
        <header className="pt-20 pb-12 px-6 border-b border-white/[0.04] relative overflow-hidden">
          {/* Animated gradient orbs */}
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              x: [0, 30, 0],
              opacity: [0.04, 0.08, 0.04]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gradient-to-br from-white/30 to-gray-500/20 blur-3xl"
          />
          <motion.div
            animate={{ 
              scale: [1.1, 1, 1.1],
              x: [0, -20, 0],
              opacity: [0.06, 0.03, 0.06]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-gradient-to-tr from-white/20 to-gray-600/10 blur-3xl"
          />
          
          <div className="max-w-[700px] mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-xs font-medium text-white/30 uppercase tracking-[0.06em] mb-6"
            >
              Guide
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white/95 leading-[1.1] tracking-[-0.03em] mb-5"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              How to Make a Game Without Coding
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-white/50"
            >
              Create your first playable game in under five minutes. No programming experience required.
            </motion.p>
          </div>
        </header>

        {/* Article */}
        <article className="py-16 px-6">
          <div className="max-w-[700px] mx-auto">
            {/* Quick Start Summary */}
            <Reveal>
              <div className="p-8 bg-white/[0.02] border border-white/[0.06] rounded-2xl mb-12">
                <div className="text-[10px] font-semibold text-white/30 uppercase tracking-[0.08em] mb-4">Quick Start</div>
                <h2 className="text-lg font-semibold text-white/95 mb-5">Three steps to your first game</h2>
                <ol className="space-y-3">
                  <li className="flex gap-4 text-sm">
                    <span className="text-white/30 font-medium">1.</span>
                    <span><strong className="text-white/90">Download VibeBrews</strong> — free on Android</span>
                  </li>
                  <li className="flex gap-4 text-sm">
                    <span className="text-white/30 font-medium">2.</span>
                    <span><strong className="text-white/90">Describe your game</strong> — "Make a 3D racing game with neon cars"</span>
                  </li>
                  <li className="flex gap-4 text-sm">
                    <span className="text-white/30 font-medium">3.</span>
                    <span><strong className="text-white/90">Play and share</strong> — your game generates in under a minute</span>
                  </li>
                </ol>
                <p className="mt-6 text-xs text-white/40">Everything below explains the details and what else you can create.</p>
              </div>
            </Reveal>

            {/* Why Traditional Path Fails */}
            <Reveal>
              <h2 className="text-2xl font-semibold text-white/95 tracking-[-0.02em] mt-16 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                The traditional path doesn't work for most people
              </h2>
            </Reveal>
            
            <Reveal delay={0.1}>
              <p className="mb-6">Learning game development the conventional way requires months of investment. You need to learn a programming language, understand a game engine like Unity or Unreal, study game design principles, and create or acquire assets.</p>
            </Reveal>

            {/* Learning Curve Image */}
            <FloatingImage 
              src="/assets/sketch-friction-mountain.png" 
              alt="The steep learning curve of traditional game development"
              caption="The traditional path: months of learning before your first playable game"
            />
            
            <Reveal delay={0.15}>
              <p className="mb-6">The dropout rate for game development courses exceeds 90%. Most people quit before making anything playable.</p>
            </Reveal>

            {/* Stat Block with visual */}
            <Reveal delay={0.18}>
              <div className="flex flex-col md:flex-row items-center gap-8 my-10 p-8 bg-white/[0.02] border border-white/[0.06] rounded-2xl">
                <motion.div 
                  className="text-6xl md:text-7xl font-semibold text-white/95 tracking-[-0.04em]"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  90%
                </motion.div>
                <p className="text-sm text-white/50 leading-relaxed">
                  The dropout rate for game development courses. Nine out of ten people quit before making anything playable.
                </p>
              </div>
            </Reveal>
            
            <Reveal delay={0.2}>
              <blockquote className="my-8 pl-6 border-l-2 border-white/[0.08] text-lg italic text-white/40">
                "I just wanted to make a simple game with my friends. I didn't sign up for a computer science degree."
              </blockquote>
            </Reveal>
            
            <Reveal delay={0.25}>
              <p className="mb-12">This changed in 2025 with AI-powered game generation. <Link to="/our-vision" className="text-white/90 underline decoration-white/30 underline-offset-4 hover:decoration-white/80 transition-colors">Learn why we built VibeBrews</Link>.</p>
            </Reveal>
          </div>
        </article>

        {/* Cinematic Break 1 - Old Path */}
        <CinematicSection 
          image="/assets/sketch-idea-death-cycle.png"
          quote={<>"The old way: learn to code, study engines,<br />master tools. Months before your first game."</>}
        />

        <article className="py-16 px-6">
          <div className="max-w-[700px] mx-auto">
            {/* Text to Game Section */}
            <Reveal>
              <h2 className="text-2xl font-semibold text-white/95 tracking-[-0.02em] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Text to game in seconds
              </h2>
            </Reveal>
            
            <Reveal delay={0.1}>
              <p className="mb-6">You describe what you want in plain English. The AI understands game mechanics, physics, art styles, and generates a playable game in real-time.</p>
            </Reveal>

            <FloatingImage 
              src="/assets/sketch-transformation.png" 
              alt="AI generating a game from text description"
              caption="Type a sentence, get a playable 3D game"
            />

            <Reveal delay={0.15}>
              <p className="mb-6">For example, typing "Make a flappy bird game but the bird is a pizza and it's in space" produces a working 3D game with physics, collision detection, and scoring—in under a minute.</p>
            </Reveal>
            
            <Reveal delay={0.2}>
              <p className="mb-12">This isn't limited to simple games. Users have created puzzle games, racing games, board games, multiplayer battles, and simulations. The AI has learned from decades of game design.</p>
            </Reveal>

            {/* Steps */}
            <Reveal>
              <h2 className="text-2xl font-semibold text-white/95 tracking-[-0.02em] mt-8 mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Step by step
              </h2>
            </Reveal>
            
            <div className="space-y-2 mb-12">
              {steps.map((step, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="flex gap-5 py-6 border-b border-white/[0.04] last:border-0"
                  >
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-sm font-medium text-white/40 bg-white/[0.04] rounded-lg">
                      {step.number}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-white/95 mb-2">{step.title}</h3>
                      <p className="text-sm text-white/50 mb-0">{step.description}</p>
                      {step.code && (
                        <div className="mt-3 px-4 py-3 bg-white/[0.03] rounded-lg font-mono text-sm text-white/60">
                          {step.code}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </article>

        {/* Cinematic Break 2 - Before/After */}
        <CinematicSection 
          image="/assets/sketch-before-after.png"
          quote={<>"Before: 6 months to start.<br />After: 5 minutes to finish."</>}
        />

        <article className="py-16 px-6">
          <div className="max-w-[700px] mx-auto">
            {/* Game Ideas */}
            <Reveal>
              <h2 className="text-2xl font-semibold text-white/95 tracking-[-0.02em] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Games you can create today
              </h2>
              <p className="mb-6 text-white/50">Copy these prompts directly into VibeBrews to get started.</p>
            </Reveal>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
              {ideas.map((idea, i) => (
                <Reveal key={i} delay={i * 0.03}>
                  <motion.div
                    whileHover={{ 
                      y: -4, 
                      backgroundColor: 'rgba(255,255,255,0.04)',
                      borderColor: 'rgba(255,255,255,0.12)'
                    }}
                    className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl cursor-pointer transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-medium text-white/30 uppercase tracking-[0.06em] px-2 py-0.5 bg-white/[0.04] rounded">
                        {idea.category}
                      </span>
                    </div>
                    <div className="font-mono text-sm text-white/70 group-hover:text-white/90 transition-colors">
                      {idea.text}
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>

            {/* Advanced Techniques */}
            <Reveal>
              <h2 className="text-2xl font-semibold text-white/95 tracking-[-0.02em] mt-16 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Advanced techniques
              </h2>
            </Reveal>
            
            <Reveal delay={0.1}>
              <h3 className="text-lg font-semibold text-white/95 mt-10 mb-4">Iterative refinement</h3>
              <p className="mb-6">Start simple and add features incrementally. After generating your base game, use follow-up prompts to adjust specific elements: scoring systems, visual effects, difficulty progression, camera behavior.</p>
            </Reveal>

            <FloatingImage 
              src="/assets/sketch-statistics.png" 
              alt="Iterative game creation flow"
              caption="Start simple, iterate fast, refine until perfect"
            />
            
            <Reveal delay={0.15}>
              <h3 className="text-lg font-semibold text-white/95 mt-10 mb-4">Multiplayer</h3>
              <p className="mb-6">Every game supports peer-to-peer multiplayer automatically. Share your room code with a friend. They join through the same game in the app. Typical latency is 8-15ms on the same network.</p>
            </Reveal>
            
            <Reveal delay={0.2}>
              <h3 className="text-lg font-semibold text-white/95 mt-10 mb-4">Style modifiers</h3>
              <p className="mb-4">Append these phrases to any prompt for specific aesthetics:</p>
              <motion.ul 
                className="space-y-3 mb-12 p-6 bg-white/[0.02] border border-white/[0.06] rounded-xl"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ staggerChildren: 0.1 }}
              >
                {[
                  { modifier: '"made of cardboard"', desc: 'arts and crafts look' },
                  { modifier: '"hand drawn style"', desc: 'sketchy, paper-like visuals' },
                  { modifier: '"sunset lighting"', desc: 'warm, golden hour atmosphere' },
                  { modifier: '"low poly style"', desc: 'simple, blocky shapes' },
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    className="flex gap-3 text-sm"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <span className="text-white/30">•</span>
                    <span><strong className="text-white/90">{item.modifier}</strong> — {item.desc}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </Reveal>

            {/* Comparison Table */}
            <Reveal>
              <h2 className="text-2xl font-semibold text-white/95 tracking-[-0.02em] mt-16 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                How VibeBrews compares
              </h2>
            </Reveal>
            
            <Reveal delay={0.1}>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-white/[0.08]">
                      <th className="text-left py-3 px-4 font-medium text-white/40 whitespace-nowrap">Tool</th>
                      <th className="text-left py-3 px-4 font-medium text-white/40 whitespace-nowrap">Learning Curve</th>
                      <th className="text-left py-3 px-4 font-medium text-white/40 whitespace-nowrap">Time to First Game</th>
                      <th className="text-left py-3 px-4 font-medium text-white/40 whitespace-nowrap">Multiplayer</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/[0.04]">
                      <td className="py-4 px-4 font-medium text-white/90">VibeBrews</td>
                      <td className="py-4 px-4 text-white/90">None</td>
                      <td className="py-4 px-4 text-white/90">2-5 minutes</td>
                      <td className="py-4 px-4 text-white/90">Built-in</td>
                    </tr>
                    <tr className="border-b border-white/[0.04]">
                      <td className="py-4 px-4 font-medium text-white/60">Construct 3</td>
                      <td className="py-4 px-4 text-white/50">Medium</td>
                      <td className="py-4 px-4 text-white/50">Days to weeks</td>
                      <td className="py-4 px-4 text-white/50">Complex setup</td>
                    </tr>
                    <tr className="border-b border-white/[0.04]">
                      <td className="py-4 px-4 font-medium text-white/60">GDevelop</td>
                      <td className="py-4 px-4 text-white/50">Medium</td>
                      <td className="py-4 px-4 text-white/50">Days to weeks</td>
                      <td className="py-4 px-4 text-white/50">Requires coding</td>
                    </tr>
                    <tr className="border-b border-white/[0.04]">
                      <td className="py-4 px-4 font-medium text-white/60">Roblox Studio</td>
                      <td className="py-4 px-4 text-white/50">High</td>
                      <td className="py-4 px-4 text-white/50">Weeks to months</td>
                      <td className="py-4 px-4 text-white/50">Yes</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 font-medium text-white/60">Unity</td>
                      <td className="py-4 px-4 text-white/50">Very high</td>
                      <td className="py-4 px-4 text-white/50">Months</td>
                      <td className="py-4 px-4 text-white/50">Complex setup</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mb-12 text-sm text-white/50">Other tools offer more granular control but require significant time investment. VibeBrews prioritizes speed and accessibility.</p>
            </Reveal>
          </div>
        </article>

        {/* Cinematic Break 3 - Future of Creation */}
        <CinematicSection 
          image="/assets/sketch-hero-idea-graveyard.png"
          quote={<>"The future of game creation:<br />imagination is the only requirement."</>}
        />

        <article className="py-16 px-6">
          <div className="max-w-[700px] mx-auto">
            {/* FAQ */}
            <Reveal>
              <h2 className="text-2xl font-semibold text-white/95 tracking-[-0.02em] mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Frequently asked questions
              </h2>
            </Reveal>
            
            <div className="space-y-0 mb-12">
              {faqs.map((faq, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <div className="py-7 border-b border-white/[0.04] last:border-0">
                    <h3 className="text-base font-semibold text-white/95 mb-3">{faq.q}</h3>
                    <p className="text-sm text-white/50 leading-relaxed">{faq.a}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Idea to Reality Image */}
            <FloatingImage 
              src="/assets/dropout-statistic.png" 
              alt="Ideas transforming into playable games"
              caption="From imagination to reality in minutes"
            />

            {/* CTA */}
            <Reveal>
              <motion.div 
                className="mt-16 p-12 text-center bg-white/[0.02] border border-white/[0.06] rounded-2xl relative overflow-hidden"
                whileHover={{ borderColor: 'rgba(255,255,255,0.12)' }}
              >
                {/* Animated background glow */}
                <motion.div
                  className="absolute -top-20 -right-20 w-60 h-60 bg-white/5 rounded-full blur-3xl"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/5 rounded-full blur-3xl"
                  animate={{ 
                    scale: [1.2, 1, 1.2],
                    opacity: [0.5, 0.3, 0.5]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                
                <div className="relative z-10">
                  <h2 className="text-2xl md:text-3xl font-semibold text-white/95 tracking-[-0.02em] mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Start creating</h2>
                  <p className="text-white/50 mb-8">Your first game is five minutes away.</p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ExternalLink
                      href="https://play.google.com/store/apps/details?id=com.nextap.vibebrews"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-all shadow-lg shadow-white/10"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                      </svg>
                      Download for Android
                    </ExternalLink>
                  </motion.div>
                  <p className="mt-4 text-xs text-white/30">Free · iOS coming soon</p>
                </div>
              </motion.div>
            </Reveal>
          </div>
        </article>

        {/* Footer */}
        <footer className="py-12 border-t border-white/[0.04]">
          <div className="max-w-4xl mx-auto px-6 flex flex-col items-center gap-6">
            <nav className="flex flex-wrap justify-center gap-8 text-sm text-white/40">
              <Link to="/" className="hover:text-white/70 transition-colors">Home</Link>
              <Link to="/our-vision" className="hover:text-white/70 transition-colors">Our Vision</Link>
              <Link to="/productive-things-to-do-on-phone" className="hover:text-white/70 transition-colors">Productive Play</Link>
              <Link to="/why-i-stopped-learning-unity" className="hover:text-white/70 transition-colors">Why I Quit Unity</Link>
              <span className="hover:text-white/70 transition-colors cursor-pointer">Privacy</span>
              <span className="hover:text-white/70 transition-colors cursor-pointer">Terms</span>
            </nav>
            <p className="text-xs text-white/30">© 2026 VibeBrews. A product by <ExternalLink href="https://www.linkedin.com/company/nextap-ai/" className="underline hover:text-white/50 transition-colors">Nextap AI</ExternalLink></p>
          </div>
        </footer>
      </div>
    </PageTransition>
  )
}
