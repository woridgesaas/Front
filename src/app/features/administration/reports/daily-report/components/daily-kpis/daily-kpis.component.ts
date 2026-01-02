import { Component, Input } from '@angular/core';
import { KpisComponent } from '../../../../../common/kpis/kpis.component';

@Component({
  selector: 'app-daily-kpis',
  imports: [KpisComponent],
  templateUrl: './daily-kpis.component.html',
})
export class DailyKpisComponent {
  @Input() kpiData:any;
}
