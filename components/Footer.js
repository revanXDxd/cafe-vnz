// components/Footer.js - DARK THEME ELEGAN
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.footer-content',
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
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, footerRef)

    return () => ctx.revert()
  }, [])

  const quickLinks = [
    { name: 'Home', href: '#home', icon: '🏠' },
    { name: 'About', href: '#about', icon: 'ℹ️' },
    { name: 'Menu', href: '#menu', icon: '📋' },
    { name: 'Gallery', href: '#gallery', icon: '🖼️' },
    { name: 'Contact', href: '#contact', icon: '📞' }
  ]

  const contactInfo = [
    { icon: '📍', text: 'Jl. Kemang Raya No. 88, Jakarta Selatan' },
    { icon: '📞', text: '+62 812-3456-7890' },
    { icon: '✉️', text: 'hello@vnzcafe.com' },
    { icon: '🕒', text: 'Senin - Minggu: 07:00 - 22:00' }
  ]

  const socialMedia = [
    { name: 'Instagram', icon: '📷', url: '#', color: 'hover:bg-pink-500/20' },
    { name: 'Facebook', icon: '👥', url: '#', color: 'hover:bg-blue-500/20' },
    { name: 'Twitter', icon: '🐦', url: '#', color: 'hover:bg-sky-500/20' },
    { name: 'TikTok', icon: '🎵', url: '#', color: 'hover:bg-gray-500/20' }
  ]

  return (
    <footer ref={footerRef} className="bg-gradient-to-br from-gray-900 via-gray-800 to-amber-900 text-white border-t border-amber-700/30">
      <div className="container mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="footer-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand & Description */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl lg:text-3xl font-bold mb-2">
                VNZ <span className="text-amber-400">CAFE</span>
              </h3>
              <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-amber-300 rounded-full mb-4"></div>
            </div>
            <p className="text-amber-100/80 mb-6 leading-relaxed">
              Tempat yang sempurna untuk menikmati kopi berkualitas premium 
              dan suasana yang nyaman. Setiap cangkir adalah cerita.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-3">
              {socialMedia.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className={`w-12 h-12 bg-gray-700/50 rounded-xl flex items-center justify-center transition-all duration-300 border border-gray-600 backdrop-blur-sm ${social.color} hover:scale-110 hover:border-amber-400/50`}
                  aria-label={social.name}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold text-amber-300 mb-6 flex items-center gap-2">
              <span>🔗</span>
              Tautan Cepat
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="flex items-center gap-3 text-amber-100/80 hover:text-amber-300 transition-all duration-300 group py-2"
                  >
                    <span className="text-amber-400/70 group-hover:scale-110 transition-transform duration-300">
                      {link.icon}
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold text-amber-300 mb-6 flex items-center gap-2">
              <span>📞</span>
              Kontak Kami
            </h4>
            <ul className="space-y-4">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-amber-400 mt-1 flex-shrink-0">{info.icon}</span>
                  <span className="text-amber-100/80 text-sm leading-relaxed">
                    {info.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & App */}
          <div>
            <h4 className="text-xl font-bold text-amber-300 mb-6 flex items-center gap-2">
              <span>📧</span>
              Tetap Terhubung
            </h4>
            
            {/* Newsletter */}
            <div className="mb-6">
              <p className="text-amber-100/80 text-sm mb-4">
                Dapatkan promo spesial dan update menu terbaru langsung di email Anda.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="flex-1 px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 text-white placeholder-gray-400 text-sm backdrop-blur-sm"
                />
                <button className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 whitespace-nowrap text-sm border border-amber-400">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Download App */}
            <div className="bg-amber-900/20 rounded-xl p-4 border border-amber-700/30 backdrop-blur-sm">
              <p className="text-amber-200 text-sm font-semibold mb-2">
                📱 Download App Kami
              </p>
              <div className="flex gap-2">
                <button className="flex-1 bg-black/50 hover:bg-black/70 text-white py-2 px-3 rounded-lg text-xs transition-all duration-300 border border-gray-600 text-center">
                  App Store
                </button>
                <button className="flex-1 bg-black/50 hover:bg-black/70 text-white py-2 px-3 rounded-lg text-xs transition-all duration-300 border border-gray-600 text-center">
                  Play Store
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-amber-700/30 mt-8 lg:mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-amber-200/60 text-sm text-center lg:text-left">
              <p>
                &copy; 2024 <span className="text-amber-300">VNZ Cafe</span>. All rights reserved. 
                Made with <span className="text-red-400">❤️</span> in Jakarta
              </p>
            </div>

            {/* Additional Links */}
            <div className="flex flex-wrap justify-center gap-6 text-amber-200/60 text-sm">
              <a href="#" className="hover:text-amber-300 transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-amber-300 transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="hover:text-amber-300 transition-colors duration-300">
                Sitemap
              </a>
            </div>
          </div>
        </div>

        {/* Back to Top */}
        <div className="text-center mt-6">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 text-amber-400/70 hover:text-amber-300 transition-all duration-300 text-sm group"
          >
            <span>Kembali ke Atas</span>
            <span className="group-hover:-translate-y-1 transition-transform duration-300">⬆️</span>
          </button>
        </div>
      </div>
    </footer>
  )
}