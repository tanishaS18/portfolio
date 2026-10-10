/*
  Your case studies, in the order they appear on the Work page.
  Each one becomes a page at /work/<slug>. The words come straight from the
  markdown files in /content, so edit those to change the text.

  media: extra blocks (prototype videos, etc.) placed inside a section.
    key           → the section's id (its heading in lowercase-with-dashes)
    beforeHeading → optional: put the block just before this ### heading
    layout        → 'phone-split' (one phone + caption beside it)
                    'phone-row'   (2–3 phones side by side, swipeable on phones)
    videos        → screen recordings, each with its own caption
    screens       → still screens (<img>), with one caption for the group
    theme         → 'light' puts the screens on a warm off-white panel
*/
import studyCircleMd from '../../content/study-circle.md'
import dermeMd from '../../content/derme.md'
import { parseCaseStudy } from '../lib/parseCaseStudy.js'

const entries = [
  {
    slug: 'study-circle',
    content: studyCircleMd,
    cover: {
      src: '/assets/study-circle-cover.webp',
      fallback: '/assets/study-circle-cover.png',
      alt: 'Study Circle home screen on an iPhone, leaning against a sunlit wall',
      width: 930,
      height: 1012,
    },
    media: {
      solution: {
        layout: 'phone-split',
        side: 'right',
        label: 'Prototype',
        videos: [
          {
            src: '/assets/filtering-study circle.mp4',
            poster: '/assets/posters/filtering.jpg',
            caption: 'Filtering spots by rating, price, hours, and study needs like Wi‑Fi, outlets, and quiet.',
          },
        ],
      },
      'final-design': {
        layout: 'phone-row',
        beforeHeading: 'What I learned',
        videos: [
          {
            src: '/assets/map-studycircle.mp4',
            poster: '/assets/posters/map.jpg',
            caption: 'Map view with accessibility options and turn‑by‑turn navigation to a spot.',
          },
          {
            src: '/assets/settings-feed-studycircle.mp4',
            poster: '/assets/posters/settings-feed.jpg',
            caption: 'Accessibility settings, friends, and the For You feed with study invites.',
          },
        ],
      },
    },
  },
  {
    slug: 'derme',
    content: dermeMd,
    cover: {
      src: '/assets/derme-cover.webp',
      fallback: '/assets/derme-cover.png',
      alt: 'Two phones showing the Dermé undertone quiz and a matched foundation shade',
      width: 1034,
      height: 1036,
    },
    media: {
      'key-decision-a-quiz-not-a-camera': {
        layout: 'phone-split',
        side: 'left',
        theme: 'light',
        label: 'Shade quiz',
        caption: 'One plain-language question per screen. Undertone comes first, with a swatch for each option.',
        screens: [
          {
            src: '/assets/Derme-quizPage.svg',
            alt: 'Dermé quiz, step 2 of 5: “What’s your undertone?” with Warm, Cool, and Neutral options',
            width: 392,
            height: 800,
          },
        ],
      },
      'the-solution': {
        layout: 'phone-row',
        theme: 'light',
        caption:
          'The result: a shade profile with matching foundations across brands, then reviews from people with a similar skin profile, right on the product page.',
        screens: [
          {
            src: '/assets/shade-profile-derme.svg',
            alt: 'Your Shade Profile screen: a Warm, Medium swatch with best-match foundations from Estée Lauder, Fenty Beauty, and NARS',
            width: 422,
            height: 844,
          },
          {
            src: '/assets/reviews-derme.svg',
            alt: 'Product page for Estée Lauder Double Wear in Golden Honey 320, with reviews from people like you',
            width: 407,
            height: 814,
          },
        ],
      },
    },
  },
]

export const caseStudies = entries.map((entry) => ({ ...entry, ...parseCaseStudy(entry.content) }))

export function getCaseStudy(slug) {
  return caseStudies.find((c) => c.slug === slug)
}

export function getNextCaseStudy(slug) {
  const i = caseStudies.findIndex((c) => c.slug === slug)
  return caseStudies[(i + 1) % caseStudies.length]
}
