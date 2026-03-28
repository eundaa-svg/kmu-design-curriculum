import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, Check } from 'lucide-react'
import { useStore } from '../store/useStore'

/* ── 스크롤 reveal 훅 ── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.12 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return { ref, visible }
}

/* ── 섹션 헤더 ── */
function SectionHeader({ label, title }: { label: string; title: string }) {
  const { ref, visible } = useReveal()
  return (
    <div
      ref={ref}
      style={{
        marginBottom: 32,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 500ms ease, transform 500ms ease',
      }}
    >
      <div style={{ fontSize: 11, letterSpacing: '0.2em', color: '#AAAAAA', marginBottom: 10, fontWeight: 700, textTransform: 'uppercase' }}>
        {label}
      </div>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111111', margin: 0, letterSpacing: '-0.01em' }}>
        {title}
      </h2>
    </div>
  )
}

/* ── 프리뷰 카드 ── */
function PreviewCard({
  preview,
  title,
  desc,
  to,
  delay = 0,
}: {
  preview: React.ReactNode
  title: string
  desc: string
  to: string
  delay?: number
}) {
  const navigate = useNavigate()
  const { ref, visible } = useReveal()

  return (
    <div
      ref={ref}
      onClick={() => navigate(to)}
      style={{
        background: '#FFFFFF',
        border: '1px solid #F0F0F0',
        borderRadius: 20,
        overflow: 'hidden',
        cursor: 'pointer',
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
      {/* 미리보기 영역 */}
      <div style={{ height: 180, overflow: 'hidden', position: 'relative' }}>
        {preview}
      </div>

      {/* 텍스트 영역 */}
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

/* ── 카드 미리보기: 직군별 추천 ── */
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
            background: '#FFFFFF', border: '1px solid #E8E8E8',
            borderRadius: 10, padding: '10px 14px',
            fontSize: 12, color: '#333333', fontWeight: 500,
            opacity: 1 - i * 0.35,
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          }}>{name}</div>
        ))}
      </div>
    </div>
  )
}

