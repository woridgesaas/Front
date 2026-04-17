import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-footer.component.html',
})
export class ModalFooterComponent {
  @Input() disabled = false;
  @Input() loading = false;
  @Input() submitText = 'Enregistrer';
  @Input() submitIcon?: string;
  @Input() cancelText = 'Annuler';

  @Output() cancel = new EventEmitter<void>();
  @Output() submit = new EventEmitter<void>();
}
