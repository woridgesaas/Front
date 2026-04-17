import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { SideBarService } from '../../../shared/side-bar/side-bar.service';

/* Header children */
import { HeaderLeftComponent } from './components/header-left/header-left.component';
import { HeaderSearchComponent } from './components/header-search/header-search.component';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import { AppsDropdownComponent } from './components/apps-dropdown/apps-dropdown.component';
import { ChatButtonComponent } from './components/chat-button/chat-button.component';
import { NotificationDropdownComponent } from './components/notification-dropdown/notification-dropdown.component';
import { ProfileDropdownComponent } from './components/profile-dropdown/profile-dropdown.component';
import { MobileUserMenuComponent } from './components/mobile-user-menu/mobile-user-menu.component';

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
  ],
})
export class DefaultHeaderComponent {
  miniSidebar = false;
  baricon = false;

  constructor(private sideBar: SideBarService) {
    this.sideBar.toggleSideBar.subscribe((res: string) => {
      this.miniSidebar = res === 'true';
    });

    this.baricon = localStorage.getItem('baricon') === 'true';
  }

  toggleSideBar(): void {
    this.sideBar.switchSideMenuPosition();
  }

  toggleMobileSideBar(): void {
    this.sideBar.switchMobileSideBarPosition();
  }
}
