import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-footer.component.html',
})
export class ModalFooterComponent {
  @Output() cancel = new EventEmitter<void>();
  @Input() disabled = false;
  @Input() submitText = 'Enregistrer';
  @Input() submitIcon?: string;
}
