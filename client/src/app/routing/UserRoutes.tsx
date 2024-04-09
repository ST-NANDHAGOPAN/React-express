import {Route, Routes, Navigate} from 'react-router-dom'
import UserComponent from '../userComponent'

const UserRoutes = () => {

  return (
    <Routes>
        <Route path='usercomponent' element={<UserComponent/>} />
        <Route path='auth/*' element={<Navigate to='/usercomponent' />} />
    </Routes>
  )
}


export {UserRoutes}
