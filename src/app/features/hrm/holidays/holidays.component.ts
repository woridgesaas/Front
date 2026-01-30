import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BreadcrumbsComponent } from '../../common/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from '../../common/footer/footer.component';
import { HolidayStatsComponent } from './Components/holiday-stats/holiday-stats.component';
import { HolidayFiltersComponent } from './Components/holiday-filters/holiday-filters.component';
import { HolidayTableComponent } from './Components/holiday-table/holiday-table.component';
import { Holiday } from '../../../shared/models/models';
import {HolidayService } from '../../../shared/services/holiday.service'
import { HolidayAddModalComponent } from './Components/holidays-model/holidays-modal.component';

@Component({
  selector: 'app-holidays',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BreadcrumbsComponent,
   HolidayAddModalComponent,
    HolidayStatsComponent,
    HolidayFiltersComponent,
    HolidayTableComponent,
  ],
  templateUrl: './holidays.component.html',
})
export class HolidaysComponent {
openHoliday = false;

  holidays: Holiday[] = [];
  selectedMonth: number | '' = '';
  bsRangeValue: Date[] = [];
  selectedType: 'all' | 'national' | 'religious' = 'all';

  constructor(private holidayService: HolidayService) {
    this.loadHolidays();
  }
openHolidayModal() {
  this.openHoliday = true;
}

  loadHolidays() {
    this.holidayService.getHolidays().subscribe(data => {
      this.holidays = data;
    });
  }
addHoliday(h: Holiday) {
  this.holidays = [...this.holidays, h];
}

  get filteredHolidays(): Holiday[] {
    return this.holidays.filter(h => {
      const byType =
        this.selectedType === 'all' || h.type === this.selectedType;

      const byMonth =
        !this.selectedMonth || h.date.getMonth() + 1 === this.selectedMonth;

      return byType && byMonth;
    });
  }
}


