// Anna's artworks and artist copy. Names are temporary working labels until she approves them.
export type Category = 'painting' | 'blacklight' | 'mural' | 'other' | 'sketchbook'
export type Artwork = {
  id: string
  title: string
  category: Category
  image: string
  thumb?: string
  alt: string
  medium?: string
  year?: string
  description?: string
  featured?: boolean
  /** Alternate photo of the same physical artwork, e.g. daylight versus UV. */
  alternateImage?: string
  alternateLabel?: string
  primaryLabel?: string
}

export const artist = {
  name: 'Anna',
  title: 'Out of the Margins',
  byline: 'Art by Anna',
  tagline: 'Imagination has a habit of wandering off the page.',
  introduction: "I've been making art for as long as I can remember. Drawing, painting, sculpting, experimenting with whatever materials I can get my hands on. There's almost always something I'm working on, and usually a few more ideas waiting their turn.",
  about: "I love creating characters, exploring color, and seeing where an idea takes me. Sometimes that means a painting that covers an entire wall. Sometimes it's a strange little creature scribbled in the corner of a sketchbook. Other times, it's something made from clay, glass, metal, or whatever interesting junk I rescued from the trash.",
  closing: "I don't really believe art has to fit into one category. I just like making things. And there's always more to make.",
  contactEmail: '',
  instagram: '',
}

/** Anna's complete gallery from AnnaPortfolioArt.zip, including the HEIC painting converted
 * into a browser-friendly image. Two behind-the-scenes photos appear on Meet Anna instead;
 * the duplicate horned-girl JPG and Paint.NET work file are intentionally omitted.
 * The fourth blacklight painting's daylight photo is available via the lightbox switch.
 */
