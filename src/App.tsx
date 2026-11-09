import { useEffect, useRef, useState } from 'react'
import type { Artwork, Category } from './content'
import { art, artist, doodles } from './content'

type Page = 'home' | 'work' | 'about'
const pages: Page[] = ['home','work','about']
function pageFromHash(): Page {
  const page = window.location.hash.replace(/^#\/?/, '').split('/')[0]
  return pages.includes(page as Page) ? page as Page : 'home'
}

function SiteNav({page, navigate}:{page:Page,navigate:(page:Page)=>void}) {
  return <header className="site-nav">
    <button className="brand" onClick={()=>navigate('home')} aria-label="Out of the Margins, home">anna<span className="brand-star">✳</span></button>
    <nav aria-label="Main navigation"><button className={page==='home'?'active':''} onClick={()=>navigate('home')}>Home</button><button className={page==='work'?'active':''} onClick={()=>navigate('work')}>The work</button><button className={page==='about'?'active':''} onClick={()=>navigate('about')}>About</button></nav>
    <button className="nav-cta" onClick={()=>navigate('work')}>Explore art <span aria-hidden="true">↗</span></button>
  </header>
}

function SectionHeading({label,children}:{label:string,children:React.ReactNode}) {
  return <div className="section-heading"><p className="eyebrow">{label}</p><h2>{children}</h2></div>
}

function GalleryGrid({items,onOpen}:{items:Artwork[],onOpen:(item:Artwork)=>void}) {
  return <div className="gallery-grid">{items.map((item,index)=><button type="button" className="art-tile" key={item.id} onClick={()=>onOpen(item)} aria-label={`View ${item.title}`}>
    <div className="art-image"><img loading={index<3?'eager':'lazy'} src={item.image} alt={item.alt}/><span className="view-label">View artwork ↗</span></div>
    <div className="tile-info"><span><strong>{item.title}</strong><small>{item.medium ?? item.category}</small></span><span aria-hidden="true">↗</span></div>
  </button>)}</div>
}

function Home({navigate,onOpen}:{navigate:(page:Page)=>void,onOpen:(item:Artwork)=>void}) {
  const [progress,setProgress] = useState(0)
  const stageRef = useRef<HTMLElement>(null)
  useEffect(()=>{
    let frame=0
    const calculate=()=>{
      cancelAnimationFrame(frame)
      frame=requestAnimationFrame(()=>{
        const el=stageRef.current
        if(!el) return
        const {top,height}=el.getBoundingClientRect()
        const distance=Math.max(1,height-window.innerHeight)
        setProgress(Math.min(1,Math.max(0,-top/distance)))
      })
    }
    window.addEventListener('scroll',calculate,{passive:true})
    window.addEventListener('resize',calculate)
    calculate()
    return ()=>{window.removeEventListener('scroll',calculate);window.removeEventListener('resize',calculate);cancelAnimationFrame(frame)}
  },[])
  return <main>
    <section ref={stageRef} className="opening" style={{'--progress':progress} as React.CSSProperties} aria-label="An illustrated introduction to Anna's art">
      <div className="opening-sticky">
        <div className="paint-underneath"><img src="/art/BlackLightWoman1.webp" alt=""/><div className="reveal-caption"><span className="eyebrow">Past the edges of the page</span><h2>Color breaks<br/><em>through.</em></h2><button className="scribble-button light" onClick={()=>navigate('work')}>See the paintings <span>↗</span></button></div></div>
        <div className="paper-sheet paper-back" aria-hidden="true"/>
        <div className="paper-sheet paper-front" aria-hidden="true"><span className="binder-holes"/></div>
        <div className="hero-content"><p className="eyebrow">✳ A world by Anna</p><h1>Out of<br/><em>the Margins<span className="period">.</span></em></h1><p>{artist.tagline}</p><button className="scribble-button" onClick={()=>navigate('work')}>Wander inside <span>↗</span></button></div>
        <span className="hand-note hand-note-top">oh, hello there! <span>↘</span></span>
        <img className="floating-doodle doodle-gown" src={doodles.gown} alt="Anna's line drawing of a woman in a gown" title="The page is not the limit"/>
        <img className="floating-doodle doodle-girl" src={doodles.girl} alt="Anna's drawing of a girl" title="I can move, too!"/>
        <img className="floating-doodle doodle-creature" src={doodles.creature} alt="Anna's quirky sneaker-wearing creature" title="Hello from the margins!"/>
        <div className="scroll-hint" aria-hidden="true">Scroll to let the color out <span>↓</span></div>
      </div>
    </section>
    <section className="featured dark-section"><div className="section-inner"><SectionHeading label="01 / The things that become paintings">Ideas that refuse<br/>to <em>stay quiet.</em></SectionHeading><GalleryGrid items={art.filter(a=>a.featured)} onOpen={onOpen}/><button className="text-link" onClick={()=>navigate('work')}>See all the artwork <span>↗</span></button></div></section>
    <section className="sketch-section"><div className="section-inner sketch-layout"><div><p className="eyebrow">02 / The sketchbook</p><h2>Little worlds,<br/><em>big ideas.</em></h2><p>Not every idea needs a frame. Some become creatures, scribbles, funny little faces, and unexpected friends hiding between the lines.</p><button className="text-link dark" onClick={()=>navigate('work')}>Explore the sketchbook <span>↗</span></button></div><div className="sketch-photo"><img src="/art/Sketchbook_JungleCaveManScene.webp" alt="Anna's densely detailed sketchbook scene"/><span>ideas have no edges ✳</span><img className="sketch-sticker" src={doodles.creature} alt=""/></div></div></section>
    <section className="closing-section"><span className="eyebrow">An artist's unfolding universe</span><h2>There’s more<br/>around the corner<span>.</span></h2><button className="scribble-button" onClick={()=>navigate('about')}>Meet Anna <span>↗</span></button></section>
  </main>
}

function Work({onOpen}:{onOpen:(item:Artwork)=>void}) {
  const [filter,setFilter] = useState<Category|'all'>('all')
  const filters:{id:Category|'all',label:string}[]=[{id:'all',label:'Everything'},{id:'painting',label:'Paintings'},{id:'blacklight',label:'Blacklight'},{id:'mural',label:'Murals'},{id:'sketchbook',label:'Sketchbook'}]
  const filtered = filter==='all' ? art : art.filter(a=>a.category===filter)
  return <main className="work-page dark-section"><div className="section-inner"><p className="eyebrow">A cabinet of curiosities / Anna's work</p><h1>Some things<br/>can't <em>stay inside</em><br/>the lines.</h1><p className="work-intro">Paintings, glowing experiments, walls and wandering sketchbook ideas. A collection that's still growing.</p><div className="filters" role="group" aria-label="Filter artwork">{filters.map(item=><button type="button" aria-pressed={filter===item.id} className={filter===item.id?'selected':''} onClick={()=>setFilter(item.id)} key={item.id}>{item.label}</button>)}</div><GalleryGrid items={filtered} onOpen={onOpen}/>{filtered.length===0&&<p>More artwork coming soon.</p>}</div></main>
}

function About({navigate}:{navigate:(page:Page)=>void}) {
  return <main className="about-page"><div className="section-inner about-layout"><div className="about-copy"><p className="eyebrow">The person behind the doodles</p><h1>Hi, I'm<br/><em>Anna.</em></h1><p>{artist.introduction}</p><p>{artist.about}</p><p className="about-note">✳ These are temporary introduction words until Anna writes her own artist statement.</p><button className="scribble-button" onClick={()=>navigate('work')}>Explore the work <span>↗</span></button></div><div className="about-art"><img className="about-portrait" src="/art/WomanInClouds.webp" alt="Atmospheric painting by Anna"/><img className="about-floating" src={doodles.girl} alt="Drawing of a girl by Anna"/></div></div></main>
}

function Lightbox({item,onClose}:{item:Artwork,onClose:()=>void}) {
  const closeRef=useRef<HTMLButtonElement>(null)
  useEffect(()=>{
    const previous=document.activeElement as HTMLElement|null
    const prevOverflow=document.body.style.overflow
    document.body.style.overflow='hidden'
    closeRef.current?.focus()
    const keydown=(e:KeyboardEvent)=>{if(e.key==='Escape')onClose();if(e.key==='Tab'){e.preventDefault();closeRef.current?.focus()}}
    window.addEventListener('keydown',keydown)
    return ()=>{document.body.style.overflow=prevOverflow;window.removeEventListener('keydown',keydown);previous?.focus()}
  },[onClose])
  return <div role="presentation" className="lightbox-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}><div className="lightbox" role="dialog" aria-modal="true" aria-label={`View artwork: ${item.title}`}><button ref={closeRef} className="lightbox-close" onClick={onClose} aria-label="Close artwork">✕</button><img src={item.image} alt={item.alt}/><div className="lightbox-caption"><h3>{item.title}</h3><p>{item.medium ?? item.category}{item.year?` · ${item.year}`:''}</p><p>{item.description}</p></div></div></div>
}

export default function App(){
  const [page,setPage]=useState<Page>(pageFromHash)
  const [selected,setSelected]=useState<Artwork|null>(null)
  useEffect(()=>{const handler=()=>{setPage(pageFromHash());window.scrollTo({top:0,behavior:'instant'})};window.addEventListener('hashchange',handler);return ()=>window.removeEventListener('hashchange',handler)},[])
  const navigate=(target:Page)=>{setPage(target);if(window.location.hash!==`#/${target}`)window.location.hash=`/${target}`;window.scrollTo({top:0,behavior:'instant'})}
  const closeLightbox=()=>setSelected(null)
  return <><SiteNav page={page} navigate={navigate}/>{page==='home'?<Home navigate={navigate} onOpen={setSelected}/>:page==='work'?<Work onOpen={setSelected}/>:<About navigate={navigate}/>}<footer className="site-footer"><span>✳ Out of the Margins</span><span>Art by Anna · Made with curiosity</span>{artist.contactEmail?<a href={`mailto:${artist.contactEmail}`}>Get in touch ↗</a>:<span>More to come ↗</span>}{artist.instagram&&<a href={artist.instagram} target="_blank" rel="noreferrer">Instagram ↗</a>}</footer>{selected&&<Lightbox item={selected} onClose={closeLightbox}/>}</>
}
