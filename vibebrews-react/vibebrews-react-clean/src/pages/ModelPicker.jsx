import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import { Link } from 'react-router-dom'

// ============================================================================
// SEO CONFIGURATION - 2026 HIGH-CONVERTING KEYWORDS
// ============================================================================
const SEO_TITLE = 'Which AI Model Should I Use? Free Quiz 2026 | Claude vs GPT vs Gemini'
const SEO_DESC = 'Take our 60-second quiz to find the perfect AI model for your needs. Compare Claude Opus 4.5, GPT-5.2, Gemini 3, and more. Updated for 2026 pricing and capabilities.'
const SEO_KEYWORDS = 'which ai model should i use, best ai for coding 2026, claude vs chatgpt, gpt vs claude comparison, ai model comparison quiz, best llm for programming, claude opus vs gpt 5, gemini vs chatgpt, ai coding assistant comparison'

// ============================================================================
// CUSTOM SVG ICONS
// ============================================================================
const Icons = {
  sparkles: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></svg>,
  code: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  pen: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"/></svg>,
  wallet: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/></svg>,
  piggy: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z"/><path d="M2 9v1c0 1.1.9 2 2 2h1"/><path d="M16 11h.01"/></svg>,
  brain: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M19.938 10.5a4 4 0 0 1 .585.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M19.967 17.484A4 4 0 0 1 18 18"/></svg>,
  layers: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg>,
  zap: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>,
  clock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  target: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  gem: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M6 3h12l4 6-10 13L2 9Z"/><path d="M11 3 8 9l4 13 4-13-3-6"/><path d="M2 9h20"/></svg>,
  wrench: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  share: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
  refresh: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>,
  chevronLeft: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="m15 18-6-6 6-6"/></svg>,
  chevronRight: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="m9 18 6-6-6-6"/></svg>,
  check: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><polyline points="20 6 9 17 4 12"/></svg>,
  copy: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>,
  download: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  twitter: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  linkedin: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  arrowRight: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>,
}

// ============================================================================
// MODEL DATABASE - 2026 GENERATION (THE "TRUTH")
// ============================================================================
const models = [
  {
    id: 'grok-code',
    name: 'Grok Code',
    tagline: 'The Speed Demon',
    description: 'Extremely low-cost, high-speed coding. Best for quick scripts, boilerplate generation, and rapid iteration.',
    weights: { coding: 9, creative: 2, logic: 6, cost: 10 },
    provider: 'xAI',
    pricing: '$0.20 / $1.50 per 1M tokens',
    bestFor: ['Quick scripts', 'Boilerplate code', 'Simple completions'],
    color: '#1DA1F2',
    gradient: 'from-blue-500 to-cyan-400'
  },
  {
    id: 'claude-opus-4-5',
    name: 'Claude Opus 4.5',
    tagline: 'The Deep Thinker',
    description: 'Maximum reasoning capability. The "PhD" in the room for complex architecture decisions and nuanced problems.',
    weights: { coding: 8, creative: 10, logic: 10, cost: 1 },
    provider: 'Anthropic',
    pricing: '$5.00 / $25.00 per 1M tokens',
    bestFor: ['Complex architecture', 'Deep reasoning', 'Creative writing'],
    color: '#D97706',
    gradient: 'from-amber-500 to-orange-400'
  },
  {
    id: 'gpt-5-2',
    name: 'GPT-5.2',
    tagline: 'The All-Rounder',
    description: 'Solid general purpose reasoning and logic. The reliable workhorse for most production applications.',
    weights: { coding: 7, creative: 7, logic: 8, cost: 5 },
    provider: 'OpenAI',
    pricing: '$1.75 / $14.00 per 1M tokens',
    bestFor: ['General tasks', 'API integrations', 'Production apps'],
    color: '#10B981',
    gradient: 'from-emerald-500 to-green-400'
  },
  {
    id: 'gemini-3-flash',
    name: 'Gemini 3 Flash',
    tagline: 'The Context King',
    description: 'High volume processing with massive context window. Best for analyzing entire codebases at once.',
    weights: { coding: 6, creative: 6, logic: 6, cost: 9 },
    provider: 'Google',
    pricing: '$0.50 / $3.00 per 1M tokens',
    bestFor: ['Large codebases', 'Document analysis', 'High volume'],
    color: '#4285F4',
    gradient: 'from-blue-500 to-indigo-400'
  },
  {
    id: 'composer-1',
    name: 'Composer 1',
    tagline: 'The Agent',
    description: "Cursor's native agentic model. Best for multi-file refactors and complex codebase operations.",
    weights: { coding: 10, creative: 3, logic: 8, cost: 4 },
    provider: 'Cursor',
    pricing: '$1.25 / $10.00 per 1M tokens',
    bestFor: ['Multi-file refactors', 'Agentic workflows', 'IDE integration'],
    color: '#8B5CF6',
    gradient: 'from-violet-500 to-purple-400'
  }
]

