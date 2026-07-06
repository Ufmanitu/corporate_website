import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import ShopNav from '../../components/ShopNav'
import CartDrawer from '../../components/CartDrawer'
import ProductCard from '../../components/ProductCard'
import ShopFooter from '../../components/ShopFooter'
import { PRODUCTS } from '../../lib/products'

const CATEGORIES = ['All', 'Audio', 'Workspace', 'Charging', 'Storage']
const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
]

export default function Products() {
  const router = useRouter()
  const [activeCat, setActiveCat] = useState('All')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('featured')

  useEffect(() => {
    if (router.query.cat) setActiveCat(router.query.cat)
    if (router.query.q) setSearch(router.query.q)
  }, [router.query])

  let filtered = PRODUCTS
  if (activeCat !== 'All') filtered = filtered.filter(p => p.category === activeCat)
  if (search.trim()) filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()))

  if (sort === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price)
  else if (sort === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price)
  else if (sort === 'newest') filtered = [...filtered].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))

  return (
    <>
      <Head>
        <title>Shop All Products — NOUX</title>
        <meta name="description" content="Browse premium tech accessories from NOUX. Audio, workspace, charging and storage." />
      </Head>

      <div className="announce-bar">
        Free shipping on orders over $100 &nbsp;·&nbsp; Use code <strong>LAUNCH</strong> for 10% off
      </div>

      <ShopNav />
      <CartDrawer />

      <div className="ph" style={{ paddingTop: 'calc(9rem + 2.25rem)' }}>
        <div className="ph-bg" />
        <div className="ph-inner">
          <div className="ph-breadcrumb">
            <a href="/">Home</a><span>/</span><span>Products</span>
          </div>
          <h1 className="ph-title">Shop All Products</h1>
          <p className="ph-sub">Premium tech accessories for every corner of your workspace.</p>
          <div className="ph-line" />
        </div>
      </div>

      <section className="sec-pad" style={{ background: 'var(--white)' }}>
        <div className="si">
          <div className="prod-filter-bar">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`prod-flt-btn${activeCat === cat ? ' active' : ''}`}
                onClick={() => setActiveCat(cat)}
              >
                {cat}
              </button>
            ))}
            <input
              className="prod-filter-search"
              type="text"
              placeholder="Search products…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <select className="prod-filter-sort" value={sort} onChange={e => setSort(e.target.value)}>
              {SORT_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          <p className="prod-result-count">Showing {filtered.length} product{filtered.length !== 1 ? 's' : ''}</p>

          {filtered.length === 0 ? (
            <div className="prod-empty">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
              <p>No products found for your search.</p>
              <button className="btn-dark" style={{ marginTop: '1.5rem' }} onClick={() => { setSearch(''); setActiveCat('All') }}>
                Clear filters
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {filtered.map((p, i) => (
                <div key={p.id} className={`rev d${(i % 3) + 1}`}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <ShopFooter />
    </>
  )
}
