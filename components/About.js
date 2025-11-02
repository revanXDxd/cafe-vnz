// components/About.js - WITH REAL PHOTOS
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const aboutRef = useRef()
  const statsRef = useRef()

  const stats = [
    { number: '50+', text: 'Jenis Kopi', icon: '☕', delay: 0 },
    { number: '1000+', text: 'Pelanggan Bahagia', icon: '😊', delay: 0.1 },
    { number: '3', text: 'Tahun Pengalaman', icon: '⭐', delay: 0.2 },
    { number: '24/7', text: 'Layanan Terbaik', icon: '🕒', delay: 0.3 }
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the main content
      gsap.fromTo('.about-content',
        {
          x: -50,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about-content',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Animate the image
      gsap.fromTo('.about-image',
        {
          x: 50,
          opacity: 0,
          rotationY: 10
        },
        {
          x: 0,
          opacity: 1,
          rotationY: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about-image',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Animate decorative elements
      gsap.fromTo('.decorative-element',
        {
          scale: 0,
          rotation: -180
        },
        {
          scale: 1,
          rotation: 0,
          duration: 0.8,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.about-image',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Animate stats with stagger
      gsap.fromTo('.stat-item',
        {
          y: 30,
          opacity: 0,
          scale: 0.8
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.stats-grid',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )

    }, aboutRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={aboutRef} className="section-padding bg-gradient-to-br from-gray-900 via-gray-800 to-amber-900 text-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Text Content - Animated */}
          <div className="about-content space-y-6 lg:space-y-8">
            {/* Header with subtle animation */}
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                Cerita <span className="text-amber-400 relative">
                  VNZ Cafe
                  <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-amber-400 transform scale-x-0 origin-left transition-transform duration-1000 group-hover:scale-x-100"></span>
                </span>
              </h2>
              
              <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-300 rounded-full"></div>
            </div>

            {/* Description */}
            <div className="space-y-4 text-gray-200 text-base sm:text-lg lg:text-xl leading-relaxed">
              <p className="flex items-start gap-3">
                <span className="text-amber-400 text-lg mt-1 flex-shrink-0">✦</span>
                <span>
                  Didirikan pada tahun 2020, <strong className="text-white">VNZ Cafe</strong> telah menjadi 
                  destinasi favorit para pencinta kopi dan pecinta suasana yang hangat. 
                  Kami percaya setiap cangkir kopi membawa cerita sendiri.
                </span>
              </p>
              
              <p className="flex items-start gap-3">
                <span className="text-amber-400 text-lg mt-1 flex-shrink-0">✦</span>
                <span>
                  Dengan <strong className="text-white">bahan-bahan pilihan terbaik</strong> dan 
                  barista berpengalaman, kami menghadirkan pengalaman kopi yang tak 
                  terlupakan dalam setiap sajian.
                </span>
              </p>

              <p className="flex items-start gap-3">
                <span className="text-amber-400 text-lg mt-1 flex-shrink-0">✦</span>
                <span>
                  Suasana yang <strong className="text-white">nyaman dan cozy</strong> membuat 
                  setiap kunjungan menjadi momen spesial untuk bersantai, bekerja, 
                  atau bertemu dengan teman.
                </span>
              </p>
            </div>

            {/* Statistics Grid */}
            <div ref={statsRef} className="stats-grid grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="stat-item group text-center p-4 bg-gradient-to-br from-gray-800/50 to-gray-900/70 rounded-2xl border border-gray-700 hover:border-amber-400 transition-all duration-500 hover:shadow-lg hover:shadow-amber-400/20 hover:scale-105 backdrop-blur-sm"
                >
                  <div className="text-2xl sm:text-3xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-amber-400 mb-2 group-hover:text-amber-300 transition-colors">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 text-xs sm:text-sm font-medium leading-tight group-hover:text-white transition-colors">
                    {stat.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 text-sm text-amber-100 bg-amber-900/30 px-4 py-2 rounded-full border border-amber-700/50">
                <span className="text-amber-400">🕒</span>
                <span>Buka Setiap Hari</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-amber-100 bg-amber-900/30 px-4 py-2 rounded-full border border-amber-700/50">
                <span className="text-amber-400">📍</span>
                <span>Lokasi Strategis</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-amber-100 bg-amber-900/30 px-4 py-2 rounded-full border border-amber-700/50">
                <span className="text-amber-400">💝</span>
                <span>WiFi Gratis</span>
              </div>
            </div>
          </div>

          {/* Image Section - DENGAN FOTO REAL */}
          <div className="relative about-image order-first lg:order-last">
            {/* Main Image Container - FOTO REAL */}
            <div className="relative z-10 h-64 sm:h-80 lg:h-96 rounded-3xl overflow-hidden shadow-2xl group border border-amber-700/30">
              {/* GANTI PATH FOTO ANDA DI SINI */}
              <img 
                src="/images/interior-cafe.jpg" 
                alt="Interior VNZ Cafe yang nyaman dan elegan"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  // Fallback jika foto tidak ada
                  console.log('Foto tidak ditemukan, menggunakan fallback')
                  e.target.style.display = 'none'
                  const fallback = e.target.nextElementSibling
                  if (fallback) fallback.style.display = 'flex'
                }}
              />
              
              {/* Fallback Container - akan muncul jika foto error */}
              <div 
                className="w-full h-full hidden items-center justify-center bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800"
                style={{ display: 'none' }}
              >
                <div className="text-center text-white">
                  <div className="text-5xl sm:text-6xl mb-4 opacity-90">🏪</div>
                  <p className="text-lg font-semibold opacity-90">VNZ Cafe Interior</p>
                  <p className="text-sm opacity-70 mt-2">Tambahkan foto di /public/images/interior-cafe.jpg</p>
                </div>
              </div>
              
              {/* Image Overlay Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              
              {/* Photo Badge */}
              <div className="absolute top-4 left-4 bg-amber-500/90 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm border border-amber-400">
                📸 Foto Interior
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="decorative-element absolute -bottom-4 -left-4 w-20 h-20 bg-amber-500 rounded-2xl opacity-90 hidden lg:block shadow-lg"></div>
            <div className="decorative-element absolute -top-4 -right-4 w-24 h-24 bg-amber-900 rounded-2xl opacity-90 hidden lg:block shadow-lg"></div>
            
            {/* Floating Coffee Beans */}
            <div className="absolute -top-2 -left-2 w-12 h-12 bg-amber-400/20 rounded-full flex items-center justify-center text-amber-300 text-lg shadow-lg backdrop-blur-sm hidden lg:flex border border-amber-500/30">
              🫘
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-amber-800 rounded-full flex items-center justify-center text-amber-200 text-sm shadow-lg hidden lg:flex border border-amber-600">
              ☕
            </div>

            {/* Background Pattern */}
            <div className="absolute -z-10 -inset-4 bg-gradient-to-br from-amber-900/20 to-gray-800/30 rounded-3xl opacity-50 backdrop-blur-sm"></div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-16 lg:mt-20 text-center bg-gradient-to-r from-amber-900/30 to-gray-800/40 rounded-3xl p-8 lg:p-12 border border-amber-700/50 backdrop-blur-sm">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6">
            Visi & <span className="text-amber-400">Misi</span> Kami
          </h3>
          <div className="grid md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
            <div className="space-y-4 p-6 bg-gray-800/30 rounded-2xl border border-gray-700 hover:border-amber-500/50 transition-colors duration-300">
              <h4 className="text-xl font-semibold text-amber-300 flex items-center gap-2">
                <span className="text-amber-400">🎯</span>
                Visi
              </h4>
              <p className="text-gray-200 leading-relaxed">
                Menjadi cafe terdepan yang menghadirkan pengalaman kopi terbaik 
                dengan suasana yang hangat dan pelayanan yang exceptional.
              </p>
            </div>
            <div className="space-y-4 p-6 bg-gray-800/30 rounded-2xl border border-gray-700 hover:border-amber-500/50 transition-colors duration-300">
              <h4 className="text-xl font-semibold text-amber-300 flex items-center gap-2">
                <span className="text-amber-400">🚀</span>
                Misi
              </h4>
              <p className="text-gray-200 leading-relaxed">
                Menyajikan kopi berkualitas premium dengan bahan terbaik, 
                menciptakan lingkungan yang nyaman, dan memberikan pelayanan 
                terbaik untuk setiap pelanggan.
              </p>
            </div>
          </div>
        </div>

        {/* Signature Quote */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 text-amber-200/70 text-sm">
            <div className="w-12 h-px bg-amber-400/50"></div>
            <span className="italic">"Setiap cangkir, setiap cerita"</span>
            <div className="w-12 h-px bg-amber-400/50"></div>
          </div>
        </div>
      </div>

      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
           }}>
      </div>
    </section>
  )
}