// components/ContactForm.js
'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Pesan berhasil dikirim!')
    setFormData({ name: '', email: '', message: '' })
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-lg">
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">Nama Lengkap</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">Pesan</label>
        <textarea name="message" value={formData.message} onChange={handleChange} required rows="5" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"></textarea>
      </div>

      <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white py-4 rounded-lg font-semibold text-lg transition-all duration-300">
        Kirim Pesan
      </button>
    </form>
  )
}