/*
  Turns a case study markdown file into { title, name, subtitle, meta, sections }.
  Your wording is used as is. The only thing removed is your own bracketed notes,
  like \[Add: …\] or \[X%\], plus anything left empty once they're gone
  (a table row with a blank cell, a heading with nothing under it).
  Fill a note in, delete the brackets, and that content appears on the site.
*/

const NOTE = /\\\[(?:[^\\]|\\(?!\]))*?\\\]/g // \[ … \]
const LABEL_ALIASES = { Duration: 'Timeline', Responsibilities: 'Role' }
const META_ORDER = ['Role', 'Timeline', 'Tools']

const stripBold = (s) => s.replace(/\*\*/g, '').trim()
const splitRow = (line) =>
  line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((c) => c.trim())
const isTableLine = (line) => /^\s*\|/.test(line)

export const slugify = (s) =>
  stripBold(s)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

function cleanTables(lines) {
  const out = []
  for (let i = 0; i < lines.length; ) {
    if (!isTableLine(lines[i])) {
      out.push(lines[i++])
      continue
    }
    const block = []
    while (i < lines.length && isTableLine(lines[i])) block.push(lines[i++])
    const [header, separator, ...body] = block
    const rows = body.filter((row) => splitRow(row).every((cell) => cell !== ''))
    if (rows.length) out.push(header, separator, ...rows)
  }
  return out
}

function dropEmptySubheadings(lines) {
  const out = []
  for (let i = 0; i < lines.length; i++) {
    if (/^#{3,}\s/.test(lines[i])) {
      let j = i + 1
      while (j < lines.length && lines[j].trim() === '') j++
      if (j >= lines.length || /^#{1,3}\s/.test(lines[j])) continue
    }
    out.push(lines[i])
  }
  return out
}

function clean(md) {
  let lines = md
    .replace(/\r\n/g, '\n')
    .replace(NOTE, '')
    .split('\n')
    .map((l) => l.replace(/\s+$/, ''))
    .filter((l) => !/^\s*([*-]|\d+\.)\s*$/.test(l)) // list items left empty
  lines = cleanTables(lines)
  lines = dropEmptySubheadings(lines)
  let text = lines.join('\n')
  // An image followed by a line repeating its alt text: use that line as the caption.
  text = text.replace(/!\[([^\]]*)\]\(([^)\s]+)\)\n+\1\n/g, '![$1]($2 "$1")\n')
  return text.replace(/\n{3,}/g, '\n\n').trim()
}

// Pull the first table out of the Overview and read it as Role / Timeline / Tools.
function extractMeta(body) {
  const lines = body.split('\n')
  const start = lines.findIndex(isTableLine)
  if (start === -1) return { meta: [], body }
  let end = start
  while (end < lines.length && isTableLine(lines[end])) end++
  const [header, , ...rows] = lines.slice(start, end).map(splitRow)

  let pairs
  if (header.every((c) => c === '')) {
    pairs = rows.map(([label, value]) => [label, value]) // label | value rows
  } else {
    pairs = header.map((label, i) => [label, rows[0]?.[i] ?? '']) // labels across the top
  }
  const meta = pairs
    .filter(([l, v]) => l && v)
    .map(([label, value]) => ({ label: LABEL_ALIASES[stripBold(label)] ?? stripBold(label), value: stripBold(value) }))
    .sort((a, b) => {
      const ai = META_ORDER.indexOf(a.label)
      const bi = META_ORDER.indexOf(b.label)
      return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi)
    })

  lines.splice(start, end - start)
  return { meta, body: lines.join('\n').trim() }
}

export function parseCaseStudy(md) {
  const text = clean(md)
  const titleMatch = text.match(/^#\s+(.+)$/m)
  const title = titleMatch ? stripBold(titleMatch[1]) : ''
  const [name, subtitle = ''] = title.split(/\s+[—–]\s+/)

  const sections = []
  let current = null
  for (const line of text.split('\n')) {
    if (/^#\s/.test(line)) continue
    const h2 = line.match(/^##\s+(.+)$/)
    if (h2) {
      current = { title: stripBold(h2[1]), body: [] }
      sections.push(current)
    } else if (current) {
      current.body.push(line)
    }
  }

  let meta = []
  const result = sections
    .map((s) => ({ title: s.title, id: slugify(s.title), body: s.body.join('\n').trim() }))
    .filter((s) => s.body)
    .map((s, i) => {
      if (i === 0) {
        const extracted = extractMeta(s.body)
        meta = extracted.meta
        return { ...s, body: extracted.body }
      }
      return s
    })

  return { title, name, subtitle, meta, sections: result }
}
