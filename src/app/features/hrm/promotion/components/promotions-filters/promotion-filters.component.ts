import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-promotions-filters',
  standalone: true,
  imports: [CommonModule, FormsModule, BsDatepickerModule],
  templateUrl: './promotion-filters.component.html',
})
export class PromotionsFiltersComponent {
  @Input() searchValue: string = '';
  @Output() searchValueChange = new EventEmitter<string>();

  @Input() dateRange: Date[] = [];
  @Output() dateRangeChange = new EventEmitter<Date[]>();

  // presets simples (optionnel)
  setLastDays(days: number) {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days);
    this.dateRange = [start, end];
    this.dateRangeChange.emit(this.dateRange);
  }

  resetDates() {
    this.dateRange = [];
    this.dateRangeChange.emit([]);
  }
}
