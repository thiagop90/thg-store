import { createOrder } from '@/actions/order'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { cartItems, userId } = await request.json()
    console.log('Creating order with:', { cartItems, userId })

    if (!userId) {
      console.error('User ID is missing')
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 },
      )
    }

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      console.error('Invalid or empty cartItems')
      return NextResponse.json(
        { error: 'Cart items are required and must be a non-empty array' },
        { status: 400 },
      )
    }

    const order = await createOrder(cartItems, userId)
    console.log('Order created:', order.id)
    return NextResponse.json({ orderId: order.id })
  } catch (error: any) {
    console.error('Error creating order:', {
      error: error.message,
      stack: error.stack,
    })
    return NextResponse.json({ error: 'Error creating order' }, { status: 500 })
  }
}
