import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input ,Output} from '@angular/core';

@Component({
  selector: 'app-empty-state',
  imports: [CommonModule],
  templateUrl: './empty-state.component.html',
})
export class EmptyStateComponent {
  @Input() title: string = 'Aucun élément trouvé';
  @Input() messageWithFilters: string = 'Aucun résultat ne correspond à vos filtres. Essayez d\'autres critères.';
  @Input() messageWithoutFilters: string = 'Aucun élément n\'est disponible pour le moment.';
  @Input() showResetButton: boolean = true;
  @Input() resetButtonLabel: string = 'Effacer les filtres';

  @Output() resetFilters = new EventEmitter<void>();
}
