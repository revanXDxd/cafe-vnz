// app/admin/messages/page.js
'use client'

import { useState, useEffect } from 'react'

export default function MessagesManagement() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      // Simulate API call
      setTimeout(() => {
        setMessages([
          {
            id: 'MSG-001',
            name: 'Rina Melati',
            email: 'rina@email.com',
            phone: '+628123456780',
            subject: 'Pertanyaan tentang menu vegetarian',
            message: 'Halo, apakah cafe menyediakan menu vegetarian? Saya ingin datang besok dengan teman yang vegetarian.',
            status: 'unread',
            category: 'MENU_INQUIRY',
            createdAt: '2024-01-15T10:30:00Z',
            repliedAt: null
          },
          {
            id: 'MSG-002',
            name: 'David Wijaya',
            email: 'david@email.com',
            phone: '+628987654321',
            subject: 'Booking untuk acara ulang tahun',
            message: 'Saya ingin booking cafe untuk acara ulang tahun anak saya tanggal 20 Januari. Kapasitas sekitar 30 orang. Bisa info harga paketnya?',
            status: 'read',
            category: 'BOOKING',
            createdAt: '2024-01-15T09:15:00Z',
            repliedAt: '2024-01-15T14:20:00Z'
          },
          {
            id: 'MSG-003',
            name: 'Sari Putri',
            email: 'sari.putri@email.com',
            phone: '+628112233445',
            subject: 'Komplain tentang pelayanan',
            message: 'Kemarin saya datang jam 7 malam dan merasa pelayanan agak lambat. Ada 3 meja kosong tapi masih menunggu lama untuk pesanan.',
            status: 'replied',
            category: 'COMPLAINT',
            createdAt: '2024-01-14T16:45:00Z',
            repliedAt: '2024-01-15T10:15:00Z'
          },
          {
            id: 'MSG-004',
            name: 'Andi Pratama',
            email: 'andi.pratama@email.com',
            phone: '+628556677889',
            subject: 'Pujian untuk barista',
            message: 'Kopi di cafe ini enak banget! Barista nya ramah dan profesional. Khususnya mas Rudi, cara buat latte art nya bagus sekali!',
            status: 'replied',
            category: 'COMPLIMENT',
            createdAt: '2024-01-14T14:20:00Z',
            repliedAt: '2024-01-14T16:30:00Z'
          },
          {
            id: 'MSG-005',
            name: 'Lisa Santoso',
            email: 'lisa.santoso@email.com',
            phone: '+628998877665',
            subject: 'Tanya harga catering',
            message: 'Apakah menyediakan catering untuk meeting perusahaan? Kami butuh untuk 50 orang dengan menu kopi dan snack.',
            status: 'unread',
            category: 'CATERING',
            createdAt: '2024-01-15T08:00:00Z',
            repliedAt: null
          }
        ])
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Error fetching messages:', error)
      setLoading(false)
    }
  }

  const statusOptions = [
    { value: 'unread', label: 'Belum Dibaca', color: 'bg-red-500', badge: '🔴' },
    { value: 'read', label: 'Sudah Dibaca', color: 'bg-blue-500', badge: '🔵' },
    { value: 'replied', label: 'Sudah Dibalas', color: 'bg-green-500', badge: '✅' },
    { value: 'archived', label: 'Diarsipkan', color: 'bg-gray-500', badge: '📁' }
  ]

  const categoryOptions = [
    { value: 'MENU_INQUIRY', label: 'Tanya Menu', icon: '🍽️' },
    { value: 'BOOKING', label: 'Booking', icon: '📅' },
    { value: 'COMPLAINT', label: 'Komplain', icon: '😠' },
    { value: 'COMPLIMENT', label: 'Pujian', icon: '😊' },
    { value: 'CATERING', label: 'Catering', icon: '🎉' },
    { value: 'PARTNERSHIP', label: 'Kerjasama', icon: '🤝' },
    { value: 'OTHER', label: 'Lainnya', icon: '📝' }
  ]

  const updateMessageStatus = async (messageId, newStatus) => {
    try {
      setMessages(prev => prev.map(msg => 
        msg.id === messageId ? { ...msg, status: newStatus } : msg
      ))
    } catch (error) {
      console.error('Error updating message status:', error)
    }
  }

  const markAsReplied = async (messageId) => {
    try {
      setMessages(prev => prev.map(msg => 
        msg.id === messageId ? { 
          ...msg, 
          status: 'replied',
          repliedAt: new Date().toISOString()
        } : msg
      ))
      alert('Pesan ditandai sudah dibalas!')
    } catch (error) {
      console.error('Error marking as replied:', error)
    }
  }

  const deleteMessage = async (messageId) => {
    if (confirm('Apakah Anda yakin ingin menghapus pesan ini?')) {
      try {
        setMessages(prev => prev.filter(msg => msg.id !== messageId))
        alert('Pesan berhasil dihapus!')
      } catch (error) {
        console.error('Error deleting message:', error)
      }
    }
  }

  const filteredMessages = messages.filter(message => {
    const matchesFilter = filter === 'all' || message.status === filter
    const matchesSearch = message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.subject.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getStatusColor = (status) => {
    const statusObj = statusOptions.find(s => s.value === status)
    return statusObj ? statusObj.color : 'bg-gray-500'
  }

  const getCategoryIcon = (category) => {
    const categoryObj = categoryOptions.find(c => c.value === category)
    return categoryObj ? categoryObj.icon : '📝'
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
          <h1 className="text-3xl font-bold text-white">Messages Management</h1>
          <p className="text-gray-400">Kelola pesan dari pelanggan</p>
        </div>
        <div className="text-right">
          <p className="text-gray-400 text-sm">Unread Messages</p>
          <p className="text-2xl font-bold text-white">
            {messages.filter(msg => msg.status === 'unread').length}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {statusOptions.map(status => (
          <div key={status.value} className="bg-gray-800 rounded-2xl p-4 border border-gray-700">
            <p className="text-gray-400 text-sm">{status.label}</p>
            <p className="text-2xl font-bold text-white">
              {messages.filter(msg => msg.status === status.value).length}
            </p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Cari berdasarkan nama, email, atau subjek..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
        >
          <option value="all">Semua Status</option>
          {statusOptions.map(status => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {filteredMessages.map((message) => (
          <div 
            key={message.id} 
            className={`bg-gray-800 rounded-2xl p-6 border transition-all cursor-pointer hover:border-amber-500/50 ${
              message.status === 'unread' ? 'border-amber-500/30 bg-amber-500/5' : 'border-gray-700'
            }`}
            onClick={() => setSelectedMessage(message)}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-white font-bold text-lg">{message.subject}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getStatusColor(message.status)}`}>
                    {statusOptions.find(s => s.value === message.status)?.badge} 
                    {statusOptions.find(s => s.value === message.status)?.label}
                  </span>
                  <span className="px-2 py-1 rounded text-xs font-medium bg-gray-700 text-gray-300">
                    {getCategoryIcon(message.category)} 
                    {categoryOptions.find(c => c.value === message.category)?.label}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>👤 {message.name}</span>
                  <span>📧 {message.email}</span>
                  <span>📞 {message.phone}</span>
                  <span>🕒 {new Date(message.createdAt).toLocaleString('id-ID')}</span>
                </div>
              </div>
              
              {message.status === 'unread' && (
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              )}
            </div>

            {/* Message Preview */}
            <p className="text-gray-300 line-clamp-2 mb-4">
              {message.message}
            </p>

            {/* Actions */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-700">
              <div className="flex gap-2">
                <button 
                  onClick={(e) => {
                    e.stopPropagation()
                    markAsReplied(message.id)
                  }}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm transition-all"
                >
                  ✅ Tandai Sudah Dibalas
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation()
                    window.open(`mailto:${message.email}?subject=Re: ${message.subject}`, '_blank')
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm transition-all"
                >
                  📧 Balas Email
                </button>
              </div>
              
              <div className="flex gap-2">
                <select 
                  value={message.status}
                  onChange={(e) => {
                    e.stopPropagation()
                    updateMessageStatus(message.id, e.target.value)
                  }}
                  className="bg-gray-700 border border-gray-600 text-white rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  onClick={(e) => e.stopPropagation()}
                >
                  {statusOptions.map(status => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteMessage(message.id)
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm transition-all"
                >
                  🗑️ Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredMessages.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📭</div>
          <p className="text-gray-400 text-lg">
            {searchTerm ? 'Tidak ada pesan yang sesuai dengan pencarian' : 'Belum ada pesan'}
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="mt-4 bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg"
            >
              Reset Pencarian
            </button>
          )}
        </div>
      )}

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Message Details</h2>
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              {/* Header Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Subject</p>
                  <p className="text-white font-semibold text-lg">{selectedMessage.subject}</p>
                </div>
                <div className="flex gap-2">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium text-white ${getStatusColor(selectedMessage.status)}`}>
                    {statusOptions.find(s => s.value === selectedMessage.status)?.badge} 
                    {statusOptions.find(s => s.value === selectedMessage.status)?.label}
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-gray-700 text-gray-300">
                    {getCategoryIcon(selectedMessage.category)} 
                    {categoryOptions.find(c => c.value === selectedMessage.category)?.label}
                  </span>
                </div>
              </div>

              {/* Customer Info */}
              <div className="bg-gray-700/50 rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-2">Customer Information</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-white font-medium">👤 {selectedMessage.name}</p>
                    <p className="text-gray-400 text-sm">Nama</p>
                  </div>
                  <div>
                    <p className="text-white font-medium">📧 {selectedMessage.email}</p>
                    <p className="text-gray-400 text-sm">Email</p>
                  </div>
                  <div>
                    <p className="text-white font-medium">📞 {selectedMessage.phone}</p>
                    <p className="text-gray-400 text-sm">Telepon</p>
                  </div>
                </div>
              </div>

              {/* Message Content */}
              <div>
                <p className="text-gray-400 text-sm mb-2">Message Content</p>
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <p className="text-white whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
              </div>

              {/* Timestamps */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Dikirim</p>
                  <p className="text-white">{new Date(selectedMessage.createdAt).toLocaleString('id-ID')}</p>
                </div>
                {selectedMessage.repliedAt && (
                  <div>
                    <p className="text-gray-400">Dibalas</p>
                    <p className="text-white">{new Date(selectedMessage.repliedAt).toLocaleString('id-ID')}</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-700">
                <button
                  onClick={() => {
                    window.open(`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`, '_blank')
                    markAsReplied(selectedMessage.id)
                  }}
                  className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold transition-all flex-1 flex items-center justify-center gap-2"
                >
                  📧 Balas via Email
                </button>
                <button
                  onClick={() => markAsReplied(selectedMessage.id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-all"
                >
                  ✅ Tandai Dibalas
                </button>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}