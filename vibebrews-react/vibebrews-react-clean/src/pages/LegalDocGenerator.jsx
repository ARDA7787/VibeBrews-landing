import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import { Link } from 'react-router-dom'

// SEO - Target high-intent pre-launch keywords
const SEO_TITLE = 'Free Privacy Policy Generator 2026 | GDPR & App Store Compliant Templates'
const SEO_DESC = 'Generate custom privacy policies, terms of service, and legal docs in 2 minutes. Free, GDPR-compliant templates for apps, websites, and SaaS. No lawyer required. Export as PDF, Markdown, or HTML.'
const SEO_KEYWORDS = 'free privacy policy generator, terms of service generator, gdpr privacy policy template, app store privacy policy, cookie policy generator free, privacy policy for mobile app, do i need a privacy policy, coppa compliance template, simple terms and conditions, legal documents for app'

// ============================================================================
// CUSTOM SVG ICONS - Legal/Document themed
// ============================================================================
const Icons = {
  shield: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
  document: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><line x1="10" y1="9" x2="8" y2="9" /></svg>,
  cookie: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="10" /><circle cx="7.5" cy="9.5" r="1.5" fill="currentColor" /><circle cx="16" cy="10" r="1.5" fill="currentColor" /><circle cx="10" cy="15" r="1.5" fill="currentColor" /><circle cx="15" cy="15.5" r="1.5" fill="currentColor" /></svg>,
  warning: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>,
  check: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><polyline points="20 6 9 17 4 12" /></svg>,
  copy: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>,
  download: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>,
  globe: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>,
  users: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>,
  database: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>,
  services: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>,
  children: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" /><circle cx="12" cy="10" r="3" /><circle cx="12" cy="10" r="10" /></svg>,
  email: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
  location: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>,
  payment: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>,
  analytics: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>,
  eye: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>,
  edit: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>,
  sparkle: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" /><circle cx="12" cy="12" r="3" /></svg>,
  info: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>,
  markdown: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M7 15V9l2 2 2-2v6" /><path d="M17 12l-2-2v5" /></svg>,
  html: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
}

// ============================================================================
// DOCUMENT TYPES
// ============================================================================
const documentTypes = [
  { id: 'privacy', name: 'Privacy Policy', icon: Icons.shield, color: '#3b82f6', desc: 'Required for apps collecting user data' },
  { id: 'terms', name: 'Terms of Service', icon: Icons.document, color: '#8b5cf6', desc: 'Rules for using your app/service' },
  { id: 'cookie', name: 'Cookie Policy', icon: Icons.cookie, color: '#f59e0b', desc: 'For websites using cookies/tracking' },
  { id: 'disclaimer', name: 'Disclaimer', icon: Icons.warning, color: '#ef4444', desc: 'Limit liability for content/advice' },
]

// ============================================================================
// JURISDICTIONS
// ============================================================================
const jurisdictions = [
  { id: 'us', name: 'United States', laws: ['CCPA', 'COPPA'], flag: '🇺🇸' },
  { id: 'eu', name: 'European Union', laws: ['GDPR'], flag: '🇪🇺' },
  { id: 'uk', name: 'United Kingdom', laws: ['UK GDPR', 'DPA'], flag: '🇬🇧' },
  { id: 'ca', name: 'Canada', laws: ['PIPEDA'], flag: '🇨🇦' },
  { id: 'au', name: 'Australia', laws: ['Privacy Act'], flag: '🇦🇺' },
  { id: 'global', name: 'Global (All)', laws: ['GDPR', 'CCPA', 'COPPA'], flag: '🌍' },
]

// ============================================================================
// DATA COLLECTION TYPES
// ============================================================================
const dataTypes = [
  { id: 'email', name: 'Email Address', icon: Icons.email, category: 'personal' },
  { id: 'name', name: 'Name', icon: Icons.users, category: 'personal' },
  { id: 'location', name: 'Location Data', icon: Icons.location, category: 'sensitive' },
  { id: 'payment', name: 'Payment Info', icon: Icons.payment, category: 'sensitive' },
  { id: 'analytics', name: 'Analytics/Usage', icon: Icons.analytics, category: 'technical' },
  { id: 'device', name: 'Device Info', icon: Icons.database, category: 'technical' },
]

// ============================================================================
// THIRD-PARTY SERVICES
// ============================================================================
const services = [
  { id: 'google-analytics', name: 'Google Analytics', category: 'Analytics' },
  { id: 'firebase', name: 'Firebase', category: 'Backend' },
  { id: 'stripe', name: 'Stripe', category: 'Payment' },
  { id: 'supabase', name: 'Supabase', category: 'Backend' },
  { id: 'vercel', name: 'Vercel Analytics', category: 'Analytics' },
  { id: 'sentry', name: 'Sentry', category: 'Monitoring' },
  { id: 'mailchimp', name: 'Mailchimp', category: 'Email' },
  { id: 'cloudflare', name: 'Cloudflare', category: 'CDN' },
]

