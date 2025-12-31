import { Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MatSortModule, Sort } from '@angular/material/sort';

import { routes } from '../../../../shared/routes/routes';
import {
  apiResultFormat,
  attendanceemployee,
} from '../../../../shared/models/models';

import {
  PaginationService,
  tablePageSize,
} from '../../../../shared/custom-pagination/pagination.service';

import { DataService } from '../../../../shared/data/data.service';

/* ===== Components ===== */
import { BreadcrumbsComponent } from '../../../common/breadcrumbs/breadcrumbs.component';
import { CustomPaginationComponent } from '../../../../shared/custom-pagination/custom-pagination.component';
import { AttendanceViewSwitchComponent } from '../Components/attendance-view-switch/attendance-view-switch.component';
import { AttendanceHistoryHeaderComponent } from '../Components/attendance-history-header/attendance-history-header.component';
import { AttendanceEmployeeTableComponent } from '../Components/attendance-employee-table/attendance-employee-table.component';
import { EmployeeSummaryComponent } from '../../../common/employee-summary/employee-summary.component';
import { EmployeeKpisComponent } from '../../../common/employee-kpis/employee-kpis.component';
import { FilterComponent } from '../../../common/filter/filter.component';

@Component({
  selector: 'app-attendance-employee',
  standalone: true,
  templateUrl: './attendance-employee.component.html',
  styleUrl: './attendance-employee.component.scss',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    BsDatepickerModule,
    MatSortModule,
    BreadcrumbsComponent,
    AttendanceViewSwitchComponent,
    AttendanceHistoryHeaderComponent,
    AttendanceEmployeeTableComponent,
    FilterComponent,
    EmployeeSummaryComponent,
    EmployeeKpisComponent,
    CustomPaginationComponent,
  ],
})
export class AttendanceEmployeeComponent implements OnInit {
  /* =======================
     CHILD TABLE REF
  ======================= */
  @ViewChild(AttendanceEmployeeTableComponent)
  tableComponent!: AttendanceEmployeeTableComponent;

  routes = routes;

  actualData: attendanceemployee[] = [];
  tableData: attendanceemployee[] = [];
  totalData = 0;

  pageSize = 10;
  skip = 0;
  limit = 10;

  bsValue = new Date();
  bsRangeValue: Date[] = [];
  maxDate = new Date();

  constructor(
    private dataService: DataService,
    private pagination: PaginationService,
    private router: Router
  ) {}

  /* =======================
     INIT
  ======================= */
  ngOnInit(): void {
    this.initDateRange();
    this.loadAttendance();

    this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
      if (this.router.url === this.routes.attendanceemployee) {
        this.pageSize = res.pageSize;
        this.skip = res.skip;
        this.limit = res.limit;
        this.applyPagination();
      }
    });
  }

  /* =======================
     DATE
  ======================= */
  private initDateRange(): void {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  /* =======================
     API
  ======================= */
  private loadAttendance(): void {
    this.dataService
      .getattendanceemployee()
      .subscribe((apiRes: apiResultFormat) => {
        this.actualData = apiRes.data;
        this.totalData = apiRes.totalData;
        this.applyPagination();
      });
  }

  /* =======================
     PAGINATION
  ======================= */
  private applyPagination(): void {
    this.tableData = this.actualData.slice(this.skip, this.skip + this.limit);

    this.pagination.calculatePageSize.next({
      totalData: this.totalData,
      pageSize: this.pageSize,
      tableData: this.tableData,
      serialNumberArray: [],
    });
  }

  onPageSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
    this.skip = 0;
    this.limit = pageSize;

    this.pagination.tablePageSize.next({
      skip: this.skip,
      limit: this.limit,
      pageSize: this.pageSize,
    });
  }

  /* =======================
     FILTER RELAYS
  ======================= */
  onStatusFilter(status: string): void {
    // futur
  }

  onSortFilter(sort: string): void {
    // futur
  }

  /* =======================
     TABLE RELAYS
  ======================= */
  onSearch(value: string): void {
    this.tableComponent?.searchData(value);
  }

  onSort(sort: Sort): void {
    this.tableComponent?.sortData(sort);
  }
}
