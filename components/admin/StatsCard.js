// components/admin/StatsCard.js
export default function StatsCard({ title, value, change, icon, color = 'blue' }) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    amber: 'from-amber-500 to-amber-600',
    red: 'from-red-500 to-red-600'
  }

  const changeColor = change.startsWith('+') ? 'text-green-400' : 'text-red-400'

  return (
    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
          <p className="text-2xl font-bold text-white mb-2">{value}</p>
          <p className={`text-sm font-semibold ${changeColor}`}>
            {change} dari bulan lalu
          </p>
        </div>
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center`}>
          <span className="text-white text-xl">{icon}</span>
        </div>
      </div>
    </div>
  )
}