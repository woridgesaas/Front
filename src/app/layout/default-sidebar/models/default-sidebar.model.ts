export type AppRole = 'CEO' | 'HR' | 'MANAGER' | 'EMPLOYEE';

export interface SidebarSubMenuTwo {
  menuValue: string;
  route: string;
  base?: string;
}

export interface SidebarSubMenu {
  menuValue: string;
  route?: string | null;
  base?: string;
  currentActive?: boolean;
  customSubmenuTwo?: boolean;
  subMenusTwo?: SidebarSubMenuTwo[];
  action?: string;
}

export interface SidebarMenuItem {
  menuValue: string;
  route?: string | null;
  hasSubRoute?: boolean;
  hasSubRouteTwo?: boolean;
  showSubRoute: boolean;
  icon: string;
  base?: string;
  materialicons?: string;
  subMenus: SidebarSubMenu[];
  dot?: boolean;
  action?: string;
  roles?: AppRole[];
  hideOnMobile?: boolean;
}

export interface SidebarSection {
  tittle: string;
  icon?: string;
  showAsTab: boolean;
  separateRoute: boolean;
  menu: SidebarMenuItem[];
  roles?: AppRole[];
}
