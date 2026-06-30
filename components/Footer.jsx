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
