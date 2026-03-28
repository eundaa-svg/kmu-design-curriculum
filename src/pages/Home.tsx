import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check } from 'lucide-react'
import { useStore } from '../store/useStore'

/* ══════════════════════════════════════════════
   유틸리티
══════════════════════════════════════════════ */
function clamp01(v: number) { return Math.min(Math.max(v, 0), 1) }
function mapRange(v: number, a: number, b: number) { return clamp01((v - a) / (b - a)) }
function lerp(a: number, b: number, t: number) { return a + (b - a) * t }

function cubicBezier(t: number, p0: number, p1: number, p2: number, p3: number) {
  const u = 1 - t
  return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3
}

// 두 개의 cubic bezier segment로 이루어진 SVG path 위의 점 계산
function getDotPos(t: number): [number, number] {
  // segment 1: M 80,100 C 200,40 280,160 400,100
  // segment 2:          C 520,40 600,160 720,100
  const lt = t <= 0.5 ? t / 0.5 : (t - 0.5) / 0.5
  if (t <= 0.5) {
    return [
      cubicBezier(lt, 80, 200, 280, 400),
      cubicBezier(lt, 100, 40, 160, 100),
    ]
  }
  return [
    cubicBezier(lt, 400, 520, 600, 720),
    cubicBezier(lt, 100, 40, 160, 100),
  ]
}

function findScrollParent(el: HTMLElement): HTMLElement | Window {
  let node: HTMLElement | null = el.parentElement
  while (node) {
    const ov = getComputedStyle(node).overflowY
    if (ov === 'auto' || ov === 'scroll') return node
    node = node.parentElement
  }
  return window
}

/* ══════════════════════════════════════════════
   상수
══════════════════════════════════════════════ */
const COURSE_CARDS = ['기초디자인', '타이포그래피', '모션그래픽', '드레이핑', '3D모델링', '디자인사']
const BADGE_LABELS = ['UX 디자이너', '제품 디자이너', '영상 디자이너', '공간 디자이너', '패션 디자이너', '3D 디자이너']
const KEYWORDS = ['이수', '경험', '역량', '성장']
const KEYWORD_T = [0.14, 0.37, 0.62, 0.84]   // 각 키워드의 path 위 t 값
const FLOAT_SPEEDS = [0.28, -0.19, 0.35, -0.24, 0.22, -0.31]
const PATH_D = 'M 80,100 C 200,40 280,160 400,100 C 520,40 600,160 720,100'
const PATH_LEN = 700  // 근사치 (strokeDasharray 용)

