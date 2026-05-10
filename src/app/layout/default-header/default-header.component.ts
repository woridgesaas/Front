import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { Subscription } from 'rxjs';
import { SidebarStateService } from '../services/sidebar-state.service';
import { HeaderLeftComponent } from './components/header-left/header-left.component';
import { HeaderSearchComponent } from './components/header-search/header-search.component';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import { AppsDropdownComponent } from './components/apps-dropdown/apps-dropdown.component';
import { ChatButtonComponent } from './components/chat-button/chat-button.component';
import { NotificationDropdownComponent } from './components/notification-dropdown/notification-dropdown.component';
import { ProfileDropdownComponent } from './components/profile-dropdown/profile-dropdown.component';
import { MobileUserMenuComponent } from './components/mobile-user-menu/mobile-user-menu.component';
import { PushNotificationComponentComponent } from '../../shared/push-notification-component/push-notification-component.component';

@Component({
  selector: 'app-default-header',
  standalone: true,
  templateUrl: './default-header.component.html',
  styleUrl: './default-header.component.scss',
  imports: [
    CommonModule,
    NgScrollbarModule,
    HeaderLeftComponent,
    HeaderSearchComponent,
    ThemeToggleComponent,
    AppsDropdownComponent,
    ChatButtonComponent,
    NotificationDropdownComponent,
    ProfileDropdownComponent,
    MobileUserMenuComponent,
    PushNotificationComponentComponent
  ],
})
export class DefaultHeaderComponent implements OnDestroy {
  miniSidebar = false;
  baricon = false;

  private subs = new Subscription();

  constructor(private sidebarState: SidebarStateService) {
    this.subs.add(
      this.sidebarState.toggleSideBar.subscribe((res) => {
        this.miniSidebar = res === 'true';
      }),
    );

    this.baricon = localStorage.getItem('baricon') === 'true';
  }

  toggleSideBar(): void {
    this.sidebarState.switchSideMenuPosition();
  }

  toggleMobileSideBar(): void {
    this.sidebarState.switchMobileSideBarPosition();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
