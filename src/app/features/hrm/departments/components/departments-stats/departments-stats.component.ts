import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { department } from '../../../../../shared/models/models';

@Component({
  selector: 'app-departments-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './departments-stats.component.html',
})
export class DepartmentsStatsComponent {
  @Input() departments: department[] = [];

  get total() {
    return this.departments.length;
  }

  get active() {
    return this.departments.filter(d => d.Status === 'Actif').length;
  }

  get inactive() {
    return this.departments.filter(d => d.Status === 'Inactif').length;
  }
}
