import { Route, Routes } from 'react-router-dom'
import { ForgotPassword } from './components/ForgotPassword'
import { AuthLayout } from './AuthLayout'
import Login from './components/Login'

const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path='/admin/login' element={<Login userType='admin' />} />
      <Route path='/user/login' element={<Login userType='user' />} />
      <Route path='/admin/forgot-password' element={<ForgotPassword userType='admin' />} />
      <Route path='/user/forgot-password' element={<ForgotPassword userType='user' />} />
    </Route>
  </Routes>
)

export { AuthPage }
