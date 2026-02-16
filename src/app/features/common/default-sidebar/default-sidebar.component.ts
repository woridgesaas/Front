import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Router,
  NavigationStart,
  RouterLink,
  NavigationEnd,
} from '@angular/router';
import { Subscription } from 'rxjs';
import { SideBar, SideBarMenu } from '../../../shared/models/models';
import { DataService } from '../../../shared/data/data.service';
import { SideBarService } from '../../../shared/side-bar/side-bar.service';
import { CommonService } from '../../../shared/common/common.service';
import { routes } from '../../../shared/routes/routes';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { SettingService } from '../../../shared/settings/settings.service';
@Component({
  selector: 'app-default-sidebar',
  standalone: true,
  templateUrl: './default-sidebar.component.html',
  styleUrl: './default-sidebar.component.scss',
  imports: [CommonModule, RouterLink, NgScrollbarModule],
})
export class DefaultSidebarComponent implements OnInit, OnDestroy {
  routes = routes;

  base = '';
  page = '';
  last = '';

  side_bar_data: SideBar[] = [];
  private subs = new Subscription();

  constructor(
    private router: Router,
    private data: DataService,
    private sideBar: SideBarService,
    private common: CommonService,
    private settings: SettingService
  ) {}

  ngOnInit(): void {
    this.listenSidebarData();
    this.listenRoute();
    this.restoreActiveMenu();
  }

  //* Sidebar data
  private listenSidebarData(): void {
    this.subs.add(
      this.data.getSideBarData.subscribe((res: SideBar[]) => {
        this.side_bar_data = res;
      })
    );

    this.subs.add(this.common.base.subscribe((res) => (this.base = res)));
    this.subs.add(this.common.page.subscribe((res) => (this.page = res)));
    this.subs.add(this.common.last.subscribe((res) => (this.last = res)));
  }

  //* Router
  private listenRoute(): void {
    this.subs.add(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          const split = event.url.split('/');
          this.base = split[1] || '';
          this.page = split[2] || '';
          this.last = split[3] || '';
        }

        if (event instanceof NavigationEnd) {
          //* Close submenus
          this.side_bar_data.forEach((main) =>
            main.menu.forEach((m) => (m.showSubRoute = false))
          );

          sessionStorage.removeItem('menuValue');
        }
      })
    );
  }

  //* Hover mini sidebar
  miniSideBarMouseHover(state: 'over' | 'out'): void {
    this.settings.hoverState.next(state);
    this.sideBar.expandSideBar.next(state === 'over');
  }

  //* Menu click
  expandSubMenus(menu: SideBarMenu): void {
    //* Layout switch
    if (menu.action === 'layoutChange') {
      const newLayout =
        this.settings.layoutMode.getValue() === 'aside'
          ? 'horizontal'
          : 'aside';

      this.settings.switchLayout(newLayout);
      return;
    }

    if (menu.hasSubRoute || menu.hasSubRouteTwo) {
      this.side_bar_data.forEach((main) =>
        main.menu.forEach((m) => {
          m.showSubRoute =
            m.menuValue === menu.menuValue ? !m.showSubRoute : false;
        })
      );

      sessionStorage.setItem('menuValue', menu.menuValue);
    }
  }

  //* Restore active menu
  private restoreActiveMenu(): void {
    const activeMenu = sessionStorage.getItem('menuValue');

    this.side_bar_data.forEach((main) => {
      main.menu.forEach((menu) => {
        menu.showSubRoute = menu.menuValue === activeMenu;
      });
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.data.resetData();
  }
}
