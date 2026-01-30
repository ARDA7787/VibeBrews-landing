import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useTransform, useScroll } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import { Link } from 'react-router-dom'

// ============================================================================
// SEO CONFIGURATION
// ============================================================================
const SEO_TITLE = 'Free AI Prompt Generator - Improve ChatGPT Prompts Instantly (2026)'
const SEO_DESC = 'Transform basic prompts into professional-grade AI prompts. Free prompt improver with Chain of Thought, Few-Shot, Persona techniques. No API, works offline.'
const SEO_KEYWORDS = 'prompt generator, AI prompt improver, better chatgpt prompts, prompt engineering tool, chain of thought prompting, few shot prompting, prompt template generator, improve AI prompts, chatgpt prompt maker'

// ============================================================================
// CUSTOM SVG ICONS (Hand-crafted, no generic icons)
// ============================================================================
const Icons = {
  // Remix icon - two arrows forming a cycle
  remix: (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <path d="M17.5 4.5L21 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 8h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M6.5 19.5L3 16l3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21 16H3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  // Copy icon - two overlapping rectangles
  copy: (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
      <rect x="8" y="8" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M16 8V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h2" stroke="currentColor" strokeWidth="1.8"/>
    </svg>
  ),
  // Check icon - simple checkmark
  check: (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  // Expand icon - four corners expanding
  expand: (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
      <path d="M4 14v6h6M20 10V4h-6M4 10V4h6M20 14v6h-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  // Close icon - X
  close: (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  // Architect icon - grid/blueprint
  architect: (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
      <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="6.5" cy="6.5" r="1.5" fill="currentColor"/>
    </svg>
  ),
  // Chain icon - linked chain
  chain: (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
      <path d="M10 14a3.5 3.5 0 005 0l3-3a3.5 3.5 0 00-5-5l-.5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M14 10a3.5 3.5 0 00-5 0l-3 3a3.5 3.5 0 005 5l.5-.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  // Persona icon - user with badge
  persona: (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="17" cy="7" r="3" fill="currentColor" opacity="0.3"/>
      <path d="M16 7l1 1 2-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  // Minimal icon - single line/dash
  minimal: (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
      <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="5" cy="12" r="2" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="19" cy="12" r="2" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  // Examples icon - numbered list
  examples: (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
      <circle cx="6" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
      <text x="6" y="7.5" textAnchor="middle" fontSize="4" fill="currentColor" fontWeight="bold">1</text>
      <path d="M11 6h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="6" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
      <text x="6" y="13.5" textAnchor="middle" fontSize="4" fill="currentColor" fontWeight="bold">2</text>
      <path d="M11 12h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="6" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
      <text x="6" y="19.5" textAnchor="middle" fontSize="4" fill="currentColor" fontWeight="bold">3</text>
      <path d="M11 18h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
}

// ============================================================================
// PROMPT ANALYSIS ENGINE
// ============================================================================
const analyzePrompt = (prompt) => {
  const lower = prompt.toLowerCase()
  const words = prompt.split(/\s+/).filter(w => w.length > 0)
  const sentences = prompt.split(/[.!?]+/).filter(s => s.trim().length > 0)
  
  // Detect task type
  const taskTypes = {
    coding: /\b(code|function|api|debug|fix|bug|error|implement|build|create.*app|script|program|algorithm|database|sql|html|css|javascript|python|react|component)\b/i,
    writing: /\b(write|draft|compose|essay|blog|article|email|letter|story|content|copy|post|description|summary|report)\b/i,
    analysis: /\b(analyze|analyse|review|evaluate|assess|compare|explain|breakdown|examine|investigate|research)\b/i,
    creative: /\b(creative|brainstorm|ideas?|generate|design|concept|innovate|imagine|invent)\b/i,
    learning: /\b(explain|teach|how.*work|what.*is|understand|learn|tutorial|guide|help.*understand)\b/i,
    data: /\b(data|csv|json|spreadsheet|excel|chart|graph|statistics|numbers|calculate|compute)\b/i,
    business: /\b(business|strategy|marketing|sales|proposal|pitch|presentation|meeting|client|customer)\b/i,
  }
  
  let detectedType = 'general'
  for (const [type, pattern] of Object.entries(taskTypes)) {
    if (pattern.test(lower)) {
      detectedType = type
      break
    }
  }
  
  // Detect complexity
  const complexity = words.length < 10 ? 'simple' : words.length < 30 ? 'medium' : 'complex'
  
  // Detect if it's a question
  const isQuestion = /\?$/.test(prompt.trim()) || /^(what|how|why|when|where|who|which|can|could|would|should|is|are|do|does)\b/i.test(lower)
  
  // Detect if it's a command/request
  const isCommand = /^(write|create|make|build|generate|help|give|show|list|explain|analyze|review|fix|debug|draft|design)/i.test(lower)
  
  // Extract key subjects/topics
  const importantWords = words.filter(w => 
    w.length > 4 && 
    !/^(about|their|there|these|those|would|could|should|being|having|which|where|while|after|before|during|through)$/i.test(w)
  ).slice(0, 5)
  
  // Detect tone requirements
  const needsFormal = /\b(professional|formal|business|official|corporate)\b/i.test(lower)
  const needsCasual = /\b(casual|friendly|informal|conversational|simple)\b/i.test(lower)
  
  // Detect output format hints
  const wantsList = /\b(list|bullet|points|steps|items)\b/i.test(lower)
  const wantsCode = /\b(code|function|script|implementation)\b/i.test(lower)
  const wantsLong = /\b(detailed|comprehensive|thorough|in-depth|extensive)\b/i.test(lower)
  const wantsShort = /\b(brief|short|concise|quick|summary)\b/i.test(lower)
  
  return {
    taskType: detectedType,
    complexity,
    isQuestion,
    isCommand,
    wordCount: words.length,
    sentenceCount: sentences.length,
    importantWords,
    tone: needsFormal ? 'formal' : needsCasual ? 'casual' : 'neutral',
    format: {
      wantsList,
      wantsCode,
      wantsLong,
      wantsShort,
    },
    originalPrompt: prompt,
  }
}

// ============================================================================
// INTELLIGENT REMIX ENGINE
// ============================================================================
const generateDetailedRemix = (analysis) => {
  const { taskType, complexity, isQuestion, wordCount, importantWords, tone, format, originalPrompt } = analysis
  
  // Build context-aware detailed prompt
  let contextSection = ''
  let constraintsSection = ''
  let formatSection = ''
  
  // Add context based on task type
  switch (taskType) {
    case 'coding':
      contextSection = `You are assisting with a software development task. Consider best practices, code maintainability, and potential edge cases.`
      constraintsSection = `- Follow coding conventions and style guides
- Include error handling where appropriate
- Add comments for complex logic
- Consider performance implications`
      break
    case 'writing':
      contextSection = `You are assisting with content creation. Focus on clarity, engagement, and achieving the intended purpose.`
      constraintsSection = `- Use clear, ${tone === 'formal' ? 'professional' : 'accessible'} language
- Structure content logically with smooth transitions
- Match the tone to the target audience
- Ensure accuracy and avoid filler content`
      break
    case 'analysis':
      contextSection = `You are conducting an analysis. Be thorough, objective, and evidence-based in your assessment.`
      constraintsSection = `- Present findings systematically
- Support conclusions with specific observations
- Consider multiple perspectives
- Identify both strengths and areas for improvement`
      break
    case 'creative':
      contextSection = `You are helping with creative ideation. Think outside conventional boundaries while maintaining practicality.`
      constraintsSection = `- Generate diverse, original ideas
- Build on concepts iteratively
- Balance innovation with feasibility
- Provide rationale for suggestions`
      break
    case 'learning':
      contextSection = `You are explaining a concept. Prioritize clarity and build understanding progressively.`
      constraintsSection = `- Start with fundamentals before advanced concepts
- Use relatable analogies where helpful
- Anticipate common points of confusion
- Verify understanding at each stage`
      break
    default:
      contextSection = `Approach this task thoughtfully, considering the specific requirements and desired outcome.`
      constraintsSection = `- Be specific and actionable
- Prioritize quality over quantity
- Address the core request directly
- Provide relevant context where needed`
  }
  
  // Add format guidance
  if (format.wantsList) {
    formatSection = `\n\nFormat your response as a structured list with clear categories.`
  } else if (format.wantsCode) {
    formatSection = `\n\nInclude working code examples with explanatory comments.`
  } else if (format.wantsLong) {
    formatSection = `\n\nProvide a comprehensive response covering all relevant aspects.`
  } else if (format.wantsShort) {
    formatSection = `\n\nKeep your response concise and focused on key points.`
  }
  
  return `${contextSection}

**Task:** ${originalPrompt}

**Requirements:**
${constraintsSection}

**Approach:**
1. First, understand exactly what is being asked
2. Consider the context and any implicit requirements
3. Develop a thorough response addressing all aspects
4. Review for completeness and accuracy${formatSection}`
}

const generateChainOfThoughtRemix = (analysis) => {
  const { taskType, isQuestion, complexity, originalPrompt, importantWords } = analysis
  
  // Build task-specific reasoning steps
  let reasoningSteps = ''
  
  switch (taskType) {
    case 'coding':
      reasoningSteps = `**Step 1: Understand the Requirements**
- What functionality is needed?
- What are the inputs and expected outputs?
- Are there any constraints or edge cases?

**Step 2: Design the Approach**
- What data structures are appropriate?
- What algorithm or pattern fits this problem?
- How should errors be handled?

**Step 3: Implementation Considerations**
- Break down into smaller functions if complex
- Consider code readability and maintenance
- Plan for testing and validation

**Step 4: Review and Refine**
- Does it handle edge cases?
- Is it efficient enough?
- Is the code clean and well-documented?`
      break
    case 'writing':
      reasoningSteps = `**Step 1: Clarify the Purpose**
- Who is the intended audience?
- What action or understanding should result?
- What tone is appropriate?

**Step 2: Structure the Content**
- What's the key message or hook?
- How should information flow logically?
- What supporting points are needed?

**Step 3: Draft with Intention**
- Lead with the most important information
- Use concrete examples where helpful
- Maintain consistent voice throughout

**Step 4: Refine and Polish**
- Is every sentence necessary?
- Does it achieve the intended purpose?
- Read aloud for flow and clarity`
      break
    case 'analysis':
      reasoningSteps = `**Step 1: Define Scope**
- What specific aspects need analysis?
- What criteria or framework should guide evaluation?
- What data or evidence is available?

**Step 2: Systematic Examination**
- Break down into component parts
- Evaluate each element against criteria
- Identify patterns and anomalies

**Step 3: Synthesize Findings**
- What conclusions does the evidence support?
- What are the implications?
- What remains uncertain or requires more information?

**Step 4: Formulate Recommendations**
- What actions follow from the analysis?
- What are the priorities?
- What risks should be considered?`
      break
    default:
      reasoningSteps = `**Step 1: Parse the Request**
- What is being asked specifically?
- What context is provided or implied?
- What would a successful response look like?

**Step 2: Gather Relevant Information**
- What knowledge applies to this situation?
- Are there multiple valid approaches?
- What assumptions might need to be stated?

**Step 3: Construct the Response**
- Address the core question directly
- Provide supporting detail proportional to complexity
- Organize information for easy comprehension

**Step 4: Validate**
- Does this fully answer what was asked?
- Is the reasoning sound?
- Are there caveats the user should know?`
  }
  
  return `I need to work through this systematically to provide the best response.

**Request:** ${originalPrompt}

${reasoningSteps}

---

Now, applying this framework to the specific request above, here is my response:`
}

const generatePersonaRemix = (analysis) => {
  const { taskType, tone, originalPrompt, complexity } = analysis
  
  // Select appropriate expert persona based on task
  let persona = ''
  let expertise = ''
  let approach = ''
  
  switch (taskType) {
    case 'coding':
      persona = 'Senior Software Engineer'
      expertise = 'You have 15+ years of production experience across multiple languages and frameworks. You\'ve led architecture decisions at scale and mentored dozens of developers.'
      approach = 'You prioritize clean, maintainable code over clever solutions. You always consider error handling, edge cases, and future maintenance. You explain your reasoning so others can learn.'
      break
    case 'writing':
      persona = 'Professional Editor and Content Strategist'
      expertise = 'You\'ve edited for major publications and helped hundreds of writers improve their craft. You understand what makes content engaging and effective.'
      approach = 'You focus on clarity, structure, and purpose. Every word should earn its place. You balance creativity with effectiveness and always keep the audience in mind.'
      break
    case 'analysis':
      persona = 'Research Analyst'
      expertise = 'You have deep experience in systematic evaluation across multiple domains. You\'re known for thorough, objective assessments that identify what others miss.'
      approach = 'You examine evidence methodically, acknowledge uncertainty appropriately, and distinguish between correlation and causation. Your recommendations are practical and prioritized.'
      break
    case 'creative':
      persona = 'Creative Director'
      expertise = 'You\'ve led creative teams at agencies and in-house, developing award-winning campaigns and products. You know how to generate innovative ideas that actually work.'
      approach = 'You push beyond the obvious while staying grounded in feasibility. You build on ideas iteratively, combining unexpected elements, and always explain the thinking behind creative choices.'
      break
    case 'business':
      persona = 'Management Consultant'
      expertise = 'You\'ve advised Fortune 500 companies and startups alike. You understand strategy, operations, and how to turn analysis into action.'
      approach = 'You cut through complexity to identify what matters. You back recommendations with data, anticipate objections, and focus on implementation.'
      break
    case 'learning':
      persona = 'Expert Educator'
      expertise = 'You\'ve taught thousands of students at all levels. You understand how people learn and how to make complex topics accessible.'
      approach = 'You build understanding progressively, use relatable analogies, and anticipate common misconceptions. You verify comprehension before moving forward.'
      break
    default:
      persona = 'Domain Expert'
      expertise = 'You have deep, practical knowledge in this area gained through years of hands-on experience.'
      approach = 'You provide grounded, actionable guidance. You\'re direct about what you know, what you\'re uncertain about, and what depends on context.'
  }
  
  return `**Role:** ${persona}

${expertise}

**Your approach:** ${approach}

---

**Task:** ${originalPrompt}

Respond as this expert would, drawing on your depth of experience. Be substantive and specific, not generic. If there are important considerations the requester might not have thought of, mention them.`
}

const generateMinimalRemix = (analysis) => {
  const { taskType, format, originalPrompt, isQuestion } = analysis
  
  let formatInstruction = ''
  
  if (format.wantsCode || taskType === 'coding') {
    formatInstruction = `Output format: Code only. Comments only where logic is non-obvious.`
  } else if (format.wantsList) {
    formatInstruction = `Output format: Bulleted list. No introductory text.`
  } else if (isQuestion) {
    formatInstruction = `Output format: Direct answer first. Supporting context only if essential.`
  } else {
    formatInstruction = `Output format: Essential information only. No preamble, no padding, no summary.`
  }

  return `${originalPrompt}

---

**Constraints:**
- No filler phrases ("Great question!", "Here's what I think...", "I hope this helps!")
- No restating the question
- No unnecessary caveats
- Get to the substance immediately
- ${formatInstruction}

If the answer is short, let it be short.`
}

const generateFewShotRemix = (analysis) => {
  const { taskType, originalPrompt, format } = analysis
  
  // Generate relevant example structure based on task type
  let exampleDescription = ''
  let examplePlaceholder1 = ''
  let examplePlaceholder2 = ''
  
  switch (taskType) {
    case 'coding':
      exampleDescription = 'code implementation tasks'
      examplePlaceholder1 = 'Create a function that validates email format'
      examplePlaceholder2 = 'Build a function that calculates compound interest'
      break
    case 'writing':
      exampleDescription = 'content creation requests'
      examplePlaceholder1 = 'Write a product description for wireless headphones'
      examplePlaceholder2 = 'Write a LinkedIn post about remote work benefits'
      break
    case 'analysis':
      exampleDescription = 'analytical evaluations'
      examplePlaceholder1 = 'Evaluate the pros and cons of microservices architecture'
      examplePlaceholder2 = 'Assess the market positioning of a new SaaS product'
      break
    default:
      exampleDescription = 'similar requests'
      examplePlaceholder1 = 'A comparable request in this domain'
      examplePlaceholder2 = 'Another similar request'
  }
  
  return `I want you to follow a specific pattern in your responses. Learn from these examples:

---

**Example Input 1:** ${examplePlaceholder1}

**Example Output 1:** [Paste an example of your ideal response format and style here]

---

**Example Input 2:** ${examplePlaceholder2}

**Example Output 2:** [Paste another example showing the exact format you want]

---

**Now, following that exact pattern, respond to:**

${originalPrompt}

---

*Instructions: Replace the example outputs above with actual examples that demonstrate your preferred format, length, tone, and style. The more specific your examples, the better the AI will match your expectations.*`
}

// ============================================================================
// MAIN REMIX FUNCTION
// ============================================================================
const remixPrompt = (userPrompt) => {
  if (!userPrompt || !userPrompt.trim()) return []
  
  const analysis = analyzePrompt(userPrompt)
  
  return [
    {
      id: 'detailed',
      label: 'Structured',
      icon: Icons.architect,
      color: '#4f46e5',
      technique: 'Detailed Prompting',
      description: `Adds ${analysis.taskType}-specific context, constraints, and a clear framework for comprehensive responses.`,
      text: generateDetailedRemix(analysis),
      analysis,
    },
    {
      id: 'chain-of-thought',
      label: 'Step-by-Step',
      icon: Icons.chain,
      color: '#7c3aed',
      technique: 'Chain of Thought',
      description: `Breaks down ${analysis.complexity === 'simple' ? 'the task' : 'this complex request'} into reasoning steps. Reduces errors on logic-heavy tasks.`,
      text: generateChainOfThoughtRemix(analysis),
      analysis,
    },
    {
      id: 'persona',
      label: 'Expert Mode',
      icon: Icons.persona,
      color: '#db2777',
      technique: 'Persona Prompting',
      description: `Routes to a ${analysis.taskType === 'general' ? 'domain expert' : analysis.taskType + ' specialist'} persona for higher-quality, field-specific responses.`,
      text: generatePersonaRemix(analysis),
      analysis,
    },
    {
      id: 'minimal',
      label: 'Zero Fluff',
      icon: Icons.minimal,
      color: '#d97706',
      technique: 'Concise Prompting',
      description: `Strips all filler and pleasantries. ${analysis.isQuestion ? 'Gets the direct answer fast.' : 'Delivers pure substance.'}`,
      text: generateMinimalRemix(analysis),
      analysis,
    },
    {
      id: 'few-shot',
      label: 'With Examples',
      icon: Icons.examples,
      color: '#059669',
      technique: 'Few-Shot Learning',
      description: `Template for ${analysis.taskType} examples. Fill in samples of ideal output to train exact formatting.`,
      text: generateFewShotRemix(analysis),
      analysis,
    },
  ]
}

// ============================================================================
// STARTER TEMPLATES
// ============================================================================
const starterTemplates = [
  { 
    category: 'Writing',
    label: 'Blog Post',
    text: 'Write a blog post about the future of remote work and how companies can adapt',
    icon: '✍️'
  },
  { 
    category: 'Writing',
    label: 'Professional Email',
    text: 'Help me write a professional email to request a deadline extension for a project',
    icon: '📧'
  },
  { 
    category: 'Coding',
    label: 'Code Review',
    text: 'Review this code for bugs, performance issues, and suggest improvements',
    icon: '🔍'
  },
  { 
    category: 'Coding',
    label: 'Debug Help',
    text: 'Help me debug this function that is returning unexpected results',
    icon: '🐛'
  },
  { 
    category: 'Learning',
    label: 'Explain Concept',
    text: 'Explain how API rate limiting works and best practices for implementing it',
    icon: '📚'
  },
  { 
    category: 'Learning',
    label: 'Tutorial Request',
    text: 'Create a step-by-step tutorial for setting up authentication in a web app',
    icon: '🎓'
  },
  { 
    category: 'Business',
    label: 'Strategy Analysis',
    text: 'Analyze the pros and cons of expanding into a new market segment',
    icon: '📊'
  },
  { 
    category: 'Business',
    label: 'Meeting Summary',
    text: 'Summarize the key action items and decisions from this meeting transcript',
    icon: '📝'
  },
  { 
    category: 'Creative',
    label: 'Brainstorm Ideas',
    text: 'Generate 10 unique marketing campaign ideas for a sustainable fashion brand',
    icon: '💡'
  },
  { 
    category: 'Data',
    label: 'Data Analysis',
    text: 'Analyze this sales data and identify trends, patterns, and actionable insights',
    icon: '📈'
  },
]

// Quick examples for inline buttons
const quickExamples = [
  { label: 'Code Review', text: 'Review this React component and suggest improvements for performance and readability' },
  { label: 'Write Email', text: 'Help me write a professional email to decline a meeting invitation politely' },
  { label: 'Explain', text: 'Explain how database indexing works and when to use it' },
]

// ============================================================================
// TOAST NOTIFICATION
// ============================================================================
const Toast = ({ message, isVisible }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 bg-[#2D2A26] text-white text-sm font-medium rounded-xl shadow-2xl flex items-center gap-2"
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 20 }}
          className="text-green-400"
        >
          {Icons.check}
        </motion.span>
        {message}
      </motion.div>
    )}
  </AnimatePresence>
)

// ============================================================================
// REMIX CARD
// ============================================================================
const RemixCard = ({ remix, index, onCopy, onExpand, copiedId }) => {
  const isCopied = copiedId === remix.id

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        type: 'spring', 
        stiffness: 300, 
        damping: 25, 
        delay: index * 0.06 
      }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative bg-white/80 backdrop-blur-sm rounded-2xl border border-[#2D2A26]/8 overflow-hidden cursor-pointer"
      style={{ 
        boxShadow: `0 2px 12px -2px ${remix.color}10, 0 4px 20px -4px rgba(0,0,0,0.06)`,
      }}
      onClick={() => onExpand(remix)}
    >
      {/* Top accent line */}
      <div 
        className="h-1"
        style={{ background: remix.color }}
      />
      
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div 
              className="p-2 rounded-xl"
              style={{ background: `${remix.color}12` }}
            >
              <span style={{ color: remix.color }}>{remix.icon}</span>
            </div>
            <div>
              <h3 className="font-semibold text-[#2D2A26] text-[15px]">{remix.label}</h3>
              <span 
                className="text-[10px] font-medium px-2 py-0.5 rounded-full inline-block mt-0.5"
                style={{ background: `${remix.color}10`, color: remix.color }}
              >
                {remix.technique}
              </span>
            </div>
          </div>
          
          <motion.button
            onClick={(e) => { e.stopPropagation(); onCopy(remix); }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`p-2 rounded-lg transition-colors z-10 relative ${
              isCopied 
                ? 'bg-green-100 text-green-600' 
                : 'bg-[#2D2A26]/5 text-[#2D2A26]/40 hover:bg-[#2D2A26]/10 hover:text-[#2D2A26]/70'
            }`}
            title="Copy to clipboard"
          >
            {isCopied ? Icons.check : Icons.copy}
          </motion.button>
        </div>
        
        {/* Description */}
        <p className="text-xs text-[#2D2A26]/60 mb-3 leading-relaxed">{remix.description}</p>
        
        {/* Preview */}
        <div className="bg-[#2D2A26]/[0.03] rounded-xl p-3 max-h-28 overflow-hidden relative">
          <p className="text-[11px] text-[#2D2A26]/70 font-mono leading-relaxed whitespace-pre-wrap">
            {remix.text.substring(0, 180)}...
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#f5f3f0] to-transparent pointer-events-none" />
        </div>
        
        {/* Expand hint */}
        <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-[#2D2A26]/30 group-hover:text-[#2D2A26]/50 transition-colors">
          {Icons.expand}
          <span>Click to expand full prompt</span>
        </div>
      </div>
    </motion.div>
  )
}

// ============================================================================
// EXPANDED MODAL
// ============================================================================
const ExpandedModal = ({ remix, onClose, onCopy, isCopied }) => {
  if (!remix) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#2D2A26]/10 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="p-2.5 rounded-xl"
                style={{ background: `${remix.color}12` }}
              >
                <span style={{ color: remix.color }}>{remix.icon}</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#2D2A26]">{remix.label}</h2>
                <span 
                  className="text-xs font-medium px-2 py-0.5 rounded-full"
                  style={{ background: `${remix.color}15`, color: remix.color }}
                >
                  {remix.technique}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-[#2D2A26]/5 transition-colors text-[#2D2A26]/40 hover:text-[#2D2A26]/70"
            >
              {Icons.close}
            </button>
          </div>
          <p className="mt-2 text-sm text-[#2D2A26]/60">{remix.description}</p>
          
          {/* Analysis badge */}
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="text-[10px] px-2 py-1 bg-[#2D2A26]/5 rounded-full text-[#2D2A26]/50">
              Detected: {remix.analysis.taskType}
            </span>
            <span className="text-[10px] px-2 py-1 bg-[#2D2A26]/5 rounded-full text-[#2D2A26]/50">
              Complexity: {remix.analysis.complexity}
            </span>
            <span className="text-[10px] px-2 py-1 bg-[#2D2A26]/5 rounded-full text-[#2D2A26]/50">
              {remix.analysis.wordCount} words
            </span>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-5 overflow-y-auto flex-1">
          <pre 
            className="whitespace-pre-wrap font-mono text-sm text-[#2D2A26] leading-relaxed bg-[#2D2A26]/[0.03] rounded-xl p-5 select-text cursor-text"
            style={{ userSelect: 'text', WebkitUserSelect: 'text' }}
          >
            {remix.text}
          </pre>
        </div>
        
        {/* Footer */}
        <div className="p-5 border-t border-[#2D2A26]/10 flex justify-between items-center flex-shrink-0">
          <p className="text-xs text-[#2D2A26]/40">Copy and paste into ChatGPT, Claude, or any AI</p>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm font-medium text-[#2D2A26]/60 hover:bg-[#2D2A26]/5 transition-colors"
            >
              Close
            </button>
            <motion.button
              onClick={() => onCopy(remix)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-5 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors ${
                isCopied 
                  ? 'bg-green-500 text-white' 
                  : 'bg-[#2D2A26] text-white hover:bg-[#2D2A26]/90'
              }`}
            >
              {isCopied ? Icons.check : Icons.copy}
              {isCopied ? 'Copied!' : 'Copy Prompt'}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ============================================================================
// STARTER TEMPLATES COMPONENT
// ============================================================================
const StarterTemplates = ({ onSelect }) => {
  const categories = [...new Set(starterTemplates.map(t => t.category))]
  
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-[#2D2A26]/70">Starter Templates</h3>
        <span className="text-xs text-[#2D2A26]/40">Click to use</span>
      </div>
      
      <div className="space-y-4">
        {categories.map(category => (
          <div key={category}>
            <div className="text-[10px] uppercase tracking-wider text-[#2D2A26]/40 mb-2 font-medium">
              {category}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {starterTemplates.filter(t => t.category === category).map((template, i) => (
                <motion.button
                  key={i}
                  onClick={() => onSelect(template.text)}
                  whileHover={{ scale: 1.01, y: -1 }}
                  whileTap={{ scale: 0.99 }}
                  className="flex items-start gap-3 p-3 bg-white/60 hover:bg-white/80 rounded-xl border border-[#2D2A26]/5 hover:border-[#2D2A26]/10 transition-all text-left group"
                >
                  <span className="text-lg flex-shrink-0 mt-0.5">{template.icon}</span>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-[#2D2A26] group-hover:text-[#2D2A26] transition-colors">
                      {template.label}
                    </div>
                    <div className="text-xs text-[#2D2A26]/50 truncate mt-0.5">
                      {template.text}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================================================
// MAIN TOOL
// ============================================================================
const PromptRemixTool = () => {
  const [userPrompt, setUserPrompt] = useState('')
  const [remixes, setRemixes] = useState([])
  const [isRemixing, setIsRemixing] = useState(false)
  const [copiedId, setCopiedId] = useState(null)
  const [toastMessage, setToastMessage] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [expandedRemix, setExpandedRemix] = useState(null)
  const [hasRemixed, setHasRemixed] = useState(false)
  const [showTemplates, setShowTemplates] = useState(true)
  const textareaRef = useRef(null)

  // Load saved prompt
  useEffect(() => {
    const saved = localStorage.getItem('promptRemix_lastPrompt')
    if (saved) {
      setUserPrompt(saved)
      setShowTemplates(false)
    }
  }, [])

  // Save prompt
  useEffect(() => {
    if (userPrompt) localStorage.setItem('promptRemix_lastPrompt', userPrompt)
  }, [userPrompt])

  const handleRemix = () => {
    if (!userPrompt.trim()) return
    
    setIsRemixing(true)
    setRemixes([])
    setShowTemplates(false)
    
    // Brief delay for visual feedback
    setTimeout(() => {
      if ('vibrate' in navigator) navigator.vibrate(30)
      
      const newRemixes = remixPrompt(userPrompt)
      setRemixes(newRemixes)
      setIsRemixing(false)
      setHasRemixed(true)
    }, 300)
  }

  const handleCopy = (remix) => {
    navigator.clipboard.writeText(remix.text)
    setCopiedId(remix.id)
    setToastMessage(`Copied "${remix.label}" prompt`)
    setShowToast(true)
    
    setTimeout(() => {
      setCopiedId(null)
      setShowToast(false)
    }, 2000)
  }

  const handleSelectTemplate = (text) => {
    setUserPrompt(text)
    setShowTemplates(false)
    textareaRef.current?.focus()
  }

  const handleKeyDown = (e) => {
    // Only handle Ctrl+Enter or Cmd+Enter for remix
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      handleRemix()
    }
    // Let all other keyboard shortcuts work normally (Ctrl+A, Ctrl+C, etc.)
  }

  const handleClearAndShowTemplates = () => {
    setUserPrompt('')
    setRemixes([])
    setHasRemixed(false)
    setShowTemplates(true)
    localStorage.removeItem('promptRemix_lastPrompt')
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Input */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-[#2D2A26]/8 shadow-sm mb-6 select-text">
        <div className="flex items-center justify-between mb-2">
          <label className="text-[#2D2A26]/50 text-xs uppercase tracking-wider font-medium">
            Enter your prompt
          </label>
          {userPrompt && (
            <button
              onClick={handleClearAndShowTemplates}
              className="text-xs text-[#2D2A26]/40 hover:text-[#2D2A26]/70 transition-colors"
            >
              Clear & show templates
            </button>
          )}
        </div>
        
        <textarea
          ref={textareaRef}
          value={userPrompt}
          onChange={(e) => {
            setUserPrompt(e.target.value)
            if (e.target.value) setShowTemplates(false)
          }}
          placeholder="What do you want AI to help you with? (e.g., Write a blog post about...)"
          className="w-full h-28 bg-transparent text-[#2D2A26] text-base placeholder-[#2D2A26]/30 resize-none focus:outline-none leading-relaxed select-text cursor-text"
          style={{ userSelect: 'text', WebkitUserSelect: 'text' }}
          onKeyDown={handleKeyDown}
          spellCheck={true}
        />
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-3 pt-3 border-t border-[#2D2A26]/8">
          <div className="flex flex-wrap gap-1.5">
            {quickExamples.map((ex, i) => (
              <button
                key={i}
                onClick={() => handleSelectTemplate(ex.text)}
                className="px-2.5 py-1 bg-[#2D2A26]/5 rounded-lg text-[11px] text-[#2D2A26]/60 hover:bg-[#2D2A26]/10 hover:text-[#2D2A26] transition-colors"
              >
                {ex.label}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-[#2D2A26]/30 hidden sm:block">
              Ctrl+Enter
            </span>
            <motion.button
              onClick={handleRemix}
              disabled={!userPrompt.trim() || isRemixing}
              whileHover={{ scale: userPrompt.trim() && !isRemixing ? 1.02 : 1 }}
              whileTap={{ scale: userPrompt.trim() && !isRemixing ? 0.98 : 1 }}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                userPrompt.trim() && !isRemixing
                  ? 'bg-[#2D2A26] text-white shadow-md'
                  : 'bg-[#2D2A26]/10 text-[#2D2A26]/40 cursor-not-allowed'
              }`}
            >
              <motion.span
                animate={isRemixing ? { rotate: 360 } : {}}
                transition={isRemixing ? { duration: 0.5, repeat: Infinity, ease: 'linear' } : {}}
              >
                {Icons.remix}
              </motion.span>
              {isRemixing ? 'Analyzing...' : 'Remix'}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Starter Templates - show when no prompt and no results */}
      <AnimatePresence mode="wait">
        {showTemplates && !hasRemixed && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <StarterTemplates onSelect={handleSelectTemplate} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence mode="wait">
        {remixes.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Analysis summary */}
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="text-sm text-[#2D2A26]/70 font-medium">Detected:</span>
              <span className="text-xs px-2.5 py-1 bg-[#2D2A26]/5 rounded-full text-[#2D2A26]/60">
                {remixes[0]?.analysis.taskType} task
              </span>
              <span className="text-xs px-2.5 py-1 bg-[#2D2A26]/5 rounded-full text-[#2D2A26]/60">
                {remixes[0]?.analysis.complexity} complexity
              </span>
              {remixes[0]?.analysis.isQuestion && (
                <span className="text-xs px-2.5 py-1 bg-blue-50 rounded-full text-blue-600">
                  question
                </span>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {remixes.map((remix, index) => (
                <RemixCard
                  key={remix.id}
                  remix={remix}
                  index={index}
                  onCopy={handleCopy}
                  onExpand={setExpandedRemix}
                  copiedId={copiedId}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty state - only show if templates are hidden and no results */}
      {!showTemplates && !hasRemixed && remixes.length === 0 && userPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-10"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 bg-[#2D2A26]/5 rounded-2xl mb-3 text-[#2D2A26]/30">
            {Icons.remix}
          </div>
          <h3 className="text-base font-semibold text-[#2D2A26]/70 mb-1">Ready to remix</h3>
          <p className="text-sm text-[#2D2A26]/40 max-w-sm mx-auto">
            Click the Remix button to generate 5 optimized prompt variations.
          </p>
        </motion.div>
      )}

      <Toast message={toastMessage} isVisible={showToast} />

      <AnimatePresence>
        {expandedRemix && (
          <ExpandedModal
            remix={expandedRemix}
            onClose={() => setExpandedRemix(null)}
            onCopy={handleCopy}
            isCopied={copiedId === expandedRemix?.id}
          />
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
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [30, 0, 0, -30])
  return <motion.section ref={ref} style={{ opacity, y }} className={className}>{children}</motion.section>
}

const SEOContent = () => (
  <div className="mt-14 space-y-12">
    <ContentSection>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-[#2D2A26] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          What is a Prompt Generator?
        </h2>
        <div className="prose text-[#2D2A26]/70 text-[15px] leading-relaxed">
          <p>
            A prompt generator transforms basic requests into structured prompts that get better results from AI models like ChatGPT, Claude, and Gemini.
          </p>
          <p>
            Most people write prompts like "help me write an email." The AI can respond, but the output is often generic. Adding structure—context, constraints, format specifications—dramatically improves response quality.
          </p>
          <p>
            This tool analyzes what you're trying to accomplish and applies appropriate prompting techniques automatically.
          </p>
        </div>
      </div>
    </ContentSection>

    <ContentSection>
      <div className="max-w-3xl mx-auto bg-white/60 rounded-xl p-6 border border-[#2D2A26]/5">
        <div className="flex items-center gap-3 mb-3">
          <span style={{ color: '#7c3aed' }}>{Icons.chain}</span>
          <h2 className="text-lg font-bold text-[#2D2A26]">Chain of Thought Prompting</h2>
        </div>
        <p className="text-sm text-[#2D2A26]/70 leading-relaxed">
          Chain of Thought prompting asks the AI to work through problems step by step before giving a final answer. Research shows this reduces errors by 30-40% on reasoning-heavy tasks like math, logic, and multi-step analysis. The technique is especially useful when you need to understand <em>how</em> the AI reached its conclusion.
        </p>
      </div>
    </ContentSection>

    <ContentSection>
      <div className="max-w-3xl mx-auto bg-white/60 rounded-xl p-6 border border-[#2D2A26]/5">
        <div className="flex items-center gap-3 mb-3">
          <span style={{ color: '#db2777' }}>{Icons.persona}</span>
          <h2 className="text-lg font-bold text-[#2D2A26]">Persona Prompting</h2>
        </div>
        <p className="text-sm text-[#2D2A26]/70 leading-relaxed">
          Assigning an expert persona changes how the AI approaches your request. Instead of a generic response, you get domain-specific terminology, deeper expertise, and professional-grade output. A "senior software engineer" persona produces different (usually better) code than a generic prompt.
        </p>
      </div>
    </ContentSection>

    <ContentSection>
      <div className="max-w-3xl mx-auto bg-white/60 rounded-xl p-6 border border-[#2D2A26]/5">
        <div className="flex items-center gap-3 mb-3">
          <span style={{ color: '#059669' }}>{Icons.examples}</span>
          <h2 className="text-lg font-bold text-[#2D2A26]">Few-Shot Prompting</h2>
        </div>
        <p className="text-sm text-[#2D2A26]/70 leading-relaxed">
          Few-shot prompting provides examples of the input/output format you want. This is the most reliable way to control response formatting. If the AI keeps giving you bullet points but you want numbered lists, or verbose text when you want concise—show it 2-3 examples of exactly what you want.
        </p>
      </div>
    </ContentSection>

    <ContentSection>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl font-bold text-[#2D2A26] mb-6 text-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Technique Comparison
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm bg-white/60 rounded-xl overflow-hidden">
            <thead className="bg-[#2D2A26]/5">
              <tr>
                <th className="text-left py-3 px-4 text-[#2D2A26]/60 font-medium">Technique</th>
                <th className="text-left py-3 px-4 text-[#2D2A26]/60 font-medium">Best For</th>
                <th className="text-left py-3 px-4 text-[#2D2A26]/60 font-medium">Improvement</th>
              </tr>
            </thead>
            <tbody>
              {[
                { technique: 'Structured', best: 'Complex tasks, detailed work', improvement: 'More comprehensive output' },
                { technique: 'Chain of Thought', best: 'Math, logic, analysis', improvement: '30-40% fewer errors' },
                { technique: 'Persona', best: 'Expert knowledge needed', improvement: 'Domain-specific quality' },
                { technique: 'Zero Fluff', best: 'Quick answers, code', improvement: 'Shorter, direct responses' },
                { technique: 'Few-Shot', best: 'Specific formatting', improvement: 'Exact format match' },
              ].map((row, i) => (
                <tr key={i} className="border-t border-[#2D2A26]/5">
                  <td className="py-3 px-4 font-medium text-[#2D2A26]">{row.technique}</td>
                  <td className="py-3 px-4 text-[#2D2A26]/60">{row.best}</td>
                  <td className="py-3 px-4 text-green-600 font-medium">{row.improvement}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ContentSection>

    <ContentSection>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl font-bold text-[#2D2A26] mb-5 text-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          FAQ
        </h2>
        <div className="space-y-3">
          {[
            {
              q: 'Is this tool free?',
              a: 'Yes. All processing happens in your browser—there are no API calls, no server, no usage limits.'
            },
            {
              q: 'Does this work with ChatGPT, Claude, and Gemini?',
              a: 'Yes. These prompting techniques work with any modern language model.'
            },
            {
              q: 'How does it know what type of task I have?',
              a: 'The tool analyzes keywords, structure, and patterns in your prompt to detect whether it\'s a coding task, writing task, analysis, etc., and adapts the output accordingly.'
            },
            {
              q: 'Why not use AI to generate the prompts?',
              a: 'Client-side pattern matching is instant, free, and works offline. Using an API would add cost, latency, and require a server to secure the API key.'
            },
          ].map((faq, i) => (
            <div key={i} className="bg-white/60 rounded-xl p-4 border border-[#2D2A26]/5">
              <h3 className="font-semibold text-[#2D2A26] text-sm mb-1">{faq.q}</h3>
              <p className="text-sm text-[#2D2A26]/60">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </ContentSection>
  </div>
)

// ============================================================================
// MAIN PAGE
// ============================================================================
export default function PromptRemix() {
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
    
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      'name': 'Prompt Remix - AI Prompt Generator',
      'description': SEO_DESC,
      'applicationCategory': 'Utility',
      'operatingSystem': 'Any',
      'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' }
    }
    
    let script = document.querySelector('script[data-schema="prompt-remix"]')
    if (!script) {
      script = document.createElement('script')
      script.type = 'application/ld+json'
      script.setAttribute('data-schema', 'prompt-remix')
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
      <div className="fixed inset-0 -z-10" style={{ background: 'linear-gradient(180deg, #F8F5F0 0%, #EDE8E0 100%)' }} />
      <div className="relative z-10 min-h-screen px-4 md:px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="text-center mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 
              className="text-2xl md:text-3xl font-bold text-[#2D2A26] mb-1"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Prompt Remix
            </h1>
            <p className="text-[#2D2A26]/50 text-sm">
              Transform basic prompts into professional-grade AI prompts
            </p>
          </motion.div>

          <PromptRemixTool />
          <SEOContent />

          <motion.footer 
            className="mt-14 pt-6 border-t border-[#2D2A26]/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <img 
                  src="https://play-lh.googleusercontent.com/lOGaWbwoVmJcBKAatXi0TFhY-XcZEPhat-f1sI6WRo2pd7uOq-kBv6f7t8N2GEljlPQwMxbpDWOt-XPzToP5fpE=w480-h960-rw" 
                  alt="VibeBrews" 
                  className="w-7 h-7 rounded-lg" 
                />
                <span className="text-[#2D2A26]/60 text-sm">A free tool by <strong className="text-[#2D2A26]/80">VibeBrews</strong></span>
              </div>
              <nav className="flex gap-5 text-sm text-[#2D2A26]/50">
                <Link to="/" className="hover:text-[#2D2A26] transition-colors">Home</Link>
                <Link to="/ai-token-calculator" className="hover:text-[#2D2A26] transition-colors">Token Calculator</Link>
                <Link to="/ai-model-picker" className="hover:text-[#2D2A26] transition-colors">Model Picker</Link>
              </nav>
            </div>
          </motion.footer>
        </div>
      </div>
    </PageTransition>
  )
}
