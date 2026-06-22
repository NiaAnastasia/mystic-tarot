interface Props {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  variant?: 'primary' | 'ghost'
  disabled?: boolean
  className?: string
}

export const Button = ({ children, onClick, type = 'button', variant = 'primary', disabled, className }: Props) => {
  const base = 'px-6 py-2 text-xs tracking-widest uppercase transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed'
  const variants = {
    primary: 'bg-[var(--accent)] text-[var(--bg-primary)] hover:opacity-90',
    ghost: 'border border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)]',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className ?? ''}`}
    >
      {children}
    </button>
  )
}