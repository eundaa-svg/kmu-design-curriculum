import { useState } from 'react'
import { Bell } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import SearchInput from '../ui/SearchInput'

export default function Header() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <header
      style={{
        height: 64,
        background: 'var(--color-bg-primary)',
        borderBottom: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '0 32px',
        flexShrink: 0,
      }}
    >
      {/* Left */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            font: 'var(--font-heading-md)',
            fontFamily: 'var(--font-family)',
            color: 'var(--color-text-primary)',
            lineHeight: 1.2,
          }}
        >
          안녕하세요, 학생님
        </p>
        <p
          style={{
            font: 'var(--font-body-sm)',
            fontFamily: 'var(--font-family)',
            color: 'var(--color-text-secondary)',
            marginTop: 1,
          }}
        >
          {today}
        </p>
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
        {/* Bell */}
        <button
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-text-secondary)',
            transition: 'background 150ms',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#F1F5F9')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          title="알림"
        >
          <Bell size={20} />
        </button>

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
          학
        </div>
      </div>
    </header>
  )
}
