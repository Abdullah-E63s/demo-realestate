import { statusColor } from '../../utils/formatters'

const typeColors = {
  'Residential Plot': 'bg-blue-950/40 text-blue-300 border border-blue-800/30',
  'Commercial Plot': 'bg-purple-950/40 text-purple-300 border border-purple-800/30',
  'File': 'bg-amber-950/40 text-amber-300 border border-amber-800/30',
  'House': 'bg-teal-950/40 text-teal-300 border border-teal-800/30',
  'Villa': 'bg-rose-950/40 text-rose-300 border border-rose-800/30',
  'Apartment': 'bg-cyan-950/40 text-cyan-300 border border-cyan-800/30',
  'Farm House': 'bg-green-950/40 text-green-300 border border-green-800/30',
}

export function TypeBadge({ type }) {
  const cls = typeColors[type] || 'bg-bg-raised text-text-muted border border-border'
  return (
    <span className={`tag ${cls}`}>
      {type}
    </span>
  )
}

export function StatusBadge({ status }) {
  return (
    <span className={`tag border ${statusColor(status)}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1" />
      {status}
    </span>
  )
}

export function SocietyBadge({ society }) {
  return (
    <span className="tag bg-accent/10 text-accent border border-accent/20">
      {society}
    </span>
  )
}
