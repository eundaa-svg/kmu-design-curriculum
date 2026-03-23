import { type MouseEvent } from 'react'
import { Check } from 'lucide-react'
import type { Course } from '../../types'

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export interface CourseCardProps {
  course: Course
  completed: boolean
  onToggle: (e: MouseEvent) => void
  onClick: () => void
  /** compact: list-row style (no use in roadmap/category) */
  compact?: boolean
  isSelected?: boolean
}

const TAG_COLORS: Record<string, { bg: string; color: string }> = {
  '인문': { bg: '#EEF2FF', color: '#6366F1' },
  '소통': { bg: '#F5F5F5', color: '#111111' },
  '글로벌': { bg: '#F0FDF4', color: '#16A34A' },
  '창의': { bg: '#FFFBEB', color: '#D97706' },
  '전문': { bg: '#FFF1F2', color: '#E11D48' },
}

export default function CourseCard({ course, completed, onToggle, onClick, isSelected }: CourseCardProps) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        minHeight: 64,
        padding: '10px 12px',
        borderRadius: 10,
        border: `1px solid ${isSelected ? '#111111' : completed ? 'var(--color-accent-green)' : 'var(--color-border)'}`,
        borderLeft: `3px solid ${course.category === 'required' ? 'var(--color-accent-blue)' : 'transparent'}`,
        background: isSelected ? '#F5F5F5' : completed ? 'var(--color-accent-green-light)' : 'var(--color-bg-card)',
        boxShadow: isSelected ? '0 0 0 2px #111111' : 'none',
        cursor: 'pointer',
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        transition: 'transform 200ms ease, box-shadow 200ms ease, background 200ms ease, border-color 200ms ease',
        position: 'relative',
      }}
      onMouseEnter={(e) => {
        if (!completed && !isSelected) {
          const el = e.currentTarget
          const deptColor = getComputedStyle(el).getPropertyValue('--dept-color').trim()
          if (deptColor) {
            el.style.background = `linear-gradient(135deg, ${hexToRgba(deptColor, 0.04)} 0%, ${hexToRgba(deptColor, 0.08)} 100%)`
            el.style.borderColor = hexToRgba(deptColor, 0.2)
          }
          el.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)'
          el.style.transform = 'scale(1.03)'
          el.style.zIndex = '2'
          // 필수 과목 좌측 바 항상 유지
          if (course.category === 'required') {
            el.style.borderLeftColor = 'var(--color-accent-blue)'
          }
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          const el = e.currentTarget
          el.style.background = completed ? 'var(--color-accent-green-light)' : 'var(--color-bg-card)'
          el.style.borderColor = completed ? 'var(--color-accent-green)' : 'var(--color-border)'
          el.style.boxShadow = 'none'
          el.style.transform = 'scale(1)'
          el.style.zIndex = ''
          if (course.category === 'required') {
            el.style.borderLeftColor = 'var(--color-accent-blue)'
          }
        }
      }}
    >
      {/* Row 1: 과목명 + 체크 아이콘 */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
        <span
          style={{
            flex: 1,
            fontFamily: 'var(--font-family)',
            fontSize: 13,
            fontWeight: 500,
            color: completed ? 'var(--color-accent-green)' : 'var(--color-text-primary)',
            lineHeight: '18px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {course.name}
        </span>

        {/* 체크 토글 버튼 */}
        <span
          role="checkbox"
          aria-checked={completed}
          tabIndex={0}
          onClick={onToggle}
          onKeyDown={(e) => {
            if (e.key === ' ' || e.key === 'Enter') {
              e.preventDefault()
              onToggle(e as unknown as MouseEvent)
            }
          }}
          style={{
            flexShrink: 0,
            width: 20,
            height: 20,
            borderRadius: 6,
            border: `1.5px solid ${completed ? 'var(--color-accent-green)' : 'var(--color-border)'}`,
            background: completed ? 'var(--color-accent-green)' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 150ms ease',
            cursor: 'pointer',
            marginTop: 1,
          }}
        >
          {completed && <Check size={12} color="#fff" strokeWidth={3} />}
        </span>
      </div>

      {/* Row 2: 배지들 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, alignItems: 'center' }}>
        {/* 학점 */}
        <span
          style={{
            fontFamily: 'var(--font-family)',
            fontSize: 11,
            fontWeight: 500,
            color: 'var(--color-text-muted)',
            background: '#F1F5F9',
            borderRadius: 4,
            padding: '1px 5px',
          }}
        >
          {course.credits}학점
        </span>

        {/* 이수구분 */}
        {course.category === 'required' ? (
          <span
            style={{
              fontFamily: 'var(--font-family)',
              fontSize: 11,
              color: 'var(--color-accent-blue)',
              background: 'var(--color-accent-blue-light)',
              borderRadius: 4,
              padding: '1px 5px',
            }}
          >
            필수
          </span>
        ) : (
          <span
            style={{
              fontFamily: 'var(--font-family)',
              fontSize: 11,
              color: 'var(--color-text-secondary)',
              background: '#F1F5F9',
              borderRadius: 4,
              padding: '1px 5px',
            }}
          >
            선택
          </span>
        )}

        {/* 캡스톤 */}
        {course.isCapstone && (
          <span
            style={{
              fontFamily: 'var(--font-family)',
              fontSize: 11,
              color: 'var(--color-accent-amber)',
              background: 'var(--color-accent-amber-light)',
              borderRadius: 4,
              padding: '1px 5px',
            }}
          >
            캡스톤
          </span>
        )}

        {/* 선수과목 있음 표시 */}
        {course.prerequisite && (
          <span
            style={{
              fontFamily: 'var(--font-family)',
              fontSize: 11,
              color: 'var(--color-accent-red)',
              background: 'var(--color-accent-red-light)',
              borderRadius: 4,
              padding: '1px 5px',
            }}
          >
            선수↑
          </span>
        )}
      </div>
    </button>
  )
}

export { TAG_COLORS }
