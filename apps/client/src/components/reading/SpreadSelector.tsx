import { useReadingStore } from '../../store/readingStore'
import { Button } from '../ui/Button'

const SPREADS = [
  { type: 'SINGLE', name: 'Card of the Day', cards: 1, description: 'A single card for daily guidance' },
  { type: 'THREE_CARD', name: 'Three Cards', cards: 3, description: 'Past · Present · Future' },
  { type: 'HORSESHOE', name: 'Horseshoe', cards: 7, description: 'A deeper look at your situation' },
  { type: 'CELTIC_CROSS', name: 'Celtic Cross', cards: 10, description: 'The complete classic reading' },
]

interface Props {
  onConfirm: () => void
}

export const SpreadSelector = ({ onConfirm }: Props) => {
  const { spreadType, setSpreadType, question, setQuestion } = useReadingStore()

  return (
    <div className="flex flex-col gap-8 max-w-xl mx-auto">
      <div>
        <p style={{ fontSize: '10px', letterSpacing: '0.2em', opacity: 0.45, textTransform: 'uppercase', marginBottom: '16px' }}>
          Choose your spread
        </p>
        <div className="grid grid-cols-2 gap-3">
          {SPREADS.map((s) => (
            <div
              key={s.type}
              onClick={() => setSpreadType(s.type)}
              className="cursor-pointer p-4 transition-all duration-300"
              style={{
                border: `0.5px solid ${spreadType === s.type ? 'var(--accent)' : 'var(--border)'}`,
                borderRadius: '6px',
                backgroundColor: spreadType === s.type ? 'rgba(200,191,255,0.05)' : 'transparent',
              }}
            >
              <p style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px' }}>
                {s.name}
              </p>
              <p style={{ fontSize: '10px', opacity: 0.45 }}>{s.description}</p>
              <p style={{ fontSize: '10px', opacity: 0.3, marginTop: '8px' }}>{s.cards} cards</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p style={{ fontSize: '10px', letterSpacing: '0.2em', opacity: 0.45, textTransform: 'uppercase', marginBottom: '12px' }}>
          Your question (optional)
        </p>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="What guidance do you seek?"
          rows={3}
          className="w-full bg-transparent outline-none resize-none"
          style={{
            border: '0.5px solid var(--border)',
            borderRadius: '6px',
            padding: '12px',
            fontSize: '13px',
            fontWeight: 300,
            lineHeight: 1.7,
            color: 'var(--text-primary)',
          }}
        />
      </div>

      <Button onClick={onConfirm} className="w-full">
        Draw Cards
      </Button>
    </div>
  )
}