// Edit artwork, copy, links and images here, without touching layout components.
export type Category = 'painting' | 'blacklight' | 'mural' | 'sketchbook'
export type Artwork = {
  id: string
  title: string // Working titles until Anna approves the real names.
  category: Category
  image: string
  alt: string
  medium?: string
  year?: string
  description?: string
  featured?: boolean
}

export const artist = {
  name: 'Anna',
  title: 'Out of the Margins',
  byline: 'Art by Anna',
  tagline: 'Imagination has a habit of wandering off the page.',
  introduction: 'A growing collection of paintings, sketchbook creatures, unexpected colors, and unfinished ideas worth keeping.',
  about: 'I make art to follow ideas wherever they go. Sometimes they become paintings. Sometimes they stay as tiny creatures living in the margins of a sketchbook.',
  contactEmail: '', // Set Anna's preferred email to enable the contact link.
  instagram: '', // Set a full URL if Anna wants to add Instagram.
}

export const art: Artwork[] = [
  { id:'electric-1',title:'Electric Daydream',category:'blacklight',image:'/art/BlackLightWoman1.webp',alt:'Expressive fluorescent blacklight painting by Anna',medium:'Blacklight painting',featured:true },
  { id:'rose',title:'In Full Color',category:'painting',image:'/art/WomanPinkOrange.webp',alt:'Expressive portrait in pink and orange by Anna',medium:'Painting',featured:true },
  { id:'arabian',title:'Somewhere Else',category:'painting',image:'/art/ArabianWoman.webp',alt:'Colorful atmospheric painting by Anna',medium:'Painting',featured:true },
  { id:'electric-2',title:'After Dark',category:'blacklight',image:'/art/BlackLightWoman2.webp',alt:'Neon fluorescent figure painting by Anna',medium:'Blacklight painting' },
  { id:'clouds',title:'Cloud Study',category:'painting',image:'/art/WomanInClouds.webp',alt:'Dreamlike atmospheric portrait by Anna',medium:'Painting' },
  { id:'green-red',title:'Color & Feeling',category:'painting',image:'/art/WomanGreenRed.webp',alt:'Colorful expressive painting by Anna',medium:'Painting' },
  { id:'blue-flowers',title:'Growing',category:'mural',image:'/art/WallBlueFlowers_Grow.webp',alt:'Floral wall artwork by Anna',medium:'Wall painting' },
  { id:'jungle',title:'The Other Side of the Page',category:'sketchbook',image:'/art/Sketchbook_JungleCaveManScene.webp',alt:'Detailed imaginative sketchbook scene by Anna',medium:'Sketchbook illustration' },
]

// Ink-only files are generated from Anna's drawings. Replace or add as you batch-process.
export const doodles = {
  gown:'/sketches/Sketchbook_BallroomGownWomanCutout_ink_only.png',
  girl:'/sketches/Sketchbook_LegWarmerGirlCutout_ink_only.png',
  creature:'/sketches/Sketchbook_MouseEarsMonsterwithTennisShoesCutout_ink_only.png',
  iceCream:'/art/Sketchbook_IceCreamCutout.webp',
}
