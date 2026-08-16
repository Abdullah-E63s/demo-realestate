import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useEffect } from 'react'
import { Home, List, MessageSquare, LogOut, BarChart3 } from 'lucide-react'
import { usePropertyStats } from '../../hooks/useProperties'
import { useInquiries } from '../../hooks/useInquiries'

const NAV = [
  { to: '/admin/dashboard', icon: BarChart3, label: 'Dashboard' },
  { to: '/admin/properties', icon: List, label: 'Properties' },
  { to: '/admin/inquiries', icon: MessageSquare, label: 'Inquiries' },
]

function AdminLayout({ children, title }) {
  const { user, logout, isAuthenticated, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!loading && !isAuthenticated) navigate('/admin')
  }, [isAuthenticated, loading])

  if (loading) return <div className="min-h-screen bg-bg flex items-center justify-center"><div className="w-6 h-6 border border-border border-t-accent rounded-full animate-spin" /></div>
  if (!isAuthenticated) return null

  return (
    <div className="min-h-screen bg-bg flex">
      {/* Sidebar */}
      <aside className="w-56 border-r border-border bg-bg-secondary flex flex-col shrink-0">
        <div className="p-5 border-b border-border">
          <p className="font-display font-bold text-base">PK<span className="text-accent">estate</span></p>
          <p className="text-[10px] text-text-muted mt-0.5 uppercase tracking-widest">Admin</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {NAV.map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors ${
                location.pathname === to
                  ? 'bg-accent/10 text-accent border-r-2 border-accent'
                  : 'text-text-muted hover:text-text-primary hover:bg-bg-raised'
              }`}
            >
              <Icon size={15} />
              {label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-border">
          <p className="text-xs text-text-muted mb-3 px-3">{user?.email}</p>
          <Link to="/" className="flex items-center gap-2 px-3 py-2 text-xs text-text-muted hover:text-text-primary transition-colors">
            <Home size={13} />
            View Site
          </Link>
          <button
            onClick={() => { logout(); navigate('/admin') }}
            className="flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:text-red-300 transition-colors w-full mt-1"
          >
            <LogOut size={13} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="border-b border-border px-8 py-5">
          <h1 className="font-display font-bold text-xl text-text-primary">{title}</h1>
        </div>
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}

export default function AdminDashboard() {
  const { data: statsData } = usePropertyStats()
  const { data: inquiriesData } = useInquiries({ isRead: false })
  const stats = statsData?.data || {}
  const unreadCount = inquiriesData?.pagination?.total || 0

  const CARDS = [
    { label: 'Total Properties', value: stats.total || 0, color: 'text-accent' },
    { label: 'Available', value: stats.available || 0, color: 'text-status-available' },
    { label: 'Sold', value: stats.sold || 0, color: 'text-status-sold' },
    { label: 'Unread Inquiries', value: unreadCount, color: 'text-amber-400' },
  ]

  return (
    <AdminLayout title="Dashboard">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {CARDS.map(c => (
          <div key={c.label} className="bg-bg-secondary border border-border p-6">
            <p className="text-xs text-text-muted uppercase tracking-wide mb-2">{c.label}</p>
            <p className={`font-display font-bold text-3xl ${c.color}`}>{c.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/admin/properties" className="bg-bg-secondary border border-border p-6 hover:border-accent transition-colors block">
          <h3 className="font-display font-bold text-sm text-text-primary mb-1">Manage Properties</h3>
          <p className="text-xs text-text-muted">Add, edit, or remove property listings</p>
        </Link>
        <Link to="/admin/inquiries" className="bg-bg-secondary border border-border p-6 hover:border-accent transition-colors block">
          <h3 className="font-display font-bold text-sm text-text-primary mb-1">View Inquiries</h3>
          <p className="text-xs text-text-muted">{unreadCount} unread message{unreadCount !== 1 ? 's' : ''}</p>
        </Link>
      </div>
    </AdminLayout>
  )
}

export { AdminLayout }
