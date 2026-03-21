import { useState, useEffect } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  BookOpen,
  CheckCircle,
  Search,
  GraduationCap,
  Settings,
  ChevronsLeft,
  ChevronsRight,
  ChevronDown,
  ChevronRight,
  Moon,
  Sun,
  GitCompare,
} from 'lucide-react'
import { departments } from '../../data'
import { useTheme } from '../../hooks/useTheme'

const DEPT_COLORS = [
  '#2563EB',
  '#6366F1',
  '#10B981',
  '#F59E0B',
  '#EF4444',
  '#8B5CF6',
  '#EC4899',
  '#14B8A6',
  '#F97316',
]

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const [deptExpanded, setDeptExpanded] = useState(
    location.pathname.startsWith('/department')
  )

  const isDeptActive = location.pathname.startsWith('/department')
  const { isDark, toggle: toggleTheme } = useTheme()

  useEffect(() => {
    if (isDeptActive) setDeptExpanded(true)
  }, [isDeptActive])

  const navItems = [
    { to: '/', icon: <LayoutDashboard size={20} />, label: '대시보드', exact: true },
    { to: '/progress', icon: <CheckCircle size={20} />, label: '이수 현황' },
    { to: '/search', icon: <Search size={20} />, label: '교과목 검색' },
    { to: '/graduation', icon: <GraduationCap size={20} />, label: '졸업 요건' },
    { to: '/compare', icon: <GitCompare size={20} />, label: '학과 비교' },
  ]

  const w = collapsed ? 72 : 256

  return (
    <aside
      style={{
        width: w,
        minWidth: w,
        height: '100vh',
        background: 'var(--color-bg-sidebar)',
        borderRight: '1px solid var(--color-border)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'width 250ms ease, min-width 250ms ease',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: collapsed ? '16px 0' : '16px 12px',
          paddingBottom: 24,
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          justifyContent: collapsed ? 'center' : 'flex-start',
          flexShrink: 0,
        }}
      >
        <svg
          width={32}
          height={32}
          viewBox="0 0 32 32"
          fill="none"
          style={{ flexShrink: 0 }}
        >
          <rect width={32} height={32} rx={8} fill="var(--color-accent-blue)" />
          <path
            d="M8 22 L16 10 L24 22"
            stroke="white"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <circle cx={16} cy={17} r={3} fill="white" opacity={0.6} />
        </svg>
        {!collapsed && (
          <span
            style={{
              font: 'var(--font-heading-md)',
              fontFamily: 'var(--font-family)',
              color: 'var(--color-text-primary)',
              whiteSpace: 'nowrap',
            }}
          >
            조형대학
          </span>
        )}
      </div>

      {/* Nav */}
      <nav
        style={{
          flex: 1,
          padding: collapsed ? '16px 8px' : '16px 12px',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        {/* Dashboard */}
        <NavItem
          to="/"
          icon={<LayoutDashboard size={20} />}
          label="대시보드"
          collapsed={collapsed}
          end
        />

        {/* 커리큘럼 (expandable) */}
        <div>
          <button
            onClick={() => {
              if (collapsed) {
                navigate('/department')
              } else {
                setDeptExpanded((v) => !v)
              }
            }}
            style={{
              width: '100%',
              height: 42,
              borderRadius: 10,
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: collapsed ? '0' : '0 12px',
              justifyContent: collapsed ? 'center' : 'flex-start',
              background: isDeptActive ? 'var(--color-accent-blue)' : 'transparent',
              color: isDeptActive ? '#fff' : 'var(--color-text-secondary)',
              cursor: 'pointer',
              transition: 'background 150ms, color 150ms',
              fontFamily: 'var(--font-family)',
              fontSize: 15,
              fontWeight: isDeptActive ? 500 : 400,
            }}
            onMouseEnter={(e) => {
              if (!isDeptActive) {
                e.currentTarget.style.background = '#F1F5F9'
                e.currentTarget.style.color = 'var(--color-text-primary)'
              }
            }}
            onMouseLeave={(e) => {
              if (!isDeptActive) {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = 'var(--color-text-secondary)'
              }
            }}
          >
            <span style={{ flexShrink: 0 }}>
              <BookOpen size={20} />
            </span>
            {!collapsed && (
              <>
                <span style={{ flex: 1, textAlign: 'left' }}>커리큘럼</span>
                {deptExpanded ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
              </>
            )}
          </button>

          {/* Dept sub-menu */}
          {!collapsed && (
            <div
              style={{
                overflow: 'hidden',
                maxHeight: deptExpanded ? `${departments.length * 36 + 8}px` : '0',
                transition: 'max-height 200ms ease',
              }}
            >
              <div style={{ paddingTop: 4, paddingBottom: 4 }}>
                {departments.map((dept, i) => (
                  <NavLink
                    key={dept.id}
                    to={`/department/${dept.id}`}
                    style={({ isActive }) => ({
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      height: 34,
                      borderRadius: 8,
                      padding: '0 10px 0 28px',
                      textDecoration: 'none',
                      font: 'var(--font-body-sm)',
                      fontFamily: 'var(--font-family)',
                      color: isActive ? 'var(--color-accent-blue)' : 'var(--color-text-secondary)',
                      background: isActive ? 'var(--color-accent-blue-light)' : 'transparent',
                      fontWeight: isActive ? 500 : 400,
                      transition: 'background 150ms, color 150ms',
                    })}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget
                      if (!el.classList.contains('active')) {
                        el.style.background = '#F1F5F9'
                        el.style.color = 'var(--color-text-primary)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget
                      if (!el.classList.contains('active')) {
                        el.style.background = 'transparent'
                        el.style.color = 'var(--color-text-secondary)'
                      }
                    }}
                  >
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: DEPT_COLORS[i % DEPT_COLORS.length],
                        flexShrink: 0,
                      }}
                    />
                    {dept.shortName}
                  </NavLink>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Other nav items */}
        {navItems.slice(1).map((item) => (
          <NavItem
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
            collapsed={collapsed}
          />
        ))}

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: 'var(--color-border)',
            margin: '12px 0',
          }}
        />

        <NavItem
          to="/settings"
          icon={<Settings size={20} />}
          label="설정"
          collapsed={collapsed}
        />
      </nav>

      {/* Bottom: theme + collapse */}
      <div
        style={{
          padding: collapsed ? '12px 8px' : '12px 16px',
          borderTop: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          gap: 8,
          flexShrink: 0,
        }}
      >
        {/* 다크모드 토글 */}
        <button
          onClick={toggleTheme}
          title={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
          aria-label={isDark ? '라이트 모드' : '다크 모드'}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: collapsed ? 0 : 8,
            height: 32,
            padding: collapsed ? '0 8px' : '0 10px',
            borderRadius: 8,
            border: '1px solid var(--color-border)',
            background: isDark ? 'var(--color-accent-blue-light)' : 'var(--color-bg-card)',
            cursor: 'pointer',
            color: isDark ? 'var(--color-accent-blue)' : 'var(--color-text-secondary)',
            fontFamily: 'var(--font-family)',
            fontSize: 12,
            transition: 'all 150ms',
            flex: collapsed ? undefined : 1,
          }}
        >
          {isDark ? <Sun size={15} /> : <Moon size={15} />}
          {!collapsed && (isDark ? '라이트 모드' : '다크 모드')}
        </button>

        {/* 사이드바 접기 */}
        <button
          onClick={onToggle}
          title={collapsed ? '사이드바 펼치기' : '사이드바 접기'}
          style={{
            width: 32,
            height: 32,
            border: '1px solid var(--color-border)',
            borderRadius: 8,
            background: 'var(--color-bg-card)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-text-secondary)',
            flexShrink: 0,
            transition: 'background 150ms',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-bg-primary)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--color-bg-card)')}
        >
          {collapsed ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
        </button>
      </div>
    </aside>
  )
}

interface NavItemProps {
  to: string
  icon: React.ReactNode
  label: string
  collapsed: boolean
  end?: boolean
}

function NavItem({ to, icon, label, collapsed, end }: NavItemProps) {
  return (
    <NavLink
      to={to}
      end={end}
      style={({ isActive }) => ({
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        height: 42,
        borderRadius: 10,
        padding: collapsed ? '0' : '0 12px',
        justifyContent: collapsed ? 'center' : 'flex-start',
        textDecoration: 'none',
        fontFamily: 'var(--font-family)',
        fontSize: 15,
        fontWeight: isActive ? 500 : 400,
        color: isActive ? '#fff' : 'var(--color-text-secondary)',
        background: isActive ? 'var(--color-accent-blue)' : 'transparent',
        transition: 'background 150ms, color 150ms',
      })}
      onMouseEnter={(e) => {
        const isActive = e.currentTarget.style.background === 'var(--color-accent-blue)' ||
          e.currentTarget.style.background.includes('37, 99, 235')
        if (!isActive) {
          e.currentTarget.style.background = '#F1F5F9'
          e.currentTarget.style.color = 'var(--color-text-primary)'
        }
      }}
      onMouseLeave={(e) => {
        const isActive = e.currentTarget.style.background === 'var(--color-accent-blue)'
        if (!isActive) {
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.color = 'var(--color-text-secondary)'
        }
      }}
    >
      <span style={{ flexShrink: 0 }}>{icon}</span>
      {!collapsed && <span style={{ whiteSpace: 'nowrap' }}>{label}</span>}
    </NavLink>
  )
}
