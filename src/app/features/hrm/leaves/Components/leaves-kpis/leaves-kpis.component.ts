import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpisComponent } from '../../../../common/kpis/kpis.component';

interface LeavesKpi {
  title: string;
  value: number;
  icon: string;
  color: 'primary' | 'success' | 'warning' | 'danger';
}

@Component({
  selector: 'app-leaves-kpis',
  standalone: true,
  imports: [CommonModule, KpisComponent],
  templateUrl: './leaves-kpis.component.html',
})
export class LeavesKpisComponent {

  // 🔹 Données statiques (API plus tard)
  kpis: LeavesKpi[] = [
    {
      title: 'Congés annuels',
      value: 5,
      icon: 'ti ti-calendar-event',
      color: 'primary',
    },
    {
      title: 'Total des congés',
      value: 24,
      icon: 'ti ti-briefcase',
      color: 'warning',
    },
    {
      title: 'Congés restants',
      value: 10,
      icon: 'ti ti-hourglass',
      color: 'success',
    },
  ];

  trackByTitle(_: number, kpi: LeavesKpi) {
    return kpi.title;
  }
}
