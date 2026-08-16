import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/ui/Navbar'
import Footer from './components/ui/Footer'
import Cursor from './components/layout/Cursor'
import GrainOverlay from './components/layout/GrainOverlay'
import PageTransition from './components/layout/PageTransition'

// Pages
import Home from './pages/Home'
import Listings from './pages/Listings'
import PropertyDetail from './pages/PropertyDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import News from './pages/News'

// Admin
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProperties from './pages/admin/AdminProperties'
import AdminTeam from './pages/admin/AdminTeam'
import AdminNews from './pages/admin/AdminNews'
import AdminTestimonials from './pages/admin/AdminTestimonials'
import AdminInquiries from './pages/admin/AdminInquiries'

import { Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

const isAdminRoute = (pathname) => pathname.startsWith('/admin')

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />
  }

  return children
}

export default function App() {
  const location = useLocation()
  const admin = isAdminRoute(location.pathname)

  return (
    <AuthProvider>
      <Cursor />
      <GrainOverlay />
      {!admin && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Public */}
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/listings" element={<PageTransition><Listings /></PageTransition>} />
          <Route path="/listings/:id" element={<PageTransition><PropertyDetail /></PageTransition>} />
          <Route path="/news" element={<PageTransition><News /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          {/* Admin */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/properties" element={<ProtectedRoute><AdminProperties /></ProtectedRoute>} />
          <Route path="/admin/team" element={<ProtectedRoute><AdminTeam /></ProtectedRoute>} />
          <Route path="/admin/news" element={<ProtectedRoute><AdminNews /></ProtectedRoute>} />
          <Route path="/admin/testimonials" element={<ProtectedRoute><AdminTestimonials /></ProtectedRoute>} />
          <Route path="/admin/inquiries" element={<ProtectedRoute><AdminInquiries /></ProtectedRoute>} />
        </Routes>
      </AnimatePresence>
      {!admin && <Footer />}
    </AuthProvider>
  )
}
