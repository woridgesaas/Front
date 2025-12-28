
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() isOpen = false;
  @Input() title = '';
  @Input() showFooter = false;
  @Output() isOpenChange = new EventEmitter<boolean>();

  close(): void {
    this.isOpen = false;
    this.isOpenChange.emit(false);
  }
}