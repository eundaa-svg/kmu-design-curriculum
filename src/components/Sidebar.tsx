import { useStore } from '../store/useStore';

export default function Sidebar() {
  const { departments, myDepartmentId, setMyDepartment } = useStore();

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-lg font-bold text-[#111111]">조형대학</h1>
        <p className="text-xs text-gray-500 mt-1">국민대학교 커리큘럼 대시보드</p>
      </div>
      <nav className="flex-1 overflow-y-auto p-3">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 py-2">학과 목록</p>
        {departments.map(dept => (
          <button
            key={dept.id}
            onClick={() => setMyDepartment(dept.id)}
            className={`w-full text-left px-3 py-2.5 rounded-xl mb-1 flex items-center gap-3 transition-all duration-200 ${
              myDepartmentId === dept.id
                ? 'bg-[#111111] text-white shadow-md'
                : 'text-[#1E293B] hover:bg-gray-50'
            }`}
          >
            <span className="text-lg">{dept.icon}</span>
            <span className="text-sm font-medium">{dept.shortName}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
