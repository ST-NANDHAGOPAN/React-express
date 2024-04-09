import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
import {LayoutProvider, LayoutSplashScreen} from './layout/core'
import {MasterInit} from './layout/MasterInit'
import {AuthInit} from './auth'
import {ThemeModeProvider} from './partials'

const App = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
        <LayoutProvider>
          <ThemeModeProvider>
            <AuthInit>
              <Outlet />
              <MasterInit />
            </AuthInit>
          </ThemeModeProvider>
        </LayoutProvider>
    </Suspense>
  )
}

export {App}
