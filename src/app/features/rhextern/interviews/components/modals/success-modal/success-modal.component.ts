
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-success-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.scss']
})
export class SuccessModalComponent {
  @Input() show = false;
  @Input() title = 'Succès !';
  @Input() message = '';

  @Output() onClose = new EventEmitter<void>();

  close(): void {
    this.show = false;
    this.onClose.emit();
  }
}