import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  RouterLink,
} from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';

import {
  SidebarSection,
  SidebarMenuItem,
} from './models/default-sidebar.model';
import { DefaultSidebarFilterService } from './services/default-sidebar-filter.service';
import { SidebarStateService } from '../../layout/services/sidebar-state.service';
import { RouteStateService } from '../../shared/services/route-state.service';
import { AppSettingsService } from '../../shared/services/app-settings.service';
import { routes } from '../../shared/routes/routes';
import { TokenService } from '../../auth/services/token.service';

@Component({
  selector: 'app-default-sidebar',
  standalone: true,
  templateUrl: './default-sidebar.component.html',
  styleUrl: './default-sidebar.component.scss',
  imports: [CommonModule, RouterLink, NgScrollbarModule],
})
export class DefaultSidebarComponent implements OnInit, OnDestroy {
  readonly routes = routes;

  base = '';
  page = '';
  last = '';

  sideBarData: SidebarSection[] = [];
  isMobile = window.innerWidth <= 991;

  private subs = new Subscription();

  constructor(
    private router: Router,
    private sidebarFilter: DefaultSidebarFilterService,
    private sidebarState: SidebarStateService,
    private routeState: RouteStateService,
    private appSettings: AppSettingsService,
    private tokenService: TokenService,
  ) {}

  get dashboardRoute(): string {
    return this.tokenService.getRole() === 'EMPLOYEE'
      ? routes.employee
      : routes.index;
  }

  ngOnInit(): void {
    this.sideBarData = this.sidebarFilter.getFilteredSidebar();
    this.listenRouteState();
    this.listenRouter();
    this.restoreActiveMenu();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.isMobile = window.innerWidth <= 991;
  }

  shouldShowMenu(menu: SidebarMenuItem): boolean {
    return !(this.isMobile && menu.hideOnMobile);
  }

  shouldShowSection(section: SidebarSection): boolean {
    return section.menu.some((menu) => this.shouldShowMenu(menu));
  }

  private listenRouteState(): void {
    this.subs.add(this.routeState.base.subscribe((v) => (this.base = v)));
    this.subs.add(this.routeState.page.subscribe((v) => (this.page = v)));
    this.subs.add(this.routeState.last.subscribe((v) => (this.last = v)));
  }

  private listenRouter(): void {
    this.subs.add(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          const s = event.url.split('/');
          this.base = s[1] ?? '';
          this.page = s[2] ?? '';
          this.last = s[3] ?? '';
        }

        if (event instanceof NavigationEnd) {
          this.collapseAll();
          sessionStorage.removeItem('menuValue');
        }
      }),
    );
  }

  miniSideBarMouseHover(state: 'over' | 'out'): void {
    this.appSettings.hoverState.next(state);
    this.sidebarState.expandSideBar.next(state === 'over');
  }

  expandSubMenus(menu: SidebarMenuItem): void {
    if (menu.action === 'layoutChange') {
      const next =
        this.appSettings.layoutMode.getValue() === 'aside'
          ? 'horizontal'
          : 'aside';

      this.appSettings.switchLayout(next);
      return;
    }

    if (menu.hasSubRoute || menu.hasSubRouteTwo) {
      this.sideBarData.forEach((section) =>
        section.menu.forEach((m) => {
          m.showSubRoute = m === menu ? !m.showSubRoute : false;
        }),
      );

      sessionStorage.setItem('menuValue', menu.menuValue);
    }
  }

  private collapseAll(): void {
    this.sideBarData.forEach((s) =>
      s.menu.forEach((m) => (m.showSubRoute = false)),
    );
  }

  private restoreActiveMenu(): void {
    const active = sessionStorage.getItem('menuValue');

    if (!active) return;

    this.sideBarData.forEach((s) =>
      s.menu.forEach((m) => (m.showSubRoute = m.menuValue === active)),
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