// ============================================================================
// DOCUMENT GENERATOR LOGIC
// ============================================================================
const generateDocument = (config) => {
  const { docType, appName, jurisdiction, dataCollected, services: selectedServices, hasMinors, companyName, contactEmail, website } = config
  
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  const jurisdictionObj = jurisdictions.find(j => j.id === jurisdiction)
  const hasGDPR = jurisdictionObj?.laws.includes('GDPR') || jurisdictionObj?.laws.includes('UK GDPR')
  const hasCCPA = jurisdictionObj?.laws.includes('CCPA')
  const hasCOPPA = jurisdictionObj?.laws.includes('COPPA')
  
  if (docType === 'privacy') {
    return `# Privacy Policy for ${appName || '[Your App Name]'}

**Last Updated:** ${today}

**Effective Date:** ${today}

${companyName ? `**Company:** ${companyName}` : ''}
${contactEmail ? `**Contact:** ${contactEmail}` : ''}
${website ? `**Website:** ${website}` : ''}

---

## 1. Introduction

Welcome to ${appName || '[Your App Name]'}. We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and protect your information when you use our ${website ? 'website' : 'app/service'}.

${hasGDPR ? `\n**GDPR Compliance:** This policy complies with the General Data Protection Regulation (GDPR) applicable in the European Union.\n` : ''}
${hasCCPA ? `\n**CCPA Compliance:** California residents have specific rights under the California Consumer Privacy Act (CCPA).\n` : ''}
${hasCOPPA && hasMinors ? `\n**COPPA Compliance:** We comply with the Children's Online Privacy Protection Act (COPPA). We do not knowingly collect information from children under 13 without parental consent.\n` : ''}

---

## 2. Information We Collect

We collect the following types of information:

${dataCollected.length > 0 ? dataCollected.map(dt => {
  const dataType = dataTypes.find(d => d.id === dt)
  return `- **${dataType?.name}**: Used for ${dt === 'email' ? 'account creation and communication' : dt === 'name' ? 'personalization' : dt === 'location' ? 'location-based features' : dt === 'payment' ? 'processing payments' : dt === 'analytics' ? 'improving our service' : 'technical purposes'}.`
}).join('\n') : '- No personal data is collected directly by our service.'}

${hasGDPR ? `\n### Legal Basis for Processing (GDPR)\nWe process your data based on:\n- **Consent**: You have given explicit consent for processing\n- **Contract**: Processing is necessary to provide our service\n- **Legitimate Interest**: For improving our service and security\n` : ''}

---

## 3. How We Use Your Information

We use your information to:

- Provide and maintain our service
- Improve user experience
- Send important updates and notifications
- Respond to support requests
${dataCollected.includes('analytics') ? '- Analyze usage patterns to improve our service' : ''}
${dataCollected.includes('payment') ? '- Process payments and prevent fraud' : ''}
${hasMinors ? '\n- Ensure compliance with child safety regulations' : ''}

---

## 4. Third-Party Services

${selectedServices.length > 0 ? `We use the following third-party services that may collect data:\n\n${selectedServices.map(s => {
  const service = services.find(srv => srv.id === s)
  return `### ${service?.name} (${service?.category})\n${service?.name === 'Google Analytics' ? 'We use Google Analytics to understand how users interact with our service. Google may collect device info, usage data, and cookies.' : service?.name === 'Stripe' ? 'Payment processing is handled by Stripe. We do not store your full credit card information.' : service?.name === 'Firebase' ? 'We use Firebase for backend services including authentication and database.' : `We use ${service?.name} for ${service?.category.toLowerCase()} purposes.`}\n`
}).join('\n')}

**Third-Party Privacy Policies:** Each service has its own privacy policy. We recommend reviewing them.
` : 'We do not use any third-party services that collect your data.'}

---

## 5. Data Storage and Security

- **Storage Location:** ${jurisdiction === 'us' ? 'United States' : jurisdiction === 'eu' ? 'European Union' : 'Secure cloud servers'}
- **Security Measures:** We use industry-standard encryption and security practices
- **Data Retention:** We retain your data only as long as necessary to provide our service${hasGDPR ? ' or as required by law' : ''}

${hasGDPR ? `\n### Data Transfers (GDPR)\nIf we transfer data outside the EU, we ensure appropriate safeguards are in place (e.g., Standard Contractual Clauses).\n` : ''}

---

## 6. Your Rights

${hasGDPR ? `### Under GDPR, you have the right to:
- **Access**: Request a copy of your data
- **Rectification**: Correct inaccurate data
- **Erasure**: Request deletion of your data ("right to be forgotten")
- **Portability**: Receive your data in a machine-readable format
- **Object**: Object to processing of your data
- **Withdraw Consent**: Withdraw consent at any time

To exercise these rights, contact us at ${contactEmail || '[your-email@example.com]'}.
` : ''}

${hasCCPA ? `### Under CCPA (California Residents), you have the right to:
- Know what personal information we collect
- Know if we sell your personal information (we do not)
- Request deletion of your information
- Opt-out of the sale of personal information
- Non-discrimination for exercising your rights

To exercise these rights, email ${contactEmail || '[your-email@example.com]'}.
` : ''}

${!hasGDPR && !hasCCPA ? `You have the right to:
- Access your personal data
- Request correction of inaccurate data
- Request deletion of your data
- Opt-out of marketing communications

Contact us at ${contactEmail || '[your-email@example.com]'} to exercise these rights.
` : ''}

---

## 7. Cookies ${dataCollected.includes('analytics') ? 'and Tracking' : ''}

${dataCollected.includes('analytics') ? `We use cookies and similar tracking technologies to:
- Remember your preferences
- Analyze site traffic and usage
- Improve our service

You can control cookies through your browser settings.` : 'We use minimal cookies necessary for our service to function. No tracking cookies are used.'}

---

## 8. Children's Privacy

${hasMinors ? `We take special care to protect children's privacy. If you are under ${hasCOPPA ? '13' : '16'}, you must have parental consent to use our service.

${hasCOPPA ? 'Parents can review, delete, or refuse further collection of their child\'s information by contacting us.' : ''}

If we discover we have collected data from a child without proper consent, we will delete it immediately.` : `Our service is not intended for children under ${hasCOPPA ? '13' : '16'}. We do not knowingly collect data from children.`}

---

## 9. Changes to This Policy

We may update this privacy policy from time to time. We will notify you of significant changes by:
- Posting the new policy on this page
- Updating the "Last Updated" date
${contactEmail ? '- Sending you an email notification (if you have an account)' : ''}

---

## 10. Contact Us

If you have questions about this privacy policy, please contact us:

