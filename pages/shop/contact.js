import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ShopNav from '../../components/ShopNav'
import CartDrawer from '../../components/CartDrawer'
import ShopFooter from '../../components/ShopFooter'

const faqs = [
  { q: 'How long does shipping take?', a: 'Standard shipping takes 3–5 business days. Free 2-day shipping on orders over $100.' },
  { q: 'What is your return policy?', a: 'We offer free returns within 30 days of delivery. No questions asked — just contact us and we will arrange a pickup.' },
  { q: 'Is my order covered by warranty?', a: 'Yes. Every NOUX product comes with a 2-year warranty covering manufacturing defects.' },
  { q: 'Do you ship internationally?', a: 'We currently ship to the US, Canada, UK, EU, and Australia. More regions coming soon.' },
]

export default function Contact() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setSent(true)
  }

  return (
    <>
      <Head>
        <title>Contact NOUX — Get in Touch</title>
        <meta name="description" content="Questions about your order, shipping, or products? We are here to help." />
      </Head>

      <div className="announce-bar">Free shipping on orders over $100 · Use code LAUNCH for 10% off</div>
      <ShopNav />
      <CartDrawer />

      <section className="ph">
        <div className="ph-bg" />
        <div className="ph-inner">
          <div className="ph-breadcrumb">
            <Link href="/">Home</Link><span>›</span><span>Contact</span>
          </div>
          <h1 className="ph-title">We are here to help.</h1>
          <p className="ph-sub">Questions about your order, a product, or anything else — reach out and we will get back to you within 24 hours.</p>
          <div className="ph-line" />
        </div>
      </section>

      <section className="sec-pad" style={{ background: 'var(--white)' }}>
        <div className="si">
          <div className="contact-grid">
            {/* Form */}
            <div>
              <div className="sh rev" style={{ marginBottom: '2rem' }}>
                <span className="eyebrow">Send a Message</span>
                <h2 className="sec-title" style={{ color: 'var(--text-d)' }}>Get in touch.</h2>
              </div>

              {sent ? (
                <div className="form-success show rev">
                  <div className="tick">✓</div>
                  <h3>Message sent!</h3>
                  <p>Thanks for reaching out. We will get back to you within 24 hours.</p>
                </div>
              ) : (
                <form className="contact-form rev d1" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Your Name</label>
                      <input type="text" placeholder="Jane Smith" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
                    </div>
                    <div className="form-group">
                      <label>Email Address</label>
                      <input type="email" placeholder="jane@example.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Subject</label>
                    <select value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}>
                      <option value="">Select a topic…</option>
                      <option>Order issue</option>
                      <option>Shipping question</option>
                      <option>Product question</option>
                      <option>Return or refund</option>
                      <option>Warranty claim</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Message</label>
                    <textarea rows={5} placeholder="Tell us how we can help…" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required />
                  </div>
                  <button type="submit" className="submit-btn">Send Message →</button>
                </form>
              )}
            </div>

            {/* Info panel */}
            <div className="info-panel">
              <div className="info-card rev d2">
                <h4>Contact Details</h4>
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
                <h4>Quick Links</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '.65rem', marginTop: '.5rem' }}>
                  {[
                    { label: 'Track your order', href: '/order-success' },
                    { label: 'Start a return', href: '/contact' },
                    { label: 'View all products', href: '/products' },
                    { label: 'About NOUX', href: '/about' },
                  ].map(l => (
                    <Link key={l.label} href={l.href} className="careers-link">{l.label} →</Link>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div className="rev d4">
                <h4 style={{ fontFamily: 'var(--ff-b)', fontSize: '.7rem', fontWeight: 500, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--mist)', marginBottom: '1rem' }}>Common Questions</h4>
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
