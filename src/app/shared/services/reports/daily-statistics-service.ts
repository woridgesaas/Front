import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DailyStatisticsService {
  private statisticsRawData={
    totalEmployes:315,
    presence:300,
    absence:15
  }
  public getStatisticsData():any{
    return this.statisticsRawData;
  }
  /** =========== CHART 1 ================= */
  private dailyMetrics = {tickets: 4,entretiens: 8, evenements: 1, absences: 12,reunions: 3};
  private labels=['Tickets', 'Entretiens' , 'Événements' , 'Absences' , 'Réunions']
  public getGlobalMetricsCHart():any{
    return {
        series: [
          {
            data: Object.values(this.dailyMetrics) // values of objetc :)
          }
        ],

        chart: {
          type: 'bar',
          height: 320,
          toolbar: {
            show: true,
            tools: {
              download: true,
              selection: false,
              zoom: false,
              zoomin: false,
              zoomout: false,
              pan: false,
              reset: false
            }
          }
        },

        colors: ['#0d6efd'], 

        plotOptions: {
          bar: {
            borderRadius: 8,
            columnWidth: '55%',
            distributed: false,
            dataLabels: {
              position: 'top'
            }
          }
        },

        dataLabels: {
          enabled: true,
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ['#374151']
          },
          formatter: (val: number) => val > 0 ? val.toString() : ''
        },

        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },

        xaxis: {
          categories: this.labels,
          labels: {
            style: {
              fontSize: '12px',
              fontWeight: 500
            },
            rotate: -45
          },
          title: {
            text: 'Modules',
            style: {
              fontSize: '13px',
              fontWeight: 600
            }
          }
        },

        yaxis: {
          title: {
            text: 'Nombre',
            style: {
              fontSize: '13px',
              fontWeight: 600
            }
          },
          labels: {
            formatter: (val: number) => Math.round(val).toString()
          }
        },

        grid: {
          borderColor: '#e5e7eb',
          strokeDashArray: 4,
          xaxis: {
            lines: {
              show: true
            }
          },
          yaxis: {
            lines: {
              show: true
            }
          }
        },

        tooltip: {
          theme: 'light',
          y: {
            formatter: (val: number) => `${val} activités`
          }
        },

        legend: {
          show: false
        },
        subtitle: {
          text: `Données du ${new Date().toLocaleDateString('fr-FR')}`,
          align: 'left',
          style: {
            fontSize: '12px',
            color: '#6b7280'
          }
        }
      };
  }
  /** =============== CHART 2 ================== */
  private todayPresenceData():any{
    return {
      absence:15,
      presence:240
    }
  }
  public getPresenceDonut():any{
    const data=this.todayPresenceData();
    return {
      series: [data.presence, data.absence],
      labels: ['Présent', 'Absent'],
      chart: {
        type: 'donut',
        height: 260,
      },
      colors: ['#22c55e', '#ef4444'],
      legend: {
        position: 'bottom',
        fontSize: '13px',
      },
      plotOptions: {
        pie: {
          donut: {
            size: '70%',
            labels: {
              show: true,
              total: {
                show: true,
                label: 'Total',
                fontSize: '14px',
                color: '#6b7280',
              },
            },
          },
        },
      },
      dataLabels: { enabled: false },
    };
  }
  /**======= CHART 3============ */
  private getPresenceByDepartsData():any{
    return{
      employesCount:[78, 65, 52, 48, 40, 32],
      departs:['IT & Développement','Ventes','Marketing','Finance','RH','Support',],
    }
  }
  public getPresenceByDeparts():any{
    const data=this.getPresenceByDepartsData();
    return {
      series: [
        {
          name: 'Employés présents',
          data: data.employesCount,
        },
      ],

      chart: {
        type: 'bar',
        height: 300,
        toolbar: { show: false },
      },

      colors: ['#6366f1'],

      xaxis: {
        categories: data.departs,
        labels: {
          style: {
            fontSize: '12px',
            colors: '#6b7280',
          },
        },
      },

      plotOptions: {
        bar: {
          borderRadius: 8,
          columnWidth: '45%',
        },
      },
    };
  }
  /** =================== CHART 4 ===================== */
  private getAbsenceTypeData():any{
    return{
      absenceCount:[8, 3, 2, 1, 1],
      types:['Maladie','Exceptionnel','Annuel','Sans justification'],
    }
  }
  public getAbsenceTypeChart():any{
    const data=this.getAbsenceTypeData();
    return  {
        series: [
          {
            name: 'Absences',
            data: data.absenceCount,
          },
        ],

        chart: {
          type: 'bar',
          height: 360,
          toolbar: { show: false },
        },

        plotOptions: {
          bar: {
            horizontal: true,
            borderRadius: 10,
            barHeight: '55%',
            distributed: true,
          },
        },

        colors: [
          '#ef4444', 
          '#f97316', 
          '#eab308', 
          '#3b82f6', 
          '#6b7280', 
        ],

        dataLabels: {
          enabled: true,
          textAnchor: 'start',
          offsetX: 10,
          formatter: (val: number) => {
            let absenceTotal=data.absenceCount.reduce((total:number , abs:number)=> total + abs ,0);
            const percent = ((val / absenceTotal) * 100).toFixed(1);
            return `${val} (${percent}%)`;
          },
        },

        
        xaxis: {
          categories: data.types,
          min: 0,
          max: Math.max(...data.absenceCount) + 2,
          labels: {
            style: {
              fontSize: '12px',
              colors: '#6b7280',
            },
          },
        },

        yaxis: {
          labels: {
            style: {
              fontSize: '13px',
              colors: '#374151',
              fontWeight: 500,
            },
          },
        },

        grid: {
          borderColor: '#eef0f4',
          strokeDashArray: 4,
        },

        legend: {
          show: false,
        },
      };
  }
}
