import { useState, useRef } from 'react'
import { Plus, Pencil, Trash2, X, Check, Upload, Youtube, Video, Eye } from 'lucide-react'
import { AdminLayout } from './AdminDashboard'
import { useNews, useCreateNews, useUpdateNews, useDeleteNews } from '../../hooks/useNews'
import { api } from '../../services/api'
import Button from '../../components/ui/Button'

const EMPTY_FORM = {
  title: '',
  subtitle: '',
  category: 'Market Update',
  youtubeUrl: '',
  image: '',
  description: '',
  readTime: '10 min watch',
  isLive: false,
}

export default function AdminNews() {
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef(null)

  const { data, isLoading } = useNews()
  const newsList = data?.data || []

  const create = useCreateNews()
  const update = useUpdateNews()
  const del = useDeleteNews()

  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const openCreate = () => {
    setEditingId(null)
    setForm(EMPTY_FORM)
    setShowForm(true)
  }

  const openEdit = (item) => {
    setEditingId(item.id)
    setForm({
      title: item.title || '',
      subtitle: item.subtitle || '',
      category: item.category || 'Market Update',
      youtubeUrl: item.youtubeUrl || '',
      image: item.image || '',
      description: item.description || '',
      readTime: item.readTime || '10 min watch',
      isLive: item.isLive || false,
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
    <AdminLayout title="Latest News & Video Updates">
      {/* Action Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-sm font-semibold text-text-primary">Market Insights & YouTube Analysis</h2>
          <p className="text-xs text-text-muted">Publish editorial market updates, video breakdowns, and society news</p>
        </div>
        <Button onClick={openCreate}>
          <Plus size={14} />
          Publish Update
        </Button>
      </div>

      {/* News Table */}
      <div className="bg-bg-secondary border border-border overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-xs text-text-muted">Loading news updates...</div>
        ) : newsList.length === 0 ? (
          <div className="p-12 text-center text-xs text-text-muted">No news items found. Click "Publish Update" to create one.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-bg-raised/50 text-[11px] uppercase tracking-wider text-text-muted">
                <tr>
                  <th className="py-3 px-4">Article / Video</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Media</th>
                  <th className="py-3 px-4">Duration</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {newsList.map((item) => (
                  <tr key={item.id} className="hover:bg-bg-raised/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&q=80'}
                          alt={item.title}
                          className="w-16 h-12 object-cover border border-border shrink-0 rounded-xs"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-display font-semibold text-text-primary text-sm line-clamp-1">{item.title}</p>
                            {item.isLive && (
                              <span className="bg-rose-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-xs uppercase tracking-wider">
                                Live
                              </span>
                            )}
                          </div>
                          {item.subtitle && <p className="text-xs text-text-muted line-clamp-1">{item.subtitle}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-xs font-medium text-accent">
                      {item.category}
                    </td>
                    <td className="py-3 px-4 text-xs">
                      {item.youtubeUrl ? (
                        <a
                          href={item.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-red-400 hover:text-red-300 font-medium"
                        >
                          <Youtube size={14} />
                          <span>YouTube Video</span>
                        </a>
                      ) : (
                        <span className="text-text-muted">Editorial Only</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-xs text-text-muted">
                      {item.readTime || '5 min watch'}
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
                {editingId ? 'Edit News Update' : 'Publish New Update'}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-text-muted hover:text-text-primary">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={submit} className="space-y-4">
              {/* Cover Image */}
              <div>
                <label className="block text-xs font-medium uppercase tracking-wide text-text-muted mb-2">
                  Cover Image
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-16 rounded-xs overflow-hidden border border-border bg-bg-raised shrink-0">
                    {form.image ? (
                      <img src={form.image} alt="Cover Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-text-muted">
                        <Video size={20} />
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
                      {uploading ? 'Uploading...' : 'Click to Upload Cover Image'}
                    </div>
                    <p className="text-[10px] text-text-muted mt-0.5">Recommended: 1200x800 resolution</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium uppercase tracking-wide text-text-muted mb-1">
                  Main Headline / Title *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => upd('title', e.target.value)}
                  placeholder="e.g. DHA Phase 9 Prism: Why Now?"
                  className="input-field w-full px-3 py-2 text-sm rounded-xs"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wide text-text-muted mb-1">
                    Subtitle / Tagline
                  </label>
                  <input
                    type="text"
                    value={form.subtitle}
                    onChange={(e) => upd('subtitle', e.target.value)}
                    placeholder="e.g. Latest Market Analysis & File Projections"
                    className="input-field w-full px-3 py-2 text-sm rounded-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wide text-text-muted mb-1">
                    Category *
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => upd('category', e.target.value)}
                    className="input-field w-full px-3 py-2 text-sm rounded-xs"
                  >
                    <option>Market Update</option>
                    <option>Commercial Analysis</option>
                    <option>DHA Insights</option>
                    <option>Bahria Town Update</option>
                    <option>Development Update</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wide text-text-muted mb-1">
                    YouTube Video URL
                  </label>
                  <input
                    type="url"
                    value={form.youtubeUrl}
                    onChange={(e) => upd('youtubeUrl', e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="input-field w-full px-3 py-2 text-sm rounded-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wide text-text-muted mb-1">
                    Read / Watch Duration
                  </label>
                  <input
                    type="text"
                    value={form.readTime}
                    onChange={(e) => upd('readTime', e.target.value)}
                    placeholder="e.g. 15 min watch"
                    className="input-field w-full px-3 py-2 text-sm rounded-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium uppercase tracking-wide text-text-muted mb-1">
                  Description / Editorial Summary *
                </label>
                <textarea
                  rows={4}
                  required
                  value={form.description}
                  onChange={(e) => upd('description', e.target.value)}
                  placeholder="Detailed breakdown of the market trend, price trajectory, and key recommendations..."
                  className="input-field w-full px-3 py-2 text-sm rounded-xs resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isLive"
                  checked={form.isLive}
                  onChange={(e) => upd('isLive', e.target.checked)}
                  className="accent-rose-600 rounded-xs"
                />
                <label htmlFor="isLive" className="text-xs text-text-secondary select-none">
                  Mark as <strong className="text-rose-400 font-semibold">LIVE / Breaking Update</strong>
                </label>
              </div>

              <div className="flex gap-3 pt-4 border-t border-border">
                <Button type="submit" loading={create.isPending || update.isPending} className="flex-1">
                  <Check size={14} />
                  {editingId ? 'Update News Item' : 'Publish Update'}
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
            <h3 className="font-display font-bold text-base text-text-primary mb-2">Delete News Update?</h3>
            <p className="text-xs text-text-muted mb-6">
              Are you sure you want to remove <strong className="text-text-primary">{deleteConfirm.title}</strong>?
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
