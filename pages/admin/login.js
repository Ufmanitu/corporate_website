import { useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../../lib/supabase'
import Head from 'next/head'

export default function AdminLogin() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState(null)
  const [loading, setLoading]   = useState(false)
  const router = useRouter()
  const next = router.query.next || '/'

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push(next)
    }
  }

  return (
    <>
      <Head><title>Admin Login — Meridian Group</title></Head>
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', background: 'var(--dark)', fontFamily: 'var(--ff-b)'
      }}>
        <div style={{
          background: 'var(--navy)', border: '1px solid rgba(255,255,255,.08)',
          borderRadius: 20, padding: '2.5rem', width: '100%', maxWidth: 400
        }}>
          <div style={{ fontFamily: 'var(--ff-h)', fontSize: '1.3rem', fontWeight: 800, color: '#fff', marginBottom: '2rem' }}>
            Meridian<em style={{ color: 'var(--amber)', fontStyle: 'normal' }}>.</em> Admin
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '.78rem', color: 'rgba(255,255,255,.55)', marginBottom: '.4rem' }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={{
                  width: '100%', background: 'rgba(255,255,255,.05)', border: '1.5px solid rgba(255,255,255,.1)',
                  borderRadius: 10, padding: '.75rem 1rem', color: '#fff', fontSize: '.92rem',
                  fontFamily: 'var(--ff-b)', outline: 'none'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '.78rem', color: 'rgba(255,255,255,.55)', marginBottom: '.4rem' }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                style={{
                  width: '100%', background: 'rgba(255,255,255,.05)', border: '1.5px solid rgba(255,255,255,.1)',
                  borderRadius: 10, padding: '.75rem 1rem', color: '#fff', fontSize: '.92rem',
                  fontFamily: 'var(--ff-b)', outline: 'none'
                }}
              />
            </div>

            {error && (
              <div style={{ fontSize: '.82rem', color: '#ff6b6b', background: 'rgba(255,107,107,.1)', padding: '.6rem .9rem', borderRadius: 8 }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                background: 'var(--amber)', color: 'var(--dark)', border: 'none', borderRadius: 100,
                padding: '.85rem', fontFamily: 'var(--ff-b)', fontSize: '.92rem', fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? .7 : 1, marginTop: '.5rem'
              }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p style={{ marginTop: '1.5rem', fontSize: '.75rem', color: 'rgba(255,255,255,.25)', textAlign: 'center' }}>
            Admin access only. Create your account in the Supabase dashboard.
          </p>
        </div>
      </div>
    </>
  )
}
