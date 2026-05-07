import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { routes } from '../../../../shared/routes/routes';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-mobile-user-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, ThemeToggleComponent],
  templateUrl: './mobile-user-menu.component.html',
  styleUrl: './mobile-user-menu.component.scss',
})
export class MobileUserMenuComponent {
  routes = routes;
}
