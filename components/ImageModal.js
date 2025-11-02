// components/ImageModal.js
'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'

export default function ImageModal({ image, onClose }) {
  useEffect(() => {
    if (image) {
      gsap.fromTo('.image-modal', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3 })
    }
  }, [image])

  if (!image) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="image-modal max-w-4xl max-h-full" onClick={(e) => e.stopPropagation()}>
        <img src={image.src} alt={image.title} className="w-full h-auto max-h-[80vh] object-contain" />
        <div className="text-white text-center mt-4">
          <h3 className="text-2xl font-bold">{image.title}</h3>
        </div>
        <button onClick={onClose} className="absolute top-4 right-4 text-white text-2xl bg-black bg-opacity-50 w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-70">
          ✕
        </button>
      </div>
    </div>
  )
}