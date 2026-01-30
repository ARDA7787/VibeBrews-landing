/**
 * Google Analytics 4 (GA4) Hook for React
 * 
 * This hook provides:
 * - Automatic page view tracking on route changes
 * - Custom event tracking
 * - User property setting
 * 
 * SETUP REQUIRED:
 * 1. Replace 'G-XXXXXXXXXX' in index.html with your actual GA4 Measurement ID
 * 2. Replace GA_MEASUREMENT_ID below with the same ID
 */

import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// GA4 Measurement ID
const GA_MEASUREMENT_ID = 'G-1X53XJD63N'

/**
 * Check if Google Analytics is loaded and available
 */
const isGtagAvailable = () => {
  return typeof window !== 'undefined' && typeof window.gtag === 'function'
}

/**
 * Send a page view event to GA4
 * @param {string} path - The page path
 * @param {string} title - The page title
 */
export const trackPageView = (path, title) => {
  if (!isGtagAvailable()) {
    console.warn('Google Analytics not loaded')
    return
  }

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: path,
    page_title: title,
    page_location: window.location.href
  })
}

/**
 * Send a custom event to GA4
 * @param {string} eventName - The event name (e.g., 'button_click', 'form_submit')
 * @param {object} eventParams - Additional parameters for the event
 * 
 * @example
 * trackEvent('download_app_click', { button_location: 'hero' })
 * trackEvent('waitlist_signup', { email_domain: 'gmail.com' })
 */
export const trackEvent = (eventName, eventParams = {}) => {
  if (!isGtagAvailable()) {
    console.warn('Google Analytics not loaded')
    return
  }

  window.gtag('event', eventName, eventParams)
}

/**
 * Set user properties for better segmentation
 * @param {object} properties - User properties to set
 * 
 * @example
 * setUserProperties({ user_type: 'creator', subscription: 'free' })
 */
export const setUserProperties = (properties) => {
  if (!isGtagAvailable()) {
    console.warn('Google Analytics not loaded')
    return
  }

  window.gtag('set', 'user_properties', properties)
}

/**
 * Track outbound link clicks
 * @param {string} url - The outbound URL
 * @param {string} linkText - The link text or description
 */
export const trackOutboundLink = (url, linkText = '') => {
  trackEvent('click', {
    event_category: 'outbound',
    event_label: linkText || url,
    link_url: url
  })
}

/**
 * Page title mapping for better analytics readability
 */
const PAGE_TITLES = {
  '/': 'Home',
  '/how-to-make-a-game-without-coding': 'How to Make a Game Without Coding',
  '/i-have-a-game-idea': 'I Have a Game Idea',
  '/our-vision': 'Our Vision',
  '/productive-things-to-do-on-phone': 'Productive Things to Do on Phone',
  '/why-i-stopped-learning-unity': 'Why I Stopped Learning Unity',
  '/the-death-of-coding': 'The Death of Coding',
  '/the-creative-block-is-a-lie': 'The Creative Block is a Lie',
  '/the-game-you-will-never-make': 'The Game You Will Never Make',
  '/the-3am-scroll': 'The 3AM Scroll',
  '/why-your-ideas-die-in-your-notes-app': 'Why Your Ideas Die in Your Notes App',
  '/everyone-racing-against-ai': 'Everyone Racing Against AI',
  '/tools': 'Tools',
  '/color-palette-generator': 'Color Palette Generator',
  '/ai-token-calculator': 'AI Token Calculator',
  '/ai-model-picker': 'AI Model Picker',
  '/prompt-remix': 'Prompt Remix',
  '/context-window-visualizer': 'Context Window Visualizer',
  '/ship-safe-scanner': 'Ship Safe Scanner',
  '/vibe-cost-calculator': 'Vibe Cost Calculator',
  '/legal-doc-generator': 'Legal Doc Generator'
}

/**
 * Get page title from path
 * @param {string} pathname - The current pathname
 */
const getPageTitle = (pathname) => {
  // Handle hash routing (remove leading #)
  const cleanPath = pathname.startsWith('#') ? pathname.slice(1) : pathname
  return PAGE_TITLES[cleanPath] || `VibeBrews - ${cleanPath}`
}

/**
 * Hook to automatically track page views on route changes
 * Place this in your App component or Layout component
 * 
 * @example
 * function App() {
 *   useAnalytics()
 *   return <Routes>...</Routes>
 * }
 */
export const useAnalytics = () => {
  const location = useLocation()

  useEffect(() => {
    // Track page view on route change
    const pageTitle = getPageTitle(location.pathname)
    
    // Small delay to ensure the page has rendered
    const timeoutId = setTimeout(() => {
      trackPageView(location.pathname, pageTitle)
    }, 100)

    return () => clearTimeout(timeoutId)
  }, [location.pathname])
}

/**
 * Pre-built event trackers for common actions
 */
export const Analytics = {
  // App download tracking
  trackAppDownload: (source) => {
    trackEvent('app_download_click', {
      event_category: 'engagement',
      source: source // e.g., 'hero', 'footer', 'cta_section'
    })
  },

  // Waitlist signup tracking
  trackWaitlistSignup: (success) => {
    trackEvent('waitlist_signup', {
      event_category: 'conversion',
      success: success
    })
  },

  // Article reading progress
  trackArticleProgress: (articleName, percentage) => {
    trackEvent('article_progress', {
      event_category: 'engagement',
      article_name: articleName,
      scroll_percentage: percentage
    })
  },

  // Tool usage tracking
  trackToolUsage: (toolName, action) => {
    trackEvent('tool_usage', {
      event_category: 'engagement',
      tool_name: toolName,
      action: action // e.g., 'generate', 'copy', 'download'
    })
  },

  // External link clicks
  trackExternalLink: (url, context) => {
    trackEvent('external_link_click', {
      event_category: 'outbound',
      link_url: url,
      context: context // e.g., 'play_store', 'linkedin', 'article'
    })
  },

  // Video interactions
  trackVideo: (action, videoName) => {
    trackEvent('video_interaction', {
      event_category: 'engagement',
      action: action, // 'play', 'pause', 'complete'
      video_name: videoName
    })
  },

  // Scroll depth tracking (call at 25%, 50%, 75%, 100%)
  trackScrollDepth: (percentage, pageName) => {
    trackEvent('scroll_depth', {
      event_category: 'engagement',
      percentage: percentage,
      page_name: pageName
    })
  }
}

export default useAnalytics
