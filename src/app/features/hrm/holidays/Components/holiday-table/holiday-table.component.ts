import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Holiday } from '../../../../../shared/models/models';

@Component({
  selector: 'app-holiday-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './holiday-table.component.html',
    styleUrl: './holiday-table.component.scss',

})
export class HolidayTableComponent {
  @Input() holidays: Holiday[] = [];

  selectedHoliday!: Holiday;

  selectHoliday(holiday: Holiday) {
    this.selectedHoliday = holiday;
  }
}
