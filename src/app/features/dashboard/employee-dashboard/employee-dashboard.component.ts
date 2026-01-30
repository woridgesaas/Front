import {
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
  AfterViewInit,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexGrid,
  ApexStroke,
  ApexTitleSubtitle,
  ApexXAxis,
  ChartComponent,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { routes } from '../../../shared/routes/routes';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FooterComponent } from '../../common/footer/footer.component';
import { BreadcrumbsComponent } from '../../common/breadcrumbs/breadcrumbs.component';
import { RouterLink } from '@angular/router';
import { EmployeeSummaryComponent } from "../../common/employee-summary/employee-summary.component";
import { EmployeeKpisComponent } from "../../common/employee-kpis/employee-kpis.component";
import { AttendanceHistoryHeaderComponent } from "../../hrm/attendance/Components/attendance-history-header/attendance-history-header.component";
import { FilterComponent } from "../../common/filter/filter.component";
import { AttendanceEmployeeTableComponent } from "../../hrm/attendance/Components/attendance-employee-table/attendance-employee-table.component";

export interface ChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
}
@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.scss',
  imports: [
    CommonModule,
    MatSelectModule,
    FormsModule,
    RouterLink,
    NgxEditorModule,
    BsDatepickerModule,
    FooterComponent,
    NgApexchartsModule,
    BreadcrumbsComponent,
    EmployeeSummaryComponent,
    EmployeeKpisComponent,
   
],
})
export class EmployeeDashboardComponent implements AfterViewInit, OnInit {
  now: Date = new Date();
  private clockInterval!: any;

  public leaves_chart: Partial<ChartOptions> | any;
  public performance_chart2: Partial<ChartOptions> | any;
  @ViewChild('chart') chart!: ChartComponent;
  @ViewChildren('circleProgress')
  circleProgressElements!: QueryList<ElementRef>;
  today!: Date;
  routes = routes;
  onStatusFilter(status: string): void {
    // futur
  }  ngAfterViewInit() {
    this.updateProgress();
  }  bsRangeValue: Date[] = [];
 onSortFilter(sort: string): void {
    // futur
  }

  updateProgress() {
    this.circleProgressElements.forEach((elementRef) => {
      const element = elementRef.nativeElement;
      const value = parseInt(element.getAttribute('data-value'), 10);
      const left = element.querySelector('.progress-left .progress-bar');
      const right = element.querySelector('.progress-right .progress-bar');

      if (value > 0) {
        if (value <= 50) {
          right.style.transform =
            'rotate(' + this.percentageToDegrees(value) + 'deg)';
        } else {
          right.style.transform = 'rotate(180deg)';
          left.style.transform =
            'rotate(' + this.percentageToDegrees(value - 50) + 'deg)';
        }
      }
    });
  }
  startClock() {
    this.clockInterval = setInterval(() => {
      this.now = new Date();
    }, 1000);
  }
  ngOnInit(): void {
    this.startClock();
    this.today = new Date();
    this.leaves_chart = {
      chart: {
        height: 255,
        type: 'donut',
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '50%',
        },
      },
      dataLabels: {
        enabled: false,
      },

      series: [ 5, 10, 60],
      colors: ['#ab8be9ff', '#039bc9d3', '#3259659d'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              show: false,
            },
          },
        },
      ],
      legend: {
        show: false,
      },
    };
    this.performance_chart2 = {
      series: [
        {
          name: 'performance',
          data: [20, 20, 35, 35, 40, 60, 60],
        },
      ],
      chart: {
        height: 273,
        type: 'area',
        zoom: {
          enabled: false,
        },
      },
      colors: ['rgba(158, 94, 225, 0.74)'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },
      title: {
        text: '',
        align: 'left',
      },
      // grid: {
      //   row: {
      //     colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
      //     opacity: 0.5
      //   },
      // },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      },
      yaxis: {
        min: 10,
        max: 60,
        tickAmount: 5,
        labels: {
          formatter: (val: number) => {
            return val / 1 + 'K';
          },
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
      },
    };
  }

  ngOnDestroy(): void {
    if (this.clockInterval) {
      clearInterval(this.clockInterval);
    }
  }
  percentageToDegrees(percentage: number): number {
    return (percentage / 100) * 360;
  }
}
