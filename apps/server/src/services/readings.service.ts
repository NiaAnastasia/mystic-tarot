import { prisma } from '../prisma/client'
import { SpreadType } from '@prisma/client'

interface CardInput {
  cardId: string
  position: string
  isReversed: boolean
  order: number
}

export const ReadingsService = {
  async create(userId: string, spreadType: SpreadType, cards: CardInput[], question?: string) {
    const reading = await prisma.reading.create({
      data: {
        userId,
        spreadType,
        question,
        cards: {
          create: cards,
        },
      },
      include: {
        cards: {
          include: { card: true },
          orderBy: { order: 'asc' },
        },
      },
    })
    return reading
  },

  async getAll(userId: string) {
    return prisma.reading.findMany({
      where: { userId },
      include: {
        cards: {
          include: { card: true },
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
  },

  async getById(id: string, userId: string) {
    const reading = await prisma.reading.findUnique({
      where: { id },
      include: {
        cards: {
          include: { card: true },
          orderBy: { order: 'asc' },
        },
      },
    })

    if (!reading) throw new Error('Reading not found')
    if (reading.userId !== userId) throw new Error('Forbidden')

    return reading
  },

  async delete(id: string, userId: string) {
    const reading = await prisma.reading.findUnique({ where: { id } })
    if (!reading) throw new Error('Reading not found')
    if (reading.userId !== userId) throw new Error('Forbidden')

    await prisma.reading.delete({ where: { id } })
  },

  async saveInterpretation(id: string, interpretation: string) {
    return prisma.reading.update({
      where: { id },
      data: { interpretation },
    })
  },
}