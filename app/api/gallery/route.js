// app/api/gallery/route.js
import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    let where = { isActive: true }
    
    if (category && category !== 'all') {
      where.category = category
    }

    const galleryItems = await prisma.gallery.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(galleryItems)
  } catch (error) {
    console.error('Error fetching gallery:', error)
    return NextResponse.json(
      { error: 'Failed to fetch gallery items' },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    
    const galleryItem = await prisma.gallery.create({
      data: {
        title: body.title,
        image: body.image,
        category: body.category,
        description: body.description
      }
    })

    return NextResponse.json(galleryItem, { status: 201 })
  } catch (error) {
    console.error('Error creating gallery item:', error)
    return NextResponse.json(
      { error: 'Failed to create gallery item' },
      { status: 500 }
    )
  }
}