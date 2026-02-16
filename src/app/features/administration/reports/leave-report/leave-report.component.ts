import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BreadcrumbsComponent } from '../../../common/breadcrumbs/breadcrumbs.component';
import { LeaveStatisticsService } from '../../../../shared/services/reports/leave-statistics-service';
import { LeaveKpisComponent } from './components/leave-kpis/leave-kpis.component';
import { LeaveEvolutionChartComponent } from "./components/leave-evolution-chart/leave-evolution-chart.component";
import { LeaveTypeDonutComponent } from './components/leave-type-donut/leave-type-donut.component';
import { LeaveDepartmentChartComponent } from './components/leave-department-chart/leave-department-chart.component';
import { LeaveAcceptanceRateComponent } from './components/leave-acceptance-rate/leave-acceptance-rate.component';

@Component({
  selector: 'app-leave-report',
  standalone: true,
  templateUrl: './leave-report.component.html',
  styleUrls: ['./leave-report.component.scss'],
  imports: [CommonModule, NgApexchartsModule, BreadcrumbsComponent, LeaveKpisComponent, LeaveEvolutionChartComponent , LeaveTypeDonutComponent,LeaveDepartmentChartComponent,LeaveAcceptanceRateComponent],
})
export class LeaveReportComponent implements OnInit{
  // ================= KPI (ICÔNES CORRIGÉES) =================
  statistiques:any=[];
  kpis:any=[];
  leaveEvolutionChart :any=[];
  leaveTypeDonutChart :any=[];
  leaveByDepartmentChart:any=[];
  leaveApprovalRateChart:any=[];
  constructor(private leaveStatisticsService:LeaveStatisticsService){}
  ngOnInit():void{
    this.statistiques =this.leaveStatisticsService.getStatistices();
    this.loadKpisFromService();
    this.loadChartsFromService();
    
  }
  // ================= CHART 1 & 2 & 3 & 4 are sent by service :) =================
  
  private loadChartsFromService():void{
    this.leaveEvolutionChart=this.leaveStatisticsService.getLeaveEvolutionChart();
    this.leaveTypeDonutChart = this.leaveStatisticsService.getLeaveTypeChart();
    this.leaveByDepartmentChart = this.leaveStatisticsService.getLeavesByDepartment();
    this.leaveApprovalRateChart = this.leaveStatisticsService.getAcceptedLeaveRate();
  }
  private loadKpisFromService():void{
    this.kpis = [
      {
        title: 'Total congés',
        value: this.statistiques[0].value,
        icon: 'ti ti-calendar-stats',
        color: 'primary',
        evolution: this.statistiques[0].evolution,
      },
      {
        title: 'Congés acceptés',
        value: this.statistiques[1].value,
        icon: 'ti ti-calendar-check',
        color: 'success',
        evolution: this.statistiques[1].evolution,
      },
      {
        title: 'En attente',
        value: this.statistiques[2].value,
        icon: 'ti ti-hourglass',
        color: 'warning',
        evolution: this.statistiques[2].evolution,
      },
      {
        title: 'Refusés',
        value: this.statistiques[3].value,
        icon: 'ti ti-calendar-off',
        color: 'danger',
        evolution: this.statistiques[3].evolution,
      },
    ];
  }


}
