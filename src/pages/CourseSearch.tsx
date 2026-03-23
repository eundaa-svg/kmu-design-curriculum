import { useRef, useState, useEffect, type KeyboardEvent } from 'react'
import { Search, X, SearchX, LayoutGrid, List, SortAsc } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearch, type SortMode, type CourseWithDept } from '../hooks/useSearch'
import { useRecentSearches } from '../hooks/useRecentSearches'
import { useStore } from '../store/useStore'
import { departments } from '../data'
import type { Course } from '../types'
import { FilterChip, CheckOption, RadioOption, ToggleChip } from '../components/search/FilterChip'
import Highlight from '../components/search/Highlight'
import CourseDetailPanel from '../components/course/CourseDetailPanel'
import Badge from '../components/ui/Badge'

/* ── 학과 고유색 ── */
const DEPT_COLORS: Record<string, string> = {
  'industrial-design': '#FF0017', 'visual-design': '#FF006A',
  'metal-craft': '#FFC900', 'ceramic-craft': '#FF7700',
  'fashion-design': '#8E008E', 'spatial-design': '#008AC2',
  'moving-image': '#00BCB5', 'automotive-design': '#2B50B6', 'ai-design': '#00CC00',
}

const ALL_TAGS = ['인문', '소통', '글로벌', '창의', '전문']
const TAG_COLORS: Record<string, string> = {
  '인문': '#6366F1', '소통': '#111111', '글로벌': '#16A34A', '창의': '#D97706', '전문': '#E11D48',
}
const SORT_LABELS: Record<SortMode, string> = {
  relevance: '관련도순', department: '학과순', year: '학년순', credits: '학점순',
}

