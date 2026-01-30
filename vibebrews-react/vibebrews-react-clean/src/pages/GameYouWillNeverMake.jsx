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

export default function GameYouWillNeverMake() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-[#030303] text-white/60">
        {/* Hero */}
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 blur-[120px]"
            />
          </div>
          
          <div className="text-center relative z-10 px-6 py-20">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-xs text-cyan-400 uppercase tracking-[0.2em] mb-6"
            >
              Opinion / Jan 26, 2026
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-6xl lg:text-8xl font-bold text-white/95 leading-[0.95] tracking-[-0.04em] mb-8"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              The Game You'll<br />
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Never Make.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl text-white/50 max-w-[600px] mx-auto leading-relaxed mb-10"
            >
              47 unfinished projects. 3AM promises to yourself. "This time will be different."<br />
              We need to talk.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center gap-5 text-sm text-white/40"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-sm">LB</div>
                <span>Lena Bergström</span>
              </div>
              <span>•</span>
              <span>8 min read</span>
            </motion.div>
          </div>
        </section>

        {/* Article */}
        <article className="py-20 px-6">
          <div className="max-w-[700px] mx-auto">
            <Reveal>
              <h2 className="text-3xl font-semibold text-white/95 tracking-[-0.02em] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                I Know Your Browser History
              </h2>
            </Reveal>
            
            <Reveal delay={0.1}>
              <p className="mb-6 text-lg leading-relaxed">Not in a creepy way. But I know you've googled <em className="text-cyan-400">"why can't I finish my projects"</em> at 2AM. I know you have a folder called "Game Ideas" that hasn't been opened since last summer. I know you've started learning three different game engines and finished none.</p>
            </Reveal>
            
            <Reveal delay={0.15}>
              <p className="mb-6 text-lg leading-relaxed">How do I know? Because I was you. And because the search data doesn't lie.</p>
            </Reveal>
            
            <Reveal delay={0.2}>
              <p className="mb-6 text-lg leading-relaxed"><strong className="text-white/90">"Why can't I finish my game"</strong> gets searched 14,000 times a month. In English alone.</p>
            </Reveal>
            
            <Reveal delay={0.25}>
              <p className="mb-6 text-lg leading-relaxed">That's 14,000 people, every single month, asking the same desperate question into the void. And the internet gives them the same garbage advice: "Just be more disciplined." "Break it into smaller tasks." "Find your why."</p>
            </Reveal>
            
            <Reveal delay={0.3}>
              <p className="mb-12 text-lg leading-relaxed"><strong className="text-white/90">It's all wrong.</strong></p>
            </Reveal>

            <Reveal>
              <h2 className="text-3xl font-semibold text-white/95 tracking-[-0.02em] mt-16 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                The Perfectionist's Trap
              </h2>
            </Reveal>
            
            <Reveal delay={0.1}>
              <p className="mb-6">Let me tell you about Thomas. He's from Kiel. He's 28. He's been "making games" for six years. He has never shipped a single one.</p>
            </Reveal>
            
            <Reveal delay={0.15}>
              <p className="mb-6">I interviewed him for this piece. Here's what he said:</p>
            </Reveal>

            {/* Quote */}
            <Reveal delay={0.2}>
              <div className="my-10 p-8 border-l-4 border-pink-500 bg-gradient-to-r from-pink-500/10 to-purple-500/5 rounded-r-2xl">
                <p className="text-xl font-medium text-white/90 leading-relaxed mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  "Every time I start, I see everything it could become. And then I realize I'm not skilled enough to build that vision. So I start learning. And by the time I've learned enough, I have a new idea."
                </p>
                <p className="text-sm text-white/40">— Thomas, Game Developer (in theory)</p>
              </div>
            </Reveal>
            
            <Reveal delay={0.25}>
              <p className="mb-6">This is the trap. The vision expands faster than your skills. Always. Forever. It's not a bug in your motivation. It's a bug in the process itself.</p>
            </Reveal>

            {/* Visual Block - Perfectionist's Loop */}
            <Reveal delay={0.28}>
              <div className="my-10">
                <img src="/assets/never-make-diagram-loop.png" alt="The Perfectionist's Loop Diagram" loading="lazy" className="w-full rounded-xl border border-white/10" />
                <p className="text-center text-sm text-white/40 mt-3 italic">The Perfectionist's Loop. Notice there's no exit.</p>
              </div>
            </Reveal>
            
            <Reveal delay={0.3}>
              <p className="mb-6">The traditional path to making games is designed to trap you. It's not your fault. It's <Link to="/why-i-stopped-learning-unity" className="text-cyan-400 underline decoration-cyan-400/30 underline-offset-4 hover:decoration-cyan-400 transition-colors">the system's fault</Link>.</p>
            </Reveal>
          </div>
        </article>

        {/* Cinematic Break 1 */}
        <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/never-make-graveyard.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/60 via-[#030303]/40 to-[#030303]/80" />
          <div className="relative z-10 text-center px-6">
            <h2 className="text-2xl md:text-4xl font-semibold text-white/95 leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              "47 unfinished projects.<br />Each one was going to be 'the one'."
            </h2>
          </div>
        </section>

        <article className="py-20 px-6">
          <div className="max-w-[700px] mx-auto">
            <Reveal>
              <h2 className="text-3xl font-semibold text-white/95 tracking-[-0.02em] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                The Lie They Told You
              </h2>
            </Reveal>
            
            <Reveal delay={0.1}>
              <p className="mb-6">The game industry has a dirty secret: they need you to fail.</p>
            </Reveal>
            
            <Reveal delay={0.15}>
              <p className="mb-6">Think about it. Who benefits when game development is hard?</p>
            </Reveal>
            
            <Reveal delay={0.2}>
              <p className="mb-6">Tutorial creators. Course sellers. Engine companies charging for "pro" features. Studios that can pay less because "everyone wants to make games." The entire ecosystem is built on the assumption that <em className="text-cyan-400">making games is supposed to be painful</em>.</p>
            </Reveal>
            
            <Reveal delay={0.25}>
              <p className="mb-12">So they keep telling you: learn C#. Learn shaders. Learn quaternions (whatever those are). Spend 200 hours on a course before you can make a cube move.</p>
            </Reveal>

            {/* Comparison */}
            <Reveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
                <div className="p-8 bg-red-500/5 rounded-2xl border border-red-500/20">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-red-400 mb-5">What They Told You</h4>
                  <ul className="space-y-3 text-white/50 text-sm">
                    <li className="flex gap-3 line-through">❌ Learn to code first</li>
                    <li className="flex gap-3 line-through">❌ Master an engine (500+ hours)</li>
                    <li className="flex gap-3 line-through">❌ Understand math & physics</li>
                    <li className="flex gap-3 line-through">❌ Build a portfolio</li>
                    <li className="flex gap-3 line-through">❌ Then maybe start</li>
                  </ul>
                </div>
                <div className="p-8 bg-gradient-to-br from-cyan-500/10 to-purple-500/5 rounded-2xl border border-cyan-500/20">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-cyan-400 mb-5">What Actually Works</h4>
                  <ul className="space-y-3 text-white/90 text-sm">
                    <li className="flex gap-3">✓ Have an idea</li>
                    <li className="flex gap-3">✓ Describe it</li>
                    <li className="flex gap-3">✓ Play it</li>
                    <li className="flex gap-3 text-white/40">(There is no step 4)</li>
                  </ul>
                </div>
              </div>
            </Reveal>
            
            <Reveal>
              <p className="mb-6 text-lg leading-relaxed"><strong className="text-white/90">The gap between imagination and reality should be seconds, not years.</strong></p>
            </Reveal>

            {/* Visual Block - The Spark */}
            <Reveal delay={0.1}>
              <div className="my-10">
                <img src="/assets/never-make-spark.png" alt="The moment of creation" loading="lazy" className="w-full rounded-xl border border-white/10" />
                <p className="text-center text-sm text-white/40 mt-3 italic">What if the spark didn't have to die?</p>
              </div>
            </Reveal>
          </div>
        </article>

        {/* Cinematic Break 2 */}
        <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/never-make-connection.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/60 via-[#030303]/40 to-[#030303]/80" />
          <div className="relative z-10 text-center px-6">
            <h2 className="text-2xl md:text-4xl font-semibold text-white/95 leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              "The gap between idea and reality<br />should be seconds, not years."
            </h2>
          </div>
        </section>

        <article className="py-20 px-6">
          <div className="max-w-[700px] mx-auto">
            <Reveal>
              <h2 className="text-3xl font-semibold text-white/95 tracking-[-0.02em] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                The 5-Minute Rule
              </h2>
            </Reveal>
            
            <Reveal delay={0.1}>
              <p className="mb-6">After that experiment, I made myself a rule: if I can't go from idea to playable in 5 minutes, I'm using the wrong tool.</p>
            </Reveal>
            
            <Reveal delay={0.15}>
              <p className="mb-6">Think about that for a second.</p>
            </Reveal>
            
            <Reveal delay={0.2}>
              <p className="mb-6">Writers don't spend 200 hours learning how paper works before writing a story. Musicians don't need a computer science degree to hum a melody. Why should game creators be any different?</p>
            </Reveal>
            
            <Reveal delay={0.25}>
              <p className="mb-6">The gap between having an idea and seeing it come alive — that's where <Link to="/the-creative-block-is-a-lie" className="text-cyan-400 underline decoration-cyan-400/30 underline-offset-4 hover:decoration-cyan-400 transition-colors">creative blocks come from</Link>. Shrink that gap to nothing, and the blocks disappear.</p>
            </Reveal>

            {/* Quote */}
            <Reveal delay={0.3}>
              <div className="my-10 p-8 border-l-4 border-cyan-400 bg-gradient-to-r from-cyan-500/10 to-purple-500/5 rounded-r-2xl">
                <p className="text-xl font-medium text-white/90 leading-relaxed mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  "You don't get points for difficulty. You get points for shipping."
                </p>
                <p className="text-sm text-white/40">— Someone smarter than me</p>
              </div>
            </Reveal>
            
            <Reveal delay={0.35}>
              <p className="mb-6">Thomas, from earlier? I sent him the app. He shipped his first game three days later. A silly thing about a frog eating flies. He sent it to his sister. She played it. She laughed.</p>
            </Reveal>
            
            <Reveal delay={0.4}>
              <p className="mb-6">Six years of theory. Three days to actually ship.</p>
            </Reveal>

            {/* Visual Block - Mirror */}
            <Reveal delay={0.42}>
              <div className="my-10">
                <img src="/assets/never-make-mirror.png" alt="Person looking at reflection" loading="lazy" className="w-full rounded-xl border border-white/10" />
                <p className="text-center text-sm text-white/40 mt-3 italic">Who you are vs. who you could be. One decision apart.</p>
              </div>
            </Reveal>
            
            <Reveal delay={0.45}>
              <p className="mb-6 text-lg"><strong className="text-white/90">The tools changed. He didn't have to.</strong></p>
            </Reveal>
          </div>
        </article>

        {/* Cinematic Break 3 */}
        <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/never-make-explosion.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/60 via-[#030303]/40 to-[#030303]/80" />
          <div className="relative z-10 text-center px-6">
            <h2 className="text-2xl md:text-4xl font-semibold text-white/95 leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              "Stop planning.<br />Start playing."
            </h2>
          </div>
        </section>

        <article className="py-20 px-6">
          <div className="max-w-[700px] mx-auto">
            {/* CTA */}
            <Reveal>
              <div className="py-16 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white/95 tracking-[-0.02em] mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Stop Planning.<br />Start Playing.</h2>
                <p className="text-white/50 mb-10 max-w-md mx-auto">Your 48th project doesn't need to become your 48th graveyard.<br />Five minutes. One idea. Zero excuses.</p>
                <ExternalLink
                  href="https://play.google.com/store/apps/details?id=com.nextap.vibebrews"
                  className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-black font-semibold rounded-full hover:scale-105 transition-transform shadow-[0_20px_60px_rgba(0,245,255,0.3)]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  Make Your First Game
                </ExternalLink>
                <div className="mt-8 flex justify-center gap-8 text-sm text-white/40">
                  <Link to="/how-to-make-a-game-without-coding" className="hover:text-white/70 underline decoration-transparent hover:decoration-white/30 underline-offset-4 transition-all">How it works</Link>
                  <Link to="/our-vision" className="hover:text-white/70 underline decoration-transparent hover:decoration-white/30 underline-offset-4 transition-all">Our philosophy</Link>
                  <Link to="/i-have-a-game-idea" className="hover:text-white/70 underline decoration-transparent hover:decoration-white/30 underline-offset-4 transition-all">Already have an idea?</Link>
                </div>
              </div>
            </Reveal>

            {/* Related */}
            <Reveal>
              <div className="mt-16 pt-12 border-t border-white/[0.06]">
                <h3 className="font-mono text-xs uppercase tracking-wider text-white/30 mb-8 text-center">Keep Reading</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Link to="/the-death-of-coding" className="p-6 bg-white/[0.02] border border-white/[0.06] rounded-xl hover:bg-white/[0.04] transition-colors">
                    <h4 className="text-base font-medium text-white/90 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>The Death of Coding</h4>
                    <p className="text-sm text-white/40">Why learning to code might be the biggest waste of time in 2026.</p>
                  </Link>
                  <Link to="/why-i-stopped-learning-unity" className="p-6 bg-white/[0.02] border border-white/[0.06] rounded-xl hover:bg-white/[0.04] transition-colors">
                    <h4 className="text-base font-medium text-white/90 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Why I Stopped Learning Unity</h4>
                    <p className="text-sm text-white/40">500 hours. Zero shipped games. My confession.</p>
                  </Link>
                  <Link to="/the-creative-block-is-a-lie" className="p-6 bg-white/[0.02] border border-white/[0.06] rounded-xl hover:bg-white/[0.04] transition-colors">
                    <h4 className="text-base font-medium text-white/90 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>The Creative Block is a Lie</h4>
                    <p className="text-sm text-white/40">I built a multiplayer universe in 4 minutes.</p>
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
              <Link to="/i-have-a-game-idea" className="hover:text-white/70 transition-colors">I Have an Idea</Link>
              <Link to="/productive-things-to-do-on-phone" className="hover:text-white/70 transition-colors">Productive Play</Link>
            </nav>
            <p className="text-xs text-white/30">© 2026 VibeBrews. A product by <ExternalLink href="https://www.linkedin.com/company/nextap-ai/" className="underline hover:text-white/50 transition-colors">Nextap AI</ExternalLink></p>
          </div>
        </footer>
      </div>
    </PageTransition>
  )
}
