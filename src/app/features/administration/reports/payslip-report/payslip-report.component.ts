import { Component, ViewChild, OnInit } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { DataService } from '../../../../shared/data/data.service';
import { Router } from '@angular/router';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexGrid,
  ApexStroke,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexYAxis,
  ApexPlotOptions,
  ApexLegend,
  ApexTooltip,
  ApexFill,
  ChartComponent,
  ApexNonAxisChartSeries,
} from 'ng-apexcharts';
import { Chart, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BreadcrumbsComponent } from '../../../common/breadcrumbs/breadcrumbs.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PayslipStatisticsService } from '../../../../shared/services/reports/payslip-statistics-service';
import { PayslipKpisComponent } from './components/payslip-kpis/payslip-kpis.component';
import { PayslipEvolutionChartComponent } from './components/payslip-evolution-chart/payslip-evolution-chart.component';
import { PayslipDeductionDonutComponent } from './components/payslip-deduction-donut/payslip-deduction-donut.component';
import { PayslipDepartmentChartComponent } from './components/payslip-department-chart/payslip-department-chart.component';
import { PayslipCategoryChartComponent } from './components/payslip-category-chart/payslip-category-chart.component';

export interface ChartOptions {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart: ApexChart;
  xaxis?: ApexXAxis;
  yaxis?: ApexYAxis;
  dataLabels?: ApexDataLabels;
  grid?: ApexGrid;
  stroke?: ApexStroke;
  title?: ApexTitleSubtitle;
  labels?: string[];
  colors?: string[];
  plotOptions?: ApexPlotOptions;
  legend?: ApexLegend;
  tooltip?: ApexTooltip;
  fill?: ApexFill;
}

Chart.register(...registerables);

@Component({
  selector: 'app-payslip-report',
  templateUrl: './payslip-report.component.html',
  styleUrl: './payslip-report.component.scss',
  imports: [
    CommonModule,
    FormsModule,
    BreadcrumbsComponent,
    NgApexchartsModule,
    BsDatepickerModule,
    PayslipKpisComponent,
    PayslipEvolutionChartComponent,
    PayslipDeductionDonutComponent,
    PayslipDepartmentChartComponent,
    PayslipCategoryChartComponent
  ],
})
export class PayslipReportComponent implements OnInit {
  public routes = routes;
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  statistiques:any=[];
  kpis:any=[];
  
  private loadKpisFromService():void{
    this.kpis = [
      {
        title: 'Masse Salariale Totale',
        value: `${this.statistiques.masseSalarialeTotale} DH`,
        icon: 'ti ti-wallet',
        color: 'primary',
        evolution: this.statistiques.evolutionMensuelle,
      },
      {
        title: 'Déductions Totales',
        value: `${this.statistiques.deductionsTotales} DH`,
        icon: 'ti ti-receipt-tax',
        color: 'success',
        evolution: this.statistiques.evolutionDeductions,
      },
      {
        title: 'Net à Payer',
        value: `${this.statistiques.netAPayer} DH`,
        icon: 'ti ti-cash',
        color: 'warning',
        evolution: this.statistiques.evolutionNet,
      },
      {
        title: 'Primes Totales',
        value: `${this.statistiques.primesTotales} DH`,
        icon: 'ti ti-gift',
        color: 'danger',
        evolution: this.statistiques.evolutionPrimes,
      },
    ];
  }


  // Charts
  public masseSalarialeChart: Partial<ChartOptions> | any;
  public evolutionMensuelleChart: Partial<ChartOptions> | any;
  public repartitionDeductionsChart: Partial<ChartOptions> | any;
  public comparaisonDepartementsChart: Partial<ChartOptions> | any;
  public repartitionCategoriesChart: Partial<ChartOptions> | any;

  @ViewChild('chart') chart!: ChartComponent;

  constructor(private data: DataService, private router: Router,private payslipService:PayslipStatisticsService) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  ngOnInit(): void {
    this.statistiques = this.payslipService.getStatistics();
    this.initializerGraphiques();
    this.loadKpisFromService();
  }

  private initializerGraphiques(): void {
    // 1. Chart : Evalution of salary
    this.masseSalarialeChart = this.payslipService.getPayslipEvalutionChart();

    // 2. Chart : Deductions  (Donut)
    this.repartitionDeductionsChart = this.payslipService.getPayslipDeductionDonut();

    // 3. Chart : Compare by department (Barres)
    this.comparaisonDepartementsChart = this.payslipService.getPayslipByDepartmentsChart();

    // 4. Chart : distributed by category (Barres grouped)
    this.evolutionMensuelleChart = this.payslipService.getPayslipByCategory();
  }

  // formated salary
  formatAmount(montant: number): string {
    return montant.toLocaleString('fr-MA', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }

  
  obtenirClasseEvolution(valeur: number): string {
    return valeur >= 0 ? 'text-success' : 'text-danger';
  }


  obtenirIconeEvolution(valeur: number): string {
    return valeur >= 0 ? 'ti-arrow-wave-right-up' : 'ti-arrow-wave-right-down';
  }
}
