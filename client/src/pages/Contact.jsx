import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import ContactForm from '../components/forms/ContactForm'

const CONTACT_INFO = [
  {
    icon: MapPin,
    label: 'Office Address',
    value: 'Office 12, Commercial Zone, DHA Phase 5, Lahore, Pakistan',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+92 303 6570074',
    href: 'tel:+923036570074',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'info@pkestate.pk',
    href: 'mailto:info@pkestate.pk',
  },
  {
    icon: Clock,
    label: 'Office Hours',
    value: 'Mon–Sat: 9AM – 7PM (PKT)',
  },
]

export default function Contact() {
  return (
    <main className="pt-24">
      {/* Header */}
      <div className="px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto py-16 border-b border-border">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="overline mb-4"
        >
          Get in Touch
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display font-bold text-display-lg text-text-primary"
        >
          Let's talk{' '}
          <span className="font-serif italic font-normal text-accent">property.</span>
        </motion.h1>
      </div>

      {/* Main grid */}
      <section className="section-pad px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="font-display font-bold text-xl text-text-primary mb-6">Send us a message</h2>
            <ContactForm />
          </motion.div>

          {/* Info sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            {/* WhatsApp CTA */}
            <div className="bg-[#128C7E] p-6">
              <p className="font-display font-bold text-lg text-white mb-2">
                Prefer WhatsApp?
              </p>
              <p className="text-white/70 text-sm mb-5">
                Most Pakistanis close deals on WhatsApp. So do we.
              </p>
              <a
                href="https://wa.me/923036570074?text=Hi%2C%20I'd%20like%20to%20discuss%20a%20property."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-[#128C7E] font-display font-bold text-sm px-6 py-3 hover:bg-gray-100 transition-colors"
              >
                <WhatsAppIcon size={14} />
                Open WhatsApp
              </a>
            </div>

            {/* Contact details */}
            <div className="bg-bg-secondary border border-border p-6 space-y-6">
              {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-8 h-8 border border-border flex items-center justify-center shrink-0">
                    <Icon size={13} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-text-muted mb-0.5">{label}</p>
                    {href ? (
                      <a href={href} className="text-sm text-text-primary hover:text-accent transition-colors">
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm text-text-primary">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="bg-bg-raised border border-border h-56 flex flex-col items-center justify-center gap-2">
              <MapPin size={20} className="text-accent" />
              <p className="text-text-muted text-sm text-center">
                DHA Phase 5, Lahore
              </p>
              <a
                href="https://maps.google.com/?q=DHA+Phase+5+Lahore"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-accent hover:underline mt-1"
              >
                Open in Google Maps →
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

function WhatsAppIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
