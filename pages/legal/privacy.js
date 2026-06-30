import Head from 'next/head'
import Link from 'next/link'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy — Meridian Group</title>
        <meta name="description" content="Meridian Group's Privacy Policy — how we collect, use, and protect your personal information." />
      </Head>
      <Nav />

      <section className="ph">
        <div className="ph-bg" />
        <div className="ph-inner">
          <div className="ph-breadcrumb">
            <Link href="/">Home</Link><span>/</span>
            <Link href="/legal/privacy">Legal</Link><span>/</span>
            Privacy Policy
          </div>
          <span className="eyebrow">Legal</span>
          <h1 className="ph-title">Privacy Policy</h1>
          <p className="ph-sub">How we collect, use, and protect your personal information.</p>
          <div className="ph-line" />
        </div>
      </section>

      <section className="sec-pad" style={{ background: 'var(--white)' }}>
        <div className="si">
          <p className="legal-updated">Last updated: 1 June 2025</p>
          <div className="legal-body">

            <div className="legal-section">
              <h2>1. Introduction</h2>
              <p>Meridian Group ("Meridian," "we," "us," or "our") is committed to protecting your personal information and your right to privacy. This Privacy Policy explains what information we collect, how we use it, and what rights you have in relation to it.</p>
              <p>This policy applies to all information collected through our website (<Link href="/">meridiangroup.com</Link>), and any related services, sales, marketing, or events (collectively referred to as "Services").</p>
              <p>Please read this policy carefully. If you disagree with its terms, please discontinue use of our Services.</p>
            </div>

            <div className="legal-section">
              <h2>2. Information We Collect</h2>
              <h3>Information you provide to us</h3>
              <p>We collect personal information that you voluntarily provide when you:</p>
              <ul>
                <li>Complete our contact or enquiry form</li>
                <li>Request information about our services</li>
                <li>Subscribe to our insights and publications</li>
                <li>Apply for a position at Meridian Group</li>
                <li>Communicate with us by email, phone, or otherwise</li>
              </ul>
              <p>This information may include your name, email address, phone number, company name, job title, and the content of your communications with us.</p>
              <h3>Information collected automatically</h3>
              <p>When you visit our website, we automatically collect certain technical information, including your IP address, browser type, operating system, referring URLs, pages viewed, and the date and time of your visit. This information is collected through cookies and similar tracking technologies (see Section 7).</p>
            </div>

            <div className="legal-section">
              <h2>3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Respond to your enquiries and fulfil your requests</li>
                <li>Provide, operate, and maintain our Services</li>
                <li>Send you relevant insights, updates, and marketing communications (where you have consented or where we have a legitimate interest to do so)</li>
                <li>Improve and personalise your experience on our website</li>
                <li>Comply with our legal obligations</li>
                <li>Protect the security and integrity of our Services</li>
                <li>Conduct research and analysis to understand how our Services are used</li>
              </ul>
            </div>

            <div className="legal-section">
              <h2>4. Legal Basis for Processing</h2>
              <p>Where applicable under the UK GDPR and EU GDPR, we process your personal information on the following legal bases:</p>
              <ul>
                <li><strong>Consent</strong> — where you have given clear consent for us to process your personal information for a specific purpose.</li>
                <li><strong>Contract</strong> — where processing is necessary for the performance of a contract with you, or to take steps at your request before entering into a contract.</li>
                <li><strong>Legitimate interests</strong> — where processing is necessary for our legitimate interests (such as improving our Services, direct marketing to existing contacts, and preventing fraud), provided these are not overridden by your interests and rights.</li>
                <li><strong>Legal obligation</strong> — where processing is necessary to comply with a legal obligation.</li>
              </ul>
            </div>

            <div className="legal-section">
              <h2>5. Sharing Your Information</h2>
              <p>We do not sell your personal information. We may share your information with:</p>
              <ul>
                <li><strong>Service providers</strong> who assist us in operating our website and delivering our Services (such as hosting providers, email platforms, and analytics services), under strict confidentiality obligations.</li>
                <li><strong>Professional advisers</strong> such as lawyers, auditors, and insurers where necessary.</li>
                <li><strong>Regulatory authorities</strong> where we are required to do so by law.</li>
                <li><strong>Successors</strong> in the event of a merger, acquisition, or sale of assets, where personal information may be transferred as a business asset.</li>
              </ul>
            </div>

            <div className="legal-section">
              <h2>6. International Transfers</h2>
              <p>Meridian Group operates globally, and your personal information may be transferred to and processed in countries outside your country of residence, including countries that may not offer the same level of data protection as your home country.</p>
              <p>Where we transfer personal information outside the UK or EEA, we ensure appropriate safeguards are in place, such as Standard Contractual Clauses approved by the European Commission or the UK Information Commissioner's Office.</p>
            </div>

            <div id="cookies" className="legal-section">
              <h2>7. Cookies &amp; Tracking Technologies</h2>
              <p>Our website uses cookies and similar tracking technologies to enhance your experience, analyse traffic, and support our marketing activities. Cookies are small text files placed on your device when you visit our website.</p>
              <h3>Types of cookies we use</h3>
              <ul>
                <li><strong>Essential cookies</strong> — necessary for the website to function correctly. These cannot be disabled.</li>
                <li><strong>Analytics cookies</strong> — help us understand how visitors interact with our website (e.g., Google Analytics). We use this data in aggregate to improve performance.</li>
                <li><strong>Functional cookies</strong> — remember your preferences (such as language selection) to provide a more personalised experience.</li>
                <li><strong>Marketing cookies</strong> — used to track visitors across websites to display relevant advertising. We do not currently use marketing cookies.</li>
              </ul>
              <h3>Managing cookies</h3>
              <p>You can control and manage cookies through your browser settings. Most browsers allow you to refuse cookies, delete existing cookies, or be alerted when a cookie is being set. Please note that disabling certain cookies may affect the functionality of our website.</p>
              <p>For more information about cookies and how to manage them, visit <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer">allaboutcookies.org</a>.</p>
            </div>

            <div className="legal-section">
              <h2>8. Data Retention</h2>
              <p>We retain your personal information only for as long as necessary to fulfil the purposes described in this policy, unless a longer retention period is required or permitted by law.</p>
              <p>Contact enquiry data is typically retained for up to 3 years following our last interaction with you. Analytics data is retained in aggregate form only and may be held indefinitely.</p>
            </div>

            <div className="legal-section">
              <h2>9. Your Rights</h2>
              <p>Depending on your location, you may have the following rights regarding your personal information:</p>
              <ul>
                <li><strong>Right of access</strong> — to request a copy of the personal information we hold about you.</li>
                <li><strong>Right to rectification</strong> — to request correction of inaccurate or incomplete information.</li>
                <li><strong>Right to erasure</strong> — to request deletion of your personal information in certain circumstances.</li>
                <li><strong>Right to restriction</strong> — to request that we restrict processing of your personal information.</li>
                <li><strong>Right to data portability</strong> — to receive your data in a structured, machine-readable format.</li>
                <li><strong>Right to object</strong> — to object to processing based on legitimate interests or for direct marketing purposes.</li>
                <li><strong>Right to withdraw consent</strong> — where processing is based on consent, you may withdraw it at any time.</li>
              </ul>
              <p>To exercise any of these rights, please contact us at <a href="mailto:privacy@meridiangroup.com">privacy@meridiangroup.com</a>. We will respond within 30 days.</p>
            </div>

            <div className="legal-section">
              <h2>10. Security</h2>
              <p>We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, accidental loss, disclosure, or destruction. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.</p>
            </div>

            <div className="legal-section">
              <h2>11. Changes to This Policy</h2>
              <p>We may update this Privacy Policy from time to time. When we do, we will revise the "Last updated" date at the top of this page. We encourage you to review this policy periodically to stay informed about how we protect your information.</p>
            </div>

            <div className="legal-section">
              <h2>12. Contact Us</h2>
              <p>If you have questions, concerns, or requests regarding this Privacy Policy, please contact our Data Protection team:</p>
              <p>
                <strong>Meridian Group — Data Protection</strong><br />
                10 Grosvenor Square, Mayfair<br />
                London W1K 6JP, United Kingdom<br />
                <a href="mailto:privacy@meridiangroup.com">privacy@meridiangroup.com</a>
              </p>
              <p>You also have the right to lodge a complaint with your local supervisory authority. In the UK, this is the Information Commissioner's Office (<a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">ico.org.uk</a>).</p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
