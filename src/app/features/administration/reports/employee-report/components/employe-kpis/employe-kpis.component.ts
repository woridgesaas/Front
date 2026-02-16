import { Component, Input } from '@angular/core';
import { KpisComponent } from '../../../../../common/kpis/kpis.component';

@Component({
  selector: 'app-employe-kpis',
  imports: [KpisComponent],
  templateUrl: './employe-kpis.component.html',
})
export class EmployeKpisComponent {
    
  @Input() kpiData: any[] = [];
}
