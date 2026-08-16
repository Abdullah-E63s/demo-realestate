export default function SectionWrapper({ children, className = '', id = '' }) {
  return (
    <section
      id={id}
      className={`section-pad px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto ${className}`}
    >
      {children}
    </section>
  )
}
