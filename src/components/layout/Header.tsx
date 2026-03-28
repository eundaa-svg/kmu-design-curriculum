import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchInput from '../ui/SearchInput'
import { useStore } from '../../store/useStore'

export default function Header() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const { nickname, myDepartmentId, departments } = useStore()

  const dept = departments.find(d => d.id === myDepartmentId)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  const displayName = nickname.trim() ? nickname.trim() : '학생'

  return (
    <header
      style={{
        height: 64,
        background: 'rgba(255,255,255,0.82)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,0,0,0.07)',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '0 32px',
        flexShrink: 0,
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Left */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontFamily: 'var(--font-family)',
            fontSize: 18,
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            lineHeight: 1.2,
          }}
        >
          안녕하세요, {displayName}님
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
          <p
            style={{
              fontFamily: 'var(--font-family)',
              fontSize: 13,
              color: '#8B95A1',
            }}
          >
            {dept ? dept.name : '학과를 선택해주세요'}
          </p>
          <button
            onClick={() => navigate('/settings')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-family)',
              fontSize: 12,
              color: '#111111',
              padding: 0,
              lineHeight: 1,
            }}
          >
            {dept ? '변경' : '설정'}
          </button>
        </div>
      </div>

      {/* Center search */}
      <form
        onSubmit={handleSearch}
        style={{ width: 400, maxWidth: '40%', flexShrink: 0 }}
      >
        <SearchInput
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="교과목명, 키워드로 검색..."
        />
      </form>

      {/* Right actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {/* Avatar */}
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'var(--color-accent-blue-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-accent-blue)',
            fontFamily: 'var(--font-family)',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          {displayName.slice(0, 1)}
        </div>
      </div>
    </header>
  )
}
