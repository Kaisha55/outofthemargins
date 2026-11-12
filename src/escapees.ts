/** Curated, intentionally placed characters for the homepage. */
export type DoodlePlacement = {
  id: string
  src: string
  left?: string
  right?: string
  top?: string
  bottom?: string
  width: string
  angle?: string
  drift?: string
  delay?: number
  opacity?: number
  /** The source image supplies the colored ink. Filters only apply to monochrome line art. */
  tone?: 'light' | 'dark' | 'color'
  /** Large, atmospheric illustrations should sit behind the featured sketchbook frame. */
  atmosphere?: boolean
}

/** Every reveal character has a clear place; no repeated hot dog or right-edge traffic jam. */
export const heroEscapees: (DoodlePlacement & { enterAt: number })[] = [
  {id:'shoe',src:'/home-characters/hero-shoe-yellow.png',left:'3%',top:'5%',width:'clamp(110px,11vw,165px)',angle:'-11deg',drift:'-15vw',enterAt:.35,opacity:.98,tone:'color'},
  {id:'eye',src:'/home-characters/hero-eye-pink.png',right:'2%',top:'9%',width:'clamp(190px,17vw,290px)',angle:'10deg',drift:'23vw',enterAt:.39,opacity:.92,tone:'color'},
  {id:'guitar',src:'/home-characters/hero-guitar-orange.png',right:'2.5%',bottom:'2%',width:'clamp(185px,17vw,270px)',angle:'-8deg',drift:'28vw',enterAt:.52,opacity:.97,tone:'color'},
  {id:'snail',src:'/home-characters/hero-snail-ivory.png',left:'1%',bottom:'4%',width:'clamp(100px,10vw,156px)',angle:'-11deg',drift:'-22vw',enterAt:.41,opacity:.94,tone:'color'},
  {id:'bug',src:'/home-characters/hero-bug-blue.png',left:'20%',bottom:'1%',width:'clamp(78px,7vw,110px)',angle:'15deg',drift:'-17vw',enterAt:.57,opacity:.96,tone:'color'},
]

/** Each scene has only a few purposeful accents. */
export const homeDoodles: Record<'featured'|'sketch'|'closing',DoodlePlacement[]> = {
  featured: [
    {id:'featured-flying-cat',src:'/home-characters/featured-cat-blue.png',right:'9%',top:'12%',width:'clamp(125px,12vw,175px)',angle:'-9deg',tone:'color',opacity:.96},
    {id:'featured-bird',src:'/home-characters/featured-bird-yellow.png',left:'0.5%',bottom:'-6%',width:'clamp(128px,12vw,170px)',angle:'-14deg',tone:'color',delay:130,opacity:.94},
    {id:'featured-boy',src:'/home-characters/featured-boy-orange.png',right:'4%',bottom:'4%',width:'clamp(90px,9vw,136px)',angle:'9deg',tone:'color',delay:260,opacity:.95},
  ],
  sketch: [
    {id:'sketch-background-encouragement',src:'/home-characters/sketch-you-can-do-it.png',left:'-1%',top:'12%',width:'clamp(250px,27vw,440px)',angle:'-9deg',tone:'dark',opacity:.19,atmosphere:true},
    {id:'sketch-background-dreamer',src:'/home-characters/sketch-smoking-alien.png',right:'-5%',bottom:'-4%',width:'clamp(255px,24vw,370px)',angle:'9deg',tone:'dark',opacity:.21,atmosphere:true},
    {id:'sketch-bee',src:'/book/cutouts/v6-cut-out-serious-bee-trans.png',left:'2.5%',bottom:'5%',width:'clamp(80px,8vw,124px)',angle:'-12deg',tone:'dark',delay:100,opacity:.84},
    {id:'sketch-lab-mouse',src:'/book/cutouts/cutout-lab-mouse-trans.png',left:'11%',bottom:'4%',width:'clamp(90px,9vw,130px)',angle:'8deg',tone:'dark',delay:240,opacity:.80},
  ],
  closing: [
    {id:'closing-waving-girl',src:'/home-characters/closing-waving-girl-pink.png',left:'3%',bottom:'-1%',width:'clamp(164px,18vw,260px)',angle:'-7deg',tone:'color',opacity:.96},
  ],
}

export const aboutDoodles:DoodlePlacement[] = [
 {id:'about-flower',src:'/sketches/still-loved-eye.png',left:'-1%',top:'5%',width:'clamp(80px,10vw,145px)',angle:'-13deg',tone:'dark',opacity:.38},
 {id:'about-girl',src:'/book/cutouts/v6-cut-out-little-girl-trans.png',left:'0%',bottom:'6%',width:'clamp(95px,10vw,132px)',angle:'6deg',tone:'dark',opacity:.52},
]
