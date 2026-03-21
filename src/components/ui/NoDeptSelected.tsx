import { BookOpen } from 'lucide-react'
import { departments } from '../../data'
import { useStore } from '../../store/useStore'
import { useNavigate } from 'react-router-dom'

interface NoDeptSelectedProps {
  title?: string
  desc?: string
}

export default function NoDeptSelected({
  title = '학과를 먼저 선택해주세요',
  desc = '학과를 선택하면 커리큘럼 기반 이수 현황을 확인할 수 있습니다.',
}: NoDeptSelectedProps) {
  const { selectDepartment } = useStore()
  const navigate = useNavigate()

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px',
        textAlign: 'center',
      }}
    >
      <BookOpen
        size={64}
        style={{ color: 'var(--color-text-muted)', marginBottom: 20 }}
      />
      <h2
        style={{
          font: 'var(--font-heading-md)',
          fontFamily: 'var(--font-family)',
          color: 'var(--color-text-primary)',
          marginBottom: 8,
        }}
      >
        {title}
      </h2>
      <p
        style={{
          font: 'var(--font-body-sm)',
          fontFamily: 'var(--font-family)',
          color: 'var(--color-text-secondary)',
          marginBottom: 28,
          maxWidth: 360,
        }}
      >
        {desc}
      </p>
      <select
        onChange={(e) => {
          if (!e.target.value) return
          selectDepartment(e.target.value)
          navigate(`/department/${e.target.value}`)
        }}
        defaultValue=""
        style={{
          height: 44,
          padding: '0 16px',
          borderRadius: 10,
          border: '1px solid var(--color-border)',
          background: 'var(--color-bg-card)',
          fontFamily: 'var(--font-family)',
          fontSize: 15,
          color: 'var(--color-text-primary)',
          cursor: 'pointer',
          outline: 'none',
          minWidth: 240,
        }}
      >
        <option value="" disabled>학과 선택...</option>
        {departments.map((d) => (
          <option key={d.id} value={d.id}>{d.name}</option>
        ))}
      </select>
    </div>
  )
}
