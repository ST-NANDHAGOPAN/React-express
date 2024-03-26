import { lazy, FC, Suspense } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { MasterLayout } from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import { getCSSVariableValue } from '../../_metronic/assets/ts/_utils'
import { WithChildren } from '../../_metronic/helpers'
import { DashboardWrapper } from '../pages/dashboard/DashboardWrapper'

const PrivateRoutes = () => {
  const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))
  const EventsPage = lazy(() => import('../modules/apps/event-management/EventsPage'))
  const SeatPage = lazy(() => import('../modules/apps/seat-management/SeatPage'))
  const FabricPage = lazy(() => import('../modules/apps/fabricjs/FabricPage'))
  const KonvaPage = lazy(() => import('../modules/apps/konvajs/KonvaPage'))
  return (
    <Routes>
      <Route element={<MasterLayout />}>

        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        <Route path='dashboard' element={<DashboardWrapper />} />
        {/* Lazy Loading */}
        <Route
          path='/event-management/*'
          element={
            <SuspensedView>
              <EventsPage />
            </SuspensedView>
          }
        />
        <Route
          path='/user-management/*'
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />
         <Route
          path='/seat-management/*'
          element={
            <SuspensedView>
              <SeatPage />
            </SuspensedView>
          }
        />
        <Route
          path='/fabric-management/*'
          element={
            <SuspensedView>
              <FabricPage />
            </SuspensedView>
          }
        />
         <Route
          path='/konva-management/*'
          element={
            <SuspensedView>
              <KonvaPage />
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
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
