// app/admin/dashboard/page.js - SUPER SIMPLE
'use client'

import { useSession } from 'next-auth/react'

export default function AdminDashboard() {
  const { data: session } = useSession()

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Admin Dashboard</h1>
      
      {/* Welcome Card */}
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 mb-6">
        <h2 className="text-xl font-bold text-white mb-2">🎉 Welcome to VNZ Cafe Admin!</h2>
        <p className="text-gray-300">
          Logged in as: <span className="text-amber-400">{session?.user?.email}</span>
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Orders</p>
              <p className="text-2xl font-bold text-white">156</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
              <span className="text-white text-xl">📦</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Menu Items</p>
              <p className="text-2xl font-bold text-white">24</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
              <span className="text-white text-xl">🍽️</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Revenue</p>
              <p className="text-2xl font-bold text-white">Rp 12.4M</p>
            </div>
            <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center">
              <span className="text-white text-xl">💰</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="bg-amber-500 hover:bg-amber-600 text-white py-3 px-4 rounded-lg font-semibold transition-all">
            Kelola Menu
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold transition-all">
            Lihat Orders
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-semibold transition-all">
            Kelola Gallery
          </button>
          <button className="bg-purple-500 hover:bg-purple-600 text-white py-3 px-4 rounded-lg font-semibold transition-all">
            Lihat Messages
          </button>
        </div>
      </div>
    </div>
  )
}