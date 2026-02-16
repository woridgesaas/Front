import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-attendance-history-header',
  standalone: true,
  imports: [CommonModule, FormsModule, BsDatepickerModule],
  templateUrl: './attendance-history-header.component.html',
})
export class AttendanceHistoryHeaderComponent {
  @Input() bsRangeValue!: Date[];

  @Output() bsRangeValueChange = new EventEmitter<Date[]>();
  @Output() statusChange = new EventEmitter<string>();
  @Output() sortChange = new EventEmitter<string>();
}
