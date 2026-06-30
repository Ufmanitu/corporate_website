import { createClient } from '@supabase/supabase-js'
import tr from '../locales/tr'
import hu from '../locales/hu'

const locales = { tr, hu }

export async function getPageContent(page, locale = 'en') {
  const localeDefaults = locales[locale]?.[page] ?? {}

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return localeDefaults

  try {
    const supabase = createClient(url, key)
    const pageKey = locale === 'en' ? page : `${page}_${locale}`

    const query = supabase.from('page_content').select('key, value').eq('page', pageKey)
    const timer = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Supabase query timed out')), 5000)
    )

    const { data, error } = await Promise.race([query, timer])

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
