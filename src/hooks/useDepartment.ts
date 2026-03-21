import { useMemo } from 'react'
import { departments } from '../data'
import type { Department } from '../types'

export function useDepartment(id?: string | null): Department | undefined {
  return useMemo(() => {
    if (!id) return undefined
    return departments.find((d) => d.id === id)
  }, [id])
}

export function useDepartments() {
  return departments
}
