import { useNavigate } from 'react-router-dom'
import { motion, type Variants } from 'framer-motion'
import {
  BookOpen,
  CheckCircle,
  Cpu,
  Eye,
  Gem,
  Coffee,
  Shirt,
  Home,
  Film,
  Car,
  Brain,
  ArrowRight,
  Info,
  TrendingUp,
  GraduationCap,
} from 'lucide-react'
import { departments } from '../data'
import { useStore } from '../store/useStore'
import { useDepartment } from '../hooks/useDepartment'
import { useCountUp } from '../hooks/useCountUp'
import Card from '../components/ui/Card'
import ProgressCircle from '../components/ui/ProgressCircle'

/* ─── 학과별 Lucide 아이콘 + 색상 매핑 ─── */
const DEPT_META: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  'industrial-design':   { icon: <Cpu size={20} />,    color: '#FF0017', bg: 'rgba(255,0,23,0.15)' },
  'visual-design':       { icon: <Eye size={20} />,    color: '#FF006A', bg: 'rgba(255,0,106,0.15)' },
  'metal-craft':         { icon: <Gem size={20} />,    color: '#FFC900', bg: 'rgba(255,201,0,0.15)' },
  'ceramic-craft':       { icon: <Coffee size={20} />, color: '#FF7700', bg: 'rgba(255,119,0,0.15)' },
  'fashion-design':      { icon: <Shirt size={20} />,  color: '#8E008E', bg: 'rgba(142,0,142,0.15)' },
  'spatial-design':      { icon: <Home size={20} />,   color: '#008AC2', bg: 'rgba(0,138,194,0.15)' },
  'moving-image-design': { icon: <Film size={20} />,   color: '#00BCB5', bg: 'rgba(0,188,181,0.15)' },
  'automotive-design':   { icon: <Car size={20} />,    color: '#2B50B6', bg: 'rgba(43,80,182,0.15)' },
  'ai-design':           { icon: <Brain size={20} />,  color: '#00FF00', bg: 'rgba(0,255,0,0.15)' },
}

/* ─── Framer Motion variants ─── */
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
}
const deptContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
}


