/**
 * Meridian Group v2 — Main Entry Point
 * Orchestrates Three.js journey, GSAP scroll animations, and UI interactions.
 */

import { initJourney } from './journey.js'
import { initGlobe }   from './globe.js'
import { initScroll }  from './scroll.js'
import { initContact } from './contact.js'
import { initI18n }    from './i18n.js'

// ── GSAP SETUP ──────────────────────────────────────────────────────────────
gsap.registerPlugin(ScrollTrigger)

// ── LOADER ──────────────────────────────────────────────────────────────────
function runLoader(onComplete) {
  const fill = document.querySelector('.ld-fill')
  let progress = 0

  const interval = setInterval(() => {
    progress += Math.random() * 18
    if (progress >= 100) {
      progress = 100
      clearInterval(interval)
      setTimeout(() => {
        document.querySelector('#loader').classList.add('done')
        document.body.classList.remove('loading')
        onComplete()
      }, 500)
    }
    fill.style.width = progress + '%'
  }, 120)
}

// ── NAVIGATION ──────────────────────────────────────────────────────────────
function initNav() {
  const nav    = document.getElementById('nav')
  const burger = document.querySelector('.burger')
  const mMenu  = document.querySelector('.mobile-menu')
  const mClose = document.querySelector('.mobile-close')
  const mLinks = document.querySelectorAll('.mobile-nav a')

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60)
  }, { passive: true })

  burger.addEventListener('click', () => {
    mMenu.classList.add('open')
    mMenu.setAttribute('aria-hidden', 'false')
    burger.setAttribute('aria-expanded', 'true')
  })

  const closeMenu = () => {
    mMenu.classList.remove('open')
    mMenu.setAttribute('aria-hidden', 'true')
    burger.setAttribute('aria-expanded', 'false')
  }

  mClose.addEventListener('click', closeMenu)
  mLinks.forEach(l => l.addEventListener('click', closeMenu))

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'))
      if (!target) return
      e.preventDefault()
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  })
}

// ── LANGUAGE SWITCHING (delegated to i18n.js) ────────────────────────────────
function initLang() {
  initI18n()
}

// ── CURSOR ──────────────────────────────────────────────────────────────────
function initCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return // skip on touch

  const dot  = document.createElement('div')
  const ring = document.createElement('div')
  dot.className  = 'cursor-dot'
  ring.className = 'cursor-ring'
  document.body.appendChild(dot)
  document.body.appendChild(ring)

  let mx = 0, my = 0, rx = 0, ry = 0

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY
    dot.style.left  = mx - 3 + 'px'
    dot.style.top   = my - 3 + 'px'
  })

  // Ring lags behind
  function animateCursor() {
    rx += (mx - rx) * 0.12
    ry += (my - ry) * 0.12
    ring.style.left = rx - 20 + 'px'
    ring.style.top  = ry - 20 + 'px'
    requestAnimationFrame(animateCursor)
  }
  animateCursor()

  // Scale up on interactive elements
  document.querySelectorAll('a, button, .srv-card, .team-card, .tech-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.width  = '60px'
      ring.style.height = '60px'
      ring.style.borderColor = 'rgba(217,119,6,0.7)'
    })
    el.addEventListener('mouseleave', () => {
      ring.style.width  = '40px'
      ring.style.height = '40px'
      ring.style.borderColor = 'rgba(217,119,6,0.4)'
    })
  })
}

// ── BOOT ────────────────────────────────────────────────────────────────────
runLoader(() => {
  const canvas = document.getElementById('webgl')

  // Animate hero text in
  const heroTl = gsap.timeline({ delay: 0.1 })
  heroTl
    .to('.hero-tag',   { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
    .to('.hero-word',  { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1 }, '-=0.4')
    .to('.hero-sub',   { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
    .to('.hero-btns',  { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
    .to('.hero-scroll',{ opacity: 0.4, duration: 0.6 }, '-=0.2')

  try {
    initJourney(canvas)
  } catch (err) {
    console.error('3D journey failed:', err)
  }

  const globeEl = document.getElementById('presence-globe')
  if (globeEl) {
    try { initGlobe(globeEl) } catch (err) { console.error('Globe failed:', err) }
  }

  initScroll()
  initNav()
  initLang()
  initCursor()
  initContact()
})
