import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-password-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.scss',
})
export class PasswordInputComponent {
  @Input() placeholder = 'Mot de passe';

  visible = false;

  toggle(): void {
    this.visible = !this.visible;
  }
}
