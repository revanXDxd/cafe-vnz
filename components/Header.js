// components/Header.js
'use client'

import { useState, useEffect } from 'react'
import { gsap } from 'gsap'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle mobile menu animation
  useEffect(() => {
    if (isMenuOpen) {
      // Disable scroll when menu is open
      document.body.style.overflow = 'hidden'
      gsap.to('.mobile-menu', { 
        x: 0, 
        duration: 0.4, 
        ease: 'power3.out' 
      })
      gsap.to('.mobile-menu-content', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.2,
        stagger: 0.1
      })
    } else {
      // Enable scroll when menu closes
      document.body.style.overflow = 'auto'
      gsap.to('.mobile-menu', { 
        x: '100%', 
        duration: 0.3, 
        ease: 'power2.in' 
      })
    }
  }, [isMenuOpen])

  const handleNavClick = (targetId) => {
    setIsMenuOpen(false)
    setTimeout(() => {
      const element = document.getElementById(targetId)
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80,
          behavior: 'smooth'
        })
      }
    }, 400)
  }

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent py-4'
    }`}>
      <nav className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-xl sm:text-2xl font-bold text-gray-800">
            VNZ <span className="text-amber-600">CAFE</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 lg:space-x-8">
            {['home', 'about', 'menu', 'gallery', 'contact'].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(item)
                }}
                className="text-gray-700 hover:text-amber-600 transition-colors duration-300 font-medium capitalize text-sm lg:text-base"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700 hover:text-amber-600 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 relative">
              <span className={`absolute top-1 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 top-3' : ''
              }`}></span>
              <span className={`absolute top-3 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : ''
              }`}></span>
              <span className={`absolute top-5 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 top-3' : ''
              }`}></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu fixed inset-0 z-50 transform translate-x-full md:hidden ${
        isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={() => setIsMenuOpen(false)}
        ></div>
        
        {/* Menu Panel */}
        <div className="absolute top-0 right-0 h-full w-80 max-w-full bg-white shadow-2xl">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <div className="text-xl font-bold text-gray-800">
                VNZ <span className="text-amber-600">CAFE</span>
              </div>
              <button
                className="p-2 text-gray-500 hover:text-amber-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Menu Items */}
            <div className="flex-1 p-6">
              <div className="flex flex-col space-y-6 mobile-menu-content opacity-0 transform translate-y-4">
                {['home', 'about', 'menu', 'gallery', 'contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item}`}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(item)
                    }}
                    className="text-lg font-medium text-gray-700 hover:text-amber-600 transition-colors duration-300 py-2 border-b border-gray-100 capitalize"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                <p>Jl. Contoh No. 123</p>
                <p>Jakarta Selatan</p>
                <p className="mt-2">+62 812-3456-7890</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}