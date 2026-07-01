import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import AdminBar from '../components/AdminBar'
import Editable from '../components/Editable'
import { AdminProvider } from '../context/AdminContext'
import { getPageContent } from '../lib/content'

export default function Services({ content }) {
  return (
    <AdminProvider page="services">
      <ServicesContent content={content} />
    </AdminProvider>
  )
}

function ServicesContent({ content }) {
  const c = (key, fallback = '') => content[key] ?? fallback

  const services = [
    { ico: '◈', t: 's1-t', p: 's1-p', dt: 'Strategy & Transformation', dp: 'Defining clear, actionable paths forward in environments of genuine uncertainty. We work at the intersection of market dynamics, organizational capability, and competitive positioning to create strategies that hold up under scrutiny — and under pressure.', bullets: ['s1-b1','s1-b2','s1-b3','s1-b4'], db: ['Corporate and business unit strategy design','Organizational restructuring and change management','Market entry, growth, and portfolio strategy','Executive alignment and strategic planning cycles'], stat: '60+', lbl: 'Strategy engagements' },
    { ico: '⬡', t: 's2-t', p: 's2-p', dt: 'Technology Advisory',        dp: 'Bridging business vision with technical reality. Technology choices compound — good ones create advantages for years, bad ones create debt. We help leaders make architecture, platform, and vendor decisions with confidence and a long-term lens.',           bullets: ['s2-b1','s2-b2','s2-b3','s2-b4'], db: ['Enterprise architecture and tech stack modernization','Cloud migration strategy and execution oversight','Technology vendor selection and contract negotiation','CTO advisory and interim technology leadership'], stat: '45+', lbl: 'Tech transformations' },
    { ico: '◇', t: 's3-t', p: 's3-p', dt: 'Digital Innovation',         dp: 'Building the products and platforms of tomorrow — with the rigor that production-grade work demands. From discovery through delivery, we combine design thinking, user research, and engineering excellence to ship experiences that actually matter.',            bullets: ['s3-b1','s3-b2','s3-b3','s3-b4'], db: ['Product strategy, roadmap, and MVP development','Design systems, UX research, and accessibility','AI and machine learning product integration','Platform and ecosystem strategy'], stat: '80+', lbl: 'Products launched' },
    { ico: '▽', t: 's4-t', p: 's4-p', dt: 'Financial Consulting',       dp: 'Turning data into decisions across the full spectrum of financial strategy. We work alongside CFOs, boards, and investors to identify value, structure transactions, and build the financial discipline that sustains growth over time.',                         bullets: ['s4-b1','s4-b2','s4-b3','s4-b4'], db: ['M&A due diligence, integration, and value creation','Financial restructuring and turnaround management','Capital allocation strategy and investor relations','Performance improvement and cost transformation'], stat: '$8B+', lbl: 'Transactions advised' },
    { ico: '⊞', t: 's5-t', p: 's5-p', dt: 'Operations Excellence',      dp: 'Streamlining what slows organizations down without stripping out what makes them unique. We redesign operations end-to-end — from process mapping to automation implementation — so teams can move faster with fewer friction points.',                          bullets: ['s5-b1','s5-b2','s5-b3','s5-b4'], db: ['Operating model design and process reengineering','Lean, Six Sigma, and continuous improvement programs','Supply chain optimization and resilience planning','Shared services design and outsourcing strategy'], stat: '35%', lbl: 'Avg. efficiency gain' },
    { ico: '○', t: 's6-t', p: 's6-p', dt: 'Risk & Compliance',          dp: 'Navigating regulatory complexity with clarity and confidence. We help organizations build compliance frameworks that create genuine competitive advantage by reducing uncertainty and building trust with customers and partners.',                                      bullets: ['s6-b1','s6-b2','s6-b3','s6-b4'], db: ['Regulatory strategy and horizon scanning','Enterprise risk management and governance frameworks','Data privacy, cybersecurity, and ESG compliance','Regulatory remediation and regulatory affairs'], stat: '100%', lbl: 'Remediation success rate' },
  ]

  const industries = [
    { ico: '🏦', t: 'i1-t', d: 'i1-d', dt: 'Financial Services',        dd: 'Banking, insurance, capital markets, wealth management, and fintech.' },
    { ico: '🏥', t: 'i2-t', d: 'i2-d', dt: 'Healthcare & Life Sciences', dd: 'Hospitals, pharma, medtech, and digital health.' },
    { ico: '⚡', t: 'i3-t', d: 'i3-d', dt: 'Energy & Industrials',       dd: 'Oil & gas, renewables, utilities, and manufacturing.' },
    { ico: '💻', t: 'i4-t', d: 'i4-d', dt: 'Technology & Media',         dd: 'Software, platforms, content, and hardware.' },
    { ico: '🛍', t: 'i5-t', d: 'i5-d', dt: 'Consumer & Retail',          dd: 'FMCG, e-commerce, luxury, and hospitality.' },
    { ico: '🏛', t: 'i6-t', d: 'i6-d', dt: 'Public Sector',              dd: 'Government agencies, infrastructure, education, and defence.' },
  ]

  const why = [
    { t: 'w1-t', d: 'w1-d', dt: 'We work alongside you, not above you',       dd: 'Our teams embed with yours. We share your accountability and your pressure — which means the work is shaped by reality, not by what looks good in a deck.' },
    { t: 'w2-t', d: 'w2-d', dt: 'We measure ourselves by outcomes',             dd: "We're in the results business, not the deliverables business. That means we stay engaged past the point where most firms consider their job done." },
    { t: 'w3-t', d: 'w3-d', dt: 'We bring the right people, not the nearest', dd: "Every engagement is staffed from our global network based on specific expertise fit — not availability. The partner you meet is the partner who stays." },
  ]

  return (
    <>
      <Head><title>Services — Meridian Group</title></Head>
      <Nav />
      <AdminBar />

      <section className="ph">
        <div className="ph-bg" />
        <div className="ph-inner">
          <div className="ph-breadcrumb"><Link href="/">Home</Link><span>/</span>Services</div>
          <Editable tag="span" id="srv-ph-eye"   content={c('srv-ph-eye', 'Our Services')} className="eyebrow" />
          <Editable tag="h1"   id="srv-ph-title" content={c('srv-ph-title', 'Six practices.<br>One firm.')} className="ph-title" />
          <Editable tag="p"    id="srv-ph-sub"   content={c('srv-ph-sub', 'An integrated approach to strategy, technology, and transformation.')} className="ph-sub" />
          <div className="ph-line" />
        </div>
      </section>

      {/* Service bento */}
      <section className="sec-pad" style={{ background: 'var(--white)' }}>
        <div className="si">
          <div className="srv-bento-wrap">

            {/* Top row: featured large + secondary */}
            <div className="srv-bento-top">
              {/* Featured — dark card, full content */}
              <div className="srv-bc srv-bc-feat rev d1">
                <div className="scv2-head">
                  <div className="srv-ico">{services[0].ico}</div>
                  <div className="scv2-stat">
                    <div className="scv2-stat-num">{services[0].stat}</div>
                    <div className="scv2-stat-lbl">{services[0].lbl}</div>
                  </div>
                </div>
                <Editable tag="h3" id={services[0].t} content={c(services[0].t, services[0].dt)} className="scv2-title" />
                <Editable tag="p"  id={services[0].p} content={c(services[0].p, services[0].dp)} className="scv2-desc" />
                <ul className="srv-bullets">
                  {services[0].bullets.map((bk, bi) => (
                    <li key={bi}><Editable tag="span" id={bk} content={c(bk, services[0].db[bi])} /></li>
                  ))}
                </ul>
              </div>

              {/* Secondary — light card, no bullets */}
              <div className="srv-bc rev d2">
                <div className="scv2-head">
                  <div className="srv-ico">{services[1].ico}</div>
                  <div className="scv2-stat">
                    <div className="scv2-stat-num">{services[1].stat}</div>
                    <div className="scv2-stat-lbl">{services[1].lbl}</div>
                  </div>
                </div>
                <Editable tag="h3" id={services[1].t} content={c(services[1].t, services[1].dt)} className="scv2-title" />
                <Editable tag="p"  id={services[1].p} content={c(services[1].p, services[1].dp)} className="scv2-desc" />
              </div>
            </div>

            {/* Bottom row: 4 compact cards — icon, stat, title only */}
            <div className="srv-bento-bottom">
              {services.slice(2).map((s, i) => (
                <div key={i} className={`srv-bc srv-bc-mini rev d${i + 1}`}>
                  <div className="scv2-head">
                    <div className="srv-ico">{s.ico}</div>
                    <div className="scv2-stat">
                      <div className="scv2-stat-num">{s.stat}</div>
                      <div className="scv2-stat-lbl">{s.lbl}</div>
                    </div>
                  </div>
                  <Editable tag="h3" id={s.t} content={c(s.t, s.dt)} className="scv2-title" />
                  <Editable tag="p"  id={s.p} content={c(s.p, s.dp)} className="scv2-desc" />
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Process */}
      <section className="sec-pad" style={{ background: 'var(--dark)' }}>
        <div className="si">
          <div className="sh c rev">
            <Editable tag="span" id="proc-eye"   content={c('proc-eye', 'How We Work')} className="eyebrow" />
            <Editable tag="h2"   id="proc-title" content={c('proc-title', 'A process built for real problems.')} className="sec-title" style={{ color: 'var(--white)' }} />
            <Editable tag="p"    id="proc-sub"   content={c('proc-sub', 'Disciplined enough to be repeatable. Flexible enough to meet you where you are.')} className="sec-sub" style={{ color: 'var(--text-m)' }} />
          </div>
          <div className="process-grid">
            {[
              { n: '01', t: 'p1-t', d: 'p1-d', dt: 'Discover', dd: "We immerse in your world — interviewing stakeholders, interrogating data, and mapping the landscape to find the real problem behind the stated one." },
              { n: '02', t: 'p2-t', d: 'p2-d', dt: 'Define',   dd: "We frame the challenge precisely, align leadership on success metrics, and build the strategic brief that governs every decision that follows." },
              { n: '03', t: 'p3-t', d: 'p3-d', dt: 'Design',   dd: "We develop and stress-test options, co-creating solutions with your team. Buy-in is built during the process — not at the presentation." },
              { n: '04', t: 'p4-t', d: 'p4-d', dt: 'Deliver',  dd: "We stay engaged through implementation, adapting to reality as it emerges. Our work isn't finished until the results are visible in the numbers." },
            ].map((p, i) => (
              <div key={i} className={`process-step rev d${i + 1}`}>
                <div className="ps-num">{p.n}</div>
                <Editable tag="div" id={p.t} content={c(p.t, p.dt)} className="ps-title" />
                <Editable tag="p"   id={p.d} content={c(p.d, p.dd)} className="ps-desc" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="sec-pad" style={{ background: 'var(--cream)' }}>
        <div className="si">
          <div className="sh c rev">
            <Editable tag="span" id="ind-eye"   content={c('ind-eye', 'Industries')} className="eyebrow" />
            <Editable tag="h2"   id="ind-title" content={c('ind-title', 'Deep expertise across sectors.')} className="sec-title" style={{ color: 'var(--text-d)' }} />
          </div>
          <div className="ind-grid">
            {industries.map((ind, i) => (
              <div key={i} className={`ind-card rev d${(i % 3) + 1}`}>
                <div className="ind-ico">{ind.ico}</div>
                <div className="ind-text">
                  <Editable tag="h4" id={ind.t} content={c(ind.t, ind.dt)} />
                  <Editable tag="p"  id={ind.d} content={c(ind.d, ind.dd)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Meridian */}
      <section className="sec-pad" style={{ background: 'var(--white)' }}>
        <div className="si">
          <div className="sh c rev">
            <Editable tag="span" id="why-eye"   content={c('why-eye', 'Why Meridian')} className="eyebrow" />
            <Editable tag="h2"   id="why-title" content={c('why-title', 'What makes the difference.')} className="sec-title" style={{ color: 'var(--text-d)' }} />
          </div>
          <div className="why-grid">
            {why.map((w, i) => (
              <div key={i} className={`why-card rev d${i + 1}`}>
                <div className="why-num">0{i + 1}</div>
                <Editable tag="h3" id={w.t} content={c(w.t, w.dt)} />
                <Editable tag="p"  id={w.d} content={c(w.d, w.dd)} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-sec">
        <div className="cta-inner rev">
          <Editable tag="h2" id="srv-cta-t" content={c('srv-cta-t', 'The right engagement starts with the right conversation.')} className="cta-title" />
          <Editable tag="p"  id="srv-cta-s" content={c('srv-cta-s', "Tell us what you're working on. We'll tell you honestly whether we're the right fit.")} className="cta-sub" />
          <Link href="/contact" className="btn-dark">Start the Conversation →</Link>
        </div>
      </section>

      <Footer />
    </>
  )
}

export async function getServerSideProps({ locale }) {
  const content = await getPageContent('services', locale)
  return { props: { content } }
}
