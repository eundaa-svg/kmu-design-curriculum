import { useState, useEffect, useRef } from 'react'
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
} from 'lucide-react'
import { departments } from '../../data'
import DeptWireframe from './DeptWireframe'

const DEPT_COLORS = [
  '#FF0017', // 공업디자인
  '#FF006A', // 시각디자인
  '#FFC900', // 금속공예
  '#FF7700', // 도자공예
  '#8E008E', // 의상디자인
  '#008AC2', // 공간디자인
  '#00BCB5', // 영상디자인
  '#2B50B6', // 자동차운송디자인
  '#00CC00', // AI디자인
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
  const [hoveredDept, setHoveredDept] = useState<{ id: string; color: string } | null>(null)
  const [wireframeVisible, setWireframeVisible] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const isDeptActive = location.pathname.startsWith('/department')

  useEffect(() => {
    if (isDeptActive) setDeptExpanded(true)
  }, [isDeptActive])

  const navItems = [
    { to: '/', icon: <LayoutDashboard size={20} />, label: '대시보드', exact: true },
    { to: '/progress', icon: <CheckCircle size={20} />, label: '이수 현황' },
    { to: '/search', icon: <Search size={20} />, label: '교과목 검색' },
    { to: '/graduation', icon: <GraduationCap size={20} />, label: '졸업 요건' },
  ]

  const w = collapsed ? 72 : 256

  return (
    <>
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
        onClick={() => navigate('/')}
        style={{
          padding: collapsed ? '12px 0' : '12px 16px',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          cursor: 'pointer',
          background: '#111111',
        }}
      >
        <img
          src="/kmu_logo.png"
          alt="KMU Design"
          style={{
            width: collapsed ? 36 : 120,
            height: 'auto',
            display: 'block',
            transition: 'width 250ms ease',
          }}
        />
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
              background: isDeptActive ? 'var(--color-accent-blue-light)' : 'transparent',
              color: isDeptActive ? 'var(--color-accent-blue)' : 'var(--color-text-secondary)',
              cursor: 'pointer',
              transition: 'background 150ms, color 150ms',
              fontFamily: 'var(--font-family)',
              fontSize: 15,
              fontWeight: isDeptActive ? 600 : 400,
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
                {departments.map((dept, i) => {
                  const deptColor = DEPT_COLORS[i % DEPT_COLORS.length]
                  return (
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
                          el.style.color = deptColor
                        }
                        if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
                        setHoveredDept({ id: dept.id, color: deptColor })
                        setWireframeVisible(true)
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget
                        if (!el.classList.contains('active')) {
                          el.style.background = 'transparent'
                          el.style.color = 'var(--color-text-secondary)'
                        }
                        setWireframeVisible(false)
                        hideTimerRef.current = setTimeout(() => setHoveredDept(null), 300)
                      }}
                    >
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: deptColor,
                          flexShrink: 0,
                        }}
                      />
                      {dept.shortName}
                    </NavLink>
                  )
                })}
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

      {/* Bottom: collapse */}
      <div
        style={{
          padding: collapsed ? '12px 8px' : '12px 16px',
          borderTop: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
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

      {/* ── 3D 와이어프레임 오버레이 ── */}
      {hoveredDept && (
        <div
          style={{
            position: 'fixed',
            left: mousePos.x + 20,
            top: mousePos.y + 20,
            opacity: wireframeVisible ? 1 : 0,
            transition: wireframeVisible
              ? 'opacity 150ms ease-out'
              : 'opacity 200ms ease-in',
            zIndex: 9999,
            pointerEvents: 'none',
            width: 150,
            height: 150,
          }}
        >
          <DeptWireframe
            departmentId={hoveredDept.id}
            color={hoveredDept.color}
            mouseX={mousePos.x}
            mouseY={mousePos.y}
          />
        </div>
      )}
    </>
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
        fontWeight: isActive ? 600 : 400,
        color: isActive ? 'var(--color-accent-blue)' : 'var(--color-text-secondary)',
        background: isActive ? 'var(--color-accent-blue-light)' : 'transparent',
        transition: 'background 150ms, color 150ms',
      })}
      onMouseEnter={(e) => {
        const isActive = e.currentTarget.style.background === 'var(--color-accent-blue-light)'
        if (!isActive) {
          e.currentTarget.style.background = 'var(--color-bg-hover)'
          e.currentTarget.style.color = 'var(--color-text-primary)'
        }
      }}
      onMouseLeave={(e) => {
        const isActive = e.currentTarget.style.background === 'var(--color-accent-blue-light)'
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
