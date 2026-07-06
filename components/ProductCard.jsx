import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '../context/CartContext'
import { useShopT } from '../lib/shopI18n'

function Stars({ rating }) {
  return (
    <span className="pc-stars" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} style={{ color: i <= Math.round(rating) ? '#E8A847' : '#D1D5DB', fontSize: '.85rem' }}>
          {i <= Math.round(rating) ? '★' : '☆'}
        </span>
      ))}
    </span>
  )
}

export default function ProductCard({ product }) {
  const [added, setAdded] = useState(false)
  const { addToCart, toggleWishlist, wishlist } = useCart()
  const inWishlist = wishlist.includes(product.id)
  const t = useShopT()

  function handleAdd(e) {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  function handleWish(e) {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(product.id)
  }

  const badge = product.isNew ? { label: t.new, color: 'var(--sh-accent)' }
    : product.isBestseller ? { label: t.bestseller, color: '#E8A847' }
    : product.originalPrice ? { label: t.sale, color: '#EF4444' }
    : null

  return (
    <Link
      href={`/shop/products/${product.slug}`}
      className="product-card"
      onMouseMove={e => {
        const r = e.currentTarget.getBoundingClientRect()
        const x = (e.clientX - r.left) / r.width - .5
        const y = (e.clientY - r.top) / r.height - .5
        e.currentTarget.style.transform = `perspective(700px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg) translateZ(4px)`
      }}
      onMouseLeave={e => { e.currentTarget.style.transform = '' }}
    >
      <div className="pc-img">
        <img src={product.image} alt={product.name} loading="lazy" />
        {badge && (
          <span className="pc-badge" style={{ background: badge.color }}>
            {badge.label}
          </span>
        )}
        <button
          className={`pc-wish${inWishlist ? ' active' : ''}`}
          onClick={handleWish}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={inWishlist ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      <div className="pc-body">
        <div className="pc-cat">{product.category}</div>
        <h3 className="pc-name">{product.name}</h3>
        <div className="pc-rating">
          <Stars rating={product.rating} />
          <span className="pc-rating-count">({product.reviewCount})</span>
        </div>
        <div className="pc-price">
          <span className="pc-price-now">${product.price}</span>
          {product.originalPrice && (
            <span className="pc-price-was">${product.originalPrice}</span>
          )}
        </div>
        <button
          className={`pc-add${added ? ' added' : ''}`}
          onClick={handleAdd}
          aria-label={`Add ${product.name} to cart`}
        >
          {added ? t.added : t.addToCart}
        </button>
      </div>
    </Link>
  )
}
