import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useEffect } from 'react'
import { Home, List, MessageSquare, LogOut, BarChart3, Users, Newspaper, MessageCircleHeart } from 'lucide-react'
import { usePropertyStats } from '../../hooks/useProperties'
import { useInquiries } from '../../hooks/useInquiries'
import { useAgents } from '../../hooks/useAgents'
import { useNews } from '../../hooks/useNews'
import { useTestimonials } from '../../hooks/useTestimonials'

const NAV = [
  { to: '/admin/dashboard', icon: BarChart3, label: 'Dashboard' },
  { to: '/admin/properties', icon: List, label: 'Properties' },
  { to: '/admin/team', icon: Users, label: 'Team Members' },
  { to: '/admin/news', icon: Newspaper, label: 'Latest News' },
  { to: '/admin/testimonials', icon: MessageCircleHeart, label: 'Client Feedback' },
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
      <aside className="w-64 border-r border-border bg-bg-secondary flex flex-col shrink-0">
        <div className="p-5 border-b border-border">
          <p className="font-display font-bold text-base">PK<span className="text-accent">estate</span></p>
          <p className="text-[10px] text-text-muted mt-0.5 uppercase tracking-widest">Admin Control Panel</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {NAV.map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 px-3.5 py-2.5 text-sm font-medium rounded-xs transition-colors ${
                location.pathname === to
                  ? 'bg-accent/15 text-accent font-semibold border-r-2 border-accent'
                  : 'text-text-muted hover:text-text-primary hover:bg-bg-raised'
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-border">
          <p className="text-xs text-text-muted mb-3 px-3 truncate">{user?.email}</p>
          <Link to="/" className="flex items-center gap-2 px-3 py-2 text-xs text-text-muted hover:text-text-primary transition-colors">
            <Home size={13} />
            View Live Site
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
        <div className="border-b border-border px-8 py-5 flex items-center justify-between">
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
  const { data: agentsData } = useAgents()
  const { data: newsData } = useNews()
  const { data: testimonialsData } = useTestimonials()

  const stats = statsData?.data || {}
  const unreadCount = inquiriesData?.pagination?.total || 0
  const teamCount = agentsData?.data?.length || 0
  const newsCount = newsData?.data?.length || 0
  const feedbackCount = testimonialsData?.data?.length || 0

  const CARDS = [
    { label: 'Total Properties', value: stats.total || 0, color: 'text-accent', to: '/admin/properties' },
    { label: 'Team Members', value: teamCount, color: 'text-sky-400', to: '/admin/team' },
    { label: 'News & Updates', value: newsCount, color: 'text-amber-400', to: '/admin/news' },
    { label: 'Client Feedback', value: feedbackCount, color: 'text-emerald-400', to: '/admin/testimonials' },
    { label: 'Unread Inquiries', value: unreadCount, color: 'text-rose-400', to: '/admin/inquiries' },
  ]

  return (
    <AdminLayout title="Dashboard">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {CARDS.map(c => (
          <Link key={c.label} to={c.to} className="bg-bg-secondary border border-border p-5 hover:border-accent transition-colors block group">
            <p className="text-[11px] text-text-muted uppercase tracking-wider mb-2 group-hover:text-text-secondary transition-colors">{c.label}</p>
            <p className={`font-display font-bold text-3xl ${c.color}`}>{c.value}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/admin/properties" className="bg-bg-secondary border border-border p-6 hover:border-accent transition-colors block">
          <div className="flex items-center gap-3 mb-2">
            <List className="text-accent" size={18} />
            <h3 className="font-display font-bold text-sm text-text-primary">Manage Properties</h3>
          </div>
          <p className="text-xs text-text-muted">Create, edit, upload photos, or remove listings.</p>
        </Link>
        <Link to="/admin/team" className="bg-bg-secondary border border-border p-6 hover:border-accent transition-colors block">
          <div className="flex items-center gap-3 mb-2">
            <Users className="text-sky-400" size={18} />
            <h3 className="font-display font-bold text-sm text-text-primary">Team Members</h3>
          </div>
          <p className="text-xs text-text-muted">Manage advisors, WhatsApp contacts, photos, and roles.</p>
        </Link>
        <Link to="/admin/news" className="bg-bg-secondary border border-border p-6 hover:border-accent transition-colors block">
          <div className="flex items-center gap-3 mb-2">
            <Newspaper className="text-amber-400" size={18} />
            <h3 className="font-display font-bold text-sm text-text-primary">Latest News & Videos</h3>
          </div>
          <p className="text-xs text-text-muted">Publish YouTube market updates and investment news.</p>
        </Link>
      </div>
    </AdminLayout>
  )
}

export { AdminLayout }
