import { useEffect, useRef, type KeyboardEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import type { Course } from '../../types'
import { TAG_COLORS } from './CourseCard'

interface CourseDetailPanelProps {
  course: Course | null
  completed: boolean
  onClose: () => void
  onToggle: () => void
  onNavigateToPrereq?: (prereqName: string) => void
}

export default function CourseDetailPanel({
  course,
  completed,
  onClose,
  onToggle,
  onNavigateToPrereq,
}: CourseDetailPanelProps) {
  const [descExpanded, setDescExpanded] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  /* Escape 닫기 */
  useEffect(() => {
    const handler = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  /* 설명 접힘 초기화 */
  useEffect(() => {
    setDescExpanded(false)
  }, [course?.id])

  /* 포커스 트래핑 */
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab' || !panelRef.current) return
    const focusable = panelRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault()
        last.focus()
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }

  return (
    <AnimatePresence>
      {course && (
        <>
          {/* 오버레이 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.1)',
              zIndex: 40,
            }}
          />

          {/* 패널 */}
          <motion.div
            ref={panelRef}
            initial={{ x: 420 }}
            animate={{ x: 0 }}
            exit={{ x: 420 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onKeyDown={handleKeyDown}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: 420,
              maxWidth: '100vw',
              background: 'var(--color-bg-card)',
              boxShadow: '-4px 0 16px rgba(0,0,0,0.08)',
              zIndex: 50,
              display: 'flex',
              flexDirection: 'column',
              borderLeft: '1px solid var(--color-border)',
            }}
          >
            {/* ── 상단 헤더 (sticky) ── */}
            <div
              style={{
                flexShrink: 0,
                padding: '20px 24px 16px',
                borderBottom: '1px solid var(--color-border)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 6 }}>
                <h2
                  style={{
                    font: 'var(--font-heading-md)',
                    fontFamily: 'var(--font-family)',
                    color: 'var(--color-text-primary)',
                    lineHeight: '26px',
                  }}
                >
                  {course.name}
                </h2>
                <button
                  onClick={onClose}
                  style={{
                    flexShrink: 0,
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-text-muted)',
                    transition: 'background 150ms',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#F1F5F9')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <X size={18} />
                </button>
              </div>
              <p
                style={{
                  font: 'var(--font-body-sm)',
                  fontFamily: 'var(--font-family)',
                  color: 'var(--color-text-muted)',
                }}
              >
                {course.nameEng}
              </p>
            </div>

            {/* ── 본문 (스크롤) ── */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
              {/* 기본 정보 그리드 */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px 16px',
                  marginBottom: 20,
                  background: 'var(--color-bg-primary)',
                  borderRadius: 10,
                  padding: '14px 16px',
                }}
              >
                <InfoItem label="학년 / 학기" value={`${course.year}학년 ${course.semester === 0 ? '전학기' : `${course.semester}학기`}`} />
                <InfoItem
                  label="학점"
                  value={`${course.credits}학점 (이론 ${course.theory} / 실습 ${course.practice})`}
                />
                <InfoItem
                  label="이수구분"
                  value={
                    <span
                      style={{
                        fontFamily: 'var(--font-family)',
                        fontSize: 12,
                        fontWeight: 500,
                        padding: '2px 8px',
                        borderRadius: 5,
                        background: course.category === 'required' ? 'var(--color-accent-blue-light)' : '#F1F5F9',
                        color: course.category === 'required' ? 'var(--color-accent-blue)' : 'var(--color-text-secondary)',
                      }}
                    >
                      {course.category === 'required' ? '필수' : '선택'}
                    </span>
                  }
                />
                <InfoItem
                  label="캡스톤"
                  value={
                    course.isCapstone ? (
                      <span
                        style={{
                          fontFamily: 'var(--font-family)',
                          fontSize: 12,
                          fontWeight: 500,
                          padding: '2px 8px',
                          borderRadius: 5,
                          background: 'var(--color-accent-amber-light)',
                          color: 'var(--color-accent-amber)',
                        }}
                      >
                        해당
                      </span>
                    ) : (
                      <span
                        style={{
                          fontFamily: 'var(--font-family)',
                          fontSize: 13,
                          color: 'var(--color-text-muted)',
                        }}
                      >
                        해당없음
                      </span>
                    )
                  }
                />
                {course.note && (
                  <InfoItem label="비고" value={course.note} style={{ gridColumn: '1 / -1' }} />
                )}
              </div>

              {/* 선수과목 */}
              {course.prerequisite && (
                <Section label="선수과목">
                  <button
                    onClick={() => onNavigateToPrereq?.(course.prerequisite!)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      background: 'var(--color-accent-red-light)',
                      color: 'var(--color-accent-red)',
                      border: '1px solid #FECACA',
                      borderRadius: 6,
                      padding: '4px 10px',
                      fontFamily: 'var(--font-family)',
                      fontSize: 13,
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'background 150ms',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#FEE2E2')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--color-accent-red-light)')}
                  >
                    {course.prerequisite}
                  </button>
                </Section>
              )}

              {/* 역량 태그 */}
              {course.tags.length > 0 && (
                <Section label="역량">
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {course.tags.map((tag) => {
                      const colors = TAG_COLORS[tag] ?? { bg: '#F1F5F9', color: 'var(--color-text-secondary)' }
                      return (
                        <span
                          key={tag}
                          style={{
                            fontFamily: 'var(--font-family)',
                            fontSize: 12,
                            fontWeight: 500,
                            padding: '3px 9px',
                            borderRadius: 6,
                            background: colors.bg,
                            color: colors.color,
                          }}
                        >
                          {tag}
                        </span>
                      )
                    })}
                  </div>
                </Section>
              )}

              {/* 교과목 설명 */}
              <Section label="교과목 설명">
                <div
                  style={{
                    font: 'var(--font-body-sm)',
                    fontFamily: 'var(--font-family)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: '22px',
                    display: descExpanded ? undefined : '-webkit-box',
                    WebkitLineClamp: descExpanded ? undefined : 3,
                    WebkitBoxOrient: descExpanded ? undefined : 'vertical',
                    overflow: descExpanded ? undefined : 'hidden',
                  }}
                >
                  {course.description || '교과목 설명이 없습니다.'}
                </div>
                {course.description && course.description.length > 120 && (
                  <button
                    onClick={() => setDescExpanded((v) => !v)}
                    style={{
                      marginTop: 6,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 3,
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-family)',
                      fontSize: 12,
                      color: 'var(--color-accent-blue)',
                      fontWeight: 500,
                      padding: 0,
                    }}
                  >
                    {descExpanded ? (
                      <>접기 <ChevronUp size={13} /></>
                    ) : (
                      <>더 보기 <ChevronDown size={13} /></>
                    )}
                  </button>
                )}
              </Section>
            </div>

            {/* ── 하단 CTA (sticky) ── */}
            <div
              style={{
                flexShrink: 0,
                padding: '16px 24px',
                borderTop: '1px solid var(--color-border)',
              }}
            >
              <button
                onClick={onToggle}
                style={{
                  width: '100%',
                  height: 44,
                  borderRadius: 10,
                  border: `1px solid ${completed ? 'var(--color-accent-green)' : 'var(--color-accent-blue)'}`,
                  background: completed ? 'var(--color-accent-green)' : 'transparent',
                  color: completed ? '#fff' : 'var(--color-accent-blue)',
                  fontFamily: 'var(--font-family)',
                  fontSize: 15,
                  fontWeight: 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 7,
                  transition: 'all 200ms ease',
                }}
                onMouseEnter={(e) => {
                  if (!completed) e.currentTarget.style.background = 'var(--color-accent-blue-light)'
                }}
                onMouseLeave={(e) => {
                  if (!completed) e.currentTarget.style.background = 'transparent'
                }}
              >
                {completed ? (
                  <>
                    <Check size={17} strokeWidth={2.5} />
                    이수 완료
                  </>
                ) : (
                  '이수 완료로 표시'
                )}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

/* ── 내부 헬퍼 ── */
function InfoItem({
  label,
  value,
  style,
}: {
  label: string
  value: React.ReactNode
  style?: React.CSSProperties
}) {
  return (
    <div style={style}>
      <p
        style={{
          font: 'var(--font-label)',
          fontFamily: 'var(--font-family)',
          color: 'var(--color-text-muted)',
          marginBottom: 4,
        }}
      >
        {label}
      </p>
      <div
        style={{
          font: 'var(--font-body-sm)',
          fontFamily: 'var(--font-family)',
          color: 'var(--color-text-primary)',
          fontWeight: 500,
        }}
      >
        {value}
      </div>
    </div>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
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
        {label}
      </p>
      {children}
    </div>
  )
}
