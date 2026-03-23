import { useRef, type MouseEvent } from 'react'
import type { Course } from '../../types'
import CourseCard from '../../components/course/CourseCard'

interface RoadmapViewProps {
  courses: Course[]
  completed: Set<string>
  onToggle: (id: string, e: MouseEvent) => void
  onSelect: (course: Course) => void
  selectedCourseId: string | null
}

const YEAR_SEM_COLS = [
  { year: 1, sem: 1 }, { year: 1, sem: 2 },
  { year: 2, sem: 1 }, { year: 2, sem: 2 },
  { year: 3, sem: 1 }, { year: 3, sem: 2 },
  { year: 4, sem: 1 }, { year: 4, sem: 2 },
]

export default function RoadmapView({ courses, completed, onToggle, onSelect, selectedCourseId }: RoadmapViewProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef({ down: false, startX: 0, scrollX: 0 })

  /* 드래그 스크롤 */
  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    dragRef.current = { down: true, startX: e.clientX, scrollX: scrollRef.current?.scrollLeft ?? 0 }
    if (scrollRef.current) scrollRef.current.style.cursor = 'grabbing'
  }
  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!dragRef.current.down || !scrollRef.current) return
    const dx = e.clientX - dragRef.current.startX
    scrollRef.current.scrollLeft = dragRef.current.scrollX - dx
  }
  const stopDrag = () => {
    dragRef.current.down = false
    if (scrollRef.current) scrollRef.current.style.cursor = 'grab'
  }

  /* 전학기 공통 */
  const commonCourses = courses.filter((c) => c.semester === 0)

  /* 학기별 그룹 (3-4학년 공유 과목은 year~yearMax 모두 포함) */
  const byCols: Record<string, Course[]> = {}
  for (const col of YEAR_SEM_COLS) {
    byCols[`${col.year}-${col.sem}`] = []
  }
  for (const c of courses) {
    if (c.semester === 0) continue
    const maxYear = c.yearMax ?? c.year
    for (let y = c.year; y <= maxYear; y++) {
      const key = `${y}-${c.semester}`
      if (byCols[key]) byCols[key].push(c)
    }
  }

  return (
    <div>
      {/* 전학기 공통 */}
      {commonCourses.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <p
            style={{
              font: 'var(--font-label)',
              fontFamily: 'var(--font-family)',
              color: 'var(--color-text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: 8,
            }}
          >
            전학기 공통
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {commonCourses.map((c) => (
              <div key={c.id} style={{ width: 200 }}>
                <CourseCard
                  course={c}
                  completed={completed.has(c.id)}
                  onToggle={(e) => onToggle(c.id, e)}
                  onClick={() => onSelect(c)}
                  isSelected={c.id === selectedCourseId}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 연도별 스크롤 */}
      <div
        ref={scrollRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        style={{
          overflowX: 'auto',
          cursor: 'grab',
          userSelect: 'none',
          paddingBottom: 12,
        }}
      >
        {/* 학년 헤더 그룹 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 2,
            minWidth: 1680,
            marginBottom: 4,
          }}
        >
          {([
            { year: 1, bg: '#E5E5E5', color: '#111111' },
            { year: 2, bg: '#999999', color: '#FFFFFF' },
            { year: 3, bg: '#555555', color: '#FFFFFF' },
            { year: 4, bg: '#111111', color: '#FFFFFF' },
          ]).map(({ year, bg, color }) => (
            <div
              key={year}
              style={{
                textAlign: 'center',
                padding: '8px 0',
                background: bg,
                borderRadius: 8,
                fontFamily: 'var(--font-family)',
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: '1px',
                color,
                border: '1px solid rgba(0,0,0,0.1)',
              }}
            >
              {year}학년
            </div>
          ))}
        </div>

        {/* 8열 학기 그리드 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(8, minmax(200px, 1fr))',
            gap: 12,
            minWidth: 1680,
          }}
        >
          {YEAR_SEM_COLS.map(({ year, sem }) => {
            const key = `${year}-${sem}`
            const colCourses = byCols[key] ?? []
            const semLabelColors: Record<number, string> = { 1: '#666666', 2: '#888888', 3: '#AAAAAA', 4: '#CCCCCC' }
            const semLabelColor = semLabelColors[year] ?? '#888888'
            return (
              <div
                key={key}
                style={{
                  background: 'transparent',
                  borderRadius: 10,
                  padding: '0 4px 8px',
                }}
              >
                {/* 열 헤더 */}
                <div
                  style={{
                    padding: '8px 4px 10px',
                    fontFamily: 'var(--font-family)',
                    fontSize: 12,
                    fontWeight: 500,
                    color: semLabelColor,
                    textAlign: 'center',
                    borderBottom: `2px solid ${semLabelColor}`,
                    marginBottom: 10,
                  }}
                >
                  {sem}학기
                </div>

                {/* 과목 카드들 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {colCourses.length === 0 ? (
                    <p
                      style={{
                        textAlign: 'center',
                        fontFamily: 'var(--font-family)',
                        fontSize: 12,
                        color: 'var(--color-text-muted)',
                        padding: '16px 0',
                        fontStyle: 'italic',
                      }}
                    >
                      —
                    </p>
                  ) : (
                    colCourses.map((c) => (
                      <CourseCard
                        key={`${c.id}-${year}`}
                        course={c}
                        completed={completed.has(c.id)}
                        onToggle={(e) => onToggle(c.id, e)}
                        onClick={() => onSelect(c)}
                        isSelected={c.id === selectedCourseId}
                      />
                    ))
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
