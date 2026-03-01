import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { resignation } from '../../../../../shared/models/models';
import { KpisComponent } from '../../../../common/kpis/kpis.component';
import { Resignation } from '../../models/models';

@Component({
  selector: 'app-resignation-stats',
  standalone: true,
  imports: [CommonModule, KpisComponent],
  templateUrl: './resignation-stats.component.html',
})
export class ResignationStatsComponent {

  @Input() resignations: Resignation[] = [];

  get total(): number {
    return this.resignations.length;
  }

  get byDepartment(): number {
    return new Set(this.resignations.map(r => r.departmentName)).size;
  }

  get withReason(): number {
    return this.resignations.filter(r => r.reason?.trim()).length;
  }

  get departmentMostResignations(): string {
    if (!this.resignations.length) return '-';
    const count: Record<string, number> = {};
    this.resignations.forEach(r => {
      const dept = r.departmentName || 'Inconnu';
      count[dept] = (count[dept] || 0) + 1;
    });
    return Object.keys(count).reduce((a, b) =>
      count[a] > count[b] ? a : b
    );
  }

  get averageResignationsPerMonth(): number {
    if (!this.resignations.length) return 0;
    const dates = this.resignations
      .filter(r => r.resignationDate !== null)
      .map(r => new Date(r.resignationDate as Date))
      .filter(d => !isNaN(d.getTime()));
    if (dates.length < 2) return dates.length;
    const minDate = new Date(Math.min(...dates.map(d => d.getTime())));
    const maxDate = new Date(Math.max(...dates.map(d => d.getTime())));
    const months =
      (maxDate.getFullYear() - minDate.getFullYear()) * 12 +
      (maxDate.getMonth() - minDate.getMonth()) + 1;
    return +(dates.length / months).toFixed(1);
  }
}