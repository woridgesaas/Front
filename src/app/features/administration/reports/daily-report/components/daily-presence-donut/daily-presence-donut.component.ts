import { Component, Input } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-daily-presence-donut',
  imports: [NgApexchartsModule],
  templateUrl: './daily-presence-donut.component.html',
})
export class DailyPresenceDonutComponent {
  @Input() presenceDonut:any;
}
