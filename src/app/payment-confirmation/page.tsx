import { redirect } from 'next/navigation'
import PaymentStatusCard from './components/payment-status-card'
import { getStripeSession } from '@/actions/stripe'

export default async function PaymentConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const { session_id: sessionId } = await searchParams

  if (!sessionId) {
    return redirect('/')
  }

  const stripeSession = await getStripeSession(sessionId)

  if (stripeSession.status === 'open') {
    return redirect('/')
  }

  return <PaymentStatusCard sessionId={stripeSession.id} />
}