// ============================================================================
// QUIZ QUESTIONS (THE INPUTS)
// ============================================================================
const questions = [
  {
    id: 'useCase',
    question: "What's your main use case?",
    subtitle: 'This helps us understand your workflow',
    iconLeft: Icons.pen,
    iconRight: Icons.code,
    options: {
      left: {
        label: 'Creative Work',
        desc: 'Writing, brainstorming, marketing',
        scores: { coding: 0, creative: 3, logic: 1, cost: 0 }
      },
      right: {
        label: 'Technical Work',
        desc: 'Coding, debugging, architecture',
        scores: { coding: 3, creative: 0, logic: 2, cost: 0 }
      }
    }
  },
  {
    id: 'budget',
    question: "How's your budget looking?",
    subtitle: 'Every dollar counts (or does it?)',
    iconLeft: Icons.wallet,
    iconRight: Icons.piggy,
    options: {
      left: {
        label: 'Company Card',
        desc: 'Unlimited budget, best results only',
        scores: { coding: 0, creative: 2, logic: 2, cost: -3 }
      },
      right: {
        label: 'Bootstrap Mode',
        desc: 'Every token counts, optimize cost',
        scores: { coding: 0, creative: 0, logic: 0, cost: 4 }
      }
    }
  },
  {
    id: 'taskType',
    question: 'What type of task?',
    subtitle: 'Different models excel at different things',
    iconLeft: Icons.brain,
    iconRight: Icons.layers,
    options: {
      left: {
        label: 'Deep Reasoning',
        desc: 'Complex logic, architecture decisions',
        scores: { coding: 1, creative: 2, logic: 4, cost: 0 }
      },
      right: {
        label: 'Large Scale',
        desc: 'Refactoring 50 files, big codebases',
        scores: { coding: 3, creative: 0, logic: 1, cost: 2 }
      }
    }
  },
  {
    id: 'patience',
    question: 'How patient are you?',
    subtitle: 'Speed vs quality trade-off',
    iconLeft: Icons.target,
    iconRight: Icons.zap,
    options: {
      left: {
        label: 'Best Answer',
        desc: "Smartest response, even if it's 30s",
        scores: { coding: 1, creative: 3, logic: 3, cost: -2 }
      },
      right: {
        label: 'Need It Now',
        desc: 'Fast iterations, quick feedback',
        scores: { coding: 2, creative: 0, logic: 0, cost: 3 }
      }
    }
  },
  {
    id: 'vibeCheck',
    question: 'Vibe check',
    subtitle: 'What kind of developer are you?',
    iconLeft: Icons.gem,
    iconRight: Icons.wrench,
    options: {
      left: {
        label: 'Perfectionist',
        desc: 'Clean, documented, beautiful code',
        scores: { coding: 1, creative: 3, logic: 2, cost: -1 }
      },
      right: {
        label: 'Hacker Mode',
        desc: 'Ship it, fix it later, just works',
        scores: { coding: 3, creative: 0, logic: 1, cost: 2 }
      }
    }
  }
]

