import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import SeatingArrangement from './SeatArrangement'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Seat Management',
    path: '/seat-management/seat',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const SeatPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='seat'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Seat list</PageTitle>
              <SeatingArrangement />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/user-management/users' />} />
    </Routes>
  )
}

export default SeatPage
