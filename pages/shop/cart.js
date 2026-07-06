import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import ShopNav from '../../components/ShopNav'
import CartDrawer from '../../components/CartDrawer'
import ShopFooter from '../../components/ShopFooter'
import { useCart } from '../../context/CartContext'
import { useShopT } from '../../lib/shopI18n'

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart()
  const t = useShopT()
  const [promoMsg, setPromoMsg] = useState('')
  const [promoVal, setPromoVal] = useState('')
  const shipping = cartTotal > 0 && cartTotal >= 100 ? 0 : cartTotal > 0 ? 9.99 : 0
  const total = cartTotal + shipping

  function applyPromo(e) {
    e.preventDefault()
    setPromoMsg(promoVal.trim() ? 'Invalid or expired code.' : 'Please enter a code.')
  }

  return (
    <>
      <Head>
        <title>{t.cartTitle} — NOUX</title>
      </Head>

      <div className="announce-bar">{t.announce}</div>

      <ShopNav />
      <CartDrawer />

      <section className="cart-page" style={{ paddingTop: 'calc(3rem + 2.25rem)' }}>
        <div className="si">
          <h1 style={{ fontFamily: 'var(--ff-h)', fontSize: 'clamp(1.8rem,4vw,2.6rem)', fontWeight: 700, color: 'var(--text-d)', marginBottom: '.4rem' }}>{t.cartTitle}</h1>
          <p style={{ color: '#9AA5B0', fontSize: '.9rem', marginBottom: '0' }}>{cart.reduce((s, i) => s + i.quantity, 0)} {t.products}</p>

          {cart.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-ico">🛒</div>
              <h2>{t.cartEmpty}</h2>
              <p>{t.cartEmptySub}</p>
              <Link href="/shop/products" className="btn-a">{t.continueShopping}</Link>
            </div>
          ) : (
            <div className="cart-grid">
              {/* Cart Items */}
              <div>
                {cart.map(({ product, quantity }) => (
                  <div className="cart-item" key={product.id}>
                    <img className="cart-item-img" src={product.image} alt={product.name} />
                    <div className="cart-item-info">
                      <div className="cart-item-cat">{product.category}</div>
                      <div className="cart-item-name">{product.name}</div>
                      <div className="cart-item-price">${product.price} each</div>
                      <div className="cart-item-qty">
                        <button onClick={() => updateQuantity(product.id, quantity - 1)} aria-label="Decrease">−</button>
                        <span>{quantity}</span>
                        <button onClick={() => updateQuantity(product.id, quantity + 1)} aria-label="Increase">+</button>
                      </div>
                    </div>
                    <div className="cart-item-right">
                      <div className="cart-item-subtotal">${(product.price * quantity).toFixed(2)}</div>
                      <button className="cart-item-remove" onClick={() => removeFromCart(product.id)}>{t.remove}</button>
                    </div>
                  </div>
                ))}
                <div style={{ marginTop: '1.5rem' }}>
                  <Link href="/shop/products" style={{ fontSize: '.85rem', color: 'var(--sh-accent)', fontWeight: 600, textDecoration: 'none' }}>
                    {t.backToCart}
                  </Link>
                </div>
              </div>

              {/* Order Summary */}
              <div className="order-summary-card">
                <div className="os-title">{t.orderSummary}</div>
                <div className="os-row"><span>{t.subtotal}</span><span>${cartTotal.toFixed(2)}</span></div>
                <div className="os-row">
                  <span>{t.shipping}</span>
                  <span style={{ color: shipping === 0 ? '#10B981' : 'inherit' }}>
                    {shipping === 0 ? `${t.shippingFree} 🎉` : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p style={{ fontSize: '.78rem', color: '#9AA5B0' }}>{t.shippingNote}</p>
                )}
                <div className="os-divider" />
                <form className="os-promo" onSubmit={applyPromo}>
                  <input placeholder={t.promoPlaceholder} value={promoVal} onChange={e => setPromoVal(e.target.value)} />
                  <button type="submit">{t.promoApply}</button>
                </form>
                {promoMsg && <p style={{ fontSize: '.78rem', color: '#EF4444', marginTop: '-.3rem' }}>{promoMsg}</p>}
                <div className="os-row total"><span>{t.total}</span><span>${total.toFixed(2)}</span></div>
                <Link href="/shop/checkout" className="os-checkout-btn">{t.checkout}</Link>
                <div className="os-secure">
                  <span>🔒</span> {t.secureCheckout} &nbsp;·&nbsp; {t.sslNote}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <ShopFooter />
    </>
  )
}
