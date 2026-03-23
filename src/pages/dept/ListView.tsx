import { useState, useMemo, type MouseEvent } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'
import type { Course } from '../../types'
import SearchInput from '../../components/ui/SearchInput'
import Badge from '../../components/ui/Badge'

interface ListViewProps {
  courses: Course[]
  completed: Set<string>
  onToggle: (id: string, e: MouseEvent) => void
  onSelect: (course: Course) => void
  selectedCourseId: string | null
}

type SortKey = 'name' | 'year' | 'credits' | 'category'
type SortDir = 'asc' | 'desc'

export default function ListView({ courses, completed, onToggle, onSelect, selectedCourseId }: ListViewProps) {
  const [query, setQuery] = useState('')
  const [filterYear, setFilterYear] = useState<number | ''>('')
  const [filterSem, setFilterSem] = useState<number | ''>('')
  const [filterCat, setFilterCat] = useState<'' | 'required' | 'elective'>('')
  const [capsOnly, setCapsOnly] = useState(false)
  const [sortKey, setSortKey] = useState<SortKey>('year')
  const [sortDir, setSortDir] = useState<SortDir>('asc')

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    else { setSortKey(key); setSortDir('asc') }
  }

  const filtered = useMemo(() => {
    let list = [...courses]
    if (query) list = list.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()) || c.nameEng.toLowerCase().includes(query.toLowerCase()))
    if (filterYear !== '') list = list.filter((c) => c.year === filterYear)
    if (filterSem !== '') list = list.filter((c) => c.semester === filterSem)
    if (filterCat !== '') list = list.filter((c) => c.category === filterCat)
    if (capsOnly) list = list.filter((c) => c.isCapstone)

    list.sort((a, b) => {
      let cmp = 0
      if (sortKey === 'name') cmp = a.name.localeCompare(b.name, 'ko')
      else if (sortKey === 'year') cmp = a.year - b.year || a.semester - b.semester
      else if (sortKey === 'credits') cmp = a.credits - b.credits
      else if (sortKey === 'category') cmp = a.category.localeCompare(b.category)
      return sortDir === 'asc' ? cmp : -cmp
    })
    return list
  }, [courses, query, filterYear, filterSem, filterCat, capsOnly, sortKey, sortDir])

  const SortIcon = ({ col }: { col: SortKey }) =>
    sortKey !== col ? null : sortDir === 'asc' ? (
      <ChevronUp size={13} />
    ) : (
      <ChevronDown size={13} />
    )

  const thStyle: React.CSSProperties = {
    padding: '0 12px',
    fontFamily: 'var(--font-family)',
    fontSize: 12,
    fontWeight: 500,
    color: 'var(--color-text-secondary)',
    textAlign: 'left',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    userSelect: 'none',
  }

  return (
    <div>
      {/* 필터 바 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          flexWrap: 'wrap',
          marginBottom: 16,
        }}
      >
        {/* 드롭다운들 */}
        {([
          { label: '전체 학년', value: filterYear, set: setFilterYear, options: [1,2,3,4].map(y=>({ label:`${y}학년`, value:y })) },
          { label: '전체 학기', value: filterSem, set: setFilterSem, options: [1,2].map(s=>({ label:`${s}학기`, value:s })) },
        ] as const).map(({ label, value, set, options }) => (
          // @ts-ignore
          <select
            key={label}
            value={value}
            // @ts-ignore
            onChange={(e) => set(e.target.value === '' ? '' : Number(e.target.value))}
            style={selectStyle}
          >
            <option value="">{label}</option>
            {options.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        ))}

        <select value={filterCat} onChange={(e) => setFilterCat(e.target.value as '' | 'required' | 'elective')} style={selectStyle}>
          <option value="">전체 이수구분</option>
          <option value="required">필수</option>
          <option value="elective">선택</option>
        </select>

        <button
          onClick={() => setCapsOnly((v) => !v)}
          style={{
            height: 36,
            padding: '0 12px',
            borderRadius: 8,
            border: `1px solid ${capsOnly ? 'var(--color-accent-amber)' : 'var(--color-border)'}`,
            background: capsOnly ? 'var(--color-accent-amber-light)' : 'var(--color-bg-card)',
            color: capsOnly ? 'var(--color-accent-amber)' : 'var(--color-text-secondary)',
            fontFamily: 'var(--font-family)',
            fontSize: 13,
            fontWeight: capsOnly ? 500 : 400,
            cursor: 'pointer',
            transition: 'all 150ms',
          }}
        >
          캡스톤만
        </button>

        {/* 검색 */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontFamily: 'var(--font-family)', fontSize: 13, color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>
            총 {filtered.length}개
          </span>
          <SearchInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="과목명 검색..."
            containerStyle={{ width: 240 }}
          />
        </div>
      </div>

      {/* 테이블 */}
      <div
        style={{
          background: 'var(--color-bg-card)',
          border: '1px solid var(--color-border)',
          borderRadius: 14,
          overflow: 'hidden',
        }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
            <thead>
              <tr
                style={{
                  background: 'var(--color-bg-primary)',
                  borderBottom: '1px solid var(--color-border)',
                  height: 44,
                }}
              >
                <th style={{ width: 48, ...thStyle }}>이수</th>
                <th style={{ minWidth: 200, ...thStyle }} onClick={() => handleSort('name')}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>교과목명 <SortIcon col="name" /></div>
                </th>
                <th style={{ width: 60, ...thStyle, textAlign: 'center' }} onClick={() => handleSort('year')}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3 }}>학년 <SortIcon col="year" /></div>
                </th>
                <th style={{ width: 60, ...thStyle, textAlign: 'center' }}>학기</th>
                <th style={{ width: 64, ...thStyle, textAlign: 'center' }} onClick={() => handleSort('credits')}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3 }}>학점 <SortIcon col="credits" /></div>
                </th>
                <th style={{ width: 80, ...thStyle, textAlign: 'center' }}>이론/실습</th>
                <th style={{ width: 80, ...thStyle, textAlign: 'center' }} onClick={() => handleSort('category')}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3 }}>이수구분 <SortIcon col="category" /></div>
                </th>
                <th style={{ width: 110, ...thStyle }}>비고</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    style={{
                      textAlign: 'center',
                      padding: '48px 0',
                      fontFamily: 'var(--font-family)',
                      fontSize: 14,
                      color: 'var(--color-text-muted)',
                    }}
                  >
                    검색 결과가 없습니다.
                  </td>
                </tr>
              ) : (
                filtered.map((c) => {
                  const done = completed.has(c.id)
                  const isSelected = c.id === selectedCourseId
                  return (
                    <tr
                      key={c.id}
                      style={{
                        height: 48,
                        borderBottom: '1px solid var(--color-border)',
                        background: isSelected ? '#F5F5F5' : done ? '#F5F5F5' : 'transparent',
                        outline: isSelected ? '2px solid #111111' : 'none',
                        outlineOffset: '-1px',
                        transition: 'background 150ms',
                      }}
                      onMouseEnter={(e) => {
                        if (!done && !isSelected) e.currentTarget.style.background = '#F8FAFC'
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) e.currentTarget.style.background = done ? '#F5F5F5' : 'transparent'
                      }}
                    >
                      {/* 이수 체크박스 */}
                      <td style={{ padding: '0 12px', textAlign: 'center' }}>
                        <span
                          role="checkbox"
                          aria-checked={done}
                          tabIndex={0}
                          onClick={(e) => onToggle(c.id, e)}
                          onKeyDown={(e) => {
                            if (e.key === ' ' || e.key === 'Enter') {
                              e.preventDefault()
                              onToggle(c.id, e as unknown as MouseEvent)
                            }
                          }}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 20,
                            height: 20,
                            borderRadius: 6,
                            border: `1.5px solid ${done ? '#111111' : 'var(--color-border)'}`,
                            background: done ? '#111111' : 'transparent',
                            cursor: 'pointer',
                            transition: 'all 150ms',
                          }}
                        >
                          {done && (
                            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                              <path d="M2 5.5L4.5 8L9 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </span>
                      </td>

                      {/* 교과목명 */}
                      <td style={{ padding: '0 12px' }}>
                        <button
                          onClick={() => onSelect(c)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontFamily: 'var(--font-family)',
                            fontSize: 14,
                            fontWeight: 500,
                            color: done ? '#111111' : 'var(--color-text-primary)',
                            textAlign: 'left',
                            padding: 0,
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                          onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
                        >
                          {c.name}
                        </button>
                      </td>

                      <td style={{ padding: '0 12px', textAlign: 'center', fontFamily: 'var(--font-family)', fontSize: 13, color: 'var(--color-text-secondary)' }}>
                        {c.year}학년
                      </td>
                      <td style={{ padding: '0 12px', textAlign: 'center', fontFamily: 'var(--font-family)', fontSize: 13, color: 'var(--color-text-secondary)' }}>
                        {c.semester === 0 ? '전학기' : `${c.semester}학기`}
                      </td>
                      <td style={{ padding: '0 12px', textAlign: 'center', fontFamily: 'var(--font-family)', fontSize: 13, color: 'var(--color-text-secondary)' }}>
                        {c.credits}학점
                      </td>
                      <td style={{ padding: '0 12px', textAlign: 'center', fontFamily: 'var(--font-family)', fontSize: 13, color: 'var(--color-text-secondary)' }}>
                        {c.theory}/{c.practice}
                      </td>
                      <td style={{ padding: '0 12px', textAlign: 'center' }}>
                        <Badge variant={c.category === 'required' ? 'required' : 'elective'}>
                          {c.category === 'required' ? '필수' : '선택'}
                        </Badge>
                      </td>
                      <td style={{ padding: '0 12px' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                          {c.isCapstone && <Badge variant="amber">캡스톤</Badge>}
                          {c.prerequisite && (
                            <span style={{ fontFamily: 'var(--font-family)', fontSize: 11, color: 'var(--color-accent-red)' }}>
                              선수과목 있음
                            </span>
                          )}
                          {c.note && (
                            <span style={{ fontFamily: 'var(--font-family)', fontSize: 11, color: 'var(--color-text-muted)' }}>
                              {c.note}
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

const selectStyle: React.CSSProperties = {
  height: 36,
  padding: '0 10px',
  borderRadius: 8,
  border: '1px solid var(--color-border)',
  background: 'var(--color-bg-card)',
  fontFamily: 'var(--font-family)',
  fontSize: 13,
  color: 'var(--color-text-secondary)',
  cursor: 'pointer',
  outline: 'none',
}
