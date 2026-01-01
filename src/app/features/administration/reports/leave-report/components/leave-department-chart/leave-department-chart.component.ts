import { Component, Input } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-leave-department-chart',
  imports: [NgApexchartsModule],
  templateUrl: './leave-department-chart.component.html',
  styleUrl: './leave-department-chart.component.scss',
})
export class LeaveDepartmentChartComponent {
  @Input() leaveByDepartmentChart:any;
}
