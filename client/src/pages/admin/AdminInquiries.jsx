import { useState } from 'react'
import { Inbox, Eye, Trash2, MessageCircle } from 'lucide-react'
import { AdminLayout } from './AdminDashboard'
import { useInquiries, useMarkInquiryRead, useDeleteInquiry } from '../../hooks/useInquiries'
import { formatDate, whatsappLink } from '../../utils/formatters'

export default function AdminInquiries() {
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState('all') // all | unread
  const [selected, setSelected] = useState(null)

  const params = {
    page,
    limit: 15,
    ...(filter === 'unread' ? { isRead: false } : {}),
  }

  const { data, isLoading } = useInquiries(params)
  const inquiries = data?.data || []
  const pagination = data?.pagination

  const markRead = useMarkInquiryRead()
  const del = useDeleteInquiry()

  const open = (inquiry) => {
    setSelected(inquiry)
    if (!inquiry.isRead) markRead.mutate(inquiry.id)
  }

  return (
    <AdminLayout title="Inquiries">
      <div className="flex gap-2 mb-6">
        {['all', 'unread'].map(f => (
          <button
            key={f}
            onClick={() => { setFilter(f); setPage(1) }}
            className={`px-4 py-2 text-xs font-medium border transition-colors ${
              filter === f ? 'border-accent text-accent bg-accent/10' : 'border-border text-text-muted'
            }`}
          >
            {f === 'all' ? 'All Inquiries' : 'Unread'}
          </button>
        ))}
        <span className="ml-auto text-xs text-text-muted self-center">
          {pagination?.total || 0} {filter === 'unread' ? 'unread' : 'total'}
        </span>
      </div>

      {isLoading ? (
        <div className="py-12 text-center text-text-muted text-sm">Loading...</div>
      ) : inquiries.length === 0 ? (
        <div className="py-24 text-center">
          <Inbox size={32} className="text-text-faint mx-auto mb-3" />
          <p className="text-text-muted text-sm">No inquiries yet</p>
        </div>
      ) : (
        <div className="bg-bg-secondary border border-border overflow-hidden">
          {inquiries.map((inq) => (
            <div
              key={inq.id}
              onClick={() => open(inq)}
              className={`border-b border-border last:border-0 px-5 py-4 cursor-none hover:bg-bg-raised transition-colors flex items-center gap-4 ${
                !inq.isRead ? 'border-l-2 border-l-accent' : ''
              }`}
            >
              {/* Unread dot */}
              <div className={`w-2 h-2 rounded-full shrink-0 ${!inq.isRead ? 'bg-accent' : 'bg-transparent'}`} />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-0.5">
                  <p className={`text-sm font-medium ${!inq.isRead ? 'text-text-primary' : 'text-text-secondary'}`}>
                    {inq.name}
                  </p>
                  {inq.property && (
                    <span className="text-[10px] text-accent bg-accent/10 px-2 py-0.5">
                      {inq.property.title?.slice(0, 30)}...
                    </span>
                  )}
                </div>
                <p className="text-xs text-text-muted truncate">{inq.message}</p>
              </div>

              <div className="text-right shrink-0">
                <p className="text-xs text-text-muted">{formatDate(inq.createdAt)}</p>
                <p className="text-xs text-accent mt-0.5">{inq.phone}</p>
              </div>

              <div className="flex gap-2 shrink-0">
                <a
                  href={whatsappLink(inq.phone, `Hi ${inq.name}, regarding your inquiry on PKEstate.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="p-1.5 text-[#128C7E] hover:bg-[#128C7E]/10 transition-colors"
                >
                  <MessageCircle size={14} />
                </a>
                <button
                  onClick={(e) => { e.stopPropagation(); del.mutate(inq.id) }}
                  className="p-1.5 text-text-muted hover:text-red-400 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

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

      {/* Detail panel */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-bg/80 flex items-center justify-center p-4">
          <div className="bg-bg-secondary border border-border w-full max-w-lg p-6">
            <div className="flex justify-between items-start mb-5">
              <div>
                <h3 className="font-display font-bold text-base text-text-primary">{selected.name}</h3>
                <p className="text-xs text-text-muted">{formatDate(selected.createdAt)}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-text-muted hover:text-text-primary text-xl">×</button>
            </div>

            <div className="space-y-3 text-sm mb-6">
              <Row label="Email" value={selected.email} />
              <Row label="Phone" value={selected.phone} />
              <Row label="Type" value={selected.type} />
              {selected.property && <Row label="Property" value={selected.property.title} />}
            </div>

            <div className="bg-bg-raised border border-border p-4 mb-6">
              <p className="text-xs text-text-muted mb-1 uppercase tracking-wide">Message</p>
              <p className="text-text-secondary text-sm leading-relaxed">{selected.message}</p>
            </div>

            <a
              href={whatsappLink(selected.phone, `Hi ${selected.name}, thank you for your inquiry on PKEstate. `)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#128C7E] text-white font-semibold text-sm py-3 w-full hover:bg-[#0a7060] transition-colors"
            >
              <MessageCircle size={14} />
              Reply via WhatsApp
            </a>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex gap-3">
      <span className="text-text-muted text-xs uppercase tracking-wide w-20 shrink-0">{label}</span>
      <span className="text-text-primary">{value || '—'}</span>
    </div>
  )
}