/* ────────────────────────────────────── */
export default function CourseSearch() {
  const [urlParams] = useSearchParams()
  const {
    rawQuery, handleQueryChange, query,
    filters, updateFilter, resetFilters,
    sort, setSort, results, isSearching, isInitial,
  } = useSearch()
  const { recents, add: addRecent, remove: removeRecent } = useRecentSearches()
  const { studentProgress, toggleCourseComplete } = useStore()

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  /* URL ?q= 초기값 */
  useEffect(() => {
    const q = urlParams.get('q')
    if (q) handleQueryChange(q)
  }, [])

  /* 검색 실행 (엔터 or blur) */
  const commitSearch = () => { if (rawQuery.trim()) addRecent(rawQuery.trim()) }
  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => { if (e.key === 'Enter') commitSearch() }

  /* 이수 상태 */
  const completedSet = new Set(studentProgress?.completedCourseIds ?? [])

  /* 활성 필터 배지용 */
  const activeFilterBadges: { label: string; onRemove: () => void }[] = [
    ...filters.deptIds.map(id => ({
      label: departments.find(d => d.id === id)?.shortName ?? id,
      onRemove: () => updateFilter('deptIds', filters.deptIds.filter(x => x !== id)),
    })),
    ...filters.years.map(y => ({
      label: `${y}학년`,
      onRemove: () => updateFilter('years', filters.years.filter(x => x !== y)),
    })),
    ...(filters.semester !== 0 ? [{ label: `${filters.semester}학기`, onRemove: () => updateFilter('semester', 0) }] : []),
    ...(filters.category !== '' ? [{ label: filters.category === 'required' ? '필수' : '선택', onRemove: () => updateFilter('category', '') }] : []),
    ...(filters.capstoneOnly ? [{ label: '캡스톤', onRemove: () => updateFilter('capstoneOnly', false) }] : []),
    ...filters.credits.map(cr => ({
      label: cr >= 4 ? '4학점+' : `${cr}학점`,
      onRemove: () => updateFilter('credits', filters.credits.filter(x => x !== cr)),
    })),
    ...filters.tags.map(t => ({
      label: t,
      onRemove: () => updateFilter('tags', filters.tags.filter(x => x !== t)),
    })),
  ]

  return (
    <div className="page-enter" style={{ maxWidth: 1120, margin: '0 auto' }}>

      {/* ═══════════════════════════════
          상단 검색 영역
      ═══════════════════════════════ */}
      <div
        style={{
          maxWidth: 640,
          margin: '0 auto 24px',
          padding: '8px 0 0',
        }}
      >
        {/* 대형 검색 입력 */}
        <div style={{ position: 'relative' }}>
          <Search
            size={20}
            style={{
              position: 'absolute',
              left: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              color: rawQuery ? 'var(--color-accent-blue)' : 'var(--color-text-muted)',
              pointerEvents: 'none',
              transition: 'color 150ms',
            }}
          />
          <input
            ref={inputRef}
            value={rawQuery}
            onChange={e => handleQueryChange(e.target.value)}
            onKeyDown={handleKey}
            onBlur={commitSearch}
            placeholder="교과목명, 영문명, 키워드로 검색..."
            style={{
              width: '100%',
              height: 52,
              background: 'var(--color-bg-card)',
              border: `2px solid ${rawQuery ? '#111111' : 'var(--color-border)'}`,
              borderRadius: 14,
              paddingLeft: 48,
              paddingRight: rawQuery ? 44 : 16,
              fontFamily: 'var(--font-family)',
              fontSize: 16,
              color: 'var(--color-text-primary)',
              outline: 'none',
              transition: 'border-color 150ms, box-shadow 150ms',
              boxShadow: rawQuery ? '0 0 0 3px rgba(17,17,17,0.08)' : 'none',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#111111'
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(17,17,17,0.08)'
            }}
            onBlurCapture={(e) => {
              if (!rawQuery) {
                e.currentTarget.style.borderColor = 'var(--color-border)'
                e.currentTarget.style.boxShadow = 'none'
              }
            }}
          />
          {rawQuery && (
            <button
              onClick={() => { handleQueryChange(''); inputRef.current?.focus() }}
              style={{
                position: 'absolute',
                right: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 24,
                height: 24,
                borderRadius: 6,
                border: 'none',
                background: 'var(--color-bg-primary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-text-muted)',
              }}
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* 최근 검색어 */}
        {recents.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10, alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-family)', fontSize: 12, color: 'var(--color-text-muted)' }}>
              최근:
            </span>
            {recents.map(term => (
              <span
                key={term}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  height: 26,
                  padding: '0 8px',
                  borderRadius: 6,
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-bg-card)',
                  fontFamily: 'var(--font-family)',
                  fontSize: 12,
                  color: 'var(--color-text-secondary)',
                  cursor: 'pointer',
                }}
              >
                <span
                  onClick={() => { handleQueryChange(term); addRecent(term) }}
                  onMouseEnter={(e) => ((e.currentTarget.parentElement!.style.background = '#F8FAFC'))}
                  onMouseLeave={(e) => ((e.currentTarget.parentElement!.style.background = 'var(--color-bg-card)'))}
                >
                  {term}
                </span>
                <span
                  onClick={() => removeRecent(term)}
                  style={{ color: 'var(--color-text-muted)', lineHeight: 0 }}
                >
                  <X size={11} />
                </span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ═══════════════════════════════
          필터 영역
      ═══════════════════════════════ */}
      <div style={{ marginBottom: 8 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
          {/* 학과 멀티셀렉트 */}
          <FilterChip label={`학과${filters.deptIds.length ? ` (${filters.deptIds.length})` : ''}`} active={filters.deptIds.length > 0}>
            <div style={{ maxHeight: 260, overflowY: 'auto' }}>
              {departments.map(d => (
                <CheckOption
                  key={d.id}
                  label={d.shortName}
                  checked={filters.deptIds.includes(d.id)}
                  onChange={() => {
                    const next = filters.deptIds.includes(d.id)
                      ? filters.deptIds.filter(x => x !== d.id)
                      : [...filters.deptIds, d.id]
                    updateFilter('deptIds', next)
                  }}
                  color={DEPT_COLORS[d.id]}
                />
              ))}
            </div>
          </FilterChip>

          {/* 학년 멀티셀렉트 */}
          <FilterChip label={`학년${filters.years.length ? ` (${filters.years.length})` : ''}`} active={filters.years.length > 0}>
            {[1, 2, 3, 4].map(y => (
              <CheckOption
                key={y}
                label={`${y}학년`}
                checked={filters.years.includes(y)}
                onChange={() => {
                  const next = filters.years.includes(y)
                    ? filters.years.filter(x => x !== y)
                    : [...filters.years, y]
                  updateFilter('years', next)
                }}
              />
            ))}
          </FilterChip>

          {/* 학기 싱글셀렉트 */}
          <FilterChip label={filters.semester !== 0 ? `${filters.semester}학기` : '학기'} active={filters.semester !== 0}>
            {([0, 1, 2] as const).map(s => (
              <RadioOption
                key={s}
                label={s === 0 ? '전체 학기' : `${s}학기`}
                checked={filters.semester === s}
                onChange={() => updateFilter('semester', s)}
              />
            ))}
          </FilterChip>

          {/* 이수구분 싱글셀렉트 */}
          <FilterChip
            label={filters.category === 'required' ? '필수' : filters.category === 'elective' ? '선택' : '이수구분'}
            active={filters.category !== ''}
          >
            {(['', 'required', 'elective'] as const).map(c => (
              <RadioOption
                key={c}
                label={c === '' ? '전체' : c === 'required' ? '필수' : '선택'}
                checked={filters.category === c}
                onChange={() => updateFilter('category', c)}
              />
            ))}
          </FilterChip>

          {/* 캡스톤 토글 */}
          <ToggleChip
            label="캡스톤"
            active={filters.capstoneOnly}
            onToggle={() => updateFilter('capstoneOnly', !filters.capstoneOnly)}
            activeColor="var(--color-accent-amber)"
            activeBg="var(--color-accent-amber-light)"
          />

          {/* 학점 멀티셀렉트 */}
          <FilterChip label={`학점${filters.credits.length ? ` (${filters.credits.length})` : ''}`} active={filters.credits.length > 0}>
            {[1, 2, 3, 4].map(cr => (
              <CheckOption
                key={cr}
                label={cr === 4 ? '4학점 이상' : `${cr}학점`}
                checked={filters.credits.includes(cr)}
                onChange={() => {
                  const next = filters.credits.includes(cr)
                    ? filters.credits.filter(x => x !== cr)
                    : [...filters.credits, cr]
                  updateFilter('credits', next)
                }}
              />
            ))}
          </FilterChip>

          {/* 역량 태그 멀티셀렉트 */}
          <FilterChip label={`역량${filters.tags.length ? ` (${filters.tags.length})` : ''}`} active={filters.tags.length > 0}>
            {ALL_TAGS.map(tag => (
              <CheckOption
                key={tag}
                label={tag}
                checked={filters.tags.includes(tag)}
                onChange={() => {
                  const next = filters.tags.includes(tag)
                    ? filters.tags.filter(x => x !== tag)
                    : [...filters.tags, tag]
                  updateFilter('tags', next)
                }}
                color={TAG_COLORS[tag]}
              />
            ))}
          </FilterChip>
        </div>

        {/* 활성 필터 배지 */}
        <AnimatePresence>
          {activeFilterBadges.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10, alignItems: 'center' }}>
                {activeFilterBadges.map(({ label, onRemove }) => (
                  <span
                    key={label}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 5,
                      height: 26,
                      padding: '0 8px',
                      borderRadius: 6,
                      background: 'var(--color-accent-blue-light)',
                      border: '1px solid #BFDBFE',
                      fontFamily: 'var(--font-family)',
                      fontSize: 12,
                      fontWeight: 500,
                      color: 'var(--color-accent-blue)',
                    }}
                  >
                    {label}
                    <button
                      onClick={onRemove}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', lineHeight: 0, padding: 0, color: 'inherit' }}
                    >
                      <X size={11} />
                    </button>
                  </span>
                ))}
                <button
                  onClick={resetFilters}
                  style={{
                    height: 26,
                    padding: '0 8px',
                    borderRadius: 6,
                    border: '1px solid var(--color-border)',
                    background: 'transparent',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-family)',
                    fontSize: 12,
                    color: 'var(--color-text-secondary)',
                    transition: 'all 150ms',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-accent-red)'
                    e.currentTarget.style.color = 'var(--color-accent-red)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-border)'
                    e.currentTarget.style.color = 'var(--color-text-secondary)'
                  }}
                >
                  전체 해제
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ═══════════════════════════════
          결과 영역
      ═══════════════════════════════ */}
      {isInitial ? (
        /* ── 초기 상태: 안내 텍스트 ── */
        <p
          style={{
            textAlign: 'center',
            fontFamily: 'var(--font-family)',
            fontSize: 14,
            color: '#8B95A1',
            marginTop: 48,
          }}
        >
          교과목명, 영문명, 키워드로 검색해보세요
        </p>
      ) : (
        <>
          {/* 상단 바 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 14,
              flexWrap: 'wrap',
              gap: 8,
            }}
          >
            <span style={{ fontFamily: 'var(--font-family)', fontSize: 14, color: 'var(--color-text-secondary)' }}>
              {isSearching ? '검색 중...' : `총 ${results.length}개 교과목`}
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {/* 정렬 */}
              <div style={{ position: 'relative' }}>
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value as SortMode)}
                  style={{
                    height: 34,
                    padding: '0 30px 0 10px',
                    borderRadius: 8,
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-bg-card)',
                    fontFamily: 'var(--font-family)',
                    fontSize: 13,
                    color: 'var(--color-text-secondary)',
                    cursor: 'pointer',
                    outline: 'none',
                    appearance: 'none',
                  }}
                >
                  {(Object.keys(SORT_LABELS) as SortMode[]).map(k => (
                    <option key={k} value={k}>{SORT_LABELS[k]}</option>
                  ))}
                </select>
                <SortAsc size={13} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--color-text-muted)' }} />
              </div>

              {/* 뷰 토글 */}
              <div
                style={{
                  display: 'flex',
                  border: '1px solid var(--color-border)',
                  borderRadius: 8,
                  overflow: 'hidden',
                }}
              >
                {(['grid', 'list'] as const).map(v => (
                  <button
                    key={v}
                    onClick={() => setViewMode(v)}
                    style={{
                      width: 34,
                      height: 34,
                      border: 'none',
                      background: viewMode === v ? 'var(--color-accent-blue-light)' : 'transparent',
                      color: viewMode === v ? 'var(--color-accent-blue)' : 'var(--color-text-muted)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 150ms',
                    }}
                  >
                    {v === 'grid' ? <LayoutGrid size={15} /> : <List size={15} />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 결과 없음 */}
          {results.length === 0 && !isSearching && (
            <EmptyState onReset={() => { handleQueryChange(''); resetFilters() }} />
          )}

          {/* 그리드 뷰 */}
          {results.length > 0 && viewMode === 'grid' && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 12,
              }}
              className="search-grid"
            >
              {results.map(course => (
                <SearchCard
                  key={`${course.id}-${course.department.id}`}
                  course={course}
                  query={query}
                  completed={completedSet.has(course.id)}
                  onClick={() => setSelectedCourse(course)}
                />
              ))}
            </div>
          )}

          {/* 리스트 뷰 */}
          {results.length > 0 && viewMode === 'list' && (
            <SearchListView
              results={results}
              query={query}
              completedSet={completedSet}
              onSelect={setSelectedCourse}
              onToggle={(id) => toggleCourseComplete(id)}
            />
          )}
        </>
      )}

      {/* 교과목 상세 패널 */}
      <CourseDetailPanel
        course={selectedCourse}
        completed={selectedCourse ? completedSet.has(selectedCourse.id) : false}
        onClose={() => setSelectedCourse(null)}
        onToggle={() => { if (selectedCourse) toggleCourseComplete(selectedCourse.id) }}
      />

      <style>{`
        @media (max-width: 1023px) { .search-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 600px)  { .search-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  )
}

/* ════════════════════════════════════
   검색 결과 카드 (그리드 뷰)
════════════════════════════════════ */
interface SearchCardProps {
  course: CourseWithDept
  query: string
  completed: boolean
  onClick: () => void
}
function SearchCard({ course, query, completed, onClick }: SearchCardProps) {
  const color = DEPT_COLORS[course.department.id] ?? '#64748B'
  return (
    <button
      onClick={onClick}
      style={{
        background: completed ? '#F5F5F5' : 'var(--color-bg-card)',
        border: `1px solid ${completed ? '#111111' : 'var(--color-border)'}`,
        borderRadius: 12,
        padding: '14px 16px',
        textAlign: 'left',
        cursor: 'pointer',
        transition: 'box-shadow 150ms, border-color 150ms, transform 150ms',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        width: '100%',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.07)'
        e.currentTarget.style.transform = 'translateY(-1px)'
        if (!completed) e.currentTarget.style.borderColor = color
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.borderColor = completed ? '#111111' : 'var(--color-border)'
      }}
    >
      {/* 학과 배지 */}
      <span
        style={{
          display: 'inline-flex',
          alignSelf: 'flex-start',
          height: 22,
          padding: '0 8px',
          borderRadius: 5,
          background: `${color}18`,
          color,
          fontFamily: 'var(--font-family)',
          fontSize: 11,
          fontWeight: 600,
        }}
      >
        {course.department.shortName}
      </span>

      {/* 과목명 */}
      <Highlight
        text={course.name}
        query={query}
        style={{
          fontFamily: 'var(--font-family)',
          fontSize: 14,
          fontWeight: 500,
          color: completed ? '#111111' : 'var(--color-text-primary)',
          lineHeight: '20px',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      />
      <span
        style={{
          fontFamily: 'var(--font-family)',
          fontSize: 11,
          color: 'var(--color-text-muted)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {course.nameEng}
      </span>

      {/* 메타 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-family)', fontSize: 12, color: 'var(--color-text-muted)' }}>
          {course.year}학년 {course.semester === 0 ? '전학기' : `${course.semester}학기`}
        </span>
        <span style={{ color: 'var(--color-border)' }}>·</span>
        <span style={{ fontFamily: 'var(--font-family)', fontSize: 12, color: 'var(--color-text-muted)' }}>
          {course.credits}학점
        </span>
        <Badge variant={course.category === 'required' ? 'required' : 'elective'} style={{ fontSize: 10, padding: '1px 5px' }}>
          {course.category === 'required' ? '필수' : '선택'}
        </Badge>
        {course.isCapstone && (
          <Badge variant="amber" style={{ fontSize: 10, padding: '1px 5px' }}>캡스톤</Badge>
        )}
      </div>
    </button>
  )
}

/* ════════════════════════════════════
   검색 결과 리스트 뷰
════════════════════════════════════ */
function SearchListView({
  results, query, completedSet, onSelect, onToggle,
}: {
  results: CourseWithDept[]
  query: string
  completedSet: Set<string>
  onSelect: (c: Course) => void
  onToggle: (id: string) => void
}) {
  return (
    <div style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 14, overflow: 'hidden' }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 760 }}>
          <thead>
            <tr style={{ background: 'var(--color-bg-primary)', borderBottom: '1px solid var(--color-border)', height: 44 }}>
              {['이수', '학과', '교과목명', '학년', '학기', '학점', '이수구분', '비고'].map((h, i) => (
                <th
                  key={h}
                  style={{
                    padding: '0 12px',
                    fontFamily: 'var(--font-family)',
                    fontSize: 12,
                    fontWeight: 500,
                    color: 'var(--color-text-secondary)',
                    textAlign: i <= 1 ? 'center' : 'left',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.map(course => {
              const done = completedSet.has(course.id)
              const color = DEPT_COLORS[course.department.id] ?? '#64748B'
              return (
                <tr
                  key={`${course.id}-${course.department.id}`}
                  style={{
                    height: 48,
                    borderBottom: '1px solid var(--color-border)',
                    background: done ? '#F5F5F5' : 'transparent',
                    transition: 'background 150ms',
                  }}
                  onMouseEnter={(e) => { if (!done) e.currentTarget.style.background = '#F8FAFC' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = done ? '#F5F5F5' : 'transparent' }}
                >
                  <td style={{ padding: '0 12px', textAlign: 'center' }}>
                    <span
                      role="checkbox"
                      aria-checked={done}
                      tabIndex={0}
                      onClick={() => onToggle(course.id)}
                      onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); onToggle(course.id) } }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 18,
                        height: 18,
                        borderRadius: 5,
                        border: `1.5px solid ${done ? '#111111' : 'var(--color-border)'}`,
                        background: done ? '#111111' : 'transparent',
                        cursor: 'pointer',
                        transition: 'all 150ms',
                      }}
                    >
                      {done && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                    </span>
                  </td>
                  <td style={{ padding: '0 12px', textAlign: 'center' }}>
                    <span style={{ display: 'inline-flex', height: 20, padding: '0 7px', borderRadius: 4, background: `${color}18`, color, fontFamily: 'var(--font-family)', fontSize: 11, fontWeight: 600, alignItems: 'center', whiteSpace: 'nowrap' }}>
                      {course.department.shortName}
                    </span>
                  </td>
                  <td style={{ padding: '0 12px' }}>
                    <button
                      onClick={() => onSelect(course)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left' }}
                      onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                      onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
                    >
                      <Highlight
                        text={course.name}
                        query={query}
                        style={{ fontFamily: 'var(--font-family)', fontSize: 13, fontWeight: 500, color: done ? '#111111' : 'var(--color-text-primary)' }}
                      />
                    </button>
                  </td>
                  <td style={{ padding: '0 12px', fontFamily: 'var(--font-family)', fontSize: 13, color: 'var(--color-text-secondary)', textAlign: 'center' }}>{course.year}학년</td>
                  <td style={{ padding: '0 12px', fontFamily: 'var(--font-family)', fontSize: 13, color: 'var(--color-text-secondary)', textAlign: 'center' }}>
                    {course.semester === 0 ? '전' : `${course.semester}학기`}
                  </td>
                  <td style={{ padding: '0 12px', fontFamily: 'var(--font-family)', fontSize: 13, color: 'var(--color-text-secondary)', textAlign: 'center' }}>{course.credits}학점</td>
                  <td style={{ padding: '0 12px', textAlign: 'center' }}>
                    <Badge variant={course.category === 'required' ? 'required' : 'elective'} style={{ fontSize: 11 }}>
                      {course.category === 'required' ? '필수' : '선택'}
                    </Badge>
                  </td>
                  <td style={{ padding: '0 12px' }}>
                    <div style={{ display: 'flex', gap: 3 }}>
                      {course.isCapstone && <Badge variant="amber" style={{ fontSize: 10 }}>캡</Badge>}
                      {course.prerequisite && <span style={{ fontFamily: 'var(--font-family)', fontSize: 11, color: 'var(--color-text-muted)' }}>선수↑</span>}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ════════════════════════════════════
   빈 상태
════════════════════════════════════ */
function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 0', textAlign: 'center' }}>
      <SearchX size={64} style={{ color: 'var(--color-text-muted)', marginBottom: 20 }} />
      <h3 style={{ font: 'var(--font-heading-md)', fontFamily: 'var(--font-family)', color: 'var(--color-text-primary)', marginBottom: 8 }}>
        검색 결과가 없습니다
      </h3>
      <p style={{ font: 'var(--font-body-base)', fontFamily: 'var(--font-family)', color: 'var(--color-text-secondary)', marginBottom: 20 }}>
        다른 검색어나 필터 조건을 시도해보세요.
      </p>
      <button
        onClick={onReset}
        style={{
          height: 40,
          padding: '0 20px',
          borderRadius: 10,
          border: '1px solid var(--color-border)',
          background: 'var(--color-bg-card)',
          cursor: 'pointer',
          fontFamily: 'var(--font-family)',
          fontSize: 14,
          color: 'var(--color-text-secondary)',
          transition: 'all 150ms',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-accent-blue)'; e.currentTarget.style.color = 'var(--color-accent-blue)' }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-text-secondary)' }}
      >
        필터 초기화
      </button>
    </div>
  )
}
