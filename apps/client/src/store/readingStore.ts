import { create } from 'zustand'

interface CardInReading {
  cardId: string
  nameEn: string
  nameRu: string
  imageUrl: string
  position: string
  isReversed: boolean
  order: number
}

interface ReadingStore {
  spreadType: string
  question: string
  cards: CardInReading[]
  readingId: string | null
  interpretation: string
  isStreaming: boolean
  setSpreadType: (type: string) => void
  setQuestion: (q: string) => void
  addCard: (card: CardInReading) => void
  removeCard: (cardId: string) => void
  setCards: (cards: CardInReading[]) => void
  setReadingId: (id: string) => void
  appendInterpretation: (text: string) => void
  setIsStreaming: (v: boolean) => void
  reset: () => void
}

export const useReadingStore = create<ReadingStore>((set) => ({
  spreadType: 'THREE_CARD',
  question: '',
  cards: [],
  readingId: null,
  interpretation: '',
  isStreaming: false,
  setSpreadType: (spreadType) => set({ spreadType }),
  setQuestion: (question) => set({ question }),
  addCard: (card) => set((s) => ({ cards: [...s.cards, card] })),
  removeCard: (cardId) => set((s) => ({ cards: s.cards.filter((c) => c.cardId !== cardId) })),
  setCards: (cards) => set({ cards }),
  setReadingId: (readingId) => set({ readingId }),
  appendInterpretation: (text) => set((s) => ({ interpretation: s.interpretation + text })),
  setIsStreaming: (isStreaming) => set({ isStreaming }),
  reset: () => set({ spreadType: 'THREE_CARD', question: '', cards: [], readingId: null, interpretation: '', isStreaming: false }),
}))