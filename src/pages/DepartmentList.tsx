import { Link } from 'react-router-dom'
import { departments } from '../data'
import Card from '../components/ui/Card'
import { ArrowRight } from 'lucide-react'

const DEPT_COLORS = [
  '#2563EB', '#6366F1', '#10B981', '#F59E0B',
  '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316',
]

export default function DepartmentList() {
  return (
    <div className="page-enter" style={{ maxWidth: 1000, margin: '0 auto' }}>
      <div style={{ marginBottom: 28 }}>
        <h1
          style={{
            font: 'var(--font-heading-xl)',
            fontFamily: 'var(--font-family)',
            color: 'var(--color-text-primary)',
          }}
        >
          커리큘럼
        </h1>
        <p
          style={{
            font: 'var(--font-body-base)',
            fontFamily: 'var(--font-family)',
            color: 'var(--color-text-secondary)',
            marginTop: 6,
          }}
        >
          학과를 선택하여 교육과정을 확인하세요.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 16,
        }}
      >
        {departments.map((dept, i) => (
          <Link key={dept.id} to={`/department/${dept.id}`} style={{ textDecoration: 'none' }}>
            <Card hover style={{ height: '100%' }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: `${DEPT_COLORS[i % DEPT_COLORS.length]}18`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 26,
                  marginBottom: 14,
                }}
              >
                {dept.icon}
              </div>
              <h3
                style={{
                  font: 'var(--font-heading-md)',
                  fontFamily: 'var(--font-family)',
                  color: 'var(--color-text-primary)',
                  marginBottom: 6,
                }}
              >
                {dept.name}
              </h3>
              <p
                style={{
                  font: 'var(--font-body-sm)',
                  fontFamily: 'var(--font-family)',
                  color: 'var(--color-text-secondary)',
                  marginBottom: 16,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {dept.description}
              </p>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 'auto',
                }}
              >
                <span
                  style={{
                    font: 'var(--font-body-sm)',
                    fontFamily: 'var(--font-family)',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  {dept.courses.length}개 교과목
                </span>
                <ArrowRight
                  size={16}
                  style={{ color: DEPT_COLORS[i % DEPT_COLORS.length] }}
                />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
