import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useSpring, useScroll, useTransform } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import { Link } from 'react-router-dom'

// SEO
const SEO_TITLE = 'How Much Does ChatGPT API Cost? Free AI Token Calculator 2026'
const SEO_DESC = 'Calculate GPT-4, Claude, Gemini API costs instantly. Free token counter shows exactly how much your AI prompts cost. No signup. Updated pricing for 2026.'
const SEO_KEYWORDS = 'how much does chatgpt api cost, claude token pricing calculator, gpt-4 token counter free, how many tokens in 1000 words, ai api cost calculator'

// Default values when user hasn't entered anything
const DEFAULT_INPUT_TOKENS = 500
const DEFAULT_OUTPUT_TOKENS = 750

// ============================================================================
// CUSTOM SVG ICONS
// ============================================================================
const Icons = {
  calculator: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="4" y="2" width="16" height="20" rx="2" /><line x1="8" y1="6" x2="16" y2="6" /><line x1="8" y1="10" x2="8" y2="10.01" /><line x1="12" y1="10" x2="12" y2="10.01" /><line x1="16" y1="10" x2="16" y2="10.01" /><line x1="8" y1="14" x2="8" y2="14.01" /><line x1="12" y1="14" x2="12" y2="14.01" /><line x1="16" y1="14" x2="16" y2="14.01" /><line x1="8" y1="18" x2="8" y2="18.01" /><line x1="12" y1="18" x2="16" y2="18" /></svg>,
  compare: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="3" y="3" width="7" height="9" rx="1" /><rect x="14" y="3" width="7" height="5" rx="1" /><rect x="14" y="12" width="7" height="9" rx="1" /><rect x="3" y="16" width="7" height="5" rx="1" /></svg>,
  lightbulb: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M9 18h6" /><path d="M10 22h4" /><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14" /></svg>,
  budget: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>,
  convert: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 014-4h14" /><polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 01-4 4H3" /></svg>,
  target: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>,
  ruler: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M21.3 8.7l-8.6-8.6c-.4-.4-1-.4-1.4 0l-8.6 8.6c-.4.4-.4 1 0 1.4l8.6 8.6c.4.4 1 .4 1.4 0l8.6-8.6c.4-.4.4-1 0-1.4z" /><path d="M7.5 11.5L5 14" /><path d="M11.5 7.5L9 10" /></svg>,
  check: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><polyline points="20 6 9 17 4 12" /></svg>,
  copy: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>,
  savings: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M19 5L5 19" /><circle cx="6.5" cy="6.5" r="2.5" /><circle cx="17.5" cy="17.5" r="2.5" /></svg>,
  users: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>,
  warning: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>,
  info: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>,
}

