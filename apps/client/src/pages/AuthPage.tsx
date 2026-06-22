import { useState } from 'react'
import { LoginForm } from '../components/auth/LoginForm'
import { RegisterForm } from '../components/auth/RegisterForm'

interface Props {
  onSuccess: () => void
}

export const AuthPage = ({ onSuccess }: Props) => {
  const [mode, setMode] = useState<'login' | 'register'>('login')

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {mode === 'login' ? (
        <LoginForm onSuccess={onSuccess} onSwitch={() => setMode('register')} />
      ) : (
        <RegisterForm onSuccess={onSuccess} onSwitch={() => setMode('login')} />
      )}
    </div>
  )
}