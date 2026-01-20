import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const priceMin = searchParams.get('priceMin')
    const priceMax = searchParams.get('priceMax')
    const rating = searchParams.get('rating')
    const location = searchParams.get('location')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const sort = searchParams.get('sort') || 'featured'

    const where: any = {
      isActive: true,
      isVerified: true,
    }

    if (category) {
      where.categories = {
        some: {
          category: {
            slug: category,
            isActive: true,
          },
        },
      }
    }

    if (priceMin || priceMax) {
      where.OR = []
      if (priceMin) {
        where.OR.push({
          priceRangeMin: {
            gte: parseInt(priceMin),
          },
        })
      }
      if (priceMax) {
        where.OR.push({
          priceRangeMax: {
            lte: parseInt(priceMax),
          },
        })
      }
    }

    if (rating) {
      where.rating = {
        gte: parseFloat(rating),
      }
    }

    if (location) {
      where.OR = [
        { city: { contains: location, mode: 'insensitive' } },
        { district: { contains: location, mode: 'insensitive' } },
        { address: { contains: location, mode: 'insensitive' } },
      ]
    }

    let orderBy: any = {}
    if (sort === 'price-asc') {
      orderBy = { priceRangeMin: 'asc' }
    } else if (sort === 'price-desc') {
      orderBy = { priceRangeMax: 'desc' }
    } else if (sort === 'rating') {
      orderBy = { rating: 'desc' }
    } else {
      orderBy = { isFeatured: 'desc', rating: 'desc' }
    }

    const [clinics, total] = await Promise.all([
      prisma.clinic.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          categories: {
            include: {
              category: true,
            },
          },
        },
      }),
      prisma.clinic.count({ where }),
    ])

    return NextResponse.json({
      clinics,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Clinics API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
