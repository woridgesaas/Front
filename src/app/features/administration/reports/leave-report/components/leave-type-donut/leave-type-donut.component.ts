import { Component, Input } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-leave-type-donut',
  imports: [NgApexchartsModule],
  templateUrl: './leave-type-donut.component.html',
})
export class LeaveTypeDonutComponent {
  @Input() leaveTypeDonutChart:any;
}
