// lib/utils.js
export function formatPrice(price) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price)
}

export function formatDate(date) {
  return new Intl.DateTimeFormat('id-ID').format(new Date(date))
}