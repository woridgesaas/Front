import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from '../common/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from '../common/footer/footer.component';
import { routes } from '../../shared/routes/routes';

@Component({
  selector: 'app-settings',
  standalone: true,
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  imports: [RouterModule, CommonModule, BreadcrumbsComponent, FooterComponent],
})
export class SettingsComponent {
  routes = routes;

  constructor(private router: Router) {}

  isAppSettingsActive(): boolean {
    const url = this.router.url;

    //* Active only for application settings section
    return url.startsWith('/settings/app-settings/');
  }
}
