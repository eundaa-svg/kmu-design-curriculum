import { useState } from 'react'
import { useStore } from '../store/useStore'
import { departments } from '../data'
import Card from '../components/ui/Card'
import { AlertTriangle } from 'lucide-react'
import { useToast } from '../hooks/useToast'

export default function Settings() {
  const { myDepartmentId, setMyDepartment, resetProgress, nickname, setNickname } = useStore()
  const toast = useToast()
  const [editingNickname, setEditingNickname] = useState(false)
  const [nicknameInput, setNicknameInput] = useState(nickname)

  return (
    <div className="page-enter" style={{ maxWidth: 640, margin: '0 auto' }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ font: 'var(--font-heading-xl)', fontFamily: 'var(--font-family)', color: 'var(--color-text-primary)' }}>
          설정
        </h1>
      </div>

      {/* 닉네임 */}
      <Card style={{ marginBottom: 16 }}>
        <h2 style={{ font: 'var(--font-body-base)', fontFamily: 'var(--font-family)', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 12 }}>
          닉네임
        </h2>
        {editingNickname ? (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input
              type="text"
              value={nicknameInput}
              onChange={(e) => setNicknameInput(e.target.value.slice(0, 10))}
              maxLength={10}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') { setNickname(nicknameInput.trim()); setEditingNickname(false) }
                if (e.key === 'Escape') { setNicknameInput(nickname); setEditingNickname(false) }
              }}
              style={{
                flex: 1,
                height: 36,
                border: '1px solid var(--color-accent-blue)',
                borderRadius: 8,
                padding: '0 12px',
                fontFamily: 'var(--font-family)',
                fontSize: 14,
                color: 'var(--color-text-primary)',
                outline: 'none',
                background: 'var(--color-bg-primary)',
              }}
            />
            <button
              onClick={() => { setNickname(nicknameInput.trim()); setEditingNickname(false); toast.success('닉네임이 저장되었습니다.') }}
              style={{
                height: 36, padding: '0 14px', borderRadius: 8,
                border: 'none', background: 'var(--color-accent-blue)',
                color: '#fff', fontFamily: 'var(--font-family)', fontSize: 13,
                fontWeight: 500, cursor: 'pointer',
              }}
            >
              저장
            </button>
            <button
              onClick={() => { setNicknameInput(nickname); setEditingNickname(false) }}
              style={{
                height: 36, padding: '0 14px', borderRadius: 8,
                border: '1px solid var(--color-border)', background: 'transparent',
                color: 'var(--color-text-secondary)', fontFamily: 'var(--font-family)',
                fontSize: 13, cursor: 'pointer',
              }}
            >
              취소
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: 'var(--font-family)', fontSize: 14, color: nickname ? 'var(--color-text-primary)' : 'var(--color-text-muted)' }}>
              {nickname || '닉네임 미설정'}
            </span>
            <button
              onClick={() => { setNicknameInput(nickname); setEditingNickname(true) }}
              style={{
                height: 30, padding: '0 12px', borderRadius: 7,
                border: '1px solid var(--color-border)', background: 'var(--color-bg-primary)',
                color: 'var(--color-text-secondary)', fontFamily: 'var(--font-family)',
                fontSize: 12, cursor: 'pointer',
              }}
            >
              수정
            </button>
          </div>
        )}
      </Card>

      {/* Dept select */}
      <Card style={{ marginBottom: 16 }}>
        <h2 style={{ font: 'var(--font-body-base)', fontFamily: 'var(--font-family)', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 12 }}>
          학과 설정
        </h2>
        <p style={{ font: 'var(--font-body-sm)', fontFamily: 'var(--font-family)', color: 'var(--color-text-secondary)', marginBottom: 14 }}>
          현재 소속 학과를 선택하세요.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {departments.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setMyDepartment(dept.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '6px 12px',
                borderRadius: 8,
                border: myDepartmentId === dept.id
                  ? '1px solid var(--color-accent-blue)'
                  : '1px solid var(--color-border)',
                background: myDepartmentId === dept.id
                  ? 'var(--color-accent-blue-light)'
                  : 'var(--color-bg-card)',
                cursor: 'pointer',
                fontFamily: 'var(--font-family)',
                fontSize: 13,
                fontWeight: myDepartmentId === dept.id ? 500 : 400,
                color: myDepartmentId === dept.id
                  ? 'var(--color-accent-blue)'
                  : 'var(--color-text-secondary)',
                transition: 'all 150ms',
              }}
            >
              {dept.shortName}
            </button>
          ))}
        </div>
      </Card>

      {/* Danger zone */}
      <Card style={{ borderColor: 'var(--color-accent-red-light)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <AlertTriangle size={18} style={{ color: 'var(--color-accent-red)' }} />
          <h2 style={{ font: 'var(--font-body-base)', fontFamily: 'var(--font-family)', fontWeight: 600, color: 'var(--color-accent-red)' }}>
            초기화
          </h2>
        </div>
        <p style={{ font: 'var(--font-body-sm)', fontFamily: 'var(--font-family)', color: 'var(--color-text-secondary)', marginBottom: 14 }}>
          이수 현황을 모두 초기화합니다. 이 작업은 되돌릴 수 없습니다.
        </p>
        <button
          onClick={() => {
            if (window.confirm('이수 현황을 초기화하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
              resetProgress()
            }
          }}
          style={{
            height: 36,
            padding: '0 16px',
            borderRadius: 8,
            border: '1px solid var(--color-accent-red)',
            background: 'transparent',
            color: 'var(--color-accent-red)',
            fontFamily: 'var(--font-family)',
            fontSize: 13,
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'background 150ms',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-accent-red-light)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          이수 현황 초기화
        </button>
      </Card>
    </div>
  )
}
