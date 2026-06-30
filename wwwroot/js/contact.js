/**
 * Meridian Group v2 — Contact Form
 * Handles form validation and API submission.
 */

export function initContact() {
  const form    = document.getElementById('contactForm')
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

    const data = {
      name:    form.querySelector('[name=name]').value.trim(),
      email:   form.querySelector('[name=email]').value.trim(),
      company: form.querySelector('[name=company]').value.trim(),
      message: form.querySelector('[name=message]').value.trim(),
    }

    if (!data.name || !data.email || !data.message) {
      // Shake invalid fields
      form.querySelectorAll('[required]').forEach(el => {
        if (!el.value.trim()) {
          gsap.fromTo(el.closest('.form-group'), { x: -6 }, { x: 0, duration: 0.4, ease: 'elastic.out(1, 0.3)' })
        }
      })
      return
    }

    setState('sending')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error('Server error')

      setState('sent')
      form.reset()

      // Success particle burst
      if (window._contactDisperse) window._contactDisperse(true)
      setTimeout(() => window._contactDisperse && window._contactDisperse(false), 3000)

      // Reset button after 4s
      setTimeout(() => setState('idle'), 4000)

    } catch {
      setState('idle')
      // Brief error color flash on button
      const btn = form.querySelector('.btn-submit')
      const orig = btn.style.background
      btn.style.background = '#ef4444'
      setTimeout(() => { btn.style.background = orig }, 1200)
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
