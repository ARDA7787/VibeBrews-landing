import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useSpring } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import { Link } from 'react-router-dom'

// ============================================================================
// SEO METADATA
// ============================================================================
const SEO_TITLE = 'AI Context Window Visualizer 2026 | Check Prompt Length for GPT, Claude, Gemini'
const SEO_DESC = 'See exactly how much of each AI model\'s context window your prompt uses. Visualize GPT-5, Claude, Gemini context limits. Drag files or paste text—free, instant results.'
const SEO_KEYWORDS = 'context window size, claude context limit, gpt-5 max tokens, gemini context window 2026, AI context window comparison, fit prompt in context, check prompt length AI, how long can my prompt be'

// ============================================================================
// MODEL DATA (2026 Updated)
// ============================================================================
const models = [
  { id: 'llama-4-70b', name: 'Llama 4 (70B)', limit: 32000, color: '#044EAF', provider: 'Meta' },
  { id: 'gpt-5-codex', name: 'GPT-5.2 Codex', limit: 128000, color: '#10A37F', provider: 'OpenAI' },
  { id: 'claude-opus-4-5', name: 'Claude Opus 4.5', limit: 200000, color: '#D97757', provider: 'Anthropic' },
  { id: 'gpt-5-2', name: 'GPT-5.2', limit: 272000, color: '#10A37F', provider: 'OpenAI' },
  { id: 'gemini-3-flash', name: 'Gemini 3 Flash', limit: 1000000, color: '#4285F4', provider: 'Google' },
  { id: 'gemini-3-pro', name: 'Gemini 3 Pro', limit: 2000000, color: '#EA4335', provider: 'Google' },
]

// ============================================================================
// TOKEN ESTIMATION LOGIC
// ============================================================================
const estimateTokens = (text) => {
  if (!text) return { estimated: 0, wordCount: 0, charCount: 0 }
  const wordCount = text.trim().split(/\s+/).filter(w => w.length > 0).length
  const charCount = text.length
  // ~3.8 chars per token with 1.1x safety buffer
  const estimated = Math.ceil(charCount / 3.5)
  return { estimated, wordCount, charCount }
}

const getUsagePercentage = (tokens, limit) => {
  return Math.min((tokens / limit) * 100, 100)
}

const formatNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(0) + 'K'
  return num.toString()
}

// ============================================================================
// CUSTOM SVG ICONS
// ============================================================================
const Icons = {
  upload: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>,
  file: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" /><polyline points="13 2 13 9 20 9" /></svg>,
  warning: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>,
  check: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><polyline points="20 6 9 17 4 12" /></svg>,
  info: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>,
  paste: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" /></svg>,
  clear: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>,
  tank: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" /></svg>,
  book: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" /></svg>,
  code: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
}

