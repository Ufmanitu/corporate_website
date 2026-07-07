import { createClient } from '@supabase/supabase-js'
import SHOP_T from './shopI18n'

async function fetchOverrides(pageKey) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return {}
  try {
    const supabase = createClient(url, key)
    const timer = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), 5000)
    )
    const { data, error } = await Promise.race([
      supabase.from('page_content').select('key, value').eq('page', pageKey),
      timer,
    ])
    if (error) return {}
    return (data || []).reduce((acc, row) => { acc[row.key] = row.value; return acc }, {})
  } catch {
    return {}
  }
}

export async function getShopContent(page, locale = 'en') {
  const defaults = SHOP_T[locale] ?? SHOP_T.en
  const pageKey = locale === 'en' ? `shop_${page}` : `shop_${page}_${locale}`
  const overrides = await fetchOverrides(pageKey)
  return { ...defaults, ...overrides }
}

export async function getContentWithDefaults(pageKey, defaults) {
  const overrides = await fetchOverrides(pageKey)
  return { ...defaults, ...overrides }
}
