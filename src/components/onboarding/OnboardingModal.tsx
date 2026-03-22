import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, Check } from 'lucide-react'
import { departments } from '../../data'
import { useStore } from '../../store/useStore'
import { useToast } from '../../hooks/useToast'

const DEPT_COLORS: Record<string, string> = {
  'industrial-design': '#2563EB', 'visual-design': '#8B5CF6',
  'metal-craft': '#F59E0B', 'ceramic-craft': '#EC4899',
  'fashion-design': '#06B6D4', 'spatial-design': '#10B981',
  'moving-image': '#EF4444', 'automotive-design': '#F97316', 'ai-design': '#6366F1',
}

interface OnboardingModalProps {
  onComplete: () => void
}

export default function OnboardingModal({ onComplete }: OnboardingModalProps) {
  const [step, setStep] = useState(0)
  const [nickname, setNicknameLocal] = useState('')
  const [selectedDept, setSelectedDept] = useState<string>('')
  const [selectedYear, setSelectedYear] = useState<number>(1)
  const [selectedSem, setSelectedSem] = useState<1 | 2>(1)
  const [bulkYears, setBulkYears] = useState<number[]>([])
  const [bulkFirstSem, setBulkFirstSem] = useState(false)
  const firstFocusRef = useRef<HTMLButtonElement>(null)
  const nicknameInputRef = useRef<HTMLInputElement>(null)
  const toast = useToast()
  const { selectDepartment, setStudentProgress, bulkComplete, setNickname } = useStore()

  useEffect(() => {
    if (step === 0) {
      setTimeout(() => nicknameInputRef.current?.focus(), 50)
    } else {
      setTimeout(() => firstFocusRef.current?.focus(), 50)
    }
  }, [step])

  const handleComplete = () => {
    setNickname(nickname.trim())
    selectDepartment(selectedDept)
    setStudentProgress({
      departmentId: selectedDept,
      completedCourseIds: [],
      currentYear: selectedYear,
      currentSemester: selectedSem,
    })
    if (bulkYears.length > 0 || bulkFirstSem) {
      const dept = departments.find((d) => d.id === selectedDept)
      if (dept) {
        const ids = dept.courses
          .filter((c) => {
            if (bulkYears.includes(c.year)) return true
            if (bulkFirstSem && c.year === selectedYear && c.semester === 1) return true
            return false
          })
          .map((c) => c.id)
        bulkComplete(ids)
      }
    }
    onComplete()
    toast.success('설정이 완료되었습니다. 커리큘럼을 확인해보세요.')
  }

  const steps = [
    { title: '닉네임을 입력해주세요', sub: '대시보드에서 사용할 이름입니다.' },
    { title: '소속 학과를 선택해주세요', sub: '선택한 학과를 기준으로 커리큘럼과 이수 현황을 제공합니다.' },
    { title: '현재 학년과 학기를 선택해주세요', sub: '현재 학년/학기를 기준으로 추천 과목을 안내합니다.' },
    { title: '이미 이수한 학년이 있나요?', sub: '해당 학년의 전체 과목을 이수 완료로 표시합니다. 나중에 개별 수정 가능합니다.' },
  ]

  const canNext =
    step === 0 ? nickname.trim().length > 0 :
    step === 1 ? !!selectedDept :
    true

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-title"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.45)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        style={{
          width: 480,
          maxWidth: '100%',
          background: 'var(--color-bg-card)',
          borderRadius: 16,
          padding: '32px',
          boxShadow: '0 24px 48px rgba(0,0,0,0.18)',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        {/* 스텝 인디케이터 */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
          {steps.map((_, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: 4,
                borderRadius: 2,
                background: i <= step ? 'var(--color-accent-blue)' : 'var(--color-border)',
                transition: 'background 300ms',
              }}
            />
          ))}
        </div>

        {/* 제목 */}
        <h2
          id="onboarding-title"
          style={{
            font: 'var(--font-heading-lg)',
            fontFamily: 'var(--font-family)',
            color: 'var(--color-text-primary)',
            marginBottom: 6,
          }}
        >
          {steps[step].title}
        </h2>
        <p style={{ font: 'var(--font-body-sm)', fontFamily: 'var(--font-family)', color: 'var(--color-text-secondary)', marginBottom: 24 }}>
          {steps[step].sub}
        </p>

        {/* 스텝 콘텐츠 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.18 }}
          >
            {step === 0 && (
              <input
                ref={nicknameInputRef}
                type="text"
                value={nickname}
                onChange={(e) => setNicknameLocal(e.target.value.slice(0, 10))}
                placeholder="닉네임 입력"
                maxLength={10}
                onKeyDown={(e) => { if (e.key === 'Enter' && canNext) setStep(1) }}
                style={{
                  width: '100%',
                  height: 48,
                  border: '1px solid var(--color-border)',
                  borderRadius: 10,
                  padding: '0 16px',
                  fontFamily: 'var(--font-family)',
                  fontSize: 15,
                  color: 'var(--color-text-primary)',
                  outline: 'none',
                  background: 'var(--color-bg-primary)',
                  transition: 'border-color 150ms',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-accent-blue)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--color-border)')}
              />
            )}
            {step === 1 && (
              <DeptGrid
                selected={selectedDept}
                onSelect={setSelectedDept}
                firstRef={firstFocusRef}
              />
            )}
            {step === 2 && (
              <YearSemSelect
                year={selectedYear}
                sem={selectedSem}
                onYear={setSelectedYear}
                onSem={setSelectedSem}
                firstRef={firstFocusRef}
              />
            )}
            {step === 3 && (
              <BulkSelect
                deptId={selectedDept}
                currentYear={selectedYear}
                currentSemester={selectedSem}
                selected={bulkYears}
                onToggle={(y) =>
                  setBulkYears((prev) =>
                    prev.includes(y) ? prev.filter((x) => x !== y) : [...prev, y]
                  )
                }
                firstSemChecked={bulkFirstSem}
                onToggleFirstSem={() => setBulkFirstSem((v) => !v)}
                firstRef={firstFocusRef}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* 하단 버튼 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 28 }}>
          <button
            onClick={() => step > 0 && setStep((s) => s - 1)}
            style={{
              height: 40,
              padding: '0 16px',
              borderRadius: 10,
              border: '1px solid var(--color-border)',
              background: 'transparent',
              cursor: step === 0 ? 'default' : 'pointer',
              fontFamily: 'var(--font-family)',
              fontSize: 14,
              color: step === 0 ? 'var(--color-border)' : 'var(--color-text-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              transition: 'all 150ms',
            }}
          >
            <ChevronLeft size={16} />
            이전
          </button>

          <div style={{ display: 'flex', gap: 8 }}>
            {step === steps.length - 1 && (
              <button
                onClick={handleComplete}
                style={{
                  height: 40,
                  padding: '0 16px',
                  borderRadius: 10,
                  border: '1px solid var(--color-border)',
                  background: 'transparent',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-family)',
                  fontSize: 14,
                  color: 'var(--color-text-secondary)',
                  transition: 'all 150ms',
                }}
              >
                건너뛰기
              </button>
            )}
            <button
              onClick={() => {
                if (!canNext) return
                if (step < steps.length - 1) setStep((s) => s + 1)
                else handleComplete()
              }}
              disabled={!canNext}
              style={{
                height: 40,
                padding: '0 20px',
                borderRadius: 10,
                border: 'none',
                background: canNext ? 'var(--color-accent-blue)' : 'var(--color-border)',
                color: canNext ? '#fff' : 'var(--color-text-muted)',
                cursor: canNext ? 'pointer' : 'default',
                fontFamily: 'var(--font-family)',
                fontSize: 14,
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                transition: 'all 150ms',
              }}
            >
              {step === steps.length - 1 ? (
                <><Check size={15} /> 완료</>
              ) : (
                <>다음 <ChevronRight size={15} /></>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

/* ── 학과 그리드 ── */
function DeptGrid({
  selected, onSelect, firstRef,
}: {
  selected: string
  onSelect: (id: string) => void
  firstRef: React.RefObject<HTMLButtonElement | null>
}) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
      {departments.map((dept, i) => {
        const color = DEPT_COLORS[dept.id] ?? '#64748B'
        const isSelected = selected === dept.id
        return (
          <button
            key={dept.id}
            ref={i === 0 ? firstRef : undefined}
            onClick={() => onSelect(dept.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
              padding: '14px 8px',
              borderRadius: 10,
              border: `2px solid ${isSelected ? color : 'var(--color-border)'}`,
              background: isSelected ? `${color}12` : 'var(--color-bg-primary)',
              cursor: 'pointer',
              transition: 'all 150ms',
            }}
            onMouseEnter={(e) => {
              if (!isSelected) e.currentTarget.style.borderColor = color
            }}
            onMouseLeave={(e) => {
              if (!isSelected) e.currentTarget.style.borderColor = 'var(--color-border)'
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-family)',
                fontSize: 11,
                fontWeight: isSelected ? 600 : 400,
                color: isSelected ? color : 'var(--color-text-secondary)',
                textAlign: 'center',
                lineHeight: '16px',
              }}
            >
              {dept.shortName}
            </span>
          </button>
        )
      })}
    </div>
  )
}

