import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSortModule, Sort } from '@angular/material/sort';
import { attendanceadmin } from '../../../../../shared/models/models';

type UiStatus = 'ABSENT' | 'PRESENT' | 'WARNING' | 'OVERTIME';

@Component({
  selector: 'app-attendance-table',
  standalone: true,
  imports: [CommonModule, MatSortModule],
  templateUrl: './attendance-table.component.html',
})

export class AttendanceTableComponent {

  @Input() tableData: attendanceadmin[] = [];

  @Output() sortChange = new EventEmitter<Sort>();
  @Output() approveOvertime = new EventEmitter<attendanceadmin>();
  @Output() rejectOvertime = new EventEmitter<attendanceadmin>();

  onSort(sort: Sort): void {
    this.sortChange.emit(sort);
  }

  approve(row: attendanceadmin): void {
    this.approveOvertime.emit(row);
  }

  reject(row: attendanceadmin): void {
    this.rejectOvertime.emit(row);
  }

  trackByEmployee(_: number, item: attendanceadmin): string {
    return item.Employee;
  }

  getHours(value: string): number {
    const [h, m] = value.split(':').map(Number);
    return h + m / 60;
  }

private parseHours(ph: string): number {
  if (!ph) return 0;
  // "8.35 Hrs" / "0.00 Hrs"
  const num = parseFloat(ph.replace('Hrs', '').trim());
  return Number.isFinite(num) ? num : 0;
}

getUiStatus(row: any): UiStatus {
  const h = this.parseHours(row.ProductionHours);

  // On suit tes règles cahier de charge
  if (h < 5) return 'ABSENT';
  if (h < 8) return 'WARNING';
  if (h === 8) return 'PRESENT';
  return 'OVERTIME';
}

getStatusLabel(row: any): string {
  const s = this.getUiStatus(row);
  if (s === 'WARNING') return 'Présent (Warning)';
  if (s === 'PRESENT') return 'Présent';
  if (s === 'OVERTIME') return 'Overtime';
  return 'Absent';
}

statusBadgeClass(row: any): string {
  const s = this.getUiStatus(row);
  if (s === 'PRESENT') return 'badge-success-transparent';
  if (s === 'WARNING') return 'badge-warning-transparent';
  if (s === 'OVERTIME') return 'badge-info-transparent';
  return 'badge-danger-transparent';
}

hoursBadgeClass(row: any): string {
  const s = this.getUiStatus(row);
  if (s === 'PRESENT') return 'badge-success';
  if (s === 'WARNING') return 'badge-warning';
  if (s === 'OVERTIME') return 'badge-info';
  return 'badge-danger';
}

showManagerDecision(row: any): boolean {
  return this.getUiStatus(row) === 'OVERTIME';
}

}
