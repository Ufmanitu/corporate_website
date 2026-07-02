import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import AdminBar from '../components/AdminBar'
import Editable from '../components/Editable'
import { AdminProvider } from '../context/AdminContext'
import { getPageContent } from '../lib/content'

export default function Work({ content }) {
  return (
    <AdminProvider page="work">
      <WorkContent content={content} />
    </AdminProvider>
  )
}

function WorkContent({ content }) {
  const c = (key, fallback = '') => content[key] ?? fallback
  const [filter, setFilter] = useState('all')

  const caseStudies = [
    { cat: 'health',    tag: 'Healthcare · Operations',   client: 'Nordvale Health',     img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&q=80&auto=format&fit=crop', title: 'Patient journey optimization across 50 hospitals',    desc: 'Redesigned the end-to-end care experience from GP referral to discharge, reducing wait times and standardizing clinical protocols.', s1: '€2.1B', l1: 'Value created',       s2: '31%',  l2: 'Wait time reduction' },
    { cat: 'logistics', tag: 'Logistics · AI',            client: 'Sienna Logistics',    img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&q=80&auto=format&fit=crop', title: 'AI-powered supply chain reinvention',                  desc: 'Introduced machine learning across demand forecasting, last-mile routing, and real-time anomaly detection.',                          s1: '3×',    l1: 'Throughput increase', s2: '22%',  l2: 'Cost reduction' },
    { cat: 'banking',   tag: 'Banking · M&A Integration', client: 'Vantage Capital',     img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&q=80&auto=format&fit=crop', title: 'Post-merger integration of two rival banks',           desc: 'Led the cultural and operational integration following a $4.2B acquisition, harmonizing two competing technology stacks.',               s1: '6mo',   l1: 'Ahead of synergy plan', s2: '$380M', l2: 'Annual synergies' },
    { cat: 'energy',    tag: 'Energy · Sustainability',   client: 'Crestwood Energy',    img: 'https://images.unsplash.com/photo-1466611653911-0072c9a4a50a?w=900&q=80&auto=format&fit=crop', title: 'Net-zero transition roadmap & execution',               desc: 'Designed a 10-year decarbonization strategy for a major integrated oil & gas company entering the renewable energy sector.',             s1: '40%',   l1: 'Emissions reduction Yr1', s2: '£1.2B', l2: 'Renewables investment' },
    { cat: 'tech',      tag: 'Technology · Go-to-Market', client: 'Elara Technologies',  img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80&auto=format&fit=crop', title: 'Enterprise SaaS platform market entry',                desc: 'Took an enterprise software product from zero revenue to $120M ARR in 18 months through market positioning redesign.',                 s1: '€120M', l1: 'ARR achieved',        s2: '18mo', l2: 'Zero to scale' },
    { cat: 'health',    tag: 'Pharma · Strategy',         client: 'Orion Pharma',        img: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=900&q=80&auto=format&fit=crop', title: 'Portfolio strategy for rare disease pivot',             desc: 'Advised the board of a mid-sized pharmaceutical firm on a major strategic pivot into orphan drug development.',                          s1: '4',     l1: 'Acquisitions identified', s2: '$2.8B', l2: 'Market cap created' },
  ]

  const filters = ['all', 'banking', 'health', 'logistics', 'energy', 'tech']

  return (
    <>
      <Head><title>Our Work — Meridian Group</title></Head>
      <Nav />
      <AdminBar />

      <section className="ph">
        <div className="ph-bg" />
        <div className="ph-inner">
          <div className="ph-breadcrumb"><Link href="/">Home</Link><span>/</span>Work</div>
          <Editable tag="span" id="wk-ph-eye"   content={c('wk-ph-eye', 'Case Studies')} className="eyebrow" />
          <Editable tag="h1"   id="wk-ph-title" content={c('wk-ph-title', 'Work that<br>defines industries.')} className="ph-title" />
          <Editable tag="p"    id="wk-ph-sub"   content={c('wk-ph-sub', 'Six engagements from hundreds — selected because they represent what\'s possible when strategy, technology, and genuine partnership come together.')} className="ph-sub" />
          <div className="ph-line" />
        </div>
      </section>

      {/* Featured case study */}
      <section className="sec-pad" style={{ background: 'var(--white)' }}>
        <div className="si">
          <div className="sh rev">
            <Editable tag="span" id="feat-eye"   content={c('feat-eye', 'Featured Engagement')} className="eyebrow" />
            <Editable tag="h2"   id="feat-title" content={c('feat-title', 'Apex Financial')} className="sec-title" style={{ color: 'var(--text-d)' }} />
          </div>
          <div className="feat rev">
            <div className="feat-vis">
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80&auto=format&fit=crop" alt="Apex Financial" loading="lazy" className="feat-vis-img" />
              <Editable tag="div" id="feat-tag" content={c('feat-tag', 'Banking · Digital Transformation · 2023')} className="feat-tag" />
              <div style={{ flex: 1 }} />
              <div className="feat-results">
                <div className="feat-r-item">
                  <Editable tag="span" id="feat-r1" content={c('feat-r1', '40%')} className="feat-r-num" />
                  <Editable tag="span" id="feat-r1l" content={c('feat-r1l', 'Efficiency gain')} className="feat-r-lbl" />
                </div>
                <div className="feat-r-item">
                  <Editable tag="span" id="feat-r2" content={c('feat-r2', '18mo')} className="feat-r-num" />
                  <Editable tag="span" id="feat-r2l" content={c('feat-r2l', 'Delivery timeline')} className="feat-r-lbl" />
                </div>
                <div className="feat-r-item">
                  <Editable tag="span" id="feat-r3" content={c('feat-r3', '£2.4B')} className="feat-r-num" />
                  <Editable tag="span" id="feat-r3l" content={c('feat-r3l', 'Cost base addressed')} className="feat-r-lbl" />
                </div>
              </div>
            </div>
            <div className="feat-body">
              <Editable tag="div" id="feat-lb" content={c('feat-lb', 'Core Banking Infrastructure Overhaul')} className="feat-label" />
              <Editable tag="h3"  id="feat-t"  content={c('feat-t', 'From 30-year-old mainframe to cloud-native microservices — in 18 months.')} className="feat-title-inner" />
              <Editable tag="p"   id="feat-d"  content={c('feat-d', "Apex Financial's core banking system was a constraint on every strategic initiative the leadership team wanted to pursue. Built in the 1990s, it was reliable but inflexible.")} className="feat-desc" />
              <Editable tag="p"   id="feat-d2" content={c('feat-d2', 'Meridian led the full transformation: architectural blueprint, vendor selection, phased migration, and organizational change management.')} className="feat-desc" />
              <div className="feat-pills">
                {['fp1','fp2','fp3','fp4'].map((k, i) => (
                  <Editable key={k} tag="span" id={k} content={c(k, ['Cloud Architecture','API Strategy','Change Management','Vendor Negotiation'][i])} className="feat-pill" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case study grid with filter */}
      <section className="sec-pad" style={{ background: 'var(--cream)' }}>
        <div className="si">
          <div className="sh rev">
            <Editable tag="span" id="cs-eye"   content={c('cs-eye', 'All Engagements')} className="eyebrow" />
            <Editable tag="h2"   id="cs-title" content={c('cs-title', 'More from the portfolio.')} className="sec-title" style={{ color: 'var(--text-d)' }} />
          </div>
          <div className="filter-bar rev">
            {filters.map(f => (
              <button key={f} className={`flt${filter === f ? ' on' : ''}`} onClick={() => setFilter(f)}>
                {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <div className="cs-grid">
            {caseStudies.map((cs, i) => (
              <div key={i} className={`cs-card rev d${(i % 3) + 1}${filter !== 'all' && filter !== cs.cat ? ' hidden' : ''}`} data-category={cs.cat}>
                <div className="cs-img">
                  <img src={cs.img} alt={cs.client} loading="lazy" />
                  <span className="cs-img-tag">{cs.tag}</span>
                </div>
                <div className="cs-body">
                  <div className="cs-cat">{cs.client}</div>
                  <h3>{cs.title}</h3>
                  <p>{cs.desc}</p>
                  <div className="cs-stats">
                    <div className="cs-stat"><span className="cs-stat-num">{cs.s1}</span><span className="cs-stat-lbl">{cs.l1}</span></div>
                    <div className="cs-stat"><span className="cs-stat-num">{cs.s2}</span><span className="cs-stat-lbl">{cs.l2}</span></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach strip */}
      <section className="sec-pad" style={{ background: 'var(--white)' }}>
        <div className="si">
          <div className="approach-strip rev">
            <div className="ap-left">
              <Editable tag="h3" id="ap-t" content={c('ap-t', 'Every engagement follows the same discipline.')} />
              <Editable tag="p"  id="ap-d" content={c('ap-d', 'The contexts change. What stays constant is the rigor we bring to understanding the problem before we propose anything, and the commitment we make to staying until results are in.')} />
            </div>
            <div className="ap-right">
              {[['🎯','ap1','Clear problem framing before any recommendation'],['📊','ap2','Decisions grounded in data, not opinion'],['🤝','ap3','Co-creation with your teams throughout'],['📈','ap4','Accountability for measurable outcomes']].map(([ico,k,def]) => (
                <div key={k} className="ap-item">
                  <div className="ap-ico">{ico}</div>
                  <Editable tag="span" id={k} content={c(k, def)} className="ap-text" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="cta-sec">
        <div className="cta-inner rev">
          <Editable tag="h2" id="wk-cta-t" content={c('wk-cta-t', 'Your challenge could be next.')} className="cta-title" />
          <Editable tag="p"  id="wk-cta-s" content={c('wk-cta-s', "We take on a small number of new engagements each quarter to ensure every client gets genuine partner-level attention.")} className="cta-sub" />
          <Link href="/contact" className="btn-dark">Start a Conversation →</Link>
        </div>
      </section>

      <Footer />
    </>
  )
}

export async function getServerSideProps({ locale }) {
  const content = await getPageContent('work', locale)
  return { props: { content } }
}
