import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Users, Info } from 'lucide-react'
import alumniData, { type Alumni } from '../data/alumniData'

const DEPT_FILTERS = [
  { id: 'all', label: '전체' },
  { id: 'industrial-design', label: '공업디자인' },
  { id: 'visual-design', label: '시각디자인' },
  { id: 'metal-craft', label: '금속공예' },
  { id: 'ceramic-craft', label: '도자공예' },
  { id: 'fashion-design', label: '의상디자인' },
  { id: 'spatial-design', label: '공간디자인' },
  { id: 'moving-image-design', label: '영상디자인' },
  { id: 'automotive-design', label: '자동차운송디자인' },
  { id: 'ai-design', label: 'AI디자인' },
]

const JOB_FILTERS = [
  { id: 'all', label: '전체' },
  { id: '대기업', label: '대기업' },
  { id: '스타트업', label: '스타트업' },
  { id: '프리랜서', label: '프리랜서' },
  { id: '창업', label: '창업' },
]

/* ── 모달 슬라이드 ── */
const TOTAL_SLIDES = 5

function AlumniModal({ alumni, onClose }: { alumni: Alumni; onClose: () => void }) {
  const [slide, setSlide] = useState(0)
  const [direction, setDirection] = useState(1)

  const go = useCallback((next: number) => {
    if (next < 0 || next >= TOTAL_SLIDES) return
    setDirection(next > slide ? 1 : -1)
    setSlide(next)
  }, [slide])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(slide + 1)
      if (e.key === 'ArrowLeft') go(slide - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, go, slide])

  const variants = {
    enter: (d: number) => ({ x: d * 40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d * -40, opacity: 0 }),
  }

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(0,0,0,0.4)',
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 520, maxWidth: '95vw', maxHeight: '85vh',
          background: '#FFFFFF', borderRadius: 24,
          boxShadow: '0 24px 64px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08)',
          overflow: 'hidden', position: 'relative',
          display: 'flex', flexDirection: 'column',
          fontFamily: 'var(--font-family)',
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 16, right: 16, zIndex: 10,
            background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%',
            width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: slide === 0 || slide === 4 ? '#FFFFFF' : '#AAAAAA',
            transition: 'color 150ms',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = slide === 0 || slide === 4 ? '#FFFFFF' : '#111111' }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = slide === 0 || slide === 4 ? '#FFFFFF' : '#AAAAAA' }}
        >
          <X size={18} />
        </button>

        {/* Slide area */}
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative', minHeight: 360 }}>
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={slide}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25 }}
              style={{ position: 'absolute', inset: 0, overflowY: 'auto' }}
            >
              {slide === 0 && <Slide1 alumni={alumni} />}
              {slide === 1 && <Slide2 alumni={alumni} />}
              {slide === 2 && <Slide3 alumni={alumni} />}
              {slide === 3 && <Slide4 alumni={alumni} />}
              {slide === 4 && <Slide5 alumni={alumni} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div style={{
          padding: '16px 24px',
          background: slide === 0 || slide === 4 ? '#111111' : '#FFFFFF',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderTop: `1px solid ${slide === 0 || slide === 4 ? 'rgba(255,255,255,0.08)' : '#F0F0F0'}`,
        }}>
          <button
            onClick={() => go(slide - 1)}
            disabled={slide === 0}
            style={{
              background: 'none', border: 'none', cursor: slide === 0 ? 'default' : 'pointer',
              opacity: slide === 0 ? 0.2 : 1,
              color: slide === 0 || slide === 4 ? '#FFFFFF' : '#111111',
              display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 500,
              fontFamily: 'var(--font-family)',
            }}
          >
            <ChevronLeft size={16} /> 이전
          </button>

          {/* Dots */}
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                style={{
                  width: 8, height: 8, borderRadius: '50%', border: 'none', cursor: 'pointer',
                  background: i === slide
                    ? (slide === 0 || slide === 4 ? '#FFFFFF' : '#111111')
                    : (slide === 0 || slide === 4 ? 'rgba(255,255,255,0.3)' : '#DDDDDD'),
                  padding: 0, transition: 'background 150ms',
                }}
              />
            ))}
          </div>

          <button
            onClick={() => go(slide + 1)}
            disabled={slide === TOTAL_SLIDES - 1}
            style={{
              background: 'none', border: 'none', cursor: slide === TOTAL_SLIDES - 1 ? 'default' : 'pointer',
              opacity: slide === TOTAL_SLIDES - 1 ? 0.2 : 1,
              color: slide === 0 || slide === 4 ? '#FFFFFF' : '#111111',
              display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 500,
              fontFamily: 'var(--font-family)',
            }}
          >
            다음 <ChevronRight size={16} />
          </button>
        </div>
      </motion.div>
    </div>
  )
}

