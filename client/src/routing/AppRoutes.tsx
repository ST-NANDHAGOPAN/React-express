/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import {FC} from 'react'
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
import {PrivateRoutes} from './PrivateRoutes'
import {Logout, AuthPage, useAuth} from '../auth'
import {App} from '../components/App'
import { UserRoutes } from './UserRoutes'

const AppRoutes: FC = () => {
  const {currentAdmin , currentUser} = useAuth()
  
  return (
    <BrowserRouter basename="/webadmin">
      <Routes>
        <Route element={<App />}>
          <Route path='logout' element={<Logout />} />
          {currentAdmin ? (
            <>
              <Route path='/*' element={<PrivateRoutes />} />
              <Route index element={<Navigate to='/dashboard' />} />
            </>
          ) : currentUser ? (
            <>
             <Route path='/*' element={<UserRoutes />} />
              <Route index element={<Navigate to='/usercomponent' />} />
            </>
          ) : (
            <>
            <Route path='auth/*' element={<AuthPage />} />
            <Route path='*' element={<Navigate to='/auth/user/login' />} />
          </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export {AppRoutes}
