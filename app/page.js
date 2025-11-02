// app/page.js
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from '../components/Header'
import Hero from '../components/Hero'
import About from '../components/About'
import Menu from '../components/Menu'
import Gallery from '../components/Gallery'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const mainRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animasi untuk semua section
      gsap.utils.toArray('.section-animate').forEach(section => {
        gsap.fromTo(section,
          {
            y: 100,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })

      // Animasi untuk cards
      gsap.utils.toArray('.card-animate').forEach((card, i) => {
        gsap.fromTo(card,
          {
            y: 50,
            opacity: 0,
            rotationY: 15
          },
          {
            y: 0,
            opacity: 1,
            rotationY: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })
    }, mainRef)

    return () => ctx.revert()
  }, [])

  return (
    <main ref={mainRef} className="relative">
      <Header />
      <Hero />
      <About />
      <Menu />
      <Gallery />
      <Contact />
      <Footer />
      <ScrollToTop />
    </main>
  )
}