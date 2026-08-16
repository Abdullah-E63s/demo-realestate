import { useState } from 'react'
import { ChevronDown, RotateCcw, SlidersHorizontal } from 'lucide-react'
import Button from '../ui/Button'

const SOCIETIES = [
  'DHA Lahore',
  'Bahria Town Lahore',
  'Gulberg',
  'Johar Town',
  'Barki Road',
  'Cantt',
  'Model Town',
]

const TYPES = [
  'Residential Plot',
  'Commercial Plot',
  'File',
  'House',
  'Villa',
  'Apartment',
  'Farm House',
]

const SIZE_UNITS = ['Marla', 'Kanal']

export default function FilterSidebar({ filters, onChange, onReset, total }) {
  const [open, setOpen] = useState(false)

  const update = (key, value) => {
    onChange({ ...filters, [key]: value })
  }

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="flex md:hidden items-center gap-2 text-sm text-text-secondary border border-border px-4 py-2.5 w-full justify-between mb-4"
      >
        <span className="flex items-center gap-2">
          <SlidersHorizontal size={14} />
          Filters
        </span>
        <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <div className={`${open ? 'block' : 'hidden'} md:block w-full md:w-64 shrink-0`}>
        <div className="bg-bg-secondary border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-bold text-sm uppercase tracking-wide text-text-primary">
              Filters
            </h2>
            {total !== undefined && (
              <span className="text-xs text-text-muted">{total} results</span>
            )}
          </div>

          <div className="space-y-7">
            {/* Society/Location */}
            <FilterGroup label="Location">
              <div className="space-y-2">
                {SOCIETIES.map((s) => (
                  <label key={s} className="flex items-center gap-2.5 cursor-none group">
                    <input
                      type="radio"
                      name="society"
                      value={s}
                      checked={filters.society === s}
                      onChange={(e) => update('society', e.target.value)}
                      className="accent-amber-500 w-3.5 h-3.5"
                    />
                    <span className="text-sm text-text-muted group-hover:text-text-primary transition-colors">
                      {s}
                    </span>
                  </label>
                ))}
                {filters.society && (
                  <button
                    onClick={() => update('society', '')}
                    className="text-xs text-accent hover:text-accent-light mt-1"
                  >
                    Clear
                  </button>
                )}
              </div>
            </FilterGroup>

            {/* Property Type */}
            <FilterGroup label="Property Type">
              <div className="space-y-2">
                {TYPES.map((t) => (
                  <label key={t} className="flex items-center gap-2.5 cursor-none group">
                    <input
                      type="radio"
                      name="type"
                      value={t}
                      checked={filters.type === t}
                      onChange={(e) => update('type', e.target.value)}
                      className="accent-amber-500 w-3.5 h-3.5"
                    />
                    <span className="text-sm text-text-muted group-hover:text-text-primary transition-colors">
                      {t}
                    </span>
                  </label>
                ))}
                {filters.type && (
                  <button
                    onClick={() => update('type', '')}
                    className="text-xs text-accent hover:text-accent-light mt-1"
                  >
                    Clear
                  </button>
                )}
              </div>
            </FilterGroup>

            {/* Size Unit */}
            <FilterGroup label="Size Unit">
              <div className="flex gap-2">
                {SIZE_UNITS.map((u) => (
                  <button
                    key={u}
                    onClick={() => update('sizeUnit', filters.sizeUnit === u ? '' : u)}
                    className={`flex-1 py-2 text-xs font-medium border transition-colors ${
                      filters.sizeUnit === u
                        ? 'border-accent text-accent bg-accent/10'
                        : 'border-border text-text-muted hover:border-border-light'
                    }`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </FilterGroup>

            {/* Min/Max Size */}
            <FilterGroup label="Size Range">
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minSize || ''}
                  onChange={(e) => update('minSize', e.target.value)}
                  className="input-field w-full px-3 py-2 text-sm rounded-sm"
                />
                <span className="text-text-muted text-xs">—</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxSize || ''}
                  onChange={(e) => update('maxSize', e.target.value)}
                  className="input-field w-full px-3 py-2 text-sm rounded-sm"
                />
              </div>
            </FilterGroup>

            {/* Status */}
            <FilterGroup label="Status">
              <div className="flex gap-2 flex-wrap">
                {['Available', 'Sold', 'Reserved'].map((s) => (
                  <button
                    key={s}
                    onClick={() => update('status', filters.status === s ? '' : s)}
                    className={`px-3 py-1.5 text-xs font-medium border transition-colors ${
                      filters.status === s
                        ? 'border-accent text-accent bg-accent/10'
                        : 'border-border text-text-muted hover:border-border-light'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </FilterGroup>

            {/* Reset */}
            <button
              onClick={onReset}
              className="flex items-center gap-2 text-xs text-text-muted hover:text-text-primary transition-colors w-full pt-2 border-t border-border"
            >
              <RotateCcw size={12} />
              Reset all filters
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

function FilterGroup({ label, children }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-3">{label}</p>
      {children}
    </div>
  )
}
