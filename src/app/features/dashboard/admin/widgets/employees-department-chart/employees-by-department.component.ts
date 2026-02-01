import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexPlotOptions,
  ApexDataLabels,
  ApexGrid,
  NgApexchartsModule,
} from 'ng-apexcharts';

@Component({
  selector: 'app-admin-employees-by-department',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './employees-by-department.component.html',
})
export class AdminEmployeesByDepartmentComponent {
  EmpDepartment: {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    colors: string[];
    plotOptions: ApexPlotOptions;
    dataLabels: ApexDataLabels;
    grid: ApexGrid;
    xaxis: ApexXAxis;
  } = {
    series: [{ name: 'Employés', data: [80, 110, 80, 20, 60, 100] }],
    chart: { type: 'bar', height: 220, toolbar: { show: false } },
    colors: ['#583f9d'],
    plotOptions: {
      bar: { horizontal: true, borderRadius: 5, barHeight: '35%' },
    },
    dataLabels: { enabled: false },
    grid: { borderColor: '#E5E7EB', strokeDashArray: 5 },
    xaxis: {
      categories: [
        'UI/UX',
        'Development',
        'Management',
        'HR',
        'Testing',
        'Marketing',
      ],
    },
  };
}
