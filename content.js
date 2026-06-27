import { createClient } from '@supabase/supabase-js'

// Server-side client uses the service role key (bypasses RLS for reads)
// Only used in getServerSideProps — never sent to the browser
function getServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )
}

/**
 * Fetch all content for a page.
 * Returns a flat object: { 'hero-title': 'Navigate...', 'hero-sub': '...' }
 * Falls back to empty string for any missing key.
 */
export async function getPageContent(page) {
  const supabase = getServerClient()
  const { data, error } = await supabase
    .from('page_content')
    .select('key, value')
    .eq('page', page)

  if (error) {
    console.error(`[content] Failed to load page "${page}":`, error.message)
    return {}
  }

  return data.reduce((acc, row) => {
    acc[row.key] = row.value
    return acc
  }, {})
}

/**
 * Helper used in pages to safely get a content value.
 * Returns the DB value if present, otherwise the default.
 *
 * Usage: c('hero-title', 'Navigate What\'s Next.')
 */
export function makeGetter(content) {
  return function c(key, defaultValue = '') {
    return content[key] !== undefined ? content[key] : defaultValue
  }
}
