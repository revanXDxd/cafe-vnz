// components/Menu.js - COMPLETE WITH REAL DATA
'use client'

import { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CategoryFilter from './CategoryFilter'
import MenuCard from './MenuCard'

gsap.registerPlugin(ScrollTrigger)

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('coffee')
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(true)
  const menuRef = useRef()

  // Map category names to database enum values
  const categoryMap = {
    'coffee': 'COFFEE',
    'non-coffee': 'NON_COFFEE', 
    'food': 'FOOD',
    'dessert': 'DESSERT'
  }

  // Fetch menu data from API
  useEffect(() => {
    const fetchMenu = async () => {
      setLoading(true)
      try {
        const categoryParam = categoryMap[activeCategory] || 'COFFEE'
        const response = await fetch(`/api/menu?category=${categoryParam}`)
        
        if (!response.ok) throw new Error('Failed to fetch menu')
        
        const data = await response.json()
        setMenuItems(data)
      } catch (error) {
        console.error('Error fetching menu:', error)
        // Fallback to sample data
        setMenuItems(getSampleMenuData()[activeCategory] || [])
      } finally {
        setLoading(false)
      }
    }

    fetchMenu()
  }, [activeCategory])

  // Sample data fallback
  const getSampleMenuData = () => {
    return {
      coffee: [
        { 
          id: '1', 
          name: 'VNZ Signature Blend', 
          description: 'Blend kopi spesial dengan rasa yang unik dan nikmat', 
          price: 35, 
          image: '/images/coffee1.jpg',
          category: 'COFFEE'
        }
      ],
      'non-coffee': [
        { 
          id: '2', 
          name: 'Matcha Latte', 
          description: 'Green tea matcha premium dengan susu steamed', 
          price: 30, 
          image: '/images/matcha.jpg',
          category: 'NON_COFFEE'
        }
      ],
      food: [
        { 
          id: '3', 
          name: 'Croissant', 
          description: 'Croissant butter yang renyah luar lembut dalam', 
          price: 25, 
          image: '/images/croissant.jpg',
          category: 'FOOD'
        }
      ],
      dessert: [
        { 
          id: '4', 
          name: 'Tiramisu', 
          description: 'Dessert Italia klasik dengan rasa kopi yang kuat', 
          price: 35, 
          image: '/images/tiramisu.jpg',
          category: 'DESSERT'
        }
      ]
    }
  }

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate menu cards on category change
      gsap.fromTo('.menu-card',
        {
          y: 50,
          opacity: 0,
          scale: 0.9
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)'
        }
      )

      // Animate section title
      gsap.fromTo('.menu-title',
        {
          y: 30,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.menu-title',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )

    }, menuRef)

    return () => ctx.revert()
  }, [menuItems])

  if (loading) {
    return (
      <section id="menu" className="section-padding bg-gradient-to-br from-gray-900 via-gray-800 to-amber-900">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400 mx-auto"></div>
            <p className="mt-4 text-amber-200">Memuat menu...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="menu" ref={menuRef} className="section-padding bg-gradient-to-br from-gray-900 via-gray-800 to-amber-900 text-white">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="menu-title text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 lg:mb-6">
            Menu <span className="text-amber-400">Spesial</span>
          </h2>
          <p className="text-amber-100/80 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
            Temukan berbagai pilihan minuman dan makanan lezat yang dibuat dengan 
            <span className="text-amber-300"> bahan-bahan terbaik </span>
            dan disajikan dengan penuh cinta.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-12 lg:mb-16">
          <CategoryFilter 
            activeCategory={activeCategory} 
            onCategoryChange={setActiveCategory} 
          />
        </div>

        {/* Category Info */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-amber-900/30 px-6 py-3 rounded-full border border-amber-700/50">
            <span className="text-amber-400 text-lg">
              {activeCategory === 'coffee' && '☕'}
              {activeCategory === 'non-coffee' && '🥤'}
              {activeCategory === 'food' && '🍽️'}
              {activeCategory === 'dessert' && '🍰'}
            </span>
            <span className="text-amber-200 font-semibold capitalize">
              {activeCategory === 'coffee' && 'Kopi Spesial'}
              {activeCategory === 'non-coffee' && 'Minuman Non-Kopi'}
              {activeCategory === 'food' && 'Makanan Ringan'}
              {activeCategory === 'dessert' && 'Dessert Lezat'}
            </span>
            <span className="text-amber-400/70 text-sm">
              ({menuItems.length} items)
            </span>
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {menuItems.map((item, index) => (
            <MenuCard key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* Empty State */}
        {menuItems.length === 0 && !loading && (
          <div className="text-center py-16 lg:py-20">
            <div className="text-amber-400/50 text-8xl mb-6">☕</div>
            <h3 className="text-2xl lg:text-3xl font-semibold text-amber-200 mb-4">
              Menu sedang tidak tersedia
            </h3>
            <p className="text-amber-100/70 text-lg max-w-md mx-auto">
              Silakan pilih kategori menu lain atau hubungi kami untuk informasi lebih lanjut.
            </p>
          </div>
        )}

        {/* Special Offer Banner */}
        <div className="mt-16 lg:mt-20 text-center">
          <div className="bg-gradient-to-r from-amber-600/20 to-amber-800/30 rounded-2xl p-6 lg:p-8 border border-amber-500/30 backdrop-blur-sm">
            <h3 className="text-xl lg:text-2xl font-bold text-amber-300 mb-3">
              🎉 Special Offer!
            </h3>
            <p className="text-amber-100/80 lg:text-lg">
              Dapatkan <span className="text-amber-300 font-semibold">diskon 15%</span> untuk pembelian 
              minuman dan makanan dengan menunjukkan kode: <code className="bg-amber-900/50 px-2 py-1 rounded text-amber-300">VNZ15</code>
            </p>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
           }}>
      </div>
    </section>
  )
}