${contactEmail ? `**Email:** ${contactEmail}` : '**Email:** [your-email@example.com]'}
${website ? `**Website:** ${website}` : ''}
${companyName ? `**Company:** ${companyName}` : ''}

---

## Disclaimer

**This is a template generated by VibeBrews.com. It is not legal advice.** For complex situations, especially if you handle sensitive data or operate in multiple jurisdictions, consult a qualified attorney to ensure full compliance with all applicable laws.
`
  }
  
  if (docType === 'terms') {
    return `# Terms of Service for ${appName || '[Your App Name]'}

**Last Updated:** ${today}

**Effective Date:** ${today}

---

## 1. Acceptance of Terms

By accessing or using ${appName || '[Your App Name]'} ("the Service"), you agree to be bound by these Terms of Service. If you do not agree, do not use the Service.

---

## 2. Use of Service

### Eligibility
You must be at least ${hasMinors ? '13' : '18'} years old to use this Service${hasMinors ? ' (or have parental consent if under 18)' : ''}.

### Acceptable Use
You agree to:
- Use the Service only for lawful purposes
- Not violate any applicable laws or regulations
- Not impersonate others or provide false information
- Not interfere with the Service's operation

### Prohibited Activities
You may not:
- Reverse engineer or attempt to extract source code
- Use automated tools to access the Service without permission
- Upload malicious code or viruses
- Harass, abuse, or harm other users

---

## 3. User Accounts

${dataCollected.includes('email') || dataCollected.includes('name') ? `You are responsible for:
- Maintaining the confidentiality of your account credentials
- All activities that occur under your account
- Notifying us immediately of any unauthorized access

We reserve the right to suspend or terminate accounts that violate these Terms.` : 'No account registration is required to use this Service.'}

---

## 4. Intellectual Property

### Our Rights
All content, features, and functionality of the Service are owned by ${companyName || '[Your Company]'} and are protected by copyright, trademark, and other intellectual property laws.

### Your Rights
${dataCollected.includes('name') || dataCollected.includes('email') ? `You retain ownership of any content you submit to the Service. By submitting content, you grant us a license to use, store, and display it as necessary to provide the Service.` : 'You retain all rights to your data and content.'}

---

## 5. Payment Terms

${dataCollected.includes('payment') ? `### Pricing
Pricing for our Service is as stated on our website. We reserve the right to change prices with notice.

### Billing
- Payments are processed through ${selectedServices.includes('stripe') ? 'Stripe' : 'our payment processor'}
- Subscriptions renew automatically unless cancelled
- Refunds are provided as stated in our refund policy

### Cancellation
You may cancel your subscription at any time. No refunds for partial periods.` : 'This Service is currently free to use. We reserve the right to introduce paid features in the future with notice.'}

---

## 6. Disclaimers

### "As Is" Basis
The Service is provided "as is" without warranties of any kind, either express or implied.

### No Guarantee
We do not guarantee that:
- The Service will be uninterrupted or error-free
- Defects will be corrected
- The Service is free of viruses or harmful components

---

## 7. Limitation of Liability

To the maximum extent permitted by law:
- We are not liable for indirect, incidental, or consequential damages
- Our total liability shall not exceed the amount you paid us (if any) in the past 12 months
- This applies even if we have been advised of the possibility of such damages

---

## 8. Indemnification

You agree to indemnify and hold us harmless from any claims, damages, or expenses arising from:
- Your use of the Service
- Your violation of these Terms
- Your violation of any rights of another party

---

## 9. Termination

We may terminate or suspend your access to the Service:
- Immediately, without notice, for violation of these Terms
- With notice, if we discontinue the Service
- At our discretion for any reason

Upon termination, your right to use the Service ceases immediately.

---

## 10. Changes to Terms

We reserve the right to modify these Terms at any time. Changes will be effective:
- Immediately upon posting for new users
- 30 days after notification for existing users

Continued use after changes constitutes acceptance.

---

## 11. Governing Law

These Terms are governed by the laws of ${jurisdiction === 'us' ? 'the United States' : jurisdiction === 'eu' ? 'the European Union' : jurisdiction === 'uk' ? 'the United Kingdom' : jurisdiction === 'ca' ? 'Canada' : jurisdiction === 'au' ? 'Australia' : '[Your Jurisdiction]'}, without regard to conflict of law provisions.

---

## 12. Dispute Resolution

${jurisdiction === 'us' ? `Any disputes shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association, except where prohibited by law.` : `Any disputes shall be resolved in the courts of ${jurisdictionObj?.name || '[Your Jurisdiction]'}.`}

---

## 13. Contact

For questions about these Terms:

${contactEmail ? `**Email:** ${contactEmail}` : '**Email:** [your-email@example.com]'}
${website ? `**Website:** ${website}` : ''}

---

**Disclaimer:** This is a template. Consult a lawyer for complex situations or high-risk services.
`
  }
  
  if (docType === 'cookie') {
    return `# Cookie Policy for ${appName || '[Your App Name]'}

**Last Updated:** ${today}

---

## What Are Cookies?

Cookies are small text files stored on your device when you visit our ${website ? 'website' : 'service'}. They help us provide a better experience.

---

## Cookies We Use

${dataCollected.includes('analytics') ? `### Analytics Cookies
${selectedServices.includes('google-analytics') ? '**Google Analytics**: We use Google Analytics to understand how visitors use our site. These cookies collect information like pages visited, time spent, and referral sources. This data is anonymized and used to improve our service.' : 'We use analytics cookies to understand usage patterns and improve our service.'}

**Data Collected:** Page views, session duration, device type, browser type
**Purpose:** Service improvement and optimization
**Duration:** Up to 2 years
` : ''}

### Essential Cookies
- **Session cookies**: Keep you logged in
- **Security cookies**: Protect against fraud
- **Preference cookies**: Remember your settings

**Duration:** Session or up to 1 year

---

