import { Router, Response } from 'express'
import { z } from 'zod'
import { AIService } from '../services/ai.service'
import { asyncHandler } from '../middleware/asyncHandler'
import { authMiddleware, AuthRequest } from '../middleware/auth'

const router = Router()

router.use(authMiddleware)

const interpretSchema = z.object({
  readingId: z.string().uuid(),
})

// POST /interpret
router.post('/', asyncHandler(async (req: AuthRequest, res: Response) => {
  const { readingId } = interpretSchema.parse(req.body)
  await AIService.streamInterpretation(readingId, res)
}))

export default router