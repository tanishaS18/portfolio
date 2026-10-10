import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import DataTable from './DataTable.jsx'

const textOf = (node) =>
  node.type === 'text' ? node.value : (node.children ?? []).map(textOf).join('')

function makeComponents(variant) {
  return {
    h3: ({ children }) => <h3 className="cs-h3">{children}</h3>,
    h4: ({ children }) => <h4 className="cs-h4">{children}</h4>,
    p: ({ node, children }) => {
      const kids = node.children.filter((c) => !(c.type === 'text' && !c.value.trim()))
      const first = kids[0]
      const firstIs = (tag) => first?.type === 'element' && first.tagName === tag

      // an image on its own line → figure (not wrapped in <p>)
      if (kids.length === 1 && firstIs('img')) return <>{children}</>
      // a line that's all bold → tagline in the overview, a small heading elsewhere
      if (kids.length === 1 && firstIs('strong')) {
        return <p className={variant === 'overview' ? 'cs-tagline' : 'cs-kicker'}>{children}</p>
      }
      // "**Problem statement:** …" style lines → callout
      if (kids.length > 1 && firstIs('strong') && /[:.]$/.test(textOf(first).trim())) {
        return <p className="cs-callout">{children}</p>
      }
      return <p>{children}</p>
    },
    img: ({ src, alt, title }) => (
      <figure className="cs-figure">
        <div className="cs-figure__frame">
          <img src={src} alt={alt} loading="lazy" decoding="async" />
        </div>
        {title && <figcaption className="cs-figure__caption">{title}</figcaption>}
      </figure>
    ),
    table: ({ node }) => <DataTable node={node} />,
    ul: ({ children }) => <ul className="cs-list">{children}</ul>,
    ol: ({ children }) => <ol className="cs-steps">{children}</ol>,
    a: ({ href, children }) => (
      <a
        className="text-link"
        href={href}
        {...(/^https?:/.test(href ?? '') ? { target: '_blank', rel: 'noreferrer' } : {})}
      >
        {children}
      </a>
    ),
  }
}

const overviewComponents = makeComponents('overview')
const defaultComponents = makeComponents()

export default function CaseMarkdown({ children, variant }) {
  return (
    <Markdown remarkPlugins={[remarkGfm]} components={variant === 'overview' ? overviewComponents : defaultComponents}>
      {children}
    </Markdown>
  )
}
