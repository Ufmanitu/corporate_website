import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import ShopNav from '../../components/ShopNav'
import ShopFooter from '../../components/ShopFooter'
import { useCart } from '../../context/CartContext'
import { useShopT } from '../../lib/shopI18n'

const COUNTRIES = ['United States', 'United Kingdom', 'Germany', 'France', 'Hungary', 'Turkey', 'Australia', 'Canada', 'Netherlands', 'Sweden', 'Other']

export default function Checkout() {
  const router = useRouter()
  const t = useShopT()
  const { cart, cartTotal } = useCart()
  const shipping = cartTotal >= 100 ? 0 : 9.99
  const total = cartTotal + shipping

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', zip: '', country: 'United States',
  })
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)

  function set(k) { return e => setForm(f => ({ ...f, [k]: e.target.value })) }

  function handleSubmit(e) {
    e.preventDefault()
    const missing = Object.entries(form).find(([, v]) => !v.trim())
    if (missing) { setErr('Please fill in all fields.'); return }
    if (!form.email.includes('@')) { setErr('Please enter a valid email address.'); return }
    setErr('')
    setLoading(true)
    setTimeout(() => router.push('/shop/order-success'), 800)
  }

  return (
    <>
      <Head>
        <title>{t.checkoutTitle} — NOUX</title>
      </Head>

      <div className="announce-bar">{t.announce}</div>

      <ShopNav />

      <section className="checkout-page" style={{ paddingTop: '7rem' }}>
        <div className="si">
          <h1 style={{ fontFamily: 'var(--ff-h)', fontSize: 'clamp(1.6rem,3.5vw,2.2rem)', fontWeight: 700, color: 'var(--text-d)', marginBottom: '1.5rem' }}>{t.checkoutTitle}</h1>

          <div className="progress-bar">
            <div className="prog-step active">
              <div className="ps-dot">1</div>
              <span>{t.stepShipping}</span>
            </div>
            <div className="prog-line" />
            <div className="prog-step">
              <div className="ps-dot">2</div>
              <span>{t.stepPayment}</span>
            </div>
            <div className="prog-line" />
            <div className="prog-step">
              <div className="ps-dot">3</div>
              <span>{t.stepConfirm}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="checkout-grid">
              {/* LEFT — Form */}
              <div>
                <div className="checkout-section">
                  <h2 className="checkout-section-title">{t.shippingInfo}</h2>
                  <div className="form-row">
                    <div className="form-group">
                      <label>{t.firstName}</label>
                      <input type="text" value={form.firstName} onChange={set('firstName')} placeholder="John" />
                    </div>
                    <div className="form-group">
                      <label>{t.lastName}</label>
                      <input type="text" value={form.lastName} onChange={set('lastName')} placeholder="Doe" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>{t.email}</label>
                    <input type="email" value={form.email} onChange={set('email')} placeholder="john@example.com" />
                  </div>
                  <div className="form-group">
                    <label>{t.phone}</label>
                    <input type="tel" value={form.phone} onChange={set('phone')} placeholder="+1 555 000 0000" />
                  </div>
                  <div className="form-group">
                    <label>{t.address}</label>
                    <input type="text" value={form.address} onChange={set('address')} placeholder="123 Main Street" />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>{t.city}</label>
                      <input type="text" value={form.city} onChange={set('city')} placeholder="New York" />
                    </div>
                    <div className="form-group">
                      <label>{t.zip}</label>
                      <input type="text" value={form.zip} onChange={set('zip')} placeholder="10001" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>{t.country}</label>
                    <select value={form.country} onChange={set('country')}>
                      {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                <div className="checkout-section">
                  <h2 className="checkout-section-title">{t.paymentInfo}</h2>
                  <div className="payment-soon-card">
                    <div className="lock-ico">🔒</div>
                    <h4>{t.paymentSoon}</h4>
                    <p>{t.paymentNote}</p>
                    <div className="payment-cards">
                      <span className="payment-card-badge">VISA</span>
                      <span className="payment-card-badge">MC</span>
                      <span className="payment-card-badge">AMEX</span>
                      <span className="payment-card-badge">PAYPAL</span>
                    </div>
                  </div>
                </div>

                {err && <p className="checkout-err">{err}</p>}
                <button type="submit" className="checkout-submit" disabled={loading}>
                  {loading ? '…' : t.placeOrder}
                </button>
              </div>

              {/* RIGHT — Summary */}
              <div className="co-summary-card">
                <div className="co-summary-title">{t.orderSummary} ({cart.reduce((s, i) => s + i.quantity, 0)})</div>
                {cart.map(({ product, quantity }) => (
                  <div className="co-item" key={product.id}>
                    <img className="co-item-img" src={product.image} alt={product.name} />
                    <span className="co-item-name">{product.name} × {quantity}</span>
                    <span className="co-item-price">${(product.price * quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="co-totals">
                  <div className="co-row"><span>{t.subtotal}</span><span>${cartTotal.toFixed(2)}</span></div>
                  <div className="co-row">
                    <span>{t.shipping}</span>
                    <span style={{ color: shipping === 0 ? '#10B981' : 'inherit' }}>
                      {shipping === 0 ? t.shippingFree : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="co-row total"><span>{t.total}</span><span>${total.toFixed(2)}</span></div>
                </div>
                <div className="co-trust-badges">
                  <div className="co-trust-item"><span>🔒</span><span>{t.sslNote}</span></div>
                  <div className="co-trust-item"><span>🛡️</span><span>{t.warranty}</span></div>
                  <div className="co-trust-item"><span>↩️</span><span>{t.returns}</span></div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      <ShopFooter />
    </>
  )
}
