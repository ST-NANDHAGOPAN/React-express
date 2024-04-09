import { lazy, FC, Suspense } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { MasterLayout } from '../layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import { getCSSVariableValue } from '../assets/ts/_utils'
import { WithChildren } from '../helpers'
import { DashboardWrapper } from '../pages/dashboard/DashboardWrapper'

const PrivateRoutes = () => {
  
  // const KonvaPage = lazy(() => import('../modules/apps/konvajs/KonvaPage'))
  return (
    <Routes>
      <Route element={<MasterLayout />}>

        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        <Route path='dashboard' element={<DashboardWrapper />} />
        {/* Lazy Loading */}
         {/* <Route
          path='/konva-management/*'
          element={
            <SuspensedView>
              <KonvaPage />
            </SuspensedView>
          }
        /> */}
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/dashboard' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export { PrivateRoutes }
