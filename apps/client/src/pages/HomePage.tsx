import { useReadingStore } from '../store/readingStore'
import { Button } from '../components/ui/Button'

interface Props {
  onStartReading: () => void
}

export const HomePage = ({ onStartReading }: Props) => {
  const { reset } = useReadingStore()

  const handleStart = () => {
    reset()
    onStartReading()
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <p style={{ fontSize: '10px', letterSpacing: '0.2em', opacity: 0.45, textTransform: 'uppercase', marginBottom: '24px' }}>
        Ancient wisdom · Modern clarity
      </p>

      <h1 style={{ fontSize: '48px', fontWeight: 300, letterSpacing: '0.05em', marginBottom: '16px' }}>
        Mystic Tarot
      </h1>

      <p style={{ fontSize: '14px', fontWeight: 300, lineHeight: 1.7, opacity: 0.6, maxWidth: '400px', marginBottom: '48px' }}>
        A sacred space for reflection and insight. Draw cards, receive wisdom, understand your path.
      </p>

      <Button onClick={handleStart}>
        Begin Reading
      </Button>
    </div>
  )
}