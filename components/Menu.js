// components/Menu.js - FIXED WITH CART SYSTEM
'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CategoryFilter from './CategoryFilter'
import MenuCard from './MenuCard'

gsap.registerPlugin(ScrollTrigger)

export default function Menu() {
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState('coffee')
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [cart, setCart] = useState([])
  const menuRef = useRef()

  // Map category names to database enum values
  const categoryMap = {
    'coffee': 'COFFEE',
    'non-coffee': 'NON_COFFEE', 
    'food': 'FOOD',
    'dessert': 'DESSERT'
  }

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  // Add to cart function
  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id)
    
    if (existingItem) {
      const updatedCart = cart.map(cartItem =>
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
      setCart(updatedCart)
    } else {
      setCart([...cart, { ...item, quantity: 1 }])
    }
    
    // Show success feedback (optional)
    console.log(`Added ${item.name} to cart`)
  }

  // Proceed to checkout
  const proceedToCheckout = () => {
    if (cart.length === 0) {
      alert('Keranjang masih kosong! Silakan pilih menu terlebih dahulu.')
      return
    }
    router.push('/checkout')
  }

  // Sample data - more comprehensive
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
        },
        { 
          id: '2', 
          name: 'Cold Brew Special', 
          description: 'Dibuat dengan proses cold brew 24 jam, rasa yang smooth', 
          price: 32, 
          image: '/images/cold-brew.jpg',
          category: 'COFFEE'
        },
        { 
          id: '3', 
          name: 'Espresso Macchiato', 
          description: 'Espresso kuat dengan sentuhan foam susu', 
          price: 28, 
          image: '/images/espresso.jpg',
          category: 'COFFEE'
        },
        { 
          id: '4', 
          name: 'Cappuccino Classic', 
          description: 'Cappuccino dengan foam susu yang creamy dan lembut', 
          price: 30, 
          image: '/images/cappuccino.jpg',
          category: 'COFFEE'
        }
      ],
      'non-coffee': [
        { 
          id: '5', 
          name: 'Matcha Latte Premium', 
          description: 'Green tea matcha premium dengan susu steamed', 
          price: 30, 
          image: '/images/matcha.jpg',
          category: 'NON_COFFEE'
        },
        { 
          id: '6', 
          name: 'Chocolate Velvet', 
          description: 'Coklat premium dengan tekstur velvet yang lembut', 
          price: 28, 
          image: '/images/chocolate.jpg',
          category: 'NON_COFFEE'
        },
        { 
          id: '7', 
          name: 'Berry Smoothie', 
          description: 'Smoothie segar dari campuran berry pilihan', 
          price: 32, 
          image: '/images/smoothie.jpg',
          category: 'NON_COFFEE'
        }
      ],
      food: [
        { 
          id: '8', 
          name: 'Croissant Butter', 
          description: 'Croissant butter yang renyah luar lembut dalam', 
          price: 25, 
          image: '/images/croissant.jpg',
          category: 'FOOD'
        },
        { 
          id: '9', 
          name: 'Sandwich Club', 
          description: 'Sandwich dengan ayam, smoke beef, dan sayuran segar', 
          price: 45, 
          image: '/images/sandwich.jpg',
          category: 'FOOD'
        },
        { 
          id: '10', 
          name: 'Avocado Toast', 
          description: 'Roti panggang dengan avocado spread premium', 
          price: 35, 
          image: '/images/avocado-toast.jpg',
          category: 'FOOD'
        }
      ],
      dessert: [
        { 
          id: '11', 
          name: 'Tiramisu Classic', 
          description: 'Dessert Italia klasik dengan rasa kopi yang kuat', 
          price: 35, 
          image: '/images/tiramisu.jpg',
          category: 'DESSERT'
        },
        { 
          id: '12', 
          name: 'New York Cheesecake', 
          description: 'Cheesecake lembut dengan base biscuit yang renyah', 
          price: 32, 
          image: '/images/cheesecake.jpg',
          category: 'DESSERT'
        },
        { 
          id: '13', 
          name: 'Chocolate Lava', 
          description: 'Cake coklat dengan lelehan coklat di dalamnya', 
          price: 38, 
          image: '/images/chocolate-lava.jpg',
          category: 'DESSERT'
        }
      ]
    }
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
        // Fallback to enhanced sample data
        setMenuItems(getSampleMenuData()[activeCategory] || [])
      } finally {
        setLoading(false)
      }
    }

    fetchMenu()
  }, [activeCategory])

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

  // Category display names
  const getCategoryDisplayName = (category) => {
    const names = {
      'coffee': 'Kopi Spesial',
      'non-coffee': 'Minuman Non-Kopi',
      'food': 'Makanan Ringan',
      'dessert': 'Dessert Lezat'
    }
    return names[category] || category
  }

  // Category icons
  const getCategoryIcon = (category) => {
    const icons = {
      'coffee': '☕',
      'non-coffee': '🥤',
      'food': '🍽️',
      'dessert': '🍰'
    }
    return icons[category] || '📝'
  }

  // Get total items in cart
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

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

        {/* Cart & Checkout Button */}
        <div className="flex justify-end mb-8">
          <div className="flex items-center gap-4">
            {cart.length > 0 && (
              <div className="bg-amber-900/50 px-4 py-2 rounded-full border border-amber-700/50">
                <span className="text-amber-200 text-sm">
                  {getTotalItems()} item di keranjang
                </span>
              </div>
            )}
            <button
              onClick={proceedToCheckout}
              disabled={cart.length === 0}
              className="bg-amber-500 hover:bg-amber-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2"
            >
              <span>🛒</span>
              Checkout ({getTotalItems()})
            </button>
          </div>
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
              {getCategoryIcon(activeCategory)}
            </span>
            <span className="text-amber-200 font-semibold">
              {getCategoryDisplayName(activeCategory)}
            </span>
            <span className="text-amber-400/70 text-sm">
              ({menuItems.length} items)
            </span>
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {menuItems.map((item, index) => (
            <MenuCard 
              key={item.id} 
              item={item} 
              index={index} 
              onAddToCart={addToCart}
            />
          ))}
        </div>

        {/* Empty State */}
        {menuItems.length === 0 && !loading && (
          <div className="text-center py-16 lg:py-20">
            <div className="text-amber-400/50 text-8xl mb-6">
              {getCategoryIcon(activeCategory)}
            </div>
            <h3 className="text-2xl lg:text-3xl font-semibold text-amber-200 mb-4">
              Menu {getCategoryDisplayName(activeCategory)} sedang tidak tersedia
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