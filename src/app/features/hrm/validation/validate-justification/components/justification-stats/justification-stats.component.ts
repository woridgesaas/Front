import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Justification } from '../../../../../../shared/models/models';
import { KpisComponent } from '../../../../../common/kpis/kpis.component';

@Component({
  standalone: true,
  selector: 'app-justification-stats',
  imports: [CommonModule, KpisComponent],
  templateUrl: './justification-stats.component.html',
})
export class JustificationStatsComponent {

  @Input() justifications: Justification[] = [];

  get total(): number {
    return this.justifications.length;
  }

  get pending(): number {
    return this.justifications.filter(j => j.Status === 'En attente').length;
  }

  get approved(): number {
    return this.justifications.filter(j => j.Status === 'Accepter').length;
  }

  get refused(): number {
    return this.justifications.filter(j => j.Status === 'Refuser').length;
  }
}
