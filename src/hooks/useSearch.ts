import { useMemo, useState, useCallback, useEffect, useRef } from 'react'
import { departments } from '../data'
import type { Course, Department } from '../types'

export interface CourseWithDept extends Course {
  department: Department
}

export type SortMode = 'relevance' | 'department' | 'year' | 'credits'

export interface FilterState {
  deptIds: string[]
  years: number[]
  semester: 0 | 1 | 2        // 0 = 전체
  category: '' | 'required' | 'elective'
  capstoneOnly: boolean
  credits: number[]           // 선택된 학점 값들 (4 = "4학점 이상")
  tags: string[]
}

export const DEFAULT_FILTERS: FilterState = {
  deptIds: [],
  years: [],
  semester: 0,
  category: '',
  capstoneOnly: false,
  credits: [],
  tags: [],
}

/* 전체 과목 flat 리스트 (빌드 시 1회 계산) */
const ALL_COURSES: CourseWithDept[] = departments.flatMap(dept =>
  dept.courses.map(course => ({ ...course, department: dept }))
)

function score(course: CourseWithDept, q: string): number {
  if (!q) return 0
  const ql = q.toLowerCase()
  let s = 0
  if (course.name.toLowerCase().includes(ql)) s += 3
  if (course.nameEng.toLowerCase().includes(ql)) s += 2
  if (course.description?.toLowerCase().includes(ql)) s += 1
  if (course.tags.some(t => t.toLowerCase().includes(ql))) s += 1
  return s
}

function matchesFilters(c: CourseWithDept, f: FilterState): boolean {
  if (f.deptIds.length && !f.deptIds.includes(c.department.id)) return false
  if (f.years.length && !f.years.includes(c.year)) return false
  if (f.semester !== 0 && c.semester !== f.semester) return false
  if (f.category && c.category !== f.category) return false
  if (f.capstoneOnly && !c.isCapstone) return false
  if (f.credits.length) {
    const match = f.credits.some(cr => cr === 4 ? c.credits >= 4 : c.credits === cr)
    if (!match) return false
  }
  if (f.tags.length && !f.tags.some(t => c.tags.includes(t))) return false
  return true
}

export function useSearch() {
  const [rawQuery, setRawQuery] = useState('')
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)
  const [sort, setSort] = useState<SortMode>('relevance')
  const [isSearching, setIsSearching] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  /* 300ms 디바운스 */
  const handleQueryChange = useCallback((v: string) => {
    setRawQuery(v)
    setIsSearching(true)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      setQuery(v)
      setIsSearching(false)
    }, 300)
  }, [])

  useEffect(() => () => { if (debounceRef.current) clearTimeout(debounceRef.current) }, [])

  const results = useMemo<CourseWithDept[]>(() => {
    const q = query.trim().toLowerCase()
    let list = ALL_COURSES.filter(c => {
      if (q) {
        const hit =
          c.name.toLowerCase().includes(q) ||
          c.nameEng.toLowerCase().includes(q) ||
          c.description?.toLowerCase().includes(q) ||
          c.tags.some(t => t.toLowerCase().includes(q))
        if (!hit) return false
      }
      return matchesFilters(c, filters)
    })

    list.sort((a, b) => {
      if (sort === 'relevance' && q) {
        const diff = score(b, q) - score(a, q)
        if (diff !== 0) return diff
      }
      if (sort === 'department') {
        const d = a.department.name.localeCompare(b.department.name, 'ko')
        if (d !== 0) return d
      }
      if (sort === 'credits') return b.credits - a.credits
      // 기본: year → semester
      return a.year - b.year || a.semester - b.semester
    })
    return list
  }, [query, filters, sort])

  const hasActiveFilters =
    filters.deptIds.length > 0 ||
    filters.years.length > 0 ||
    filters.semester !== 0 ||
    filters.category !== '' ||
    filters.capstoneOnly ||
    filters.credits.length > 0 ||
    filters.tags.length > 0

  const resetFilters = useCallback(() => setFilters(DEFAULT_FILTERS), [])

  const updateFilter = useCallback(<K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }, [])

  const isInitial = rawQuery === '' && !hasActiveFilters

  return {
    rawQuery,
    query,
    handleQueryChange,
    filters,
    updateFilter,
    resetFilters,
    hasActiveFilters,
    sort,
    setSort,
    results,
    isSearching,
    isInitial,
    allCourses: ALL_COURSES,
  }
}
