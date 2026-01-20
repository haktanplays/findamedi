import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const clinic = await prisma.clinic.findUnique({
      where: {
        slug: params.slug,
        isActive: true,
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
        doctors: {
          where: { isActive: true },
        },
        treatments: {
          where: { isActive: true },
          include: {
            category: true,
          },
        },
        beforeAfterImages: {
          where: { isActive: true },
          include: {
            doctor: true,
            treatment: true,
          },
        },
        reviews: {
          where: { status: 'APPROVED' },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    })

    if (!clinic) {
      return NextResponse.json(
        { error: 'Clinic not found' },
        { status: 404 }
      )
    }

    await prisma.clinic.update({
      where: { id: clinic.id },
      data: { viewCount: { increment: 1 } },
    })

    return NextResponse.json(clinic)
  } catch (error) {
    console.error('Clinic detail API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
