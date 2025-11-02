// app/layout.js
'use client'

import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import { SessionProvider } from 'next-auth/react'
import './globals.css'

export default function RootLayout({ children }) {
  useEffect(() => {
    const lenis = new Lenis()
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  return (
    <html lang="id">
      <body className="font-sans">
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}