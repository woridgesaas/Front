import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  standalone: true,
  selector: 'app-justification-filters',
  imports: [CommonModule, FormsModule, BsDatepickerModule],
  templateUrl: './justification-filters.component.html'
})
export class JustificationFiltersComponent {

  @Input() departments: { Department: string }[] = [];

  @Input() dateRange?: Date[];
  @Output() dateRangeChange = new EventEmitter<Date[]>();

  @Output() departmentChange = new EventEmitter<string>();
  @Output() searchChange = new EventEmitter<string>();

  searchTerm = '';

  onSearchChange(value: string) {
    this.searchTerm = value;
    this.searchChange.emit(value);
  }
}
