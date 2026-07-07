import { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import ShopNav from '../../components/ShopNav'
import CartDrawer from '../../components/CartDrawer'
import ProductCard from '../../components/ProductCard'
import ShopFooter from '../../components/ShopFooter'
import AdminBar from '../../components/AdminBar'
import Editable from '../../components/Editable'
import { AdminProvider } from '../../context/AdminContext'
import { PRODUCTS } from '../../lib/products'
import { getShopContent } from '../../lib/shopContent'

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

const whyItems = [
  { ico: '🚚', titleKey: 'why1Title', descKey: 'why1Desc' },
  { ico: '🛡️', titleKey: 'why2Title', descKey: 'why2Desc' },
  { ico: '↩️', titleKey: 'why3Title', descKey: 'why3Desc' },
  { ico: '💬', titleKey: 'why4Title', descKey: 'why4Desc' },
]

export default function ShopHome({ content }) {
  return (
    <AdminProvider page="shop_index">
      <ShopHomeContent content={content} />
    </AdminProvider>
  )
}

function ShopHomeContent({ content }) {
  const tk = content
  const c = key => content[key] ?? ''
  const categories = CATEGORY_KEYS.map(cat => ({ ...cat, count: PRODUCTS.filter(p => p.category === cat.key).length }))
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
    const timer = setTimeout(() => {
      wordsRef.current.forEach(el => el?.classList.add('up'))
      subRef.current?.classList.add('show')
      btnsRef.current?.classList.add('show')
      rightRef.current?.classList.add('show')
      setCardsActive(true)
    }, 200)
    return () => clearTimeout(timer)
  }, [])

  function useCountUp(target, duration = 1600, delay = 300, active = false) {
    const [val, setVal] = useState(0)
    useEffect(() => {
      if (!active) return
      const timer = setTimeout(() => {
        let start = null
        function step(ts) {
          if (!start) start = ts
          const p = Math.min((ts - start) / duration, 1)
          setVal(Math.round((1 - Math.pow(1 - p, 3)) * target))
          if (p < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      }, delay)
      return () => clearTimeout(timer)
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

  return (
    <>
      <Head>
        <title>NOUX — {tk.heroEyebrow}</title>
        <meta name="description" content={tk.heroSub} />
      </Head>

      <div className="announce-bar">{tk.announce}</div>

      <ShopNav />
      <CartDrawer />
      <AdminBar />

      {/* ── HERO ── */}
      <section id="hero" style={{ paddingTop: '2.25rem' }}>
        <canvas id="hero-canvas" ref={canvasRef} />
        <div className="hero-glow" />
        <div className="hero-glow2" />
        <div className="hero-inner">
          <div className="hero-left">
            <Editable tag="span" id="heroEyebrow" content={c('heroEyebrow')} className="shop-hero-eyebrow" />
            <h1 className="hero-h1">
              <span className="line"><span className="word" ref={el => wordsRef.current[0] = el}>{c('heroH1a')}</span></span>
              <span className="line"><span className="word" ref={el => wordsRef.current[1] = el}>{c('heroH1b')}</span></span>
            </h1>
            <p className="hero-sub" ref={subRef}>{c('heroSub')}</p>
            <div className="hero-btns" ref={btnsRef}>
              <Link href="/shop/products" className="btn-a">{tk.heroCta1}</Link>
              <Link href="/shop/collections" className="btn-b">{tk.heroCta2}</Link>
            </div>
          </div>
          <div className="hero-right" ref={rightRef}>
            <div className="hero-card"
              onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - .5; const y = (e.clientY - r.top) / r.height - .5; e.currentTarget.style.transform = `perspective(600px) rotateX(${-y*6}deg) rotateY(${x*6}deg) translateZ(4px)` }}
              onMouseLeave={e => { e.currentTarget.style.transform = '' }}>
              <div className="hc-label">{tk.hcRatingLabel}</div>
              <div className="hc-val">{(rating / 10).toFixed(1)}<span className="sfx">★</span></div>
              <div className="hc-desc">{tk.hcRatingDesc}</div>
            </div>
            <div className="hero-card"
              onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - .5; const y = (e.clientY - r.top) / r.height - .5; e.currentTarget.style.transform = `perspective(600px) rotateX(${-y*6}deg) rotateY(${x*6}deg) translateZ(4px)` }}
              onMouseLeave={e => { e.currentTarget.style.transform = '' }}>
              <div className="hc-label">{tk.hcCustomersLabel}</div>
              <div className="hc-val">{(customers / 1000).toFixed(0)}<span className="sfx">K+</span></div>
              <div className="hc-desc">{tk.hcCustomersDesc}</div>
            </div>
            <div className="hero-card"
              onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - .5; const y = (e.clientY - r.top) / r.height - .5; e.currentTarget.style.transform = `perspective(600px) rotateX(${-y*6}deg) rotateY(${x*6}deg) translateZ(4px)` }}
              onMouseLeave={e => { e.currentTarget.style.transform = '' }}>
              <div className="hc-label">{tk.hcReturnsLabel}</div>
              <div className="hc-val">30<span className="sfx">-day</span></div>
              <div className="hc-desc">{tk.hcReturnsDesc}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="cat-section">
        <div className="si">
          <div className="sh rev">
            <Editable tag="span" id="catTitle" content={c('catTitle')} className="eyebrow" />
            <Editable tag="h2" id="catSub" content={c('catSub')} className="sec-title" style={{ color: 'var(--text-d)' }} />
          </div>
          <div className="cat-grid">
            {categories.map((cat, i) => (
              <Link key={cat.key} href={`/shop/products?cat=${cat.key}`} className={`cat-tile rev d${i + 1}`}>
                <div className="cat-tile-ico">{cat.ico}</div>
                <div className="cat-tile-name">{tk[cat.tName]}</div>
                <div className="cat-tile-count">{cat.count} {tk.products}</div>
                <div className="cat-tile-arrow">{tk.viewProducts} {tk[cat.tName]} →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── BESTSELLERS ── */}
      <section className="sec-pad" style={{ background: 'var(--white)' }}>
        <div className="si">
          <div className="sh rev">
            <Editable tag="span" id="bestsellersEye" content={c('bestsellersEye')} className="eyebrow" />
            <Editable tag="h2" id="bestsellersTitle" content={c('bestsellersTitle')} className="sec-title" style={{ color: 'var(--text-d)' }} />
          </div>
          <div className="products-grid">
            {bestsellers.map((p, i) => (
              <div key={p.id} className={`rev d${i + 1}`}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
          <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
            <Link href="/shop/products" className="btn-dark">{tk.viewAll}</Link>
          </div>
        </div>
      </section>

      {/* ── WHY NOUX ── */}
      <section className="why-strip">
        <div className="si">
          <div className="sh c rev">
            <Editable tag="span" id="whyTitle" content={c('whyTitle')} className="eyebrow" />
            <Editable tag="h2" id="whySub" content={c('whySub')} className="sec-title" style={{ color: 'var(--white)' }} />
          </div>
          <div className="why-strip-grid">
            {whyItems.map((w, i) => (
              <div key={i} className={`why-box rev d${i + 1}`}>
                <div className="why-box-ico">{w.ico}</div>
                <Editable tag="div" id={w.titleKey} content={c(w.titleKey)} className="why-box-title" />
                <Editable tag="div" id={w.descKey} content={c(w.descKey)} className="why-box-desc" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEW ARRIVALS ── */}
      <section className="sec-pad" style={{ background: 'var(--cream)' }}>
        <div className="si">
          <div className="sh rev">
            <Editable tag="span" id="newArrivalsEye" content={c('newArrivalsEye')} className="eyebrow" />
            <Editable tag="h2" id="newArrivalsTitle" content={c('newArrivalsTitle')} className="sec-title" style={{ color: 'var(--text-d)' }} />
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
            <Editable tag="span" id="tstEye" content={c('tstEye')} className="eyebrow" />
            <Editable tag="h2" id="tstTitle" content={c('tstTitle')} className="sec-title" style={{ color: 'var(--white)' }} />
          </div>
          <div className="tst-track">
            {testimonials.map((tst, i) => (
              <div key={i} className={`tst-item-h${tstIdx === i ? ' on' : ''}`}>
                <p className="tst-q-h">"{tk[tst.qKey]}"</p>
                <div className="tst-author">
                  <div className="tst-avatar">{tst.init}</div>
                  <div>
                    <div className="tst-name">{tst.name}</div>
                    <div className="tst-role">{tk[tst.roleKey]}</div>
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
          <span className="eyebrow" style={{ color: 'rgba(255,255,255,.65)' }}>{tk.newsletterEye}</span>
          <Editable tag="h2" id="newsletterTitle" content={c('newsletterTitle')} />
          <Editable tag="p" id="newsletterSub" content={c('newsletterSub')} />
          <form className="nl-form" onSubmit={e => e.preventDefault()}>
            <input className="nl-input" type="email" placeholder={tk.newsletterPlaceholder} />
            <button className="nl-btn" type="submit">{tk.newsletterBtn}</button>
          </form>
        </div>
      </section>

      <ShopFooter />
    </>
  )
}

export async function getServerSideProps({ locale }) {
  const content = await getShopContent('index', locale)
  return { props: { content } }
}
