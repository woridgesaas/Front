import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../../shared/settings/settings.service';
import { routes } from '../../../shared/routes/routes';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
@Component({
    selector: 'app-theme-settings',
    templateUrl: './theme-settings.component.html',
    styleUrl: './theme-settings.component.scss',
    imports: [CommonModule,FormsModule,RouterLink]
})
export class ThemeSettingsComponent implements OnInit {
  public routes=routes;
  layoutMode = '2';
  themeColor = '1';
  isLoader = '1';
  dthemeColor= '84, 109, 254, 1';
  rgbaValues = '84, 109, 254, 1'; // Default RGBA values without "rgba()"
  rgbaValues1 = '84, 109, 254, 1';
  rgbaValues2 = '84, 109, 254, 1';
  rgbaValues3 = '84, 109, 254, 1';

  constructor(public settings: SettingService) {

    this.settings.layoutMode.subscribe((res: string) => {
      this.layoutMode = res;

    });
    this.settings.themeColor.subscribe((res: string) => {
      this.themeColor = res;
    });
    this.settings.isLoader.subscribe((res: string) => {
      this.isLoader = res;
    });





  }






  // Function to convert HEX to RGBA values string without "rgba()"
  hexToRgbaValues(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `${r}, ${g}, ${b}`;
  }

  ngOnInit(): void {
    // Check localStorage for the settings when the component initializes
    const layout = localStorage.getItem('layoutMode') || '2';
    const themeColor = localStorage.getItem('themeColor') || '1';
    const isLoader = localStorage.getItem('isLoader') || '1';
    this.settings.changeLayoutMode(layout);
    this.settings.changeThemeColor(themeColor);
    this.settings.changeLoaderState(isLoader);
}

  public changeLayoutMode(layout: string): void {
    this.settings.layoutMode.next(layout);
    this.settings.changeLayoutMode(layout);
    localStorage.setItem('layoutMode', layout);
  }



  resetAllMode() {
    this.settings.changeLayoutMode('1');
    this.settings.changeThemeColor('1');
    this.settings.changeLoaderState('1');

    this.rgbaValues = '84, 109, 254, 1'
  }
}
