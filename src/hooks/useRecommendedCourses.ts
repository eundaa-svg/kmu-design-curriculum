import { useMemo } from 'react'
import type { Course, Department } from '../types'

export interface RecommendedCourse {
  course: Course
  reason: string
}

export function useRecommendedCourses(
  department: Department | undefined,
  completedIds: Set<string>,
  currentYear: number,
  currentSemester: 1 | 2,
  limit = 6
): RecommendedCourse[] {
  return useMemo(() => {
    if (!department) return []

    const completedNames = new Set(
      department.courses.filter(c => completedIds.has(c.id)).map(c => c.name)
    )

    const candidates: RecommendedCourse[] = []

    for (const course of department.courses) {
      // 이미 이수한 과목 제외
      if (completedIds.has(course.id)) continue

      // 현재 학년/학기 이하 과목만
      const withinYear = course.year <= currentYear
      const withinSem = course.year < currentYear || course.semester === 0 || course.semester <= currentSemester
      if (!withinYear || !withinSem) continue

      // 선수과목 이수 여부 확인
      if (course.prerequisite && !completedNames.has(course.prerequisite)) continue

      let reason = ''
      if (course.category === 'required') {
        reason = '필수 과목'
      } else if (course.prerequisite && completedNames.has(course.prerequisite)) {
        reason = `선수과목 [${course.prerequisite}] 이수 완료`
      } else {
        reason = `${course.year}학년 ${course.semester === 0 ? '전학기' : `${course.semester}학기`} 개설`
      }

      candidates.push({ course, reason })
    }

    // 필수 우선, 그 다음 학년 낮은 순
    candidates.sort((a, b) => {
      if (a.course.category !== b.course.category) {
        return a.course.category === 'required' ? -1 : 1
      }
      return a.course.year - b.course.year || a.course.semester - b.course.semester
    })

    return candidates.slice(0, limit)
  }, [department, completedIds, currentYear, currentSemester, limit])
}
