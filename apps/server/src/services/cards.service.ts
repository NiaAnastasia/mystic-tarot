import { prisma } from '../prisma/client'

export const CardsService = {
  async getAll(filters: { suit?: string; arcana?: string; page?: number; limit?: number }) {
    const { suit, arcana, page = 1, limit = 20 } = filters
    const skip = (page - 1) * limit

    const where = {
      ...(suit && { suit: suit as any }),
      ...(arcana && { arcana: arcana as any }),
    }

    const [cards, total] = await Promise.all([
      prisma.card.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ arcana: 'asc' }, { number: 'asc' }],
      }),
      prisma.card.count({ where }),
    ])

    return { cards, total, page, limit, totalPages: Math.ceil(total / limit) }
  },

  async getById(id: string) {
    return prisma.card.findUnique({ where: { id } })
  },

  async getRandom(count: number) {
    const total = await prisma.card.count()
    const skip = Math.floor(Math.random() * (total - count))
    const cards = await prisma.card.findMany({ take: count, skip })
    return cards.map(card => ({
      ...card,
      isReversed: Math.random() < 0.5,
    }))
  },

  async search(q: string) {
    return prisma.card.findMany({
      where: {
        OR: [
          { nameEn: { contains: q, mode: 'insensitive' } },
          { nameRu: { contains: q, mode: 'insensitive' } },
          { keywords: { has: q.toLowerCase() } },
        ],
      },
      take: 10,
    })
  },
}