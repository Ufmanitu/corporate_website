import { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import ShopNav from '../../components/ShopNav'
import CartDrawer from '../../components/CartDrawer'
import ProductCard from '../../components/ProductCard'
import ShopFooter from '../../components/ShopFooter'
import { PRODUCTS } from '../../lib/products'
import { useShopT } from '../../lib/shopI18n'

const bestsellers = PRODUCTS.filter(p => p.isBestseller)

const CATEGORY_KEYS = [
  { key: 'Audio', ico: '🎧', tName: 'audio', tDesc: 'catAudioDesc' },
  { key: 'Workspace', ico: '🖥️', tName: 'workspace', tDesc: 'catWorkspaceDesc' },
  { key: 'Charging', ico: '⚡', tName: 'charging', tDesc: 'catChargingDesc' },
  { key: 'Storage', ico: '💾', tName: 'storage', tDesc: 'catStorageDesc' },
]

const testimonials = [
  { init: 'JM', qKey: 'tst1q', name: 'James M.', roleKey: 'tst1role' },
  { init: 'AK', qKey: 'tst2q', name: 'Ana K.', roleKey: 'tst2role' },
  { init: 'RB', qKey: 'tst3q', name: 'Ravi B.', roleKey: 'tst3role' },
]

export default function Home() {
  const t = useShopT()
  const categories = CATEGORY_KEYS.map(c => ({ ...c, count: PRODUCTS.filter(p => p.category === c.key).length }))
  const canvasRef = useRef(null)

  useEffect(() => {
    const cv = canvasRef.current
    if (!cv) return
    const cx = cv.getContext('2d')
    let pts = [], raf

    function init() {
      cv.width = cv.offsetWidth
      cv.height = cv.offsetHeight
      const n = Math.floor(cv.width * cv.height / 22000)
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * cv.width,
        y: Math.random() * cv.height,
        vx: (Math.random() - .5) * .35,
        vy: (Math.random() - .5) * .35,
        r: Math.random() * 1.4 + .4,
      }))
    }

    function draw() {
      cx.clearRect(0, 0, cv.width, cv.height)
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = cv.width
        if (p.x > cv.width) p.x = 0
        if (p.y < 0) p.y = cv.height
        if (p.y > cv.height) p.y = 0
        cx.beginPath()
        cx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        cx.fillStyle = 'rgba(138,164,190,.55)'
        cx.fill()
      })
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 130) {
            cx.beginPath()
            cx.moveTo(pts[i].x, pts[i].y)
            cx.lineTo(pts[j].x, pts[j].y)
            cx.strokeStyle = `rgba(138,164,190,${(1 - d / 130) * .18})`
            cx.lineWidth = .6
            cx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }

    init(); draw()
    let rz
    const onResize = () => { clearTimeout(rz); rz = setTimeout(() => { cancelAnimationFrame(raf); init(); draw() }, 200) }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
  }, [])

  const wordsRef = useRef([])
  const subRef = useRef(null)
  const btnsRef = useRef(null)
  const rightRef = useRef(null)
  const [cardsActive, setCardsActive] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => {
      wordsRef.current.forEach(el => el?.classList.add('up'))
      subRef.current?.classList.add('show')
      btnsRef.current?.classList.add('show')
      rightRef.current?.classList.add('show')
      setCardsActive(true)
    }, 200)
    return () => clearTimeout(t)
  }, [])

  function useCountUp(target, duration = 1600, delay = 300, active = false) {
    const [val, setVal] = useState(0)
    useEffect(() => {
      if (!active) return
      const t = setTimeout(() => {
        let start = null
        function step(ts) {
          if (!start) start = ts
          const p = Math.min((ts - start) / duration, 1)
          setVal(Math.round((1 - Math.pow(1 - p, 3)) * target))
          if (p < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      }, delay)
      return () => clearTimeout(t)
    }, [target, duration, delay, active])
    return val
  }

  const customers = useCountUp(50000, 1800, 300, cardsActive)
  const rating    = useCountUp(49,    1600, 300, cardsActive)

  const [tstIdx, setTstIdx] = useState(0)
  const tstTimer = useRef(null)
  function goTo(i) {
    setTstIdx(i)
    clearInterval(tstTimer.current)
    tstTimer.current = setInterval(() => setTstIdx(x => (x + 1) % testimonials.length), 5200)
  }
  useEffect(() => {
    tstTimer.current = setInterval(() => setTstIdx(x => (x + 1) % testimonials.length), 5200)
    return () => clearInterval(tstTimer.current)
  }, [])

  const whyItems = [
    { ico: '🚚', title: t.why1Title, desc: t.why1Desc },
    { ico: '🛡️', title: t.why2Title, desc: t.why2Desc },
    { ico: '↩️', title: t.why3Title, desc: t.why3Desc },
    { ico: '💬', title: t.why4Title, desc: t.why4Desc },
  ]

  return (
    <>
      <Head>
        <title>NOUX — {t.heroEyebrow}</title>
        <meta name="description" content={t.heroSub} />
      </Head>

      <div className="announce-bar">{t.announce}</div>

      <ShopNav />
      <CartDrawer />

      {/* ── HERO ── */}
      <section id="hero" style={{ paddingTop: '2.25rem' }}>
        <canvas id="hero-canvas" ref={canvasRef} />
        <div className="hero-glow" />
        <div className="hero-glow2" />
        <div className="hero-inner">
          <div className="hero-left">
            <span className="shop-hero-eyebrow">{t.heroEyebrow}</span>
            <h1 className="hero-h1">
              <span className="line"><span className="word" ref={el => wordsRef.current[0] = el}>{t.heroH1a}</span></span>
              <span className="line"><span className="word" ref={el => wordsRef.current[1] = el}>{t.heroH1b}</span></span>
            </h1>
            <p className="hero-sub" ref={subRef}>{t.heroSub}</p>
            <div className="hero-btns" ref={btnsRef}>
              <Link href="/shop/products" className="btn-a">{t.heroCta1}</Link>
              <Link href="/shop/collections" className="btn-b">{t.heroCta2}</Link>
            </div>
          </div>
          <div className="hero-right" ref={rightRef}>
            <div className="hero-card"
              onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - .5; const y = (e.clientY - r.top) / r.height - .5; e.currentTarget.style.transform = `perspective(600px) rotateX(${-y*6}deg) rotateY(${x*6}deg) translateZ(4px)` }}
              onMouseLeave={e => { e.currentTarget.style.transform = '' }}>
              <div className="hc-label">{t.hcRatingLabel}</div>
              <div className="hc-val">{(rating / 10).toFixed(1)}<span className="sfx">★</span></div>
              <div className="hc-desc">{t.hcRatingDesc}</div>
            </div>
            <div className="hero-card"
              onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - .5; const y = (e.clientY - r.top) / r.height - .5; e.currentTarget.style.transform = `perspective(600px) rotateX(${-y*6}deg) rotateY(${x*6}deg) translateZ(4px)` }}
              onMouseLeave={e => { e.currentTarget.style.transform = '' }}>
              <div className="hc-label">{t.hcCustomersLabel}</div>
              <div className="hc-val">{(customers / 1000).toFixed(0)}<span className="sfx">K+</span></div>
              <div className="hc-desc">{t.hcCustomersDesc}</div>
            </div>
            <div className="hero-card"
              onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - .5; const y = (e.clientY - r.top) / r.height - .5; e.currentTarget.style.transform = `perspective(600px) rotateX(${-y*6}deg) rotateY(${x*6}deg) translateZ(4px)` }}
              onMouseLeave={e => { e.currentTarget.style.transform = '' }}>
              <div className="hc-label">{t.hcReturnsLabel}</div>
              <div className="hc-val">30<span className="sfx">-day</span></div>
              <div className="hc-desc">{t.hcReturnsDesc}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="cat-section">
        <div className="si">
          <div className="sh rev">
            <span className="eyebrow">{t.catTitle}</span>
            <h2 className="sec-title" style={{ color: 'var(--text-d)' }}>{t.catSub}</h2>
          </div>
          <div className="cat-grid">
            {categories.map((cat, i) => (
              <Link key={cat.key} href={`/shop/products?cat=${cat.key}`} className={`cat-tile rev d${i + 1}`}>
                <div className="cat-tile-ico">{cat.ico}</div>
                <div className="cat-tile-name">{t[cat.tName]}</div>
                <div className="cat-tile-count">{cat.count} {t.products}</div>
                <div className="cat-tile-arrow">{t.viewProducts} {t[cat.tName]} →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── BESTSELLERS ── */}
      <section className="sec-pad" style={{ background: 'var(--white)' }}>
        <div className="si">
          <div className="sh rev">
            <span className="eyebrow">{t.bestsellersEye}</span>
            <h2 className="sec-title" style={{ color: 'var(--text-d)' }}>{t.bestsellersTitle}</h2>
          </div>
          <div className="products-grid">
            {bestsellers.map((p, i) => (
              <div key={p.id} className={`rev d${i + 1}`}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
          <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
            <Link href="/shop/products" className="btn-dark">{t.viewAll}</Link>
          </div>
        </div>
      </section>

      {/* ── WHY NOUX ── */}
      <section className="why-strip">
        <div className="si">
          <div className="sh c rev">
            <span className="eyebrow">{t.whyTitle}</span>
            <h2 className="sec-title" style={{ color: 'var(--white)' }}>{t.whySub}</h2>
          </div>
          <div className="why-strip-grid">
            {whyItems.map((w, i) => (
              <div key={i} className={`why-box rev d${i + 1}`}>
                <div className="why-box-ico">{w.ico}</div>
                <div className="why-box-title">{w.title}</div>
                <div className="why-box-desc">{w.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEW ARRIVALS ── */}
      <section className="sec-pad" style={{ background: 'var(--cream)' }}>
        <div className="si">
          <div className="sh rev">
            <span className="eyebrow">{t.newArrivalsEye}</span>
            <h2 className="sec-title" style={{ color: 'var(--text-d)' }}>{t.newArrivalsTitle}</h2>
          </div>
          <div className="products-grid">
            {PRODUCTS.filter(p => p.isNew).map((p, i) => (
              <div key={p.id} className={`rev d${i + 1}`}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials">
        <div className="tst-inner">
          <div className="sh c rev" style={{ marginBottom: '3rem' }}>
            <span className="eyebrow">{t.tstEye}</span>
            <h2 className="sec-title" style={{ color: 'var(--white)' }}>{t.tstTitle}</h2>
          </div>
          <div className="tst-track">
            {testimonials.map((tst, i) => (
              <div key={i} className={`tst-item-h${tstIdx === i ? ' on' : ''}`}>
                <p className="tst-q-h">"{t[tst.qKey]}"</p>
                <div className="tst-author">
                  <div className="tst-avatar">{tst.init}</div>
                  <div>
                    <div className="tst-name">{tst.name}</div>
                    <div className="tst-role">{t[tst.roleKey]}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="tst-dots">
            {testimonials.map((_, i) => (
              <div key={i} className={`tdot${tstIdx === i ? ' on' : ''}`} onClick={() => goTo(i)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="newsletter-sec">
        <div className="newsletter-inner">
          <span className="eyebrow" style={{ color: 'rgba(255,255,255,.65)' }}>{t.newsletterEye}</span>
          <h2>{t.newsletterTitle}</h2>
          <p>{t.newsletterSub}</p>
          <form className="nl-form" onSubmit={e => e.preventDefault()}>
            <input className="nl-input" type="email" placeholder={t.newsletterPlaceholder} />
            <button className="nl-btn" type="submit">{t.newsletterBtn}</button>
          </form>
        </div>
      </section>

      <ShopFooter />
    </>
  )
}