## Third-Party Cookies

${selectedServices.length > 0 ? `Some third-party services we use may set their own cookies:

${selectedServices.map(s => {
  const service = services.find(srv => srv.id === s)
  return `- **${service?.name}**: ${service?.category} purposes`
}).join('\n')}

We do not control these third-party cookies. Please review their privacy policies.` : 'We do not use third-party services that set cookies.'}

---

## Managing Cookies

You can control and delete cookies through your browser settings:

- **Chrome**: Settings → Privacy → Cookies
- **Firefox**: Settings → Privacy & Security → Cookies
- **Safari**: Preferences → Privacy → Cookies
- **Edge**: Settings → Privacy → Cookies

**Note:** Disabling essential cookies may affect functionality.

---

## Do Not Track

${dataCollected.includes('analytics') ? 'We respect Do Not Track (DNT) signals. When DNT is enabled, we disable analytics tracking.' : 'We do not track users.'}

---

## GDPR Rights

${hasGDPR ? `If you are in the EU:
- You can withdraw consent for non-essential cookies at any time
- You have the right to access and delete data collected via cookies
- Contact us at ${contactEmail || '[email]'} to exercise these rights` : ''}

---

## Changes to This Policy

We may update this Cookie Policy. Check the "Last Updated" date for changes.

---

## Contact

Questions about our use of cookies?

${contactEmail ? `**Email:** ${contactEmail}` : '**Email:** [your-email@example.com]'}

---

**Disclaimer:** This is a template. Consult a lawyer for compliance in specific jurisdictions.
`
  }
  
  if (docType === 'disclaimer') {
    return `# Disclaimer for ${appName || '[Your App Name]'}

**Last Updated:** ${today}

---

## General Disclaimer

The information provided by ${appName || '[Your App Name]'} ("we," "us," or "our") is for general informational purposes only. All information is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information.

---

## Professional Advice Disclaimer

${appName?.toLowerCase().includes('legal') || appName?.toLowerCase().includes('medical') || appName?.toLowerCase().includes('financial') ? `**This service does NOT provide professional ${appName.toLowerCase().includes('legal') ? 'legal' : appName.toLowerCase().includes('medical') ? 'medical' : 'financial'} advice.**

The content is for informational purposes only and should not be considered as professional ${appName.toLowerCase().includes('legal') ? 'legal' : appName.toLowerCase().includes('medical') ? 'medical' : 'financial'} advice. Always consult with a qualified professional for specific advice related to your situation.` : 'The content should not be considered professional advice. Consult qualified professionals for specific guidance.'}

---

## No Warranties

### "As Is" Basis
Our Service is provided on an "as is" and "as available" basis without any warranties, either express or implied.

### Use at Your Own Risk
Your use of the Service is at your sole risk. We do not warrant that:
- The Service will function without interruption or errors
- Defects will be corrected
- The Service is free from viruses or harmful components
- Results obtained will be accurate or reliable

---

## Limitation of Liability

To the fullest extent permitted by law:

- We shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of the Service
- This includes damages for loss of profits, data, or other intangibles
- This applies even if we have been advised of the possibility of such damages

---

## External Links

Our Service may contain links to third-party websites or services. We:
- Do not endorse or control these external sites
- Are not responsible for their content, privacy policies, or practices
- Recommend reviewing their terms before use

---

## User-Generated Content

${dataCollected.includes('name') || dataCollected.includes('email') ? `If users can post content on our Service:

- We do not review all content before publication
- We are not responsible for user-generated content
- We reserve the right to remove any content at our discretion
- Users are responsible for their own posts` : 'We do not host user-generated content.'}

---

## Changes and Updates

We reserve the right to:
- Modify or discontinue the Service without notice
- Update this Disclaimer at any time
- Changes are effective immediately upon posting

---

## Jurisdiction

${jurisdiction === 'us' ? 'This Disclaimer is governed by the laws of the United States.' : jurisdiction === 'eu' ? 'This Disclaimer is governed by EU law.' : `This Disclaimer is governed by the laws of ${jurisdictionObj?.name || '[Your Jurisdiction]'}.`}

---

## Fair Use

This Service may include:
- Copyrighted material used under fair use
- Material from various sources for informational/educational purposes
- Proper attribution where possible

If you believe content infringes your copyright, contact us at ${contactEmail || '[email]'}.

---

## Accuracy of Information

We strive to keep information accurate and up-to-date but make no guarantees. Information may:
- Become outdated
- Contain technical inaccuracies or errors
- Be incomplete

---

## Third-Party Services

${selectedServices.length > 0 ? `We use third-party services that have their own disclaimers and terms:

${selectedServices.map(s => services.find(srv => srv.id === s)?.name).join(', ')}

We are not responsible for these third-party services.` : 'We do not currently use third-party services.'}

---

## Contact

Questions about this Disclaimer?

${contactEmail ? `**Email:** ${contactEmail}` : '**Email:** [your-email@example.com]'}
${website ? `**Website:** ${website}` : ''}

---

