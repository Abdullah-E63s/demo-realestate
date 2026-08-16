import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const labelRef = useRef(null)

  const pos = useRef({ x: -100, y: -100 })
  const ring = useRef({ x: -100, y: -100 })
  const velocity = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  const [cursorState, setCursorState] = useState({
    hovered: false,
    cardHovered: false,
    textHovered: false,
    clicked: false,
    label: '',
    visible: false,
  })

  useEffect(() => {
    // Disable on touch / mobile devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return
    }

    const dot = dotRef.current
    const ringEl = ringRef.current
    const labelEl = labelRef.current
    if (!dot || !ringEl) return

    const onMouseMove = (e) => {
      const { clientX: x, clientY: y } = e
      velocity.current = {
        x: x - pos.current.x,
        y: y - pos.current.y,
      }
      pos.current = { x, y }

      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`

      if (!cursorState.visible) {
        setCursorState((s) => ({ ...s, visible: true }))
      }
    }

    const onMouseDown = () => setCursorState((s) => ({ ...s, clicked: true }))
    const onMouseUp = () => setCursorState((s) => ({ ...s, clicked: false }))
    const onMouseLeave = () => setCursorState((s) => ({ ...s, visible: false }))
    const onMouseEnter = () => setCursorState((s) => ({ ...s, visible: true }))

    // Magnetic / State detection
    const onMouseOver = (e) => {
      const target = e.target
      if (!target || !(target instanceof HTMLElement)) return

      const isCard = target.closest('article') || target.closest('.group') || target.closest('[data-cursor-view]')
      const isButtonOrLink = target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button') || target.dataset.cursor
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT'

      if (isInput) {
        setCursorState((s) => ({ ...s, textHovered: true, hovered: false, cardHovered: false, label: '' }))
      } else if (isCard && !isButtonOrLink) {
        setCursorState((s) => ({ ...s, cardHovered: true, hovered: false, textHovered: false, label: 'VIEW' }))
      } else if (isButtonOrLink) {
        setCursorState((s) => ({ ...s, hovered: true, cardHovered: false, textHovered: false, label: '' }))
      }
    }

    const onMouseOut = (e) => {
      const target = e.target
      if (!target || !(target instanceof HTMLElement)) return
      setCursorState((s) => ({
        ...s,
        hovered: false,
        cardHovered: false,
        textHovered: false,
        label: '',
      }))
    }

    // Animation Loop with smooth spring damping
    const animate = () => {
      const ease = 0.16
      ring.current.x += (pos.current.x - ring.current.x) * ease
      ring.current.y += (pos.current.y - ring.current.y) * ease

      // Calculate slight directional skew based on mouse velocity
      const angle = Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI)
      const speed = Math.min(Math.hypot(velocity.current.x, velocity.current.y) * 0.04, 0.4)

      ringEl.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) scale(${1 + speed}, ${1 - speed * 0.5}) rotate(${angle}deg)`

      // Decay velocity
      velocity.current.x *= 0.85
      velocity.current.y *= 0.85

      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mouseover', onMouseOver, { passive: true })
    document.addEventListener('mouseout', onMouseOut, { passive: true })

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
      cancelAnimationFrame(rafRef.current)
    }
  }, [cursorState.visible])

  return (
    <div
      className={`luxury-cursor-wrapper pointer-events-none fixed inset-0 z-[99999] overflow-hidden ${
        cursorState.visible ? 'opacity-100' : 'opacity-0'
      } transition-opacity duration-300 hidden md:block`}
      aria-hidden="true"
    >
      {/* Precision Center Dot */}
      <div
        ref={dotRef}
        className={`luxury-cursor-dot fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-accent pointer-events-none transition-all duration-150 ${
          cursorState.hovered ? 'scale-0 opacity-0' : ''
        } ${cursorState.textHovered ? 'scale-y-150 scale-x-50 !bg-text-primary' : ''} ${
          cursorState.clicked ? 'scale-75' : ''
        }`}
      />

      {/* Floating Aura / Ring */}
      <div
        ref={ringRef}
        className={`luxury-cursor-ring fixed top-0 left-0 -ml-5 -mt-5 w-10 h-10 rounded-full border border-accent/40 pointer-events-none flex items-center justify-center transition-[width,height,border-color,background-color,backdrop-filter] duration-250 ease-out ${
          cursorState.hovered
            ? '!w-14 !h-14 !-ml-7 !-mt-7 !border-accent bg-accent/15 backdrop-blur-[2px]'
            : ''
        } ${
          cursorState.cardHovered
            ? '!w-20 !h-20 !-ml-10 !-mt-10 !border-accent/80 bg-accent text-bg backdrop-blur-md shadow-[0_0_30px_rgba(200,169,126,0.35)]'
            : ''
        } ${
          cursorState.textHovered
            ? '!w-1 !h-6 !-ml-0.5 !-mt-3 !border-none !bg-accent rounded-xs'
            : ''
        } ${cursorState.clicked ? 'scale-90 !border-accent' : ''}`}
      >
        {cursorState.cardHovered && (
          <span
            ref={labelRef}
            className="text-[10px] font-display font-extrabold tracking-widest text-bg select-none animate-fade-up"
          >
            VIEW
          </span>
        )}
      </div>
    </div>
  )
}
