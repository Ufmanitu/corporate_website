import Head from 'next/head'
import Link from 'next/link'
import ShopNav from '../../components/ShopNav'
import CartDrawer from '../../components/CartDrawer'
import ShopFooter from '../../components/ShopFooter'
import ProductCard from '../../components/ProductCard'
import { PRODUCTS } from '../../lib/products'
import { useCart } from '../../context/CartContext'
import { useShopT } from '../../lib/shopI18n'

export default function Wishlist() {
  const { wishlist } = useCart()
  const t = useShopT()
  const items = PRODUCTS.filter(p => wishlist.includes(p.id))

  return (
    <>
      <Head>
        <title>{t.wishlistTitle} — NOUX</title>
      </Head>

      <div className="announce-bar">{t.announce}</div>
      <ShopNav />
      <CartDrawer />

      <section className="ph">
        <div className="ph-bg" />
        <div className="ph-inner">
          <div className="ph-breadcrumb">
            <Link href="/">{t.breadcrumbHome}</Link><span>›</span><span>{t.wishlistTitle}</span>
          </div>
          <h1 className="ph-title">{t.wishlistTitle}</h1>
          <p className="ph-sub">{items.length > 0 ? `${items.length} ${t.products}` : t.wishlistEmpty}</p>
          <div className="ph-line" />
        </div>
      </section>

      <section className="sec-pad" style={{ background: 'var(--white)', minHeight: '40vh' }}>
        <div className="si">
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🤍</div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-d)', marginBottom: '.6rem' }}>{t.wishlistEmpty}</h2>
              <p style={{ color: '#9AA5B0', marginBottom: '2rem' }}>{t.wishlistEmptySub}</p>
              <Link href="/shop/products" className="btn-dark">{t.browseShop}</Link>
            </div>
          ) : (
            <div className="products-grid">
              {items.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      <ShopFooter />
    </>
  )
}
