// components/admin/AdminSidebar.js
'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AdminSidebar() {
  const { data: session } = useSession()
  const pathname = usePathname()

  const menuItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
    { name: 'Menu Management', href: '/admin/menu', icon: '🍽️' },
    { name: 'Orders', href: '/admin/orders', icon: '📦' },
    { name: 'Gallery', href: '/admin/gallery', icon: '🖼️' },
    { name: 'Messages', href: '/admin/messages', icon: '✉️' },
    { name: 'Reservations', href: '/admin/reservations', icon: '📅' },
  ]

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 border-r border-gray-700">
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
        <div className="flex items-center">
          <span className="text-white font-bold text-xl">
            VNZ <span className="text-amber-400">ADMIN</span>
          </span>
        </div>
      </div>

      {/* User Info */}
      <div className="px-4 py-4 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold">
              {session?.user?.name?.charAt(0) || 'A'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {session?.user?.name}
            </p>
            <p className="text-sm text-gray-400 truncate capitalize">
              {session?.user?.role?.toLowerCase()}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-4 px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-amber-500 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Sign Out Button */}
      <div className="absolute bottom-4 left-4 right-4">
        <button
          onClick={() => signOut()}
          className="flex items-center w-full px-3 py-3 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-all duration-200"
        >
          <span className="mr-3 text-lg">🚪</span>
          Keluar
        </button>
      </div>
    </div>
  )
}