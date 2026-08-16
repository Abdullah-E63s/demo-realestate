import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Maximize2, ArrowLeft, CheckCircle, CalendarCheck, Phone } from 'lucide-react'
import { useProperty } from '../hooks/useProperty'
import ImageGallery from '../components/property/ImageGallery'
import SimilarProperties from '../components/property/SimilarProperties'
import InquiryForm from '../components/forms/InquiryForm'
import BookVisitForm from '../components/forms/BookVisitForm'
import { TypeBadge, StatusBadge } from '../components/ui/Badge'
import Loader from '../components/ui/Loader'
import { formatSize, propertyWhatsAppMessage, whatsappLink } from '../utils/formatters'

export default function PropertyDetail() {
  const { id } = useParams()
  const [showVisitForm, setShowVisitForm] = useState(false)
  const { data, isLoading, isError } = useProperty(id)
  const property = data?.data

  if (isLoading) return <main className="pt-24"><Loader text="Loading property..." /></main>

  if (isError || !property) {
    return (
      <main className="pt-24 px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto">
        <div className="py-24 text-center">
          <p className="font-display text-xl text-text-secondary mb-4">Property not found</p>
          <Link to="/listings" className="text-accent text-sm hover:underline">← Back to Listings</Link>
        </div>
      </main>
    )
  }

  const waMsg = propertyWhatsAppMessage(property)
  const waLink = whatsappLink(undefined, waMsg)
  const features = Array.isArray(property.features) ? property.features : JSON.parse(property.features || '[]')

  return (
    <main className="pt-24">
      {/* Breadcrumb */}
      <div className="px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto py-5 border-b border-border">
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <Link to="/listings" className="flex items-center gap-1 hover:text-accent transition-colors">
            <ArrowLeft size={12} />
            Listings
          </Link>
          <span>/</span>
          <span className="text-text-secondary truncate max-w-[300px]">{property.title}</span>
        </div>
      </div>

      {/* Image gallery */}
      <div className="px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto mt-6">
        <ImageGallery images={property.images} title={property.title} />
      </div>

      {/* Main content grid */}
      <div className="px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto mt-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">
          {/* LEFT: Property info */}
          <div>
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-5">
              <TypeBadge type={property.type} />
              <StatusBadge status={property.status} />
            </div>

            {/* Title */}
            <h1 className="font-display font-bold text-display-sm text-text-primary mb-3">
              {property.title}
            </h1>

            {/* Location */}
            <div className="flex items-center gap-2 text-text-muted mb-8">
              <MapPin size={14} className="text-accent" />
              <span className="text-sm">{property.location}</span>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border mb-10">
              {[
                { label: 'Price', value: property.priceLabel, accent: true },
                { label: 'Size', value: formatSize(property.size, property.sizeUnit), accent: false },
                { label: 'Society', value: property.society, accent: false },
                { label: 'Phase', value: property.phase || '—', accent: false },
              ].map(stat => (
                <div key={stat.label} className="bg-bg-secondary p-5">
                  <p className="text-[10px] uppercase tracking-widest text-text-muted mb-1">{stat.label}</p>
                  <p className={`font-display font-bold text-lg ${stat.accent ? 'text-accent' : 'text-text-primary'}`}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="mb-10">
              <h2 className="font-display font-bold text-lg text-text-primary mb-4">About this Property</h2>
              <p className="text-text-secondary leading-relaxed text-sm">{property.description}</p>
            </div>

            {/* Features */}
            {features.length > 0 && (
              <div className="mb-10">
                <h2 className="font-display font-bold text-lg text-text-primary mb-4">Features & Amenities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                      <CheckCircle size={14} className="text-accent shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Map placeholder */}
            <div className="mb-10">
              <h2 className="font-display font-bold text-lg text-text-primary mb-4">Location</h2>
              <div className="bg-bg-raised border border-border h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={24} className="text-accent mx-auto mb-2" />
                  <p className="text-text-muted text-sm">{property.location}</p>
                  <p className="text-xs text-text-faint mt-1">Google Maps integration coming soon</p>
                </div>
              </div>
            </div>

            {/* Similar Properties */}
            <SimilarProperties
              currentId={id}
              society={property.society}
              type={property.type}
            />
          </div>

          {/* RIGHT: Sticky sidebar */}
          <div className="lg:sticky lg:top-28 self-start space-y-4">
            {/* Price card */}
            <div className="bg-bg-secondary border border-border p-6">
              <p className="text-[10px] uppercase tracking-widest text-text-muted mb-1">Asking Price</p>
              <p className="font-display font-bold text-2xl text-accent mb-4">{property.priceLabel}</p>

              <div className="flex flex-col gap-3">
                {/* WhatsApp */}
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#128C7E] text-white font-display font-semibold py-3.5 text-sm hover:bg-[#0a7060] transition-colors"
                >
                  <WhatsAppIcon size={15} />
                  WhatsApp Inquiry
                </a>

                {/* Book Visit */}
                <button
                  onClick={() => setShowVisitForm(!showVisitForm)}
                  className="flex items-center justify-center gap-2 border border-border text-text-primary font-display font-semibold py-3.5 text-sm hover:border-accent hover:text-accent transition-colors"
                >
                  <CalendarCheck size={14} />
                  Book Site Visit
                </button>
              </div>
            </div>

            {/* Book Visit Form */}
            <AnimatePresence>
              {showVisitForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <BookVisitForm
                    propertyId={property.id}
                    propertyTitle={property.title}
                    onClose={() => setShowVisitForm(false)}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Inquiry Form */}
            <div className="bg-bg-secondary border border-border p-6">
              <h3 className="font-display font-bold text-base text-text-primary mb-5">Send Inquiry</h3>
              <InquiryForm propertyId={property.id} propertyTitle={property.title} />
            </div>

            {/* Agent quick contact */}
            <div className="bg-bg-secondary border border-border p-6">
              <p className="text-xs uppercase tracking-widest text-text-muted mb-4">Your Agent</p>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="https://images.unsplash.com/photo-1556157382-97eda2d62296?w=200&q=80"
                  alt="Agent"
                  className="w-12 h-12 rounded-full object-cover img-grade"
                />
                <div>
                  <p className="font-display font-semibold text-sm text-text-primary">Kamran Sheikh</p>
                  <p className="text-xs text-text-muted">Founder & CEO</p>
                </div>
              </div>
              <a
                href="tel:+923036570074"
                className="flex items-center gap-2 text-xs text-text-muted hover:text-accent transition-colors"
              >
                <Phone size={12} />
                +92 303 6570074
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Book Visit Modal overlay for mobile */}
    </main>
  )
}

function WhatsAppIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
