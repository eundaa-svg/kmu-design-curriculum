import { useState, type MouseEvent } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import type { Course } from '../../types'
import CourseCard from '../../components/course/CourseCard'

interface CategoryViewProps {
  courses: Course[]
  completed: Set<string>
  onToggle: (id: string, e: MouseEvent) => void
  onSelect: (course: Course) => void
}

function groupByConcentration(courses: Course[]): [string, Course[]][] {
  const map = new Map<string, Course[]>()
  for (const c of courses) {
    const key = c.concentration ?? '공통'
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(c)
  }
  // 공통 먼저, 나머지 가나다순
  const entries = [...map.entries()]
  const common = entries.filter(([k]) => k === '공통')
  const rest = entries.filter(([k]) => k !== '공통').sort(([a], [b]) => a.localeCompare(b, 'ko'))
  return [...common, ...rest]
}

export default function CategoryView({ courses, completed, onToggle, onSelect }: CategoryViewProps) {
  const groups = groupByConcentration(courses)
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set())

  const toggle = (key: string) =>
    setCollapsed((prev) => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {groups.map(([groupName, groupCourses]) => {
        const isOpen = !collapsed.has(groupName)
        const completedInGroup = groupCourses.filter((c) => completed.has(c.id)).length
        return (
          <div
            key={groupName}
            style={{
              background: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
              borderRadius: 14,
              overflow: 'hidden',
            }}
          >
            {/* 아코디언 헤더 */}
            <button
              onClick={() => toggle(groupName)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '14px 20px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                borderBottom: isOpen ? '1px solid var(--color-border)' : 'none',
                textAlign: 'left',
                transition: 'background 150ms',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#F8FAFC')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
            >
              <span
                style={{
                  flex: 1,
                  font: 'var(--font-heading-md)',
                  fontFamily: 'var(--font-family)',
                  color: 'var(--color-text-primary)',
                }}
              >
                {groupName}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-family)',
                  fontSize: 13,
                  color: 'var(--color-text-muted)',
                }}
              >
                {completedInGroup}/{groupCourses.length} 이수
              </span>
              {isOpen ? (
                <ChevronUp size={18} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
              ) : (
                <ChevronDown size={18} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
              )}
            </button>

            {/* 아코디언 바디 */}
            <div
              style={{
                maxHeight: isOpen ? '9999px' : 0,
                overflow: 'hidden',
                transition: 'max-height 200ms ease',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 10,
                  padding: '16px 20px',
                }}
                className="category-course-grid"
              >
                {groupCourses.map((c) => (
                  <CourseCard
                    key={c.id}
                    course={c}
                    completed={completed.has(c.id)}
                    onToggle={(e) => onToggle(c.id, e)}
                    onClick={() => onSelect(c)}
                  />
                ))}
              </div>
            </div>
          </div>
        )
      })}
      <style>{`
        @media (max-width: 640px) {
          .category-course-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
