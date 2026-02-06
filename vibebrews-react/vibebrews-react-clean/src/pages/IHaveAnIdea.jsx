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

const options = [
  { number: 1, title: "Learn to code yourself", time: "6-12 months", cost: "$0-500", description: "Learn a programming language, understand game engines, study design principles, create assets. The right path if you want to become a developer. A massive detour if you just want to make one game." },
  { number: 2, title: "Hire a developer", time: "2-6 months", cost: "$5,000-50,000+", description: "Freelancers charge $30-150/hour. A simple mobile game takes 100-300 hours minimum. Plus communication overhead—endless back-and-forth on details that don't match your vision." },
  { number: 3, title: "Use no-code tools", time: "Weeks-months", cost: "$0-400/year", description: "Tools like Construct or GDevelop let you build without traditional coding—but you're trading code for complex visual systems. Still a steep learning curve. Still limited to specific genres." },
]

const newOption = {
  number: 4,
  title: "Use AI game generators",
  time: "2-5 minutes",
  cost: "Free",
  description: "Describe your game idea in a sentence. AI generates a playable 3D game with physics, graphics, and multiplayer support. Iterate with follow-up prompts. This option didn't exist before 2025.",
  highlight: true
}

const timeline = [
  { 
    icon: (
      <svg className="w-5 h-5 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"/>
      </svg>
    ),
    title: "Describe your idea",
    text: '"Make a game where I\'m a cat knocking things off a table while the owner tries to stop me"'
  },
  {
    icon: (
      <svg className="w-5 h-5 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19 14.5M14.25 3.104c.251.023.501.05.75.082M5 14.5l-.94 2.06a1.5 1.5 0 001.14 2.065l1.8.24M19 14.5l.94 2.06a1.5 1.5 0 01-1.14 2.065l-1.8.24"/>
      </svg>
    ),
    title: "AI generates your game",
    text: "Within 60 seconds, you're playing a 3D game with physics, objects that fall realistically, a score system, and controls that feel good."
  },
  {
    icon: (
      <svg className="w-5 h-5 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>
      </svg>
    ),
    title: "Refine with follow-up prompts",
    text: '"Make the cat faster" • "Add a dog that chases me" • "Make glass items worth bonus points" • "Add multiplayer so my friend can be the owner"'
  },
  {
    icon: (
      <svg className="w-5 h-5 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/>
      </svg>
    ),
    title: "Share and play together",
    text: "Publish to the community. Friends join with a 6-digit room code. Multiplayer works automatically—no server setup, no additional configuration."
  }
]

const faqs = [
  { q: "What if my game idea is too complex?", a: "Start simple. Describe the core mechanic first, then add complexity through follow-up prompts. A complex game is just a simple game with layers. The AI handles each layer incrementally—you can always add more." },
  { q: "Will my game look professional?", a: 'The games look surprisingly polished—3D graphics with decent physics and lighting. They won\'t match a AAA studio with a $10 million budget, but they\'ll impress your friends. Style modifiers like "hand drawn style" or "low poly" can give distinctive aesthetics.' },
  { q: "Can I make multiplayer games without coding?", a: "Yes. Every game generated with VibeBrews supports peer-to-peer multiplayer automatically. Share a 6-digit room code and friends join instantly. No server setup, no networking knowledge required." },
  { q: "Can AI really understand my unique game idea?", a: 'AI has learned from decades of game design patterns. Describe what you want naturally: "a puzzle game where gravity changes when I tap" or "hide and seek in a haunted mansion." The more specific you are, the better the result.' },
  { q: "Should I still learn to code?", a: 'Coding is a valuable skill with applications far beyond games. If you\'re interested, absolutely learn. But if your goal is specifically "I want to make my game idea real"—you no longer need to wait 6-12 months to start. You can create today.' },
]

