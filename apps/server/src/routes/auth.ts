import { Router, Response } from 'express'
import { z } from 'zod'
import { AuthService } from '../services/auth.service'
import { asyncHandler } from '../middleware/asyncHandler'
import { authMiddleware, AuthRequest } from '../middleware/auth'

const router = Router()

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

// POST /auth/register
router.post('/register', asyncHandler(async (req, res: Response) => {
  const data = registerSchema.parse(req.body)
  const result = await AuthService.register(data.email, data.password, data.name)

  res.cookie('token', result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  })

  res.status(201).json({ user: result.user })
}))

// POST /auth/login
router.post('/login', asyncHandler(async (req, res: Response) => {
  const data = loginSchema.parse(req.body)
  const result = await AuthService.login(data.email, data.password)

  res.cookie('token', result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })

  res.json({ user: result.user })
}))

// POST /auth/logout
router.post('/logout', (_req, res: Response) => {
  res.clearCookie('token')
  res.json({ message: 'Logged out successfully' })
})

// GET /auth/me
router.get('/me', authMiddleware, asyncHandler(async (req: AuthRequest, res: Response) => {
  const user = await AuthService.getMe(req.userId!)
  res.json({ user })
}))

export default router