import { lazy, FC, Suspense } from 'react'
import TopBarProgress from 'react-topbar-progress-indicator'
import { getCSSVariableValue } from '../assets/ts/_utils'
import { WithChildren } from '../helpers'
import { Route, Routes, Navigate } from 'react-router-dom'
import { MasterLayout } from '../layout/MasterLayout'
import BoardPage from '../pages/board/BoardPage'


const PrivateRoutes = () => {
  
  const Workspace = lazy(() => import('../pages/workspace/WorkspacePage'))
  return (
    <Routes>
      <Route element={<MasterLayout />}>

        <Route path='auth/*' element={<Navigate to='/board' />} />
        <Route path='board' element={< BoardPage/>} />
        {/* Lazy Loading */}
         <Route
          path='/workspace/*'
          element={
            <SuspensedView>
              <Workspace />
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/board' />} />
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
