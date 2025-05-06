'use server'
import { auth } from '@/lib/auth'

export async function getSession() {
  const session = await auth()
  return session
}
