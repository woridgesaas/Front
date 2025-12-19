import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { Sondage } from '../../../../../shared/models/models';

@Component({
  selector: 'app-sondage-results',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './sondage-results.component.html',
})
export class SondageResultsComponent implements OnInit {
  @Input() sondage!: Sondage;
  
  chartConfig: any = {};
  showChart: boolean = true;
  chartType: 'donut' | 'bar' | 'pie' = 'donut';

  ngOnInit(): void {
    this.initChart();
  }

  private initChart(): void {
    if (this.chartType === 'donut') {
      this.chartConfig = this.getDonutChart();
    } else if (this.chartType === 'bar') {
      this.chartConfig = this.getBarChart();
    }
  }

  private getDonutChart(): any {
    return {
      series: this.sondage.options.map(opt => opt.pourcentage),
      chart: {
        type: 'donut',
        height: 300
      },
      labels: this.sondage.options.map(opt => opt.texte),
      colors: this.sondage.options.map(opt => opt.couleur || '#3498db'),
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                show: true,
                label: 'Total',
                formatter: () => this.sondage.totalVotes.toString()
              }
            }
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: (val: number) => `${val.toFixed(1)}%`
      },
      legend: {
        position: 'bottom'
      }
    };
  }

  private getBarChart(): any {
    return {
      series: [{
        name: 'Votes',
        data: this.sondage.options.map(opt => opt.votes)
      }],
      chart: {
        type: 'bar',
        height: 300
      },
      colors: this.sondage.options.map(opt => opt.couleur || '#3498db'),
      plotOptions: {
        bar: {
          columnWidth: '60%',
          distributed: true
        }
      },
      xaxis: {
        categories: this.sondage.options.map(opt => opt.texte)
      },
      yaxis: {
        title: {
          text: 'Nombre de votes'
        }
      },
      dataLabels: {
        enabled: true
      }
    };
  }

  changerTypeChart(type: 'donut' | 'bar' | 'pie'): void {
    this.chartType = type;
    this.initChart();
  }
}