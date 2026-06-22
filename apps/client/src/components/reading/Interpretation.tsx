import { useReadingStore } from '../../store/readingStore'

export const Interpretation = () => {
  const { interpretation, isStreaming } = useReadingStore()

  if (!interpretation && !isStreaming) return null

  return (
    <div className="glass p-8 max-w-2xl mx-auto mt-8" style={{ borderRadius: '6px' }}>
      <p style={{ fontSize: '10px', letterSpacing: '0.2em', opacity: 0.45, textTransform: 'uppercase', marginBottom: '16px' }}>
        Interpretation
      </p>
      <p style={{ fontSize: '14px', fontWeight: 300, lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
        {interpretation}
        {isStreaming && <span className="animate-pulse">▌</span>}
      </p>
    </div>
  )
}