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
      p => (p.Bonus || 0) >= 3000
    ).length;
  }

  // KPI 3 — Département le plus impacté (somme des bonus)
  get mostImpactedDepartment(): string {
    if (!this.promotions.length) return '—';

    const totals: Record<string, number> = {};

    this.promotions.forEach(p => {
      if (!p.Department) return;
      totals[p.Department] =
        (totals[p.Department] || 0) + (p.Bonus || 0);
    });

    return Object.keys(totals).reduce((a, b) =>
      totals[a] > totals[b] ? a : b
    );
  }
}
