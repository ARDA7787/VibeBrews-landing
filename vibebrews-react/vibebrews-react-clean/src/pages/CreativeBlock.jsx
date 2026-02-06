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

export default function CreativeBlock() {
  useSEO({
    title: 'The Creative Block is a Lie - How to Unlock Your Creativity | VibeBrews',
    description: 'Creative block isn\'t real. Learn why you\'re stuck and how to break through with actionable strategies for indie creators and game developers.',
    keywords: 'creative block, creativity tips, indie creator motivation, game development inspiration, overcome creative block',
    canonical: 'https://vibebrews.com/the-creative-block-is-a-lie',
  })
  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-white/60">
        {/* Hero */}
        <section className="min-h-[85vh] flex items-center justify-center relative overflow-hidden border-b border-white/[0.04]">
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
              transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-500/10 to-cyan-500/10 blur-[100px]"
            />
          </div>
          
          <div className="text-center relative z-10 px-6 py-20 max-w-3xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white/95 leading-[1.1] tracking-[-0.03em] mb-8"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              The Creative Block is a Lie.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl text-white/50 leading-relaxed"
            >
              I was sitting in a café in Hamburg yesterday. It was raining. Obviously. I was staring at my cold brew, thinking about how complicated we make things.
            </motion.p>
          </div>
        </section>

        {/* Article */}
        <article className="py-20 px-6">
          <div className="max-w-[700px] mx-auto">
            <Reveal>
              <p className="mb-6 text-lg leading-relaxed">We tell ourselves we need "inspiration". We need "skills". We need to learn C# or Unity or Unreal Engine 5 just to make a simple game where a cat knocks over a vase.</p>
            </Reveal>
            
            <Reveal delay={0.1}>
              <p className="mb-12 text-lg leading-relaxed"><span className="text-white/95 font-semibold">It is complete nonsense.</span></p>
            </Reveal>

            <Reveal>
              <h2 className="text-2xl font-semibold text-white/95 tracking-[-0.02em] mt-16 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                The "Expert" Trap
              </h2>
            </Reveal>
            
            <Reveal delay={0.1}>
              <p className="mb-6">You know the feeling. You have an idea. A good one. Maybe it's a game about managing a space station, or a simple puzzle game.</p>
            </Reveal>
            
            <Reveal delay={0.15}>
              <p className="mb-6">Then you Google "how to make a game".</p>
            </Reveal>
            
            <Reveal delay={0.2}>
              <p className="mb-6">You see diagrams. You see 40-hour tutorials on YouTube. You see people arguing about "clean code" and "architecture".</p>
            </Reveal>
            
            <Reveal delay={0.25}>
              <p className="mb-6">And you stop. You think, "I am not smart enough for this." or "I don't have time."</p>
            </Reveal>
            
            <Reveal delay={0.3}>
              <p className="mb-6">This is the trap. The industry <em className="text-white/80">wants</em> you to think it's hard. It keeps the gatekeepers in charge.</p>
            </Reveal>

            {/* Visual Block - Two Paths */}
            <Reveal delay={0.35}>
              <div className="my-10">
                <img src="/assets/blog-two-paths-diagram.png" alt="Complex Blueprint" loading="lazy" className="w-full rounded-xl border border-white/10" />
                <p className="text-center text-sm text-white/40 mt-3 italic">The old path: complexity for its own sake.</p>
              </div>
            </Reveal>

            <Reveal>
              <h2 className="text-2xl font-semibold text-white/95 tracking-[-0.02em] mt-16 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                I Built a Universe in 4 Minutes
              </h2>
            </Reveal>
            
            <Reveal delay={0.1}>
              <p className="mb-6">I challenged myself. I downloaded this app, <strong className="text-white/90">VibeBrews</strong>. I didn't want to like it. I'm a purist. I like my mechanical keyboard and my terminal.</p>
            </Reveal>
            
            <Reveal delay={0.15}>
              <p className="mb-6">But I typed: <em className="text-white/80">"A multiplayer game where players are asteroids trying to avoid being mined by spaceships."</em></p>
            </Reveal>
            
            <Reveal delay={0.2}>
              <p className="mb-6">In 4 minutes, I was playing it. On my phone. With a guy from Brazil who joined the lobby randomly.</p>
            </Reveal>
            
            <Reveal delay={0.25}>
              <p className="mb-6">No compiling. No bugs. No "syntax error on line 45". Just the game.</p>
            </Reveal>

            {/* Visual Block - The Spark */}
            <Reveal delay={0.3}>
              <div className="my-10">
                <img src="/assets/blog-sketching-spark.png" alt="The Spark" loading="lazy" className="w-full rounded-xl border border-white/10" />
                <p className="text-center text-sm text-white/40 mt-3 italic">From idea to playable in 4 minutes.</p>
              </div>
            </Reveal>

            <Reveal>
              <h2 className="text-2xl font-semibold text-white/95 tracking-[-0.02em] mt-16 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Why You Are Scared
              </h2>
            </Reveal>
            
            <Reveal delay={0.1}>
              <p className="mb-6">It's not about the code. It's about the vulnerability. If you can create anything instantly, you have no excuse for creating nothing.</p>
            </Reveal>
            
            <Reveal delay={0.15}>
              <p className="mb-6">Tools like Cursor (yes, the editor) and VibeBrews are stripping away the technical excuses. We are left naked with our creativity.</p>
            </Reveal>
            
            <Reveal delay={0.2}>
              <p className="mb-6">And that is terrifying. But it is also liberating.</p>
            </Reveal>

            {/* Visual Block - Connection */}
            <Reveal delay={0.25}>
              <div className="my-10">
                <img src="/assets/vision-connection.png" alt="Network" loading="lazy" className="w-full rounded-xl border border-white/10" />
                <p className="text-center text-sm text-white/40 mt-3 italic">The new reality: ideas flow directly into existence.</p>
              </div>
            </Reveal>

            {/* CTA */}
            <Reveal>
              <div className="mt-16 p-12 text-center bg-white/[0.02] border border-white/[0.06] rounded-2xl">
                <h2 className="text-2xl md:text-3xl font-semibold text-white/95 tracking-[-0.02em] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Stop Thinking. Start Playing.</h2>
                <p className="text-white/50 mb-8">You don't need to be a "developer". You just need to be a person with an idea.</p>
                <p className="text-white/50 mb-8">The barrier is gone. The gate is open. The only thing standing in your way is your own ego telling you it "should" be harder.</p>
                <p className="text-white/50 mb-8">It shouldn't.</p>
                <ExternalLink
                  href="https://play.google.com/store/apps/details?id=com.nextap.vibebrews"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-all"
                >
                  Prove Me Wrong (Download App)
                </ExternalLink>
                <p className="mt-4 text-xs text-white/30">(If you don't make a game in 5 minutes, you can email me and tell me I'm a liar.)</p>
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
              <Link to="/the-game-you-will-never-make" className="hover:text-white/70 transition-colors">The Game You'll Never Make</Link>
            </nav>
            <p className="text-xs text-white/30">© 2026 VibeBrews. A product by <ExternalLink href="https://www.linkedin.com/company/nextap-ai/" className="underline hover:text-white/50 transition-colors">Nextap AI</ExternalLink></p>
          </div>
        </footer>
      </div>
    </PageTransition>
  )
}
