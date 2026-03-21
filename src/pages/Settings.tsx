import { useRef, useState } from 'react'
import { useStore } from '../store/useStore'
import { departments } from '../data'
import Card from '../components/ui/Card'
import { AlertTriangle, Download, Upload } from 'lucide-react'
import { useToast } from '../hooks/useToast'

export default function Settings() {
  const { selectedDepartmentId, selectDepartment, resetProgress, studentProgress, nickname, setNickname } = useStore()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const toast = useToast()
  const [editingNickname, setEditingNickname] = useState(false)
  const [nicknameInput, setNicknameInput] = useState(nickname)

  const handleExport = () => {
    const data = {
      selectedDepartmentId,
      studentProgress,
      exportedAt: new Date().toISOString(),
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `curriculum-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('데이터를 내보냈습니다.')
  }

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string)
        if (!data.selectedDepartmentId || !data.studentProgress) {
          toast.error('올바른 백업 파일이 아닙니다.')
          return
        }
        useStore.setState({
          selectedDepartmentId: data.selectedDepartmentId,
          studentProgress: data.studentProgress,
        })
        toast.success('데이터를 불러왔습니다.')
      } catch {
        toast.error('파일을 읽는 중 오류가 발생했습니다.')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <div style={{ maxWidth: 640, margin: '0 auto' }}>
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
              onClick={() => selectDepartment(dept.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '6px 12px',
                borderRadius: 8,
                border: selectedDepartmentId === dept.id
                  ? '1px solid var(--color-accent-blue)'
                  : '1px solid var(--color-border)',
                background: selectedDepartmentId === dept.id
                  ? 'var(--color-accent-blue-light)'
                  : 'var(--color-bg-card)',
                cursor: 'pointer',
                fontFamily: 'var(--font-family)',
                fontSize: 13,
                fontWeight: selectedDepartmentId === dept.id ? 500 : 400,
                color: selectedDepartmentId === dept.id
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

      {/* Export / Import */}
      <Card style={{ marginBottom: 16 }}>
        <h2 style={{ font: 'var(--font-body-base)', fontFamily: 'var(--font-family)', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 12 }}>
          데이터 내보내기 / 불러오기
        </h2>
        <p style={{ font: 'var(--font-body-sm)', fontFamily: 'var(--font-family)', color: 'var(--color-text-secondary)', marginBottom: 14 }}>
          이수 현황 데이터를 JSON 파일로 내보내거나, 이전에 내보낸 파일을 불러올 수 있습니다.
        </p>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={handleExport}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              height: 36, padding: '0 16px', borderRadius: 8,
              border: '1px solid var(--color-border)',
              background: 'var(--color-bg-primary)',
              color: 'var(--color-text-secondary)',
              fontFamily: 'var(--font-family)', fontSize: 13, fontWeight: 500, cursor: 'pointer',
              transition: 'background 150ms',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-border)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--color-bg-primary)')}
          >
            <Download size={14} /> 내보내기
          </button>
          <input ref={fileInputRef} type="file" accept=".json" style={{ display: 'none' }} onChange={handleImport} />
          <button
            onClick={() => fileInputRef.current?.click()}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              height: 36, padding: '0 16px', borderRadius: 8,
              border: '1px solid var(--color-accent-blue)',
              background: 'var(--color-accent-blue-light)',
              color: 'var(--color-accent-blue)',
              fontFamily: 'var(--font-family)', fontSize: 13, fontWeight: 500, cursor: 'pointer',
              transition: 'background 150ms',
            }}
          >
            <Upload size={14} /> 불러오기
          </button>
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
