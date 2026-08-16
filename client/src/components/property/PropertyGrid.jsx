import PropertyCard from './PropertyCard'
import Loader from '../ui/Loader'

export default function PropertyGrid({ properties, isLoading, isError }) {
  if (isLoading) return <Loader text="Finding properties..." />

  if (isError) {
    return (
      <div className="py-24 text-center">
        <p className="text-text-muted text-sm">Could not load properties. Check server connection.</p>
      </div>
    )
  }

  if (!properties?.length) {
    return (
      <div className="py-24 text-center">
        <p className="font-display text-xl text-text-secondary mb-2">No properties found</p>
        <p className="text-text-muted text-sm">Try adjusting your filters.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {properties.map((property, index) => (
        <PropertyCard key={property.id} property={property} index={index} />
      ))}
    </div>
  )
}
