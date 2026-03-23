import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Department, StudentProgress } from '../types';
import { departments } from '../data';

interface StoreState {
  departments: Department[];
  /** 내 소속 학과 — 온보딩/설정에서만 변경, 커리큘럼 탐색과 무관 */
  myDepartmentId: string | null;
  studentProgress: StudentProgress | null;
  nickname: string;

  setMyDepartment: (id: string) => void;
  setStudentProgress: (progress: StudentProgress) => void;
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
      studentProgress: null,
      nickname: '',

      setMyDepartment: (id) => {
        const dept = departments.find(d => d.id === id);
        if (!dept) return;
        set({
          myDepartmentId: id,
          studentProgress: get().studentProgress?.departmentId === id
            ? get().studentProgress
            : { departmentId: id, completedCourseIds: [], currentYear: 1, currentSemester: 1 }
        });
      },

      setStudentProgress: (progress) => set({ studentProgress: progress }),

      toggleCourseComplete: (courseId) => {
        const progress = get().studentProgress;
        if (!progress) return;
        const isCompleted = progress.completedCourseIds.includes(courseId);
        set({
          studentProgress: {
            ...progress,
            completedCourseIds: isCompleted
              ? progress.completedCourseIds.filter(id => id !== courseId)
              : [...progress.completedCourseIds, courseId]
          }
        });
      },

      bulkComplete: (courseIds) => {
        const progress = get().studentProgress;
        if (!progress) return;
        const existing = new Set(progress.completedCourseIds);
        courseIds.forEach(id => existing.add(id));
        set({ studentProgress: { ...progress, completedCourseIds: [...existing] } });
      },

      resetProgress: () => {
        const dept = get().myDepartmentId;
        if (!dept) return;
        set({
          studentProgress: { departmentId: dept, completedCourseIds: [], currentYear: 1, currentSemester: 1 }
        });
      },

      setCurrentYear: (year) => {
        const progress = get().studentProgress;
        if (!progress) return;
        set({ studentProgress: { ...progress, currentYear: year } });
      },

      setCurrentSemester: (sem) => {
        const progress = get().studentProgress;
        if (!progress) return;
        set({ studentProgress: { ...progress, currentSemester: sem } });
      },

      setNickname: (name) => set({ nickname: name }),
    }),
    {
      name: 'curriculum-store',
      // localStorage 키 마이그레이션: selectedDepartmentId → myDepartmentId
      migrate: (state: unknown) => {
        const s = state as Record<string, unknown>
        if ('selectedDepartmentId' in s && !('myDepartmentId' in s)) {
          s.myDepartmentId = s.selectedDepartmentId
          delete s.selectedDepartmentId
        }
        return s as unknown as StoreState
      },
      version: 1,
    }
  )
);
