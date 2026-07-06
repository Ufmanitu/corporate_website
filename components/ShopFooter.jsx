import Link from 'next/link'
import { useShopT } from '../lib/shopI18n'

export default function ShopFooter() {
  const t = useShopT()
  return (
    <footer>
      <div className="fi">
        <div className="ft">
          <div className="fb">
            <Link href="/shop" className="fl" style={{ textDecoration: 'none' }}>NOUX<em>·</em></Link>
            <p className="ftag">{t.footerTagline}</p>
            <div className="fsoc">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.735-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </div>
          </div>

          <div className="fc">
            <h4>{t.footerShop}</h4>
            <ul>
              <li><Link href="/shop/products">{t.allProducts}</Link></li>
              <li><Link href="/shop/collections">{t.collections}</Link></li>
              <li><Link href="/shop/products?category=Audio">{t.audio}</Link></li>
              <li><Link href="/shop/products?category=Workspace">{t.workspace}</Link></li>
            </ul>
          </div>

          <div className="fc">
            <h4>{t.footerMore}</h4>
            <ul>
              <li><Link href="/shop/products?category=Charging">{t.charging}</Link></li>
              <li><Link href="/shop/products?category=Storage">{t.storage}</Link></li>
              <li><Link href="/shop/cart">{t.yourCart}</Link></li>
              <li><Link href="/shop/checkout">{t.footerCheckout}</Link></li>
            </ul>
          </div>

          <div className="fc">
            <h4>{t.footerCompany}</h4>
            <ul>
              <li><Link href="/shop/about">{t.aboutNoux}</Link></li>
              <li><Link href="/shop/contact">{t.contactUs}</Link></li>
              <li><Link href="/shop/contact">{t.support}</Link></li>
              <li><Link href="/shop/contact">{t.wholesale}</Link></li>
            </ul>
          </div>

          <div className="fc">
            <h4>{t.footerPolicies}</h4>
            <ul>
              <li><Link href="/legal/privacy">{t.privacy}</Link></li>
              <li><Link href="/legal/terms">{t.terms}</Link></li>
              <li><Link href="/shop/contact">{t.returnsLink}</Link></li>
              <li><Link href="/shop/contact">{t.shippingInfo ?? 'Shipping Info'}</Link></li>
            </ul>
          </div>
        </div>

        <div className="fbot">
          <span className="fcopy">© {new Date().getFullYear()} NOUX. {t.rights}</span>
          <div className="fleg">
            <Link href="/legal/privacy">{t.privacy}</Link>
            <Link href="/legal/terms">{t.terms}</Link>
            <Link href="/shop/contact">{t.support}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
