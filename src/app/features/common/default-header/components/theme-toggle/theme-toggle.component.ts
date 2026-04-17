import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingService } from '../../../../../shared/settings/settings.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule], // ✅ OBLIGATOIRE pour ngClass
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss',
})
export class ThemeToggleComponent {
  themeIcon = true;

  constructor(public settings: SettingService) {}

  toggleTheme(): void {
    if (this.themeIcon) {
      this.settings.changeThemeColor('1');
    } else {
      this.settings.changeThemeColor('2');
    }

    this.themeIcon = !this.themeIcon;
  }
}
