import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import AdminBar from '../components/AdminBar'
import Editable from '../components/Editable'
import { AdminProvider } from '../context/AdminContext'
import { getPageContent } from '../lib/content'

export default function Clients({ content }) {
  return (
    <AdminProvider page="clients">
      <ClientsContent content={content} />
    </AdminProvider>
  )
}

function ClientsContent({ content }) {
  const c = (key, fallback = '') => content[key] ?? fallback

  const logos = [
    { name: 'Apex Financial',       ini: 'AF', color: '#E8A847', sector: 'Banking' },
    { name: 'Nordvale Health',       ini: 'NH', color: '#38B6FF', sector: 'Healthcare' },
    { name: 'Sienna Logistics',      ini: 'SL', color: '#34D399', sector: 'Logistics' },
    { name: 'Vantage Capital',       ini: 'VC', color: '#FB7185', sector: 'Finance' },
    { name: 'Elara Technologies',    ini: 'ET', color: '#A78BFA', sector: 'Technology' },
    { name: 'Crestwood Energy',      ini: 'CE', color: '#2DD4BF', sector: 'Energy' },
    { name: 'Halston Group',         ini: 'HG', color: '#E8A847', sector: 'Industrials' },
    { name: 'Orion Pharma',          ini: 'OP', color: '#38B6FF', sector: 'Pharma' },
    { name: 'Ravensworth Bank',      ini: 'RB', color: '#34D399', sector: 'Banking' },
    { name: 'Ironclad Solutions',    ini: 'IS', color: '#FB7185', sector: 'Operations' },
    { name: 'Meridia Retail',        ini: 'MR', color: '#A78BFA', sector: 'Consumer' },
    { name: 'Tethys Infrastructure', ini: 'TI', color: '#2DD4BF', sector: 'Infrastructure' },
  ]

  const testimonials = [
    { featured: true,  stars: 5, init: 'SC', q: "tst1-q", n: "tst1-n", r: "tst1-r", dq: "Meridian didn't just advise us — they transformed how we think about strategy entirely. The clarity they brought to a genuinely complex problem was unlike anything we'd encountered before. Their ability to cut through noise and identify what actually matters is a rare and genuinely valuable skill. We've worked with most of the major firms, and Meridian is in a different category.", dn: 'Sarah Chen',     dr: 'CEO, Apex Financial' },
    { featured: false, stars: 5, init: 'MH', q: "tst2-q", n: "tst2-n", r: "tst2-r", dq: "The depth of insight and speed of execution were remarkable. They had a practical recommendation on the table within a week — and it actually worked. That's rare in this industry. Most firms take three months to confirm what you already suspected.", dn: 'Marcus Hoffmann', dr: 'CTO, Nordvale Health' },
    { featured: false, stars: 5, init: 'AD', q: "tst3-q", n: "tst3-n", r: "tst3-r", dq: "Working with Meridian was the single best decision we made last year. Full stop. They understood our business faster than any partner we've worked with before, and they stayed committed until results were clearly visible in the numbers.", dn: 'Amara Diallo',     dr: 'COO, Sienna Logistics' },
    { featured: false, stars: 5, init: 'JP', q: "tst4-q", n: "tst4-n", r: "tst4-r", dq: "The analysis Meridian brought to our restructuring process was surgical. They saw paths that we couldn't see, and they had the courage to recommend them even when it wasn't what we wanted to hear.", dn: 'Jonathan Park',   dr: 'CFO, Vantage Capital' },
    { featured: false, stars: 5, init: 'LF', q: "tst5-q", n: "tst5-n", r: "tst5-r", dq: "In 25 years of working with consulting firms, Meridian is the only one I'd call again unprompted. They're that good. What separates them is that they actually care about the outcome, not about justifying the next engagement.", dn: 'Lena Fischer',    dr: 'CEO, Crestwood Energy' },
    { featured: false, stars: 5, init: 'RP', q: "tst6-q", n: "tst6-n", r: "tst6-r", dq: "They didn't just hand us a strategy — they built our team's capacity to think strategically. That lasting shift in capability is the real gift of the engagement.", dn: 'Raj Patel',       dr: 'VP Strategy, Elara Technologies' },
    { featured: false, stars: 5, init: 'TH', q: "tst7-q", n: "tst7-n", r: "tst7-r", dq: "We've worked with Meridian across three separate engagements over five years. Each time, the quality of thinking and the commitment to outcome has been identical. That consistency is extraordinarily rare.", dn: 'Thomas Hargreaves', dr: 'CEO, Halston Group' },
  ]

  const sectors = [
    { ico: '🏦', i: 'is1-i', n: 'is1-n', d: 'is1-d', di: 'Financial Services', dn: '72+', dd: 'Clients in banking, insurance & markets' },
    { ico: '🏥', i: 'is2-i', n: 'is2-n', d: 'is2-d', di: 'Healthcare',          dn: '38+', dd: 'Hospitals, pharma & medtech clients' },
    { ico: '⚡', i: 'is3-i', n: 'is3-n', d: 'is3-d', di: 'Energy & Industrials', dn: '29+', dd: 'Across oil & gas and renewables' },
    { ico: '💻', i: 'is4-i', n: 'is4-n', d: 'is4-d', di: 'Technology & Media',  dn: '35+', dd: 'Software, platforms & content companies' },
    { ico: '🛍', i: 'is5-i', n: 'is5-n', d: 'is5-d', di: 'Consumer & Retail',   dn: '18+', dd: 'FMCG, luxury and e-commerce brands' },
    { ico: '🏛', i: 'is6-i', n: 'is6-n', d: 'is6-d', di: 'Public Sector',       dn: '12+', dd: 'Government and infrastructure bodies' },
  ]

  return (
    <>
      <Head><title>Clients — Meridian Group</title></Head>
      <Nav />
      <AdminBar />

      <section className="ph">
        <div className="ph-bg" />
        <div className="ph-inner">
          <div className="ph-breadcrumb"><Link href="/">Home</Link><span>/</span>Clients</div>
          <Editable tag="span" id="cl-ph-eye"   content={c('cl-ph-eye', 'Our Clients')} className="eyebrow" />
          <Editable tag="h1"   id="cl-ph-title" content={c('cl-ph-title', 'Trusted by<br>the ambitious.')} className="ph-title" />
          <Editable tag="p"    id="cl-ph-sub"   content={c('cl-ph-sub', '200+ organizations across 15 countries and 6 industries.')} className="ph-sub" />
          <div className="ph-line" />
        </div>
      </section>

      {/* Logo grid */}
      <section className="sec-pad" style={{ background: 'var(--white)' }}>
        <div className="si">
          <div className="sh c rev">
            <Editable tag="span" id="lg-eye"   content={c('lg-eye', 'Client Roster')} className="eyebrow" />
            <Editable tag="h2"   id="lg-title" content={c('lg-title', 'Organizations that trust Meridian.')} className="sec-title" style={{ color: 'var(--text-d)' }} />
          </div>
          <div className="logos-grid rev">
            {logos.map((l, i) => (
              <div key={i} className="logo-cell" style={{ '--lc': `${l.color}28` }}>
                <div className="logo-mono" style={{ color: l.color }}>{l.ini}</div>
                <span className="logo-text">{l.name}</span>
                <span className="logo-sector">{l.sector}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="sec-pad" style={{ background: 'var(--cream)' }}>
        <div className="si">
          <div className="sh c rev">
            <Editable tag="span" id="tst-eye"   content={c('tst-eye', 'What Clients Say')} className="eyebrow" />
            <Editable tag="h2"   id="tst-title" content={c('tst-title', 'In their own words.')} className="sec-title" style={{ color: 'var(--text-d)' }} />
          </div>
          <div className="tst-grid">
            {testimonials.map((t, i) => (
              <div key={i} className={`tst-card rev d${(i % 3) + 1}${t.featured ? ' featured' : ''}`}>
                <div className="tst-stars">{'★'.repeat(t.stars).split('').map((s, j) => <span key={j} className="tst-star">{s}</span>)}</div>
                <div className="tst-qmark">"</div>
                <Editable tag="p" id={t.q} content={c(t.q, t.dq)} className="tst-q" />
                <div className="tst-author">
                  <div className="tst-avatar">{t.init}</div>
                  <div>
                    <Editable tag="div" id={t.n} content={c(t.n, t.dn)} className="tst-name" />
                    <Editable tag="div" id={t.r} content={c(t.r, t.dr)} className="tst-role" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry breakdown */}
      <section className="sec-pad" style={{ background: 'var(--dark)' }}>
        <div className="si">
          <div className="sh c rev">
            <Editable tag="span" id="ind-eye"   content={c('ind-eye', 'By Sector')} className="eyebrow" />
            <Editable tag="h2"   id="ind-title" content={c('ind-title', "Where we've done the work.")} className="sec-title" style={{ color: 'var(--white)' }} />
          </div>
          <div className="ind-stats">
            {sectors.map((s, i) => (
              <div key={i} className={`is-card rev d${(i % 3) + 1}`}>
                <div className="is-ico">{s.ico}</div>
                <Editable tag="div" id={s.i} content={c(s.i, s.di)} className="is-industry" />
                <Editable tag="div" id={s.n} content={c(s.n, s.dn)} className="is-num" />
                <Editable tag="div" id={s.d} content={c(s.d, s.dd)} className="is-desc" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="sec-pad" style={{ background: 'var(--white)' }}>
        <div className="si">
          <div className="trust-strip rev">
            <Editable tag="h3" id="ts-t" content={c('ts-t', "The number that matters most to us isn't revenue. It's 97%.")} />
            <Editable tag="p"  id="ts-d" content={c('ts-d', "That's our client retention rate, year-over-year, since founding. It tells us we're doing the right things — and it tells every prospective client something important about what working with us is actually like.")} />
            <div className="trust-stats">
              {[['ts1-n','97%','ts1-l','Client retention'],['ts2-n','78%','ts2-l','Clients expand engagements'],['ts3-n','91%','ts3-l','Referral-based new business']].map(([nk,nd,lk,ld]) => (
                <div key={nk} className="ts-item">
                  <Editable tag="span" id={nk} content={c(nk, nd)} className="ts-num" />
                  <Editable tag="span" id={lk} content={c(lk, ld)} className="ts-lbl" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="cta-sec">
        <div className="cta-inner rev">
          <Editable tag="h2" id="cl-cta-t" content={c('cl-cta-t', "Join the list of organizations we're proud to work with.")} className="cta-title" />
          <Editable tag="p"  id="cl-cta-s" content={c('cl-cta-s', "We're selective about who we work with — not because we're precious about it, but because selectivity is how we protect the quality of every engagement we take on.")} className="cta-sub" />
          <Link href="/contact" className="btn-dark">Start a Conversation →</Link>
        </div>
      </section>

      <Footer />
    </>
  )
}

export async function getServerSideProps({ locale }) {
  const content = await getPageContent('clients', locale)
  return { props: { content } }
}
