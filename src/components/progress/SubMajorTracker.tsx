import { useState } from 'react'
import { ChevronDown, ChevronUp, CheckCheck, RotateCcw } from 'lucide-react'
import { departments } from '../../data'
import { useSubMajor, type SubMajorType } from '../../hooks/useSubMajor'
import type { Course, Department } from '../../types'
import Card from '../ui/Card'
import ProgressBar from '../ui/ProgressBar'
import Badge from '../ui/Badge'
import CourseDetailPanel from '../course/CourseDetailPanel'

/* ── 과목 행 ── */
function CourseRow({
  course, completed, onToggle, onSelect,
}: { course: Course; completed: boolean; onToggle: () => void; onSelect: () => void }) {
  const isRequiredUnmet = course.category === 'required' && !completed
  return (
    <div
      style={{ height: 40, display: 'flex', alignItems: 'center', gap: 8, borderRadius: 7, padding: '0 6px', transition: 'background 150ms' }}
      onMouseEnter={(e) => (e.currentTarget.style.background = '#F8FAFC')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
    >
      {isRequiredUnmet && (
        <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--color-accent-red)', flexShrink: 0 }} />
      )}
      <span
        role="checkbox"
        aria-checked={completed}
        tabIndex={0}
        onClick={onToggle}
        onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); onToggle() } }}
        style={{
          width: 18, height: 18, borderRadius: 5,
          border: `1.5px solid ${completed ? 'var(--color-accent-green)' : 'var(--color-border)'}`,
          background: completed ? 'var(--color-accent-green)' : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', flexShrink: 0, transition: 'all 150ms',
        }}
      >
        {completed && (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <button
        onClick={onSelect}
        style={{
          flex: 1, background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: 'var(--font-family)', fontSize: 13,
          fontWeight: isRequiredUnmet ? 500 : 400,
          color: completed ? 'var(--color-text-muted)' : 'var(--color-text-primary)',
          textAlign: 'left', padding: 0,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}
      >
        {course.name}
      </button>
      <Badge variant={course.category === 'required' ? 'required' : 'elective'} style={{ flexShrink: 0, fontSize: 11 }}>
        {course.category === 'required' ? '필수' : '선택'}
      </Badge>
    </div>
  )
}

/* ── 학년별 아코디언 ── */
function YearAccordion({
  dept, completedIds, toggleCourse, bulkComplete,
}: {
  dept: Department
  completedIds: Set<string>
  toggleCourse: (id: string) => void
  bulkComplete: (ids: string[]) => void
}) {
  const [openYears, setOpenYears] = useState<Set<number>>(new Set([1, 2, 3, 4]))
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

  const toggleYear = (y: number) =>
    setOpenYears(prev => {
      const next = new Set(prev)
      next.has(y) ? next.delete(y) : next.add(y)
      return next
    })

  // 부전공/다전공 모두 전체 과목 표시 (학점 합산으로만 판정)
  const filteredCourses = dept.courses

  const commons = filteredCourses.filter(c => c.semester === 0)

  return (
    <>
      {commons.length > 0 && (
        <Card style={{ marginBottom: 10, padding: '14px 18px' }}>
          <p style={{ fontFamily: 'var(--font-family)', fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            전학기 공통
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {commons.map(c => (
              <CourseRow
                key={c.id}
                course={c}
                completed={completedIds.has(c.id)}
                onToggle={() => toggleCourse(c.id)}
                onSelect={() => setSelectedCourse(c)}
              />
            ))}
          </div>
        </Card>
      )}

      {[1, 2, 3, 4].map(year => {
        const yearCourses = filteredCourses.filter(c => {
          if (c.semester === 0) return false
          const maxY = c.yearMax ?? c.year
          return c.year <= year && year <= maxY
        })
        if (!yearCourses.length) return null
        const completedInYear = yearCourses.filter(c => completedIds.has(c.id)).length
        const isOpen = openYears.has(year)
        const sem1 = yearCourses.filter(c => c.semester === 1)
        const sem2 = yearCourses.filter(c => c.semester === 2)

        return (
          <Card key={year} style={{ marginBottom: 10, padding: 0, overflow: 'hidden' }}>
            <button
              onClick={() => toggleYear(year)}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', background: 'none', border: 'none', cursor: 'pointer', borderBottom: isOpen ? '1px solid var(--color-border)' : 'none', textAlign: 'left' }}
            >
              <span style={{ fontFamily: 'var(--font-family)', fontSize: 15, fontWeight: 600, color: 'var(--color-text-primary)', flex: 1 }}>{year}학년</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontFamily: 'var(--font-family)', fontSize: 13, color: completedInYear === yearCourses.length ? 'var(--color-accent-green)' : 'var(--color-text-muted)', fontWeight: 500 }}>
                  {completedInYear}/{yearCourses.length}
                </span>
                <div style={{ width: 100 }}>
                  <ProgressBar
                    value={(completedInYear / Math.max(yearCourses.length, 1)) * 100}
                    height={5}
                    color={year === 1 ? 'var(--color-accent-blue)' : year === 2 ? 'var(--color-accent-green)' : year === 3 ? 'var(--color-accent-indigo)' : 'var(--color-accent-amber)'}
                  />
                </div>
                {isOpen ? <ChevronUp size={16} style={{ color: 'var(--color-text-muted)' }} /> : <ChevronDown size={16} style={{ color: 'var(--color-text-muted)' }} />}
              </div>
            </button>
            <div style={{ maxHeight: isOpen ? '9999px' : 0, overflow: 'hidden', transition: 'max-height 200ms ease' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, padding: '14px 18px' }} className="year-sem-grid">
                {[{ sem: 1, courses: sem1 }, { sem: 2, courses: sem2 }].map(({ sem, courses: semCourses }) => (
                  <div key={sem} style={{ paddingRight: sem === 1 ? 16 : 0, paddingLeft: sem === 2 ? 16 : 0, borderRight: sem === 1 ? '1px solid var(--color-border)' : 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                      <p style={{ fontFamily: 'var(--font-family)', fontSize: 11, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{sem}학기</p>
                      {semCourses.length > 0 && (
                        <button
                          onClick={() => bulkComplete(semCourses.map(c => c.id))}
                          style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-family)', fontSize: 11, color: 'var(--color-text-muted)', padding: '2px 6px', borderRadius: 5, transition: 'all 150ms' }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-accent-green-light)'; e.currentTarget.style.color = 'var(--color-accent-green)' }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--color-text-muted)' }}
                        >
                          <CheckCheck size={12} />일괄 이수
                        </button>
                      )}
                    </div>
                    {semCourses.length === 0
                      ? <p style={{ fontFamily: 'var(--font-family)', fontSize: 12, color: 'var(--color-text-muted)', fontStyle: 'italic' }}>—</p>
                      : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                          {semCourses.map(c => (
                            <CourseRow
                              key={c.id}
                              course={c}
                              completed={completedIds.has(c.id)}
                              onToggle={() => toggleCourse(c.id)}
                              onSelect={() => setSelectedCourse(c)}
                            />
                          ))}
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )
      })}

      <CourseDetailPanel
        course={selectedCourse}
        completed={selectedCourse ? completedIds.has(selectedCourse.id) : false}
        onClose={() => setSelectedCourse(null)}
        onToggle={() => { if (selectedCourse) toggleCourse(selectedCourse.id) }}
      />
    </>
  )
}

/* ── 메인 컴포넌트 ── */
export default function SubMajorTracker({ currentDeptId }: { currentDeptId: string }) {
  const [open, setOpen] = useState(false)
  const { state, setState, completedIds, toggleCourse, resetCompleted, bulkCompleteAll } = useSubMajor()

  const availableDepts = departments.filter(d => d.id !== currentDeptId)
  const selectedDept = state.departmentId ? departments.find(d => d.id === state.departmentId) : undefined

  const MINOR_REQUIRED_CREDITS = 18

  // progress stats for sub-major
  const subProgress = selectedDept
    ? (() => {
        const isMinor = state.type === 'minor'
        const courses = selectedDept.courses // 항상 전체 과목
        let requiredCourses = 0, completedRequired = 0, completedCredits = 0
        let completedRequiredCredits = 0, completedElectiveCredits = 0
        for (const c of courses) {
          if (c.category === 'required') requiredCourses++
          if (completedIds.has(c.id)) {
            completedCredits += c.credits
            if (c.category === 'required') { completedRequired++; completedRequiredCredits += c.credits }
            else completedElectiveCredits += c.credits
          }
        }
        const minorMet = isMinor && completedCredits >= MINOR_REQUIRED_CREDITS
        return { requiredCourses, completedRequired, completedCredits, completedRequiredCredits, completedElectiveCredits, minorMet }
      })()
    : null

  const setType = (type: SubMajorType) => setState({ ...state, type, departmentId: '' })
  const setDept = (departmentId: string) => setState({ ...state, departmentId })

  return (
    <div style={{ marginBottom: 24 }}>
      {/* 토글 버튼 */}
      <button
        onClick={() => setOpen(v => !v)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-family)', fontSize: 14, color: 'var(--color-accent-blue)', padding: '8px 0', display: 'flex', alignItems: 'center', gap: 4 }}
        onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
        onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
      >
        {open ? '− 다전공/부전공 접기' : '+ 다전공/부전공 추가'}
      </button>

      {/* 펼치는 영역 */}
      <div style={{ maxHeight: open ? '9999px' : 0, overflow: 'hidden', transition: 'max-height 300ms ease' }}>
        <div style={{ borderLeft: '3px solid var(--color-accent-blue)', background: 'var(--color-bg-primary)', padding: 24, borderRadius: 12, marginTop: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <h2 style={{ fontFamily: 'var(--font-family)', fontSize: 16, fontWeight: 600, color: 'var(--color-text-primary)' }}>
              다전공 / 부전공 이수 현황
            </h2>
            {state.departmentId && (
              <button
                onClick={() => resetCompleted(state.departmentId)}
                style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: '1px solid var(--color-border)', borderRadius: 8, cursor: 'pointer', fontFamily: 'var(--font-family)', fontSize: 13, color: 'var(--color-text-secondary)', padding: '5px 10px', transition: 'all 150ms' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-accent-red)'; e.currentTarget.style.color = 'var(--color-accent-red)' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-text-secondary)' }}
              >
                <RotateCcw size={13} />초기화
              </button>
            )}
          </div>

          {/* 유형 + 학과 선택 */}
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end', marginBottom: 24, flexWrap: 'wrap' }}>
            {/* 유형 선택 */}
            <div>
              <p style={{ fontFamily: 'var(--font-family)', fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 8 }}>유형 선택</p>
              <div style={{ display: 'flex', gap: 12 }}>
                {(['double', 'minor'] as SubMajorType[]).map(t => (
                  <label key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontFamily: 'var(--font-family)', fontSize: 14, color: 'var(--color-text-primary)' }}>
                    <input
                      type="radio"
                      name="subMajorType"
                      checked={state.type === t}
                      onChange={() => setType(t)}
                      style={{ accentColor: 'var(--color-accent-blue)', width: 16, height: 16 }}
                    />
                    {t === 'double' ? '다전공' : '부전공'}
                  </label>
                ))}
              </div>
            </div>

            {/* 학과 선택 */}
            <div style={{ flex: 1, minWidth: 200 }}>
              <p style={{ fontFamily: 'var(--font-family)', fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 8 }}>학과 선택</p>
              <select
                value={state.departmentId}
                onChange={(e) => setDept(e.target.value)}
                style={{ width: '100%', height: 44, padding: '0 16px', borderRadius: 10, border: `1px solid ${state.departmentId ? 'var(--color-accent-blue)' : 'var(--color-border)'}`, background: '#FFFFFF', fontFamily: 'var(--font-family)', fontSize: 14, color: state.departmentId ? 'var(--color-text-primary)' : 'var(--color-text-muted)', cursor: 'pointer', outline: 'none' }}
              >
                <option value="">학과를 선택하세요</option>
                {availableDepts.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>
          </div>

          {!state.departmentId && (
            <p style={{ fontFamily: 'var(--font-family)', fontSize: 14, color: 'var(--color-text-muted)', textAlign: 'center', padding: '20px 0' }}>
              ※ 학과 선택 후 해당 학과 커리큘럼이 표시됩니다
            </p>
          )}

          {/* 학과 선택 후 콘텐츠 */}
          {selectedDept && subProgress && (
            <>
              {state.type === 'minor' ? (
                /* ── 부전공 모드: 단일 카드 ── */
                <Card style={{ padding: '20px', marginBottom: 24 }}>
                  <h3 style={{ fontFamily: 'var(--font-family)', fontSize: 15, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 16 }}>
                    부전공 이수 조건
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 16 }}>
                    <span style={{ fontFamily: 'var(--font-family)', fontSize: 36, fontWeight: 700, color: 'var(--color-text-primary)', lineHeight: 1 }}>
                      {subProgress.completedCredits}
                    </span>
                    <span style={{ fontFamily: 'var(--font-family)', fontSize: 18, fontWeight: 400, color: 'var(--color-text-secondary)' }}>
                      / {MINOR_REQUIRED_CREDITS} 학점
                    </span>
                  </div>
                  <ProgressBar
                    value={Math.min(100, (subProgress.completedCredits / MINOR_REQUIRED_CREDITS) * 100)}
                    color={subProgress.minorMet ? 'var(--color-accent-green)' : 'var(--color-accent-blue)'}
                    height={8}
                  />
                  <p style={{ fontFamily: 'var(--font-family)', fontSize: 14, color: 'var(--color-text-secondary)', marginTop: 12 }}>
                    전공 과목 중 {MINOR_REQUIRED_CREDITS}학점 이상 이수하면 부전공이 인정됩니다.
                  </p>
                  <p style={{ fontFamily: 'var(--font-family)', fontSize: 13, fontWeight: 500, color: subProgress.minorMet ? 'var(--color-accent-green)' : 'var(--color-accent-red)', marginTop: 8 }}>
                    {subProgress.minorMet
                      ? '✓ 부전공 이수 조건 충족'
                      : `⚠ ${MINOR_REQUIRED_CREDITS - subProgress.completedCredits}학점 더 이수 필요`}
                  </p>
                </Card>
              ) : (
                /* ── 다전공 모드: 2열 카드 ── */
                <>
                  {/* 다전공 안내 */}
                  <div style={{ background: 'var(--color-bg-hover)', padding: 16, borderRadius: 8, marginBottom: 16 }}>
                    <p style={{ fontFamily: 'var(--font-family)', fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                      ℹ <strong>다전공 안내</strong><br />
                      제1전공의 졸업요건에 준하여 전공필수 과목 이수 및 전공 최저이수학점을 충족해야 합니다.<br />
                      (전공 간 중복인정: 최저이수학점 40학점 이상 시 전공당 최대 15학점, 40학점 미만 시 최대 12학점)
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 24 }} className="progress-stats-grid">
                    {/* 카드1: 필수 과목 */}
                    <Card style={{ padding: '20px' }}>
                      <h3 style={{ fontFamily: 'var(--font-family)', fontSize: 15, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 14 }}>
                        필수 과목 이수
                      </h3>
                      <ProgressBar
                        value={(subProgress.completedRequired / Math.max(subProgress.requiredCourses, 1)) * 100}
                        color="var(--color-accent-blue)"
                        height={8}
                      />
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                        <span style={{ fontFamily: 'var(--font-family)', fontSize: 13, color: 'var(--color-text-secondary)' }}>
                          {subProgress.completedRequired} / {subProgress.requiredCourses} 과목
                        </span>
                        <span style={{ fontFamily: 'var(--font-family)', fontSize: 13, fontWeight: 600, color: 'var(--color-accent-blue)' }}>
                          {Math.round((subProgress.completedRequired / Math.max(subProgress.requiredCourses, 1)) * 100)}%
                        </span>
                      </div>
                      {subProgress.completedRequired < subProgress.requiredCourses && (
                        <p style={{ fontFamily: 'var(--font-family)', fontSize: 13, color: 'var(--color-accent-red)', marginTop: 8, fontWeight: 500 }}>
                          ⚠ {subProgress.requiredCourses - subProgress.completedRequired}개 필수 과목 미이수
                        </p>
                      )}
                    </Card>

                    {/* 카드2: 이수 학점 */}
                    <Card style={{ padding: '20px' }}>
                      <h3 style={{ fontFamily: 'var(--font-family)', fontSize: 15, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 16 }}>
                        이수 학점
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 20 }}>
                        <span style={{ fontFamily: 'var(--font-family)', fontSize: 36, fontWeight: 700, color: 'var(--color-text-primary)', lineHeight: 1 }}>
                          {subProgress.completedCredits}
                        </span>
                        <span style={{ fontFamily: 'var(--font-family)', fontSize: 18, fontWeight: 400, color: 'var(--color-text-secondary)' }}>학점</span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontFamily: 'var(--font-family)', fontSize: 14, color: 'var(--color-text-secondary)' }}>전공필수</span>
                          <span style={{ fontFamily: 'var(--font-family)', fontSize: 14, fontWeight: 500, color: 'var(--color-text-primary)' }}>{subProgress.completedRequiredCredits}학점</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontFamily: 'var(--font-family)', fontSize: 14, color: 'var(--color-text-secondary)' }}>전공선택</span>
                          <span style={{ fontFamily: 'var(--font-family)', fontSize: 14, fontWeight: 500, color: 'var(--color-text-primary)' }}>{subProgress.completedElectiveCredits}학점</span>
                        </div>
                      </div>
                    </Card>
                  </div>
                </>
              )}

              {/* 학년별 아코디언 */}
              <h2 style={{ fontFamily: 'var(--font-family)', fontSize: 16, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 12 }}>
                학년별 이수 현황
              </h2>
              <YearAccordion
                dept={selectedDept}
                completedIds={completedIds}
                toggleCourse={(id) => toggleCourse(id, state.departmentId)}
                bulkComplete={(ids) => bulkCompleteAll(ids, state.departmentId)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
