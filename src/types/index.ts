export interface Course {
  id: string
  name: string
  nameEng: string
  year: number
  yearMax?: number        // 3-4학년 공통이면 4 (RoadmapView 호환용)
  semester: 1 | 2 | 0    // 0 = 전학기 공통 (사제동행세미나 등)
  categoryType: '기초교양' | '전공선택'
  category: 'required' | 'elective'
  credits: number
  theory: number
  practice: number
  isCapstone: boolean
  isRequired: boolean     // 비고란 '필수' 표기 여부
  prerequisite: string | null
  description: string
  tags: string[]
  note: string
  concentration?: string
  availableYears?: number[]
}

export interface SubMajor {
  name: string
  nameEng: string
  requiredCourses: {
    year2: string[]
    year3_4: string[]
    year4: string[]
  }
  note: string
}

export interface Department {
  id: string
  name: string
  shortName: string
  nameEng: string
  icon?: string
  description: string
  educationGoal: string
  totalRequiredCredits?: number   // 레거시 호환 (사용 지양)
  concentrationAreas?: { name: string; description: string }[]
  subMajors?: SubMajor[]
  notices: string[]
  courses: Course[]
}

export interface StudentProgress {
  departmentId: string
  completedCourseIds: string[]
  currentYear: number
  currentSemester: 1 | 2
}
