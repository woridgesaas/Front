import { Component, Input } from '@angular/core';
import { KpisComponent } from '../../../../../common/kpis/kpis.component';

@Component({
  selector: 'app-payslip-kpis',
  imports: [KpisComponent],
  templateUrl: './payslip-kpis.component.html',

})
export class PayslipKpisComponent {
  @Input() kpiData:any;
}
