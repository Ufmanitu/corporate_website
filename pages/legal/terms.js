import Head from 'next/head'
import Link from 'next/link'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms of Use — Meridian Group</title>
        <meta name="description" content="Meridian Group's Terms of Use — the conditions governing your use of our website and services." />
      </Head>
      <Nav />

      <section className="ph">
        <div className="ph-bg" />
        <div className="ph-inner">
          <div className="ph-breadcrumb">
            <Link href="/">Home</Link><span>/</span>
            <Link href="/legal/terms">Legal</Link><span>/</span>
            Terms of Use
          </div>
          <span className="eyebrow">Legal</span>
          <h1 className="ph-title">Terms of Use</h1>
          <p className="ph-sub">The conditions governing your use of our website and services.</p>
          <div className="ph-line" />
        </div>
      </section>

      <section className="sec-pad" style={{ background: 'var(--white)' }}>
        <div className="si">
          <p className="legal-updated">Last updated: 1 June 2025</p>
          <div className="legal-body">

            <div className="legal-section">
              <h2>1. Acceptance of Terms</h2>
              <p>By accessing or using the Meridian Group website at <Link href="/">meridiangroup.com</Link> (the "Website"), you agree to be bound by these Terms of Use ("Terms"). If you do not agree to these Terms, please do not use the Website.</p>
              <p>These Terms apply to all visitors, users, and others who access or use the Website. We reserve the right to modify these Terms at any time, and such modifications will be effective immediately upon posting. Your continued use of the Website following any modification constitutes your acceptance of the revised Terms.</p>
            </div>

            <div className="legal-section">
              <h2>2. About Meridian Group</h2>
              <p>Meridian Group is a global strategy and technology consultancy headquartered at 10 Grosvenor Square, Mayfair, London W1K 6JP, United Kingdom. References to "Meridian," "we," "us," or "our" in these Terms refer to Meridian Group and its affiliated entities.</p>
            </div>

            <div className="legal-section">
              <h2>3. Use of the Website</h2>
              <p>You may use the Website only for lawful purposes and in accordance with these Terms. You agree not to:</p>
              <ul>
                <li>Use the Website in any way that violates applicable local, national, or international law or regulation.</li>
                <li>Transmit any unsolicited or unauthorised advertising or promotional material, or any other form of solicitation.</li>
                <li>Knowingly transmit any data, send or upload any material that contains viruses, Trojan horses, worms, or any other harmful or malicious software.</li>
                <li>Attempt to gain unauthorised access to any part of the Website, the server on which the Website is hosted, or any server, computer, or database connected to the Website.</li>
                <li>Attack the Website via a denial-of-service attack or a distributed denial-of-service attack.</li>
                <li>Scrape, crawl, or spider any content from the Website without our prior written consent.</li>
                <li>Use the Website to harass, abuse, or harm another person or entity.</li>
              </ul>
            </div>

            <div className="legal-section">
              <h2>4. Intellectual Property</h2>
              <p>The Website and its entire contents — including text, images, graphics, logos, icons, audio clips, digital downloads, data compilations, and software — are the property of Meridian Group or its content suppliers and are protected by applicable intellectual property laws.</p>
              <p>You may access and use the Website for personal, non-commercial, informational purposes only. You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any material from the Website, except:</p>
              <ul>
                <li>Your computer may temporarily store copies of such materials incidentally to your browsing of the Website.</li>
                <li>You may print or download one copy of a reasonable number of pages of the Website for your own personal, non-commercial use, provided you do not modify them and maintain any copyright or proprietary notices.</li>
              </ul>
              <p>The Meridian Group name, logo, and all related names, logos, product and service names, designs, and slogans are trademarks of Meridian Group. You must not use such marks without our prior written permission.</p>
            </div>

            <div className="legal-section">
              <h2>5. Disclaimer of Warranties</h2>
              <p>The Website is provided on an "as is" and "as available" basis, without any warranties of any kind, either express or implied. Meridian Group disclaims all warranties, express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.</p>
              <p>We do not warrant that the Website will be uninterrupted, error-free, or free of viruses or other harmful components; that defects will be corrected; or that the Website or the server that makes it available are free of viruses or other harmful components.</p>
              <p>The content on the Website is provided for general information purposes only. It does not constitute professional advice. You should not rely on it as a substitute for specific professional or expert advice relevant to your circumstances.</p>
            </div>

            <div className="legal-section">
              <h2>6. Limitation of Liability</h2>
              <p>To the fullest extent permitted by law, Meridian Group, its affiliates, officers, directors, employees, agents, suppliers, or licensors shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, goodwill, or other intangible losses, arising out of or relating to your access to or use of (or inability to access or use) the Website or its content.</p>
              <p>Nothing in these Terms limits or excludes our liability for death or personal injury caused by our negligence, fraud or fraudulent misrepresentation, or any other liability that cannot be lawfully limited or excluded.</p>
            </div>

            <div className="legal-section">
              <h2>7. Third-Party Links</h2>
              <p>The Website may contain links to third-party websites or services that are not owned or controlled by Meridian Group. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services. We strongly advise you to read the terms and conditions and privacy policies of any third-party websites you visit.</p>
            </div>

            <div className="legal-section">
              <h2>8. Confidentiality of Enquiries</h2>
              <p>Information submitted through our contact form or by email is treated as confidential in accordance with our <Link href="/legal/privacy">Privacy Policy</Link>. However, the act of submitting an enquiry does not create a client relationship or impose any obligation on Meridian Group to provide services, maintain confidentiality beyond what is described in our Privacy Policy, or enter into any agreement.</p>
            </div>

            <div className="legal-section">
              <h2>9. Governing Law</h2>
              <p>These Terms and any dispute or claim arising out of or in connection with them (including non-contractual disputes or claims) shall be governed by and construed in accordance with the laws of England and Wales.</p>
              <p>You and Meridian Group both agree to submit to the non-exclusive jurisdiction of the courts of England and Wales. If you are a consumer, you will benefit from any mandatory provisions of the law of the country in which you are resident.</p>
            </div>

            <div className="legal-section">
              <h2>10. Severability</h2>
              <p>If any provision of these Terms is found to be unenforceable or invalid by a court of competent jurisdiction, that provision will be limited or eliminated to the minimum extent necessary so that the remaining Terms will otherwise remain in full force and effect.</p>
            </div>

            <div className="legal-section">
              <h2>11. Contact</h2>
              <p>If you have any questions about these Terms of Use, please contact us:</p>
              <p>
                <strong>Meridian Group — Legal</strong><br />
                10 Grosvenor Square, Mayfair<br />
                London W1K 6JP, United Kingdom<br />
                <a href="mailto:legal@meridiangroup.com">legal@meridiangroup.com</a>
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
