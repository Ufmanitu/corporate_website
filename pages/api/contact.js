import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, company, email, phone, service, budget, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' })
  }

  try {
    await resend.emails.send({
      from: process.env.CONTACT_EMAIL_FROM || 'noreply@meridiangroup.com',
      to: process.env.CONTACT_EMAIL_TO || 'hello@meridiangroup.com',
      replyTo: email,
      subject: `New inquiry from ${name}${company ? ` — ${company}` : ''}`,
      text: [
        `Name: ${name}`,
        company  ? `Company: ${company}`   : null,
        `Email: ${email}`,
        phone    ? `Phone: ${phone}`       : null,
        service  ? `Service: ${service}`   : null,
        budget   ? `Budget: ${budget}`     : null,
        '',
        message,
      ].filter(Boolean).join('\n'),
    })

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('[api/contact] Resend error:', err)
    return res.status(500).json({ error: 'Failed to send message. Please try again.' })
  }
}
