import {MenuItem} from './MenuItem'
import {MenuInnerWithSub} from './MenuInnerWithSub'

export function MenuInner() {
  return (
    <>
      <MenuInnerWithSub title='Apps' to='/apps' menuPlacement='bottom-start' menuTrigger='click'>
        {/* PAGES */}
        <MenuItem icon='abstract-35' to='/konva-management/konva' title='Konva JS' />
      </MenuInnerWithSub>
 
    </>
  )
}
