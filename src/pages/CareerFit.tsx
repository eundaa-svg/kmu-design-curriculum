import { useState, useRef, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Target, Info, X, Check, Circle, ChevronDown, ChevronUp } from 'lucide-react'
import { useCareerFit } from '../hooks/useCareerFit'
import { useStore } from '../store/useStore'
import { useCountUp } from '../hooks/useCountUp'
import { getAllCourses } from '../data'
import { jobCourseMappings } from '../data/jobCourseMap'
import type { Course } from '../types'
import CourseDetailPanel from '../components/course/CourseDetailPanel'

const DEPT_META: Record<string, { color: string; name: string }> = {
  'industrial-design':   { color: '#FF0017', name: '공업디자인' },
  'visual-design':       { color: '#FF006A', name: '시각디자인' },
  'metal-craft':         { color: '#FFC900', name: '금속공예' },
  'ceramic-craft':       { color: '#FF7700', name: '도자공예' },
  'fashion-design':      { color: '#8E008E', name: '의상디자인' },
  'spatial-design':      { color: '#008AC2', name: '공간디자인' },
  'moving-image-design': { color: '#00BCB5', name: '영상디자인' },
  'automotive-design':   { color: '#2B50B6', name: '자동차운송' },
  'ai-design':           { color: '#00CC00', name: 'AI디자인' },
}

function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

const RANK_LABEL = ['1st', '2nd', '3rd']

const DEPT_LIST = [
  { id: 'industrial-design',   name: '공업디자인',       color: '#FF0017' },
  { id: 'visual-design',       name: '시각디자인',       color: '#FF006A' },
  { id: 'metal-craft',         name: '금속공예',         color: '#FFC900' },
  { id: 'ceramic-craft',       name: '도자공예',         color: '#FF7700' },
  { id: 'fashion-design',      name: '의상디자인',       color: '#8E008E' },
  { id: 'spatial-design',      name: '공간디자인',       color: '#008AC2' },
  { id: 'moving-image-design', name: '영상디자인',       color: '#00BCB5' },
  { id: 'automotive-design',   name: '자동차운송디자인', color: '#2B50B6' },
  { id: 'ai-design',           name: 'AI디자인',         color: '#00FF00' },
]