function Slide1({ alumni }: { alumni: Alumni }) {
  return (
    <div style={{
      background: '#111111', color: '#FFFFFF',
      padding: '48px 40px 32px', textAlign: 'center', minHeight: 360,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>{alumni.name}</div>
      <div style={{ fontSize: 14, opacity: 0.5, marginBottom: 4 }}>{alumni.departmentName}</div>
      <div style={{ fontSize: 12, opacity: 0.35, marginBottom: 24 }}>
        {alumni.admissionYear} 입학 · {alumni.graduationYear} 졸업
      </div>
      <div style={{ width: 40, height: 1, background: 'rgba(255,255,255,0.2)', margin: '0 auto 24px' }} />
      <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 8 }}>{alumni.position}</div>
      <div style={{ fontSize: 14, opacity: 0.6 }}>{alumni.company} · {alumni.location}</div>
    </div>
  )
}

function Slide2({ alumni }: { alumni: Alumni }) {
  return (
    <div style={{ background: '#FFFFFF', padding: '32px', minHeight: 360 }}>
      <div style={{ fontSize: 16, fontWeight: 600, color: '#111111', marginBottom: 20 }}>
        학부 시절 이런 활동을 했어요
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        {alumni.activities.map((act, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%', background: '#111111',
              marginTop: 7, flexShrink: 0,
            }} />
            <span style={{ fontSize: 14, color: '#333333', lineHeight: 1.8 }}>{act}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {alumni.gpa > 0 && (
          <span style={{ padding: '4px 10px', borderRadius: 10, fontSize: 12, background: '#F5F5F5', color: '#666666' }}>
            학점 {alumni.gpa}
          </span>
        )}
        {alumni.languageScore && (
          <span style={{ padding: '4px 10px', borderRadius: 10, fontSize: 12, background: '#F5F5F5', color: '#666666' }}>
            {alumni.languageScore}
          </span>
        )}
        {alumni.certifications.map((c, i) => (
          <span key={i} style={{ padding: '4px 10px', borderRadius: 10, fontSize: 12, background: '#F5F5F5', color: '#666666' }}>
            {c}
          </span>
        ))}
      </div>
    </div>
  )
}

function Slide3({ alumni }: { alumni: Alumni }) {
  return (
    <div style={{ background: '#F7F8FA', padding: '32px', minHeight: 360 }}>
      <div style={{ fontSize: 16, fontWeight: 600, color: '#111111', marginBottom: 8 }}>
        나만의 취업 노하우
      </div>
      <div style={{ fontSize: 32, color: '#DDDDDD', lineHeight: 1, marginBottom: 12 }}>"</div>
      <p style={{ fontSize: 14, color: '#333333', lineHeight: 1.8, margin: 0 }}>
        {alumni.selfIntro}
      </p>
    </div>
  )
}

function Slide4({ alumni }: { alumni: Alumni }) {
  return (
    <div style={{ background: '#FFFFFF', padding: '32px', minHeight: 360 }}>
      <div style={{ fontSize: 16, fontWeight: 600, color: '#111111', marginBottom: 16 }}>
        입사 준비는 이렇게 했어요
      </div>
      <p style={{ fontSize: 14, color: '#333333', lineHeight: 1.8, margin: 0 }}>
        {alumni.companyTip}
      </p>
    </div>
  )
}

function Slide5({ alumni }: { alumni: Alumni }) {
  return (
    <div style={{
      background: '#111111', color: '#FFFFFF',
      padding: '40px 32px 32px', minHeight: 360,
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
    }}>
      <div style={{ fontSize: 16, fontWeight: 500, opacity: 0.6, marginBottom: 24 }}>
        후배들에게 전하는 한마디
      </div>
      <p style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.8, margin: '0 0 32px' }}>
        {alumni.messageToJuniors}
      </p>
      <div style={{ fontSize: 13, opacity: 0.4 }}>
        {alumni.name} · {alumni.departmentName}
      </div>
    </div>
  )
}

