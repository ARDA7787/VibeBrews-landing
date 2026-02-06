/**
 * useSEO Hook - Dynamic SEO meta tag management for React SPA
 * 
 * Sets document title, meta description, keywords, canonical URL,
 * Open Graph tags, and Twitter Card tags dynamically per page.
 * 
 * Usage:
 *   useSEO({
 *     title: 'Page Title | VibeBrews',
 *     description: 'Page description for search engines.',
 *     keywords: 'comma, separated, keywords',
 *     canonical: 'https://vibebrews.com/page-slug',
 *   })
 */

import { useEffect } from 'react'

const BASE_URL = 'https://vibebrews.com'
const DEFAULT_OG_IMAGE = `${BASE_URL}/vibebrews-logo.png`

export default function useSEO({ title, description, keywords, canonical, ogImage }) {
  useEffect(() => {
    // Document title
    if (title) document.title = title

    // Meta description
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc && description) metaDesc.setAttribute('content', description)

    // Meta keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]')
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta')
        metaKeywords.setAttribute('name', 'keywords')
        document.head.appendChild(metaKeywords)
      }
      metaKeywords.setAttribute('content', keywords)
    }

    // Canonical URL
    if (canonical) {
      const link = document.querySelector('link[rel="canonical"]')
      if (link) link.setAttribute('href', canonical)
    }

    // Open Graph tags
    const ogTitleEl = document.querySelector('meta[property="og:title"]')
    if (ogTitleEl && title) ogTitleEl.setAttribute('content', title)

    const ogDescEl = document.querySelector('meta[property="og:description"]')
    if (ogDescEl && description) ogDescEl.setAttribute('content', description)

    const ogImgEl = document.querySelector('meta[property="og:image"]')
    if (ogImgEl) ogImgEl.setAttribute('content', ogImage || DEFAULT_OG_IMAGE)

    if (canonical) {
      const ogUrlEl = document.querySelector('meta[property="og:url"]')
      if (ogUrlEl) ogUrlEl.setAttribute('content', canonical)
    }

    // Twitter Card tags
    const twTitleEl = document.querySelector('meta[name="twitter:title"]')
    if (twTitleEl && title) twTitleEl.setAttribute('content', title)

    const twDescEl = document.querySelector('meta[name="twitter:description"]')
    if (twDescEl && description) twDescEl.setAttribute('content', description)

    const twImgEl = document.querySelector('meta[name="twitter:image"]')
    if (twImgEl) twImgEl.setAttribute('content', ogImage || DEFAULT_OG_IMAGE)

    if (canonical) {
      const twUrlEl = document.querySelector('meta[name="twitter:url"]')
      if (twUrlEl) twUrlEl.setAttribute('content', canonical)
    }

    // Cleanup: reset to defaults when unmounting
    return () => {
      document.title = 'VibeBrews - Create Multiplayer Games by Talking'
      const desc = document.querySelector('meta[name="description"]')
      if (desc) desc.setAttribute('content', 'Create games by describing them. AI generates playable HTML5 multiplayer games in minutes. No coding required. Free on Android.')
      const link = document.querySelector('link[rel="canonical"]')
      if (link) link.setAttribute('href', BASE_URL + '/')
    }
  }, [title, description, keywords, canonical, ogImage])
}
