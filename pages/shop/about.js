import Head from 'next/head'
import Link from 'next/link'
import ShopNav from '../../components/ShopNav'
import CartDrawer from '../../components/CartDrawer'
import ShopFooter from '../../components/ShopFooter'

const values = [
  { ico: '⚡', title: 'Performance First', desc: "Every product we make is tested for real-world use, not just benchmarks. If it doesn't perform under pressure, it doesn't ship." },
  { ico: '♻️', title: 'Built to Last', desc: "Fast fashion ruined clothing. We won't let it ruin tech. NOUX products are built with premium materials designed to outlast trends." },
  { ico: '🎯', title: 'Focused Design', desc: "We don't add features for the sake of it. Every detail serves a purpose. Less noise, more signal." },
  { ico: '🤝', title: 'Honest Pricing', desc: "No inflated MSRPs, no fake discounts. The price you see is the real price — fair for the quality you're getting." },
]

const stats = [
  { num: '50K+', label: 'Happy Customers' },
  { num: '4.9★', label: 'Average Rating' },
  { num: '12', label: 'Product Lines' },
  { num: '30', label: 'Day Return Window' },
]

const team = [
  { name: 'Mara Voss', role: 'Founder & CEO', bio: 'Former product lead at three hardware startups. Built NOUX after getting frustrated with overpriced, underperforming accessories.', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80&auto=format&fit=crop' },
  { name: 'James Okafor', role: 'Head of Product', bio: '10 years in industrial design. James ensures every NOUX product passes the "would I actually use this?" test before it goes to market.', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&auto=format&fit=crop' },
  { name: 'Priya Nair', role: 'Head of Operations', bio: 'Supply chain and logistics expert. Priya is the reason your order ships the same day and arrives when we say it will.', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80&auto=format&fit=crop' },
]

export default function About() {
  return (
    <>
      <Head>
        <title>About NOUX — Premium Tech Accessories</title>
        <meta name="description" content="We build premium tech accessories for focused professionals. No gimmicks, no compromises." />
      </Head>

      <div className="announce-bar">Free shipping on orders over $100 · Use code LAUNCH for 10% off</div>
      <ShopNav />
      <CartDrawer />

      <section className="ph">
        <div className="ph-bg" />
        <div className="ph-inner">
          <div className="ph-breadcrumb">
            <Link href="/">Home</Link><span>›</span><span>About</span>
          </div>
          <h1 className="ph-title">Built by people who<br />actually use this stuff.</h1>
          <p className="ph-sub">NOUX started with a simple frustration: why is it so hard to find tech accessories that are both well-made and honestly priced?</p>
          <div className="ph-line" />
        </div>
      </section>

      <section className="sec-pad" style={{ background: 'var(--white)' }}>
        <div className="si">
          <div className="story-header rev">
            <span className="eyebrow">Our Story</span>
            <h2 className="sec-title" style={{ color: 'var(--text-d)', marginTop: '.6rem' }}>We got tired of settling.</h2>
          </div>
          <div className="story-intro">
            <p className="rev d1">NOUX was founded in 2021 by a small team of product designers and engineers who shared one frustration: the tech accessories market was full of either overpriced "premium" brands or cheap products that broke within a year. There was almost nothing in between.</p>
            <p className="rev d2">So we built it ourselves. We spent 18 months prototyping, testing, and iterating before shipping our first product. We didn't launch until we genuinely couldn't find anything we'd rather use ourselves. That's still the bar every NOUX product has to clear before it ships.</p>
          </div>
        </div>
      </section>

      <section className="sec-pad" style={{ background: 'var(--dark)' }}>
        <div className="si">
          <div className="stats-grid">
            {stats.map((s, i) => (
              <div key={i} className={`stat-box rev d${i + 1}`}>
                <div className="stat-num">{s.num}</div>
                <div className="stat-lbl">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec-pad" style={{ background: 'var(--cream)' }}>
        <div className="si">
          <div className="sh rev">
            <span className="eyebrow">What We Stand For</span>
            <h2 className="sec-title" style={{ color: 'var(--text-d)' }}>Four things we refuse to compromise on.</h2>
          </div>
          <div className="values-grid">
            {values.map((v, i) => (
              <div key={i} className={`val-card rev d${i + 1}`}>
                <div className="val-ico">{v.ico}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec-pad" style={{ background: 'var(--white)' }}>
        <div className="si">
          <div className="sh c rev">
            <span className="eyebrow">The Team</span>
            <h2 className="sec-title" style={{ color: 'var(--text-d)' }}>Small team. High standards.</h2>
            <p className="sec-sub" style={{ color: 'var(--text-d)' }}>We are a team of 14, spread across Berlin, London, and Singapore.</p>
          </div>
          <div className="team-grid">
            {team.map((m, i) => (
              <div key={i} className={`team-card rev d${i + 1}`}>
                <div className="team-img">
                  <img src={m.img} alt={m.name} loading="lazy" />
                </div>
                <div className="team-body">
                  <div className="team-name">{m.name}</div>
                  <div className="team-role">{m.role}</div>
                  <p className="team-bio">{m.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-sec">
        <div className="cta-inner rev">
          <h2 className="cta-title">Ready to upgrade your setup?</h2>
          <p className="cta-sub">Browse our full range of premium accessories. Free shipping over $100, 30-day returns, no questions asked.</p>
          <Link href="/shop/products" className="btn-dark">Shop All Products →</Link>
        </div>
      </section>

      <ShopFooter />
    </>
  )
}
