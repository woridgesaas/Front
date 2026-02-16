import { Injectable } from '@angular/core';
import { ChartType } from 'ng-apexcharts';

@Injectable({
  providedIn: 'root',
})
export class AttendanceStatisticsService {
  private rawData = {
      total: 425,    
      presence: 391,          
      absence: 34            
    
    };
  private months =['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil']
   
  public getStatistices():any[]{
    const data = this.rawData;
    const presenceRate = (data.presence / data.total) * 100;
    const absenceRate = (data.absence / data.total) * 100;
    return [
      {value:presenceRate , evolution:4.2},
      {value:absenceRate , evolution:-1.1},
      {value:data.total , evolution:3.0}
    ]
  }
  /** ================== CHART 1 ====================== */
  private getEvolutionData():any{
    return{
      presence:[85, 88, 90, 92, 91, 93, 94],
      absence: [15, 12, 10, 8, 9, 7, 6] ,
      months: this.months
    }
  }
  public getAttendanceEvolutionChart():any{
    const data = this.getEvolutionData();
    return {
      series: [
        { name: 'Présent', data:  data.presence},
        { name: 'Absent', data: data.absence},
      ] as ApexAxisChartSeries,

      chart: {
        type: 'line' as ChartType,
        height: 300,
      } as ApexChart,

      stroke: {
        curve: 'smooth',
        width: 3,
      } as ApexStroke,

      xaxis: {
        categories: data.months,
      } as ApexXAxis,

      tooltip: {
        shared: true,
      } as ApexTooltip,

      legend: {
        position: 'top',
      } as ApexLegend,

      colors: ['#198754', '#dc3545'],
    };
  }
  /** ======================= CHART 2 ======================== */
  public getAttendanceDonutChart():any{
    return {
      series: [this.rawData.presence, this.rawData.absence], // presence / absent
      chart: {
        type: 'donut' as ChartType,
        height: 300,
      } as ApexChart,
      labels: ['Présent', 'Absent'],
      colors: ['#198754', '#dc3545'],
      legend: {
        position: 'bottom',
      } as ApexLegend,
    };
  }
  /** ========================== CHART 3 ======================== */
  private attendanceByDepartmentData={
    present:[96, 93, 91, 89, 88],
    departs:['IT', 'Finance', 'Marketing', 'RH', 'Support']
  }
  public getAttendanceByDepartments():any{
    const data = this.attendanceByDepartmentData
    return {
      series: [
        {
          name: 'Taux de présence',
          data: data.present,
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
        categories: data.departs,
      } as ApexXAxis,

      tooltip: {
        y: {
          formatter: (val: number) => `${val}%`,
        },
      } as ApexTooltip,

      colors: ['#0d6efd'],
    };
  }
  /** =========================== CHART 4 ========================== */
  private presenceMonthlyRate={
    months:this.months,
    count:[88, 89, 90, 92, 91, 93, 94]
  }
  public getAttendanceRateMonthly():any{
    return {
      series: [
        {
          name: 'Présence (%)',
          data: this.presenceMonthlyRate.count,
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
        categories: this.presenceMonthlyRate.months,
      } as ApexXAxis,

      colors: ['#0dcaf0'],
    };
  }
}
