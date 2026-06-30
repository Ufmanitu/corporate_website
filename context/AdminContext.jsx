import { createContext, useContext, useState, useCallback, useRef } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/router'

const AdminContext = createContext(null)

export function AdminProvider({ children, page }) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [toastMsg, setToastMsg] = useState(null)
  const toastTimer = useRef(null)
  const router = useRouter()
  const pageKey = router.locale && router.locale !== 'en' ? `${page}_${router.locale}` : page

  function showToast(msg) {
    setToastMsg(msg)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToastMsg(null), 2600)
  }

  const enterAdmin = useCallback(async () => {
    if (!supabase) return router.push(`/admin/login?next=${router.asPath}`)
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      setIsAdmin(true)
    } else {
      router.push(`/admin/login?next=${router.asPath}`)
    }
  }, [router])

  const exitAdmin = useCallback(() => {
    setIsAdmin(false)
  }, [])

  const logout = useCallback(async () => {
    if (supabase) await supabase.auth.signOut()
    setIsAdmin(false)
  }, [])

  // Save a single field immediately (called on contentEditable blur)
  const saveSingle = useCallback(async (key, value) => {
    if (!supabase) return
    const { error } = await supabase
      .from('page_content')
      .upsert({ page: pageKey, key, value }, { onConflict: 'page,key' })

    if (error) {
      console.error('[admin] Save failed:', error.message)
      showToast('⚠ Save failed — check console')
    }
  }, [page])

  const saveAll = useCallback(async () => {
    if (!supabase) return showToast('⚠ Supabase not configured')
    const editables = document.querySelectorAll('[data-key]')
    const upserts = Array.from(editables).map(el => ({
      page: pageKey,
      key: el.dataset.key,
      value: el.innerHTML,
    }))

    const { error } = await supabase
      .from('page_content')
      .upsert(upserts, { onConflict: 'page,key' })

    if (error) {
      showToast('⚠ Save failed — check console')
    } else {
      showToast('All changes saved ✓')
    }
  }, [page])

  const resetAll = useCallback(async () => {
    if (!supabase) return
    if (!confirm('Reset all content on this page to defaults?')) return
    const { error } = await supabase
      .from('page_content')
      .delete()
      .eq('page', pageKey)

    if (!error) {
      showToast('Page reset — reloading...')
      setTimeout(() => router.reload(), 800)
    }
  }, [page, router])

  return (
    <AdminContext.Provider value={{ isAdmin, enterAdmin, exitAdmin, logout, saveSingle, saveAll, resetAll, toastMsg }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const ctx = useContext(AdminContext)
  if (!ctx) throw new Error('useAdmin must be used inside AdminProvider')
  return ctx
}
