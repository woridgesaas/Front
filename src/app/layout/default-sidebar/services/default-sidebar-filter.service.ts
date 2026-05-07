import { Injectable } from '@angular/core';
import {
  AppRole,
  SidebarSection,
  SidebarMenuItem,
} from '../models/default-sidebar.model';
import { DEFAULT_SIDEBAR_DATA } from '../data/default-sidebar.data';
import { TokenService } from '../../../auth/services/token.service';
import { routes } from '../../../shared/routes/routes';

@Injectable({ providedIn: 'root' })
export class DefaultSidebarFilterService {
  constructor(private tokenService: TokenService) {}

  private get role(): AppRole | null {
    return this.tokenService.getRole() as AppRole | null;
  }

  private canAccess(roles?: AppRole[]): boolean {
    if (!roles || roles.length === 0) return true;
    return !!this.role && roles.includes(this.role);
  }

  getFilteredSidebar(): SidebarSection[] {
    const role = this.role;

    if (role === 'EMPLOYEE') {
      return this.buildEmployeeSidebar();
    }

    return DEFAULT_SIDEBAR_DATA.filter((section) =>
      this.canAccess(section.roles),
    )
      .map((section) => ({
        ...section,
        menu: section.menu
          .filter((item) => this.canAccess(item.roles))
          .map((item) => this.applyDashboardRoute(item, role)),
      }))
      .filter((section) => section.menu.length > 0)
      .flatMap((section) => this.applyManagerSidebarStructure(section, role));
  }

  private applyDashboardRoute(
    item: SidebarMenuItem,
    role: AppRole | null,
  ): SidebarMenuItem {
    if (item.base !== 'dashboard') return item;

    return {
      ...item,
      hasSubRoute: false,
      subMenus: [],
      route: role === 'EMPLOYEE' ? routes.employee : routes.index,
    };
  }

  private applyManagerSidebarStructure(
    section: SidebarSection,
    role: AppRole | null,
  ): SidebarSection[] {
    if (role !== 'MANAGER') {
      return [section];
    }

    if (section.tittle !== 'RH interne') {
      return [section];
    }

    return section.menu.map((item) => ({
      tittle:
        item.base === 'attendance-admin'
          ? 'Liste des présences et absences'
          : item.menuValue,
      showAsTab: false,
      separateRoute: false,
      menu: [
        {
          ...item,
          hasSubRoute: false,
          showSubRoute: false,
          subMenus: [],
        },
      ],
    }));
  }

  private buildEmployeeSidebar(): SidebarSection[] {
    const mainSection = DEFAULT_SIDEBAR_DATA.find((s) => s.tittle === 'Main');
    const layoutSection = DEFAULT_SIDEBAR_DATA.find(
      (s) => s.tittle === 'Layout',
    );
    const employeeSection = DEFAULT_SIDEBAR_DATA.find(
      (s) => s.tittle === 'Employés',
    );

    if (!mainSection || !layoutSection || !employeeSection) {
      return [];
    }

    const dashboard: SidebarMenuItem = {
      menuValue: 'Dashboard',
      hasSubRoute: false,
      showSubRoute: false,
      icon: 'layout-dashboard',
      base: 'dashboard',
      route: routes.employee,
      subMenus: [],
    };

    const intranet = mainSection.menu.find((m) => m.base === 'intranet');

    const flatItems: SidebarSection[] =
      employeeSection.menu
        .filter((item) => item.roles?.includes('EMPLOYEE'))
        .map((item) => ({
          tittle: item.menuValue,
          showAsTab: false,
          separateRoute: false,
          menu: [
            {
              ...item,
              hasSubRoute: false,
              showSubRoute: false,
              subMenus: [],
            },
          ],
        })) ?? [];

    return [
      {
        tittle: 'Main',
        showAsTab: true,
        separateRoute: false,
        menu: intranet ? [dashboard, intranet] : [dashboard],
      },
      layoutSection,
      ...flatItems,
    ];
  }
}
