import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {  ApexChart,
  ApexDataLabels,
  ApexLegend,
  ApexPlotOptions,
  ApexNonAxisChartSeries,
  ChartType,NgApexchartsModule } from 'ng-apexcharts';
import { routes } from '../../../../../shared/routes/routes';

@Component({
  selector: 'app-admin-attendance-overview',
  standalone: true,
  imports: [CommonModule, RouterLink, NgApexchartsModule],
  templateUrl: './attendance-overview.component.html',
})
export class AdminAttendanceOverviewComponent {
  routes = routes;

 attendanceChart: {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  colors: string[];
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  plotOptions: ApexPlotOptions;
} = {
  series: [59, 15],

  chart: {
    type: 'donut' as ChartType, 
    height: 240,
    sparkline: {
    enabled: true // Très important pour supprimer les marges automatiques
  }
  },

  labels: ['Présente', 'Absent(e)'],
  colors: ['#a782d2', '#6cb7e6'],

  dataLabels: {
    enabled: false,
  },

  legend: {
    show: false,
  },

  plotOptions: {
    pie: {
      startAngle: -90,
      endAngle: 90,
      donut: {
        size: '70%',
      },
      offsetY: 0,
    },
  },
};

}
