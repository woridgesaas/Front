import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { resignation } from '../../../../../shared/models/models';
import { KpisComponent } from '../../../../common/kpis/kpis.component';

@Component({
  selector: 'app-resignation-stats',
  standalone: true,
  imports: [CommonModule, KpisComponent],
  templateUrl: './resignation-stats.component.html',
})
export class ResignationStatsComponent {

  @Input() resignations: resignation[] = [];

  get total(): number {
    return this.resignations.length;
  }

  get byDepartment(): number {
    return new Set(this.resignations.map(r => r.Department)).size;
  }

  get withReason(): number {
    return this.resignations.filter(r => r.Reason?.trim()).length;
  }
  get departmentMostResignations(): string {
  if (!this.resignations.length) return '-';

  const count: Record<string, number> = {};

  this.resignations.forEach(r => {
    count[r.Department] = (count[r.Department] || 0) + 1;
  });

  return Object.keys(count).reduce((a, b) =>
    count[a] > count[b] ? a : b
  );
}
get averageResignationsPerMonth(): number {
  if (!this.resignations.length) return 0;

  const dates = this.resignations
    .filter(r => r.ResignationDate !== null)   
    .map(r => r.ResignationDate as Date)       
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
