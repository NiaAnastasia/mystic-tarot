import { Router, Request, Response } from 'express'
import { CardsService } from '../services/cards.service'

const router = Router()

// GET /cards
router.get('/', async (req: Request, res: Response) => {
  try {
    const { suit, arcana, page, limit } = req.query
    const result = await CardsService.getAll({
      suit: suit as string,
      arcana: arcana as string,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    })
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cards' })
  }
})

// GET /cards/random
router.get('/random', async (req: Request, res: Response) => {
  try {
    const count = Number(req.query.count) || 3
    const cards = await CardsService.getRandom(count)
    res.json(cards)
  } catch (error) {
    res.status(500).json({ error: 'Failed to get random cards' })
  }
})

// GET /cards/search
router.get('/search', async (req: Request, res: Response) => {
  try {
    const q = req.query.q as string
    if (!q) return res.status(400).json({ error: 'Query parameter q is required' })
    const cards = await CardsService.search(q)
    res.json(cards)
  } catch (error) {
    res.status(500).json({ error: 'Failed to search cards' })
  }
})

// GET /cards/:id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const card = await CardsService.getById(req.params.id)
    if (!card) return res.status(404).json({ error: 'Card not found' })
    res.json(card)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch card' })
  }
})

export default router