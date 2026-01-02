import { Component, Input } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-daily-metrics-chart',
  imports: [NgApexchartsModule],
  templateUrl: './daily-metrics-chart.component.html',
})
export class DailyMetricsChartComponent {
  @Input() daily_chart:any;
}
