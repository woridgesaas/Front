import { Component, ViewChild } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import {
  apiResultFormat,
  breadCrumbItems,
  dailyReport,
} from '../../../../shared/models/models';
import {
  pageSelection,
  PaginationService,
  tablePageSize,
} from '../../../../shared/custom-pagination/pagination.service';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../../../../shared/data/data.service';
import { ChartComponent } from 'ng-apexcharts';
import { Router } from '@angular/router';
import { MatSortModule, Sort } from '@angular/material/sort';
import {
  ApexAxisChartSeries,
  ApexNonAxisChartSeries,
  ApexChart,
  ApexLegend,
  ApexXAxis,
  ApexYAxis,
  ApexDataLabels,
  ApexGrid,
  ApexStroke,
  ApexPlotOptions,
  ApexTooltip,
  ApexResponsive,
  ApexFill,
} from 'ng-apexcharts';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { BreadcrumbsComponent } from '../../../common/breadcrumbs/breadcrumbs.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
// Donut / Pie
// Complete DonutChartOptions
export type DonutChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  colors: string[];
  legend: ApexLegend;
  plotOptions?: ApexPlotOptions;
  dataLabels?: ApexDataLabels;
};

// Complete AxisChartOptions
export type AxisChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  colors: string[];
  plotOptions: ApexPlotOptions;
};

// Complete daily chart options
export interface DailyChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  legend: ApexLegend;
  colors: string[];
  tooltip?: ApexTooltip;
  responsive?: ApexResponsive[];
  plotOptions?: ApexPlotOptions;
  fill?: ApexFill;
}
export interface ChartOptions {
  series?: ApexAxisChartSeries | number[];
  chart?: ApexChart;
  xaxis?: ApexXAxis;
  dataLabels?: ApexDataLabels;
  grid?: ApexGrid;
  stroke?: ApexStroke;
  title?: ApexTitleSubtitle;
  legend?: ApexLegend;
  colors?: string[];
  labels?: string[];
}
@Component({
  selector: 'app-daily-report',
  templateUrl: './daily-report.component.html',
  styleUrl: './daily-report.component.scss',
  imports: [
    CommonModule,
    FormsModule,
    MatSortModule,
    BreadcrumbsComponent,
    MatSelectModule,
    NgApexchartsModule,
    BsDatepickerModule,
  ],
})
export class DailyReportComponent {
  public routes = routes;
  public presenceDonut!: DonutChartOptions;

  public deptPresence!: AxisChartOptions;

  showTable = false;

  initChecked = false;
  // pagination variables
  public pageSize = 10;
  public tableData: dailyReport[] = [];
  public tableDataCopy: dailyReport[] = [];
  public actualData: dailyReport[] = [];
  public currentPage = 1;
  public skip = 0;
  public limit: number = this.pageSize;
  public serialNumberArray: number[] = [];
  public totalData = 0;
  showFilter = false;
  public pageSelection: pageSelection[] = [];
  dataSource!: MatTableDataSource<dailyReport>;
  public searchDataValue = '';
  breadCrumbItems: breadCrumbItems[] = [];
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  public daily_chart!: {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    colors: string[];
    stroke: ApexStroke;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    dataLabels: ApexDataLabels;
    grid: ApexGrid;
    legend: ApexLegend;
    plotOptions: ApexPlotOptions;
    fill: ApexFill;
    tooltip: ApexTooltip;
    responsive: ApexResponsive[];
  };

