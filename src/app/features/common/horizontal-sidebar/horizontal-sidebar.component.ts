import { Component, OnDestroy, OnInit } from '@angular/core';
import { routes } from '../../../shared/routes/routes';
import { MainMenu, Menu } from '../../../shared/models/models';
import { NavigationStart, Router, RouterLink } from '@angular/router';
import { DataService } from '../../../shared/data/data.service';
import { SideBarService } from '../../../shared/side-bar/side-bar.service';
import { CommonService } from '../../../shared/common/common.service';
import { CommonModule } from '@angular/common';
import { SettingService } from '../../../shared/settings/settings.service';
@Component({
  selector: 'app-horizontal-sidebar',
  templateUrl: './horizontal-sidebar.component.html',
  styleUrl: './horizontal-sidebar.component.scss',
  imports: [CommonModule, RouterLink],
})
export class HorizontalSidebarComponent implements OnInit, OnDestroy {
  public routes = routes;
  showSubMenusTab = true;
  public multilevel: boolean[] = [false, false, false];
  openMenuItem: any = null;
  openSubmenuOneItem: any = null;
  base = '';
  page = '';
  last = '';
  themeIcon = true;
  toggleThemeIcon() {
    this.themeIcon = !this.themeIcon;
  }
  side_bar_data: MainMenu[] = [];
  constructor(
    public router: Router,
    private data: DataService,
    private sideBar: SideBarService,
    private common: CommonService,
    public settings: SettingService
  ) {
    this.data.getSideBarData3.subscribe((res: MainMenu[]) => {
      this.side_bar_data = res;
    });
    this.common.base.subscribe((res: string) => {
      this.base = res;
      this.collapseAllMenus();
    });
    this.common.page.subscribe((res: string) => {
      this.page = res;
      this.collapseAllMenus();
    });
    this.common.last.subscribe((res: string) => {
      this.last = res;
    });

    // get sidebar data as observable because data is controlled for design to expand submenus
    this.data.getSideBarData3.subscribe((res: MainMenu[]) => {
      this.side_bar_data = res;
    });
  }
  public menuToggle() {
    this.showSubMenusTab = !this.showSubMenusTab;
  }
  private collapseAllMenus() {
    this.side_bar_data.forEach((mainMenus: MainMenu) => {
      mainMenus.menu.forEach((m: Menu) => {
        m.showSubRoute = false;
      });
    });
  }
  public expandSubMenus(menu: Menu): void {
    menu.showSubRoute = !menu.showSubRoute;
    // collapse all other menus
    this.side_bar_data.forEach((mainMenus: MainMenu) => {
      mainMenus.menu.forEach((m: Menu) => {
        if (m !== menu) {
          m.showSubRoute = false;
        }
      });
    });

    sessionStorage.setItem('menuValue', menu.menuValue);
  }

  public miniSideBarMouseHover(position: string): void {
    this.sideBar.toggleSideBar.subscribe((res: string) => {
      if (res === 'true' || res === 'true') {
        if (position === 'over') {
          this.sideBar.expandSideBar.next(true);
          this.showSubMenusTab = false;
        } else {
          this.sideBar.expandSideBar.next(false);
          this.showSubMenusTab = true;
        }
      }
    });
  }
  ngOnInit(): void {
    this.router.events.subscribe((event: object) => {
      if (event instanceof NavigationStart) {
        const splitVal = event.url.split('/');
        this.base = splitVal[1];
        this.page = splitVal[2];
        this.last = splitVal[3];
      }
    });
  }
  ngOnDestroy(): void {
    //this.data.resetData2();
  }
  miniSideBarBlur(position: string) {
    if (position === 'over') {
      this.sideBar.expandSideBar.next(true);
    } else {
      this.sideBar.expandSideBar.next(false);
    }
  }

  miniSideBarFocus(position: string) {
    if (position === 'over') {
      this.sideBar.expandSideBar.next(true);
    } else {
      this.sideBar.expandSideBar.next(false);
    }
  }
  public submenus = false;
  openSubmenus() {
    this.submenus = !this.submenus;
  }

  openMenu(menu: any): void {
    if (this.openMenuItem === menu) {
      this.openMenuItem = null;
    } else {
      this.openMenuItem = menu;
    }
  }
  openSubmenuOne(subMenus: any): void {
    if (this.openSubmenuOneItem === subMenus) {
      this.openSubmenuOneItem = null;
    } else {
      this.openSubmenuOneItem = subMenus;
    }
  }
}
