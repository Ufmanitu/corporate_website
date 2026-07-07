import Head from 'next/head'
import Link from 'next/link'
import ShopNav from '../../components/ShopNav'
import CartDrawer from '../../components/CartDrawer'
import ShopFooter from '../../components/ShopFooter'
import AdminBar from '../../components/AdminBar'
import Editable from '../../components/Editable'
import { AdminProvider } from '../../context/AdminContext'
import { getShopContent } from '../../lib/shopContent'

const team = [
  { name: 'Mara Voss', roleKey: 'teamRole1', bioKey: 'teamBio1', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80&auto=format&fit=crop' },
  { name: 'James Okafor', roleKey: 'teamRole2', bioKey: 'teamBio2', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&auto=format&fit=crop' },
  { name: 'Priya Nair', roleKey: 'teamRole3', bioKey: 'teamBio3', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80&auto=format&fit=crop' },
]

const stats = [
  { num: '50K+', labelKey: 'statCustomers' },
  { num: '4.9★', labelKey: 'statRating' },
  { num: '12', labelKey: 'statLines' },
  { num: '30', labelKey: 'statReturns' },
]

const values = [
  { ico: '⚡', titleKey: 'v1Title', descKey: 'v1Desc' },
  { ico: '♻️', titleKey: 'v2Title', descKey: 'v2Desc' },
  { ico: '🎯', titleKey: 'v3Title', descKey: 'v3Desc' },
  { ico: '🤝', titleKey: 'v4Title', descKey: 'v4Desc' },
]

export default function About({ content }) {
  return (
    <AdminProvider page="shop_about">
      <AboutContent content={content} />
    </AdminProvider>
  )
}

function AboutContent({ content }) {
  const t = content
  const c = key => content[key] ?? ''

  return (
    <>
      <Head>
        <title>{t.aboutNoux} — NOUX</title>
        <meta name="description" content={t.aboutSub} />
      </Head>

      <div className="announce-bar">{t.announce}</div>
      <ShopNav />
      <CartDrawer />
      <AdminBar />

      <section className="ph">
        <div className="ph-bg" />
        <div className="ph-inner">
          <div className="ph-breadcrumb">
            <Link href="/">{t.breadcrumbHome}</Link><span>›</span><span>{t.navAbout}</span>
          </div>
          <Editable tag="h1" id="aboutTitle" content={c('aboutTitle')} className="ph-title" style={{ whiteSpace: 'pre-line' }} />
          <Editable tag="p" id="aboutSub" content={c('aboutSub')} className="ph-sub" />
          <div className="ph-line" />
        </div>
      </section>

      <section className="sec-pad" style={{ background: 'var(--white)' }}>
        <div className="si">
          <div className="story-header rev">
            <Editable tag="span" id="storyEye" content={c('storyEye')} className="eyebrow" />
            <Editable tag="h2" id="storyTitle" content={c('storyTitle')} className="sec-title" style={{ color: 'var(--text-d)', marginTop: '.6rem' }} />
          </div>
          <div className="story-intro">
            <Editable tag="p" id="storyP1" content={c('storyP1')} className="rev d1" />
            <Editable tag="p" id="storyP2" content={c('storyP2')} className="rev d2" />
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
            <Editable tag="span" id="valuesEye" content={c('valuesEye')} className="eyebrow" />
            <Editable tag="h2" id="valuesTitle" content={c('valuesTitle')} className="sec-title" style={{ color: 'var(--text-d)' }} />
          </div>
          <div className="values-grid">
            {values.map((v, i) => (
              <div key={i} className={`val-card rev d${i + 1}`}>
                <div className="val-ico">{v.ico}</div>
                <Editable tag="h3" id={v.titleKey} content={c(v.titleKey)} />
                <Editable tag="p" id={v.descKey} content={c(v.descKey)} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec-pad" style={{ background: 'var(--white)' }}>
        <div className="si">
          <div className="sh c rev">
            <Editable tag="span" id="teamEye" content={c('teamEye')} className="eyebrow" />
            <Editable tag="h2" id="teamTitle" content={c('teamTitle')} className="sec-title" style={{ color: 'var(--text-d)' }} />
            <Editable tag="p" id="teamSub" content={c('teamSub')} className="sec-sub" style={{ color: 'var(--text-d)' }} />
          </div>
          <div className="team-grid">
            {team.map((m, i) => (
              <div key={i} className={`team-card rev d${i + 1}`}>
                <div className="team-img">
                  <img src={m.img} alt={m.name} loading="lazy" />
                </div>
                <div className="team-body">
                  <div className="team-name">{m.name}</div>
                  <Editable tag="div" id={m.roleKey} content={c(m.roleKey)} className="team-role" />
                  <Editable tag="p" id={m.bioKey} content={c(m.bioKey)} className="team-bio" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-sec">
        <div className="cta-inner rev">
          <Editable tag="h2" id="whyTitle" content={c('whyTitle')} className="cta-title" />
          <Editable tag="p" id="whySub" content={c('whySub')} className="cta-sub" />
          <Link href="/shop/products" className="btn-dark">{t.aboutCta}</Link>
        </div>
      </section>

      <ShopFooter />
    </>
  )
}

export async function getServerSideProps({ locale }) {
  const content = await getShopContent('about', locale)
  return { props: { content } }
}
