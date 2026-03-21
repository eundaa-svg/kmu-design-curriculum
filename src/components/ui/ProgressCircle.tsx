interface ProgressCircleProps {
  value: number // 0~100
  size?: number
  strokeWidth?: number
  color?: string
  trackColor?: string
  label?: string
  sublabel?: string
}

export default function ProgressCircle({
  value,
  size = 80,
  strokeWidth = 7,
  color = 'var(--color-accent-blue)',
  trackColor = 'var(--color-border)',
  label,
  sublabel,
}: ProgressCircleProps) {
  const r = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * r
  const offset = circumference - (Math.min(100, Math.max(0, value)) / 100) * circumference

  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 600ms ease' }}
        />
      </svg>
      {(label !== undefined || sublabel !== undefined) && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {label !== undefined && (
            <span
              style={{
                font: 'var(--font-heading-md)',
                fontFamily: 'var(--font-family)',
                color: 'var(--color-text-primary)',
                lineHeight: 1,
              }}
            >
              {label}
            </span>
          )}
          {sublabel !== undefined && (
            <span
              style={{
                font: 'var(--font-body-sm)',
                fontFamily: 'var(--font-family)',
                color: 'var(--color-text-muted)',
              }}
            >
              {sublabel}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
