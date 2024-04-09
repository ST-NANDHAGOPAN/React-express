import React from 'react'
import { SidebarMenuItem } from './SidebarMenuItem'
const SidebarMenuMain = () => {
  return (
    <>
      <SidebarMenuItem
        to='/dashboard'
        icon='element-11'
        title={ 'DASHBOARD'}
        fontIcon='bi-app-indicator'
      />
    </>
  )
}

export { SidebarMenuMain }
