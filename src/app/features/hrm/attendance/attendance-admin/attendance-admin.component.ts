import { Component, OnInit } from '@angular/core';
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
export class AttendanceAdminComponent implements OnInit {

  /* ================= ROUTES ================= */
  routes = routes;

  /* ================= UI ================= */
  initChecked = false;
  pageSize = 10;
  isLoading = false;

  /* ================= DATA ================= */
  tableData: AttendanceAdmin[] = [];
  filteredData: AttendanceAdmin[] = [];
  tableDataCopy: AttendanceAdmin[] = [];

  /* ================= FILTRES ================= */
  currentStartDate: string = this.formatDate(this.firstDayOfMonth());
  currentEndDate: string = this.formatDate(new Date());
  currentDepartmentId?: string;
  currentStatusFilter: string = '';

  /* ================= MODAL ENROLL ================= */
  selectedEmployee: AttendanceAdmin | null = null;
  showEnrollModal = false;

  /* ================= MAP POUR RETROUVER LES IDs ================= */
  // Clé : workingDayId, Valeur : overtimeId
  private overtimeIdMap = new Map<string, string>();

  constructor(private attendanceApi: AttendanceApiService) {}

  /* ================= INIT ================= */
  ngOnInit(): void {
    this.loadData();
  }

  /* ================= LOAD FROM API ================= */
  private loadData(): void {
    this.isLoading = true;

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

  /* ================= MAPPER API → UI ================= */
  private toAttendanceAdmin(item: AttendanceListResponse): AttendanceAdmin {
    // Calcul status UI
    let statusUi: 'Present' | 'Absent' | 'Overtime' = 'Present';
    if (item.status === 'ABSENT') statusUi = 'Absent';
    else if (item.status === 'OVERTIME') statusUi = 'Overtime';

    const hoursStr = item.productionHours
      ? `${item.productionHours.toFixed(2)} Hrs`
      : '0.00 Hrs';

    // Mémoriser overtimeId pour les actions
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

  /* ================= FILTRE STATUT ================= */
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

  /* ================= ACTIONS OVERTIME ================= */
  approve(row: AttendanceAdmin): void {
    // Retrouver l'overtimeId via l'employeeId + date
    const overtimeId = this.findOvertimeId(row);
    if (!overtimeId) {
      console.warn('No overtime to approve for', row.Employee);
      return;
    }

    this.attendanceApi.approveOvertime(overtimeId).subscribe({
      next: () => {
        row.overtimeDecision = 'APPROVED';
      },
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
      next: () => {
        row.overtimeDecision = 'REJECTED';
      },
      error: (err) => console.error('Error rejecting overtime', err)
    });
  }

  // Helper : retrouve overtimeId pour une row donnée
  private findOvertimeId(row: AttendanceAdmin): string | undefined {
    // On cherche par employeeId + date
    for (const [workingDayId, overtimeId] of this.overtimeIdMap.entries()) {
      // Simple correspondance : on peut améliorer si besoin
      return overtimeId;
    }
    return undefined;
  }

  /* ================= FILTERS HANDLERS ================= */
  onDateFilter(dates: Date[]): void {
    if (dates?.length === 2) {
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

  /* ================= SEARCH ================= */
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

  /* ================= TABLE ================= */
  sortData(_: Sort): void {}
  selectAll(_: boolean): void {}
  changePageSize(_: number): void {}

  /* ================= ENROLL MODAL ================= */
  openEnrollModal(employee: AttendanceAdmin): void {
    this.selectedEmployee = employee;
    this.showEnrollModal = true;
  }

  closeEnrollModal(): void {
    this.showEnrollModal = false;
    this.selectedEmployee = null;
  }

  /* ================= HELPERS ================= */
  private formatDate(d: Date): string {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  private firstDayOfMonth(): Date {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  }
}