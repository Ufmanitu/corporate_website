import { useEffect, useRef } from 'react'
import { useAdmin } from '../context/AdminContext'

/**
 * Editable — renders any HTML tag as an inline-editable element in admin mode.
 *
 * Props:
 *   tag        — HTML tag to render ('span', 'h1', 'p', 'div', etc.) [default: 'span']
 *   id         — the data-key value (used to identify the field in DB)
 *   content    — the current value (HTML string from DB or default)
 *   className  — CSS classes to forward
 *   style      — inline styles to forward
 *
 * Usage:
 *   <Editable tag="h1" id="hero-title" content={c('hero-title', 'Navigate What\'s Next.')} className="hero-h1" />
 */
export default function Editable({ tag: Tag = 'span', id, content = '', className = '', style, onClick }) {
  const { isAdmin, saveSingle } = useAdmin()
  const ref = useRef(null)
  const isEditing = useRef(false)

  // Sync content from DB into the DOM (but only when not actively editing)
  useEffect(() => {
    if (ref.current && !isEditing.current) {
      ref.current.innerHTML = content
    }
  }, [content])

  return (
    <Tag
      ref={ref}
      data-key={id}
      className={`${className}${isAdmin ? ' editable' : ''}`}
      style={style}
      contentEditable={isAdmin || undefined}
      suppressContentEditableWarning
      onFocus={() => { isEditing.current = true }}
      onBlur={e => {
        isEditing.current = false
        if (isAdmin) saveSingle(id, e.currentTarget.innerHTML)
      }}
      onClick={!isAdmin ? onClick : undefined}
    />
  )
}
