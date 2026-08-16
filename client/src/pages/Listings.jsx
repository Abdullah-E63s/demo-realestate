import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { LayoutGrid, List, ChevronDown } from 'lucide-react'
import { useProperties } from '../hooks/useProperties'
import FilterSidebar from '../components/property/FilterSidebar'
import PropertyGrid from '../components/property/PropertyGrid'

const SORTS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price_asc', label: 'Price: Low → High' },
  { value: 'price_desc', label: 'Price: High → Low' },
  { value: 'size_asc', label: 'Size: Small → Large' },
  { value: 'size_desc', label: 'Size: Large → Small' },
]

const DEFAULT_FILTERS = {
  society: '',
  type: '',
  status: '',
  sizeUnit: '',
  minSize: '',
  maxSize: '',
}

export default function Listings() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filters, setFilters] = useState({
    ...DEFAULT_FILTERS,
    society: searchParams.get('society') || '',
    type: searchParams.get('type') || '',
  })
  const [sort, setSort] = useState('newest')
  const [page, setPage] = useState(1)
  const [view, setView] = useState('grid')

  // Build query
  const queryParams = {
    ...Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== '')),
    sort,
    page,
    limit: 9,
  }

  const { data, isLoading, isError } = useProperties(queryParams)
  const properties = data?.data || []
  const pagination = data?.pagination

  // Sync URL params
  useEffect(() => {
    const params = {}
    if (filters.society) params.society = filters.society
    if (filters.type) params.type = filters.type
    setSearchParams(params, { replace: true })
  }, [filters.society, filters.type])

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    setPage(1)
  }

  const handleReset = () => {
    setFilters(DEFAULT_FILTERS)
    setPage(1)
    setSort('newest')
    setSearchParams({}, { replace: true })
  }

  return (
    <main className="pt-24">
      {/* Page Header */}
      <div className="border-b border-border px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto py-10">
        <p className="overline mb-3">Properties</p>
        <h1 className="font-display font-bold text-display-md text-text-primary">
          Browse listings
        </h1>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <FilterSidebar
            filters={filters}
            onChange={handleFilterChange}
            onReset={handleReset}
            total={pagination?.total}
          />

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
              <p className="text-sm text-text-muted">
                {isLoading ? 'Loading...' : `${pagination?.total || 0} properties`}
              </p>

              <div className="flex items-center gap-3">
                {/* Sort */}
                <div className="relative">
                  <select
                    value={sort}
                    onChange={(e) => { setSort(e.target.value); setPage(1) }}
                    className="input-field text-sm pl-3 pr-8 py-2 rounded-sm appearance-none"
                  >
                    {SORTS.map(s => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                  <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
                </div>

                {/* View toggle */}
                <div className="flex border border-border">
                  <button
                    onClick={() => setView('grid')}
                    className={`p-2.5 transition-colors ${view === 'grid' ? 'bg-accent/10 text-accent' : 'text-text-muted hover:text-text-primary'}`}
                  >
                    <LayoutGrid size={14} />
                  </button>
                  <button
                    onClick={() => setView('list')}
                    className={`p-2.5 transition-colors ${view === 'list' ? 'bg-accent/10 text-accent' : 'text-text-muted hover:text-text-primary'}`}
                  >
                    <List size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Grid */}
            <PropertyGrid
              properties={properties}
              isLoading={isLoading}
              isError={isError}
            />

            {/* Pagination */}
            {pagination && pagination.pages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 text-sm border border-border text-text-muted hover:border-accent hover:text-accent transition-colors disabled:opacity-30"
                >
                  Previous
                </button>

                {[...Array(pagination.pages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`w-9 h-9 text-sm border transition-colors ${
                      page === i + 1
                        ? 'border-accent text-accent bg-accent/10'
                        : 'border-border text-text-muted hover:border-border-light'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => setPage(p => Math.min(pagination.pages, p + 1))}
                  disabled={page === pagination.pages}
                  className="px-4 py-2 text-sm border border-border text-text-muted hover:border-accent hover:text-accent transition-colors disabled:opacity-30"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
