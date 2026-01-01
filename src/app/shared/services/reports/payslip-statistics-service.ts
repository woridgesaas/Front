import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PayslipStatisticsService {
  private statistiques = {
    masseSalarialeTotale: 850000,
    deductionsTotales: 175000,
    netAPayer: 675000,
    primesTotales: 95000,
    evolutionMensuelle: 12.5,
    evolutionDeductions: -3.2,
    evolutionNet: 8.7,
    evolutionPrimes: 15.3,
  };
  private months=['Jan','Fév','Mar','Avr','Mai','Juin','Juil','Aoû','Sep','Oct','Nov','Déc'];
  public getStatistics():any{
    return this.statistiques;
  }
  /** ================= CHART 1==================== */
  private getEvalutionData():any{
    return{
      payroll:[650000, 680000, 720000, 750000, 780000, 810000, 850000, 820000,840000, 870000, 850000, 880000],
      net :[520000, 544000, 576000, 600000, 624000, 648000, 680000, 656000,672000, 696000, 680000, 704000],

    }
  }

  public getPayslipEvalutionChart():any{
    const data = this.getEvalutionData();
    return {
        series: [
          {
            name: 'Masse Salariale',
            data: data.payroll,
          },
          {
            name: 'Net à Payer',
            data: data.net,
          },
        ],
        chart: {
          type: 'area',
          height: 350,
          toolbar: {
            show: true,
          },
          zoom: {
            enabled: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
          width: 3,
        },
        fill: {
          type: 'gradient',
          gradient: {
            opacityFrom: 0.6,
            opacityTo: 0.1,
          },
        },
        xaxis: {
          categories: this.months,
          labels: {
            style: {
              fontSize: '12px',
            },
          },
        },
        yaxis: {
          labels: {
            formatter: (value: number) => {
              return value.toLocaleString('fr-MA') + ' DH';
            },
          },
        },
        colors: ['#0d6efd', '#198754'],
        legend: {
          position: 'top',
          horizontalAlign: 'left',
        },
        tooltip: {
          y: {
            formatter: (value: number) => {
              return value.toLocaleString('fr-MA') + ' MAD';
            },
          },
        },
      };
  }
  /**================== CHART 2 =========================== */
  private deductionDonutData():any{
    return {
      types:['CNSS', 'AMO', 'IR', 'CIMR', 'Autres'],
      count:[35, 25, 20, 12, 8]
    }
  }
  public getPayslipDeductionDonut():any{
    const data = this.deductionDonutData();
    return {
        series: data.count,
        chart: {
          type: 'donut',
          height: 380,
        },
        labels: data.types,
        colors: ['#0d6efd', '#6f42c1', '#dc3545', '#fd7e14', '#6c757d'],
        dataLabels: {
          enabled: true,
          formatter: (val: number) => {
            return val.toFixed(1) + '%';
          },
        },
        legend: {
          position: 'bottom',
          fontSize: '14px',
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
                  },
                },
              },
            },
          },
        },
        tooltip: {
          y: {
            formatter: (value: number) => {
              return value.toFixed(1) + '%';
            },
          },
        },
      };
  }
  /** =================== CHART 3 ========================= */
  private compareByDepartmentData():any{
    return{
      brut:[180000, 220000, 150000, 190000, 210000, 140000],
      net:[144000, 176000, 120000, 152000, 168000, 112000],
      departs:['IT', 'RH', 'Finance', 'Marketing', 'Ventes', 'Support']
    }
  }
  public getPayslipByDepartmentsChart():any{
    const data=this.compareByDepartmentData();
    return {
        series: [
          {
            name: 'Salaire Brut',
            data: data.brut,
          },
          {
            name: 'Net à Payer',
            data: data.net,
          },
        ],
        chart: {
          type: 'bar',
          height: 350,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            borderRadius: 8,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent'],
        },
        xaxis: {
          categories: data.departs,
        },
        yaxis: {
          labels: {
            formatter: (value: number) => {
              return (value / 1000).toFixed(0) + 'K DH';
            },
          },
        },
        fill: {
          opacity: 1,
        },
        colors: ['#0d6efd', '#198754'],
        tooltip: {
          y: {
            formatter: (value: number) => {
              return value.toLocaleString('fr-MA') + ' MAD';
            },
          },
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left',
        },
      };
  }

/**================= CHART 4 ============================= */
private getCategoryData():any{
  const dataSalaire = this.getEvalutionData();
  return{
    payroll:dataSalaire.payroll,
    primes:[80000, 85000, 90000, 95000, 100000, 95000,80000,80000,5555,6666,4444,77888]
  }
}
  public getPayslipByCategory():any{
    const data= this.getCategoryData();
    return  {
        series: [
          {
            name: 'Salaire de Base',
            data:data.payroll,
          },
          {
            name: 'Primes',
            data: data.primes,
          },
        ],
        chart: {
          type: 'bar',
          height: 350,
          stacked: false,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '60%',
            borderRadius: 6,
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: this.months,
        },
        yaxis: {
          labels: {
            formatter: (value: number) => {
              return (value / 1000).toFixed(0) + 'K';
            },
          },
        },
        colors: ['#0d6efd', '#ffc107', '#20c997'],
        legend: {
          position: 'top',
          horizontalAlign: 'left',
        },
        tooltip: {
          y: {
            formatter: (value: number) => {
              return value.toLocaleString('fr-MA') + ' MAD';
            },
          },
        },
      };
  }
}
