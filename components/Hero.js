// components/Hero.js - OPTION 4 IMPLEMENTATION
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Hero() {
  const heroRef = useRef()

  useEffect(() => {
    const tl = gsap.timeline()
    
    // Animate floating icons first
    tl.fromTo('.floating-icon',
      { 
        y: 50, 
        opacity: 0,
        scale: 0.8 
      },
      { 
        y: 0, 
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'back.out(1.7)'
      }
    )
    
    // Then animate main content
    .fromTo('.hero-title',
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
      '-=0.5'
    )
    .fromTo('.hero-subtitle',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
      '-=0.8'
    )
    .fromTo('.hero-button',
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' },
      '-=0.5'
    )
  }, [])

  return (
    <section 
      id="home" 
      ref={heroRef} 
      className="min-h-screen flex items-center justify-center text-white pt-16 bg-gradient-to-br from-gray-900 via-gray-800 to-amber-900 relative overflow-hidden"
    >
      {/* Floating Coffee Icons - Background Decorations */}
      <div className="floating-icon absolute top-10 left-10 text-4xl opacity-20 animate-float">☕</div>
      <div className="floating-icon absolute top-20 right-16 text-3xl opacity-30 animate-float" style={{animationDelay: '1s'}}>🌱</div>
      <div className="floating-icon absolute bottom-20 left-20 text-2xl opacity-25 animate-float" style={{animationDelay: '2s'}}>✨</div>
      <div className="floating-icon absolute bottom-10 right-10 text-3xl opacity-20 animate-float" style={{animationDelay: '1.5s'}}>🥐</div>
      
      {/* Additional floating elements */}
      <div className="floating-icon absolute top-1/4 left-1/4 text-2xl opacity-15 animate-float" style={{animationDelay: '0.5s'}}>🍃</div>
      <div className="floating-icon absolute top-1/3 right-1/4 text-3xl opacity-20 animate-float" style={{animationDelay: '1.2s'}}>☁️</div>
      <div className="floating-icon absolute bottom-1/3 left-1/3 text-2xl opacity-15 animate-float" style={{animationDelay: '0.8s'}}>⭐</div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
        {/* Coffee Icon & Main Title */}
        <div className="mb-6 sm:mb-8">
          <div className="text-5xl sm:text-6xl mb-4 opacity-90">☕</div>
          <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
            VNZ <span className="text-amber-400">CAFE</span>
          </h1>
        </div>
        
        {/* Subtitle */}
        <p className="hero-subtitle text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4 text-gray-200">
          Tempat yang sempurna untuk menikmati kopi berkualitas dan suasana yang nyaman. 
          Setiap cangkir adalah cerita, setiap kunjungan adalah pengalaman.
        </p>
        
        {/* CTA Button */}
        <div className="hero-button">
          <a
            href="#menu"
            onClick={(e) => {
              e.preventDefault()
              const menuSection = document.getElementById('menu')
              if (menuSection) {
                window.scrollTo({
                  top: menuSection.offsetTop - 80,
                  behavior: 'smooth'
                })
              }
            }}
            className="inline-flex items-center bg-amber-500 hover:bg-amber-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-amber-500/25 border border-amber-400 group"
          >
            <span>Lihat Menu Kami</span>
            <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Additional Info */}
        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-sm text-amber-200">
          <div className="flex items-center gap-2">
            <span>🕒</span>
            <span>Buka Setiap Hari 07:00 - 22:00</span>
          </div>
          <div className="flex items-center gap-2">
            <span>📍</span>
            <span>Jakarta Selatan</span>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 hidden sm:block">
        <div className="flex flex-col items-center">
          <span className="text-amber-300 text-sm mb-2">Scroll</span>
          <div className="w-6 h-10 border-2 border-amber-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-amber-400 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>

      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent pointer-events-none"></div>
    </section>
  )
}