/* ── 카드 미리보기: 커리어 적합도 ── */
function CareerFitPreview() {
  const bars = [
    { label: 'UX 디자이너', width: 80 },
    { label: '제품 디자이너', width: 55 },
    { label: '브랜드 디자이너', width: 35 },
  ]
  return (
    <div style={{ background: '#FAFAFA', height: '100%', padding: '20px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: 8, right: 16, fontSize: 48, fontWeight: 800, color: '#111111', opacity: 0.07, lineHeight: 1, userSelect: 'none' }}>
        72%
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {bars.map(({ label, width }, i) => (
          <div key={label}>
            <div style={{ fontSize: 11, color: '#888888', marginBottom: 5 }}>{label}</div>
            <div style={{ height: 8, background: '#EEEEEE', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{
                height: '100%', width: `${width}%`,
                background: i === 0 ? '#111111' : i === 1 ? '#555555' : '#AAAAAA',
                borderRadius: 4,
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── 카드 미리보기: 졸업생 커리어 ── */
function AlumniPreview() {
  return (
    <div style={{ background: '#111111', height: '100%', padding: '20px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ position: 'absolute', bottom: 12, right: 16, fontSize: 52, color: '#FFFFFF', opacity: 0.07, lineHeight: 1, userSelect: 'none' }}>"</div>
      {[
        { name: '정다혜', role: '웹툰 작가', offset: 0 },
        { name: '김윤호', role: 'CJ올리브영', offset: 12 },
      ].map(({ name, role, offset }, i) => (
        <div key={name} style={{
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 10, padding: '10px 14px',
          marginLeft: offset,
          opacity: 1 - i * 0.3,
        }}>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>{name}</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>{role}</div>
        </div>
      ))}
    </div>
  )
}

/* ── 카드 미리보기: 커리큘럼 ── */
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

/* ── 카드 미리보기: 이수 현황 ── */
function ProgressPreview() {
  return (
    <div style={{ background: '#FAFAFA', height: '100%', padding: '20px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: 10, right: 14, fontSize: 32, fontWeight: 800, color: '#111111', opacity: 0.07, lineHeight: 1, userSelect: 'none' }}>
        24학점
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {[
          { label: '필수 과목', width: 60, dark: true },
          { label: '선택 과목', width: 40, dark: false },
        ].map(({ label, width, dark }) => (
          <div key={label}>
            <div style={{ fontSize: 11, color: '#888888', marginBottom: 6 }}>{label}</div>
            <div style={{ height: 8, background: '#EEEEEE', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${width}%`, background: dark ? '#111111' : '#CCCCCC', borderRadius: 4 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── 카드 미리보기: 졸업 요건 ── */
function GraduationPreview() {
  const items = [
    { label: '필수 과목 이수', done: true },
    { label: 'S-TEAM Class', done: true },
    { label: '캡스톤디자인', done: false },
    { label: '최저이수학점', done: false },
  ]
  return (
    <div style={{ background: '#FAFAFA', height: '100%', padding: '20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
      {items.map(({ label, done }) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 18, height: 18, borderRadius: 5, flexShrink: 0,
            background: done ? '#111111' : 'transparent',
            border: done ? 'none' : '1.5px solid #DDDDDD',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {done && <Check size={11} color="#FFFFFF" strokeWidth={3} />}
          </div>
          <span style={{ fontSize: 12, color: done ? '#111111' : '#BBBBBB', fontWeight: done ? 500 : 400 }}>{label}</span>
        </div>
      ))}
    </div>
  )
}

/* ── 메인 컴포넌트 ── */
export default function Home() {
  const { myDepartmentId } = useStore()

  // 히어로 fade-in
  const [heroVisible, setHeroVisible] = useState(false)
  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 50); return () => clearTimeout(t) }, [])

  const firstDept = myDepartmentId ?? 'industrial-design'

  return (
    <div style={{ fontFamily: 'var(--font-family)', overflowX: 'hidden' }}>

      {/* ── A. 히어로 ── */}
      <section
        style={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 40px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* 도트 그리드 배경 */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, #D0D0D0 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.4,
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* 라벨 */}
          <div style={{
            fontSize: 11, letterSpacing: '0.25em', color: '#AAAAAA', marginBottom: 20,
            fontWeight: 700, textTransform: 'uppercase',
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 600ms ease, transform 600ms ease',
          }}>
            Kookmin Univ. College of Design
          </div>

          {/* 메인 카피 */}
          <h1 style={{ margin: 0, lineHeight: 1.15 }}>
            <div style={{
              fontSize: 'clamp(36px, 6vw, 56px)', fontWeight: 800, color: '#111111',
              letterSpacing: '-0.03em',
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 600ms ease, transform 600ms ease',
              transitionDelay: '100ms',
            }}>
              커리큘럼에서
            </div>
            <div style={{
              fontSize: 'clamp(36px, 6vw, 56px)', fontWeight: 800, color: '#111111',
              letterSpacing: '-0.03em',
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 600ms ease, transform 600ms ease',
              transitionDelay: '250ms',
            }}>
              커리어까지
            </div>
          </h1>

          {/* 설명 */}
          <p style={{
            fontSize: 16, color: '#999999', marginTop: 20, maxWidth: 480,
            margin: '20px auto 0', lineHeight: 1.7,
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 600ms ease, transform 600ms ease',
            transitionDelay: '400ms',
          }}>
            조형대학 9개 학과 교육과정을 탐색하고,<br />나에게 맞는 커리어를 설계하세요.
          </p>

          {/* 스크롤 유도 */}
          <div style={{
            marginTop: 48,
            opacity: heroVisible ? 1 : 0,
            transition: 'opacity 600ms ease',
            transitionDelay: '700ms',
          }}>
            <ChevronDown
              size={24}
              color="#CCCCCC"
              style={{ animation: 'bounce 2s ease infinite' }}
            />
          </div>
        </div>
      </section>

      {/* bounce 키프레임 */}
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
      `}</style>

      {/* ── B. CAREER 섹션 ── */}
      <section style={{ padding: '0 40px 80px', maxWidth: 1200, margin: '0 auto' }}>
        <SectionHeader label="Career" title="나의 커리어를 설계하세요" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          <PreviewCard
            preview={<RecommendPreview />}
            title="직군별 추천 수업"
            desc="23개 디자인 직군에 맞는 수업을 찾아보세요"
            to="/recommend"
            delay={0}
          />
          <PreviewCard
            preview={<CareerFitPreview />}
            title="나의 커리어 적합도"
            desc="이수한 과목으로 어떤 디자이너에 가장 가까운지 확인"
            to="/career-fit"
            delay={100}
          />
          <PreviewCard
            preview={<AlumniPreview />}
            title="졸업생 커리어"
            desc="조형대 선배들은 어디서 일하고 있을까"
            to="/alumni"
            delay={200}
          />
        </div>
      </section>

      {/* ── C. CURRICULUM 섹션 ── */}
      <section style={{ padding: '0 40px 80px', maxWidth: 1200, margin: '0 auto' }}>
        <SectionHeader label="Curriculum" title="커리큘럼을 한눈에" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          <PreviewCard
            preview={<CurriculumPreview />}
            title="9개 학과 커리큘럼"
            desc="학과별 교육과정을 로드맵으로 확인"
            to={`/department/${firstDept}`}
            delay={0}
          />
          <PreviewCard
            preview={<ProgressPreview />}
            title="이수 현황"
            desc="이수한 과목과 학점을 한눈에 확인"
            to="/progress"
            delay={100}
          />
          <PreviewCard
            preview={<GraduationPreview />}
            title="졸업 요건"
            desc="졸업까지 남은 조건을 체크"
            to="/graduation"
            delay={200}
          />
        </div>
      </section>

      {/* ── D. 하단 CTA ── */}
      <CtaSection myDepartmentId={firstDept} />
    </div>
  )
}

function CtaSection({ myDepartmentId }: { myDepartmentId: string }) {
  const navigate = useNavigate()
  const { ref, visible } = useReveal()

  return (
    <section
      ref={ref}
      style={{
        textAlign: 'center',
        padding: '40px 40px 80px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 500ms ease, transform 500ms ease',
      }}
    >
      <div style={{ fontSize: 20, fontWeight: 700, color: '#111111' }}>지금 바로 시작하세요</div>
      <div style={{ fontSize: 14, color: '#999999', marginTop: 8 }}>
        커리큘럼을 탐색하고, 나만의 커리어를 설계해보세요.
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
        <button
          onClick={() => navigate('/recommend')}
          style={{
            background: '#111111', color: '#FFFFFF',
            borderRadius: 14, padding: '14px 28px',
            fontSize: 15, fontWeight: 600, border: 'none', cursor: 'pointer',
            fontFamily: 'var(--font-family)',
            transition: 'box-shadow 200ms ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.18)' }}
          onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none' }}
        >
          직군별 추천 시작
        </button>
        <button
          onClick={() => navigate(`/department/${myDepartmentId}`)}
          style={{
            background: '#FFFFFF', color: '#111111',
            border: '1px solid #E0E0E0', borderRadius: 14, padding: '14px 28px',
            fontSize: 15, fontWeight: 600, cursor: 'pointer',
            fontFamily: 'var(--font-family)',
            transition: 'border-color 200ms ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#111111' }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E0E0E0' }}
        >
          커리큘럼 탐색
        </button>
      </div>
    </section>
  )
}
