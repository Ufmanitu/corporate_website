import { createClient } from '@supabase/supabase-js'
import tr from '../locales/tr'

const locales = { tr }

function getServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )
}

export async function getPageContent(page, locale = 'en') {
  const supabase = getServerClient()
  // Non-English content is stored under e.g. 'home_tr' in Supabase
  const pageKey = locale === 'en' ? page : `${page}_${locale}`

  const { data, error } = await supabase
    .from('page_content')
    .select('key, value')
    .eq('page', pageKey)

  if (error) {
    console.error(`[content] Failed to load page "${pageKey}":`, error.message)
  }

  const localeDefaults = locales[locale]?.[page] ?? {}
  const supabaseOverrides = (data || []).reduce((acc, row) => {
    acc[row.key] = row.value
    return acc
  }, {})

  return { ...localeDefaults, ...supabaseOverrides }
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
