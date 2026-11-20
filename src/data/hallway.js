/*
  The frames hanging in the hallway (the Work page), from the entrance to the door.
    side   → 'left' or 'right' wall
    depth  → how far down the hall, in px (the door is at 3000)
    size   → 1 = normal frame width
    to     → case study it opens
    tint   → false = show the picture as is (these are already blue);
             leave it out to give a picture the indigo duotone
*/
export const hallwayFrames = [
  {
    side: 'left',
    depth: 380,
    size: 1.3,
    src: '/assets/hallway/study-circle-hallway.webp',
    width: 900,
    height: 1037,
    title: 'Study Circle',
    to: '/work/study-circle',
    tint: false,
  },
  {
    side: 'right',
    depth: 900,
    size: 1.1,
    src: '/assets/hallway/derme-hallway.webp',
    width: 907,
    height: 1063,
    title: 'Dermé',
    to: '/work/derme',
    tint: false,
  },
]
