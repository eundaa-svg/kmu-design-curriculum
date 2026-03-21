import { type HTMLAttributes, forwardRef } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  padding?: 'sm' | 'md' | 'lg' | 'none'
}

const paddingMap = {
  sm: '16px',
  md: '20px',
  lg: '24px',
  none: '0',
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ hover = false, padding = 'lg', style, className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={className}
        style={{
          background: 'var(--color-bg-card)',
          border: '1px solid var(--color-border)',
          borderRadius: '14px',
          boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
          padding: paddingMap[padding],
          transition: hover ? 'box-shadow 200ms ease, transform 200ms ease' : undefined,
          cursor: hover ? 'pointer' : undefined,
          ...style,
        }}
        onMouseEnter={
          hover
            ? (e) => {
                const el = e.currentTarget
                el.style.boxShadow = '0 4px 12px rgba(0,0,0,0.06)'
                el.style.transform = 'translateY(-1px)'
              }
            : undefined
        }
        onMouseLeave={
          hover
            ? (e) => {
                const el = e.currentTarget
                el.style.boxShadow = '0 1px 2px rgba(0,0,0,0.03)'
                el.style.transform = 'translateY(0)'
              }
            : undefined
        }
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'
export default Card
