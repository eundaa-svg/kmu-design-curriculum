import { useState } from 'react'
import { departments } from '../data'
import type { Course } from '../types'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import { GitCompare } from 'lucide-react'

const DEPT_COLORS: Record<string, string> = {
  'industrial-design': '#2563EB', 'visual-design': '#8B5CF6',
  'metal-craft': '#F59E0B', 'ceramic-craft': '#EC4899',
  'fashion-design': '#06B6D4', 'spatial-design': '#10B981',
  'moving-image': '#EF4444', 'automotive-design': '#F97316', 'ai-design': '#6366F1',
}

function DeptSelector({
  value, onChange, exclude, label,
}: {
  value: string; onChange: (id: string) => void; exclude: string; label: string
}) {
  return (
    <div>
      <p style={{ fontFamily: 'var(--font-family)', fontSize: 12, fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {label}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {departments.filter(d => d.id !== exclude).map(dept => {
          const color = DEPT_COLORS[dept.id] ?? '#64748B'
          const isSelected = value === dept.id
          return (
            <button
              key={dept.id}
              onClick={() => onChange(dept.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                padding: '5px 10px', borderRadius: 8,
                border: `1.5px solid ${isSelected ? color : 'var(--color-border)'}`,
                background: isSelected ? `${color}14` : 'var(--color-bg-primary)',
                color: isSelected ? color : 'var(--color-text-secondary)',
                fontFamily: 'var(--font-family)', fontSize: 12,
                fontWeight: isSelected ? 600 : 400,
                cursor: 'pointer', transition: 'all 150ms',
              }}
            >
              <span style={{ fontSize: 14 }}>{dept.icon}</span>
              {dept.shortName}
            </button>
          )
        })}
      </div>
    </div>
  )
}

interface Stats {
  total: number; required: number; elective: number; capstone: number;
  credits: number; byYear: Record<number, number>
}

function calcStats(courses: Course[]): Stats {
  return {
    total: courses.length,
    required: courses.filter(c => c.category === 'required').length,
    elective: courses.filter(c => c.category === 'elective').length,
    capstone: courses.filter(c => c.isCapstone).length,
    credits: courses.reduce((s, c) => s + c.credits, 0),
    byYear: courses.reduce((acc, c) => {
      acc[c.year] = (acc[c.year] ?? 0) + 1
      return acc
    }, {} as Record<number, number>),
  }
}

function StatRow({ label, a, b, higher = 'either' }: {
  label: string; a: number; b: number; higher?: 'a' | 'b' | 'either'
}) {
  const aWins = a > b
  const bWins = b > a
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '1fr auto 1fr',
      alignItems: 'center', gap: 12, padding: '10px 0',
      borderBottom: '1px solid var(--color-border)',
    }}>
      <span style={{
        fontFamily: 'var(--font-family)', fontSize: 14, fontWeight: aWins && higher !== 'either' ? 600 : 400,
        color: aWins && higher !== 'either' ? 'var(--color-accent-blue)' : 'var(--color-text-primary)',
        textAlign: 'right',
      }}>
        {a}
      </span>
      <span style={{
        fontFamily: 'var(--font-family)', fontSize: 12,
        color: 'var(--color-text-muted)', textAlign: 'center', whiteSpace: 'nowrap',
      }}>
        {label}
      </span>
      <span style={{
        fontFamily: 'var(--font-family)', fontSize: 14, fontWeight: bWins && higher !== 'either' ? 600 : 400,
        color: bWins && higher !== 'either' ? 'var(--color-accent-blue)' : 'var(--color-text-primary)',
        textAlign: 'left',
      }}>
        {b}
      </span>
    </div>
  )
}

