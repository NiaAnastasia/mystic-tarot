import { useState } from 'react'
import { useAuth } from './hooks/useAuth'
import { HomePage } from './pages/HomePage'
import { ReadingPage } from './pages/ReadingPage'
import { AuthPage } from './pages/AuthPage'

type Page = 'home' | 'reading' | 'auth'

export const App = () => {
  const { user, isLoading, logout } = useAuth()
  const [page, setPage] = useState<Page>('home')

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p style={{ fontSize: '10px', letterSpacing: '0.2em', opacity: 0.45, textTransform: 'uppercase' }}>
          Loading...
        </p>
      </div>
    )
  }

  if (!user && page === 'reading') {
    return <AuthPage onSuccess={() => setPage('reading')} />
  }

  return (
    <div>
      {/* Navigation */}
      <nav className="fixed top-0 right-0 p-6 flex gap-6 z-50">
        {page !== 'home' && (
          <button
            onClick={() => setPage('home')}
            style={{ fontSize: '12px', letterSpacing: '0.08em', opacity: 0.4 }}
            className="hover:opacity-100 transition-opacity"
          >
            Home
          </button>
        )}
        {user ? (
          <>
            <button
              onClick={() => setPage('reading')}
              style={{ fontSize: '12px', letterSpacing: '0.08em', opacity: 0.4 }}
              className="hover:opacity-100 transition-opacity"
            >
              Reading
            </button>
            <button
              onClick={logout}
              style={{ fontSize: '12px', letterSpacing: '0.08em', opacity: 0.4 }}
              className="hover:opacity-100 transition-opacity"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => setPage('auth')}
            style={{ fontSize: '12px', letterSpacing: '0.08em', opacity: 0.4 }}
            className="hover:opacity-100 transition-opacity"
          >
            Login
          </button>
        )}
      </nav>

      {/* Pages */}
      {page === 'home' && <HomePage onStartReading={() => setPage('reading')} />}
      {page === 'reading' && <ReadingPage />}
      {page === 'auth' && <AuthPage onSuccess={() => setPage('home')} />}
    </div>
  )
}

export default App