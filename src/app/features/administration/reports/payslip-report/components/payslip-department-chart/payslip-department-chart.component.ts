import { Component, Input } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-payslip-department-chart',
  imports: [NgApexchartsModule],
  templateUrl: './payslip-department-chart.component.html',

})
export class PayslipDepartmentChartComponent {
  @Input()comparaisonDepartementsChart:any;
}
