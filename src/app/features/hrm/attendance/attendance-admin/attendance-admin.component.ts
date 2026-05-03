import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatSortModule, Sort } from '@angular/material/sort';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { EnrollCardModalComponent } from '../Components/enroll-card-modal/enroll-card-modal.component';
import { routes } from '../../../../shared/routes/routes';
import { AttendanceAdmin } from '../models/attendance.model';
import {
  AttendanceApiService,
  AttendanceListResponse
} from '../../../../shared/services/attendance-api.service';

import { BreadcrumbsComponent } from '../../../common/breadcrumbs/breadcrumbs.component';
import { FilterComponent } from '../../../common/filter/filter.component';
import { CustomPaginationComponent } from '../../../../shared/custom-pagination/custom-pagination.component';
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
export class AttendanceAdminComponent implements OnInit {

  routes = routes;

  initChecked = false;
  pageSize = 10;
  isLoading = false;

  tableData: AttendanceAdmin[] = [];
  filteredData: AttendanceAdmin[] = [];
  tableDataCopy: AttendanceAdmin[] = [];

  // Pour test : 3 mois en arrière
  // Pour prod : décommenter les deux lignes suivantes
  // currentStartDate: string = this.formatDate(new Date());
  // currentEndDate: string = this.formatDate(new Date());
  currentStartDate: string = this.formatDate(this.threeMonthsAgo());
  currentEndDate: string = this.formatDate(new Date());

  currentDepartmentId?: string;
  currentStatusFilter: string = '';

  selectedEmployee: AttendanceAdmin | null = null;
  showEnrollModal = false;

  @ViewChild(AttendanceTableComponent) attendanceTable!: AttendanceTableComponent;

  private overtimeIdMap = new Map<string, string>();

  constructor(private attendanceApi: AttendanceApiService) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.isLoading = true;
    console.log('Loading attendance:', this.currentStartDate, '→', this.currentEndDate);

    this.attendanceApi.getAttendanceList(
      this.currentStartDate,
      this.currentEndDate,
      this.currentDepartmentId
    ).subscribe({
      next: (data) => {
        this.overtimeIdMap.clear();
        const mapped = data.map(item => this.toAttendanceAdmin(item));
        this.tableDataCopy = [...mapped];
        this.applyStatusFilter();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading attendance', err);
        this.isLoading = false;
      }
    });
  }

  private toAttendanceAdmin(item: AttendanceListResponse): AttendanceAdmin {
    let statusUi: 'Present' | 'Absent' | 'Overtime' = 'Present';
    if (item.status === 'ABSENT') statusUi = 'Absent';
    else if (item.status === 'OVERTIME') statusUi = 'Overtime';

    const hoursStr = item.productionHours
      ? `${item.productionHours.toFixed(2)} Hrs`
      : '0.00 Hrs';

    if (item.overtimeId) {
      this.overtimeIdMap.set(item.workingDayId, item.overtimeId);
    }

    return {
      Date: item.date,
      Department: item.departmentName,
      Employee: item.employeeName,
      Image: 'default.jpg',
      Role: 'Employee',
      CheckIn: item.checkInTime ? this.formatTime(item.checkInTime) : '—',
      CheckOut: item.checkOutTime ? this.formatTime(item.checkOutTime) : '—',
      Break: '—',
      Late: '—',
      Production: item.productionHours,
      ProductionHours: hoursStr,
      Status: statusUi,
      isOvertime: item.status === 'OVERTIME',
      overtimeDecision: item.overtimeStatus || undefined,
      employeeId: item.employeeId,
      hasRfidCard: item.hasRfidCard
    };
  }

  private formatTime(time: string): string {
    return time.substring(0, 5);
  }

  private applyStatusFilter(): void {
    if (!this.currentStatusFilter) {
      this.filteredData = [...this.tableDataCopy];
    } else {
      this.filteredData = this.tableDataCopy.filter(
        row => row.Status === this.currentStatusFilter
      );
    }
    this.tableData = [...this.filteredData];
  }

  approve(row: AttendanceAdmin): void {
    const overtimeId = this.findOvertimeId(row);
    if (!overtimeId) {
      console.warn('No overtime to approve for', row.Employee);
      return;
    }
    this.attendanceApi.approveOvertime(overtimeId).subscribe({
      next: () => { row.overtimeDecision = 'APPROVED'; },
      error: (err) => console.error('Error approving overtime', err)
    });
  }

  reject(row: AttendanceAdmin): void {
    const overtimeId = this.findOvertimeId(row);
    if (!overtimeId) {
      console.warn('No overtime to reject for', row.Employee);
      return;
    }
    const raison = prompt('Raison du refus ?') || 'Non spécifié';
    this.attendanceApi.rejectOvertime(overtimeId, raison).subscribe({
      next: () => { row.overtimeDecision = 'REJECTED'; },
      error: (err) => console.error('Error rejecting overtime', err)
    });
  }

  private findOvertimeId(row: AttendanceAdmin): string | undefined {
    for (const [, overtimeId] of this.overtimeIdMap.entries()) {
      return overtimeId;
    }
    return undefined;
  }

  onDateFilter(dates: Date[]): void {
    if (
      dates?.length === 2 &&
      dates[0] instanceof Date && !isNaN(dates[0].getTime()) &&
      dates[1] instanceof Date && !isNaN(dates[1].getTime())
    ) {
      this.currentStartDate = this.formatDate(dates[0]);
      this.currentEndDate = this.formatDate(dates[1]);
      this.loadData();
    }
  }

  onDepartmentFilter(departmentId: string): void {
    this.currentDepartmentId = departmentId || undefined;
    this.loadData();
  }

  onStatusFilter(status: string): void {
    this.currentStatusFilter = status;
    this.applyStatusFilter();
  }

  onSortFilter(_: string): void {}

  searchData(value: string): void {
    const v = value.trim().toLowerCase();
    if (!v) {
      this.filteredData = [...this.tableDataCopy];
      this.tableData = [...this.filteredData];
      return;
    }
    this.filteredData = this.tableDataCopy.filter(row =>
      row.Employee.toLowerCase().includes(v) ||
      (row.Department ?? '').toLowerCase().includes(v)
    );
    this.tableData = [...this.filteredData];
  }

  sortData(_: Sort): void {}
  selectAll(_: boolean): void {}
  changePageSize(_: number): void {}

  openEnrollModal(employee: AttendanceAdmin): void {
    this.selectedEmployee = employee;
    this.showEnrollModal = true;
  }

  closeEnrollModal(): void {
    this.showEnrollModal = false;
    this.selectedEmployee = null;
  }

  onEnrollSuccess(employeeId: string): void {
    if (this.attendanceTable) {
      this.attendanceTable.onEnrollSuccess(employeeId);
    }
    this.tableData.forEach(row => {
      if (row.employeeId === employeeId) row.hasRfidCard = true;
    });
    this.tableDataCopy.forEach(row => {
      if (row.employeeId === employeeId) row.hasRfidCard = true;
    });
    this.closeEnrollModal();
  }

  private threeMonthsAgo(): Date {
    const d = new Date();
    d.setMonth(d.getMonth() - 3);
    return d;
  }

  private formatDate(d: Date): string {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }
}