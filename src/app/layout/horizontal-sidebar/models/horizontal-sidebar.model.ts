export type AppRole = 'CEO' | 'HR' | 'MANAGER' | 'EMPLOYEE';

export interface HorizontalSubMenuTwo {
  menuValue: string;
  route: string;
  base?: string;
}

export interface HorizontalSubMenu {
  menuValue: string;
  route?: string | null;
  base?: string;
  customSubmenuTwo?: boolean;
  subMenusTwo?: HorizontalSubMenuTwo[];
  action?: string;
}

export interface HorizontalMenuItem {
  menuValue: string;
  route?: string | null;
  hasSubRoute?: boolean;
  hasSubRouteTwo?: boolean;
  showSubRoute?: boolean;
  icon?: string;
  base?: string;
  base2?: string;
  base3?: string;
  base4?: string;
  base5?: string;
  base6?: string;
  base7?: string;
  base8?: string;
  base9?: string;
  base10?: string;
  subMenus?: HorizontalSubMenu[];
  action?: string;
  roles?: AppRole[];
}

export interface HorizontalMenuSection {
  title: string;
  showAsTab: boolean;
  separateRoute: boolean;
  menu: HorizontalMenuItem[];
}
