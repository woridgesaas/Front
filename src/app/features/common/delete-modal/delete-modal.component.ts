import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-delete',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-modal.component.html',
})
export class ConfirmDeleteComponent {
  @Input() isOpen = false;       // contrôle Angular
  @Input() title = 'Confirmer la suppression';
  @Input() message = 'Voulez-vous vraiment supprimer cet élément ?';
  @Input() item: any;
  @Output() confirm = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit(this.item);
  }

  onCancel() {
    this.cancel.emit();
  }
}
