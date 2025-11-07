// app/admin/reservations/page.js
'use client'

import { useState, useEffect } from 'react'

export default function ReservationsManagement() {
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedReservation, setSelectedReservation] = useState(null)
  const [filter, setFilter] = useState('today')
  const [view, setView] = useState('list') // 'list' or 'calendar'

  useEffect(() => {
    fetchReservations()
  }, [])

  const fetchReservations = async () => {
    try {
      // Simulate API call
      setTimeout(() => {
        setReservations([
          {
            id: 'RES-001',
            reservationNumber: 'RSV-2024-001',
            customerName: 'Budi Santoso',
            customerEmail: 'budi@email.com',
            customerPhone: '+628123456789',
            date: '2024-01-20',
            time: '19:00',
            partySize: 4,
            tablePreference: 'Window',
            specialRequests: 'Minta meja dekat jendela untuk romantis dinner',
            status: 'confirmed',
            source: 'WEBSITE',
            createdAt: '2024-01-15T14:30:00Z',
            confirmedAt: '2024-01-15T15:00:00Z'
          },
          {
            id: 'RES-002',
            reservationNumber: 'RSV-2024-002',
            customerName: 'Sari Dewi',
            customerEmail: 'sari@email.com',
            customerPhone: '+628987654321',
            date: '2024-01-18',
            time: '20:30',
            partySize: 2,
            tablePreference: 'Coffee Bar',
            specialRequests: 'Merayakan anniversary, minta ada surprise dessert',
            status: 'pending',
            source: 'PHONE',
            createdAt: '2024-01-15T13:15:00Z',
            confirmedAt: null
          },
          {
            id: 'RES-003',
            reservationNumber: 'RSV-2024-003',
            customerName: 'Ahmad Rizki',
            customerEmail: 'ahmad@email.com',
            customerPhone: '+628112233445',
            date: '2024-01-16',
            time: '12:00',
            partySize: 6,
            tablePreference: 'Private Room',
            specialRequests: 'Meeting bisnis, butuh meja yang agak privat',
            status: 'confirmed',
            source: 'WEBSITE',
            createdAt: '2024-01-14T16:45:00Z',
            confirmedAt: '2024-01-14T17:30:00Z'
          },
          {
            id: 'RES-004',
            reservationNumber: 'RSV-2024-004',
            customerName: 'Lisa Santoso',
            customerEmail: 'lisa.santoso@email.com',
            customerPhone: '+628998877665',
            date: '2024-01-17',
            time: '14:00',
            partySize: 3,
            tablePreference: 'Garden View',
            specialRequests: 'Ada 1 anak kecil, minta high chair',
            status: 'cancelled',
            source: 'WALK_IN',
            createdAt: '2024-01-13T10:20:00Z',
            confirmedAt: '2024-01-13T11:00:00Z',
            cancelledAt: '2024-01-14T09:15:00Z'
          },
          {
            id: 'RES-005',
            reservationNumber: 'RSV-2024-005',
            customerName: 'David Wijaya',
            customerEmail: 'david@email.com',
            customerPhone: '+628556677889',
            date: '2024-01-19',
            time: '18:00',
            partySize: 8,
            tablePreference: 'Long Table',
            specialRequests: 'Acara ulang tahun, minta dekorasi meja',
            status: 'completed',
            source: 'WEBSITE',
            createdAt: '2024-01-12T08:00:00Z',
            confirmedAt: '2024-01-12T09:30:00Z'
          }
        ])
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Error fetching reservations:', error)
      setLoading(false)
    }
  }

  const statusOptions = [
    { value: 'pending', label: 'Pending', color: 'bg-yellow-500', badge: '🕒' },
    { value: 'confirmed', label: 'Confirmed', color: 'bg-green-500', badge: '✅' },
    { value: 'seated', label: 'Seated', color: 'bg-blue-500', badge: '🪑' },
    { value: 'completed', label: 'Completed', color: 'bg-gray-500', badge: '🎉' },
    { value: 'cancelled', label: 'Cancelled', color: 'bg-red-500', badge: '❌' },
    { value: 'no_show', label: 'No Show', color: 'bg-purple-500', badge: '👻' }
  ]

  const sourceOptions = [
    { value: 'WEBSITE', label: 'Website', icon: '🌐' },
    { value: 'PHONE', label: 'Telepon', icon: '📞' },
    { value: 'WALK_IN', label: 'Walk-in', icon: '🚶' },
    { value: 'PARTNER', label: 'Partner', icon: '🤝' }
  ]

  const tableOptions = [
    'Window', 'Coffee Bar', 'Private Room', 'Garden View', 'Long Table', 'Standard'
  ]

  const updateReservationStatus = async (reservationId, newStatus) => {
    try {
      setReservations(prev => prev.map(res => 
        res.id === reservationId ? { 
          ...res, 
          status: newStatus,
          ...(newStatus === 'confirmed' && !res.confirmedAt && { confirmedAt: new Date().toISOString() })
        } : res
      ))
      alert(`Status reservasi berhasil diupdate!`)
    } catch (error) {
      console.error('Error updating reservation status:', error)
    }
  }

  const confirmReservation = async (reservationId) => {
    try {
      setReservations(prev => prev.map(res => 
        res.id === reservationId ? { 
          ...res, 
          status: 'confirmed',
          confirmedAt: new Date().toISOString()
        } : res
      ))
      alert('Reservasi berhasil dikonfirmasi!')
    } catch (error) {
      console.error('Error confirming reservation:', error)
    }
  }

  const cancelReservation = async (reservationId) => {
    if (confirm('Apakah Anda yakin ingin membatalkan reservasi ini?')) {
      try {
        setReservations(prev => prev.map(res => 
          res.id === reservationId ? { 
            ...res, 
            status: 'cancelled',
            cancelledAt: new Date().toISOString()
          } : res
        ))
        alert('Reservasi berhasil dibatalkan!')
      } catch (error) {
        console.error('Error cancelling reservation:', error)
      }
    }
  }

  const getStatusColor = (status) => {
    const statusObj = statusOptions.find(s => s.value === status)
    return statusObj ? statusObj.color : 'bg-gray-500'
  }

  const getSourceIcon = (source) => {
    const sourceObj = sourceOptions.find(s => s.value === source)
    return sourceObj ? sourceObj.icon : '📝'
  }

  const filteredReservations = reservations.filter(reservation => {
    const today = new Date().toISOString().split('T')[0]
    
    switch (filter) {
      case 'today':
        return reservation.date === today
      case 'upcoming':
        return reservation.date >= today && reservation.status === 'confirmed'
      case 'pending':
        return reservation.status === 'pending'
      case 'all':
      default:
        return true
    }
  })

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
          <h1 className="text-3xl font-bold text-white">Reservations Management</h1>
          <p className="text-gray-400">Kelola reservasi meja pelanggan</p>
        </div>
        <div className="text-right">
          <p className="text-gray-400 text-sm">Reservations Today</p>
          <p className="text-2xl font-bold text-white">
            {reservations.filter(res => res.date === new Date().toISOString().split('T')[0]).length}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        {statusOptions.map(status => (
          <div key={status.value} className="bg-gray-800 rounded-2xl p-4 border border-gray-700">
            <p className="text-gray-400 text-sm">{status.label}</p>
            <p className="text-2xl font-bold text-white">
              {reservations.filter(res => res.status === status.value).length}
            </p>
          </div>
        ))}
      </div>

      {/* Filters & View Toggle */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex gap-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
          >
            <option value="today">Hari Ini</option>
            <option value="upcoming">Upcoming</option>
            <option value="pending">Pending Confirmation</option>
            <option value="all">Semua Reservasi</option>
          </select>
          
          <div className="flex bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setView('list')}
              className={`px-4 py-2 rounded-md transition-all ${
                view === 'list' 
                  ? 'bg-amber-500 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              📋 List View
            </button>
            <button
              onClick={() => setView('calendar')}
              className={`px-4 py-2 rounded-md transition-all ${
                view === 'calendar' 
                  ? 'bg-amber-500 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              📅 Calendar View
            </button>
          </div>
        </div>

        <button className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2">
          <span>➕</span>
          Tambah Reservasi Manual
        </button>
      </div>

      {/* Reservations List */}
      {view === 'list' && (
        <div className="space-y-4">
          {filteredReservations.map((reservation) => (
            <div 
              key={reservation.id} 
              className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-amber-500/50 transition-all cursor-pointer"
              onClick={() => setSelectedReservation(reservation)}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-white font-bold text-lg">{reservation.reservationNumber}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getStatusColor(reservation.status)}`}>
                      {statusOptions.find(s => s.value === reservation.status)?.badge} 
                      {statusOptions.find(s => s.value === reservation.status)?.label}
                    </span>
                    <span className="px-2 py-1 rounded text-xs font-medium bg-gray-700 text-gray-300">
                      {getSourceIcon(reservation.source)} 
                      {sourceOptions.find(s => s.value === reservation.source)?.label}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>👤 {reservation.customerName}</span>
                    <span>📞 {reservation.customerPhone}</span>
                    <span>👥 {reservation.partySize} orang</span>
                    <span>📅 {new Date(reservation.date).toLocaleDateString('id-ID')}</span>
                    <span>🕒 {reservation.time}</span>
                  </div>
                </div>
                
                {reservation.tablePreference && (
                  <div className="text-right">
                    <p className="text-gray-400 text-sm">Table Preference</p>
                    <p className="text-white font-semibold">{reservation.tablePreference}</p>
                  </div>
                )}
              </div>

              {/* Special Requests */}
              {reservation.specialRequests && (
                <p className="text-gray-300 line-clamp-1 mb-4">
                  <span className="text-gray-400">Special Request:</span> {reservation.specialRequests}
                </p>
              )}

              {/* Actions */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                <div className="flex gap-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(`tel:${reservation.customerPhone}`, '_blank')
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm transition-all"
                  >
                    📞 Telepon
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(`https://wa.me/${reservation.customerPhone.replace('+', '')}`, '_blank')
                    }}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm transition-all"
                  >
                    💬 WhatsApp
                  </button>
                </div>
                
                <div className="flex gap-2">
                  {reservation.status === 'pending' && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        confirmReservation(reservation.id)
                      }}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm transition-all"
                    >
                      ✅ Konfirmasi
                    </button>
                  )}
                  
                  <select 
                    value={reservation.status}
                    onChange={(e) => {
                      e.stopPropagation()
                      updateReservationStatus(reservation.id, e.target.value)
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
                      cancelReservation(reservation.id)
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm transition-all"
                  >
                    ❌ Batalkan
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Calendar View */}
      {view === 'calendar' && (
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
          <div className="text-center mb-6">
            <h3 className="text-white text-xl font-bold">Calendar View - Coming Soon</h3>
            <p className="text-gray-400">Fitur calendar view sedang dalam pengembangan</p>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-gray-400 font-medium py-2">
                {day}
              </div>
            ))}
            {Array.from({ length: 31 }, (_, i) => (
              <div key={i} className="bg-gray-700 rounded-lg p-3 min-h-20 hover:bg-gray-600 transition-all">
                <div className="text-white font-medium">{i + 1}</div>
                <div className="space-y-1 mt-1">
                  {filteredReservations
                    .filter(res => new Date(res.date).getDate() === i + 1)
                    .map(res => (
                      <div 
                        key={res.id}
                        className="text-xs bg-amber-500 text-white p-1 rounded truncate cursor-pointer"
                        onClick={() => setSelectedReservation(res)}
                      >
                        {res.time} - {res.customerName}
                      </div>
                    ))
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredReservations.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📅</div>
          <p className="text-gray-400 text-lg">
            {filter === 'today' 
              ? 'Tidak ada reservasi untuk hari ini' 
              : 'Belum ada reservasi'}
          </p>
          <button
            onClick={() => setFilter('all')}
            className="mt-4 bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg"
          >
            Lihat Semua Reservasi
          </button>
        </div>
      )}

      {/* Reservation Detail Modal */}
      {selectedReservation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Reservation Details</h2>
              <button
                onClick={() => setSelectedReservation(null)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              {/* Header Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Reservation Number</p>
                  <p className="text-white font-semibold">{selectedReservation.reservationNumber}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Status</p>
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium text-white ${getStatusColor(selectedReservation.status)}`}>
                    {statusOptions.find(s => s.value === selectedReservation.status)?.badge} 
                    {statusOptions.find(s => s.value === selectedReservation.status)?.label}
                  </span>
                </div>
              </div>

              {/* Customer Info */}
              <div className="bg-gray-700/50 rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-2">Customer Information</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-white font-medium">👤 {selectedReservation.customerName}</p>
                    <p className="text-gray-400 text-sm">Nama</p>
                  </div>
                  <div>
                    <p className="text-white font-medium">📧 {selectedReservation.customerEmail}</p>
                    <p className="text-gray-400 text-sm">Email</p>
                  </div>
                  <div>
                    <p className="text-white font-medium">📞 {selectedReservation.customerPhone}</p>
                    <p className="text-gray-400 text-sm">Telepon</p>
                  </div>
                </div>
              </div>

              {/* Reservation Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Date</p>
                  <p className="text-white font-semibold">
                    {new Date(selectedReservation.date).toLocaleDateString('id-ID')}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Time</p>
                  <p className="text-white font-semibold">{selectedReservation.time}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Party Size</p>
                  <p className="text-white font-semibold">{selectedReservation.partySize} orang</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Table Preference</p>
                  <p className="text-white font-semibold">{selectedReservation.tablePreference || 'Standard'}</p>
                </div>
              </div>

              {/* Special Requests */}
              {selectedReservation.specialRequests && (
                <div>
                  <p className="text-gray-400 text-sm mb-2">Special Requests</p>
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <p className="text-white whitespace-pre-wrap">{selectedReservation.specialRequests}</p>
                  </div>
                </div>
              )}

              {/* Timestamps */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Dibuat</p>
                  <p className="text-white">{new Date(selectedReservation.createdAt).toLocaleString('id-ID')}</p>
                </div>
                {selectedReservation.confirmedAt && (
                  <div>
                    <p className="text-gray-400">Dikonfirmasi</p>
                    <p className="text-white">{new Date(selectedReservation.confirmedAt).toLocaleString('id-ID')}</p>
                  </div>
                )}
                {selectedReservation.cancelledAt && (
                  <div>
                    <p className="text-gray-400">Dibatalkan</p>
                    <p className="text-white">{new Date(selectedReservation.cancelledAt).toLocaleString('id-ID')}</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-700">
                <button
                  onClick={() => {
                    window.open(`https://wa.me/${selectedReservation.customerPhone.replace('+', '')}`, '_blank')
                  }}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-all flex-1 flex items-center justify-center gap-2"
                >
                  💬 WhatsApp Customer
                </button>
                <button
                  onClick={() => setSelectedReservation(null)}
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