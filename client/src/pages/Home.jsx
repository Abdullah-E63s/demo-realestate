import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { useFeaturedProperties } from '../hooks/useProperties'
import PropertyCard from '../components/property/PropertyCard'
import StatCounter from '../components/ui/StatCounter'
import Button from '../components/ui/Button'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=80'

const STATS = [
  { label: 'Projects Delivered', end: 100, suffix: '+' },
  { label: 'Years Experience', end: 21, suffix: '' },
  { label: 'Happy Clients', end: 1200, suffix: '+' },
  { label: 'Cr+ in Sales', end: 500, suffix: '' },
]

const MARQUEE_ITEMS = [
  'DHA Lahore', '•', 'Bahria Town', '•', 'Gulberg', '•', 'Phase 6', '•',
  'Phase 8', '•', 'Johar Town', '•', 'Barki Road', '•', 'Canal Road', '•',
  'DHA Lahore', '•', 'Bahria Town', '•', 'Gulberg', '•', 'Phase 6', '•',
  'Phase 8', '•', 'Johar Town', '•', 'Barki Road', '•', 'Canal Road', '•',
]

const TESTIMONIALS = [
  {
    quote: "PKEstate found us our dream plot in DHA Phase 6 within two weeks. The team's knowledge of the area is unmatched.",
    name: 'Usman Iqbal',
    role: 'Business Owner, Lahore',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=120&q=80',
  },
  {
    quote: "Invested in two files through PKEstate. Both appreciated significantly within 18 months. Genuine, transparent advice.",
    name: 'Fariha Tariq',
    role: 'Investor, Dubai',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=120&q=80',
  },
  {
    quote: "The most professional real estate team I've dealt with in Pakistan. Sold my commercial plot above asking price.",
    name: 'Bilal Ahmed',
    role: 'Entrepreneur, Karachi',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&q=80',
  },
]

