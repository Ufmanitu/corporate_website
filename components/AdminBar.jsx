import { useEffect } from 'react'
import { useAdmin } from '../context/AdminContext'

export default function AdminBar() {
  const { isAdmin, enterAdmin, exitAdmin, logout, saveAll, resetAll, toastMsg } = useAdmin()

  // Keyboard shortcut: Ctrl+Shift+A
  useEffect(() => {
    function handleKey(e) {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault()
        isAdmin ? exitAdmin() : enterAdmin()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isAdmin, enterAdmin, exitAdmin])

  return (
    <>
      {/* Floating gear button */}
      <button
        className={`admin-fab${isAdmin ? ' on' : ''}`}
        onClick={() => isAdmin ? exitAdmin() : enterAdmin()}
        title="Admin mode (Ctrl+Shift+A)"
      >
        {isAdmin ? '✓' : '⚙'}
      </button>

      {/* Top bar — only visible when admin mode is on */}
      {isAdmin && (
        <div id="admin-bar" style={{ display: 'flex' }}>
          <span className="ab-label">Admin Mode</span>
          <span className="ab-sep" />
          <span style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.4)' }}>
            Click any highlighted text to edit
          </span>
          <span className="ab-sep" />
          <button className="ab-btn save" onClick={saveAll}>Save All</button>
          <button className="ab-btn" onClick={resetAll}>Reset Page</button>
          <button className="ab-btn" onClick={exitAdmin}>Exit</button>
          <button className="ab-btn" onClick={logout}>Sign Out</button>
        </div>
      )}

      {/* Toast notification */}
      {toastMsg && (
        <div id="toast" className="show">{toastMsg}</div>
      )}
    </>
  )
}
