import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Holiday } from '../../../../../shared/models/models';

@Component({
  selector: 'app-holiday-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './holiday-stats.component.html',
})
export class HolidayStatsComponent {
  @Input() holidays: Holiday[] = [];

today = new Date();
  private clockInterval: any;

get nextHoliday() {
  const today = new Date();
  
  return this.holidays
    .filter(h => h.date > today)
    .sort((a, b) => a.date.getTime() - b.date.getTime())[0] || null;
}
  ngOnInit(): void {
  
    this.clockInterval = setInterval(() => {
      this.today = new Date();
    }, 1000);
  
  }
ngOnDestroy(): void {
    clearInterval(this.clockInterval);

  }
}