  @ViewChild('chart') chart!: ChartComponent;
  constructor(
    private data: DataService,
    private router: Router,
    private pagination: PaginationService
  ) {
    this.data.getdailyReport().subscribe((apiRes: apiResultFormat) => {
      this.actualData = apiRes.data;
      this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
        if (this.router.url == this.routes.dailyreport) {
          this.getTableData({ skip: res.skip, limit: res.limit });
          this.pageSize = res.pageSize;
        }
      });
    });
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }
  private getTableData(pageOption: pageSelection): void {
    this.data.getdailyReport().subscribe((apiRes: apiResultFormat) => {
      this.tableData = [];
      this.tableDataCopy = [];
      this.serialNumberArray = [];
      this.totalData = apiRes.totalData;
      apiRes.data.map((res: dailyReport, index: number) => {
        const serialNumber = index + 1;
        if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
          res.sNo = serialNumber;
          this.tableData.push(res);
          this.tableDataCopy.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<dailyReport>(this.actualData);
      this.pagination.calculatePageSize.next({
        totalData: this.totalData,
        pageSize: this.pageSize,
        tableData: this.tableData,
        tableDataCopy: this.tableDataCopy,
        serialNumberArray: this.serialNumberArray,
      });
    });
  }
  ngAfterViewInit() {
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map(
      (tooltipTriggerEl) =>
        new (window as any).bootstrap.Tooltip(tooltipTriggerEl)
    );
  }
  public row = true;
  public searchData(value: string): void {
    this.searchDataValue = value.trim().toLowerCase();
    this.dataSource.filter = this.searchDataValue;
    this.tableData = this.dataSource.filteredData;
    this.row = this.tableData.length > 0;

    if (this.searchDataValue !== '') {
      // Handle filtered data
      this.pagination.calculatePageSize.next({
        totalData: this.tableData.length,
        pageSize: this.pageSize,
        tableData: this.tableData,
        serialNumberArray: this.tableData.map((_, i) => i + 1), // Generates serials like [1, 2, 3...]
      });
    } else {
      // Handle reset to full data
      this.pagination.calculatePageSize.next({
        totalData: this.totalData,
        pageSize: this.pageSize,
        tableData: this.tableData,
        serialNumberArray: this.serialNumberArray,
      });
    }
  }

  public sortData(sort: Sort) {
    const data = this.tableData.slice();

    if (!sort.active || sort.direction === '') {
      this.tableData = data;
    } else {
      this.tableData = data.sort((a, b) => {
        const aValue = (a as never)[sort.active];

        const bValue = (b as never)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }
  public absenceTypeChart!: AxisChartOptions & {
    dataLabels: ApexDataLabels;
  };
  public absenceTypeHorizontalChart!: {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    colors: string[];
    plotOptions: ApexPlotOptions;
    dataLabels: ApexDataLabels;
    grid: ApexGrid;
    legend?: ApexLegend;
  };

  public changePageSize(pageSize: number): void {
    this.pageSelection = [];
    this.limit = pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.pagination.tablePageSize.next({
      skip: this.skip,
      limit: this.limit,
      pageSize: this.pageSize,
    });
  }
  selectAll(initChecked: boolean) {
    if (!initChecked) {
      this.tableData.forEach((f) => {
        f.isSelected = true;
      });
    } else {
      this.tableData.forEach((f) => {
        f.isSelected = false;
      });
    }
  }
  ngOnInit(): void {
    const absenceValues = [8, 3, 2, 1, 1];
    const absenceTotal = absenceValues.reduce((a, b) => a + b, 0);
    // Donut chart
    this.presenceDonut = {
      series: [300, 15],
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
    this.absenceTypeHorizontalChart = {
      series: [
        {
          name: 'Absences',
          data: absenceValues,
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
        '#ef4444', // Maladie
        '#f97316', // Exceptionnel
        '#eab308', // Annuel
        '#3b82f6', // Autorisation
        '#6b7280', // Sans justification
      ],

      dataLabels: {
        enabled: true,
        textAnchor: 'start',
        offsetX: 10,
        formatter: (val: number) => {
          const percent = ((val / absenceTotal) * 100).toFixed(1);
          return `${val} (${percent}%)`;
        },
      },

      // ✅ LES CATEGORIES ICI (ET PAS AILLEURS)
      xaxis: {
        categories: [
          'Maladie',
          'Exceptionnel',
          'Annuel',
          'Autorisation',
          'Sans justification',
        ],
        min: 0,
        max: Math.max(...absenceValues) + 2,
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

    this.absenceTypeChart = {
      series: [
        {
          name: 'Nombre d’absences',
          data: [8, 3, 2, 1, 1],
        },
      ],
      chart: {
        type: 'bar',
        height: 300,
        toolbar: { show: false },
      },
      xaxis: {
        categories: [
          'Maladie',
          'Exceptionnel',
          'Annuel',
          'Autorisation',
          'Sans justification',
        ],
      },
      colors: ['#f97316'],
      plotOptions: {
        bar: {
          borderRadius: 8,
          columnWidth: '45%',
        },
      },
      dataLabels: {
        enabled: true,
      },
    };

    // Department presence bar chart
    this.deptPresence = {
      series: [
        {
          name: 'Employés présents',
          data: [78, 65, 52, 48, 40, 32],
        },
      ],

      chart: {
        type: 'bar',
        height: 300,
        toolbar: { show: false },
      },

      colors: ['#6366f1'],

      xaxis: {
        categories: [
          'IT & Développement',
          'Ventes',
          'Marketing',
          'Finance',
          'RH',
          'Support',
        ],
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

    // Daily report line chart
    this.daily_chart = {
      series: [
        { name: 'Présent', data: [60, 40, 30, 20, 70] },
        { name: 'Absent', data: [20, 60, 45, 60, 80] },
      ],

      chart: {
        type: 'line',
        height: 300,
        zoom: { enabled: false },
        toolbar: { show: false },
      },

      colors: ['#22c55e84', '#ef4444'],

      stroke: {
        curve: 'smooth',
        width: 5,
      },

      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
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
            fontSize: '12px',
            colors: '#6b7280',
          },
        },
      },

      dataLabels: {
        enabled: false,
      },

      grid: {
        borderColor: '#eef0f4',
        strokeDashArray: 4,
      },

      legend: {
        show: false,
      },

      tooltip: {
        theme: 'light',
      },

      plotOptions: {}, // requis par ton type
      fill: {}, // requis
      responsive: [], // requis
    };
  }
}
