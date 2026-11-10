import { useEffect, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { sketchPages, sketchCutouts } from './sketchbookPages'
import type { SketchImage, SketchPage } from './sketchbookPages'
import './sketchbook.css'

function useMedia(query: string) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const matcher = window.matchMedia(query)
    const update = () => setMatches(matcher.matches)
    matcher.addEventListener('change', update)
    return () => matcher.removeEventListener('change', update)
  }, [query])
  return matches
}

type Direction = 'next' | 'previous'
type Turn = { direction: Direction; to: number }
type GalleryFilter = 'all' | 'full' | 'cutout'

function PageFace({ page, number, className = '', onZoom }: { page?: SketchPage; number?: number; className?: string; onZoom?: (page: SketchPage) => void }) {
  return <div className={`book-face ${className}`}>
    {page ? <>
      <button className="book-art" type="button" onClick={() => onZoom?.(page)} title="Enlarge this page" aria-label={`Enlarge ${page.title}`}>
        <img src={page.image} alt={page.title} draggable={false} />
        <span className="book-magnify" aria-hidden="true">↗</span>
      </button>
      <div className="book-face-bottom"><span aria-hidden="true">✳</span><span>{number !== undefined ? String(number + 1).padStart(2, '0') : ''}</span></div>
    </> : <div className="book-blank" aria-hidden="true">✳</div>}
  </div>
}

function ImageZoom({ item, onClose, onOpenInBook }: { item: SketchImage; onClose: () => void; onOpenInBook?: (item: SketchPage) => void }) {
  const [actualSize, setActualSize] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)
  useEffect(() => { closeRef.current?.focus() }, [])
  return <div className="book-modal-backdrop book-zoom-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) onClose() }}>
    <section className="book-zoom-modal" role="dialog" aria-modal="true" aria-label={`Enlarged artwork: ${item.title}`}>
      <div className="book-zoom-toolbar"><span>{item.title}</span><div>
        {item.kind === 'full' && onOpenInBook && <button className="book-modal-action" onClick={() => onOpenInBook(item)}>Open in book ↗</button>}
        <button className="book-modal-action" onClick={() => setActualSize(v => !v)}>{actualSize ? 'Fit to screen' : 'Actual size'}</button>
        <button ref={closeRef} className="book-icon-button" onClick={onClose} aria-label="Close enlarged image">✕</button>
      </div></div>
      <div className={`book-zoom-scroller ${actualSize ? 'is-actual' : ''}`}><img src={item.image} alt={item.title} /></div>
    </section>
  </div>
}

function SketchGallery({ onZoom, onOpenInBook }: { onZoom: (item: SketchImage) => void; onOpenInBook: (page: SketchPage) => void }) {
  const [filter, setFilter] = useState<GalleryFilter>('all')
  const items: SketchImage[] = [...sketchPages, ...sketchCutouts]
  const filtered = filter === 'all' ? items : items.filter(item => item.kind === filter)
  return <div className="sketch-gallery-inner">
    <div className="sketch-gallery-head"><div><p className="eyebrow">A closer look</p><h2>Every little <em>detail.</em></h2><p>Explore complete sketchbook pages and the curious characters hiding inside them.</p></div>
      <div className="sketch-gallery-filters" aria-label="Filter sketchbook gallery" role="group">
        {([['all', 'All drawings'], ['full', 'Full pages'], ['cutout', 'Characters & details']] as const).map(([key,label]) => <button key={key} type="button" aria-pressed={filter === key} className={filter === key ? 'selected' : ''} onClick={() => setFilter(key)}>{label}</button>)}
      </div>
    </div>
    <div className="sketch-gallery-grid">
      {filtered.map((item) => <div key={item.id} className={`sketch-gallery-card ${item.kind}`}>
        <button type="button" className="sketch-gallery-thumb" onClick={() => onZoom(item)} aria-label={`Enlarge ${item.title}`}>
          <img src={item.image} alt={item.title} loading="lazy" /><span className="sketch-gallery-zoom" aria-hidden="true">↗</span>
        </button>
        <div className="sketch-gallery-caption"><span>{item.kind === 'full' ? 'Full page' : 'Character / detail'}</span>
          {item.kind === 'full' && <button type="button" onClick={() => onOpenInBook(item)}>Find in book ↗</button>}
        </div>
      </div>)}
    </div>
  </div>
}

