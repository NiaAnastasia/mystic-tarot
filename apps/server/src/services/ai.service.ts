import Anthropic from '@anthropic-ai/sdk'
import { Response } from 'express'
import { prisma } from '../prisma/client'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

interface CardForPrompt {
  nameEn: string
  nameRu: string
  position: string
  isReversed: boolean
  keywords: string[]
  meaningUpright: { keywords: string[]; description: string }
  meaningReversed: { keywords: string[]; description: string }
}

function buildPrompt(
  spreadType: string,
  cards: CardForPrompt[],
  question?: string
): string {
  const spreadDescriptions: Record<string, string> = {
    THREE_CARD: 'Three Card Spread (Past · Present · Future)',
    SINGLE: 'Single Card (Card of the Day)',
    HORSESHOE: 'Horseshoe Spread (7 cards)',
    CELTIC_CROSS: 'Celtic Cross Spread (10 cards)',
  }

  const cardsText = cards
    .map((c) => {
      const meaning = c.isReversed ? c.meaningReversed : c.meaningUpright
      return `- ${c.position}: ${c.nameEn} (${c.nameRu}) ${c.isReversed ? '[REVERSED]' : '[UPRIGHT]'}
  Keywords: ${meaning.keywords.join(', ')}
  Meaning: ${meaning.description}`
    })
    .join('\n')

  return `Spread type: ${spreadDescriptions[spreadType] || spreadType}
${question ? `Question: ${question}` : 'No specific question — general reading'}

Cards drawn:
${cardsText}

Please provide:
1. A brief overall overview of the spread
2. Interpretation of each card in its position
3. A final synthesis and practical insight`
}

export const AIService = {
  async streamInterpretation(
    readingId: string,
    res: Response
  ): Promise<void> {
    const reading = await prisma.reading.findUnique({
      where: { id: readingId },
      include: {
        cards: {
          include: { card: true },
          orderBy: { order: 'asc' },
        },
      },
    })

    if (!reading) throw new Error('Reading not found')

    if (reading.interpretation) {
      res.write(`data: ${JSON.stringify({ text: reading.interpretation, cached: true })}\n\n`)
      res.write('data: [DONE]\n\n')
      res.end()
      return
    }

    const cardsForPrompt: CardForPrompt[] = reading.cards.map((rc) => ({
      nameEn: rc.card.nameEn,
      nameRu: rc.card.nameRu,
      position: rc.position,
      isReversed: rc.isReversed,
      keywords: rc.card.keywords,
      meaningUpright: rc.card.meaningUpright as { keywords: string[]; description: string },
      meaningReversed: rc.card.meaningReversed as { keywords: string[]; description: string },
    }))

    const userMessage = buildPrompt(reading.spreadType, cardsForPrompt, reading.question ?? undefined)

    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    let fullText = ''

    const stream = client.messages.stream({
      model: 'claude-sonnet-4-6',
      max_tokens: 800,
      system: `You are a wise and neutral Tarot interpreter. You interpret cards objectively, without mystification. 
Your style is thoughtful, specific, and respectful. You do not predict the future as fact — you point to energies, tendencies, and possible paths. 
Use the card meanings, their positions in the spread, and the user's question. 
Respond in English. Length: 200–350 words.`,
      messages: [{ role: 'user', content: userMessage }],
    })

    stream.on('text', (text) => {
      fullText += text
      res.write(`data: ${JSON.stringify({ text })}\n\n`)
    })

    stream.on('finalMessage', async () => {
      await prisma.reading.update({
        where: { id: readingId },
        data: { interpretation: fullText },
      })
      res.write('data: [DONE]\n\n')
      res.end()
    })

    stream.on('error', (error) => {
      res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`)
      res.end()
    })
  },
}