import { Injectable } from '@angular/core';
import { ApexChart, ApexLegend, ChartType } from 'ng-apexcharts';
@Injectable({
  providedIn: 'root',
})
export class LeaveStatisticsService {
  private statistics =  [
    {value:128 , evolution: 12.4},
    {value: 96 , evolution: 8.1},
    {value: 18 ,evolution:-2.3 },
    {value: 14 , evolution:-4.17}
  ]
  public getStatistices():{}[]{
    return this.statistics;
  }
  /** ============= CHART 1================ */
  private getLeaveRawData(): any {
    return {
      annuel: [30, 40, 35, 50, 45, 60, 55],
      exceptionnel: [20, 25, 30, 20, 25, 30, 28],
      maladie: [15, 10, 20, 15, 18, 12, 14],
      mois: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil']
    };
  }
  public getLeaveEvolutionChart():any{
    const data = this.getLeaveRawData();
    return{
      series: [
        { 
          name: 'Annuel', 
          data: data.annuel 
        },
        { 
          name: 'Exceptionnel', 
          data: data.exceptionnel 
        },
        { 
          name: 'Maladie', 
          data: data.maladie 
        }
      ],
      
      chart: {
        type: 'bar',
        height: 320,
        stacked: true,
        stackType: '100%',
        toolbar: {
          show: false
        }
      },
      
      plotOptions: {
        bar: {
          borderRadius: 6,
          columnWidth: '70%'
        }
      },
      
      xaxis: {
        categories: data.mois,
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      
      yaxis: {
        title: {
          text: 'Pourcentage (%)',
          style: {
            fontSize: '13px'
          }
        },
        labels: {
          formatter: (value: number) => {
            return `${value}%`;
          }
        }
      },
      
      legend: {
        position: 'top',
        horizontalAlign: 'center',
        fontSize: '13px',
        markers: {
          width: 12,
          height: 12,
          radius: 3
        }
      },
      
      tooltip: {
        y: {
          formatter: (value: number) => {
            return `${value}%`;
          }
        }
      },
      
      colors: ['#198754', '#0dcaf0', '#dc3545'],
      
      // Responsive
      responsive: [{
        breakpoint: 768,
        options: {
          chart: {
            height: 280
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    };
    
  }
  /** ================ CHART 2 ===================== */
  public getLeaveTypeChart():any{
    const data = this.getLeaveRawData();
    const totalAnnuel = data.annuel.reduce((sum: number, value: number) => sum + value, 0);
    const totalExcpetion = data.exceptionnel.reduce((total:number , value:number)=>total+value , 0);
    const totalMaladie = data.maladie.reduce((total:number , value:number)=>total+value , 0);
    return {
    series: [totalAnnuel, totalExcpetion, totalMaladie],
    chart: {
      type: 'donut' as ChartType,
      height: 300,
    } as ApexChart,
    labels: ['Annuel', 'Exceptionnel', 'Maladie'],
    colors: ['#198754', '#0dcaf0', '#dc3545'],
    legend: {
      position: 'bottom',
    } as ApexLegend,
  };
  }
  /** ============ CHART 3 ======================== */
  private getDepartmentLeaveData(): any {
    return {
      departments: ['IT', 'Finance', 'Marketing', 'RH', 'Autre'],
      leaves: [42, 38, 31, 28, 24]
    };
  }
  public getLeavesByDepartment():any{
    const data=this.getDepartmentLeaveData();
    return {
      series: [
        {
          name: 'Demandes de congés',
          data: data.leaves,
        },
      ] as ApexAxisChartSeries,

      chart: {
        type: 'bar' as ChartType,
        height: 300,
      } as ApexChart,

      plotOptions: {
        bar: {
          horizontal: true,
          borderRadius: 6,
        },
      } as ApexPlotOptions,

      xaxis: {
        categories: data.departments,
      } as ApexXAxis,

      tooltip: {
        y: {
          formatter: (val: number) => `${val} congés`,
        },
      } as ApexTooltip,

      colors: ['#0d6efd'],
    };
  }
  /** ================= CHART 4 =========================== */
  private getAcceptedLeaves():any{
    const data = this.getLeaveRawData();
    return {
      months:data.mois,
      acceptedCount:[72, 75, 78, 82, 85, 88, 90]
    }
  }
  public getAcceptedLeaveRate():any{
    const data=this.getAcceptedLeaves();
    return {
      series: [
        {
          name: 'Taux d’acceptation (%)',
          data: data.acceptedCount,
        },
      ] as ApexAxisChartSeries,

      chart: {
        type: 'area' as ChartType,
        height: 300,
      } as ApexChart,

      stroke: {
        curve: 'smooth',
        width: 2,
      } as ApexStroke,

      fill: {
        type: 'gradient',
        gradient: {
          opacityFrom: 0.4,
          opacityTo: 0.1,
        },
      } as ApexFill,

      xaxis: {
        categories:data.months,
      } as ApexXAxis,

      colors: ['#20c997'],
    };
  }
}
