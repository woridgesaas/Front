import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Promotion } from '../../../../../shared/models/models';
import { KpisComponent } from '../../../../common/kpis/kpis.component';

@Component({
  selector: 'app-promotions-stats',
  standalone: true,
  imports: [CommonModule, KpisComponent],
  templateUrl: './promotion-stats.component.html',
})
export class PromotionsStatsComponent {
  @Input() promotions: Promotion[] = [];

  // KPI 1 — Total promotions
  get total(): number {
    return this.promotions.length;
  }

  // KPI 2 — Promotions avec augmentation >= 3000 MAD
  get highIncreaseCount(): number {
    return this.promotions.filter(
      p => (p.bonus || 0) >= 3000
    ).length;
  }

  // KPI 3 — Département le plus impacté (somme des bonus)
 get mostImpactedDepartment(): string {
  if (!this.promotions?.length) return '—';

  const totals = this.promotions.reduce((acc, p) => {
    if (!p.department) return acc;

    acc[p.department] = (acc[p.department] || 0) + (p.bonus || 0);
    return acc;
  }, {} as Record<string, number>);

  const entries = Object.entries(totals);

  if (!entries.length) return '—';

  return entries.reduce((max, curr) =>
    curr[1] > max[1] ? curr : max
  )[0];
}
}
