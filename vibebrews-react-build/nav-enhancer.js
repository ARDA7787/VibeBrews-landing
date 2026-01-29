/**
 * Navigation Enhancer for VibeBrews
 * Creates a Blogs page similar to Creator Tools with search functionality
 */
(function() {
  'use strict';

  // Blog data
  const BLOGS = [
    {
      path: '/how-to-make-a-game-without-coding',
      title: 'How to Make Games',
      fullTitle: 'How to Make a Game Without Coding',
      description: 'Learn how to create games using AI tools without writing a single line of code',
      categories: ['Tutorial', 'Beginner'],
      icon: '🎮',
      featured: true
    },
    {
      path: '/i-have-a-game-idea',
      title: 'I Have an Idea',
      fullTitle: 'I Have a Game Idea - Now What?',
      description: 'Turn your game concept into reality with practical steps and guidance',
      categories: ['Ideas', 'Getting Started'],
      icon: '💡'
    },
    {
      path: '/productive-things-to-do-on-phone',
      title: 'Productive Play',
      fullTitle: 'Productive Things to Do on Your Phone',
      description: 'Discover creative and productive ways to use your phone beyond scrolling',
      categories: ['Productivity', 'Mobile'],
      icon: '📱'
    },
    {
      path: '/why-i-stopped-learning-unity',
      title: 'Why I Quit Unity',
      fullTitle: 'Why I Stopped Learning Unity',
      description: 'A personal journey from traditional game engines to AI-powered creation',
      categories: ['Opinion', 'Game Dev'],
      icon: '🎯'
    },
    {
      path: '/the-death-of-coding',
      title: 'Death of Coding',
      fullTitle: 'The Death of Coding',
      description: 'How AI is transforming software development and what it means for creators',
      categories: ['AI', 'Future'],
      icon: '⚡'
    },
    {
      path: '/the-creative-block-is-a-lie',
      title: 'Creative Block is a Lie',
      fullTitle: 'The Creative Block is a Lie',
      description: 'Rethinking creativity and overcoming the myth of creative blocks',
      categories: ['Creativity', 'Mindset'],
      icon: '🧠'
    },
    {
      path: '/the-game-you-will-never-make',
      title: "Game You'll Never Make",
      fullTitle: 'The Game You Will Never Make',
      description: 'Why most game ideas stay ideas, and how to actually finish your projects',
      categories: ['Motivation', 'Reality Check'],
      icon: '🎲'
    },
    {
      path: '/the-3am-scroll',
      title: 'The 3AM Scroll',
      fullTitle: 'The 3AM Scroll',
      description: 'Late night inspiration and the creative energy of unconventional hours',
      categories: ['Lifestyle', 'Creativity'],
      icon: '🌙'
    },
    {
      path: '/why-your-ideas-die-in-your-notes-app',
      title: 'Why Ideas Die',
      fullTitle: 'Why Your Ideas Die in Your Notes App',
      description: 'Stop hoarding ideas - learn to execute and bring them to life',
      categories: ['Productivity', 'Execution'],
      icon: '📝'
    },
    {
      path: '/everyone-racing-against-ai',
      title: 'Racing Against AI',
      fullTitle: 'Everyone is Racing Against AI',
      description: 'The new landscape of creation in an AI-accelerated world',
      categories: ['AI', 'Industry'],
      icon: '🏃'
    }
  ];

  let currentSearch = '';

  // Create blogs page HTML
  function createBlogsHTML(searchQuery = '') {
    const filtered = BLOGS.filter(blog => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return blog.title.toLowerCase().includes(q) ||
             blog.fullTitle.toLowerCase().includes(q) ||
             blog.description.toLowerCase().includes(q) ||
             blog.categories.some(c => c.toLowerCase().includes(q));
    });

    const featured = filtered.find(b => b.featured);
    const others = filtered.filter(b => !b.featured);

    return `
      <div style="text-align: center; margin-bottom: 2rem;">
        <h1 style="font-family: 'Space Grotesk', sans-serif; font-size: 3rem; font-weight: 700; color: #2D2A26; margin: 0 0 1.5rem 0;">Blogs</h1>
        <div style="max-width: 500px; margin: 0 auto; position: relative;">
          <svg style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); opacity: 0.4;" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2D2A26" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input type="text" id="blogs-search-input" placeholder="Search blogs..." value="${searchQuery}" 
            style="width: 100%; padding: 1rem 1rem 1rem 3rem; font-size: 1rem; border: 2px solid rgba(45,42,38,0.1); border-radius: 1rem; background: white; color: #2D2A26; outline: none; box-sizing: border-box; transition: all 0.2s ease;" />
        </div>
      </div>
      
      <div style="max-width: 1200px; margin: 0 auto;">
        ${featured ? `
          <div style="margin-bottom: 2rem;">
            <a href="#${featured.path}" class="blogs-featured-card" style="display: block; background: linear-gradient(135deg, #2D2A26 0%, #1a1816 100%); border-radius: 1.5rem; padding: 2.5rem; text-decoration: none; color: white; position: relative; overflow: hidden; transition: transform 0.3s ease, box-shadow 0.3s ease;">
              <div style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; background: rgba(255,92,0,0.2); border-radius: 2rem; font-size: 0.75rem; font-weight: 600; color: #FF5C00; margin-bottom: 1.5rem;">
                <span style="width: 8px; height: 8px; background: #FF5C00; border-radius: 50%; display: inline-block;"></span>
                Featured Post
              </div>
              <h2 style="font-family: 'Space Grotesk', sans-serif; font-size: 2rem; font-weight: 700; margin: 0 0 1rem 0; line-height: 1.2;">${featured.fullTitle}</h2>
              <p style="font-size: 1rem; opacity: 0.8; margin: 0 0 1.5rem 0; max-width: 500px; line-height: 1.6;">${featured.description}</p>
              <span style="display: inline-flex; align-items: center; gap: 0.5rem; font-weight: 600;">
                Read Article →
              </span>
            </a>
          </div>
        ` : ''}
        
        ${others.length > 0 ? `
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 1.5rem;">
            ${others.map(blog => `
              <a href="#${blog.path}" class="blogs-card" style="display: flex; background: white; border-radius: 1rem; padding: 1.5rem; text-decoration: none; color: #2D2A26; border: 2px solid transparent; transition: all 0.3s ease;">
                <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #F8F5F0 0%, #EDE8E0 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; flex-shrink: 0; margin-right: 1rem;">${blog.icon}</div>
                <div style="flex: 1; min-width: 0;">
                  <div style="display: flex; gap: 0.5rem; margin-bottom: 0.5rem; flex-wrap: wrap;">
                    ${blog.categories.map(cat => `<span style="font-size: 0.65rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; padding: 0.25rem 0.5rem; background: rgba(45,42,38,0.05); border-radius: 0.25rem; color: rgba(45,42,38,0.6);">${cat}</span>`).join('')}
                  </div>
                  <h3 style="font-family: 'Space Grotesk', sans-serif; font-size: 1.1rem; font-weight: 600; margin: 0 0 0.5rem 0;">${blog.title}</h3>
                  <p style="font-size: 0.875rem; color: rgba(45,42,38,0.6); margin: 0; line-height: 1.5;">${blog.description}</p>
                </div>
              </a>
            `).join('')}
          </div>
        ` : ''}
        
        ${filtered.length === 0 ? `
          <div style="text-align: center; padding: 4rem 2rem; color: rgba(45,42,38,0.5);">
            <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
            <p>No blogs found matching "${searchQuery}"</p>
          </div>
        ` : ''}
        
        <p style="text-align: center; font-size: 0.875rem; color: rgba(45,42,38,0.5); margin-top: 2rem;">
          ${filtered.length} blog${filtered.length !== 1 ? 's' : ''} ${searchQuery ? `matching "${searchQuery}"` : 'available'}
        </p>
      </div>
    `;
  }

  // Show the blogs page overlay
  function showBlogsPage() {
    let overlay = document.getElementById('blogs-page-overlay');
    
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'blogs-page-overlay';
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 260px;
        right: 0;
        bottom: 0;
        background: linear-gradient(180deg, #F8F5F0 0%, #EDE8E0 100%);
        z-index: 50;
        overflow-y: auto;
        padding: 2rem 1.5rem;
      `;
      document.body.appendChild(overlay);
    }

    overlay.innerHTML = createBlogsHTML(currentSearch);
    overlay.style.display = 'block';

    // Setup search functionality
    setupSearch();
    
    // Add hover effects
    addHoverEffects();
  }

  function setupSearch() {
    const searchInput = document.getElementById('blogs-search-input');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value;
      const cursorPos = e.target.selectionStart;
      
      const overlay = document.getElementById('blogs-page-overlay');
      if (overlay) {
        overlay.innerHTML = createBlogsHTML(currentSearch);
        
        const newInput = document.getElementById('blogs-search-input');
        if (newInput) {
          newInput.focus();
          newInput.setSelectionRange(cursorPos, cursorPos);
          setupSearch();
        }
        addHoverEffects();
      }
    });

    searchInput.addEventListener('focus', () => {
      searchInput.style.borderColor = '#FF5C00';
      searchInput.style.boxShadow = '0 0 0 4px rgba(255,92,0,0.1)';
    });

    searchInput.addEventListener('blur', () => {
      searchInput.style.borderColor = 'rgba(45,42,38,0.1)';
      searchInput.style.boxShadow = 'none';
    });
  }

  function addHoverEffects() {
    document.querySelectorAll('.blogs-featured-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-4px)';
        card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'none';
      });
    });

    document.querySelectorAll('.blogs-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-2px)';
        card.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
        card.style.borderColor = 'rgba(255,92,0,0.2)';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'none';
        card.style.borderColor = 'transparent';
      });
    });
  }

  function hideBlogsPage() {
    const overlay = document.getElementById('blogs-page-overlay');
    if (overlay) {
      overlay.style.display = 'none';
    }
    currentSearch = '';
  }

  // Blog paths to hide from navigation
  const BLOG_PATHS = BLOGS.map(b => b.path);

  // Hide individual blog links from navigation
  function cleanupNavigation() {
    const nav = Array.from(document.querySelectorAll('nav')).find(
      n => n.textContent.includes('Pages') && n.textContent.includes('Home')
    );
    if (!nav) return;

    // Find and hide all blog links
    const allLinks = nav.querySelectorAll('a');
    allLinks.forEach(link => {
      const href = link.getAttribute('href') || '';
      const path = href.replace('#', '');
      
      // Hide if it's a blog path
      if (BLOG_PATHS.includes(path)) {
        link.style.display = 'none';
      }
    });

    console.log('Nav enhancer: Cleaned up navigation - hidden', BLOG_PATHS.length, 'blog links');
  }

  // Add Blogs link to navigation
  function addBlogsNavLink() {
    if (document.querySelector('a[href="#/blogs"]')) return;

    const nav = Array.from(document.querySelectorAll('nav')).find(
      n => n.textContent.includes('Pages') && n.textContent.includes('Home')
    );
    if (!nav) return;

    const toolsLink = nav.querySelector('a[href="#/tools"]');
    if (!toolsLink) return;

    const container = toolsLink.parentElement;
    if (!container) return;

    // Clone the tools link for the blogs link
    const blogsLink = toolsLink.cloneNode(true);
    blogsLink.href = '#/blogs';

    // Update text from "Creator Tools" to "Blogs"
    const walker = document.createTreeWalker(blogsLink, NodeFilter.SHOW_TEXT, null, false);
    while (walker.nextNode()) {
      if (walker.currentNode.textContent.includes('Creator Tools')) {
        walker.currentNode.textContent = 'Blogs';
      }
    }

    // Update badge from "New" to "10"
    const spans = blogsLink.querySelectorAll('span');
    spans.forEach(span => {
      if (span.textContent.trim() === 'New') {
        span.textContent = '10';
        span.style.background = 'rgba(255,92,0,0.15)';
        span.style.color = '#FF5C00';
      }
    });

    // Insert after tools link
    if (toolsLink.nextSibling) {
      container.insertBefore(blogsLink, toolsLink.nextSibling);
    } else {
      container.appendChild(blogsLink);
    }

    console.log('Nav enhancer: Blogs link added');
  }

  // Handle route changes
  function handleRoute() {
    const hash = window.location.hash;
    if (hash === '#/blogs' || hash.startsWith('#/blogs?')) {
      showBlogsPage();
    } else {
      hideBlogsPage();
    }
  }

  // Initialize
  function init() {
    let attempts = 0;
    const maxAttempts = 50;

    const interval = setInterval(() => {
      attempts++;

      const sidebar = document.getElementById('sidebar');
      const nav = Array.from(document.querySelectorAll('nav')).find(
        n => n.textContent.includes('Pages')
      );

      if (sidebar && nav) {
        clearInterval(interval);
        addBlogsNavLink();
        cleanupNavigation();
        handleRoute();
        console.log('Nav enhancer: Initialized');
      }

      if (attempts >= maxAttempts) {
        clearInterval(interval);
        console.log('Nav enhancer: Timed out');
      }
    }, 100);
  }

  // Start initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Listen for route changes
  window.addEventListener('hashchange', handleRoute);
  window.addEventListener('popstate', handleRoute);
})();
