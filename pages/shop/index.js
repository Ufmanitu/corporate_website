import { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import ShopNav from '../../components/ShopNav'
import CartDrawer from '../../components/CartDrawer'
import ProductCard from '../../components/ProductCard'
import ShopFooter from '../../components/ShopFooter'
import { PRODUCTS } from '../../lib/products'

const bestsellers = PRODUCTS.filter(p => p.isBestseller)

const categories = [
  { name: 'Audio', count: PRODUCTS.filter(p => p.category === 'Audio').length, ico: '🎧', desc: 'Headphones & earbuds' },
  { name: 'Workspace', count: PRODUCTS.filter(p => p.category === 'Workspace').length, ico: '🖥️', desc: 'Keyboards, stands & more' },
  { name: 'Charging', count: PRODUCTS.filter(p => p.category === 'Charging').length, ico: '⚡', desc: 'Fast & wireless charging' },
  { name: 'Storage', count: PRODUCTS.filter(p => p.category === 'Storage').length, ico: '💾', desc: 'Portable drives & SSDs' },
]

const testimonials = [
  { init: 'JM', q: 'The Pro Wireless Headphones changed how I work. Absolute silence during deep focus, effortless toggle back to calls. Worth every cent.', name: 'James M.', role: 'Software Engineer, Berlin' },
  { init: 'AK', q: 'I bought the laptop stand and keyboard together. My neck pain is gone and my desk looks like a proper setup for the first time. NOUX nailed it.', name: 'Ana K.', role: 'UI Designer, London' },
  { init: 'RB', q: 'The GaN charger replaced three separate bricks. Travels with me everywhere. Build quality is exceptional for the price.', name: 'Ravi B.', role: 'Product Manager, Singapore' },
]

const whyItems = [
  { ico: '🚚', title: 'Free 2-Day Shipping', desc: 'On all orders over $100. Free returns, always.' },
  { ico: '🛡️', title: '2-Year Warranty', desc: 'Every NOUX product is covered, no questions asked.' },
  { ico: '↩️', title: '30-Day Returns', desc: 'Not satisfied? Return it free within 30 days.' },
  { ico: '💬', title: '24/7 Support', desc: 'Real humans, not bots. Always here when you need us.' },
]

export default function Home() {
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

  return (
    <>
      <Head>
        <title>NOUX — Premium Tech Accessories</title>
        <meta name="description" content="Premium tech accessories engineered for focused professionals. Free 2-day shipping." />
      </Head>

      <div className="announce-bar">
        Free shipping on orders over $100 &nbsp;·&nbsp; Use code <strong>LAUNCH</strong> for 10% off
      </div>

      <ShopNav />
      <CartDrawer />

      {/* ── HERO ── */}
      <section id="hero" style={{ paddingTop: '2.25rem' }}>
        <canvas id="hero-canvas" ref={canvasRef} />
        <div className="hero-glow" />
        <div className="hero-glow2" />
        <div className="hero-inner">
          <div className="hero-left">
            <span className="shop-hero-eyebrow">Premium Tech Accessories</span>
            <h1 className="hero-h1">
              <span className="line"><span className="word" ref={el => wordsRef.current[0] = el}>Engineered</span></span>
              <span className="line"><span className="word" ref={el => wordsRef.current[1] = el}>for the way</span></span>
              <span className="line"><span className="word" ref={el => wordsRef.current[2] = el}>you work.</span></span>
            </h1>
            <p className="hero-sub" ref={subRef}>
              Premium accessories for focused professionals. Free 2-day shipping on every order.
            </p>
            <div className="hero-btns" ref={btnsRef}>
              <Link href="/shop/products" className="btn-a">Shop Now</Link>
              <Link href="/shop/products" className="btn-b">View Collections</Link>
            </div>
          </div>
          <div className="hero-right" ref={rightRef}>
            <div className="hero-card"
              onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - .5; const y = (e.clientY - r.top) / r.height - .5; e.currentTarget.style.transform = `perspective(600px) rotateX(${-y*6}deg) rotateY(${x*6}deg) translateZ(4px)` }}
              onMouseLeave={e => { e.currentTarget.style.transform = '' }}>
              <div className="hc-label">Customer Rating</div>
              <div className="hc-val">{(rating / 10).toFixed(1)}<span className="sfx">★</span></div>
              <div className="hc-desc">Based on 10,000+ reviews</div>
            </div>
            <div className="hero-card"
              onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - .5; const y = (e.clientY - r.top) / r.height - .5; e.currentTarget.style.transform = `perspective(600px) rotateX(${-y*6}deg) rotateY(${x*6}deg) translateZ(4px)` }}
              onMouseLeave={e => { e.currentTarget.style.transform = '' }}>
              <div className="hc-label">Happy Customers</div>
              <div className="hc-val">{(customers / 1000).toFixed(0)}<span className="sfx">K+</span></div>
              <div className="hc-desc">Worldwide and growing daily</div>
            </div>
            <div className="hero-card"
              onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - .5; const y = (e.clientY - r.top) / r.height - .5; e.currentTarget.style.transform = `perspective(600px) rotateX(${-y*6}deg) rotateY(${x*6}deg) translateZ(4px)` }}
              onMouseLeave={e => { e.currentTarget.style.transform = '' }}>
              <div className="hc-label">Free Returns</div>
              <div className="hc-val">30<span className="sfx">-day</span></div>
              <div className="hc-desc">No questions, hassle-free</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="cat-section">
        <div className="si">
          <div className="sh rev">
            <span className="eyebrow">Browse by Category</span>
            <h2 className="sec-title" style={{ color: 'var(--text-d)' }}>Everything for your setup.</h2>
          </div>
          <div className="cat-grid">
            {categories.map((cat, i) => (
              <Link key={cat.name} href={`/products?cat=${cat.name}`} className={`cat-tile rev d${i + 1}`}>
                <div className="cat-tile-ico">{cat.ico}</div>
                <div className="cat-tile-name">{cat.name}</div>
                <div className="cat-tile-count">{cat.count} products</div>
                <div className="cat-tile-arrow">Shop {cat.name} →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── BESTSELLERS ── */}
      <section className="sec-pad" style={{ background: 'var(--white)' }}>
        <div className="si">
          <div className="sh rev">
            <span className="eyebrow">Bestsellers</span>
            <h2 className="sec-title" style={{ color: 'var(--text-d)' }}>The favourites.</h2>
            <p className="sec-sub" style={{ color: 'var(--text-d)' }}>Products our customers keep coming back for.</p>
          </div>
          <div className="products-grid">
            {bestsellers.map((p, i) => (
              <div key={p.id} className={`rev d${i + 1}`}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
          <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
            <Link href="/shop/products" className="btn-dark">View All Products →</Link>
          </div>
        </div>
      </section>

      {/* ── WHY NOUX ── */}
      <section className="why-strip">
        <div className="si">
          <div className="sh c rev">
            <span className="eyebrow">Why NOUX</span>
            <h2 className="sec-title" style={{ color: 'var(--white)' }}>Built different. Backed properly.</h2>
          </div>
          <div className="why-strip-grid">
            {whyItems.map((w, i) => (
              <div key={w.title} className={`why-box rev d${i + 1}`}>
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
            <span className="eyebrow">New Arrivals</span>
            <h2 className="sec-title" style={{ color: 'var(--text-d)' }}>Just dropped.</h2>
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
            <span className="eyebrow">Customer Reviews</span>
            <h2 className="sec-title" style={{ color: 'var(--white)' }}>Real people, real setups.</h2>
          </div>
          <div className="tst-track">
            {testimonials.map((t, i) => (
              <div key={i} className={`tst-item-h${tstIdx === i ? ' on' : ''}`}>
                <p className="tst-q-h">"{t.q}"</p>
                <div className="tst-author">
                  <div className="tst-avatar">{t.init}</div>
                  <div>
                    <div className="tst-name">{t.name}</div>
                    <div className="tst-role">{t.role}</div>
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
          <span className="eyebrow" style={{ color: 'rgba(255,255,255,.65)' }}>Stay in the Loop</span>
          <h2>Join 50,000 customers.</h2>
          <p>New drops, exclusive deals, and setup inspiration. No spam, unsubscribe anytime.</p>
          <form className="nl-form" onSubmit={e => e.preventDefault()}>
            <input className="nl-input" type="email" placeholder="your@email.com" />
            <button className="nl-btn" type="submit">Subscribe</button>
          </form>
        </div>
      </section>

      <ShopFooter />
    </>
  )
}
