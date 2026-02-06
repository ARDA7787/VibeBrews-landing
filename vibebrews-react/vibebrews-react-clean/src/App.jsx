import { useEffect, lazy, Suspense } from 'react'
import { Routes, Route, useLocation, Link } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/Layout'
import useAnalytics from './hooks/useAnalytics'

// Eagerly load Home for fast initial paint
import Home from './pages/Home'

// Code-split all other pages for smaller initial bundle
const HowToMake = lazy(() => import('./pages/HowToMake'))
const IHaveAnIdea = lazy(() => import('./pages/IHaveAnIdea'))
const OurVision = lazy(() => import('./pages/OurVision'))
const ProductivePlay = lazy(() => import('./pages/ProductivePlay'))
const WhyIQuitUnity = lazy(() => import('./pages/WhyIQuitUnity'))
const DeathOfCoding = lazy(() => import('./pages/DeathOfCoding'))
const CreativeBlock = lazy(() => import('./pages/CreativeBlock'))
const GameYouWillNeverMake = lazy(() => import('./pages/GameYouWillNeverMake'))
const The3amScroll = lazy(() => import('./pages/The3amScroll'))
const IdeasDie = lazy(() => import('./pages/IdeasDie'))
const TheAIRace = lazy(() => import('./pages/TheAIRace'))
const Tools = lazy(() => import('./pages/Tools'))
const Blogs = lazy(() => import('./pages/Blogs'))
const ColorPalette = lazy(() => import('./pages/ColorPalette'))
const TokenBurner = lazy(() => import('./pages/TokenBurner'))
const ModelPicker = lazy(() => import('./pages/ModelPicker'))
const PromptRemix = lazy(() => import('./pages/PromptRemix'))
const ContextWindow = lazy(() => import('./pages/ContextWindow'))
const ShipSafeScanner = lazy(() => import('./pages/ShipSafeScanner'))
const VibeCostEstimator = lazy(() => import('./pages/VibeCostEstimator'))
const LegalDocGenerator = lazy(() => import('./pages/LegalDocGenerator'))

// ScrollToTop component - resets scroll position on route change and refresh
function ScrollToTop() {
  const { pathname } = useLocation()
  
  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    
    // Also handle the main content area if it has its own scroll
    const mainContent = document.getElementById('main-content')
    if (mainContent) {
      mainContent.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
    
    // Reset document scroll as well
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [pathname])
  
  // Also scroll to top on initial mount (handles refresh)
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [])
  
  return null
}

// Minimal loading fallback for code-split chunks
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-white/20 border-t-white/70 rounded-full animate-spin" />
  </div>
)

// 404 Not Found page
const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
    <h1 className="text-6xl font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>404</h1>
    <p className="text-lg opacity-60 mb-8">This page doesn't exist.</p>
    <Link to="/" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-sm font-medium">
      Back to Home
    </Link>
  </div>
)

function App() {
  const location = useLocation()
  
  // Google Analytics 4 - automatically tracks page views on route changes
  useAnalytics()

  return (
    <>
      <ScrollToTop />
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/how-to-make-a-game-without-coding" element={<HowToMake />} />
              <Route path="/i-have-a-game-idea" element={<IHaveAnIdea />} />
              <Route path="/our-vision" element={<OurVision />} />
              <Route path="/productive-things-to-do-on-phone" element={<ProductivePlay />} />
              <Route path="/why-i-stopped-learning-unity" element={<WhyIQuitUnity />} />
              <Route path="/the-death-of-coding" element={<DeathOfCoding />} />
              <Route path="/the-creative-block-is-a-lie" element={<CreativeBlock />} />
              <Route path="/the-game-you-will-never-make" element={<GameYouWillNeverMake />} />
              <Route path="/the-3am-scroll" element={<The3amScroll />} />
              <Route path="/why-your-ideas-die-in-your-notes-app" element={<IdeasDie />} />
              <Route path="/everyone-racing-against-ai" element={<TheAIRace />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/color-palette-generator" element={<ColorPalette />} />
              <Route path="/ai-token-calculator" element={<TokenBurner />} />
              <Route path="/ai-model-picker" element={<ModelPicker />} />
              <Route path="/prompt-remix" element={<PromptRemix />} />
              <Route path="/result/:modelId" element={<ModelPicker />} />
              <Route path="/context-window-visualizer" element={<ContextWindow />} />
              <Route path="/ship-safe-scanner" element={<ShipSafeScanner />} />
              <Route path="/vibe-cost-calculator" element={<VibeCostEstimator />} />
              <Route path="/legal-doc-generator" element={<LegalDocGenerator />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </Layout>
    </>
  )
}

export default App
