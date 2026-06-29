import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const navLinks = {
  en: [
    { href: '/services', label: 'Services' },
    { href: '/about',    label: 'About' },
    { href: '/work',     label: 'Work' },
    { href: '/clients',  label: 'Clients' },
    { href: '/contact',  label: 'Contact' },
  ],
  tr: [
    { href: '/services', label: 'Hizmetler' },
    { href: '/about',    label: 'Hakkımızda' },
    { href: '/work',     label: 'Çalışmalar' },
    { href: '/clients',  label: 'Müşteriler' },
    { href: '/contact',  label: 'İletişim' },
  ],
}

const cta = { en: 'Get in Touch', tr: 'İletişime Geçin' }
const homeLabel = { en: 'Home', tr: 'Ana Sayfa' }

export default function Nav() {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [langOpen, setLangOpen]     = useState(false)
  const router = useRouter()
  const { locale, pathname, query, asPath } = router
  const links = navLinks[locale] ?? navLinks.en

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 60) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [router.pathname])

  function switchLocale(l) {
    router.push({ pathname, query }, asPath, { locale: l })
    setLangOpen(false)
  }

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

        <div className="nav-right">
          <div className="lang-switch" onMouseLeave={() => setLangOpen(false)}>
            <button className="lang-btn" onClick={() => setLangOpen(o => !o)} aria-label="Switch language">
              {locale === 'tr' ? 'TR' : 'EN'}<span className="lang-arrow">▾</span>
            </button>
            {langOpen && (
              <div className="lang-menu">
                <div className="lang-menu-inner">
                  <button onClick={() => switchLocale('en')} className={locale === 'en' ? 'active' : ''}>English</button>
                  <button onClick={() => switchLocale('tr')} className={locale === 'tr' ? 'active' : ''}>Türkçe</button>
                </div>
              </div>
            )}
          </div>
          <Link href="/contact" className="nav-cta">{cta[locale] ?? cta.en}</Link>
        </div>

        <button className="nav-burger" onClick={() => setMobileOpen(true)}>
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-nav${mobileOpen ? ' open' : ''}`}>
        <button className="close-btn" onClick={() => setMobileOpen(false)}>✕</button>
        <Link href="/">{homeLabel[locale] ?? homeLabel.en}</Link>
        {links.map(l => (
          <Link key={l.href} href={l.href} className={router.pathname === l.href ? 'active' : ''}>
            {l.label}
          </Link>
        ))}
        <div className="mobile-lang">
          <button onClick={() => switchLocale('en')} className={locale === 'en' ? 'active' : ''}>EN</button>
          <span style={{ color: 'rgba(255,255,255,.3)' }}>/</span>
          <button onClick={() => switchLocale('tr')} className={locale === 'tr' ? 'active' : ''}>TR</button>
        </div>
      </div>
    </>
  )
}
