import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { agentApi } from '../services/api'
import StatCounter from '../components/ui/StatCounter'
import { Phone, MessageCircle } from 'lucide-react'
import { whatsappLink } from '../utils/formatters'

const BRAND_STORY = [
  "It started in 2003, when Kamran Sheikh took his first step into DHA Lahore's then-emerging real estate market. One office, a handful of plots, and an obsession with doing business the right way.",
  "Two decades later, PKEstate is synonymous with trust, transparency, and deep market intelligence. We've facilitated over 1,200 successful transactions — from a first-time buyer's 5 Marla plot in Bahria Orchard to multi-crore commercial investments on Canal Road.",
  "Our philosophy has never changed: understand the client's goal first, property second.",
]

const STATS = [
  { label: 'Years in Business', end: 21 },
  { label: 'Properties Sold', end: 1200, suffix: '+' },
  { label: 'Societies Covered', end: 12 },
  { label: 'Crore in Sales', end: 500, suffix: '+' },
]

export default function About() {
  const { data } = useQuery({
    queryKey: ['agents'],
    queryFn: () => agentApi.getAll().then(r => r.data),
  })
  const agents = data?.data || []

  return (
    <main className="pt-24">
      {/* Header */}
      <div className="px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto py-16 border-b border-border">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="overline mb-4"
        >
          Our Story
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display font-bold text-display-lg text-text-primary max-w-2xl"
        >
          Built on trust.
          <br />
          <span className="font-serif italic font-normal text-accent">Grown through results.</span>
        </motion.h1>
      </div>

      {/* Brand Story */}
      <section className="section-pad px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 items-start">
          {/* Left: image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800&q=80"
                alt="Kamran Sheikh - Founder"
                className="w-full h-full object-cover img-grade"
              />
            </div>
            <div className="absolute -right-4 -bottom-4 bg-bg-secondary border border-border p-5 max-w-[200px]">
              <p className="font-display font-bold text-3xl text-accent">2003</p>
              <p className="text-xs text-text-muted mt-1">Year Founded</p>
            </div>
          </motion.div>

          {/* Right: story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="pt-8 lg:pt-20"
          >
            {/* Pull quote */}
            <blockquote className="font-serif italic text-2xl md:text-3xl text-text-secondary leading-relaxed mb-10 accent-line">
              "We don't sell properties. We help people make the most important financial decisions of their lives."
            </blockquote>
            <p className="text-text-muted text-sm font-medium mb-10">— Kamran Sheikh, Founder</p>

            {BRAND_STORY.map((para, i) => (
              <p key={i} className="text-text-secondary leading-relaxed text-sm mb-5">
                {para}
              </p>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto mb-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-bg-secondary p-8 md:p-12"
            >
              <p className="font-display font-bold text-4xl text-accent mb-2">
                <StatCounter end={s.end} suffix={s.suffix || ''} />
              </p>
              <p className="text-sm text-text-muted">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="section-pad px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto">
        <div className="mb-12">
          <p className="overline mb-3">The Team</p>
          <h2 className="font-display font-bold text-display-md text-text-primary">
            Experts who{' '}
            <span className="font-serif italic font-normal text-accent">know the market.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(agents.length ? agents : FALLBACK_AGENTS).map((agent, i) => (
            <motion.div
              key={agent.id || i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              {/* Photo */}
              <div className="aspect-[3/4] overflow-hidden mb-4 relative">
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="w-full h-full object-cover img-grade group-hover:scale-105 transition-transform duration-500"
                />
                {/* WhatsApp overlay */}
                <div className="absolute inset-0 bg-bg/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <a
                    href={whatsappLink(agent.whatsapp, `Hi ${agent.name}, I found you on PKEstate.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#128C7E] text-white text-xs font-semibold px-5 py-2.5 hover:bg-[#0a7060] transition-colors"
                  >
                    <MessageCircle size={12} />
                    WhatsApp
                  </a>
                </div>
              </div>

              <h3 className="font-display font-bold text-base text-text-primary mb-0.5">{agent.name}</h3>
              <p className="text-xs text-accent mb-2">{agent.role}</p>
              {agent.bio && (
                <p className="text-xs text-text-muted leading-relaxed line-clamp-3">{agent.bio}</p>
              )}
              <div className="flex items-center gap-1.5 mt-3">
                <Phone size={11} className="text-text-muted" />
                <a href={`tel:${agent.phone}`} className="text-xs text-text-muted hover:text-accent transition-colors">
                  {agent.phone}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  )
}

const FALLBACK_AGENTS = [
  { name: 'Kamran Sheikh', role: 'Founder & CEO', phone: '+92 303 6570074', whatsapp: '923036570074', image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800&q=80', bio: 'Founded PKEstate in 2003. Two decades of transforming real estate experiences in Lahore.' },
  { name: 'Zain ul Abidin', role: 'Senior Advisor', phone: '+92 303 6570074', whatsapp: '923036570074', image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&q=80', bio: '15 years of experience in DHA Lahore residential and commercial market.' },
  { name: 'Hira Farooq', role: 'Investment Consultant', phone: '+92 303 6570074', whatsapp: '923036570074', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80', bio: 'Bahria Town specialist with deep understanding of market trends and ROI projections.' },
  { name: 'Saba Malik', role: 'Commercial Specialist', phone: '+92 303 6570074', whatsapp: '923036570074', image: 'https://images.unsplash.com/photo-1573497491765-dccce02b29df?w=800&q=80', bio: 'Expert in Gulberg and Canal Road commercial properties.' },
]
