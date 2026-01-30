import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useSpring, useScroll, useTransform } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import { Link } from 'react-router-dom'

// SEO - Target BOTH beginners AND developers
const SEO_TITLE = 'AI Coding Cost Calculator 2026 | Cursor, Bolt, Replit Pricing for Beginners & Devs'
const SEO_DESC = 'How much does it really cost to build an app with AI? Free calculator for Cursor, Bolt.new, Replit, Lovable. Perfect for beginners starting vibe coding or developers budgeting projects. No coding required to understand.'
const SEO_KEYWORDS = 'how much does cursor cost, vibe coding for beginners, ai coding cost calculator, build app without coding cost, cursor for beginners, is cursor worth it, bolt.new pricing explained, replit cost breakdown, ai app builder cost, vibe coding budget 2026, first time using cursor, cursor vs bolt for beginners, how to start vibe coding, ai coding tools comparison, lovable pricing, no code app cost'

// ============================================================================
// CUSTOM SVG ICONS
// ============================================================================
const Icons = {
  screens: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8" /><path d="M12 17v4" /></svg>,
  complexity: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>,
  backend: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" /><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" /></svg>,
  dollar: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>,
  lightning: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
  warning: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>,
  info: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>,
  check: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><polyline points="20 6 9 17 4 12" /></svg>,
  question: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>,
  breakdown: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>,
  compare: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="3" y="3" width="7" height="9" rx="1" /><rect x="14" y="3" width="7" height="5" rx="1" /><rect x="14" y="12" width="7" height="9" rx="1" /><rect x="3" y="16" width="7" height="5" rx="1" /></svg>,
  tips: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M9 18h6" /><path d="M10 22h4" /><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14" /></svg>,
  rework: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 102.13-9.36L1 10" /></svg>,
  platform: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /></svg>,
  infra: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M22 12H2" /><path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z" /><line x1="6" y1="16" x2="6.01" y2="16" /><line x1="10" y1="16" x2="10.01" y2="16" /></svg>,
  clock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
  help: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>,
  beginner: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>,
  // New icons for replacing emojis
  wave: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M18.5 12.5c0-1.5-1-2.5-2.5-2.5s-2.5 1-2.5 2.5" /><path d="M13.5 10c0-1.5-1-2.5-2.5-2.5S8.5 8.5 8.5 10" /><path d="M8.5 10c0-1.5-1-2.5-2.5-2.5S3.5 8.5 3.5 10v4c0 4 3 7 7 7h3c3 0 5-2 6-4l1-3c.5-1.5-.5-3-2-3s-2.5 1-2.5 2.5" /><path d="M8.5 10V6c0-1.5 1-2.5 2.5-2.5s2.5 1 2.5 2.5v4" /></svg>,
  chat: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" /></svg>,
  robot: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="3" y="8" width="18" height="12" rx="2" /><path d="M12 8V5" /><circle cx="12" cy="3" r="2" /><circle cx="8" cy="14" r="1.5" fill="currentColor" /><circle cx="16" cy="14" r="1.5" fill="currentColor" /><path d="M9 18h6" /></svg>,
  rocket: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" /><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>,
  chartBar: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="3" y="12" width="4" height="9" rx="1" /><rect x="10" y="8" width="4" height="13" rx="1" /><rect x="17" y="4" width="4" height="17" rx="1" /></svg>,
  refresh: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M21 2v6h-6" /><path d="M3 12a9 9 0 0115-6.7L21 8" /><path d="M3 22v-6h6" /><path d="M21 12a9 9 0 01-15 6.7L3 16" /></svg>,
  server: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="2" y="3" width="20" height="6" rx="2" /><rect x="2" y="13" width="20" height="6" rx="2" /><circle cx="6" cy="6" r="1" fill="currentColor" /><circle cx="6" cy="16" r="1" fill="currentColor" /></svg>,
  sparkle: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" /><circle cx="12" cy="12" r="4" /></svg>,
  stepOne: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><circle cx="12" cy="12" r="10" /><text x="12" y="16" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">1</text></svg>,
  stepTwo: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><circle cx="12" cy="12" r="10" /><text x="12" y="16" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">2</text></svg>,
  stepThree: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><circle cx="12" cy="12" r="10" /><text x="12" y="16" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">3</text></svg>,
  stepFour: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><circle cx="12" cy="12" r="10" /><text x="12" y="16" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">4</text></svg>,
}

