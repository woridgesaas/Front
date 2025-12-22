import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexStroke,
  ApexXAxis,
  ApexLegend,
  ApexTooltip,
  ApexFill,
  ApexPlotOptions,
  ChartType
} from 'ng-apexcharts';
import { NgApexchartsModule } from 'ng-apexcharts';

import { BreadcrumbsComponent } from '../../../common/breadcrumbs/breadcrumbs.component';
import { CollapseHeaderComponent } from '../../../common/collapse-header/collapse-header.component';

@Component({
  selector: 'app-leave-report',
  standalone: true,
  templateUrl: './leave-report.component.html',
  styleUrls: ['./leave-report.component.scss'],
  imports: [
    CommonModule,
    NgApexchartsModule,
    BreadcrumbsComponent,
    CollapseHeaderComponent
  ]
})
export class LeaveReportComponent {

  breadCrumbItems = [
    { label: 'RH' },
    { label: 'Rapport des Congés', active: true }
  ];

  // ================= KPI (ICÔNES CORRIGÉES) =================
  kpis = [
    {
      label: 'Total congés',
      value: 128,
      icon: 'ti ti-calendar-stats',
      color: 'bg-primary',
      evolution: 12.4
    },
    {
      label: 'Congés acceptés',
      value: 96,
      icon: 'ti ti-calendar-check',
      color: 'bg-success',
      evolution: 8.1
    },
    {
      label: 'En attente',
      value: 18,
      icon: 'ti ti-hourglass',
      color: 'bg-warning',
      evolution: -2.3
    },
    {
      label: 'Refusés',
      value: 14,
      icon: 'ti ti-calendar-off',
      color: 'bg-danger',
      evolution: -4.6
    }
  ];

  // ================= CHART 1 : STACKED (SANS AUTRES) =================
  leaveEvolutionChart = {
    series: [
      { name: 'Annuel', data: [30, 40, 35, 50, 45, 60, 55] },
      { name: 'Exceptionnel', data: [20, 25, 30, 20, 25, 30, 28] },
      { name: 'Maladie', data: [15, 10, 20, 15, 18, 12, 14] }
    ] as ApexAxisChartSeries,

    chart: {
      type: 'bar' as ChartType,
      height: 320,
      stacked: true,
      stackType: '100%' as '100%'
    } as ApexChart,

    plotOptions: {
      bar: {
        borderRadius: 6
      }
    } as ApexPlotOptions,

    xaxis: {
      categories: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil']
    } as ApexXAxis,

    legend: {
      position: 'top'
    } as ApexLegend,

    colors: ['#198754', '#0dcaf0', '#dc3545']
  };

  // ================= CHART 2 : DONUT (SANS AUTRES) =================
  leaveTypeDonutChart = {
    series: [45, 25, 20],
    chart: {
      type: 'donut' as ChartType,
      height: 300
    } as ApexChart,
    labels: ['Annuel', 'Exceptionnel', 'Maladie'],
    colors: ['#198754', '#0dcaf0', '#dc3545'],
    legend: {
      position: 'bottom'
    } as ApexLegend
  };

  // ================= CHART 3 : PAR DÉPARTEMENT =================
  leaveByDepartmentChart = {
    series: [
      {
        name: 'Demandes de congés',
        data: [42, 38, 31, 28, 24]
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
        formatter: (val: number) => `${val} congés`
      }
    } as ApexTooltip,

    colors: ['#0d6efd']
  };

  // ================= CHART 4 : TAUX ACCEPTATION =================
  leaveApprovalRateChart = {
    series: [
      {
        name: 'Taux d’acceptation (%)',
        data: [72, 75, 78, 82, 85, 88, 90]
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

    colors: ['#20c997']
  };
}
