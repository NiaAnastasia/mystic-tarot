import { Router, Response } from 'express'
import { z } from 'zod'
import { ReadingsService } from '../services/readings.service'
import { asyncHandler } from '../middleware/asyncHandler'
import { authMiddleware, AuthRequest } from '../middleware/auth'

const router = Router()

router.use(authMiddleware)

const cardInputSchema = z.object({
  cardId: z.string().uuid(),
  position: z.string(),
  isReversed: z.boolean(),
  order: z.number().int().min(0),
})

const createReadingSchema = z.object({
  spreadType: z.enum(['THREE_CARD', 'CELTIC_CROSS', 'SINGLE', 'HORSESHOE']),
  question: z.string().max(500).optional(),
  cards: z.array(cardInputSchema).min(1).max(10),
})

// POST /readings
router.post('/', asyncHandler(async (req: AuthRequest, res: Response) => {
  const data = createReadingSchema.parse(req.body)
  const reading = await ReadingsService.create(
    req.userId!,
    data.spreadType,
    data.cards,
    data.question
  )
  res.status(201).json(reading)
}))

// GET /readings
router.get('/', asyncHandler(async (req: AuthRequest, res: Response) => {
  const readings = await ReadingsService.getAll(req.userId!)
  res.json(readings)
}))

// GET /readings/:id
router.get('/:id', asyncHandler(async (req: AuthRequest, res: Response) => {
  const reading = await ReadingsService.getById(req.params.id, req.userId!)
  res.json(reading)
}))

// DELETE /readings/:id
router.delete('/:id', asyncHandler(async (req: AuthRequest, res: Response) => {
  await ReadingsService.delete(req.params.id, req.userId!)
  res.json({ message: 'Reading deleted' })
}))

export default router