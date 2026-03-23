import { useStore } from '../store/useStore';
import CourseCard from './CourseCard';

export default function CurriculumMap() {
  const { departments, selectedDepartmentId } = useStore();
  const dept = departments.find(d => d.id === selectedDepartmentId);
  if (!dept) return null;

  const years = [1, 2, 3, 4];
  const semesters = [1, 2] as const;

  const sharedCourses = dept.courses.filter(c => c.yearMax !== undefined && c.yearMax === 4 && c.year === 3);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-[#1E293B] mb-6">교과과정 로드맵</h3>

      {/* 범례 */}
      <div className="flex items-center gap-4 mb-6 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded border-2 border-[#111111] bg-white"></div>
          <span className="text-gray-600">필수 과목</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded border border-gray-200 bg-white"></div>
          <span className="text-gray-600">선택 과목</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-[#10B981]"></div>
          <span className="text-gray-600">이수 완료</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] bg-purple-100 text-purple-700 rounded px-1 py-0.5">캡</span>
          <span className="text-gray-600">캡스톤디자인</span>
        </div>
      </div>

      {/* 전학기 공통 과목 */}
      {dept.courses.filter(c => c.semester === 0).length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-500 mb-3">전학기 공통</h4>
          <div className="flex flex-wrap gap-2">
            {dept.courses.filter(c => c.semester === 0).map(course => (
              <CourseCard key={course.id} course={course} compact />
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-4 gap-4">
        {years.map(year => (
          <div key={year} className="space-y-4">
            <h4 className="text-center font-bold text-[#1E293B] bg-gray-50 rounded-lg py-2">
              {year}학년
            </h4>
            {semesters.map(sem => {
              const directCourses = dept.courses.filter(c => c.year === year && c.semester === sem);
              const shared = (year === 3 || year === 4)
                ? sharedCourses.filter(c => c.semester === sem)
                : [];
              // For year 4, show shared courses that belong to 3-4
              const coursesToShow = year === 3
                ? directCourses
                : year === 4
                ? [...directCourses, ...sharedCourses.filter(c => c.semester === sem)]
                : directCourses;
              // For year 3, include shared courses inline
              const year3Courses = year === 3
                ? [...directCourses, ...shared]
                : coursesToShow;
              const finalCourses = year === 3 ? year3Courses : coursesToShow;

              if (finalCourses.length === 0) return (
                <div key={sem}>
                  <p className="text-xs text-gray-400 font-medium mb-2">{sem}학기</p>
                  <p className="text-xs text-gray-300 italic">-</p>
                </div>
              );

              return (
                <div key={sem}>
                  <p className="text-xs text-gray-400 font-medium mb-2">{sem}학기</p>
                  <div className="space-y-1.5">
                    {finalCourses.map(course => (
                      <CourseCard
                        key={course.id + '-' + year}
                        course={course}
                        isShared={course.yearMax !== undefined}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