export default function IHaveAnIdea() {
  useSEO({
    title: 'I Have a Game Idea But Can\'t Code - Here\'s What to Do | VibeBrews',
    description: 'You have a game idea but no coding skills? Learn the 4 paths from idea to playable game, including the new AI-powered option that takes minutes, not months.',
    keywords: 'i have a game idea, game idea no coding, turn game idea into reality, game development for beginners, ai game creator',
    canonical: 'https://vibebrews.com/i-have-a-game-idea',
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
              className="absolute -top-[200px] -right-[100px] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-white/20 to-gray-600/20 blur-[80px] opacity-[0.06]"
            />
          </div>
          
          <div className="text-center relative z-10 px-6 py-20">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[11px] font-semibold text-white/30 uppercase tracking-[0.12em] mb-6"
            >
              For Creators With Ideas
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white/95 leading-[1.1] tracking-[-0.03em] mb-7"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              You have a game idea.<br />You can't code.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl text-white/50 max-w-[540px] mx-auto leading-relaxed"
            >
              That used to be the end of the story. Something changed in 2025. The gap between imagination and reality just collapsed.
            </motion.p>
          </div>
        </section>

        {/* Article */}
        <article className="py-20 px-6">
          <div className="max-w-[700px] mx-auto">
            <Reveal>
              <p className="text-xl text-white/90 leading-relaxed mb-12">
                You've had this game idea stuck in your head for weeks. Maybe months. You can see the mechanics, feel the gameplay, imagine showing it to friends. But every path to making it real—learning to code, hiring a developer, mastering game engines—feels like signing up for a journey you never wanted to take.
              </p>
            </Reveal>
            
            <Reveal delay={0.1}>
              <p className="mb-6">This is the frustration of being a creator in the wrong decade.</p>
            </Reveal>
            
            <Reveal delay={0.15}>
              <p className="mb-6">Painters don't need to manufacture their own brushes. Writers don't need to build printing presses. But game creators? Until recently, they needed to become programmers first. The barrier wasn't creativity—it was <strong className="text-white/90">technical gatekeeping</strong>.</p>
            </Reveal>
          </div>
        </article>

        {/* Hero Cinematic - Idea Frustration */}
        <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/idea-frustration-hero.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
          <div className="relative z-10 text-center px-6">
            <h2 className="text-2xl md:text-4xl font-semibold text-white/95 leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              "I just wanted to make a simple game.<br />I didn't sign up for a degree."
            </h2>
          </div>
        </section>

        <article className="py-20 px-6">
          <div className="max-w-[700px] mx-auto">
            {/* Stat Block */}
            <Reveal delay={0.2}>
              <div className="flex flex-col md:flex-row items-center gap-8 my-14 p-10 bg-white/[0.02] border border-white/[0.06] rounded-2xl">
                <div className="text-6xl md:text-7xl font-semibold text-white/95 tracking-[-0.04em]">90%</div>
                <p className="text-sm text-white/50 leading-relaxed">
                  The dropout rate for game development courses. Nine out of ten people quit before making anything playable. The traditional path is broken for casual creators—optimized for professional developers, not for people with ideas.
                </p>
              </div>
            </Reveal>

            {/* Quote Block */}
            <Reveal delay={0.25}>
              <div className="my-16 p-12 bg-white/[0.02] rounded-[20px] border border-white/[0.06] text-center relative">
                <span className="absolute top-6 left-12 text-7xl font-semibold text-white/10 leading-none">"</span>
                <p className="text-xl md:text-2xl font-medium text-white/95 leading-relaxed tracking-[-0.02em] mb-4 relative z-[1]">
                  I just wanted to make a simple game with my friends. I didn't sign up for a computer science degree.
                </p>
                <p className="text-sm text-white/30">— Every creator who gave up</p>
              </div>
            </Reveal>

            <Reveal>
              <h2 className="text-2xl font-semibold text-white/95 tracking-[-0.02em] mt-16 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                The traditional options (and why they fail)
              </h2>
            </Reveal>
          </div>
        </article>

        {/* Cinematic Break 1 */}
        <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/old-path-diagram.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
          <div className="relative z-10 text-center px-6">
            <h2 className="text-2xl md:text-4xl font-semibold text-white/95 leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              "The traditional path:<br />optimized for professionals, not creators."
            </h2>
          </div>
        </section>

        <article className="py-20 px-6">
          <div className="max-w-[900px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-8">
              {options.map((option, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="p-7 bg-white/[0.02] border border-white/[0.06] rounded-2xl transition-all duration-500"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-8 h-8 flex items-center justify-center text-sm font-semibold text-white/40 bg-white/[0.04] rounded-lg">{option.number}</div>
                      <div className="text-base font-semibold text-white/95">{option.title}</div>
                    </div>
                    <div className="flex gap-5 mb-4 text-xs text-white/40">
                      <span>Time: <span className="text-white/60">{option.time}</span></span>
                      <span>Cost: <span className="text-white/60">{option.cost}</span></span>
                    </div>
                    <p className="text-sm text-white/50 leading-relaxed">{option.description}</p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="max-w-[700px] mx-auto">
            <Reveal>
              <h2 className="text-2xl font-semibold text-white/95 tracking-[-0.02em] mt-16 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Something fundamental shifted
              </h2>
            </Reveal>
            
            <Reveal delay={0.1}>
              <p className="mb-6">In 2025, AI models learned to understand game mechanics. Not just text or images—actual interactive systems. Physics. Collision detection. Scoring. Win conditions. Camera behavior. The feeling of controls.</p>
            </Reveal>
            
            <Reveal delay={0.15}>
              <p className="mb-6">This means you can now <strong className="text-white/90">describe a game in plain English</strong> and get a playable result. Not a mockup. Not a design document. A working 3D game with real physics that you can actually play.</p>
            </Reveal>

            {/* Timeline */}
            <Reveal delay={0.2}>
              <div className="my-16 relative">
                <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-white/[0.08] to-transparent" />
                
                {timeline.map((item, i) => (
                  <div key={i} className="flex gap-8 py-8 relative">
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-black border border-white/[0.08] rounded-full relative z-[1]">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-white/95 mb-2">{item.title}</h4>
                      <p className="text-sm text-white/50 leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
            
            <Reveal>
              <h2 className="text-2xl font-semibold text-white/95 tracking-[-0.02em] mt-16 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                The fourth option
              </h2>
            </Reveal>
          </div>

          <div className="max-w-[900px] mx-auto">
            <Reveal>
              <motion.div
                whileHover={{ y: -4 }}
                className="p-8 bg-white/[0.04] border border-white/[0.12] rounded-2xl"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-8 h-8 flex items-center justify-center text-sm font-semibold text-black bg-white rounded-lg">{newOption.number}</div>
                  <div className="text-lg font-semibold text-white/95">{newOption.title}</div>
                </div>
                <div className="flex gap-5 mb-4 text-xs text-white/40">
                  <span>Time: <span className="text-white/80">{newOption.time}</span></span>
                  <span>Cost: <span className="text-white/80">{newOption.cost}</span></span>
                </div>
                <p className="text-sm text-white/60 leading-relaxed">{newOption.description}</p>
              </motion.div>
            </Reveal>
          </div>
        </article>

        {/* Cinematic Break 2 */}
        <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/before-after-comparison.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
          <div className="relative z-10 text-center px-6">
            <h2 className="text-2xl md:text-4xl font-semibold text-white/95 leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              "Before: 6 months to start.<br />After: 2 minutes to finish."
            </h2>
          </div>
        </section>

        <article className="py-20 px-6">
          <div className="max-w-[700px] mx-auto">
            <Reveal>
              <p className="mb-6">This isn't about replacing professional game developers. Complex commercial games still need teams. But for the millions of people who just want to see their idea work—who want to play their concept with friends this weekend—the barrier is gone.</p>
            </Reveal>

            {/* Visual Block - Idea to Reality */}
            <Reveal delay={0.1}>
              <div className="my-10">
                <img src="/assets/idea-to-reality.png" alt="Ideas transforming directly into playable games through AI" loading="lazy" className="w-full rounded-xl border border-white/10" />
                <p className="text-center text-sm text-white/40 mt-3 italic">The gap between imagination and reality just collapsed.</p>
              </div>
            </Reveal>

            {/* FAQ Section */}
            <Reveal>
              <h2 className="text-2xl font-semibold text-white/95 tracking-[-0.02em] mt-16 mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
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

            {/* Related Links */}
            <Reveal>
              <div className="mt-16 pt-12 border-t border-white/[0.06]">
                <h3 className="text-xs font-semibold text-white/30 uppercase tracking-[0.06em] mb-6">Continue exploring</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link to="/how-to-make-a-game-without-coding" className="group flex items-center gap-4 p-5 bg-white/[0.02] border border-white/[0.06] rounded-xl hover:bg-white/[0.04] hover:translate-x-2 transition-all duration-300">
                    <svg className="w-6 h-6 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/>
                    </svg>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-white/90">How to Make Games</div>
                      <div className="text-xs text-white/40">Step-by-step guide</div>
                    </div>
                    <svg className="w-4 h-4 text-white/30 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                    </svg>
                  </Link>
                  <Link to="/our-vision" className="group flex items-center gap-4 p-5 bg-white/[0.02] border border-white/[0.06] rounded-xl hover:bg-white/[0.04] hover:translate-x-2 transition-all duration-300">
                    <svg className="w-6 h-6 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-white/90">Our Vision</div>
                      <div className="text-xs text-white/40">Why we built this</div>
                    </div>
                    <svg className="w-4 h-4 text-white/30 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                    </svg>
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* CTA */}
            <Reveal>
              <div className="mt-16 p-12 text-center bg-white/[0.02] border border-white/[0.06] rounded-2xl">
                <h2 className="text-2xl md:text-3xl font-semibold text-white/95 tracking-[-0.02em] mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Your idea has waited long enough</h2>
                <p className="text-white/50 mb-8">Describe your game. Play it in five minutes.</p>
                <ExternalLink
                  href="https://play.google.com/store/apps/details?id=com.nextap.vibebrews"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-all"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  Try VibeBrews Free
                </ExternalLink>
                <p className="mt-4 text-xs text-white/30">Free on Android · iOS coming soon</p>
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
