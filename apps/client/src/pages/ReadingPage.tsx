import { useState } from 'react'
import { useReadingStore } from '../store/readingStore'
import { SpreadSelector } from '../components/reading/SpreadSelector'
import { SpreadBoard } from '../components/reading/SpreadBoard'
import { Interpretation } from '../components/reading/Interpretation'

export const ReadingPage = () => {
  const { interpretation } = useReadingStore()
  const [step, setStep] = useState<'select' | 'board'>('select')

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <p style={{ fontSize: '10px', letterSpacing: '0.2em', opacity: 0.45, textTransform: 'uppercase' }}>
            Mystic Tarot
          </p>
          <h1 style={{ fontSize: '36px', fontWeight: 300, letterSpacing: '0.05em', marginTop: '8px' }}>
            Your Reading
          </h1>
        </div>

        {step === 'select' ? (
          <SpreadSelector onConfirm={() => setStep('board')} />
        ) : (
          <SpreadBoard />
        )}

        {interpretation && <Interpretation />}
      </div>
    </div>
  )
}