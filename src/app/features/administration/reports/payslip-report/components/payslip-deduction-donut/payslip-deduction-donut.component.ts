import { Component, Input } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-payslip-deduction-donut',
  imports: [NgApexchartsModule],
  templateUrl: './payslip-deduction-donut.component.html',
})
export class PayslipDeductionDonutComponent {
  @Input() repartitionDeductionsChart:any;
}
