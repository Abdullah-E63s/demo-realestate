import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Lock, Mail, Eye, EyeOff } from 'lucide-react'
import Button from '../ui/Button'

export default function LoginForm() {
  const [form, setForm] = useState({ email: 'admin@pkestate.pk', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form.email, form.password)
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div>
        <label className="block text-xs uppercase tracking-wide text-text-muted mb-1.5">
          Email
        </label>
        <div className="relative">
          <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="email"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            className="input-field w-full pl-10 pr-4 py-3.5 text-sm rounded-sm"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wide text-text-muted mb-1.5">
          Password
        </label>
        <div className="relative">
          <Lock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type={showPw ? 'text' : 'password'}
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            placeholder="••••••••"
            className="input-field w-full pl-10 pr-12 py-3.5 text-sm rounded-sm"
            required
          />
          <button
            type="button"
            onClick={() => setShowPw(!showPw)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
          >
            {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        </div>
      </div>

      {error && (
        <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 px-3 py-2 rounded-sm">
          {error}
        </p>
      )}

      <Button type="submit" loading={loading} className="w-full" size="lg">
        Sign In to Admin
      </Button>

      <p className="text-xs text-text-muted text-center pt-1">
        Default: admin@pkestate.pk / pkestate123
      </p>
    </form>
  )
}
