import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { routes } from '../../../../../shared/routes/routes';

@Component({
  selector: 'app-admin-total-employees',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-total-employees.component.html',
})
export class AdminTotalEmployeesComponent {
  routes = routes;
}
