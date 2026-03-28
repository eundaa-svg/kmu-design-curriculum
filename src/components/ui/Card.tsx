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
          border: '1px solid rgba(0,0,0,0.06)',
          borderRadius: '16px',
          boxShadow: 'var(--shadow-card)',
          padding: paddingMap[padding],
          transition: 'box-shadow var(--transition-base), transform var(--transition-base), border-color var(--transition-fast)',
          cursor: hover ? 'pointer' : undefined,
          ...style,
        }}
        onMouseEnter={
          hover
            ? (e) => {
                const el = e.currentTarget
                el.style.boxShadow = 'var(--shadow-card-hover)'
                el.style.transform = 'translateY(-2px)'
              }
            : undefined
        }
        onMouseLeave={
          hover
            ? (e) => {
                const el = e.currentTarget
                el.style.boxShadow = 'var(--shadow-sm)'
                el.style.transform = 'translateY(0)'
              }
            : undefined
        }
        onMouseDown={hover ? (e) => { e.currentTarget.style.transform = 'scale(0.98)' } : undefined}
        onMouseUp={hover ? (e) => { e.currentTarget.style.transform = 'translateY(-2px)' } : undefined}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'
export default Card
