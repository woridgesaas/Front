import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSettingsService } from '../../../../shared/services/app-settings.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss',
})
export class ThemeToggleComponent {
  isDarkMode = false;

  constructor(public settings: AppSettingsService) {}

  toggleTheme(): void {
    if (this.isDarkMode) {
      this.settings.changeThemeColor('1');
    } else {
      this.settings.changeThemeColor('2');
    }

    this.isDarkMode = !this.isDarkMode;
  }
}
