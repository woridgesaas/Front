import {
  Component,
  ViewEncapsulation,
  OnInit,
  OnDestroy,
  Inject,
  DOCUMENT,
  Renderer2,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  RouterModule,
} from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonService } from '../shared/common/common.service';
import { SettingService } from '../shared/settings/settings.service';
import { DataService } from '../shared/data/data.service';
import { SideBarService } from '../shared/side-bar/side-bar.service';
import { LayoutMode } from '../shared/models/layout.model';
import { HorizontalSidebarComponent } from './common/horizontal-sidebar/horizontal-sidebar.component';
import { DefaultSidebarComponent } from './common/default-sidebar/default-sidebar.component';
import { DefaultHeaderComponent } from './common/default-header/default-header.component';
import { CustomCalendarComponent } from './common/custom-calendar/custom-calendar.component';
import { MiniCalendarComponent } from './common/mini-calendar/mini-calendar.component';
import { routes } from '../shared/routes/routes';
@Component({
  selector: 'app-features',
  standalone: true,
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss',
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    RouterModule,
    HorizontalSidebarComponent,
    DefaultSidebarComponent,
    DefaultHeaderComponent,
    MiniCalendarComponent
  ],
})
export class FeaturesComponent implements OnInit, OnDestroy {
  base = '';
  page = '';
  last = '';

  miniSidebar = false;
  expandMenu = false;
  mobileSidebar = false;

  layoutMode: LayoutMode = 'aside';

  showPreloader = false;
  showPreloaderState = '';

  private subs = new Subscription();
    hiddenPages :string[]=[routes.calendar,routes.dailyreport,routes.employeereport,routes.payslipreport,routes.leavereport,routes.attendancereport];
  shouldBeVisible:boolean = true;
  private readonly withoutWrapperPagesArray = [
    'login',
    'forgot-password',
    'reset-password',
    'email-verification',
    'success',
    'under-construction',
    'under-maintenance',
    'coming-soon',
    'lock-screen',
    'error-404',
    'error-500',
  ];

  withoutWrapperPages = false;
  private updateVisibility():void{
    this.shouldBeVisible = !this.hiddenPages.some((url: string)=>
      this.router.url.includes(url)
    )
  }
  constructor(
    private common: CommonService,
    public settings: SettingService,
    private data: DataService,
    public sideBar: SideBarService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {
    this.router.events.subscribe((event)=>{
      if(event instanceof NavigationEnd)
        this.updateVisibility();
    });
  }

  ngOnInit(): void {
    this.settings.initLayout();

    this.listenLayout();
    this.listenHover();
    this.listenSidebar();
    this.listenRouter();
    this.listenLoader();
  }

  //* Layout mode
  private listenLayout(): void {
    this.subs.add(
      this.settings.layoutMode.subscribe((mode) => {
        this.layoutMode = mode;

        if (mode === 'aside') {
          this.renderer.addClass(this.document.body, 'mini-sidebar');
        } else {
          this.renderer.removeClass(this.document.body, 'mini-sidebar');
          this.renderer.removeClass(this.document.body, 'expand-menu');
        }
      })
    );
  }

  //* Hover (only sidebar)
  private listenHover(): void {
    this.subs.add(
      this.settings.hoverState.subscribe((state) => {
        if (this.layoutMode !== 'aside') {
          this.renderer.removeClass(this.document.body, 'expand-menu');
          return;
        }

        state === 'over'
          ? this.renderer.addClass(this.document.body, 'expand-menu')
          : this.renderer.removeClass(this.document.body, 'expand-menu');
      })
    );
  }

  //* Sidebar
  private listenSidebar(): void {
    this.subs.add(
      this.sideBar.toggleSideBar.subscribe((res) => {
        this.miniSidebar = res === 'true';
        this.sideBar.expandSideBar.next(this.miniSidebar);
      })
    );

    this.subs.add(
      this.sideBar.toggleMobileSideBar.subscribe((res) => {
        this.mobileSidebar = res === 'true';
      })
    );

    this.subs.add(
      this.sideBar.expandSideBar.subscribe((expand) => {
        this.expandMenu = expand;

        if (!expand && this.miniSidebar) {
          this.closeAllMenus();
        }

        if (expand && this.miniSidebar) {
          this.restoreActiveMenu();
        }
      })
    );
  }

  private closeAllMenus(): void {
    this.data.sideBar.forEach((main) =>
      main.menu.forEach((m) => (m.showSubRoute = false))
    );
  }

  private restoreActiveMenu(): void {
    const menuValue = sessionStorage.getItem('menuValue');

    this.data.sideBar.forEach((main) =>
      main.menu.forEach((m) => (m.showSubRoute = m.menuValue === menuValue))
    );
  }

  //* Router
  private listenRouter(): void {
    this.subs.add(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.extractRoute(event.url);
        }

        if (event instanceof NavigationEnd) {
          this.mobileSidebar = false;
          localStorage.removeItem('isMobileSidebar');
        }
      })
    );
  }

  private extractRoute(url: string): void {
    const split = url.split('/');
    this.base = split[1] || '';
    this.page = split[2] || '';
    this.last = split[3] || '';

    this.common.base.next(this.base);
    this.common.page.next(this.page);
    this.common.last.next(this.last);

    this.withoutWrapperPages = this.withoutWrapperPagesArray.includes(
      this.base
    );
  }

  //* Loader
  private listenLoader(): void {
    this.subs.add(
      this.settings.isLoader.subscribe((state) => {
        this.showPreloaderState = state;

        if (state === '1') {
          this.showPreloader = true;
          setTimeout(() => (this.showPreloader = false), 1000);
        } else {
          this.showPreloader = false;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.settings.changeThemeColor('1');
  }
}
