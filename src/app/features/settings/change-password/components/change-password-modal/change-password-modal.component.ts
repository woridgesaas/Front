import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordInputComponent } from '../password-input/password-input.component';

@Component({
  selector: 'app-change-password-modal',
  standalone: true,
  imports: [CommonModule, PasswordInputComponent],
  templateUrl: './change-password-modal.component.html',
  styleUrl: './change-password-modal.component.scss',
})
export class ChangePasswordModalComponent {
  @Input() open = false;
  @Output() close = new EventEmitter<void>();

  //* Used by *ngFor
  passwordFields = [
    { placeholder: 'Mot de passe actuel' },
    { placeholder: 'Nouveau mot de passe' },
    { placeholder: 'Confirmer le mot de passe' },
  ];

  trackByPlaceholder(_: number, field: { placeholder: string }): string {
    return field.placeholder;
  }

  submit(): void {
    //todo: call API later
    this.close.emit();
  }
}
