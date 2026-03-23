import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Sidebar from './Sidebar'
import Header from './Header'
import MobileTabBar from './MobileTabBar'
import OnboardingModal from '../onboarding/OnboardingModal'
import ToastContainer from '../ui/Toast'
import { useStore } from '../../store/useStore'

const STORAGE_KEY = 'sidebar-collapsed'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return isMobile
}

export default function AppLayout() {
  const { myDepartmentId } = useStore()
  const [onboardingDone, setOnboardingDone] = useState(() => !!myDepartmentId)
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved !== null) return JSON.parse(saved)
    return window.innerWidth < 1024
  })
  const isMobile = useIsMobile()
  const location = useLocation()

  const toggle = () => {
    setCollapsed((v) => {
      const next = !v
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {!onboardingDone && (
        <OnboardingModal onComplete={() => setOnboardingDone(true)} />
      )}
      <ToastContainer />
      {/* Sidebar — hidden on mobile */}
      {!isMobile && <Sidebar collapsed={collapsed} onToggle={toggle} />}

      {/* Right side */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          minWidth: 0,
        }}
      >
        <Header />

        {/* Page content with route transition */}
        <main
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: isMobile ? '20px 16px' : '32px',
            background: 'var(--color-bg-primary)',
            position: 'relative',
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              style={{ minHeight: '100%' }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Mobile tab bar */}
        {isMobile && <MobileTabBar />}
      </div>
    </div>
  )
}
