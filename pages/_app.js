import { useEffect } from 'react'
import { useRouter } from 'next/router'
import '../styles/globals.css'
import '../styles/shop.css'
import { CartProvider } from '../context/CartContext'

export default function App({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    function initReveals() {
      const obs = new IntersectionObserver(
        entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis') }),
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      )
      document.querySelectorAll('.rev').forEach(el => {
        el.classList.remove('vis')
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

  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  )
}