// ============================================================================
// ANIMATED PROGRESS BAR (LIQUID TANK)
// ============================================================================
const LiquidBar = ({ model, percentage, tokens, isOverflow }) => {
  const springValue = useSpring(0, { stiffness: 80, damping: 20 })
  const [displayPercentage, setDisplayPercentage] = useState(0)
  
  useEffect(() => {
    springValue.set(percentage)
    return springValue.on('change', v => setDisplayPercentage(v))
  }, [percentage, springValue])

  const actualPercentage = (tokens / model.limit) * 100
  const overflowAmount = isOverflow ? actualPercentage - 100 : 0

  return (
    <motion.div
      className={`relative bg-white/70 backdrop-blur-sm rounded-2xl p-4 border-2 transition-all duration-300 ${
        isOverflow 
          ? 'border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.3)]' 
          : 'border-[#2D2A26]/5 hover:border-[#2D2A26]/10'
      }`}
      animate={isOverflow ? { 
        x: [0, -3, 3, -3, 3, 0],
      } : {}}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: model.color }}
          />
          <span className="font-semibold text-[#2D2A26] text-sm">{model.name}</span>
          <span className="text-[10px] text-[#2D2A26]/40 uppercase tracking-wider">{model.provider}</span>
        </div>
        <div className="text-right">
          <span className="text-xs font-mono text-[#2D2A26]/60">{formatNumber(model.limit)}</span>
        </div>
      </div>

      {/* The Tank */}
      <div className="relative h-8 bg-[#2D2A26]/5 rounded-full overflow-hidden">
        {/* Safety zone marker at 80% */}
        <div 
          className="absolute top-0 bottom-0 w-px bg-yellow-500/50 z-10"
          style={{ left: '80%' }}
        >
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[8px] text-yellow-600 whitespace-nowrap">
            Safe
          </div>
        </div>

        {/* The liquid fill */}
        <motion.div
          className={`absolute inset-y-0 left-0 rounded-full transition-colors duration-500 ${
            isOverflow 
              ? 'bg-gradient-to-r from-red-500 to-red-400' 
              : displayPercentage > 80 
                ? 'bg-gradient-to-r from-yellow-500 to-orange-400'
                : 'bg-gradient-to-r from-emerald-500 to-teal-400'
          }`}
          style={{ width: `${displayPercentage}%` }}
          initial={{ width: 0 }}
          animate={{ 
            width: `${displayPercentage}%`,
            opacity: isOverflow ? [1, 0.7, 1] : 1
          }}
          transition={{ 
            width: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
            opacity: { duration: 0.5, repeat: isOverflow ? Infinity : 0 }
          }}
        >
          {/* Liquid shine effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent" />
          
          {/* Wave effect on top */}
          {displayPercentage > 5 && (
            <motion.div 
              className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-r from-transparent to-white/20"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </motion.div>

        {/* Percentage text inside bar */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-xs font-bold font-mono ${
            displayPercentage > 50 ? 'text-white' : 'text-[#2D2A26]/60'
          }`}>
            {displayPercentage.toFixed(1)}%
          </span>
        </div>
      </div>

      {/* Token count and status */}
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs font-mono text-[#2D2A26]/50">
          {tokens.toLocaleString()} / {model.limit.toLocaleString()} tokens
        </span>
        {isOverflow ? (
          <motion.div 
            className="flex items-center gap-1 text-red-500 text-xs font-medium"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            {Icons.warning}
            <span>Overflow +{overflowAmount.toFixed(0)}%</span>
          </motion.div>
        ) : displayPercentage > 80 ? (
          <div className="flex items-center gap-1 text-yellow-600 text-xs font-medium">
            {Icons.info}
            <span>Near limit</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-emerald-600 text-xs font-medium">
            {Icons.check}
            <span>Good</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

// ============================================================================
// DROP ZONE COMPONENT
// ============================================================================
const DropZone = ({ onTextReceived, hasContent }) => {
  const [isDragging, setIsDragging] = useState(false)
  const [fileName, setFileName] = useState('')
  const fileInputRef = useRef(null)

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      readFile(files[0])
    }
  }, [])

  const readFile = (file) => {
    const allowedTypes = [
      'text/plain', 'text/markdown', 'text/javascript', 'text/typescript',
      'text/css', 'text/html', 'application/json', 'text/x-python',
      'application/javascript', 'text/jsx', 'text/tsx'
    ]
    const allowedExtensions = ['.txt', '.md', '.js', '.jsx', '.ts', '.tsx', '.py', '.css', '.html', '.json', '.yaml', '.yml', '.sql', '.sh', '.go', '.rs', '.java', '.c', '.cpp', '.h', '.swift', '.kt']
    
    const ext = '.' + file.name.split('.').pop().toLowerCase()
    const isAllowed = allowedTypes.includes(file.type) || allowedExtensions.includes(ext)
    
    if (!isAllowed) {
      alert('Unsupported file type. Please use text, code, or markdown files.')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      onTextReceived(e.target.result)
      setFileName(file.name)
    }
    reader.readAsText(file)
  }

  const handleFileSelect = (e) => {
    if (e.target.files.length > 0) {
      readFile(e.target.files[0])
    }
  }

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      if (text) {
        onTextReceived(text)
        setFileName('')
      }
    } catch (err) {
      // Fallback: focus textarea for manual paste
      alert('Please use Ctrl+V to paste, or drag & drop a file.')
    }
  }

  return (
    <motion.div
      className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 ${
        isDragging 
          ? 'border-[#2D2A26] bg-[#2D2A26]/5 scale-[1.02]' 
          : hasContent
            ? 'border-emerald-400 bg-emerald-50/50'
            : 'border-[#2D2A26]/20 hover:border-[#2D2A26]/40'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      animate={isDragging ? { scale: 1.02 } : { scale: 1 }}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".txt,.md,.js,.jsx,.ts,.tsx,.py,.css,.html,.json,.yaml,.yml,.sql,.sh,.go,.rs,.java,.c,.cpp,.h,.swift,.kt"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <motion.div 
          className={`mb-4 p-4 rounded-full ${isDragging ? 'bg-[#2D2A26]/10' : 'bg-[#2D2A26]/5'}`}
          animate={isDragging ? { rotate: [0, -10, 10, 0], scale: 1.1 } : {}}
        >
          {hasContent ? (
            <div className="text-emerald-500">{Icons.check}</div>
          ) : (
            <div className="text-[#2D2A26]/40">{Icons.upload}</div>
          )}
        </motion.div>

        {hasContent && fileName ? (
          <div className="flex items-center gap-2 text-emerald-700 mb-2">
            {Icons.file}
            <span className="font-medium">{fileName}</span>
          </div>
        ) : (
          <p className="text-[#2D2A26]/70 text-sm mb-2">
            {isDragging ? 'Drop your file here...' : 'Drag & drop any text or code file'}
          </p>
        )}

        <p className="text-[#2D2A26]/40 text-xs mb-4">
          Supports .txt, .md, .js, .py, .ts, .json, and more
        </p>

        <div className="flex gap-2">
          <motion.button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-[#2D2A26] text-white rounded-xl text-sm font-medium flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {Icons.file}
            Browse Files
          </motion.button>
          <motion.button
            onClick={handlePaste}
            className="px-4 py-2 bg-[#2D2A26]/10 text-[#2D2A26] rounded-xl text-sm font-medium flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {Icons.paste}
            Paste
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

// ============================================================================
// STATS DISPLAY
// ============================================================================
const StatsDisplay = ({ stats }) => (
  <div className="grid grid-cols-3 gap-3">
    {[
      { label: 'Characters', value: stats.charCount.toLocaleString(), color: 'text-[#2D2A26]' },
      { label: 'Words', value: stats.wordCount.toLocaleString(), color: 'text-[#2D2A26]' },
      { label: 'Est. Tokens', value: stats.estimated.toLocaleString(), color: 'text-emerald-600' },
    ].map((stat, i) => (
      <motion.div 
        key={stat.label}
        className="bg-white/70 backdrop-blur-sm rounded-xl p-3 text-center border border-[#2D2A26]/5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.1 }}
      >
        <div className={`text-2xl font-bold font-mono ${stat.color}`}>{stat.value}</div>
        <div className="text-[10px] text-[#2D2A26]/40 uppercase tracking-wider">{stat.label}</div>
      </motion.div>
    ))}
  </div>
)

// ============================================================================
// COMPARISON TABLE (SEO CONTENT)
// ============================================================================
const ComparisonTable = () => {
  const tableData = [
    { name: 'Gemini 3 Pro', context: '2,000,000', books: '~2,500 Books', files: '~50,000 Files', provider: 'Google' },
    { name: 'Gemini 3 Flash', context: '1,000,000', books: '~1,250 Books', files: '~25,000 Files', provider: 'Google' },
    { name: 'GPT-5.2', context: '272,000', books: '~3 Books', files: '~600 Files', provider: 'OpenAI' },
    { name: 'Claude Opus 4.5', context: '200,000', books: '~2 Books', files: '~450 Files', provider: 'Anthropic' },
    { name: 'GPT-5.2 Codex', context: '128,000', books: '~1.5 Books', files: '~280 Files', provider: 'OpenAI' },
    { name: 'Llama 4 (70B)', context: '32,000', books: '~5 Chapters', files: '~70 Files', provider: 'Meta' },
  ]

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm bg-white/60 rounded-2xl overflow-hidden">
        <thead className="bg-[#2D2A26]/5">
          <tr>
            <th className="text-left py-4 px-4 text-[#2D2A26]/60 font-medium">Model</th>
            <th className="text-left py-4 px-4 text-[#2D2A26]/60 font-medium">Provider</th>
            <th className="text-right py-4 px-4 text-[#2D2A26]/60 font-medium">Context Window</th>
            <th className="text-right py-4 px-4 text-[#2D2A26]/60 font-medium flex items-center justify-end gap-1">
              {Icons.book} Harry Potter Equivalent
            </th>
            <th className="text-right py-4 px-4 text-[#2D2A26]/60 font-medium">
              <span className="flex items-center justify-end gap-1">{Icons.code} Code Files</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, i) => (
            <tr key={i} className="border-t border-[#2D2A26]/5 hover:bg-[#2D2A26]/[0.02] transition-colors">
              <td className="py-3 px-4 font-medium text-[#2D2A26]">{row.name}</td>
              <td className="py-3 px-4 text-[#2D2A26]/50">{row.provider}</td>
              <td className="py-3 px-4 text-right font-mono text-[#2D2A26]/70">{row.context}</td>
              <td className="py-3 px-4 text-right text-[#2D2A26]/60">{row.books}</td>
              <td className="py-3 px-4 text-right text-[#2D2A26]/50">{row.files}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs text-[#2D2A26]/40 mt-2 text-center">
        *Harry Potter book ~77,000 words (~100K tokens). Code file average ~400 tokens.
      </p>
    </div>
  )
}

// ============================================================================
// SEO CONTENT SECTIONS
// ============================================================================
const SEOContent = () => (
  <div className="mt-16 space-y-12">
    <section className="max-w-3xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-[#2D2A26] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        What is an AI Context Window?
      </h2>
      <div className="prose prose-lg text-[#2D2A26]/70 space-y-4">
        <p>
          The <strong>context window</strong> is the maximum amount of text (measured in tokens) that an AI model can "see" at once—including both your input prompt and the model's response.
        </p>
        <p>
          Think of it like the AI's working memory. A larger context window means the AI can handle longer documents, remember more of your conversation, and process bigger codebases.
        </p>
        <p>
          In 2026, context windows range from <strong>32,000 tokens</strong> (Llama 4) to <strong>2 million tokens</strong> (Gemini 3 Pro)—a 62x difference that dramatically affects what tasks each model can handle.
        </p>
      </div>
    </section>

    <section className="max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-[#2D2A26] mb-6 text-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        AI Context Window Comparison 2026
      </h2>
      <ComparisonTable />
    </section>

    <section className="max-w-3xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-[#2D2A26] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        How Many Tokens is My Prompt?
      </h2>
      <div className="prose prose-lg text-[#2D2A26]/70 space-y-4">
        <p>Quick reference for token estimation:</p>
        <ul>
          <li><strong>1 word</strong> ≈ 1.3 tokens</li>
          <li><strong>1 page of text</strong> (~300 words) ≈ 400 tokens</li>
          <li><strong>1 code file</strong> (~100 lines) ≈ 400-800 tokens</li>
          <li><strong>1 Harry Potter book</strong> ≈ 100,000 tokens</li>
          <li><strong>A full React codebase</strong> (10,000 files) ≈ 4-8 million tokens</li>
        </ul>
        <p>
          Our visualizer uses a <strong>3.5 character per token</strong> estimate with a safety buffer—intentionally conservative so you don't hit limits unexpectedly.
        </p>
      </div>
    </section>

    <section className="max-w-3xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-[#2D2A26] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        Why Context Window Size Matters
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { title: 'Long Documents', desc: 'Analyze entire legal contracts, research papers, or books in a single prompt without chunking.' },
          { title: 'Full Codebase Analysis', desc: 'Review thousands of code files at once for refactoring, bug hunting, or documentation.' },
          { title: 'Extended Conversations', desc: 'Maintain context across long chat sessions without the AI "forgetting" earlier messages.' },
          { title: 'Complex Reasoning', desc: 'More context = more information for the AI to synthesize into better answers.' },
        ].map((item, i) => (
          <motion.div 
            key={i}
            className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-[#2D2A26]/5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <h3 className="font-semibold text-[#2D2A26] mb-2">{item.title}</h3>
            <p className="text-sm text-[#2D2A26]/60">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>

    <section className="max-w-3xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-[#2D2A26] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {[
          { q: 'What happens if I exceed the context window?', a: 'The model will either truncate your input (cut off the beginning or end), throw an error, or behave unpredictably. Always stay within limits—our visualizer helps you see exactly how close you are.' },
          { q: 'Is a larger context window always better?', a: 'Not necessarily. Larger windows cost more (both in compute and often in API pricing), and some models perform better on focused, smaller contexts. Match the model to your task.' },
          { q: 'How accurate is token estimation?', a: 'Our estimate is within 5-10% for English text and code. Actual tokenization varies by model—we intentionally overestimate to keep you safe.' },
          { q: 'Can I fit my entire codebase in one prompt?', a: 'With Gemini 3 Pro (2M tokens), you can fit approximately 50,000 code files—enough for most projects. Smaller models require chunking strategies.' },
        ].map((faq, i) => (
          <motion.div 
            key={i}
            className="bg-white/70 backdrop-blur-sm rounded-xl p-5 border border-[#2D2A26]/5"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <h3 className="font-semibold text-[#2D2A26] mb-2">{faq.q}</h3>
            <p className="text-sm text-[#2D2A26]/60">{faq.a}</p>
          </motion.div>
        ))}
      </div>
    </section>
  </div>
)

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function ContextWindow() {
  const [text, setText] = useState('')
  const [stats, setStats] = useState({ estimated: 0, wordCount: 0, charCount: 0 })
  const textareaRef = useRef(null)

  useEffect(() => {
    document.title = SEO_TITLE
    const updateMeta = (name, content, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name'
      let meta = document.querySelector(`meta[${attr}="${name}"]`)
      if (!meta) { 
        meta = document.createElement('meta')
        meta.setAttribute(attr, name)
        document.head.appendChild(meta) 
      }
      meta.setAttribute('content', content)
    }
    updateMeta('description', SEO_DESC)
    updateMeta('keywords', SEO_KEYWORDS)
    updateMeta('og:title', SEO_TITLE, true)
    updateMeta('og:description', SEO_DESC, true)
    
    // Schema.org FAQPage
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        { '@type': 'Question', 'name': 'What is an AI context window?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'The context window is the maximum amount of text (measured in tokens) that an AI model can process at once, including both input and output.' }},
        { '@type': 'Question', 'name': 'How many tokens can GPT-5 handle?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'GPT-5.2 has a context window of 272,000 tokens, while GPT-5.2 Codex has 128,000 tokens.' }},
        { '@type': 'Question', 'name': 'What is Claude context limit?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Claude Opus 4.5 has a context window of 200,000 tokens.' }},
        { '@type': 'Question', 'name': 'Which AI has the largest context window?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Gemini 3 Pro has the largest context window at 2 million tokens in 2026.' }},
      ]
    }
    let script = document.querySelector('script[data-schema-context]')
    if (!script) { 
      script = document.createElement('script')
      script.type = 'application/ld+json'
      script.setAttribute('data-schema-context', 'true')
      document.head.appendChild(script) 
    }
    script.textContent = JSON.stringify(schema)
    
    return () => { 
      document.title = 'VibeBrews'
      script?.remove() 
    }
  }, [])

  useEffect(() => {
    setStats(estimateTokens(text))
  }, [text])

  const handleTextReceived = (newText) => {
    setText(newText)
  }

  const handleClear = () => {
    setText('')
  }

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
            <h1 
              className="text-3xl md:text-4xl font-bold text-[#2D2A26] mb-2" 
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Context Window Visualizer
            </h1>
            <p className="text-[#2D2A26]/50 text-sm md:text-base">
              See instantly if your prompt fits in GPT, Claude, Gemini, and more
            </p>
          </motion.div>

          {/* Main Tool */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Left: Input */}
            <div className="space-y-4">
              <DropZone onTextReceived={handleTextReceived} hasContent={text.length > 0} />
              
              {/* Or type directly */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-[#2D2A26]/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#2D2A26]/50 text-xs uppercase tracking-wider">Or type/paste directly</span>
                  {text && (
                    <motion.button
                      onClick={handleClear}
                      className="flex items-center gap-1 text-[#2D2A26]/40 hover:text-red-500 text-xs transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {Icons.clear}
                      Clear
                    </motion.button>
                  )}
                </div>
                <textarea
                  ref={textareaRef}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste your prompt, code, or any text here..."
                  className="w-full h-32 bg-transparent text-[#2D2A26] text-sm placeholder-[#2D2A26]/30 resize-none focus:outline-none font-mono"
                />
              </div>

              {/* Stats */}
              <AnimatePresence>
                {text && <StatsDisplay stats={stats} />}
              </AnimatePresence>
            </div>

            {/* Right: Progress Bars */}
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#2D2A26]/50 text-xs uppercase tracking-wider flex items-center gap-2">
                  {Icons.tank}
                  Context Usage by Model
                </span>
                {stats.estimated > 0 && (
                  <span className="text-xs font-mono text-[#2D2A26]/40">
                    {stats.estimated.toLocaleString()} tokens
                  </span>
                )}
              </div>
              
              {models.map((model) => {
                const percentage = getUsagePercentage(stats.estimated, model.limit)
                const isOverflow = stats.estimated > model.limit
                return (
                  <LiquidBar 
                    key={model.id}
                    model={model}
                    percentage={percentage}
                    tokens={stats.estimated}
                    isOverflow={isOverflow}
                  />
                )
              })}

              {/* Quick tips */}
              {stats.estimated > 0 && (
                <motion.div 
                  className="bg-white/50 rounded-xl p-3 text-xs text-[#2D2A26]/60"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <strong className="text-[#2D2A26]">Tip:</strong> Context includes both input AND expected output. Leave ~20% buffer for the model's response.
                </motion.div>
              )}
            </div>
          </div>

          {/* Empty State Help */}
          {!text && (
            <motion.div 
              className="text-center py-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-[#2D2A26]/40 text-sm mb-4">
                Drop a file or paste text above to visualize context usage
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  { label: 'Short Prompt', tokens: 500 },
                  { label: 'Code Review', tokens: 5000 },
                  { label: 'Full Docs', tokens: 50000 },
                  { label: 'Codebase', tokens: 200000 },
                ].map((example) => (
                  <motion.button
                    key={example.label}
                    onClick={() => setText('x'.repeat(Math.floor(example.tokens * 3.5)))}
                    className="px-3 py-2 bg-white/70 border border-[#2D2A26]/10 rounded-lg text-xs text-[#2D2A26]/60 hover:text-[#2D2A26] hover:border-[#2D2A26]/20 transition-all"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {example.label}
                    <span className="text-[10px] block text-[#2D2A26]/40">~{formatNumber(example.tokens)} tokens</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

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
                <span className="text-[#2D2A26]/70 text-sm">A free tool by <strong>VibeBrews</strong></span>
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
