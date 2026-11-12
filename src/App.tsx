import { useEffect, useRef, useState } from 'react'
import type { Artwork, Category } from './content'
import { art, artist } from './content'
import HeroOpening from './HeroOpening'
import EscapingDoodles from './EscapingDoodles'
import Sketchbook from './Sketchbook'
import { homeDoodles, aboutDoodles } from './escapees'

type Page = 'home' | 'work' | 'sketchbook' | 'about'
const pages: Page[] = ['home','work','sketchbook','about']
function pageFromHash(): Page {
  const page = window.location.hash.replace(/^#\/?/, '').split('/')[0]
  return pages.includes(page as Page) ? page as Page : 'home'
}

function SiteNav({page, navigate}:{page:Page,navigate:(page:Page)=>void}) {
  return <header className={`site-nav ${page==='work' ? 'site-nav-dark' : ''}`}>
    <button className="brand" onClick={()=>navigate('home')} aria-label="Out of the Margins, art by Anna, home"><span className="brand-prefix">art by </span>anna<span className="brand-star">✳</span></button>
    <nav aria-label="Main navigation"><button className={page==='home'?'active':''} onClick={()=>navigate('home')}>Home</button><button className={page==='work'?'active':''} onClick={()=>navigate('work')}>The work</button><button className={page==='sketchbook'?'active':''} onClick={()=>navigate('sketchbook')}>Sketchbook</button><button className={page==='about'?'active':''} onClick={()=>navigate('about')}>Meet Anna</button></nav>
    <button className="nav-cta" onClick={()=>navigate('work')}>Explore art <span aria-hidden="true">↗</span></button>
  </header>
}

function SectionHeading({label,children}:{label:string,children:React.ReactNode}) {
  return <div className="section-heading"><p className="eyebrow">{label}</p><h2>{children}</h2></div>
}

function GalleryGrid({items,onOpen}:{items:Artwork[],onOpen:(item:Artwork)=>void}) {
  return <div className="gallery-grid">{items.map((item,index)=><button type="button" className="art-tile" key={item.id} onClick={()=>onOpen(item)} aria-label={`View ${item.title}`}>
    <div className="art-image"><img loading={index<3?'eager':'lazy'} src={item.thumb ?? item.image} alt={item.alt}/><span className="view-label">View artwork ↗</span></div>
    <div className="tile-info"><span><strong>{item.title}</strong><small>{item.medium ?? item.category}</small></span><span aria-hidden="true">↗</span></div>
  </button>)}</div>
}

function Home({navigate,onOpen}:{navigate:(page:Page)=>void,onOpen:(item:Artwork)=>void}) {
  return <main>
    <HeroOpening onExplore={()=>navigate('work')}/>
    <section className="featured dark-section ambient-host"><EscapingDoodles items={homeDoodles.featured}/><div className="section-inner"><SectionHeading label="01 / The things that become paintings">Ideas that refuse<br/>to <em>stay quiet.</em></SectionHeading><GalleryGrid items={art.filter(a=>a.featured)} onOpen={onOpen}/><button className="text-link" onClick={()=>navigate('work')}>See all the artwork <span>↗</span></button></div></section>
    <section className="sketch-section ambient-host"><EscapingDoodles items={homeDoodles.sketch}/><div className="section-inner sketch-layout"><div><p className="eyebrow">02 / The sketchbook</p><h2>Little worlds,<br/><em>big ideas.</em></h2><p>Not every idea needs a frame. Some become creatures, scribbles, funny little faces, and unexpected friends hiding between the lines.</p><button className="scribble-button open-sketchbook-cta" onClick={()=>navigate('sketchbook')}>Open the sketchbook <span>↗</span></button></div><div className="sketch-photo"><img src="/art/Sketchbook_JungleCaveManScene.webp" alt="Anna's densely detailed sketchbook scene"/><span>ideas have no edges ✳</span><img className="sketch-sticker" src="/book/cutouts/v6-many-eyed-monster.png" alt=""/></div></div></section>
    <section className="closing-section ambient-host"><EscapingDoodles items={homeDoodles.closing}/><span className="eyebrow">An artist's unfolding universe</span><h2>There’s more<br/>around the corner<span>.</span></h2><button className="scribble-button" onClick={()=>navigate('about')}>Meet Anna <span>↗</span></button></section>
  </main>
}

function Work({onOpen}:{onOpen:(item:Artwork)=>void}) {
  const [filter,setFilter] = useState<Category|'all'>('all')
  const filters:{id:Category|'all',label:string}[]=[{id:'all',label:'Everything'},{id:'painting',label:'Paintings'},{id:'blacklight',label:'Blacklight'},{id:'mural',label:'Murals'},{id:'other',label:'Other mediums'}]
  const filtered = filter==='all' ? art.filter(a=>a.category!=='sketchbook') : art.filter(a=>a.category===filter)
  return <main className="work-page dark-section"><div className="section-inner"><p className="eyebrow">A cabinet of curiosities / Anna's work</p><h1>Some things<br/>can't <em>stay inside</em><br/>the lines.</h1><p className="work-intro">Paintings, glowing experiments, and walls transformed into color. A collection that’s still growing.</p><div className="filters" role="group" aria-label="Filter artwork">{filters.map(item=><button type="button" aria-pressed={filter===item.id} className={filter===item.id?'selected':''} onClick={()=>setFilter(item.id)} key={item.id}>{item.label}</button>)}</div><GalleryGrid items={filtered} onOpen={onOpen}/>{filtered.length===0&&<p>More artwork coming soon.</p>}<button className="text-link" onClick={()=>window.location.hash='/sketchbook'}>Turn the sketchbook pages <span>↗</span></button></div></main>
}

function About({navigate}:{navigate:(page:Page)=>void}) {
  return <main className="about-page about-studio-page ambient-host"><EscapingDoodles items={aboutDoodles}/>
    <div className="section-inner about-layout about-studio-layout">
      <div className="about-copy"><p className="eyebrow">The person behind the doodles</p><h1 className="about-one-line">Hi, I'm <em>Anna.</em></h1><p>{artist.introduction}</p><p>{artist.about}</p><p>{artist.closing}</p><button className="scribble-button" onClick={()=>navigate('work')}>Explore the work <span>↗</span></button></div>
      <div className="studio-wall" aria-label="Photographs of Anna creating art and examples of her work">
        <figure className="studio-card studio-main"><img src="/art/AnnaWorking2.webp" alt="Anna painting a colorful large face on a wall"/><figcaption>In her element <span>✳</span></figcaption></figure>
        <figure className="studio-card studio-process"><img src="/art/AnnaWorking.webp" alt="Anna working on a large mural"/><figcaption>Making something from nothing</figcaption></figure>
        <figure className="studio-card studio-portrait"><img src="/art/AnnaProfile.jpg" alt="Portrait of Anna smiling at a restaurant"/><figcaption>Meet Anna <span>✳</span></figcaption></figure>
        <span className="studio-handwriting">always making<br/>something ↗</span>
      </div>
    </div>
  </main>
}

function Lightbox({item,onClose}:{item:Artwork,onClose:()=>void}) {
  const [showAlternate,setShowAlternate]=useState(false)
  const closeRef=useRef<HTMLButtonElement>(null)
  const dialogRef=useRef<HTMLDivElement>(null)
  useEffect(()=>{
    const previous=document.activeElement as HTMLElement|null
    const prevOverflow=document.body.style.overflow
    document.body.style.overflow='hidden'
    closeRef.current?.focus()
    const keydown=(e:KeyboardEvent)=>{
      if(e.key==='Escape'){e.preventDefault();onClose();return}
      if(e.key!=='Tab')return
      const focusables=Array.from(dialogRef.current?.querySelectorAll<HTMLButtonElement>('button:not([disabled])')??[])
      if(!focusables.length)return
      const first=focusables[0],last=focusables[focusables.length-1]
      if(e.shiftKey && document.activeElement===first){e.preventDefault();last.focus()}
      else if(!e.shiftKey && document.activeElement===last){e.preventDefault();first.focus()}
    }
    window.addEventListener('keydown',keydown)
    return ()=>{document.body.style.overflow=prevOverflow;window.removeEventListener('keydown',keydown);previous?.focus()}
  },[onClose])
  return <div role="presentation" className="lightbox-backdrop exhibition-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}><div ref={dialogRef} className="lightbox exhibition-lightbox" role="dialog" aria-modal="true" aria-label={`View artwork: ${item.title}`}><button ref={closeRef} className="lightbox-close" onClick={onClose} aria-label="Close artwork">✕</button><div className="exhibition-artwork"><img src={showAlternate && item.alternateImage ? item.alternateImage : item.image} alt={`${item.alt}${showAlternate ? ' photographed in daylight' : ''}`}/></div><div className="lightbox-caption"><span className="eyebrow">Art by Anna / {item.category}</span><h3>{item.title}</h3><p>{item.medium ?? item.category}{item.year?` · ${item.year}`:''}</p>{item.alternateImage && <div className="lightbox-lighting"><span>See it in a different light</span><div role="group" aria-label="Artwork lighting"><button type="button" className={!showAlternate?'selected':''} aria-pressed={!showAlternate} onClick={()=>setShowAlternate(false)}>{item.primaryLabel ?? 'Original'}</button><button type="button" className={showAlternate?'selected':''} aria-pressed={showAlternate} onClick={()=>setShowAlternate(true)}>{item.alternateLabel ?? 'Alternative'}</button></div></div>}{item.description&&<p>{item.description}</p>}</div></div></div>
}

export default function App(){
  const [page,setPage]=useState<Page>(pageFromHash)
  const [selected,setSelected]=useState<Artwork|null>(null)
  useEffect(()=>{const handler=()=>{setPage(pageFromHash());window.scrollTo({top:0,behavior:'instant'})};window.addEventListener('hashchange',handler);return ()=>window.removeEventListener('hashchange',handler)},[])
  const navigate=(target:Page)=>{setPage(target);if(window.location.hash!==`#/${target}`)window.location.hash=`/${target}`;window.scrollTo({top:0,behavior:'instant'})}
  const closeLightbox=()=>setSelected(null)
  return <><SiteNav page={page} navigate={navigate}/>{page==='home'?<Home navigate={navigate} onOpen={setSelected}/>:page==='work'?<Work onOpen={setSelected}/>:page==='sketchbook'?<Sketchbook/>:<About navigate={navigate}/>}<footer className="site-footer"><span>✳ Out of the Margins</span><span>Art by Anna · Made with curiosity</span>{artist.contactEmail?<a href={`mailto:${artist.contactEmail}`}>Get in touch ↗</a>:<span>More to come ↗</span>}{artist.instagram&&<a href={artist.instagram} target="_blank" rel="noreferrer">Instagram ↗</a>}</footer>{selected&&<Lightbox item={selected} onClose={closeLightbox}/>}</>
}
