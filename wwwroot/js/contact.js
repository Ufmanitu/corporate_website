/**
 * Meridian Group v2 — Contact Form
 * Submits to Formspree. Replace FORMSPREE_ID with your form ID from formspree.io
 */

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mwvdnqvo'

export function initContact() {
  const form = document.getElementById('contactForm')
  if (!form) return

  const btnDefault = form.querySelector('.btn-default')
  const btnSending = form.querySelector('.btn-sending')
  const btnSent    = form.querySelector('.btn-sent')

  function setState(state) {
    btnDefault.classList.toggle('hidden', state !== 'idle')
    btnSending.classList.toggle('hidden', state !== 'sending')
    btnSent.classList.toggle('hidden',    state !== 'sent')
  }

  form.addEventListener('submit', async e => {
    e.preventDefault()

    const name    = form.querySelector('[name=name]').value.trim()
    const email   = form.querySelector('[name=email]').value.trim()
    const company = form.querySelector('[name=company]').value.trim()
    const message = form.querySelector('[name=message]').value.trim()

    if (!name || !email || !message) {
      form.querySelectorAll('[required]').forEach(el => {
        if (!el.value.trim()) {
          gsap.fromTo(el.closest('.form-group'), { x: -6 }, { x: 0, duration: 0.4, ease: 'elastic.out(1, 0.3)' })
        }
      })
      return
    }

    setState('sending')

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company, message }),
      })

      if (!res.ok) throw new Error('Submit failed')

      setState('sent')
      form.reset()

      if (window._contactDisperse) window._contactDisperse(true)
      setTimeout(() => window._contactDisperse && window._contactDisperse(false), 3000)
      setTimeout(() => setState('idle'), 4000)

    } catch {
      setState('idle')
      const btn = form.querySelector('.btn-submit')
      btn.style.background = '#ef4444'
      setTimeout(() => { btn.style.background = '' }, 1200)
    }
  })

  // Real-time email validation glow
  const emailInput = form.querySelector('[name=email]')
  emailInput.addEventListener('input', () => {
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)
    const line  = emailInput.closest('.form-group').querySelector('.form-line')
    line.style.background = valid ? 'rgba(79,110,247,0.5)' : ''
  })
}
