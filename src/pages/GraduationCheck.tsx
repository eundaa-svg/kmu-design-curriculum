import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  CheckCircle, AlertTriangle, X, ChevronRight, ChevronUp, Check,
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

/* ── 공업디자인 세부전공 ── */
const CONCENTRATIONS_ID = [
  {
    name: '글로벌디자인',
    nameEng: 'Global Design',
    courses2: ['해외인턴십', '글로벌디자인스튜디오'],
    courses34: ['프로덕트디자인III', '프로덕트디자인IV'],
    courses4: ['졸업연구I(캡스톤디자인)', '졸업연구II(캡스톤디자인)', '졸업작품I(캡스톤디자인)', '졸업작품II(캡스톤디자인)'],
  },
  {
    name: '비즈니스디자인',
    nameEng: 'Business Design',
    courses2: ['마케팅과디자인', '디자인스토리텔링'],
    courses34: ['프로덕트디자인III', '프로덕트디자인IV'],
    courses4: ['졸업연구I(캡스톤디자인)', '졸업연구II(캡스톤디자인)', '졸업작품I(캡스톤디자인)', '졸업작품II(캡스톤디자인)'],
  },
  {
    name: '엔지니어링디자인',
    nameEng: 'Engineering Design',
    courses2: ['재료와생산공정', '디지털페브리케이션'],
    courses34: ['프로덕트디자인III', '프로덕트디자인IV'],
    courses4: ['졸업연구I(캡스톤디자인)', '졸업연구II(캡스톤디자인)', '졸업작품I(캡스톤디자인)', '졸업작품II(캡스톤디자인)'],
  },
  {
    name: '인간공학디자인',
    nameEng: 'Ergonomic Design',
    courses2: ['사용자경험디자인', '개념과발상'],
    courses34: ['프로덕트디자인III', '프로덕트디자인IV'],
    courses4: ['졸업연구I(캡스톤디자인)', '졸업연구II(캡스톤디자인)', '졸업작품I(캡스톤디자인)', '졸업작품II(캡스톤디자인)'],
  },
  {
    name: '엔터테인먼트디자인',
    nameEng: 'Entertainment Design',
    courses2: ['인터랙티브캡스톤제품디자인', '제너러티브캡스톤디자인'],
    courses34: ['프로덕트디자인III', '프로덕트디자인IV'],
    courses4: ['졸업연구I(캡스톤디자인)', '졸업연구II(캡스톤디자인)', '졸업작품I(캡스톤디자인)', '졸업작품II(캡스톤디자인)'],
  },
]

