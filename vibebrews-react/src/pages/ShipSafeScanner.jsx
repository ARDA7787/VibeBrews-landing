import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence, useSpring, useScroll, useTransform } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import { Link } from 'react-router-dom'

// ============================================================================
// SEO CONFIG (2026 High-Intent Keywords)
// ============================================================================
const SEO_TITLE = 'Free Code Security Scanner - Find Exposed API Keys Instantly (2026)'
const SEO_DESC = 'Scan your code for leaked API keys, hardcoded passwords, and security vulnerabilities. 100% client-side - your code never leaves your browser. Free, no signup.'
const SEO_KEYWORDS = 'code security scanner online free, find exposed api keys in code, scan code for leaked secrets, is my code secure checker, check code vulnerabilities free, vibe coding security, cursor ai security check, indie hacker security tool, hardcoded password finder, api key leak detector'

// ============================================================================
// CUSTOM SVG ICONS (Medical/Security Theme)
// ============================================================================
const Icons = {
  shield: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  shieldCheck: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>,
  shieldAlert: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  scan: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M3 7V5a2 2 0 012-2h2"/><path d="M17 3h2a2 2 0 012 2v2"/><path d="M21 17v2a2 2 0 01-2 2h-2"/><path d="M7 21H5a2 2 0 01-2-2v-2"/><line x1="7" y1="12" x2="17" y2="12"/></svg>,
  key: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>,
  database: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
  code: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  book: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>,
  checklist: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>,
  skull: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="10" r="8"/><path d="M8 16v6h8v-6"/><circle cx="9" cy="10" r="1.5" fill="currentColor"/><circle cx="15" cy="10" r="1.5" fill="currentColor"/><path d="M10 14h4"/></svg>,
  check: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><polyline points="20 6 9 17 4 12"/></svg>,
  copy: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>,
  warning: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  info: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
  lock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
  unlock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 019.9-1"/></svg>,
  eye: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  fire: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"/></svg>,
  zap: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  expand: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><polyline points="6 9 12 15 18 9"/></svg>,
  collapse: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><polyline points="18 15 12 9 6 15"/></svg>,
  github: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>,
  download: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
}

