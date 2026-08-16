import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Youtube, Clock, Tag, Search, ArrowRight, ExternalLink } from 'lucide-react'
import { useNews } from '../hooks/useNews'

const CATEGORIES = ['All', 'Market Update', 'Commercial Analysis', 'DHA Insights', 'Bahria Town Update', 'Development Update']

export default function News() {
  const [selectedCat, setSelectedCat] = useState('All')
  const [search, setSearch] = useState('')

  const { data, isLoading } = useNews()
  const newsList = data?.data || []

  const filtered = newsList.filter(item => {
    const matchCat = selectedCat === 'All' || item.category === selectedCat
    const matchSearch = !search || 
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(search.toLowerCase())) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(search.toLowerCase()))
    return matchCat && matchSearch
  })

  const liveNews = newsList.find(n => n.isLive) || newsList[0]

  return (
    <main className="pt-24 min-h-screen bg-bg">
      {/* Header */}
      <div className="px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto py-16 border-b border-border">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="overline mb-4"
        >
          Market Intelligence & Media
        </motion.p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-display-lg text-text-primary max-w-2xl"
          >
            Latest News &<br />
            <span className="font-serif italic font-normal text-accent">Market Analysis.</span>
          </motion.h1>

          <a
            href="https://youtube.com/@pkestate"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-red-600/15 border border-red-500/30 text-red-400 px-5 py-3 text-xs font-bold uppercase tracking-wider hover:bg-red-600 hover:text-white transition-all duration-300 w-fit"
          >
            <Youtube size={16} />
            Subscribe on YouTube
          </a>
        </div>
      </div>

      {/* Featured / Live Hero Broadcast */}
      {liveNews && (
        <section className="px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto py-12">
          <div className="border border-border bg-bg-secondary overflow-hidden group hover:border-accent/50 transition-colors">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 relative aspect-video bg-bg-raised overflow-hidden">
                <img
                  src={liveNews.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80'}
                  alt={liveNews.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-bg/40 flex items-center justify-center">
                  <a
                    href={liveNews.youtubeUrl || 'https://youtube.com/@pkestate'}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-20 h-20 rounded-full bg-accent flex items-center justify-center shadow-2xl text-bg cursor-pointer"
                    >
                      <Play size={26} className="ml-1 fill-current" />
                    </motion.div>
                  </a>
                </div>
                <div className="absolute top-4 left-4 flex gap-2">
                  {liveNews.isLive ? (
                    <span className="bg-red-600 text-white font-bold text-[10px] px-2.5 py-1 uppercase tracking-widest flex items-center gap-1.5 shadow-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      Live Analysis
                    </span>
                  ) : (
                    <span className="bg-bg/90 backdrop-blur-sm text-accent border border-accent/40 font-bold text-[10px] px-2.5 py-1 uppercase tracking-wider">
                      Featured Broadcast
                    </span>
                  )}
                </div>
                <div className="absolute bottom-4 right-4 bg-bg/90 text-text-primary px-3 py-1 text-xs font-mono">
                  {liveNews.readTime || '15 min watch'}
                </div>
              </div>

              <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-accent">
                      {liveNews.category}
                    </span>
                    <span className="text-text-muted text-xs">•</span>
                    <span className="text-text-muted text-xs">
                      {new Date(liveNews.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <h2 className="font-display font-bold text-2xl md:text-3xl text-text-primary mb-3 leading-snug">
                    {liveNews.title}
                  </h2>
                  {liveNews.subtitle && (
                    <p className="font-serif italic text-accent text-sm mb-4">{liveNews.subtitle}</p>
                  )}
                  <p className="text-text-secondary text-sm leading-relaxed mb-6">
                    {liveNews.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-border flex items-center justify-between">
                  <a
                    href={liveNews.youtubeUrl || 'https://youtube.com/@pkestate'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-accent font-semibold text-xs uppercase tracking-wider hover:gap-3 transition-all"
                  >
                    Watch Full Breakdown <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filters & Search */}
      <section className="px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors rounded-xs ${
                  selectedCat === cat
                    ? 'bg-accent text-bg font-bold'
                    : 'bg-bg-secondary text-text-muted hover:text-text-primary hover:bg-bg-raised border border-border'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Search news or files..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-bg-secondary border border-border pl-9 pr-4 py-2 text-xs text-text-primary placeholder:text-text-muted rounded-xs focus:outline-none focus:border-accent"
            />
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto pb-24">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-[4/3] bg-bg-secondary animate-pulse border border-border" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center border border-border bg-bg-secondary">
            <p className="font-display font-bold text-lg text-text-primary mb-2">No news items found</p>
            <p className="text-xs text-text-muted">Try choosing another category or clearing your search filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((item, i) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-bg-secondary border border-border flex flex-col justify-between group hover:border-accent transition-colors"
              >
                <div>
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden bg-bg-raised">
                    <img
                      src={item.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80'}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {item.youtubeUrl && (
                      <a
                        href={item.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 bg-bg/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                      >
                        <div className="w-12 h-12 rounded-full bg-accent text-bg flex items-center justify-center shadow-lg">
                          <Play size={18} className="ml-0.5 fill-current" />
                        </div>
                      </a>
                    )}
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      <span className="bg-bg/90 backdrop-blur-sm text-accent text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider border border-border">
                        {item.category}
                      </span>
                      {item.isLive && (
                        <span className="bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider">
                          LIVE
                        </span>
                      )}
                    </div>
                    {item.readTime && (
                      <div className="absolute bottom-3 right-3 bg-bg/90 text-text-muted text-[10px] px-2 py-0.5 font-mono">
                        {item.readTime}
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <p className="text-[10px] uppercase tracking-widest text-text-muted mb-2">
                      {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                    <h3 className="font-display font-bold text-lg text-text-primary mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>
                    {item.subtitle && (
                      <p className="text-xs font-serif italic text-accent mb-3 line-clamp-1">
                        {item.subtitle}
                      </p>
                    )}
                    <p className="text-xs text-text-secondary leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Footer link */}
                <div className="px-6 pb-6 pt-2 border-t border-border/50 flex items-center justify-between">
                  {item.youtubeUrl ? (
                    <a
                      href={item.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-red-400 hover:text-red-300 text-xs font-semibold uppercase tracking-wider"
                    >
                      <Youtube size={13} />
                      <span>Watch Video</span>
                    </a>
                  ) : (
                    <span className="text-[11px] text-text-muted">Editorial Update</span>
                  )}
                  <span className="text-xs text-text-muted group-hover:text-accent transition-colors">
                    <ArrowRight size={14} />
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
