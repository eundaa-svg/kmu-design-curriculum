import { useMemo } from 'react'
import { useStore } from '../store/useStore'
import { designJobs, jobCourseMappings } from '../data/jobCourseMap'
import { getAllCourses } from '../data'

export interface CareerFitResult {
  jobId: string
  jobName: string
  percentage: number
  totalCourses: number
  completedCourses: number
  coreCourses: {
    total: number
    completed: number
    remaining: Array<{ id: string; name: string; departmentId: string }>
  }
  relatedCourses: {
    total: number
    completed: number
    remaining: Array<{ id: string; name: string; departmentId: string }>
  }
}

export function useCareerFit(): CareerFitResult[] {
  const completedCourseIds = useStore((s) => s.completedCourseIds)

  return useMemo(() => {
    const allCourses = getAllCourses()
    const completedSet = new Set(completedCourseIds)

    const results: CareerFitResult[] = designJobs.map((job) => {
      const mappings = jobCourseMappings.filter((m) => m.jobId === job.id)
      const coreMappings = mappings.filter((m) => m.relevance === 'core')
      const relatedMappings = mappings.filter((m) => m.relevance === 'related')

      const maxScore = coreMappings.length * 2 + relatedMappings.length * 1
      let score = 0

      const coreRemaining: Array<{ id: string; name: string; departmentId: string }> = []
      let coreCompleted = 0
      for (const m of coreMappings) {
        if (completedSet.has(m.courseId)) {
          score += 2
          coreCompleted++
        } else {
          const course = allCourses.find((c) => c.id === m.courseId)
          if (course) coreRemaining.push({ id: course.id, name: course.name, departmentId: (course as { departmentId: string }).departmentId })
        }
      }

      const relatedRemaining: Array<{ id: string; name: string; departmentId: string }> = []
      let relatedCompleted = 0
      for (const m of relatedMappings) {
        if (completedSet.has(m.courseId)) {
          score += 1
          relatedCompleted++
        } else {
          const course = allCourses.find((c) => c.id === m.courseId)
          if (course) relatedRemaining.push({ id: course.id, name: course.name, departmentId: (course as { departmentId: string }).departmentId })
        }
      }

      const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0

      return {
        jobId: job.id,
        jobName: job.name,
        percentage,
        totalCourses: mappings.length,
        completedCourses: coreCompleted + relatedCompleted,
        coreCourses: {
          total: coreMappings.length,
          completed: coreCompleted,
          remaining: coreRemaining,
        },
        relatedCourses: {
          total: relatedMappings.length,
          completed: relatedCompleted,
          remaining: relatedRemaining,
        },
      }
    })

    return results.sort((a, b) => b.percentage - a.percentage)
  }, [completedCourseIds])
}
