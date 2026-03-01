import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export type DepartmentStatusFilter = 'all' | 'ACTIVE' | 'INACTIVE';

@Component({
  selector: 'app-departments-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './departments-filters.component.html',
})
export class DepartmentsFiltersComponent {

  @Input() status: DepartmentStatusFilter = 'all';
  @Output() statusChange = new EventEmitter<DepartmentStatusFilter>();

  @Input() search = '';
  @Output() searchChange = new EventEmitter<string>();
}