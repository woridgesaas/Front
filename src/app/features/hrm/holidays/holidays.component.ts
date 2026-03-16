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
  selectedType: boolean | 'all'= 'all';

  constructor(private holidayService: HolidayService) {
    this.loadHolidays();
  }
  openHolidayModal() {
    this.openHoliday = true;
  }

loadHolidays() {
    this.holidayService.getHolidays().subscribe({
      next: (data) => {
        this.holidays = data;
        console.log(data);
      },
      error: (err) => console.error('Error while charging data', err)
    });
  }
onHolidayAdded(newHoliday: any) {
  this.holidays = [...this.holidays, newHoliday];
}

get filteredHolidays(): Holiday[] {
    return this.holidays.filter(h => {
      // Filtre par type (isFixed)
      const byType = this.selectedType === 'all' || h.isFixed === this.selectedType;
      
      // Filtre par mois
      const byMonth = !this.selectedMonth || 
                     (h.date && h.date.getMonth() + 1 === this.selectedMonth);
      
      let byRange = true;
      if (this.bsRangeValue && this.bsRangeValue.length === 2) {
        const holidayDate = new Date(h.date).setHours(0,0,0,0);
        const startDate = new Date(this.bsRangeValue[0]).setHours(0,0,0,0);
        const endDate = new Date(this.bsRangeValue[1]).setHours(0,0,0,0);
      
        byRange = holidayDate >= startDate && holidayDate <= endDate;
      }
      return byType && byMonth && byRange;
    });
  }
  getActiveFiltersCount(): number {
    let count = 0;
    if (this.selectedType !== 'all') count++;
    if (this.selectedMonth) count++;
    if (this.bsRangeValue?.length === 2) count++;
    return count;
  }

  hasActiveFilters(): boolean {
    return this.getActiveFiltersCount() > 0;
  }

  resetFilters(): void {
    this.selectedType = 'all';
    this.selectedMonth = '';
    this.bsRangeValue = [];
  }
  
}


