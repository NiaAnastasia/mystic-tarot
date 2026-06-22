import { motion } from 'framer-motion'

interface Card {
  id: string
  nameEn: string
  nameRu: string
  imageUrl: string
  number: number
  arcana: string
}

interface Props {
  card?: Card
  isReversed?: boolean
  isFlipped?: boolean
  position?: string
  onClick?: () => void
  size?: 'sm' | 'md'
}

export const TarotCard = ({ card, isReversed, isFlipped, position, onClick, size = 'sm' }: Props) => {
  const dimensions = size === 'sm'
    ? { width: 70, height: 110 }
    : { width: 100, height: 160 }

  return (
    <div className="flex flex-col items-center gap-2">
      {position && (
        <p style={{ fontSize: '10px', letterSpacing: '0.12em', opacity: 0.45, textTransform: 'uppercase' }}>
          {position}
        </p>
      )}

      <motion.div
        onClick={onClick}
        className="relative cursor-pointer"
        style={{ width: dimensions.width, height: dimensions.height, perspective: 1000 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            transformStyle: 'preserve-3d',
          }}
          animate={{ rotateY: isFlipped ? 0 : 180 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Back of card */}
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              backgroundColor: 'var(--bg-surface)',
              border: '0.5px solid var(--border)',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CardBack />
          </div>

          {/* Front of card */}
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              backgroundColor: 'var(--bg-card)',
              border: '0.5px solid var(--border)',
              borderRadius: '6px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 4px',
              transform: isReversed ? 'rotate(180deg)' : undefined,
            }}
          >
            <p style={{ fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.6, textAlign: 'center' }}>
              {card?.nameEn}
            </p>
            <p style={{ fontSize: '32px', fontWeight: 300, opacity: 0.15 }}>
              {card?.number}
            </p>
            <p style={{ fontSize: '8px', opacity: 0.4, textAlign: 'center' }}>
              {card?.arcana}
            </p>
          </div>
        </motion.div>
      </motion.div>

      {card && isFlipped && (
        <p style={{ fontSize: '9px', opacity: 0.5, textAlign: 'center', maxWidth: dimensions.width }}>
          {isReversed ? '↓ reversed' : '↑ upright'}
        </p>
      )}
    </div>
  )
}

const CardBack = () => (
  <svg width="40" height="60" viewBox="0 0 40 60" fill="none">
    <circle cx="20" cy="30" r="15" stroke="rgba(200,191,255,0.2)" strokeWidth="0.5" />
    <circle cx="20" cy="30" r="10" stroke="rgba(200,191,255,0.15)" strokeWidth="0.5" />
    <circle cx="20" cy="30" r="5" stroke="rgba(200,191,255,0.1)" strokeWidth="0.5" />
    <line x1="20" y1="10" x2="20" y2="50" stroke="rgba(200,191,255,0.1)" strokeWidth="0.5" />
    <line x1="5" y1="30" x2="35" y2="30" stroke="rgba(200,191,255,0.1)" strokeWidth="0.5" />
  </svg>
)