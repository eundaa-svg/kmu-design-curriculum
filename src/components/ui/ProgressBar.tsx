interface ProgressBarProps {
  value: number // 0~100
  color?: string
  trackColor?: string
  height?: number
  label?: string
  showValue?: boolean
}

export default function ProgressBar({
  value,
  color = 'var(--color-accent-blue)',
  trackColor = 'var(--color-border)',
  height = 8,
  label,
  showValue = false,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, value))
  return (
    <div style={{ width: '100%' }}>
      {(label || showValue) && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '6px',
            font: 'var(--font-body-sm)',
            fontFamily: 'var(--font-family)',
            color: 'var(--color-text-secondary)',
          }}
        >
          {label && <span>{label}</span>}
          {showValue && <span>{pct}%</span>}
        </div>
      )}
      <div
        style={{
          width: '100%',
          height,
          background: trackColor,
          borderRadius: height,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            background: color,
            borderRadius: height,
            transition: 'width 0.5s ease-out, background-color var(--transition-slow)',
          }}
        />
      </div>
    </div>
  )
}
