import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/Layout'
import useAnalytics from './hooks/useAnalytics'
import Home from './pages/Home'
import HowToMake from './pages/HowToMake'
import IHaveAnIdea from './pages/IHaveAnIdea'
import OurVision from './pages/OurVision'
import ProductivePlay from './pages/ProductivePlay'
import WhyIQuitUnity from './pages/WhyIQuitUnity'
import DeathOfCoding from './pages/DeathOfCoding'
import CreativeBlock from './pages/CreativeBlock'
import GameYouWillNeverMake from './pages/GameYouWillNeverMake'
import The3amScroll from './pages/The3amScroll'
import IdeasDie from './pages/IdeasDie'
import TheAIRace from './pages/TheAIRace'
import Tools from './pages/Tools'
import Blogs from './pages/Blogs'
import ColorPalette from './pages/ColorPalette'
import TokenBurner from './pages/TokenBurner'
import ModelPicker from './pages/ModelPicker'
import PromptRemix from './pages/PromptRemix'
import ContextWindow from './pages/ContextWindow'
import ShipSafeScanner from './pages/ShipSafeScanner'
import VibeCostEstimator from './pages/VibeCostEstimator'
import LegalDocGenerator from './pages/LegalDocGenerator'

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

function App() {
  const location = useLocation()
  
  // Google Analytics 4 - automatically tracks page views on route changes
  useAnalytics()

  return (
    <>
      <ScrollToTop />
      <Layout>
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
          </Routes>
        </AnimatePresence>
      </Layout>
    </>
  )
}

export default App
