import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { routes } from '../../../../shared/routes/routes';

@Component({
  selector: 'app-apps-dropdown',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './apps-dropdown.component.html',
  styleUrl: './apps-dropdown.component.scss',
})
export class AppsDropdownComponent {
  routes = routes;
}
