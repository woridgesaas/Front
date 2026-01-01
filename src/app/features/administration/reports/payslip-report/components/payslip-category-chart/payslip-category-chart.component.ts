import { Component, Input } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-payslip-category-chart',
  imports: [NgApexchartsModule],
  templateUrl: './payslip-category-chart.component.html',
  styleUrl: './payslip-category-chart.component.scss',
})
export class PayslipCategoryChartComponent {
  @Input() evolutionMensuelleChart:any;
}
