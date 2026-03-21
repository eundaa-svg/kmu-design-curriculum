import { useStore } from '../store/useStore';

export default function DepartmentOverview() {
  const { departments, selectedDepartmentId } = useStore();
  const dept = departments.find(d => d.id === selectedDepartmentId);
  if (!dept) return null;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-4 mb-4">
        <span className="text-4xl">{dept.icon}</span>
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">{dept.name}</h2>
          <p className="text-gray-500 mt-1">{dept.description}</p>
        </div>
      </div>
      <div className="bg-blue-50 rounded-xl p-4">
        <p className="text-sm font-semibold text-[#2563EB] mb-1">교육목표</p>
        <p className="text-sm text-gray-600">{dept.educationGoal}</p>
      </div>
    </div>
  );
}
