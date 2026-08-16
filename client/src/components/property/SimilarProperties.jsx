import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useProperties } from '../../hooks/useProperties'
import PropertyCard from './PropertyCard'

export default function SimilarProperties({ currentId, society, type }) {
  const scrollRef = useRef(null)

  const { data } = useProperties({ society, type, limit: 6 })
  const properties = data?.data?.filter(p => p.id !== parseInt(currentId)) || []

  if (!properties.length) return null

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 340, behavior: 'smooth' })
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-display font-bold text-display-sm text-text-primary">
          Similar Properties
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll(-1)}
            className="w-10 h-10 border border-border text-text-muted hover:border-accent hover:text-accent transition-colors flex items-center justify-center"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll(1)}
            className="w-10 h-10 border border-border text-text-muted hover:border-accent hover:text-accent transition-colors flex items-center justify-center"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="scroll-container">
        {properties.map((property, i) => (
          <div key={property.id} className="scroll-snap-start shrink-0 w-[300px] md:w-[340px]">
            <PropertyCard property={property} index={i} />
          </div>
        ))}
      </div>
    </div>
  )
}