/* ─────────────────────────────────────── */
export default function DashboardHome() {
  const navigate = useNavigate()
  const { selectedDepartmentId, studentProgress } = useStore()
  const department = useDepartment(selectedDepartmentId)

  const completedCount = studentProgress?.completedCourseIds.length ?? 0
  const deptTotalCourses = department?.courses.length ?? 0
  const achievePct =
    deptTotalCourses > 0 ? (completedCount / deptTotalCourses) * 100 : 0

  /* CountUp */
  const countCompleted = useCountUp(completedCount, 800)
  const countPct = useCountUp(achievePct, 800, 1)

  return (
    <div className="page-enter" style={{ maxWidth: 1120, margin: '0 auto' }}>

      {/* ══════════════════════════════════════
          섹션 1: 요약 통계 카드
      ══════════════════════════════════════ */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 16,
        }}
        className="stats-grid"
      >
        {/* C: 이수 완료 */}
        <motion.div variants={cardVariants}>
          <StatCard
            icon={<CheckCircle size={20} />}
            iconColor="var(--color-accent-green)"
            iconBg="var(--color-accent-green-light)"
            value={countCompleted}
            unit="과목"
            label="이수 완료"
            sub={completedCount === 0 ? '과목을 체크하세요' : undefined}
          />
        </motion.div>

        {/* D: 이수율 — 원형 프로그레스 */}
        <motion.div variants={cardVariants}>
          <Card style={{ height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              {department ? (
                <ProgressCircle
                  value={achievePct}
                  size={52}
                  strokeWidth={5}
                  color="var(--color-accent-green)"
                />
              ) : (
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: '50%',
                    background: 'var(--color-bg-primary)',
                    border: '5px solid var(--color-border)',
                    flexShrink: 0,
                  }}
                />
              )}
              <div>
                <p
                  style={{
                    font: 'var(--font-heading-lg)',
                    fontFamily: 'var(--font-family)',
                    color: 'var(--color-text-primary)',
                    lineHeight: 1,
                    marginBottom: 4,
                  }}
                >
                  {department ? `${countPct}%` : '—'}
                </p>
                <p
                  style={{
                    font: 'var(--font-body-sm)',
                    fontFamily: 'var(--font-family)',
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  달성률
                </p>
                {!department && (
                  <p
                    style={{
                      font: 'var(--font-body-sm)',
                      fontFamily: 'var(--font-family)',
                      color: 'var(--color-text-muted)',
                      marginTop: 3,
                      fontSize: 11,
                    }}
                  >
                    학과를 먼저 선택하세요
                  </p>
                )}
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* ══════════════════════════════════════
          섹션 2: 학과 그리드
      ══════════════════════════════════════ */}
      <div style={{ marginTop: 36 }}>
        {/* 섹션 헤더 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 16,
          }}
        >
          <h2
            style={{
              font: 'var(--font-heading-lg)',
              fontFamily: 'var(--font-family)',
              color: 'var(--color-text-primary)',
            }}
          >
            학과별 커리큘럼
          </h2>
          <button
            onClick={() => navigate('/department')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              fontFamily: 'var(--font-family)',
              fontSize: 14,
              color: 'var(--color-accent-blue)',
              fontWeight: 500,
              padding: '4px 0',
            }}
          >
            전체 보기
            <ArrowRight size={15} />
          </button>
        </div>

        {/* 학과 카드 그리드 */}
        <motion.div
          variants={deptContainerVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 16,
          }}
          className="dept-grid"
        >
          {departments.map((dept) => {
            const meta = DEPT_META[dept.id] ?? {
              icon: <BookOpen size={20} />,
              color: '#64748B',
              bg: '#F1F5F9',
            }
            const requiredCount = dept.courses.filter((c) => c.category === 'required').length
            const capstoneCount = dept.courses.filter((c) => c.isCapstone).length

            return (
              <motion.div key={dept.id} variants={cardVariants}>
                <DeptCard
                  dept={dept}
                  meta={meta}
                  requiredCount={requiredCount}
                  capstoneCount={capstoneCount}
                  isSelected={selectedDepartmentId === dept.id}
                  onClick={() => navigate(`/department/${dept.id}`)}
                />
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* ══════════════════════════════════════
          섹션 3: 공통 안내사항
      ══════════════════════════════════════ */}
      <div style={{ marginTop: 32 }}>
        <div
          style={{
            background: 'var(--color-accent-blue-light)',
            borderLeft: '4px solid var(--color-accent-blue)',
            borderRadius: 14,
            padding: '20px 24px',
          }}
        >
          <p
            style={{
              font: 'var(--font-body-base)',
              fontFamily: 'var(--font-family)',
              fontWeight: 600,
              color: 'var(--color-accent-blue)',
              marginBottom: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <Info size={16} />
            교과과정 안내
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              '[2025학년도 교과과정 기준] 필수 지정 과목은 반드시 이수하여야 합니다.',
              '[공통 필수] S-TEAM Class와 사제동행세미나 중 1개를 반드시 이수해야 합니다.',
              '[현장실습] 현장실습 학점 인정에 관한 규정에 따라 전공 또는 일반선택으로 인정 가능합니다.',
              '[부전공] 전공과목 중 18학점 이상 이수 필요. [다전공] 필수 지정 과목 포함 최저이수학점 이상 이수 필요.',
            ].map((text, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: 8,
                  padding: '8px 0',
                  borderTop: i === 0 ? 'none' : '1px solid #DBEAFE',
                }}
              >
                <Info
                  size={15}
                  style={{
                    color: 'var(--color-accent-blue)',
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                />
                <p
                  style={{
                    font: 'var(--font-body-sm)',
                    fontFamily: 'var(--font-family)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: '20px',
                  }}
                >
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          섹션 4: 빠른 액션
      ══════════════════════════════════════ */}
      <div
        style={{
          marginTop: 24,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
          paddingBottom: 32,
        }}
        className="quick-grid"
      >
        <QuickActionCard
          icon={<TrendingUp size={22} />}
          iconColor="var(--color-accent-green)"
          iconBg="var(--color-accent-green-light)"
          title="이수 현황 확인하기"
          desc="수강한 과목을 체크하고, 남은 필수 과목을 확인하세요."
          btnLabel="이수 현황 바로가기"
          onClick={() => navigate('/progress')}
        />
        <QuickActionCard
          icon={<GraduationCap size={22} />}
          iconColor="var(--color-accent-indigo)"
          iconBg="#EEF2FF"
          title="졸업 요건 확인하기"
          desc="졸업에 필요한 필수 과목, 캡스톤, 학점 요건을 점검하세요."
          btnLabel="졸업 요건 바로가기"
          onClick={() => navigate('/graduation')}
        />
      </div>

      {/* 반응형 CSS */}
      <style>{`
        @media (max-width: 1023px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .dept-grid  { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 767px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .dept-grid  { grid-template-columns: 1fr !important; }
          .quick-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}

/* ─────────────────────────────────────── */
/* 요약 통계 카드 */
interface StatCardProps {
  icon: React.ReactNode
  iconColor: string
  iconBg: string
  value: string
  unit: string
  label: string
  sub?: string
}
function StatCard({ icon, iconColor, iconBg, value, unit, label, sub }: StatCardProps) {
  return (
    <Card style={{ height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: iconBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: iconColor,
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
            <span
              style={{
                font: 'var(--font-heading-lg)',
                fontFamily: 'var(--font-family)',
                color: 'var(--color-text-primary)',
                lineHeight: 1,
              }}
            >
              {value}
            </span>
            <span
              style={{
                font: 'var(--font-body-sm)',
                fontFamily: 'var(--font-family)',
                color: 'var(--color-text-secondary)',
              }}
            >
              {unit}
            </span>
          </div>
          <p
            style={{
              font: 'var(--font-body-sm)',
              fontFamily: 'var(--font-family)',
              color: 'var(--color-text-secondary)',
              marginTop: 3,
            }}
          >
            {label}
          </p>
          {sub && (
            <p
              style={{
                font: 'var(--font-body-sm)',
                fontFamily: 'var(--font-family)',
                color: 'var(--color-text-muted)',
                fontSize: 11,
                marginTop: 2,
              }}
            >
              {sub}
            </p>
          )}
        </div>
      </div>
    </Card>
  )
}

/* ─────────────────────────────────────── */
/* 학과 카드 */
interface DeptCardProps {
  dept: (typeof departments)[0]
  meta: { icon: React.ReactNode; color: string; bg: string }
  requiredCount: number
  capstoneCount: number
  isSelected: boolean
  onClick: () => void
}
function DeptCard({ dept, meta, requiredCount, capstoneCount, isSelected, onClick }: DeptCardProps) {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      style={{
        background: '#111111',
        border: `1px solid ${isSelected ? meta.color : '#222222'}`,
        borderRadius: 14,
        boxShadow: isSelected
          ? `0 4px 16px ${meta.color}33`
          : '0 2px 8px rgba(0,0,0,0.2)',
        padding: '20px',
        cursor: 'pointer',
        transition: 'box-shadow 200ms ease, border-color 200ms ease, transform 200ms ease',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        el.style.borderColor = meta.color
        el.style.boxShadow = `0 4px 16px ${meta.color}33`
        el.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.borderColor = isSelected ? meta.color : '#222222'
        el.style.boxShadow = isSelected
          ? `0 4px 16px ${meta.color}33`
          : '0 2px 8px rgba(0,0,0,0.2)'
        el.style.transform = 'translateY(0)'
      }}
    >
      {/* 상단: 아이콘 + 이름 */}
      <div style={{ paddingBottom: 16 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: meta.bg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: meta.color,
            marginBottom: 12,
          }}
        >
          {meta.icon}
        </div>
        <p
          style={{
            font: 'var(--font-heading-md)',
            fontFamily: 'var(--font-family)',
            color: meta.color,
            marginBottom: 2,
          }}
        >
          {dept.name}
        </p>
        <p
          style={{
            font: 'var(--font-body-sm)',
            fontFamily: 'var(--font-family)',
            color: 'rgba(255,255,255,0.5)',
          }}
        >
          {dept.shortName}
        </p>
      </div>

      {/* 중단: 통계 */}
      <div
        style={{
          display: 'flex',
          gap: 16,
          paddingTop: 12,
          paddingBottom: 16,
          borderTop: '1px solid #2a2a2a',
          flex: 1,
        }}
      >
        <InlineStat label="전체" value={dept.courses.length} unit="과목" valueColor="#FFFFFF" labelColor="rgba(255,255,255,0.4)" />
        <InlineStat label="필수" value={requiredCount} unit="과목" valueColor="#FFFFFF" labelColor="rgba(255,255,255,0.4)" />
        <InlineStat label="캡스톤" value={capstoneCount} unit="과목" valueColor="#FFFFFF" labelColor="rgba(255,255,255,0.4)" />
      </div>

      {/* 하단: CTA */}
      <div
        style={{
          paddingTop: 14,
          borderTop: '1px solid #2a2a2a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span
          style={{
            font: 'var(--font-body-sm)',
            fontFamily: 'var(--font-family)',
            color: meta.color,
            fontWeight: 500,
          }}
        >
          커리큘럼 보기
        </span>
        <ArrowRight size={15} style={{ color: meta.color }} />
      </div>
    </div>
  )
}

function InlineStat({
  label,
  value,
  unit,
  valueColor = 'var(--color-text-secondary)',
  labelColor = 'var(--color-text-muted)',
}: {
  label: string
  value: number
  unit: string
  valueColor?: string
  labelColor?: string
}) {
  return (
    <div>
      <p
        style={{
          font: 'var(--font-label)',
          fontFamily: 'var(--font-family)',
          color: labelColor,
          marginBottom: 3,
        }}
      >
        {label}
      </p>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
        <span
          style={{
            fontFamily: 'var(--font-family)',
            fontSize: 16,
            fontWeight: 600,
            color: valueColor,
          }}
        >
          {value}
        </span>
        <span
          style={{
            font: 'var(--font-label)',
            fontFamily: 'var(--font-family)',
            color: labelColor,
          }}
        >
          {unit}
        </span>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────── */
/* 빠른 액션 카드 */
interface QuickActionCardProps {
  icon: React.ReactNode
  iconColor: string
  iconBg: string
  title: string
  desc: string
  btnLabel: string
  onClick: () => void
}
function QuickActionCard({ icon, iconColor, iconBg, title, desc, btnLabel, onClick }: QuickActionCardProps) {
  return (
    <Card style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: iconBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: iconColor,
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <div>
          <p
            style={{
              font: 'var(--font-body-base)',
              fontFamily: 'var(--font-family)',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
            }}
          >
            {title}
          </p>
          <p
            style={{
              font: 'var(--font-body-sm)',
              fontFamily: 'var(--font-family)',
              color: 'var(--color-text-secondary)',
              marginTop: 3,
            }}
          >
            {desc}
          </p>
        </div>
      </div>
      <button
        onClick={onClick}
        style={{
          alignSelf: 'flex-start',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          height: 36,
          padding: '0 16px',
          borderRadius: 8,
          border: `1px solid ${iconColor}`,
          background: 'transparent',
          color: iconColor,
          fontFamily: 'var(--font-family)',
          fontSize: 13,
          fontWeight: 500,
          cursor: 'pointer',
          transition: 'background 150ms',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = iconBg)}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
      >
        {btnLabel}
        <ArrowRight size={14} />
      </button>
    </Card>
  )
}
