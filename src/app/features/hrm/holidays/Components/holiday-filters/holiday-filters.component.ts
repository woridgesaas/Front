import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-holiday-filters',
  standalone: true,
  imports: [CommonModule, FormsModule,BsDatepickerModule],
  templateUrl: './holiday-filters.component.html',
})
export class HolidayFiltersComponent implements OnInit {
  bsRangeValue?: Date[];
  
  @Input() type: boolean | 'all' = 'all';
  @Output() typeChange = new EventEmitter<boolean | 'all'>(); 

  @Input() month: number | '' = '';
  @Output() monthChange = new EventEmitter<number | ''>();

  @Input() range: Date[] = [];
  @Output() rangeChange = new EventEmitter<Date[] | any>();

  months: { value: number; label: string }[] = [];
  ngOnInit() {
    const formatter = new Intl.DateTimeFormat('fr-FR', { month: 'long' });

    this.months = Array.from({ length: 12 }, (_, i) => ({
      value: i + 1,
      label:
        formatter.format(new Date(2025, i, 1)).charAt(0).toUpperCase() +
        formatter.format(new Date(2025, i, 1)).slice(1),
    }));
  }
  onMonthChange(value: string): void {
    //Cast to number
    const monthValue = value === '' ? '' : Number(value);
    
    this.monthChange.emit(monthValue);
  }
  onTypeChange(value: string) {
    if (value === 'all') {
      this.typeChange.emit('all');
    } else {
      this.typeChange.emit(value === 'true');
    }
  }
  onDateRangeChange(value: any): void {
  this.rangeChange.emit(value);
}
}
  
