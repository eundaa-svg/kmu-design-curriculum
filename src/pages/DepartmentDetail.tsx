import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { useParams, Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  ChevronDown, ChevronUp,
} from 'lucide-react'
import { useDepartment } from '../hooks/useDepartment'
import { useStore } from '../store/useStore'
import { useProgress } from '../hooks/useProgress'
import type { Course } from '../types'
import CourseDetailPanel from '../components/course/CourseDetailPanel'
import RoadmapView from './dept/RoadmapView'
import CategoryView from './dept/CategoryView'
import ListView from './dept/ListView'
import DepartmentParticleText from '../components/department/DepartmentParticleText'

const DEPT_DISPLAY_NAME: Record<string, string> = {
  'moving-image-design': 'ENTERTAINMENT DESIGN',
  'metal-craft': 'METALWORK & JEWELRY',
}

/* ── 학과 메타 ── */
const DEPT_META: Record<string, { color: string }> = {
  'industrial-design':  { color: '#FF0017' },
  'visual-design':      { color: '#FF006A' },
  'metal-craft':        { color: '#FFC900' },
  'ceramic-craft':      { color: '#FF7700' },
  'fashion-design':     { color: '#8E008E' },
  'spatial-design':     { color: '#008AC2' },
  'moving-image-design':{ color: '#00BCB5' },
  'automotive-design':  { color: '#2B50B6' },
  'ai-design':          { color: '#00CC00' },
}

type ViewMode = 'roadmap' | 'category' | 'list'

const TABS: { id: ViewMode; label: string }[] = [
  { id: 'roadmap',   label: '로드맵' },
  { id: 'category',  label: '영역별' },
  { id: 'list',      label: '전체 목록' },
]

