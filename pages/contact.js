import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import AdminBar from '../components/AdminBar'
import Editable from '../components/Editable'
import { AdminProvider } from '../context/AdminContext'
import { getPageContent } from '../lib/content'

export default function Contact({ content }) {
  return (
    <AdminProvider page="contact">
      <ContactContent content={content} />
    </AdminProvider>
  )
}

function ContactContent({ content }) {
  const c = (key, fallback = '') => content[key] ?? fallback

  const [form, setForm]       = useState({ name: '', company: '', email: '', phone: '', service: '', budget: '', message: '', consent: false })
  const [status, setStatus]   = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')
  const [openFaq, setOpenFaq] = useState(null)

  function update(field) {
    return e => setForm(f => ({ ...f, [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) { setErrorMsg('Please fill in all required fields.'); return }
    if (!form.consent) { setErrorMsg('Please agree to the Privacy Policy to continue.'); return }
    setErrorMsg('')
    setStatus('loading')

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (res.ok) {
      setStatus('success')
    } else {
      const data = await res.json()
      setErrorMsg(data.error || 'Something went wrong. Please try again.')
      setStatus('idle')
    }
  }

  const faqs = [
    { q: 'faq1-q', a: 'faq1-a', dq: 'What size of engagement do you take on?', da: "We work with organizations of all sizes, from high-growth scale-ups to global enterprises. Our smallest engagements typically start at €150K. What matters more than size is fit: we take on work where we believe we can make a real difference." },
    { q: 'faq2-q', a: 'faq2-a', dq: 'How quickly can you mobilize a team?',    da: "We can typically mobilize a full team within two weeks of contract signature. For urgent situations — a crisis, an imminent decision, or a time-sensitive opportunity — we've moved meaningfully faster than that." },
    { q: 'faq3-q', a: 'faq3-a', dq: 'Do you work outside your listed industries?', da: "Yes, selectively. While we have particularly deep expertise in our six focus sectors, we take on engagements in adjacent areas where our core capabilities clearly translate. If you're unsure whether we're the right fit, tell us what you're working on and we'll give you an honest answer." },
    { q: 'faq4-q', a: 'faq4-a', dq: 'Will the partner I meet lead the engagement?', da: "Yes. We don't pitch with senior partners and then hand work to junior teams. The partner you meet during the sales process is the same person who leads your engagement and stays accountable for outcomes throughout." },
    { q: 'faq5-q', a: 'faq5-a', dq: 'How do you handle confidentiality?', da: "We sign NDAs before any substantive conversation, and we treat client confidentiality with the same seriousness as our own reputation. We never disclose client identities or project details without explicit permission." },
  ]

  const offices = [
    { flag: '🇬🇧', city: 'co1-c', tag: 'co1-t', addr: 'co1-a', dc: 'London',    dt: 'Headquarters · EMEA', da: '10 Grosvenor Square, Mayfair\nLondon W1K 6JP, United Kingdom\n+44 20 7946 0958' },
    { flag: '🇺🇸', city: 'co2-c', tag: 'co2-t', addr: 'co2-a', dc: 'New York',  dt: 'Americas',             da: '1 World Trade Center, Floor 68\nNew York, NY 10007, USA\n+1 212 555 0192' },
    { flag: '🇸🇬', city: 'co3-c', tag: 'co3-t', addr: 'co3-a', dc: 'Singapore', dt: 'Asia-Pacific',         da: 'Marina Bay Financial Centre\nTower 3, Level 24, Singapore 018982\n+65 6123 4567' },
    { flag: '🇦🇪', city: 'co4-c', tag: 'co4-t', addr: 'co4-a', dc: 'Dubai',     dt: 'Middle East',          da: 'DIFC Gate Village, Building 4\nLevel 5, Dubai, UAE\n+971 4 555 0234' },
  ]

  const inputStyle = { fontFamily: 'var(--ff-b)', fontSize: '.92rem', color: 'var(--text-d)', background: 'var(--white)', border: '1.5px solid rgba(14,31,46,.15)', borderRadius: 12, padding: '.85rem 1rem', outline: 'none', width: '100%' }

  return (
    <>
      <Head><title>Contact — Meridian Group</title></Head>
      <Nav />
      <AdminBar />

      <section className="ph">
        <div className="ph-bg" />
        <div className="ph-inner">
          <div className="ph-breadcrumb"><Link href="/">Home</Link><span>/</span>Contact</div>
          <Editable tag="span" id="ct-ph-eye"   content={c('ct-ph-eye', 'Get in Touch')} className="eyebrow" />
          <Editable tag="h1"   id="ct-ph-title" content={c('ct-ph-title', "Let's start a<br>conversation.")} className="ph-title" />
          <Editable tag="p"    id="ct-ph-sub"   content={c('ct-ph-sub', 'No pitch decks, no obligation. Just a genuine conversation about what you\'re facing and whether we can help.')} className="ph-sub" />
          <div className="ph-line" />
        </div>
      </section>

      {/* Form + info */}
      <section className="sec-pad" style={{ background: 'var(--white)' }}>
        <div className="si">
          <div className="contact-grid">

            {/* FORM */}
            <div className="rev">
              <div className="sh" style={{ marginBottom: '2.2rem' }}>
                <Editable tag="span" id="ct-form-eye"  content={c('ct-form-eye', 'Send us a message')} className="eyebrow" />
                <Editable tag="h2"   id="ct-form-title" content={c('ct-form-title', 'Tell us about your challenge.')} className="sec-title" style={{ color: 'var(--text-d)', fontSize: 'clamp(1.6rem,3vw,2.2rem)' }} />
                <Editable tag="p"    id="ct-form-sub"  content={c('ct-form-sub', "We read every message ourselves. You'll hear from a partner within 48 hours.")} style={{ fontSize: '.92rem', fontWeight: 300, color: '#6B7E8E', lineHeight: 1.75 }} />
              </div>

              {status === 'success' ? (
                <div className="form-success show">
                  <span className="tick">✓</span>
                  <h3>Message received.</h3>
                  <p>A Meridian partner will personally review your message and respond within 48 hours.</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="f-name">Full Name *</label>
                      <input id="f-name" type="text" style={inputStyle} placeholder="Elena Vasquez" value={form.name} onChange={update('name')} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="f-company">Company</label>
                      <input id="f-company" type="text" style={inputStyle} placeholder="Apex Financial" value={form.company} onChange={update('company')} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="f-email">Work Email *</label>
                      <input id="f-email" type="email" style={inputStyle} placeholder="elena@apexfinancial.com" value={form.email} onChange={update('email')} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="f-phone">Phone</label>
                      <input id="f-phone" type="tel" style={inputStyle} placeholder="+44 20 7946 0000" value={form.phone} onChange={update('phone')} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="f-service">Primary Area of Interest</label>
                    <select id="f-service" style={{ ...inputStyle, backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%238AA4BE' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', paddingRight: '2.5rem' }} value={form.service} onChange={update('service')}>
                      <option value="">Select a practice area…</option>
                      {['Strategy & Transformation','Technology Advisory','Digital Innovation','Financial Consulting','Operations Excellence','Risk & Compliance','Not sure yet'].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="f-budget">Approximate Engagement Budget</label>
                    <select id="f-budget" style={{ ...inputStyle, backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%238AA4BE' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', paddingRight: '2.5rem' }} value={form.budget} onChange={update('budget')}>
                      <option value="">Select a range…</option>
                      {['€150K – €500K','€500K – €2M','€2M – €10M','€10M+','Prefer to discuss'].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="f-msg">What are you working on? *</label>
                    <textarea id="f-msg" style={{ ...inputStyle, resize: 'vertical', minHeight: 120, lineHeight: 1.6 }} placeholder="Describe the challenge, the context, and what success would look like for you." value={form.message} onChange={update('message')} required />
                  </div>
                  <div className="form-consent">
                    <input type="checkbox" id="f-consent" checked={form.consent} onChange={update('consent')} />
                    <label htmlFor="f-consent">I agree to Meridian Group's <Link href="#">Privacy Policy</Link> and consent to being contacted about this inquiry.</label>
                  </div>
                  {errorMsg && <div style={{ fontSize: '.82rem', color: '#cc4444', background: 'rgba(204,68,68,.08)', padding: '.6rem .9rem', borderRadius: 8 }}>{errorMsg}</div>}
                  <button type="submit" className="submit-btn" disabled={status === 'loading'}>
                    {status === 'loading' ? 'Sending…' : 'Send Message →'}
                  </button>
                </form>
              )}
            </div>

            {/* INFO PANEL */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }} className="rev d2">
              <div className="info-card">
                <Editable tag="h4" id="ct-contact-h" content={c('ct-contact-h', 'Direct Contact')} />
                <div className="info-item"><span className="info-ico">✉</span><span className="info-text"><strong>New Business</strong><br /><a href={`mailto:${c('ct-email','hello@meridiangroup.com')}`}>{c('ct-email','hello@meridiangroup.com')}</a></span></div>
                <div className="info-item"><span className="info-ico">📞</span><span className="info-text"><strong>London (HQ)</strong><br />{c('ct-phone','+44 20 7946 0958')}</span></div>
                <div className="info-item"><span className="info-ico">🕐</span><span className="info-text"><strong>Response time</strong><br />{c('ct-resp','Partner-level response within 48 hours')}</span></div>
              </div>
              <div className="info-card">
                <Editable tag="h4" id="ct-expect-h" content={c('ct-expect-h', 'What to expect')} />
                <div className="info-item"><span className="info-ico">1</span><Editable tag="span" id="ct-e1" content={c('ct-e1', 'A partner reads your message and responds personally — no sales team handoff.')} className="info-text" /></div>
                <div className="info-item"><span className="info-ico">2</span><Editable tag="span" id="ct-e2" content={c('ct-e2', "We'll suggest a 30-minute call to understand your situation before discussing scope.")} className="info-text" /></div>
                <div className="info-item"><span className="info-ico">3</span><Editable tag="span" id="ct-e3" content={c('ct-e3', "If we're a good fit, we'll outline a tailored proposal within a week. If not, we'll say so honestly.")} className="info-text" /></div>
              </div>
              <div className="info-card" style={{ background: 'var(--dark)' }}>
                <Editable tag="h4" id="ct-careers-h" content={c('ct-careers-h', 'Thinking about joining us?')} style={{ color: '#fff' }} />
                <Editable tag="p" id="ct-careers-t" content={c('ct-careers-t', 'We hire a small number of exceptional consultants each year — people who combine analytical rigor with genuine curiosity.')} style={{ fontSize: '.85rem', color: 'var(--mist)', lineHeight: 1.7, marginTop: '.5rem' }} />
                <a href="mailto:careers@meridiangroup.com" style={{ display: 'inline-flex', alignItems: 'center', gap: '.4rem', fontSize: '.82rem', fontWeight: 500, color: 'var(--amber)', marginTop: '1rem' }}>careers@meridiangroup.com →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offices */}
      <section className="sec-pad" style={{ background: 'var(--dark)' }}>
        <div className="si">
          <div className="sh c rev">
            <Editable tag="span" id="off-eye"   content={c('off-eye', 'Our Offices')} className="eyebrow" />
            <Editable tag="h2"   id="off-title" content={c('off-title', 'Find us anywhere.')} className="sec-title" style={{ color: 'var(--white)' }} />
          </div>
          <div className="co-grid">
            {offices.map((o, i) => (
              <div key={i} className={`co-card rev d${i + 1}`}>
                <div className="co-flag">{o.flag}</div>
                <Editable tag="div" id={o.city} content={c(o.city, o.dc)} className="co-city" />
                <Editable tag="div" id={o.tag}  content={c(o.tag, o.dt)}  className="co-tag" />
                <Editable tag="p"   id={o.addr} content={c(o.addr, o.da)} className="co-addr" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="sec-pad" style={{ background: 'var(--cream)' }}>
        <div className="si">
          <div className="sh c rev">
            <Editable tag="span" id="faq-eye"   content={c('faq-eye', 'Common Questions')} className="eyebrow" />
            <Editable tag="h2"   id="faq-title" content={c('faq-title', 'Before you reach out.')} className="sec-title" style={{ color: 'var(--text-d)' }} />
          </div>
          <div className="faq-list rev" style={{ maxWidth: 800, margin: '0 auto' }}>
            {faqs.map((faq, i) => (
              <div key={i} className={`faq-item${openFaq === i ? ' open' : ''}`}>
                <div className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <Editable tag="span" id={faq.q} content={c(faq.q, faq.dq)} className="faq-q-text" />
                  <span className="faq-arrow">▾</span>
                </div>
                <div className="faq-a">
                  <Editable tag="div" id={faq.a} content={c(faq.a, faq.da)} className="faq-a-inner" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export async function getServerSideProps({ locale }) {
  const content = await getPageContent('contact', locale)
  return { props: { content } }
}
