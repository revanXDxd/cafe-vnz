// components/MenuCard.js - FIXED WITH CART FUNCTION
'use client'

export default function MenuCard({ item, index, onAddToCart }) {
  const handleAddToCart = () => {
    onAddToCart(item)
    // Optional: Show some feedback
    console.log(`Added ${item.name} to cart`)
  }

  return (
    <div className="menu-card bg-gray-800 rounded-2xl p-6 shadow-xl border border-amber-700/30 hover:border-amber-500/50 transition-all duration-300 hover:scale-105">
      <div className="flex flex-col h-full">
        {/* Image */}
        <div className="relative h-48 rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-amber-900/50 to-gray-700">
          {item.image ? (
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-6xl text-amber-400/50">
                {item.category === 'COFFEE' && '☕'}
                {item.category === 'NON_COFFEE' && '🥤'}
                {item.category === 'FOOD' && '🍽️'}
                {item.category === 'DESSERT' && '🍰'}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-amber-200 mb-2">{item.name}</h3>
          <p className="text-amber-100/70 text-sm mb-4 flex-1">{item.description}</p>
          
          <div className="flex items-center justify-between mt-auto">
            <span className="text-2xl font-bold text-amber-400">Rp {item.price}</span>
            <button
              onClick={handleAddToCart}
              className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-amber-500/25"
            >
              Pesan
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}