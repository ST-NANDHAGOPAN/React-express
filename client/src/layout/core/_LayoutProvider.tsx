import {FC, createContext, useContext, useState, useEffect} from 'react'
import {DefaultConfig} from './_LayoutConfig'
import {
  getEmptyCssClasses,
  LayoutSetup,
} from './_LayoutSetup'
import {
  ILayout,
  ILayoutCSSClasses,
  
} from './_Models'
import {WithChildren} from '../../helpers'

export interface LayoutContextModel {
  config: ILayout
  classes: ILayoutCSSClasses
}

const LayoutContext = createContext<LayoutContextModel>({
  config: DefaultConfig,
  classes: getEmptyCssClasses()
})


const disableSplashScreen = () => {
  const splashScreen = document.getElementById('splash-screen')
  if (splashScreen) {
    splashScreen.style.setProperty('display', 'none')
  }
}

const LayoutProvider: FC<WithChildren> = ({children}) => {
  const [config] = useState(LayoutSetup.config)
  const [classes] = useState(LayoutSetup.classes)

  const value: LayoutContextModel = {
    config,
    classes,
  }

  useEffect(() => {
    disableSplashScreen()
  }, [])

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
}

export {LayoutContext, LayoutProvider}

export function useLayout() {
  return useContext(LayoutContext)
}