/* ══════════════════════════════════════════════
   히어로 섹션 (스크롤 3단계 모션)
══════════════════════════════════════════════ */
function HeroSection() {
  const navigate = useNavigate()
  const heroRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [floatTime, setFloatTime] = useState(0)
  const progressRef = useRef(0)
  const rafRef = useRef(0)
  const startRef = useRef(performance.now())
  const [isMobile] = useState(() => window.innerWidth < 768)

  /* ── Float RAF ── */
  useEffect(() => {
    const loop = () => {
      if (progressRef.current < 0.65) {
        setFloatTime((performance.now() - startRef.current) / 1000)
      }
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  /* ── Scroll listener ── */
  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return
    const scroller = findScrollParent(hero)
    const onScroll = () => {
      const rect = hero.getBoundingClientRect()
      const scrollH = hero.offsetHeight - window.innerHeight
      if (scrollH <= 0) return
      const prog = clamp01(-rect.top / scrollH)
      progressRef.current = prog
      setProgress(prog)
    }
    scroller.addEventListener('scroll', onScroll, { passive: true })
    return () => scroller.removeEventListener('scroll', onScroll)
  }, [])

  /* ── Progress → phase values ── */
  const curriculumAlpha = mapRange(progress, 0.03, 0.14) * (1 - mapRange(progress, 0.27, 0.40))
  const cardsAlpha      = mapRange(progress, 0.05, 0.18) * (1 - mapRange(progress, 0.38, 0.52))
  const cardsCollect    = mapRange(progress, 0.20, 0.48)   // 0→1: 카드가 중앙으로

  const transitionAlpha = mapRange(progress, 0.28, 0.40) * (1 - mapRange(progress, 0.58, 0.70))
  const lineProgress    = mapRange(progress, 0.34, 0.65)

  const careerAlpha  = mapRange(progress, 0.60, 0.77)
  const badgeProgress = mapRange(progress, 0.65, 0.92)
  const ctaAlpha     = mapRange(progress, 0.88, 1.00)

  const scrollIndicatorAlpha = 1 - mapRange(progress, 0, 0.08)

  /* ── 과목 카드 위치 (orbit) ── */
  const numCards = isMobile ? 4 : 6
  const orbitR   = isMobile ? 120 : 200
  const cards = COURSE_CARDS.slice(0, numCards).map((label, i) => {
    const baseAngle = (i / numCards) * Math.PI * 2 - Math.PI / 2
    const angle = baseAngle + floatTime * FLOAT_SPEEDS[i]
    const r = orbitR * (1 - cardsCollect)
    return {
      label,
      x: Math.cos(angle) * r,
      y: Math.sin(angle) * r * 0.62,
    }
  })

  /* ── 직군 배지 위치 (radial) ── */
  const numBadges  = isMobile ? 4 : 6
  const badgeR     = isMobile ? 110 : 155
  const badges = BADGE_LABELS.slice(0, numBadges).map((label, i) => {
    const angle = (i / numBadges) * Math.PI * 2 - Math.PI / 2
    const bp    = clamp01(badgeProgress - i * 0.05)
    return {
      label,
      x: Math.cos(angle) * badgeR * bp,
      y: Math.sin(angle) * badgeR * 0.68 * bp,
      alpha: bp,
      scale: 0.4 + bp * 0.6,
    }
  })

  /* ── SVG dot 위치 ── */
  const [dotX, dotY] = lineProgress > 0.01 ? getDotPos(lineProgress) : [80, 100]

  /* ── 스타일 헬퍼 ── */
  const heroHeight = isMobile ? '250vh' : '300vh'
  const textSize   = isMobile ? 40 : 72

  return (
    <div ref={heroRef} style={{ height: heroHeight, position: 'relative' }}>
      {/* Sticky 뷰포트 */}
      <div style={{
        position: 'sticky', top: 0, height: '100vh', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font-family)',
      }}>

        {/* 도트 그리드 배경 */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, #D0D0D0 1px, transparent 1px)',
          backgroundSize: '24px 24px', opacity: 0.4,
        }} />

        {/* ────────────────────────────────────────
            PHASE 1: 커리큘럼 텍스트 + 떠다니는 카드
        ──────────────────────────────────────── */}
        {/* 과목 카드 레이어 (텍스트와 독립 opacity) */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none', opacity: cardsAlpha,
        }}>
          {cards.map(({ label, x, y }, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                width: isMobile ? 70 : 84, height: 30,
                borderRadius: 8, border: '1px solid #E0E0E0',
                background: '#FFFFFF',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 9, color: '#999999', whiteSpace: 'nowrap',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                willChange: 'transform',
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* 커리큘럼 텍스트 */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: curriculumAlpha, pointerEvents: 'none',
        }}>
          <div style={{
            fontSize: textSize, fontWeight: 800, color: '#111111',
            letterSpacing: '-2px', userSelect: 'none',
          }}>
            커리큘럼
          </div>
        </div>

        {/* ────────────────────────────────────────
            PHASE 2: SVG 연결선 + 이동하는 dot + 키워드
        ──────────────────────────────────────── */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: transitionAlpha, pointerEvents: 'none',
        }}>
          <div style={{ width: '100%', maxWidth: 800, padding: '0 40px' }}>
            <svg
              viewBox="0 0 800 200"
              style={{ width: '100%', height: 'auto', overflow: 'visible' }}
            >
              {/* S자 연결선 */}
              <path
                d={PATH_D}
                stroke="#111111"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={PATH_LEN}
                strokeDashoffset={PATH_LEN * (1 - lineProgress)}
              />

              {/* 이동하는 dot */}
              {lineProgress > 0.02 && (
                <circle cx={dotX} cy={dotY} r="4" fill="#111111" />
              )}

              {/* 키워드 라벨 */}
              {KEYWORDS.map((word, i) => {
                const t = KEYWORD_T[i]
                const [kx, ky] = getDotPos(t)
                const kwAlpha = clamp01((lineProgress - t + 0.06) / 0.12)
                return kwAlpha > 0 ? (
                  <text
                    key={word}
                    x={kx} y={ky - 14}
                    textAnchor="middle"
                    fontSize="11"
                    fill="#AAAAAA"
                    opacity={kwAlpha}
                    fontFamily="var(--font-family)"
                    fontWeight="500"
                  >
                    {word}
                  </text>
                ) : null
              })}
            </svg>
          </div>
        </div>

        {/* ────────────────────────────────────────
            PHASE 3: 커리어 텍스트 + 배지 + CTA
        ──────────────────────────────────────── */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: careerAlpha, pointerEvents: 'none',
        }}>
          {/* 방사형 배지 */}
          {badges.map(({ label, x, y, alpha, scale }, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale})`,
                borderRadius: 20, background: '#111111', color: '#FFFFFF',
                padding: '6px 14px', fontSize: 11, fontWeight: 600,
                whiteSpace: 'nowrap', opacity: alpha,
                willChange: 'transform, opacity',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              }}
            >
              {label}
            </div>
          ))}

          {/* 커리어 텍스트 + CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
            <div style={{
              fontSize: textSize, fontWeight: 800, color: '#111111',
              letterSpacing: '-2px', userSelect: 'none',
              transform: `translateY(${lerp(16, 0, careerAlpha)}px)`,
            }}>
              커리어
            </div>

            {/* CTA 버튼 */}
            <button
              onClick={() => navigate('/recommend')}
              style={{
                marginTop: 28, padding: '14px 28px',
                background: '#111111', color: '#FFFFFF',
                border: 'none', borderRadius: 14,
                fontSize: 15, fontWeight: 600, cursor: 'pointer',
                fontFamily: 'var(--font-family)',
                opacity: ctaAlpha,
                transform: `translateY(${lerp(10, 0, ctaAlpha)}px)`,
                pointerEvents: ctaAlpha > 0.5 ? 'auto' : 'none',
                transition: 'box-shadow 200ms',
                willChange: 'transform, opacity',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)' }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none' }}
            >
              나의 커리어 탐색 시작하기 →
            </button>
          </div>
        </div>

        {/* 스크롤 유도 */}
        <div style={{
          position: 'absolute', bottom: 28, left: '50%',
          transform: 'translateX(-50%)',
          opacity: scrollIndicatorAlpha,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          color: '#BBBBBB', fontSize: 10, letterSpacing: '0.18em',
          textTransform: 'uppercase', userSelect: 'none',
          pointerEvents: 'none',
        }}>
          <span>Scroll</span>
          <div style={{
            width: 1, height: 28, background: '#CCCCCC',
            animation: 'scrollBar 1.6s ease-in-out infinite',
            transformOrigin: 'top',
          }} />
        </div>
      </div>

      <style>{`
        @keyframes scrollBar {
          0%   { transform: scaleY(0); opacity: 1; }
          100% { transform: scaleY(1); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

/* ══════════════════════════════════════════════
   스크롤 reveal 훅
══════════════════════════════════════════════ */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return { ref, visible }
}

/* ══════════════════════════════════════════════
   섹션 헤더
══════════════════════════════════════════════ */
function SectionHeader({ label, title }: { label: string; title: string }) {
  const { ref, visible } = useReveal()
  return (
    <div ref={ref} style={{
      marginBottom: 32,
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(24px)',
      transition: 'opacity 500ms ease, transform 500ms ease',
    }}>
      <div style={{ fontSize: 11, letterSpacing: '0.2em', color: '#AAAAAA', marginBottom: 10, fontWeight: 700, textTransform: 'uppercase' }}>
        {label}
      </div>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111111', margin: 0, letterSpacing: '-0.01em' }}>
        {title}
      </h2>
    </div>
  )
}

/* ══════════════════════════════════════════════
   프리뷰 카드
══════════════════════════════════════════════ */
function PreviewCard({ preview, title, desc, to, delay = 0 }: {
  preview: React.ReactNode; title: string; desc: string; to: string; delay?: number
}) {
  const navigate = useNavigate()
  const { ref, visible } = useReveal()
  return (
    <div
      ref={ref}
      onClick={() => navigate(to)}
      style={{
        background: '#FFFFFF', border: '1px solid #F0F0F0',
        borderRadius: 20, overflow: 'hidden', cursor: 'pointer',
        transition: 'border-color 250ms ease, box-shadow 250ms ease, transform 250ms ease',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transitionDelay: visible ? `${delay}ms` : '0ms',
        fontFamily: 'var(--font-family)',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement
        el.style.borderColor = '#E0E0E0'
        el.style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)'
        el.style.transform = 'translateY(-4px)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement
        el.style.borderColor = '#F0F0F0'
        el.style.boxShadow = 'none'
        el.style.transform = 'translateY(0)'
      }}
    >
      <div style={{ height: 180, overflow: 'hidden', position: 'relative' }}>{preview}</div>
      <div style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontSize: 17, fontWeight: 600, color: '#111111', marginBottom: 6 }}>{title}</div>
          <div style={{ fontSize: 13, color: '#999999', lineHeight: 1.5 }}>{desc}</div>
        </div>
        <span style={{ fontSize: 18, color: '#CCCCCC', flexShrink: 0, marginLeft: 12 }}>→</span>
      </div>
    </div>
  )
}

