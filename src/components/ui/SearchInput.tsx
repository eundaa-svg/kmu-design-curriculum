import { type InputHTMLAttributes, forwardRef } from 'react'
import { Search } from 'lucide-react'

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  containerStyle?: React.CSSProperties
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ containerStyle, style, ...props }, ref) => {
    return (
      <div style={{ position: 'relative', ...containerStyle }}>
        <Search
          size={16}
          style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--color-text-muted)',
            pointerEvents: 'none',
          }}
        />
        <input
          ref={ref}
          style={{
            width: '100%',
            height: '40px',
            background: '#F7F8FA',
            border: '1px solid var(--color-border)',
            borderRadius: '10px',
            paddingLeft: '40px',
            paddingRight: '12px',
            fontFamily: 'var(--font-family)',
            fontSize: '14px',
            color: 'var(--color-text-primary)',
            outline: 'none',
            transition: 'border-color 150ms ease, box-shadow 150ms ease',
            ...style,
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-accent-blue)'
            e.currentTarget.style.boxShadow = '0 0 0 3px var(--color-accent-blue-light)'
            props.onFocus?.(e)
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-border)'
            e.currentTarget.style.boxShadow = 'none'
            props.onBlur?.(e)
          }}
          {...props}
        />
      </div>
    )
  }
)

SearchInput.displayName = 'SearchInput'
export default SearchInput
