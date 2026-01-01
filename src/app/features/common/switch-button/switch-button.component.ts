import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-switch-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './switch-button.component.html',
  styleUrls: ['./switch-button.component.scss'],
})
export class SwitchButtonComponent {
  @Input() label!: string;
  @Input() icon?: string;
  @Input() active = false;
  @Input() disabled = false;

  @Output() select = new EventEmitter<void>();

  onClick(): void {
    if (!this.disabled) {
      this.select.emit();
    }
  }
}
