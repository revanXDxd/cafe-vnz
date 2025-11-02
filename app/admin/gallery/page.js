// app/admin/gallery/page.js - COMPLETE CRUD
'use client'

import { useState, useEffect } from 'react'

export default function GalleryManagement() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingImage, setEditingImage] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'INTERIOR',
    image: ''
  })

  useEffect(() => {
    fetchGallery()
  }, [])

  const fetchGallery = async () => {
    try {
      const response = await fetch('/api/gallery')
      if (response.ok) {
        const data = await response.json()
        setImages(data)
      }
    } catch (error) {
      console.error('Error fetching gallery:', error)
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    { value: 'INTERIOR', label: 'Interior', icon: '🏪' },
    { value: 'COFFEE', label: 'Kopi', icon: '☕' },
    { value: 'ATMOSPHERE', label: 'Suasana', icon: '✨' },
    { value: 'FOOD', label: 'Makanan', icon: '🍽️' },
    { value: 'BARISTA', label: 'Barista', icon: '👨‍🍳' },
    { value: 'EVENTS', label: 'Acara', icon: '🎉' },
    { value: 'CUSTOMERS', label: 'Pelanggan', icon: '😊' }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const url = editingImage ? `/api/gallery/${editingImage.id}` : '/api/gallery'
      const method = editingImage ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        await fetchGallery()
        resetForm()
        alert(editingImage ? 'Foto berhasil diupdate!' : 'Foto berhasil ditambahkan!')
      } else {
        alert('Terjadi error. Silakan coba lagi.')
      }
    } catch (error) {
      console.error('Error saving gallery item:', error)
      alert('Terjadi error. Silakan coba lagi.')
    }
  }

  const handleEdit = (image) => {
    setEditingImage(image)
    setFormData({
      title: image.title,
      description: image.description || '',
      category: image.category,
      image: image.image
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (confirm('Apakah Anda yakin ingin menghapus foto ini?')) {
      try {
        const response = await fetch(`/api/gallery/${id}`, {
          method: 'DELETE',
        })

        if (response.ok) {
          await fetchGallery()
          alert('Foto berhasil dihapus!')
        }
      } catch (error) {
        console.error('Error deleting gallery item:', error)
        alert('Terjadi error saat menghapus foto.')
      }
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'INTERIOR',
      image: ''
    })
    setEditingImage(null)
    setShowForm(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Gallery Management</h1>
          <p className="text-gray-400">Kelola foto-foto cafe</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2"
        >
          <span>📸</span>
          Upload Foto
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-2xl p-4 border border-gray-700">
          <p className="text-gray-400 text-sm">Total Foto</p>
          <p className="text-2xl font-bold text-white">{images.length}</p>
        </div>
        {categories.map(category => (
          <div key={category.value} className="bg-gray-800 rounded-2xl p-4 border border-gray-700">
            <p className="text-gray-400 text-sm">{category.label}</p>
            <p className="text-2xl font-bold text-white">
              {images.filter(img => img.category === category.value).length}
            </p>
          </div>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {images.map((image) => (
          <div key={image.id} className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-amber-500/50 transition-all group">
            {/* Image */}
            <div className="h-48 bg-gray-700 relative overflow-hidden">
              {image.image ? (
                <img 
                  src={image.image} 
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-4xl text-gray-400">🖼️</span>
                </div>
              )}
              
              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button 
                  onClick={() => handleEdit(image)}
                  className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-all transform translate-y-2 group-hover:translate-y-0"
                >
                  ✏️ Edit
                </button>
                <button 
                  onClick={() => handleDelete(image.id)}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-all transform translate-y-2 group-hover:translate-y-0"
                >
                  🗑️ Hapus
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-white font-semibold line-clamp-1">{image.title}</h3>
                <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded-full">
                  {categories.find(cat => cat.value === image.category)?.icon}
                </span>
              </div>
              
              {image.description && (
                <p className="text-gray-400 text-sm line-clamp-2 mb-2">{image.description}</p>
              )}
              
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>Uploaded: {new Date(image.createdAt).toLocaleDateString('id-ID')}</span>
                <span className={`px-2 py-1 rounded-full ${
                  image.isActive 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  {image.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {images.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📷</div>
          <p className="text-gray-400 text-lg">Belum ada foto di gallery</p>
          <button
            onClick={() => setShowForm(true)}
            className="mt-4 bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg"
          >
            Upload Foto Pertama
          </button>
        </div>
      )}

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                {editingImage ? 'Edit Foto' : 'Upload Foto Baru'}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Judul Foto *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
                  placeholder="Contoh: Interior Cafe yang Nyaman"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Deskripsi
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-white resize-none"
                  placeholder="Deskripsi foto..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Kategori *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>
                        {cat.icon} {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    URL Gambar *
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              {/* Image Preview */}
              {formData.image && (
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Preview
                  </label>
                  <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                    <img 
                      src={formData.image} 
                      alt="Preview" 
                      className="max-h-32 mx-auto rounded"
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                    />
                    <p className="text-gray-400 text-sm text-center mt-2">
                      Preview gambar akan muncul di sini
                    </p>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold transition-all flex-1"
                >
                  {editingImage ? 'Update Foto' : 'Upload Foto'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}