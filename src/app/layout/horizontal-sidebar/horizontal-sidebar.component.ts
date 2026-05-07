import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import {
  HorizontalMenuSection,
  HorizontalMenuItem,
  HorizontalSubMenu,
} from './models/horizontal-sidebar.model';
import { HorizontalSidebarFilterService } from './services/horizontal-sidebar-filter.service';
import { RouteStateService } from '../../shared/services/route-state.service';
import { AppSettingsService } from '../../shared/services/app-settings.service';

@Component({
  selector: 'app-horizontal-sidebar',
  standalone: true,
  templateUrl: './horizontal-sidebar.component.html',
  styleUrl: './horizontal-sidebar.component.scss',
  imports: [CommonModule, RouterLink],
})
export class HorizontalSidebarComponent implements OnInit, OnDestroy {
  base = '';
  page = '';
  last = '';
  sideBarData: HorizontalMenuSection[] = [];
  openSubmenuOneItem: HorizontalSubMenu | null = null;

  private subs = new Subscription();

  constructor(
    private router: Router,
    private horizontalFilter: HorizontalSidebarFilterService,
    private routeState: RouteStateService,
    private appSettings: AppSettingsService,
  ) {}

  ngOnInit(): void {
    this.sideBarData = this.horizontalFilter.getFilteredMenu();
    this.listenRouteState();
    this.listenRouter();
  }

  private listenRouteState(): void {
    this.subs.add(
      this.routeState.base.subscribe((v) => {
        this.base = v;
        this.collapseAll();
      }),
    );
    this.subs.add(
      this.routeState.page.subscribe((v) => {
        this.page = v;
        this.collapseAll();
      }),
    );
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
      }),
    );
  }

  expandSubMenus(menu: HorizontalMenuItem): void {
    if (menu.action === 'layoutChange') {
      this.toggleLayout();
      return;
    }

    menu.showSubRoute = !menu.showSubRoute;

    this.sideBarData.forEach((section) =>
      section.menu.forEach((m) => {
        if (m !== menu) m.showSubRoute = false;
      }),
    );

    sessionStorage.setItem('menuValue', menu.menuValue);
  }

  openSubmenuOne(subMenu: HorizontalSubMenu): void {
    this.openSubmenuOneItem =
      this.openSubmenuOneItem === subMenu ? null : subMenu;
  }

  toggleLayout(): void {
    const next =
      this.appSettings.layoutMode.getValue() === 'aside'
        ? 'horizontal'
        : 'aside';
    this.appSettings.switchLayout(next);
  }

  private collapseAll(): void {
    this.sideBarData.forEach((s) =>
      s.menu.forEach((m) => (m.showSubRoute = false)),
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