// ============================================================================
// TOKEN COUNTING
// ============================================================================
const countTokens = (text) => {
  if (!text) return 0
  const words = text.split(/\s+/).filter(w => w.length > 0)
  let tokens = 0
  for (const word of words) {
    if (word.length <= 4) tokens += 1
    else if (word.length <= 8) tokens += 2
    else if (word.length <= 12) tokens += 3
    else tokens += Math.ceil(word.length / 4)
    tokens += Math.ceil((word.match(/[.,!?;:'"()\[\]{}]/g) || []).length / 2)
  }
  return Math.max(1, tokens + (text.match(/\n/g) || []).length)
}

// ============================================================================
// MODEL DATA
// ============================================================================
const models = {
  'grok-code': { name: 'Grok Code', input: 0.20, output: 1.50, context: 256000, speed: 'fast', quality: 'good' },
  'gemini-flash': { name: 'Gemini Flash', input: 0.50, output: 3.00, context: 1000000, speed: 'fast', quality: 'good' },
  'gpt-mini': { name: 'GPT-5.1 Mini', input: 0.25, output: 2.00, context: 128000, speed: 'fast', quality: 'good' },
  'composer': { name: 'Composer 1', input: 1.25, output: 10.00, context: 200000, speed: 'medium', quality: 'great' },
  'gpt-5.2': { name: 'GPT-5.2', input: 1.75, output: 14.00, context: 272000, speed: 'medium', quality: 'great' },
  'sonnet': { name: 'Sonnet 4.5', input: 3.00, output: 15.00, context: 200000, speed: 'medium', quality: 'excellent' },
  'opus': { name: 'Opus 4.5', input: 5.00, output: 25.00, context: 200000, speed: 'slow', quality: 'best' },
}

// ============================================================================
// ANIMATED NUMBER
// ============================================================================
const AnimatedNum = ({ value, prefix = '', decimals = 2 }) => {
  const spring = useSpring(0, { stiffness: 120, damping: 20 })
  const [display, setDisplay] = useState(value)
  useEffect(() => { spring.set(value); return spring.on('change', v => setDisplay(v)) }, [value, spring])
  return <span>{prefix}{display.toFixed(decimals)}</span>
}

// ============================================================================
// EXAMPLE PROMPTS
// ============================================================================
const examplePrompts = [
  { label: 'Simple Question', text: 'What is the capital of France?', tokens: 8 },
  { label: 'Code Review', text: 'Review this code for bugs:\n\nfunction add(a, b) { return a + b; }', tokens: 22 },
  { label: 'Blog Post', text: 'Write a 500-word blog about AI in software development.', tokens: 14 },
  { label: 'System Prompt', text: 'You are a helpful coding assistant. Write clean code with comments.', tokens: 16 },
  { label: 'Full Codebase (10K)', text: '', tokens: 10000 },
  { label: 'Large Doc (50K)', text: '', tokens: 50000 },
]

// ============================================================================
// DEFAULT PROMPT NOTICE
// ============================================================================
const DefaultNotice = () => (
  <motion.div 
    initial={{ opacity: 0, y: -5 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-xl text-blue-700 text-xs mb-4"
  >
    {Icons.info}
    <span>Using default estimate (500 input + 750 output tokens). Enter your prompt for exact costs.</span>
  </motion.div>
)

// ============================================================================
// MAIN TOOL
// ============================================================================
const TokenTool = () => {
  const [text, setText] = useState('')
  const [model, setModel] = useState('sonnet')
  const [outputMultiplier, setOutputMultiplier] = useState(1.5)
  const [activeTab, setActiveTab] = useState('calculator')
  const [manualTokens, setManualTokens] = useState({ input: '', output: '' })
  const [copied, setCopied] = useState(false)
  
  // Budget calculator state
  const [monthlyBudget, setMonthlyBudget] = useState('50')
  const [requestsPerDay, setRequestsPerDay] = useState('100')
  const [budgetModel, setBudgetModel] = useState('sonnet')
  const [budgetInputTokens, setBudgetInputTokens] = useState('500')
  const [budgetOutputTokens, setBudgetOutputTokens] = useState('750')
  
  // Per-user calculator state
  const [totalUsers, setTotalUsers] = useState('1000')
  const [requestsPerUser, setRequestsPerUser] = useState('10')
  
  // Converter state
  const [convertInput, setConvertInput] = useState('')
  const [convertType, setConvertType] = useState('words')
  
  // Check if user has entered anything
  const hasUserInput = text.length > 0 || manualTokens.input || manualTokens.output
  
  // Calculate tokens - use defaults if nothing entered
  const m = models[model]
  const rawInputTokens = manualTokens.input ? parseInt(manualTokens.input) || 0 : countTokens(text)
  const rawOutputTokens = manualTokens.output ? parseInt(manualTokens.output) || 0 : Math.round(rawInputTokens * outputMultiplier)
  
  // Use defaults if no input
  const inputTokens = hasUserInput ? rawInputTokens : DEFAULT_INPUT_TOKENS
  const outputTokens = hasUserInput ? rawOutputTokens : DEFAULT_OUTPUT_TOKENS
  
  const inputCost = (inputTokens / 1e6) * m.input
  const outputCost = (outputTokens / 1e6) * m.output
  const totalCost = inputCost + outputCost
  const contextUsed = ((inputTokens + outputTokens) / m.context) * 100
  
  const getCostColor = (cost) => cost < 0.01 ? '#22c55e' : cost < 0.10 ? '#f59e0b' : '#ef4444'

  const loadExample = (ex) => {
    if (ex.tokens > 1000) { setManualTokens({ input: ex.tokens.toString(), output: Math.round(ex.tokens * 1.5).toString() }); setText('') }
    else { setText(ex.text); setManualTokens({ input: '', output: '' }) }
  }

  const copyToClipboard = () => {
    const summary = `AI Cost Estimate\n================\nModel: ${m.name}\nInput: ${inputTokens.toLocaleString()} tokens ($${inputCost.toFixed(6)})\nOutput: ${outputTokens.toLocaleString()} tokens ($${outputCost.toFixed(6)})\nTotal: $${totalCost.toFixed(4)} per request\n\n100 requests: $${(totalCost * 100).toFixed(2)}\n1,000 requests: $${(totalCost * 1000).toFixed(2)}\n\nCalculated at vibebrews.com/ai-token-calculator`
    navigator.clipboard.writeText(summary)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Converter logic
  const convertToTokens = () => {
    const val = parseFloat(convertInput) || 0
    if (convertType === 'words') return Math.round(val * 1.33)
    if (convertType === 'chars') return Math.round(val / 4)
    if (convertType === 'pages') return Math.round(val * 400)
    if (convertType === 'sentences') return Math.round(val * 20)
    return 0
  }

  // Budget calculator logic
  const budgetMod = models[budgetModel]
  const budgetInTok = parseInt(budgetInputTokens) || DEFAULT_INPUT_TOKENS
  const budgetOutTok = parseInt(budgetOutputTokens) || DEFAULT_OUTPUT_TOKENS
  const costPerRequest = (budgetInTok / 1e6) * budgetMod.input + (budgetOutTok / 1e6) * budgetMod.output
  const budgetNum = parseFloat(monthlyBudget) || 0
  const reqPerDay = parseInt(requestsPerDay) || 0
  const costPerMonth = costPerRequest * reqPerDay * 30
  const budgetRemaining = budgetNum - costPerMonth
  const maxRequestsPerDay = costPerRequest > 0 ? Math.floor(budgetNum / 30 / costPerRequest) : 0

  // Per-user calculator
  const users = parseInt(totalUsers) || 0
  const reqPerUser = parseInt(requestsPerUser) || 0
  const costPerUser = costPerRequest * reqPerUser
  const totalUserCost = costPerUser * users

  const tabs = [
    { id: 'calculator', label: 'Calculator', icon: Icons.calculator },
    { id: 'compare', label: 'Compare', icon: Icons.compare },
    { id: 'budget', label: 'Budget', icon: Icons.budget },
    { id: 'converter', label: 'Converter', icon: Icons.convert },
    { id: 'tips', label: 'Tips', icon: Icons.lightbulb },
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
          <motion.div key="calculator" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left */}
            <div className="space-y-4">
              {/* Models */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-[#2D2A26]/5">
                <div className="text-[#2D2A26]/50 text-xs uppercase tracking-wider mb-3">Select Model</div>
                <div className="flex flex-wrap gap-1.5">
                  {Object.entries(models).map(([key, mod]) => (
                    <motion.button key={key} onClick={() => setModel(key)} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${model === key ? 'bg-[#2D2A26] text-white' : 'bg-[#2D2A26]/5 text-[#2D2A26]/70 hover:bg-[#2D2A26]/10'}`}>
                      {mod.name}
                    </motion.button>
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap gap-3 text-xs text-[#2D2A26]/40">
                  <span>In: <strong className="text-[#2D2A26]/60">${m.input}</strong>/1M</span>
                  <span>Out: <strong className="text-[#2D2A26]/60">${m.output}</strong>/1M</span>
                  <span>Context: <strong className="text-[#2D2A26]/60">{(m.context/1000).toFixed(0)}K</strong></span>
                </div>
              </div>

              {/* Input */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-[#2D2A26]/5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#2D2A26]/50 text-xs uppercase tracking-wider">Your Prompt</span>
                  <span className="text-[#2D2A26]/30 text-xs font-mono">{text.length} chars</span>
                </div>
                <textarea value={text} onChange={(e) => { setText(e.target.value); setManualTokens({ input: '', output: '' }) }}
                  placeholder="Paste your prompt here to count tokens..."
                  className="w-full h-24 bg-transparent text-[#2D2A26] text-sm placeholder-[#2D2A26]/30 resize-none focus:outline-none font-mono" />
              </div>

              {/* Examples */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-[#2D2A26]/5">
                <div className="text-[#2D2A26]/50 text-xs uppercase tracking-wider mb-3">Quick Examples</div>
                <div className="flex flex-wrap gap-2">
                  {examplePrompts.map((ex, i) => (
                    <motion.button key={i} onClick={() => loadExample(ex)} whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
                      className="px-3 py-2 bg-gradient-to-br from-[#2D2A26]/5 to-[#2D2A26]/10 rounded-xl text-xs text-[#2D2A26]/70 hover:text-[#2D2A26] transition-all border border-[#2D2A26]/5 hover:border-[#2D2A26]/20">
                      <div className="font-medium">{ex.label}</div>
                      <div className="text-[10px] text-[#2D2A26]/40 mt-0.5">~{ex.tokens.toLocaleString()} tokens</div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Manual Input */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-[#2D2A26]/5">
                <div className="text-[#2D2A26]/50 text-xs uppercase tracking-wider mb-3">Or Enter Directly</div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[#2D2A26]/40 text-[10px] uppercase">Input Tokens</label>
                    <input type="number" value={manualTokens.input} onChange={(e) => setManualTokens(p => ({ ...p, input: e.target.value }))}
                      placeholder={hasUserInput ? "Auto" : "500"} className="w-full mt-1 px-3 py-2 bg-white/50 rounded-lg text-sm font-mono text-[#2D2A26] placeholder-[#2D2A26]/30 focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-[#2D2A26]/40 text-[10px] uppercase">Output Tokens</label>
                    <input type="number" value={manualTokens.output} onChange={(e) => setManualTokens(p => ({ ...p, output: e.target.value }))}
                      placeholder={hasUserInput ? "Auto" : "750"} className="w-full mt-1 px-3 py-2 bg-white/50 rounded-lg text-sm font-mono text-[#2D2A26] placeholder-[#2D2A26]/30 focus:outline-none" />
                  </div>
                </div>
                {!manualTokens.output && hasUserInput && (
                  <div className="mt-3">
                    <div className="flex justify-between text-[10px] text-[#2D2A26]/40 mb-1">
                      <span>Output multiplier</span><span className="font-mono">{outputMultiplier}x</span>
                    </div>
                    <input type="range" min="0.5" max="5" step="0.5" value={outputMultiplier} onChange={(e) => setOutputMultiplier(parseFloat(e.target.value))}
                      className="w-full h-1.5 bg-[#2D2A26]/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#2D2A26] [&::-webkit-slider-thumb]:rounded-full" />
                  </div>
                )}
              </div>
            </div>

            {/* Right */}
            <div className="space-y-4">
              {/* Default notice */}
              {!hasUserInput && <DefaultNotice />}

              {/* Cost Display */}
              <motion.div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-[#2D2A26]/5 shadow-xl relative">
                <motion.button onClick={copyToClipboard} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                  className="absolute top-4 right-4 p-2 bg-[#2D2A26]/5 hover:bg-[#2D2A26]/10 rounded-lg transition-colors" title="Copy summary">
                  {copied ? Icons.check : Icons.copy}
                </motion.button>

                <div className="text-center">
                  <div className="text-[#2D2A26]/40 text-xs uppercase tracking-wider mb-2">Cost Per Request</div>
                  <motion.div className="text-5xl md:text-6xl font-bold font-mono" style={{ color: getCostColor(totalCost) }} key={totalCost.toFixed(4)}>
                    $<AnimatedNum value={totalCost} decimals={4} />
                  </motion.div>
                  <div className="mt-2 text-[#2D2A26]/40 text-sm">
                    {totalCost < 0.001 ? 'Basically free' : totalCost < 0.01 ? 'Very cheap' : totalCost < 0.10 ? 'Moderate' : 'Expensive'}
                  </div>
                </div>

                {contextUsed > 80 && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-600 text-sm">
                    {Icons.warning} <span>Using {contextUsed.toFixed(0)}% of context window</span>
                  </motion.div>
                )}

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-[#2D2A26]/5 rounded-xl p-3 text-center">
                    <div className="text-[#2D2A26]/40 text-[10px] uppercase">Input</div>
                    <div className="text-lg font-bold text-[#2D2A26] font-mono">{inputTokens.toLocaleString()}</div>
                    <div className="text-xs text-[#2D2A26]/50 font-mono">${inputCost.toFixed(6)}</div>
                  </div>
                  <div className="bg-[#2D2A26]/5 rounded-xl p-3 text-center">
                    <div className="text-[#2D2A26]/40 text-[10px] uppercase">Output</div>
                    <div className="text-lg font-bold text-[#2D2A26] font-mono">{outputTokens.toLocaleString()}</div>
                    <div className="text-xs text-[#2D2A26]/50 font-mono">${outputCost.toFixed(6)}</div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between text-[10px] text-[#2D2A26]/40 mb-1">
                    <span>Context Window</span><span className="font-mono">{contextUsed.toFixed(1)}%</span>
                  </div>
                  <div className="h-2 bg-[#2D2A26]/10 rounded-full overflow-hidden">
                    <motion.div className="h-full rounded-full" style={{ backgroundColor: contextUsed > 80 ? '#ef4444' : contextUsed > 50 ? '#f59e0b' : '#22c55e' }}
                      initial={{ width: 0 }} animate={{ width: `${Math.min(contextUsed, 100)}%` }} />
                  </div>
                </div>
              </motion.div>

              {/* Scale */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-[#2D2A26]/5">
                <div className="text-[#2D2A26]/50 text-xs uppercase tracking-wider mb-3">At Scale</div>
                <div className="grid grid-cols-4 gap-2">
                  {[10, 100, 1000, 10000].map(n => (
                    <motion.div key={n} className="text-center p-2 bg-[#2D2A26]/5 rounded-xl" whileHover={{ scale: 1.05 }}>
                      <div className="text-[10px] text-[#2D2A26]/40">{n.toLocaleString()}x</div>
                      <div className="text-sm font-bold text-[#2D2A26] font-mono">${(totalCost * n).toFixed(2)}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* COMPARE TAB */}
        {activeTab === 'compare' && (
          <motion.div key="compare" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            {!hasUserInput && <DefaultNotice />}
            
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-[#2D2A26]/5 mb-4">
              <div className="text-[#2D2A26]/50 text-xs uppercase tracking-wider mb-3 text-center">Comparing costs for {inputTokens.toLocaleString()} input + {outputTokens.toLocaleString()} output tokens</div>
              <div className="flex flex-wrap gap-4 items-center justify-center">
                <div><label className="text-[#2D2A26]/40 text-[10px] uppercase">Input</label>
                  <input type="number" value={manualTokens.input || inputTokens} onChange={(e) => setManualTokens(p => ({ ...p, input: e.target.value }))}
                    className="w-24 ml-2 px-3 py-1.5 bg-white/50 rounded-lg text-sm font-mono text-[#2D2A26] focus:outline-none" /></div>
                <div><label className="text-[#2D2A26]/40 text-[10px] uppercase">Output</label>
                  <input type="number" value={manualTokens.output || outputTokens} onChange={(e) => setManualTokens(p => ({ ...p, output: e.target.value }))}
                    className="w-24 ml-2 px-3 py-1.5 bg-white/50 rounded-lg text-sm font-mono text-[#2D2A26] focus:outline-none" /></div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {Object.entries(models).map(([key, mod], i) => {
                const inTok = parseInt(manualTokens.input) || inputTokens
                const outTok = parseInt(manualTokens.output) || outputTokens
                const cost = (inTok / 1e6) * mod.input + (outTok / 1e6) * mod.output
                const allCosts = Object.values(models).map(mm => (inTok / 1e6) * mm.input + (outTok / 1e6) * mm.output)
                const isLowest = cost === Math.min(...allCosts)
                const isFitsContext = (inTok + outTok) <= mod.context
                return (
                  <motion.div key={key}
                    className={`bg-white/70 backdrop-blur-sm rounded-2xl p-4 border-2 ${isLowest ? 'border-green-400 shadow-lg' : !isFitsContext ? 'border-red-300 opacity-60' : 'border-[#2D2A26]/5'}`}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.02, y: -4 }}>
                    {isLowest && <div className="text-[10px] text-green-600 font-bold uppercase mb-1 flex items-center gap-1">{Icons.check} Best Value</div>}
                    {!isFitsContext && <div className="text-[10px] text-red-500 font-bold uppercase mb-1 flex items-center gap-1">{Icons.warning} Too Large</div>}
                    <div className="font-semibold text-[#2D2A26] text-sm">{mod.name}</div>
                    <div className="text-3xl font-bold font-mono mt-2" style={{ color: getCostColor(cost) }}>${cost.toFixed(4)}</div>
                    <div className="text-xs text-[#2D2A26]/40 mt-2 space-y-0.5">
                      <div>In: ${mod.input}/1M • Out: ${mod.output}/1M</div>
                      <div>Context: {(mod.context/1000).toFixed(0)}K</div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* BUDGET TAB */}
        {activeTab === 'budget' && (
          <motion.div key="budget" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
            
            {/* Model & Token Settings for Budget */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 border border-[#2D2A26]/5">
              <div className="text-[#2D2A26] font-semibold mb-4">Configure Your Typical Request</div>
              
              {/* Model Selection */}
              <div className="mb-4">
                <div className="text-[#2D2A26]/50 text-xs uppercase tracking-wider mb-2">Model</div>
                <div className="flex flex-wrap gap-1.5">
                  {Object.entries(models).map(([key, mod]) => (
                    <motion.button key={key} onClick={() => setBudgetModel(key)} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${budgetModel === key ? 'bg-[#2D2A26] text-white' : 'bg-[#2D2A26]/5 text-[#2D2A26]/70 hover:bg-[#2D2A26]/10'}`}>
                      {mod.name}
                    </motion.button>
                  ))}
                </div>
                <div className="mt-2 text-xs text-[#2D2A26]/40">
                  {budgetMod.name}: ${budgetMod.input}/1M input, ${budgetMod.output}/1M output
                </div>
              </div>
              
              {/* Token counts */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[#2D2A26]/50 text-xs uppercase">Tokens per Request (Input)</label>
                  <input type="number" value={budgetInputTokens} onChange={(e) => setBudgetInputTokens(e.target.value)}
                    placeholder="500" className="w-full mt-1 px-4 py-2 bg-white/50 rounded-xl text-sm font-mono text-[#2D2A26] focus:outline-none" />
                </div>
                <div>
                  <label className="text-[#2D2A26]/50 text-xs uppercase">Tokens per Request (Output)</label>
                  <input type="number" value={budgetOutputTokens} onChange={(e) => setBudgetOutputTokens(e.target.value)}
                    placeholder="750" className="w-full mt-1 px-4 py-2 bg-white/50 rounded-xl text-sm font-mono text-[#2D2A26] focus:outline-none" />
                </div>
              </div>
              
              <div className="mt-3 p-3 bg-[#2D2A26]/5 rounded-xl text-center">
                <div className="text-[#2D2A26]/40 text-xs">Cost per request with {budgetMod.name}</div>
                <div className="text-2xl font-bold font-mono text-[#2D2A26]">${costPerRequest.toFixed(4)}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Monthly Budget Calculator */}
              <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 border border-[#2D2A26]/5">
                <div className="text-[#2D2A26] font-semibold mb-4 flex items-center gap-2">{Icons.budget} Monthly Budget Planner</div>
                <div className="space-y-4">
                  <div>
                    <label className="text-[#2D2A26]/50 text-xs uppercase">Monthly Budget ($)</label>
                    <input type="number" value={monthlyBudget} onChange={(e) => setMonthlyBudget(e.target.value)}
                      className="w-full mt-1 px-4 py-3 bg-white/50 rounded-xl text-lg font-mono text-[#2D2A26] focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-[#2D2A26]/50 text-xs uppercase">Requests per Day</label>
                    <input type="number" value={requestsPerDay} onChange={(e) => setRequestsPerDay(e.target.value)}
                      className="w-full mt-1 px-4 py-3 bg-white/50 rounded-xl text-lg font-mono text-[#2D2A26] focus:outline-none" />
                  </div>
                  <div className="pt-4 border-t border-[#2D2A26]/10 space-y-3">
                    <div className="flex justify-between"><span className="text-[#2D2A26]/60">Est. Monthly Cost</span>
                      <span className="font-bold font-mono" style={{ color: costPerMonth > budgetNum ? '#ef4444' : '#22c55e' }}>${costPerMonth.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span className="text-[#2D2A26]/60">Budget Remaining</span>
                      <span className={`font-bold font-mono ${budgetRemaining < 0 ? 'text-red-500' : 'text-green-600'}`}>${budgetRemaining.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span className="text-[#2D2A26]/60">Max Requests/Day</span>
                      <span className="font-bold font-mono text-[#2D2A26]">{maxRequestsPerDay.toLocaleString()}</span></div>
                  </div>
                  {budgetRemaining < 0 && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-2">
                      {Icons.warning} Over budget! Reduce requests or use a cheaper model.
                    </div>
                  )}
                </div>
              </div>

              {/* Per-User Calculator */}
              <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 border border-[#2D2A26]/5">
                <div className="text-[#2D2A26] font-semibold mb-4 flex items-center gap-2">{Icons.users} Per-User Cost Calculator</div>
                <div className="space-y-4">
                  <div>
                    <label className="text-[#2D2A26]/50 text-xs uppercase">Total Users</label>
                    <input type="number" value={totalUsers} onChange={(e) => setTotalUsers(e.target.value)}
                      className="w-full mt-1 px-4 py-3 bg-white/50 rounded-xl text-lg font-mono text-[#2D2A26] focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-[#2D2A26]/50 text-xs uppercase">Requests per User (monthly)</label>
                    <input type="number" value={requestsPerUser} onChange={(e) => setRequestsPerUser(e.target.value)}
                      className="w-full mt-1 px-4 py-3 bg-white/50 rounded-xl text-lg font-mono text-[#2D2A26] focus:outline-none" />
                  </div>
                  <div className="pt-4 border-t border-[#2D2A26]/10 space-y-3">
                    <div className="flex justify-between"><span className="text-[#2D2A26]/60">Cost per User</span>
                      <span className="font-bold font-mono text-[#2D2A26]">${costPerUser.toFixed(4)}/mo</span></div>
                    <div className="flex justify-between"><span className="text-[#2D2A26]/60">Total Monthly Cost</span>
                      <span className="font-bold font-mono text-[#2D2A26]">${totalUserCost.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span className="text-[#2D2A26]/60">Suggested price/user</span>
                      <span className="font-bold font-mono text-green-600">${(costPerUser * 2).toFixed(2)}/mo</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* What Can You Get */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 border border-[#2D2A26]/5">
              <div className="text-[#2D2A26] font-semibold mb-2">What Can You Get with {budgetMod.name}?</div>
              <div className="text-[#2D2A26]/50 text-xs mb-4">Based on {budgetInTok}+{budgetOutTok} tokens per request (${costPerRequest.toFixed(4)} each)</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[10, 50, 100, 500].map(budget => {
                  const requests = costPerRequest > 0 ? Math.floor(budget / costPerRequest) : 0
                  const perDay = Math.floor(requests / 30)
                  return (
                    <motion.div key={budget} className="text-center p-4 bg-[#2D2A26]/5 rounded-xl" whileHover={{ scale: 1.03 }}>
                      <div className="text-2xl font-bold text-[#2D2A26]">${budget}</div>
                      <div className="text-[#2D2A26]/50 text-xs mt-1">per month</div>
                      <div className="text-lg font-bold font-mono text-[#2D2A26] mt-3">{requests.toLocaleString()}</div>
                      <div className="text-[#2D2A26]/40 text-xs">requests/month</div>
                      <div className="text-[#2D2A26]/30 text-[10px] mt-1">~{perDay}/day</div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* CONVERTER TAB */}
        {activeTab === 'converter' && (
          <motion.div key="converter" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="max-w-2xl mx-auto">
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-[#2D2A26]/5">
              <div className="text-[#2D2A26] font-semibold mb-4 flex items-center gap-2">{Icons.convert} Quick Token Converter</div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-[#2D2A26]/50 text-xs uppercase mb-2 block">Enter Amount</label>
                  <input type="number" value={convertInput} onChange={(e) => setConvertInput(e.target.value)} placeholder="100"
                    className="w-full px-4 py-3 bg-white/50 rounded-xl text-2xl font-mono text-[#2D2A26] focus:outline-none" />
                </div>
                <div>
                  <label className="text-[#2D2A26]/50 text-xs uppercase mb-2 block">Unit</label>
                  <select value={convertType} onChange={(e) => setConvertType(e.target.value)}
                    className="w-full px-4 py-3 bg-white/50 rounded-xl text-lg text-[#2D2A26] focus:outline-none">
                    <option value="words">Words</option>
                    <option value="chars">Characters</option>
                    <option value="pages">Pages (300 words)</option>
                    <option value="sentences">Sentences</option>
                  </select>
                </div>
              </div>

              <div className="text-center p-6 bg-[#2D2A26]/5 rounded-xl">
                <div className="text-[#2D2A26]/40 text-sm mb-2">Approximately</div>
                <div className="text-5xl font-bold font-mono text-[#2D2A26]">{convertToTokens().toLocaleString()}</div>
                <div className="text-[#2D2A26]/50 text-lg mt-2">tokens</div>
              </div>
            </div>

            <div className="mt-4 bg-white/70 backdrop-blur-xl rounded-2xl p-5 border border-[#2D2A26]/5">
              <div className="text-[#2D2A26] font-semibold mb-4 flex items-center gap-2">{Icons.ruler} Token Cheat Sheet</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { item: '1 word', tokens: '~1.3' },
                  { item: '1 sentence', tokens: '~20' },
                  { item: '1 paragraph', tokens: '~100' },
                  { item: '1 page', tokens: '~400' },
                  { item: 'Tweet', tokens: '~70' },
                  { item: 'Email', tokens: '~200' },
                  { item: 'Code file', tokens: '~800' },
                  { item: 'React component', tokens: '~500' },
                ].map((item, i) => (
                  <motion.div key={i} className="text-center p-3 bg-[#2D2A26]/5 rounded-xl" whileHover={{ scale: 1.05 }}>
                    <div className="text-[#2D2A26]/60 text-xs">{item.item}</div>
                    <div className="text-[#2D2A26] font-bold font-mono">{item.tokens}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* TIPS TAB */}
        {activeTab === 'tips' && (
          <motion.div key="tips" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 border border-[#2D2A26]/5">
              <div className="text-[#2D2A26] font-semibold mb-4 flex items-center gap-2">{Icons.savings} Cost Reduction Tips</div>
              <div className="space-y-3">
                {[
                  { tip: 'Use prompt caching', savings: '90%', desc: 'Anthropic/OpenAI cache repeated system prompts' },
                  { tip: 'Set max_tokens limit', savings: '50%', desc: 'Prevent unnecessarily long responses' },
                  { tip: 'Use smaller models', savings: '95%', desc: 'Grok Code vs Opus for simple tasks' },
                  { tip: 'Batch similar requests', savings: '20%', desc: 'Volume discounts on some providers' },
                  { tip: 'Cache common responses', savings: '80%', desc: 'Store and reuse frequent answers' },
                ].map((item, i) => (
                  <motion.div key={i} className="flex items-start gap-3 p-3 bg-[#2D2A26]/5 rounded-xl" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} whileHover={{ scale: 1.02 }}>
                    <div className="w-14 text-center"><div className="text-green-600 font-bold text-sm">{item.savings}</div></div>
                    <div><div className="font-medium text-[#2D2A26] text-sm">{item.tip}</div><div className="text-[#2D2A26]/50 text-xs">{item.desc}</div></div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 border border-[#2D2A26]/5">
              <div className="text-[#2D2A26] font-semibold mb-4 flex items-center gap-2">{Icons.target} Model Selection Guide</div>
              <div className="space-y-3">
                {[
                  { task: 'Simple completions', model: 'Grok Code', why: 'Fastest, cheapest' },
                  { task: 'Code generation', model: 'GPT-5.2', why: 'Best code quality' },
                  { task: 'Long documents', model: 'Gemini Flash', why: '1M+ context window' },
                  { task: 'Complex reasoning', model: 'Opus 4.5', why: 'Highest intelligence' },
                  { task: 'Balanced tasks', model: 'Sonnet 4.5', why: 'Best quality/price ratio' },
                ].map((item, i) => (
                  <motion.div key={i} className="flex items-center justify-between p-3 bg-[#2D2A26]/5 rounded-xl" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} whileHover={{ scale: 1.02 }}>
                    <div><div className="font-medium text-[#2D2A26] text-sm">{item.task}</div><div className="text-[#2D2A26]/50 text-xs">{item.why}</div></div>
                    <div className="px-3 py-1 bg-[#2D2A26] text-white text-xs rounded-full font-medium">{item.model}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ============================================================================
// SEO CONTENT
// ============================================================================
const ContentSection = ({ children, className = '' }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [40, 0, 0, -40])
  return <motion.section ref={ref} style={{ opacity, y }} className={className}>{children}</motion.section>
}

const SEOContent = () => (
  <div className="mt-16 space-y-16">
    <ContentSection>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-[#2D2A26] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>How Much Does ChatGPT API Cost in 2026?</h2>
        <div className="prose prose-lg text-[#2D2A26]/70">
          <p>The cost of using ChatGPT's API depends on which model you choose and how many tokens your requests use. OpenAI's GPT-5.2 costs <strong>$1.75 per million input tokens</strong> and <strong>$14.00 per million output tokens</strong>.</p>
          <p>For most users, a typical conversation costs between $0.001 and $0.05 per request. Building an app with 1,000 API calls per day typically costs <strong>$30-100 per month</strong>.</p>
        </div>
      </div>
    </ContentSection>

    <ContentSection>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-[#2D2A26] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>How Many Tokens Are in 1000 Words?</h2>
        <div className="prose prose-lg text-[#2D2A26]/70">
          <p>In English, <strong>1,000 words equals approximately 1,300-1,500 tokens</strong>. Here's a quick reference:</p>
          <ul>
            <li><strong>100 words</strong> = ~130-150 tokens</li>
            <li><strong>500 words</strong> = ~650-750 tokens</li>
            <li><strong>1,000 words</strong> = ~1,300-1,500 tokens</li>
            <li><strong>5,000 words</strong> = ~6,500-7,500 tokens</li>
          </ul>
        </div>
      </div>
    </ContentSection>

    <ContentSection>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-[#2D2A26] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>How to Reduce Your AI API Costs by 90%</h2>
        <div className="prose prose-lg text-[#2D2A26]/70">
          <ol>
            <li><strong>Use the right model.</strong> Don't use Opus 4.5 for simple tasks when Grok Code works. This alone saves 95%.</li>
            <li><strong>Set max_tokens limits.</strong> Prevent runaway responses. A 500-token limit cuts output costs in half.</li>
            <li><strong>Cache common requests.</strong> Don't pay twice for the same answer.</li>
            <li><strong>Use prompt caching.</strong> Anthropic's prompt caching reduces costs by 90% on repeated system prompts.</li>
            <li><strong>Optimize prompts.</strong> Remove filler words. Every token costs money.</li>
          </ol>
        </div>
      </div>
    </ContentSection>

    <ContentSection>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-[#2D2A26] mb-6 text-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Complete AI Model Pricing Table (2026)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm bg-white/60 rounded-2xl overflow-hidden">
            <thead className="bg-[#2D2A26]/5">
              <tr>
                <th className="text-left py-4 px-4 text-[#2D2A26]/60 font-medium">Model</th>
                <th className="text-left py-4 px-4 text-[#2D2A26]/60 font-medium">Provider</th>
                <th className="text-right py-4 px-4 text-[#2D2A26]/60 font-medium">Input/1M</th>
                <th className="text-right py-4 px-4 text-[#2D2A26]/60 font-medium">Output/1M</th>
                <th className="text-right py-4 px-4 text-[#2D2A26]/60 font-medium">Context</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Grok Code', provider: 'xAI', input: 0.20, output: 1.50, context: '256K' },
                { name: 'GPT-5.1 Mini', provider: 'OpenAI', input: 0.25, output: 2.00, context: '128K' },
                { name: 'Gemini Flash', provider: 'Google', input: 0.50, output: 3.00, context: '1M+' },
                { name: 'Composer 1', provider: 'Cursor', input: 1.25, output: 10.00, context: '200K' },
                { name: 'GPT-5.2', provider: 'OpenAI', input: 1.75, output: 14.00, context: '272K' },
                { name: 'Sonnet 4.5', provider: 'Anthropic', input: 3.00, output: 15.00, context: '200K' },
                { name: 'Opus 4.5', provider: 'Anthropic', input: 5.00, output: 25.00, context: '200K' },
              ].map((mod, i) => (
                <tr key={i} className="border-t border-[#2D2A26]/5">
                  <td className="py-3 px-4 font-medium text-[#2D2A26]">{mod.name}</td>
                  <td className="py-3 px-4 text-[#2D2A26]/50">{mod.provider}</td>
                  <td className="py-3 px-4 text-right font-mono text-[#2D2A26]/70">${mod.input.toFixed(2)}</td>
                  <td className="py-3 px-4 text-right font-mono text-[#2D2A26]/70">${mod.output.toFixed(2)}</td>
                  <td className="py-3 px-4 text-right font-mono text-[#2D2A26]/50">{mod.context}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ContentSection>
  </div>
)

// ============================================================================
// MAIN PAGE
// ============================================================================
export default function TokenBurner() {
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
    
    const schema = {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      'mainEntity': [
        { '@type': 'Question', 'name': 'How much does ChatGPT API cost?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'GPT-5.2 costs $1.75 per million input tokens and $14 per million output tokens.' }},
        { '@type': 'Question', 'name': 'How many tokens is 1000 words?', 'acceptedAnswer': { '@type': 'Answer', 'text': '1000 words equals approximately 1,300-1,500 tokens.' }},
      ]
    }
    let script = document.querySelector('script[data-schema]')
    if (!script) { script = document.createElement('script'); script.type = 'application/ld+json'; script.setAttribute('data-schema', 'true'); document.head.appendChild(script) }
    script.textContent = JSON.stringify(schema)
    return () => { document.title = 'VibeBrews'; script?.remove() }
  }, [])
  
  return (
    <PageTransition>
      <div className="fixed inset-0 -z-10" style={{ background: 'linear-gradient(180deg, #F8F5F0 0%, #EDE8E0 100%)' }} />
      <div className="relative z-10 min-h-screen px-4 md:px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl md:text-4xl font-bold text-[#2D2A26] mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>AI Token Calculator</h1>
            <p className="text-[#2D2A26]/50 text-sm md:text-base">Calculate costs for GPT, Claude, Gemini instantly. Free, no signup.</p>
          </motion.div>
          <TokenTool />
          <SEOContent />
          <motion.footer className="mt-16 pt-8 border-t border-[#2D2A26]/10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <img src="https://play-lh.googleusercontent.com/lOGaWbwoVmJcBKAatXi0TFhY-XcZEPhat-f1sI6WRo2pd7uOq-kBv6f7t8N2GEljlPQwMxbpDWOt-XPzToP5fpE=w480-h960-rw" alt="VibeBrews" className="w-8 h-8 rounded-lg" />
                <span className="text-[#2D2A26]/70 text-sm">A free tool by <strong>VibeBrews</strong></span>
              </div>
              <nav className="flex gap-6 text-sm text-[#2D2A26]/50">
                <Link to="/" className="hover:text-[#2D2A26] transition-colors">Home</Link>
                <Link to="/color-palette-generator" className="hover:text-[#2D2A26] transition-colors">Color Palette</Link>
                <a href="https://play.google.com/store/apps/details?id=com.nextap.vibebrews" target="_blank" rel="noopener noreferrer" className="hover:text-[#2D2A26] transition-colors">Get App</a>
              </nav>
            </div>
          </motion.footer>
        </div>
      </div>
    </PageTransition>
  )
}
