import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeStatisticsService {
    public getStatistiquesEmployesMock(): any {
    return {
      totalEmployes: 425,
      employesActifs: 398,
      nouveauxEmployes: 28,
      employesInactifs: 27,
      evolutionTotal: 8.5,
      evolutionActifs: 5.2,
      evolutionNouveaux: 40.0,
      evolutionInactifs: -12.3,
      tauxActivite: 93.6,
      tauxRotation: 6.6,
    };
  }
  /**================== CHART 1========================== */
  getEvolutionEmployesData(): any {
    return {
      actifs: [342, 358, 365, 375, 382, 388, 390, 394, 398, 395, 392, 398],
      new: [12, 18, 15, 22, 20, 25, 18, 24, 28, 15, 12, 28],
      departs: [8, 12, 10, 15, 13, 18, 12, 16, 14, 10, 8, 12],
      total: [385, 395, 402, 410, 415, 418, 420, 422, 425, 423, 421, 425]
    };
  } 
  private mois = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
  //Futur :)
  getEvolutionEmployesAPI():void {
    //return this.http.get('api/statistiques/evolution-employes');
  }
  getEvolutionChartOptions(): any {
    const data = this.getEvolutionEmployesData();
    return {
      series: [
        {
          name: 'Employés Actifs',
          type: 'column',
          data: data.actifs,
        },
        {
          name: 'Nouveaux Recrutements',
          type: 'column',
          data: data.new,
        },
        {
          name: 'Départs',
          type: 'column',
          data: data.departs
        },
        {
          name: 'Total Employés',
          type: 'line',
          data: data.total,
        },
      ],
      chart: {
        height: 400,
        type: 'line',
        stacked: false,
        toolbar: {
          show: true,
        },
      },
      stroke: {
        width: [0, 0, 0, 3],
        curve: 'smooth',
      },
      plotOptions: {
        bar: {
          columnWidth: '60%',
          borderRadius: 6,
        },
      },
      fill: {
        opacity: [0.85, 0.85, 0.85, 1],
        gradient: {
          inverseColors: false,
          shade: 'light',
          type: 'vertical',
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100],
        },
      },
      labels: this.mois,
      markers: {
        size: [0, 0, 0, 5],
        hover: {
          size: 7,
        },
      },
      xaxis: {
        type: 'category',
        labels: {
          style: {
            fontSize: '12px',
          },
        },
      },
      yaxis: {
        title: {
          text: "Nombre d'employés",
          style: {
            fontSize: '13px',
            fontWeight: 500,
          },
        },
        min: 0,
        labels: {
          formatter: (value: number) => {
            return Math.round(value).toString();
          },
        },
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: (value: number) => {
            return Math.round(value) + ' employés';
          },
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        fontSize: '13px',
        fontWeight: 500,
        markers: {
          widtt: 12,
          height: 12,
          radius: 3,
        },
      },
      colors: ['#198754', '#0d6efd', '#dc3545', '#6f42c1'],
    };
  }
  /**============= Chart 2 =================== */
  private departements = [
    {
      nom: 'IT & Développement',
      effectif: 95,
      pourcentage: 22.4,
      couleur: '#0d6efd',
    },
    {
      nom: 'Ventes & Commercial',
      effectif: 78,
      pourcentage: 18.4,
      couleur: '#198754',
    },
    { nom: 'Marketing', effectif: 62, pourcentage: 14.6, couleur: '#ffc107' },
    { nom: 'Finance', effectif: 55, pourcentage: 12.9, couleur: '#dc3545' },
    { nom: 'RH', effectif: 45, pourcentage: 10.6, couleur: '#6f42c1' },
    {
      nom: 'Support Client',
      effectif: 52,
      pourcentage: 12.2,
      couleur: '#20c997',
    },
    { nom: 'Logistique', effectif: 38, pourcentage: 8.9, couleur: '#fd7e14' },
  ];

  getDepartmentDistribution():any{
    return {
      series: [
        {
          name: "Nombre d'employés",
          data: this.departements.map((d) => d.effectif),
        },
      ],
      chart: {
        type: 'bar',
        height: 400,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 8,
          horizontal: true,
          distributed: true,
          barHeight: '70%',
          dataLabels: {
            position: 'top',
          },
        },
      },
      colors: this.departements.map((d) => d.couleur),
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
          colors: ['#304758'],
        },
      },
      stroke: {
        show: false,
      },
      xaxis: {
        categories: this.departements.map((d) => d.nom),
        labels: {
          style: {
            fontSize: '12px',
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            fontSize: '13px',
            fontWeight: 500,
          },
        },
      },
      legend: {
        show: false,
      },
      tooltip: {
        y: {
          formatter: (value: number, opts: any) => {
            const index = opts.dataPointIndex;
            return `${value} employés (${this.departements[index].pourcentage}%)`;
          },
        },
      },
      grid: {
        borderColor: '#f1f1f1',
        xaxis: {
          lines: {
            show: true,
          },
        },
      },
    };
  }
  public getDepartmentsList():{}[]{
    return this.departements;
  }
}
