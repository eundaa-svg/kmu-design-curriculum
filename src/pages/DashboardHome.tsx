import { useState, useMemo, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Info, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { designJobs, jobCourseMappings, getJobsForCourse } from '../data/jobCourseMap'
import { getAllCourses } from '../data'
import { useStore } from '../store/useStore'
import { useCareerFit } from '../hooks/useCareerFit'
import type { Course } from '../types'
import CourseDetailPanel from '../components/course/CourseDetailPanel'

const DEPT_META: Record<string, { color: string; name: string }> = {
  'industrial-design':   { color: '#FF0017', name: '공업디자인학과' },
  'visual-design':       { color: '#FF006A', name: '시각디자인학과' },
  'metal-craft':         { color: '#FFC900', name: '금속공예학과' },
  'ceramic-craft':       { color: '#FF7700', name: '도자공예학과' },
  'fashion-design':      { color: '#8E008E', name: '의상디자인학과' },
  'spatial-design':      { color: '#008AC2', name: '공간디자인학과' },
  'moving-image-design': { color: '#00BCB5', name: '영상디자인학과' },
  'automotive-design':   { color: '#2B50B6', name: '자동차운송디자인학과' },
  'ai-design':           { color: '#00CC00', name: 'AI디자인학과' },
}

function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

type CourseWithDept = Course & { departmentId: string; departmentName: string }

export default function DashboardHome() {
  const [selectedJobIds, setSelectedJobIds] = useState<string[]>([])
  const [selectedCourse, setSelectedCourse] = useState<CourseWithDept | null>(null)
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLButtonElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { myDepartmentId, completedCourseIds, toggleCourseComplete } = useStore()

  useEffect(() => {
    if (!tooltipOpen) return
    timerRef.current = setTimeout(() => setTooltipOpen(false), 3000)
    const onClickOutside = (e: MouseEvent) => {
      if (
        tooltipRef.current && !tooltipRef.current.contains(e.target as Node) &&
        infoRef.current && !infoRef.current.contains(e.target as Node)
      ) {
        setTooltipOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      document.removeEventListener('mousedown', onClickOutside)
    }
  }, [tooltipOpen])

  const allCourses = useMemo(() => getAllCourses() as CourseWithDept[], [])
  const careerFitResults = useCareerFit()
  const topCareer = careerFitResults.find((r) => r.percentage > 0)

  const toggleJob = (jobId: string) => {
    setSelectedJobIds((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    )
  }

  const recommendedCourses = useMemo(() => {
    if (selectedJobIds.length === 0) return []

    const courseRelevanceMap = new Map<string, 'core' | 'related'>()
    for (const mapping of jobCourseMappings) {
      if (!selectedJobIds.includes(mapping.jobId)) continue
      const existing = courseRelevanceMap.get(mapping.courseId)
      if (!existing || (existing === 'related' && mapping.relevance === 'core')) {
        courseRelevanceMap.set(mapping.courseId, mapping.relevance)
      }
    }

    const results: Array<CourseWithDept & { relevance: 'core' | 'related' }> = []
    for (const [courseId, relevance] of courseRelevanceMap) {
      const course = allCourses.find((c) => c.id === courseId)
      if (course) results.push({ ...course, relevance })
    }

    results.sort((a, b) => {
      if (a.relevance !== b.relevance) return a.relevance === 'core' ? -1 : 1
      if (a.year !== b.year) return a.year - b.year
      return b.credits - a.credits
    })

    return results
  }, [selectedJobIds, allCourses])

  return (
    <div
      style={{
        display: 'flex',
        gap: 0,
        height: '100%',
        overflow: 'hidden',
        fontFamily: 'var(--font-family)',
      }}
    >
      {/* Main scroll area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '40px 36px 80px', minWidth: 0 }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
            <h1 style={{ fontSize: 32, fontWeight: 800, color: '#111111', margin: 0, letterSpacing: '-0.02em' }}>
              어떤 디자이너가 되고 싶으세요?
            </h1>
            <button
              ref={infoRef}
              onClick={() => setTooltipOpen((v) => !v)}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                marginLeft: 8,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                color: tooltipOpen ? '#111111' : '#AAAAAA',
                transition: 'color 150ms',
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
                    position: 'absolute',
                    top: 'calc(100% + 10px)',
                    left: 0,
                    zIndex: 30,
                    background: '#111111',
                    color: '#FFFFFF',
                    borderRadius: 12,
                    padding: '16px 20px',
                    maxWidth: 360,
                    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                    fontSize: 13,
                    lineHeight: 1.6,
                  }}
                >
                  {/* 삼각형 */}
                  <div style={{
                    position: 'absolute',
                    top: -6,
                    left: 20,
                    width: 12,
                    height: 6,
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      width: 12,
                      height: 12,
                      background: '#111111',
                      transform: 'rotate(45deg)',
                      transformOrigin: 'bottom left',
                      marginTop: 4,
                    }} />
                  </div>

                  {/* X 버튼 */}
                  <button
                    onClick={() => setTooltipOpen(false)}
                    style={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      background: 'none',
                      border: 'none',
                      color: '#AAAAAA',
                      cursor: 'pointer',
                      padding: 2,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#FFFFFF' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#AAAAAA' }}
                  >
                    <X size={14} />
                  </button>

                  이 추천은 국민대학교 조형대학 2025 교육과정을 바탕으로 구성되었으며, 실제 진로와 다를 수 있어요. 수강 신청 전에 학과 사무실이나 지도교수님과 상담하는 것을 권장합니다.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <p style={{ fontSize: 15, color: '#888888', marginTop: 8 }}>
            관심있는 직군을 선택하면 추천 수업을 알려드려요.
          </p>
        </div>

        {/* Career fit summary banner */}
        {topCareer && (
          <div style={{
            background: 'linear-gradient(135deg, #111111 0%, #2a2a3e 100%)',
            borderRadius: 16, padding: '18px 24px',
            marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
          }}>
            <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)' }}>
              현재 가장 가까운 커리어: <strong style={{ color: '#FFFFFF' }}>{topCareer.jobName}</strong>
              <span style={{ marginLeft: 8, color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>{topCareer.percentage}%</span>
            </span>
            <Link
              to="/career-fit"
              style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', fontWeight: 600, textDecoration: 'none' }}
            >
              상세 보기 →
            </Link>
          </div>
        )}

        {/* Job filter */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32, alignItems: 'center' }}>
          {designJobs.map((job) => {
            const isSelected = selectedJobIds.includes(job.id)
            return (
              <button
                key={job.id}
                onClick={() => toggleJob(job.id)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 20,
                  border: `1px solid ${isSelected ? '#111111' : '#E5E5E5'}`,
                  background: isSelected ? '#111111' : '#FFFFFF',
                  color: isSelected ? '#FFFFFF' : '#666666',
                  fontSize: 13,
                  fontWeight: isSelected ? 600 : 500,
                  cursor: 'pointer',
                  transition: 'all 150ms ease',
                  fontFamily: 'var(--font-family)',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    const btn = e.currentTarget as HTMLButtonElement
                    btn.style.borderColor = '#111111'
                    btn.style.color = '#111111'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    const btn = e.currentTarget as HTMLButtonElement
                    btn.style.borderColor = '#E5E5E5'
                    btn.style.color = '#666666'
                  }
                }}
              >
                {job.name}
              </button>
            )
          })}
          {selectedJobIds.length > 0 && (
            <button
              onClick={() => setSelectedJobIds([])}
              style={{
                padding: '8px 14px',
                borderRadius: 20,
                border: '1px solid transparent',
                background: 'transparent',
                color: '#AAAAAA',
                fontSize: 13,
                cursor: 'pointer',
                fontFamily: 'var(--font-family)',
                textDecoration: 'underline',
              }}
            >
              전체 해제
            </button>
          )}
        </div>

        {/* Results */}
        {selectedJobIds.length === 0 ? (
          <div
            style={{
              marginTop: 80,
              textAlign: 'center',
              color: '#AAAAAA',
              fontSize: 15,
            }}
          >
            직군을 선택하면 추천 수업이 표시됩니다
          </div>
        ) : (
          <>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#111111', marginBottom: 16 }}>
              추천 수업 {recommendedCourses.length}개
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 16,
              }}
            >
              <AnimatePresence mode="popLayout">
                {recommendedCourses.map((course) => {
                  const deptMeta = DEPT_META[course.departmentId]
                  const deptColor = deptMeta?.color ?? '#888888'
                  const deptName = deptMeta?.name ?? course.departmentName
                  const isMyDept = course.departmentId === myDepartmentId
                  const isCompleted = completedCourseIds.includes(course.id)
                  const jobLinks = getJobsForCourse(course.id).filter((j) =>
                    selectedJobIds.includes(j.job.id)
                  )
                  const isSelected = selectedCourse?.id === course.id

                  return (
                    <motion.div
                      key={course.id}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      onClick={() => setSelectedCourse(isSelected ? null : course)}
                      style={{
                        background: '#FFFFFF',
                        border: `1px solid ${isSelected ? '#111111' : '#E5E5E5'}`,
                        borderRadius: 12,
                        padding: 20,
                        cursor: 'pointer',
                        transition: 'border-color 150ms, box-shadow 150ms, transform 150ms',
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          const el = e.currentTarget as HTMLDivElement
                          el.style.borderColor = '#111111'
                          el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'
                          el.style.transform = 'translateY(-1px)'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          const el = e.currentTarget as HTMLDivElement
                          el.style.borderColor = '#E5E5E5'
                          el.style.boxShadow = 'none'
                          el.style.transform = 'translateY(0)'
                        }
                      }}
                    >
                      {/* Course name */}
                      <div style={{ fontSize: 16, fontWeight: 600, color: '#111111', marginBottom: 8 }}>
                        {course.name}
                      </div>

                      {/* Dept badge */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                        <span
                          style={{
                            display: 'inline-block',
                            padding: '2px 8px',
                            borderRadius: 10,
                            fontSize: 11,
                            fontWeight: 600,
                            background: hexToRgba(deptColor, 0.1),
                            color: deptColor,
                          }}
                        >
                          {deptName}
                        </span>
                        {!isMyDept && myDepartmentId && (
                          <span style={{ fontSize: 11, color: '#AAAAAA' }}>타과</span>
                        )}
                      </div>

                      {/* Description */}
                      {course.description && (
                        <div
                          style={{
                            fontSize: 13,
                            color: '#888888',
                            marginBottom: 12,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {course.description}
                        </div>
                      )}

                      {/* Tags */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, alignItems: 'center' }}>
                        {jobLinks.map(({ job, relevance }) => (
                          <span
                            key={job.id}
                            style={{
                              padding: '3px 10px',
                              borderRadius: 12,
                              fontSize: 11,
                              fontWeight: 500,
                              background: relevance === 'core' ? '#111111' : '#F5F5F5',
                              color: relevance === 'core' ? '#FFFFFF' : '#666666',
                            }}
                          >
                            {job.name}
                          </span>
                        ))}
                        <span style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
                          <span style={{ padding: '3px 8px', borderRadius: 10, fontSize: 11, background: '#F5F5F5', color: '#888888' }}>
                            {course.credits}학점
                          </span>
                          <span style={{ padding: '3px 8px', borderRadius: 10, fontSize: 11, background: '#F5F5F5', color: '#888888' }}>
                            {course.year}학년
                          </span>
                          {isCompleted && (
                            <span style={{ padding: '3px 8px', borderRadius: 10, fontSize: 11, background: '#111111', color: '#FFFFFF' }}>
                              이수완료
                            </span>
                          )}
                        </span>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </>
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
