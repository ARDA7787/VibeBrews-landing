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

const stats = [
  { number: '47', label: 'YouTube tutorials watched' },
  { number: '12', label: 'Udemy courses started' },
  { number: '3', label: 'Udemy courses finished' },
  { number: '0', label: 'Original games completed' },
]

export default function WhyIQuitUnity() {
  useSEO({
    title: 'Why I Stopped Learning Unity - The Case for AI Game Creation | VibeBrews',
    description: 'After months learning Unity, I found a faster way to make games. Here\'s why AI game generators are changing the game for indie creators.',
    keywords: 'unity alternative, stop learning unity, ai game maker, indie game development, unity vs ai, game engine alternative',
    canonical: 'https://vibebrews.com/why-i-stopped-learning-unity',
  })

  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-white/60">
        {/* Hero */}
        <section className="min-h-[85vh] flex items-center justify-center relative overflow-hidden border-b border-white/[0.04]">
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{ scale: [1, 1.05, 1], x: [0, 30, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-[200px] -right-[100px] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-600/20 blur-[80px] opacity-[0.06]"
            />
            <motion.div
              animate={{ scale: [1, 0.95, 1], x: [0, -20, 0] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 5 }}
              className="absolute -bottom-[100px] -left-[100px] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-600/20 blur-[80px] opacity-[0.06]"
            />
          </div>
          
          <div className="text-center relative z-10 px-6 py-20">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[11px] font-semibold text-white/30 uppercase tracking-[0.12em] mb-6"
            >
              A Personal Story
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white/95 leading-[1.1] tracking-[-0.03em] mb-7"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Why I Stopped<br />Learning Unity
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl text-white/50 max-w-[540px] mx-auto leading-relaxed"
            >
              6 months. 47 YouTube tutorials. 12 Udemy courses started. Zero finished games. Here's the uncomfortable truth I wish someone told me earlier.
            </motion.p>
          </div>
        </section>

        {/* Article */}
        <article className="py-20 px-6">
          <div className="max-w-[700px] mx-auto">
            <Reveal>
              <p className="text-xl text-white/90 leading-relaxed mb-12">
                Let me be honest with you. I wasted six months of my life trying to learn Unity the "right way." And I have nothing to show for it except a folder full of half-finished tutorial projects that I'll never open again.
              </p>
            </Reveal>
            
            <Reveal delay={0.1}>
              <p className="mb-6">I'm not here to bash Unity. It's a powerful tool. Professional studios use it. Indies have shipped incredible games with it. The problem wasn't Unity.</p>
            </Reveal>
            
            <Reveal delay={0.15}>
              <p className="mb-12"><strong className="text-white/90">The problem was me thinking I needed Unity in the first place.</strong></p>
            </Reveal>

            {/* Quote Block */}
            <Reveal delay={0.2}>
              <div className="my-12 p-8 bg-white/[0.02] rounded-2xl border border-white/[0.06] relative">
                <span className="absolute top-4 left-6 text-5xl font-semibold text-white/10 leading-none">"</span>
                <p className="text-lg text-white/90 leading-relaxed italic relative z-[1]">
                  The interface looked like a spaceship control panel designed by someone who hates humans.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <h2 className="text-2xl font-semibold text-white/95 tracking-[-0.02em] mt-16 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                How it started
              </h2>
            </Reveal>
            
            <Reveal delay={0.1}>
              <p className="mb-6">I had this game idea. Simple, really. A maze game where gravity shifts when you tap the screen. Nothing crazy. I could see it clearly in my head—the smooth physics, the way the ball would roll, the satisfaction of solving each level.</p>
            </Reveal>
            
            <Reveal delay={0.15}>
              <p className="mb-6">So I did what everyone tells you to do: I googled "how to make a game."</p>
            </Reveal>
            
            <Reveal delay={0.2}>
              <p className="mb-6">Every result said the same thing. Learn Unity. Or Unreal. Or Godot. Pick an engine, watch tutorials, practice for a few months, and then—eventually—you'll be ready to make your actual game.</p>
            </Reveal>
            
            <Reveal delay={0.25}>
              <p className="mb-6">Seemed reasonable. I downloaded Unity.</p>
            </Reveal>
          </div>
        </article>

        {/* Cinematic Break 1 */}
        <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/blog-unity-frustration.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
          <div className="relative z-10 text-center px-6">
            <h2 className="text-2xl md:text-4xl font-semibold text-white/95 leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              "Six months. 200+ hours.<br />Nothing to show for it."
            </h2>
          </div>
        </section>

        <article className="py-20 px-6">
          <div className="max-w-[700px] mx-auto">
            <Reveal>
              <h2 className="text-2xl font-semibold text-white/95 tracking-[-0.02em] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                The numbers that broke me
              </h2>
            </Reveal>
            
            <Reveal delay={0.1}>
              <p className="mb-8">After six months, here's what I had accomplished:</p>
            </Reveal>

            {/* Stats Grid */}
            <Reveal delay={0.15}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-10">
                {stats.map((stat, i) => (
                  <div key={i} className="p-6 bg-white/[0.02] border border-white/[0.06] rounded-xl text-center">
                    <div className="text-3xl md:text-4xl font-semibold text-white/95 mb-2">{stat.number}</div>
                    <div className="text-xs text-white/40">{stat.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
            
            <Reveal delay={0.2}>
              <p className="mb-6">Zero. Not one game that was actually mine. Just clones of whatever the tutorial was teaching. Flappy bird clones. Platformer clones. Pong clones. But that gravity maze game I actually wanted to make? Still just an idea in my head.</p>
            </Reveal>
            
            <Reveal delay={0.25}>
              <p className="mb-12">And here's the thing that really hurt: I spent probably 200+ hours on this. That's a part-time job. Five hours a week for almost a year. And the result was... nothing I could show anyone.</p>
            </Reveal>

            <Reveal>
              <h2 className="text-2xl font-semibold text-white/95 tracking-[-0.02em] mt-16 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                The uncomfortable truth about "learning to code"
              </h2>
            </Reveal>
            
            <Reveal delay={0.1}>
              <p className="mb-6">We've been sold this idea that coding is the only "real" way to make things. That if you're not writing C# or JavaScript or Python, you're somehow cheating. That no-code tools are for people who aren't serious.</p>
            </Reveal>
            
            <Reveal delay={0.15}>
              <p className="mb-6">But think about it. Do photographers need to build their own cameras? Do musicians need to manufacture their own instruments? Do writers need to code their own word processors?</p>
            </Reveal>
            
            <Reveal delay={0.2}>
              <p className="mb-6">Of course not. <strong className="text-white/90">Tools are meant to get out of your way so you can create.</strong></p>
            </Reveal>
            
            <Reveal delay={0.25}>
              <p className="mb-6">The goal was never to learn Unity. The goal was to make a game. I had confused the tool with the outcome.</p>
            </Reveal>

            {/* Visual Block - Two Paths */}
            <Reveal delay={0.3}>
              <div className="my-10">
                <img src="/assets/blog-two-paths-diagram.png" alt="Two paths to game creation - the complicated traditional way versus the simple AI-powered way" loading="lazy" className="w-full rounded-xl border border-white/10" />
                <p className="text-center text-sm text-white/40 mt-3 italic">The old path vs. the new path.</p>
              </div>
            </Reveal>

            {/* Highlight Box */}
            <Reveal delay={0.35}>
              <div className="my-10 p-6 bg-white/[0.02] border-l-4 border-white/30 rounded-r-xl">
                <p className="text-white/90">Here's what nobody tells you: For most people who want to make games, learning a full game engine is like learning to build a car when all you wanted was to drive somewhere.</p>
              </div>
            </Reveal>
          </div>
        </article>

        {/* Cinematic Break 2 */}
        <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/blog-aha-moment.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
          <div className="relative z-10 text-center px-6">
            <h2 className="text-2xl md:text-4xl font-semibold text-white/95 leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              "Ninety seconds later,<br />I was playing my game."
            </h2>
          </div>
        </section>

        <article className="py-20 px-6">
          <div className="max-w-[700px] mx-auto">
            <Reveal>
              <h2 className="text-2xl font-semibold text-white/95 tracking-[-0.02em] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                What changed everything
              </h2>
            </Reveal>
            
            <Reveal delay={0.1}>
              <p className="mb-6">In late 2025, I stumbled across something called "vibe coding." People on Twitter were posting about making apps and games just by describing what they wanted. At first I thought it was a meme. Or some overhyped tech demo.</p>
            </Reveal>
            
            <Reveal delay={0.15}>
              <p className="mb-6">But I tried it. I opened an app called <Link to="/how-to-make-a-game-without-coding" className="text-white/90 underline decoration-white/30 underline-offset-4 hover:decoration-white/80 transition-colors">VibeBrews</Link> and typed: "A 3D maze game where gravity changes direction when you tap the screen."</p>
            </Reveal>
            
            <Reveal delay={0.2}>
              <p className="mb-6"><strong className="text-white/90">Ninety seconds later, I was playing my game.</strong></p>
            </Reveal>

            {/* Visual Block - Creation Flow */}
            <Reveal delay={0.25}>
              <div className="my-10">
                <img src="/assets/blog-creation-flow.png" alt="Game elements emerging from a phone screen during creation" loading="lazy" className="w-full rounded-xl border border-white/10" />
                <p className="text-center text-sm text-white/40 mt-3 italic">From idea to playable in 90 seconds.</p>
              </div>
            </Reveal>

            <Reveal>
              <h2 className="text-2xl font-semibold text-white/95 tracking-[-0.02em] mt-16 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                What I actually use now
              </h2>
            </Reveal>
            
            <Reveal delay={0.1}>
              <p className="mb-6">These days, when I have a game idea, I open VibeBrews on my phone. I describe what I want. I play it within a few minutes. If I like where it's going, I refine it. If not, I try something else.</p>
            </Reveal>
            
            <Reveal delay={0.15}>
              <p className="mb-6">In the last two months, I've made more games than I did in my entire six months of Unity tutorials. A racing game with shopping carts. A puzzle game where you connect colors. A simple shooter my nephews love playing when they visit.</p>
            </Reveal>
            
            <Reveal delay={0.2}>
              <p className="mb-6">Are these games going to win awards? Probably not. But they exist. People play them. And I actually enjoy the process of making them.</p>
            </Reveal>
            
            <Reveal delay={0.25}>
              <p className="mb-6">That's worth more to me than any amount of "proper" game development knowledge I could have accumulated.</p>
            </Reveal>

            {/* Visual Block - Learning Curve */}
            <Reveal delay={0.3}>
              <div className="my-10">
                <img src="/assets/blog-learning-curve.png" alt="Visual comparison of learning curves - traditional game development as a steep mountain, AI-assisted as a gentle hill" loading="lazy" className="w-full rounded-xl border border-white/10" />
                <p className="text-center text-sm text-white/40 mt-3 italic">The difference between "someday" and "today".</p>
              </div>
            </Reveal>
          </div>
        </article>

        {/* Cinematic Break 3 */}
        <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/blog-future-creation.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
          <div className="relative z-10 text-center px-6">
            <h2 className="text-2xl md:text-4xl font-semibold text-white/95 leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              "Your idea doesn't need six months<br />of preparation. It needs ninety seconds."
            </h2>
          </div>
        </section>

        <article className="py-20 px-6">
          <div className="max-w-[700px] mx-auto">
            <Reveal>
              <h2 className="text-2xl font-semibold text-white/95 tracking-[-0.02em] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                If this resonates with you
              </h2>
            </Reveal>
            
            <Reveal delay={0.1}>
              <p className="mb-6">Maybe you're stuck in tutorial hell right now. Maybe you have a folder full of half-finished projects. Maybe you have game ideas that have been sitting in your notes app for years because "someday" you'll learn to make them.</p>
            </Reveal>
            
            <Reveal delay={0.15}>
              <p className="mb-6">I'm not going to tell you what to do. But I will say this: there's no rule that says you have to suffer before you're allowed to create. There's no minimum hours of struggle required before your ideas deserve to exist.</p>
            </Reveal>
            
            <Reveal delay={0.2}>
              <p className="mb-6">Your game idea is valid. And maybe—just maybe—it doesn't need six months of preparation to become real.</p>
            </Reveal>
            
            <Reveal delay={0.25}>
              <p className="mb-12"><strong className="text-white/90">It might just need ninety seconds and the right tool.</strong></p>
            </Reveal>

            {/* Related Links */}
            <Reveal>
              <div className="mt-16 pt-12 border-t border-white/[0.06]">
                <h3 className="text-xs font-semibold text-white/30 uppercase tracking-[0.06em] mb-6">Keep reading</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link to="/how-to-make-a-game-without-coding" className="group flex items-center gap-4 p-5 bg-white/[0.02] border border-white/[0.06] rounded-xl hover:bg-white/[0.04] hover:translate-x-2 transition-all duration-300">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-white/90">How to Make a Game Without Coding</div>
                      <div className="text-xs text-white/40">Step-by-step guide for complete beginners</div>
                    </div>
                  </Link>
                  <Link to="/i-have-a-game-idea" className="group flex items-center gap-4 p-5 bg-white/[0.02] border border-white/[0.06] rounded-xl hover:bg-white/[0.04] hover:translate-x-2 transition-all duration-300">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-white/90">I Have a Game Idea</div>
                      <div className="text-xs text-white/40">Turn your concept into reality today</div>
                    </div>
                  </Link>
                  <Link to="/our-vision" className="group flex items-center gap-4 p-5 bg-white/[0.02] border border-white/[0.06] rounded-xl hover:bg-white/[0.04] hover:translate-x-2 transition-all duration-300">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-white/90">Our Vision</div>
                      <div className="text-xs text-white/40">Why we believe everyone can be a creator</div>
                    </div>
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* CTA */}
            <Reveal>
              <div className="mt-16 p-12 text-center bg-white/[0.02] border border-white/[0.06] rounded-2xl">
                <h2 className="text-2xl md:text-3xl font-semibold text-white/95 tracking-[-0.02em] mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Ready to try a different way?</h2>
                <p className="text-white/50 mb-8">Skip the tutorials. Make your game idea real in the next 5 minutes.</p>
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
              <Link to="/productive-things-to-do-on-phone" className="hover:text-white/70 transition-colors">Productive Play</Link>
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
