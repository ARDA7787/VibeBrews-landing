import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import ExternalLink from '../components/ExternalLink'

export const Reveal = ({ children, delay = 0, className = '' }) => {
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

export default function ArticleTemplate({ 
  eyebrow, 
  title, 
  subtitle, 
  children,
  relatedLinks = []
}) {
  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-white/60">
        {/* Header */}
        <header className="pt-20 pb-12 px-6 border-b border-white/[0.04]">
          <div className="max-w-[700px] mx-auto">
            {eyebrow && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-xs font-medium text-white/30 uppercase tracking-[0.06em] mb-6"
              >
                {eyebrow}
              </motion.div>
            )}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white/95 leading-[1.1] tracking-[-0.03em] mb-5"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {title}
            </motion.h1>
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-white/50"
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        </header>

        {/* Article Content */}
        <article className="py-16 px-6">
          <div className="max-w-[700px] mx-auto">
            {children}

            {/* Related Links */}
            {relatedLinks.length > 0 && (
              <Reveal>
                <div className="mt-16 pt-12 border-t border-white/[0.06]">
                  <h3 className="text-xs font-semibold text-white/30 uppercase tracking-[0.06em] mb-6">Continue exploring</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {relatedLinks.map((link, i) => (
                      <Link 
                        key={i}
                        to={link.path} 
                        className="group flex items-center gap-4 p-5 bg-white/[0.02] border border-white/[0.06] rounded-xl hover:bg-white/[0.04] hover:translate-x-2 transition-all duration-300"
                      >
                        <div className="flex-1">
                          <div className="text-sm font-medium text-white/90">{link.title}</div>
                          <div className="text-xs text-white/40">{link.description}</div>
                        </div>
                        <svg className="w-4 h-4 text-white/30 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                        </svg>
                      </Link>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}

            {/* CTA */}
            <Reveal>
              <div className="mt-16 p-12 text-center bg-white/[0.02] border border-white/[0.06] rounded-2xl">
                <h2 className="text-2xl md:text-3xl font-semibold text-white/95 tracking-[-0.02em] mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Ready to create?
                </h2>
                <p className="text-white/50 mb-8">Your first game is five minutes away.</p>
                <ExternalLink
                  href="https://play.google.com/store/apps/details?id=com.nextap.vibebrews"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-all"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  Download for Android
                </ExternalLink>
                <p className="mt-4 text-xs text-white/30">Free · iOS coming soon</p>
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
            </nav>
            <p className="text-xs text-white/30">© 2026 VibeBrews. A product by <ExternalLink href="https://www.linkedin.com/company/nextap-ai/" className="underline hover:text-white/50 transition-colors">Nextap AI</ExternalLink></p>
          </div>
        </footer>
      </div>
    </PageTransition>
  )
}