// ============================================================================
// WINNER CALCULATION FUNCTION
// ============================================================================
function calculateWinner(userPreferences) {
  const results = models.map(model => {
    let score = 0
    score += model.weights.coding * Math.max(0, userPreferences.coding)
    score += model.weights.creative * Math.max(0, userPreferences.creative)
    score += model.weights.logic * Math.max(0, userPreferences.logic)
    score += model.weights.cost * Math.max(0, userPreferences.cost)
    return { ...model, score }
  }).sort((a, b) => b.score - a.score)
  
  return {
    winner: results[0],
    runnerUp: results[1],
    allResults: results
  }
}

// ============================================================================
// CONFETTI EFFECT
// ============================================================================
const createConfetti = () => {
  const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8']
  const confettiCount = 150
  
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div')
    confetti.style.cssText = `
      position: fixed;
      width: ${Math.random() * 10 + 5}px;
      height: ${Math.random() * 10 + 5}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      left: ${Math.random() * 100}vw;
      top: -20px;
      border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
      pointer-events: none;
      z-index: 9999;
      animation: confetti-fall ${Math.random() * 3 + 2}s linear forwards;
    `
    document.body.appendChild(confetti)
    setTimeout(() => confetti.remove(), 5000)
  }
}

// Add confetti animation styles
const confettiStyles = `
  @keyframes confetti-fall {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(100vh) rotate(${Math.random() * 720}deg);
      opacity: 0;
    }
  }
`

