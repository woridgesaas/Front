import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { routes } from '../../../../../shared/routes/routes';

@Component({
  selector: 'app-admin-clock-in-out',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-clock-in-out.component.html',
})
export class AdminClockInOutComponent {
  routes = routes;
}
