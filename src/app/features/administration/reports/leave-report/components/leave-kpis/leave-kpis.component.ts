import { Component, Input } from '@angular/core';
import { KpisComponent } from '../../../../../common/kpis/kpis.component';

@Component({
  selector: 'app-leave-kpis',
  imports: [KpisComponent],
  templateUrl: './leave-kpis.component.html',
})
export class LeaveKpisComponent {
  @Input() kpiData:any;
}
