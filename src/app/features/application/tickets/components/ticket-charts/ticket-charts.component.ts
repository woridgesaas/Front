import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-ticket-charts',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './ticket-charts.component.html',
})
export class TicketChartsComponent implements OnInit {
  // Données statiques (mock)
  stats = {
  newTickets: { count: 120, percentage: '+19.01%', trend: 'up', label: 'Nouveaux Tickets' },
  openTickets: { count: 60, percentage: '+19.01%', trend: 'up', label: 'Tickets Ouverts' },
  solvedTickets: { count: 50, percentage: '+19.01%', trend: 'up', label: 'Tickets Résolus' },
  pendingTickets: { count: 10, percentage: '+19.01%', trend: 'up', label: 'Tickets En Attente' }
};
  // Configuration des charts
  areaChart1 = {
    series: [{
      name: this.stats.newTickets.label,
      data: [30, 40, 100, 50, 49, 60, 70, 91, 125]
    }],
    chart: {
      height: 50,
      width: 100,
      horizental:false,
      type: 'bar' as const,
      toolbar: { show: false },
      sparkline: { enabled: true }
    },
    plotOptions: {
    bar: {
      columnWidth: '60%',
      borderRadius: 3,
      horizontal: false
    }
  },
    colors: ['#3498db'],
    fill: {
      type: 'solid',
    },
    stroke: { curve: 'smooth', width: 2 },
    xaxis: { show: false },
    tooltip: { enabled: false },
    dataLabels: { enabled: false }
  };

  areaChart2 = {
    ...this.areaChart1,
    series: [{ name: this.stats.openTickets.label, data: [20, 50, 30, 35, 40, 45, 50, 55, 60] }],
    colors: ['#9b59b6']
  };

  areaChart3 = {
    ...this.areaChart1,
    series: [{ name: this.stats.solvedTickets.label, data: [10, 15, 20, 25, 30, 35, 40, 45, 80] }],
    colors: ['#2ecc71']
  };

  areaChart4 = {
    ...this.areaChart1,
    series: [{ name: this.stats.pendingTickets.label, data: [5, 8, 10, 66, 15, 18, 60, 50, 25] }],
    colors: ['#212121']
  };

  constructor() { }

  ngOnInit(): void {
    // Charge reel depuis un service future avec le backend
    // this.loadChartData();
  }
}