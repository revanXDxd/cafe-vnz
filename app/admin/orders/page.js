// app/admin/orders/page.js - ENHANCED
'use client'

import { useState, useEffect } from 'react'

export default function OrdersManagement() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState(null)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      // Simulate API call
      setTimeout(() => {
        setOrders([
          {
            id: 'ORD-001',
            orderNumber: 'VNZ-2024-001',
            customerName: 'Budi Santoso',
            customerEmail: 'budi@email.com',
            customerPhone: '+628123456789',
            items: [
              { name: 'VNZ Signature Blend', quantity: 2, price: 35000 },
              { name: 'Croissant Butter', quantity: 1, price: 25000 }
            ],
            total: 95000,
            status: 'completed',
            type: 'DINE_IN',
            notes: 'Minta es batu sedikit',
            createdAt: '2024-01-15T14:30:00Z'
          },
          {
            id: 'ORD-002',
            orderNumber: 'VNZ-2024-002',
            customerName: 'Sari Dewi',
            customerEmail: 'sari@email.com',
            customerPhone: '+628987654321',
            items: [
              { name: 'Matcha Latte Premium', quantity: 1, price: 30000 },
              { name: 'Tiramisu Classic', quantity: 1, price: 35000 }
            ],
            total: 65000,
            status: 'preparing',
            type: 'TAKEAWAY',
            notes: '',
            createdAt: '2024-01-15T14:25:00Z'
          },
          {
            id: 'ORD-003',
            orderNumber: 'VNZ-2024-003',
            customerName: 'Ahmad Rizki',
            customerEmail: 'ahmad@email.com',
            customerPhone: '+628112233445',
            items: [
              { name: 'Cold Brew Special', quantity: 1, price: 30000 },
              { name: 'Sandwich Club', quantity: 1, price: 45000 },
              { name: 'New York Cheesecake', quantity: 1, price: 32000 }
            ],
            total: 107000,
            status: 'pending',
            type: 'DINE_IN',
            notes: 'Dibungkus untuk dibawa pulang',
            createdAt: '2024-01-15T14:20:00Z'
          }
        ])
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Error fetching orders:', error)
      setLoading(false)
    }
  }

  const statusOptions = [
    { value: 'pending', label: 'Pending', color: 'bg-yellow-500', badge: '🕒' },
    { value: 'confirmed', label: 'Confirmed', color: 'bg-blue-500', badge: '✅' },
    { value: 'preparing', label: 'Preparing', color: 'bg-orange-500', badge: '👨‍🍳' },
    { value: 'ready', label: 'Ready', color: 'bg-green-500', badge: '📦' },
    { value: 'completed', label: 'Completed', color: 'bg-gray-500', badge: '🎉' },
    { value: 'cancelled', label: 'Cancelled', color: 'bg-red-500', badge: '❌' }
  ]

  const orderTypes = {
    DINE_IN: '🍽️ Dine In',
    TAKEAWAY: '🥡 Takeaway',
    DELIVERY: '🚗 Delivery'
  }

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      // Simulate API call
      setOrders(prev => prev.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ))
      alert(`Status order berhasil diupdate menjadi: ${statusOptions.find(s => s.value === newStatus)?.label}`)
    } catch (error) {
      console.error('Error updating order status:', error)
      alert('Terjadi error saat update status order.')
    }
  }

  const getStatusColor = (status) => {
    const statusObj = statusOptions.find(s => s.value === status)
    return statusObj ? statusObj.color : 'bg-gray-500'
  }

  const getStatusBadge = (status) => {
    const statusObj = statusOptions.find(s => s.value === status)
    return statusObj ? statusObj.badge : '❓'
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
          <h1 className="text-3xl font-bold text-white">Orders Management</h1>
          <p className="text-gray-400">Kelola pesanan dari pelanggan</p>
        </div>
        <div className="text-right">
          <p className="text-gray-400 text-sm">Orders Hari Ini</p>
          <p className="text-2xl font-bold text-white">{orders.length}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {statusOptions.map(status => (
          <div key={status.value} className="bg-gray-800 rounded-2xl p-4 border border-gray-700">
            <p className="text-gray-400 text-sm">{status.label}</p>
            <p className="text-2xl font-bold text-white">
              {orders.filter(order => order.status === status.value).length}
            </p>
          </div>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-amber-500/50 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-white font-bold text-lg">{order.orderNumber}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getStatusColor(order.status)}`}>
                    {getStatusBadge(order.status)} {statusOptions.find(s => s.value === order.status)?.label}
                  </span>
                  <span className="px-2 py-1 rounded text-xs font-medium bg-gray-700 text-gray-300">
                    {orderTypes[order.type]}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>👤 {order.customerName}</span>
                  <span>📞 {order.customerPhone}</span>
                  <span>🕒 {new Date(order.createdAt).toLocaleString('id-ID')}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-bold text-lg">Rp {order.total.toLocaleString('id-ID')}</p>
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-4">
              <p className="text-gray-400 text-sm font-medium mb-2">Items:</p>
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-300">{item.name}</span>
                      <span className="text-gray-500">x{item.quantity}</span>
                    </div>
                    <span className="text-gray-300">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            {order.notes && (
              <div className="mb-4">
                <p className="text-gray-400 text-sm font-medium mb-1">Catatan:</p>
                <p className="text-gray-300 text-sm bg-gray-700/50 p-2 rounded">{order.notes}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-700">
              <div className="flex gap-2">
                <button 
                  onClick={() => setSelectedOrder(order)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm transition-all"
                >
                  📋 Detail
                </button>
                <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm transition-all">
                  📞 Hubungi
                </button>
              </div>
              
              <div className="flex gap-2">
                <select 
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                  className="bg-gray-700 border border-gray-600 text-white rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {statusOptions.map(status => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
                
                <button className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded text-sm transition-all">
                  ✅ Selesai
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Order Details</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Order Number</p>
                  <p className="text-white font-semibold">{selectedOrder.orderNumber}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Status</p>
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium text-white ${getStatusColor(selectedOrder.status)}`}>
                    {getStatusBadge(selectedOrder.status)} {statusOptions.find(s => s.value === selectedOrder.status)?.label}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-gray-400 text-sm">Customer Info</p>
                <div className="bg-gray-700/50 rounded-lg p-3 mt-1">
                  <p className="text-white">👤 {selectedOrder.customerName}</p>
                  <p className="text-gray-300">📧 {selectedOrder.customerEmail}</p>
                  <p className="text-gray-300">📞 {selectedOrder.customerPhone}</p>
                </div>
              </div>

              <div>
                <p className="text-gray-400 text-sm">Order Items</p>
                <div className="bg-gray-700/50 rounded-lg p-3 mt-1">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between py-2 border-b border-gray-600 last:border-b-0">
                      <div>
                        <p className="text-white">{item.name}</p>
                        <p className="text-gray-400 text-sm">Rp {item.price.toLocaleString('id-ID')} x {item.quantity}</p>
                      </div>
                      <p className="text-white font-semibold">
                        Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                      </p>
                    </div>
                  ))}
                  <div className="flex justify-between pt-2 mt-2 border-t border-gray-600">
                    <p className="text-white font-semibold">Total</p>
                    <p className="text-white font-bold text-lg">Rp {selectedOrder.total.toLocaleString('id-ID')}</p>
                  </div>
                </div>
              </div>

              {selectedOrder.notes && (
                <div>
                  <p className="text-gray-400 text-sm">Customer Notes</p>
                  <p className="text-white bg-gray-700/50 rounded-lg p-3 mt-1">{selectedOrder.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}