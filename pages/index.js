import { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import AdminBar from '../components/AdminBar'
import Editable from '../components/Editable'
import { AdminProvider } from '../context/AdminContext'
import { getPageContent } from '../lib/content'

export default function Home({ content }) {
  return (
    <AdminProvider page="home">
      <HomeContent content={content} />
    </AdminProvider>
  )
}

function HomeContent({ content }) {
  const c = (key, fallback = '') => content[key] ?? fallback

  // Canvas particle network
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

  // Hero entrance animation
  const wordsRef = useRef([])
  const subRef   = useRef(null)
  const btnsRef  = useRef(null)
  const rightRef = useRef(null)
  useEffect(() => {
    const t = setTimeout(() => {
      wordsRef.current.forEach(el => el?.classList.add('up'))
      subRef.current?.classList.add('show')
      btnsRef.current?.classList.add('show')
      rightRef.current?.classList.add('show')
    }, 200)
    return () => clearTimeout(t)
  }, [])

  // Count-up for hero stat cards — starts after a short delay so it's always visible
  function useCountUp(target, duration = 1600, delay = 350) {
    const [val, setVal] = useState(0)
    useEffect(() => {
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
    }, [target, duration, delay])
    return val
  }

  const clients   = useCountUp(200)
  const retention = useCountUp(97)
  const value4    = useCountUp(4)

  // Testimonial carousel
  const [tstIdx, setTstIdx] = useState(0)
  const tstTimer = useRef(null)
  const testimonials = [
    { q: c('tst1-q', "Meridian didn't just advise us — they transformed how we think about strategy entirely."), name: c('tst1-n', 'Sarah Chen'), role: c('tst1-r', 'CEO, Apex Financial') },
    { q: c('tst2-q', 'The depth of insight and the speed of execution were remarkable. They had a practical recommendation on the table within a week.'), name: c('tst2-n', 'Marcus Hoffmann'), role: c('tst2-r', 'CTO, Nordvale Health') },
    { q: c('tst3-q', 'Working with Meridian was the single best decision we made last year. Full stop.'), name: c('tst3-n', 'Amara Diallo'), role: c('tst3-r', 'COO, Sienna Logistics') },
  ]
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
        <title>Meridian Group — Strategy & Technology Consulting</title>
        <meta name="description" content="We help ambitious organizations navigate complexity and build lasting advantage." />
      </Head>

      <Nav />
      <AdminBar />

      {/* ── HERO ── */}
      <section id="hero">
        <canvas id="hero-canvas" ref={canvasRef} />
        <div className="hero-glow" />
        <div className="hero-glow2" />
        <div className="hero-inner">
          <div className="hero-left">
            <Editable tag="span" id="hero-eye" content={c('hero-eye', 'Global Strategy & Technology Consultancy')} className="hero-eyebrow" />
            <h1 className="hero-h1">
              <span className="line"><span className="word" ref={el => wordsRef.current[0] = el}><Editable tag="span" id="hero-l1" content={c('hero-l1', 'Navigate')} /></span></span>
              <span className="line"><span className="word" ref={el => wordsRef.current[1] = el}><Editable tag="span" id="hero-l2" content={c('hero-l2', "What's")} /></span></span>
              <span className="line"><span className="word" ref={el => wordsRef.current[2] = el}><Editable tag="span" id="hero-l3" content={c('hero-l3', 'Next.')} /></span></span>
            </h1>
            <Editable tag="p" id="hero-sub" content={c('hero-sub', 'We help ambitious organizations define clear strategy, harness technology, and execute with conviction.')} className="hero-sub" ref={subRef} />
            <div className="hero-btns" ref={btnsRef}>
              <Link href="/work" className="btn-a"><Editable tag="span" id="hero-cta1" content={c('hero-cta1', 'Explore Our Work')} /></Link>
              <Link href="/contact" className="btn-b"><Editable tag="span" id="hero-cta2" content={c('hero-cta2', 'Schedule a Call')} /></Link>
            </div>
          </div>
          <div className="hero-right" ref={rightRef}>
            <div className="hero-card" style={{ transform: '' }}
              onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - .5; const y = (e.clientY - r.top) / r.height - .5; e.currentTarget.style.transform = `perspective(600px) rotateX(${-y*6}deg) rotateY(${x*6}deg) translateZ(4px)` }}
              onMouseLeave={e => { e.currentTarget.style.transform = '' }}>
              <Editable tag="div" id="hc1-label" content={c('hc1-label', 'Clients served globally')} className="hc-label" />
              <div className="hc-val">{clients}<span className="sfx">{c('hc1-sfx', '+')}</span></div>
              <Editable tag="div" id="hc1-desc" content={c('hc1-desc', 'Across 15 countries and 6 industries')} className="hc-desc" />
            </div>
            <div className="hero-card"
              onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - .5; const y = (e.clientY - r.top) / r.height - .5; e.currentTarget.style.transform = `perspective(600px) rotateX(${-y*6}deg) rotateY(${x*6}deg) translateZ(4px)` }}
              onMouseLeave={e => { e.currentTarget.style.transform = '' }}>
              <Editable tag="div" id="hc2-label" content={c('hc2-label', 'Value created for clients')} className="hc-label" />
              <div className="hc-val"><span className="sfx">{c('hc2-pre', '$')}</span>{value4}<span className="sfx">{c('hc2-sfx', '.2B')}</span></div>
              <Editable tag="div" id="hc2-desc" content={c('hc2-desc', 'Measurable impact since 2008')} className="hc-desc" />
            </div>
            <div className="hero-card"
              onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - .5; const y = (e.clientY - r.top) / r.height - .5; e.currentTarget.style.transform = `perspective(600px) rotateX(${-y*6}deg) rotateY(${x*6}deg) translateZ(4px)` }}
              onMouseLeave={e => { e.currentTarget.style.transform = '' }}>
              <Editable tag="div" id="hc3-label" content={c('hc3-label', 'Client retention rate')} className="hc-label" />
              <div className="hc-val">{retention}<span className="sfx">{c('hc3-sfx', '%')}</span></div>
              <Editable tag="div" id="hc3-desc" content={c('hc3-desc', 'Year-over-year since founding')} className="hc-desc" />
            </div>
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="ticker">
        <div className="ticker-track">
          {['Apex Financial','Nordvale Health','Sienna Logistics','Vantage Capital','Elara Technologies','Crestwood Energy','Halston Group','Orion Pharma',
            'Apex Financial','Nordvale Health','Sienna Logistics','Vantage Capital','Elara Technologies','Crestwood Energy','Halston Group','Orion Pharma'].map((n, i) => (
            <span key={i} className="ticker-item">{n}<span className="ticker-sep" /></span>
          ))}
        </div>
      </div>

      {/* ── SERVICES ── */}
      <section className="sec-pad" style={{ background: 'var(--cream)' }}>
        <div className="si">
          <div className="sh rev">
            <Editable tag="span" id="srv-eye"   content={c('srv-eye', 'What We Do')} className="eyebrow" />
            <Editable tag="h2"   id="srv-title" content={c('srv-title', 'Built for complexity.<br>Designed for results.')} className="sec-title" style={{ color: 'var(--text-d)' }} />
            <Editable tag="p"    id="srv-sub"   content={c('srv-sub', 'Six integrated practices that work as one.')} className="sec-sub" style={{ color: 'var(--text-d)' }} />
          </div>
          <div className="srv-grid">
            {[
              { ico: '◈', t: 'srv1-t', d: 'srv1-d', dt: 'Strategy & Transformation', dd: 'Defining clear, actionable paths forward in environments of uncertainty.' },
              { ico: '⬡', t: 'srv2-t', d: 'srv2-d', dt: 'Technology Advisory',        dd: 'Bridging business vision with technical reality.' },
              { ico: '◇', t: 'srv3-t', d: 'srv3-d', dt: 'Digital Innovation',         dd: 'Building the products and platforms of tomorrow — faster.' },
              { ico: '▽', t: 'srv4-t', d: 'srv4-d', dt: 'Financial Consulting',       dd: 'Unlocking hidden value through intelligent financial strategy.' },
              { ico: '⊞', t: 'srv5-t', d: 'srv5-d', dt: 'Operations Excellence',      dd: 'Streamlining what slows you down.' },
              { ico: '○', t: 'srv6-t', d: 'srv6-d', dt: 'Risk & Compliance',          dd: 'Navigating regulatory complexity with confidence.' },
            ].map((s, i) => (
              <div key={i} className={`srv-card rev d${i % 3 + 1}`}>
                <div className="srv-ico">{s.ico}</div>
                <Editable tag="h3" id={s.t} content={c(s.t, s.dt)} />
                <Editable tag="p"  id={s.d} content={c(s.d, s.dd)} />
                <Link href="/services" className="srv-more">Learn more →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="sec-pad" style={{ background: 'var(--dark)' }}>
        <div className="si">
          <div className="sh c rev">
            <Editable tag="span" id="stats-eye"   content={c('stats-eye', 'By the Numbers')} className="eyebrow" />
            <Editable tag="h2"   id="stats-title" content={c('stats-title', 'Impact you can measure.')} className="sec-title" style={{ color: 'var(--white)' }} />
          </div>
          <div className="stats-grid">
            <div className="stat-box rev d1" ref={clientsRef}>
              <div className="stat-num">{clients}<span className="sfx">+</span></div>
              <Editable tag="div" id="st1-l" content={c('st1-l', 'Clients Served')} className="stat-lbl" />
            </div>
            <div className="stat-box rev d2" ref={countriesRef}>
              <div className="stat-num">{countries}</div>
              <Editable tag="div" id="st2-l" content={c('st2-l', 'Countries Active')} className="stat-lbl" />
            </div>
            <div className="stat-box rev d3" ref={value4Ref}>
              <div className="stat-num"><span className="sfx">$</span>{value4}<span className="sfx">.2B</span></div>
              <Editable tag="div" id="st3-l" content={c('st3-l', 'Value Created')} className="stat-lbl" />
            </div>
            <div className="stat-box rev d4" ref={retentionRef}>
              <div className="stat-num">{retention}<span className="sfx">%</span></div>
              <Editable tag="div" id="st4-l" content={c('st4-l', 'Client Retention')} className="stat-lbl" />
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="sec-pad" style={{ background: 'var(--white)' }}>
        <div className="si">
          <div className="about-grid">
            <div className="about-img-wrap rev">
              <div className="about-img-bg">
                <svg viewBox="0 0 80 80" fill="none"><rect x="10" y="10" width="60" height="60" rx="8" stroke="#0B1929" strokeWidth="3"/><path d="M10 30h60M30 10v60" stroke="#0B1929" strokeWidth="2"/><circle cx="40" cy="40" r="10" stroke="#0B1929" strokeWidth="2.5"/></svg>
              </div>
              <div className="about-badge">
                <span className="ab-num">16</span>
                <span className="ab-txt">Years of experience</span>
              </div>
            </div>
            <div className="about-text rev d2">
              <Editable tag="span" id="about-eye"   content={c('about-eye', 'Who We Are')} className="eyebrow" />
              <Editable tag="h2"   id="about-title" content={c('about-title', 'Strategy is only as good as the people who execute it.')} className="sec-title" style={{ color: 'var(--text-d)' }} />
              <Editable tag="p"    id="about-p1"    content={c('about-p1', "Founded in 2008, Meridian Group has guided Fortune 500 companies through their most complex transformations. We're not a firm that hands over a report and disappears — we stay in the room until the work is done.")} />
              <Editable tag="p"    id="about-p2"    content={c('about-p2', 'Our teams combine deep industry expertise with cutting-edge analytical capabilities.')} />
              <ul className="about-list">
                {['Offices in London, New York, Singapore, and Dubai','450+ consultants across 12 disciplines','FT Global Consulting Firm of the Year, 2022 & 2023','B Corp certified since 2019'].map((li, i) => (
                  <li key={i}>{li}</li>
                ))}
              </ul>
              <div><Link href="/about" className="btn-a">Learn About Us</Link></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WORK ── */}
      <section className="sec-pad" style={{ background: 'var(--cream)' }}>
        <div className="si">
          <div className="sh rev">
            <Editable tag="span" id="work-eye"   content={c('work-eye', 'Selected Work')} className="eyebrow" />
            <Editable tag="h2"   id="work-title" content={c('work-title', "Results we're proud of.")} className="sec-title" style={{ color: 'var(--text-d)' }} />
            <Editable tag="p"    id="work-sub"   content={c('work-sub', 'Three examples from hundreds of engagements.')} className="sec-sub" style={{ color: 'var(--text-d)' }} />
          </div>
          <div className="work-grid">
            {[
              { tag: 'Banking · Transformation', cat: 'Apex Financial',   t: 'Core banking digital overhaul',       d: 'Redesigned the entire technology infrastructure of a tier-1 bank — from legacy mainframes to cloud-native microservices — in under 18 months.', res: '40% operational efficiency gain' },
              { tag: 'Healthcare · Operations',  cat: 'Nordvale Health',  t: 'Patient journey optimization',        d: 'Mapped and redesigned the end-to-end care experience across 50 hospitals, reducing wait times and increasing patient satisfaction scores.', res: '€2.1B in value unlocked' },
              { tag: 'Logistics · AI',           cat: 'Sienna Logistics', t: 'AI-powered supply chain reinvention', d: 'Introduced machine learning at every node in a global distribution network — demand forecasting, routing optimization, and real-time anomaly detection.', res: '3× throughput increase' },
            ].map((w, i) => (
              <div key={i} className={`work-card rev d${i + 1}`}>
                <div className="work-img"><span className="work-tag">{w.tag}</span></div>
                <div className="work-body">
                  <div className="work-cat">{w.cat}</div>
                  <h3>{w.t}</h3>
                  <p>{w.d}</p>
                  <span className="work-result">{w.res}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
            <Link href="/work" className="btn-dark">View All Case Studies →</Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials">
        <div className="tst-inner">
          <div className="sh c rev" style={{ marginBottom: '3rem' }}>
            <Editable tag="span" id="tst-eye"   content={c('tst-eye', 'Client Voices')} className="eyebrow" />
            <Editable tag="h2"   id="tst-title" content={c('tst-title', 'Straight from the people we work with.')} className="sec-title" style={{ color: 'var(--white)' }} />
          </div>
          <div className="tst-track">
            {testimonials.map((t, i) => (
              <div key={i} className={`tst-item-h${tstIdx === i ? ' on' : ''}`}>
                <p className="tst-q-h">"{t.q}"</p>
                <div className="tst-author">
                  <span className="tst-name" style={{ color: 'var(--white)' }}>{t.name}</span>
                  <span className="tst-role">{t.role}</span>
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

      {/* ── CTA ── */}
      <section className="cta-sec">
        <div className="cta-inner rev">
          <Editable tag="h2" id="cta-title" content={c('cta-title', "Ready to navigate what's next?")} className="cta-title" />
          <Editable tag="p"  id="cta-sub"   content={c('cta-sub', "Most of our best engagements started with a single conversation. Let's have one.")} className="cta-sub" />
          <Link href="/contact" className="btn-dark">
            <Editable tag="span" id="cta-btn" content={c('cta-btn', 'Start the Conversation →')} />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  )
}

export async function getServerSideProps({ locale }) {
  const content = await getPageContent('home', locale)
  return { props: { content } }
}