/* ── 메인 페이지 ── */
export default function AlumniPage() {
  const [deptFilter, setDeptFilter] = useState('all')
  const [jobFilter, setJobFilter] = useState('all')
  const [selectedAlumni, setSelectedAlumni] = useState<Alumni | null>(null)
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLButtonElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

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

  const filtered = alumniData.filter((a) => {
    if (deptFilter !== 'all' && a.departmentId !== deptFilter) return false
    if (jobFilter !== 'all' && !a.jobType.includes(jobFilter)) return false
    return true
  })

  return (
    <div style={{ height: '100%', overflowY: 'auto', fontFamily: 'var(--font-family)' }}>
      <div style={{ padding: '40px 36px 80px' }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
            <h1 style={{ fontSize: 32, fontWeight: 800, color: '#111111', margin: 0, letterSpacing: '-0.02em' }}>
              조형대 졸업생은 어디서 일하고 있을까?
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
                    padding: '16px 20px', maxWidth: 360,
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
                  본 정보는 국민대학교 경력개발지원단의 동문멘토상담 프로그램을 통해 수집된 데이터를 기반으로 구성되었습니다. 졸업생의 현재 소속이나 직무는 변경되었을 수 있습니다.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <p style={{ fontSize: 14, color: '#888888', marginTop: 8 }}>
            조형대학 졸업 선배들의 실제 커리어 스토리를 확인해보세요.
          </p>
        </div>

        {/* Dept filter */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
          {DEPT_FILTERS.map((f) => {
            const active = deptFilter === f.id
            return (
              <button
                key={f.id}
                onClick={() => setDeptFilter(f.id)}
                style={{
                  padding: '8px 16px', borderRadius: 20, fontSize: 13, fontWeight: active ? 600 : 500,
                  border: `1px solid ${active ? '#111111' : '#E5E5E5'}`,
                  background: active ? '#111111' : '#FFFFFF',
                  color: active ? '#FFFFFF' : '#666666',
                  cursor: 'pointer', transition: 'all 150ms', fontFamily: 'var(--font-family)',
                }}
                onMouseEnter={(e) => { if (!active) { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = '#111111'; b.style.color = '#111111' } }}
                onMouseLeave={(e) => { if (!active) { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = '#E5E5E5'; b.style.color = '#666666' } }}
              >
                {f.label}
              </button>
            )
          })}
        </div>

        {/* Job type filter */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
          {JOB_FILTERS.map((f) => {
            const active = jobFilter === f.id
            return (
              <button
                key={f.id}
                onClick={() => setJobFilter(f.id)}
                style={{
                  padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: active ? 600 : 500,
                  border: `1px solid ${active ? '#111111' : '#E5E5E5'}`,
                  background: active ? '#111111' : '#FFFFFF',
                  color: active ? '#FFFFFF' : '#888888',
                  cursor: 'pointer', transition: 'all 150ms', fontFamily: 'var(--font-family)',
                }}
                onMouseEnter={(e) => { if (!active) { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = '#111111'; b.style.color = '#111111' } }}
                onMouseLeave={(e) => { if (!active) { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = '#E5E5E5'; b.style.color = '#888888' } }}
              >
                {f.label}
              </button>
            )
          })}
        </div>

        {/* Cards */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <Users size={40} style={{ margin: '0 auto 16px', display: 'block', color: '#DDDDDD' }} />
            <p style={{ fontSize: 14, color: '#AAAAAA', margin: '0 0 4px' }}>
              아직 등록된 졸업생 정보가 없어요.
            </p>
            <p style={{ fontSize: 14, color: '#AAAAAA', margin: 0 }}>
              곧 업데이트될 예정입니다.
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
            {filtered.map((alumni) => (
              <AlumniCard key={alumni.id} alumni={alumni} onClick={() => setSelectedAlumni(alumni)} />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedAlumni && (
          <AlumniModal alumni={selectedAlumni} onClose={() => setSelectedAlumni(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}

function AlumniCard({ alumni, onClick }: { alumni: Alumni; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.07)',
        borderRadius: 20, overflow: 'hidden', cursor: 'pointer',
        transition: 'border-color 200ms, box-shadow 200ms, transform 200ms',
        fontFamily: 'var(--font-family)',
        boxShadow: 'var(--shadow-card)',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement
        el.style.borderColor = 'rgba(0,0,0,0.14)'
        el.style.boxShadow = 'var(--shadow-card-hover)'
        el.style.transform = 'translateY(-3px)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement
        el.style.borderColor = 'rgba(0,0,0,0.07)'
        el.style.boxShadow = 'var(--shadow-card)'
        el.style.transform = 'translateY(0)'
      }}
    >
      {/* Profile header */}
      <div style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #111111 100%)', padding: 24, color: '#FFFFFF', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: 16, right: 16,
          border: '1px solid rgba(255,255,255,0.3)', borderRadius: 12,
          padding: '4px 10px', fontSize: 11, color: '#FFFFFF',
        }}>
          {alumni.jobType}
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>{alumni.name}</div>
        <div style={{ fontSize: 13, opacity: 0.6, marginBottom: 4 }}>{alumni.departmentName}</div>
        <div style={{ fontSize: 12, opacity: 0.4 }}>
          {alumni.admissionYear} 입학 · {alumni.graduationYear} 졸업
        </div>
      </div>

      {/* Job info */}
      <div style={{ padding: '20px 24px', borderBottom: '1px solid #F0F0F0' }}>
        <div style={{ fontSize: 16, fontWeight: 600, color: '#111111', marginBottom: 4 }}>
          {alumni.position}
        </div>
        <div style={{ fontSize: 13, color: '#888888', marginBottom: 4 }}>
          {alumni.company} · {alumni.location}
        </div>
        <div style={{ fontSize: 13, color: '#888888' }}>
          {alumni.jobDescription}
        </div>
      </div>

      {/* Tags + action */}
      <div style={{ padding: '16px 24px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {alumni.tags.map((tag) => (
            <span key={tag} style={{
              padding: '4px 10px', borderRadius: 12, fontSize: 11,
              background: '#F5F5F5', color: '#666666',
            }}>
              {tag}
            </span>
          ))}
        </div>
        <div style={{ fontSize: 13, color: '#111111', fontWeight: 500, marginTop: 12 }}>
          자세히 보기 →
        </div>
      </div>
    </div>
  )
}
