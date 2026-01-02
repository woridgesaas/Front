import { Component, Input } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-daily-presence-department-chart',
  imports: [NgApexchartsModule],
  templateUrl: './daily-presence-department-chart.component.html',
})
export class DailyPresenceDepartmentChartComponent {
  @Input() deptPresence:any;
}
