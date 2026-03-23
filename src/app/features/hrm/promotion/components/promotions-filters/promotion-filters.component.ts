import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { debounceTime, Subject } from 'rxjs';

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
searchChanged = new Subject<string>();

ngOnInit() {
  this.searchChanged.pipe(
    debounceTime(300)
  ).subscribe(value => {
    this.searchValueChange.emit(value);
  });
}
  // presets simples (optionnel)
  setLastDays(days: number) {
  const end = new Date();
  const start = new Date();

  if (days === 0) {
    start.setHours(0,0,0,0);
    end.setHours(23,59,59,999);
  } else {
    start.setDate(end.getDate() - days);
  }

  this.dateRange = [start, end];
  this.dateRangeChange.emit(this.dateRange);
}
  resetDates() {
    this.dateRange = [];
    this.dateRangeChange.emit([]);
  }
}
