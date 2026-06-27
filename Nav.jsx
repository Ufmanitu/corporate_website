import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const links = [
  { href: '/services', label: 'Services' },
  { href: '/about',    label: 'About' },
  { href: '/work',     label: 'Work' },
  { href: '/clients',  label: 'Clients' },
  { href: '/contact',  label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 60) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile nav on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [router.pathname])

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`} id="nav">
        <Link href="/" className="nav-logo">Meridian<em>.</em></Link>
        <ul className="nav-links">
          {links.map(l => (
            <li key={l.href}>
              <Link href={l.href} className={router.pathname === l.href ? 'active' : ''}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/contact" className="nav-cta">Get in Touch</Link>
        <button className="nav-burger" onClick={() => setMobileOpen(true)}>
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile overlay */}
      <div className={`mobile-nav${mobileOpen ? ' open' : ''}`}>
        <button className="close-btn" onClick={() => setMobileOpen(false)}>✕</button>
        <Link href="/">Home</Link>
        {links.map(l => (
          <Link key={l.href} href={l.href} className={router.pathname === l.href ? 'active' : ''}>
            {l.label}
          </Link>
        ))}
      </div>
    </>
  )
}
