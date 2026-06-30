/**
 * Meridian Group v2 — GSAP ScrollTrigger Animations
 * Handles all HTML overlay reveal animations driven by scroll.
 */

export function initScroll() {
  // ── STAT COUNTER ──────────────────────────────────────────────────────────
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10)
    const obj = { val: 0 }
    gsap.to(obj, {
      val: target,
      duration: 1.8,
      ease: 'power3.out',
      onUpdate() { el.textContent = Math.round(obj.val) },
    })
  }

  // ── STAT SECTION ─────────────────────────────────────────────────────────
  gsap.utils.toArray('.stat-item').forEach((el, i) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      once: true,
      onEnter() {
        gsap.to(el, { opacity: 1, y: 0, duration: 0.8, delay: i * 0.1, ease: 'power3.out',
          onStart() { animateCounter(el.querySelector('.stat-num')) },
        })
      },
    })
  })

  // ── SERVICES ─────────────────────────────────────────────────────────────
  gsap.utils.toArray('.srv-card').forEach((el, i) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 82%',
      once: true,
      onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.8, delay: i * 0.12, ease: 'power3.out' }),
    })
  })

  // Gradient glow follows mouse on service cards
  document.querySelectorAll('.srv-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      card.querySelector('.srv-glow').style.background =
        `radial-gradient(circle at ${x}% ${y}%, rgba(79,110,247,0.1), transparent 70%)`
    })
  })

  // ── SECTION HEADINGS ─────────────────────────────────────────────────────
  gsap.utils.toArray('.s-head').forEach(el => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.from(el.querySelectorAll('.eyebrow, .s-title'), {
          opacity: 0, y: 40, stagger: 0.12, duration: 0.9, ease: 'power3.out',
        })
      },
    })
  })

  // ── PRESENCE OFFICES ─────────────────────────────────────────────────────
  gsap.utils.toArray('.office-item').forEach((el, i) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => gsap.to(el, { opacity: 1, x: 0, duration: 0.6, delay: i * 0.08, ease: 'power3.out' }),
    })
  })

  // ── BODY TEXT ────────────────────────────────────────────────────────────
  gsap.utils.toArray('.body-text').forEach(el => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => gsap.from(el, { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' }),
    })
  })

  // ── TECH GRID ────────────────────────────────────────────────────────────
  gsap.utils.toArray('.tech-item').forEach((el, i) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => gsap.to(el, {
        opacity: 1, y: 0, scale: 1,
        duration: 0.7, delay: i * 0.07, ease: 'back.out(1.4)',
      }),
    })
  })

  // Floating animation for tech items
  gsap.utils.toArray('.tech-item').forEach((el, i) => {
    gsap.to(el, {
      y: '+=8',
      duration: 2 + i * 0.3,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: i * 0.2,
    })
  })

  // ── TIMELINE ─────────────────────────────────────────────────────────────
  const tlProgress = document.querySelector('.tl-progress')
  if (tlProgress) {
    ScrollTrigger.create({
      trigger: '.tl-track',
      start: 'top 60%',
      end: 'bottom 40%',
      onUpdate: self => gsap.set(tlProgress, { height: (self.progress * 100) + '%' }),
    })
  }

  gsap.utils.toArray('.tl-item').forEach((el, i) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      once: true,
      onEnter: () => gsap.to(el, { opacity: 1, x: 0, duration: 0.7, delay: 0.1, ease: 'power3.out' }),
    })
  })

  // ── PROJECTS ─────────────────────────────────────────────────────────────
  gsap.utils.toArray('.proj-card').forEach((el, i) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      once: true,
      onEnter() {
        gsap.to(el, { opacity: 1, y: 0, duration: 0.9, delay: i * 0.1, ease: 'power3.out' })
        // Animate project stats counters
        el.querySelectorAll('.proj-n[data-target]').forEach(n => animateCounter(n))
      },
    })
  })

  // ── TEAM ─────────────────────────────────────────────────────────────────
  gsap.utils.toArray('.team-card').forEach((el, i) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 82%',
      once: true,
      onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.7, delay: i * 0.1, ease: 'power3.out' }),
    })
  })

  // Holographic scan loop on team cards
  document.querySelectorAll('.team-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card.querySelector('.holo-scan'), { opacity: 1, duration: 0.3 })
    })
    card.addEventListener('mouseleave', () => {
      gsap.to(card.querySelector('.holo-scan'), { opacity: 0.4, duration: 0.3 })
    })
  })

  // ── CONTACT FORM ─────────────────────────────────────────────────────────
  ScrollTrigger.create({
    trigger: '.contact-form',
    start: 'top 80%',
    once: true,
    onEnter: () => gsap.to('.contact-form', { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }),
  })

  ScrollTrigger.create({
    trigger: '.contact-text',
    start: 'top 80%',
    once: true,
    onEnter: () => {
      gsap.from('.contact-text .eyebrow, .contact-text .s-title, .contact-text .body-text, .contact-link, .contact-offices', {
        opacity: 0, y: 30, stagger: 0.1, duration: 0.8, ease: 'power3.out',
      })
    },
  })

  // Contact particles disperse when form is focused
  document.querySelectorAll('#contactForm input, #contactForm textarea').forEach(el => {
    el.addEventListener('focus',  () => window._contactDisperse && window._contactDisperse(true))
    el.addEventListener('blur',   () => window._contactDisperse && window._contactDisperse(false))
  })

  // ── FOOTER ───────────────────────────────────────────────────────────────
  ScrollTrigger.create({
    trigger: '.footer',
    start: 'top 90%',
    once: true,
    onEnter: () => gsap.from('.footer-brand, .fc', {
      opacity: 0, y: 30, stagger: 0.08, duration: 0.7, ease: 'power3.out',
    }),
  })

  // ── PRESENCE SECTION TEXT ────────────────────────────────────────────────
  ScrollTrigger.create({
    trigger: '.presence-text',
    start: 'top 80%',
    once: true,
    onEnter: () => gsap.from('.presence-text .eyebrow, .presence-text .s-title, .presence-text .body-text', {
      opacity: 0, y: 30, stagger: 0.12, duration: 0.9, ease: 'power3.out',
    }),
  })

  ScrollTrigger.create({
    trigger: '.presence-globe',
    start: 'top 80%',
    once: true,
    onEnter: () => gsap.from('.presence-globe', {
      opacity: 0, scale: 0.8, duration: 1.2, ease: 'power3.out',
    }),
  })
}
