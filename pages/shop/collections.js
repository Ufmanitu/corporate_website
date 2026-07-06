import Head from 'next/head'
import Link from 'next/link'
import ShopNav from '../../components/ShopNav'
import CartDrawer from '../../components/CartDrawer'
import ShopFooter from '../../components/ShopFooter'
import { PRODUCTS } from '../../lib/products'
import { useShopT } from '../../lib/shopI18n'

const collections = [
  {
    name: 'Audio',
    slug: 'Audio',
    headline: 'Hear everything. Distracted by nothing.',
    desc: 'Studio-grade headphones and earbuds engineered for focus. Whether you need deep noise cancellation for an open office or crisp sound for calls, we have the right tool.',
    img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&q=80&auto=format&fit=crop',
    color: '#1A1A2E',
    accent: '#4361EE',
  },
  {
    name: 'Workspace',
    slug: 'Workspace',
    headline: 'Your desk, upgraded.',
    desc: 'Keyboards, stands, hubs, webcams, and desk essentials — everything you need to turn any surface into a high-performance workstation.',
    img: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=1200&q=80&auto=format&fit=crop',
    color: '#0A1628',
    accent: '#E8A847',
  },
  {
    name: 'Charging',
    slug: 'Charging',
    headline: 'Always charged. Never tangled.',
    desc: 'GaN chargers, wireless pads, and multi-device solutions that keep everything powered without the cable chaos.',
    img: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=1200&q=80&auto=format&fit=crop',
    color: '#0D1F0D',
    accent: '#10B981',
  },
  {
    name: 'Storage',
    slug: 'Storage',
    headline: 'Your files. Wherever you go.',
    desc: 'Compact, fast, and rugged portable SSDs and drives for photographers, developers, and anyone who moves serious data.',
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
            <Link href="/">Home</Link><span>›</span><span>{t.collectionsTitle}</span>
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
                  key={col.name}
                  href={`/shop/products?category=${col.slug}`}
                  className={`col-card rev d${i + 1}`}
                  style={{ '--col-bg': col.color, '--col-accent': col.accent }}
                >
                  <div className="col-card-img">
                    <img src={col.img} alt={col.name} loading="lazy" />
                  </div>
                  <div className="col-card-body">
                    <span className="col-cat-label">{col.name}</span>
                    <h2 className="col-card-headline">{col.headline}</h2>
                    <p className="col-card-desc">{col.desc}</p>
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