export default function Compare() {
  const [deptA, setDeptA] = useState('')
  const [deptB, setDeptB] = useState('')

  const deptAData = departments.find(d => d.id === deptA)
  const deptBData = departments.find(d => d.id === deptB)
  const statsA = deptAData ? calcStats(deptAData.courses) : null
  const statsB = deptBData ? calcStats(deptBData.courses) : null

  const colorA = deptA ? (DEPT_COLORS[deptA] ?? '#64748B') : 'var(--color-accent-blue)'
  const colorB = deptB ? (DEPT_COLORS[deptB] ?? '#64748B') : 'var(--color-accent-indigo)'

  return (
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <GitCompare size={24} style={{ color: 'var(--color-accent-blue)' }} />
          <h1 style={{ font: 'var(--font-heading-xl)', fontFamily: 'var(--font-family)', color: 'var(--color-text-primary)' }}>
            학과 비교
          </h1>
        </div>
        <p style={{ font: 'var(--font-body-sm)', fontFamily: 'var(--font-family)', color: 'var(--color-text-secondary)' }}>
          두 학과의 커리큘럼을 비교합니다.
        </p>
      </div>

      {/* Selectors */}
      <Card style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <DeptSelector value={deptA} onChange={setDeptA} exclude={deptB} label="학과 A" />
          <DeptSelector value={deptB} onChange={setDeptB} exclude={deptA} label="학과 B" />
        </div>
      </Card>

      {/* Empty state */}
      {(!deptA || !deptB) && (
        <div style={{
          textAlign: 'center', padding: '60px 20px',
          color: 'var(--color-text-muted)', fontFamily: 'var(--font-family)', fontSize: 14,
        }}>
          비교할 두 학과를 선택해주세요.
        </div>
      )}

      {/* Comparison */}
      {deptAData && deptBData && statsA && statsB && (
        <>
          {/* Header */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 12, marginBottom: 12, alignItems: 'center' }}>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: 20 }}>{deptAData.icon}</span>
              <p style={{ fontFamily: 'var(--font-family)', fontSize: 14, fontWeight: 700, color: colorA, marginTop: 4 }}>
                {deptAData.name}
              </p>
            </div>
            <span style={{ fontFamily: 'var(--font-family)', fontSize: 12, color: 'var(--color-text-muted)' }}>VS</span>
            <div style={{ textAlign: 'left' }}>
              <span style={{ fontSize: 20 }}>{deptBData.icon}</span>
              <p style={{ fontFamily: 'var(--font-family)', fontSize: 14, fontWeight: 700, color: colorB, marginTop: 4 }}>
                {deptBData.name}
              </p>
            </div>
          </div>

          <Card style={{ marginBottom: 16 }}>
            <h2 style={{ fontFamily: 'var(--font-family)', fontSize: 13, fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 8 }}>
              전체 통계
            </h2>
            <StatRow label="총 과목 수" a={statsA.total} b={statsB.total} />
            <StatRow label="총 학점" a={statsA.credits} b={statsB.credits} />
            <StatRow label="필수 과목" a={statsA.required} b={statsB.required} />
            <StatRow label="선택 과목" a={statsA.elective} b={statsB.elective} />
            <StatRow label="캡스톤 과목" a={statsA.capstone} b={statsB.capstone} />
          </Card>

          <Card style={{ marginBottom: 16 }}>
            <h2 style={{ fontFamily: 'var(--font-family)', fontSize: 13, fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 8 }}>
              학년별 과목 수
            </h2>
            {[1, 2, 3, 4].map(y => (
              <StatRow key={y} label={`${y}학년`} a={statsA.byYear[y] ?? 0} b={statsB.byYear[y] ?? 0} />
            ))}
          </Card>

          {/* Course list side-by-side */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {([
              [deptAData, colorA] as const,
              [deptBData, colorB] as const,
            ]).map(([dept, color]) => (
              <Card key={dept.id}>
                <h2 style={{ fontFamily: 'var(--font-family)', fontSize: 13, fontWeight: 700, color, marginBottom: 12 }}>
                  {dept.shortName} 과목 목록
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {dept.courses.slice(0, 20).map(c => (
                    <div key={c.id} style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '6px 8px', borderRadius: 6,
                      background: 'var(--color-bg-primary)',
                      gap: 6,
                    }}>
                      <span style={{ fontFamily: 'var(--font-family)', fontSize: 12, color: 'var(--color-text-primary)', flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {c.name}
                      </span>
                      <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                        <Badge variant={c.category === 'required' ? 'required' : 'elective'} />
                        {c.isCapstone && <Badge variant="capstone" />}
                      </div>
                    </div>
                  ))}
                  {dept.courses.length > 20 && (
                    <p style={{ fontFamily: 'var(--font-family)', fontSize: 12, color: 'var(--color-text-muted)', textAlign: 'center', paddingTop: 4 }}>
                      +{dept.courses.length - 20}개 더
                    </p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
