interface HighlightProps {
  text: string
  query: string
  style?: React.CSSProperties
}

export default function Highlight({ text, query, style }: HighlightProps) {
  if (!query.trim()) return <span style={style}>{text}</span>

  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)

  return (
    <span style={style}>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} style={{ background: '#FEF08A', color: 'inherit', borderRadius: 2, padding: '0 1px' }}>
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </span>
  )
}
