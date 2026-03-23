import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Department } from '../types';
import { departments } from '../data';

interface StoreState {
  departments: Department[];
  /** 내 소속 학과 — 온보딩/설정에서만 변경 */
  myDepartmentId: string | null;
  /** 이수 완료 과목 ID 목록 — departmentId와 무관하게 독립 관리 */
  completedCourseIds: string[];
  currentYear: number;
  currentSemester: 1 | 2;
  nickname: string;

  setMyDepartment: (id: string) => void;
  toggleCourseComplete: (courseId: string) => void;
  bulkComplete: (courseIds: string[]) => void;
  resetProgress: () => void;
  setCurrentYear: (year: number) => void;
  setCurrentSemester: (sem: 1 | 2) => void;
  setNickname: (name: string) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      departments,
      myDepartmentId: null,
      completedCourseIds: [],
      currentYear: 1,
      currentSemester: 1,
      nickname: '',

      setMyDepartment: (id) => {
        if (!departments.find(d => d.id === id)) return;
        set({ myDepartmentId: id });
      },

      toggleCourseComplete: (courseId) => {
        const ids = get().completedCourseIds;
        set({
          completedCourseIds: ids.includes(courseId)
            ? ids.filter(id => id !== courseId)
            : [...ids, courseId],
        });
      },

      bulkComplete: (courseIds) => {
        const existing = new Set(get().completedCourseIds);
        courseIds.forEach(id => existing.add(id));
        set({ completedCourseIds: [...existing] });
      },

      resetProgress: () => set({ completedCourseIds: [] }),

      setCurrentYear: (year) => set({ currentYear: year }),

      setCurrentSemester: (sem) => set({ currentSemester: sem }),

      setNickname: (name) => set({ nickname: name }),
    }),
    {
      name: 'curriculum-store',
      version: 2,
      migrate: (state: unknown, version: number) => {
        const s = state as Record<string, unknown>;
        // v0→v1: selectedDepartmentId → myDepartmentId
        if ('selectedDepartmentId' in s && !('myDepartmentId' in s)) {
          s.myDepartmentId = s.selectedDepartmentId;
          delete s.selectedDepartmentId;
        }
        // v0/v1→v2: studentProgress 중첩 구조 → 플랫 구조
        if (version < 2 && s.studentProgress && typeof s.studentProgress === 'object') {
          const sp = s.studentProgress as Record<string, unknown>;
          if (!s.completedCourseIds && Array.isArray(sp.completedCourseIds)) {
            s.completedCourseIds = sp.completedCourseIds;
          }
          if (!s.currentYear && typeof sp.currentYear === 'number') {
            s.currentYear = sp.currentYear;
          }
          if (!s.currentSemester && typeof sp.currentSemester === 'number') {
            s.currentSemester = sp.currentSemester;
          }
          delete s.studentProgress;
        }
        return s as unknown as StoreState;
      },
    }
  )
);
