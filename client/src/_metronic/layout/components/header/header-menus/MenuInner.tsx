import {MenuItem} from './MenuItem'
import {MenuInnerWithSub} from './MenuInnerWithSub'
import {MegaMenu} from './MegaMenu'

export function MenuInner() {
  return (
    <>
      <MenuInnerWithSub title='Apps' to='/apps' menuPlacement='bottom-start' menuTrigger='click'>
        {/* PAGES */}
        <MenuItem icon='abstract-28' to='/user-management/users' title='User management' />
        <MenuItem icon='abstract-3' to='/seat-management/seat' title='Seat management' />
        <MenuItem icon='abstract-18' to='/fabric-management/fabric' title='Fabric JS' />
        <MenuItem icon='abstract-35' to='/konva-management/konva' title='Konva JS' />
      </MenuInnerWithSub>
      <MenuInnerWithSub
        isMega={true}
        title='Mega menu'
        to='/mega-menu'
        menuPlacement='bottom-start'
        menuTrigger='click'
      >
        <MegaMenu />
      </MenuInnerWithSub>
    </>
  )
}
