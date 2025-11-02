// components/MobileMenu.js
'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'

export default function MobileMenu({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      gsap.to('.mobile-menu', { x: 0, duration: 0.3, ease: 'power2.out' })
    } else {
      gsap.to('.mobile-menu', { x: '100%', duration: 0.3, ease: 'power2.in' })
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="mobile-menu fixed inset-0 z-50 transform translate-x-full">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-xl">
        <div className="p-6">
          <button className="absolute top-4 right-4 text-gray-700" onClick={onClose}>
            ✕
          </button>
          <div className="flex flex-col space-y-6 mt-12">
            {['Home', 'About', 'Menu', 'Gallery', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-700 hover:text-amber-600 transition-colors text-lg font-medium"
                onClick={onClose}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}