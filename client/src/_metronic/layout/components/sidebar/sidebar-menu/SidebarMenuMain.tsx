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
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Apps</span>
        </div>
      </div>

      <SidebarMenuItem
        to='/user-management/users'
        icon='abstract-28'
        title='User management'
        fontIcon='bi-layers'
      />
      <SidebarMenuItem
        to='/event-management/event'
        icon='abstract-2'
        title='Event management'
        fontIcon='bi-layers'
      />
      <SidebarMenuItem
        to='/seat-management/seat'
        icon='abstract-3'
        title='Seat management'
        fontIcon='bi-layers'
      />
      <SidebarMenuItem
        to='/fabric-management/fabric'
        icon='abstract-18'
        title='Fabricjs'
        fontIcon='bi-layers'
      />
      <SidebarMenuItem
        to='/konva-management/konva'
        icon='abstract-35'
        title='konvajs'
        fontIcon='bi-layers'
      />
    </>
  )
}

export { SidebarMenuMain }
