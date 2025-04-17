import Stripe from 'stripe'
import ClientSuccess from './client-success'
import OrderSummary from './components/order-summary'

// Função para buscar a sessão do Stripe
async function fetchStripeSession(sessionId: string) {
  const stripeSecret = process.env.STRIPE_SECRET_KEY
  if (!stripeSecret) {
    throw new Error('STRIPE_SECRET_KEY is not defined')
  }

  const stripe = new Stripe(stripeSecret, {
    apiVersion: '2023-10-16',
  })

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items.data.price.product'],
    })
    return session
  } catch (error) {
    console.error(error)
    return null
  }
}

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const sessionId = (await searchParams).session_id

  if (typeof sessionId !== 'string') {
    return (
      <div>
        <h1>Error</h1>
        <p>Invalid session ID</p>
      </div>
    )
  }

  const stripeSession = await fetchStripeSession(sessionId)

  if (!stripeSession) {
    return (
      <div>
        <h1>Error</h1>
        <p>Could not retrieve payment session</p>
      </div>
    )
  }

  return (
    <div>
      <h1>Payment Completed</h1>
      <ClientSuccess />
      <OrderSummary stripeSession={stripeSession} />
    </div>
  )
}
