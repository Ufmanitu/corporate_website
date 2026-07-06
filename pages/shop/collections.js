import Head from 'next/head'
import Link from 'next/link'
import ShopNav from '../../components/ShopNav'
import CartDrawer from '../../components/CartDrawer'
import ShopFooter from '../../components/ShopFooter'
import { PRODUCTS } from '../../lib/products'
import { useShopT } from '../../lib/shopI18n'

const collections = [
  {
    slug: 'Audio',
    tName: 'audio',
    hKey: 'col1Headline',
    dKey: 'col1Desc',
    img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&q=80&auto=format&fit=crop',
    color: '#1A1A2E',
    accent: '#4361EE',
  },
  {
    slug: 'Workspace',
    tName: 'workspace',
    hKey: 'col2Headline',
    dKey: 'col2Desc',
    img: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=1200&q=80&auto=format&fit=crop',
    color: '#0A1628',
    accent: '#E8A847',
  },
  {
    slug: 'Charging',
    tName: 'charging',
    hKey: 'col3Headline',
    dKey: 'col3Desc',
    img: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=1200&q=80&auto=format&fit=crop',
    color: '#0D1F0D',
    accent: '#10B981',
  },
  {
    slug: 'Storage',
    tName: 'storage',
    hKey: 'col4Headline',
    dKey: 'col4Desc',
    img: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=1200&q=80&auto=format&fit=crop',
    color: '#1C0A1A',
    accent: '#A78BFA',
  },
]

export default function Collections() {
  const t = useShopT()
  return (
    <>
      <Head>
        <title>{t.collectionsTitle} — NOUX</title>
        <meta name="description" content={t.collectionsSub} />
      </Head>

      <div className="announce-bar">{t.announce}</div>
      <ShopNav />
      <CartDrawer />

      <section className="ph">
        <div className="ph-bg" />
        <div className="ph-inner">
          <div className="ph-breadcrumb">
            <Link href="/">{t.breadcrumbHome}</Link><span>›</span><span>{t.collectionsTitle}</span>
          </div>
          <h1 className="ph-title">{t.collectionsTitle}</h1>
          <p className="ph-sub">{t.collectionsSub}</p>
          <div className="ph-line" />
        </div>
      </section>

      <section className="sec-pad" style={{ background: 'var(--dark)' }}>
        <div className="si">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
            {collections.map((col, i) => {
              const count = PRODUCTS.filter(p => p.category === col.slug).length
              return (
                <Link
                  key={col.slug}
                  href={`/shop/products?category=${col.slug}`}
                  className={`col-card rev d${i + 1}`}
                  style={{ '--col-bg': col.color, '--col-accent': col.accent }}
                >
                  <div className="col-card-img">
                    <img src={col.img} alt={col.slug} loading="lazy" />
                  </div>
                  <div className="col-card-body">
                    <span className="col-cat-label">{t[col.tName]}</span>
                    <h2 className="col-card-headline">{t[col.hKey]}</h2>
                    <p className="col-card-desc">{t[col.dKey]}</p>
                    <span className="col-card-cta">{t.viewProducts} {count} {t.products} →</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="cta-sec">
        <div className="cta-inner rev">
          <h2 className="cta-title">{t.notSureTitle}</h2>
          <p className="cta-sub">{t.notSureSub}</p>
          <Link href="/shop/products" className="btn-dark">{t.viewAll}</Link>
        </div>
      </section>

      <ShopFooter />
    </>
  )
}
