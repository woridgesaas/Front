import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { SideBarService } from '../../../shared/side-bar/side-bar.service';

/* Header children */
import { HeaderLeftComponent } from './Components/header-left/header-left.component';
import { HeaderSearchComponent } from './Components/header-search/header-search.component';
import { ThemeToggleComponent } from './Components/theme-toggle/theme-toggle.component';
import { AppsDropdownComponent } from './Components/apps-dropdown/apps-dropdown.component';
import { ChatButtonComponent } from './Components/chat-button/chat-button.component';
import { NotificationDropdownComponent } from './Components/notification-dropdown/notification-dropdown.component';
import { ProfileDropdownComponent } from './Components/profile-dropdown/profile-dropdown.component';
import { MobileUserMenuComponent } from './Components/mobile-user-menu/mobile-user-menu.component';

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