**This disclaimer was generated using VibeBrews.com. It is not a substitute for legal advice from a qualified attorney.**
`
  }
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function LegalDocGenerator() {
  const [activeTab, setActiveTab] = useState('generator')
  const [selectedDoc, setSelectedDoc] = useState('privacy')
  const [copied, setCopied] = useState(false)
  
  // Form state
  const [appName, setAppName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [jurisdiction, setJurisdiction] = useState('us')
  const [dataCollected, setDataCollected] = useState([])
  const [selectedServices, setSelectedServices] = useState([])
  const [hasMinors, setHasMinors] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)
  
  // Generate document in real-time
  const generatedDoc = generateDocument({
    docType: selectedDoc,
    appName,
    companyName,
    contactEmail,
    website,
    jurisdiction,
    dataCollected,
    services: selectedServices,
    hasMinors,
  })
  
  // SEO
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
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': 'Legal Document Generator',
      'applicationCategory': 'UtilityApplication',
      'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
      'description': 'Free privacy policy, terms of service, and legal document generator for apps and websites'
    }
    let script = document.querySelector('script[data-schema="legal"]')
    if (!script) { script = document.createElement('script'); script.type = 'application/ld+json'; script.setAttribute('data-schema', 'legal'); document.head.appendChild(script) }
    script.textContent = JSON.stringify(schema)
    return () => { document.title = 'VibeBrews'; script?.remove() }
  }, [])
  
  const toggleData = (id) => {
    setDataCollected(prev => prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id])
  }
  
  const toggleService = (id) => {
    setSelectedServices(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id])
  }
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedDoc)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  const downloadAsMarkdown = () => {
    const blob = new Blob([generatedDoc], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${selectedDoc}-${appName || 'document'}.md`
    a.click()
    URL.revokeObjectURL(url)
  }
  
  const downloadAsHTML = () => {
    // Convert markdown to basic HTML
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${documentTypes.find(d => d.id === selectedDoc)?.name} - ${appName || 'Document'}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; line-height: 1.6; color: #333; }
    h1 { color: #2D2A26; border-bottom: 3px solid #3b82f6; padding-bottom: 10px; }
    h2 { color: #2D2A26; margin-top: 30px; }
    h3 { color: #555; }
    code { background: #f4f4f4; padding: 2px 6px; border-radius: 3px; }
    a { color: #3b82f6; }
  </style>
</head>
<body>
${generatedDoc.replace(/^# (.+)$/gm, '<h1>$1</h1>')
  .replace(/^## (.+)$/gm, '<h2>$1</h2>')
  .replace(/^### (.+)$/gm, '<h3>$1</h3>')
  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  .replace(/\*(.+?)\*/g, '<em>$1</em>')
  .replace(/^- (.+)$/gm, '<li>$1</li>')
  .replace(/\n\n/g, '</p><p>')
  .replace(/^(.+)$/gm, '<p>$1</p>')}
</body>
</html>`
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${selectedDoc}-${appName || 'document'}.html`
    a.click()
    URL.revokeObjectURL(url)
  }
  
  const tabs = [
    { id: 'generator', label: 'Generator', icon: Icons.edit },
    { id: 'guide', label: 'Legal Guide', icon: Icons.info },
  ]
  
  const progress = Math.min(100, (
    (appName ? 20 : 0) +
    (jurisdiction ? 15 : 0) +
    (dataCollected.length > 0 ? 25 : 0) +
    (selectedServices.length > 0 ? 20 : 0) +
    (contactEmail ? 20 : 0)
  ))
  
  return (
    <PageTransition>
      <div className="fixed inset-0 -z-10" style={{ background: 'linear-gradient(180deg, #F8F5F0 0%, #EDE8E0 100%)' }} />
      <div className="relative z-10 min-h-screen px-4 md:px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div className="text-center mb-6" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#2D2A26]/5 text-[#2D2A26]/70 rounded-full text-xs font-medium mb-3">
              {Icons.shield}
              <span>Free • No Signup • GDPR Compliant</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#2D2A26] mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Legal Document Generator
            </h1>
            <p className="text-[#2D2A26]/60 text-sm md:text-base max-w-2xl mx-auto">
              Generate privacy policies, terms of service, and legal docs in 2 minutes. <br className="hidden md:block" />
              GDPR, CCPA, and App Store compliant. Export as Markdown or HTML.
            </p>
          </motion.div>
          
          {/* Tabs */}
          <div className="flex justify-center mb-6 overflow-x-auto pb-2">
            <div className="inline-flex bg-white/50 rounded-2xl p-1.5 shadow-sm">
              {tabs.map(tab => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
                    activeTab === tab.id ? 'bg-[#2D2A26] text-white shadow-lg' : 'text-[#2D2A26]/60 hover:text-[#2D2A26]'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {tab.icon}
                  {tab.label}
                </motion.button>
              ))}
            </div>
          </div>
          
          <AnimatePresence mode="wait">
            {activeTab === 'generator' && (
              <motion.div key="generator" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* LEFT: Configuration */}
                  <div className="space-y-4">
                    {/* Document Type Selector */}
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-[#2D2A26]/5">
                      <div className="text-[#2D2A26]/50 text-xs uppercase tracking-wider mb-3">Select Document Type</div>
                      <div className="grid grid-cols-2 gap-2">
                        {documentTypes.map(doc => (
                          <motion.button
                            key={doc.id}
                            onClick={() => setSelectedDoc(doc.id)}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className={`p-4 rounded-xl text-left transition-all border-2 ${
                              selectedDoc === doc.id 
                                ? 'border-[#2D2A26] bg-[#2D2A26]/5 shadow-md' 
                                : 'border-[#2D2A26]/10 bg-white/50 hover:border-[#2D2A26]/30'
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-1" style={{ color: selectedDoc === doc.id ? doc.color : '#2D2A26' }}>
                              {doc.icon}
                              <span className="font-semibold text-sm">{doc.name}</span>
                            </div>
                            <div className="text-xs text-[#2D2A26]/50">{doc.desc}</div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <motion.div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-[#2D2A26]/5">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-[#2D2A26]/70 font-medium">Configuration Progress</span>
                        <span className="text-sm text-[#2D2A26] font-mono">{progress}%</span>
                      </div>
                      <div className="h-2 bg-[#2D2A26]/10 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6]"
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </motion.div>
                    
                    {/* Basic Info */}
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-[#2D2A26]/5">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-[#2D2A26]/70 text-sm font-semibold">Basic Information</div>
                        {appName && <span className="text-xs text-green-600 flex items-center gap-1">{Icons.check} Required</span>}
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs text-[#2D2A26]/50 uppercase font-medium mb-1 block">App/Website Name *</label>
                          <input 
                            type="text" 
                            value={appName}
                            onChange={(e) => setAppName(e.target.value)}
                            placeholder="MyApp"
                            className="w-full px-4 py-2.5 bg-white/50 rounded-xl text-sm text-[#2D2A26] placeholder-[#2D2A26]/30 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/30 border border-[#2D2A26]/10"
                          />
                        </div>
                        
                        <div>
                          <label className="text-xs text-[#2D2A26]/50 uppercase font-medium mb-1 block">Contact Email *</label>
                          <input 
                            type="email" 
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            placeholder="legal@myapp.com"
                            className="w-full px-4 py-2.5 bg-white/50 rounded-xl text-sm text-[#2D2A26] placeholder-[#2D2A26]/30 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/30 border border-[#2D2A26]/10"
                          />
                        </div>
                        
                        <button
                          onClick={() => setShowAdvanced(!showAdvanced)}
                          className="text-xs text-[#2D2A26]/50 hover:text-[#2D2A26] transition-colors flex items-center gap-1"
                        >
                          {showAdvanced ? '▼' : '▶'} Advanced (Company, Website)
                        </button>
                        
                        <AnimatePresence>
                          {showAdvanced && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="space-y-3 overflow-hidden"
                            >
                              <div>
                                <label className="text-xs text-[#2D2A26]/50 uppercase font-medium mb-1 block">Company Name</label>
                                <input 
                                  type="text" 
                                  value={companyName}
                                  onChange={(e) => setCompanyName(e.target.value)}
                                  placeholder="MyApp Inc."
                                  className="w-full px-4 py-2.5 bg-white/50 rounded-xl text-sm text-[#2D2A26] placeholder-[#2D2A26]/30 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/30 border border-[#2D2A26]/10"
                                />
                              </div>
                              
                              <div>
                                <label className="text-xs text-[#2D2A26]/50 uppercase font-medium mb-1 block">Website URL</label>
                                <input 
                                  type="url" 
                                  value={website}
                                  onChange={(e) => setWebsite(e.target.value)}
                                  placeholder="https://myapp.com"
                                  className="w-full px-4 py-2.5 bg-white/50 rounded-xl text-sm text-[#2D2A26] placeholder-[#2D2A26]/30 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/30 border border-[#2D2A26]/10"
                                />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    
                    {/* Jurisdiction */}
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-[#2D2A26]/5">
                      <div className="text-[#2D2A26]/70 text-sm font-semibold mb-3 flex items-center gap-2">
                        {Icons.globe}
                        Your Primary Jurisdiction
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {jurisdictions.map(j => (
                          <motion.button
                            key={j.id}
                            onClick={() => setJurisdiction(j.id)}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className={`p-3 rounded-xl text-left transition-all text-sm ${
                              jurisdiction === j.id
                                ? 'bg-[#2D2A26] text-white shadow-md'
                                : 'bg-white/50 text-[#2D2A26]/70 hover:bg-[#2D2A26]/5 border border-[#2D2A26]/10'
                            }`}
                          >
                            <div className="text-lg mb-1">{j.flag}</div>
                            <div className="font-medium text-xs">{j.name}</div>
                            <div className={`text-[10px] mt-1 ${jurisdiction === j.id ? 'text-white/70' : 'text-[#2D2A26]/40'}`}>
                              {j.laws.join(', ')}
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Data Collection */}
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-[#2D2A26]/5">
                      <div className="text-[#2D2A26]/70 text-sm font-semibold mb-3 flex items-center gap-2">
                        {Icons.database}
                        What Data Do You Collect?
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {dataTypes.map(dt => (
                          <motion.button
                            key={dt.id}
                            onClick={() => toggleData(dt.id)}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className={`p-3 rounded-xl text-left transition-all text-sm flex items-center gap-2 ${
                              dataCollected.includes(dt.id)
                                ? 'bg-[#3b82f6] text-white shadow-md'
                                : 'bg-white/50 text-[#2D2A26]/70 hover:bg-[#2D2A26]/5 border border-[#2D2A26]/10'
                            }`}
                          >
                            {dt.icon}
                            <span className="font-medium text-xs">{dt.name}</span>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Third-Party Services */}
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-[#2D2A26]/5">
                      <div className="text-[#2D2A26]/70 text-sm font-semibold mb-3 flex items-center gap-2">
                        {Icons.services}
                        Third-Party Services Used
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {services.map(s => (
                          <motion.button
                            key={s.id}
                            onClick={() => toggleService(s.id)}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className={`p-2.5 rounded-xl text-left transition-all text-xs ${
                              selectedServices.includes(s.id)
                                ? 'bg-[#8b5cf6] text-white shadow-md'
                                : 'bg-white/50 text-[#2D2A26]/70 hover:bg-[#2D2A26]/5 border border-[#2D2A26]/10'
                            }`}
                          >
                            <div className="font-medium">{s.name}</div>
                            <div className={`text-[10px] ${selectedServices.includes(s.id) ? 'text-white/70' : 'text-[#2D2A26]/40'}`}>{s.category}</div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Special Considerations */}
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-[#2D2A26]/5">
                      <div className="text-[#2D2A26]/70 text-sm font-semibold mb-3 flex items-center gap-2">
                        {Icons.children}
                        Special Considerations
                      </div>
                      
                      <label className="flex items-center justify-between p-3 rounded-xl bg-white/50 border border-[#2D2A26]/10 hover:bg-[#2D2A26]/5 transition-all cursor-pointer">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-[#2D2A26]/70">Users under 18/COPPA compliance</span>
                        </div>
                        <motion.button
                          onClick={() => setHasMinors(!hasMinors)}
                          className={`relative w-11 h-6 rounded-full transition-colors ${
                            hasMinors ? 'bg-[#3b82f6]' : 'bg-[#2D2A26]/20'
                          }`}
                          whileTap={{ scale: 0.95 }}
                        >
                          <motion.div
                            className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-md"
                            animate={{ left: hasMinors ? 'calc(100% - 20px)' : '4px' }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          />
                        </motion.button>
                      </label>
                    </div>
                  </div>
                  
                  {/* RIGHT: Live Preview */}
                  <div className="lg:sticky lg:top-4 space-y-4" style={{ maxHeight: 'calc(100vh - 2rem)', overflowY: 'auto' }}>
                    {/* Export Actions - PROMINENT */}
                    <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-5 border border-[#2D2A26]/10 shadow-xl">
                      <div className="flex items-center gap-2 text-[#2D2A26] text-sm font-bold mb-4">
                        {Icons.download}
                        <span>Export Your Document</span>
                      </div>
                      
                      {/* Big Export Buttons */}
                      <div className="grid grid-cols-1 gap-3 mb-4">
                        <motion.button
                          onClick={copyToClipboard}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl font-medium text-sm transition-all ${
                            copied 
                              ? 'bg-green-500 text-white' 
                              : 'bg-[#2D2A26] text-white hover:bg-[#2D2A26]/90'
                          }`}
                        >
                          {copied ? Icons.check : Icons.copy}
                          <span>{copied ? 'Copied to Clipboard!' : 'Copy Markdown Text'}</span>
                        </motion.button>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <motion.button
                            onClick={downloadAsMarkdown}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center justify-center gap-2 px-4 py-3 bg-[#3b82f6] text-white rounded-xl font-medium text-sm hover:bg-[#3b82f6]/90 transition-all"
                          >
                            {Icons.download}
                            <span>Download .md</span>
                          </motion.button>
                          
                          <motion.button
                            onClick={downloadAsHTML}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center justify-center gap-2 px-4 py-3 bg-[#8b5cf6] text-white rounded-xl font-medium text-sm hover:bg-[#8b5cf6]/90 transition-all"
                          >
                            {Icons.html}
                            <span>Download .html</span>
                          </motion.button>
                        </div>
                      </div>
                      
                      {/* Disclaimer */}
                      <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800">
                        {Icons.warning}
                        <div>
                          <strong>Not Legal Advice</strong> - This template is for informational purposes. Consult a qualified attorney for compliance in your specific situation.
                        </div>
                      </div>
                    </div>
                    
                    {/* Preview Header */}
                    <div className="flex items-center gap-2 text-[#2D2A26]/50 text-xs uppercase tracking-wider">
                      {Icons.eye}
                      <span>Live Preview</span>
                    </div>
                    
                    {/* Document Preview */}
                    <motion.div 
                      className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-[#2D2A26]/5 shadow-lg"
                      key={generatedDoc}
                      initial={{ opacity: 0.8 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="prose prose-sm max-w-none">
                        <pre className="whitespace-pre-wrap font-sans text-xs leading-relaxed text-[#2D2A26]/80">
                          {generatedDoc}
                        </pre>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'guide' && (
              <motion.div key="guide" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <div className="max-w-4xl mx-auto space-y-6">
                  {/* When You Need These */}
                  <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-[#2D2A26]/5">
                    <h2 className="text-xl font-bold text-[#2D2A26] mb-4 flex items-center gap-2">
                      {Icons.shield}
                      When Do I Need a Privacy Policy?
                    </h2>
                    <div className="space-y-4 text-sm text-[#2D2A26]/70">
                      <p className="font-medium text-[#2D2A26]">You MUST have a privacy policy if you:</p>
                      <ul className="space-y-2 list-disc pl-5">
                        <li><strong>Collect ANY user data</strong> - email, name, location, analytics, cookies</li>
                        <li><strong>Submit to App Store/Play Store</strong> - Apple & Google require it</li>
                        <li><strong>Have users in EU/California</strong> - GDPR & CCPA legally require it</li>
                        <li><strong>Use third-party services</strong> - Google Analytics, Firebase, Stripe, etc.</li>
                        <li><strong>Have a website with forms</strong> - Contact forms, newsletters, comments</li>
                      </ul>
                      
                      <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                        <div className="flex items-start gap-2 text-red-700">
                          {Icons.warning}
                          <div>
                            <strong>App Store Rejection Risk</strong>
                            <p className="text-xs text-red-600 mt-1">Missing privacy policies are one of the top reasons for App Store/Play Store rejections. Add yours before submitting.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* GDPR Explained */}
                  <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-[#2D2A26]/5">
                    <h2 className="text-xl font-bold text-[#2D2A26] mb-4">GDPR Compliance (EU Users)</h2>
                    <div className="space-y-3 text-sm text-[#2D2A26]/70">
                      <p>If you have ANY users in the EU, you must comply with GDPR. Key requirements:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="p-3 bg-[#2D2A26]/5 rounded-xl">
                          <div className="font-semibold text-[#2D2A26] mb-1">✓ Clear Consent</div>
                          <div className="text-xs text-[#2D2A26]/60">Users must opt-in (not opt-out) to data collection</div>
                        </div>
                        <div className="p-3 bg-[#2D2A26]/5 rounded-xl">
                          <div className="font-semibold text-[#2D2A26] mb-1">✓ Right to Delete</div>
                          <div className="text-xs text-[#2D2A26]/60">Users can request deletion of their data</div>
                        </div>
                        <div className="p-3 bg-[#2D2A26]/5 rounded-xl">
                          <div className="font-semibold text-[#2D2A26] mb-1">✓ Data Portability</div>
                          <div className="text-xs text-[#2D2A26]/60">Users can export their data</div>
                        </div>
                        <div className="p-3 bg-[#2D2A26]/5 rounded-xl">
                          <div className="font-semibold text-[#2D2A26] mb-1">✓ Breach Notification</div>
                          <div className="text-xs text-[#2D2A26]/60">Notify users within 72 hours of data breach</div>
                        </div>
                      </div>
                      <p className="text-xs text-[#2D2A26]/50 italic">Fines for non-compliance: up to €20 million or 4% of annual revenue</p>
                    </div>
                  </div>
                  
                  {/* Terms of Service */}
                  <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-[#2D2A26]/5">
                    <h2 className="text-xl font-bold text-[#2D2A26] mb-4 flex items-center gap-2">
                      {Icons.document}
                      Do I Need Terms of Service?
                    </h2>
                    <div className="space-y-3 text-sm text-[#2D2A26]/70">
                      <p>Terms of Service are HIGHLY RECOMMENDED if you:</p>
                      <ul className="space-y-2 list-disc pl-5">
                        <li>Offer paid services or subscriptions</li>
                        <li>Allow user-generated content (posts, comments, uploads)</li>
                        <li>Want to limit legal liability</li>
                        <li>Have account creation or user authentication</li>
                      </ul>
                      <p className="text-[#2D2A26] font-medium">Without ToS, you have limited legal protection if users misuse your service.</p>
                    </div>
                  </div>
                  
                  {/* COPPA */}
                  <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-[#2D2A26]/5">
                    <h2 className="text-xl font-bold text-[#2D2A26] mb-4 flex items-center gap-2">
                      {Icons.children}
                      Children's Privacy (COPPA)
                    </h2>
                    <div className="space-y-3 text-sm text-[#2D2A26]/70">
                      <p>If your app/site is for kids under 13 (US), you MUST:</p>
                      <ul className="space-y-2 list-disc pl-5">
                        <li>Get verifiable parental consent before collecting data</li>
                        <li>Clearly state what data you collect from children</li>
                        <li>Provide parents access to review/delete child's data</li>
                        <li>Not require kids to share more data than necessary</li>
                      </ul>
                      <div className="p-3 bg-[#2D2A26]/5 rounded-xl text-xs">
                        <strong>Safe Harbor:</strong> If your service is NOT directed at children but some users are under 13, you can ban users under 13 in your Terms of Service.
                      </div>
                    </div>
                  </div>
                  
                  {/* Common Services */}
                  <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-[#2D2A26]/5">
                    <h2 className="text-xl font-bold text-[#2D2A26] mb-4">Common Third-Party Services to Disclose</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { name: 'Google Analytics', must: 'Yes' },
                        { name: 'Firebase', must: 'Yes' },
                        { name: 'Stripe/Payments', must: 'Yes' },
                        { name: 'Mailchimp', must: 'Yes' },
                        { name: 'Sentry', must: 'Maybe' },
                        { name: 'Cloudflare', must: 'Maybe' },
                        { name: 'Vercel Analytics', must: 'Yes' },
                        { name: 'Supabase', must: 'Yes' },
                      ].map((s, i) => (
                        <div key={i} className="p-3 bg-[#2D2A26]/5 rounded-xl text-center">
                          <div className="font-semibold text-xs text-[#2D2A26] mb-1">{s.name}</div>
                          <div className={`text-[10px] font-medium ${s.must === 'Yes' ? 'text-red-600' : 'text-amber-600'}`}>
                            {s.must === 'Yes' ? 'Must Disclose' : 'Check Privacy Policy'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* SEO Content */}
                  <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-[#2D2A26]/5">
                    <h2 className="text-xl font-bold text-[#2D2A26] mb-4">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                      {[
                        {
                          q: 'Is this free privacy policy generator legally valid?',
                          a: 'Yes, the templates are based on standard legal language used by apps and websites. However, this is a starting point - for complex situations (medical/financial data, international operations), consult an attorney.'
                        },
                        {
                          q: 'Can I use this for my mobile app?',
                          a: 'Absolutely! The generator includes App Store and Google Play requirements. Make sure to select the right data types (location, device info, analytics) that your app collects.'
                        },
                        {
                          q: 'How often should I update my privacy policy?',
                          a: 'Update it whenever you: add new data collection, integrate new third-party services, expand to new regions, or change how you use data. Always notify users of material changes.'
                        },
                        {
                          q: 'Do I need a lawyer to review this?',
                          a: 'For most small apps/websites collecting basic data: no. For healthcare, financial services, or handling sensitive data: YES, get a lawyer. When in doubt, consult a professional.'
                        },
                      ].map((faq, i) => (
                        <div key={i} className="border-b border-[#2D2A26]/10 last:border-0 pb-3">
                          <h3 className="font-semibold text-[#2D2A26] text-sm mb-1">{faq.q}</h3>
                          <p className="text-xs text-[#2D2A26]/70">{faq.a}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Footer */}
          <motion.footer className="mt-16 pt-8 border-t border-[#2D2A26]/10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <img src="/vibebrews-logo.png" alt="VibeBrews" className="w-8 h-8 rounded-lg" />
                <span className="text-[#2D2A26]/70 text-sm">A free tool by <strong>VibeBrews</strong></span>
              </div>
              <nav className="flex gap-6 text-sm text-[#2D2A26]/50">
                <Link to="/" className="hover:text-[#2D2A26] transition-colors">Home</Link>
                <Link to="/ai-token-calculator" className="hover:text-[#2D2A26] transition-colors">Token Calculator</Link>
                <Link to="/color-palette-generator" className="hover:text-[#2D2A26] transition-colors">Color Palette</Link>
              </nav>
            </div>
            <p className="mt-6 text-center text-xs text-[#2D2A26]/30 max-w-3xl mx-auto">
              Generated documents are templates for informational purposes. Laws vary by jurisdiction and situation. For compliance with specific regulations (HIPAA, PCI-DSS, etc.) or handling sensitive data, consult a qualified attorney. Last updated: January 2026.
            </p>
          </motion.footer>
        </div>
      </div>
    </PageTransition>
  )
}
