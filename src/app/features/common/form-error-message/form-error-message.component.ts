import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-error-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-error-message.component.html',
  styleUrl: './form-error-message.component.scss',
})
export class FormErrorMessageComponent {
  @Input() show = false;
  @Input() message = '';
}
