import { Component, Input } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-payslip-evolution-chart',
  imports: [NgApexchartsModule],
  templateUrl: './payslip-evolution-chart.component.html',

})
export class PayslipEvolutionChartComponent {
  @Input() masseSalarialeChart:any;
}
