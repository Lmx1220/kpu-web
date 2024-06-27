import { createInjectionKey } from '@/util/injectionKeys'
import type { Menu } from '#/global'

export interface MenuItem {
  index: string
  indexPath: string[]
  active?: boolean
}

export interface MenuProps {
  menu: Menu.recordRaw[]
  value: string
  mode?: 'horizontal' | 'vertical'
  collapse?: boolean
  showCollapseName?: boolean
  rounded?: boolean
  direction?: 'ltr' | 'rtl'
}

export interface MenuInjection {
  props: MenuProps
  items: Record<string, MenuItem>
  subMenus: Record<string, MenuItem>
  activeIndex: MenuProps['value']
  openedMenus: string[]
  mouseInMenu: string[]
  openMenu: (index: string, indexPath: string[]) => void
  closeMenu: (index: string | string[]) => void
  handleMenuItemClick: (index: string) => void
  handleSubMenuClick: (index: string, indexPath: string[]) => void
}

export const rootMenuInjectionKey = createInjectionKey<MenuInjection>('rootMenu')

export interface SubMenuProps {
  uniqueKey: string[]
  menu: Menu.recordRaw
  level?: number
}

export interface SubMenuItemProps {
  uniqueKey: string[]
  item: Menu.recordRaw
  level?: number
  subMenu?: boolean
}