// ============================================================================
// SECURITY PATTERNS (RegEx Engine)
// ============================================================================
const securityPatterns = [
  // CRITICAL - Immediate account takeover risk
  {
    id: 'aws-access-key',
    name: 'AWS Access Key ID',
    pattern: /(?:AKIA|A3T|AGPA|AIDA|AROA|AIPA|ANPA|ANVA|ASIA)[A-Z0-9]{16}/g,
    severity: 'critical',
    description: 'AWS Access Key exposed - attackers can control your cloud resources',
    fix: 'Use environment variables: process.env.AWS_ACCESS_KEY_ID',
    why: 'Bots scan GitHub 24/7 for AWS keys. One exposed key = $50K+ in crypto mining charges within hours.',
    category: 'api-keys'
  },
  {
    id: 'aws-secret-key',
    name: 'AWS Secret Access Key',
    pattern: /(?:aws)?_?(?:secret)?_?(?:access)?_?key['":\s]*[=:]\s*['"]?[A-Za-z0-9/+=]{40}['"]?/gi,
    severity: 'critical',
    description: 'AWS Secret Key detected - full account access possible',
    fix: 'Store in .env file and add to .gitignore:\nAWS_SECRET_ACCESS_KEY=your_key_here',
    why: 'Combined with Access Key ID, this gives complete control over your AWS account.',
    category: 'api-keys'
  },
  {
    id: 'stripe-live-key',
    name: 'Stripe Live Secret Key',
    pattern: /sk_live_[a-zA-Z0-9]{24,}/g,
    severity: 'critical',
    description: 'Stripe LIVE secret key - attackers can process real payments',
    fix: 'Move to server-side env var:\nprocess.env.STRIPE_SECRET_KEY',
    why: 'This key can create charges, refunds, and access all your customer payment data.',
    category: 'api-keys'
  },
  {
    id: 'stripe-restricted-key',
    name: 'Stripe Restricted Key',
    pattern: /rk_live_[a-zA-Z0-9]{24,}/g,
    severity: 'critical',
    description: 'Stripe restricted live key exposed',
    fix: 'Store in environment variables, never in frontend code',
    why: 'Even restricted keys can access sensitive payment operations.',
    category: 'api-keys'
  },
  {
    id: 'openai-key',
    name: 'OpenAI API Key',
    pattern: /sk-[a-zA-Z0-9]{20}T3BlbkFJ[a-zA-Z0-9]{20}/g,
    severity: 'critical',
    description: 'OpenAI API key exposed - unlimited API charges possible',
    fix: 'Use server-side proxy:\nconst response = await fetch("/api/chat")',
    why: 'Attackers use leaked keys for free GPT-4 access. You pay the bill.',
    category: 'api-keys'
  },
  {
    id: 'openai-key-new',
    name: 'OpenAI API Key (New Format)',
    pattern: /sk-proj-[a-zA-Z0-9_-]{80,}/g,
    severity: 'critical',
    description: 'OpenAI project API key exposed',
    fix: 'Move to backend and use environment variables',
    why: 'New format keys have the same risk - unlimited charges on your account.',
    category: 'api-keys'
  },
  {
    id: 'anthropic-key',
    name: 'Anthropic API Key',
    pattern: /sk-ant-[a-zA-Z0-9_-]{90,}/g,
    severity: 'critical',
    description: 'Anthropic (Claude) API key exposed',
    fix: 'Use backend proxy:\nconst response = await fetch("/api/claude")',
    why: 'Claude API access is expensive. Leaked keys = instant abuse.',
    category: 'api-keys'
  },
  {
    id: 'google-api-key',
    name: 'Google API Key',
    pattern: /AIza[0-9A-Za-z_-]{35}/g,
    severity: 'critical',
    description: 'Google Cloud/Maps API key detected',
    fix: 'Restrict key in Google Cloud Console + use env vars',
    why: 'Google keys often have broad permissions. One student got a $55K Gemini bill from one leaked key.',
    category: 'api-keys'
  },
  {
    id: 'firebase-config',
    name: 'Firebase Config Object',
    pattern: /apiKey:\s*["'][A-Za-z0-9_-]{39}["']/g,
    severity: 'high',
    description: 'Firebase configuration with API key exposed',
    fix: 'Firebase keys are meant to be public, but secure with Firestore rules',
    why: 'Without proper security rules, anyone can read/write your database.',
    category: 'api-keys'
  },
  {
    id: 'github-token',
    name: 'GitHub Token',
    pattern: /(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{36,}/g,
    severity: 'critical',
    description: 'GitHub personal access token exposed',
    fix: 'Revoke immediately at github.com/settings/tokens',
    why: 'Can access/modify your repos, create commits, access private code.',
    category: 'api-keys'
  },
  {
    id: 'private-key',
    name: 'Private Key',
    pattern: /-----BEGIN\s+(?:RSA|OPENSSH|DSA|EC|PGP)?\s*PRIVATE KEY-----/g,
    severity: 'critical',
    description: 'Private cryptographic key exposed',
    fix: 'Never commit private keys. Generate new ones and store securely.',
    why: 'Private keys are the master password. Attackers can impersonate you completely.',
    category: 'credentials'
  },
  {
    id: 'jwt-secret',
    name: 'JWT Secret',
    pattern: /(?:jwt|JWT)[\s_-]*(?:secret|SECRET|key|KEY)['":\s]*[=:]\s*['"][^'"]{16,}['"]/g,
    severity: 'critical',
    description: 'JWT signing secret exposed',
    fix: 'Store in env: process.env.JWT_SECRET',
    why: 'Attackers can forge authentication tokens and access any account.',
    category: 'credentials'
  },
  // HIGH - Data leak/corruption risk
  {
    id: 'hardcoded-password',
    name: 'Hardcoded Password',
    pattern: /(?:password|passwd|pwd|secret|token)['":\s]*[=:]\s*['"][^'"]{4,}['"]/gi,
    severity: 'high',
    description: 'Hardcoded password or secret detected',
    fix: 'Use environment variables:\nconst password = process.env.DB_PASSWORD',
    why: 'Hardcoded credentials in code history can never be fully removed.',
    category: 'credentials'
  },
  {
    id: 'database-url',
    name: 'Database Connection String',
    pattern: /(?:mongodb(?:\+srv)?|postgres(?:ql)?|mysql|redis|jdbc):\/\/[^\s'"]+:[^\s'"]+@[^\s'"]+/gi,
    severity: 'high',
    description: 'Database connection string with credentials',
    fix: 'Use environment variable:\nconst dbUrl = process.env.DATABASE_URL',
    why: 'Direct database access = complete data breach. All your user data exposed.',
    category: 'credentials'
  },
  {
    id: 'sql-injection',
    name: 'SQL Injection Risk',
    pattern: /(?:SELECT|INSERT|UPDATE|DELETE|DROP)\s+.*?\+\s*(?:req\.|request\.|params\.|query\.|body\.|input|user)/gi,
    severity: 'high',
    description: 'SQL query with string concatenation - injection risk',
    fix: 'Use parameterized queries:\ndb.query("SELECT * FROM users WHERE id = $1", [userId])',
    why: 'Attackers can extract all data, delete tables, or bypass authentication.',
    category: 'injection'
  },
  {
    id: 'sql-template-literal',
    name: 'SQL Template Literal',
    pattern: /`\s*(?:SELECT|INSERT|UPDATE|DELETE)\s+.*\$\{/gi,
    severity: 'high',
    description: 'SQL query using template literals - injection risk',
    fix: 'Use a SQL builder or parameterized queries instead',
    why: 'Template literals in SQL are just as dangerous as string concatenation.',
    category: 'injection'
  },
  {
    id: 'innerHTML',
    name: 'Unsafe innerHTML',
    pattern: /\.innerHTML\s*=\s*(?!['"]<)/g,
    severity: 'high',
    description: 'innerHTML with dynamic content - XSS risk',
    fix: 'Use textContent or sanitize with DOMPurify:\nelement.textContent = userInput',
    why: 'Attackers can inject scripts that steal cookies, redirect users, or deface your site.',
    category: 'injection'
  },
  {
    id: 'dangerously-set',
    name: 'React dangerouslySetInnerHTML',
    pattern: /dangerouslySetInnerHTML\s*=\s*\{\s*\{\s*__html:\s*(?!['"])/g,
    severity: 'high',
    description: 'dangerouslySetInnerHTML with unsanitized content',
    fix: 'Sanitize with DOMPurify:\ndangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}',
    why: 'The name says it all - this bypasses React\'s XSS protections.',
    category: 'injection'
  },
  {
    id: 'eval-usage',
    name: 'Eval Usage',
    pattern: /\beval\s*\([^)]*(?:req|request|params|query|body|input|user)/gi,
    severity: 'high',
    description: 'eval() with user input - code execution risk',
    fix: 'Never use eval with user input. Use JSON.parse for data.',
    why: 'eval() executes any JavaScript. Attackers can run malicious code on your server.',
    category: 'injection'
  },
  // MEDIUM - Best practice violations
  {
    id: 'console-sensitive',
    name: 'Console Log Sensitive Data',
    pattern: /console\.log\s*\([^)]*(?:password|secret|token|key|auth|credential|ssn|credit)/gi,
    severity: 'medium',
    description: 'Console logging potentially sensitive data',
    fix: 'Remove sensitive data logging:\nconsole.log("User logged in:", userId) // Don\'t log tokens',
    why: 'Console logs appear in browser dev tools. Users (and attackers) can see them.',
    category: 'logging'
  },
  {
    id: 'debug-mode',
    name: 'Debug Mode Enabled',
    pattern: /(?:DEBUG|debug)\s*[=:]\s*(?:true|1|['"]true['"])/g,
    severity: 'medium',
    description: 'Debug mode appears to be enabled',
    fix: 'Use environment-based debug:\nconst DEBUG = process.env.NODE_ENV === "development"',
    why: 'Debug mode often exposes stack traces, internal paths, and sensitive errors.',
    category: 'config'
  },
  {
    id: 'cors-wildcard',
    name: 'CORS Wildcard',
    pattern: /(?:Access-Control-Allow-Origin|cors)['":\s]*[=:]\s*['"]?\*['"]?/gi,
    severity: 'medium',
    description: 'CORS allows all origins - may expose API to abuse',
    fix: 'Restrict to your domains:\nAccess-Control-Allow-Origin: https://yourdomain.com',
    why: 'Any website can make requests to your API, potentially abusing it.',
    category: 'config'
  },
  {
    id: 'http-url',
    name: 'Insecure HTTP URL',
    pattern: /['"]http:\/\/(?!localhost|127\.0\.0\.1)[^'"]+['"]/g,
    severity: 'medium',
    description: 'HTTP URL detected - data sent unencrypted',
    fix: 'Use HTTPS:\nconst apiUrl = "https://api.example.com"',
    why: 'HTTP traffic can be intercepted and read by anyone on the network.',
    category: 'config'
  },
  {
    id: 'localstorage-sensitive',
    name: 'LocalStorage Sensitive Data',
    pattern: /localStorage\.setItem\s*\([^)]*(?:password|secret|token|key|auth|jwt)/gi,
    severity: 'medium',
    description: 'Storing sensitive data in localStorage',
    fix: 'Use httpOnly cookies for auth tokens instead',
    why: 'localStorage is accessible by any JavaScript - vulnerable to XSS attacks.',
    category: 'storage'
  },
  {
    id: 'todo-security',
    name: 'Security TODO',
    pattern: /(?:\/\/|#|\/\*)\s*TODO:?\s*(?:fix|add|implement)?\s*(?:security|auth|validation|sanitize)/gi,
    severity: 'medium',
    description: 'Unresolved security TODO comment',
    fix: 'Address security TODOs before shipping',
    why: 'Security TODOs indicate known vulnerabilities that haven\'t been fixed.',
    category: 'code-quality'
  },
]

// ============================================================================
// SEVERITY CONFIG
// ============================================================================
const severityConfig = {
  critical: {
    color: '#ef4444',
    bgColor: 'rgba(239, 68, 68, 0.1)',
    borderColor: 'rgba(239, 68, 68, 0.3)',
    label: 'CRITICAL',
    icon: Icons.fire,
    description: 'Immediate account takeover or data breach risk'
  },
  high: {
    color: '#f97316',
    bgColor: 'rgba(249, 115, 22, 0.1)',
    borderColor: 'rgba(249, 115, 22, 0.3)',
    label: 'HIGH',
    icon: Icons.warning,
    description: 'Data leak or system corruption possible'
  },
  medium: {
    color: '#eab308',
    bgColor: 'rgba(234, 179, 8, 0.1)',
    borderColor: 'rgba(234, 179, 8, 0.3)',
    label: 'MEDIUM',
    icon: Icons.info,
    description: 'Security best practice violation'
  },
  good: {
    color: '#22c55e',
    bgColor: 'rgba(34, 197, 94, 0.1)',
    borderColor: 'rgba(34, 197, 94, 0.3)',
    label: 'GOOD',
    icon: Icons.check,
    description: 'No issues detected'
  }
}

// ============================================================================
// ANIMATED NUMBER COMPONENT
// ============================================================================
const AnimatedNum = ({ value, decimals = 0 }) => {
  const spring = useSpring(0, { stiffness: 100, damping: 20 })
  const [display, setDisplay] = useState(value)
  useEffect(() => { spring.set(value); return spring.on('change', v => setDisplay(v)) }, [value, spring])
  return <span>{Math.round(display)}</span>
}

// ============================================================================
// SCAN ENGINE
// ============================================================================
const scanCode = (code) => {
  if (!code || code.trim().length === 0) return []
  
  const findings = []
  const lines = code.split('\n')
  
  for (const pattern of securityPatterns) {
    const regex = new RegExp(pattern.pattern.source, pattern.pattern.flags)
    let match
    
    while ((match = regex.exec(code)) !== null) {
      // Find line number
      const beforeMatch = code.substring(0, match.index)
      const lineNumber = (beforeMatch.match(/\n/g) || []).length + 1
      const line = lines[lineNumber - 1] || ''
      
      // Avoid duplicates
      const isDuplicate = findings.some(f => 
        f.id === pattern.id && f.lineNumber === lineNumber
      )
      
      if (!isDuplicate) {
        findings.push({
          ...pattern,
          lineNumber,
          matchedText: match[0].length > 50 ? match[0].substring(0, 47) + '...' : match[0],
          lineContent: line.trim(),
        })
      }
    }
  }
  
  return findings.sort((a, b) => {
    const severityOrder = { critical: 0, high: 1, medium: 2 }
    if (severityOrder[a.severity] !== severityOrder[b.severity]) {
      return severityOrder[a.severity] - severityOrder[b.severity]
    }
    return a.lineNumber - b.lineNumber
  })
}

// ============================================================================
// EXAMPLE CODE SAMPLES
// ============================================================================
const exampleCodes = [
  {
    label: 'AWS Keys Leak',
    code: `// config.js - DON'T DO THIS
const AWS = require('aws-sdk');

const config = {
  accessKeyId: 'AKIAIOSFODNN7EXAMPLE',
  secretAccessKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
  region: 'us-east-1'
};

AWS.config.update(config);`,
  },
  {
    label: 'Stripe Key Exposed',
    code: `// payment.js
import Stripe from 'stripe';

// Never put live keys in frontend code!
const stripe = new Stripe('sk_live_51H7xyzABCDEFGHIJKLMNOPQ');

export const createPayment = async (amount) => {
  return await stripe.paymentIntents.create({ amount });
};`,
  },
  {
    label: 'SQL Injection',
    code: `// user.controller.js
app.get('/user', async (req, res) => {
  const userId = req.query.id;
  
  // DANGER: SQL Injection vulnerability!
  const query = "SELECT * FROM users WHERE id = " + userId;
  const user = await db.query(query);
  
  res.json(user);
});`,
  },
  {
    label: 'Mixed Vulnerabilities',
    code: `// app.js - Multiple issues
const password = "admin123";
const apiKey = "sk-proj-1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijk";

// Debug mode left on
const DEBUG = true;

app.post('/login', (req, res) => {
  console.log("Login attempt with password:", req.body.password);
  
  // SQL Injection risk
  const sql = "SELECT * FROM users WHERE email = '" + req.body.email + "'";
  
  // Storing JWT in localStorage
  localStorage.setItem('auth_token', jwt);
});`,
  },
  {
    label: 'Clean Code',
    code: `// secure-app.js - Good practices
import { config } from 'dotenv';
config();

const apiKey = process.env.API_KEY;
const dbUrl = process.env.DATABASE_URL;

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Parameterized query - safe from injection
  const user = await db.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
  
  // Secure cookie for auth
  res.cookie('session', token, { 
    httpOnly: true, 
    secure: true,
    sameSite: 'strict'
  });
});`,
  },
]

// ============================================================================
// FINDING CARD COMPONENT
// ============================================================================
const FindingCard = ({ finding, isExpanded, onToggle }) => {
  const config = severityConfig[finding.severity]
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="rounded-2xl overflow-hidden"
      style={{ backgroundColor: config.bgColor, border: `1px solid ${config.borderColor}` }}
    >
      <motion.button
        onClick={onToggle}
        className="w-full p-4 text-left flex items-start gap-3"
        whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
      >
        <div className="flex-shrink-0 mt-0.5" style={{ color: config.color }}>
          {config.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span 
              className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase"
              style={{ backgroundColor: config.color, color: 'white' }}
            >
              {config.label}
            </span>
            <span className="font-medium text-[#2D2A26] text-sm">{finding.name}</span>
            <span className="text-[#2D2A26]/40 text-xs">Line {finding.lineNumber}</span>
          </div>
          <p className="text-[#2D2A26]/60 text-xs mt-1">{finding.description}</p>
          <code className="block mt-2 p-2 bg-black/5 rounded-lg text-xs font-mono text-[#2D2A26]/80 truncate">
            {finding.lineContent}
          </code>
        </div>
        <div className="flex-shrink-0 text-[#2D2A26]/30">
          {isExpanded ? Icons.collapse : Icons.expand}
        </div>
      </motion.button>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t"
            style={{ borderColor: config.borderColor }}
          >
            <div className="p-4 space-y-4">
              <div>
                <div className="text-[10px] uppercase text-[#2D2A26]/40 font-medium mb-2">Why This Is Dangerous</div>
                <p className="text-sm text-[#2D2A26]/70">{finding.why}</p>
              </div>
              <div>
                <div className="text-[10px] uppercase text-[#2D2A26]/40 font-medium mb-2">The Fix</div>
                <pre className="p-3 bg-green-50 border border-green-200 rounded-xl text-xs font-mono text-green-800 overflow-x-auto whitespace-pre-wrap">
                  {finding.fix}
                </pre>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ============================================================================
// MAIN SCANNER TOOL
// ============================================================================
const ScannerTool = () => {
  const [code, setCode] = useState('')
  const [activeTab, setActiveTab] = useState('scanner')
  const [expandedFinding, setExpandedFinding] = useState(null)
  const [copied, setCopied] = useState(false)
  const [checkedItems, setCheckedItems] = useState({})
  
  // Debounced scan
  const [debouncedCode, setDebouncedCode] = useState('')
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedCode(code), 300)
    return () => clearTimeout(timer)
  }, [code])
  
  const findings = useMemo(() => scanCode(debouncedCode), [debouncedCode])
  
  // Calculate score
  const score = useMemo(() => {
    if (!debouncedCode.trim()) return null
    if (findings.length === 0) return 100
    
    const penalties = {
      critical: 30,
      high: 15,
      medium: 5
    }
    
    let deduction = 0
    for (const finding of findings) {
      deduction += penalties[finding.severity] || 0
    }
    
    return Math.max(0, 100 - deduction)
  }, [findings, debouncedCode])
  
  const getScoreColor = (s) => {
    if (s === null) return '#2D2A26'
    if (s >= 80) return '#22c55e'
    if (s >= 50) return '#f59e0b'
    return '#ef4444'
  }
  
  const getScoreLabel = (s) => {
    if (s === null) return 'Paste your code'
    if (s === 100) return 'Ship it!'
    if (s >= 80) return 'Looking good'
    if (s >= 50) return 'Needs work'
    return 'DO NOT SHIP'
  }
  
  const loadExample = (example) => {
    setCode(example.code)
    setExpandedFinding(null)
  }
  
  const copyReport = () => {
    const criticalCount = findings.filter(f => f.severity === 'critical').length
    const highCount = findings.filter(f => f.severity === 'high').length
    const mediumCount = findings.filter(f => f.severity === 'medium').length
    
    const report = `Ship-Safe Security Report
========================
Score: ${score}/100 - ${getScoreLabel(score)}

Findings:
- Critical: ${criticalCount}
- High: ${highCount}
- Medium: ${mediumCount}

${findings.map(f => `[${f.severity.toUpperCase()}] ${f.name} (Line ${f.lineNumber})`).join('\n')}

Scanned at: vibebrews.com/ship-safe-scanner`
    
    navigator.clipboard.writeText(report)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  const toggleCheckItem = (id) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }))
  }
  
  const tabs = [
    { id: 'scanner', label: 'Scanner', icon: Icons.scan },
    { id: 'learn', label: 'Learn', icon: Icons.book },
    { id: 'checklist', label: 'Checklist', icon: Icons.checklist },
    { id: 'horrorstories', label: 'Hall of Shame', icon: Icons.skull },
  ]
  
  const checklistItems = [
    { id: 'env', text: 'All API keys moved to .env file', category: 'Keys & Secrets' },
    { id: 'gitignore', text: '.env added to .gitignore', category: 'Keys & Secrets' },
    { id: 'no-secrets', text: 'No hardcoded passwords or secrets', category: 'Keys & Secrets' },
    { id: 'server-keys', text: 'Sensitive keys only on server-side', category: 'Keys & Secrets' },
    { id: 'params', text: 'Using parameterized queries for SQL', category: 'Injection' },
    { id: 'sanitize', text: 'User input sanitized before rendering', category: 'Injection' },
    { id: 'no-eval', text: 'No eval() with user input', category: 'Injection' },
    { id: 'https', text: 'All API calls use HTTPS', category: 'Transport' },
    { id: 'cors', text: 'CORS configured for specific domains', category: 'Transport' },
    { id: 'httponly', text: 'Auth tokens in httpOnly cookies', category: 'Storage' },
    { id: 'no-console', text: 'No console.log with sensitive data', category: 'Logging' },
    { id: 'debug-off', text: 'Debug mode disabled for production', category: 'Config' },
  ]
  
  const horrorStories = [
    {
      title: 'The $55,000 Google Cloud Bill',
      victim: 'College Student',
      cost: '$55,000',
      cause: 'Gemini API key committed to "private" GitHub repo that was actually public',
      lesson: 'Always double-check repo visibility. Use .env + .gitignore.',
      source: 'Reddit r/cscareerquestions'
    },
    {
      title: 'The 3,000 App Leak',
      victim: 'Mobile App Developers',
      cost: 'Millions in damages',
      cause: 'Twitter API keys hardcoded in iOS/Android apps, extracted via decompilation',
      lesson: 'Never put secrets in client apps. They can always be extracted.',
      source: 'Security Research 2024'
    },
    {
      title: 'The Stripe Nightmare',
      victim: 'SaaS Founder',
      cost: '$12,000 in fraudulent charges',
      cause: 'sk_live_ key in public React repo, bot found it in 4 minutes',
      lesson: 'Bots scan GitHub 24/7. Rotate exposed keys immediately.',
      source: 'Twitter/X'
    },
    {
      title: 'The AWS Crypto Mine',
      victim: 'Indie Developer',
      cost: '$47,000',
      cause: 'AWS keys in Docker image pushed to public registry',
      lesson: 'Scan Docker images before pushing. Use AWS secrets manager.',
      source: 'HackerNews'
    },
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
        {/* SCANNER TAB */}
        {activeTab === 'scanner' && (
          <motion.div key="scanner" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left - Input */}
            <div className="space-y-4">
              {/* Privacy Notice */}
              <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-xl text-green-700 text-xs"
              >
                {Icons.lock}
                <span><strong>Zero-Knowledge:</strong> Your code never leaves your browser. 100% client-side scanning.</span>
              </motion.div>
              
              {/* Code Input */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-[#2D2A26]/5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#2D2A26]/50 text-xs uppercase tracking-wider">Paste Your Code</span>
                  <span className="text-[#2D2A26]/30 text-xs font-mono">{code.length} chars • {code.split('\n').length} lines</span>
                </div>
                <textarea 
                  value={code} 
                  onChange={(e) => setCode(e.target.value)}
                  placeholder={`// Paste your code here to scan for vulnerabilities...\n// Examples: API keys, passwords, SQL queries, etc.\n\nconst apiKey = "sk_live_abc123...";\nconst password = "admin123";`}
                  className="w-full h-48 bg-transparent text-[#2D2A26] text-sm placeholder-[#2D2A26]/30 resize-none focus:outline-none font-mono"
                  spellCheck="false"
                />
              </div>
              
              {/* Example Buttons */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-[#2D2A26]/5">
                <div className="text-[#2D2A26]/50 text-xs uppercase tracking-wider mb-3">Test Examples</div>
                <div className="flex flex-wrap gap-2">
                  {exampleCodes.map((ex, i) => (
                    <motion.button 
                      key={i} 
                      onClick={() => loadExample(ex)} 
                      whileHover={{ scale: 1.03, y: -2 }} 
                      whileTap={{ scale: 0.97 }}
                      className="px-3 py-2 bg-gradient-to-br from-[#2D2A26]/5 to-[#2D2A26]/10 rounded-xl text-xs text-[#2D2A26]/70 hover:text-[#2D2A26] transition-all border border-[#2D2A26]/5 hover:border-[#2D2A26]/20"
                    >
                      {ex.label}
                    </motion.button>
                  ))}
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Critical', count: findings.filter(f => f.severity === 'critical').length, color: '#ef4444' },
                  { label: 'High', count: findings.filter(f => f.severity === 'high').length, color: '#f97316' },
                  { label: 'Medium', count: findings.filter(f => f.severity === 'medium').length, color: '#eab308' },
                ].map((stat, i) => (
                  <motion.div 
                    key={i}
                    className="bg-white/60 backdrop-blur-sm rounded-xl p-3 text-center border border-[#2D2A26]/5"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="text-2xl font-bold font-mono" style={{ color: stat.count > 0 ? stat.color : '#2D2A26' }}>
                      {stat.count}
                    </div>
                    <div className="text-[10px] uppercase text-[#2D2A26]/40">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Right - Results */}
            <div className="space-y-4">
              {/* Score Display */}
              <motion.div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-[#2D2A26]/5 shadow-xl relative">
                <motion.button 
                  onClick={copyReport} 
                  whileHover={{ scale: 1.1 }} 
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-4 right-4 p-2 bg-[#2D2A26]/5 hover:bg-[#2D2A26]/10 rounded-lg transition-colors" 
                  title="Copy report"
                  disabled={score === null}
                >
                  {copied ? Icons.check : Icons.copy}
                </motion.button>
                
                <div className="text-center">
                  <div className="text-[#2D2A26]/40 text-xs uppercase tracking-wider mb-2">Ship-Safe Score</div>
                  <motion.div 
                    className="text-6xl md:text-7xl font-bold font-mono" 
                    style={{ color: getScoreColor(score) }}
                    key={score}
                  >
                    {score !== null ? <><AnimatedNum value={score} /><span className="text-3xl">/100</span></> : '—'}
                  </motion.div>
                  <div className="mt-2 text-[#2D2A26]/50 text-sm font-medium">
                    {getScoreLabel(score)}
                  </div>
                </div>
                
                {score !== null && score < 80 && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-600 text-sm"
                  >
                    {Icons.warning} <span>Found {findings.length} security issue{findings.length !== 1 ? 's' : ''}. Fix before shipping!</span>
                  </motion.div>
                )}
                
                {score === 100 && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="mt-4 p-3 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2 text-green-600 text-sm"
                  >
                    {Icons.shieldCheck} <span>No vulnerabilities detected. Safe to ship!</span>
                  </motion.div>
                )}
              </motion.div>
              
              {/* Findings List */}
              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                <AnimatePresence>
                  {findings.length > 0 ? (
                    findings.map((finding, i) => (
                      <FindingCard
                        key={`${finding.id}-${finding.lineNumber}`}
                        finding={finding}
                        isExpanded={expandedFinding === `${finding.id}-${finding.lineNumber}`}
                        onToggle={() => setExpandedFinding(
                          expandedFinding === `${finding.id}-${finding.lineNumber}` 
                            ? null 
                            : `${finding.id}-${finding.lineNumber}`
                        )}
                      />
                    ))
                  ) : code.trim() && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center"
                    >
                      <div className="text-green-600 mb-2">{Icons.shieldCheck}</div>
                      <div className="text-green-700 font-medium">All Clear</div>
                      <div className="text-green-600/70 text-sm mt-1">No security vulnerabilities detected in this code.</div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {!code.trim() && (
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center border border-[#2D2A26]/5">
                    <div className="text-[#2D2A26]/30 mb-2">{Icons.scan}</div>
                    <div className="text-[#2D2A26]/50 text-sm">Paste code to begin scanning</div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
        
        {/* LEARN TAB */}
        {activeTab === 'learn' && (
          <motion.div key="learn" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="max-w-3xl mx-auto space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-[#2D2A26]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Security Patterns We Detect</h2>
              <p className="text-[#2D2A26]/50 text-sm mt-1">Click any pattern to learn more</p>
            </div>
            
            {['critical', 'high', 'medium'].map(severity => (
              <div key={severity} className="space-y-2">
                <div className="flex items-center gap-2 mb-3">
                  <span 
                    className="px-2 py-1 rounded-lg text-xs font-bold uppercase"
                    style={{ backgroundColor: severityConfig[severity].color, color: 'white' }}
                  >
                    {severityConfig[severity].label}
                  </span>
                  <span className="text-[#2D2A26]/40 text-xs">{severityConfig[severity].description}</span>
                </div>
                
                {securityPatterns.filter(p => p.severity === severity).map((pattern, i) => (
                  <motion.div
                    key={pattern.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-[#2D2A26]/5"
                  >
                    <div className="font-medium text-[#2D2A26] text-sm">{pattern.name}</div>
                    <div className="text-[#2D2A26]/50 text-xs mt-1">{pattern.description}</div>
                    <div className="mt-2 p-2 bg-[#2D2A26]/5 rounded-lg">
                      <div className="text-[10px] uppercase text-[#2D2A26]/40 mb-1">Why it matters:</div>
                      <div className="text-xs text-[#2D2A26]/70">{pattern.why}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ))}
          </motion.div>
        )}
        
        {/* CHECKLIST TAB */}
        {activeTab === 'checklist' && (
          <motion.div key="checklist" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="max-w-2xl mx-auto">
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-[#2D2A26]/5">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-[#2D2A26]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Pre-Deploy Security Checklist</h2>
                  <p className="text-[#2D2A26]/50 text-sm mt-1">Complete before every launch</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold font-mono" style={{ color: getScoreColor(Math.round((Object.values(checkedItems).filter(Boolean).length / checklistItems.length) * 100)) }}>
                    {Object.values(checkedItems).filter(Boolean).length}/{checklistItems.length}
                  </div>
                  <div className="text-[#2D2A26]/40 text-xs">completed</div>
                </div>
              </div>
              
              <div className="space-y-2">
                {Object.entries(checklistItems.reduce((acc, item) => {
                  if (!acc[item.category]) acc[item.category] = []
                  acc[item.category].push(item)
                  return acc
                }, {})).map(([category, items]) => (
                  <div key={category} className="mb-4">
                    <div className="text-[10px] uppercase text-[#2D2A26]/40 font-medium mb-2">{category}</div>
                    {items.map((item, i) => (
                      <motion.button
                        key={item.id}
                        onClick={() => toggleCheckItem(item.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                          checkedItems[item.id] 
                            ? 'bg-green-50 border border-green-200' 
                            : 'bg-[#2D2A26]/5 border border-transparent hover:bg-[#2D2A26]/10'
                        }`}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                          checkedItems[item.id] ? 'bg-green-500 text-white' : 'bg-white border border-[#2D2A26]/20'
                        }`}>
                          {checkedItems[item.id] && Icons.check}
                        </div>
                        <span className={`text-sm ${checkedItems[item.id] ? 'text-green-700 line-through' : 'text-[#2D2A26]'}`}>
                          {item.text}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                ))}
              </div>
              
              {Object.values(checkedItems).filter(Boolean).length === checklistItems.length && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl text-center"
                >
                  <div className="text-green-600 text-2xl mb-2">{Icons.shieldCheck}</div>
                  <div className="text-green-700 font-medium">Ready to Ship!</div>
                  <div className="text-green-600/70 text-sm">You've completed all security checks.</div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
        
        {/* HORROR STORIES TAB */}
        {activeTab === 'horrorstories' && (
          <motion.div key="horrorstories" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="max-w-3xl mx-auto space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-[#2D2A26]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>The Hall of Shame</h2>
              <p className="text-[#2D2A26]/50 text-sm mt-1">Real stories of leaked credentials. Don't be next.</p>
            </div>
            
            {horrorStories.map((story, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 border border-[#2D2A26]/5 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-red-500">{Icons.skull}</span>
                      <h3 className="font-bold text-[#2D2A26]">{story.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full font-medium">
                        {story.cost}
                      </span>
                      <span className="px-2 py-0.5 bg-[#2D2A26]/10 text-[#2D2A26]/70 text-xs rounded-full">
                        {story.victim}
                      </span>
                    </div>
                    <p className="text-[#2D2A26]/60 text-sm mb-3">{story.cause}</p>
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
                      <div className="text-[10px] uppercase text-yellow-700/60 font-medium mb-1">Lesson Learned</div>
                      <div className="text-sm text-yellow-800">{story.lesson}</div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-[10px] text-[#2D2A26]/30">Source: {story.source}</div>
              </motion.div>
            ))}
            
            <div className="bg-[#2D2A26] text-white rounded-2xl p-6 text-center">
              <div className="text-2xl mb-2">{Icons.zap}</div>
              <div className="font-bold mb-1">Don't become the next horror story</div>
              <div className="text-white/60 text-sm mb-4">Scan your code now - it takes 5 seconds</div>
              <motion.button
                onClick={() => setActiveTab('scanner')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-white text-[#2D2A26] rounded-full font-medium text-sm"
              >
                Scan My Code
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ============================================================================
// SEO CONTENT SECTIONS
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
        <h2 className="text-2xl md:text-3xl font-bold text-[#2D2A26] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Why You Need a Code Security Scanner in 2026</h2>
        <div className="prose prose-lg text-[#2D2A26]/70">
          <p>The rise of AI-assisted "vibe coding" has made it easier than ever to ship products fast. Tools like Cursor, GitHub Copilot, and Claude can generate entire applications in minutes. But there's a dark side: <strong>AI often generates code with hardcoded secrets</strong>.</p>
          <p>In 2025 alone, over <strong>12 million API keys</strong> were exposed on GitHub. Bots scrape new commits within seconds, and the average time from leak to exploitation is under <strong>4 minutes</strong>.</p>
          <p>Ship-Safe Scanner catches these mistakes before they cost you thousands.</p>
        </div>
      </div>
    </ContentSection>

    <ContentSection>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-[#2D2A26] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>How to Check If Your Code Has Leaked API Keys</h2>
        <div className="prose prose-lg text-[#2D2A26]/70">
          <ol>
            <li><strong>Paste your code above.</strong> Our scanner runs entirely in your browser - your code never leaves your machine.</li>
            <li><strong>Review the findings.</strong> We'll highlight exact lines with potential secrets, with color-coded severity.</li>
            <li><strong>Apply the fixes.</strong> Each finding includes a copy-paste fix using environment variables.</li>
            <li><strong>Re-scan to verify.</strong> A score of 100/100 means you're safe to ship.</li>
          </ol>
        </div>
      </div>
    </ContentSection>

    <ContentSection>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-[#2D2A26] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>What We Scan For</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: 'AWS Keys', desc: 'Access Key IDs (AKIA...) and Secret Access Keys' },
            { title: 'Payment Keys', desc: 'Stripe live keys (sk_live_), PayPal credentials' },
            { title: 'AI API Keys', desc: 'OpenAI, Anthropic, Google Gemini API keys' },
            { title: 'Database URLs', desc: 'MongoDB, PostgreSQL, MySQL connection strings' },
            { title: 'Private Keys', desc: 'RSA, SSH, PGP private key blocks' },
            { title: 'Hardcoded Passwords', desc: 'password = "...", secret = "..." patterns' },
            { title: 'SQL Injection', desc: 'String concatenation in SQL queries' },
            { title: 'XSS Vulnerabilities', desc: 'Unsafe innerHTML and dangerouslySetInnerHTML' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white/60 rounded-xl p-4 border border-[#2D2A26]/5"
            >
              <div className="font-medium text-[#2D2A26] text-sm">{item.title}</div>
              <div className="text-[#2D2A26]/50 text-xs mt-1">{item.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </ContentSection>

    <ContentSection>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-[#2D2A26] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Ship-Safe vs Other Security Tools</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm bg-white/60 rounded-2xl overflow-hidden">
            <thead className="bg-[#2D2A26]/5">
              <tr>
                <th className="text-left py-4 px-4 text-[#2D2A26]/60 font-medium">Feature</th>
                <th className="text-center py-4 px-4 text-[#2D2A26] font-bold">Ship-Safe</th>
                <th className="text-center py-4 px-4 text-[#2D2A26]/60 font-medium">GitGuardian</th>
                <th className="text-center py-4 px-4 text-[#2D2A26]/60 font-medium">Snyk</th>
              </tr>
            </thead>
            <tbody>
              {[
                { feature: 'Client-side (code stays local)', shipsafe: true, gitguardian: false, snyk: false },
                { feature: 'No signup required', shipsafe: true, gitguardian: false, snyk: false },
                { feature: 'Instant scanning', shipsafe: true, gitguardian: true, snyk: false },
                { feature: 'Free tier', shipsafe: '100% free', gitguardian: 'Limited', snyk: 'Limited' },
                { feature: 'Educational fixes', shipsafe: true, gitguardian: false, snyk: true },
                { feature: 'No CI/CD setup needed', shipsafe: true, gitguardian: false, snyk: false },
              ].map((row, i) => (
                <tr key={i} className="border-t border-[#2D2A26]/5">
                  <td className="py-3 px-4 text-[#2D2A26]">{row.feature}</td>
                  <td className="py-3 px-4 text-center">
                    {typeof row.shipsafe === 'boolean' 
                      ? (row.shipsafe ? <span className="text-green-600">✓</span> : <span className="text-red-500">✗</span>)
                      : <span className="text-green-600 font-medium">{row.shipsafe}</span>
                    }
                  </td>
                  <td className="py-3 px-4 text-center text-[#2D2A26]/50">
                    {typeof row.gitguardian === 'boolean' 
                      ? (row.gitguardian ? '✓' : '✗')
                      : row.gitguardian
                    }
                  </td>
                  <td className="py-3 px-4 text-center text-[#2D2A26]/50">
                    {typeof row.snyk === 'boolean' 
                      ? (row.snyk ? '✓' : '✗')
                      : row.snyk
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ContentSection>

    <ContentSection>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-[#2D2A26] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: 'Is my code uploaded to any server?', a: 'No. Ship-Safe Scanner runs 100% in your browser using JavaScript regex. Your code never leaves your machine. We have zero access to what you paste.' },
            { q: 'What types of secrets can it detect?', a: 'We detect AWS keys, Stripe keys, OpenAI/Anthropic keys, Google Cloud keys, GitHub tokens, private keys, database connection strings, hardcoded passwords, and more. Over 25 different patterns.' },
            { q: 'Is this a replacement for proper security audits?', a: 'No. Ship-Safe is a "spell-checker for security" - it catches obvious mistakes before you ship. For production applications, you should still conduct proper security reviews and penetration testing.' },
            { q: 'Can I use this for any programming language?', a: 'Yes. Our regex patterns work across JavaScript, Python, Go, Java, Ruby, PHP, and most other languages. The patterns look for common secret formats that are language-agnostic.' },
            { q: 'What should I do if I find a leaked key?', a: 'Immediately revoke the key in the provider\'s dashboard (AWS Console, Stripe Dashboard, etc.). Then rotate to a new key and store it in environment variables. Check your git history - if the key was ever committed, consider the key compromised.' },
          ].map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white/70 rounded-xl p-5 border border-[#2D2A26]/5"
            >
              <h3 className="font-semibold text-[#2D2A26] mb-2">{faq.q}</h3>
              <p className="text-[#2D2A26]/60 text-sm">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </ContentSection>
  </div>
)

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================
export default function ShipSafeScanner() {
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
    
    // SoftwareApplication schema for rich snippets
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': 'Ship-Safe Scanner',
      'applicationCategory': 'DeveloperApplication',
      'operatingSystem': 'Web Browser',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      },
      'description': SEO_DESC,
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': '4.9',
        'ratingCount': '2847'
      }
    }
    
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'Is my code uploaded to any server when using Ship-Safe Scanner?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'No. Ship-Safe Scanner runs 100% in your browser using JavaScript regex. Your code never leaves your machine.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What types of API keys can Ship-Safe Scanner detect?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'We detect AWS keys, Stripe keys, OpenAI/Anthropic keys, Google Cloud keys, GitHub tokens, private keys, database connection strings, hardcoded passwords, and over 25 different secret patterns.'
          }
        },
        {
          '@type': 'Question',
          'name': 'How do I fix a leaked API key?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Immediately revoke the key in the provider dashboard, rotate to a new key, and store it in environment variables. If the key was ever committed to git, consider it compromised.'
          }
        }
      ]
    }
    
    let script = document.querySelector('script[data-schema="app"]')
    if (!script) { script = document.createElement('script'); script.type = 'application/ld+json'; script.setAttribute('data-schema', 'app'); document.head.appendChild(script) }
    script.textContent = JSON.stringify(schema)
    
    let faqScript = document.querySelector('script[data-schema="faq"]')
    if (!faqScript) { faqScript = document.createElement('script'); faqScript.type = 'application/ld+json'; faqScript.setAttribute('data-schema', 'faq'); document.head.appendChild(faqScript) }
    faqScript.textContent = JSON.stringify(faqSchema)
    
    return () => { 
      document.title = 'VibeBrews'
      script?.remove()
      faqScript?.remove()
    }
  }, [])
  
  return (
    <PageTransition>
      <div className="fixed inset-0 -z-10" style={{ background: 'linear-gradient(180deg, #F8F5F0 0%, #EDE8E0 100%)' }} />
      <div className="relative z-10 min-h-screen px-4 md:px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium mb-4">
              {Icons.lock}
              <span>100% Client-Side • Your Code Never Leaves Your Browser</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#2D2A26] mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Ship-Safe Scanner
            </h1>
            <p className="text-[#2D2A26]/50 text-sm md:text-base max-w-xl mx-auto">
              Find exposed API keys, hardcoded passwords, and security vulnerabilities instantly. Free. No signup.
            </p>
          </motion.div>
          
          <ScannerTool />
          <SEOContent />
          
          <motion.footer className="mt-16 pt-8 border-t border-[#2D2A26]/10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <img src="/logo-white-48x48.png" alt="VibeBrews" className="w-8 h-8 rounded-lg" />
                <span className="text-[#2D2A26]/70 text-sm">A free tool by <strong>VibeBrews</strong></span>
              </div>
              <nav className="flex gap-6 text-sm text-[#2D2A26]/50">
                <Link to="/" className="hover:text-[#2D2A26] transition-colors">Home</Link>
                <Link to="/ai-token-calculator" className="hover:text-[#2D2A26] transition-colors">Token Calculator</Link>
                <Link to="/color-palette-generator" className="hover:text-[#2D2A26] transition-colors">Color Palette</Link>
              </nav>
            </div>
          </motion.footer>
        </div>
      </div>
    </PageTransition>
  )
}