// ============================================================================
// SWIPEABLE CARD COMPONENT
// ============================================================================
const SwipeCard = ({ question, onSwipe, isActive }) => {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-25, 25])
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5])
  
  const leftIndicatorOpacity = useTransform(x, [-200, -50, 0], [1, 0.5, 0])
  const rightIndicatorOpacity = useTransform(x, [0, 50, 200], [0, 0.5, 1])
  
  const handleDragEnd = (_, info) => {
    const threshold = 100
    if (info.offset.x > threshold) {
      onSwipe('right')
    } else if (info.offset.x < -threshold) {
      onSwipe('left')
    }
  }

  return (
    <motion.div
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      style={{ x, rotate, opacity }}
      drag={isActive ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ 
        x: x.get() > 0 ? 300 : -300,
        opacity: 0,
        transition: { duration: 0.3 }
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <div className="relative h-full bg-white rounded-3xl shadow-2xl border border-[#2D2A26]/5 overflow-hidden">
        {/* Card Content */}
        <div className="h-full flex flex-col p-6 md:p-8">
          {/* Question */}
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#2D2A26] mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {question.question}
            </h2>
            <p className="text-[#2D2A26]/50 text-sm">{question.subtitle}</p>
          </div>

          {/* Options */}
          <div className="flex-1 flex items-center justify-center">
            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
              {/* Left Option */}
              <motion.div 
                className="relative p-4 md:p-6 rounded-2xl border-2 border-[#2D2A26]/10 bg-gradient-to-br from-[#2D2A26]/[0.02] to-transparent"
                style={{ opacity: useTransform(x, [0, -100], [0.7, 1]) }}
              >
                <motion.div 
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-rose-500/20 to-pink-500/20 pointer-events-none"
                  style={{ opacity: leftIndicatorOpacity }}
                />
                <div className="relative z-10 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-[#2D2A26]/5 flex items-center justify-center text-[#2D2A26]/60">
                    {question.iconLeft}
                  </div>
                  <div className="font-semibold text-[#2D2A26] mb-1">{question.options.left.label}</div>
                  <div className="text-xs text-[#2D2A26]/50">{question.options.left.desc}</div>
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                  <span className="text-xs text-[#2D2A26]/30 font-medium">← Swipe Left</span>
                </div>
              </motion.div>

              {/* Right Option */}
              <motion.div 
                className="relative p-4 md:p-6 rounded-2xl border-2 border-[#2D2A26]/10 bg-gradient-to-br from-[#2D2A26]/[0.02] to-transparent"
                style={{ opacity: useTransform(x, [0, 100], [0.7, 1]) }}
              >
                <motion.div 
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 pointer-events-none"
                  style={{ opacity: rightIndicatorOpacity }}
                />
                <div className="relative z-10 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-[#2D2A26]/5 flex items-center justify-center text-[#2D2A26]/60">
                    {question.iconRight}
                  </div>
                  <div className="font-semibold text-[#2D2A26] mb-1">{question.options.right.label}</div>
                  <div className="text-xs text-[#2D2A26]/50">{question.options.right.desc}</div>
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                  <span className="text-xs text-[#2D2A26]/30 font-medium">Swipe Right →</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Tap hints for mobile */}
          <div className="mt-4 flex justify-center gap-4">
            <button 
              onClick={() => onSwipe('left')}
              className="px-4 py-2 rounded-xl bg-[#2D2A26]/5 text-[#2D2A26]/60 text-sm font-medium hover:bg-[#2D2A26]/10 transition-colors flex items-center gap-2"
            >
              {Icons.chevronLeft} Left
            </button>
            <button 
              onClick={() => onSwipe('right')}
              className="px-4 py-2 rounded-xl bg-[#2D2A26]/5 text-[#2D2A26]/60 text-sm font-medium hover:bg-[#2D2A26]/10 transition-colors flex items-center gap-2"
            >
              Right {Icons.chevronRight}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ============================================================================
// PROGRESS DOTS
// ============================================================================
const ProgressDots = ({ current, total }) => (
  <div className="flex justify-center gap-2">
    {Array.from({ length: total }).map((_, i) => (
      <motion.div
        key={i}
        className={`w-2 h-2 rounded-full ${i < current ? 'bg-[#2D2A26]' : i === current ? 'bg-[#2D2A26]/60' : 'bg-[#2D2A26]/20'}`}
        initial={false}
        animate={{ scale: i === current ? 1.3 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      />
    ))}
  </div>
)

// ============================================================================
// RESULT CARD
// ============================================================================
const ResultCard = ({ result, userPreferences, onRetake }) => {
  const [copied, setCopied] = useState(false)
  const [showAllModels, setShowAllModels] = useState(false)
  const cardRef = useRef(null)
  
  const { winner, runnerUp, allResults } = result

  const copyShareText = () => {
    const text = `I took the AI Model Quiz and got ${winner.name} - "${winner.tagline}" 🤖\n\nFind your perfect AI model: vibebrews.com/ai-model-picker`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareToTwitter = () => {
    const text = encodeURIComponent(`I took the AI Model Quiz and got ${winner.name} - "${winner.tagline}" 🤖\n\nFind your perfect AI model:`)
    const url = encodeURIComponent('https://vibebrews.com/ai-model-picker')
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank')
  }

  const shareToLinkedIn = () => {
    const url = encodeURIComponent('https://vibebrews.com/ai-model-picker')
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank')
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className="w-full max-w-2xl mx-auto"
    >
      {/* Main Result Card */}
      <div ref={cardRef} className="bg-white rounded-3xl shadow-2xl border border-[#2D2A26]/5 overflow-hidden">
        {/* Header with gradient */}
        <div className={`relative h-32 bg-gradient-to-br ${winner.gradient} flex items-center justify-center`}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            className="text-white text-6xl"
          >
            {Icons.sparkles}
          </motion.div>
          <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">
            Score: {winner.score.toFixed(0)}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-[#2D2A26]/50 text-sm uppercase tracking-wider mb-2">Your Perfect Match</div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2D2A26] mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {winner.name}
            </h2>
            <p className="text-xl text-[#2D2A26]/60 italic mb-4">"{winner.tagline}"</p>
            <p className="text-[#2D2A26]/70 max-w-md mx-auto mb-6">{winner.description}</p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6"
          >
            {[
              { label: 'Coding', value: winner.weights.coding },
              { label: 'Creative', value: winner.weights.creative },
              { label: 'Logic', value: winner.weights.logic },
              { label: 'Cost Efficiency', value: winner.weights.cost },
            ].map((stat, i) => (
              <div key={stat.label} className="bg-[#2D2A26]/5 rounded-xl p-3">
                <div className="text-xs text-[#2D2A26]/50 mb-1">{stat.label}</div>
                <div className="flex items-center gap-1">
                  <div className="flex-1 h-1.5 bg-[#2D2A26]/10 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${winner.gradient}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.value * 10}%` }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                    />
                  </div>
                  <span className="text-xs font-mono text-[#2D2A26]/60">{stat.value}</span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Best For */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-6"
          >
            <div className="text-xs text-[#2D2A26]/50 uppercase tracking-wider mb-2">Best For</div>
            <div className="flex flex-wrap justify-center gap-2">
              {winner.bestFor.map(item => (
                <span key={item} className="px-3 py-1 bg-[#2D2A26]/5 rounded-full text-sm text-[#2D2A26]/70">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Pricing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-6 p-4 bg-[#2D2A26]/5 rounded-2xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-[#2D2A26]/50">Provider</div>
                <div className="font-medium text-[#2D2A26]">{winner.provider}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-[#2D2A26]/50">Pricing (in/out)</div>
                <div className="font-mono text-sm text-[#2D2A26]">{winner.pricing}</div>
              </div>
            </div>
          </motion.div>

          {/* Runner Up */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-6 p-4 border border-[#2D2A26]/10 rounded-2xl"
          >
            <div className="text-xs text-[#2D2A26]/40 mb-2">Also Consider</div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${runnerUp.gradient} flex items-center justify-center text-white text-xs`}>
                  #2
                </div>
                <div className="text-left">
                  <div className="font-medium text-[#2D2A26]">{runnerUp.name}</div>
                  <div className="text-xs text-[#2D2A26]/50">{runnerUp.tagline}</div>
                </div>
              </div>
              <div className="text-sm font-mono text-[#2D2A26]/50">Score: {runnerUp.score.toFixed(0)}</div>
            </div>
          </motion.div>
        </div>

        {/* Share Actions */}
        <div className="px-6 pb-6 md:px-8 md:pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <button
              onClick={copyShareText}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#2D2A26] text-white rounded-xl font-medium text-sm hover:bg-[#2D2A26]/90 transition-colors"
            >
              {copied ? Icons.check : Icons.copy}
              {copied ? 'Copied!' : 'Copy Result'}
            </button>
            <button
              onClick={shareToTwitter}
              className="flex items-center gap-2 px-4 py-2.5 bg-black text-white rounded-xl font-medium text-sm hover:bg-black/80 transition-colors"
            >
              {Icons.twitter}
              Share
            </button>
            <button
              onClick={shareToLinkedIn}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#0A66C2] text-white rounded-xl font-medium text-sm hover:bg-[#0A66C2]/90 transition-colors"
            >
              {Icons.linkedin}
              Post
            </button>
          </motion.div>
        </div>
      </div>

      {/* Compare All Models */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-6"
      >
        <button
          onClick={() => setShowAllModels(!showAllModels)}
          className="w-full text-center text-[#2D2A26]/50 text-sm hover:text-[#2D2A26] transition-colors flex items-center justify-center gap-2"
        >
          {showAllModels ? 'Hide' : 'Compare'} all models {Icons.arrowRight}
        </button>

        <AnimatePresence>
          {showAllModels && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 space-y-2 overflow-hidden"
            >
              {allResults.map((model, i) => (
                <motion.div
                  key={model.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`p-4 rounded-xl border ${model.id === winner.id ? 'border-[#2D2A26]/20 bg-[#2D2A26]/5' : 'border-[#2D2A26]/10 bg-white'}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${model.gradient} flex items-center justify-center text-white text-xs font-bold`}>
                        #{i + 1}
                      </div>
                      <div>
                        <div className="font-medium text-[#2D2A26]">{model.name}</div>
                        <div className="text-xs text-[#2D2A26]/50">{model.tagline}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold text-[#2D2A26]">{model.score.toFixed(0)}</div>
                      <div className="text-xs text-[#2D2A26]/40">score</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Retake Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="mt-6 text-center"
      >
        <button
          onClick={onRetake}
          className="inline-flex items-center gap-2 px-6 py-3 text-[#2D2A26]/60 hover:text-[#2D2A26] transition-colors text-sm font-medium"
        >
          {Icons.refresh}
          Take Quiz Again
        </button>
      </motion.div>
    </motion.div>
  )
}

// ============================================================================
// MAIN QUIZ COMPONENT
// ============================================================================
const ModelPickerQuiz = () => {
  const [stage, setStage] = useState('intro') // intro, quiz, result
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [preferences, setPreferences] = useState({ coding: 0, creative: 0, logic: 0, cost: 0 })
  const [result, setResult] = useState(null)
  const [answers, setAnswers] = useState([])

  const handleStart = () => {
    setStage('quiz')
  }

  const handleSwipe = useCallback((direction) => {
    const question = questions[currentQuestion]
    const option = direction === 'left' ? question.options.left : question.options.right
    
    // Update preferences
    const newPrefs = {
      coding: preferences.coding + option.scores.coding,
      creative: preferences.creative + option.scores.creative,
      logic: preferences.logic + option.scores.logic,
      cost: preferences.cost + option.scores.cost
    }
    setPreferences(newPrefs)
    setAnswers([...answers, { question: question.id, choice: direction }])

    // Move to next question or show result
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Calculate winner and show result
      const calculatedResult = calculateWinner(newPrefs)
      setResult(calculatedResult)
      setStage('result')
      
      // Trigger confetti
      setTimeout(() => {
        createConfetti()
      }, 300)
    }
  }, [currentQuestion, preferences, answers])

  const handleRetake = () => {
    setStage('intro')
    setCurrentQuestion(0)
    setPreferences({ coding: 0, creative: 0, logic: 0, cost: 0 })
    setResult(null)
    setAnswers([])
  }

  return (
    <div className="w-full min-h-[600px] md:min-h-[700px]">
      {/* Inject confetti styles */}
      <style>{confettiStyles}</style>

      <AnimatePresence mode="wait">
        {/* INTRO SCREEN */}
        {stage === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center py-12"
          >
            <motion.div
              className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-[#2D2A26] to-[#4a4540] flex items-center justify-center text-white"
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5, type: 'spring' }}
            >
              {Icons.sparkles}
            </motion.div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-[#2D2A26] mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Find Your Perfect AI Model
            </h2>
            <p className="text-[#2D2A26]/60 max-w-md mx-auto mb-8">
              Answer 5 quick questions and we'll match you with the best AI model for your workflow. Takes 60 seconds.
            </p>

            <motion.button
              onClick={handleStart}
              className="px-8 py-4 bg-[#2D2A26] text-white rounded-2xl font-medium text-lg hover:bg-[#2D2A26]/90 transition-all shadow-lg hover:shadow-xl hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Quiz
            </motion.button>

            {/* Preview Models */}
            <div className="mt-12">
              <div className="text-xs text-[#2D2A26]/40 uppercase tracking-wider mb-4">Models We Compare</div>
              <div className="flex flex-wrap justify-center gap-3">
                {models.map(model => (
                  <div
                    key={model.id}
                    className={`px-4 py-2 rounded-xl bg-gradient-to-br ${model.gradient} text-white text-sm font-medium opacity-80`}
                  >
                    {model.name}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* QUIZ SCREEN */}
        {stage === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative"
          >
            {/* Progress */}
            <div className="mb-6">
              <div className="text-center text-sm text-[#2D2A26]/50 mb-3">
                Question {currentQuestion + 1} of {questions.length}
              </div>
              <ProgressDots current={currentQuestion} total={questions.length} />
            </div>

            {/* Card Container */}
            <div className="relative h-[450px] md:h-[500px]">
              <AnimatePresence mode="wait">
                <SwipeCard
                  key={currentQuestion}
                  question={questions[currentQuestion]}
                  onSwipe={handleSwipe}
                  isActive={true}
                />
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* RESULT SCREEN */}
        {stage === 'result' && result && (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ResultCard
              result={result}
              userPreferences={preferences}
              onRetake={handleRetake}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ============================================================================
// SEO CONTENT SECTIONS
// ============================================================================
const SEOContent = () => (
  <div className="mt-16 space-y-16">
    {/* Section 1 */}
    <section className="max-w-3xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-[#2D2A26] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        Which AI Model Should I Use in 2026?
      </h2>
      <div className="prose prose-lg text-[#2D2A26]/70">
        <p>With the explosion of AI models in 2026, choosing the right one has become overwhelming. <strong>Claude Opus 4.5</strong>, <strong>GPT-5.2</strong>, <strong>Gemini 3</strong>, and specialized coding models like <strong>Grok Code</strong> all have different strengths.</p>
        <p>The key factors to consider are: <strong>reasoning capability</strong>, <strong>coding performance</strong>, <strong>context window size</strong>, and <strong>cost per token</strong>. Our quiz weighs these factors based on your actual workflow.</p>
      </div>
    </section>

    {/* Section 2 - Comparison */}
    <section className="max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-[#2D2A26] mb-6 text-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        Claude vs GPT vs Gemini: 2026 Comparison
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm bg-white/60 rounded-2xl overflow-hidden">
          <thead className="bg-[#2D2A26]/5">
            <tr>
              <th className="text-left py-4 px-4 text-[#2D2A26]/60 font-medium">Model</th>
              <th className="text-center py-4 px-4 text-[#2D2A26]/60 font-medium">Best For</th>
              <th className="text-center py-4 px-4 text-[#2D2A26]/60 font-medium">Coding</th>
              <th className="text-center py-4 px-4 text-[#2D2A26]/60 font-medium">Reasoning</th>
              <th className="text-right py-4 px-4 text-[#2D2A26]/60 font-medium">Price</th>
            </tr>
          </thead>
          <tbody>
            {models.map((model, i) => (
              <tr key={model.id} className="border-t border-[#2D2A26]/5">
                <td className="py-3 px-4">
                  <div className="font-medium text-[#2D2A26]">{model.name}</div>
                  <div className="text-xs text-[#2D2A26]/50">{model.provider}</div>
                </td>
                <td className="py-3 px-4 text-center text-[#2D2A26]/60 text-xs">{model.bestFor[0]}</td>
                <td className="py-3 px-4 text-center">
                  <span className={`inline-block w-8 h-8 rounded-lg bg-gradient-to-br ${model.gradient} text-white text-xs font-bold leading-8`}>
                    {model.weights.coding}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <span className={`inline-block w-8 h-8 rounded-lg bg-gradient-to-br ${model.gradient} text-white text-xs font-bold leading-8`}>
                    {model.weights.logic}
                  </span>
                </td>
                <td className="py-3 px-4 text-right font-mono text-xs text-[#2D2A26]/60">{model.pricing.split(' ')[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>

    {/* Section 3 - Best For Use Cases */}
    <section className="max-w-3xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-[#2D2A26] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        Best AI Model for Coding in 2026
      </h2>
      <div className="prose prose-lg text-[#2D2A26]/70">
        <p>For pure coding speed and cost efficiency, <strong>Grok Code</strong> leads with its $0.20/1M token input pricing. For complex architectural decisions, <strong>Claude Opus 4.5</strong> remains unmatched in reasoning.</p>
        <p>If you're doing multi-file refactors in Cursor, <strong>Composer 1</strong> is purpose-built for agentic coding workflows. For analyzing entire codebases, <strong>Gemini 3 Flash</strong>'s 1M+ context window handles massive repos without chunking.</p>
        <ul>
          <li><strong>Quick scripts & boilerplate:</strong> Grok Code</li>
          <li><strong>Complex architecture:</strong> Claude Opus 4.5</li>
          <li><strong>Production apps:</strong> GPT-5.2</li>
          <li><strong>Large codebase analysis:</strong> Gemini 3 Flash</li>
          <li><strong>Multi-file refactors:</strong> Composer 1</li>
        </ul>
      </div>
    </section>

    {/* FAQ Schema Content */}
    <section className="max-w-3xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-[#2D2A26] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {[
          {
            q: 'Is Claude better than ChatGPT for coding?',
            a: 'It depends on the task. Claude Opus 4.5 excels at complex reasoning and architecture decisions, while GPT-5.2 is better for general-purpose tasks. For raw coding speed, Grok Code is faster and cheaper than both.'
          },
          {
            q: 'What is the cheapest AI model for coding?',
            a: 'Grok Code at $0.20 per million input tokens is currently the cheapest high-quality option. Gemini 3 Flash at $0.50/1M is the best value for large context windows.'
          },
          {
            q: 'Which AI has the largest context window?',
            a: 'Gemini 3 Flash leads with over 1 million tokens of context, making it ideal for analyzing entire codebases without chunking.'
          },
          {
            q: 'Should I use Claude or GPT for my startup?',
            a: "For startups watching costs, GPT-5.2 offers the best balance of capability and price. If you need maximum reasoning for complex problems, Claude Opus 4.5 is worth the premium."
          }
        ].map((faq, i) => (
          <div key={i} className="p-4 bg-white/60 rounded-2xl border border-[#2D2A26]/5">
            <h3 className="font-semibold text-[#2D2A26] mb-2">{faq.q}</h3>
            <p className="text-[#2D2A26]/70 text-sm">{faq.a}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
)

// ============================================================================
// MAIN PAGE EXPORT
// ============================================================================
export default function ModelPicker() {
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
    updateMeta('og:url', 'https://vibebrews.com/ai-model-picker', true)
    
    // FAQ Schema for rich snippets
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'Which AI model should I use for coding?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'For quick scripts, use Grok Code. For complex architecture, use Claude Opus 4.5. For production apps, use GPT-5.2. For large codebases, use Gemini 3 Flash.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Is Claude better than ChatGPT?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Claude Opus 4.5 excels at complex reasoning and creative tasks, while GPT-5.2 is better for general-purpose applications. The best choice depends on your specific use case.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What is the cheapest AI API for developers?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Grok Code offers the lowest pricing at $0.20 per million input tokens, making it ideal for high-volume, cost-conscious applications.'
          }
        }
      ]
    }
    let script = document.querySelector('script[data-schema-quiz]')
    if (!script) {
      script = document.createElement('script')
      script.type = 'application/ld+json'
      script.setAttribute('data-schema-quiz', 'true')
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(schema)
    
    return () => {
      document.title = 'VibeBrews'
      script?.remove()
    }
  }, [])

  return (
    <PageTransition>
      {/* Background */}
      <div className="fixed inset-0 -z-10" style={{ background: 'linear-gradient(180deg, #F8F5F0 0%, #EDE8E0 100%)' }} />
      
      <div className="relative z-10 min-h-screen px-4 md:px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-[#2D2A26] mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              AI Model Picker
            </h1>
            <p className="text-[#2D2A26]/50 text-sm md:text-base">
              Find the perfect AI model for your workflow in 60 seconds
            </p>
          </motion.div>

          {/* Quiz Tool */}
          <ModelPickerQuiz />

          {/* SEO Content */}
          <SEOContent />

          {/* Footer */}
          <motion.footer
            className="mt-16 pt-8 border-t border-[#2D2A26]/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <img
                  src="https://play-lh.googleusercontent.com/lOGaWbwoVmJcBKAatXi0TFhY-XcZEPhat-f1sI6WRo2pd7uOq-kBv6f7t8N2GEljlPQwMxbpDWOt-XPzToP5fpE=w480-h960-rw"
                  alt="VibeBrews"
                  className="w-8 h-8 rounded-lg"
                />
                <span className="text-[#2D2A26]/70 text-sm">
                  A free tool by <strong>VibeBrews</strong>
                </span>
              </div>
              <nav className="flex gap-6 text-sm text-[#2D2A26]/50">
                <Link to="/" className="hover:text-[#2D2A26] transition-colors">Home</Link>
                <Link to="/ai-token-calculator" className="hover:text-[#2D2A26] transition-colors">Token Calculator</Link>
                <Link to="/color-palette-generator" className="hover:text-[#2D2A26] transition-colors">Color Palette</Link>
                <a
                  href="https://play.google.com/store/apps/details?id=com.nextap.vibebrews"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#2D2A26] transition-colors"
                >
                  Get App
                </a>
              </nav>
            </div>
          </motion.footer>
        </div>
      </div>
    </PageTransition>
  )
}
