import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import ExternalLink from '../components/ExternalLink'

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

export default function DeathOfCoding() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-[#050505] text-white/60">
        {/* Hero */}
        <section className="min-h-[85vh] flex items-center justify-center relative overflow-hidden border-b border-white/[0.04]">
          <div className="absolute inset-0 overflow-hidden">
            <div 
              className="absolute inset-0 bg-fixed bg-center bg-cover grayscale contrast-[1.2] brightness-50"
              style={{ backgroundImage: "url('/assets/vision-imagination.png')" }}
            />
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
              transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-[200px] -right-[150px] w-[700px] h-[700px] rounded-full bg-gradient-to-br from-purple-500/15 to-pink-600/15 blur-[100px] opacity-20"
            />
          </div>
          
          <div className="text-center relative z-10 px-6 py-20">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[11px] font-semibold text-[#FF5C00] uppercase tracking-[0.12em] mb-6"
            >
              Opinion
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-5xl lg:text-7xl font-bold text-white/95 leading-[1.05] tracking-[-0.04em] mb-7"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              The Death of Coding.
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center gap-4 text-sm text-white/40 mb-8"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">HM</div>
                <div className="text-left">
                  <p className="text-white/70">By Hans Müller</p>
                  <p className="text-xs">Tech Journalist, Hamburg</p>
                </div>
              </div>
              <span className="text-white/20">|</span>
              <span>Jan 26, 2026</span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl md:text-2xl text-white/50 max-w-[640px] mx-auto leading-relaxed"
            >
              I forced my son to learn Python for three years. Last week, I apologized to him. We were optimizing for a future that no longer exists.
            </motion.p>
          </div>
        </section>

        {/* Article */}
        <article className="py-20 px-6">
          <div className="max-w-[700px] mx-auto">
            <Reveal>
              <h2 className="text-2xl font-semibold text-white/95 tracking-[-0.02em] mt-8 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                The "Learn to Code" Lie
              </h2>
            </Reveal>
            
            <Reveal delay={0.1}>
              <p className="mb-6 text-lg leading-relaxed">Remember when we told everyone that coding was the new literacy? That if you couldn't write a loop, you'd be illiterate in the 21st century?</p>
            </Reveal>
            
            <Reveal delay={0.15}>
              <p className="mb-6 text-lg leading-relaxed">We were wrong. We confused <strong className="text-white/90">syntax</strong> with <strong className="text-white/90">creation</strong>.</p>
            </Reveal>
            
            <Reveal delay={0.2}>
              <p className="mb-8 text-lg leading-relaxed">Coding is plumbing. It is welding. It is necessary infrastructure, yes. But do you need to know how to solder a circuit board to use an iPhone? No. You just touch the glass.</p>
            </Reveal>

            {/* Code Block */}
            <Reveal delay={0.25}>
              <div className="my-10 p-6 bg-[#1e1e1e] rounded-lg font-mono text-sm border border-white/10 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-red-500/50"></div>
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="opacity-50 group-hover:opacity-100 transition-opacity text-gray-300">
                  <span className="text-purple-400">class</span> <span className="text-yellow-300">GameController</span> <span className="text-white">{"{"}</span><br/>
                  &nbsp;&nbsp;<span className="text-purple-400">void</span> <span className="text-blue-400">Update</span>() <span className="text-white">{"{"}</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-400">{"// TODO: Fix physics glitch"}</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-red-400">NullReferenceException: Object reference not set...</span><br/>
                  &nbsp;&nbsp;<span className="text-white">{"}"}</span><br/>
                  <span className="text-white">{"}"}</span>
                </div>
              </div>
            </Reveal>
            
            <Reveal delay={0.3}>
              <p className="text-sm text-center text-white/40 italic mb-12">This is not creativity. This is bureaucracy.</p>
            </Reveal>

            {/* Quote */}
            <Reveal>
              <div className="my-12 pl-6 border-l-2 border-[#FF5C00]">
                <p className="text-2xl font-medium text-white/90 italic" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  "The gap between having an idea and seeing it alive should be zero."
                </p>
              </div>
            </Reveal>

            <Reveal>
              <h2 className="text-2xl font-semibold text-white/95 tracking-[-0.02em] mt-16 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Enter the "Vibe" Era
              </h2>
            </Reveal>
            
            <Reveal delay={0.1}>
              <p className="mb-6 text-lg leading-relaxed">I found an app called <strong className="text-white/90">VibeBrews</strong>. Terrible name. Incredible technology.</p>
            </Reveal>
            
            <Reveal delay={0.15}>
              <p className="mb-6 text-lg leading-relaxed">My son didn't write code. He didn't open a terminal. He opened the app and typed: <span className="text-white bg-white/10 px-2 py-1 rounded font-mono text-base">"A game where I am a slice of toast fighting a toaster in space."</span></p>
            </Reveal>
            
            <Reveal delay={0.2}>
              <p className="mb-12 text-lg leading-relaxed">45 seconds later, he was playing it with his sister. Multiplayer. On their phones.</p>
            </Reveal>

            {/* Comparison Grid */}
            <Reveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
                <div className="p-8 bg-white/[0.02] rounded-2xl border border-white/[0.06]">
                  <h3 className="text-red-400 font-mono text-sm uppercase mb-4">The Old Way (Unity/Unreal)</h3>
                  <ul className="space-y-3 text-white/40 text-sm">
                    <li className="flex gap-3">❌ <span className="line-through">Download 20GB Engine</span></li>
                    <li className="flex gap-3">❌ <span className="line-through">Watch 40 hours of tutorials</span></li>
                    <li className="flex gap-3">❌ <span className="line-through">Fix compiler errors</span></li>
                    <li className="flex gap-3">❌ <span className="line-through">Give up</span></li>
                  </ul>
                </div>
                <div className="p-8 bg-gradient-to-br from-[#FF5C00]/10 to-purple-900/10 rounded-2xl border border-[#FF5C00]/20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 bg-[#FF5C00] text-black text-xs font-bold uppercase">The Vibe Way</div>
                  <h3 className="text-[#FF5C00] font-mono text-sm uppercase mb-4">VibeBrews</h3>
                  <ul className="space-y-3 text-white/90 text-sm">
                    <li className="flex gap-3">✅ <span>Have an idea</span></li>
                    <li className="flex gap-3">✅ <span>Type it</span></li>
                    <li className="flex gap-3">✅ <span>Play it</span></li>
                  </ul>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <h2 className="text-2xl font-semibold text-white/95 tracking-[-0.02em] mt-16 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Is this the end of Apple's Walled Garden?
              </h2>
            </Reveal>
            
            <Reveal delay={0.1}>
              <p className="mb-6 text-lg leading-relaxed">Companies like Apple and Epic Games built empires on gatekeeping. You need their hardware, their stores, their approval to publish.</p>
            </Reveal>
            
            <Reveal delay={0.15}>
              <p className="mb-6 text-lg leading-relaxed">Tools like Cursor (which I use to write) make coding faster. But VibeBrews makes coding <em className="text-white/90">invisible</em>. It's peer-to-peer. No servers. No app store approval for every little experiment.</p>
            </Reveal>
            
            <Reveal delay={0.2}>
              <p className="mb-12 text-lg leading-relaxed">It feels like the early internet. Messy. Wild. Free.</p>
            </Reveal>

            {/* CTA Section */}
            <Reveal>
              <div className="mt-16 p-12 text-center bg-white/[0.02] border border-white/[0.06] rounded-2xl">
                <h2 className="text-3xl md:text-4xl font-semibold text-white/95 tracking-[-0.02em] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Stop Coding. Start Creating.</h2>
                <p className="text-white/50 mb-8 text-lg">You don't get points for difficulty. You get points for shipping.</p>
                <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                  <ExternalLink
                    href="https://play.google.com/store/apps/details?id=com.nextap.vibebrews"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                  >
                    Try VibeBrews (Free)
                  </ExternalLink>
                  <Link to="/how-to-make-a-game-without-coding" className="text-white/50 hover:text-white underline decoration-white/30 underline-offset-4">
                    Read: How it works
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </article>

        {/* Footer */}
        <footer className="py-12 border-t border-white/[0.04]">
          <div className="max-w-4xl mx-auto px-6 flex flex-col items-center gap-6">
            <nav className="flex flex-wrap justify-center gap-8 text-sm text-white/40">
              <Link to="/" className="hover:text-white/70 transition-colors">Home</Link>
              <Link to="/how-to-make-a-game-without-coding" className="hover:text-white/70 transition-colors">How to Make Games</Link>
              <Link to="/our-vision" className="hover:text-white/70 transition-colors">Our Vision</Link>
              <Link to="/productive-things-to-do-on-phone" className="hover:text-white/70 transition-colors">Productive Play</Link>
            </nav>
            <p className="text-xs text-white/30">© 2026 VibeBrews. A product by <ExternalLink href="https://www.linkedin.com/company/nextap-ai/" className="underline hover:text-white/50 transition-colors">Nextap AI</ExternalLink></p>
          </div>
        </footer>
      </div>
    </PageTransition>
  )
}
