# Tanisha Sarangi — Portfolio

Vite + React + React Router. Deploys to Vercel as a static site.

## Run locally

```bash
npm install
npm run dev
```

Open the URL it prints (usually http://localhost:5173).

## Where things live

| What | File |
| --- | --- |
| Design tokens (colors, fonts, sizes) | `src/styles/global.css` (top of file) |
| Email / LinkedIn / Instagram links | `src/data/site.js` |
| Nav + contact footer (on every page) | `src/components/Nav.jsx`, `src/components/Footer.jsx` |
| Home page sections | `src/components/home/` |
| Case study text | `content/derme.md`, `content/study-circle.md` |
| Case study list, covers, videos + captions | `src/data/caseStudies.js` |
| Case study template | `src/pages/CaseStudy.jsx` |
| Images, video, icons | `public/assets/` (use them as `/assets/file.png`) |

## Editing case studies

The case study pages read the markdown files in `content/` directly, so edit the text there.

- `# Title — Subtitle` becomes the hero. Each `## Heading` becomes a numbered section.
- The first table under Overview becomes the Role / Timeline / Tools row.
- Your bracketed notes, like `\[Add: …\]` or `\[X%\]`, are hidden on the site, along with
  any table row or heading that is empty without them. Fill one in and remove the brackets
  to make it show.
- A table whose last column is all percentages shows as big stat cards. `#hex` colors get a swatch.
- A line that starts with bold text and a colon (`**Problem statement:** …`) shows as a callout.
- Images: put the file in `public/assets/` and use `![Description](/assets/file.png)`.

To add a new case study: add `content/<slug>.md`, add a cover to `public/assets/`, and add
an entry to `src/data/caseStudies.js`.

## Deploy

Push to GitHub, import the repo in Vercel (it detects Vite automatically).
`vercel.json` makes direct links like `/about` work on refresh.
