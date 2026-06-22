export const SPREAD_TYPE = {
  THREE_CARD: 'THREE_CARD',
  CELTIC_CROSS: 'CELTIC_CROSS',
  SINGLE: 'SINGLE',
  HORSESHOE: 'HORSESHOE',
} as const

export const ARCANA = {
  MAJOR: 'MAJOR',
  MINOR: 'MINOR',
} as const

export const SUIT = {
  WANDS: 'WANDS',
  CUPS: 'CUPS',
  SWORDS: 'SWORDS',
  PENTACLES: 'PENTACLES',
} as const

export const TAROT_DECK_SIZE = 78

export const SPREAD_POSITIONS: Record<string, string[]> = {
  THREE_CARD: ['Past', 'Present', 'Future'],
  SINGLE: ['Card of the Day'],
  HORSESHOE: ['Past', 'Present', 'Hidden Influences', 'Obstacles', 'Environment', 'Advice', 'Outcome'],
  CELTIC_CROSS: ['Situation', 'Challenge', 'Past', 'Future', 'Goal', 'Foundation', 'Advice', 'External Influences', 'Hopes', 'Outcome'],
}
