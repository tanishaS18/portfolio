import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

/*
  Lets you `import text from '../content/derme.md'` and get the file as a string.
  Images pasted into a Google Doc export come along as huge base64 blobs at the
  bottom of the file. Those are stripped out here, and each `![alt][image1]`
  reference points to /assets/<file-name>-image1.png instead (save the image there).
*/
function markdownContent() {
  return {
    name: 'markdown-content',
    enforce: 'pre',
    transform(code, id) {
      if (!id.endsWith('.md')) return null
      const base = path.basename(id, '.md')
      const embedded = new Set()
      let text = code.replace(/^\[([^\]]+)\]:\s*<data:[^>]+>\s*$/gm, (_, name) => {
        embedded.add(name)
        return ''
      })
      text = text.replace(/!\[([^\]]*)\]\[([^\]]+)\]/g, (match, alt, name) =>
        embedded.has(name) ? `![${alt}](/assets/${base}-${name}.png)` : match,
      )
      return { code: `export default ${JSON.stringify(text)}`, map: null }
    },
  }
}

export default defineConfig({
  plugins: [markdownContent(), react()],
})
