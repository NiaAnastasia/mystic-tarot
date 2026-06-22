export type Arcana = 'MAJOR' | 'MINOR'
export type Suit = 'WANDS' | 'CUPS' | 'SWORDS' | 'PENTACLES'
export type SpreadType = 'THREE_CARD' | 'CELTIC_CROSS' | 'SINGLE' | 'HORSESHOE'

export interface Card {
  id: string
  nameRu: string
  nameEn: string
  arcana: Arcana
  suit: Suit | null
  number: number
  meaningUpright: { keywords: string[]; description: string }
  meaningReversed: { keywords: string[]; description: string }
  description: string
  imageUrl: string
  keywords: string[]
}

export interface ReadingCard {
  cardId: string
  card?: Card
  position: string
  isReversed: boolean
}

export interface Reading {
  id: string
  userId: string
  spreadType: SpreadType
  question?: string
  cardsDrawn: ReadingCard[]
  interpretation?: string
  createdAt: string
}

export interface User {
  id: string
  email: string
  name: string
  createdAt: string
}
