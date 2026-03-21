import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Department, StudentProgress } from '../types';
import { departments } from '../data';

interface StoreState {
  departments: Department[];
  selectedDepartmentId: string | null;
  studentProgress: StudentProgress | null;
  nickname: string;

  selectDepartment: (id: string) => void;
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
      selectedDepartmentId: null,
      studentProgress: null,
      nickname: '',

      selectDepartment: (id) => {
        const dept = departments.find(d => d.id === id);
        if (!dept) return;
        set({
          selectedDepartmentId: id,
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
        const dept = get().selectedDepartmentId;
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
    { name: 'curriculum-store' }
  )
);
