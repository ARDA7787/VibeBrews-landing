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

export default function ProductivePlay() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-[#050505] text-white/60">
        {/* Hero */}
        <section className="min-h-[85vh] flex items-center justify-center relative overflow-hidden border-b border-white/[0.04]">
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-green-500/15 to-emerald-600/15 blur-[100px] opacity-20"
            />
          </div>
          
          <div className="text-center relative z-10 px-6 py-20">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[11px] font-semibold text-green-400 uppercase tracking-[0.12em] mb-6"
            >
              Perspective
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white/95 leading-[1.1] tracking-[-0.03em] mb-7"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Productive Things to Do<br />on Your Phone
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl text-white/50 max-w-[540px] mx-auto leading-relaxed"
            >
              Transform screen time from consumption to creation. Your phone isn't the enemy — how you use it is.
            </motion.p>
          </div>
        </section>

        {/* Article */}
        <article className="py-20 px-6">
          <div className="max-w-[700px] mx-auto">
            <Reveal>
              <p className="text-xl text-white/90 leading-relaxed mb-12">
                We spend hours on our phones each day. Most of it feels empty afterward—endless scrolling, passive consumption, algorithmic feeds designed to capture attention rather than create value. But what if your phone could be a tool for creation instead of just consumption?
              </p>
            </Reveal>
            
            <Reveal delay={0.1}>
              <p className="mb-6">The same device that can trap you in dopamine loops can also be the platform where you build something meaningful. The question isn't whether to use your phone—it's how.</p>
            </Reveal>

            <Reveal>
              <h2 className="text-2xl font-semibold text-white/95 tracking-[-0.02em] mt-16 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                The shift from consumer to creator
              </h2>
            </Reveal>
            
            <Reveal delay={0.1}>
              <p className="mb-6">There's a fundamental difference between using technology to consume and using it to create. Consumption is passive—it fills time but rarely fulfills. Creation requires engagement, decision-making, problem-solving. It leaves you with something that didn't exist before.</p>
            </Reveal>
            
            <Reveal delay={0.15}>
              <p className="mb-6">The tools for mobile creation have exploded in recent years. You can edit videos, produce music, design graphics, write code—all from your phone. But one category has been notably absent: game creation.</p>
            </Reveal>
            
            <Reveal delay={0.2}>
              <p className="mb-6">Until now, making games required desktop computers, expensive software, and years of specialized training. The most interactive medium was ironically the hardest to create on the go. <Link to="/our-vision" className="text-white/90 underline decoration-white/30 underline-offset-4 hover:decoration-white/80 transition-colors">That's exactly what we're changing</Link>.</p>
            </Reveal>
          </div>
        </article>

        {/* Hero Cinematic */}
        <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden my-20">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/blog-hero-break-free.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-[#050505]/40 to-[#050505]/80" />
          <div className="relative z-10 text-center px-6">
            <p className="text-xs text-white/50 uppercase tracking-wider mb-2">The shift</p>
            <h3 className="text-2xl md:text-3xl font-semibold text-white/95" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              From passive consumer to active creator
            </h3>
          </div>
        </section>

        <article className="py-20 px-6">
          <div className="max-w-[700px] mx-auto">
            {/* 1. Language Learning */}
            <Reveal>
              <div className="mb-16">
                <span className="text-xs text-white/40 uppercase tracking-wider">01 — Learn</span>
                <h2 className="text-2xl font-semibold text-white/95 tracking-[-0.02em] mt-2 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Steal 5 Minutes. Learn a Language.
                </h2>
                <p className="mb-4">Forget the 30-day streak pressure. The new wave of language learning is all about <em className="text-white/80">micro-immersion</em>—tiny, daily doses that actually stick because they're fun.</p>
                <p className="mb-4">Open Duolingo while waiting for coffee. Chat with AI voice assistants in Spanish. Watch a 3-minute clip on YouTube with subtitles in your target language. It feels like scrolling TikTok, except your brain is quietly building new neural pathways.</p>
                <p className="mb-6">The secret? <strong className="text-white/90">Consistency beats intensity</strong>. 5 minutes daily crushes 2-hour weekend cram sessions.</p>
                <div className="my-8">
                  <img src="/assets/blog-language-learning.png" alt="Abstract neural pathways representing language learning" loading="lazy" className="w-full rounded-xl border border-white/10" />
                </div>
              </div>
            </Reveal>

            {/* 2. Digital Gardening */}
            <Reveal delay={0.1}>
              <div className="mb-16">
                <span className="text-xs text-white/40 uppercase tracking-wider">02 — Organize</span>
                <h2 className="text-2xl font-semibold text-white/95 tracking-[-0.02em] mt-2 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Garden Your Gallery
                </h2>
                <p className="mb-4">Your camera roll is probably chaos—3,000 screenshots, that meme from 2019, and somewhere in there, actual memories you care about.</p>
                <p className="mb-4">Spend 10 minutes "digital gardening." Create albums by year, trip, or person. Delete the blurry duplicates. Use Google Photos or Apple's built-in tools to auto-sort by faces and locations.</p>
                <p className="mb-6">It's oddly meditative—like cleaning your room, but you keep stumbling across moments you'd completely forgotten. That random Tuesday sunset. Your friend's terrible haircut phase. Gold.</p>
                <div className="my-8">
                  <img src="/assets/blog-photo-organization.png" alt="Organized digital memories floating in space" loading="lazy" className="w-full rounded-xl border border-white/10" />
                </div>
              </div>
            </Reveal>

            {/* 3. Voice Memos */}
            <Reveal delay={0.15}>
              <div className="mb-16">
                <span className="text-xs text-white/40 uppercase tracking-wider">03 — Capture</span>
                <h2 className="text-2xl font-semibold text-white/95 tracking-[-0.02em] mt-2 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Talk to Yourself (Seriously)
                </h2>
                <p className="mb-4">Writing feels like homework. But talking? That's just... talking.</p>
                <p className="mb-4">Open your voice memo app and ramble for 3 minutes. About your day. A shower thought. That weird dream you had. A business idea that hit you at 2am.</p>
                <p className="mb-4">Voice captures emotion in ways text can't. The enthusiasm, the hesitation, the random tangent that turns out to be the actual insight. Some people use Otter.ai to auto-transcribe their voice notes into searchable text.</p>
                <p className="mb-6"><strong className="text-white/90">Bonus:</strong> It's the fastest way to "write" a book. Talk for 30 minutes a day, transcribe, edit. Authors have published novels this way.</p>
                <div className="my-8">
                  <img src="/assets/blog-voice-notes.png" alt="Sound waves transforming into thoughts" loading="lazy" className="w-full rounded-xl border border-white/10" />
                </div>
              </div>
            </Reveal>
          </div>
        </article>

        {/* Mid Cinematic - Framed */}
        <div className="max-w-[900px] mx-auto px-6 my-20">
          <Reveal>
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <img src="/assets/blog-music-flow.png" alt="Abstract visualization of music and emotion" loading="lazy" className="w-full aspect-video object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-10 text-center">
                <p className="text-xs text-white/50 uppercase tracking-wider mb-2">Curate</p>
                <p className="text-xl font-medium text-white/95" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Build the soundtrack to your life</p>
              </div>
            </div>
          </Reveal>
        </div>

        <article className="py-20 px-6">
          <div className="max-w-[700px] mx-auto">
            {/* 4. Soundscapes */}
            <Reveal>
              <div className="mb-16">
                <span className="text-xs text-white/40 uppercase tracking-wider">04 — Create</span>
                <h2 className="text-2xl font-semibold text-white/95 tracking-[-0.02em] mt-2 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Architect Your Mood
                </h2>
                <p className="mb-4">Stop letting algorithms decide your soundtrack. <em className="text-white/80">You</em> build it.</p>
                <p className="mb-4">Open Spotify or Apple Music and create hyper-specific playlists: "Deep Work at 11pm," "Sunday Morning Slow," "Walking Through Rain," "Pretending I'm in a Movie."</p>
                <p className="mb-6">The act of selecting songs is a form of emotional curation. You're not just listening—you're designing how you want to feel. That's creative work.</p>
                <div className="my-8">
                  <img src="/assets/blog-music-flow.png" alt="Abstract musical flow" loading="lazy" className="w-full rounded-xl border border-white/10" />
                </div>
              </div>
            </Reveal>

            {/* 5. Sketching */}
            <Reveal delay={0.1}>
              <div className="mb-16">
                <span className="text-xs text-white/40 uppercase tracking-wider">05 — Draw</span>
                <h2 className="text-2xl font-semibold text-white/95 tracking-[-0.02em] mt-2 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Doodle Without Judgment
                </h2>
                <p className="mb-4">You don't need to be Picasso. Download something simple like Procreate Pocket or even use your Notes app, and just... draw what you see.</p>
                <p className="mb-4">The coffee cup on your desk. A logo idea. Your cat looking judgmental. The goal isn't a masterpiece—it's training your eyes to actually <em className="text-white/80">look</em> at the world around you.</p>
                <p className="mb-6">Studies show sketching improves memory and problem-solving. Your brain processes things differently when your hands are involved. Plus, it's weirdly addictive once you start.</p>
                <div className="my-8">
                  <img src="/assets/blog-sketching-spark.png" alt="Digital sketching sparks creativity" loading="lazy" className="w-full rounded-xl border border-white/10" />
                </div>
              </div>
            </Reveal>

            {/* 6. Micro-Fiction */}
            <Reveal delay={0.15}>
              <div className="mb-16">
                <span className="text-xs text-white/40 uppercase tracking-wider">06 — Write</span>
                <h2 className="text-2xl font-semibold text-white/95 tracking-[-0.02em] mt-2 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Tell a Story in 280 Characters
                </h2>
                <p className="mb-4">Constraints breed creativity. Challenge yourself to write a complete story—beginning, middle, end—in the length of a tweet.</p>
                <p className="mb-4">"She kept the note in her wallet for years. Unfolded it once a month. It just said: 'You're going to be fine.' Turns out, she was."</p>
                <p className="mb-6">That's 176 characters. A whole emotional arc. Try posting on X (Twitter) or keep a private collection. It's a puzzle for your imagination—and you get better shockingly fast.</p>
                <div className="my-8">
                  <img src="/assets/blog-writing-flow.png" alt="Words flowing into stories" loading="lazy" className="w-full rounded-xl border border-white/10" />
                </div>
              </div>
            </Reveal>

            {/* 7. Logic Puzzles */}
            <Reveal delay={0.2}>
              <div className="mb-16">
                <span className="text-xs text-white/40 uppercase tracking-wider">07 — Think</span>
                <h2 className="text-2xl font-semibold text-white/95 tracking-[-0.02em] mt-2 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Wake Your Brain Up
                </h2>
                <p className="mb-4">Not all phone games are created equal. The ones that play themselves while bombarding you with ads? Skip. The ones that make your neurons actually fire? Gold.</p>
                <p className="mb-4">Try Chess, Sudoku, or spatial puzzle games like Monument Valley. These are the digital equivalent of a cold shower for your brain—you walk away sharper, not foggier.</p>
                <p className="mb-6">The difference between a good puzzle game and a bad one: does it feel like you're <em className="text-white/80">solving</em> something, or just tapping?</p>
                <div className="my-8">
                  <img src="/assets/blog-logic-puzzles.png" alt="Geometric brain puzzles" loading="lazy" className="w-full rounded-xl border border-white/10" />
                </div>
              </div>
            </Reveal>
          </div>
        </article>

        {/* Featured: Game Creation Cinematic */}
        <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden my-20">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/blog-game-creation.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-[#050505]/40 to-[#050505]/80" />
          <div className="relative z-10 text-center px-6">
            <p className="text-xs text-white/50 uppercase tracking-wider mb-2">The ultimate level</p>
            <h3 className="text-2xl md:text-3xl font-semibold text-white/95" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Stop playing. Start building.
            </h3>
          </div>
        </section>

        <article className="py-20 px-6">
          <div className="max-w-[700px] mx-auto">
            {/* 8. Game Creation */}
            <Reveal>
              <div className="mb-16">
                <span className="text-xs text-white/40 uppercase tracking-wider">08 — Build</span>
                <h2 className="text-2xl font-semibold text-white/95 tracking-[-0.02em] mt-2 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Make Your Own Game
                </h2>
                <p className="mb-4">This is the endgame of productive phone use. Literally.</p>
                <p className="mb-4">With AI tools like VibeBrews, you don't need to know a single line of code. Describe what you're imagining—"a puzzle game where gravity shifts every 10 seconds" or "a racing game where you're a shopping cart"—and you're playing it within minutes.</p>
                <p className="mb-4">It's the feeling of building with Lego, except unlimited. You're not consuming someone else's vision; you're creating your own. You can tweak the physics, redesign the levels, share it with friends.</p>
                <p className="mb-6">And here's the real magic: when you switch from player to creator, games stop feeling like a guilty pleasure. They become a craft.</p>
                <div className="my-8">
                  <img src="/assets/blog-game-creation.png" alt="Creating games from imagination" loading="lazy" className="w-full rounded-xl border border-white/10" />
                </div>
              </div>
            </Reveal>

            {/* The Mindset Shift */}
            <Reveal delay={0.1}>
              <div className="mb-16">
                <h2 className="text-2xl font-semibold text-white/95 tracking-[-0.02em] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  The Mindset Shift
                </h2>
                <p className="mb-4">Next time you have 10 minutes to kill—in line, on the bus, waiting for food—pause before you open that social app. Ask yourself:</p>
                <p className="mb-4"><strong className="text-white/90">"Do I want to consume... or create?"</strong></p>
                <p className="mb-4">Both are fine sometimes. But choosing creation—even in small, silly, imperfect ways—is how you reclaim your time, your attention, and maybe even your sense of self.</p>
                <p className="mb-6">The phone is just a tool. What you do with it determines how you feel when you put it down.</p>
                <div className="my-8">
                  <img src="/assets/blog-conclusion-spark.png" alt="Spark of creativity igniting" loading="lazy" className="w-full rounded-xl border border-white/10" />
                </div>
              </div>
            </Reveal>

            {/* Related Links */}
            <Reveal>
              <div className="mt-16 pt-12 border-t border-white/[0.06]">
                <h3 className="text-xs font-semibold text-white/30 uppercase tracking-[0.06em] mb-6">Keep reading</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link to="/how-to-make-a-game-without-coding" className="group flex items-center gap-4 p-5 bg-white/[0.02] border border-white/[0.06] rounded-xl hover:bg-white/[0.04] hover:translate-x-2 transition-all duration-300">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-white/90">How to Make Games</div>
                      <div className="text-xs text-white/40">Start creating today</div>
                    </div>
                  </Link>
                  <Link to="/i-have-a-game-idea" className="group flex items-center gap-4 p-5 bg-white/[0.02] border border-white/[0.06] rounded-xl hover:bg-white/[0.04] hover:translate-x-2 transition-all duration-300">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-white/90">I Have an Idea</div>
                      <div className="text-xs text-white/40">Turn ideas into reality</div>
                    </div>
                  </Link>
                  <Link to="/the-3am-scroll" className="group flex items-center gap-4 p-5 bg-white/[0.02] border border-white/[0.06] rounded-xl hover:bg-white/[0.04] hover:translate-x-2 transition-all duration-300">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-white/90">The 3AM Scroll</div>
                      <div className="text-xs text-white/40">Breaking the cycle</div>
                    </div>
                  </Link>
                  <Link to="/the-creative-block-is-a-lie" className="group flex items-center gap-4 p-5 bg-white/[0.02] border border-white/[0.06] rounded-xl hover:bg-white/[0.04] hover:translate-x-2 transition-all duration-300">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-white/90">The Creative Block is a Lie</div>
                      <div className="text-xs text-white/40">You're not blocked, just constrained</div>
                    </div>
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* CTA */}
            <Reveal>
              <div className="mt-16 p-12 text-center bg-white/[0.02] border border-white/[0.06] rounded-2xl">
                <h2 className="text-2xl md:text-3xl font-semibold text-white/95 tracking-[-0.02em] mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Ready to create instead of consume?</h2>
                <p className="text-white/50 mb-8">Five minutes. One idea. Zero excuses.</p>
                <ExternalLink
                  href="https://play.google.com/store/apps/details?id=com.nextap.vibebrews"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-all"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  Download VibeBrews Free
                </ExternalLink>
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
