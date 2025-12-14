import { Component, ViewEncapsulation , OnInit, Inject, DOCUMENT, Renderer2 } from '@angular/core';
import { CommonService } from '../shared/common/common.service';
import { SettingService } from '../shared/settings/settings.service';
import { DataService } from '../shared/data/data.service';
import { SideBarService } from '../shared/side-bar/side-bar.service';
import { NavigationEnd, NavigationStart, Router, Event as RouterEvent, RouterModule, } from '@angular/router';
import { url } from '../shared/models/models';
import { CommonModule } from '@angular/common';
import { ThemeSettingsComponent } from './common/theme-settings/theme-settings.component';
import { HorizontalSidebarComponent } from './common/horizontal-sidebar/horizontal-sidebar.component';
import { DefaultSidebarComponent } from './common/default-sidebar/default-sidebar.component';
import { DefaultHeaderComponent } from './common/default-header/default-header.component';

@Component({
    selector: 'app-features',
    templateUrl: './features.component.html',
    styleUrl: './features.component.scss',
    encapsulation: ViewEncapsulation.None,
    imports: [CommonModule,ThemeSettingsComponent,RouterModule,HorizontalSidebarComponent
      ,DefaultSidebarComponent,
      DefaultHeaderComponent
    ]
})
export class FeaturesComponent implements OnInit{
  base = '';
  page = '';
  last = '';
  public miniSidebar = false;
  public expandMenu = false;
  public mobileSidebar = false;
  layoutMode = '2';
  primaryColor='1';
  withoutWrapperPagesArray = ['login-2','register-2','forgot-password-2', 'reset-password-2',  'email-verification-2', 'email-verification-3', 'two-step-verification', 'two-step-verification-2', 'two-step-verification-3','success','success-2','success-3','under-construction','under-maintenance','coming-soon','lock-screen','error-404','error-500'];
  withoutLayoutArray = ['layout-horizontal',
  ,
    'layout-horizontal-box','layout-dark',
  ];
  withoutWrapperPages:boolean|null = false;
  withoutLayouts:boolean|null = false;
  showPreloader = false;
  showPreloaderState = '';
  selectedColor = '84, 109, 254, 1';
  selectedColor1 = '555, 555, 555, 1';
  horizontalColor='555, 555, 555, 1';
  dthemeColor= '84, 109, 254, 1';
  constructor(
    private common: CommonService,
    public settings: SettingService,
    private data: DataService,
    public sideBar: SideBarService,
    private Router: Router,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {
    this.settings.isLoader.subscribe((res: string) => {
      this.showPreloaderState = res;
    });
    this.common.base.subscribe((res: string) => {
      this.base = res;
      this.withoutWrapperPages = this.withoutWrapperPagesArray.includes(this.base);
      this.withoutLayouts = this.withoutLayoutArray.includes(this.base);
      //Shooowind pre loader logique is here...........................................
      if(this.showPreloaderState === '1'){
        this.showPreloader = true;
        setTimeout(() => {
          this.showPreloader = false;
        }, 1000);
      }else {
        this.showPreloader = false;

      }
    });
    this.common.page.subscribe((res: string) => {
      this.page = res;
    });
    this.common.last.subscribe((res: string) => {
      this.last = res;
    });
    this.settings.layoutMode.subscribe((res: string) => {
      this.layoutMode = res;
    });
    this.sideBar.toggleSideBar.subscribe((res: string) => {
      if (res === 'true') {
        this.miniSidebar = true;
        this.sideBar.expandSideBar.next(true);
      } else {
        this.miniSidebar = false;
        this.sideBar.expandSideBar.next(false);
      }
    });

    this.sideBar.toggleMobileSideBar.subscribe((res: string) => {
      if (res == 'true' || res == 'true') {
        this.mobileSidebar = true;
      } else {
        this.mobileSidebar = false;
      }
    });
    this.sideBar.expandSideBar.subscribe((res) => {
      this.expandMenu = res;
      
      if (res == false && this.miniSidebar == true) {
        this.data.sideBar.map((mainMenus) => {
          mainMenus.menu.map((resMenu) => {
            resMenu.showSubRoute = false;
          });
        });
      }
      if (res == true && this.miniSidebar == true) {
        this.data.sideBar.map((mainMenus) => {
          mainMenus.menu.map((resMenu) => {
            const menuValue = sessionStorage.getItem('menuValue');
            if (menuValue && menuValue == resMenu.menuValue) {
              resMenu.showSubRoute = true;
            } else {
              resMenu.showSubRoute = false;
            }
          });
        });
      }
    });
        this.Router.events.subscribe((data: RouterEvent) => {
      if (data instanceof NavigationStart) {
        this.getRoutes(data);
      }
      if (data instanceof NavigationEnd) {
        localStorage.removeItem('isMobileSidebar');
        this.mobileSidebar = false;
      }
      if (this.page === 'pos') {
        localStorage.removeItem('sideBarPosition');
      }
    });
  }
    private getRoutes(data: url): void {
    const splitVal = data.url.split('/');
    this.base = splitVal[1];
    this.page = splitVal[2];
    this.last = splitVal[3];
    this.common.base.next(splitVal[1]);
    this.common.page.next(splitVal[2]);
    this.common.last.next(splitVal[3]);
    }
  isCollapsed = false;
  ngOnInit(){
    this.data.collapse$.subscribe((collapse: boolean) => {
      this.isCollapsed = collapse;
    });
    const htmlLayout = this.document.documentElement.getAttribute('data-layout');
    console.log(htmlLayout);
    
    // CASE 1 → HTML says mini layout
    if (htmlLayout === 'mini') {
      this.renderer.addClass(this.document.body, 'mini-sidebar');
    }

    // CASE 2 → Listen for hover
    this.settings.hoverState.subscribe((state: string) => {
      const isMini =
        htmlLayout === 'mini' || htmlLayout === 'layout-hovered' 
        || this.settings.layoutMode.getValue() === '2' || this.settings.layoutMode.getValue() === '13' 
      if (!isMini) {
        // If not mini layout, hover should do nothing
        this.renderer.removeClass(this.document.body, 'expand-menu');
        return;
      }

      if (state === 'over') {
        this.renderer.addClass(this.document.body, 'expand-menu');
        this.renderer.addClass(this.document.body, 'mini-sidebar');
      } else {
        this.renderer.removeClass(this.document.body, 'expand-menu');
        this.renderer.removeClass(this.document.body, 'mini-sidebar');
      }
    }); 
}
   ngOnDestroy(){
      this.settings.changeThemeColor('1');
    }
}
