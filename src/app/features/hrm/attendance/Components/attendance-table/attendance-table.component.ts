import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSortModule, Sort } from '@angular/material/sort';
import { AttendanceAdmin } from '../../models/attendance.model';
import { AttendanceApiService } from '../../../../../shared/services/attendance-api.service';

type UiStatus = 'ABSENT' | 'PRESENT' | 'WARNING' | 'OVERTIME';

@Component({
  selector: 'app-attendance-table',
  standalone: true,
  imports: [CommonModule, MatSortModule],
  templateUrl: './attendance-table.component.html',
  styleUrls: ['./attendance-table.component.scss'],
})
export class AttendanceTableComponent {

  @Input() tableData: AttendanceAdmin[] = [];
  @Output() sortChange      = new EventEmitter<Sort>();
  @Output() approveOvertime = new EventEmitter<AttendanceAdmin>();
  @Output() rejectOvertime  = new EventEmitter<AttendanceAdmin>();
  @Output() enrollCard      = new EventEmitter<AttendanceAdmin>();

  rfidStatusMap = new Map<string, boolean>();
  rfidLoadingSet = new Set<string>();

  constructor(private attendanceApi: AttendanceApiService) {}

  getRfidStatus(row: AttendanceAdmin): boolean {
    const id = row.employeeId;
    if (!this.rfidStatusMap.has(id)) {
      this.rfidStatusMap.set(id, row.hasRfidCard);
    }
    return this.rfidStatusMap.get(id)!;
  }

  isRfidLoading(row: AttendanceAdmin): boolean {
    return this.rfidLoadingSet.has(row.employeeId);
  }

  deactivateCard(row: AttendanceAdmin): void {
    const id = row.employeeId;
    this.rfidLoadingSet.add(id);

    this.attendanceApi.deactivateCard(id).subscribe({
      next: () => {
        this.rfidStatusMap.set(id, false);
        this.rfidLoadingSet.delete(id);
      },
      error: () => {
        this.attendanceApi.checkEnrollmentStatus(id).subscribe({
          next: (hasCard) => {
            this.rfidStatusMap.set(id, hasCard);
            this.rfidLoadingSet.delete(id);
          },
          error: () => this.rfidLoadingSet.delete(id)
        });
      }
    });
  }

  startEnrollment(row: AttendanceAdmin): void {
    this.enrollCard.emit(row);
  }

  onEnrollSuccess(employeeId: string): void {
    this.rfidStatusMap.set(employeeId, true);
  }

  onSort(sort: Sort): void { this.sortChange.emit(sort); }
  approve(row: AttendanceAdmin): void { this.approveOvertime.emit(row); }
  reject(row: AttendanceAdmin): void { this.rejectOvertime.emit(row); }
  openEnrollModal(row: AttendanceAdmin): void { this.enrollCard.emit(row); }
  trackByEmployee(_: number, item: AttendanceAdmin): string { return item.Employee; }

  private parseHours(ph: string): number {
    if (!ph) return 0;
    const num = parseFloat(ph.replace('Hrs', '').trim());
    return Number.isFinite(num) ? num : 0;
  }

  getUiStatus(row: any): UiStatus {
    const h = this.parseHours(row.ProductionHours);
    if (h === 0) return 'ABSENT';
    if (h < 8)  return 'WARNING';
    if (h === 8) return 'PRESENT';
    return 'OVERTIME';
  }

  getStatusLabel(row: any): string {
    const s = this.getUiStatus(row);
    if (s === 'WARNING')  return 'Présent (Warning)';
    if (s === 'PRESENT')  return 'Présent';
    if (s === 'OVERTIME') return 'Overtime';
    return 'Absent';
  }

  statusBadgeClass(row: any): string {
    const s = this.getUiStatus(row);
    if (s === 'PRESENT')  return 'badge-success-transparent';
    if (s === 'WARNING')  return 'badge-warning-transparent';
    if (s === 'OVERTIME') return 'badge-info-transparent';
    return 'badge-danger-transparent';
  }

  hoursBadgeClass(row: any): string {
    const s = this.getUiStatus(row);
    if (s === 'PRESENT')  return 'badge-success';
    if (s === 'WARNING')  return 'badge-warning';
    if (s === 'OVERTIME') return 'badge-info';
    return 'badge-danger';
  }

  // basé sur overtimeDecision du backend
  showManagerDecision(row: any): boolean {
    return row.overtimeDecision != null;
  }
}