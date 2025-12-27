import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cancel-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cancel-modal.component.html',
  styleUrl: './cancel-modal.component.scss',
})
export class CancelModalComponent {
  //  DYNAMIQUES
  @Input() title = 'Confirmation';
  @Input() message = 'Êtes-vous sûr ?';
  @Input() modalId = 'confirmModal';

  //  STATIQUES (on ne touche plus)
  confirmText = 'Confirmer';
  cancelText = 'Annuler';
  confirmBtnClass = 'btn-danger';

  @Input() item: any;
  @Output() confirm = new EventEmitter<any>();

  onConfirm(): void {
    this.confirm.emit(this.item);
  }
}
