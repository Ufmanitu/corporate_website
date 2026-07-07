import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import ShopNav from '../../../components/ShopNav'
import CartDrawer from '../../../components/CartDrawer'
import ProductCard from '../../../components/ProductCard'
import ShopFooter from '../../../components/ShopFooter'
import AdminBar from '../../../components/AdminBar'
import Editable from '../../../components/Editable'
import { AdminProvider } from '../../../context/AdminContext'
import { PRODUCTS, getProductBySlug, getRelatedProducts, localizeProduct } from '../../../lib/products'
import { SEED_REVIEWS } from '../../../lib/reviews'
import { useCart } from '../../../context/CartContext'
import { useRouter } from 'next/router'
import { getContentWithDefaults } from '../../../lib/shopContent'

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

function StarPicker({ value, onChange }) {
  const [hov, setHov] = useState(0)
  return (
    <span style={{ fontSize: '1.5rem', cursor: 'pointer', display: 'inline-flex', gap: '2px' }}>
      {[1,2,3,4,5].map(i => (
        <span
          key={i}
          style={{ color: i <= (hov || value) ? '#E8A847' : '#D1D5DB', transition: 'color .1s' }}
          onMouseEnter={() => setHov(i)}
          onMouseLeave={() => setHov(0)}
          onClick={() => onChange(i)}
        >★</span>
      ))}
    </span>
  )
}

export default function ProductDetail({ product, related, content }) {
  return (
    <AdminProvider page={`shop_product_${product.slug}`}>
      <ProductDetailContent product={product} related={related} content={content} />
    </AdminProvider>
  )
}

