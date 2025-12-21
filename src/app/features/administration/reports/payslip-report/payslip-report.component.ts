import { Component, ViewChild, OnInit } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { apiResultFormat, breadCrumbItems, payslipReport } from '../../../../shared/models/models';
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
import { CollapseHeaderComponent } from '../../../common/collapse-header/collapse-header.component';
import { BreadcrumbsComponent } from '../../../common/breadcrumbs/breadcrumbs.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

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
    CollapseHeaderComponent,
    BreadcrumbsComponent,
    NgApexchartsModule,
    BsDatepickerModule
  ]
})
export class PayslipReportComponent implements OnInit {
  public routes = routes;
  breadCrumbItems: breadCrumbItems[] = [];
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();

  // Statistiques globales
  public statistiques = {
    masseSalarialeTotale: 850000,
    deductionsTotales: 175000,
    netAPayer: 675000,
    primesTotales: 95000,
    evolutionMensuelle: 12.5,
    evolutionDeductions: -3.2,
    evolutionNet: 8.7,
    evolutionPrimes: 15.3
  };

  // Charts
  public masseSalarialeChart: Partial<ChartOptions> | any;
  public evolutionMensuelleChart: Partial<ChartOptions> | any;
  public repartitionDeductionsChart: Partial<ChartOptions> | any;
  public comparaisonDepartementsChart: Partial<ChartOptions> | any;
  public repartitionCategoriesChart: Partial<ChartOptions> | any;
  public tendanceAnnuelleChart: Partial<ChartOptions> | any;

  @ViewChild('chart') chart!: ChartComponent;

