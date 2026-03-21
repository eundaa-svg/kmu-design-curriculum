import { type HTMLAttributes } from 'react'

type BadgeVariant = 'required' | 'elective' | 'capstone' | 'blue' | 'green' | 'amber' | 'red' | 'indigo' | 'gray'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

const variantStyles: Record<BadgeVariant, { bg: string; color: string; border: string }> = {
  required: {
    bg: 'var(--color-accent-blue-light)',
    color: 'var(--color-accent-blue)',
    border: 'transparent',
  },
  elective: {
    bg: '#F8FAFC',
    color: 'var(--color-text-secondary)',
    border: 'var(--color-border)',
  },
  capstone: {
    bg: 'var(--color-accent-indigo)',
    color: '#fff',
    border: 'transparent',
  },
  blue: {
    bg: 'var(--color-accent-blue-light)',
    color: 'var(--color-accent-blue)',
    border: 'transparent',
  },
  green: {
    bg: 'var(--color-accent-green-light)',
    color: 'var(--color-accent-green)',
    border: 'transparent',
  },
  amber: {
    bg: 'var(--color-accent-amber-light)',
    color: 'var(--color-accent-amber)',
    border: 'transparent',
  },
  red: {
    bg: 'var(--color-accent-red-light)',
    color: 'var(--color-accent-red)',
    border: 'transparent',
  },
  indigo: {
    bg: '#EEF2FF',
    color: 'var(--color-accent-indigo)',
    border: 'transparent',
  },
  gray: {
    bg: '#F1F5F9',
    color: 'var(--color-text-secondary)',
    border: 'transparent',
  },
}

export default function Badge({ variant = 'gray', style, children, ...props }: BadgeProps) {
  const { bg, color, border } = variantStyles[variant]
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        font: 'var(--font-label)',
        fontFamily: 'var(--font-family)',
        background: bg,
        color,
        border: `1px solid ${border}`,
        borderRadius: '6px',
        padding: '2px 7px',
        whiteSpace: 'nowrap',
        ...style,
      }}
      {...props}
    >
      {children}
    </span>
  )
}
