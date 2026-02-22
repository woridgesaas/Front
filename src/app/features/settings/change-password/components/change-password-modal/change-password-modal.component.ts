import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup,FormControl } from '@angular/forms';
import { PasswordInputComponent } from '../password-input/password-input.component';
import { ChangePasswordService } from '../../../../../shared/services/changePassword';

@Component({
  selector: 'app-change-password-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PasswordInputComponent],
  templateUrl: './change-password-modal.component.html',
  styleUrl: './change-password-modal.component.scss',
})
export class ChangePasswordModalComponent {

  @Input() open = false;
  @Output() close = new EventEmitter<void>();
get currentPasswordControl(): FormControl {
  return this.form.get('currentPassword') as FormControl;
}

get newPasswordControl(): FormControl {
  return this.form.get('newPassword') as FormControl;
}

get confirmPasswordControl(): FormControl {
  return this.form.get('confirmPassword') as FormControl;
}
  form!: FormGroup; 
  constructor(
    private fb: FormBuilder,
    private changePasswordService: ChangePasswordService
  ) {
    this.form = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }
submit(): void {

  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  if (this.form.value.newPassword !== this.form.value.confirmPassword) {
    alert("Les mots de passe ne correspondent pas");
    return;
  }

  this.changePasswordService.changePassword(this.form.value)
    .subscribe({
      next: (res: any) => {

        console.log("API RESPONSE:", res);

        const date = res.timestamp;

        if (date) {
          localStorage.setItem("lastPasswordUpdate", date);
        }

        alert("Mot de passe modifié avec succès");
        this.close.emit();
      },

      error: (err) => {
        console.error("ERROR:", err);
        alert("Erreur lors du changement du mot de passe");
      }
    });
}
}