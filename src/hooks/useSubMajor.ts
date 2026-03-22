import { useState, useCallback } from 'react'

export type SubMajorType = 'double' | 'minor'

export interface SubMajorState {
  enabled: boolean
  type: SubMajorType
  departmentId: string
}

const KEY = 'subMajor'
const COMPLETED_KEY = (deptId: string) => `completedCourses_sub_${deptId}`

function loadState(): SubMajorState {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw) as SubMajorState
  } catch { /* ignore */ }
  return { enabled: false, type: 'double', departmentId: '' }
}

function loadCompleted(deptId: string): Set<string> {
  try {
    const raw = localStorage.getItem(COMPLETED_KEY(deptId))
    if (raw) return new Set(JSON.parse(raw) as string[])
  } catch { /* ignore */ }
  return new Set()
}

export function useSubMajor() {
  const [state, setStateRaw] = useState<SubMajorState>(loadState)
  const [completedIds, setCompletedIdsRaw] = useState<Set<string>>(
    () => state.departmentId ? loadCompleted(state.departmentId) : new Set()
  )

  const setState = useCallback((next: SubMajorState) => {
    setStateRaw(next)
    localStorage.setItem(KEY, JSON.stringify(next))
    // load completed for new dept
    if (next.departmentId) {
      setCompletedIdsRaw(loadCompleted(next.departmentId))
    } else {
      setCompletedIdsRaw(new Set())
    }
  }, [])

  const toggleCourse = useCallback((courseId: string, deptId: string) => {
    setCompletedIdsRaw(prev => {
      const next = new Set(prev)
      next.has(courseId) ? next.delete(courseId) : next.add(courseId)
      localStorage.setItem(COMPLETED_KEY(deptId), JSON.stringify([...next]))
      return next
    })
  }, [])

  const resetCompleted = useCallback((deptId: string) => {
    setCompletedIdsRaw(new Set())
    localStorage.removeItem(COMPLETED_KEY(deptId))
  }, [])

  const bulkCompleteAll = useCallback((courseIds: string[], deptId: string) => {
    setCompletedIdsRaw(prev => {
      const next = new Set(prev)
      courseIds.forEach(id => next.add(id))
      localStorage.setItem(COMPLETED_KEY(deptId), JSON.stringify([...next]))
      return next
    })
  }, [])

  return {
    state,
    setState,
    completedIds,
    toggleCourse,
    resetCompleted,
    bulkCompleteAll,
  }
}
