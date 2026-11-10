import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import type { DoodlePlacement } from './escapees'

/**
 * Scroll-triggered decorative drawing layer.
 * IntersectionObserver is used instead of a global scroll listener.
 * Changes to the art roster are made in escapees.ts, not here.
 */
export default function EscapingDoodles({ items }: { items: DoodlePlacement[] }) {
  const areaRef = useRef<HTMLDivElement>(null)
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    const target = areaRef.current
    if (!target) return
    if (!('IntersectionObserver' in window)) { setEntered(true); return }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setEntered(true); observer.disconnect() }
    }, { threshold: 0, rootMargin: '0px 0px -14% 0px' })
    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  return <div ref={areaRef} className="ambient-doodles" aria-hidden="true">
    {items.map((item, index) => {
      const style = {
        left: item.left, right: item.right, top: item.top, bottom: item.bottom,
        width: item.width,
        '--angle': item.angle ?? '0deg',
        '--doodle-opacity': item.opacity ?? .8,
        '--delay': `${item.delay ?? index * 110}ms`,
      } as CSSProperties
      return <span key={item.id} className={`ambient-doodle ${item.atmosphere ? 'is-atmospheric' : ''} ${entered ? 'is-visible' : ''} ink-${item.tone ?? 'dark'}`} style={style}>
        <img src={item.src} alt="" loading="lazy" draggable="false"/>
      </span>
    })}
  </div>
}
