// components/CategoryFilter.js - DARK THEME
'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

export default function CategoryFilter({ activeCategory, onCategoryChange }) {
  const filterRef = useRef()

  const categories = [
    { id: 'coffee', name: 'Kopi Spesial', icon: '☕' },
    { id: 'non-coffee', name: 'Non-Kopi', icon: '🥤' },
    { id: 'food', name: 'Makanan', icon: '🍽️' },
    { id: 'dessert', name: 'Dessert', icon: '🍰' }
  ]

  useEffect(() => {
    gsap.fromTo('.category-btn',
      {
        y: 20,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: filterRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  }, [])

  return (
    <div ref={filterRef} className="flex flex-wrap justify-center gap-3 lg:gap-4 px-4">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`category-btn px-5 lg:px-6 py-3 lg:py-4 rounded-full font-semibold text-sm lg:text-base transition-all duration-300 flex items-center gap-2 min-w-[120px] lg:min-w-[140px] justify-center backdrop-blur-sm border ${
            activeCategory === category.id
              ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/25 transform scale-105 border-amber-400'
              : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/70 border-gray-600 hover:border-amber-400/50 hover:text-amber-200'
          }`}
        >
          <span className="text-lg lg:text-xl">{category.icon}</span>
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  )
}