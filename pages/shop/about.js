import Head from 'next/head'
import Link from 'next/link'
import ShopNav from '../../components/ShopNav'
import CartDrawer from '../../components/CartDrawer'
import ShopFooter from '../../components/ShopFooter'
import { useShopT } from '../../lib/shopI18n'

const team = [
  { name: 'Mara Voss', role: 'Founder & CEO', bio: 'Former product lead at three hardware startups. Built NOUX after getting frustrated with overpriced, underperforming accessories.', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80&auto=format&fit=crop' },
  { name: 'James Okafor', role: 'Head of Product', bio: '10 years in industrial design. James ensures every NOUX product passes the "would I actually use this?" test before it goes to market.', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&auto=format&fit=crop' },
  { name: 'Priya Nair', role: 'Head of Operations', bio: 'Supply chain and logistics expert. Priya is the reason your order ships the same day and arrives when we say it will.', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80&auto=format&fit=crop' },
]

const stats = [
  { num: '50K+', labelKey: 'statCustomers' },
  { num: '4.9★', labelKey: 'statRating' },
  { num: '12', labelKey: 'statLines' },
  { num: '30', labelKey: 'statReturns' },
]

export default function About() {
  const t = useShopT()

  const values = [
    { ico: '⚡', title: t.v1Title, desc: t.v1Desc },
    { ico: '♻️', title: t.v2Title, desc: t.v2Desc },
    { ico: '🎯', title: t.v3Title, desc: t.v3Desc },
    { ico: '🤝', title: t.v4Title, desc: t.v4Desc },
  ]

  return (
    <>
      <Head>
        <title>{t.aboutNoux} — NOUX</title>
        <meta name="description" content={t.aboutSub} />
      </Head>

      <div className="announce-bar">{t.announce}</div>
      <ShopNav />
      <CartDrawer />

      <section className="ph">
        <div className="ph-bg" />
        <div className="ph-inner">
          <div className="ph-breadcrumb">
            <Link href="/">Home</Link><span>›</span><span>{t.navAbout}</span>
          </div>
          <h1 className="ph-title" style={{ whiteSpace: 'pre-line' }}>{t.aboutTitle}</h1>
          <p className="ph-sub">{t.aboutSub}</p>
          <div className="ph-line" />
        </div>
      </section>

      <section className="sec-pad" style={{ background: 'var(--white)' }}>
        <div className="si">
          <div className="story-header rev">
            <span className="eyebrow">{t.storyEye}</span>
            <h2 className="sec-title" style={{ color: 'var(--text-d)', marginTop: '.6rem' }}>{t.storyTitle}</h2>
          </div>
          <div className="story-intro">
            <p className="rev d1">{t.storyP1}</p>
            <p className="rev d2">{t.storyP2}</p>
          </div>
        </div>
      </section>

      <section className="sec-pad" style={{ background: 'var(--dark)' }}>
        <div className="si">
          <div className="stats-grid">
            {stats.map((s, i) => (
              <div key={i} className={`stat-box rev d${i + 1}`}>
                <div className="stat-num">{s.num}</div>
                <div className="stat-lbl">{t[s.labelKey]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec-pad" style={{ background: 'var(--cream)' }}>
        <div className="si">
          <div className="sh rev">
            <span className="eyebrow">{t.valuesEye}</span>
            <h2 className="sec-title" style={{ color: 'var(--text-d)' }}>{t.valuesTitle}</h2>
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
            <span className="eyebrow">{t.teamEye}</span>
            <h2 className="sec-title" style={{ color: 'var(--text-d)' }}>{t.teamTitle}</h2>
            <p className="sec-sub" style={{ color: 'var(--text-d)' }}>{t.teamSub}</p>
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
          <h2 className="cta-title">{t.whyTitle}</h2>
          <p className="cta-sub">{t.whySub}</p>
          <Link href="/shop/products" className="btn-dark">{t.aboutCta}</Link>
        </div>
      </section>

      <ShopFooter />
    </>
  )
}
