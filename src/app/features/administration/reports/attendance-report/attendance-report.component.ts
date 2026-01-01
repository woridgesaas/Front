import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexStroke,
  ApexXAxis,
  ApexTooltip,
  ApexLegend,
  ApexFill,
  ApexPlotOptions,
  ChartType,
} from 'ng-apexcharts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BreadcrumbsComponent } from '../../../common/breadcrumbs/breadcrumbs.component';
import { AttendanceStatisticsService } from '../../../../shared/services/reports/attendance-statistics-service';
import { AttendanceKpisComponent } from './components/attendance-kpis/attendance-kpis.component';
import { AttendanceEvolutionChartComponent } from './components/attendance-evolution-chart/attendance-evolution-chart.component';
import { AttendanceDistributionDonutComponent } from './components/attendance-distribution-donut/attendance-distribution-donut.component';
import { AttendanceDepartmentChartComponent } from './components/attendance-department-chart/attendance-department-chart.component';
import { AttendanceRateChartComponent } from './components/attendance-rate-chart/attendance-rate-chart.component';

@Component({
  selector: 'app-attendance-report',
  standalone: true,
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.scss'],
  imports: [CommonModule, NgApexchartsModule, BreadcrumbsComponent,AttendanceKpisComponent,AttendanceEvolutionChartComponent , AttendanceDistributionDonutComponent,AttendanceDepartmentChartComponent,AttendanceRateChartComponent],
})
export class AttendanceReportComponent implements OnInit {
  
  kpis:any=[];
  presenceEvolutionChart:any=[];
  presenceDonutChart:any=[];
  presenceByDepartmentChart:any=[];
  presenceRateChart:any=[];
  constructor(private attendanceStatisticsService:AttendanceStatisticsService){}

  ngOnInit(): void {
    this.loadKpisFromService();
    this.loadAttendanceEvolutionChart();
  }
  private loadKpisFromService():void{
    const data = this.attendanceStatisticsService.getStatistices();
    this.kpis = [
    {
      title: 'Taux de présence',
      value: data[0].value,
      icon: 'ti ti-user-check',
      color: 'success',
      evolution: data[0].evolution,
    },
    {
      title: 'Absences',
      value: data[1].value,
      icon: 'ti ti-user-x',
      color: 'danger',
      evolution: data[1].evolution,
    },
    {
      title: 'Employés suivis',
      value: data[2].value,
      icon: 'ti ti-users',
      color: 'primary',
      evolution: data[2].evolution,
    },
  ];
  }
  private loadAttendanceEvolutionChart():void{
    this.presenceEvolutionChart = this.attendanceStatisticsService.getAttendanceEvolutionChart();
    this.presenceDonutChart = this.attendanceStatisticsService.getAttendanceDonutChart();
    this.presenceByDepartmentChart = this.attendanceStatisticsService.getAttendanceByDepartments();
    this.presenceRateChart = this.attendanceStatisticsService.getAttendanceRateMonthly();
  }



}
