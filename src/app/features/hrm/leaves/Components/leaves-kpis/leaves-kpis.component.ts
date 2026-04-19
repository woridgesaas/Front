import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpisComponent } from '../../../../common/kpis/kpis.component';

@Component({
  selector: 'app-leaves-kpis',
  standalone: true,
  imports: [CommonModule, KpisComponent],
  templateUrl: './leaves-kpis.component.html',
})
export class LeavesKpisComponent {
  @Input() annualCount = 0;
  @Input() totalCount = 0;
  @Input() remainingBalance = 0;
}

