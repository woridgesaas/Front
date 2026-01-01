import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-header.component.html',
})
export class ModalHeaderComponent {
  @Input() title = '';
  @Input() icon?: string;
  @Output() close = new EventEmitter<void>();
}
