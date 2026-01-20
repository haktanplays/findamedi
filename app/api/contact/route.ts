import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { error: 'Tüm alanlar zorunludur' },
        { status: 400 }
      )
    }

    console.log('Contact form submission:', {
      name: body.name,
      email: body.email,
      subject: body.subject,
      message: body.message,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json(
      { message: 'Mesaj başarıyla alındı' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
