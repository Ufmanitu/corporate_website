import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import ShopNav from '../../components/ShopNav'
import CartDrawer from '../../components/CartDrawer'
import ShopFooter from '../../components/ShopFooter'
import AdminBar from '../../components/AdminBar'
import Editable from '../../components/Editable'
import { AdminProvider, useAdmin } from '../../context/AdminContext'
import { getShopContent } from '../../lib/shopContent'

export default function Contact({ content }) {
  return (
    <AdminProvider page="shop_contact">
      <ContactContent content={content} />
    </AdminProvider>
  )
}

function ContactContent({ content }) {
  const t = content
  const c = key => content[key] ?? ''
  const { isAdmin } = useAdmin()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  const faqKeys = [
    { qKey: 'faq1q', aKey: 'faq1a' },
    { qKey: 'faq2q', aKey: 'faq2a' },
    { qKey: 'faq3q', aKey: 'faq3a' },
    { qKey: 'faq4q', aKey: 'faq4a' },
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
      <AdminBar />

      <section className="ph">
        <div className="ph-bg" />
        <div className="ph-inner">
          <div className="ph-breadcrumb">
            <Link href="/">Home</Link><span>›</span><span>{t.navContact}</span>
          </div>
          <Editable tag="h1" id="contactTitle" content={c('contactTitle')} className="ph-title" />
          <Editable tag="p" id="contactSub" content={c('contactSub')} className="ph-sub" />
          <div className="ph-line" />
        </div>
      </section>

      <section className="sec-pad" style={{ background: 'var(--white)' }}>
        <div className="si">
          <div className="contact-grid">
            <div>
              <div className="sh rev" style={{ marginBottom: '2rem' }}>
                <Editable tag="span" id="contactFormEye" content={c('contactFormEye')} className="eyebrow" />
                <Editable tag="h2" id="contactFormTitle" content={c('contactFormTitle')} className="sec-title" style={{ color: 'var(--text-d)' }} />
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

              <div className="rev d4">
                <h4 style={{ fontFamily: 'var(--ff-b)', fontSize: '.7rem', fontWeight: 500, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--mist)', marginBottom: '1rem' }}>{t.faqTitle}</h4>
                <div className="faq-list">
                  {faqKeys.map((fk, i) => (
                    <div key={i} className={`faq-item${openFaq === i ? ' open' : ''}`}>
                      <div className="faq-q" onClick={() => !isAdmin && setOpenFaq(openFaq === i ? null : i)}>
                        <Editable tag="span" id={fk.qKey} content={c(fk.qKey)} className="faq-q-text" />
                        <span className="faq-arrow">▾</span>
                      </div>
                      <div className="faq-a">
                        <Editable tag="div" id={fk.aKey} content={c(fk.aKey)} className="faq-a-inner" />
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

export async function getServerSideProps({ locale }) {
  const content = await getShopContent('contact', locale)
  return { props: { content } }
}
