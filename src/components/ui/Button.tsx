import { type ButtonHTMLAttributes, forwardRef } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: React.ReactNode
  iconOnly?: boolean
}


const sizeStyles: Record<ButtonSize, { height: string; padding: string; fontSize: string }> = {
  sm: { height: '32px', padding: '0 12px', fontSize: '13px' },
  md: { height: '40px', padding: '0 20px', fontSize: '15px' },
  lg: { height: '48px', padding: '0 28px', fontSize: '15px' },
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', icon, iconOnly = false, style, children, ...props }, ref) => {
    const sz = sizeStyles[size]
    return (
      <button
        ref={ref}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          height: sz.height,
          padding: iconOnly ? '0' : sz.padding,
          width: iconOnly ? sz.height : undefined,
          fontFamily: 'var(--font-family)',
          fontSize: sz.fontSize,
          fontWeight: 500,
          borderRadius: '10px',
          cursor: 'pointer',
          transition: 'background 150ms ease, box-shadow 150ms ease, opacity 150ms ease',
          ...style,
        }}
        className={`btn-${variant}`}
        {...props}
      >
        {icon}
        {!iconOnly && children}
      </button>
    )
  }
)

Button.displayName = 'Button'
export default Button
