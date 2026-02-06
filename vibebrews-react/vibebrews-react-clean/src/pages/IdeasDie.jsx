import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
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

export default function IdeasDie() {
  useSEO({
    title: 'Why Your Ideas Die in Your Notes App | VibeBrews',
    description: 'Your notes app is where ideas go to die. Learn why writing ideas down isn\'t enough and how to turn them into reality with AI-powered creation tools.',
    keywords: 'ideas die, notes app, idea to reality, creative execution, turn ideas into games, indie creator tips',
    canonical: 'https://vibebrews.com/why-your-ideas-die-in-your-notes-app',
  })
  return (
    <PageTransition>
      <div className="min-h-screen bg-[#020206] text-white/60">
        {/* Hero */}
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.12, 0.06] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-amber-500 to-orange-500 blur-[100px] rounded-full"
            />
          </div>
          
          <div className="text-center relative z-10 px-6 py-20">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-xs text-amber-400 uppercase tracking-[0.2em] mb-6"
            >
              Personal / Jan 26, 2026
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-7xl md:text-9xl font-bold text-amber-400 mb-6"
              style={{ fontFamily: "'Space Grotesk', sans-serif", textShadow: '0 0 60px rgba(245,158,11,0.5)' }}
            >
              147
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white/95 leading-[1.15] tracking-[-0.02em] mb-8"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Unfinished Ideas.<br />
              Why None of Them Made It.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl text-white/50 max-w-[560px] mx-auto leading-relaxed mb-10"
            >
              I finally opened my notes app and counted. 147 ideas. Dating back to 2019. Not one of them exists. Here's what I discovered about why — and the embarrassingly simple fix.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center gap-5 text-sm text-white/40"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">SB</div>
                <span>Sophie Brennan</span>
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
                The Graveyard in Your Pocket
              </h2>
            </Reveal>
            
            <Reveal delay={0.1}>
              <p className="mb-6 text-lg leading-relaxed">Look, I'm going to be honest with you because I reckon you've been here too.</p>
            </Reveal>
            
            <Reveal delay={0.15}>
              <p className="mb-6 text-lg leading-relaxed">Last Tuesday, I opened my Notes app to add yet another "million dollar idea" — some app concept that came to me in the shower — and I accidentally scrolled to the bottom of the list. What I saw made me want to throw my phone into the river.</p>
            </Reveal>
            
            <Reveal delay={0.2}>
              <p className="mb-6 text-lg leading-relaxed"><strong className="text-white/90">147 ideas.</strong> Some dating back to 2019. Every single one of them was going to change my life, make passive income, impress my mates, finally prove I'm not just talk.</p>
            </Reveal>
            
            <Reveal delay={0.25}>
              <p className="mb-6 text-lg leading-relaxed">Not one of them exists. Not a single one made it past a few lines of excited scribbling at 2am.</p>
            </Reveal>
            
            <Reveal delay={0.3}>
              <p className="mb-6 text-lg leading-relaxed">And here's what really gets me: I'm not lazy. I work hard. I've got ambition coming out my ears. So why does every single creative project I dream up end up in this <em className="text-amber-400">digital graveyard</em> of abandoned potential?</p>
            </Reveal>

            {/* Visual Block - Graveyard */}
            <Reveal delay={0.35}>
              <div className="my-10">
                <img src="/assets/never-make-graveyard.png" alt="A graveyard of unfinished projects" loading="lazy" className="w-full rounded-xl border border-white/10" />
                <p className="text-center text-sm text-white/40 mt-3 italic">The digital graveyard. Recognize any of these?</p>
              </div>
            </Reveal>

            <Reveal>
              <h2 className="text-3xl font-semibold text-white/95 tracking-[-0.02em] mt-16 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                It's Not You. It's the Friction.
              </h2>
            </Reveal>
            
            <Reveal delay={0.1}>
              <p className="mb-6">I spent three months last year trying to learn Unity so I could build a simple puzzle game I'd dreamed up. You know what I learned?</p>
            </Reveal>

            {/* List */}
            <Reveal delay={0.15}>
              <ul className="my-8 space-y-4">
                <li className="flex gap-4 py-4 border-b border-white/[0.06]">
                  <span className="text-red-400 text-xl">✗</span>
                  <span>How to set up a development environment (2 days)</span>
                </li>
                <li className="flex gap-4 py-4 border-b border-white/[0.06]">
                  <span className="text-red-400 text-xl">✗</span>
                  <span>The difference between C# and JavaScript (1 week)</span>
                </li>
                <li className="flex gap-4 py-4 border-b border-white/[0.06]">
                  <span className="text-red-400 text-xl">✗</span>
                  <span>Why my textures weren't loading properly (3 weeks of forums)</span>
                </li>
                <li className="flex gap-4 py-4 border-b border-white/[0.06]">
                  <span className="text-red-400 text-xl">✗</span>
                  <span>How to actually make a fun game (never got there)</span>
                </li>
              </ul>
            </Reveal>
            
            <Reveal delay={0.2}>
              <p className="mb-6">The puzzle game? Still in my notes app. Untouched. Because by the time I'd climbed the <em className="text-amber-400">friction mountain</em>, my enthusiasm had completely evaporated.</p>
            </Reveal>

            {/* Visual Block - Learning Curve */}
            <Reveal delay={0.22}>
              <div className="my-10">
                <img src="/assets/blog-learning-curve.png" alt="The steep learning curve of traditional tools" loading="lazy" className="w-full rounded-xl border border-white/10" />
                <p className="text-center text-sm text-white/40 mt-3 italic">The friction mountain. Most never make it to the other side.</p>
              </div>
            </Reveal>
            
            <Reveal delay={0.25}>
              <p className="mb-6">This is the dirty secret nobody talks about: <strong className="text-white/90">ideas don't die from lack of motivation. They die from too much friction.</strong></p>
            </Reveal>
          </div>
        </article>

        {/* Cinematic Break 1 */}
        <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/never-make-diagram-loop.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020206]/70 via-[#020206]/50 to-[#020206]/80" />
          <div className="relative z-10 text-center px-6">
            <h2 className="text-2xl md:text-4xl font-semibold text-white/95 leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              "147 ideas. Not one of them exists.<br />The friction won every time."
            </h2>
          </div>
        </section>

        <article className="py-20 px-6">
          <div className="max-w-[700px] mx-auto">
            {/* Stat */}
            <Reveal>
              <div className="my-10 p-8 flex items-center gap-6 bg-gradient-to-r from-amber-500/10 to-purple-500/5 border border-amber-500/20 rounded-2xl">
                <div className="text-5xl font-bold text-amber-400" style={{ textShadow: '0 0 30px rgba(245,158,11,0.5)' }}>73%</div>
                <div>
                  <p className="text-white/90 font-medium mb-1">Ideas that never leave the notes app</p>
                  <p className="text-sm text-white/50">I made that stat up. But we both know it's probably higher.</p>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <h2 className="text-3xl font-semibold text-white/95 tracking-[-0.02em] mt-16 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                The Lie We Tell Ourselves
              </h2>
            </Reveal>
            
            <Reveal delay={0.1}>
              <p className="mb-6">"I just need more time."</p>
            </Reveal>
            
            <Reveal delay={0.15}>
              <p className="mb-6">That's what I told myself for years. If only I had a free weekend. If only work wasn't so demanding. If only I could just focus...</p>
            </Reveal>
            
            <Reveal delay={0.2}>
              <p className="mb-6">But then I tracked my screen time for a month. You know what I found? <em className="text-amber-400">I had plenty of time.</em> I was spending it scrolling through content other people made. Four hours a day, minimum. Sometimes six.</p>
            </Reveal>
            
            <Reveal delay={0.25}>
              <p className="mb-6">The problem isn't time. <strong className="text-white/90">The problem is that creating feels hard, and consuming feels easy.</strong> Our brains will always choose the path of least resistance. It's not a character flaw — it's survival instinct.</p>
            </Reveal>
            
            <Reveal delay={0.3}>
              <p className="mb-12">So if you want to actually finish something, you don't need more motivation. You don't need a productivity system. You don't need to wake up at 5am and do cold plunges. <strong className="text-white/90">You need to make creating as easy as consuming.</strong></p>
            </Reveal>

            <Reveal>
              <h2 className="text-3xl font-semibold text-white/95 tracking-[-0.02em] mt-16 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                The Moment Everything Changed
              </h2>
            </Reveal>
            
            <Reveal delay={0.1}>
              <p className="mb-6">I'm going to tell you about the dumbest, most embarrassing thing I've ever done that actually worked.</p>
            </Reveal>
            
            <Reveal delay={0.15}>
              <p className="mb-6">Three months ago, I was lying in bed at 11pm, thumb hovering over TikTok, when I had an idea for a simple little thing — a game where you tap to avoid obstacles, but the obstacles are shaped like your excuses. "Too tired." "Tomorrow." "Not good enough." I thought it'd be funny. Cathartic, even.</p>
            </Reveal>
            
            <Reveal delay={0.2}>
              <p className="mb-6">Normally, I'd write it in my notes app, open YouTube to search "how to make mobile games," get overwhelmed by 47-minute tutorials, and fall asleep. <Link to="/the-game-you-will-never-make" className="text-amber-400 underline decoration-amber-400/30 underline-offset-4 hover:decoration-amber-400 transition-colors">Another idea in the graveyard</Link>.</p>
            </Reveal>
            
            <Reveal delay={0.25}>
              <p className="mb-6">But this time, I tried something different. I'd downloaded this app that lets you describe what you want to make and it just... builds it. I was skeptical, but I typed:</p>
            </Reveal>

            {/* Quote */}
            <Reveal delay={0.3}>
              <div className="my-10 p-8 border-l-4 border-amber-400 bg-gradient-to-r from-amber-500/10 to-purple-500/5 rounded-r-2xl">
                <p className="text-xl font-medium text-white/90 leading-relaxed mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  "A simple game where you tap to dodge obstacles. The obstacles are words that float at you. Words like 'procrastination' and 'self-doubt' and 'next week.'"
                </p>
                <p className="text-sm text-white/40">— My actual first prompt, 11:14pm</p>
              </div>
            </Reveal>
            
            <Reveal delay={0.35}>
              <p className="mb-6">Five minutes later, I was playing it. On my phone. In my bed. The same bed where hundreds of ideas had gone to die.</p>
            </Reveal>

            {/* Visual Block - Idea to Reality */}
            <Reveal delay={0.37}>
              <div className="my-10">
                <img src="/assets/idea-to-reality.png" alt="From idea to playable thing in minutes" loading="lazy" className="w-full rounded-xl border border-white/10" />
                <p className="text-center text-sm text-white/40 mt-3 italic">From 147 dead ideas to one that exists. The difference? Friction.</p>
              </div>
            </Reveal>
            
            <Reveal delay={0.4}>
              <p className="mb-6"><strong className="text-white/90">I'd shipped something.</strong> It was small. It was silly. But it existed. And for the first time in years, I felt that rush of completion instead of the hollow ache of another abandoned project.</p>
            </Reveal>
          </div>
        </article>

        {/* Cinematic Break 2 */}
        <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/never-make-spark.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020206]/60 via-[#020206]/40 to-[#020206]/80" />
          <div className="relative z-10 text-center px-6">
            <h2 className="text-2xl md:text-4xl font-semibold text-white/95 leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              "I'd shipped something.<br />It was small. It was silly. But it existed."
            </h2>
          </div>
        </section>

        <article className="py-20 px-6">
          <div className="max-w-[700px] mx-auto">
            <Reveal>
              <h2 className="text-3xl font-semibold text-white/95 tracking-[-0.02em] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Your Ideas Deserve Better
              </h2>
            </Reveal>
            
            <Reveal delay={0.1}>
              <p className="mb-6">Look, I'm not going to pretend I've solved everything. I still have ideas that don't get made. I still procrastinate. I'm still lying in bed at 11pm more often than I should be.</p>
            </Reveal>
            
            <Reveal delay={0.15}>
              <p className="mb-6">But now, at least some of my ideas <em className="text-amber-400">make it out</em>. They become real things that I can show people, play with friends, or just look at and think "I made that."</p>
            </Reveal>
            
            <Reveal delay={0.2}>
              <p className="mb-6">Your ideas aren't the problem. The tools you've been trying to use are the problem. <Link to="/the-3am-scroll" className="text-amber-400 underline decoration-amber-400/30 underline-offset-4 hover:decoration-amber-400 transition-colors">The friction is the problem</Link>. And in 2026, there's no reason for that friction to exist anymore.</p>
            </Reveal>
            
            <Reveal delay={0.25}>
              <p className="mb-6">So here's my challenge to you: take one idea from your notes app. Just one. The silliest, smallest, most throwaway idea you've got. And instead of letting it rot for another year, try to make it real in under 10 minutes.</p>
            </Reveal>
            
            <Reveal delay={0.3}>
              <p className="mb-6 text-lg"><strong className="text-white/90">You might surprise yourself.</strong></p>
            </Reveal>

            {/* Visual Block - Two Paths */}
            <Reveal delay={0.35}>
              <div className="my-10">
                <img src="/assets/blog-two-paths-diagram.png" alt="Two paths: friction vs flow" loading="lazy" className="w-full rounded-xl border border-white/10" />
                <p className="text-center text-sm text-white/40 mt-3 italic">Two paths. Same idea. Which one leads somewhere?</p>
              </div>
            </Reveal>

            {/* CTA */}
            <Reveal>
              <div className="mt-16 py-16 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white/95 tracking-[-0.02em] mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Got 5 Minutes and a Dumb Idea?</h2>
                <p className="text-white/50 mb-10 max-w-md mx-auto">That's all you need. Describe what you want to make.<br />Watch it become real. Ship it to someone. Feel that rush.</p>
                <ExternalLink
                  href="https://play.google.com/store/apps/details?id=com.nextap.vibebrews"
                  className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-amber-400 to-orange-500 text-black font-semibold rounded-full hover:scale-105 transition-transform shadow-[0_20px_60px_rgba(245,158,11,0.25)]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  Try It Now — It's Free
                </ExternalLink>
                <p className="mt-4 text-sm text-white/30">(Seriously. 5 minutes. I timed it.)</p>
                <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm text-white/40">
                  <Link to="/the-3am-scroll" className="hover:text-white/70 underline decoration-transparent hover:decoration-white/30 underline-offset-4 transition-all">The 3AM scroll problem</Link>
                  <Link to="/productive-things-to-do-on-phone" className="hover:text-white/70 underline decoration-transparent hover:decoration-white/30 underline-offset-4 transition-all">Productive phone use</Link>
                  <Link to="/our-vision" className="hover:text-white/70 underline decoration-transparent hover:decoration-white/30 underline-offset-4 transition-all">Why we built this</Link>
                </div>
              </div>
            </Reveal>

            {/* Related */}
            <Reveal>
              <div className="mt-16 pt-12 border-t border-white/[0.06]">
                <h3 className="font-mono text-xs uppercase tracking-wider text-white/30 mb-8 text-center">Keep Reading</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Link to="/the-creative-block-is-a-lie" className="p-6 bg-white/[0.02] border border-white/[0.06] rounded-xl hover:bg-white/[0.04] transition-colors">
                    <h4 className="text-base font-medium text-white/90 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>The Creative Block is a Lie</h4>
                    <p className="text-sm text-white/40">You're not blocked. You're just using the wrong tools.</p>
                  </Link>
                  <Link to="/the-game-you-will-never-make" className="p-6 bg-white/[0.02] border border-white/[0.06] rounded-xl hover:bg-white/[0.04] transition-colors">
                    <h4 className="text-base font-medium text-white/90 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>The Game You'll Never Make</h4>
                    <p className="text-sm text-white/40">47 unfinished projects. Sound familiar?</p>
                  </Link>
                  <Link to="/the-3am-scroll" className="p-6 bg-white/[0.02] border border-white/[0.06] rounded-xl hover:bg-white/[0.04] transition-colors">
                    <h4 className="text-base font-medium text-white/90 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>The 3AM Scroll</h4>
                    <p className="text-sm text-white/40">What if you created something instead of consuming?</p>
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
