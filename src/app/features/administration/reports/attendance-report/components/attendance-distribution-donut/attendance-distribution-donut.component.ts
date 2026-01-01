import { Component, Input } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-attendance-distribution-donut',
  imports: [NgApexchartsModule],
  templateUrl: './attendance-distribution-donut.component.html',
})
export class AttendanceDistributionDonutComponent {
  @Input() presenceDonutChart:any;
}
