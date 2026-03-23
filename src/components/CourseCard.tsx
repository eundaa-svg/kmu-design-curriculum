import { useStore } from '../store/useStore';
import type { Course } from '../types';

interface Props {
  course: Course;
  compact?: boolean;
  isShared?: boolean;
}

export default function CourseCard({ course, compact, isShared }: Props) {
  const { studentProgress, toggleCourseComplete } = useStore();
  const isCompleted = studentProgress?.completedCourseIds.includes(course.id) ?? false;

  const bgColor = isCompleted
    ? 'bg-[#10B981] text-white border-[#10B981]'
    : course.category === 'required'
    ? 'bg-white border-[#111111] text-[#111111]'
    : 'bg-white border-gray-200 text-[#1E293B]';

  if (compact) {
    return (
      <button
        onClick={() => toggleCourseComplete(course.id)}
        className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${bgColor}`}
        title={course.nameEng}
      >
        {course.name}
        {course.isCapstone && <span className="ml-1 opacity-75">★</span>}
      </button>
    );
  }

  return (
    <button
      onClick={() => toggleCourseComplete(course.id)}
      className={`w-full text-left px-2.5 py-2 rounded-lg border text-xs font-medium transition-all hover:shadow-sm ${bgColor} ${isShared ? 'opacity-70' : ''}`}
      title={`${course.credits}학점 | ${course.nameEng}`}
    >
      <div className="flex items-start justify-between gap-1">
        <span className="leading-tight">{course.name}</span>
        <div className="flex items-center gap-0.5 shrink-0">
          {course.category === 'required' && !isCompleted && (
            <span className="text-[10px] bg-blue-100 text-blue-700 rounded px-1">필수</span>
          )}
          {course.isCapstone && (
            <span className="text-[10px] bg-purple-100 text-purple-700 rounded px-1">캡</span>
          )}
        </div>
      </div>
      <div className="text-[10px] opacity-60 mt-0.5">{course.credits}학점</div>
    </button>
  );
}
