import { motion } from 'framer-motion'

const variants = {
  primary: 'bg-accent text-bg hover:bg-accent-dark',
  secondary: 'bg-transparent text-text-primary border border-border hover:border-accent hover:text-accent',
  ghost: 'bg-transparent text-text-secondary hover:text-text-primary hover:bg-bg-raised',
  danger: 'bg-transparent text-red-400 border border-red-400/30 hover:bg-red-400/10',
}

const sizes = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-sm',
  xl: 'px-10 py-5 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  loading = false,
  as: Tag = 'button',
  href,
  ...props
}) {
  const base = 'inline-flex items-center justify-center gap-2 font-display font-semibold tracking-wide transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none select-none'
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  if (Tag === 'a' || href) {
    return (
      <motion.a
        href={href}
        className={cls}
        whileHover={{ scale: disabled ? 1 : 1.01 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        {...props}
      >
        {loading ? <Spinner /> : children}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={cls}
      whileHover={{ scale: disabled ? 1 : 1.01 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      {...props}
    >
      {loading ? <Spinner /> : children}
    </motion.button>
  )
}

function Spinner() {
  return (
    <svg
      className="animate-spin"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  )
}
