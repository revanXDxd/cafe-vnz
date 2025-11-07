// app/admin/orders/page.js - UPDATED WITH REAL DATA
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
      const response = await fetch('/api/orders')
      if (response.ok) {
        const data = await response.json()
        setOrders(data)
      } else {
        console.error('Failed to fetch orders')
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const statusOptions = [
    { value: 'PENDING', label: 'Pending', color: 'bg-yellow-500', badge: '🕒' },
    { value: 'CONFIRMED', label: 'Confirmed', color: 'bg-blue-500', badge: '✅' },
    { value: 'PREPARING', label: 'Preparing', color: 'bg-orange-500', badge: '👨‍🍳' },
    { value: 'READY', label: 'Ready', color: 'bg-green-500', badge: '📦' },
    { value: 'COMPLETED', label: 'Completed', color: 'bg-gray-500', badge: '🎉' },
    { value: 'CANCELLED', label: 'Cancelled', color: 'bg-red-500', badge: '❌' }
  ]

  const orderTypes = {
    DINE_IN: '🍽️ Dine In',
    TAKEAWAY: '🥡 Takeaway',
    DELIVERY: '🚗 Delivery'
  }

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        await fetchOrders()
        alert(`Status order berhasil diupdate menjadi: ${statusOptions.find(s => s.value === newStatus)?.label}`)
      } else {
        alert('Gagal update status order.')
      }
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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount)
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
          <p className="text-gray-400 text-sm">Total Orders</p>
          <p className="text-2xl font-bold text-white">{orders.length}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
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
                  <span>📧 {order.customerEmail}</span>
                  <span>🕒 {new Date(order.createdAt).toLocaleString('id-ID')}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-bold text-lg">{formatCurrency(order.total)}</p>
                <p className="text-gray-400 text-sm">{order.items.length} items</p>
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
                    <span className="text-gray-300">{formatCurrency(item.price * item.quantity)}</span>
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
                <button 
                  onClick={() => window.open(`https://wa.me/${order.customerPhone.replace('+', '')}`, '_blank')}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm transition-all"
                >
                  💬 WhatsApp
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
                
                {order.status !== 'COMPLETED' && order.status !== 'CANCELLED' && (
                  <button 
                    onClick={() => updateOrderStatus(order.id, 'COMPLETED')}
                    className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded text-sm transition-all"
                  >
                    ✅ Selesai
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {orders.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📦</div>
          <p className="text-gray-400 text-lg">Belum ada order</p>
          <p className="text-gray-500 text-sm">Order dari website akan muncul di sini</p>
        </div>
      )}

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
                        <p className="text-gray-400 text-sm">
                          {formatCurrency(item.price)} x {item.quantity}
                        </p>
                      </div>
                      <p className="text-white font-semibold">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                  <div className="flex justify-between pt-2 mt-2 border-t border-gray-600">
                    <p className="text-white font-semibold">Total</p>
                    <p className="text-white font-bold text-lg">{formatCurrency(selectedOrder.total)}</p>
                  </div>
                </div>
              </div>

              {selectedOrder.notes && (
                <div>
                  <p className="text-gray-400 text-sm">Customer Notes</p>
                  <p className="text-white bg-gray-700/50 rounded-lg p-3 mt-1">{selectedOrder.notes}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Order Type</p>
                  <p className="text-white">{orderTypes[selectedOrder.type]}</p>
                </div>
                <div>
                  <p className="text-gray-400">Order Time</p>
                  <p className="text-white">{new Date(selectedOrder.createdAt).toLocaleString('id-ID')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}