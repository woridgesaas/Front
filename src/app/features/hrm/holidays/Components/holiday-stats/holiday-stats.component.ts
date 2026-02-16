import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Holiday } from '../../../../../shared/models/models';
import { KpisComponent } from '../../../../common/kpis/kpis.component';

@Component({
  selector: 'app-holiday-stats',
  standalone: true,
  imports: [CommonModule, KpisComponent],
  templateUrl: './holiday-stats.component.html',
})
export class HolidayStatsComponent implements OnInit, OnDestroy {

  @Input() holidays: Holiday[] = [];

  today = new Date();
  private clockInterval: any;

  get nextHoliday(): Holiday | null {
    const now = new Date();

    return this.holidays
      .filter(h => h.date > now)
      .sort((a, b) => a.date.getTime() - b.date.getTime())[0] || null;
  }

  get todayFormatted(): string {
    return this.today.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
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
