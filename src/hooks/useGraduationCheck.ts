import { useMemo } from 'react'
import type { Course, Department } from '../types'

export interface GradRequirement {
  id: string
  label: string
  met: boolean
  current: number
  target: number
  unit: string
  courses?: Course[]     // 관련 과목 목록
  detail?: string        // 부가 설명
}

export interface GraduationCheckResult {
  allMet: boolean
  unmetCount: number
  requirements: GradRequirement[]
  totalCredits: number
  completedCredits: number
  minRequiredCredits: number
}

function isGraduationCourse(c: Course): boolean {
  return c.name.includes('졸업') || c.name.includes('졸업연구') || c.name.includes('졸업작품')
}

export function useGraduationCheck(
  department: Department | undefined,
  completedIds: Set<string>
): GraduationCheckResult {
  return useMemo(() => {
    const empty: GraduationCheckResult = {
      allMet: false,
      unmetCount: 0,
      requirements: [],
      totalCredits: 0,
      completedCredits: 0,
      minRequiredCredits: 130,
    }
    if (!department) return empty

    const courses = department.courses
    const minRequired = department.totalRequiredCredits

    // 학점 집계
    const totalCredits = courses.reduce((s, c) => s + c.credits, 0)
    const completedCredits = courses
      .filter(c => completedIds.has(c.id))
      .reduce((s, c) => s + c.credits, 0)

    // 1. 필수 과목 전체 이수
    const requiredCourses = courses.filter(c => c.category === 'required')
    const completedRequired = requiredCourses.filter(c => completedIds.has(c.id))
    const req1: GradRequirement = {
      id: 'required-all',
      label: '필수 과목 전체 이수',
      met: completedRequired.length >= requiredCourses.length,
      current: completedRequired.length,
      target: requiredCourses.length,
      unit: '과목',
      courses: requiredCourses,
    }

    // 2. S-TEAM Class 또는 사제동행세미나
    const steamCourse = courses.find(c => c.name.includes('S-TEAM') || c.name.toLowerCase().includes('s-team'))
    const seminarCourse = courses.find(c => c.name.includes('사제동행세미나'))
    const steamMet = steamCourse ? completedIds.has(steamCourse.id) : false
    const seminarMet = seminarCourse ? completedIds.has(seminarCourse.id) : false
    const req2: GradRequirement = {
      id: 'steam-or-seminar',
      label: 'S-TEAM Class 또는 사제동행세미나 이수',
      met: steamMet || seminarMet,
      current: (steamMet ? 1 : 0) + (seminarMet ? 1 : 0),
      target: 1,
      unit: '과목 (택 1)',
      courses: [steamCourse, seminarCourse].filter(Boolean) as Course[],
      detail: '둘 중 하나 이상 이수 필요',
    }

    // 3. 캡스톤디자인 과목 이수
    const capstoneCourses = courses.filter(c => c.isCapstone)
    const completedCapstone = capstoneCourses.filter(c => completedIds.has(c.id))
    const req3: GradRequirement = {
      id: 'capstone',
      label: '캡스톤디자인 과목 이수 (1개 이상)',
      met: completedCapstone.length >= 1,
      current: completedCapstone.length,
      target: 1,
      unit: '과목',
      courses: capstoneCourses,
    }

    // 4. 졸업작품 / 졸업연구 이수
    const gradCourses = courses.filter(isGraduationCourse)
    const completedGrad = gradCourses.filter(c => completedIds.has(c.id))
    const req4: GradRequirement = {
      id: 'graduation-work',
      label: '졸업작품 / 졸업연구 이수',
      met: completedGrad.length >= 1,
      current: completedGrad.length,
      target: 1,
      unit: '과목',
      courses: gradCourses,
      detail: '졸업연구 또는 졸업작품 중 택 1',
    }

    // 5. 최저이수학점
    const req5: GradRequirement = {
      id: 'min-credits',
      label: `최저이수학점 충족 (${minRequired}학점)`,
      met: completedCredits >= minRequired,
      current: completedCredits,
      target: minRequired,
      unit: '학점',
      detail: `전체 교과과정 기준 ${totalCredits}학점 중 ${minRequired}학점 이상 이수`,
    }

    const requirements = [req1, req2, req3, req4, req5]
    const unmetCount = requirements.filter(r => !r.met).length

    return {
      allMet: unmetCount === 0,
      unmetCount,
      requirements,
      totalCredits,
      completedCredits,
      minRequiredCredits: minRequired,
    }
  }, [department, completedIds])
}
