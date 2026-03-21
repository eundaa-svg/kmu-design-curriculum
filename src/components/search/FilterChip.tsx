import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ChevronDown, Check } from 'lucide-react'

interface FilterChipProps {
  label: string
  active?: boolean
  children: ReactNode   // 드롭다운 내용
}

export function FilterChip({ label, active = false, children }: FilterChipProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  /* 외부 클릭 닫기 */
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  /* Escape 닫기 */
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open])

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          height: 34,
          padding: '0 12px',
          borderRadius: 8,
          border: `1px solid ${active ? 'var(--color-accent-blue)' : 'var(--color-border)'}`,
          background: active ? 'var(--color-accent-blue-light)' : 'var(--color-bg-card)',
          color: active ? 'var(--color-accent-blue)' : 'var(--color-text-secondary)',
          fontFamily: 'var(--font-family)',
          fontSize: 13,
          fontWeight: active ? 500 : 400,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          transition: 'all 150ms',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
        <ChevronDown
          size={13}
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 150ms' }}
        />
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0,
            zIndex: 30,
            background: 'var(--color-bg-card)',
            border: '1px solid var(--color-border)',
            borderRadius: 10,
            boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
            minWidth: 180,
            padding: '6px 0',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      )}
    </div>
  )
}

/* ── 드롭다운 내 체크박스 옵션 ── */
interface CheckOptionProps {
  label: string
  checked: boolean
  onChange: () => void
  color?: string
}
export function CheckOption({ label, checked, onChange, color }: CheckOptionProps) {
  return (
    <button
      onClick={onChange}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '7px 14px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontFamily: 'var(--font-family)',
        fontSize: 13,
        color: checked ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
        fontWeight: checked ? 500 : 400,
        textAlign: 'left',
        transition: 'background 100ms',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = '#F8FAFC')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
    >
      <span
        style={{
          width: 16,
          height: 16,
          borderRadius: 4,
          border: `1.5px solid ${checked ? 'var(--color-accent-blue)' : 'var(--color-border)'}`,
          background: checked ? 'var(--color-accent-blue)' : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transition: 'all 150ms',
        }}
      >
        {checked && <Check size={10} color="#fff" strokeWidth={3} />}
      </span>
      {color && (
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0 }} />
      )}
      {label}
    </button>
  )
}

/* ── 드롭다운 내 라디오 옵션 ── */
interface RadioOptionProps {
  label: string
  checked: boolean
  onChange: () => void
}
export function RadioOption({ label, checked, onChange }: RadioOptionProps) {
  return (
    <button
      onClick={onChange}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '7px 14px',
        background: checked ? 'var(--color-accent-blue-light)' : 'none',
        border: 'none',
        cursor: 'pointer',
        fontFamily: 'var(--font-family)',
        fontSize: 13,
        color: checked ? 'var(--color-accent-blue)' : 'var(--color-text-secondary)',
        fontWeight: checked ? 500 : 400,
        textAlign: 'left',
        transition: 'background 100ms',
      }}
      onMouseEnter={(e) => {
        if (!checked) e.currentTarget.style.background = '#F8FAFC'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = checked ? 'var(--color-accent-blue-light)' : 'none'
      }}
    >
      {label}
    </button>
  )
}

/* ── 토글 FilterChip (드롭다운 없는 단순 토글) ── */
interface ToggleChipProps {
  label: string
  active: boolean
  onToggle: () => void
  activeColor?: string
  activeBg?: string
}
export function ToggleChip({ label, active, onToggle, activeColor = 'var(--color-accent-blue)', activeBg = 'var(--color-accent-blue-light)' }: ToggleChipProps) {
  return (
    <button
      onClick={onToggle}
      style={{
        height: 34,
        padding: '0 12px',
        borderRadius: 8,
        border: `1px solid ${active ? activeColor : 'var(--color-border)'}`,
        background: active ? activeBg : 'var(--color-bg-card)',
        color: active ? activeColor : 'var(--color-text-secondary)',
        fontFamily: 'var(--font-family)',
        fontSize: 13,
        fontWeight: active ? 500 : 400,
        cursor: 'pointer',
        transition: 'all 150ms',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </button>
  )
}
