import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSortModule, Sort } from '@angular/material/sort';
import { AttendanceRow, OvertimeDecision } from '../../../../../shared/models/models';

/* =======================
   TYPE
======================= */
type UiStatus =
  | 'ABSENT'
  | 'PRESENT'
  | 'WARNING_PRESENT'
  | 'OVERTIME_APPROVED'
  | 'OVERTIME_PENDING';

/* =======================
   COMPONENT
======================= */

@Component({
  selector: 'app-attendance-employee-table',
  standalone: true,
  imports: [CommonModule, MatSortModule],
  templateUrl: './attendance-employee-table.component.html',
  styleUrl:'./attendance-employee-table.component.scss',
})
export class AttendanceEmployeeTableComponent {
  /* =======================
     INPUTS / OUTPUTS
  ======================= */

  @Input({ required: true }) tableData: AttendanceRow[] = [];

  @Input() deadTimeHours = 8;
  @Input() enableSelection = false;
  @Input() searchable = false;

@Output() selectionChange = new EventEmitter<AttendanceRow[]>();


  @Output() sortChange = new EventEmitter<Sort>();
  initChecked = false;
filteredData: AttendanceRow[] = [];


  /* =======================
     UI MAPPING
  ======================= */

private readonly CLASS_MAP: Record<UiStatus, string> = {
  PRESENT: 'badge-success',          // 🟢
  WARNING_PRESENT: 'badge-warning',  // 🟡
  ABSENT: 'badge-danger',            // 🔴
  OVERTIME_APPROVED: 'badge-info',   // 🔵
  OVERTIME_PENDING: 'badge-warning', // 🟡
};


  /* =======================
     TEMPLATE API
  ======================= */

  trackByFn(index: number, row: AttendanceRow): string {
    return `${row.Date}-${row.CheckIn}-${index}`;
  }

  getBadgeClass(row: AttendanceRow): string {
    return this.CLASS_MAP[this.computeUiStatus(row)];
  }
  ngOnInit(): void {
  this.filteredData = [...this.tableData];
}

ngOnChanges(): void {
  this.filteredData = [...this.tableData];
}
searchData(value: string): void {
  const search = value.trim().toLowerCase();

  if (!search) {
    this.filteredData = [...this.tableData];
    return;
  }

  this.filteredData = this.tableData.filter(row =>
    JSON.stringify(row).toLowerCase().includes(search)
  );
}
sortData(sort: Sort): void {
  if (!sort.active || sort.direction === '') {
    this.filteredData = [...this.filteredData];
    return;
  }

  this.filteredData = [...this.filteredData].sort((a: any, b: any) => {
    const aValue = a[sort.active];
    const bValue = b[sort.active];

    return (aValue < bValue ? -1 : 1) *
      (sort.direction === 'asc' ? 1 : -1);
  });
}


  getStatusLabel(row: AttendanceRow): string {
    const status = this.computeUiStatus(row);

    switch (status) {
      case 'OVERTIME_APPROVED':
        return 'Overtime';
      case 'OVERTIME_PENDING':
        return 'Overtime (en attente)';
      case 'WARNING_PRESENT':
        return 'Présent (Warning)';
      case 'PRESENT':
        return 'Présent';
      default:
        return 'Absent';
    }
  }

  /* =======================
     CORE BUSINESS LOGIC
  ======================= */

private computeUiStatus(row: AttendanceRow): UiStatus {
  const hours = this.toHours(row.ProductionHours);

  // ⚠️ Normalisation claire de la décision manager
  const decision: OvertimeDecision =
    row.OvertimeDecision === 'APPROVED' ||
    row.OvertimeDecision === 'REJECTED'
      ? row.OvertimeDecision
      : 'PENDING';

  // 🔴 ABSENT(===0)
  if (hours === null || hours === 0) {
    return 'ABSENT';
  }

  // 🟡 PRÉSENT WARNING (<8h)
  if (hours < this.deadTimeHours) {
    return 'WARNING_PRESENT';
  }

  // 🟢 PRÉSENT STRICT (8h exact)
  if (hours === this.deadTimeHours) {
    return 'PRESENT';
  }

 // 🔵 / 🟢 OVERTIME (>8h)
if (hours > this.deadTimeHours) {
  // ❌ refusé → redevenir présent (vert)
  if (decision === 'REJECTED') {
    return 'PRESENT';
  }

  // ✅ approuvé OU pas encore de décision → overtime bleu
  return 'OVERTIME_APPROVED';
}

  return 'ABSENT';
}


  /* =======================
     UTILS
  ======================= */

  private toHours(value: string | number): number | null {
    if (typeof value === 'number') return this.round(value);

    const match = value?.toString().replace(',', '.').match(/\d+(\.\d+)?/);
    return match ? this.round(+match[0]) : null;
  }

  private round(n: number): number {
    return Math.round(n * 100) / 100;
  }
}
