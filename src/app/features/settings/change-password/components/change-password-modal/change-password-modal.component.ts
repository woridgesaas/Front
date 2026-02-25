import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup,FormControl } from '@angular/forms';
import { PasswordInputComponent } from '../password-input/password-input.component';
import { ChangePasswordService } from '../../../../../shared/services/changePassword';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-change-password-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PasswordInputComponent],
  templateUrl: './change-password-modal.component.html',
  styleUrl: './change-password-modal.component.scss',
})
export class ChangePasswordModalComponent {
@Output() passwordChanged = new EventEmitter<Date>();
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
  private changePasswordService: ChangePasswordService,
  private toastr: ToastrService
) {
  this.form = this.fb.group({
    currentPassword: ['', Validators.required],
    newPassword: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)
      ]
    ],
    confirmPassword: ['', Validators.required],
  });
}
submit(): void {

  if (this.form.invalid) {

    // Vérifier pattern spécifiquement
    if (this.newPasswordControl.errors?.['pattern']) {
      this.toastr.error(
        "Le mot de passe doit contenir des majuscules, des minuscules, des chiffres et des caractères spéciaux."
      );
      return;
    }

    if (this.newPasswordControl.errors?.['minlength']) {
      this.toastr.error("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    if (this.newPasswordControl.errors?.['required']) {
      this.toastr.error("Tous les champs sont obligatoires.");
      return;
    }

    this.form.markAllAsTouched();
    return;
  }

  // Vérification confirmation
  if (this.form.value.newPassword !== this.form.value.confirmPassword) {
    this.toastr.error("Les mots de passe ne correspondent pas.");
    return;
  }

  this.changePasswordService.changePassword(this.form.value)
    .subscribe({
      next: (res: any) => {

        const date = res.data?.lastUpdatedPassword;

        if (date) {
          localStorage.setItem("lastPasswordUpdate", date);
          this.passwordChanged.emit(new Date(date));
        }

        this.form.reset();
        this.close.emit();
      },
      error: (err) => {

        const message =
          err?.error?.message ||
          err?.error?.errorMessage ||
          "Une erreur est survenue";

        this.toastr.error(message);
      }
    });
}
closeModal(): void {
  this.form.reset();   
  this.close.emit();
}
}