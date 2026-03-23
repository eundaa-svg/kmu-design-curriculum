import { useStore } from '../store/useStore';

function isAccentNotice(text: string) {
  return text.includes('1학년 과목만') || text.includes('2025학년도');
}

export default function DepartmentOverview() {
  const { departments, selectedDepartmentId } = useStore();
  const dept = departments.find(d => d.id === selectedDepartmentId);
  if (!dept) return null;

  const notices = dept.notices ?? [];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-4 mb-4">
        <span className="text-4xl">{dept.icon}</span>
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">{dept.name}</h2>
          <p className="text-gray-500 mt-1">{dept.description}</p>
        </div>
      </div>
      <div className="bg-blue-50 rounded-xl p-4 mb-3">
        <p className="text-sm font-semibold text-[#111111] mb-1">교육목표</p>
        <p className="text-sm text-gray-600">{dept.educationGoal}</p>
      </div>
      {notices.length > 0 && (
        <div className="space-y-1.5">
          {notices.map((notice, i) =>
            isAccentNotice(notice) ? (
              <div key={i} className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                <span className="text-amber-500 mt-0.5 shrink-0">⚠</span>
                <p className="text-xs text-amber-800 font-medium">{notice}</p>
              </div>
            ) : (
              <div key={i} className="flex items-start gap-2 bg-gray-50 rounded-lg px-3 py-2">
                <span className="text-gray-400 mt-0.5 shrink-0">•</span>
                <p className="text-xs text-gray-600">{notice}</p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
