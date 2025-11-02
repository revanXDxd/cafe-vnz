// components/Map.js
'use client'

export default function Map() {
  return (
    <div className="mt-8 card-animate">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Lokasi Kami</h3>
      <div className="bg-gray-200 h-64 rounded-lg overflow-hidden">
        {/* Ganti dengan embed Google Maps yang sebenarnya */}
        <div className="w-full h-full flex items-center justify-center text-gray-500">
          🗺️ Peta Lokasi VNZ Cafe
        </div>
      </div>
    </div>
  )
}