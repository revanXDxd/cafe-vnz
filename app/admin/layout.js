// app/admin/layout.js - NO AUTH TEMPORARY
'use client'

import { useRouter } from 'next/navigation'

export default function AdminLayout({ children }) {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 border-r border-gray-700">
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
          <span className="text-white font-bold text-xl">
            VNZ <span className="text-amber-400">ADMIN</span>
          </span>
        </div>

        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">A</span>
            </div>
            <div>
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-sm text-gray-400">Development Mode</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          <a href="/admin/dashboard" className="flex items-center px-3 py-3 text-sm font-medium rounded-lg text-white bg-amber-500">
            <span className="mr-3">📊</span>
            Dashboard
          </a>
          <a href="/admin/menu" className="flex items-center px-3 py-3 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700">
            <span className="mr-3">🍽️</span>
            Menu Management
          </a>
          <a href="/admin/orders" className="flex items-center px-3 py-3 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700">
            <span className="mr-3">📦</span>
            Orders
          </a>
          <a href="/admin/gallery" className="flex items-center px-3 py-3 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700">
            <span className="mr-3">🖼️</span>
            Gallery
          </a>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={() => router.push('/')}
            className="flex items-center w-full px-3 py-3 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-all"
          >
            <span className="mr-3">🏠</span>
            Kembali ke Website
          </button>
        </div>
      </div>

      <main className="flex-1 lg:ml-64 p-6">
        {children}
      </main>
    </div>
  )
}