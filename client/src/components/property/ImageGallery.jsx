import { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export default function ImageGallery({ images = [], title = '' }) {
  const [lightbox, setLightbox] = useState(null) // index or null
  const [main, setMain] = useState(0)

  if (!images.length) return null

  const prev = () => setLightbox((i) => (i - 1 + images.length) % images.length)
  const next = () => setLightbox((i) => (i + 1) % images.length)

  return (
    <>
      {/* Gallery grid */}
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[420px] md:h-[520px]">
        {/* Main image */}
        <div
          className="col-span-3 row-span-2 overflow-hidden cursor-none"
          onClick={() => setLightbox(main)}
        >
          <img
            src={images[main]}
            alt={`${title} main`}
            className="w-full h-full object-cover img-grade hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Thumbnails */}
        {images.slice(0, 3).map((img, i) => (
          <div
            key={i}
            className={`overflow-hidden cursor-none ${i === 0 ? '' : ''}`}
            onClick={() => { setMain(i); setLightbox(i) }}
          >
            <img
              src={img}
              alt={`${title} ${i + 1}`}
              className={`w-full h-full object-cover img-grade hover:scale-105 transition-all duration-300 ${
                i === main ? 'ring-2 ring-inset ring-accent' : ''
              }`}
            />
          </div>
        ))}

        {/* More count overlay on last thumbnail */}
        {images.length > 3 && (
          <div
            className="relative overflow-hidden cursor-none"
            onClick={() => setLightbox(3)}
          >
            <img
              src={images[3] || images[0]}
              alt="more"
              className="w-full h-full object-cover img-grade"
            />
            <div className="absolute inset-0 bg-bg/70 flex items-center justify-center">
              <span className="font-display font-bold text-text-primary text-lg">
                +{images.length - 3}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[9990] bg-bg/95 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-4 md:left-8 text-text-primary hover:text-accent transition-colors p-2"
          >
            <ChevronLeft size={32} />
          </button>

          <img
            src={images[lightbox]}
            alt={`${title} ${lightbox + 1}`}
            className="max-w-5xl max-h-[85vh] w-full h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-4 md:right-8 text-text-primary hover:text-accent transition-colors p-2"
          >
            <ChevronRight size={32} />
          </button>

          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 text-text-primary hover:text-accent"
          >
            <X size={24} />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setLightbox(i) }}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${i === lightbox ? 'bg-accent' : 'bg-border-light'}`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}
