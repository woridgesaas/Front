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
import { RouteStateService } from '../shared/services/route-state.service';
import { AppSettingsService } from '../shared/services/app-settings.service';
import { SidebarStateService } from '../layout/services/sidebar-state.service';
import { LayoutMode } from '../shared/models/layout.model';
import { routes } from '../shared/routes/routes';
import { HorizontalSidebarComponent } from '../layout/horizontal-sidebar/horizontal-sidebar.component';
import { DefaultSidebarComponent } from '../layout/default-sidebar/default-sidebar.component';
import { DefaultHeaderComponent } from '../layout/default-header/default-header.component';
import { MiniCalendarComponent } from './common/mini-calendar/mini-calendar.component';
import { DefaultSidebarFilterService } from '../layout/default-sidebar/services/default-sidebar-filter.service';

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
    MiniCalendarComponent,
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

  shouldBeVisible = true;

  withoutWrapperPages = false;

  private readonly hiddenPages: string[] = [
    routes.calendar,
    routes.dailyreport,
    routes.employeereport,
    routes.payslipreport,
    routes.leavereport,
    routes.attendancereport,
  ];

  private readonly withoutWrapperPagesArray: string[] = [
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

  private subs = new Subscription();

  constructor(
    private routeState: RouteStateService,
    public settings: AppSettingsService,
    private sidebarState: SidebarStateService,
    private defaultSidebarFilter: DefaultSidebarFilterService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
  ) {
    this.subs.add(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.updateVisibility();
        }
      }),
    );
  }

  ngOnInit(): void {
    this.settings.initLayout();
    this.listenLayout();
    this.listenHover();
    this.listenSidebar();
    this.listenRouter();
    this.listenLoader();
  }

  private updateVisibility(): void {
    this.shouldBeVisible = !this.hiddenPages.some((url) =>
      this.router.url.includes(url),
    );
  }

  // Layout mode
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
      }),
    );
  }

  // Hover (only in aside mode)
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
      }),
    );
  }

  // Sidebar state
  private listenSidebar(): void {
    this.subs.add(
      this.sidebarState.toggleSideBar.subscribe((res: string) => {
        this.miniSidebar = res === 'true';
        this.sidebarState.expandSideBar.next(this.miniSidebar);
      }),
    );

    this.subs.add(
      this.sidebarState.toggleMobileSideBar.subscribe((res: string) => {
        this.mobileSidebar = res === 'true';
      }),
    );

    this.subs.add(
      this.sidebarState.expandSideBar.subscribe((expand: boolean) => {
        this.expandMenu = expand;

        if (!expand && this.miniSidebar) {
          this.closeAllMenus();
        }

        if (expand && this.miniSidebar) {
          this.restoreActiveMenu();
        }
      }),
    );
  }

  private closeAllMenus(): void {
    this.defaultSidebarFilter
      .getFilteredSidebar()
      .forEach((section) =>
        section.menu.forEach((m) => (m.showSubRoute = false)),
      );
  }

  private restoreActiveMenu(): void {
    const menuValue = sessionStorage.getItem('menuValue');
    this.defaultSidebarFilter
      .getFilteredSidebar()
      .forEach((section) =>
        section.menu.forEach(
          (m) => (m.showSubRoute = m.menuValue === menuValue),
        ),
      );
  }

  // Router
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
      }),
    );
  }

  private extractRoute(url: string): void {
    const split = url.split('/');
    this.base = split[1] || '';
    this.page = split[2] || '';
    this.last = split[3] || '';

    this.routeState.base.next(this.base);
    this.routeState.page.next(this.page);
    this.routeState.last.next(this.last);

    this.withoutWrapperPages = this.withoutWrapperPagesArray.includes(
      this.base,
    );
  }

  // Loader
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
      }),
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.settings.changeThemeColor('1');
  }
}
