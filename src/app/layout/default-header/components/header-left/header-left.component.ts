import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { routes } from '../../../../shared/routes/routes';
import { SidebarStateService } from '../../../services/sidebar-state.service';
import { TokenService } from '../../../../auth/services/token.service';

@Component({
  selector: 'app-header-left',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header-left.component.html',
  styleUrl: './header-left.component.scss',
})
export class HeaderLeftComponent {
  readonly routes = routes;

  constructor(
    private sidebarState: SidebarStateService,
    private tokenService: TokenService,
  ) {}

  get dashboardRoute(): string {
    return this.tokenService.getRole() === 'EMPLOYEE'
      ? routes.employee
      : routes.index;
  }

  toggleSideBar(): void {
    this.sidebarState.switchSideMenuPosition();
  }

  toggleMobileSideBar(): void {
    this.sidebarState.switchMobileSideBarPosition();
  }
}
