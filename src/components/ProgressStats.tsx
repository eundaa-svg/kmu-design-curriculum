import { useStore } from '../store/useStore';

export default function ProgressStats() {
  const { departments, myDepartmentId, completedCourseIds, resetProgress } = useStore();
  const dept = departments.find(d => d.id === myDepartmentId);
  if (!dept) return null;

  const total = dept.courses.length;
  const completed = completedCourseIds.length;
  const requiredCourses = dept.courses.filter(c => c.category === 'required');
  const completedRequired = requiredCourses.filter(c => completedCourseIds.includes(c.id)).length;
  const completedCredits = dept.courses
    .filter(c => completedCourseIds.includes(c.id))
    .reduce((sum, c) => sum + c.credits, 0);

  const stats = [
    { label: '이수 과목', value: `${completed}/${total}`, color: '#111111' },
    { label: '필수 과목', value: `${completedRequired}/${requiredCourses.length}`, color: '#10B981' },
    { label: '이수 학점', value: `${completedCredits}학점`, color: '#6366F1' },
    { label: '진행률', value: `${Math.round((completed / total) * 100)}%`, color: '#F59E0B' },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map(s => (
        <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">{s.label}</p>
          <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
        </div>
      ))}
      <div className="col-span-4 flex justify-end">
        <button
          onClick={resetProgress}
          className="text-xs text-gray-400 hover:text-red-500 transition-colors px-2 py-1 rounded"
        >
          진행상황 초기화
        </button>
      </div>
    </div>
  );
}
