import { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import ShopNav from '../../components/ShopNav'
import ShopFooter from '../../components/ShopFooter'
import { useCart } from '../../context/CartContext'
import { useShopT } from '../../lib/shopI18n'

export default function OrderSuccess() {
  const { clearCart } = useCart()
  const cleared = useRef(false)
  const [orderNum] = useState(() => Math.floor(10000 + Math.random() * 90000))
  const t = useShopT()

  useEffect(() => {
    if (!cleared.current) {
      clearCart()
      cleared.current = true
    }
  }, [])

  return (
    <>
      <Head>
        <title>{t.orderConfirmed} — NOUX</title>
      </Head>

      <ShopNav />

      <section className="success-page">
        <div className="success-inner">
          <div className="success-check">
            <svg className="check-svg" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
              <circle cx="26" cy="26" r="24" />
              <path d="M14 27l8 8 16-16" />
            </svg>
          </div>

          <h1 className="success-h1">{t.orderConfirmed}</h1>
          <div className="success-order">{t.orderNumber}{orderNum}</div>
          <p className="success-desc">{t.orderThankYou}</p>

          <div className="success-actions">
            <Link href="/shop/products" className="btn-a">{t.backToShop}</Link>
            <button
              className="btn-b"
              style={{ background: 'transparent', cursor: 'pointer', border: '1.5px solid rgba(14,31,46,.18)', borderRadius: '100px', padding: '.8rem 1.9rem', fontFamily: 'var(--ff-b)', fontSize: '.9rem', fontWeight: 400, color: 'var(--text-d)', transition: 'all .3s' }}
              onClick={() => alert(`${t.orderNumber}${orderNum}`)}
            >
              {t.trackOrder}
            </button>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.45rem', fontSize: '.8rem', color: '#9AA5B0' }}>
              <span>🚚</span> {t.freeShipping}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.45rem', fontSize: '.8rem', color: '#9AA5B0' }}>
              <span>📧</span> {t.orderEmail ?? 'Confirmation email sent'}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.45rem', fontSize: '.8rem', color: '#9AA5B0' }}>
              <span>🛡️</span> {t.warranty}
            </div>
          </div>
        </div>
      </section>

      <ShopFooter />
    </>
  )
}
