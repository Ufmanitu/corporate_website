import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import AdminBar from '../components/AdminBar'
import Editable from '../components/Editable'
import { AdminProvider } from '../context/AdminContext'
import { getPageContent } from '../lib/content'

export default function About({ content }) {
  return (
    <AdminProvider page="about">
      <AboutContent content={content} />
    </AdminProvider>
  )
}

function AboutContent({ content }) {
  const c = (key, fallback = '') => content[key] ?? fallback

  const values = [
    { ico: '🔬', t: 'v1-t', d: 'v1-d', dt: 'Intellectual Honesty', dd: "We tell clients what they need to hear — including when the answer is uncomfortable or when we're not the right firm for the job." },
    { ico: '🤝', t: 'v2-t', d: 'v2-d', dt: 'Partnership First',    dd: "Our success is entirely a function of our clients' success. That alignment drives everything — from how we price engagements to how we measure our own performance." },
    { ico: '⚡', t: 'v3-t', d: 'v3-d', dt: 'Speed with Rigor',     dd: "We move fast — but never faster than the evidence allows. Speed isn't about cutting corners; it's about relentlessly focusing on what actually matters." },
    { ico: '🌱', t: 'v4-t', d: 'v4-d', dt: 'Long-term Thinking',   dd: "We optimize for our clients' futures, not our next engagement. Sometimes that means recommending against a project that would be profitable for us." },
  ]

  const team = [
    { ini: 'EV', n: 't1-n', r: 't1-r', b: 't1-b', dn: 'Elena Vasquez',         dr: 'Chief Executive Officer',             db: '20-year strategy veteran and former McKinsey Senior Partner.' },
    { ini: 'JT', n: 't2-n', r: 't2-r', b: 't2-b', dn: 'James Thornton',         dr: 'Managing Partner, Technology',        db: 'Former CTO of two Fortune 500 companies. Holds patents in distributed systems.' },
    { ini: 'PM', n: 't3-n', r: 't3-r', b: 't3-b', dn: 'Priya Mehta',            dr: 'Managing Partner, Financial Services', db: 'Former Goldman Sachs Managing Director, specialist in emerging market M&A.' },
    { ini: 'DO', n: 't4-n', r: 't4-r', b: 't4-b', dn: 'David Osei',             dr: 'Managing Partner, Operations',        db: 'MIT Operations Research PhD. Pioneered Meridian\'s supply chain resilience framework.' },
    { ini: 'SL', n: 't5-n', r: 't5-r', b: 't5-b', dn: 'Sophie Laurent',         dr: 'Chief People Officer',                db: "Author of 'The Consulting Compact'. Built and led teams in 12 countries." },
    { ini: 'RK', n: 't6-n', r: 't6-r', b: 't6-b', dn: 'Rahul Krishnamurthy',    dr: 'Chief Innovation Officer',            db: 'AI researcher and former Google Brain lead. Holds 14 patents in machine learning.' },
  ]

  const timeline = [
    { y: 'tl1-y', t: 'tl1-t', d: 'tl1-d', dy: '2008', dt: 'Founded in London',        dd: 'Four partners leave McKinsey to build a fundamentally different consulting firm.' },
    { y: 'tl2-y', t: 'tl2-t', d: 'tl2-d', dy: '2012', dt: 'New York office opens',    dd: 'First international expansion into the US market, growing the team to 80 people.' },
    { y: 'tl3-y', t: 'tl3-t', d: 'tl3-d', dy: '2017', dt: 'Singapore & Dubai launch', dd: 'Asia-Pacific and Middle East expansion. Team reaches 200 consultants.' },
    { y: 'tl4-y', t: 'tl4-t', d: 'tl4-d', dy: '2024', dt: '450 consultants, 15 countries', dd: 'Named FT Consulting Firm of the Year for the second consecutive year.' },
  ]

  const offices = [
    { city: 'o1-city', tag: 'o1-tag', addr: 'o1-addr', dc: 'London',    dt: 'Headquarters', da: '10 Grosvenor Square, Mayfair\nLondon W1K 6JP, United Kingdom' },
    { city: 'o2-city', tag: 'o2-tag', addr: 'o2-addr', dc: 'New York',  dt: 'Americas',     da: '1 World Trade Center, Floor 68\nNew York, NY 10007' },
    { city: 'o3-city', tag: 'o3-tag', addr: 'o3-addr', dc: 'Singapore', dt: 'Asia-Pacific', da: 'Marina Bay Financial Centre\nTower 3, Level 24, Singapore 018982' },
    { city: 'o4-city', tag: 'o4-tag', addr: 'o4-addr', dc: 'Dubai',     dt: 'Middle East',  da: 'DIFC Gate Village, Building 4\nLevel 5, Dubai, UAE' },
  ]

  const awards = [
    { ico: '🏆', n: 'a1-n', o: 'a1-o', y: 'a1-y', dn: 'Consulting Firm of the Year',    do: 'Financial Times',             dy: '2022 & 2023' },
    { ico: '⭐', n: 'a2-n', o: 'a2-o', y: 'a2-y', dn: 'Best Workplace in Consulting',   do: 'LinkedIn Top Companies',      dy: '2021–2024' },
    { ico: '🌿', n: 'a3-n', o: 'a3-o', y: 'a3-y', dn: 'B Corp Certified',               do: 'B Lab Global',                dy: 'Since 2019' },
    { ico: '💡', n: 'a4-n', o: 'a4-o', y: 'a4-y', dn: 'Innovation in Consulting Award', do: 'Management Consulting Assoc.', dy: '2023' },
  ]

  return (
    <>
      <Head><title>About — Meridian Group</title></Head>
      <Nav />
      <AdminBar />

      <section className="ph">
        <div className="ph-bg" />
        <div className="ph-inner">
          <div className="ph-breadcrumb"><Link href="/">Home</Link><span>/</span>About</div>
          <Editable tag="span" id="ab-ph-eye"   content={c('ab-ph-eye', 'About Meridian')} className="eyebrow" />
          <Editable tag="h1"   id="ab-ph-title" content={c('ab-ph-title', 'Strategy is a<br>human business.')} className="ph-title" />
          <Editable tag="p"    id="ab-ph-sub"   content={c('ab-ph-sub', "We're 450 consultants who believe that the best analysis in the world is worth nothing without the trust, judgment, and relationships to act on it.")} className="ph-sub" />
          <div className="ph-line" />
        </div>
      </section>

      {/* Story */}
      <section style={{ padding: '7rem 0', background: 'var(--white)' }}>
        <div className="si">
          <div className="story-grid">
            <div className="story-img rev">
              <div className="story-img-bg">
                <svg viewBox="0 0 80 80" fill="none"><rect x="8" y="8" width="64" height="64" rx="10" stroke="#0B1929" strokeWidth="2.5"/><path d="M8 28h64M28 8v64" stroke="#0B1929" strokeWidth="1.5" opacity=".4"/><circle cx="40" cy="40" r="12" stroke="#0B1929" strokeWidth="2" opacity=".5"/><circle cx="40" cy="40" r="4" fill="#E8A847"/></svg>
              </div>
              <div className="story-badge">
                <span className="sb-num">2008</span>
                <span className="sb-txt">Founded in London</span>
              </div>
            </div>
            <div className="story-text rev d2">
              <Editable tag="span" id="ab-story-eye"   content={c('ab-story-eye', 'Our Story')} className="eyebrow" />
              <Editable tag="h2"   id="ab-story-title" content={c('ab-story-title', 'Built to challenge the conventional consulting model.')} className="sec-title" style={{ color: 'var(--text-d)' }} />
              <Editable tag="p"    id="ab-story-p1"    content={c('ab-story-p1', `Meridian was founded in 2008 by four partners who had grown frustrated with the consulting industry they'd spent their careers in.`)} />
              <Editable tag="p"    id="ab-story-p2"    content={c('ab-story-p2', 'The founding idea was simple: stay in the room until the work is done. Measure success by what actually changes in the organization, not by what gets presented in the boardroom.')} />
              <div className="timeline">
                {timeline.map((tl, i) => (
                  <div key={i} className="tl-item">
                    <Editable tag="span" id={tl.y} content={c(tl.y, tl.dy)} className="tl-year" />
                    <div className="tl-text">
                      <Editable tag="h4" id={tl.t} content={c(tl.t, tl.dt)} />
                      <Editable tag="p"  id={tl.d} content={c(tl.d, tl.dd)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '7rem 0', background: 'var(--cream)' }}>
        <div className="si">
          <div className="sh c rev">
            <Editable tag="span" id="val-eye"   content={c('val-eye', 'Our Values')} className="eyebrow" />
            <Editable tag="h2"   id="val-title" content={c('val-title', 'What we believe.')} className="sec-title" style={{ color: 'var(--text-d)' }} />
          </div>
          <div className="values-grid">
            {values.map((v, i) => (
              <div key={i} className={`val-card rev d${i + 1}`}>
                <div className="val-ico">{v.ico}</div>
                <Editable tag="h3" id={v.t} content={c(v.t, v.dt)} />
                <Editable tag="p"  id={v.d} content={c(v.d, v.dd)} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section id="leadership" style={{ padding: '7rem 0', background: 'var(--white)' }}>
        <div className="si">
          <div className="sh c rev">
            <Editable tag="span" id="team-eye"   content={c('team-eye', 'Leadership')} className="eyebrow" />
            <Editable tag="h2"   id="team-title" content={c('team-title', 'The people who set the tone.')} className="sec-title" style={{ color: 'var(--text-d)' }} />
          </div>
          <div className="team-grid">
            {team.map((t, i) => (
              <div key={i} className={`team-card rev d${(i % 3) + 1}`}>
                <div className="team-img"><span className="team-initials">{t.ini}</span></div>
                <div className="team-body">
                  <Editable tag="div" id={t.n} content={c(t.n, t.dn)} className="team-name" />
                  <Editable tag="div" id={t.r} content={c(t.r, t.dr)} className="team-role" />
                  <Editable tag="p"   id={t.b} content={c(t.b, t.db)} className="team-bio" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offices */}
      <section style={{ padding: '6.5rem 0', background: 'var(--dark)' }}>
        <div className="si">
          <div className="sh c rev">
            <Editable tag="span" id="off-eye"   content={c('off-eye', 'Our Offices')} className="eyebrow" />
            <Editable tag="h2"   id="off-title" content={c('off-title', "Where you'll find us.")} className="sec-title" style={{ color: 'var(--white)' }} />
          </div>
          <div className="offices-grid">
            {offices.map((o, i) => (
              <div key={i} className={`office-card rev d${i + 1}`}>
                <Editable tag="div" id={o.city} content={c(o.city, o.dc)} className="office-city" />
                <Editable tag="div" id={o.tag}  content={c(o.tag, o.dt)}  className="office-tag" />
                <Editable tag="p"   id={o.addr} content={c(o.addr, o.da)} className="office-addr" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section style={{ padding: '6.5rem 0', background: 'var(--cream)' }}>
        <div className="si">
          <div className="sh c rev">
            <Editable tag="span" id="aw-eye"   content={c('aw-eye', 'Recognition')} className="eyebrow" />
            <Editable tag="h2"   id="aw-title" content={c('aw-title', "Work others have noticed.")} className="sec-title" style={{ color: 'var(--text-d)' }} />
          </div>
          <div className="awards-grid">
            {awards.map((a, i) => (
              <div key={i} className={`award-card rev d${i + 1}`}>
                <div className="award-ico">{a.ico}</div>
                <Editable tag="div" id={a.n} content={c(a.n, a.dn)} className="award-name" />
                <Editable tag="div" id={a.o} content={c(a.o, a.do)} className="award-org" />
                <Editable tag="div" id={a.y} content={c(a.y, a.dy)} className="award-year" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-sec">
        <div className="cta-inner rev">
          <Editable tag="h2" id="ab-cta-t" content={c('ab-cta-t', 'Want to work with — or for — us?')} className="cta-title" />
          <Editable tag="p"  id="ab-cta-s" content={c('ab-cta-s', "Whether you're a potential client or a consultant thinking about your next chapter, we'd love to talk.")} className="cta-sub" />
          <Link href="/contact" className="btn-dark">Start a Conversation →</Link>
        </div>
      </section>

      <Footer />
    </>
  )
}

export async function getServerSideProps({ locale }) {
  const content = await getPageContent('about', locale)
  return { props: { content } }
}