export default function Home() {
  const carouselRef = useRef(null)
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  const { data: featuredData, isLoading } = useFeaturedProperties()
  const featured = featuredData?.data || []

  const scrollCarousel = (dir) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: dir * 360, behavior: 'smooth' })
    }
  }

  return (
    <main>
      {/* ─── HERO ─────────────────────────────────────────── */}
      <section ref={heroRef} className="min-h-screen flex items-center relative overflow-hidden pt-24 pb-12">
        {/* Background image */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: imgY }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/85 to-bg/20 z-10" />
          <img
            src={HERO_IMAGE}
            alt="Premium property"
            className="w-full h-full object-cover img-grade"
          />
        </motion.div>

        {/* Hero content */}
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 w-full">
          <div className="max-w-3xl">
            {/* Overline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="overline mb-6"
            >
              Premium Real Estate · Lahore, Pakistan
            </motion.p>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-display text-display-xl text-text-primary mb-4 leading-none"
            >
              Plots.
              <br />
              <span className="font-serif italic font-normal text-accent">Files.</span>
              <br />
              Homes.
            </motion.h1>

            {/* Subline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-text-secondary text-lg md:text-xl max-w-md mb-10 leading-relaxed font-light"
            >
              Lahore's most trusted real estate partner since 2003. DHA, Bahria Town, 
              Gulberg — we know every block, every file, every deal.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.45 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/listings"
                className="inline-flex items-center gap-2 bg-accent text-bg font-display font-semibold px-8 py-4 hover:bg-accent-dark transition-colors duration-200"
              >
                Browse Properties
                <ArrowRight size={16} />
              </Link>
              <a
                href="https://wa.me/923036570074?text=Hi%2C%20I'm%20looking%20for%20a%20property%20in%20Lahore."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-transparent border border-border text-text-primary font-display font-semibold px-8 py-4 hover:border-accent hover:text-accent transition-colors duration-200"
              >
                <WhatsAppIcon size={14} />
                WhatsApp Us
              </a>
            </motion.div>
          </div>

          {/* Asymmetric floating stat card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="absolute bottom-12 right-6 md:right-20 glass-card p-6 hidden md:block"
            style={{ width: 200 }}
          >
            <p className="text-[10px] uppercase tracking-widest text-text-muted mb-2">Est.</p>
            <p className="font-display font-bold text-4xl text-accent leading-none">2003</p>
            <p className="text-xs text-text-muted mt-1">Lahore's trusted name</p>
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent z-10" />
      </section>

      {/* ─── MARQUEE STATS BAR ─────────────────────────────── */}
      <div className="border-y border-border bg-bg-secondary overflow-hidden">
        <div className="marquee-track py-4">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className={`px-6 text-sm whitespace-nowrap shrink-0 ${
                item === '•' ? 'text-accent' : 'text-text-muted font-medium'
              }`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ─── STATS SECTION ─────────────────────────────────── */}
      <section className="section-pad px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-bg p-8 md:p-12"
            >
              <p className="font-display font-bold text-4xl md:text-5xl text-accent mb-2">
                <StatCounter end={stat.end} suffix={stat.suffix} />
              </p>
              <p className="text-sm text-text-muted">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── FEATURED LISTINGS ─────────────────────────────── */}
      <section className="section-pad px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="overline mb-3">Featured Properties</p>
            <h2 className="font-display font-bold text-display-md text-text-primary">
              Handpicked for
              <br />
              <span className="font-serif italic font-normal text-accent">discerning investors.</span>
            </h2>
          </div>
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scrollCarousel(-1)}
              className="w-11 h-11 border border-border text-text-muted hover:border-accent hover:text-accent transition-colors flex items-center justify-center"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scrollCarousel(1)}
              className="w-11 h-11 border border-border text-text-muted hover:border-accent hover:text-accent transition-colors flex items-center justify-center"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Horizontal carousel */}
        {isLoading ? (
          <div className="flex gap-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="shrink-0 w-[300px] h-[380px] bg-bg-raised animate-pulse" />
            ))}
          </div>
        ) : (
          <div ref={carouselRef} className="scroll-container">
            {featured.map((property, i) => (
              <div key={property.id} className="scroll-snap-start shrink-0 w-[300px] md:w-[340px]">
                <PropertyCard property={property} index={i} />
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 flex justify-start">
          <Link
            to="/listings"
            className="inline-flex items-center gap-2 text-accent text-sm font-medium hover:gap-3 transition-all duration-200"
          >
            View all listings <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ─── EDITORIAL SPLIT — ABOUT ───────────────────────── */}
      <section className="section-pad px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image side — bleeds left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=900&q=80"
                alt="Premium properties"
                className="w-full h-full object-cover img-grade"
              />
            </div>
            {/* Floating accent number */}
            <div className="absolute -right-6 bottom-12 bg-accent p-6 hidden md:block">
              <p className="font-display font-bold text-4xl text-bg leading-none">21</p>
              <p className="text-xs text-bg/70 mt-1">Years</p>
            </div>
            {/* Asymmetric border detail */}
            <div className="absolute -top-4 -left-4 w-16 h-16 border border-border-light hidden md:block" />
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <p className="overline mb-5">About PKEstate</p>
            <h2 className="font-display font-bold text-display-md text-text-primary mb-6">
              Not just listings.
              <br />
              <span className="font-serif italic font-normal text-accent">Real relationships.</span>
            </h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Founded in 2003, PKEstate has been at the forefront of Lahore's real estate 
              transformation. From the early days of DHA Phase 1 to today's emerging sectors 
              — we've guided thousands of families and investors to the right decisions.
            </p>
            <p className="text-text-secondary leading-relaxed mb-8">
              We specialize in DHA Lahore, Bahria Town, Gulberg, and all major investment 
              opportunities across Pakistan's real estate landscape. Every client is treated 
              with the same care whether buying their first plot or expanding a portfolio.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-accent font-medium text-sm hover:gap-3 transition-all duration-200"
            >
              Meet our team <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── MARKET UPDATE VIDEO ───────────────────────────── */}
      <section className="section-pad px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto">
        <div className="border border-border bg-bg-secondary">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Video embed area */}
            <div className="relative aspect-video bg-bg-raised overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80"
                alt="Market Update"
                className="w-full h-full object-cover img-grade group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-bg/50 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-16 h-16 rounded-full bg-accent flex items-center justify-center cursor-none"
                >
                  <Play size={20} className="text-bg ml-1" />
                </motion.div>
              </div>
              <div className="absolute bottom-4 left-4">
                <span className="tag bg-red-600 text-white border-0">LIVE</span>
              </div>
            </div>

            {/* Text */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <p className="overline mb-4">Latest Update</p>
              <h2 className="font-display font-bold text-display-sm text-text-primary mb-4">
                DHA Phase 9 Prism:<br />
                <span className="font-serif italic font-normal text-accent">Why Now?</span>
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                Our latest market analysis breaks down why DHA Phase 9 Prism files are 
                outperforming all other sectors. Watch our 15-minute breakdown before 
                making your next investment decision.
              </p>
              <p className="text-xs text-text-muted mb-6">August 2026 · 15 min watch</p>
              <a
                href="https://youtube.com/@pkestate"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent text-sm font-medium hover:gap-3 transition-all"
              >
                Watch on YouTube <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ──────────────────────────────────── */}
      <section className="section-pad px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto">
        <div className="mb-12">
          <p className="overline mb-4">Client Stories</p>
          <h2 className="font-display font-bold text-display-md text-text-primary">
            What our clients say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className={`bg-bg-secondary border border-border p-8 relative ${
                i === 1 ? 'md:mt-8' : ''
              }`}
            >
              {/* Quote mark */}
              <span className="font-serif text-6xl text-accent/20 leading-none absolute top-4 left-6">"</span>
              <p className="text-text-secondary leading-relaxed mb-6 relative z-10 pt-4 font-light italic">
                {t.quote}
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover img-grade"
                />
                <div>
                  <p className="font-display font-semibold text-sm text-text-primary">{t.name}</p>
                  <p className="text-xs text-text-muted">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── FOOTER CTA BANNER ─────────────────────────────── */}
      <section className="px-6 md:px-12 lg:px-20 pb-24 max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-bg-secondary border border-border p-12 md:p-20"
        >
          {/* Background texture */}
          <div className="absolute inset-0 bg-accent-glow opacity-60" />
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="overline mb-4">Ready to Start?</p>
              <h2 className="font-display font-bold text-display-md text-text-primary">
                Your next
                <br />
                <span className="font-serif italic font-normal text-accent">investment awaits.</span>
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 md:justify-end">
              <Link
                to="/listings"
                className="inline-flex items-center justify-center gap-2 bg-accent text-bg font-display font-semibold px-8 py-4 hover:bg-accent-dark transition-colors"
              >
                View Listings
                <ArrowRight size={16} />
              </Link>
              <a
                href="https://wa.me/923036570074"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-border text-text-primary font-display font-semibold px-8 py-4 hover:border-accent hover:text-accent transition-colors"
              >
                <WhatsAppIcon size={14} />
                Chat Now
              </a>
            </div>
          </div>
        </motion.div>
      </section>
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
