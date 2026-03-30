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
  Target,
  Users,
  Lightbulb,
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

  const w = collapsed ? 72 : 256

  return (
    <>
    <aside
      style={{
        width: w,
        minWidth: w,
        height: '100vh',
        background: '#FFFFFF',
        borderRight: '1px solid #E5E5E5',
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
        {/* ── CAREER group ── */}
        {!collapsed && (
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: '#BBBBBB',
              padding: '4px 12px 4px',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-family)',
            }}
          >
            Career
          </div>
        )}
        <NavItem to="/alumni" icon={<Users size={20} />} label="졸업생 커리어" collapsed={collapsed} />
        <NavItem to="/recommend" icon={<Lightbulb size={20} />} label="직군별 추천" collapsed={collapsed} />
        <NavItem to="/career-fit" icon={<Target size={20} />} label="커리어 적합도" collapsed={collapsed} />

        {/* Divider */}
        <div style={{ height: 1, background: 'var(--color-border)', margin: '12px 0' }} />

        {/* ── CURRICULUM group ── */}
        {!collapsed && (
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: '#BBBBBB',
              padding: '4px 12px 4px',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-family)',
            }}
          >
            Curriculum
          </div>
        )}

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
              background: isDeptActive ? '#111111' : 'transparent',
              color: isDeptActive ? '#FFFFFF' : '#888888',
              cursor: 'pointer',
              transition: 'background 150ms, color 150ms',
              fontFamily: 'var(--font-family)',
              fontSize: 15,
              fontWeight: isDeptActive ? 600 : 400,
            }}
            onMouseEnter={(e) => {
              if (!isDeptActive) {
                e.currentTarget.style.background = '#F5F5F5'
                e.currentTarget.style.color = '#111111'
                e.currentTarget.style.fontWeight = '500'
              }
            }}
            onMouseLeave={(e) => {
              if (!isDeptActive) {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#888888'
                e.currentTarget.style.fontWeight = '400'
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
                        color: isActive ? '#111111' : '#999999',
                        background: 'transparent',
                        fontWeight: isActive ? 600 : 400,
                        transition: 'background 150ms, color 150ms',
                      })}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget
                        if (!el.classList.contains('active')) {
                          el.style.background = '#F5F5F5'
                          el.style.color = '#111111'
                        }
                        if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
                        setHoveredDept({ id: dept.id, color: deptColor })
                        setWireframeVisible(true)
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget
                        // active 여부와 무관하게 hover 배경은 항상 초기화
                        // (active 상태의 배경은 transparent이므로 덮어써도 무방)
                        el.style.background = 'transparent'
                        if (!el.classList.contains('active')) {
                          el.style.color = '#999999'
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

        <NavItem to="/progress" icon={<CheckCircle size={20} />} label="이수 현황" collapsed={collapsed} />
        <NavItem to="/search" icon={<Search size={20} />} label="교과목 검색" collapsed={collapsed} />
        <NavItem to="/graduation" icon={<GraduationCap size={20} />} label="졸업 요건" collapsed={collapsed} />

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
            border: '1px solid #E5E5E5',
            borderRadius: 8,
            background: '#FFFFFF',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#999999',
            flexShrink: 0,
            transition: 'background 150ms, color 150ms',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#F5F5F5'
            e.currentTarget.style.color = '#111111'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#FFFFFF'
            e.currentTarget.style.color = '#999999'
          }}
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
        color: isActive ? '#FFFFFF' : '#888888',
        background: isActive ? '#111111' : 'transparent',
        transition: 'background 150ms, color 150ms',
      })}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        const active = el.style.background === 'rgb(17, 17, 17)' || el.style.background === '#111111'
        if (!active) {
          el.style.background = '#F5F5F5'
          el.style.color = '#111111'
          el.style.fontWeight = '500'
        }
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        const active = el.style.background === 'rgb(17, 17, 17)' || el.style.background === '#111111'
        if (!active) {
          el.style.background = 'transparent'
          el.style.color = '#888888'
          el.style.fontWeight = '400'
        }
      }}
    >
      <span style={{ flexShrink: 0 }}>{icon}</span>
      {!collapsed && <span style={{ whiteSpace: 'nowrap' }}>{label}</span>}
    </NavLink>
  )
}
