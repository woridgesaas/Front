/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  HostListener,
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
import {
  BsDatepickerDirective,
  BsDatepickerModule,
} from 'ngx-bootstrap/datepicker';
import { Chart, registerables } from 'chart.js';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { Editor, NgxEditorModule, Toolbar, Validators } from 'ngx-editor';
import { breadCrumbItems } from '../../../shared/models/models';
import { routes } from '../../../shared/routes/routes';
import { CommonService } from '../../../shared/common/common.service';
import { SettingService } from '../../../shared/settings/settings.service';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { FooterComponent } from '../../common/footer/footer.component';
import { RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../common/breadcrumbs/breadcrumbs.component';
import { TagInputModule } from 'ngx-chips';
import { DatePickerModule } from 'primeng/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { AnoncesChartComponent } from '../../application/social-feed/components/anonces-chart/anonces-chart.component';
export interface ChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
}

Chart.register(...registerables);
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
  imports: [
    CommonModule,
    MatSelectModule,
    FormsModule,
    NgxEditorModule,
    BsDatepickerModule,
    FooterComponent,
    RouterLink,
    NgApexchartsModule,
    BreadcrumbsComponent,
    TagInputModule,
    DatePickerModule,
    TimepickerModule,
    AnoncesChartComponent,
  ],
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  routes = routes;
  base = '';
  departments: any[] = [];
  private clockInterval: any;
  now: Date = new Date();
  values: string[] = ['Jerald', 'Andrew', 'Philip', 'Davis'];
  values2: string[] = ['Hendry', 'James'];
  values3: string[] = ['Dwight'];
  @ViewChild('chart') chart!: ChartComponent;
  @ViewChild(BsDatepickerDirective, { static: false })
  datepicker?: BsDatepickerDirective;
  @HostListener('window:scroll')
  onScrollEvent() {
    this.datepicker?.hide();
  }
  public EmpDepartment: Partial<ChartOptions> | any;
  public SalesIncome: Partial<ChartOptions> | any;
  breadCrumbItems: breadCrumbItems[] = [];
  bsConfig: Partial<BsDatepickerConfig>;
  selectedYear: Date | undefined;
  selectedTime: Date = new Date(); // Default time
  dropdownOpen = false;
  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic', 'format_clear'],
    ['underline', 'strike'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['image'],
  ];
  private attendanceChart?: Chart;
  private semiDonutChart?: Chart;

  form = new FormGroup({
    editorContent: new FormControl('', Validators.required()),
  });
  selectedFieldSet: number[] = [0];
  nextStep() {
    if (this.selectedFieldSet[0] < 13) {
      this.selectedFieldSet[0]++;
    }
  }
  previousStep() {
    if (this.selectedFieldSet[0] > 0) {
      // Move to the previous step
      this.selectedFieldSet[0]--;
    }
  }
  constructor(private common: CommonService, private layout: SettingService) {
    this.selectedYear = new Date(new Date().getFullYear(), 0, 1);
    this.bsConfig = {
      minMode: 'year',
      dateInputFormat: 'YYYY', // Display only the year in the input
    };
  }
  selectedDepartment: string = '';
  selectDepartment(department: string) {
    this.selectedDepartment = department;
  }
  loadDepartments() {
    this.departments = [
      { Department: 'Finance' },
      { Department: 'Développement d’applications' },
      { Department: 'Gestion informatique' },
      { Department: 'Développement Web' },
      { Department: 'Ventes' },
      { Department: 'UI / UX' },
      { Department: 'Gestion des comptes' },
      { Department: 'Marketing' },
      { Department: 'Administration' },
      { Department: 'Développement commercial' },
    ];
  }
  // Open the dropdown
  openDropdown() {
    this.dropdownOpen = true;
  }

  // Close the dropdown
  closeDropdown() {
    this.dropdownOpen = false;
  }

  // Update displayed time when selection changes
  onTimeChange() {
    this.closeDropdown(); // Close dropdown after time selection
  }
  ngOnInit(): void {
    this.editor = new Editor();
    this.loadDepartments();

    this.breadCrumbItems = [
      { label: 'Dashboards' },
      { label: 'Admin Dashboard', active: true },
    ];
    this.clockInterval = setInterval(() => {
      this.now = new Date();
    }, 1000);
    this.editor = new Editor();
    this.EmpDepartment = {
      chart: {
        height: 220,
        type: 'bar',
        padding: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ['#583f9dff'],
      grid: {
        borderColor: '#E5E7EB',
        strokeDashArray: 5,
        padding: {
          top: -20,
          left: 0,
          right: 0,
          bottom: 0,
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 5,
          horizontal: true,
          barHeight: '35%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      series: [
        {
          data: [80, 110, 80, 20, 60, 100],
          name: 'Employee',
        },
      ],
      xaxis: {
        categories: [
          'UI/UX',
          'Development',
          'Management',
          'HR',
          'Testing',
          'Marketing',
        ],
        labels: {
          style: {
            colors: '#111827',
            fontSize: '13px',
          },
        },
      },
    };
    this.SalesIncome = {
      chart: {
        height: 290,
        type: 'bar',
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      colors: ['#FF6F28', '#F8F9FA'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          borderRadius: 5,
          borderRadiusWhenStacked: 'all',
          horizontal: false,
          endingShape: 'rounded',
        },
      },
      series: [
        {
          name: 'Income',
          data: [40, 30, 45, 80, 85, 90, 80, 80, 80, 85, 20, 80],
        },
        {
          name: 'Expenses',
          data: [60, 70, 55, 20, 15, 10, 20, 20, 20, 15, 80, 20],
        },
      ],
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        labels: {
          style: {
            colors: '#6B7280',
            fontSize: '13px',
          },
        },
      },
      yaxis: {
        labels: {
          offsetX: -15,
          style: {
            colors: '#6B7280',
            fontSize: '13px',
          },
        },
      },
      grid: {
        borderColor: '#E5E7EB',
        strokeDashArray: 5,
        padding: {
          left: -8,
        },
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false, // Disable data labels
      },
      fill: {
        opacity: 1,
      },
    };
  }
  ngAfterViewInit(): void {
    setTimeout(() => this.renderAttendanceChart());
  }

  renderAttendanceChart() {
    this.attendancedoughcharts();

    window.addEventListener('resize', () => {
      this.attendanceChart?.resize();
    });
  }

  attendancedoughcharts() {
    const canvas = document.getElementById(
      'attendancedoughcharts1'
    ) as HTMLCanvasElement | null;

    if (!canvas) return;

    // Détruire l'ancien chart si existe
    this.attendanceChart?.destroy();

    this.attendanceChart = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: ['Présente', 'Autorisation', 'Absent(e)'],
        datasets: [
          {
            data: [59, 2, 15],
            backgroundColor: [
              '#a782d280', // vert - Présente
              '#bd28efff', // jaune - Autorisation
              '#6cb7e6ff', // rouge - Absent(e)
            ],
            borderWidth: 6,
            borderColor: '#ffffff',
            borderRadius: 8,
          },
        ],
      },
      options: {
        cutout: '70%',
        rotation: -100,
        circumference: 200,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
      },
    });
  }

  mySemiDonutChart() {
    const canvas = document.getElementById(
      'mySemiDonutChart1'
    ) as HTMLCanvasElement | null;

    if (!canvas) return;

    this.semiDonutChart?.destroy();

    this.semiDonutChart = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: ['Ongoing', 'Onhold', 'Completed', 'Overdue'],
        datasets: [
          {
            data: [20, 40, 20, 10],
            backgroundColor: ['#FFC107', '#1B84FF', '#03C95A', '#E70D0D'],
          },
        ],
      },
      options: {
        cutout: '75%',
        rotation: -100,
        circumference: 185,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
      },
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.clockInterval);
    this.attendanceChart?.destroy();
    this.semiDonutChart?.destroy();
    this.editor.destroy();
  }
}
