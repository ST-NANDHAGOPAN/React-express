import { Route, Routes, Outlet, Navigate } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../../_metronic/layout/core'
// import MainStage from './Konva/MainStage'
import SeatDrawing from './example2/Seatingrow'

const usersBreadcrumbs: Array<PageLink> = [
    {
        title: 'Konva Management',
        path: '/konva-management/konva',
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

const FabricPage = () => {
    return (
        <Routes>
            <Route element={<Outlet />}>
                <Route
                    path='konva'
                    element={
                        <>
                            <PageTitle breadcrumbs={usersBreadcrumbs}>Konva list</PageTitle>
                            {/* <MainStage /> */}
                            <SeatDrawing/>
                        </>
                    }
                />
            </Route>
            <Route index element={<Navigate to='/konva-management/konva' />} />
        </Routes>
    )
}

export default FabricPage
