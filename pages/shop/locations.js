import { useState } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'
import ShopNav from '../../components/ShopNav'
import CartDrawer from '../../components/CartDrawer'
import ShopFooter from '../../components/ShopFooter'
import AdminBar from '../../components/AdminBar'
import Editable from '../../components/Editable'
import { AdminProvider } from '../../context/AdminContext'
import { getShopContent } from '../../lib/shopContent'

const Globe = dynamic(() => import('../../components/Globe'), { ssr: false })

const WAREHOUSES = [
  { lat: 52.52, lon:  13.40,  name: 'Berlin',        role: 'Global HQ & Warehouse' },
  { lat: 51.51, lon:  -0.13,  name: 'London',         role: 'EU Distribution Hub' },
  { lat: 40.71, lon: -74.01,  name: 'New York',       role: 'US East Coast Hub' },
  { lat: 37.77, lon: -122.42, name: 'San Francisco',  role: 'US West Coast Hub' },
  { lat:  1.35, lon: 103.82,  name: 'Singapore',      role: 'Asia Pacific Hub' },
  { lat: 35.68, lon: 139.69,  name: 'Tokyo',          role: 'Japan & Korea Hub' },
  { lat:-33.87, lon: 151.21,  name: 'Sydney',         role: 'Oceania Hub' },
  { lat: 25.20, lon:  55.27,  name: 'Dubai',          role: 'Middle East & Africa Hub' },
  { lat: 47.50, lon:  19.04,  name: 'Budapest',       role: 'Central Europe Hub' },
]

export default function Locations({ content }) {
  return (
    <AdminProvider page="shop_locations">
      <LocationsContent content={content} />
    </AdminProvider>
  )
}

function LocationsContent({ content }) {
  const t = content
  const c = key => content[key] ?? ''
  const [selected, setSelected] = useState(null)

  return (
    <>
      <Head>
        <title>{t.locationsTitle} — NOUX</title>
        <meta name="description" content={t.locationsSub} />
      </Head>

      <div className="announce-bar">{t.announce}</div>
      <ShopNav />
      <CartDrawer />
      <AdminBar />

      <section className="ph">
        <div className="ph-bg" />
        <div className="ph-inner">
          <div className="ph-breadcrumb">
            <Link href="/">{t.breadcrumbHome}</Link><span>›</span><span>{t.locationsTitle}</span>
          </div>
          <Editable tag="h1" id="locationsTitle" content={c('locationsTitle')} className="ph-title" />
          <Editable tag="p" id="locationsSub" content={c('locationsSub')} className="ph-sub" />
          <div className="ph-line" />
        </div>
      </section>

      <section className="sec-pad" style={{ background: 'var(--dark)' }}>
        <div className="si">
          <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>

            <div style={{ flex: '0 0 340px', minWidth: '260px', display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
              {WAREHOUSES.map((w, i) => {
                const isActive = selected?.name === w.name
                return (
                  <button
                    key={i}
                    onClick={() => setSelected(isActive ? null : w)}
                    style={{
                      background: isActive ? 'rgba(239,68,68,.15)' : 'rgba(255,255,255,.05)',
                      border: `1.5px solid ${isActive ? 'rgba(239,68,68,.55)' : 'rgba(255,255,255,.08)'}`,
                      borderRadius: '10px',
                      padding: '.85rem 1.1rem',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'background .18s, border-color .18s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '.75rem',
                    }}
                  >
                    <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{isActive ? '📍' : '🏭'}</span>
                    <div>
                      <div style={{ fontWeight: 700, color: '#fff', fontSize: '.95rem', lineHeight: 1.3 }}>{w.name}</div>
                      <div style={{ color: 'rgba(255,255,255,.5)', fontSize: '.8rem', marginTop: '.15rem' }}>{w.role}</div>
                    </div>
                  </button>
                )
              })}
            </div>

            <div style={{ flex: '1 1 420px', minWidth: '300px' }}>
              <div style={{ borderRadius: '16px', overflow: 'hidden', background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.08)' }}>
                <div style={{ height: '520px' }}>
                  <Globe selectedOffice={selected} locations={WAREHOUSES} />
                </div>
              </div>
              {selected && (
                <div style={{ marginTop: '1rem', background: 'rgba(239,68,68,.1)', border: '1px solid rgba(239,68,68,.3)', borderRadius: '12px', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '.75rem' }}>
                  <span style={{ fontSize: '1.4rem' }}>📍</span>
                  <div>
                    <div style={{ fontWeight: 700, color: '#fff', fontSize: '1.05rem' }}>{selected.name}</div>
                    <div style={{ color: 'rgba(255,255,255,.6)', fontSize: '.88rem' }}>{t.locationsDetail} · {selected.role}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <ShopFooter />
    </>
  )
}

export async function getServerSideProps({ locale }) {
  const content = await getShopContent('locations', locale)
  return { props: { content } }
}
