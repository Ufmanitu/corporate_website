import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ShopNav from '../../components/ShopNav'
import CartDrawer from '../../components/CartDrawer'
import ProductCard from '../../components/ProductCard'
import ShopFooter from '../../components/ShopFooter'
import { PRODUCTS } from '../../lib/products'
import { useShopT } from '../../lib/shopI18n'

const CATEGORIES_EN = ['All', 'Audio', 'Workspace', 'Charging', 'Storage']

export default function Products() {
  const router = useRouter()
  const t = useShopT()
  const [activeCat, setActiveCat] = useState('All')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('featured')

  useEffect(() => {
    if (router.query.cat) setActiveCat(router.query.cat)
    if (router.query.category) setActiveCat(router.query.category)
    if (router.query.q) setSearch(router.query.q)
  }, [router.query])

  let filtered = PRODUCTS
  if (activeCat !== 'All') filtered = filtered.filter(p => p.category === activeCat)
  if (search.trim()) filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()))

  if (sort === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price)
  else if (sort === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price)
  else if (sort === 'newest') filtered = [...filtered].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))

  const SORT_OPTIONS = [
    { value: 'featured', label: t.sortFeatured },
    { value: 'price-asc', label: t.sortPriceLow },
    { value: 'price-desc', label: t.sortPriceHigh },
    { value: 'newest', label: t.sortNewest },
  ]

  return (
    <>
      <Head>
        <title>{t.productsTitle} — NOUX</title>
        <meta name="description" content={t.productsSub} />
      </Head>

      <div className="announce-bar">{t.announce}</div>

      <ShopNav />
      <CartDrawer />

      <div className="ph" style={{ paddingTop: 'calc(9rem + 2.25rem)' }}>
        <div className="ph-bg" />
        <div className="ph-inner">
          <div className="ph-breadcrumb">
            <Link href="/">{t.breadcrumbHome}</Link><span>/</span><span>{t.breadcrumbProducts}</span>
          </div>
          <h1 className="ph-title">{t.productsTitle}</h1>
          <p className="ph-sub">{t.productsSub}</p>
          <div className="ph-line" />
        </div>
      </div>

      <section className="sec-pad" style={{ background: 'var(--white)' }}>
        <div className="si">
          <div className="prod-filter-bar">
            {CATEGORIES_EN.map(cat => (
              <button
                key={cat}
                className={`prod-flt-btn${activeCat === cat ? ' active' : ''}`}
                onClick={() => setActiveCat(cat)}
              >
                {cat === 'All' ? t.filterAll : (t[cat.toLowerCase()] ?? cat)}
              </button>
            ))}
            <input
              className="prod-filter-search"
              type="text"
              placeholder={t.searchPlaceholder}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <select className="prod-filter-sort" value={sort} onChange={e => setSort(e.target.value)}>
              {SORT_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          <p className="prod-result-count">{t.showing} {filtered.length} {t.products}</p>

          {filtered.length === 0 ? (
            <div className="prod-empty">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
              <p>{t.noResults}</p>
              <p style={{ fontSize: '.9rem', color: '#9AA5B0' }}>{t.noResultsSub}</p>
              <button className="btn-dark" style={{ marginTop: '1.5rem' }} onClick={() => { setSearch(''); setActiveCat('All') }}>
                {t.filterAll}
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {filtered.map(p => (
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
