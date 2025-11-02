// components/Contact.js - COMPLETE WITH REAL DATA
'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const contactRef = useRef()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitSuccess(false)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const result = await response.json()
        setSubmitSuccess(true)
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
        
        // Reset success message after 5 seconds
        setTimeout(() => setSubmitSuccess(false), 5000)
      } else {
        const error = await response.json()
        alert(error.error || 'Terjadi error. Silakan coba lagi.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Terjadi error. Silakan coba lagi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate contact title
      gsap.fromTo('.contact-title',
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
            trigger: '.contact-title',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Animate contact info items
      gsap.fromTo('.contact-info-item',
        {
          x: -30,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.contact-info',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Animate form
      gsap.fromTo('.contact-form',
        {
          x: 30,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )

    }, contactRef)

    return () => ctx.revert()
  }, [])

  const contactInfo = [
    {
      icon: '📍',
      title: 'Alamat Cafe',
      content: 'Jl. Kemang Raya No. 88, Jakarta Selatan',
      subcontent: 'Dekat Kemang Village, mudah diakses',
      color: 'from-blue-500/20 to-blue-600/20',
      border: 'border-blue-500/30'
    },
    {
      icon: '📞',
      title: 'Telepon & WhatsApp',
      content: '+62 812-3456-7890',
      subcontent: 'Buka 24/7 untuk reservasi dan informasi',
      color: 'from-green-500/20 to-green-600/20',
      border: 'border-green-500/30'
    },
    {
      icon: '✉️',
      title: 'Email Kami',
      content: 'hello@vnzcafe.com',
      subcontent: 'Reservasi: reserve@vnzcafe.com',
      color: 'from-amber-500/20 to-amber-600/20',
      border: 'border-amber-500/30'
    },
    {
      icon: '🕒',
      title: 'Jam Operasional',
      content: 'Senin - Minggu: 07:00 - 22:00',
      subcontent: 'Weekend buka sampai jam 23:00',
      color: 'from-purple-500/20 to-purple-600/20',
      border: 'border-purple-500/30'
    }
  ]

  return (
    <section id="contact" ref={contactRef} className="section-padding bg-gradient-to-br from-gray-900 via-gray-800 to-amber-900 text-white">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="contact-title text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 lg:mb-6">
            Hubungi <span className="text-amber-400">Kami</span>
          </h2>
          <p className="text-amber-100/80 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
            Ada pertanyaan, kritik, saran, atau ingin reservasi meja? 
            <span className="text-amber-300"> Tim VNZ Cafe siap melayani Anda</span> dengan senang hati.
          </p>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="mb-8 bg-green-500/20 border border-green-500/50 rounded-2xl p-6 text-center backdrop-blur-sm">
            <div className="flex items-center justify-center gap-3 text-green-300">
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-semibold text-lg">Pesan berhasil dikirim!</p>
                <p className="text-green-200">Kami akan menghubungi Anda segera.</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Information */}
          <div className="contact-info space-y-8">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-amber-300 mb-6">
                Informasi Kontak
              </h3>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div 
                    key={index}
                    className="contact-info-item group bg-gradient-to-br from-gray-800/40 to-gray-900/60 rounded-2xl p-6 border border-gray-700 hover:border-amber-500/50 transition-all duration-500 backdrop-blur-sm hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/10"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-2xl bg-gradient-to-br ${item.color} border ${item.border} group-hover:scale-110 transition-transform duration-300`}>
                        <span className="text-2xl">{item.icon}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg lg:text-xl font-bold text-white mb-2 group-hover:text-amber-200 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-amber-100/90 text-lg font-semibold mb-1">
                          {item.content}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {item.subcontent}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form">
            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/60 rounded-2xl lg:rounded-3xl p-6 lg:p-8 border border-gray-700 backdrop-blur-sm shadow-2xl">
              <h3 className="text-2xl lg:text-3xl font-bold text-amber-300 mb-2 text-center">
                Kirim Pesan
              </h3>
              <p className="text-amber-100/70 text-center mb-6 lg:mb-8">
                Isi form berikut dan kami akan membalas dalam 24 jam
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-amber-200 font-semibold mb-3 text-sm">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 text-white placeholder-gray-400 backdrop-blur-sm"
                      placeholder="Nama lengkap Anda"
                    />
                  </div>

                  <div>
                    <label className="block text-amber-200 font-semibold mb-3 text-sm">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 text-white placeholder-gray-400 backdrop-blur-sm"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-amber-200 font-semibold mb-3 text-sm">
                      Nomor Telepon
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 text-white placeholder-gray-400 backdrop-blur-sm"
                      placeholder="+62 812-3456-7890"
                    />
                  </div>

                  <div>
                    <label className="block text-amber-200 font-semibold mb-3 text-sm">
                      Subjek
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 text-white backdrop-blur-sm"
                    >
                      <option value="">Pilih subjek...</option>
                      <option value="reservation">Reservasi Meja</option>
                      <option value="inquiry">Pertanyaan</option>
                      <option value="complaint">Keluhan</option>
                      <option value="suggestion">Saran</option>
                      <option value="other">Lainnya</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-amber-200 font-semibold mb-3 text-sm">
                    Pesan Anda *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 text-white placeholder-gray-400 resize-none backdrop-blur-sm"
                    placeholder="Tulis pesan detail Anda di sini..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:from-gray-600 disabled:to-gray-700 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg hover:shadow-amber-500/25 border border-amber-400 disabled:border-gray-600"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <span>Kirim Pesan</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </>
                  )}
                </button>

                <p className="text-center text-gray-400 text-sm">
                  * Field wajib diisi. Kami akan membalas pesan Anda dalam 1x24 jam.
                </p>
              </form>
            </div>
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