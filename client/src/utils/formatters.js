/**
 * Format a number as PKR currency
 * e.g. 18500000 → "PKR 1.85 Crore" or falls back to label
 */
export function formatPKR(amount) {
  if (!amount) return '—'
  if (amount >= 10000000) {
    const crore = (amount / 10000000).toFixed(2).replace(/\.?0+$/, '')
    return `PKR ${crore} Crore`
  }
  if (amount >= 100000) {
    const lac = (amount / 100000).toFixed(2).replace(/\.?0+$/, '')
    return `PKR ${lac} Lac`
  }
  return `PKR ${amount.toLocaleString('en-PK')}`
}

/**
 * Format property size with unit
 * e.g. (10, "Marla") → "10 Marla" | (1, "Kanal") → "1 Kanal"
 */
export function formatSize(size, unit) {
  if (!size) return '—'
  return `${size} ${unit || 'Marla'}`
}

/**
 * Format date as "17 Aug 2026"
 */
export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-PK', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export const PRIMARY_WHATSAPP = '+92 303 6570074'
export const PRIMARY_WHATSAPP_CLEAN = '923036570074'

/**
 * Build WhatsApp link with pre-filled message
 */
export function whatsappLink(phone = PRIMARY_WHATSAPP_CLEAN, message = '') {
  const clean = (phone || PRIMARY_WHATSAPP_CLEAN).replace(/[^0-9]/g, '')
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${clean}?text=${encoded}`
}

/**
 * Generate WhatsApp inquiry message for a property
 */
export function propertyWhatsAppMessage(property) {
  return `Hi, I'm interested in: *${property.title}* (${property.priceLabel}) — ${property.location}. Can you share more details?`
}

/**
 * Slugify a string
 */
export function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

/**
 * Get first image from property (or placeholder)
 */
export function getPropertyImage(property, index = 0) {
  if (property?.images?.length > index) {
    return property.images[index]
  }
  return `https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80`
}

/**
 * Map property type to short label
 */
export function typeLabel(type) {
  const map = {
    'Residential Plot': 'Plot',
    'Commercial Plot': 'Commercial',
    'File': 'File',
    'House': 'House',
    'Villa': 'Villa',
    'Apartment': 'Apt',
    'Farm House': 'Farmhouse',
  }
  return map[type] || type
}

/**
 * Status color classes
 */
export function statusColor(status) {
  const map = {
    'Available': 'text-status-available bg-status-available/10 border-status-available/30',
    'Sold': 'text-status-sold bg-status-sold/10 border-status-sold/30',
    'Reserved': 'text-status-reserved bg-status-reserved/10 border-status-reserved/30',
  }
  return map[status] || 'text-text-muted bg-bg-raised border-border'
}
