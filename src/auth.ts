import { PrismaAdapter } from '@auth/prisma-adapter'

import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import { prismaClient } from './lib/prisma'

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prismaClient),
  providers: [GitHub, Google],
})