function ProductDetailContent({ product, related, content }) {
  const c = key => content[key] ?? ''
  const t = content
  const [mainImg, setMainImg] = useState(0)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const { addToCart, toggleWishlist, wishlist } = useCart()
  const inWishlist = wishlist.includes(product.id)
  const { locale } = useRouter()
  const p = localizeProduct(product, locale)

  const [reviews, setReviews] = useState([])
  const [rvName, setRvName] = useState('')
  const [rvRating, setRvRating] = useState(5)
  const [rvComment, setRvComment] = useState('')
  const [rvSuccess, setRvSuccess] = useState(false)

  useEffect(() => {
    const seed = SEED_REVIEWS[product.slug] ?? []
    try {
      const stored = JSON.parse(localStorage.getItem(`noux-reviews-${product.slug}`) || '[]')
      const combined = [...stored, ...seed].sort((a, b) => b.date.localeCompare(a.date))
      setReviews(combined)
    } catch {
      setReviews(seed)
    }
  }, [product.slug])

  function handleAdd() {
    addToCart(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  function handleReviewSubmit(e) {
    e.preventDefault()
    if (!rvName.trim() || !rvComment.trim()) return
    const newReview = { id: Date.now().toString(), name: rvName.trim(), rating: rvRating, date: new Date().toISOString().slice(0, 10), comment: rvComment.trim() }
    try {
      const stored = JSON.parse(localStorage.getItem(`noux-reviews-${product.slug}`) || '[]')
      const updated = [newReview, ...stored]
      localStorage.setItem(`noux-reviews-${product.slug}`, JSON.stringify(updated))
    } catch {}
    setReviews(prev => [newReview, ...prev])
    setRvName('')
    setRvRating(5)
    setRvComment('')
    setRvSuccess(true)
    setTimeout(() => setRvSuccess(false), 3000)
  }

  const avgRating = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : null

  return (
    <>
      <Head>
        <title>{c('name')} — NOUX</title>
        <meta name="description" content={c('description')} />
      </Head>

      <div className="announce-bar">{t.announce}</div>
      <ShopNav />
      <CartDrawer />
      <AdminBar />

      <div style={{ paddingTop: '7rem', background: 'var(--white)' }}>
        <div className="pd-wrap">
          <nav className="pd-breadcrumb">
            <Link href="/">{t.breadcrumbHome}</Link>
            <span>/</span>
            <Link href="/shop/products">{t.productsTitle}</Link>
            <span>/</span>
            <span>{c('name')}</span>
          </nav>

          <div className="pd-grid">
            {/* LEFT — Gallery */}
            <div className="pd-gallery">
              <div className="pd-main-img">
                <img
                  src={product.images[mainImg]}
                  alt={c('name')}
                  key={mainImg}
                  style={{ opacity: 1 }}
                />
              </div>
              <div className="pd-thumbs">
                {product.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`${c('name')} view ${i + 1}`}
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
              <div className="pd-cat">{t[product.category?.toLowerCase()] ?? product.category}</div>
              <Editable tag="h1" id="name" content={c('name')} className="pd-name" />

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

              <Editable tag="p" id="description" content={c('description')} className="pd-desc" />

              <ul className="pd-features">
                {p.features.map((_, i) => (
                  <Editable key={i} tag="li" id={`feature_${i}`} content={c(`feature_${i}`)} />
                ))}
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
              <h2 className="sec-title" style={{ color: 'var(--text-d)' }}>{t.relatedMore}</h2>
            </div>
            <div className="related-grid">
              {related.map((rp, i) => (
                <div key={rp.id} className={`rev d${i + 1}`}>
                  <ProductCard product={rp} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── REVIEWS ── */}
      <section className="sec-pad" style={{ background: 'var(--dark)' }}>
        <div className="si">
          <div className="sh rev" style={{ marginBottom: '2rem' }}>
            <span className="eyebrow">{t.reviewsTitle}</span>
            {avgRating && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginTop: '.5rem' }}>
                <span style={{ fontSize: '2rem', fontWeight: 800, color: '#fff' }}>{avgRating}</span>
                <Stars rating={parseFloat(avgRating)} large />
                <span style={{ color: 'rgba(255,255,255,.5)', fontSize: '.9rem' }}>({reviews.length})</span>
              </div>
            )}
          </div>

          {reviews.length === 0 ? (
            <p style={{ color: 'rgba(255,255,255,.5)', marginBottom: '2rem' }}>{t.reviewsEmpty}</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
              {reviews.map(rv => (
                <div key={rv.id} style={{ background: 'rgba(255,255,255,.06)', borderRadius: '12px', padding: '1.2rem 1.4rem', border: '1px solid rgba(255,255,255,.08)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '.5rem' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--sh-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#fff', fontSize: '.95rem', flexShrink: 0 }}>
                      {rv.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: '#fff', fontSize: '.95rem' }}>{rv.name}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem' }}>
                        <Stars rating={rv.rating} />
                        <span style={{ color: 'rgba(255,255,255,.35)', fontSize: '.78rem' }}>{rv.date}</span>
                      </div>
                    </div>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,.75)', margin: 0, lineHeight: 1.65, fontSize: '.95rem' }}>{rv.comment}</p>
                </div>
              ))}
            </div>
          )}

          {/* Review form */}
          <div style={{ background: 'var(--white)', borderRadius: '16px', padding: '2rem', maxWidth: '560px' }}>
            <h3 style={{ margin: '0 0 1.25rem', color: 'var(--text-d)', fontSize: '1.1rem', fontWeight: 700 }}>{t.reviewsFormTitle}</h3>
            {rvSuccess && (
              <div style={{ background: 'rgba(16,185,129,.12)', border: '1px solid rgba(16,185,129,.3)', borderRadius: '8px', padding: '.75rem 1rem', marginBottom: '1rem', color: '#10B981', fontWeight: 600 }}>
                ✓ {t.reviewFormSuccess}
              </div>
            )}
            <form onSubmit={handleReviewSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '.9rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '.82rem', fontWeight: 600, color: 'var(--text-d)', marginBottom: '.3rem', textTransform: 'uppercase', letterSpacing: '.05em' }}>{t.reviewFormName}</label>
                <input
                  type="text"
                  value={rvName}
                  onChange={e => setRvName(e.target.value)}
                  required
                  style={{ width: '100%', padding: '.65rem .9rem', border: '1.5px solid #E5E7EB', borderRadius: '8px', fontSize: '.95rem', fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '.82rem', fontWeight: 600, color: 'var(--text-d)', marginBottom: '.3rem', textTransform: 'uppercase', letterSpacing: '.05em' }}>{t.reviewFormRating}</label>
                <StarPicker value={rvRating} onChange={setRvRating} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '.82rem', fontWeight: 600, color: 'var(--text-d)', marginBottom: '.3rem', textTransform: 'uppercase', letterSpacing: '.05em' }}>{t.reviewFormComment}</label>
                <textarea
                  value={rvComment}
                  onChange={e => setRvComment(e.target.value)}
                  required
                  rows={4}
                  placeholder={t.reviewFormCommentPlaceholder}
                  style={{ width: '100%', padding: '.65rem .9rem', border: '1.5px solid #E5E7EB', borderRadius: '8px', fontSize: '.95rem', fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box', outline: 'none' }}
                />
              </div>
              <button
                type="submit"
                style={{ alignSelf: 'flex-start', background: 'var(--dark)', color: '#fff', border: 'none', borderRadius: '8px', padding: '.75rem 1.6rem', fontFamily: 'inherit', fontWeight: 700, fontSize: '.95rem', cursor: 'pointer' }}
              >
                {t.reviewFormSubmit}
              </button>
            </form>
          </div>
        </div>
      </section>

      <ShopFooter />
    </>
  )
}

export async function getServerSideProps({ params, locale }) {
  const product = getProductBySlug(params.slug)
  if (!product) return { notFound: true }
  const related = getRelatedProducts(product, 3)
  const p = localizeProduct(product, locale)
  const defaults = {
    ...p,
    ...p.features.reduce((acc, f, i) => { acc[`feature_${i}`] = f; return acc }, {}),
  }
  const pageKey = locale === 'en'
    ? `shop_product_${product.slug}`
    : `shop_product_${product.slug}_${locale}`
  const content = await getContentWithDefaults(pageKey, defaults)
  return { props: { product, related, content } }
}