function DeptSelectModal({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState<string | null>(null)

  const go = (id: string) => { navigate(`/department/${id}`); onClose() }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1000, padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#111111', borderRadius: 20, padding: 32,
          maxWidth: 560, width: '100%',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 16, right: 16,
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(255,255,255,0.3)', padding: 4,
            lineHeight: 1, fontSize: 20,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
        >
          <X size={18} />
        </button>
        <p style={{ fontSize: 18, fontWeight: 700, color: '#FFFFFF', textAlign: 'center', margin: '0 0 24px' }}>
          학과를 선택하세요
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {DEPT_LIST.map((dept) => {
            const isHov = hovered === dept.id
            const h = dept.color.replace('#','')
            const rr = parseInt(h.slice(0,2),16), gg = parseInt(h.slice(2,4),16), bb = parseInt(h.slice(4,6),16)
            const lightBg = dept.color === '#FFC900' || dept.color === '#00FF00'
            return (
              <button
                key={dept.id}
                onClick={() => go(dept.id)}
                onMouseEnter={() => setHovered(dept.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: isHov ? dept.color : 'rgba(255,255,255,0.06)',
                  border: `1px solid ${isHov ? dept.color : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: 12, padding: '14px 12px',
                  textAlign: 'center', cursor: 'pointer',
                  boxShadow: isHov ? `0 0 16px rgba(${rr},${gg},${bb},0.3)` : 'none',
                  transition: 'all 200ms ease',
                }}
              >
                <div style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: isHov ? (lightBg ? '#111111' : '#FFFFFF') : dept.color,
                  margin: '0 auto 6px',
                  transition: 'background 200ms ease',
                }} />
                <span style={{
                  fontSize: 13, fontWeight: 600,
                  color: isHov ? (lightBg ? '#111111' : '#FFFFFF') : 'rgba(255,255,255,0.5)',
                  transition: 'color 200ms ease',
                }}>
                  {dept.name}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function TopCard({ result, rank }: { result: ReturnType<typeof useCareerFit>[0]; rank: number }) {
  const animated = useCountUp(result.percentage, 800)
  const isFirst = rank === 0
  return (
    <div
      style={{
        background: isFirst
          ? 'linear-gradient(135deg, #1a1a2e 0%, #111111 60%, #0d0d0d 100%)'
          : 'linear-gradient(135deg, #1c1c1c 0%, #111111 100%)',
        borderRadius: isFirst ? 18 : 14,
        padding: isFirst ? 28 : 24,
        color: '#FFFFFF',
        flex: 1,
        minWidth: 0,
        boxShadow: isFirst
          ? '0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.12)'
          : '0 4px 16px rgba(0,0,0,0.12)',
      }}
    >
      <div style={{ fontSize: 12, opacity: 0.5, marginBottom: 8 }}>{RANK_LABEL[rank]}</div>
      <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{result.jobName}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, marginBottom: 12 }}>
        <span style={{ fontSize: 48, fontWeight: 800, lineHeight: 1 }}>{animated}</span>
        <span style={{ fontSize: 24, fontWeight: 700 }}>%</span>
      </div>
      <div
        style={{
          height: isFirst ? 8 : 6,
          borderRadius: 4,
          background: 'rgba(255,255,255,0.15)',
          overflow: 'hidden',
          marginBottom: 10,
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${result.percentage}%`,
            background: '#FFFFFF',
            borderRadius: 4,
            transition: 'width 800ms ease',
          }}
        />
      </div>
      <div style={{ fontSize: 12, opacity: 0.6 }}>
        핵심 {result.coreCourses.completed}/{result.coreCourses.total} · 관련 {result.relatedCourses.completed}/{result.relatedCourses.total} 이수
      </div>
    </div>
  )
}

type CourseWithDept = Course & { departmentId: string }

export default function CareerFit() {
  const results = useCareerFit()
  const { completedCourseIds, toggleCourseComplete } = useStore()
  const [openJobId, setOpenJobId] = useState<string | null>(null)
  const [selectedCourse, setSelectedCourse] = useState<CourseWithDept | null>(null)
  const [showDeptModal, setShowDeptModal] = useState(false)
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLButtonElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const allCourses = useMemo(() => getAllCourses() as CourseWithDept[], [])

  const hasAnyCompleted = completedCourseIds.length > 0
  const topResults = results.filter((r) => r.percentage > 0).slice(0, 3)

  useEffect(() => {
    if (!tooltipOpen) return
    timerRef.current = setTimeout(() => setTooltipOpen(false), 3000)
    const onClickOutside = (e: MouseEvent) => {
      if (
        tooltipRef.current && !tooltipRef.current.contains(e.target as Node) &&
        infoRef.current && !infoRef.current.contains(e.target as Node)
      ) setTooltipOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      document.removeEventListener('mousedown', onClickOutside)
    }
  }, [tooltipOpen])

  const getCourseById = (id: string) => allCourses.find((c) => c.id === id) ?? null

  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        overflow: 'hidden',
        fontFamily: 'var(--font-family)',
      }}
    >
      {showDeptModal && <DeptSelectModal onClose={() => setShowDeptModal(false)} />}
      <div style={{ flex: 1, overflowY: 'auto', padding: '40px 36px 80px', minWidth: 0 }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
            <h1 style={{ fontSize: 32, fontWeight: 800, color: '#111111', margin: 0, letterSpacing: '-0.02em' }}>
              나의 커리어 적합도
            </h1>
            <button
              ref={infoRef}
              onClick={() => setTooltipOpen((v) => !v)}
              style={{
                background: 'none', border: 'none', padding: 0,
                marginLeft: 8, cursor: 'pointer', display: 'flex', alignItems: 'center',
                color: tooltipOpen ? '#111111' : '#AAAAAA', transition: 'color 150ms',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#111111' }}
              onMouseLeave={(e) => { if (!tooltipOpen) (e.currentTarget as HTMLButtonElement).style.color = '#AAAAAA' }}
            >
              <Info size={18} />
            </button>

            <AnimatePresence>
              {tooltipOpen && (
                <motion.div
                  ref={tooltipRef}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    position: 'absolute', top: 'calc(100% + 10px)', left: 0, zIndex: 30,
                    background: '#111111', color: '#FFFFFF', borderRadius: 12,
                    padding: '16px 20px', maxWidth: 380,
                    boxShadow: '0 4px 16px rgba(0,0,0,0.15)', fontSize: 13, lineHeight: 1.6,
                  }}
                >
                  <div style={{ position: 'absolute', top: -6, left: 20, width: 12, height: 6, overflow: 'hidden' }}>
                    <div style={{ width: 12, height: 12, background: '#111111', transform: 'rotate(45deg)', transformOrigin: 'bottom left', marginTop: 4 }} />
                  </div>
                  <button
                    onClick={() => setTooltipOpen(false)}
                    style={{ position: 'absolute', top: 10, right: 10, background: 'none', border: 'none', color: '#AAAAAA', cursor: 'pointer', padding: 2, display: 'flex', alignItems: 'center' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#FFFFFF' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#AAAAAA' }}
                  >
                    <X size={14} />
                  </button>
                  적합도는 국민대학교 조형대학 2025 교육과정의 과목-직군 매핑을 기반으로 산출됩니다. 실제 취업 적합도와는 다를 수 있으며, 참고 자료로 활용해주세요.
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {hasAnyCompleted ? (
            <p style={{ fontSize: 14, color: '#888888', marginTop: 8 }}>
              이수한 과목을 기반으로 어떤 디자이너에 가장 가까운지 분석해드려요.
            </p>
          ) : (
            <div style={{ marginTop: 12 }}>
              <p style={{ fontSize: 14, color: '#AAAAAA', margin: 0 }}>
                커리큘럼에서 이수한 과목을 체크하면 적합도가 계산됩니다.
              </p>
              <button
                onClick={() => setShowDeptModal(true)}
                style={{
                  display: 'inline-block', marginTop: 12, padding: '8px 16px',
                  background: '#111111', color: '#FFFFFF', borderRadius: 8,
                  fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer',
                }}
              >
                커리큘럼 바로가기 →
              </button>
            </div>
          )}
        </div>

        {/* Top 3 highlight */}
        {topResults.length > 0 && (
          <div style={{ display: 'flex', gap: 12, marginBottom: 40 }}>
            {topResults.map((r, i) => (
              <TopCard key={r.jobId} result={r} rank={i} />
            ))}
          </div>
        )}

        {/* Full ranking list */}
        <div style={{ fontSize: 18, fontWeight: 600, color: '#111111', marginBottom: 16 }}>
          전체 직군 분석
        </div>

        {!hasAnyCompleted ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#AAAAAA' }}>
            <Target size={40} style={{ margin: '0 auto 16px', display: 'block', opacity: 0.3 }} />
            <p style={{ fontSize: 15, margin: '0 0 8px' }}>아직 이수한 과목이 없어서 분석할 수 없어요.</p>
            <p style={{ fontSize: 14, margin: '0 0 20px' }}>커리큘럼에서 이수한 과목을 체크해주세요.</p>
            <button
              onClick={() => setShowDeptModal(true)}
              style={{
                display: 'inline-block', padding: '8px 20px',
                background: '#111111', color: '#FFFFFF', borderRadius: 8,
                fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer',
              }}
            >
              커리큘럼 바로가기 →
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {results.map((result, idx) => {
              const isOpen = openJobId === result.jobId

              // completed courses for core/related
              const coreCompletedItems = allCourses.filter((c) =>
                completedCourseIds.includes(c.id) &&
                jobCourseMappings.some((m) => m.jobId === result.jobId && m.courseId === c.id && m.relevance === 'core')
              )

              const relatedCompletedItems = allCourses.filter((c) =>
                completedCourseIds.includes(c.id) &&
                jobCourseMappings.some((m) => m.jobId === result.jobId && m.courseId === c.id && m.relevance === 'related')
              )

              return (
                <div
                  key={result.jobId}
                  style={{
                    background: '#FFFFFF',
                    border: `1px solid ${isOpen ? '#111111' : '#E5E5E5'}`,
                    borderRadius: 10,
                    overflow: 'hidden',
                    transition: 'border-color 150ms',
                  }}
                >
                  {/* Row */}
                  <button
                    onClick={() => setOpenJobId(isOpen ? null : result.jobId)}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center',
                      padding: '16px 20px', background: 'none', border: 'none',
                      cursor: 'pointer', textAlign: 'left', gap: 12,
                      fontFamily: 'var(--font-family)',
                    }}
                  >
                    {/* Rank */}
                    <span style={{ fontSize: 14, color: '#AAAAAA', width: 28, flexShrink: 0 }}>
                      {idx + 1}
                    </span>

                    {/* Name + sub */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 15, fontWeight: 600, color: '#111111' }}>
                        {result.jobName}
                      </div>
                      <div style={{ fontSize: 12, color: '#AAAAAA', marginTop: 2 }}>
                        핵심 {result.coreCourses.completed}/{result.coreCourses.total} · 관련 {result.relatedCourses.completed}/{result.relatedCourses.total} 이수
                      </div>
                    </div>

                    {/* Percent + bar */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
                      <span style={{ fontSize: 20, fontWeight: 700, color: '#111111' }}>
                        {result.percentage}%
                      </span>
                      <div style={{ width: 100, height: 4, borderRadius: 2, background: '#E5E5E5', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${result.percentage}%`, background: '#111111', borderRadius: 2 }} />
                      </div>
                    </div>

                    {isOpen
                      ? <ChevronUp size={16} style={{ color: '#AAAAAA', flexShrink: 0 }} />
                      : <ChevronDown size={16} style={{ color: '#AAAAAA', flexShrink: 0 }} />
                    }
                  </button>

                  {/* Accordion detail */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ padding: '0 20px 20px', borderTop: '1px solid #E5E5E5' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 16 }}>

                            {/* Core courses */}
                            <div>
                              <div style={{ fontSize: 13, fontWeight: 600, color: '#111111', marginBottom: 10 }}>
                                핵심 수업
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                {coreCompletedItems.map((c) => (
                                  <CourseRow
                                    key={c.id}
                                    course={c}
                                    completed
                                    onClick={() => setSelectedCourse(c)}
                                  />
                                ))}
                                {result.coreCourses.remaining.map((r) => {
                                  const course = getCourseById(r.id)
                                  return course ? (
                                    <CourseRow
                                      key={r.id}
                                      course={course}
                                      completed={false}
                                      onClick={() => setSelectedCourse(course)}
                                    />
                                  ) : null
                                })}
                              </div>
                            </div>

                            {/* Related courses */}
                            <div>
                              <div style={{ fontSize: 13, fontWeight: 600, color: '#111111', marginBottom: 10 }}>
                                관련 수업
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                {relatedCompletedItems.map((c) => (
                                  <CourseRow
                                    key={c.id}
                                    course={c}
                                    completed
                                    onClick={() => setSelectedCourse(c)}
                                  />
                                ))}
                                {result.relatedCourses.remaining.map((r) => {
                                  const course = getCourseById(r.id)
                                  return course ? (
                                    <CourseRow
                                      key={r.id}
                                      course={course}
                                      completed={false}
                                      onClick={() => setSelectedCourse(course)}
                                    />
                                  ) : null
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Detail panel */}
      <CourseDetailPanel
        course={selectedCourse}
        completed={selectedCourse ? completedCourseIds.includes(selectedCourse.id) : false}
        onClose={() => setSelectedCourse(null)}
        onToggle={() => selectedCourse && toggleCourseComplete(selectedCourse.id)}
      />
    </div>
  )
}

function CourseRow({
  course,
  completed,
  onClick,
}: {
  course: Course & { departmentId: string }
  completed: boolean
  onClick: () => void
}) {
  const deptMeta = DEPT_META[course.departmentId]
  const deptColor = deptMeta?.color ?? '#888888'

  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: 'none', border: 'none', cursor: 'pointer',
        padding: '4px 0', textAlign: 'left', fontFamily: 'var(--font-family)',
      }}
    >
      {completed
        ? <Check size={14} style={{ color: '#111111', flexShrink: 0 }} />
        : <Circle size={14} style={{ color: '#DDDDDD', flexShrink: 0 }} />
      }
      <span style={{ fontSize: 13, color: completed ? '#111111' : '#AAAAAA', flex: 1, minWidth: 0 }}>
        {course.name}
      </span>
      {deptMeta && (
        <span style={{
          padding: '1px 6px', borderRadius: 8, fontSize: 10, fontWeight: 600, flexShrink: 0,
          background: hexToRgba(deptColor, 0.1), color: deptColor,
        }}>
          {deptMeta.name}
        </span>
      )}
    </button>
  )
}
