import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import ShopNav from '../../components/ShopNav'
import CartDrawer from '../../components/CartDrawer'
import ShopFooter from '../../components/ShopFooter'
import { useShopT } from '../../lib/shopI18n'

export default function Contact() {
  const t = useShopT()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  const faqs = [
    { q: t.faq1q, a: t.faq1a },
    { q: t.faq2q, a: t.faq2a },
    { q: t.faq3q, a: t.faq3a },
    { q: t.faq4q, a: t.faq4a },
  ]

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setSent(true)
  }

  return (
    <>
      <Head>
        <title>{t.contactTitle} — NOUX</title>
        <meta name="description" content={t.contactSub} />
      </Head>

      <div className="announce-bar">{t.announce}</div>
      <ShopNav />
      <CartDrawer />

      <section className="ph">
        <div className="ph-bg" />
        <div className="ph-inner">
          <div className="ph-breadcrumb">
            <Link href="/">Home</Link><span>›</span><span>{t.navContact}</span>
          </div>
          <h1 className="ph-title">{t.contactTitle}</h1>
          <p className="ph-sub">{t.contactSub}</p>
          <div className="ph-line" />
        </div>
      </section>

      <section className="sec-pad" style={{ background: 'var(--white)' }}>
        <div className="si">
          <div className="contact-grid">
            {/* Form */}
            <div>
              <div className="sh rev" style={{ marginBottom: '2rem' }}>
                <span className="eyebrow">{t.contactFormEye}</span>
                <h2 className="sec-title" style={{ color: 'var(--text-d)' }}>{t.contactFormTitle}</h2>
              </div>

              {sent ? (
                <div className="form-success show rev">
                  <div className="tick">✓</div>
                  <h3>{t.sentTitle}</h3>
                  <p>{t.sentSub}</p>
                </div>
              ) : (
                <form className="contact-form rev d1" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>{t.yourName}</label>
                      <input type="text" placeholder="Jane Smith" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
                    </div>
                    <div className="form-group">
                      <label>{t.yourEmail}</label>
                      <input type="email" placeholder="jane@example.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>{t.subject}</label>
                    <select value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}>
                      <option value="">{t.subjectPlaceholder}</option>
                      <option>Order issue</option>
                      <option>Shipping question</option>
                      <option>Product question</option>
                      <option>Return or refund</option>
                      <option>Warranty claim</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>{t.message}</label>
                    <textarea rows={5} placeholder={t.messagePlaceholder} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required />
                  </div>
                  <button type="submit" className="submit-btn">{t.send}</button>
                </form>
              )}
            </div>

            {/* Info panel */}
            <div className="info-panel">
              <div className="info-card rev d2">
                <h4>{t.contactDetails}</h4>
                <div className="info-item">
                  <span className="info-ico">📧</span>
                  <div className="info-text"><strong>Email</strong><br />support@noux.co</div>
                </div>
                <div className="info-item">
                  <span className="info-ico">💬</span>
                  <div className="info-text"><strong>Live Chat</strong><br />Available Mon–Fri, 9am–6pm CET</div>
                </div>
                <div className="info-item">
                  <span className="info-ico">📦</span>
                  <div className="info-text"><strong>Order Support</strong><br />Reply within 24 hours</div>
                </div>
              </div>

              <div className="info-card dark rev d3">
                <h4>{t.quickLinks}</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '.65rem', marginTop: '.5rem' }}>
                  {[
                    { label: 'Track your order', href: '/shop/order-success' },
                    { label: 'Start a return', href: '/shop/contact' },
                    { label: 'View all products', href: '/shop/products' },
                    { label: 'About NOUX', href: '/shop/about' },
                  ].map(l => (
                    <Link key={l.label} href={l.href} className="careers-link">{l.label} →</Link>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div className="rev d4">
                <h4 style={{ fontFamily: 'var(--ff-b)', fontSize: '.7rem', fontWeight: 500, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--mist)', marginBottom: '1rem' }}>{t.faqTitle}</h4>
                <div className="faq-list">
                  {faqs.map((f, i) => (
                    <div key={i} className={`faq-item${openFaq === i ? ' open' : ''}`}>
                      <div className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                        <span className="faq-q-text">{f.q}</span>
                        <span className="faq-arrow">▾</span>
                      </div>
                      <div className="faq-a">
                        <div className="faq-a-inner">{f.a}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ShopFooter />
    </>
  )
}
