import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-delete',
  standalone: true,
  templateUrl: './delete-modal.component.html',
})
export class ConfirmDeleteComponent {
  @Input() item: any; // élément à supprimer
  @Output() confirm = new EventEmitter<any>();

  onConfirm() {
    this.confirm.emit(this.item);
  }
}
