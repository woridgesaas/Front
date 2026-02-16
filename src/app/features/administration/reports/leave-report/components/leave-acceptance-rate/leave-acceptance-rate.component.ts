import { Component, Input } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-leave-acceptance-rate',
  imports: [NgApexchartsModule],
  templateUrl: './leave-acceptance-rate.component.html',

})
export class LeaveAcceptanceRateComponent {
  @Input() leaveApprovalRateChart:any;
}
