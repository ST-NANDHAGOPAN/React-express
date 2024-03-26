import { Route, Routes } from 'react-router-dom'
import { ForgotPassword } from './components/ForgotPassword'
import { AuthLayout } from './AuthLayout'
import Login from './components/Login'
import { Registration } from './components/Registration'

const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path='/admin/login' element={<Login userType='admin' />} />
      <Route path='/user/login' element={<Login userType='user' />} />
      <Route path='/admin/register' element={<Registration userType='admin' />} />
      <Route path='/user/register' element={<Registration userType='user' />} />
      <Route path='forgot-password' element={<ForgotPassword />} />
    </Route>
  </Routes>
)

export { AuthPage }
