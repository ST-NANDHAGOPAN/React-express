/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import { SidebarMenuItem } from './SidebarMenuItem'
import { useIntl } from 'react-intl'
const SidebarMenuMain = () => {
  const intl = useIntl()
  return (
    <>
      <SidebarMenuItem
        to='/dashboard'
        icon='element-11'
        title={intl.formatMessage({ id: 'MENU.DASHBOARD' })}
        fontIcon='bi-app-indicator'
      />
    </>
  )
}

export { SidebarMenuMain }
