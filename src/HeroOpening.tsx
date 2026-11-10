import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { artist, doodles } from './content'
import { heroEscapees } from './escapees'

function clamp01(value: number) { return Math.max(0, Math.min(1, value)) }
function easeOutCubic(value: number) { return 1 - Math.pow(1 - clamp01(value), 3) }

/**
 * Scroll-reveal showcase for Anna's original artwork.
 * The paper leaves slide apart, while the mascot breaks free from the typography.
 * Kept independent from gallery/navigation so we can iterate on the choreography.
 */
export default function HeroOpening({ onExplore }: { onExplore: () => void }) {
  const stageRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const section = stageRef.current
        if (!section) return
        const bounds = section.getBoundingClientRect()
        const scrollable = Math.max(1, bounds.height - window.innerHeight)
        setProgress(clamp01(-bounds.top / scrollable))
      })
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      cancelAnimationFrame(frame)
    }
  }, [])

  // Deliberately staggered choreography. The pages move first, Anna's character lingers.
  const opening = easeOutCubic((progress - 0.10) / 0.83)
  const wordExit = easeOutCubic((progress - 0.18) / 0.45)
  const escape = easeOutCubic((progress - 0.27) / 0.62)
  const colorReveal = easeOutCubic((progress - 0.54) / 0.28)
  const style = {
    '--progress': progress,
    '--open': opening,
    '--word-exit': wordExit,
    '--escape': escape,
    '--color-reveal': colorReveal,
  } as CSSProperties

  return (
    <section ref={stageRef} className="opening opening-v2" style={style} aria-label="Out of the Margins: illustrated introduction">
      <div className="opening-sticky">
        <div className="paint-underneath">
          <img src="/art/BlackLightWoman1.webp" alt="" />
          <div className="reveal-caption">
            <p className="eyebrow">The page isn't the limit</p>
            <h2>Color breaks<br/><em>through.</em></h2>
            <p className="reveal-caption-copy">Welcome to Anna's imagination, where every drawing has a life of its own.</p>
            <button className="scribble-button light" onClick={onExplore}>Explore her art <span aria-hidden="true">↗</span></button>
          </div>
        </div>

        <div className="paper-seam-backing" aria-hidden="true" />
        <div className="opening-paper opening-paper-left" aria-hidden="true">
          <span className="paper-grain" />
          <img className="paper-source paper-source-left" src={doodles.sourceFaces} alt="" />
          <span className="page-corner-note">from the sketchbook <span>✳</span></span>
        </div>
        <div className="opening-paper opening-paper-right" aria-hidden="true">
          <span className="paper-grain" />
          <img className="paper-source paper-source-right" src={doodles.sourceCat} alt="" />
          <span className="paper-fold" />
          <span className="page-number">A.W. / 001</span>
        </div>

        <div className="hero-content hero-content-v2">
          <p className="eyebrow">✳ An artist's unfolding universe</p>
          <h1><span className="hero-line">Out of</span><span className="hero-line hero-line-the">the</span><span className="hero-line hero-line-margins">Margins<span className="period">.</span></span></h1>
          <p>{artist.tagline}</p>
          <button className="scribble-button" onClick={onExplore}>Wander inside <span aria-hidden="true">↗</span></button>
        </div>

        <div className="mascot-escape" aria-label="Anna's pink-horned character breaking out of the title">
          <img src={doodles.mascot} alt="Anna's pink-horned, smiling illustrated character" />
        </div>
        <span className="mascot-note" aria-hidden="true">out she goes <span>↗</span></span>

        {heroEscapees.map(doodle => {
          const arrival = easeOutCubic((progress - doodle.enterAt) / .26)
          const placement = {
            left: doodle.left, right: doodle.right, top: doodle.top, bottom: doodle.bottom,
            width: doodle.width,
            '--arrival': arrival,
            '--from-angle': doodle.angle ?? '0deg',
            '--from-x': doodle.drift ?? '30px',
            '--doodle-opacity': doodle.opacity ?? .9,
          } as CSSProperties
          return <img key={doodle.id} className={`hero-escapee hero-escapee-${doodle.id} ${doodle.tone === 'color' ? 'hero-escapee-color' : ''}`} src={doodle.src} alt="" aria-hidden="true" draggable="false" style={placement}/>
        })}
        <div className="scroll-hint" aria-hidden="true">Scroll to let them out <span>↓</span></div>
      </div>
    </section>
  )
}
