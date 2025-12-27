import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-delete',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-modal.component.html',
})
export class ConfirmDeleteComponent {
  // DYNAMIQUES
  @Input() title = 'Confirmer la suppression';
  @Input() message = 'Voulez-vous vraiment supprimer cet élément ?';
  @Input() modalId = 'confirmDeleteModal';
  @Input() item: any;

  @Output() confirm = new EventEmitter<any>();

  onConfirm() {
    this.confirm.emit(this.item);
  }
}
