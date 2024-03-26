import { Route, Routes, Outlet, Navigate } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../../_metronic/layout/core'
import FabricWrapper from './FabricWrapper'

const usersBreadcrumbs: Array<PageLink> = [
    {
        title: 'Fabric Management',
        path: '/fabric-management/fabric',
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
                    path='fabric'
                    element={
                        <>
                            <PageTitle breadcrumbs={usersBreadcrumbs}>Fabric list</PageTitle>
                            <FabricWrapper />
                        </>
                    }
                />
            </Route>
            <Route index element={<Navigate to='/fabric-management/fabric' />} />
        </Routes>
    )
}

export default FabricPage
