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

export default function The3amScroll() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-[#020206] text-white/60">
        {/* Hero */}
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.15, 0.08] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[600px] bg-gradient-to-b from-blue-500 to-purple-500 blur-[100px] rounded-full"
            />
          </div>
          
          <div className="text-center relative z-10 px-6 py-20">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-xs text-red-400 uppercase tracking-[0.2em] mb-6"
            >
              Personal / Jan 26, 2026
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-7xl md:text-9xl font-bold text-blue-500 mb-6"
              style={{ textShadow: '0 0 80px rgba(65,105,225,0.5)' }}
            >
              3:17
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white/95 leading-[1.1] tracking-[-0.03em] mb-8"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Why You Can't Stop.<br />
              (And What Finally Worked)
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl text-white/50 max-w-[550px] mx-auto leading-relaxed mb-10"
            >
              4 hours gone. Nothing to show for it. That hollow feeling in your chest.<br />
              I lived this every night. Until I didn't.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center gap-5 text-sm text-white/40"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">MC</div>
                <span>Marcus Chen</span>
              </div>
              <span>•</span>
              <span>9 min read</span>
            </motion.div>
          </div>
        </section>

        {/* Article */}
        <article className="py-20 px-6">
          <div className="max-w-[700px] mx-auto">
            <Reveal>
              <h2 className="text-3xl font-semibold text-white/95 tracking-[-0.02em] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                I Know This Feeling
              </h2>
            </Reveal>
            
            <Reveal delay={0.1}>
              <p className="mb-6 text-lg leading-relaxed">It's 3AM. You said you'd go to bed hours ago. But you're still here, thumb moving on autopilot, heart rate slightly elevated from nothing in particular.</p>
            </Reveal>
            
            <Reveal delay={0.15}>
              <p className="mb-6 text-lg leading-relaxed">Scroll. Someone's holiday photos. Scroll. A recipe you'll never make. Scroll. Drama about people you don't know. Scroll. A reel that's mildly amusing. Scroll. Repeat.</p>
            </Reveal>
            
            <Reveal delay={0.2}>
              <p className="mb-6 text-lg leading-relaxed"><strong className="text-white/90">Then you lock your phone.</strong></p>
            </Reveal>
            
            <Reveal delay={0.25}>
              <p className="mb-6 text-lg leading-relaxed">And there it is. That hollow feeling. Like you've eaten fast food for the soul. Technically full, deeply unsatisfied.</p>
            </Reveal>
            
            <Reveal delay={0.3}>
              <p className="mb-12 text-lg leading-relaxed">I know because I lived this for three years. Brisbane to Sydney for work, hotel rooms every week, and that glowing rectangle my only companion at 3AM.</p>
            </Reveal>

            <Reveal>
              <h2 className="text-3xl font-semibold text-white/95 tracking-[-0.02em] mt-16 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Your Brain Isn't Broken. It's Hijacked.
              </h2>
            </Reveal>
            
            <Reveal delay={0.1}>
              <p className="mb-6">Let's be honest about what's happening. Every app on your phone has a team of PhDs whose entire job is to keep you scrolling. They've studied slot machines, they've mapped your dopamine pathways, and they've optimised every pixel for addiction.</p>
            </Reveal>

            {/* Stat */}
            <Reveal delay={0.15}>
              <div className="my-10 p-8 flex items-center gap-6 bg-gradient-to-r from-red-500/10 to-purple-500/5 border border-red-500/20 rounded-2xl">
                <div className="text-5xl font-bold text-red-400" style={{ textShadow: '0 0 30px rgba(255,71,87,0.5)' }}>2,617</div>
                <div>
                  <p className="text-white/90 font-medium mb-1">Average daily phone touches</p>
                  <p className="text-sm text-white/50">That's once every 33 seconds of waking life. You're not weak. You're outgunned.</p>
                </div>
              </div>
            </Reveal>
            
            <Reveal delay={0.2}>
              <p className="mb-6">The feeds are designed for one thing: <em className="text-cyan-400">consumption without completion</em>. There's no end. No satisfaction point. Just an infinite scroll into the void.</p>
            </Reveal>

            {/* Visual Block - Dopamine Cycle */}
            <Reveal delay={0.22}>
              <div className="my-10">
                <img src="/assets/3am-dopamine-cycle.png" alt="The dopamine consumption loop" loading="lazy" className="w-full rounded-xl border border-white/10" />
                <p className="text-center text-sm text-white/40 mt-3 italic">Fig 1. The consumption loop. Notice there's no exit.</p>
              </div>
            </Reveal>
            
            <Reveal delay={0.25}>
              <p className="mb-6">That's the trick. Passive consumption gives you tiny hits of dopamine — just enough to keep you scrolling, never enough to feel complete. It's the <Link to="/the-creative-block-is-a-lie" className="text-cyan-400 underline decoration-cyan-400/30 underline-offset-4 hover:decoration-cyan-400 transition-colors">opposite of creation</Link>.</p>
            </Reveal>
          </div>
        </article>

        {/* Cinematic Break 1 */}
        <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/3am-void-scroll.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020206]/60 via-[#020206]/40 to-[#020206]/80" />
          <div className="relative z-10 text-center px-6">
            <h2 className="text-2xl md:text-4xl font-semibold text-white/95 leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              "I was consuming 4 hours a night.<br />I had nothing to show for any of it."
            </h2>
          </div>
        </section>

        <article className="py-20 px-6">
          <div className="max-w-[700px] mx-auto">
            <Reveal>
              <h2 className="text-3xl font-semibold text-white/95 tracking-[-0.02em] mt-16 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                The Night Everything Changed
              </h2>
            </Reveal>
            
            <Reveal delay={0.1}>
              <p className="mb-6">July 2025. Another hotel. Another 3AM. I'd just spent two hours watching strangers argue about things I'd forget by morning.</p>
            </Reveal>
            
            <Reveal delay={0.15}>
              <p className="mb-6">I put my phone down and stared at the ceiling. And I asked myself a question that hit harder than I expected:</p>
            </Reveal>

            {/* Quote */}
            <Reveal delay={0.2}>
              <div className="my-10 p-8 border-l-4 border-purple-500 bg-gradient-to-r from-purple-500/10 to-blue-500/5 rounded-r-2xl">
                <p className="text-xl font-medium text-white/90 leading-relaxed mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  "What if I spent those 2 hours making something instead of watching something?"
                </p>
                <p className="text-sm text-white/40">— Me, to the hotel ceiling</p>
              </div>
            </Reveal>
            
            <Reveal delay={0.25}>
              <p className="mb-6">The next night, I tried it. I found this app that lets you describe an idea and it... builds it. I was skeptical. But I typed something stupid: <em className="text-cyan-400">"A game where you're a drop of water trying to reach the ocean before you evaporate."</em></p>
            </Reveal>
            
            <Reveal delay={0.3}>
              <p className="mb-6">Four minutes later, I was playing it. On my phone. In a Brisbane hotel room.</p>
            </Reveal>
            
            <Reveal delay={0.35}>
              <p className="mb-6"><strong className="text-white/90">I'd made something.</strong></p>
            </Reveal>
            
            <Reveal delay={0.4}>
              <p className="mb-12">And here's the thing that surprised me: I wasn't tired anymore. I wasn't hollow. I was... energised? At 3AM?</p>
            </Reveal>

            <Reveal>
              <h2 className="text-3xl font-semibold text-white/95 tracking-[-0.02em] mt-16 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Creation vs Consumption: The Dopamine Difference
              </h2>
            </Reveal>
            
            <Reveal delay={0.1}>
              <p className="mb-6">I started digging into why this felt so different. Turns out, neuroscience has an answer.</p>
            </Reveal>
            
            <Reveal delay={0.15}>
              <p className="mb-6"><strong className="text-white/90">Passive consumption</strong> (scrolling, watching) triggers small, fleeting dopamine hits. Like empty calories. You keep chasing, never satisfied.</p>
            </Reveal>
            
            <Reveal delay={0.2}>
              <p className="mb-6"><strong className="text-white/90">Active creation</strong> triggers something different: a sense of completion, accomplishment, meaning. It's the same reason cooking a meal feels different from ordering takeaway. Even if the takeaway is "better."</p>
            </Reveal>

            {/* Visual Block - Creation vs Consumption */}
            <Reveal delay={0.22}>
              <div className="my-10">
                <img src="/assets/3am-creation-vs-consumption.png" alt="Brain activity: creation vs consumption" loading="lazy" className="w-full rounded-xl border border-white/10" />
                <p className="text-center text-sm text-white/40 mt-3 italic">Fig 2. Same time investment. Completely different outcome.</p>
              </div>
            </Reveal>

            {/* Insight Box */}
            <Reveal delay={0.25}>
              <div className="my-10 p-6 bg-gradient-to-r from-cyan-500/10 to-purple-500/5 border border-cyan-500/20 rounded-xl">
                <p className="font-mono text-xs uppercase tracking-wider text-cyan-400 mb-3">Key Insight</p>
                <p className="text-white/90">The cure for mindless consumption isn't willpower. It's replacement. Your brain craves stimulation — give it stimulation that leaves you feeling full, not hollow.</p>
              </div>
            </Reveal>
            
            <Reveal delay={0.3}>
              <p className="mb-6">I wasn't addicted to my phone. I was addicted to stimulation. The phone was just the delivery mechanism. And what I discovered was: creation scratches the same itch, but leaves you satisfied instead of empty.</p>
            </Reveal>
          </div>
        </article>

        {/* Cinematic Break 2 */}
        <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/3am-spark-creation.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020206]/60 via-[#020206]/40 to-[#020206]/80" />
          <div className="relative z-10 text-center px-6">
            <h2 className="text-2xl md:text-4xl font-semibold text-white/95 leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              "I wasn't tired anymore.<br />I was energised. At 3AM."
            </h2>
          </div>
        </section>

        <article className="py-20 px-6">
          <div className="max-w-[700px] mx-auto">
            {/* 7 Days Later Section */}
            <Reveal>
              <h2 className="text-3xl font-semibold text-white/95 tracking-[-0.02em] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                7 Days Later
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mb-6">I gave myself a challenge: one week. Every time I felt the urge to scroll, I'd open a creation app instead. Didn't matter what. Write a sentence. Sketch something. Make a weird little game about my commute.</p>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mb-6">Here's what my nights looked like:</p>
            </Reveal>

            {/* Timeline Comparison */}
            <Reveal delay={0.2}>
              <div className="my-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-xl">
                  <h4 className="text-lg font-semibold text-red-400 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Before</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-3"><span className="text-white/40 font-mono">11PM</span><span>"Just 5 minutes of TikTok"</span></li>
                    <li className="flex gap-3"><span className="text-white/40 font-mono">12AM</span><span>Still scrolling</span></li>
                    <li className="flex gap-3"><span className="text-white/40 font-mono">1AM</span><span>Why am I watching this?</span></li>
                    <li className="flex gap-3"><span className="text-white/40 font-mono">2AM</span><span>I should sleep...</span></li>
                    <li className="flex gap-3"><span className="text-white/40 font-mono">3AM</span><span>*finally puts phone down*</span></li>
                    <li className="flex gap-3"><span className="text-white/40 font-mono">3:05</span><span className="text-red-400">Hollow. Can't sleep.</span></li>
                  </ul>
                </div>
                <div className="p-6 bg-green-500/5 border border-green-500/20 rounded-xl">
                  <h4 className="text-lg font-semibold text-green-400 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>After</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-3"><span className="text-white/40 font-mono">11PM</span><span>Opened creation app</span></li>
                    <li className="flex gap-3"><span className="text-white/40 font-mono">11:20</span><span>Made something weird</span></li>
                    <li className="flex gap-3"><span className="text-white/40 font-mono">11:45</span><span>Shared it. Someone played it.</span></li>
                    <li className="flex gap-3"><span className="text-white/40 font-mono">12AM</span><span className="text-green-400">Satisfied. Put phone down.</span></li>
                    <li className="flex gap-3"><span className="text-white/40 font-mono">12:05</span><span className="text-green-400">Asleep.</span></li>
                  </ul>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <p className="mb-6">By day 7, I wasn't fighting myself anymore. The urge to scroll was still there — I'm not a monk. But I'd rewired the habit. The path from boredom led somewhere different now.</p>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="mb-12">And here's the weird part: <strong className="text-white/90">my screen time didn't decrease much</strong>. But the quality of that time transformed completely.</p>
            </Reveal>

            <Reveal>
              <h2 className="text-3xl font-semibold text-white/95 tracking-[-0.02em] mt-16 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                What Actually Works (Not Willpower)
              </h2>
            </Reveal>
            
            <Reveal delay={0.1}>
              <p className="mb-6">"Just use your phone less" is terrible advice. It's like telling someone to "just eat less" without changing what's in their fridge.</p>
            </Reveal>
            
            <Reveal delay={0.15}>
              <p className="mb-6">Here's what actually worked for me:</p>
            </Reveal>
            
            <Reveal delay={0.2}>
              <h3 className="text-xl font-semibold text-white/90 mt-8 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>1. Replace, Don't Remove</h3>
              <p className="mb-6">Don't delete apps and white-knuckle it. Replace the habit loop. Bored → create something, not bored → scroll nothing. Same trigger, different response.</p>
            </Reveal>
            
            <Reveal delay={0.25}>
              <h3 className="text-xl font-semibold text-white/90 mt-8 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>2. Make Creation Stupid Easy</h3>
              <p className="mb-6">If creating requires opening a laptop, learning software, or thinking hard — you'll scroll instead. The creation app needs to be easier than opening Instagram. I found one where I literally just type what I want to make and it appears. <Link to="/productive-things-to-do-on-phone" className="text-cyan-400 underline decoration-cyan-400/30 underline-offset-4 hover:decoration-cyan-400 transition-colors">That's the bar</Link>.</p>
            </Reveal>
            
            <Reveal delay={0.3}>
              <h3 className="text-xl font-semibold text-white/90 mt-8 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>3. Share What You Make</h3>
              <p className="mb-6">This sounds small, but it's massive. Sending your creation to one person — a friend, a stranger online — completes the satisfaction loop. You made something. Someone experienced it. Done.</p>
            </Reveal>

            {/* Visual Block - Rewire Loop */}
            <Reveal delay={0.35}>
              <div className="my-10">
                <img src="/assets/3am-rewire-loop.png" alt="The creation satisfaction loop" loading="lazy" className="w-full rounded-xl border border-white/10" />
                <p className="text-center text-sm text-white/40 mt-3 italic">Fig 3. The same trigger. A different path. A complete loop.</p>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <p className="mb-6">The goal isn't to become a "creator" or build an audience or any of that nonsense. The goal is to feel complete when you put your phone down instead of hollow.</p>
            </Reveal>
          </div>
        </article>

        {/* Cinematic Break 3 */}
        <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/3am-morning-light.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020206]/60 via-[#020206]/40 to-[#020206]/80" />
          <div className="relative z-10 text-center px-6">
            <h2 className="text-2xl md:text-4xl font-semibold text-white/95 leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              "Same phone. Same hours.<br />Completely different feeling."
            </h2>
          </div>
        </section>

        <article className="py-20 px-6">
          <div className="max-w-[700px] mx-auto">
            <Reveal>
              <h2 className="text-3xl font-semibold text-white/95 tracking-[-0.02em] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                It's Not About the Phone
              </h2>
            </Reveal>
            
            <Reveal delay={0.1}>
              <p className="mb-6">I'm not going to pretend I never scroll anymore. I do. We all do. The algorithms are too good, and we're only human.</p>
            </Reveal>
            
            <Reveal delay={0.15}>
              <p className="mb-6">But I've broken the 3AM spiral. I sleep better. I wake up without that low-grade shame of wasted hours. And somewhere in a feed of games I've made — dumb ones, weird ones, ones I shared with strangers around the world — there's evidence that I <em className="text-cyan-400">did</em> something with those hours.</p>
            </Reveal>
            
            <Reveal delay={0.2}>
              <p className="mb-6">That's the difference. <strong className="text-white/90">Consumption leaves no trace. Creation leaves something behind.</strong></p>
            </Reveal>
            
            <Reveal delay={0.25}>
              <p className="mb-6">Your brain wants stimulation. Your soul wants meaning. The trick is finding something that gives you both.</p>
            </Reveal>
            
            <Reveal delay={0.3}>
              <p className="mb-12">Your path might be different. But I promise you: the 3AM scroll isn't inevitable. <Link to="/our-vision" className="text-cyan-400 underline decoration-cyan-400/30 underline-offset-4 hover:decoration-cyan-400 transition-colors">There's another way</Link>.</p>
            </Reveal>

            {/* CTA */}
            <Reveal>
              <div className="mt-16 py-16 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white/95 tracking-[-0.02em] mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Same Phone.<br />Different Feeling.</h2>
                <p className="text-white/50 mb-10 max-w-md mx-auto">Five minutes to create something instead of consume something.<br />See what happens to 3AM.</p>
                <ExternalLink
                  href="https://play.google.com/store/apps/details?id=com.nextap.vibebrews"
                  className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-semibold rounded-full hover:scale-105 transition-transform shadow-[0_20px_60px_rgba(0,212,255,0.25)]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  Try Creating Instead
                </ExternalLink>
                <p className="mt-4 text-sm text-white/30">(Takes 30 seconds. No account required to start.)</p>
                <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm text-white/40">
                  <Link to="/the-creative-block-is-a-lie" className="hover:text-white/70 underline decoration-transparent hover:decoration-white/30 underline-offset-4 transition-all">More on creation vs consumption</Link>
                  <Link to="/productive-things-to-do-on-phone" className="hover:text-white/70 underline decoration-transparent hover:decoration-white/30 underline-offset-4 transition-all">Productive phone use</Link>
                  <Link to="/i-have-a-game-idea" className="hover:text-white/70 underline decoration-transparent hover:decoration-white/30 underline-offset-4 transition-all">Have an idea already?</Link>
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
                    <p className="text-sm text-white/40">I built a multiplayer universe in 4 minutes.</p>
                  </Link>
                  <Link to="/productive-things-to-do-on-phone" className="p-6 bg-white/[0.02] border border-white/[0.06] rounded-xl hover:bg-white/[0.04] transition-colors">
                    <h4 className="text-base font-medium text-white/90 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Productive Things to Do on Your Phone</h4>
                    <p className="text-sm text-white/40">Your phone isn't the enemy.</p>
                  </Link>
                  <Link to="/the-game-you-will-never-make" className="p-6 bg-white/[0.02] border border-white/[0.06] rounded-xl hover:bg-white/[0.04] transition-colors">
                    <h4 className="text-base font-medium text-white/90 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>The Game You'll Never Make</h4>
                    <p className="text-sm text-white/40">47 unfinished projects. Sound familiar?</p>
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