export default function DepartmentDetail() {
  const { deptId } = useParams<{ deptId: string }>()
  const [searchParams, setSearchParams] = useSearchParams()
  const viewParam = (searchParams.get('view') ?? 'roadmap') as ViewMode
  const view: ViewMode = ['roadmap', 'category', 'list'].includes(viewParam) ? viewParam : 'roadmap'

  const department = useDepartment(deptId)
  const { studentProgress, selectDepartment, toggleCourseComplete } = useStore()
  const progress = studentProgress?.departmentId === deptId ? studentProgress : null
  const stats = useProgress(department, progress)

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [goalExpanded, setGoalExpanded] = useState(false)
  const mainRef = useRef<HTMLDivElement>(null)

  /* 학과 선택 */
  useEffect(() => {
    if (deptId) selectDepartment(deptId)
  }, [deptId, selectDepartment])

  /* 뷰 전환 시 스크롤 초기화 */
  const setView = (v: ViewMode) => {
    setSearchParams({ view: v }, { replace: true })
    mainRef.current?.scrollTo({ top: 0 })
  }

  if (!department) {
    return (
      <div style={{ padding: '80px 0', textAlign: 'center', fontFamily: 'var(--font-family)', color: 'var(--color-text-muted)' }}>
        학과를 찾을 수 없습니다.
      </div>
    )
  }

  const meta = DEPT_META[department.id] ?? { color: '#64748B' }
  const completed = new Set(progress?.completedCourseIds ?? [])

  const handleToggle = (id: string, e: MouseEvent) => {
    e.stopPropagation()
    toggleCourseComplete(id)
  }

  const handleSelect = (course: Course) => setSelectedCourse(course)
  const handleClose = () => setSelectedCourse(null)

  const handleNavigateToPrereq = (prereqName: string) => {
    const found = department.courses.find((c) => c.name === prereqName)
    if (found) setSelectedCourse(found)
  }

  return (
    <div ref={mainRef} style={{ maxWidth: 1200, margin: '0 auto' }}>

      {/* ── 뒤로가기 ── */}
      <Link
        to="/department"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 5,
          fontFamily: 'var(--font-family)',
          fontSize: 13,
          color: 'var(--color-text-secondary)',
          textDecoration: 'none',
          marginBottom: 20,
          transition: 'color 150ms',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
      >
        <ArrowLeft size={15} />
        학과 목록
      </Link>

      {/* ══════════════════ 학과 파티클 그래픽 ══════════════════ */}
      <DepartmentParticleText departmentId={department.id} />

      {/* ══════════════════ A. 학과 헤더 ══════════════════ */}
      <div style={{ paddingBottom: 24, textAlign: 'center' }}>
        {/* 학과명 */}
        <h1
          style={{
            fontFamily: 'var(--font-family)',
            fontSize: 26,
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            lineHeight: 1.2,
            marginBottom: 6,
          }}
        >
          {department.name}
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-family)',
            fontSize: 13,
            fontWeight: 500,
            color: '#8B95A1',
            marginBottom: 14,
            letterSpacing: '1.5px',
          }}
        >
          {'DEPT. OF ' + (DEPT_DISPLAY_NAME[department.id] ?? department.nameEng.toUpperCase())}
        </p>

        {/* 교육목표 (접기/펼치기) */}
        <div style={{ marginTop: 0 }}>
          <p
            style={{
              font: 'var(--font-body-sm)',
              fontFamily: 'var(--font-family)',
              color: 'var(--color-text-secondary)',
              lineHeight: '22px',
              display: goalExpanded ? undefined : '-webkit-box',
              WebkitLineClamp: goalExpanded ? undefined : 2,
              WebkitBoxOrient: goalExpanded ? undefined : 'vertical',
              overflow: goalExpanded ? undefined : 'hidden',
              marginBottom: 4,
            }}
          >
            {department.educationGoal}
          </p>
          {department.educationGoal.length > 100 && (
            <button
              onClick={() => setGoalExpanded((v) => !v)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-family)',
                fontSize: 12,
                color: 'var(--color-accent-blue)',
                fontWeight: 500,
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                gap: 3,
              }}
            >
              {goalExpanded ? (<>접기 <ChevronUp size={12} /></>) : (<>더 보기 <ChevronDown size={12} /></>)}
            </button>
          )}
        </div>

        {/* 통계 배지 + 프로그레스 */}
        <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
          <StatBadge label={`전체 ${stats.totalCourses}과목`} variant="gray" />
          <StatBadge label={`필수 ${stats.requiredCourses}과목`} variant="blue" />
          <StatBadge
            label={`캡스톤 ${department.courses.filter((c) => c.isCapstone).length}과목`}
            variant="amber"
          />
        </div>
      </div>

      {/* ══════════════════ B. 뷰 모드 탭 ══════════════════ */}
      <div
        style={{
          display: 'flex',
          borderBottom: '1px solid var(--color-border)',
          marginBottom: 24,
          gap: 0,
        }}
      >
        {TABS.map((tab) => {
          const active = view === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setView(tab.id)}
              style={{
                height: 44,
                padding: '0 20px',
                border: 'none',
                borderBottom: active ? `2px solid ${meta.color}` : '2px solid transparent',
                background: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-family)',
                fontSize: 14,
                fontWeight: active ? 600 : 400,
                color: active ? meta.color : 'var(--color-text-secondary)',
                transition: 'color 150ms, border-color 150ms',
                marginBottom: -1,
              }}
              onMouseEnter={(e) => {
                if (!active) e.currentTarget.style.color = 'var(--color-text-primary)'
              }}
              onMouseLeave={(e) => {
                if (!active) e.currentTarget.style.color = 'var(--color-text-secondary)'
              }}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* ══════════════════ C. 뷰 콘텐츠 ══════════════════ */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={view}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          style={{ paddingBottom: 48 }}
        >
          {view === 'roadmap' && (
            <RoadmapView
              courses={department.courses}
              completed={completed}
              onToggle={handleToggle}
              onSelect={handleSelect}
            />
          )}
          {view === 'category' && (
            <CategoryView
              courses={department.courses}
              completed={completed}
              onToggle={handleToggle}
              onSelect={handleSelect}
            />
          )}
          {view === 'list' && (
            <ListView
              courses={department.courses}
              completed={completed}
              onToggle={handleToggle}
              onSelect={handleSelect}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* ══════════════════ D. 교과목 상세 패널 ══════════════════ */}
      <CourseDetailPanel
        course={selectedCourse}
        completed={selectedCourse ? completed.has(selectedCourse.id) : false}
        onClose={handleClose}
        onToggle={() => {
          if (selectedCourse) toggleCourseComplete(selectedCourse.id)
        }}
        onNavigateToPrereq={handleNavigateToPrereq}
      />
    </div>
  )
}

/* ── 헬퍼 ── */
function StatBadge({ label, variant }: { label: string; variant: 'gray' | 'blue' | 'amber' }) {
  const styles = {
    gray:  { bg: '#F1F5F9', color: 'var(--color-text-secondary)' },
    blue:  { bg: 'var(--color-accent-blue-light)', color: 'var(--color-accent-blue)' },
    amber: { bg: 'var(--color-accent-amber-light)', color: 'var(--color-accent-amber)' },
  }[variant]

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        height: 28,
        padding: '0 10px',
        borderRadius: 6,
        background: styles.bg,
        color: styles.color,
        fontFamily: 'var(--font-family)',
        fontSize: 12,
        fontWeight: 500,
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  )
}
