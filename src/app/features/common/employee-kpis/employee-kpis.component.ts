import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-kpis',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-kpis.component.html',
})
export class EmployeeKpisComponent {

  // KPI values (plus tard viendront de l’API)
  @Input() today = { value: 8.36, max: 9, trend: 5, up: true };
  @Input() week = { value: 10, max: 40, trend: 7, up: true };
  @Input() month = { value: 75, max: 98, trend: 8, up: false };
  @Input() overtime = { value: 16, max: 28, trend: 6, up: false };

  totalHours = '12h 36m';
  productiveHours = '08h 36m';
}
