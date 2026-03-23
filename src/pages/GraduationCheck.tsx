import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle, AlertTriangle, X, ChevronRight, ChevronUp, Check, ChevronDown,
} from 'lucide-react'
import { useStore } from '../store/useStore'
import { useDepartment } from '../hooks/useDepartment'
import { useGraduationCheck, type GradRequirement } from '../hooks/useGraduationCheck'
import type { Course } from '../types'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import ProgressBar from '../components/ui/ProgressBar'
import CourseDetailPanel from '../components/course/CourseDetailPanel'
import NoDeptSelected from '../components/ui/NoDeptSelected'
import { departments } from '../data'
import { minorRequirements, doubleMajorRequirements, type TransferRequirement } from '../data/transferRequirements'


export default function GraduationCheck() {
  const { myDepartmentId, completedCourseIds, toggleCourseComplete } = useStore()
  const department = useDepartment(myDepartmentId)
  const completedSet = new Set(completedCourseIds)

  const grad = useGraduationCheck(department, completedSet)

  const [expandedReq, setExpandedReq] = useState<string | null>(null)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

  const toggleReq = (id: string) =>
    setExpandedReq(prev => (prev === id ? null : id))

  if (!department) {
    return (
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <h1 style={{ font: 'var(--font-heading-xl)', fontFamily: 'var(--font-family)', color: 'var(--color-text-primary)', marginBottom: 24 }}>
          졸업 요건
        </h1>
        <NoDeptSelected
          title="학과를 먼저 선택해주세요"
          desc="학과를 선택하면 졸업 요건 충족 여부를 확인할 수 있습니다."
        />
      </div>
    )
  }

  return (
    <div className="page-enter" style={{ maxWidth: 800, margin: '0 auto' }}>
      <h1
        style={{
          font: 'var(--font-heading-xl)',
          fontFamily: 'var(--font-family)',
          color: 'var(--color-text-primary)',
          marginBottom: 24,
        }}
      >
        졸업 요건
      </h1>

      {/* ── B-1. 종합 판정 배너 ── */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          borderRadius: 14,
          padding: '20px 24px',
          marginBottom: 20,
          background: '#111111',
          border: 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: grad.allMet ? 0 : 10 }}>
          {grad.allMet ? (
            <CheckCircle size={28} style={{ color: '#FFFFFF', flexShrink: 0 }} />
          ) : (
            <AlertTriangle size={28} style={{ color: '#FFFFFF', flexShrink: 0 }} />
          )}
          <h2
            style={{
              font: 'var(--font-heading-md)',
              fontFamily: 'var(--font-family)',
              color: '#FFFFFF',
            }}
          >
            {grad.allMet
              ? '졸업 요건을 모두 충족했습니다 🎉'
              : `미충족 항목 ${grad.unmetCount}개가 있습니다`}
          </h2>
        </div>
        {!grad.allMet && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginLeft: 40 }}>
            {grad.requirements.filter(r => !r.met).map(r => (
              <span
                key={r.id}
                style={{
                  fontFamily: 'var(--font-family)',
                  fontSize: 12,
                  fontWeight: 500,
                  padding: '3px 9px',
                  borderRadius: 6,
                  background: 'rgba(255,255,255,0.15)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255,255,255,0.3)',
                }}
              >
                {r.label}
              </span>
            ))}
          </div>
        )}
      </motion.div>

      {/* ── B-2. 요건 체크리스트 ── */}
      <Card style={{ padding: 0, overflow: 'hidden', marginBottom: 20 }}>
        {grad.requirements.map((req, i) => (
          <ReqItem
            key={req.id}
            req={req}
            isLast={i === grad.requirements.length - 1}
            expanded={expandedReq === req.id}
            onToggle={() => toggleReq(req.id)}
            completedSet={completedSet}
            onSelectCourse={setSelectedCourse}
            onToggleCourse={toggleCourseComplete}
          />
        ))}
      </Card>

      {/* ── B-3. 부전공/다전공 요건 ── */}
      <h2
        style={{
          font: 'var(--font-heading-lg)',
          fontFamily: 'var(--font-family)',
          color: 'var(--color-text-primary)',
          marginBottom: 12,
        }}
      >
        복수전공 관련 요건
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>
        <MinorCard
          type="minor"
          currentDeptId={department.id}
          completedCredits={grad.completedCredits}
          requirements={minorRequirements}
        />
        <MinorCard
          type="double"
          currentDeptId={department.id}
          completedCredits={grad.completedCredits}
          minRequiredCredits={grad.minRequiredCredits}
          requirements={doubleMajorRequirements}
        />
      </div>

      {/* ── 교과목 상세 패널 ── */}
      <CourseDetailPanel
        course={selectedCourse}
        completed={selectedCourse ? completedSet.has(selectedCourse.id) : false}
        onClose={() => setSelectedCourse(null)}
        onToggle={() => { if (selectedCourse) toggleCourseComplete(selectedCourse.id) }}
      />

      <style>{`
        @media (max-width: 600px) {
          .minor-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}

/* ── 부전공/다전공 카드 ── */
interface MinorCardProps {
  type: 'minor' | 'double'
  currentDeptId: string
  completedCredits: number
  minRequiredCredits?: number
  requirements: TransferRequirement[]
}

function MinorCard({ type, currentDeptId, completedCredits, minRequiredCredits = 39, requirements }: MinorCardProps) {
  const [selectedDeptId, setSelectedDeptId] = useState<string | null>(null)
  const requirement = selectedDeptId
    ? requirements.find(r => r.departmentId === selectedDeptId) ?? null
    : null

  const availableDepts = departments.filter(d => d.id !== currentDeptId)

  const isMinor = type === 'minor'
  const title = isMinor ? '부전공' : '다전공'
  const baseReq = isMinor ? '전공과목 18학점 이상 이수' : '필수 지정 과목 포함 최저이수학점 이상'
  const creditGoal = isMinor ? 18 : minRequiredCredits
  const progressPct = Math.min(100, (completedCredits / creditGoal) * 100)
  const met = completedCredits >= creditGoal

  return (
    <Card style={{ padding: 20 }}>
      {/* 헤더 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        <h3 style={{ font: 'var(--font-heading-md)', fontFamily: 'var(--font-family)', color: 'var(--color-text-primary)' }}>
          {title}
        </h3>
        <Badge variant={met ? 'green' : 'gray'}>
          {met ? '기본 요건 충족' : `${creditGoal - completedCredits}학점 부족`}
        </Badge>
      </div>
      <p style={{ font: 'var(--font-body-sm)', fontFamily: 'var(--font-family)', color: 'var(--color-text-secondary)', marginBottom: 12 }}>
        요건: {baseReq}
      </p>
      <ProgressBar
        value={progressPct}
        color={met ? 'var(--color-accent-green)' : 'var(--color-accent-blue)'}
        height={6}
      />
      <p style={{ fontFamily: 'var(--font-family)', fontSize: 12, color: 'var(--color-text-muted)', marginTop: 6, marginBottom: 20 }}>
        현재 {completedCredits}학점 이수 / 목표 {creditGoal}학점
      </p>

      {/* 학과 선택 드롭다운 */}
      <DeptDropdown
        departments={availableDepts}
        selectedId={selectedDeptId}
        onChange={setSelectedDeptId}
        placeholder={`${title} 희망 학과를 선택하세요`}
      />

      {/* 조건 카드 */}
      <AnimatePresence mode="wait">
        {requirement && (
          <motion.div
            key={requirement.departmentId}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{ marginTop: 16 }}
          >
            <TransferRequirementCard req={requirement} />
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

/* ── 커스텀 드롭다운 ── */
interface DeptDropdownProps {
  departments: { id: string; name: string }[]
  selectedId: string | null
  onChange: (id: string) => void
  placeholder: string
}

function DeptDropdown({ departments: depts, selectedId, onChange, placeholder }: DeptDropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const selected = depts.find(d => d.id === selectedId)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width: '100%',
          height: 44,
          background: '#FFFFFF',
          border: `1px solid ${open ? '#111111' : '#E5E8EB'}`,
          borderRadius: 10,
          padding: '0 16px',
          fontFamily: 'var(--font-family)',
          fontSize: 14,
          color: selected ? '#191F28' : '#8B95A1',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: open ? '0 0 0 3px rgba(17,17,17,0.08)' : 'none',
          transition: 'border-color 150ms, box-shadow 150ms',
          textAlign: 'left',
        }}
      >
        <span>{selected ? selected.name : placeholder}</span>
        <ChevronDown
          size={16}
          style={{
            color: '#8B95A1',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 200ms',
            flexShrink: 0,
          }}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'absolute',
              top: 'calc(100% + 6px)',
              left: 0,
              right: 0,
              background: '#FFFFFF',
              border: '1px solid #E5E8EB',
              borderRadius: 10,
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
              maxHeight: 240,
              overflowY: 'auto',
              zIndex: 100,
            }}
          >
            {depts.map(dept => {
              const isSelected = dept.id === selectedId
              return (
                <button
                  key={dept.id}
                  onClick={() => { onChange(dept.id); setOpen(false) }}
                  style={{
                    width: '100%',
                    height: 40,
                    padding: '0 16px',
                    background: isSelected ? '#F5F5F5' : 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-family)',
                    fontSize: 14,
                    color: isSelected ? '#111111' : '#191F28',
                    textAlign: 'left',
                    transition: 'background 100ms',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) e.currentTarget.style.background = '#F1F3F5'
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) e.currentTarget.style.background = 'transparent'
                  }}
                >
                  {dept.name}
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── 전입 조건 카드 ── */
function TransferRequirementCard({ req }: { req: TransferRequirement }) {
  const methodBadges = parseSelectionMethod(req.selectionMethod)

  return (
    <div
      style={{
        borderRadius: 12,
        border: '1px solid #E5E8EB',
        background: '#F7F8FA',
        padding: 20,
      }}
    >
      {/* 학과명 */}
      <p style={{ fontFamily: 'var(--font-family)', fontSize: 16, fontWeight: 600, color: '#191F28', marginBottom: 14 }}>
        {req.departmentName}
      </p>

      {/* 구분선 */}
      <div style={{ height: 1, background: '#E5E8EB', marginBottom: 14 }} />

      {/* 지원 조건 */}
      <p style={{ fontFamily: 'var(--font-family)', fontSize: 12, color: '#8B95A1', marginBottom: 10 }}>지원 조건</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 18 }}>
        {req.requiredCourses.map((item, i) => {
          const isGpa = item.description.includes('평점')
          return (
            <div key={i}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                {/* 원형 아이콘 */}
                <div
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    border: '2px solid #8B95A1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'var(--font-family)', fontSize: 14, color: '#191F28' }}>
                      {item.description}
                    </span>
                    {isGpa && (
                      <span
                        style={{
                          fontFamily: 'var(--font-family)',
                          fontSize: 11,
                          fontWeight: 500,
                          background: '#FFF9DB',
                          color: '#F59F00',
                          borderRadius: 4,
                          padding: '1px 6px',
                        }}
                      >
                        B+ 이상
                      </span>
                    )}
                  </div>

                  {/* 과목 리스트 */}
                  {item.courses && item.courses.length > 0 && (
                    <div style={{ paddingLeft: 0, marginTop: 8 }}>
                      {item.selectCount && (
                        <span
                          style={{
                            display: 'inline-block',
                            fontFamily: 'var(--font-family)',
                            fontSize: 11,
                            fontWeight: 500,
                            background: '#F5F5F5',
                            color: '#111111',
                            borderRadius: 4,
                            padding: '1px 7px',
                            marginBottom: 6,
                          }}
                        >
                          {item.selectCount}개 선택
                        </span>
                      )}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingLeft: 4 }}>
                        {item.courses.map((course, j) => (
                          <span
                            key={j}
                            style={{
                              fontFamily: 'var(--font-family)',
                              fontSize: 13,
                              color: '#4E5968',
                            }}
                          >
                            · {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* 전형 방법 */}
      <p style={{ fontFamily: 'var(--font-family)', fontSize: 12, color: '#8B95A1', marginBottom: 8 }}>전형 방법</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
        {methodBadges.map((badge, i) => (
          <span
            key={i}
            style={{
              fontFamily: 'var(--font-family)',
              fontSize: 12,
              fontWeight: 500,
              background: badge.bg,
              color: badge.color,
              borderRadius: 6,
              padding: '3px 10px',
            }}
          >
            {badge.label}
          </span>
        ))}
      </div>

      {/* 안내 */}
      <p style={{ fontFamily: 'var(--font-family)', fontSize: 12, color: '#8B95A1' }}>
        ※ 세부 지원 일정 및 절차는 학교 공지사항을 확인하세요.
      </p>
    </div>
  )
}

function parseSelectionMethod(method: string): { label: string; bg: string; color: string }[] {
  const badges: { label: string; bg: string; color: string }[] = []
  if (method.includes('서류심사')) badges.push({ label: '서류심사', bg: '#F5F5F5', color: '#111111' })
  if (method.includes('면접')) badges.push({ label: '면접', bg: '#E6FCF5', color: '#20C997' })
  if (method.includes('포트폴리오')) badges.push({ label: '포트폴리오', bg: '#FFF9DB', color: '#F59F00' })
  if (method.includes('실기')) badges.push({ label: '실기', bg: '#FFF0F0', color: '#F03E3E' })
  return badges
}

/* ── 요건 아이템 컴포넌트 ── */
interface ReqItemProps {
  req: GradRequirement
  isLast: boolean
  expanded: boolean
  onToggle: () => void
  completedSet: Set<string>
  onSelectCourse: (c: Course) => void
  onToggleCourse: (id: string) => void
}
function ReqItem({ req, isLast, expanded, onToggle, completedSet, onSelectCourse, onToggleCourse }: ReqItemProps) {
  return (
    <div>
      {/* 헤더 행 */}
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          padding: '16px 20px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          borderBottom: (!isLast || expanded) ? '1px solid var(--color-border)' : 'none',
          textAlign: 'left',
          transition: 'background 150ms',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = '#F8FAFC')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
      >
        {/* 상태 아이콘 */}
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {req.met ? (
            <Check size={18} style={{ color: 'var(--color-accent-green)' }} strokeWidth={2.5} />
          ) : (
            <X size={18} style={{ color: '#FF0000' }} strokeWidth={2.5} />
          )}
        </div>

        {/* 요건 설명 */}
        <div style={{ flex: 1 }}>
          <p
            style={{
              fontFamily: 'var(--font-family)',
              fontSize: 14,
              fontWeight: 500,
              color: '#111111',
              marginBottom: 2,
            }}
          >
            {req.label}
          </p>
          <p
            style={{
              fontFamily: 'var(--font-family)',
              fontSize: 12,
              color: req.met ? 'var(--color-accent-green)' : 'var(--color-text-muted)',
            }}
          >
            {req.current} / {req.target} {req.unit}
            {req.detail && ` · ${req.detail}`}
          </p>
        </div>

        {/* 화살표 */}
        {expanded
          ? <ChevronUp size={16} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
          : <ChevronRight size={16} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
        }
      </button>

      {/* 상세 펼침 */}
      <div
        style={{
          maxHeight: expanded ? '9999px' : 0,
          overflow: 'hidden',
          transition: 'max-height 250ms ease',
        }}
      >
        <div
          style={{
            padding: '14px 20px 16px 66px',
            borderBottom: !isLast ? '1px solid var(--color-border)' : 'none',
            background: '#FAFBFC',
          }}
        >
          {req.id === 'min-credits' ? (
            <div>
              <ProgressBar
                value={(req.current / req.target) * 100}
                color={req.met ? 'var(--color-accent-green)' : 'var(--color-accent-blue)'}
                height={8}
                label={`${req.current} / ${req.target}학점`}
                showValue
              />
            </div>
          ) : req.courses && req.courses.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {req.courses.map(c => {
                const done = completedSet.has(c.id)
                return (
                  <div
                    key={c.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      height: 36,
                      borderRadius: 7,
                      padding: '0 4px',
                      transition: 'background 150ms',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#F1F5F9')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <span
                      role="checkbox"
                      aria-checked={done}
                      tabIndex={0}
                      onClick={() => onToggleCourse(c.id)}
                      onKeyDown={(e) => {
                        if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); onToggleCourse(c.id) }
                      }}
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: 5,
                        border: `1.5px solid ${done ? '#111111' : 'var(--color-border)'}`,
                        background: done ? '#111111' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        flexShrink: 0,
                        transition: 'all 150ms',
                      }}
                    >
                      {done && (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    <button
                      onClick={() => onSelectCourse(c)}
                      style={{
                        flex: 1,
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontFamily: 'var(--font-family)',
                        fontSize: 13,
                        color: done ? 'var(--color-text-muted)' : 'var(--color-text-primary)',
                        textAlign: 'left',
                        padding: 0,
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                      onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
                    >
                      {c.name}
                    </button>
                    <span style={{ fontFamily: 'var(--font-family)', fontSize: 11, color: 'var(--color-text-muted)' }}>
                      {c.credits}학점
                    </span>
                    {done && (
                      <Badge variant="green" style={{ fontSize: 11, padding: '1px 6px' }}>이수</Badge>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <p style={{ fontFamily: 'var(--font-family)', fontSize: 13, color: 'var(--color-text-muted)' }}>
              해당 과목이 없습니다.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
