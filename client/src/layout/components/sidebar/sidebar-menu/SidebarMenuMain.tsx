import React from 'react'
import { SidebarMenuItem } from './SidebarMenuItem'
const SidebarMenuMain = () => {
  return (
    <>
      <div className='menu-item'>
        <div className='menu-content pt-2 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Bart Team Projects</span>
        </div>
      </div>
    
      <SidebarMenuItem
        to='/'
        icon='abstract-28'
        title='NYC Seating'
        fontIcon='bi-layers'
      />  <SidebarMenuItem
        to='/apps/user-management/users'
        icon='abstract-8'
        title='New Mom School'
        fontIcon='bi-layers'
      />
      <SidebarMenuItem
        to='/apps/user-management/users'
        icon='abstract-46'
        title='Check Issuing'
        fontIcon='bi-layers'
      />
    </>
  )
}

export { SidebarMenuMain }
