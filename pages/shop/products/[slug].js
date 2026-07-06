import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import ShopNav from '../../../components/ShopNav'
import CartDrawer from '../../../components/CartDrawer'
import ProductCard from '../../../components/ProductCard'
import ShopFooter from '../../../components/ShopFooter'
import { PRODUCTS, getProductBySlug, getRelatedProducts } from '../../../lib/products'
import { useCart } from '../../../context/CartContext'
import { useShopT } from '../../../lib/shopI18n'

function Stars({ rating, large }) {
  return (
    <span style={{ fontSize: large ? '1rem' : '.88rem' }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= Math.round(rating) ? '#E8A847' : '#D1D5DB' }}>
          {i <= Math.round(rating) ? '★' : '☆'}
        </span>
      ))}
    </span>
  )
}

export default function ProductDetail({ product, related }) {
  const [mainImg, setMainImg] = useState(0)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const { addToCart, toggleWishlist, wishlist } = useCart()
  const inWishlist = wishlist.includes(product.id)
  const t = useShopT()

  function handleAdd() {
    addToCart(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <>
      <Head>
        <title>{product.name} — NOUX</title>
        <meta name="description" content={product.description} />
      </Head>

      <div className="announce-bar">{t.announce}</div>

      <ShopNav />
      <CartDrawer />

      <div style={{ paddingTop: '2.25rem', background: 'var(--white)' }}>
        <div className="pd-wrap">
          <nav className="pd-breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/shop/products">{t.productsTitle}</Link>
            <span>/</span>
            <span>{product.name}</span>
          </nav>

          <div className="pd-grid">
            {/* LEFT — Gallery */}
            <div className="pd-gallery">
              <div className="pd-main-img">
                <img
                  src={product.images[mainImg]}
                  alt={product.name}
                  key={mainImg}
                  style={{ opacity: 1 }}
                />
              </div>
              <div className="pd-thumbs">
                {product.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`${product.name} view ${i + 1}`}
                    className={`pd-thumb${mainImg === i ? ' active' : ''}`}
                    onClick={() => setMainImg(i)}
                  />
                ))}
              </div>
              <div className={`pd-stock ${product.lowStock ? 'low' : 'in'}`}>
                {product.lowStock ? t.lowStock : t.inStock}
              </div>
            </div>

            {/* RIGHT — Details */}
            <div className="pd-details">
              <div className="pd-cat">{product.category}</div>
              <h1 className="pd-name">{product.name}</h1>

              <div className="pd-rating">
                <Stars rating={product.rating} large />
                <span style={{ fontWeight: 600, color: 'var(--text-d)', marginLeft: '.25rem' }}>{product.rating}</span>
                <span>({product.reviewCount} {t.reviews})</span>
              </div>

              <div className="pd-price-row">
                <span className="pd-price-now">${product.price}</span>
                {product.originalPrice && (
                  <span className="pd-price-was">${product.originalPrice}</span>
                )}
                {product.originalPrice && (
                  <span style={{ fontSize: '.78rem', fontWeight: 700, color: '#EF4444', background: 'rgba(239,68,68,.08)', padding: '.2rem .6rem', borderRadius: '100px' }}>
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </span>
                )}
              </div>

              <p className="pd-desc">{product.description}</p>

              <ul className="pd-features">
                {product.features.map(f => <li key={f}>{f}</li>)}
              </ul>

              {product.lowStock && (
                <div className="pd-low-stock">⚠️ {t.lowStock}</div>
              )}

              <div className="pd-qty-row">
                <span className="pd-qty-label">{t.qty}</span>
                <div className="pd-qty">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="Decrease">−</button>
                  <span className="pd-qty-num">{qty}</span>
                  <button onClick={() => setQty(q => q + 1)} aria-label="Increase">+</button>
                </div>
              </div>

              <div className="pd-actions">
                <button
                  className={`pd-add-btn${added ? ' added' : ''}`}
                  onClick={handleAdd}
                >
                  {added ? t.added : t.addToCartBtn}
                </button>
                <button
                  className={`pd-wish-btn${inWishlist ? ' active' : ''}`}
                  onClick={() => toggleWishlist(product.id)}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill={inWishlist ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  {inWishlist ? t.wishlisted : t.wishlistBtn}
                </button>
              </div>

              <div className="pd-trust">
                <div className="pd-trust-item"><span>🚚</span><span>{t.freeShipping}</span></div>
                <div className="pd-trust-item"><span>🛡️</span><span>{t.warranty}</span></div>
                <div className="pd-trust-item"><span>↩️</span><span>{t.returns}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="related-section">
          <div className="si">
            <div className="sh rev">
              <span className="eyebrow">{t.relatedTitle}</span>
              <h2 className="sec-title" style={{ color: 'var(--text-d)' }}>More from our collection.</h2>
            </div>
            <div className="related-grid">
              {related.map((p, i) => (
                <div key={p.id} className={`rev d${i + 1}`}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <ShopFooter />
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: PRODUCTS.map(p => ({ params: { slug: p.slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const product = getProductBySlug(params.slug)
  if (!product) return { notFound: true }
  const related = getRelatedProducts(product, 3)
  return { props: { product, related } }
}
