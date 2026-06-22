import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Button } from '../ui/Button'

interface Props {
  onSuccess: () => void
  onSwitch: () => void
}

export const RegisterForm = ({ onSuccess, onSwitch }: Props) => {
  const { register } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setError('')
    setLoading(true)
    try {
      await register(email, password, name)
      onSuccess()
    } catch {
      setError('Registration failed. Try another email.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="glass p-8 w-full max-w-sm mx-auto" style={{ borderRadius: '6px' }}>
      <p style={{ fontSize: '10px', letterSpacing: '0.2em', opacity: 0.45, textTransform: 'uppercase', marginBottom: '24px' }}>
        Mystic Tarot
      </p>
      <h2 style={{ fontSize: '28px', fontWeight: 300, letterSpacing: '0.05em', marginBottom: '32px' }}>
        Begin Your Journey
      </h2>

      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-transparent border-b border-[var(--border)] py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent)] transition-colors"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-transparent border-b border-[var(--border)] py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent)] transition-colors"
        />
        <input
          type="password"
          placeholder="Password (min 6 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-transparent border-b border-[var(--border)] py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent)] transition-colors"
        />

        {error && <p className="text-red-400 text-xs">{error}</p>}

        <Button onClick={handleSubmit} disabled={loading} className="mt-4 w-full">
          {loading ? 'Creating...' : 'Create Account'}
        </Button>

        <button
          onClick={onSwitch}
          className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors mt-2"
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  )
}