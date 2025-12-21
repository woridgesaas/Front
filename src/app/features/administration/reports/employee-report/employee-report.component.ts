import { Component, ViewChild, OnInit } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { apiResultFormat, breadCrumbItems, employeeReport } from '../../../../shared/models/models';
import { DataService } from '../../../../shared/data/data.service';
import { Router, RouterLink } from '@angular/router';
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
  selector: 'app-employee-report',
  templateUrl: './employee-report.component.html',
  styleUrl: './employee-report.component.scss',
  imports: [
    CommonModule,
    FormsModule,
    CollapseHeaderComponent,
    BreadcrumbsComponent,
    NgApexchartsModule,
    BsDatepickerModule,
    RouterLink
  ]
})
export class EmployeeReportComponent implements OnInit {
  public routes = routes;
  breadCrumbItems: breadCrumbItems[] = [];
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();

  // Statistiques globales
  public statistiques = {
    totalEmployes: 425,
    employesActifs: 398,
    nouveauxEmployes: 28,
    employesInactifs: 27,
    evolutionTotal: 8.5,
    evolutionActifs: 5.2,
    evolutionNouveaux: 40.0,
    evolutionInactifs: -12.3,
    tauxActivite: 93.6,
    tauxRotation: 6.6
  };

  // Répartition par département
  public departements = [
    { nom: 'IT & Développement', effectif: 95, pourcentage: 22.4, couleur: '#0d6efd' },
    { nom: 'Ventes & Commercial', effectif: 78, pourcentage: 18.4, couleur: '#198754' },
    { nom: 'Marketing', effectif: 62, pourcentage: 14.6, couleur: '#ffc107' },
    { nom: 'Finance', effectif: 55, pourcentage: 12.9, couleur: '#dc3545' },
    { nom: 'RH', effectif: 45, pourcentage: 10.6, couleur: '#6f42c1' },
    { nom: 'Support Client', effectif: 52, pourcentage: 12.2, couleur: '#20c997' },
    { nom: 'Logistique', effectif: 38, pourcentage: 8.9, couleur: '#fd7e14' }
  ];

  // Charts
  public evolutionEmployesChart: Partial<ChartOptions> | any;
  public repartitionDepartementsChart: Partial<ChartOptions> | any;

  @ViewChild('chart') chart!: ChartComponent;

  constructor(
    private data: DataService,
    private router: Router
  ) {
    this.breadCrumbItems = [
      { label: 'RH' },
      { label: 'Rapports Employés', active: true }
    ];

    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  ngOnInit(): void {
    this.initializerGraphiques();
  }

  private initializerGraphiques(): void {
    // 1. Graphique : Évolution des Employés (Barres groupées + Ligne de tendance)
    this.evolutionEmployesChart = {
      series: [
        {
          name: 'Employés Actifs',
          type: 'column',
          data: [342, 358, 365, 375, 382, 388, 390, 394, 398, 395, 392, 398]
        },
        {
          name: 'Nouveaux Recrutements',
          type: 'column',
          data: [12, 18, 15, 22, 20, 25, 18, 24, 28, 15, 12, 28]
        },
        {
          name: 'Départs',
          type: 'column',
          data: [8, 12, 10, 15, 13, 18, 12, 16, 14, 10, 8, 12]
        },
        {
          name: 'Total Employés',
          type: 'line',
          data: [385, 395, 402, 410, 415, 418, 420, 422, 425, 423, 421, 425]
        }
      ],
      chart: {
        height: 400,
        type: 'line',
        stacked: false,
        toolbar: {
          show: true
        }
      },
      stroke: {
        width: [0, 0, 0, 3],
        curve: 'smooth'
      },
      plotOptions: {
        bar: {
          columnWidth: '60%',
          borderRadius: 6
        }
      },
      fill: {
        opacity: [0.85, 0.85, 0.85, 1],
        gradient: {
          inverseColors: false,
          shade: 'light',
          type: 'vertical',
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100]
        }
      },
      labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
      markers: {
        size: [0, 0, 0, 5],
        hover: {
          size: 7
        }
      },
      xaxis: {
        type: 'category',
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        title: {
          text: 'Nombre d\'employés',
          style: {
            fontSize: '13px',
            fontWeight: 500
          }
        },
        min: 0,
        labels: {
          formatter: (value: number) => {
            return Math.round(value).toString();
          }
        }
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: (value: number) => {
            return Math.round(value) + ' employés';
          }
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        fontSize: '13px',
        fontWeight: 500,
        markers: {
          width: 12,
          height: 12,
          radius: 3
        }
      },
      colors: ['#198754', '#0d6efd', '#dc3545', '#6f42c1']
    };

    // 2. Graphique : Répartition par Département (Barres horizontales)
    this.repartitionDepartementsChart = {
      series: [{
        name: 'Nombre d\'employés',
        data: this.departements.map(d => d.effectif)
      }],
      chart: {
        type: 'bar',
        height: 400,
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          borderRadius: 8,
          horizontal: true,
          distributed: true,
          barHeight: '70%',
          dataLabels: {
            position: 'top'
          }
        }
      },
      colors: this.departements.map(d => d.couleur),
      dataLabels: {
        enabled: true,
        formatter: (val: number, opts: any) => {
          const index = opts.dataPointIndex;
          return `${val} (${this.departements[index].pourcentage}%)`;
        },
        offsetX: 40,
        style: {
          fontSize: '12px',
          fontWeight: 600,
          colors: ['#304758']
        }
      },
      stroke: {
        show: false
      },
      xaxis: {
        categories: this.departements.map(d => d.nom),
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            fontSize: '13px',
            fontWeight: 500
          }
        }
      },
      legend: {
        show: false
      },
      tooltip: {
        y: {
          formatter: (value: number, opts: any) => {
            const index = opts.dataPointIndex;
            return `${value} employés (${this.departements[index].pourcentage}%)`;
          }
        }
      },
      grid: {
        borderColor: '#f1f1f1',
        xaxis: {
          lines: {
            show: true
          }
        }
      }
    };
  }

  // Méthode pour formater les nombres
  formaterNombre(nombre: number): string {
    return nombre.toLocaleString('fr-MA');
  }

  // Méthode pour obtenir la classe CSS selon l'évolution
  obtenirClasseEvolution(valeur: number): string {
    return valeur >= 0 ? 'text-success' : 'text-danger';
  }

  // Méthode pour obtenir l'icône selon l'évolution
  obtenirIconeEvolution(valeur: number): string {
    return valeur >= 0 ? 'ti-arrow-wave-right-up' : 'ti-arrow-wave-right-down';
  }

  // Méthode pour calculer le pourcentage
  calculerPourcentage(valeur: number, total: number): number {
    return Math.round((valeur / total) * 100 * 10) / 10;
  }
}