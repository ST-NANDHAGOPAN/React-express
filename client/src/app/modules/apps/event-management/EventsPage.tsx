import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import { EventListWrapper } from './event-list/EventList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Events Management',
    path: '/event-management/event',
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

const EventsPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='event'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Events list</PageTitle>
              <EventListWrapper/>
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/event-management/event' />} />
    </Routes>
  )
}

export default EventsPage
