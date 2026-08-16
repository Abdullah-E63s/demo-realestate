import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'
import { useSubmitInquiry } from '../../hooks/useInquiries'
import Button from '../ui/Button'

export default function InquiryForm({ propertyId, propertyTitle }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [success, setSuccess] = useState(false)
  const { mutate, isPending, isError, error } = useSubmitInquiry()

  const update = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const submit = (e) => {
    e.preventDefault()
    mutate(
      { ...form, propertyId, type: 'general' },
      {
        onSuccess: () => {
          setSuccess(true)
          setForm({ name: '', email: '', phone: '', message: '' })
        },
      }
    )
  }

  if (success) {
    return (
      <div className="flex flex-col items-center gap-3 py-8 text-center">
        <CheckCircle size={32} className="text-status-available" />
        <p className="font-display font-bold text-lg text-text-primary">Inquiry Sent!</p>
        <p className="text-sm text-text-muted">We'll get back to you within 1 hour.</p>
        <button onClick={() => setSuccess(false)} className="text-xs text-accent mt-2">
          Send another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      {propertyTitle && (
        <p className="text-xs text-text-muted border-b border-border pb-3 mb-2">
          Inquiry for: <span className="text-text-primary">{propertyTitle}</span>
        </p>
      )}

      <div className="grid grid-cols-1 gap-4">
        <FormField label="Your Name" required>
          <input
            type="text"
            value={form.name}
            onChange={e => update('name', e.target.value)}
            placeholder="e.g. Ahmed Khan"
            className="input-field w-full px-4 py-3 text-sm rounded-sm"
            required
          />
        </FormField>

        <FormField label="Email">
          <input
            type="email"
            value={form.email}
            onChange={e => update('email', e.target.value)}
            placeholder="ahmed@example.com"
            className="input-field w-full px-4 py-3 text-sm rounded-sm"
          />
        </FormField>

        <FormField label="Phone" required>
          <input
            type="tel"
            value={form.phone}
            onChange={e => update('phone', e.target.value)}
            placeholder="+92 300 0000000"
            className="input-field w-full px-4 py-3 text-sm rounded-sm"
            required
          />
        </FormField>

        <FormField label="Message" required>
          <textarea
            value={form.message}
            onChange={e => update('message', e.target.value)}
            placeholder="I'm interested in this property..."
            rows={4}
            className="input-field w-full px-4 py-3 text-sm rounded-sm resize-none"
            required
          />
        </FormField>
      </div>

      {isError && (
        <p className="text-xs text-red-400">{error?.response?.data?.message || 'Failed to send. Try again.'}</p>
      )}

      <Button type="submit" loading={isPending} className="w-full">
        <Send size={14} />
        Send Inquiry
      </Button>
    </form>
  )
}

function FormField({ label, required, children }) {
  return (
    <div>
      <label className="block text-xs font-medium text-text-muted mb-1.5 uppercase tracking-wide">
        {label}{required && <span className="text-accent ml-0.5">*</span>}
      </label>
      {children}
    </div>
  )
}
