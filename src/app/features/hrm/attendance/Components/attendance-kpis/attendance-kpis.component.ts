import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpisComponent } from '../../../../common/kpis/kpis.component';

interface AttendanceKpi {
  title: string;
  value: number;
  icon: string;
  color: 'success' | 'danger' | 'warning' | 'primary';
}

@Component({
  selector: 'app-attendance-kpis',
  standalone: true,
  imports: [CommonModule, KpisComponent],
  templateUrl: './attendance-kpis.component.html',
})
export class AttendanceKpisComponent {
  // 🔹 Données statiques (OK pour cette étape)
  kpis: AttendanceKpi[] = [
    { title: 'Présent', value: 250, icon: 'ti ti-user', color: 'success' },
    { title: 'Non justifié', value: 15, icon: 'ti ti-user-x', color: 'danger' },
    { title: 'Justifié', value: 3, icon: 'ti ti-user-check', color: 'success' },
    { title: 'Absent', value: 12, icon: 'ti ti-user-minus', color: 'danger' },
  ];
  trackByTitle(_: number, kpi: AttendanceKpi) {
  return kpi.title;
}

}
