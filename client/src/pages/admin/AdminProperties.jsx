import { useState, useRef } from 'react'
import { Plus, Pencil, Trash2, X, Check, Upload, Image as ImageIcon, Sparkles } from 'lucide-react'
import { AdminLayout } from './AdminDashboard'
import { useProperties, useCreateProperty, useUpdateProperty, useDeleteProperty } from '../../hooks/useProperties'
import { TypeBadge, StatusBadge } from '../../components/ui/Badge'
import { formatSize } from '../../utils/formatters'
import { api } from '../../services/api'
import Button from '../../components/ui/Button'

const EMPTY_FORM = {
  title: '', slug: '', type: 'Residential Plot', status: 'Available',
  price: '', priceLabel: '', size: '', sizeUnit: 'Marla',
  society: '', phase: '', location: '', description: '',
  features: '', images: [], isFeatured: false,
}

export default function AdminProperties() {
  const [page, setPage] = useState(1)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef(null)

  const { data, isLoading } = useProperties({ page, limit: 10 })
  const properties = data?.data || []
  const pagination = data?.pagination

  const create = useCreateProperty()
  const update = useUpdateProperty()
  const del = useDeleteProperty()

  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const openCreate = () => {
    setEditingId(null)
    setForm(EMPTY_FORM)
    setShowForm(true)
  }

  const openEdit = (p) => {
    setEditingId(p.id)
    setForm({
      title: p.title, slug: p.slug, type: p.type, status: p.status,
      price: p.price, priceLabel: p.priceLabel, size: p.size, sizeUnit: p.sizeUnit,
      society: p.society, phase: p.phase || '', location: p.location,
      description: p.description,
      features: Array.isArray(p.features) ? p.features.join('\n') : '',
      images: Array.isArray(p.images) ? p.images : (typeof p.images === 'string' ? JSON.parse(p.images || '[]') : []),
      isFeatured: p.isFeatured,
    })
    setShowForm(true)
  }

  const handleImageFiles = async (files) => {
    if (!files || files.length === 0) return
    setUploading(true)

    try {
      // 1. Try uploading to backend /api/properties/upload
      const formData = new FormData()
      Array.from(files).forEach(file => formData.append('images', file))

      const res = await api.post('/properties/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      if (res.data?.data && res.data.data.length > 0) {
        upd('images', [...(form.images || []), ...res.data.data])
      }
    } catch (err) {
      console.warn('Backend upload fallback to local data URLs:', err)
      // 2. Fallback: Convert to Data URLs for instant client-side preview & storage
      const dataUrlPromises = Array.from(files).map(file => {
        return new Promise((resolve) => {
          const reader = new FileReader()
          reader.onload = (e) => resolve(e.target.result)
          reader.readAsDataURL(file)
        })
      })
      const dataUrls = await Promise.all(dataUrlPromises)
      upd('images', [...(form.images || []), ...dataUrls])
    } finally {
      setUploading(false)
    }
  }

  const removeImage = (indexToRemove) => {
    upd('images', form.images.filter((_, idx) => idx !== indexToRemove))
  }

  const submit = (e) => {
    e.preventDefault()
    const payload = {
      ...form,
      price: parseFloat(form.price),
      size: parseFloat(form.size),
      features: typeof form.features === 'string' ? form.features.split('\n').filter(Boolean) : form.features,
      images: form.images || [],
    }
    if (editingId) {
      update.mutate({ id: editingId, data: payload }, { onSuccess: () => setShowForm(false) })
    } else {
      create.mutate(payload, { onSuccess: () => setShowForm(false) })
    }
  }

  const confirmDelete = (id) => {
    del.mutate(id, { onSuccess: () => setDeleteConfirm(null) })
  }

  return (
    <AdminLayout title="Properties">
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-text-muted">{pagination?.total || 0} total properties</p>
        <Button onClick={openCreate} size="sm">
          <Plus size={14} />
          Add Property
        </Button>
      </div>

      {/* Table */}
      <div className="bg-bg-secondary border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              {['Title', 'Type', 'Society', 'Price', 'Size', 'Status', 'Actions'].map(h => (
                <th key={h} className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-text-muted text-xs">Loading...</td></tr>
            ) : properties.map(p => (
              <tr key={p.id} className="border-b border-border hover:bg-bg-raised transition-colors">
                <td className="px-4 py-3">
                  <p className="text-text-primary font-medium text-xs line-clamp-1 max-w-[200px]">{p.title}</p>
                  {p.isFeatured && <span className="text-[10px] text-accent">★ Featured</span>}
                </td>
                <td className="px-4 py-3"><TypeBadge type={p.type} /></td>
                <td className="px-4 py-3 text-text-muted text-xs">{p.society}</td>
                <td className="px-4 py-3 text-accent font-semibold text-xs">{p.priceLabel}</td>
                <td className="px-4 py-3 text-text-muted text-xs">{formatSize(p.size, p.sizeUnit)}</td>
                <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(p)} className="text-text-muted hover:text-accent transition-colors p-1">
                      <Pencil size={13} />
                    </button>
                    <button onClick={() => setDeleteConfirm(p.id)} className="text-text-muted hover:text-red-400 transition-colors p-1">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && pagination.pages > 1 && (
        <div className="flex gap-2 mt-4">
          {[...Array(pagination.pages)].map((_, i) => (
            <button key={i} onClick={() => setPage(i + 1)}
              className={`w-8 h-8 text-xs border transition-colors ${page === i + 1 ? 'border-accent text-accent' : 'border-border text-text-muted'}`}>
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-bg/80 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-bg-secondary border border-border w-full max-w-2xl mt-8 mb-8">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 className="font-display font-bold text-base text-text-primary">
                {editingId ? 'Edit Property' : 'Add Property'}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-text-muted hover:text-text-primary">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={submit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Title" required>
                  <input value={form.title} onChange={e => { upd('title', e.target.value); upd('slug', e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')) }}
                    className="input-field w-full px-3 py-2 text-sm rounded-sm" required />
                </Field>
                <Field label="Slug" required>
                  <input value={form.slug} onChange={e => upd('slug', e.target.value)}
                    className="input-field w-full px-3 py-2 text-sm rounded-sm" required />
                </Field>
                <Field label="Type">
                  <select value={form.type} onChange={e => upd('type', e.target.value)} className="input-field w-full px-3 py-2 text-sm rounded-sm">
                    {['Residential Plot', 'Commercial Plot', 'File', 'House', 'Villa', 'Apartment', 'Farm House'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </Field>
                <Field label="Status">
                  <select value={form.status} onChange={e => upd('status', e.target.value)} className="input-field w-full px-3 py-2 text-sm rounded-sm">
                    {['Available', 'Sold', 'Reserved'].map(s => <option key={s}>{s}</option>)}
                  </select>
                </Field>
                <Field label="Price (PKR)" required>
                  <input type="number" value={form.price} onChange={e => upd('price', e.target.value)}
                    placeholder="18500000" className="input-field w-full px-3 py-2 text-sm rounded-sm" required />
                </Field>
                <Field label="Price Label" required>
                  <input value={form.priceLabel} onChange={e => upd('priceLabel', e.target.value)}
                    placeholder="PKR 1.85 Crore" className="input-field w-full px-3 py-2 text-sm rounded-sm" required />
                </Field>
                <Field label="Size" required>
                  <input type="number" value={form.size} onChange={e => upd('size', e.target.value)}
                    className="input-field w-full px-3 py-2 text-sm rounded-sm" required />
                </Field>
                <Field label="Unit">
                  <select value={form.sizeUnit} onChange={e => upd('sizeUnit', e.target.value)} className="input-field w-full px-3 py-2 text-sm rounded-sm">
                    <option>Marla</option><option>Kanal</option>
                  </select>
                </Field>
                <Field label="Society" required>
                  <input value={form.society} onChange={e => upd('society', e.target.value)}
                    placeholder="DHA Lahore" className="input-field w-full px-3 py-2 text-sm rounded-sm" required />
                </Field>
                <Field label="Phase">
                  <input value={form.phase} onChange={e => upd('phase', e.target.value)}
                    placeholder="Phase 6" className="input-field w-full px-3 py-2 text-sm rounded-sm" />
                </Field>
              </div>

              <Field label="Location" required>
                <input value={form.location} onChange={e => upd('location', e.target.value)}
                  placeholder="Block E, DHA Phase 6, Lahore" className="input-field w-full px-3 py-2 text-sm rounded-sm" required />
              </Field>

              <Field label="Description" required>
                <textarea value={form.description} onChange={e => upd('description', e.target.value)}
                  rows={4} className="input-field w-full px-3 py-2 text-sm rounded-sm resize-none" required />
              </Field>

              <Field label="Features (one per line)">
                <textarea value={form.features} onChange={e => upd('features', e.target.value)}
                  placeholder="Corner Plot&#10;Level Ground&#10;All Utilities Connected"
                  rows={4} className="input-field w-full px-3 py-2 text-sm rounded-sm resize-none font-mono text-xs" />
              </Field>

              <div>
                <label className="block text-xs font-medium uppercase tracking-wide text-text-muted mb-2">
                  Property Images {form.images?.length > 0 && `(${form.images.length})`}
                </label>

                {/* Upload dropzone */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); e.stopPropagation() }}
                  onDrop={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                      handleImageFiles(e.dataTransfer.files)
                    }
                  }}
                  className="border-2 border-dashed border-border hover:border-accent bg-bg-raised/50 hover:bg-bg-raised transition-all p-6 text-center cursor-pointer rounded-sm group mb-4"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleImageFiles(e.target.files)}
                    className="hidden"
                  />
                  <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    {uploading ? (
                      <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Upload size={18} />
                    )}
                  </div>
                  <p className="text-sm font-display font-semibold text-text-primary mb-1">
                    {uploading ? 'Uploading images...' : 'Click to Upload or Drag & Drop'}
                  </p>
                  <p className="text-xs text-text-muted">
                    Supports PNG, JPG, WEBP (up to 10MB each)
                  </p>
                </div>

                {/* Thumbnails list */}
                {form.images?.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-4">
                    {form.images.map((imgUrl, idx) => (
                      <div key={idx} className="relative group aspect-[4/3] rounded-sm overflow-hidden border border-border bg-bg-raised">
                        <img
                          src={imgUrl}
                          alt={`Uploaded ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                        {idx === 0 && (
                          <span className="absolute top-1 left-1 bg-accent text-bg text-[9px] font-bold px-1.5 py-0.5 rounded-xs tracking-wider uppercase">
                            Cover
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <label className="flex items-center gap-2 text-sm text-text-secondary">
                <input type="checkbox" checked={form.isFeatured} onChange={e => upd('isFeatured', e.target.checked)} className="accent-amber-500" />
                Featured Listing
              </label>

              <div className="flex gap-3 pt-2">
                <Button type="submit" loading={create.isPending || update.isPending} className="flex-1">
                  <Check size={14} />
                  {editingId ? 'Update Property' : 'Create Property'}
                </Button>
                <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-bg/80 flex items-center justify-center p-4">
          <div className="bg-bg-secondary border border-border p-6 max-w-sm w-full">
            <h3 className="font-display font-bold text-base text-text-primary mb-2">Delete Property?</h3>
            <p className="text-text-muted text-sm mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <Button variant="danger" onClick={() => confirmDelete(deleteConfirm)} loading={del.isPending} className="flex-1">
                Delete
              </Button>
              <Button variant="secondary" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

function Field({ label, required, children }) {
  return (
    <div>
      <label className="block text-xs font-medium uppercase tracking-wide text-text-muted mb-1">
        {label}{required && <span className="text-accent ml-0.5">*</span>}
      </label>
      {children}
    </div>
  )
}
