import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import ShopNav from '../../components/ShopNav'
import ShopFooter from '../../components/ShopFooter'
import { useCart } from '../../context/CartContext'

const COUNTRIES = ['United States', 'United Kingdom', 'Germany', 'France', 'Hungary', 'Turkey', 'Australia', 'Canada', 'Netherlands', 'Sweden', 'Other']

export default function Checkout() {
  const router = useRouter()
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
        <title>Checkout — NOUX</title>
      </Head>

      <div className="announce-bar">
        Free shipping on orders over $100 &nbsp;·&nbsp; Use code <strong>LAUNCH</strong> for 10% off
      </div>

      <ShopNav />

      <section className="checkout-page" style={{ paddingTop: 'calc(3rem + 2.25rem)' }}>
        <div className="si">
          <h1 style={{ fontFamily: 'var(--ff-h)', fontSize: 'clamp(1.6rem,3.5vw,2.2rem)', fontWeight: 700, color: 'var(--text-d)', marginBottom: '1.5rem' }}>Checkout</h1>

          <div className="progress-bar">
            <div className="prog-step active">
              <div className="ps-dot">1</div>
              <span>Shipping</span>
            </div>
            <div className="prog-line" />
            <div className="prog-step">
              <div className="ps-dot">2</div>
              <span>Payment</span>
            </div>
            <div className="prog-line" />
            <div className="prog-step">
              <div className="ps-dot">3</div>
              <span>Confirm</span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="checkout-grid">
              {/* LEFT — Form */}
              <div>
                <div className="checkout-section">
                  <h2 className="checkout-section-title">Shipping Information</h2>
                  <div className="form-row">
                    <div className="form-group">
                      <label>First Name</label>
                      <input type="text" value={form.firstName} onChange={set('firstName')} placeholder="John" />
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input type="text" value={form.lastName} onChange={set('lastName')} placeholder="Doe" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" value={form.email} onChange={set('email')} placeholder="john@example.com" />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" value={form.phone} onChange={set('phone')} placeholder="+1 555 000 0000" />
                  </div>
                  <div className="form-group">
                    <label>Street Address</label>
                    <input type="text" value={form.address} onChange={set('address')} placeholder="123 Main Street" />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>City</label>
                      <input type="text" value={form.city} onChange={set('city')} placeholder="New York" />
                    </div>
                    <div className="form-group">
                      <label>ZIP / Postal Code</label>
                      <input type="text" value={form.zip} onChange={set('zip')} placeholder="10001" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Country</label>
                    <select value={form.country} onChange={set('country')}>
                      {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                <div className="checkout-section">
                  <h2 className="checkout-section-title">Payment Information</h2>
                  <div className="payment-soon-card">
                    <div className="lock-ico">🔒</div>
                    <h4>Secure payment powered by Stripe</h4>
                    <p>Payment processing is coming soon. We'll email you when it goes live.</p>
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
                  {loading ? 'Placing order…' : 'Place Order →'}
                </button>
              </div>

              {/* RIGHT — Summary */}
              <div className="co-summary-card">
                <div className="co-summary-title">Order Summary ({cart.reduce((s, i) => s + i.quantity, 0)} items)</div>
                {cart.map(({ product, quantity }) => (
                  <div className="co-item" key={product.id}>
                    <img className="co-item-img" src={product.image} alt={product.name} />
                    <span className="co-item-name">{product.name} × {quantity}</span>
                    <span className="co-item-price">${(product.price * quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="co-totals">
                  <div className="co-row"><span>Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
                  <div className="co-row">
                    <span>Shipping</span>
                    <span style={{ color: shipping === 0 ? '#10B981' : 'inherit' }}>
                      {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="co-row total"><span>Total</span><span>${total.toFixed(2)}</span></div>
                </div>
                <div className="co-trust-badges">
                  <div className="co-trust-item"><span>🔒</span><span>256-bit SSL encryption</span></div>
                  <div className="co-trust-item"><span>🛡️</span><span>2-year warranty on all products</span></div>
                  <div className="co-trust-item"><span>↩️</span><span>30-day free returns</span></div>
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
