import { Component, Input } from '@angular/core';
import { KpisComponent } from '../../../../../common/kpis/kpis.component';

@Component({
  selector: 'app-attendance-kpis',
  imports: [KpisComponent],
  templateUrl: './attendance-kpis.component.html',
})
export class AttendanceKpisComponent {
  @Input() kpiData: any[] = [];
}
