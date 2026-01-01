import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SettingsSidebarItemComponent } from './components/settings-sidebar-item/settings-sidebar-item.component';
import { SidebarSettingsItem } from '../../../shared/models/sidebar-settings-item.model';
import { SETTINGS_MENU } from '../../../shared/config/sidebar-settings-menu.config';

@Component({
  selector: 'app-app-settings',
  standalone: true,
  templateUrl: './app-settings.component.html',
  styleUrl: './app-settings.component.scss',
  imports: [CommonModule, RouterModule, SettingsSidebarItemComponent],
})
export class AppSettingsComponent {
  settingsMenu: SidebarSettingsItem[] = SETTINGS_MENU;

  trackByRoute(index: number, item: SidebarSettingsItem): string {
    return item.route;
  }
}
