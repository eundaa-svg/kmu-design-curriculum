import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  RotateCcw, ChevronDown, ChevronUp, CheckCheck,
  ArrowRight,
} from 'lucide-react'
import { useStore } from '../store/useStore'
import { useDepartment } from '../hooks/useDepartment'
import { useProgress } from '../hooks/useProgress'
import { useCountUp } from '../hooks/useCountUp'
import { useRecommendedCourses } from '../hooks/useRecommendedCourses'
import { departments } from '../data'
import type { Course } from '../types'
import Card from '../components/ui/Card'
import ProgressBar from '../components/ui/ProgressBar'
import Badge from '../components/ui/Badge'
import CourseDetailPanel from '../components/course/CourseDetailPanel'
import NoDeptSelected from '../components/ui/NoDeptSelected'
import SubMajorTracker from '../components/progress/SubMajorTracker'

export default function ProgressTracker() {
  const { myDepartmentId, completedCourseIds, currentYear, currentSemester, setMyDepartment, toggleCourseComplete, bulkComplete, resetProgress } = useStore()
  const department = useDepartment(myDepartmentId)
  const stats = useProgress(department, completedCourseIds)

  const completedSet = new Set(completedCourseIds)

  const recommended = useRecommendedCourses(department, completedSet, currentYear, currentSemester)
  const animatedCredits = useCountUp(stats.completedCredits, 400)

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [openYears, setOpenYears] = useState<Set<number>>(new Set([1, 2, 3, 4]))

  const toggleYear = (y: number) =>
    setOpenYears(prev => {
      const next = new Set(prev)
      next.has(y) ? next.delete(y) : next.add(y)
      return next
    })

  const handleBulkComplete = (courseIds: string[]) => bulkComplete(courseIds)

  const handleReset = () => {
    if (window.confirm('모든 이수 기록을 초기화하시겠습니까?\n이수 완료한 모든 과목이 해제됩니다.')) {
      resetProgress()
    }
  }

  return (
    <div className="page-enter" style={{ maxWidth: 1000, margin: '0 auto' }}>
      {/* ── A-1. 상단 컨트롤 바 ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 24,
          flexWrap: 'wrap',
        }}
      >
        <h1
          style={{
            font: 'var(--font-heading-xl)',
            fontFamily: 'var(--font-family)',
            color: 'var(--color-text-primary)',
            flex: 1,
          }}
        >
          이수 현황
        </h1>

        {/* 학과 드롭다운 */}
        <select
          value={myDepartmentId ?? ''}
          onChange={(e) => { if (e.target.value) setMyDepartment(e.target.value) }}
          style={{
            height: 40,
            padding: '0 12px',
            borderRadius: 10,
            border: '1px solid var(--color-border)',
            background: 'var(--color-bg-card)',
            fontFamily: 'var(--font-family)',
            fontSize: 14,
            color: 'var(--color-text-primary)',
            cursor: 'pointer',
            outline: 'none',
          }}
        >
          <option value="" disabled>학과 선택...</option>
          {departments.map(d => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>

        {/* 초기화 버튼 */}
        {department && (
          <button
            onClick={handleReset}
            style={{
              height: 40,
              padding: '0 14px',
              borderRadius: 10,
              border: '1px solid var(--color-border)',
              background: 'transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontFamily: 'var(--font-family)',
              fontSize: 14,
              color: 'var(--color-text-secondary)',
              transition: 'all 150ms',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-accent-red)'
              e.currentTarget.style.color = 'var(--color-accent-red)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border)'
              e.currentTarget.style.color = 'var(--color-text-secondary)'
            }}
          >
            <RotateCcw size={15} />
            초기화
          </button>
        )}
      </div>

      {/* 학과 미선택 */}
      {!department && <NoDeptSelected />}

      {department && (
        <>
          {/* ── A-2. 종합 통계 ── */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 24,
              marginBottom: 24,
            }}
            className="progress-stats-grid"
          >
            {/* 카드 1: 필수 과목 이수 */}
            <Card style={{ padding: '20px' }}>
              <h3 style={{ fontFamily: 'var(--font-family)', fontSize: 15, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 14 }}>
                필수 과목 이수
              </h3>
              <ProgressBar
                value={(stats.completedRequired / Math.max(stats.requiredCourses, 1)) * 100}
                color="var(--color-accent-blue)"
                height={8}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                <span style={{ fontFamily: 'var(--font-family)', fontSize: 13, color: 'var(--color-text-secondary)' }}>
                  {stats.completedRequired} / {stats.requiredCourses} 과목
                </span>
                <span style={{ fontFamily: 'var(--font-family)', fontSize: 13, fontWeight: 600, color: 'var(--color-accent-blue)' }}>
                  {Math.round((stats.completedRequired / Math.max(stats.requiredCourses, 1)) * 100)}%
                </span>
              </div>
              {stats.completedRequired < stats.requiredCourses && (
                <p style={{ fontFamily: 'var(--font-family)', fontSize: 13, color: 'var(--color-accent-red)', marginTop: 8, fontWeight: 500 }}>
                  ⚠ {stats.requiredCourses - stats.completedRequired}개 필수 과목 미이수
                </p>
              )}
            </Card>

            {/* 카드 2: 이수 학점 총합 */}
            <Card style={{ padding: '20px' }}>
              <h3 style={{ fontFamily: 'var(--font-family)', fontSize: 15, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 16 }}>
                이수 학점
              </h3>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 20 }}>
                <span style={{ fontFamily: 'var(--font-family)', fontSize: 40, fontWeight: 800, color: 'var(--color-text-primary)', lineHeight: 1, letterSpacing: '-0.02em' }}>
                  {animatedCredits}
                </span>
                <span style={{ fontFamily: 'var(--font-family)', fontSize: 18, fontWeight: 400, color: 'var(--color-text-secondary)' }}>
                  학점
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-family)', fontSize: 14, color: 'var(--color-text-secondary)' }}>전공필수</span>
                  <span style={{ fontFamily: 'var(--font-family)', fontSize: 14, fontWeight: 500, color: 'var(--color-text-primary)' }}>{stats.completedRequiredCredits}학점</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-family)', fontSize: 14, color: 'var(--color-text-secondary)' }}>전공선택</span>
                  <span style={{ fontFamily: 'var(--font-family)', fontSize: 14, fontWeight: 500, color: 'var(--color-text-primary)' }}>{stats.completedElectiveCredits}학점</span>
                </div>
              </div>
            </Card>
          </div>

          {/* ── A-2.5 다전공/부전공 트래커 ── */}
          {myDepartmentId && (
            <SubMajorTracker currentDeptId={myDepartmentId} />
          )}

          {/* ── A-3. 학년별 상세 현황 ── */}
          <div style={{ marginBottom: 24 }}>
            <h2
              style={{
                font: 'var(--font-heading-lg)',
                fontFamily: 'var(--font-family)',
                color: 'var(--color-text-primary)',
                marginBottom: 12,
              }}
            >
              학년별 이수 현황
            </h2>

            {/* 전학기 공통 */}
            {(() => {
              const commons = department.courses.filter(c => c.semester === 0)
              if (!commons.length) return null
              return (
                <Card style={{ marginBottom: 10, padding: '14px 18px' }}>
                  <p style={{ font: 'var(--font-label)', fontFamily: 'var(--font-family)', color: 'var(--color-text-muted)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    전학기 공통
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {commons.map(c => (
                      <CourseRow
                        key={c.id}
                        course={c}
                        completed={completedSet.has(c.id)}
                        onToggle={() => toggleCourseComplete(c.id)}
                        onSelect={() => setSelectedCourse(c)}
                      />
                    ))}
                  </div>
                </Card>
              )
            })()}

            {[1, 2, 3, 4].map(year => {
              const yearCourses = department.courses.filter(c => {
                if (c.semester === 0) return false
                const maxY = c.yearMax ?? c.year
                return c.year <= year && year <= maxY
              })
              if (!yearCourses.length) return null
              const completedInYear = yearCourses.filter(c => completedSet.has(c.id)).length
              const isOpen = openYears.has(year)

              const sem1Courses = yearCourses.filter(c => c.semester === 1)
              const sem2Courses = yearCourses.filter(c => c.semester === 2)

              return (
                <Card key={year} style={{ marginBottom: 10, padding: 0, overflow: 'hidden' }}>
                  {/* 헤더 */}
                  <button
                    onClick={() => toggleYear(year)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '14px 18px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      borderBottom: isOpen ? '1px solid var(--color-border)' : 'none',
                      textAlign: 'left',
                    }}
                  >
                    <span
                      style={{
                        font: 'var(--font-heading-md)',
                        fontFamily: 'var(--font-family)',
                        color: 'var(--color-text-primary)',
                        flex: 1,
                      }}
                    >
                      {year}학년
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-family)',
                          fontSize: 13,
                          color: completedInYear === yearCourses.length
                            ? 'var(--color-accent-green)'
                            : 'var(--color-text-muted)',
                          fontWeight: 500,
                        }}
                      >
                        {completedInYear}/{yearCourses.length}
                      </span>
                      <div style={{ width: 100 }}>
                        <ProgressBar
                          value={(completedInYear / Math.max(yearCourses.length, 1)) * 100}
                          height={5}
                          color={
                            year === 1 ? 'var(--color-accent-blue)' :
                            year === 2 ? 'var(--color-accent-green)' :
                            year === 3 ? 'var(--color-accent-indigo)' :
                            'var(--color-accent-amber)'
                          }
                        />
                      </div>
                      {isOpen
                        ? <ChevronUp size={16} style={{ color: 'var(--color-text-muted)' }} />
                        : <ChevronDown size={16} style={{ color: 'var(--color-text-muted)' }} />
                      }
                    </div>
                  </button>

                  {/* 본문 */}
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
                        gridTemplateColumns: '1fr 1fr',
                        gap: 0,
                        padding: '14px 18px',
                      }}
                      className="year-sem-grid"
                    >
                      {[{ sem: 1, courses: sem1Courses }, { sem: 2, courses: sem2Courses }].map(({ sem, courses: semCourses }) => (
                        <div
                          key={sem}
                          style={{
                            paddingRight: sem === 1 ? 16 : 0,
                            paddingLeft: sem === 2 ? 16 : 0,
                            borderRight: sem === 1 ? '1px solid var(--color-border)' : 'none',
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              marginBottom: 8,
                            }}
                          >
                            <p
                              style={{
                                font: 'var(--font-label)',
                                fontFamily: 'var(--font-family)',
                                color: 'var(--color-text-muted)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                              }}
                            >
                              {sem}학기
                            </p>
                            {semCourses.length > 0 && (
                              <button
                                onClick={() => handleBulkComplete(semCourses.map(c => c.id))}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 4,
                                  background: 'none',
                                  border: 'none',
                                  cursor: 'pointer',
                                  fontFamily: 'var(--font-family)',
                                  fontSize: 11,
                                  color: 'var(--color-text-muted)',
                                  padding: '2px 6px',
                                  borderRadius: 5,
                                  transition: 'all 150ms',
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = 'var(--color-accent-green-light)'
                                  e.currentTarget.style.color = 'var(--color-accent-green)'
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = 'none'
                                  e.currentTarget.style.color = 'var(--color-text-muted)'
                                }}
                              >
                                <CheckCheck size={12} />
                                일괄 이수
                              </button>
                            )}
                          </div>
                          {semCourses.length === 0 ? (
                            <p style={{ fontFamily: 'var(--font-family)', fontSize: 12, color: 'var(--color-text-muted)', fontStyle: 'italic' }}>—</p>
                          ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                              {semCourses.map(c => (
                                <CourseRow
                                  key={c.id}
                                  course={c}
                                  completed={completedSet.has(c.id)}
                                  onToggle={() => toggleCourseComplete(c.id)}
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
          </div>

          {/* ── A-4. 추천 과목 ── */}
          {recommended.length > 0 && (
            <div style={{ marginBottom: 32 }}>
              <h2
                style={{
                  font: 'var(--font-heading-lg)',
                  fontFamily: 'var(--font-family)',
                  color: 'var(--color-text-primary)',
                  marginBottom: 12,
                }}
              >
                다음에 들어야 할 과목
              </h2>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 12,
                }}
                className="recommend-grid"
              >
                {recommended.map(({ course, reason }) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Card hover style={{ height: '100%' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                        <p
                          style={{
                            font: 'var(--font-body-base)',
                            fontFamily: 'var(--font-family)',
                            fontWeight: 500,
                            color: 'var(--color-text-primary)',
                            flex: 1,
                          }}
                        >
                          {course.name}
                        </p>
                        <Badge variant={course.category === 'required' ? 'required' : 'gray'} style={{ marginLeft: 8, flexShrink: 0 }}>
                          {course.credits}학점
                        </Badge>
                      </div>
                      <p
                        style={{
                          font: 'var(--font-body-sm)',
                          fontFamily: 'var(--font-family)',
                          color: 'var(--color-text-muted)',
                          marginBottom: 8,
                        }}
                      >
                        {course.year}학년 {course.semester === 0 ? '전학기' : `${course.semester}학기`}
                      </p>
                      <p
                        style={{
                          font: 'var(--font-body-sm)',
                          fontFamily: 'var(--font-family)',
                          color: 'var(--color-text-secondary)',
                          marginBottom: 12,
                        }}
                      >
                        {reason}
                      </p>
                      <Link
                        to={`/department/${myDepartmentId}?view=roadmap`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 4,
                          fontFamily: 'var(--font-family)',
                          fontSize: 12,
                          color: 'var(--color-accent-blue)',
                          textDecoration: 'none',
                          fontWeight: 500,
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                        onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
                      >
                        커리큘럼에서 보기 <ArrowRight size={12} />
                      </Link>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* ── 커리어 적합도 연결 카드 ── */}
      <div style={{ padding: '0 32px 32px' }}>
        <Link
          to="/career-fit"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '16px 20px', background: '#F5F5F5', borderRadius: 12,
            textDecoration: 'none', border: '1px solid #E5E5E5',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = '#111111' }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = '#E5E5E5' }}
        >
          <span style={{ fontSize: 14, color: '#111111', fontFamily: 'var(--font-family)' }}>
            이수한 과목으로 커리어 적합도 확인하기
          </span>
          <span style={{ fontSize: 14, color: '#111111', fontWeight: 600 }}>→</span>
        </Link>
      </div>

      {/* ── 교과목 상세 패널 ── */}
      <CourseDetailPanel
        course={selectedCourse}
        completed={selectedCourse ? completedSet.has(selectedCourse.id) : false}
        onClose={() => setSelectedCourse(null)}
        onToggle={() => { if (selectedCourse) toggleCourseComplete(selectedCourse.id) }}
      />


      <style>{`
        @media (max-width: 1023px) {
          .progress-stats-grid { grid-template-columns: 1fr 1fr !important; }
          .recommend-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 767px) {
          .progress-stats-grid { grid-template-columns: 1fr !important; }
          .recommend-grid { grid-template-columns: 1fr !important; }
          .year-sem-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}

/* ── 과목 행 ── */
interface CourseRowProps {
  course: Course
  completed: boolean
  onToggle: () => void
  onSelect: () => void
}
function CourseRow({ course, completed, onToggle, onSelect }: CourseRowProps) {
  const isRequiredUnmet = course.category === 'required' && !completed
  return (
    <div
      style={{
        height: 40,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        borderRadius: 7,
        padding: '0 6px',
        transition: 'background 150ms',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = '#F8FAFC')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
    >
      {/* 필수 미이수 dot */}
      {isRequiredUnmet && (
        <span
          style={{
            width: 5,
            height: 5,
            borderRadius: '50%',
            background: 'var(--color-accent-red)',
            flexShrink: 0,
          }}
        />
      )}

      {/* 체크박스 */}
      <span
        role="checkbox"
        aria-checked={completed}
        tabIndex={0}
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); onToggle() }
        }}
        style={{
          width: 18,
          height: 18,
          borderRadius: 5,
          border: `1.5px solid ${completed ? '#111111' : 'var(--color-border)'}`,
          background: completed ? '#111111' : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          flexShrink: 0,
          transition: 'all 150ms',
        }}
      >
        {completed && (
          <svg className="check-icon-enter" width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>

      {/* 과목명 */}
      <button
        onClick={onSelect}
        style={{
          flex: 1,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'var(--font-family)',
          fontSize: 13,
          fontWeight: isRequiredUnmet ? 500 : 400,
          color: completed ? 'var(--color-text-muted)' : 'var(--color-text-primary)',
          textAlign: 'left',
          padding: 0,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {course.name}
      </button>

      {/* 배지 */}
      <Badge variant={course.category === 'required' ? 'required' : 'elective'} style={{ flexShrink: 0, fontSize: 11 }}>
        {course.category === 'required' ? '필수' : '선택'}
      </Badge>
    </div>
  )
}

