// app/admin/login/page.js
'use client'

import { useState } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@vnzcafe.com')
  const [password, setPassword] = useState('admin123')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    // Check jika sudah login
    const checkSession = async () => {
      const session = await getSession()
      if (session) {
        router.push('/admin/dashboard')
      }
    }
    checkSession()
  }, [router])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      console.log('Login result:', result)

      if (result?.error) {
        setError('Email atau password salah')
      } else {
        // Login successful
        router.push('/admin/dashboard')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('Terjadi kesalahan sistem')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-amber-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">
            VNZ <span className="text-amber-400">CAFE</span>
          </h1>
          <h2 className="text-2xl font-bold text-white">Admin Login</h2>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-gray-800/50 p-8 rounded-2xl border border-gray-700">
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
              placeholder="admin@vnzcafe.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 px-4 rounded-lg font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Loading...
              </>
            ) : (
              'Login'
            )}
          </button>

          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 text-center">
            <p className="text-amber-300 text-sm">
              <strong>Test Credentials:</strong><br/>
              Email: admin@vnzcafe.com<br/>
              Password: admin123
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}