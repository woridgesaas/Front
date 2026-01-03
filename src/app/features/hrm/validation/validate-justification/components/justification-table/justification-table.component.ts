import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Justification } from '../../../../../../shared/models/models';

@Component({
  standalone: true,
  selector: 'app-justification-table',
  imports: [CommonModule],
  templateUrl: './justification-table.component.html',
  styleUrl:'./justification-table.component.scss',
})
export class JustificationTableComponent {

  @Input() employees: Justification[] = [];

  @Output() validate = new EventEmitter<Justification>();
  @Output() refuse = new EventEmitter<Justification>();
  @Output() download = new EventEmitter<Justification>();
  @Output() openProfile = new EventEmitter<Justification>();
req: any;
  viewChanges(req: any) {
    console.log('Voir les modifications:', req);

    // plus tard quand ça devient dynamique :
    // this.router.navigate(['/validation/personal-info-details', req.id]);
    // ou ouvrir un modal avec req.changes
  }
}
