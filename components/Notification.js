// components/Notification.js
'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'

export default function Notification({ message, type = 'success', onClose }) {
  useEffect(() => {
    gsap.fromTo('.notification', { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3 })
    
    const timer = setTimeout(() => {
      onClose()
    }, 3000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className={`notification fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white`}>
      {message}
      <button onClick={onClose} className="ml-4">✕</button>
    </div>
  )
}