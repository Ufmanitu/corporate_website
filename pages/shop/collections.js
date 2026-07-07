import Head from 'next/head'
import Link from 'next/link'
import ShopNav from '../../components/ShopNav'
import CartDrawer from '../../components/CartDrawer'
import ShopFooter from '../../components/ShopFooter'
import AdminBar from '../../components/AdminBar'
import Editable from '../../components/Editable'
import { AdminProvider, useAdmin } from '../../context/AdminContext'
import { PRODUCTS } from '../../lib/products'
import { getShopContent } from '../../lib/shopContent'

const COLLECTION_DEFS = [
  { slug: 'Audio',     tName: 'audio',     hKey: 'col1Headline', dKey: 'col1Desc', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&q=80&auto=format&fit=crop', color: '#1A1A2E', accent: '#4361EE' },
  { slug: 'Workspace', tName: 'workspace', hKey: 'col2Headline', dKey: 'col2Desc', img: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=1200&q=80&auto=format&fit=crop', color: '#0A1628', accent: '#E8A847' },
  { slug: 'Charging',  tName: 'charging',  hKey: 'col3Headline', dKey: 'col3Desc', img: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=1200&q=80&auto=format&fit=crop', color: '#0D1F0D', accent: '#10B981' },
  { slug: 'Storage',   tName: 'storage',   hKey: 'col4Headline', dKey: 'col4Desc', img: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=1200&q=80&auto=format&fit=crop', color: '#1C0A1A', accent: '#A78BFA' },
]

export default function Collections({ content }) {
  return (
    <AdminProvider page="shop_collections">
      <CollectionsContent content={content} />
    </AdminProvider>
  )
}

function CollectionsContent({ content }) {
  const t = content
  const c = key => content[key] ?? ''
  const { isAdmin } = useAdmin()

  return (
    <>
      <Head>
        <title>{t.collectionsTitle} — NOUX</title>
        <meta name="description" content={t.collectionsSub} />
      </Head>

      <div className="announce-bar">{t.announce}</div>
      <ShopNav />
      <CartDrawer />
      <AdminBar />

      <section className="ph">
        <div className="ph-bg" />
        <div className="ph-inner">
          <div className="ph-breadcrumb">
            <Link href="/">{t.breadcrumbHome}</Link><span>›</span><span>{t.collectionsTitle}</span>
          </div>
          <Editable tag="h1" id="collectionsTitle" content={c('collectionsTitle')} className="ph-title" />
          <Editable tag="p" id="collectionsSub" content={c('collectionsSub')} className="ph-sub" />
          <div className="ph-line" />
        </div>
      </section>

      <section className="sec-pad" style={{ background: 'var(--dark)' }}>
        <div className="si">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
            {COLLECTION_DEFS.map((col, i) => {
              const count = PRODUCTS.filter(p => p.category === col.slug).length
              return (
                <Link
                  key={col.slug}
                  href={`/shop/products?category=${col.slug}`}
                  className={`col-card rev d${i + 1}`}
                  style={{ '--col-bg': col.color, '--col-accent': col.accent }}
                  onClick={isAdmin ? e => e.preventDefault() : undefined}
                >
                  <div className="col-card-img">
                    <img src={col.img} alt={col.slug} loading="lazy" />
                  </div>
                  <div className="col-card-body">
                    <span className="col-cat-label">{t[col.tName]}</span>
                    <Editable tag="h2" id={col.hKey} content={c(col.hKey)} className="col-card-headline" />
                    <Editable tag="p" id={col.dKey} content={c(col.dKey)} className="col-card-desc" />
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
          <Editable tag="h2" id="notSureTitle" content={c('notSureTitle')} className="cta-title" />
          <Editable tag="p" id="notSureSub" content={c('notSureSub')} className="cta-sub" />
          <Link href="/shop/products" className="btn-dark">{t.viewAll}</Link>
        </div>
      </section>

      <ShopFooter />
    </>
  )
}

export async function getServerSideProps({ locale }) {
  const content = await getShopContent('collections', locale)
  return { props: { content } }
}
