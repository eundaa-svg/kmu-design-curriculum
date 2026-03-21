export interface Course {
  id: string;
  name: string;
  nameEng: string;
  year: number; // 1-4, use 3 for 3-4 shared
  yearMax?: number; // 4 if shared across 3-4
  semester: 1 | 2 | 0; // 0 = all semesters
  category: 'required' | 'elective';
  credits: number;
  theory: number;
  practice: number;
  isCapstone: boolean;
  prerequisite: string | null;
  description: string;
  tags: string[];
  concentration?: string;
  note?: string; // e.g. "P/N", "융복합"
}

export interface Department {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  description: string;
  educationGoal: string;
  totalRequiredCredits: number;
  courses: Course[];
}

export interface StudentProgress {
  departmentId: string;
  completedCourseIds: string[];
  currentYear: number;
  currentSemester: 1 | 2;
}
