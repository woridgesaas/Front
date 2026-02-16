import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from '../common/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from '../common/footer/footer.component';
import { SettingsTabItemComponent } from './components/settings-tab-item/settings-tab-item.component';
import { SettingsTab } from '../../shared/models/settings-tab.model';
import { SETTINGS_TABS } from '../../shared/config/settings-tabs.config';

@Component({
  selector: 'app-settings',
  standalone: true,
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  imports: [
    CommonModule,
    RouterModule,
    BreadcrumbsComponent,
    FooterComponent,
    SettingsTabItemComponent,
  ],
})
export class SettingsComponent {
  tabs: SettingsTab[] = SETTINGS_TABS;

  trackByTab(_: number, tab: SettingsTab): string {
    return tab.link;
  }
}
