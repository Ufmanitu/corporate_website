import { createClient } from '@supabase/supabase-js'
import SHOP_T from './shopI18n'

export async function getShopContent(page, locale = 'en') {
  const defaults = SHOP_T[locale] ?? SHOP_T.en
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return defaults
  try {
    const supabase = createClient(url, key)
    const pageKey = locale === 'en' ? `shop_${page}` : `shop_${page}_${locale}`
    const timer = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), 5000)
    )
    const { data, error } = await Promise.race([
      supabase.from('page_content').select('key, value').eq('page', pageKey),
      timer,
    ])
    if (error) return defaults
    const overrides = (data || []).reduce((acc, row) => {
      acc[row.key] = row.value
      return acc
    }, {})
    return { ...defaults, ...overrides }
  } catch {
    return defaults
  }
}
