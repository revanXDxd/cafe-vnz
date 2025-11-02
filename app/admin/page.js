// app/admin/page.js - DIRECT ACCESS
'use client'

import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-amber-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          VNZ <span className="text-amber-400">ADMIN</span>
        </h1>
        <p className="text-gray-300 mb-8">Pilih akses admin:</p>
        
        <div className="space-y-4">
          <button 
            onClick={() => router.push('/admin/dashboard')}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105"
          >
            🚀 Masuk ke Dashboard
          </button>
          
          <button 
            onClick={() => router.push('/admin/login')}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300"
          >
            🔐 Login (dengan Authentication)
          </button>

          <button 
            onClick={() => router.push('/')}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300"
          >
            ← Kembali ke Website
          </button>
        </div>

        <div className="mt-8 bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
          <p className="text-amber-300 text-sm">
            <strong>Development Mode:</strong> Authentication sementara dinonaktifkan untuk testing.
          </p>
        </div>
      </div>
    </div>
  )
}