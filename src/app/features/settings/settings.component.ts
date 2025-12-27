import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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
}