export const art: Artwork[] = [
  {id:'electric-1',title:'Electric Daydream',category:'blacklight',image:'/art/BlackLightWoman1.webp',thumb:'/art/BlackLightWoman1-thumb.webp',alt:'Silhouette framed by purple, pink, and blue fluorescent brushstrokes',medium:'Blacklight painting',featured:true},
  {id:'rose',title:'In Full Color',category:'painting',image:'/art/WomanPinkOrange.webp',thumb:'/art/WomanPinkOrange-thumb.webp',alt:'Abstract colorful portrait with pink and orange brushwork',medium:'Painting',featured:true},
  {id:'arabian',title:'Somewhere Else',category:'painting',image:'/art/ArabianWoman.webp',thumb:'/art/ArabianWoman-thumb.webp',alt:'Warm red and orange moonlit scene with figures and palms',medium:'Painting',featured:true},
  {id:'glass-bust',title:'Glass Bust',category:'other',image:'/art/GlassBust.jpg',alt:'Glass Bust by Anna',medium:'Glass sculpture'},
  {id:'wall-face',title:'A Face on the Wall',category:'mural',image:'/art/WallMural.webp',thumb:'/art/WallMural-thumb.webp',alt:'Large expressive face with turquoise eyes painted on a wall',medium:'Wall mural'},
  {id:'metal-flower',title:'Metal Flower',category:'other',image:'/art/WeldedMetalFlower.jpg',alt:'Metal Flower by Anna',medium:'Welded metal'},
  {id:'electric-4',title:'After the Lights Go Out',category:'blacklight',image:'/art/BlackLIghtWoman4.webp',thumb:'/art/BlackLIghtWoman4-thumb.webp',alt:'Fluorescent face with orange hair and vivid blue-green skin',medium:'Blacklight painting',primaryLabel:'Blacklight',alternateImage:'/art/BlackLightWoman4_daylight.webp',alternateLabel:'Daylight'},
  {id:'woman-crying-2',title:'Blue Tears',category:'painting',image:'/art/WomanCrying2.webp',thumb:'/art/WomanCrying2-thumb.webp',alt:'Moody portrait of a woman with tears down her cheek',medium:'Painting'},
  {id:'blown-vase',title:'Blown Glass Vase',category:'other',image:'/art/BlownGlassVase.jpg',alt:'Blown Glass Vase by Anna',medium:'Blown glass'},
  {id:'bad-girls',title:"Bad Girls Don't Cry",category:'painting',image:'/art/BadGirlsDontCry.webp',thumb:'/art/BadGirlsDontCry-thumb.webp',alt:'Painting of a blonde woman holding a wine glass with the handwritten words Bad Girls Don’t Cry',medium:'Painting'},
  {id:'carved-wood',title:'Carved Wood Planter and Feeder',category:'other',image:'/art/CarvedWoodPlantPotAndFeeder.jpg',alt:'Carved Wood Planter and Feeder by Anna',medium:'Woodcarving'},
  {id:'waterfall',title:'Into the Waterfall',category:'painting',image:'/art/WomanInWaterfall.webp',thumb:'/art/WomanInWaterfall-thumb.webp',alt:'Expressive painting of a woman beside a rushing waterfall',medium:'Painting'},
  {id:'glass-mushroom-bird',title:'Glass Mushroom and Bird',category:'other',image:'/art/GlassMushroomAndBird.jpg',alt:'Glass Mushroom and Bird by Anna',medium:'Glass art'},
  {id:'woman-red',title:'Woman in Red',category:'painting',image:'/art/WomanInRed.webp',thumb:'/art/WomanInRed-thumb.webp',alt:'Figure seated against long vertical red lines',medium:'Painting'},
  {id:'illusion-painting',title:'Illusion',category:'painting',image:'/art/3DIllusionPainting.jpg',alt:'Illusion by Anna',medium:'Painting'},
  {id:'blue-eye',title:'Blue-Eyed Study',category:'other',image:'/art/BlueEyedWomanWatercolor.webp',thumb:'/art/BlueEyedWomanWatercolor-thumb.webp',alt:'Delicate side-profile illustration of a woman in watercolor',medium:'Watercolor'},
  {id:'electric-2',title:'After Dark',category:'blacklight',image:'/art/BlackLightWoman2.webp',thumb:'/art/BlackLightWoman2-thumb.webp',alt:'Seated silhouette against vivid fluorescent strokes',medium:'Blacklight painting'},
  {id:'wind-landscape',title:'Windblown Landscape',category:'painting',image:'/art/WindBlownLandscapePainting.jpg',alt:'Windblown Landscape by Anna',medium:'Painting'},
  {id:'woodburning-woman',title:'Woodburned Woman',category:'other',image:'/art/WoodBurning_Woman.jpg',alt:'Woodburned Woman by Anna',medium:'Woodburning'},
  {id:'sea-woman',title:'Sea Woman',category:'other',image:'/art/SeaWoman.webp',thumb:'/art/SeaWoman-thumb.webp',alt:'Brightly colored drawing of a woman surrounded by swirling shapes',medium:'Mixed media'},
  {id:'clouds',title:'Cloud Study',category:'painting',image:'/art/WomanInClouds.webp',thumb:'/art/WomanInClouds-thumb.webp',alt:'Dreamlike female figure set against mottled stormy colors',medium:'Painting'},
  {id:'purple-wall',title:'Flowers on Drywall',category:'mural',image:'/art/PurpleFlowers_drywall.webp',thumb:'/art/PurpleFlowers_drywall-thumb.webp',alt:'Purple and blue flowers painted on a dark wall',medium:'Wall painting'},
  {id:'woman-watercolor',title:'Watercolor Portrait',category:'other',image:'/art/WomanWatercolor.jpg',alt:'Watercolor Portrait by Anna',medium:'Watercolor'},
  {id:'green-red',title:'Color & Feeling',category:'painting',image:'/art/WomanGreenRed.webp',thumb:'/art/WomanGreenRed-thumb.webp',alt:'Portrait surrounded by green, rust and earth-toned marks',medium:'Painting'},
  {id:'melting-duck',title:'Melting Duck',category:'painting',image:'/art/MeltingDuckPaintingOnCabinet.jpg',alt:'Melting Duck by Anna',medium:'Furniture painting'},
  {id:'horned',title:'The Girl Who Escaped',category:'other',image:'/art/HornedGirl._trans.webp',thumb:'/art/HornedGirl._trans-thumb.webp',alt:'Anna’s smiling illustrated girl with pink horns',medium:'Character illustration'},
  {id:'oceanside-painting',title:'Oceanside',category:'painting',image:'/art/OceanSideBrushPainting.jpg',alt:'Oceanside by Anna',medium:'Painting'},
  {id:'glass-mushroom',title:'Glass Mushroom',category:'other',image:'/art/GlassMushroom.jpg',alt:'Glass Mushroom by Anna',medium:'Glass sculpture'},
  {id:'blue-flowers',title:'Growing',category:'mural',image:'/art/WallBlueFlowers_Grow.webp',thumb:'/art/WallBlueFlowers_Grow-thumb.webp',alt:'Blue flowers and handwritten word Grow painted on a wall',medium:'Wall painting'},
  {id:'woodburn',title:'Woodburned Portrait',category:'other',image:'/art/Face_WoodBurning.webp',thumb:'/art/Face_WoodBurning-thumb.webp',alt:'Portrait burned into wood',medium:'Woodburning'},
  {id:'electric-3',title:'Neon Silhouette',category:'blacklight',image:'/art/blackLightWoman3.webp',thumb:'/art/blackLightWoman3-thumb.webp',alt:'Blacklight silhouette with raised arms and glowing brushstrokes',medium:'Blacklight painting'},
  {id:'chalkboard',title:'Drawn in Chalk',category:'other',image:'/art/ChalkboardDrawing.webp',thumb:'/art/ChalkboardDrawing-thumb.webp',alt:'Colorful portrait and flowers illustrated on a chalkboard',medium:'Chalk art'},
  {id:'rose-tattoo',title:'Rose Tattoo',category:'other',image:'/art/RoseTattoo1.webp',thumb:'/art/RoseTattoo1-thumb.webp',alt:'Close-up of a colorful rose tattoo',medium:'Tattoo art'},
  {id:'hawaiian-flowers',title:'Hawaiian Flowers',category:'painting',image:'/art/HawaiianFlowers.webp',thumb:'/art/HawaiianFlowers-thumb.webp',alt:'Rust-orange tropical flowers and heart motifs on green',medium:'Painting'},
  {id:'wall-flowers',title:'Flowers on the Wall',category:'mural',image:'/art/WallFlowers1.webp',thumb:'/art/WallFlowers1-thumb.webp',alt:'Pink and green floral motif painted around a doorway',medium:'Wall mural'},
  {id:'mushrooms',title:"Don't Trip",category:'other',image:'/art/DontTripMushrooms.webp',thumb:'/art/DontTripMushrooms-thumb.webp',alt:'Playful lettering and mushroom illustration on a multicolor background',medium:'Illustration'},
  {id:'anime',title:'Anime Study',category:'other',image:'/art/AnimeGirl.webp',thumb:'/art/AnimeGirl-thumb.webp',alt:'Framed line drawing of an anime character',medium:'Illustration'},
  {id:'leg-tattoo',title:'Roses in Color',category:'other',image:'/art/LegTattoo.webp',thumb:'/art/LegTattoo-thumb.webp',alt:'Brightly colored floral tattoo artwork',medium:'Tattoo art'},
  {id:'woman-crying',title:'The Hard Parts',category:'painting',image:'/art/WomanCrying.webp',thumb:'/art/WomanCrying-thumb.webp',alt:'Portrait of a woman in blue with text and a red rose',medium:'Painting'},
  {id:'purple-flower',title:'Purple Bloom',category:'painting',image:'/art/PurpleFlower.webp',thumb:'/art/PurpleFlower-thumb.webp',alt:'Loose purple flower with watercolor-like petals',medium:'Painting'},
  // A full-page sketchbook illustration used in the Home feature, not duplicated in Work.
  {id:'jungle',title:'The Other Side of the Page',category:'sketchbook',image:'/art/Sketchbook_JungleCaveManScene.webp',alt:'Intricate sketchbook illustration of fantastical figures',medium:'Sketchbook illustration'},
]

// Ink-only files are generated from Anna's drawings. Replace or add as you batch-process.
export const doodles = {
  gown:'/sketches/Sketchbook_BallroomGownWomanCutout_ink_only.png',
  girl:'/sketches/Sketchbook_LegWarmerGirlCutout_ink_only.png',
  creature:'/sketches/Sketchbook_MouseEarsMonsterwithTennisShoesCutout_ink_only.png',
  iceCream:'/art/Sketchbook_IceCreamCutout.webp',
  mascot:'/sketches/horned-girl.png',
  cat:'/sketches/feeling-good-cat.png',
  snail:'/sketches/snail.png',
  smallHead:'/sketches/head-out-of-ground.png',
  eye:'/sketches/still-loved-eye.png',
  sourceCat:'/sketches/source-feeling-good-cat.png',
  sourceFaces:'/sketches/source-faces-and-eyes.png',
  sourceCouple:'/sketches/source-couple-and-pack.png',
}