/* ── 미리보기 컴포넌트들 ── */
function RecommendPreview() {
  return (
    <div style={{ background: '#FAFAFA', height: '100%', padding: '20px 20px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {['UX 디자이너', '제품 디자이너', '영상·모션 디자이너'].map((label, i) => (
          <span key={label} style={{
            padding: '6px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600,
            background: i === 0 ? '#111111' : '#EEEEEE',
            color: i === 0 ? '#FFFFFF' : '#888888',
          }}>{label}</span>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
        {['경험디자인 1', 'UX 리서치'].map((name, i) => (
          <div key={name} style={{
            background: '#FFFFFF', border: '1px solid #E8E8E8', borderRadius: 10,
            padding: '10px 14px', fontSize: 12, color: '#333333', fontWeight: 500,
            opacity: 1 - i * 0.35, boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          }}>{name}</div>
        ))}
      </div>
    </div>
  )
}

function CareerFitPreview() {
  const bars = [{ label: 'UX 디자이너', w: 80 }, { label: '제품 디자이너', w: 55 }, { label: '브랜드 디자이너', w: 35 }]
  return (
    <div style={{ background: '#FAFAFA', height: '100%', padding: '20px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: 8, right: 16, fontSize: 48, fontWeight: 800, color: '#111111', opacity: 0.07, lineHeight: 1, userSelect: 'none' }}>72%</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {bars.map(({ label, w }, i) => (
          <div key={label}>
            <div style={{ fontSize: 11, color: '#888888', marginBottom: 5 }}>{label}</div>
            <div style={{ height: 8, background: '#EEEEEE', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${w}%`, background: i === 0 ? '#111111' : i === 1 ? '#555555' : '#AAAAAA', borderRadius: 4 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AlumniPreview() {
  return (
    <div style={{ background: '#111111', height: '100%', padding: '20px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ position: 'absolute', bottom: 12, right: 16, fontSize: 52, color: '#FFFFFF', opacity: 0.07, lineHeight: 1, userSelect: 'none' }}>"</div>
      {[{ name: '정다혜', role: '웹툰 작가', offset: 0 }, { name: '김윤호', role: 'CJ올리브영', offset: 12 }].map(({ name, role, offset }, i) => (
        <div key={name} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '10px 14px', marginLeft: offset, opacity: 1 - i * 0.3 }}>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>{name}</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>{role}</div>
        </div>
      ))}
    </div>
  )
}

function CurriculumPreview() {
  const colors = ['#FF0017', '#FF006A', '#FFC900', '#008AC2']
  return (
    <div style={{ background: '#FAFAFA', height: '100%', padding: '16px 20px', overflow: 'hidden' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {['1학년', '2학년', '3학년', '4학년'].map((yr, i) => (
          <div key={yr} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: colors[i], flexShrink: 0 }} />
            <div style={{ height: 6, flex: 1, background: '#EEEEEE', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${85 - i * 12}%`, background: '#DDDDDD', borderRadius: 3 }} />
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, marginTop: 16 }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} style={{ height: 28, background: '#EEEEEE', borderRadius: 6, opacity: 0.6 + (i % 3) * 0.15 }} />
        ))}
      </div>
    </div>
  )
}

