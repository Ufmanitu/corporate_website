import Link from 'next/link'
import { useRouter } from 'next/router'

const t = {
  en: {
    tag:     'We help ambitious organizations navigate complexity and build lasting advantage.',
    company: 'Company', about: 'About', leadership: 'Leadership', careers: 'Careers', press: 'Press',
    services:'Services', strategy:'Strategy', tech:'Technology', digital:'Digital', finance:'Finance',
    work:    'Work', allWork:'All Case Studies', banking:'Banking', healthcare:'Healthcare', technology:'Technology & Media',
    connect: 'Connect', contact:'Get in Touch', offices:'Our Offices', newbiz:'New Business', team:'Our Team',
    rights:  'All rights reserved.',
    privacy: 'Privacy Policy', terms: 'Terms of Use', cookies: 'Cookie Settings',
  },
  tr: {
    tag:     'Hırslı organizasyonların karmaşıklıkta yol almasına ve kalıcı avantaj oluşturmasına yardımcı oluyoruz.',
    company: 'Şirket', about: 'Hakkımızda', leadership: 'Liderlik', careers: 'Kariyer', press: 'Basın',
    services:'Hizmetler', strategy:'Strateji', tech:'Teknoloji', digital:'Dijital', finance:'Finans',
    work:    'Çalışmalar', allWork:'Tüm Projeler', banking:'Bankacılık', healthcare:'Sağlık', technology:'Teknoloji & Medya',
    connect: 'İletişim', contact:'İletişime Geçin', offices:'Ofislerimiz', newbiz:'Yeni İş', team:'Ekibimiz',
    rights:  'Tüm hakları saklıdır.',
    privacy: 'Gizlilik Politikası', terms: 'Kullanım Şartları', cookies: 'Çerez Ayarları',
  },
  hu: {
    tag:     'Segítünk az ambiciózus szervezeteknek a komplexitásban való navigálásban és a tartós előny felépítésében.',
    company: 'Cég', about: 'Rólunk', leadership: 'Vezetőség', careers: 'Karrierlehetőségek', press: 'Sajtó',
    services:'Szolgáltatások', strategy:'Stratégia', tech:'Technológia', digital:'Digitális', finance:'Pénzügy',
    work:    'Munkáink', allWork:'Összes esettanulmány', banking:'Bankszektor', healthcare:'Egészségügy', technology:'Technológia & Média',
    connect: 'Kapcsolat', contact:'Lépjen kapcsolatba', offices:'Irodáink', newbiz:'Új üzlet', team:'Csapatunk',
    rights:  'Minden jog fenntartva.',
    privacy: 'Adatvédelmi irányelvek', terms: 'Felhasználási feltételek', cookies: 'Cookie beállítások',
  },
}

export default function Footer() {
  const { locale } = useRouter()
  const l = t[locale] ?? t.en

  return (
    <footer>
      <div className="fi">
        <div className="ft">
          <div className="fb">
            <div className="fl">Meridian<em>.</em></div>
            <p className="ftag">{l.tag}</p>
            <div className="fsoc">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.735-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
          <div className="fc">
            <h4>{l.company}</h4>
            <ul>
              <li><Link href="/about">{l.about}</Link></li>
              <li><Link href="/about#leadership">{l.leadership}</Link></li>
              <li><Link href="/contact">{l.careers}</Link></li>
              <li><Link href="/contact">{l.press}</Link></li>
            </ul>
          </div>
          <div className="fc">
            <h4>{l.services}</h4>
            <ul>
              <li><Link href="/services">{l.strategy}</Link></li>
              <li><Link href="/services">{l.tech}</Link></li>
              <li><Link href="/services">{l.digital}</Link></li>
              <li><Link href="/services">{l.finance}</Link></li>
            </ul>
          </div>
          <div className="fc">
            <h4>{l.work}</h4>
            <ul>
              <li><Link href="/work">{l.allWork}</Link></li>
              <li><Link href="/clients">{l.clients ?? 'Clients'}</Link></li>
              <li><Link href="/work">{l.banking}</Link></li>
              <li><Link href="/work">{l.healthcare}</Link></li>
            </ul>
          </div>
          <div className="fc">
            <h4>{l.connect}</h4>
            <ul>
              <li><Link href="/contact">{l.contact}</Link></li>
              <li><Link href="/contact">{l.offices}</Link></li>
              <li><Link href="/contact">{l.newbiz}</Link></li>
              <li><Link href="/about#leadership">{l.team}</Link></li>
            </ul>
          </div>
        </div>
        <div className="fbot">
          <span className="fcopy">© {new Date().getFullYear()} Meridian Group. {l.rights}</span>
          <div className="fleg">
            <Link href="/legal/privacy">{l.privacy}</Link>
            <Link href="/legal/terms">{l.terms}</Link>
            <Link href="/legal/privacy#cookies">{l.cookies}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
