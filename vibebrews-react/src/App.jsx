import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/Layout'

// Pages
import Home from './pages/Home'
import Tools from './pages/Tools'
import ColorPalette from './pages/ColorPalette'
import TokenBurner from './pages/TokenBurner'
import VibeCostEstimator from './pages/VibeCostEstimator'
import ModelPicker from './pages/ModelPicker'
import ContextWindow from './pages/ContextWindow'
import PromptRemix from './pages/PromptRemix'
import ShipSafeScanner from './pages/ShipSafeScanner'
import LegalDocGenerator from './pages/LegalDocGenerator'
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

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <AnimatePresence mode="wait">
          <Routes>
            {/* Home */}
            <Route path="/" element={<Home />} />
            
            {/* Tools Hub */}
            <Route path="/tools" element={<Tools />} />
            
            {/* Individual Tools */}
            <Route path="/color-palette-generator" element={<ColorPalette />} />
            <Route path="/ai-token-calculator" element={<TokenBurner />} />
            <Route path="/vibe-cost-calculator" element={<VibeCostEstimator />} />
            <Route path="/ai-model-picker" element={<ModelPicker />} />
            <Route path="/context-window-visualizer" element={<ContextWindow />} />
            <Route path="/prompt-remix" element={<PromptRemix />} />
            <Route path="/ship-safe-scanner" element={<ShipSafeScanner />} />
            <Route path="/legal-doc-generator" element={<LegalDocGenerator />} />
            
            {/* Blog Articles */}
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
          </Routes>
        </AnimatePresence>
      </Layout>
    </BrowserRouter>
  )
}

export default App
