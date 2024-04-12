// import {MenuItem} from './MenuItem'
// import {MenuInnerWithSub} from './MenuInnerWithSub'

import { MenuInnerWithSub } from "./MenuInnerWithSub";
import { MenuItem } from "./MenuItem";

export function MenuInner() {
  return (
    <>
     <MenuItem title='NYC Seating ' to='/dashboard' />
      <MenuInnerWithSub
        title='Workspace'
        to='/dg'
        menuPlacement='bottom-start'
        menuTrigger='click'
      >
        <MenuItem icon='abstract-28' to='/' title='Bart Team' />
        <MenuItem icon='abstract-28' to='/apps/user-management/users' title='Eyeball' />
        <MenuItem icon='abstract-28' to='/apps/user-management/users' title='TM Thrive' />

      </MenuInnerWithSub>
     
    </>
  )
}