function ProgressPreview() {
  return (
    <div style={{ background: '#FAFAFA', height: '100%', padding: '20px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: 10, right: 14, fontSize: 32, fontWeight: 800, color: '#111111', opacity: 0.07, lineHeight: 1, userSelect: 'none' }}>24학점</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {[{ label: '필수 과목', w: 60, dark: true }, { label: '선택 과목', w: 40, dark: false }].map(({ label, w, dark }) => (
          <div key={label}>
            <div style={{ fontSize: 11, color: '#888888', marginBottom: 6 }}>{label}</div>
            <div style={{ height: 8, background: '#EEEEEE', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${w}%`, background: dark ? '#111111' : '#CCCCCC', borderRadius: 4 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function GraduationPreview() {
  const items = [{ label: '필수 과목 이수', done: true }, { label: 'S-TEAM Class', done: true }, { label: '캡스톤디자인', done: false }, { label: '최저이수학점', done: false }]
  return (
    <div style={{ background: '#FAFAFA', height: '100%', padding: '20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
      {items.map(({ label, done }) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 18, height: 18, borderRadius: 5, flexShrink: 0, background: done ? '#111111' : 'transparent', border: done ? 'none' : '1.5px solid #DDDDDD', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {done && <Check size={11} color="#FFFFFF" strokeWidth={3} />}
          </div>
          <span style={{ fontSize: 12, color: done ? '#111111' : '#BBBBBB', fontWeight: done ? 500 : 400 }}>{label}</span>
        </div>
      ))}
    </div>
  )
}

/* ══════════════════════════════════════════════
   CTA 섹션
══════════════════════════════════════════════ */
function CtaSection({ myDepartmentId }: { myDepartmentId: string }) {
  const navigate = useNavigate()
  const { ref, visible } = useReveal()
  return (
    <section ref={ref} style={{
      textAlign: 'center', padding: '40px 40px 80px',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'opacity 500ms ease, transform 500ms ease',
    }}>
      <div style={{ fontSize: 20, fontWeight: 700, color: '#111111' }}>지금 바로 시작하세요</div>
      <div style={{ fontSize: 14, color: '#999999', marginTop: 8 }}>커리큘럼을 탐색하고, 나만의 커리어를 설계해보세요.</div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
        <button
          onClick={() => navigate('/recommend')}
          style={{ background: '#111111', color: '#FFFFFF', borderRadius: 14, padding: '14px 28px', fontSize: 15, fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: 'var(--font-family)', transition: 'box-shadow 200ms ease' }}
          onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.18)' }}
          onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none' }}
        >
          직군별 추천 시작
        </button>
        <button
          onClick={() => navigate(`/department/${myDepartmentId}`)}
          style={{ background: '#FFFFFF', color: '#111111', border: '1px solid #E0E0E0', borderRadius: 14, padding: '14px 28px', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-family)', transition: 'border-color 200ms ease' }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#111111' }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E0E0E0' }}
        >
          커리큘럼 탐색
        </button>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════
   메인 페이지
══════════════════════════════════════════════ */
export default function Home() {
  const { myDepartmentId } = useStore()
  const firstDept = myDepartmentId ?? 'industrial-design'

  return (
    <div style={{ fontFamily: 'var(--font-family)', overflowX: 'hidden' }}>

      {/* A. 히어로 (스크롤 기반 3단계 모션) */}
      <HeroSection />

      {/* B. CAREER 프리뷰 카드 */}
      <section style={{ padding: '80px 40px 60px', maxWidth: 1200, margin: '0 auto' }}>
        <SectionHeader label="Career" title="나의 커리어를 설계하세요" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          <PreviewCard preview={<RecommendPreview />}  title="직군별 추천 수업"   desc="23개 디자인 직군에 맞는 수업을 찾아보세요"         to="/recommend"   delay={0}   />
          <PreviewCard preview={<CareerFitPreview />}  title="나의 커리어 적합도" desc="이수한 과목으로 어떤 디자이너에 가장 가까운지 확인" to="/career-fit"  delay={100} />
          <PreviewCard preview={<AlumniPreview />}     title="졸업생 커리어"      desc="조형대 선배들은 어디서 일하고 있을까"             to="/alumni"      delay={200} />
        </div>
      </section>

      {/* C. CURRICULUM 프리뷰 카드 */}
      <section style={{ padding: '0 40px 60px', maxWidth: 1200, margin: '0 auto' }}>
        <SectionHeader label="Curriculum" title="커리큘럼을 한눈에" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          <PreviewCard preview={<CurriculumPreview />} title="9개 학과 커리큘럼" desc="학과별 교육과정을 로드맵으로 확인"    to={`/department/${firstDept}`} delay={0}   />
          <PreviewCard preview={<ProgressPreview />}   title="이수 현황"         desc="이수한 과목과 학점을 한눈에 확인"    to="/progress"                 delay={100} />
          <PreviewCard preview={<GraduationPreview />} title="졸업 요건"         desc="졸업까지 남은 조건을 체크"          to="/graduation"               delay={200} />
        </div>
      </section>

      {/* D. 하단 CTA */}
      <CtaSection myDepartmentId={firstDept} />
    </div>
  )
}
