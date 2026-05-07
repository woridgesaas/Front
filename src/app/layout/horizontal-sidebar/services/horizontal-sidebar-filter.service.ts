import { Injectable } from '@angular/core';
import {
  AppRole,
  HorizontalMenuSection,
  HorizontalMenuItem,
} from '../models/horizontal-sidebar.model';
import { HORIZONTAL_SIDEBAR_DATA } from '../data/horizontal-sidebar.data';
import { routes } from '../../../shared/routes/routes';
import { TokenService } from '../../../auth/services/token.service';

@Injectable({ providedIn: 'root' })
export class HorizontalSidebarFilterService {
  constructor(private tokenService: TokenService) {}

  private get role(): AppRole | null {
    return this.tokenService.getRole() as AppRole | null;
  }

  private canAccess(roles?: AppRole[]): boolean {
    if (!roles || roles.length === 0) return true;
    return !!this.role && roles.includes(this.role);
  }

  getFilteredMenu(): HorizontalMenuSection[] {
    const role = this.role;

    return HORIZONTAL_SIDEBAR_DATA.map((section) => ({
      ...section,
      menu: section.menu
        .filter((item) => this.canAccess(item.roles))
        .map((item) => this.applyRoleSpecificChanges(item, role)),
    }));
  }

  private applyRoleSpecificChanges(
    item: HorizontalMenuItem,
    role: AppRole | null,
  ): HorizontalMenuItem {
    if (item.base === 'dashboard') {
      return {
        ...item,
        route: role === 'EMPLOYEE' ? routes.employee : routes.index,
      };
    }

    return item;
  }
}
