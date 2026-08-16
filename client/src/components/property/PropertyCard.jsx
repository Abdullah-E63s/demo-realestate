import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Maximize2, ArrowUpRight } from 'lucide-react'
import { TypeBadge, StatusBadge } from '../ui/Badge'
import { formatSize, getPropertyImage, propertyWhatsAppMessage, whatsappLink } from '../../utils/formatters'

export default function PropertyCard({ property, index = 0 }) {
  const image = getPropertyImage(property, 0)
  const waMessage = propertyWhatsAppMessage(property)
  const waLink = whatsappLink(undefined, waMessage)

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative bg-bg-secondary border border-border hover:border-border-light transition-all duration-300 overflow-hidden flex flex-col"
    >
      {/* Image */}
      <Link to={`/listings/${property.id}`} className="block relative overflow-hidden aspect-[4/3]">
        <img
          src={image}
          alt={property.title}
          className="w-full h-full object-cover img-grade transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 property-overlay" />

        {/* Badges overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <TypeBadge type={property.type} />
        </div>

        {/* Status */}
        <div className="absolute top-3 right-3">
          <StatusBadge status={property.status} />
        </div>

        {/* Arrow icon on hover */}
        <div className="absolute bottom-3 right-3 w-9 h-9 bg-accent flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <ArrowUpRight size={16} className="text-bg" />
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Society */}
        <div className="flex items-center gap-1.5 mb-2">
          <MapPin size={11} className="text-accent" />
          <span className="text-xs text-text-muted tracking-wide">
            {property.society}{property.phase ? ` · ${property.phase}` : ''}
          </span>
        </div>

        {/* Title */}
        <Link to={`/listings/${property.id}`}>
          <h3 className="font-display font-bold text-base text-text-primary leading-tight mb-3 group-hover:text-accent transition-colors duration-200 line-clamp-2">
            {property.title}
          </h3>
        </Link>

        {/* Size */}
        <div className="flex items-center gap-1.5 mb-4">
          <Maximize2 size={11} className="text-text-muted" />
          <span className="text-xs text-text-muted">
            {formatSize(property.size, property.sizeUnit)}
          </span>
        </div>

        {/* Price */}
        <div className="mt-auto pt-4 border-t border-border flex items-end justify-between gap-3">
          <div>
            <p className="text-[10px] text-text-muted uppercase tracking-widest mb-0.5">Price</p>
            <p className="font-display font-bold text-lg text-accent leading-none">
              {property.priceLabel}
            </p>
          </div>

          {/* WhatsApp Button */}
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 bg-[#128C7E] text-white text-xs font-semibold px-3 py-2 hover:bg-[#0a7060] transition-colors duration-200"
            aria-label="WhatsApp Inquiry"
          >
            <WhatsAppIcon size={12} />
            Inquire
          </a>
        </div>
      </div>
    </motion.article>
  )
}

function WhatsAppIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
