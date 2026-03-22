import { useMemo } from 'react'
import type { Department, StudentProgress } from '../types'

export interface ProgressStats {
  totalCourses: number
  completedCourses: number
  requiredCourses: number
  completedRequired: number
  totalCredits: number
  completedCredits: number
  completedRequiredCredits: number
  completedElectiveCredits: number
  capstoneCompleted: number
  percentage: number
}

export function useProgress(
  department: Department | undefined,
  progress: StudentProgress | null
): ProgressStats {
  return useMemo(() => {
    if (!department || !progress) {
      return {
        totalCourses: 0,
        completedCourses: 0,
        requiredCourses: 0,
        completedRequired: 0,
        totalCredits: 0,
        completedCredits: 0,
        completedRequiredCredits: 0,
        completedElectiveCredits: 0,
        capstoneCompleted: 0,
        percentage: 0,
      }
    }
    const completed = new Set(progress.completedCourseIds)
    const totalCourses = department.courses.length
    let completedCourses = 0
    let requiredCourses = 0
    let completedRequired = 0
    let totalCredits = 0
    let completedCredits = 0
    let completedRequiredCredits = 0
    let completedElectiveCredits = 0
    let capstoneCompleted = 0

    for (const course of department.courses) {
      totalCredits += course.credits
      if (course.category === 'required') requiredCourses++
      if (completed.has(course.id)) {
        completedCourses++
        completedCredits += course.credits
        if (course.category === 'required') {
          completedRequired++
          completedRequiredCredits += course.credits
        } else {
          completedElectiveCredits += course.credits
        }
        if (course.isCapstone) capstoneCompleted++
      }
    }

    const percentage = totalCourses > 0 ? Math.round((completedCourses / totalCourses) * 100) : 0

    return {
      totalCourses,
      completedCourses,
      requiredCourses,
      completedRequired,
      totalCredits,
      completedCredits,
      completedRequiredCredits,
      completedElectiveCredits,
      capstoneCompleted,
      percentage,
    }
  }, [department, progress])
}
