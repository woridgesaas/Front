import { Component } from '@angular/core';
import {
  NgApexchartsModule,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexStroke,
  ApexDataLabels,
} from 'ng-apexcharts';

@Component({
  selector: 'app-employee-performance',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './employee-performance.component.html',
})
export class EmployeePerformanceComponent {

  series: ApexAxisChartSeries = [
    {
      name: 'performance',
      data: [20, 20, 35, 35, 40, 60, 60],
    },
  ];

  chart: ApexChart = {
    type: 'area',
    height: 273,
    zoom: {
      enabled: false,
    },
  };

  colors: string[] = ['rgba(158, 94, 225, 0.74)'];

  xaxis: ApexXAxis = {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  };

  dataLabels: ApexDataLabels = {
    enabled: false,
  };

  stroke: ApexStroke = {
    curve: 'straight', // ✅ maintenant accepté
  };
}