  constructor(
    private data: DataService,
    private router: Router
  ) {
    this.breadCrumbItems = [
      { label: 'RH' },
      { label: 'Rapports de Paie', active: true }
    ];

    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  ngOnInit(): void {
    this.initializerGraphiques();
  }

  private initializerGraphiques(): void {
    // 1. Graphique : Évolution mensuelle de la masse salariale (Ligne)
    this.masseSalarialeChart = {
      series: [{
        name: 'Masse Salariale',
        data: [650000, 680000, 720000, 750000, 780000, 810000, 850000, 820000, 840000, 870000, 850000, 880000]
      }, {
        name: 'Net à Payer',
        data: [520000, 544000, 576000, 600000, 624000, 648000, 680000, 656000, 672000, 696000, 680000, 704000]
      }],
      chart: {
        type: 'area',
        height: 350,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 3
      },
      fill: {
        type: 'gradient',
        gradient: {
          opacityFrom: 0.6,
          opacityTo: 0.1,
        }
      },
      xaxis: {
        categories: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        labels: {
          formatter: (value: number) => {
            return value.toLocaleString('fr-MA') + ' DH';
          }
        }
      },
      colors: ['#0d6efd', '#198754'],
      legend: {
        position: 'top',
        horizontalAlign: 'left'
      },
      tooltip: {
        y: {
          formatter: (value: number) => {
            return value.toLocaleString('fr-MA') + ' MAD';
          }
        }
      }
    };

    // 2. Graphique : Répartition des déductions (Donut)
    this.repartitionDeductionsChart = {
      series: [35, 25, 20, 12, 8],
      chart: {
        type: 'donut',
        height: 380
      },
      labels: ['CNSS', 'AMO', 'IR', 'CIMR', 'Autres'],
      colors: ['#0d6efd', '#6f42c1', '#dc3545', '#fd7e14', '#6c757d'],
      dataLabels: {
        enabled: true,
        formatter: (val: number) => {
          return val.toFixed(1) + '%';
        }
      },
      legend: {
        position: 'bottom',
        fontSize: '14px'
      },
      plotOptions: {
        pie: {
          donut: {
            size: '70%',
            labels: {
              show: true,
              total: {
                show: true,
                label: 'Total Déductions',
                fontSize: '16px',
                fontWeight: 600,
                formatter: () => {
                  return '175 000 DH';
                }
              }
            }
          }
        }
      },
      tooltip: {
        y: {
          formatter: (value: number) => {
            return value.toFixed(1) + '%';
          }
        }
      }
    };

    // 3. Graphique : Comparaison par département (Barres)
    this.comparaisonDepartementsChart = {
      series: [{
        name: 'Salaire Brut',
        data: [180000, 220000, 150000, 190000, 210000, 140000]
      }, {
        name: 'Net à Payer',
        data: [144000, 176000, 120000, 152000, 168000, 112000]
      }],
      chart: {
        type: 'bar',
        height: 350,
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 8,
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: ['IT', 'RH', 'Finance', 'Marketing', 'Ventes', 'Support'],
      },
      yaxis: {
        labels: {
          formatter: (value: number) => {
            return (value / 1000).toFixed(0) + 'K DH';
          }
        }
      },
      fill: {
        opacity: 1
      },
      colors: ['#0d6efd', '#198754'],
      tooltip: {
        y: {
          formatter: (value: number) => {
            return value.toLocaleString('fr-MA') + ' MAD';
          }
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left'
      }
    };

    // 4. Graphique : Répartition par catégorie (Polar Area)
    this.repartitionCategoriesChart = {
      series: [45, 30, 15, 10],
      chart: {
        type: 'polarArea',
        height: 380
      },
      labels: ['Cadres', 'Agents de Maîtrise', 'Employés', 'Ouvriers'],
      colors: ['#0d6efd', '#6f42c1', '#20c997', '#ffc107'],
      stroke: {
        colors: ['#fff']
      },
      fill: {
        opacity: 0.9
      },
      legend: {
        position: 'bottom',
        fontSize: '14px'
      },
      tooltip: {
        y: {
          formatter: (value: number) => {
            return value + '%';
          }
        }
      }
    };

    // 5. Graphique : Évolution mensuelle détaillée (Colonnes groupées)
    this.evolutionMensuelleChart = {
      series: [{
        name: 'Salaire de Base',
        data: [480000, 500000, 520000, 540000, 560000, 580000]
      }, {
        name: 'Primes',
        data: [80000, 85000, 90000, 95000, 100000, 95000]
      }, {
        name: 'Indemnités',
        data: [90000, 95000, 110000, 115000, 120000, 115000]
      }],
      chart: {
        type: 'bar',
        height: 350,
        stacked: false,
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '60%',
          borderRadius: 6,
        },
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: ['Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
      },
      yaxis: {
        labels: {
          formatter: (value: number) => {
            return (value / 1000).toFixed(0) + 'K';
          }
        }
      },
      colors: ['#0d6efd', '#ffc107', '#20c997'],
      legend: {
        position: 'top',
        horizontalAlign: 'left'
      },
      tooltip: {
        y: {
          formatter: (value: number) => {
            return value.toLocaleString('fr-MA') + ' MAD';
          }
        }
      }
    };

    // 6. Graphique : Tendance annuelle (Line avec marqueurs)
    this.tendanceAnnuelleChart = {
      series: [{
        name: 'Charges Patronales',
        data: [130000, 136000, 144000, 150000, 156000, 162000, 170000, 164000, 168000, 174000, 170000, 176000]
      }, {
        name: 'Charges Salariales',
        data: [45000, 47000, 50000, 52000, 54000, 56000, 59000, 57000, 58000, 60000, 59000, 61000]
      }],
      chart: {
        type: 'line',
        height: 350,
        toolbar: {
          show: false
        }
      },
      stroke: {
        curve: 'smooth',
        width: 3
      },
      markers: {
        size: 5,
        hover: {
          size: 7
        }
      },
      xaxis: {
        categories: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
      },
      yaxis: {
        labels: {
          formatter: (value: number) => {
            return (value / 1000).toFixed(0) + 'K DH';
          }
        }
      },
      colors: ['#dc3545', '#fd7e14'],
      legend: {
        position: 'top',
        horizontalAlign: 'left'
      },
      tooltip: {
        y: {
          formatter: (value: number) => {
            return value.toLocaleString('fr-MA') + ' MAD';
          }
        }
      }
    };
  }

  // Méthode pour formater les nombres
  formaterMontant(montant: number): string {
    return montant.toLocaleString('fr-MA', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  }

  // Méthode pour obtenir la classe CSS selon l'évolution
  obtenirClasseEvolution(valeur: number): string {
    return valeur >= 0 ? 'text-success' : 'text-danger';
  }

  // Méthode pour obtenir l'icône selon l'évolution
  obtenirIconeEvolution(valeur: number): string {
    return valeur >= 0 ? 'ti-arrow-wave-right-up' : 'ti-arrow-wave-right-down';
  }
}