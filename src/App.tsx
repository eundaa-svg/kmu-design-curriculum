import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'

const DashboardHome = lazy(() => import('./pages/DashboardHome'))
const DepartmentList = lazy(() => import('./pages/DepartmentList'))
const DepartmentDetail = lazy(() => import('./pages/DepartmentDetail'))
const ProgressTracker = lazy(() => import('./pages/ProgressTracker'))
const CourseSearch = lazy(() => import('./pages/CourseSearch'))
const GraduationCheck = lazy(() => import('./pages/GraduationCheck'))
const Settings = lazy(() => import('./pages/Settings'))
const JobRecommend = lazy(() => import('./pages/JobRecommend'))

function PageLoader() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        minHeight: 200,
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '3px solid var(--color-border)',
          borderTopColor: 'var(--color-accent-blue)',
          animation: 'spin 0.7s linear infinite',
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="department" element={<DepartmentList />} />
            <Route path="department/:deptId" element={<DepartmentDetail />} />
            <Route path="progress" element={<ProgressTracker />} />
            <Route path="search" element={<CourseSearch />} />
            <Route path="graduation" element={<GraduationCheck />} />
            <Route path="recommend" element={<JobRecommend />} />
            <Route path="settings" element={<Settings />} />

          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
