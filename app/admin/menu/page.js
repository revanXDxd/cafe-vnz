// app/admin/menu/page.js - COMPLETE CRUD
'use client'

import { useState, useEffect } from 'react'

export default function MenuManagement() {
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'COFFEE',
    image: '',
    ingredients: '',
    calories: '',
    isAvailable: true,
    isFeatured: false
  })

  useEffect(() => {
    fetchMenuItems()
  }, [])

  const fetchMenuItems = async () => {
    try {
      const response = await fetch('/api/menu')
      if (response.ok) {
        const data = await response.json()
        setMenuItems(data)
      }
    } catch (error) {
      console.error('Error fetching menu:', error)
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    { value: 'COFFEE', label: 'Kopi', icon: '☕' },
    { value: 'NON_COFFEE', label: 'Non-Kopi', icon: '🥤' },
    { value: 'FOOD', label: 'Makanan', icon: '🍽️' },
    { value: 'DESSERT', label: 'Dessert', icon: '🍰' },
    { value: 'SMOOTHIE', label: 'Smoothie', icon: '🥤' },
    { value: 'TEA', label: 'Tea', icon: '🍵' }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const url = editingItem ? `/api/menu/${editingItem.id}` : '/api/menu'
      const method = editingItem ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          calories: formData.calories ? parseInt(formData.calories) : null
        }),
      })

      if (response.ok) {
        await fetchMenuItems()
        resetForm()
        alert(editingItem ? 'Menu berhasil diupdate!' : 'Menu berhasil ditambahkan!')
      } else {
        alert('Terjadi error. Silakan coba lagi.')
      }
    } catch (error) {
      console.error('Error saving menu:', error)
      alert('Terjadi error. Silakan coba lagi.')
    }
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      image: item.image || '',
      ingredients: item.ingredients || '',
      calories: item.calories?.toString() || '',
      isAvailable: item.isAvailable,
      isFeatured: item.isFeatured || false
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (confirm('Apakah Anda yakin ingin menghapus menu ini?')) {
      try {
        const response = await fetch(`/api/menu/${id}`, {
          method: 'DELETE',
        })

        if (response.ok) {
          await fetchMenuItems()
          alert('Menu berhasil dihapus!')
        }
      } catch (error) {
        console.error('Error deleting menu:', error)
        alert('Terjadi error saat menghapus menu.')
      }
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'COFFEE',
      image: '',
      ingredients: '',
      calories: '',
      isAvailable: true,
      isFeatured: false
    })
    setEditingItem(null)
    setShowForm(false)
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const toggleAvailability = async (id, currentStatus) => {
    try {
      const response = await fetch(`/api/menu/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isAvailable: !currentStatus
        }),
      })

      if (response.ok) {
        await fetchMenuItems()
        alert('Status ketersediaan berhasil diupdate!')
      }
    } catch (error) {
      console.error('Error updating availability:', error)
    }
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
          <h1 className="text-3xl font-bold text-white">Menu Management</h1>
          <p className="text-gray-400">Kelola menu makanan dan minuman</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2"
        >
          <span>+</span>
          Tambah Menu
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-2xl p-4 border border-gray-700">
          <p className="text-gray-400 text-sm">Total Menu</p>
          <p className="text-2xl font-bold text-white">{menuItems.length}</p>
        </div>
        <div className="bg-gray-800 rounded-2xl p-4 border border-gray-700">
          <p className="text-gray-400 text-sm">Kopi</p>
          <p className="text-2xl font-bold text-white">
            {menuItems.filter(item => item.category === 'COFFEE').length}
          </p>
        </div>
        <div className="bg-gray-800 rounded-2xl p-4 border border-gray-700">
          <p className="text-gray-400 text-sm">Tersedia</p>
          <p className="text-2xl font-bold text-white">
            {menuItems.filter(item => item.isAvailable).length}
          </p>
        </div>
        <div className="bg-gray-800 rounded-2xl p-4 border border-gray-700">
          <p className="text-gray-400 text-sm">Featured</p>
          <p className="text-2xl font-bold text-white">
            {menuItems.filter(item => item.isFeatured).length}
          </p>
        </div>
      </div>

      {/* Menu Table */}
      <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left p-4 text-gray-400 font-semibold">Menu Item</th>
                <th className="text-left p-4 text-gray-400 font-semibold">Kategori</th>
                <th className="text-left p-4 text-gray-400 font-semibold">Harga</th>
                <th className="text-left p-4 text-gray-400 font-semibold">Status</th>
                <th className="text-left p-4 text-gray-400 font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map((item) => (
                <tr key={item.id} className="border-b border-gray-700/50 hover:bg-gray-700/50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                        ) : (
                          <span className="text-gray-400 text-xl">
                            {categories.find(cat => cat.value === item.category)?.icon}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="text-white font-semibold">{item.name}</p>
                        <p className="text-gray-400 text-sm line-clamp-1">{item.description}</p>
                        {item.isFeatured && (
                          <span className="inline-block mt-1 bg-amber-500 text-white text-xs px-2 py-1 rounded">
                            ⭐ Featured
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-700 text-gray-300">
                      {categories.find(cat => cat.value === item.category)?.icon}
                      {categories.find(cat => cat.value === item.category)?.label}
                    </span>
                  </td>
                  <td className="p-4">
                    <p className="text-white font-semibold">Rp {item.price?.toLocaleString('id-ID')}</p>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleAvailability(item.id, item.isAvailable)}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                        item.isAvailable 
                          ? 'bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30' 
                          : 'bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30'
                      }`}
                    >
                      {item.isAvailable ? '✅ Tersedia' : '❌ Habis'}
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleEdit(item)}
                        className="text-blue-400 hover:text-blue-300 transition-colors px-3 py-1 rounded border border-blue-500/30 hover:bg-blue-500/10"
                      >
                        ✏️ Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="text-red-400 hover:text-red-300 transition-colors px-3 py-1 rounded border border-red-500/30 hover:bg-red-500/10"
                      >
                        🗑️ Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {menuItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🍽️</div>
            <p className="text-gray-400 text-lg">Belum ada menu items</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg"
            >
              Tambah Menu Pertama
            </button>
          </div>
        )}
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                {editingItem ? 'Edit Menu' : 'Tambah Menu Baru'}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Nama Menu *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
                    placeholder="Nama menu..."
                  />
                </div>

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
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Deskripsi *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-white resize-none"
                  placeholder="Deskripsi menu..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Harga (Rp) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="1000"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
                    placeholder="35000"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Kalori
                  </label>
                  <input
                    type="number"
                    name="calories"
                    value={formData.calories}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
                    placeholder="180"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    URL Gambar
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
                    placeholder="/images/coffee.jpg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Bahan-bahan
                </label>
                <input
                  type="text"
                  name="ingredients"
                  value={formData.ingredients}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
                  placeholder="Kopi, susu, gula..."
                />
              </div>

              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-gray-300">
                  <input
                    type="checkbox"
                    name="isAvailable"
                    checked={formData.isAvailable}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-amber-500 bg-gray-700 border-gray-600 rounded focus:ring-amber-500"
                  />
                  Tersedia
                </label>
                <label className="flex items-center gap-2 text-gray-300">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-amber-500 bg-gray-700 border-gray-600 rounded focus:ring-amber-500"
                  />
                  Featured Item
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold transition-all flex-1"
                >
                  {editingItem ? 'Update Menu' : 'Tambah Menu'}
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