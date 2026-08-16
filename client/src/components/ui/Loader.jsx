export default function Loader({ text = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-32 gap-4">
      <div className="w-10 h-10 border border-border border-t-accent rounded-full animate-spin" />
      <p className="text-text-muted text-sm tracking-wide">{text}</p>
    </div>
  )
}

export function InlineLoader() {
  return (
    <span className="inline-flex items-center gap-2 text-text-muted text-sm">
      <span className="w-4 h-4 border border-border border-t-accent rounded-full animate-spin" />
      Loading
    </span>
  )
}
