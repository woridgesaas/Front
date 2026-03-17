import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatSortModule, Sort } from '@angular/material/sort';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { EnrollCardModalComponent } from '../Components/enroll-card-modal/enroll-card-modal.component';

import { routes } from '../../../../shared/routes/routes';
import { DataService } from '../../../../shared/data/data.service';
import { attendanceadmin, apiResultFormat } from '../../../../shared/models/models';

/* COMMON COMPONENTS */
import { BreadcrumbsComponent } from '../../../common/breadcrumbs/breadcrumbs.component';
import { FilterComponent } from '../../../common/filter/filter.component';
import { CustomPaginationComponent } from '../../../../shared/custom-pagination/custom-pagination.component';

/* ATTENDANCE COMPONENTS */
import { AttendanceKpisComponent } from '../Components/attendance-kpis/attendance-kpis.component';
import { AttendanceFiltersComponent } from '../Components/attendance-filters/attendance-filters.component';
import { AttendanceTableComponent } from '../Components/attendance-table/attendance-table.component';
import { AttendanceViewSwitchComponent } from '../Components/attendance-view-switch/attendance-view-switch.component';

@Component({
  selector: 'app-attendance-admin',
  standalone: true,
  templateUrl: './attendance-admin.component.html',
  styleUrl: './attendance-admin.component.scss',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    BsDatepickerModule,
    MatSortModule,
    BreadcrumbsComponent,
    FilterComponent,
    CustomPaginationComponent,
    AttendanceKpisComponent,
    AttendanceFiltersComponent,
    AttendanceTableComponent,
    AttendanceViewSwitchComponent,
    EnrollCardModalComponent,
  ],
})
export class AttendanceAdminComponent {

  /* ================= ROUTES ================= */
  routes = routes;

  /* ================= UI ================= */
  initChecked = false;
  pageSize = 10;

  /* ================= DATA ================= */
  tableData: attendanceadmin[] = [];
  filteredData: attendanceadmin[] = [];
  tableDataCopy: attendanceadmin[] = [];

  readonly FULL_TIME = 8;
  readonly WARNING_TIME = 5;

  constructor(private dataService: DataService) {
    this.loadData();
  }

  /* ================= LOAD ================= */
private loadData(): void {
  this.dataService.getattendanceadmin().subscribe((res: apiResultFormat) => {

    const mapped = res.data.map(row => this.mapRow(row));

    // ✅ SOURCE UNIQUE
    this.tableDataCopy = [...mapped];

    // ✅ INITIALISATION AU CHARGEMENT
    this.filteredData = [...this.tableDataCopy];
    this.tableData = [...this.filteredData];

  });
}


private mapRow(row: attendanceadmin): attendanceadmin {
  const hours = this.getHours(row.ProductionHours);

  // 🔴 ABSENT
  if (hours === 0) {
    row.Status = 'Absent';
    row.isOvertime = false;
    row.overtimeDecision = undefined;
    return row;
  }

  // 🟡 / 🟢 PRESENT (normal + warning UI)
  if (hours <= 8) {
    row.Status = 'Present';
    row.isOvertime = false;
    row.overtimeDecision = undefined;
    return row;
  }

  // 🔵 OVERTIME (SEUL CAS AVEC DECISION MANAGER)
  row.Status = 'Overtime';
  row.isOvertime = true;
  row.overtimeDecision = row.overtimeDecision ?? 'PENDING';

  return row;
}
private getHours(value: string): number {
  if (!value) return 0;

  // Exemple: "0.00 Hrs", "8.35 Hrs"
  const numeric = parseFloat(value.replace('Hrs', '').trim());
  return isNaN(numeric) ? 0 : numeric;
}


  /* ================= ACTIONS MANAGER ================= */
  approve(row: attendanceadmin): void {
    row.Status = 'Overtime';
    row.overtimeDecision = 'APPROVED';
  }

  reject(row: attendanceadmin): void {
    row.Status = 'Present';
    row.overtimeDecision = 'REJECTED';
    row.ProductionHours = '08:00';
    row.isOvertime = false;
  }

  /* ================= TABLE ================= */
  sortData(sort: Sort): void {}

  selectAll(_: boolean): void {}

  /* ================= FILTERS (required by HTML) ================= */
  onDateFilter(_: Date[]): void {}
  onDepartmentFilter(_: string): void {}
  onStatusFilter(_: string): void {}
  onSortFilter(_: string): void {}

searchData(value: string): void {
  const v = value.trim().toLowerCase();

  // ✅ reset quand input vide
  if (!v) {
    this.filteredData = [...this.tableDataCopy];
    this.tableData = [...this.filteredData];
    return;
  }

  // ✅ filtre
  this.filteredData = this.tableDataCopy.filter(row =>
    row.Employee.toLowerCase().includes(v) ||
    row.Role.toLowerCase().includes(v)
  );

  this.tableData = [...this.filteredData];
}


  changePageSize(_: number): void {}

  // test btn enroll

  selectedEmployee: attendanceadmin | null = null;
showEnrollModal = false;

openEnrollModal(employee: attendanceadmin): void {
  this.selectedEmployee = employee;
  this.showEnrollModal = true;
}

closeEnrollModal(): void {
  this.showEnrollModal = false;
  this.selectedEmployee = null;
}
}
