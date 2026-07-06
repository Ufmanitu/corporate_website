import Link from 'next/link'
import { useCart } from '../context/CartContext'
import { useShopT } from '../lib/shopI18n'

export default function CartDrawer() {
  const { cart, drawerOpen, setDrawerOpen, removeFromCart, updateQuantity, cartTotal } = useCart()
  const t = useShopT()
  const shipping = cartTotal >= 100 ? 0 : 9.99
  const total = cartTotal + shipping

  return (
    <>
      {drawerOpen && (
        <div className="cd-overlay" onClick={() => setDrawerOpen(false)} />
      )}
      <div className={`cd-panel${drawerOpen ? ' open' : ''}`} role="dialog" aria-label={t.cartTitle}>
        <div className="cd-header">
          <h2 className="cd-title">{t.cartTitle} <span className="cd-count">({cart.reduce((s, i) => s + i.quantity, 0)})</span></h2>
          <button className="cd-close" onClick={() => setDrawerOpen(false)} aria-label="Close cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="cd-items">
          {cart.length === 0 ? (
            <div className="cd-empty">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="rgba(14,31,46,.2)" strokeWidth="1.5">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <p className="cd-empty-text">{t.cartEmpty}</p>
              <Link href="/shop/products" className="cd-empty-link" onClick={() => setDrawerOpen(false)}>
                {t.browseShop}
              </Link>
            </div>
          ) : (
            cart.map(({ product, quantity }) => (
              <div className="cd-item" key={product.id}>
                <img className="cd-item-img" src={product.image} alt={product.name} />
                <div className="cd-item-info">
                  <div className="cd-item-name">{product.name}</div>
                  <div className="cd-item-price">${product.price}</div>
                  <div className="cd-qty">
                    <button className="cd-qty-btn" onClick={() => updateQuantity(product.id, quantity - 1)} aria-label="Decrease quantity">−</button>
                    <span className="cd-qty-num">{quantity}</span>
                    <button className="cd-qty-btn" onClick={() => updateQuantity(product.id, quantity + 1)} aria-label="Increase quantity">+</button>
                  </div>
                </div>
                <button className="cd-remove" onClick={() => removeFromCart(product.id)} aria-label={`Remove ${product.name}`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cd-footer">
            <div className="cd-shipping-note">
              {cartTotal >= 100
                ? '🎉 ' + t.shippingFree + '!'
                : `${t.shippingNote}`}
            </div>
            <div className="cd-totals">
              <div className="cd-total-row">
                <span>{t.subtotal}</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="cd-total-row">
                <span>{t.shipping}</span>
                <span>{shipping === 0 ? t.shippingFree : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="cd-total-row cd-grand-total">
                <span>{t.total}</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <Link href="/shop/checkout" className="cd-checkout-btn" onClick={() => setDrawerOpen(false)}>
              {t.checkout}
            </Link>
            <Link href="/shop/cart" className="cd-view-cart" onClick={() => setDrawerOpen(false)}>
              {t.viewFullCart}
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
