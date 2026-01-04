import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-resignation-filters',
  standalone: true,
  imports: [CommonModule, FormsModule, BsDatepickerModule],
  templateUrl: './resignation-filters.component.html',
})
export class ResignationFiltersComponent {

  @Input() searchValue = '';
  @Input() dateRange?: Date[];
    bsRangeValue: Date[] | undefined;


  @Output() searchValueChange = new EventEmitter<string>();
  @Output() dateRangeChange = new EventEmitter<Date[]>();
}
