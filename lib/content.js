import { createClient } from '@supabase/supabase-js'
import tr from '../locales/tr'
import hu from '../locales/hu'

const locales = { tr, hu }

function getServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )
}

export async function getPageContent(page, locale = 'en') {
  const localeDefaults = locales[locale]?.[page] ?? {}

  try {
    const supabase = getServerClient()
    const pageKey = locale === 'en' ? page : `${page}_${locale}`

    const { data, error } = await supabase
      .from('page_content')
      .select('key, value')
      .eq('page', pageKey)

    if (error) {
      console.error(`[content] Failed to load page "${pageKey}":`, error.message)
      return localeDefaults
    }

    const supabaseOverrides = (data || []).reduce((acc, row) => {
      acc[row.key] = row.value
      return acc
    }, {})

    return { ...localeDefaults, ...supabaseOverrides }
  } catch (e) {
    console.error('[content] Supabase unavailable, using defaults:', e.message)
    return localeDefaults
  }
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
