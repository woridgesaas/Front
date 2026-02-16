import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ApexChart,
  ApexDataLabels,
  ApexLegend,
  ApexPlotOptions,
  ApexResponsive,
  ApexNonAxisChartSeries,
  ChartType,
    ApexGrid,
  NgApexchartsModule,
} from 'ng-apexcharts';

@Component({
  selector: 'app-employee-presence-details',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './employee-presence-details.component.html',
})
export class EmployeePresenceDetailsComponent {
  leaves_chart: {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    colors: string[];
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    legend: ApexLegend;
    
    responsive: ApexResponsive[];
  } = {
    series: [1254, 14, 68], // À l’heure / Absences / Congés maladie

    chart: {
      type: 'donut' as ChartType, // ✅ important pour éviter l’erreur TS
      height: 230,
    },

    colors: ['#7c3aed', '#ef4444', '#f59e0b'], // violet / rouge / orange

    dataLabels: {
      enabled: false,
    },

    plotOptions: {
      pie: {
        donut: {
          size: '70%',
        },
      },
    },

    legend: {
      show: false,
    },

    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 200,
          },
        },
      },
    ],
  };
}
