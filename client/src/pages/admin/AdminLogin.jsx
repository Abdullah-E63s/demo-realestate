import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import LoginForm from '../../components/forms/LoginForm'

export default function AdminLogin() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) navigate('/admin/dashboard')
  }, [isAuthenticated])

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="font-display font-bold text-2xl tracking-tight text-text-primary mb-1">
            PK<span className="text-accent">estate</span>
          </h1>
          <p className="text-xs text-text-muted tracking-widest uppercase">Admin Dashboard</p>
        </div>

        <div className="bg-bg-secondary border border-border p-8">
          <h2 className="font-display font-bold text-lg text-text-primary mb-6">Sign In</h2>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
