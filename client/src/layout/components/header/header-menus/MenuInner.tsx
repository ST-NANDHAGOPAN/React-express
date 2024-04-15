// import {MenuItem} from './MenuItem'
// import {MenuInnerWithSub} from './MenuInnerWithSub'

import { MenuInnerWithSub } from "./MenuInnerWithSub";
import { MenuItem } from "./MenuItem";

export function MenuInner() {
  return (
    <>
      <MenuInnerWithSub
        title='Workspace'
        to='/workspace'
        menuPlacement='bottom-start'
        menuTrigger='click'
      >
        <MenuItem icon='abstract-28' to='/workspace' title='Bart Team' />
        <MenuItem icon='abstract-28' to='/apps/user-management/users' title='Eyeball' />
        <MenuItem icon='abstract-28' to='/apps/user-management/users' title='TM Thrive' />

      </MenuInnerWithSub>
     
    </>
  )
}
