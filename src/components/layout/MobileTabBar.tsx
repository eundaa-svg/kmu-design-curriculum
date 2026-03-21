import { NavLink } from 'react-router-dom'
import { LayoutDashboard, BookOpen, CheckCircle, Search, MoreHorizontal } from 'lucide-react'

const tabs = [
  { to: '/', icon: <LayoutDashboard size={22} />, label: '대시보드', end: true },
  { to: '/department', icon: <BookOpen size={22} />, label: '커리큘럼' },
  { to: '/progress', icon: <CheckCircle size={22} />, label: '이수현황' },
  { to: '/search', icon: <Search size={22} />, label: '검색' },
  { to: '/settings', icon: <MoreHorizontal size={22} />, label: '더보기' },
]

export default function MobileTabBar() {
  return (
    <nav
      style={{
        height: 56,
        background: 'var(--color-bg-card)',
        borderTop: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        flexShrink: 0,
      }}
    >
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.end}
          style={({ isActive }) => ({
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 3,
            height: '100%',
            textDecoration: 'none',
            color: isActive ? 'var(--color-accent-blue)' : 'var(--color-text-muted)',
            fontFamily: 'var(--font-family)',
            fontSize: 10,
            fontWeight: isActive ? 500 : 400,
            transition: 'color 150ms',
          })}
        >
          {tab.icon}
          <span>{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
