import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'
import { useSubmitInquiry } from '../../hooks/useInquiries'
import Button from '../ui/Button'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [success, setSuccess] = useState(false)
  const { mutate, isPending, isError } = useSubmitInquiry()

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const submit = (e) => {
    e.preventDefault()
    mutate(
      { ...form, type: 'general' },
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
      <div className="py-16 text-center">
        <CheckCircle size={40} className="text-status-available mx-auto mb-4" />
        <h3 className="font-display font-bold text-xl text-text-primary mb-2">Message Received</h3>
        <p className="text-text-muted text-sm">Our team will reach out within 1 business day.</p>
        <button onClick={() => setSuccess(false)} className="text-xs text-accent mt-6 block mx-auto">Send another →</button>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Full Name" required>
          <input
            type="text"
            value={form.name}
            onChange={e => update('name', e.target.value)}
            placeholder="Your name"
            className="input-field w-full px-4 py-3.5 text-sm rounded-sm"
            required
          />
        </Field>
        <Field label="Phone" required>
          <input
            type="tel"
            value={form.phone}
            onChange={e => update('phone', e.target.value)}
            placeholder="+92 300 0000000"
            className="input-field w-full px-4 py-3.5 text-sm rounded-sm"
            required
          />
        </Field>
      </div>
      <Field label="Email">
        <input
          type="email"
          value={form.email}
          onChange={e => update('email', e.target.value)}
          placeholder="your@email.com"
          className="input-field w-full px-4 py-3.5 text-sm rounded-sm"
        />
      </Field>
      <Field label="Message" required>
        <textarea
          value={form.message}
          onChange={e => update('message', e.target.value)}
          placeholder="Tell us what you're looking for..."
          rows={5}
          className="input-field w-full px-4 py-3.5 text-sm rounded-sm resize-none"
          required
        />
      </Field>

      {isError && <p className="text-xs text-red-400">Failed to send. Please try again or contact via WhatsApp.</p>}

      <Button type="submit" loading={isPending} size="lg" className="w-full">
        <Send size={14} />
        Send Message
      </Button>
    </form>
  )
}

function Field({ label, required, children }) {
  return (
    <div>
      <label className="block text-xs font-medium uppercase tracking-wide text-text-muted mb-1.5">
        {label}{required && <span className="text-accent ml-0.5">*</span>}
      </label>
      {children}
    </div>
  )
}