// ============================================================================
// TOOLTIP COMPONENT - Explains terms for beginners
// ============================================================================
const Tooltip = ({ term, explanation, children }) => {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <span className="relative inline-flex items-center gap-1">
      {children}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="text-[#2D2A26]/30 hover:text-[#2D2A26]/60 transition-colors cursor-help"
        aria-label={`What is ${term}?`}
      >
        {Icons.help}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-3 bg-[#2D2A26] text-white text-xs rounded-xl shadow-xl z-50"
          >
            <div className="font-semibold mb-1">{term}</div>
            <div className="text-white/80 leading-relaxed">{explanation}</div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-[#2D2A26] rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  )
}

// ============================================================================
// BEGINNER GLOSSARY - Common terms explained simply
// ============================================================================
const glossary = {
  vibeCoding: "Building apps by describing what you want in plain English. The AI writes the code for you.",
  tokens: "Units that AI uses to measure text. Roughly 1 token = 4 characters or ¾ of a word.",
  credits: "Points you spend each time you ask the AI to do something. Different from tokens.",
  backend: "The behind-the-scenes part of your app - database, user accounts, server logic.",
  screens: "Individual pages or views in your app. Like 'Home', 'Login', 'Settings', etc.",
  infrastructure: "Services that keep your app running online - hosting, database, etc.",
  overages: "Extra charges when you use more than your plan includes.",
  checkpoint: "Replit charges you each time the AI saves its progress while working.",
  rework: "When you need to ask the AI to fix or redo something it got wrong.",
}

// ============================================================================
// PLATFORM DATA (Real pricing from research - Jan 2026)
// ============================================================================
const platforms = {
  cursor: {
    name: 'Cursor',
    type: 'Augmented IDE',
    baseCost: 20,
    model: 'Safety Net',
    volatility: 'Low',
    bestFor: 'Daily coding, refactoring',
    color: '#22c55e',
    exportability: 'High',
    note: 'Unlimited slow requests after 500 fast',
    multipliers: { simple: 1.0, medium: 1.0, complex: 1.0 },
    backendMultiplier: 1.0,
    screenCost: 0,
    reworkRisk: 0.1,
    logo: 'https://www.cursor.com/brand/icon.svg',
    website: 'https://cursor.com',
  },
  windsurf: {
    name: 'Windsurf',
    type: 'Augmented IDE',
    baseCost: 15,
    model: 'Tiered Credits',
    volatility: 'Medium',
    bestFor: 'Flow-based coding',
    color: '#3b82f6',
    exportability: 'High',
    note: '500 prompts, then $10/250 credits',
    multipliers: { simple: 1.0, medium: 1.3, complex: 1.8 },
    backendMultiplier: 1.2,
    screenCost: 0.5,
    reworkRisk: 0.15,
    logo: 'https://codeium.com/favicon.svg',
    website: 'https://codeium.com/windsurf',
  },
  bolt: {
    name: 'Bolt.new',
    type: 'Full-Stack Generator',
    baseCost: 20,
    model: 'Token Cap',
    volatility: 'Medium',
    bestFor: 'Full-stack web apps',
    color: '#f59e0b',
    exportability: 'Medium',
    note: '10M tokens/month hard cap',
    multipliers: { simple: 1.2, medium: 2.0, complex: 3.5 },
    backendMultiplier: 1.5,
    screenCost: 2,
    reworkRisk: 0.25,
    logo: 'https://bolt.new/favicon.svg',
    website: 'https://bolt.new',
  },
  lovable: {
    name: 'Lovable',
    type: 'Full-Stack Generator',
    baseCost: 25,
    model: 'Credit Overage',
    volatility: 'High',
    bestFor: 'Rapid SaaS MVPs',
    color: '#ec4899',
    exportability: 'Medium',
    note: '100 credits, then $0.30/credit',
    multipliers: { simple: 1.5, medium: 2.5, complex: 4.0 },
    backendMultiplier: 1.8,
    screenCost: 3,
    reworkRisk: 0.3,
    logo: 'https://lovable.dev/favicon.ico',
    website: 'https://lovable.dev',
  },
  replit: {
    name: 'Replit',
    type: 'Autonomous Agent',
    baseCost: 25,
    model: 'Pay-per-Checkpoint',
    volatility: 'Extreme',
    bestFor: 'Autonomous tasks',
    color: '#f97316',
    exportability: 'Low',
    note: '$0.25 per checkpoint',
    multipliers: { simple: 2.0, medium: 4.0, complex: 8.0 },
    backendMultiplier: 2.0,
    screenCost: 5,
    reworkRisk: 0.4,
    logo: 'https://replit.com/public/icons/favicon-196.png',
    website: 'https://replit.com',
  },
}

// Infrastructure costs
const infraCosts = {
  supabase: { 
    name: 'Supabase', 
    cost: 25, 
    note: 'Pro Plan',
    logo: 'https://supabase.com/favicon/favicon-196x196.png',
    website: 'https://supabase.com',
  },
  vercel: { 
    name: 'Vercel', 
    cost: 20, 
    note: 'Pro Plan',
    logo: 'https://vercel.com/favicon.ico',
    website: 'https://vercel.com',
  },
}

// ============================================================================
// ANIMATED COST DISPLAY (smooth spring animation)
// ============================================================================
const AnimatedCost = ({ value }) => {
  const spring = useSpring(value, { stiffness: 100, damping: 20 })
  const [display, setDisplay] = useState(value)
  
  useEffect(() => {
    spring.set(value)
    return spring.on('change', v => setDisplay(v))
  }, [value, spring])
  
  // Use dark, high-contrast colors visible on cream background
  const getCostColor = (cost) => {
    if (cost < 60) return '#15803d'   // Dark green - good value
    if (cost < 120) return '#b45309'  // Dark amber - moderate
    return '#b91c1c'                   // Dark red - expensive
  }
  
  return (
    <motion.span 
      className="font-mono font-bold"
      style={{ color: getCostColor(display) }}
    >
      ${Math.round(display)}
    </motion.span>
  )
}

// ============================================================================
// TL;DR QUICK ANSWER BOX (for search intent)
// ============================================================================
const QuickAnswerBox = () => (
  <motion.div 
    className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-[#2D2A26]/10 mb-6"
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <div className="flex items-center gap-2 text-[#2D2A26]/50 text-xs uppercase tracking-wider mb-3">
      {Icons.clock}
      <span>Quick Answer - Base Subscription Only</span>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
      <a href={platforms.cursor.website} target="_blank" rel="noopener noreferrer" className="block p-4 bg-green-50 rounded-xl border-2 border-green-200 hover:border-green-300 transition-colors">
        <div className="flex items-center justify-center gap-2 mb-1">
          <img src={platforms.cursor.logo} alt="Cursor" className="w-5 h-5 rounded" onError={(e) => e.target.style.display = 'none'} />
          <span className="text-xs text-green-700 font-medium">Cursor</span>
        </div>
        <div className="text-2xl font-bold text-green-600 font-mono">$20/mo</div>
        <div className="text-[10px] text-green-600 mt-1">Cheapest, no overages</div>
      </a>
      <a href={platforms.bolt.website} target="_blank" rel="noopener noreferrer" className="block p-4 bg-[#2D2A26]/[0.03] rounded-xl border border-[#2D2A26]/10 hover:border-[#2D2A26]/20 transition-colors">
        <div className="flex items-center justify-center gap-2 mb-1">
          <img src={platforms.bolt.logo} alt="Bolt.new" className="w-5 h-5 rounded" onError={(e) => e.target.style.display = 'none'} />
          <span className="text-xs text-[#2D2A26]/70 font-medium">Bolt / Lovable</span>
        </div>
        <div className="text-2xl font-bold text-[#2D2A26] font-mono">$20-25/mo</div>
        <div className="text-[10px] text-[#2D2A26]/50 mt-1">+ credit overages likely</div>
      </a>
      <a href={platforms.replit.website} target="_blank" rel="noopener noreferrer" className="block p-4 bg-[#2D2A26]/[0.03] rounded-xl border border-[#2D2A26]/10 hover:border-[#2D2A26]/20 transition-colors">
        <div className="flex items-center justify-center gap-2 mb-1">
          <img src={platforms.replit.logo} alt="Replit" className="w-5 h-5 rounded" onError={(e) => e.target.style.display = 'none'} />
          <span className="text-xs text-[#2D2A26]/70 font-medium">Replit Agent</span>
        </div>
        <div className="text-2xl font-bold text-[#2D2A26] font-mono">$25/mo</div>
        <div className="text-[10px] text-[#2D2A26]/50 mt-1">+ $0.25/checkpoint adds up</div>
      </a>
    </div>
    <div className="mt-4 p-3 bg-[#2D2A26]/5 rounded-xl">
      <div className="text-xs text-[#2D2A26]/70 text-center">
        <strong>Real total cost</strong> = Subscription + Overages + Infrastructure (Supabase $25 + Vercel $20)
      </div>
      <div className="text-[10px] text-[#2D2A26]/50 text-center mt-1">
        Use the calculator below to see your actual monthly cost based on project size
      </div>
    </div>
  </motion.div>
)

// ============================================================================
// MAIN CALCULATOR TOOL
// ============================================================================
const VibeCostTool = () => {
  // Inputs - start with realistic defaults
  const [screens, setScreens] = useState(5)
  const [complexity, setComplexity] = useState('medium')
  const [needsBackend, setNeedsBackend] = useState(true)
  const [skillLevel, setSkillLevel] = useState('intermediate')
  const [activeTab, setActiveTab] = useState('calculator')
  const [showExplainer, setShowExplainer] = useState(false)
  
  // Calculate costs for each platform (runs on every input change - LIVE preview)
  const calculateCost = (platformKey) => {
    const p = platforms[platformKey]
    let cost = p.baseCost
    cost *= p.multipliers[complexity]
    cost += screens * p.screenCost
    if (needsBackend) cost *= p.backendMultiplier
    const reworkMultiplier = { beginner: 2.5, intermediate: 1.5, advanced: 1.0 }[skillLevel]
    cost *= (1 + p.reworkRisk * reworkMultiplier)
    return Math.round(cost)
  }
  
  const calculateInfra = () => needsBackend ? infraCosts.supabase.cost + infraCosts.vercel.cost : 0
  
  // Calculate all costs
  const costs = Object.keys(platforms).reduce((acc, key) => {
    acc[key] = calculateCost(key)
    return acc
  }, {})
  
  const infraCost = calculateInfra()
  const allCostValues = Object.values(costs)
  const minCost = Math.min(...allCostValues)
  const maxCost = Math.max(...allCostValues)
  const recommendedPlatform = Object.entries(costs).find(([_, cost]) => cost === minCost)?.[0] || 'cursor'
  
  const complexityLabels = { simple: 'Simple', medium: 'Medium', complex: 'Complex' }
  const skillLabels = { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' }
  
  const tabs = [
    { id: 'calculator', label: 'Estimator', icon: Icons.dollar },
    { id: 'compare', label: 'Compare', icon: Icons.compare },
    { id: 'breakdown', label: 'Breakdown', icon: Icons.breakdown },
    { id: 'tips', label: 'Save Money', icon: Icons.tips },
  ]
  
  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex justify-center mb-6 overflow-x-auto pb-2">
        <div className="inline-flex bg-white/50 rounded-2xl p-1.5 shadow-sm">
          {tabs.map(tab => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 md:px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === tab.id ? 'bg-[#2D2A26] text-white shadow-lg' : 'text-[#2D2A26]/60 hover:text-[#2D2A26]'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        {/* CALCULATOR TAB */}
        {activeTab === 'calculator' && (
          <motion.div 
            key="calculator" 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }}
          >
            {/* LIVE RESULT - Always visible at top (mobile-first) */}
            <motion.div 
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-[#2D2A26]/5 shadow-xl mb-6"
              layout
            >
              <div className="text-center">
                <div className="text-[#2D2A26]/40 text-xs uppercase tracking-wider mb-1">Your Estimated Monthly Cost</div>
                <div className="text-5xl md:text-6xl font-bold font-mono">
                  <AnimatedCost value={costs[recommendedPlatform] + infraCost} />
                  <span className="text-lg text-[#2D2A26]/30 font-normal"> - </span>
                  <AnimatedCost value={maxCost + infraCost} />
                </div>
                <div className="mt-2 text-[#2D2A26]/50 text-sm">
                  per month with {platforms[recommendedPlatform].name}
                </div>
              </div>
              
              {/* Platform quick compare */}
              <div className="grid grid-cols-3 gap-2 mt-6 text-center">
                {['cursor', 'bolt', 'replit'].map(key => (
                  <motion.a 
                    key={key}
                    href={platforms[key].website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-xl transition-all block ${
                      key === recommendedPlatform 
                        ? 'bg-green-50 border-2 border-green-300 hover:border-green-400' 
                        : 'bg-[#2D2A26]/5 hover:bg-[#2D2A26]/10'
                    }`}
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="flex items-center justify-center gap-1.5 mb-1">
                      <img 
                        src={platforms[key].logo} 
                        alt={platforms[key].name} 
                        className="w-4 h-4 rounded"
                        onError={(e) => e.target.style.display = 'none'}
                      />
                      <span className="text-[10px] text-[#2D2A26]/40 uppercase">{platforms[key].name}</span>
                    </div>
                    <div className={`text-lg font-bold font-mono ${
                      key === recommendedPlatform ? 'text-green-600' : 'text-[#2D2A26]'
                    }`}>
                      ${costs[key] + infraCost}
                    </div>
                    {key === recommendedPlatform && (
                      <div className="text-[9px] text-green-600 font-medium mt-1">BEST VALUE</div>
                    )}
                  </motion.a>
                ))}
              </div>
              
              {/* Why this seems high */}
              <button
                onClick={() => setShowExplainer(!showExplainer)}
                className="w-full flex items-center justify-center gap-2 py-2 mt-4 text-sm text-[#2D2A26]/50 hover:text-[#2D2A26] transition-colors"
              >
                {Icons.question}
                <span>Why more than $20/month?</span>
              </button>
              
              <AnimatePresence>
                {showExplainer && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 bg-[#2D2A26]/5 border border-[#2D2A26]/10 rounded-xl text-sm text-[#2D2A26]/80 mt-2">
                      <strong className="text-[#2D2A26]">The "$20/month" is marketing. Real costs include:</strong>
                      <ul className="mt-2 space-y-1 text-xs">
                        <li>+ Credit overages when you exceed limits</li>
                        <li>+ Rework loops (AI gets it wrong 2-5x)</li>
                        <li>+ Infrastructure: Supabase $25 + Vercel $20</li>
                        <li>+ Context costs grow as your codebase grows</li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            
            {/* Input Controls */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Left Column */}
              <div className="space-y-4">
                {/* Screens Slider */}
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-[#2D2A26]/5">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2 text-[#2D2A26]/70 text-sm font-medium">
                      {Icons.screens}
                      <span>How many pages in your app?</span>
                    </div>
                    <span className="text-2xl font-bold text-[#2D2A26] font-mono">{screens}</span>
                  </div>
                  <p className="text-[10px] text-[#2D2A26]/40 mb-3">
                    Think: Home, Login, Dashboard, Settings = 4 screens
                  </p>
                  <input 
                    type="range" 
                    min="1" 
                    max="20" 
                    value={screens}
                    onChange={(e) => setScreens(parseInt(e.target.value))}
                    className="w-full h-2 bg-[#2D2A26]/10 rounded-full appearance-none cursor-pointer 
                      [&::-webkit-slider-thumb]:appearance-none 
                      [&::-webkit-slider-thumb]:w-6 
                      [&::-webkit-slider-thumb]:h-6 
                      [&::-webkit-slider-thumb]:bg-[#2D2A26] 
                      [&::-webkit-slider-thumb]:rounded-full
                      [&::-webkit-slider-thumb]:shadow-lg
                      [&::-webkit-slider-thumb]:cursor-grab
                      [&::-webkit-slider-thumb]:active:cursor-grabbing"
                  />
                  <div className="flex justify-between mt-2 text-xs text-[#2D2A26]/40">
                    <span>1 (simple site)</span>
                    <span>20 (full app)</span>
                  </div>
                </div>
                
                {/* Complexity Buttons */}
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-[#2D2A26]/5">
                  <div className="flex items-center gap-2 text-[#2D2A26]/70 text-sm font-medium mb-1">
                    {Icons.complexity}
                    <span>How complex is your app?</span>
                  </div>
                  <p className="text-[10px] text-[#2D2A26]/40 mb-3">
                    More features = more AI work = higher cost
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {Object.entries(complexityLabels).map(([key, label]) => (
                      <motion.button
                        key={key}
                        onClick={() => setComplexity(key)}
                        whileTap={{ scale: 0.97 }}
                        className={`py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                          complexity === key 
                            ? 'bg-[#2D2A26] text-white shadow-lg' 
                            : 'bg-[#2D2A26]/5 text-[#2D2A26]/70 hover:bg-[#2D2A26]/10'
                        }`}
                      >
                        {label}
                      </motion.button>
                    ))}
                  </div>
                  <div className="mt-3 p-2 bg-[#2D2A26]/5 rounded-lg">
                    <div className="text-xs text-[#2D2A26]/60">
                      {complexity === 'simple' && (
                        <><strong>Simple:</strong> Portfolio, landing page, basic forms - no user accounts</>
                      )}
                      {complexity === 'medium' && (
                        <><strong>Medium:</strong> User login, saving data, connecting to other services</>
                      )}
                      {complexity === 'complex' && (
                        <><strong>Complex:</strong> Live chat, payments, multiple user roles, dashboards</>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Column */}
              <div className="space-y-4">
                {/* Backend Toggle */}
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-[#2D2A26]/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-[#2D2A26]/70 text-sm font-medium">
                        {Icons.backend}
                        <span>Does your app save data?</span>
                      </div>
                      <p className="text-[10px] text-[#2D2A26]/40 mt-0.5">
                        User accounts, posts, orders, etc.
                      </p>
                    </div>
                    <motion.button
                      onClick={() => setNeedsBackend(!needsBackend)}
                      className={`relative w-14 h-8 rounded-full transition-colors ${
                        needsBackend ? 'bg-[#2D2A26]' : 'bg-[#2D2A26]/20'
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md"
                        animate={{ left: needsBackend ? 'calc(100% - 28px)' : '4px' }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    </motion.button>
                  </div>
                  <div className="mt-3 p-2 bg-[#2D2A26]/5 rounded-lg">
                    <div className="text-xs text-[#2D2A26]/60">
                      {needsBackend ? (
                        <>
                          <strong>Yes:</strong> Adds hosting costs - Supabase ($25) + Vercel ($20) = <span className="font-mono">$45/mo</span>
                          <div className="text-[10px] text-[#2D2A26]/40 mt-1">These services store your data and keep your app online</div>
                        </>
                      ) : (
                        <>
                          <strong>No:</strong> Frontend only - just the visible parts, no saved data
                          <div className="text-[10px] text-[#2D2A26]/40 mt-1">Good for portfolios, landing pages, simple tools</div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Skill Level */}
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-[#2D2A26]/5">
                  <div className="flex items-center gap-2 text-[#2D2A26]/70 text-sm font-medium mb-1">
                    {Icons.rework}
                    <span>Your experience with AI tools</span>
                  </div>
                  <p className="text-[10px] text-[#2D2A26]/40 mb-3">
                    Beginners need more tries to get things right (that's normal!)
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {Object.entries(skillLabels).map(([key, label]) => (
                      <motion.button
                        key={key}
                        onClick={() => setSkillLevel(key)}
                        whileTap={{ scale: 0.97 }}
                        className={`py-2 px-3 rounded-xl text-xs font-medium transition-all ${
                          skillLevel === key 
                            ? 'bg-[#2D2A26] text-white' 
                            : 'bg-[#2D2A26]/5 text-[#2D2A26]/70 hover:bg-[#2D2A26]/10'
                        }`}
                      >
                        {label}
                      </motion.button>
                    ))}
                  </div>
                  <div className="mt-3 p-2 bg-[#2D2A26]/5 rounded-lg">
                    <div className="text-xs text-[#2D2A26]/60">
                      {skillLevel === 'beginner' && (
                        <><strong>First time:</strong> AI might need 2-3 tries to get it right. That's okay - you'll learn fast!</>
                      )}
                      {skillLevel === 'intermediate' && (
                        <><strong>Some experience:</strong> You know how to give clear instructions. Fewer retries needed.</>
                      )}
                      {skillLevel === 'advanced' && (
                        <><strong>Power user:</strong> You write detailed prompts. AI usually gets it right first time.</>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Your Project Summary */}
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-[#2D2A26]/5">
                  <div className="text-[#2D2A26]/70 text-sm font-medium mb-3">Your Project Summary</div>
                  <div className="space-y-2 text-sm text-[#2D2A26]/70">
                    <div className="flex justify-between">
                      <span>Pages/screens</span>
                      <span className="font-mono font-medium text-[#2D2A26]">{screens}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Features</span>
                      <span className="font-mono font-medium text-[#2D2A26]">{complexityLabels[complexity]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saves data?</span>
                      <span className="font-mono font-medium text-[#2D2A26]">{needsBackend ? `Yes (+$${infraCost})` : 'No'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Extra tries factor</span>
                      <div className="flex items-center gap-1">
                        <span className="font-mono font-medium text-[#2D2A26]">
                          {skillLevel === 'beginner' ? '2.5x' : skillLevel === 'intermediate' ? '1.5x' : '1.0x'}
                        </span>
                        {skillLevel === 'beginner' && (
                          <span className="text-[10px] text-[#2D2A26]/40">(normal for beginners)</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* COMPARE TAB */}
        {activeTab === 'compare' && (
          <motion.div 
            key="compare" 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-[#2D2A26]/5 mb-4">
              <div className="text-[#2D2A26]/50 text-xs uppercase tracking-wider text-center">
                Comparing: {screens} screens, {complexityLabels[complexity].toLowerCase()} complexity, {needsBackend ? 'with' : 'no'} backend
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(platforms).map(([key, p], i) => {
                const cost = costs[key]
                const total = cost + infraCost
                const isLowest = cost === minCost
                
                return (
                  <motion.div
                    key={key}
                    className={`bg-white/70 backdrop-blur-sm rounded-2xl p-5 border-2 ${
                      isLowest ? 'border-green-400 shadow-lg' : 'border-[#2D2A26]/5'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.02, y: -4 }}
                  >
                    {isLowest && (
                      <div className="text-[10px] text-green-600 font-bold uppercase mb-2 flex items-center gap-1">
                        {Icons.check} Best Value
                      </div>
                    )}
                    
                    <a 
                      href={p.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 mb-1 hover:opacity-70 transition-opacity"
                    >
                      <img 
                        src={p.logo} 
                        alt={p.name} 
                        className="w-5 h-5 rounded"
                        onError={(e) => { e.target.style.display = 'none' }}
                      />
                      <span className="font-semibold text-[#2D2A26] underline decoration-[#2D2A26]/20 hover:decoration-[#2D2A26]/50">{p.name}</span>
                    </a>
                    
                    <div className="text-xs text-[#2D2A26]/40 mb-3">{p.type}</div>
                    
                    <div className="text-3xl font-bold font-mono mb-2" style={{ color: p.color }}>
                      ${total}
                      <span className="text-sm font-normal text-[#2D2A26]/40">/mo</span>
                    </div>
                    
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between text-[#2D2A26]/60">
                        <span>Base</span>
                        <span className="font-mono">${p.baseCost}</span>
                      </div>
                      <div className="flex justify-between text-[#2D2A26]/60">
                        <span>Model</span>
                        <span>{p.model}</span>
                      </div>
                      <div className="flex justify-between text-[#2D2A26]/60">
                        <span>Volatility</span>
                        <span className={`font-medium ${
                          p.volatility === 'Low' ? 'text-green-600' : 'text-[#2D2A26]'
                        }`}>{p.volatility}</span>
                      </div>
                      <div className="flex justify-between text-[#2D2A26]/60">
                        <span>Export</span>
                        <span className={`font-medium ${
                          p.exportability === 'High' ? 'text-green-600' : 'text-[#2D2A26]'
                        }`}>{p.exportability}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-[#2D2A26]/10 text-[10px] text-[#2D2A26]/40">
                      {p.note}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}
        
        {/* BREAKDOWN TAB */}
        {activeTab === 'breakdown' && (
          <motion.div 
            key="breakdown" 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {/* Cost Formula */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 border border-[#2D2A26]/5">
              <div className="text-[#2D2A26] font-semibold mb-4 flex items-center gap-2">
                {Icons.breakdown} How We Calculate
              </div>
              <div className="bg-[#2D2A26]/5 rounded-xl p-4 font-mono text-sm text-[#2D2A26]/80 overflow-x-auto">
                <code>Total = (Platform x Complexity x Backend x Rework) + Infrastructure</code>
              </div>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="text-center p-3 bg-[#2D2A26]/5 rounded-xl">
                  <div className="text-xs text-[#2D2A26]/40">Platform Base</div>
                  <div className="text-sm font-semibold text-[#2D2A26]">$15-25</div>
                </div>
                <div className="text-center p-3 bg-[#2D2A26]/5 rounded-xl">
                  <div className="text-xs text-[#2D2A26]/40">Complexity</div>
                  <div className="text-sm font-semibold text-[#2D2A26]">1-8x</div>
                </div>
                <div className="text-center p-3 bg-[#2D2A26]/5 rounded-xl">
                  <div className="text-xs text-[#2D2A26]/40">Rework</div>
                  <div className="text-sm font-semibold text-[#2D2A26]">1-2.5x</div>
                </div>
                <div className="text-center p-3 bg-[#2D2A26]/5 rounded-xl">
                  <div className="text-xs text-[#2D2A26]/40">Infra</div>
                  <div className="text-sm font-semibold text-[#2D2A26]">+$45</div>
                </div>
              </div>
            </div>
            
            {/* Infrastructure */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 border border-[#2D2A26]/5">
              <div className="text-[#2D2A26] font-semibold mb-4 flex items-center gap-2">
                {Icons.infra} Infrastructure Tax (Hidden Cost)
              </div>
              <p className="text-sm text-[#2D2A26]/60 mb-4">
                Every AI coding tool outputs to Supabase + Vercel by default. You pay these regardless of which tool you use.
              </p>
              <div className="space-y-3">
                {Object.entries(infraCosts).map(([key, item]) => (
                  <a 
                    key={key} 
                    href={item.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-[#2D2A26]/5 rounded-xl hover:bg-[#2D2A26]/10 transition-colors block"
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src={item.logo} 
                        alt={item.name} 
                        className="w-6 h-6 rounded"
                        onError={(e) => e.target.style.display = 'none'}
                      />
                      <div>
                        <div className="font-medium text-[#2D2A26] underline decoration-[#2D2A26]/20 hover:decoration-[#2D2A26]/50">{item.name}</div>
                        <div className="text-xs text-[#2D2A26]/40">{item.note}</div>
                      </div>
                    </div>
                    <div className="text-xl font-bold font-mono text-[#2D2A26]">${item.cost}</div>
                  </a>
                ))}
                <div className="flex items-center justify-between p-3 bg-[#2D2A26]/10 border border-[#2D2A26]/10 rounded-xl">
                  <div className="font-medium text-[#2D2A26]">Total Infrastructure</div>
                  <div className="text-xl font-bold font-mono text-[#2D2A26]">${infraCosts.supabase.cost + infraCosts.vercel.cost}/mo</div>
                </div>
              </div>
            </div>
            
            {/* Rework Multiplier */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 border border-[#2D2A26]/5">
              <div className="text-[#2D2A26] font-semibold mb-4 flex items-center gap-2">
                {Icons.rework} The Rework Multiplier (Why AI Costs Add Up)
              </div>
              <p className="text-sm text-[#2D2A26]/60 mb-4">
                AI models succeed only 20-40% of the time on complex tasks (SWE-bench). Each failed attempt costs credits.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { platform: 'Cursor', rate: '10%', desc: 'IDE catches errors early' },
                  { platform: 'Bolt/Lovable', rate: '25-30%', desc: 'Context rot after ~100 prompts' },
                  { platform: 'Replit Agent', rate: '40%', desc: 'Autonomous = more mistakes' },
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-[#2D2A26]/5 rounded-xl text-center">
                    <div className="text-[#2D2A26] font-semibold">{item.platform}</div>
                    <div className="text-2xl font-bold font-mono text-[#2D2A26] mt-2">{item.rate}</div>
                    <div className="text-xs text-[#2D2A26]/40 mt-1">rework risk</div>
                    <div className="text-[10px] text-[#2D2A26]/30 mt-2">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
        
        {/* TIPS TAB */}
        {activeTab === 'tips' && (
          <motion.div 
            key="tips" 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 border border-[#2D2A26]/5">
              <div className="text-[#2D2A26] font-semibold mb-4 flex items-center gap-2">
                {Icons.dollar} Reduce Your AI Coding Costs
              </div>
              <div className="space-y-3">
                {[
                  { tip: 'Use Cursor for iteration', savings: '60%', desc: 'Unlimited slow requests = no overage' },
                  { tip: 'Free tiers for development', savings: '100%', desc: 'Supabase/Vercel free until you launch' },
                  { tip: 'Plan prompts before typing', savings: '50%', desc: 'Think first, fewer iterations' },
                  { tip: 'Batch changes together', savings: '40%', desc: 'One prompt for 5 files > 5 prompts' },
                  { tip: 'Set token/credit limits', savings: '30%', desc: 'Prevent runaway agent loops' },
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    className="flex items-start gap-3 p-3 bg-[#2D2A26]/5 rounded-xl"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <div className="w-12 text-center shrink-0">
                      <div className="text-green-600 font-bold text-sm">{item.savings}</div>
                    </div>
                    <div>
                      <div className="font-medium text-[#2D2A26] text-sm">{item.tip}</div>
                      <div className="text-[#2D2A26]/50 text-xs">{item.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 border border-[#2D2A26]/5">
              <div className="text-[#2D2A26] font-semibold mb-4 flex items-center gap-2">
                {Icons.platform} Optimal Build Strategy
              </div>
              <div className="space-y-3">
                {[
                  { phase: 'Week 1: Prototype', tool: 'Bolt / Lovable', toolKeys: ['bolt', 'lovable'], why: 'Fastest initial generation' },
                  { phase: 'Week 2-4: Iterate', tool: 'Cursor', toolKeys: ['cursor'], why: 'Unlimited slow, local files' },
                  { phase: 'Week 5+: Deploy', tool: 'Vercel + Supabase', infraKeys: ['vercel', 'supabase'], why: 'Cheapest production hosting' },
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    className="p-4 bg-[#2D2A26]/5 rounded-xl"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-medium text-[#2D2A26] text-sm">{item.phase}</div>
                      <div className="flex items-center gap-1.5 px-2 py-1 bg-[#2D2A26] text-white text-xs rounded-full">
                        {item.toolKeys?.map(key => (
                          <img 
                            key={key}
                            src={platforms[key].logo} 
                            alt={platforms[key].name} 
                            className="w-3.5 h-3.5 rounded"
                            onError={(e) => e.target.style.display = 'none'}
                          />
                        ))}
                        {item.infraKeys?.map(key => (
                          <img 
                            key={key}
                            src={infraCosts[key].logo} 
                            alt={infraCosts[key].name} 
                            className="w-3.5 h-3.5 rounded"
                            onError={(e) => e.target.style.display = 'none'}
                          />
                        ))}
                        <span>{item.tool}</span>
                      </div>
                    </div>
                    <div className="text-[#2D2A26]/50 text-xs">{item.why}</div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                <div className="flex items-center gap-2 text-green-700 font-medium text-sm">
                  {Icons.check} Pro Tip
                </div>
                <p className="mt-2 text-xs text-green-600">
                  Use generators as "expendable launchers" to reach v1.0, then export to Cursor for sustainable, cost-effective development.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ============================================================================
// SEO BLOG CONTENT - Comprehensive for organic search
// ============================================================================
const ContentSection = ({ children, className = '' }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [30, 0, 0, -30])
  return <motion.section ref={ref} style={{ opacity, y }} className={className}>{children}</motion.section>
}

const SEOContent = () => (
  <div className="mt-20 space-y-20">
    {/* Section 0: Beginner-Friendly Intro - What Even Is This? */}
    <ContentSection>
      <div className="max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#2D2A26]/5 text-[#2D2A26]/70 rounded-full text-xs font-medium mb-4">
          <span className="text-[#2D2A26]/50">{Icons.wave}</span> 
          <span>Start here if you're new</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-[#2D2A26] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Can I Really Build an App Without Knowing How to Code?
        </h2>
        <div className="prose prose-lg text-[#2D2A26]/70 space-y-4">
          <p>
            <strong>Yes, you can.</strong> In 2026, AI tools have made it possible for anyone to build real, working apps by simply <em>describing</em> what they want.
          </p>
          <div className="bg-white/60 rounded-2xl p-6 border border-[#2D2A26]/10 not-prose">
            <h3 className="font-semibold text-[#2D2A26] mb-4 flex items-center gap-2">
              <span className="text-[#2D2A26]/50">{Icons.sparkle}</span>
              How it works (in plain English):
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#2D2A26] text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</div>
                <div className="pt-1">
                  <strong className="text-[#2D2A26]">You describe what you want</strong>
                  <p className="text-sm text-[#2D2A26]/60 mt-0.5">"Make a website where people can sign up and post photos"</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#2D2A26] text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">2</div>
                <div className="pt-1">
                  <strong className="text-[#2D2A26]">AI writes the code</strong>
                  <p className="text-sm text-[#2D2A26]/60 mt-0.5">It creates all the buttons, pages, and behind-the-scenes logic</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#2D2A26] text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">3</div>
                <div className="pt-1">
                  <strong className="text-[#2D2A26]">You review and adjust</strong>
                  <p className="text-sm text-[#2D2A26]/60 mt-0.5">"Make the button blue" or "Add a forgot password link"</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#2D2A26] text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">4</div>
                <div className="pt-1">
                  <strong className="text-[#2D2A26]">Your app goes live</strong>
                  <p className="text-sm text-[#2D2A26]/60 mt-0.5">Real people can use it on the internet</p>
                </div>
              </div>
            </div>
          </div>
          <p>
            This is called <strong>"vibe coding"</strong> - you share your vision (the vibe), and AI handles the technical details. It's not magic, and there's a learning curve, but thousands of non-programmers are now building apps this way.
          </p>
        </div>
      </div>
    </ContentSection>

    {/* Section 1: What is Vibe Coding - Now more balanced */}
    <ContentSection>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-[#2D2A26] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          The Real Cost of AI Coding Tools (Beyond the Sticker Price)
        </h2>
        <div className="prose prose-lg text-[#2D2A26]/70 space-y-4">
          <p>
            Tools like <strong>Cursor, Bolt.new, Lovable, Replit, and Windsurf</strong> all advertise similar prices: <strong>$15-25/month</strong>. But the actual cost of building a complete app is <strong>2-5x higher</strong>.
          </p>
          <p>
            Here's why (explained simply):
          </p>
          <div className="bg-white/60 rounded-xl p-5 border border-[#2D2A26]/10 not-prose space-y-4">
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-[#2D2A26]/5 rounded-xl text-[#2D2A26]/60 shrink-0">
                {Icons.chartBar}
              </div>
              <div>
                <strong className="text-[#2D2A26]">Usage limits</strong>
                <p className="text-sm text-[#2D2A26]/60">Most plans have caps. Go over, and you pay extra.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-[#2D2A26]/5 rounded-xl text-[#2D2A26]/60 shrink-0">
                {Icons.refresh}
              </div>
              <div>
                <strong className="text-[#2D2A26]">Trial and error</strong>
                <p className="text-sm text-[#2D2A26]/60">AI doesn't always get it right the first time. Each retry costs money (on some platforms).</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-[#2D2A26]/5 rounded-xl text-[#2D2A26]/60 shrink-0">
                {Icons.server}
              </div>
              <div>
                <strong className="text-[#2D2A26]">Hosting your app</strong>
                <p className="text-sm text-[#2D2A26]/60">Your app needs a home on the internet. That's usually $45/month extra for a database + hosting.</p>
              </div>
            </div>
          </div>
          <p>
            <strong>The good news:</strong> If you pick the right tool (like Cursor), you can avoid surprise bills. That's what this calculator helps you figure out.
          </p>
        </div>
      </div>
    </ContentSection>

    {/* Section 2: Cursor Credits Explained */}
    <ContentSection>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-[#2D2A26] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Why Did Cursor Use All My Credits? (Cursor Pricing Explained)
        </h2>
        <div className="prose prose-lg text-[#2D2A26]/70 space-y-4">
          <p>
            If you've searched "why did Cursor use all my credits" - you're not alone. Here's how Cursor's pricing actually works:
          </p>
          <div className="bg-white/60 rounded-xl p-5 border border-[#2D2A26]/10 not-prose">
            <a 
              href={platforms.cursor.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 mb-3 hover:opacity-70 transition-opacity"
            >
              <img 
                src={platforms.cursor.logo} 
                alt="Cursor" 
                className="w-6 h-6 rounded"
                onError={(e) => e.target.style.display = 'none'}
              />
              <h3 className="font-semibold text-[#2D2A26] underline decoration-[#2D2A26]/20">Cursor Pro Plan ($20/month)</h3>
            </a>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">{Icons.check}</span>
                <span><strong>500 "fast" requests</strong> - Priority access to Claude/GPT-4</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">{Icons.check}</span>
                <span><strong>Unlimited "slow" requests</strong> - Queued during peak times</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#2D2A26]/50 mt-0.5">{Icons.warning}</span>
                <span><strong>Composer mode</strong> - Burns fast credits quickly (multi-file edits)</span>
              </li>
            </ul>
          </div>
          <p>
            <strong>The key insight:</strong> Cursor is actually the safest option because you can't accidentally overspend. Once you hit 500 fast requests, you just wait longer for responses. No surprise bills.
          </p>
          <p>
            Compare this to <strong>Lovable</strong> ($0.30 per credit overage) or <strong>Replit</strong> ($0.25 per checkpoint) - those can spiral to $200-350/month without warning.
          </p>
        </div>
      </div>
    </ContentSection>

    {/* Section 3: Comparison Table */}
    <ContentSection>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-[#2D2A26] mb-6 text-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Cursor vs Bolt.new vs Replit vs Lovable: Real Cost Comparison (2026)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm bg-white/70 rounded-2xl overflow-hidden">
            <thead className="bg-[#2D2A26]/5">
              <tr>
                <th className="text-left py-4 px-4 text-[#2D2A26]/60 font-medium">Platform</th>
                <th className="text-left py-4 px-4 text-[#2D2A26]/60 font-medium">Advertised</th>
                <th className="text-left py-4 px-4 text-[#2D2A26]/60 font-medium">Real Cost*</th>
                <th className="text-left py-4 px-4 text-[#2D2A26]/60 font-medium">Overage Model</th>
                <th className="text-left py-4 px-4 text-[#2D2A26]/60 font-medium">Best For</th>
              </tr>
            </thead>
            <tbody>
              {[
                { key: 'cursor', name: 'Cursor', base: '$20/mo', real: '$20-40', model: 'Unlimited slow fallback', best: 'Daily coding', highlight: true },
                { key: 'windsurf', name: 'Windsurf', base: '$15/mo', real: '$25-55', model: '$10 per 250 credits', best: 'Flow-state coding' },
                { key: 'bolt', name: 'Bolt.new', base: '$20/mo', real: '$20-80', model: '10M token hard cap', best: 'Quick prototypes' },
                { key: 'lovable', name: 'Lovable', base: '$25/mo', real: '$50-200', model: '$0.30 per credit', best: 'Beautiful UIs' },
                { key: 'replit', name: 'Replit', base: '$25/mo', real: '$75-350', model: '$0.25 per checkpoint', best: 'Autonomous tasks' },
              ].map((row, i) => (
                <tr key={i} className={`border-t border-[#2D2A26]/5 ${row.highlight ? 'bg-green-50' : ''}`}>
                  <td className={`py-3 px-4 font-medium ${row.highlight ? 'text-green-700' : 'text-[#2D2A26]'}`}>
                    <a 
                      href={platforms[row.key].website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:opacity-70 transition-opacity"
                    >
                      <img 
                        src={platforms[row.key].logo} 
                        alt={row.name} 
                        className="w-4 h-4 rounded"
                        onError={(e) => e.target.style.display = 'none'}
                      />
                      <span className="underline decoration-current/30">{row.name}</span>
                    </a>
                  </td>
                  <td className="py-3 px-4 font-mono text-[#2D2A26]/50">{row.base}</td>
                  <td className={`py-3 px-4 font-mono font-semibold ${row.highlight ? 'text-green-600' : 'text-[#2D2A26]'}`}>{row.real}</td>
                  <td className="py-3 px-4 text-[#2D2A26]/50 text-xs">{row.model}</td>
                  <td className="py-3 px-4 text-[#2D2A26]/70 text-xs">{row.best}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-[#2D2A26]/40 text-center">
          *Real monthly cost for building a 5-10 screen app with backend. Add $45/mo for Supabase + Vercel infrastructure.
        </p>
      </div>
    </ContentSection>

    {/* Section 4: Bolt.new Deep Dive */}
    <ContentSection>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-[#2D2A26] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          How Much Does Bolt.new Actually Cost?
        </h2>
        <div className="prose prose-lg text-[#2D2A26]/70 space-y-4">
          <p>
            <strong>Bolt.new's Pro plan costs $20/month</strong> with a 10 million token limit. Sounds like a lot, but here's the reality:
          </p>
          <ul>
            <li>A simple landing page uses ~500K tokens</li>
            <li>A full-stack app with auth burns 2-4M tokens</li>
            <li>Each iteration/fix uses another 100K-500K tokens</li>
            <li>Power users report needing <strong>50-100M tokens/month</strong></li>
          </ul>
          <p>
            The 10M cap means you'll likely hit a wall mid-project. Once you do, you either wait until next month or upgrade.
          </p>
          <div className="bg-[#2D2A26]/5 border border-[#2D2A26]/10 rounded-xl p-4 not-prose">
            <div className="flex items-start gap-2">
              <span className="text-[#2D2A26]/50 mt-0.5">{Icons.warning}</span>
              <div>
                <strong className="text-[#2D2A26]">Known Issue: Context Rot</strong>
                <p className="text-sm text-[#2D2A26]/70 mt-1">
                  After ~100-200 prompts, Bolt starts "forgetting" your project structure. This causes bugs that require more prompts to fix - a costly loop.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContentSection>

    {/* Section 5: Replit Deep Dive */}
    <ContentSection>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-[#2D2A26] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Replit Agent Pricing: Why It's the Most Expensive Option
        </h2>
        <div className="prose prose-lg text-[#2D2A26]/70 space-y-4">
          <p>
            Replit charges <strong>$0.25 per "checkpoint"</strong> - a save point during the agent's work. The problem? A single bug fix can trigger 4-8 checkpoints as the agent thinks, tries, fails, and retries.
          </p>
          <p>
            <strong>Real-world reports:</strong>
          </p>
          <ul>
            <li>$75-100/month for light usage</li>
            <li>$200-350/month for active development</li>
            <li>One user reported <strong>$350 in a single day</strong> during an intensive build</li>
          </ul>
          <p>
            Replit's strength is autonomous work - it installs packages, configures databases, and runs tests without you. But that autonomy comes with unpredictable costs.
          </p>
          <p>
            <strong>When to use Replit:</strong> Tasks you'd delegate to a junior developer for 4+ hours. If it takes you 30 minutes, use Cursor instead.
          </p>
        </div>
      </div>
    </ContentSection>

    {/* Section 6: How to Budget */}
    <ContentSection>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-[#2D2A26] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          How to Budget for AI Coding in 2026
        </h2>
        <div className="prose prose-lg text-[#2D2A26]/70 space-y-4">
          <p>
            Based on analyzing hundreds of projects, here's a realistic budgeting framework:
          </p>
          <div className="bg-white/60 rounded-xl p-5 border border-[#2D2A26]/10 not-prose space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#2D2A26]/10 rounded-full flex items-center justify-center text-sm font-bold text-[#2D2A26]">1</div>
              <div>
                <div className="font-semibold text-[#2D2A26]">Take the sticker price and multiply by 3</div>
                <div className="text-sm text-[#2D2A26]/60">$20/mo advertised = budget $60/mo</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#2D2A26]/10 rounded-full flex items-center justify-center text-sm font-bold text-[#2D2A26]">2</div>
              <div>
                <div className="font-semibold text-[#2D2A26]">Add infrastructure costs</div>
                <div className="text-sm text-[#2D2A26]/60">Supabase $25 + Vercel $20 = $45/mo</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#2D2A26]/10 rounded-full flex items-center justify-center text-sm font-bold text-[#2D2A26]">3</div>
              <div>
                <div className="font-semibold text-[#2D2A26]">Account for your skill level</div>
                <div className="text-sm text-[#2D2A26]/60">Beginners: add 50% | Experts: subtract 25%</div>
              </div>
            </div>
          </div>
          <p>
            <strong>Example:</strong> Building a 10-screen SaaS with backend
          </p>
          <ul>
            <li>Cursor: $20 x 3 = $60 + $45 infra = <strong>$105/mo</strong></li>
            <li>Bolt: $20 x 3 = $60 + $45 infra = <strong>$105/mo</strong></li>
            <li>Replit: $25 x 5 = $125 + $45 infra = <strong>$170/mo</strong></li>
          </ul>
        </div>
      </div>
    </ContentSection>

    {/* Section 7: FAQ */}
    <ContentSection>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-[#2D2A26] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {/* Beginner Questions First */}
          <div className="text-xs text-[#2D2A26]/40 uppercase tracking-wider font-medium mb-2">For Beginners</div>
          {[
            {
              q: 'What is vibe coding? Can I really build apps without coding?',
              a: 'Yes! Vibe coding means describing what you want in plain English, and AI writes the code. You say "make a login page with Google sign-in" and the AI creates it. No programming knowledge needed to start.'
            },
            {
              q: 'Which AI coding tool should I try first as a complete beginner?',
              a: 'Start with Cursor ($20/month). It has unlimited "slow" requests, so you can practice and make mistakes without extra charges. Bolt.new and Lovable look simpler but charge extra when you hit limits.'
            },
            {
              q: 'What do "tokens", "credits", and "checkpoints" mean?',
              a: 'Tokens = how AI measures text (roughly 1 word = 1.3 tokens). Credits = points you spend per AI request. Checkpoints = Replit\'s way of charging each time AI saves progress. Different platforms use different terms for billing.'
            },
            {
              q: 'Do I need a backend/database? What does that even mean?',
              a: 'Backend = the "invisible" part that stores data (user accounts, posts, orders). If your app needs to save anything or have user logins, you need a backend. This adds ~$45/month (Supabase + Vercel) to your costs.'
            },
          ].map((faq, i) => (
            <div key={`beginner-${i}`} className="bg-[#2D2A26]/[0.02] rounded-xl p-5 border border-[#2D2A26]/8">
              <h3 className="font-semibold text-[#2D2A26] mb-2">{faq.q}</h3>
              <p className="text-sm text-[#2D2A26]/70">{faq.a}</p>
            </div>
          ))}
          
          {/* Developer/Advanced Questions */}
          <div className="text-xs text-[#2D2A26]/40 uppercase tracking-wider font-medium mt-6 mb-2">For Developers & Power Users</div>
          {[
            {
              q: 'What is the cheapest AI coding tool for sustained development?',
              a: 'Cursor at $20/month with unlimited slow requests. You can\'t accidentally overspend, and the slow queue is usually only 10-30 seconds during peak times. Best for iterative work.'
            },
            {
              q: 'Why did my AI coding bill get so high?',
              a: 'Usually credit overages (Lovable, Windsurf) or checkpoint fees (Replit). Switch to Cursor which has hard caps, or set spending limits in your platform settings.'
            },
            {
              q: 'Is vibe coding worth the cost vs traditional development?',
              a: 'For prototyping and MVPs, yes. A $100/month AI coding budget can replace 20+ hours of manual coding. For production code, treat it as a 60% speed boost requiring human review.'
            },
            {
              q: 'Supabase + Vercel: free tier vs paid?',
              a: 'Free tiers work for development and small projects (<500 users). For production with real traffic: budget $45-50/month minimum. The jump is usually at ~10K monthly requests.'
            },
          ].map((faq, i) => (
            <div key={`dev-${i}`} className="bg-white/60 rounded-xl p-5 border border-[#2D2A26]/10">
              <h3 className="font-semibold text-[#2D2A26] mb-2">{faq.q}</h3>
              <p className="text-sm text-[#2D2A26]/70">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </ContentSection>
  </div>
)

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================
export default function VibeCostEstimator() {
  useEffect(() => {
    document.title = SEO_TITLE
    const updateMeta = (name, content, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name'
      let meta = document.querySelector(`meta[${attr}="${name}"]`)
      if (!meta) { meta = document.createElement('meta'); meta.setAttribute(attr, name); document.head.appendChild(meta) }
      meta.setAttribute('content', content)
    }
    updateMeta('description', SEO_DESC)
    updateMeta('keywords', SEO_KEYWORDS)
    updateMeta('og:title', SEO_TITLE, true)
    updateMeta('og:description', SEO_DESC, true)
    updateMeta('og:type', 'website', true)
    
    // Rich FAQ schema for Google - includes BOTH beginner and developer questions
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        // Beginner questions
        { '@type': 'Question', 'name': 'What is vibe coding?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Vibe coding is building apps by describing what you want in plain English. AI tools like Cursor, Bolt.new, and Replit write the code for you. No programming knowledge required to start.' }},
        { '@type': 'Question', 'name': 'Can I really build an app without coding knowledge?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes! AI coding tools let you describe what you want ("make a login page with Google sign-in") and generate working code. Beginners can build real apps, though complex features may need iteration.' }},
        { '@type': 'Question', 'name': 'Which AI coding tool is best for beginners?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Cursor at $20/month is best for beginners because it has unlimited slow requests - you can practice and make mistakes without extra charges. Bolt.new looks easier but charges extra when you hit limits.' }},
        // Developer questions  
        { '@type': 'Question', 'name': 'How much does Cursor cost?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Cursor Pro costs $20/month with 500 fast requests and unlimited slow requests. Real-world cost is typically $20-40/month as you cannot exceed the limit.' }},
        { '@type': 'Question', 'name': 'Why did Cursor use all my credits?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Cursor fast credits are consumed by Composer mode (multi-file edits), complex prompts, and large codebase indexing. After 500 fast requests, you switch to unlimited slow requests with no additional cost.' }},
        { '@type': 'Question', 'name': 'How much does it cost to build an app with AI?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Building a production-ready app costs $50-200/month including AI tools and infrastructure. Simple apps: $50-75/month. Complex SaaS: $150-200/month.' }},
        { '@type': 'Question', 'name': 'Is Replit more expensive than Cursor?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes. Replit charges $0.25 per checkpoint, typically costing $75-350/month for active development. Cursor is capped at $20/month with no overages.' }},
        { '@type': 'Question', 'name': 'What is the cheapest AI coding tool?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Cursor at $20/month is the cheapest for sustained development because it has unlimited slow requests and no overage charges.' }},
        { '@type': 'Question', 'name': 'How much does Bolt.new cost?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Bolt.new Pro costs $20/month with a 10 million token cap. Real-world usage for a full app often hits this limit, making effective cost $20-80/month depending on project size.' }},
      ]
    }
    
    let script = document.querySelector('script[data-schema="vibe-cost"]')
    if (!script) {
      script = document.createElement('script')
      script.type = 'application/ld+json'
      script.setAttribute('data-schema', 'vibe-cost')
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(schema)
    
    return () => {
      document.title = 'VibeBrews'
      script?.remove()
    }
  }, [])
  
  const [showBeginnerIntro, setShowBeginnerIntro] = useState(false)
  
  // Check if first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem('vibeCost_hasVisited')
    if (!hasVisited) {
      setShowBeginnerIntro(true)
    }
  }, [])
  
  const dismissBeginnerIntro = () => {
    setShowBeginnerIntro(false)
    localStorage.setItem('vibeCost_hasVisited', 'true')
  }
  
  return (
    <PageTransition>
      <div className="fixed inset-0 -z-10" style={{ background: 'linear-gradient(180deg, #F8F5F0 0%, #EDE8E0 100%)' }} />
      <div className="relative z-10 min-h-screen px-4 md:px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header - Welcoming to both beginners and developers */}
          <motion.div className="text-center mb-6" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#2D2A26]/5 text-[#2D2A26]/70 rounded-full text-xs font-medium mb-3">
              <span className="text-[#2D2A26]/50">{Icons.check}</span>
              <span>No coding knowledge required</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#2D2A26] mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              AI App Builder Cost Calculator
            </h1>
            <p className="text-[#2D2A26]/60 text-sm md:text-base max-w-2xl mx-auto">
              <span className="hidden md:inline">Building an app with AI? </span>
              Find out what Cursor, Bolt, Replit, and Lovable <em>actually</em> cost - not just the advertised price.
            </p>
            
            {/* Audience badges */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#2D2A26]/5 rounded-full text-[11px] text-[#2D2A26]/60 font-medium">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                For Beginners
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#2D2A26]/5 rounded-full text-[11px] text-[#2D2A26]/60 font-medium">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                For Developers
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#2D2A26]/5 rounded-full text-[11px] text-[#2D2A26]/60 font-medium">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                No-Code Friendly
              </span>
            </div>
          </motion.div>
          
          {/* Beginner Intro - Shows for first-time visitors or on demand */}
          <AnimatePresence>
            {showBeginnerIntro && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 overflow-hidden"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-[#2D2A26]/8 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-bold text-[#2D2A26] mb-2 flex items-center gap-2">
                        <span className="text-[#2D2A26]/50">{Icons.wave}</span> 
                        <span>New to AI Coding?</span>
                      </h2>
                      <p className="text-sm text-[#2D2A26]/70 mb-4 leading-relaxed">
                        <strong className="text-[#2D2A26]">Vibe coding</strong> lets you build apps by describing what you want in plain English - no programming required. 
                        Tools like Cursor, Bolt, and Replit use AI to write the code for you.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div className="flex items-start gap-3 p-3 bg-[#2D2A26]/[0.03] rounded-xl">
                          <div className="p-2 bg-[#2D2A26]/10 rounded-lg text-[#2D2A26]/70 shrink-0">
                            {Icons.chat}
                          </div>
                          <div>
                            <div className="font-semibold text-[#2D2A26]">You describe</div>
                            <div className="text-[#2D2A26]/50">"Make a login page"</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-[#2D2A26]/[0.03] rounded-xl">
                          <div className="p-2 bg-[#2D2A26]/10 rounded-lg text-[#2D2A26]/70 shrink-0">
                            {Icons.robot}
                          </div>
                          <div>
                            <div className="font-semibold text-[#2D2A26]">AI writes code</div>
                            <div className="text-[#2D2A26]/50">Creates the whole page</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-[#2D2A26]/[0.03] rounded-xl">
                          <div className="p-2 bg-[#2D2A26]/10 rounded-lg text-[#2D2A26]/70 shrink-0">
                            {Icons.rocket}
                          </div>
                          <div>
                            <div className="font-semibold text-[#2D2A26]">You launch</div>
                            <div className="text-[#2D2A26]/50">A real working app</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={dismissBeginnerIntro}
                      className="text-[#2D2A26]/30 hover:text-[#2D2A26]/60 hover:bg-[#2D2A26]/5 transition-all p-2 rounded-lg"
                      aria-label="Dismiss"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Show intro button if dismissed */}
          {!showBeginnerIntro && (
            <motion.div 
              className="flex justify-center mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <button
                onClick={() => setShowBeginnerIntro(true)}
                className="text-xs text-[#2D2A26]/40 hover:text-[#2D2A26]/60 transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-[#2D2A26]/5"
              >
                <span className="text-[#2D2A26]/40">{Icons.wave}</span> 
                <span>New to AI coding? Click here for a quick intro</span>
              </button>
            </motion.div>
          )}
          
          {/* Quick Answer Box - Immediate value for searchers */}
          <QuickAnswerBox />
          
          {/* Main Calculator */}
          <VibeCostTool />
          
          {/* SEO Blog Content */}
          <SEOContent />
          
          {/* Footer */}
          <motion.footer 
            className="mt-20 pt-8 border-t border-[#2D2A26]/10" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.5 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <img 
                  src="/vibebrews-logo.png" 
                  alt="VibeBrews" 
                  className="w-8 h-8 rounded-lg" 
                />
                <span className="text-[#2D2A26]/70 text-sm">A free tool by <strong>VibeBrews</strong></span>
              </div>
              <nav className="flex gap-6 text-sm text-[#2D2A26]/50">
                <Link to="/" className="hover:text-[#2D2A26] transition-colors">Home</Link>
                <Link to="/ai-token-calculator" className="hover:text-[#2D2A26] transition-colors">Token Calculator</Link>
                <Link to="/ai-model-picker" className="hover:text-[#2D2A26] transition-colors">AI Model Picker</Link>
              </nav>
            </div>
            <p className="mt-6 text-center text-xs text-[#2D2A26]/30 max-w-2xl mx-auto">
              Estimates based on typical usage patterns as of January 2026. Actual costs vary based on prompting efficiency, project complexity, and platform updates. Prices may change - check official websites for current pricing.
            </p>
          </motion.footer>
        </div>
      </div>
    </PageTransition>
  )
}
