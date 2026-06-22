import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { prisma } from '../prisma/client'

const SALT_ROUNDS = 10

export const AuthService = {
  async register(email: string, password: string, name: string) {
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      throw new Error('User with this email already exists')
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)

    const user = await prisma.user.create({
      data: { email, passwordHash, name },
    })

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    )

    return {
      token,
      user: { id: user.id, email: user.email, name: user.name, createdAt: user.createdAt },
    }
  },

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      throw new Error('Invalid email or password')
    }

    const isValid = await bcrypt.compare(password, user.passwordHash)
    if (!isValid) {
      throw new Error('Invalid email or password')
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    )

    return {
      token,
      user: { id: user.id, email: user.email, name: user.name, createdAt: user.createdAt },
    }
  },

  async getMe(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true, createdAt: true },
    })
    if (!user) throw new Error('User not found')
    return user
  },
}