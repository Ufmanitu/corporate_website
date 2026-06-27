import { createClient } from '@supabase/supabase-js'

// Server-side handler for reading/writing page content
// GET  /api/content?page=home        → returns { key: value, ... }
// POST /api/content  { page, key, value }  → upserts one row (requires auth)
// POST /api/content  { page, rows: [{key,value}] } → bulk upsert (requires auth)

export default async function handler(req, res) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  // ── GET: fetch all content for a page ──────────────────────────────────────
  if (req.method === 'GET') {
    const { page } = req.query
    if (!page) return res.status(400).json({ error: 'page query param required' })

    const { data, error } = await supabase
      .from('page_content')
      .select('key, value')
      .eq('page', page)

    if (error) return res.status(500).json({ error: error.message })

    const content = data.reduce((acc, row) => {
      acc[row.key] = row.value
      return acc
    }, {})

    return res.status(200).json(content)
  }

  // ── POST: save content (requires valid Supabase session) ───────────────────
  if (req.method === 'POST') {
    // Verify the caller is authenticated
    const authHeader = req.headers.authorization
    if (!authHeader) return res.status(401).json({ error: 'No auth token' })

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    if (authError || !user) return res.status(401).json({ error: 'Invalid token' })

    const { page, key, value, rows } = req.body

    // Bulk upsert (Save All)
    if (rows) {
      const upserts = rows.map(r => ({ page, key: r.key, value: r.value }))
      const { error } = await supabase
        .from('page_content')
        .upsert(upserts, { onConflict: 'page,key' })
      if (error) return res.status(500).json({ error: error.message })
      return res.status(200).json({ ok: true, saved: upserts.length })
    }

    // Single field upsert (auto-save on blur)
    if (!page || !key || value === undefined) {
      return res.status(400).json({ error: 'page, key, value required' })
    }

    const { error } = await supabase
      .from('page_content')
      .upsert({ page, key, value }, { onConflict: 'page,key' })

    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json({ ok: true })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
