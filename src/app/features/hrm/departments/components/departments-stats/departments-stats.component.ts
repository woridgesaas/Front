import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Department } from '../../../../../shared/models/models';
import { KpisComponent } from "../../../../common/kpis/kpis.component";

@Component({
  selector: 'app-departments-stats',
  standalone: true,
  imports: [CommonModule, KpisComponent],
  templateUrl: './departments-stats.component.html',
})
export class DepartmentsStatsComponent {
  @Input() departments: Department[] = [];

  get total() {
  return this.departments.length;
}

get active() {
  return this.departments.filter(d => d.status === 'ACTIVE').length;
}

get inactive() {
  return this.departments.filter(d => d.status === 'INACTIVE').length;
}
}