/* ── 학년/학기 선택 ── */
function YearSemSelect({
  year, sem, onYear, onSem, firstRef,
}: {
  year: number
  sem: 1 | 2
  onYear: (y: number) => void
  onSem: (s: 1 | 2) => void
  firstRef: React.RefObject<HTMLButtonElement | null>
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <p style={{ fontFamily: 'var(--font-family)', fontSize: 13, fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 10 }}>학년</p>
        <div style={{ display: 'flex', gap: 8 }}>
          {[1, 2, 3, 4].map((y, i) => (
            <button
              key={y}
              ref={i === 0 ? firstRef : undefined}
              onClick={() => onYear(y)}
              style={{
                flex: 1,
                height: 44,
                borderRadius: 10,
                border: `2px solid ${year === y ? 'var(--color-accent-blue)' : 'var(--color-border)'}`,
                background: year === y ? 'var(--color-accent-blue-light)' : 'var(--color-bg-primary)',
                color: year === y ? 'var(--color-accent-blue)' : 'var(--color-text-secondary)',
                fontFamily: 'var(--font-family)',
                fontSize: 14,
                fontWeight: year === y ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 150ms',
              }}
            >
              {y}학년
            </button>
          ))}
        </div>
      </div>
      <div>
        <p style={{ fontFamily: 'var(--font-family)', fontSize: 13, fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 10 }}>학기</p>
        <div style={{ display: 'flex', gap: 8 }}>
          {([1, 2] as const).map((s) => (
            <button
              key={s}
              onClick={() => onSem(s)}
              style={{
                flex: 1,
                height: 44,
                borderRadius: 10,
                border: `2px solid ${sem === s ? 'var(--color-accent-blue)' : 'var(--color-border)'}`,
                background: sem === s ? 'var(--color-accent-blue-light)' : 'var(--color-bg-primary)',
                color: sem === s ? 'var(--color-accent-blue)' : 'var(--color-text-secondary)',
                fontFamily: 'var(--font-family)',
                fontSize: 14,
                fontWeight: sem === s ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 150ms',
              }}
            >
              {s}학기
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── 일괄 이수 선택 ── */
function BulkSelect({
  currentYear, currentSemester, selected, onToggle, firstSemChecked, onToggleFirstSem, firstRef,
}: {
  deptId?: string
  currentYear: number
  currentSemester: 1 | 2
  selected: number[]
  onToggle: (y: number) => void
  firstSemChecked: boolean
  onToggleFirstSem: () => void
  firstRef: React.RefObject<HTMLButtonElement | null>
}) {
  const prevYears = Array.from({ length: Math.max(0, currentYear - 1) }, (_, i) => i + 1)
  const showFirstSem = currentSemester === 2

  if (prevYears.length === 0 && !showFirstSem) {
    return (
      <p style={{ fontFamily: 'var(--font-family)', fontSize: 14, color: 'var(--color-text-muted)', textAlign: 'center', padding: '20px 0' }}>
        1학년이므로 이전 이수 학년이 없습니다.
      </p>
    )
  }

  const CheckBtn = ({
    isChecked, onClick, label, refProp,
  }: { isChecked: boolean; onClick: () => void; label: string; refProp?: React.RefObject<HTMLButtonElement | null> }) => (
    <button
      ref={refProp}
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '14px 16px', borderRadius: 10,
        border: `1.5px solid ${isChecked ? 'var(--color-accent-green)' : 'var(--color-border)'}`,
        background: isChecked ? 'var(--color-accent-green-light)' : 'var(--color-bg-primary)',
        cursor: 'pointer', transition: 'all 150ms',
      }}
    >
      <span style={{
        width: 22, height: 22, borderRadius: 6,
        border: `2px solid ${isChecked ? 'var(--color-accent-green)' : 'var(--color-border)'}`,
        background: isChecked ? 'var(--color-accent-green)' : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, transition: 'all 150ms',
      }}>
        {isChecked && <Check size={13} color="#fff" strokeWidth={3} />}
      </span>
      <span style={{
        fontFamily: 'var(--font-family)', fontSize: 14, fontWeight: 500,
        color: isChecked ? 'var(--color-accent-green)' : 'var(--color-text-primary)',
      }}>
        {label}
      </span>
    </button>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {prevYears.map((y, i) => (
        <CheckBtn
          key={y}
          isChecked={selected.includes(y)}
          onClick={() => onToggle(y)}
          label={`${y}학년 전체 이수완료`}
          refProp={i === 0 ? firstRef : undefined}
        />
      ))}
      {showFirstSem && (
        <CheckBtn
          isChecked={firstSemChecked}
          onClick={onToggleFirstSem}
          label={`${currentYear}학년 1학기 이수완료`}
          refProp={prevYears.length === 0 ? firstRef : undefined}
        />
      )}
    </div>
  )
}
