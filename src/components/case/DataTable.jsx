import { toJsxRuntime } from 'hast-util-to-jsx-runtime'
import { Fragment, jsx, jsxs } from 'react/jsx-runtime'

const textOf = (node) =>
  node.type === 'text' ? node.value : (node.children ?? []).map(textOf).join('')
const elements = (node, tag) => (node?.children ?? []).filter((c) => c.type === 'element' && c.tagName === tag)
const renderCell = (cell) => toJsxRuntime({ type: 'root', children: cell.children }, { Fragment, jsx, jsxs })

const HEX = /#[0-9a-f]{6}\b/i
const PERCENT = /^\d+(\.\d+)?%$/

function Cell({ cell }) {
  const hex = textOf(cell).match(HEX)?.[0]
  return (
    <>
      {hex && <span className="swatch" style={{ background: hex }} aria-hidden="true" />}
      {renderCell(cell)}
    </>
  )
}

/*
  Markdown tables, rendered three ways depending on what's in them:
  - every row ends in a percentage → big stat cards
  - otherwise a clean table that turns into stacked cards on phones
  - any #hex color gets a small swatch next to it
*/
export default function DataTable({ node }) {
  const [thead] = elements(node, 'thead')
  const [tbody] = elements(node, 'tbody')
  const headCells = elements(elements(thead, 'tr')[0], 'th')
  const rows = elements(tbody, 'tr').map((tr) => elements(tr, 'td'))
  const headers = headCells.map((th) => textOf(th).trim())

  const isStats = rows.length > 0 && rows.every((r) => PERCENT.test(textOf(r[r.length - 1]).trim()))
  if (isStats) {
    return (
      <ul className="stat-grid">
        {rows.map((r, i) => (
          <li key={i} className="stat">
            <span className="stat__value">{textOf(r[r.length - 1]).trim()}</span>
            <span className="stat__label">{renderCell(r[0])}</span>
          </li>
        ))}
      </ul>
    )
  }

  const hasHeader = headers.some(Boolean)
  return (
    <div className="data-table">
      <table>
        {hasHeader && (
          <thead>
            <tr>
              {headCells.map((th, i) => (
                <th key={i} scope="col">
                  {renderCell(th)}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((cell, j) => (
                <td key={j} data-label={j > 0 ? headers[j] : undefined}>
                  <Cell cell={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
