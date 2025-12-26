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
    // this.data.resetData3();
  }

  //* Toggle entre horizontal et aside
  public toggleLayout(): void {
    const currentLayout = this.settings.layoutMode.getValue();
    const newLayout = currentLayout === 'aside' ? 'horizontal' : 'aside';
    this.settings.switchLayout(newLayout);
  }

  //* Toggle theme icon
  toggleThemeIcon(): void {
    this.themeIcon = !this.themeIcon;
  }

  //* Menu toggle
  public menuToggle(): void {
    this.showSubMenusTab = !this.showSubMenusTab;
  }

  //* Collapse all menus
  private collapseAllMenus(): void {
    this.side_bar_data.forEach((mainMenus: MainMenu) => {
      mainMenus.menu.forEach((m: Menu) => {
        m.showSubRoute = false;
      });
    });
  }

  //* Expand sub menus
  public expandSubMenus(menu: Menu): void {
    // Si c'est le bouton de changement de layout
    if (menu.action === 'layoutChange') {
      this.toggleLayout();
      return;
    }

    // Sinon, gérer l'expansion normale des sous-menus
    menu.showSubRoute = !menu.showSubRoute;
    
    // Collapse all other menus
    this.side_bar_data.forEach((mainMenus: MainMenu) => {
      mainMenus.menu.forEach((m: Menu) => {
        if (m !== menu) {
          m.showSubRoute = false;
        }
      });
    });

    sessionStorage.setItem('menuValue', menu.menuValue);
  }

  //* Mini sidebar mouse hover
  public miniSideBarMouseHover(position: string): void {
    this.sideBar.toggleSideBar.subscribe((res: string) => {
      if (res === 'true') {
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

  //* Mini sidebar blur
  miniSideBarBlur(position: string): void {
    if (position === 'over') {
      this.sideBar.expandSideBar.next(true);
    } else {
      this.sideBar.expandSideBar.next(false);
    }
  }

  //* Mini sidebar focus
  miniSideBarFocus(position: string): void {
    if (position === 'over') {
      this.sideBar.expandSideBar.next(true);
    } else {
      this.sideBar.expandSideBar.next(false);
    }
  }

  //* Open submenus
  public submenus = false;
  openSubmenus(): void {
    this.submenus = !this.submenus;
  }

  //* Open menu
  openMenu(menu: any): void {
    if (this.openMenuItem === menu) {
      this.openMenuItem = null;
    } else {
      this.openMenuItem = menu;
    }
  }

  //* Open submenu one
  openSubmenuOne(subMenus: any): void {
    if (this.openSubmenuOneItem === subMenus) {
      this.openSubmenuOneItem = null;
    } else {
      this.openSubmenuOneItem = subMenus;
    }
  }
}