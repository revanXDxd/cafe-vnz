// components/Gallery.js - COMPLETE VERSION WITH API
'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [activeFilter, setActiveFilter] = useState('all')
  const [galleryImages, setGalleryImages] = useState([])
  const [loading, setLoading] = useState(true)
  const galleryRef = useRef()

  const categories = [
    { id: 'all', name: 'Semua', icon: '🖼️', count: 0 },
    { id: 'interior', name: 'Interior', icon: '🏪', count: 0 },
    { id: 'coffee', name: 'Kopi', icon: '☕', count: 0 },
    { id: 'atmosphere', name: 'Suasana', icon: '✨', count: 0 },
    { id: 'food', name: 'Makanan', icon: '🍰', count: 0 },
    { id: 'events', name: 'Acara', icon: '🎉', count: 0 }
  ]

  // Fetch gallery data from API
  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true)
      try {
        const categoryParam = activeFilter === 'all' ? 'all' : activeFilter.toUpperCase()
        const response = await fetch(`/api/gallery?category=${categoryParam}`)
        
        if (!response.ok) throw new Error('Failed to fetch gallery')
        
        const data = await response.json()
        setGalleryImages(data)
        
        // Update counts for each category
        updateCategoryCounts(data)
      } catch (error) {
        console.error('Error fetching gallery:', error)
        // Fallback to sample data if API fails
        setGalleryImages(getSampleGalleryData())
      } finally {
        setLoading(false)
      }
    }

    fetchGallery()
  }, [activeFilter])

  // Sample data fallback
  const getSampleGalleryData = () => {
    return [
      { 
        id: '1', 
        image: '/images/gallery1.jpg', 
        title: 'Interior Modern VNZ', 
        category: 'INTERIOR',
        description: 'Suasana interior cafe yang modern dan nyaman'
      },
      { 
        id: '2', 
        image: '/images/gallery2.jpg', 
        title: 'Coffee Art Special', 
        category: 'COFFEE',
        description: 'Seni latte art yang dibuat oleh barista profesional'
      },
      // ... tambahkan lebih banyak sample data jika needed
    ]
  }

  // Update category counts
  const updateCategoryCounts = (images) => {
    categories.forEach(cat => {
      if (cat.id === 'all') {
        cat.count = images.length
      } else {
        cat.count = images.filter(img => img.category === cat.id.toUpperCase()).length
      }
    })
  }

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate gallery title
      gsap.fromTo('.gallery-title',
        {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.gallery-title',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Animate filter buttons
      gsap.fromTo('.filter-btn',
        {
          y: 30,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.gallery-filters',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )

    }, galleryRef)

    return () => ctx.revert()
  }, [])

  // Re-animate when images change
  useEffect(() => {
    if (galleryImages.length > 0 && !loading) {
      gsap.fromTo('.gallery-item',
        {
          y: 60,
          opacity: 0,
          scale: 0.8
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.7)'
        }
      )
    }
  }, [galleryImages, loading])

  return (
    <section id="gallery" ref={galleryRef} className="section-padding bg-gradient-to-br from-gray-900 via-gray-800 to-amber-900 text-white">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="gallery-title text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 lg:mb-6">
            Galeri <span className="text-amber-400">Kami</span>
          </h2>
          <p className="text-amber-100/80 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
            Jelajahi momen-momen indah dan suasana hangat VNZ Cafe melalui 
            <span className="text-amber-300"> koleksi foto eksklusif</span> kami.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400 mx-auto"></div>
            <p className="mt-4 text-amber-200">Memuat galeri...</p>
          </div>
        )}

        {/* Filter Section */}
        {!loading && (
          <div className="gallery-filters flex flex-wrap justify-center gap-3 lg:gap-4 mb-12 lg:mb-16">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`filter-btn px-4 lg:px-6 py-3 rounded-full font-semibold text-sm lg:text-base transition-all duration-300 flex items-center gap-2 backdrop-blur-sm border ${
                  activeFilter === category.id
                    ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/25 transform scale-105 border-amber-400'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/70 border-gray-600 hover:border-amber-400/50 hover:text-amber-200'
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span>{category.name}</span>
                <span className="text-xs bg-gray-700/50 px-2 py-1 rounded-full">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Gallery Grid */}
        {!loading && (
          <div className="gallery-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className="gallery-item group relative cursor-pointer overflow-hidden rounded-2xl lg:rounded-3xl bg-gray-700/30 backdrop-blur-sm border border-gray-600 hover:border-amber-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/10"
                onClick={() => setSelectedImage(image)}
              >
                {/* Image Container */}
                <div className="aspect-square bg-gradient-to-br from-gray-600 to-gray-700 overflow-hidden relative">
                  <img
                    src={image.image}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      const fallback = e.target.nextElementSibling
                      if (fallback) fallback.style.display = 'flex'
                    }}
                  />
                  
                  {/* Fallback for missing images */}
                  <div 
                    className="w-full h-full hidden items-center justify-center"
                    style={{ display: 'none' }}
                  >
                    <div className="text-center text-gray-400">
                      <div className="text-4xl mb-2">🖼️</div>
                      <p className="text-sm">{image.title}</p>
                    </div>
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end">
                    <div className="p-4 lg:p-6 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-white font-bold text-lg lg:text-xl mb-2">
                        {image.title}
                      </h3>
                      <p className="text-gray-300 text-sm lg:text-base line-clamp-2">
                        {image.description}
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <span className="bg-amber-500/90 text-white px-2 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                          {image.category}
                        </span>
                        <span className="text-amber-300 text-lg">👁️</span>
                      </div>
                    </div>
                  </div>

                  {/* View Icon */}
                  <div className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && galleryImages.length === 0 && (
          <div className="text-center py-16 lg:py-20">
            <div className="text-amber-400/50 text-8xl mb-6">🖼️</div>
            <h3 className="text-2xl lg:text-3xl font-semibold text-amber-200 mb-4">
              Tidak ada foto di kategori ini
            </h3>
            <p className="text-amber-100/70 text-lg">
              Silakan pilih kategori lain untuk melihat galeri foto.
            </p>
          </div>
        )}

        {/* CTA Section */}
        {!loading && galleryImages.length > 0 && (
          <div className="text-center mt-16 lg:mt-20">
            <div className="bg-gradient-to-r from-amber-900/30 to-gray-800/40 rounded-2xl lg:rounded-3xl p-8 lg:p-12 border border-amber-700/50 backdrop-blur-sm">
              <h3 className="text-2xl lg:text-3xl font-bold text-amber-300 mb-4">
                Bagikan Momen Anda
              </h3>
              <p className="text-amber-100/80 text-lg lg:text-xl mb-6 max-w-2xl mx-auto">
                Tag <span className="text-amber-300 font-semibold">@VNZCafe</span> di Instagram 
                untuk berkesempatan ditampilkan di galeri kami!
              </p>
              <button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-500/25 border border-amber-400">
                Ikuti Kami di Instagram
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal untuk gambar besar */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-6xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />
            
            {/* Image Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 lg:p-8 rounded-b-lg">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                {selectedImage.title}
              </h3>
              <p className="text-gray-300 text-lg lg:text-xl mb-3">
                {selectedImage.description}
              </p>
              <div className="flex items-center gap-4 text-sm lg:text-base">
                <span className="bg-amber-500 text-white px-3 py-1 rounded-full font-semibold capitalize">
                  {selectedImage.category}
                </span>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-4 -right-4 bg-amber-500 hover:bg-amber-600 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-2xl border border-amber-400"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
           }}>
      </div>
    </section>
  )
}