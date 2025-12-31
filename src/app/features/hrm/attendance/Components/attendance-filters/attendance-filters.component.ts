import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-attendance-filters',
  standalone: true,
  imports: [CommonModule, FormsModule, BsDatepickerModule],
  templateUrl: './attendance-filters.component.html',
})
export class AttendanceFiltersComponent {

  /* =======================
     STATE (UI ONLY)
  ======================= */

  dateRange: Date[] = [];
  selectedPageSize = 10;

  departments = [
    'Finance',
    'Application Development',
    'IT Management',
  ];

  statuses = ['Présent', 'Absent', 'Heures Supplementaires'];

  sortOptions = [
    'Récemment ajouté',
    'Croissant',
    'Décroissant',
    '7 derniers jours',
  ];


  /* =======================
     OUTPUTS
  ======================= */

  @Output() dateChange = new EventEmitter<Date[]>();
  @Output() departmentChange = new EventEmitter<string>();
  @Output() statusChange = new EventEmitter<string>();
  @Output() sortChange = new EventEmitter<string>();




  /* =======================
     HANDLERS
  ======================= */

  onDateChange(): void {
    this.dateChange.emit(this.dateRange);
  }

  onDepartmentChange(dep: string): void {
    this.departmentChange.emit(dep);
  }

  onStatusChange(status: string): void {
    this.statusChange.emit(status);
  }

  onSortChange(sort: string): void {
    this.sortChange.emit(sort);
  }

}
