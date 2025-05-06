import { PrismaClient } from '@/generated/prisma/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const db = new PrismaClient().$extends(withAccelerate())

export default db