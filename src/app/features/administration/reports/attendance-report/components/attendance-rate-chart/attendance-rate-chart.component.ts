import { Component, Input } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-attendance-rate-chart',
  imports: [NgApexchartsModule],
  templateUrl: './attendance-rate-chart.component.html',

})
export class AttendanceRateChartComponent {
  @Input() presenceRateChart:any;
}