export default function Sketchbook() {
  const onePage = useMedia('(max-width: 700px)')
  const reduceMotion = useMedia('(prefers-reduced-motion: reduce)')
  const pageCount = sketchPages.length
  const [open, setOpen] = useState(false)
  const [showCover, setShowCover] = useState(true)
  const [index, setIndex] = useState(0)
  const [turn, setTurn] = useState<Turn | null>(null)
  const [showGallery, setShowGallery] = useState(false)
  const [zoom, setZoom] = useState<SketchImage | null>(null)
  const pointerStart = useRef<number | null>(null)
  const galleryRef = useRef<HTMLElement>(null)
  const step = onePage ? 1 : 2
  const last = onePage ? pageCount - 1 : Math.floor((pageCount - 1) / 2) * 2

  useEffect(() => { setTurn(null); if (!onePage) setIndex(current => Math.floor(current / 2) * 2) }, [onePage])
  useEffect(() => {
    if (!open && !zoom) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previous }
  }, [open, zoom])

  function go(direction: Direction) {
    if (!open || turn || zoom) return
    const to = Math.max(0, Math.min(last, index + (direction === 'next' ? step : -step)))
    if (to === index) return
    if (reduceMotion) setIndex(to)
    else setTurn({ direction, to })
  }
  function openBook(selected?: number) {
    if (selected !== undefined) {
      setIndex(onePage ? selected : Math.floor(selected / 2) * 2)
      setShowCover(false)
    } else setShowCover(true)
    setTurn(null)
    setZoom(null)
    setOpen(true)
  }
  function closeBook() { setOpen(false); setTurn(null); setShowCover(true) }
  function openPageFromGrid(page: SketchPage) {
    const selected = sketchPages.findIndex(p => p.id === page.id)
    if (selected >= 0) openBook(selected)
  }
  function revealGallery() {
    setShowGallery(true)
    // Let the new grid render before scrolling to its first row.
    requestAnimationFrame(() => requestAnimationFrame(() => galleryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })))
  }
  function browseGallery() {
    closeBook()
    revealGallery()
  }

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { if (zoom) setZoom(null); else if (open) closeBook(); return }
      if (zoom || !open || event.altKey || event.ctrlKey || event.metaKey || event.target instanceof HTMLInputElement) return
      if (event.key === 'ArrowRight') { event.preventDefault(); go('next') }
      if (event.key === 'ArrowLeft') { event.preventDefault(); go('previous') }
    }
    window.addEventListener('keydown', listener)
    return () => window.removeEventListener('keydown', listener)
  })
  function onPointerDown(e: ReactPointerEvent<HTMLDivElement>) { if (e.pointerType !== 'mouse' || e.buttons === 1) pointerStart.current = e.clientX }
  function onPointerUp(e: ReactPointerEvent<HTMLDivElement>) {
    if (pointerStart.current === null) return
    const diff = e.clientX - pointerStart.current
    pointerStart.current = null
    if (Math.abs(diff) > 65) go(diff < 0 ? 'next' : 'previous')
  }

  const left = turn?.direction === 'previous' ? sketchPages[turn.to] : sketchPages[index]
  const right = turn?.direction === 'next' ? sketchPages[turn.to + 1] : sketchPages[index + 1]
  const single = turn ? sketchPages[turn.to] : sketchPages[index]
  const turnFront = turn?.direction === 'next' ? sketchPages[index + (onePage ? 0 : 1)] : sketchPages[index]
  const turnBack = turn ? (turn.direction === 'next' ? sketchPages[turn.to] : sketchPages[turn.to + (onePage ? 0 : 1)]) : undefined
  const atBeginning = index === 0
  const atEnd = index >= last

  return <main className="sketchbook-page sketchbook-v5">
    <section className="sketchbook-heading"><p className="eyebrow">A peek inside Anna's imagination</p><h1>The <em>sketchbook.</em></h1></section>
    <section className="sketchbook-reading" aria-label="Interactive sketchbook">
      <div className={`book-table ${open ? 'is-immersive' : ''}`} role={open ? 'dialog' : undefined} aria-modal={open ? true : undefined} aria-label={open ? "Anna's interactive sketchbook" : undefined}>
        {open && <div className="immersive-book-topbar"><span>✳ Out of the Margins <i> / </i> Anna's sketchbook</span><button type="button" onClick={closeBook} aria-label="Close immersive sketchbook">Close <span aria-hidden="true">✕</span></button></div>}
        <div className={`book-frame ${onePage ? 'is-single' : ''} ${open ? 'book-is-open' : ''}`} onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerCancel={() => { pointerStart.current = null }}>
          <div className="book-bookblock" aria-hidden="true" />
          <div className="book-pages">
            {onePage ? <PageFace page={single} number={turn?.to ?? index} onZoom={setZoom} /> : <>
              <PageFace page={left} number={turn?.direction === 'previous' ? turn.to : index} className="book-left" onZoom={setZoom} />
              <PageFace page={right} number={turn?.direction === 'next' ? turn.to + 1 : index + 1} className="book-right" onZoom={setZoom} />
            </>}
            {!onePage && <span className="book-spine" aria-hidden="true" />}
            {turn && <div className={`book-turn-sheet book-turn-${turn.direction}`} onAnimationEnd={e => { if (e.target !== e.currentTarget) return; setIndex(turn.to); setTurn(null) }}>
              <PageFace page={turnFront} number={turn.direction === 'next' ? index + (onePage ? 0 : 1) : index} className="book-turn-front" />
              <PageFace page={turnBack} number={turn.to + (turn.direction === 'previous' && !onePage ? 1 : 0)} className="book-turn-back" />
            </div>}
          </div>
          {showCover && <div className={`book-cover ${open ? 'cover-opening' : ''}`} onTransitionEnd={e => { if (e.propertyName === 'transform' && open) setShowCover(false) }}>
            <div className="book-cover-content">
              <div className="book-cover-kicker"><span>Out of the Margins</span><span>Art by Anna</span></div>
              <span className="book-cover-mark">✳</span><h2>the<br/><em>sketchbook</em></h2><p>Little worlds, big ideas, and everything in between.</p>
              <img src="/sketches/feeling-good-cat.png" alt="" />
              <button type="button" onClick={() => openBook()} className="book-cover-open">Open the book <span aria-hidden="true">↗</span></button>
            </div>
          </div>}
        </div>
        {open && <div className="book-controlbar">
          <button className="book-nav-button" onClick={() => go('previous')} disabled={atBeginning || Boolean(turn)} aria-label="Previous page">← <span>Previous</span></button>
          <div className="book-control-center"><span className="book-page-counter">{`Pages ${index + 1}${!onePage && index + 1 < pageCount ? '–' + (index + 2) : ''} / ${pageCount}`}</span><button type="button" className="book-index-button" onClick={browseGallery}>View all pages ⊞</button></div>
          <button className="book-nav-button" onClick={() => go('next')} disabled={atEnd || Boolean(turn)} aria-label="Next page"><span>Next</span> →</button>
        </div>}
      </div>
      {!open && <div className="book-below-cover"><p>Turn the pages, follow the drawings, or discover the details.</p><button type="button" className="book-index-button" onClick={() => { if (showGallery) setShowGallery(false); else revealGallery() }}>{showGallery ? 'Hide gallery −' : 'View all pages & characters ↗'}</button></div>}
    </section>
    {showGallery && <section ref={galleryRef} className="sketch-gallery-section"><SketchGallery onZoom={setZoom} onOpenInBook={openPageFromGrid}/></section>}
    {!showGallery && <section className="book-outro"><p className="eyebrow">A little more to discover</p><h2>Every drawing has <em>a story.</em></h2><button type="button" className="book-index-button" onClick={revealGallery}>Explore all the drawings ↗</button></section>}
    {zoom && <ImageZoom key={zoom.id} item={zoom} onClose={() => setZoom(null)} onOpenInBook={openPageFromGrid} />}
  </main>
}
