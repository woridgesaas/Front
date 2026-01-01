import { Component, ViewChild, OnInit } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { DataService } from '../../../../shared/data/data.service';
import { Router } from '@angular/router';
import {ChartComponent,} from 'ng-apexcharts';
import { Chart, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BreadcrumbsComponent } from '../../../common/breadcrumbs/breadcrumbs.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { EmployeKpisComponent } from './components/employe-kpis/employe-kpis.component';
import { EmployeStatisticsService } from '../../../../shared/services/reports/employe-statistics-service';
import { EmployeChartComponent } from './components/employe-chart/employe-chart.component';
import { ChartOptions } from '../../../../shared/models/models';
import { DepartDistributionChartComponent } from './components/depart-distribution-chart/depart-distribution-chart.component';


Chart.register(...registerables);

@Component({
  selector: 'app-employee-report',
  templateUrl: './employee-report.component.html',
  styleUrl: './employee-report.component.scss',
  imports: [
    CommonModule,
    FormsModule,
    BreadcrumbsComponent,
    NgApexchartsModule,
    BsDatepickerModule,
    EmployeKpisComponent,
    EmployeChartComponent,
    DepartDistributionChartComponent
  ],
})
export class EmployeeReportComponent implements OnInit {
  public routes = routes;
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();

  kpiData:any=[];
  statistiques:any;
  private transformToKpiData():any[] {
    return [
      {
        title: 'Total Employés',
        value: this.formatNumber(this.statistiques.totalEmployes),
        icon: 'ti ti-users',
        color: 'primary',
        evolution: this.statistiques.evolutionTotal,
        badgeText: `${this.statistiques.tauxActivite}% actifs`
      },
      {
        title: 'Employés Actifs',
        value: this.formatNumber(this.statistiques.employesActifs),
        icon: 'ti ti-user-check',
        color: 'success',
        evolution: this.statistiques.evolutionActifs,
        badgeText: 'En activité'
      },
      {
        title: 'Nouveaux Recrutements',
        value: this.formatNumber(this.statistiques.nouveauxEmployes),
        icon: 'ti ti-user-plus',
        color: 'info',
        evolution: this.statistiques.evolutionNouveaux,
        badgeText: 'Ce mois'
      },
      {
        title: 'Départs / Inactifs',
        value: this.formatNumber(this.statistiques.employesInactifs),
        icon: 'ti ti-user-x',
        color: 'danger',
        evolution: this.statistiques.evolutionInactifs,
        badgeText: `${this.statistiques.tauxRotation}% rotation`
      }
    ];
  }

  private loadKpiData(): void {
    this.statistiques = this.kpisService.getStatistiquesEmployesMock();
    this.kpiData = this.transformToKpiData();
  }

  formatNumber(nombre: number): string {
    return nombre.toLocaleString('fr-FR');
  }

  // list of departments
  public departements :any=[];

  // Charts
  public evolutionEmployesChart: Partial<ChartOptions> | any;
  public repartitionDepartementsChart: Partial<ChartOptions> | any;

  @ViewChild('chart') chart!: ChartComponent;

  constructor(private data: DataService, private router: Router,private kpisService:EmployeStatisticsService) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  ngOnInit(): void {
    this.initializerGraphiques();
    this.loadKpiData();
    this.departements = this.kpisService.getDepartmentsList();
  }


  private initializerGraphiques(): void {
    // 1. chart 1 employes evolution 
    this.evolutionEmployesChart = this.kpisService.getEvolutionChartOptions();

    // 2. Deprtas distirbution chart
    this.repartitionDepartementsChart = this.kpisService.getDepartmentDistribution();
  }
}
