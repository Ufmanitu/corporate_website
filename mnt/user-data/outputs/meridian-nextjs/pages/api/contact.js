import { createClient } from '@supabase/supabase-js'

// POST /api/contact
// Body: { name, company, email, phone, service, budget, message }
// → saves to inquiries table
// → sends notification email via Resend (if RESEND_API_KEY is set)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, company, email, phone, service, budget, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'name, email, and message are required' })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  // ── 1. Save to database ────────────────────────────────────────────────────
  const { error: dbError } = await supabase
    .from('inquiries')
    .insert({ name, company, email, phone, service, budget, message })

  if (dbError) {
    console.error('[contact] DB insert failed:', dbError.message)
    return res.status(500).json({ error: 'Failed to save inquiry' })
  }

  // ── 2. Send notification email (optional — skip if no key) ─────────────────
  if (process.env.RESEND_API_KEY) {
    try {
      const { Resend } = await import('resend')
      const resend = new Resend(process.env.RESEND_API_KEY)

      await resend.emails.send({
        from: process.env.CONTACT_EMAIL_FROM || 'noreply@meridiangroup.com',
        to:   process.env.CONTACT_EMAIL_TO   || 'hello@meridiangroup.com',
        subject: `New inquiry from ${name} (${company || 'no company'})`,
        html: `
          <h2>New Contact Form Submission</h2>
          <table cellpadding="8" style="border-collapse:collapse">
            <tr><td><strong>Name</strong></td><td>${name}</td></tr>
            <tr><td><strong>Company</strong></td><td>${company || '—'}</td></tr>
            <tr><td><strong>Email</strong></td><td><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td><strong>Phone</strong></td><td>${phone || '—'}</td></tr>
            <tr><td><strong>Service</strong></td><td>${service || '—'}</td></tr>
            <tr><td><strong>Budget</strong></td><td>${budget || '—'}</td></tr>
            <tr><td><strong>Message</strong></td><td>${message}</td></tr>
          </table>
        `,
      })
    } catch (emailError) {
      // Email failure is non-fatal — submission is already saved to DB
      console.error('[contact] Email send failed:', emailError.message)
    }
  }

  return res.status(200).json({ ok: true })
}