export default function GraduationCheck() {
  const { selectedDepartmentId, studentProgress, toggleCourseComplete } = useStore()
  const department = useDepartment(selectedDepartmentId)
  const progress = studentProgress?.departmentId === selectedDepartmentId ? studentProgress : null
  const completedSet = new Set(progress?.completedCourseIds ?? [])

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
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
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
          background: grad.allMet ? 'var(--color-accent-green-light)' : 'var(--color-accent-amber-light)',
          border: `1px solid ${grad.allMet ? 'var(--color-accent-green)' : 'var(--color-accent-amber)'}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: grad.allMet ? 0 : 10 }}>
          {grad.allMet ? (
            <CheckCircle size={28} style={{ color: 'var(--color-accent-green)', flexShrink: 0 }} />
          ) : (
            <AlertTriangle size={28} style={{ color: 'var(--color-accent-amber)', flexShrink: 0 }} />
          )}
          <h2
            style={{
              font: 'var(--font-heading-md)',
              fontFamily: 'var(--font-family)',
              color: grad.allMet ? 'var(--color-accent-green)' : 'var(--color-accent-amber)',
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
                  background: 'rgba(245,158,11,0.15)',
                  color: 'var(--color-accent-amber)',
                  border: '1px solid rgba(245,158,11,0.3)',
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
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
          marginBottom: 28,
        }}
        className="minor-grid"
      >
        {/* 부전공 */}
        <Card>
          <h3 style={{ font: 'var(--font-heading-md)', fontFamily: 'var(--font-family)', color: 'var(--color-text-primary)', marginBottom: 8 }}>
            부전공
          </h3>
          <p style={{ font: 'var(--font-body-sm)', fontFamily: 'var(--font-family)', color: 'var(--color-text-secondary)', marginBottom: 14 }}>
            요건: 전공과목 18학점 이상 이수
          </p>
          <ProgressBar
            value={Math.min(100, (grad.completedCredits / 18) * 100)}
            color={grad.completedCredits >= 18 ? 'var(--color-accent-green)' : 'var(--color-accent-blue)'}
            height={8}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
            <span style={{ fontFamily: 'var(--font-family)', fontSize: 13, color: 'var(--color-text-secondary)' }}>
              현재 {grad.completedCredits}학점 이수
            </span>
            <Badge variant={grad.completedCredits >= 18 ? 'green' : 'gray'}>
              {grad.completedCredits >= 18 ? '충족' : `${18 - grad.completedCredits}학점 부족`}
            </Badge>
          </div>
        </Card>

        {/* 다전공 */}
        <Card>
          <h3 style={{ font: 'var(--font-heading-md)', fontFamily: 'var(--font-family)', color: 'var(--color-text-primary)', marginBottom: 8 }}>
            다전공
          </h3>
          <p style={{ font: 'var(--font-body-sm)', fontFamily: 'var(--font-family)', color: 'var(--color-text-secondary)', marginBottom: 14 }}>
            요건: 필수 지정 과목 포함 최저이수학점 이상
          </p>
          <ProgressBar
            value={(grad.completedCredits / grad.minRequiredCredits) * 100}
            color={grad.completedCredits >= grad.minRequiredCredits ? 'var(--color-accent-green)' : 'var(--color-accent-indigo)'}
            height={8}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
            <span style={{ fontFamily: 'var(--font-family)', fontSize: 13, color: 'var(--color-text-secondary)' }}>
              {grad.completedCredits} / {grad.minRequiredCredits}학점
            </span>
            <Badge variant={grad.completedCredits >= grad.minRequiredCredits ? 'green' : 'gray'}>
              {grad.completedCredits >= grad.minRequiredCredits ? '충족' : '미충족'}
            </Badge>
          </div>
          <p style={{ font: 'var(--font-body-sm)', fontFamily: 'var(--font-family)', color: 'var(--color-text-muted)', marginTop: 10, fontSize: 11 }}>
            ※ S-TEAM Class, 사제동행세미나를 수강하지 않아도 다전공 이수 가능
          </p>
        </Card>
      </div>

      {/* ── B-4. 공업디자인 세부전공 (전용) ── */}
      {department.id === 'industrial-design' && (
        <div style={{ marginBottom: 32 }}>
          <h2
            style={{
              font: 'var(--font-heading-lg)',
              fontFamily: 'var(--font-family)',
              color: 'var(--color-text-primary)',
              marginBottom: 4,
            }}
          >
            세부전공
          </h2>
          <p style={{ font: 'var(--font-body-sm)', fontFamily: 'var(--font-family)', color: 'var(--color-text-secondary)', marginBottom: 16 }}>
            공업디자인학과 전용 — 5개 세부전공 중 택 1
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: 14,
            }}
          >
            {CONCENTRATIONS_ID.map(conc => {
              const allNames = [...conc.courses2, ...conc.courses34, ...conc.courses4]
              const relatedCourses = department.courses.filter(c => allNames.includes(c.name))
              const completedInConc = relatedCourses.filter(c => completedSet.has(c.id)).length
              return (
                <Card key={conc.name} style={{ padding: '16px' }}>
                  <h3 style={{ font: 'var(--font-body-base)', fontFamily: 'var(--font-family)', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 4 }}>
                    {conc.name}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-family)', fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 10 }}>
                    {conc.nameEng}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 12 }}>
                    {relatedCourses.map(c => (
                      <div
                        key={c.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          fontFamily: 'var(--font-family)',
                          fontSize: 12,
                          color: completedSet.has(c.id) ? 'var(--color-accent-green)' : 'var(--color-text-secondary)',
                        }}
                      >
                        <span
                          style={{
                            width: 14,
                            height: 14,
                            borderRadius: 4,
                            border: `1.5px solid ${completedSet.has(c.id) ? 'var(--color-accent-green)' : 'var(--color-border)'}`,
                            background: completedSet.has(c.id) ? 'var(--color-accent-green)' : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          {completedSet.has(c.id) && <Check size={9} color="#fff" strokeWidth={3} />}
                        </span>
                        {c.name}
                      </div>
                    ))}
                  </div>
                  <ProgressBar
                    value={relatedCourses.length ? (completedInConc / relatedCourses.length) * 100 : 0}
                    height={5}
                    color="var(--color-accent-blue)"
                  />
                  <p style={{ fontFamily: 'var(--font-family)', fontSize: 11, color: 'var(--color-text-muted)', marginTop: 8 }}>
                    {completedInConc}/{relatedCourses.length} 이수 · 평점평균 2.5 이상 필요
                  </p>
                </Card>
              )
            })}
          </div>
        </div>
      )}

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
            background: req.met ? 'var(--color-accent-green-light)' : 'var(--color-accent-red-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {req.met ? (
            <Check size={15} style={{ color: 'var(--color-accent-green)' }} strokeWidth={2.5} />
          ) : (
            <X size={15} style={{ color: 'var(--color-accent-red)' }} strokeWidth={2.5} />
          )}
        </div>

        {/* 요건 설명 */}
        <div style={{ flex: 1 }}>
          <p
            style={{
              fontFamily: 'var(--font-family)',
              fontSize: 14,
              fontWeight: 500,
              color: 'var(--color-text-primary)',
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
                        border: `1.5px solid ${done ? 'var(--color-accent-green)' : 'var(--color-border)'}`,
                        background: done ? 'var(--color-accent-green)' : 'transparent',
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
