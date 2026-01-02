import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import {
  apiResultFormat,
  breadCrumbItems,
  dailyReport,
} from '../../../../shared/models/models';
import {
  pageSelection,
  PaginationService,
  tablePageSize,
} from '../../../../shared/custom-pagination/pagination.service';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../../../../shared/data/data.service';
import { ChartComponent } from 'ng-apexcharts';
import { Router } from '@angular/router';
import { MatSortModule, Sort } from '@angular/material/sort';
import {
  ApexAxisChartSeries,
  ApexNonAxisChartSeries,
  ApexChart,
  ApexLegend,
  ApexXAxis,
  ApexYAxis,
  ApexDataLabels,
  ApexGrid,
  ApexStroke,
  ApexPlotOptions,
  ApexTooltip,
  ApexResponsive,
  ApexFill,
} from 'ng-apexcharts';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { BreadcrumbsComponent } from '../../../common/breadcrumbs/breadcrumbs.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DailyKpisComponent } from './components/daily-kpis/daily-kpis.component';
import { DailyStatisticsService } from '../../../../shared/services/reports/daily-statistics-service';
import { DailyMetricsChartComponent } from './components/daily-metrics-chart/daily-metrics-chart.component';
import { DailyPresenceDonutComponent } from './components/daily-presence-donut/daily-presence-donut.component';
import { DailyPresenceDepartmentChartComponent } from './components/daily-presence-department-chart/daily-presence-department-chart.component';
import { DailyAbsenceTypeChartComponent } from './components/daily-absence-type-chart/daily-absence-type-chart.component';


// Complete daily chart options
export interface DailyChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  legend: ApexLegend;
  colors: string[];
  tooltip?: ApexTooltip;
  responsive?: ApexResponsive[];
  plotOptions?: ApexPlotOptions;
  fill?: ApexFill;
}
export interface ChartOptions {
  series?: ApexAxisChartSeries | number[];
  chart?: ApexChart;
  xaxis?: ApexXAxis;
  dataLabels?: ApexDataLabels;
  grid?: ApexGrid;
  stroke?: ApexStroke;
  title?: ApexTitleSubtitle;
  legend?: ApexLegend;
  colors?: string[];
  labels?: string[];
}
@Component({
  selector: 'app-daily-report',
  templateUrl: './daily-report.component.html',
  styleUrl: './daily-report.component.scss',
  imports: [
    CommonModule,
    FormsModule,
    MatSortModule,
    BreadcrumbsComponent,
    MatSelectModule,
    NgApexchartsModule,
    BsDatepickerModule,
    DailyKpisComponent,
    DailyMetricsChartComponent,
    DailyPresenceDonutComponent,
    DailyPresenceDepartmentChartComponent,
    DailyAbsenceTypeChartComponent
  ],
})
export class DailyReportComponent implements OnInit{
  public routes = routes;
  public presenceDonut: any;
  public kpiData:any=[];
  public statistiques :any=[];
  public deptPresence: any;
  public serialNumberArray: number[] = [];
  public daily_chart:any;
  public absenceType:any;

  @ViewChild('chart') chart!: ChartComponent;
  constructor(
    private dailyService: DailyStatisticsService
  ) {
  }
  ngAfterViewInit() {
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map(
      (tooltipTriggerEl) =>
        new (window as any).bootstrap.Tooltip(tooltipTriggerEl)
    );
  }


  public loadKpisFromService():void{
    this.statistiques =this.dailyService.getStatisticsData();
    this.kpiData=[
      {
        title:'Total des présents',
        value:`${this.statistiques.presence}/${this.statistiques.totalEmployes}`,
        icon: 'ti ti-user-check',
        color: 'primary'
      },
      {
        title: 'Total des absents',
        value: this.statistiques.absence,
        icon: 'ti ti-user-x',
        color: 'danger',
      },
      {
        title: 'Taux de présence',
        value: Math.floor(( this.statistiques.presence / this.statistiques.totalEmployes) * 100)+'%',
        icon: 'ti ti-chart-pie',
        color: 'success'
      }
    ]
  }

  private loadGlobalChart(): void {
    this.daily_chart = this.dailyService.getGlobalMetricsCHart();
  }
  private loaddPresenceDonut():void{
    this.presenceDonut=this.dailyService.getPresenceDonut();
  }
  private loadPresenceByDepartsChart():void{
    this.deptPresence=this.dailyService.getPresenceByDeparts();
  }
  private loadAbsenceTypeChart():void{
     this.absenceType=this.dailyService.getAbsenceTypeChart();
  }
  ngOnInit(): void {
    this.loadGlobalChart();
    this.loadKpisFromService();
    this.loaddPresenceDonut();
    this.loadPresenceByDepartsChart();
    this.loadAbsenceTypeChart();
    /**this.absenceType = {
      series: [
        {
          name: 'Nombre d’absences',
          data: [8, 3, 2, 1, 1],
        },
      ],
      chart: {
        type: 'bar',
        height: 300,
        toolbar: { show: false },
      },
      xaxis: {
        categories: [
          'Maladie',
          'Exceptionnel',
          'Annuel',
          'Autorisation',
          'Sans justification',
        ],
      },
      colors: ['#f97316'],
      plotOptions: {
        bar: {
          borderRadius: 8,
          columnWidth: '45%',
        },
      },
      dataLabels: {
        enabled: true,
      },
    };*/



  }
}
