import Link from 'next/link'
import { useRouter } from 'next/router'

const t = {
  en: {
    tag:     'We help ambitious organizations navigate complexity and build lasting advantage.',
    company: 'Company', about: 'About', leadership: 'Leadership', careers: 'Careers', press: 'Press',
    services:'Services', strategy:'Strategy', tech:'Technology', digital:'Digital', finance:'Finance',
    insights:'Insights', research:'Research', articles:'Articles', reports:'Reports', webinars:'Webinars',
    connect: 'Connect', linkedin:'LinkedIn', twitter:'Twitter/X', offices:'Offices', partners:'Partners',
    rights:  'All rights reserved.',
    privacy: 'Privacy Policy', terms: 'Terms of Use', cookies: 'Cookie Settings',
  },
  tr: {
    tag:     'Hırslı organizasyonların karmaşıklıkta yol almasına ve kalıcı avantaj oluşturmasına yardımcı oluyoruz.',
    company: 'Şirket', about: 'Hakkımızda', leadership: 'Liderlik', careers: 'Kariyer', press: 'Basın',
    services:'Hizmetler', strategy:'Strateji', tech:'Teknoloji', digital:'Dijital', finance:'Finans',
    insights:'Görüşler', research:'Araştırma', articles:'Makaleler', reports:'Raporlar', webinars:'Web Seminerleri',
    connect: 'Bağlantı', linkedin:'LinkedIn', twitter:'Twitter/X', offices:'Ofisler', partners:'Ortaklar',
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
              <li><Link href="#">{l.careers}</Link></li>
              <li><Link href="#">{l.press}</Link></li>
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
            <h4>{l.insights}</h4>
            <ul>
              <li><Link href="#">{l.research}</Link></li>
              <li><Link href="#">{l.articles}</Link></li>
              <li><Link href="#">{l.reports}</Link></li>
              <li><Link href="#">{l.webinars}</Link></li>
            </ul>
          </div>
          <div className="fc">
            <h4>{l.connect}</h4>
            <ul>
              <li><Link href="#">{l.linkedin}</Link></li>
              <li><Link href="#">{l.twitter}</Link></li>
              <li><Link href="/contact">{l.offices}</Link></li>
              <li><Link href="#">{l.partners}</Link></li>
            </ul>
          </div>
        </div>
        <div className="fbot">
          <span className="fcopy">© {new Date().getFullYear()} Meridian Group. {l.rights}</span>
          <div className="fleg">
            <Link href="#">{l.privacy}</Link>
            <Link href="#">{l.terms}</Link>
            <Link href="#">{l.cookies}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
