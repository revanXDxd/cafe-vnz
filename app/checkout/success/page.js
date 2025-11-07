// app/checkout/success/page.js
'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Success() {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get('orderNumber')
  const [order, setOrder] = useState(null)

  useEffect(() => {
    if (orderNumber) {
      // In a real app, you might want to fetch order details
      setOrder({
        orderNumber,
        estimatedTime: '15-20 menit'
      })
    }
  }, [orderNumber])

  return (
    <div className="max-w-2xl mx-auto p-6 text-center">
      <div className="text-6xl mb-4">✅</div>
      <h1 className="text-3xl font-bold mb-4">Order Berhasil!</h1>
      <p className="text-gray-600 mb-2">
        Terima kasih telah memesan di VNZ Cafe.
      </p>
      
      {order && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-6">
          <p className="text-green-800 font-semibold text-lg">
            Nomor Order: {order.orderNumber}
          </p>
          <p className="text-green-600 mt-2">
            Estimasi waktu: {order.estimatedTime}
          </p>
        </div>
      )}

      <div className="space-y-4 text-left bg-gray-50 rounded-2xl p-6 mb-6">
        <h3 className="font-semibold text-lg mb-3">Selanjutnya:</h3>
        <div className="flex items-start gap-3">
          <span className="text-amber-500 text-xl">📱</span>
          <div>
            <p className="font-medium">Tunggu Konfirmasi</p>
            <p className="text-gray-600 text-sm">Kami akan mengkonfirmasi order Anda via WhatsApp</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-amber-500 text-xl">⏰</span>
          <div>
            <p className="font-medium">Proses Order</p>
            <p className="text-gray-600 text-sm">Barista kami akan mempersiapkan pesanan Anda</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-amber-500 text-xl">🎉</span>
          <div>
            <p className="font-medium">Order Siap</p>
            <p className="text-gray-600 text-sm">Anda akan mendapat notifikasi ketika order siap</p>
          </div>
        </div>
      </div>

      <div className="flex gap-4 justify-center">
        <button
          onClick={() => window.location.href = '/'}
          className="bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition-all"
        >
          Kembali ke Home
        </button>
        <button
          onClick={() => window.location.href = '/menu'}
          className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-all"
        >
          Pesan Lagi
        </button>
      </div>
    </div>
  )
}