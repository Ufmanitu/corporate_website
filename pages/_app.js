import { useEffect } from 'react'
import { useRouter } from 'next/router'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  const router = useRouter()

  // Re-run scroll reveals after each page navigation
  useEffect(() => {
    function initReveals() {
      const obs = new IntersectionObserver(
        entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis') }),
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      )
      document.querySelectorAll('.rev').forEach(el => {
        el.classList.remove('vis') // reset on nav
        obs.observe(el)
      })
      return () => obs.disconnect()
    }

    const cleanup = initReveals()
    router.events.on('routeChangeComplete', initReveals)
    return () => {
      cleanup?.()
      router.events.off('routeChangeComplete', initReveals)
    }
  }, [router])

  return <Component {...pageProps} />
}
