import { Component, Input } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-attendance-department-chart',
  imports: [NgApexchartsModule],
  templateUrl: './attendance-department-chart.component.html',
  styleUrl: './attendance-department-chart.component.scss',
})
export class AttendanceDepartmentChartComponent {
  @Input() presenceByDepartmentChart:any;
}
