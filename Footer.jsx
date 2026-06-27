import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <div className="fi">
        <div className="ft">
          <div className="fb">
            <div className="fl">Meridian<em>.</em></div>
            <p className="ftag">We help ambitious organizations navigate complexity and build lasting advantage.</p>
          </div>
          <div className="fc">
            <h4>Company</h4>
            <ul>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/about#leadership">Leadership</Link></li>
              <li><Link href="#">Careers</Link></li>
              <li><Link href="#">Press</Link></li>
            </ul>
          </div>
          <div className="fc">
            <h4>Services</h4>
            <ul>
              <li><Link href="/services">Strategy</Link></li>
              <li><Link href="/services">Technology</Link></li>
              <li><Link href="/services">Digital</Link></li>
              <li><Link href="/services">Finance</Link></li>
            </ul>
          </div>
          <div className="fc">
            <h4>Insights</h4>
            <ul>
              <li><Link href="#">Research</Link></li>
              <li><Link href="#">Articles</Link></li>
              <li><Link href="#">Reports</Link></li>
              <li><Link href="#">Webinars</Link></li>
            </ul>
          </div>
          <div className="fc">
            <h4>Connect</h4>
            <ul>
              <li><Link href="#">LinkedIn</Link></li>
              <li><Link href="#">Twitter/X</Link></li>
              <li><Link href="/contact">Offices</Link></li>
              <li><Link href="#">Partners</Link></li>
            </ul>
          </div>
        </div>
        <div className="fbot">
          <span className="fcopy">© {new Date().getFullYear()} Meridian Group. All rights reserved.</span>
          <div className="fleg">
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Use</Link>
            <Link href="#">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
