import { useState, useRef } from 'react'
import { Plus, Pencil, Trash2, X, Check, Upload, Star, MessageCircle, User } from 'lucide-react'
import { AdminLayout } from './AdminDashboard'
import { useTestimonials, useCreateTestimonial, useUpdateTestimonial, useDeleteTestimonial } from '../../hooks/useTestimonials'
import { api } from '../../services/api'
import Button from '../../components/ui/Button'

const EMPTY_FORM = {
  name: '',
  role: '',
  location: 'Lahore',
  image: '',
  quote: '',
  rating: 5,
  isFeatured: true,
}

export default function AdminTestimonials() {
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef(null)

  const { data, isLoading } = useTestimonials()
  const testimonials = data?.data || []

  const create = useCreateTestimonial()
  const update = useUpdateTestimonial()
  const del = useDeleteTestimonial()

  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const openCreate = () => {
    setEditingId(null)
    setForm(EMPTY_FORM)
    setShowForm(true)
  }

  const openEdit = (item) => {
    setEditingId(item.id)
    setForm({
      name: item.name || '',
      role: item.role || '',
      location: item.location || '',
      image: item.image || '',
      quote: item.quote || '',
      rating: item.rating || 5,
      isFeatured: item.isFeatured !== false,
    })
    setShowForm(true)
  }

  const handleImageFile = async (files) => {
    if (!files || files.length === 0) return
    setUploading(true)
    const file = files[0]

    try {
      const formData = new FormData()
      formData.append('images', file)
      const res = await api.post('/properties/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      if (res.data?.data && res.data.data.length > 0) {
        upd('image', res.data.data[0])
      }
    } catch (err) {
      console.warn('Fallback to local file data URI:', err)
      const reader = new FileReader()
      reader.onload = (e) => upd('image', e.target.result)
      reader.readAsDataURL(file)
    } finally {
      setUploading(false)
    }
  }

  const submit = (e) => {
    e.preventDefault()
    if (editingId) {
      update.mutate({ id: editingId, data: form }, { onSuccess: () => setShowForm(false) })
    } else {
      create.mutate(form, { onSuccess: () => setShowForm(false) })
    }
  }

  const confirmDelete = (id) => {
    del.mutate(id, { onSuccess: () => setDeleteConfirm(null) })
  }

  return (
    <AdminLayout title="Client Feedback & Testimonials">
      {/* Action Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-sm font-semibold text-text-primary">Client Reviews & Investor Feedback</h2>
          <p className="text-xs text-text-muted">Manage verified client testimonials displayed on the homepage</p>
        </div>
        <Button onClick={openCreate}>
          <Plus size={14} />
          Add Feedback
        </Button>
      </div>

      {/* Testimonials Table */}
      <div className="bg-bg-secondary border border-border overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-xs text-text-muted">Loading testimonials...</div>
        ) : testimonials.length === 0 ? (
          <div className="p-12 text-center text-xs text-text-muted">No testimonials found. Click "Add Feedback" to create one.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-bg-raised/50 text-[11px] uppercase tracking-wider text-text-muted">
                <tr>
                  <th className="py-3 px-4">Client</th>
                  <th className="py-3 px-4">Designation & City</th>
                  <th className="py-3 px-4">Quote</th>
                  <th className="py-3 px-4">Rating</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {testimonials.map((item) => (
                  <tr key={item.id} className="hover:bg-bg-raised/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=120&q=80'}
                          alt={item.name}
                          className="w-10 h-10 rounded-full object-cover border border-border shrink-0"
                        />
                        <div>
                          <p className="font-display font-semibold text-text-primary">{item.name}</p>
                          <p className="text-xs text-text-muted">ID: #{item.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-xs">
                      <p className="text-text-primary font-medium">{item.role}</p>
                      <p className="text-accent text-[11px]">{item.location || 'Pakistan'}</p>
                    </td>
                    <td className="py-3 px-4 text-xs text-text-secondary max-w-sm">
                      <p className="italic line-clamp-2">"{item.quote}"</p>
                    </td>
                    <td className="py-3 px-4 text-xs">
                      <div className="flex items-center gap-0.5 text-accent">
                        {[...Array(item.rating || 5)].map((_, i) => (
                          <Star key={i} size={11} fill="currentColor" />
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(item)}
                          className="p-1.5 text-text-muted hover:text-accent transition-colors"
                          title="Edit"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(item)}
                          className="p-1.5 text-text-muted hover:text-rose-400 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-bg/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-bg-secondary border border-border w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
              <h2 className="font-display font-bold text-lg text-text-primary">
                {editingId ? 'Edit Client Feedback' : 'Add Client Review'}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-text-muted hover:text-text-primary">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={submit} className="space-y-4">
              {/* Avatar Image */}
              <div>
                <label className="block text-xs font-medium uppercase tracking-wide text-text-muted mb-2">
                  Client Avatar / Photo
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden border border-border bg-bg-raised shrink-0">
                    {form.image ? (
                      <img src={form.image} alt="Client Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-text-muted">
                        <User size={20} />
                      </div>
                    )}
                  </div>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 border-2 border-dashed border-border hover:border-accent p-3 text-center cursor-pointer rounded-xs bg-bg-raised/40 transition-colors"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageFile(e.target.files)}
                      className="hidden"
                    />
                    <div className="flex items-center justify-center gap-2 text-xs font-semibold text-text-primary">
                      <Upload size={14} className="text-accent" />
                      {uploading ? 'Uploading...' : 'Click to Upload Avatar Photo'}
                    </div>
                    <p className="text-[10px] text-text-muted mt-0.5">Supports PNG, JPG, WEBP</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wide text-text-muted mb-1">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => upd('name', e.target.value)}
                    placeholder="e.g. Usman Iqbal"
                    className="input-field w-full px-3 py-2 text-sm rounded-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wide text-text-muted mb-1">
                    Role / Business Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.role}
                    onChange={(e) => upd('role', e.target.value)}
                    placeholder="e.g. Business Owner"
                    className="input-field w-full px-3 py-2 text-sm rounded-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wide text-text-muted mb-1">
                    City / Country
                  </label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => upd('location', e.target.value)}
                    placeholder="e.g. Lahore, Pakistan or Dubai, UAE"
                    className="input-field w-full px-3 py-2 text-sm rounded-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wide text-text-muted mb-1">
                    Star Rating (1 to 5)
                  </label>
                  <select
                    value={form.rating}
                    onChange={(e) => upd('rating', parseInt(e.target.value))}
                    className="input-field w-full px-3 py-2 text-sm rounded-xs"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                    <option value={3}>⭐⭐⭐ (3 Stars)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium uppercase tracking-wide text-text-muted mb-1">
                  Feedback Review / Quote *
                </label>
                <textarea
                  rows={4}
                  required
                  value={form.quote}
                  onChange={(e) => upd('quote', e.target.value)}
                  placeholder="PKEstate found us our dream plot in DHA Phase 6 within two weeks..."
                  className="input-field w-full px-3 py-2 text-sm rounded-xs resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={form.isFeatured}
                  onChange={(e) => upd('isFeatured', e.target.checked)}
                  className="accent-accent rounded-xs"
                />
                <label htmlFor="isFeatured" className="text-xs text-text-secondary select-none">
                  Display on Homepage Testimonials
                </label>
              </div>

              <div className="flex gap-3 pt-4 border-t border-border">
                <Button type="submit" loading={create.isPending || update.isPending} className="flex-1">
                  <Check size={14} />
                  {editingId ? 'Update Feedback' : 'Add Feedback'}
                </Button>
                <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-bg/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-bg-secondary border border-border p-6 max-w-sm w-full shadow-2xl">
            <h3 className="font-display font-bold text-base text-text-primary mb-2">Delete Client Feedback?</h3>
            <p className="text-xs text-text-muted mb-6">
              Are you sure you want to remove feedback from <strong className="text-text-primary">{deleteConfirm.name}</strong>?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => confirmDelete(deleteConfirm.id)}
                disabled={del.isPending}
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold py-2.5 rounded-xs transition-colors"
              >
                {del.isPending ? 'Deleting...' : 'Yes, Delete'}
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 bg-bg-raised hover:bg-bg-hover text-text-primary text-xs font-semibold py-2.5 rounded-xs transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
