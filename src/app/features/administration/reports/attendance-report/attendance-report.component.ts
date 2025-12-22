import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// ApexCharts
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexStroke,
  ApexXAxis,
  ApexTooltip,
  ApexLegend,
  ApexFill,
  ApexPlotOptions,
  ChartType
} from 'ng-apexcharts';
import { NgApexchartsModule } from 'ng-apexcharts';

// Shared components
import { BreadcrumbsComponent } from '../../../common/breadcrumbs/breadcrumbs.component';
import { CollapseHeaderComponent } from '../../../common/collapse-header/collapse-header.component';

@Component({
  selector: 'app-attendance-report',
  standalone: true,
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.scss'],
  imports: [
    CommonModule,
    NgApexchartsModule,
    BreadcrumbsComponent,
    CollapseHeaderComponent
  ]
})
export class AttendanceReportComponent implements OnInit {

  // ================= Breadcrumb =================
  breadCrumbItems = [
    { label: 'RH' },
    { label: 'Rapport de Présence', active: true }
  ];

  // ================= KPI (SANS RETARD) =================
  kpis = [
    {
      label: 'Taux de présence',
      value: '92%',
      icon: 'ti ti-user-check',
      color: 'bg-success',
      evolution: 4.2
    },
    {
      label: 'Absences',
      value: '6%',
      icon: 'ti ti-user-x',
      color: 'bg-danger',
      evolution: -1.1
    },
    {
      label: 'Employés suivis',
      value: '425',
      icon: 'ti ti-users',
      color: 'bg-primary',
      evolution: 3.0
    }
  ];

  // ================= CHART 1 : Evolution =================
  presenceEvolutionChart = {
    series: [
      { name: 'Présent', data: [85, 88, 90, 92, 91, 93, 94] },
      { name: 'Absent', data: [15, 12, 10, 8, 9, 7, 6] }
    ] as ApexAxisChartSeries,

    chart: {
      type: 'line' as ChartType,
      height: 300
    } as ApexChart,

    stroke: {
      curve: 'smooth',
      width: 3
    } as ApexStroke,

    xaxis: {
      categories: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil']
    } as ApexXAxis,

    tooltip: {
      shared: true
    } as ApexTooltip,

    legend: {
      position: 'top'
    } as ApexLegend,

    colors: ['#198754', '#dc3545']
  };

  // ================= CHART 2 : Donut (SANS RETARD) =================
  presenceDonutChart = {
    series: [92, 8], // Présent / Absent
    chart: {
      type: 'donut' as ChartType,
      height: 300
    } as ApexChart,
    labels: ['Présent', 'Absent'],
    colors: ['#198754', '#dc3545'],
    legend: {
      position: 'bottom'
    } as ApexLegend
  };

  // ================= CHART 3 : Département =================
  presenceByDepartmentChart = {
    series: [
      {
        name: 'Taux de présence',
        data: [96, 93, 91, 89, 88]
      }
    ] as ApexAxisChartSeries,

    chart: {
      type: 'bar' as ChartType,
      height: 300
    } as ApexChart,

    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 6
      }
    } as ApexPlotOptions,

    xaxis: {
      categories: ['IT', 'Finance', 'Marketing', 'RH', 'Support']
    } as ApexXAxis,

    tooltip: {
      y: {
        formatter: (val: number) => `${val}%`
      }
    } as ApexTooltip,

    colors: ['#0d6efd']
  };

  // ================= CHART 4 : Area =================
  presenceRateChart = {
    series: [
      {
        name: 'Présence (%)',
        data: [88, 89, 90, 92, 91, 93, 94]
      }
    ] as ApexAxisChartSeries,

    chart: {
      type: 'area' as ChartType,
      height: 300
    } as ApexChart,

    stroke: {
      curve: 'smooth',
      width: 2
    } as ApexStroke,

    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 0.4,
        opacityTo: 0.1
      }
    } as ApexFill,

    xaxis: {
      categories: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil']
    } as ApexXAxis,

    colors: ['#0dcaf0']
  };

  ngOnInit(): void {}
}
