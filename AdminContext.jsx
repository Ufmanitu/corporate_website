import { createContext, useContext, useState, useCallback, useRef } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/router'

const AdminContext = createContext(null)

export function AdminProvider({ children, page }) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [toastMsg, setToastMsg] = useState(null)
  const toastTimer = useRef(null)
  const router = useRouter()

  function showToast(msg) {
    setToastMsg(msg)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToastMsg(null), 2600)
  }

  const enterAdmin = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      setIsAdmin(true)
    } else {
      // Not logged in — send to login page with return URL
      router.push(`/admin/login?next=${router.asPath}`)
    }
  }, [router])

  const exitAdmin = useCallback(() => {
    setIsAdmin(false)
  }, [])

  // Save a single field immediately (called on contentEditable blur)
  const saveSingle = useCallback(async (key, value) => {
    const { error } = await supabase
      .from('page_content')
      .upsert({ page, key, value }, { onConflict: 'page,key' })

    if (error) {
      console.error('[admin] Save failed:', error.message)
      showToast('⚠ Save failed — check console')
    }
    // No toast on single-field save to avoid spam
  }, [page])

  // Save all visible editable fields at once (Save All button)
  const saveAll = useCallback(async () => {
    const editables = document.querySelectorAll('[data-key]')
    const upserts = Array.from(editables).map(el => ({
      page,
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
    if (!confirm('Reset all content on this page to defaults?')) return
    const { error } = await supabase
      .from('page_content')
      .delete()
      .eq('page', page)

    if (!error) {
      showToast('Page reset — reloading...')
      setTimeout(() => router.reload(), 800)
    }
  }, [page, router])

  return (
    <AdminContext.Provider value={{ isAdmin, enterAdmin, exitAdmin, saveSingle, saveAll, resetAll, toastMsg }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const ctx = useContext(AdminContext)
  if (!ctx) throw new Error('useAdmin must be used inside AdminProvider')
  return ctx
}
