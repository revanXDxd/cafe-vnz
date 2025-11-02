// components/MenuCard.js - COMPLETE WITH REAL DATA
'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

export default function MenuCard({ item, index }) {
  const cardRef = useRef()

  useEffect(() => {
    gsap.fromTo(cardRef.current,
      {
        y: 50,
        opacity: 0,
        rotationY: 10
      },
      {
        y: 0,
        opacity: 1,
        rotationY: 0,
        duration: 0.6,
        delay: index * 0.1,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  }, [index])

  const handleOrder = async () => {
    // TODO: Implement order functionality
    console.log('Ordering:', item.name)
    alert(`Memesan: ${item.name} - Rp ${item.price.toLocaleString()}`)
  }

  return (
    <div
      ref={cardRef}
      className="menu-card group bg-gradient-to-br from-gray-800/60 to-gray-900/80 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 backdrop-blur-sm border border-gray-700 hover:border-amber-500/30 hover:scale-105"
    >
      {/* Image Container */}
      <div className="relative h-48 bg-gray-700 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          onError={(e) => {
            e.target.style.display = 'none'
            const fallback = e.target.nextElementSibling
            if (fallback) fallback.style.display = 'flex'
          }}
        />
        
        {/* Fallback Image */}
        <div className="w-full h-full hidden items-center justify-center bg-gradient-to-br from-gray-600 to-gray-700">
          <div className="text-center text-gray-400">
            <div className="text-4xl mb-2">
              {item.category === 'COFFEE' && '☕'}
              {item.category === 'NON_COFFEE' && '🥤'}
              {item.category === 'FOOD' && '🍽️'}
              {item.category === 'DESSERT' && '🍰'}
            </div>
            <p className="text-sm">Foto Menu</p>
          </div>
        </div>

        {/* Price Badge */}
        <div className="absolute top-3 right-3 bg-amber-500/90 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm border border-amber-400">
          Rp {item.price.toLocaleString()}
        </div>

        {/* Featured Badge */}
        {item.isFeatured && (
          <div className="absolute top-3 left-3 bg-red-500/90 text-white px-2 py-1 rounded-full text-xs font-semibold backdrop-blur-sm border border-red-400">
            ⭐ Spesial
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 lg:p-6">
        {/* Title */}
        <h3 className="text-lg lg:text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-amber-200 transition-colors">
          {item.name}
        </h3>
        
        {/* Description */}
        <p className="text-gray-300 text-sm lg:text-base leading-relaxed mb-4 lg:mb-5 line-clamp-2 min-h-[2.5rem] group-hover:text-gray-200 transition-colors">
          {item.description}
        </p>

        {/* Additional Info */}
        {(item.ingredients || item.calories) && (
          <div className="mb-4 text-xs text-gray-400 space-y-1">
            {item.ingredients && (
              <p>🍃 {item.ingredients}</p>
            )}
            {item.calories && (
              <p>🔥 {item.calories} kalori</p>
            )}
          </div>
        )}

        {/* Order Button */}
        <button 
          onClick={handleOrder}
          className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg hover:shadow-amber-500/25 border border-amber-500/50"
        >
          <span>Pesan Sekarang</span>
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  )
}