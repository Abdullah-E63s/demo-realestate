import { useState } from 'react'
import { CalendarCheck, CheckCircle } from 'lucide-react'
import { useSubmitInquiry } from '../../hooks/useInquiries'
import Button from '../ui/Button'

export default function BookVisitForm({ propertyId, propertyTitle, onClose }) {
  const [form, setForm] = useState({ name: '', phone: '', date: '', message: '' })
  const [success, setSuccess] = useState(false)
  const { mutate, isPending } = useSubmitInquiry()

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const submit = (e) => {
    e.preventDefault()
    mutate(
      {
        name: form.name,
        phone: form.phone,
        email: 'not-provided@pkestate.pk',
        message: `Site visit request for ${form.date}. ${form.message}`,
        type: 'site-visit',
        propertyId,
      },
      { onSuccess: () => setSuccess(true) }
    )
  }

  return (
    <div className="bg-bg-secondary border border-border p-6 md:p-8">
      {success ? (
        <div className="text-center py-8">
          <CheckCircle size={36} className="text-status-available mx-auto mb-4" />
          <h3 className="font-display font-bold text-lg text-text-primary mb-2">Visit Booked!</h3>
          <p className="text-sm text-text-muted mb-6">We'll confirm your slot within 1 hour.</p>
          <Button variant="ghost" onClick={onClose}>Close</Button>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2 mb-5">
            <CalendarCheck size={18} className="text-accent" />
            <h3 className="font-display font-bold text-base text-text-primary">Book a Site Visit</h3>
          </div>
          {propertyTitle && (
            <p className="text-xs text-text-muted border-b border-border pb-4 mb-5">
              Property: <span className="text-text-secondary">{propertyTitle}</span>
            </p>
          )}

          <form onSubmit={submit} className="space-y-4">
            <Field label="Your Name" required>
              <input type="text" value={form.name} onChange={e => update('name', e.target.value)}
                placeholder="Ahmed Khan" className="input-field w-full px-4 py-3 text-sm rounded-sm" required />
            </Field>
            <Field label="Phone" required>
              <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)}
                placeholder="+92 300 0000000" className="input-field w-full px-4 py-3 text-sm rounded-sm" required />
            </Field>
            <Field label="Preferred Date" required>
              <input type="date" value={form.date} onChange={e => update('date', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="input-field w-full px-4 py-3 text-sm rounded-sm" required />
            </Field>
            <Field label="Additional Notes">
              <textarea value={form.message} onChange={e => update('message', e.target.value)}
                placeholder="Preferred time, any special requests..."
                rows={3} className="input-field w-full px-4 py-3 text-sm rounded-sm resize-none" />
            </Field>

            <div className="flex gap-3 pt-1">
              <Button type="submit" loading={isPending} className="flex-1">Confirm Visit</Button>
              <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
            </div>
          </form>
        </>
      )}
    </div>
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
