import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Instagram, Youtube } from 'lucide-react'

const navLinks = [
  { to: '/listings?type=Residential+Plot', label: 'Residential Plots' },
  { to: '/listings?type=Commercial+Plot', label: 'Commercial Plots' },
  { to: '/listings?type=File', label: 'Investment Files' },
  { to: '/listings?type=Villa', label: 'Villas' },
  { to: '/listings?type=House', label: 'Houses' },
  { to: '/listings?type=Apartment', label: 'Apartments' },
]

const societies = [
  { to: '/listings?society=DHA+Lahore', label: 'DHA Lahore' },
  { to: '/listings?society=Bahria+Town', label: 'Bahria Town' },
  { to: '/listings?society=Gulberg', label: 'Gulberg' },
  { to: '/listings?society=Johar+Town', label: 'Johar Town' },
]

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg-secondary">
      {/* Top CTA strip */}
      <div className="border-b border-border px-6 md:px-12 lg:px-20 py-12 flex flex-col md:flex-row items-center justify-between gap-6 max-w-[1600px] mx-auto">
        <div>
          <p className="overline mb-2">Ready to Invest?</p>
          <h2 className="font-display font-bold text-display-sm text-text-primary">
            Let's find your next{' '}
            <span className="font-serif italic text-accent">property.</span>
          </h2>
        </div>
        <a
          href="https://wa.me/923036570074?text=Hi%2C%20I'm%20looking%20for%20a%20property%20in%20Lahore."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-accent text-bg text-sm font-semibold font-display px-8 py-4 hover:bg-accent-dark transition-colors duration-200 shrink-0"
        >
          <WhatsAppIcon size={16} />
          Start on WhatsApp
        </a>
      </div>

      {/* Main footer grid */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div>
          <Link to="/" className="block mb-5">
            <span className="font-display font-bold text-2xl tracking-tight">
              PK<span className="text-accent">estate</span>
            </span>
            <p className="text-[9px] tracking-[0.2em] text-text-muted uppercase mt-0.5">
              Premium Real Estate
            </p>
          </Link>
          <p className="text-text-muted text-sm leading-relaxed mb-6">
            Lahore's trusted real estate partner since 2003. Specialists in DHA, 
            Bahria Town, and premium investment opportunities.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-text-muted hover:text-accent transition-colors" aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a href="#" className="text-text-muted hover:text-accent transition-colors" aria-label="YouTube">
              <Youtube size={18} />
            </a>
          </div>
        </div>

        {/* Property Types */}
        <div>
          <h3 className="font-display font-semibold text-sm tracking-wide text-text-primary mb-5 uppercase">
            Browse By Type
          </h3>
          <ul className="space-y-3">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-sm text-text-muted hover:text-accent transition-colors duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Societies */}
        <div>
          <h3 className="font-display font-semibold text-sm tracking-wide text-text-primary mb-5 uppercase">
            Areas We Cover
          </h3>
          <ul className="space-y-3">
            {societies.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-sm text-text-muted hover:text-accent transition-colors duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-display font-semibold text-sm tracking-wide text-text-primary mb-5 uppercase">
            Get in Touch
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-sm text-text-muted">
              <MapPin size={14} className="text-accent shrink-0 mt-0.5" />
              <span>Office 12, DHA Phase 5, Commercial Zone, Lahore, Pakistan</span>
            </li>
            <li>
              <a
                href="tel:+923036570074"
                className="flex items-center gap-3 text-sm text-text-muted hover:text-accent transition-colors duration-200"
              >
                <Phone size={14} className="text-accent" />
                +92 303 6570074
              </a>
            </li>
            <li>
              <a
                href="mailto:info@pkestate.pk"
                className="flex items-center gap-3 text-sm text-text-muted hover:text-accent transition-colors duration-200"
              >
                <Mail size={14} className="text-accent" />
                info@pkestate.pk
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-xs text-text-faint">
          © {new Date().getFullYear()} PKEstate. All rights reserved.
        </p>
        <div className="flex gap-6">
          <Link to="/admin" className="text-xs text-text-faint hover:text-text-muted transition-colors">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  )
}

function WhatsAppIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
