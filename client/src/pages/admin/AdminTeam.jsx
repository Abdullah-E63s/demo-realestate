import { useState, useRef } from 'react'
import { Plus, Pencil, Trash2, X, Check, Upload, User, MessageCircle, Phone } from 'lucide-react'
import { AdminLayout } from './AdminDashboard'
import { useAgents, useCreateAgent, useUpdateAgent, useDeleteAgent } from '../../hooks/useAgents'
import { api } from '../../services/api'
import Button from '../../components/ui/Button'

const EMPTY_FORM = {
  name: '',
  role: '',
  phone: '+92 303 6570074',
  whatsapp: '923036570074',
  image: '',
  bio: '',
}

export default function AdminTeam() {
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef(null)

  const { data, isLoading } = useAgents()
  const agents = data?.data || []

  const create = useCreateAgent()
  const update = useUpdateAgent()
  const del = useDeleteAgent()

  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const openCreate = () => {
    setEditingId(null)
    setForm(EMPTY_FORM)
    setShowForm(true)
  }

  const openEdit = (agent) => {
    setEditingId(agent.id)
    setForm({
      name: agent.name || '',
      role: agent.role || '',
      phone: agent.phone || '',
      whatsapp: agent.whatsapp || '',
      image: agent.image || '',
      bio: agent.bio || '',
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
    <AdminLayout title="Team Members">
      {/* Action Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-sm font-semibold text-text-primary">Executive & Advisory Team</h2>
          <p className="text-xs text-text-muted">Manage team profiles, designations, WhatsApp contacts, and bios</p>
        </div>
        <Button onClick={openCreate}>
          <Plus size={14} />
          Add Member
        </Button>
      </div>

      {/* Team Table */}
      <div className="bg-bg-secondary border border-border overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-xs text-text-muted">Loading team members...</div>
        ) : agents.length === 0 ? (
          <div className="p-12 text-center text-xs text-text-muted">No team members found. Click "Add Member" to create one.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-bg-raised/50 text-[11px] uppercase tracking-wider text-text-muted">
                <tr>
                  <th className="py-3 px-4">Member</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Bio</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {agents.map((agent) => (
                  <tr key={agent.id} className="hover:bg-bg-raised/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={agent.image || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&q=80'}
                          alt={agent.name}
                          className="w-10 h-10 rounded-full object-cover border border-border shrink-0"
                        />
                        <div>
                          <p className="font-display font-semibold text-text-primary">{agent.name}</p>
                          <p className="text-xs text-text-muted">ID: #{agent.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-accent font-medium text-xs">
                      {agent.role}
                    </td>
                    <td className="py-3 px-4 text-xs space-y-1">
                      <div className="flex items-center gap-1.5 text-text-secondary">
                        <Phone size={11} className="text-text-muted" />
                        <span>{agent.phone}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#128C7E]">
                        <MessageCircle size={11} />
                        <span>+{agent.whatsapp}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-xs text-text-muted max-w-xs truncate">
                      {agent.bio || '—'}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(agent)}
                          className="p-1.5 text-text-muted hover:text-accent transition-colors"
                          title="Edit"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(agent)}
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
                {editingId ? 'Edit Team Member' : 'Add New Team Member'}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-text-muted hover:text-text-primary">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={submit} className="space-y-4">
              {/* Profile Image Dropzone */}
              <div>
                <label className="block text-xs font-medium uppercase tracking-wide text-text-muted mb-2">
                  Profile Picture
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border border-border bg-bg-raised shrink-0">
                    {form.image ? (
                      <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-text-muted">
                        <User size={24} />
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
                      {uploading ? 'Uploading...' : 'Click to Upload Profile Photo'}
                    </div>
                    <p className="text-[10px] text-text-muted mt-0.5">Supports PNG, JPG, WEBP</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wide text-text-muted mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => upd('name', e.target.value)}
                    placeholder="e.g. Kamran Sheikh"
                    className="input-field w-full px-3 py-2 text-sm rounded-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wide text-text-muted mb-1">
                    Role / Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.role}
                    onChange={(e) => upd('role', e.target.value)}
                    placeholder="e.g. Senior Property Advisor"
                    className="input-field w-full px-3 py-2 text-sm rounded-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wide text-text-muted mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.phone}
                    onChange={(e) => upd('phone', e.target.value)}
                    placeholder="+92 303 6570074"
                    className="input-field w-full px-3 py-2 text-sm rounded-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wide text-text-muted mb-1">
                    WhatsApp (Digits Only) *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.whatsapp}
                    onChange={(e) => upd('whatsapp', e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="923036570074"
                    className="input-field w-full px-3 py-2 text-sm rounded-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium uppercase tracking-wide text-text-muted mb-1">
                  Bio / Description
                </label>
                <textarea
                  rows={3}
                  value={form.bio}
                  onChange={(e) => upd('bio', e.target.value)}
                  placeholder="Specialist in DHA Lahore residential and commercial properties..."
                  className="input-field w-full px-3 py-2 text-sm rounded-xs resize-none"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-border">
                <Button type="submit" loading={create.isPending || update.isPending} className="flex-1">
                  <Check size={14} />
                  {editingId ? 'Update Member' : 'Add Team Member'}
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
            <h3 className="font-display font-bold text-base text-text-primary mb-2">Delete Team Member?</h3>
            <p className="text-xs text-text-muted mb-6">
              Are you sure you want to remove <strong className="text-text-primary">{deleteConfirm.name}</strong>? This action cannot be undone.
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
