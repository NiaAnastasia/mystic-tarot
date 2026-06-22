import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Button } from '../ui/Button'

interface Props {
  onSuccess: () => void
  onSwitch: () => void
}

export const LoginForm = ({ onSuccess, onSwitch }: Props) => {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      onSuccess()
    } catch {
      setError('Invalid email or password')
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
        Enter the Portal
      </h2>

      <div className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-transparent border-b border-[var(--border)] py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent)] transition-colors"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-transparent border-b border-[var(--border)] py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent)] transition-colors"
        />

        {error && <p className="text-red-400 text-xs">{error}</p>}

        <Button onClick={handleSubmit} disabled={loading} className="mt-4 w-full">
          {loading ? 'Entering...' : 'Enter'}
        </Button>

        <button
          onClick={onSwitch}
          className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors mt-2"
        >
          No account? Register
        </button>
      </div>
    </div>
  )
}