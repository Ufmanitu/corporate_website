import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCart } from '../context/CartContext'
import { useShopT } from '../lib/shopI18n'

export default function ShopNav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchVal, setSearchVal] = useState('')
  const [langOpen, setLangOpen] = useState(false)
  const router = useRouter()
  const { locale, pathname, query, asPath } = router
  const { cartCount, wishlist, setDrawerOpen } = useCart()
  const t = useShopT()

  const navLinks = [
    { href: '/shop/products', label: t.navShop },
    { href: '/shop/collections', label: t.navCollections },
    { href: '/shop/locations', label: t.navLocations },
    { href: '/shop/about', label: t.navAbout },
    { href: '/shop/contact', label: t.navContact },
  ]

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

  function handleSearch(e) {
    e.preventDefault()
    if (searchVal.trim()) {
      router.push(`/shop/products?q=${encodeURIComponent(searchVal.trim())}`)
      setSearchOpen(false)
      setSearchVal('')
    }
  }

  return (
    <>
      <nav className={`nav sn-nav${scrolled ? ' scrolled' : ''}`} id="nav">
        <Link href="/shop" className="nav-logo sn-logo">
          NOUX<em>·</em>
        </Link>

        <ul className="nav-links">
          {navLinks.map(l => (
            <li key={l.href}>
              <Link href={l.href} className={router.pathname === l.href ? 'active' : ''}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          <Link href="/" className="sn-switch-link">{t.navBack}</Link>

          <div className="lang-switch" onMouseLeave={() => setLangOpen(false)}>
            <button className="lang-btn" onClick={() => setLangOpen(o => !o)} aria-label="Switch language">
              {locale === 'tr' ? 'TR' : locale === 'hu' ? 'HU' : 'EN'}<span className="lang-arrow">▾</span>
            </button>
            {langOpen && (
              <div className="lang-menu">
                <div className="lang-menu-inner">
                  <button onClick={() => switchLocale('en')} className={locale === 'en' ? 'active' : ''}>English</button>
                  <button onClick={() => switchLocale('tr')} className={locale === 'tr' ? 'active' : ''}>Türkçe</button>
                  <button onClick={() => switchLocale('hu')} className={locale === 'hu' ? 'active' : ''}>Magyar</button>
                </div>
              </div>
            )}
          </div>

          {searchOpen ? (
            <form onSubmit={handleSearch} className="sn-search-form">
              <input
                autoFocus
                className="sn-search-input"
                type="text"
                placeholder={t.navSearch}
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
                onBlur={() => { if (!searchVal) setSearchOpen(false) }}
              />
              <button type="submit" className="sn-icon-btn" aria-label="Submit search">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
            </form>
          ) : (
            <button className="sn-icon-btn" onClick={() => setSearchOpen(true)} aria-label="Search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          )}

          <Link href="/shop/wishlist" className="sn-icon-btn" aria-label="Wishlist" style={{ position: 'relative' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill={wishlist.length > 0 ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {wishlist.length > 0 && (
              <span className="sn-cart-badge">{wishlist.length}</span>
            )}
          </Link>

          <button className="sn-cart-btn" onClick={() => setDrawerOpen(true)} aria-label={`${t.navCart} — ${cartCount}`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {cartCount > 0 && <span className="sn-cart-badge">{cartCount}</span>}
          </button>
        </div>

        <button className={`nav-burger${mobileOpen ? ' open' : ''}`} onClick={() => setMobileOpen(o => !o)}>
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-nav${mobileOpen ? ' open' : ''}`}>
        <button className="close-btn" onClick={() => setMobileOpen(false)}>✕</button>
        <Link href="/shop">NOUX Home</Link>
        {navLinks.map(l => (
          <Link key={l.href} href={l.href} className={router.pathname === l.href ? 'active' : ''}>
            {l.label}
          </Link>
        ))}
        <Link href="/" style={{ fontSize: '1rem', color: 'rgba(255,255,255,.4)', marginTop: '1rem' }}>{t.navBack}</Link>
        <button
          onClick={() => { setMobileOpen(false); setDrawerOpen(true) }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--ff-h)', fontSize: '2rem', color: '#fff', fontWeight: 700 }}
        >
          {t.navCart} {cartCount > 0 && `(${cartCount})`}
        </button>
        <div className="mobile-lang">
          <button onClick={() => switchLocale('en')} className={locale === 'en' ? 'active' : ''}>EN</button>
          <span style={{ color: 'rgba(255,255,255,.3)' }}>/</span>
          <button onClick={() => switchLocale('tr')} className={locale === 'tr' ? 'active' : ''}>TR</button>
          <span style={{ color: 'rgba(255,255,255,.3)' }}>/</span>
          <button onClick={() => switchLocale('hu')} className={locale === 'hu' ? 'active' : ''}>HU</button>
        </div>
      </div>
    </>
  )
}
