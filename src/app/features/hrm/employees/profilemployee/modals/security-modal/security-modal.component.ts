import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ChangePasswordService } from '../../../../../../shared/services/change-password.service';
import { EmployeeProfileResponse } from '../../../../models/user/employee-profile.model';

@Component({
  selector: 'app-security-modal',
  standalone: true,
  templateUrl: './security-modal.component.html',
  styleUrl: './security-modal.component.scss',
  imports: [CommonModule, FormsModule],
})
export class SecurityModalComponent {
  @Input() employee: EmployeeProfileResponse | null = null;

  showCurrent = false;
  showNew = false;
  showConfirm = false;

  strengthLevel: 'poor' | 'weak' | 'heavy' | '' = '';
  passwordInfoMessage = '';
  passwordInfoColor = '';

  passwordError = '';
  passwordChangeMessage = '';
  passwordChangeType: 'success' | 'error' | '' = '';

  otpMessage = '';
  otpMessageType: 'success' | 'error' | '' = '';

  isSendingOtp = false;
  isVerifyingOtp = false;
  isChangingPassword = false;

  otpVerified = false;
  otpSent = false;

  passwordData = {
    currentPassword: '',
    otpCode: '',
    newPassword: '',
    confirmPassword: '',
  };

  constructor(
    private changePasswordService: ChangePasswordService,
    private toastr: ToastrService,
  ) {}

  //* Password Strength
  checkPasswordStrength(password: string): void {
    if (!password) {
      this.resetStrength();
      return;
    }

    if (/\s/.test(password)) {
      this.setStrength('', 'Espaces non autorisés', 'red');
      return;
    }

    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSymbol = /[\W_]/.test(password);

    if (password.length < 8) {
      this.setStrength('poor', 'Minimum 8 caractères', 'red');
    } else if (!(hasLower && hasUpper && hasDigit && hasSymbol)) {
      this.setStrength(
        'weak',
        'Ajoutez majuscule, chiffre ou symbole',
        '#FFB54A',
      );
    } else {
      this.setStrength('heavy', 'Mot de passe sécurisé', '#159F46');
    }
  }

  //* Helpers
  private setStrength(level: any, message: string, color: string): void {
    this.strengthLevel = level;
    this.passwordInfoMessage = message;
    this.passwordInfoColor = color;
  }

  private resetStrength(): void {
    this.strengthLevel = '';
    this.passwordInfoMessage = '';
    this.passwordInfoColor = '';
  }

  //* Send verification code
  sendOtp(): void {
    this.passwordError = '';
    this.otpMessage = '';

    if (!this.passwordData.currentPassword?.trim()) {
      this.passwordError = 'Veuillez entrer votre mot de passe actuel';
      return;
    }

    this.isSendingOtp = true;

    this.changePasswordService
      .requestOtp({ currentPassword: this.passwordData.currentPassword })
      .subscribe({
        next: () => {
          this.otpSent = true;
          this.otpVerified = false;

          // reset password fields
          this.passwordData.newPassword = '';
          this.passwordData.confirmPassword = '';
          this.resetStrength();

          this.otpMessage = 'Code envoyé avec succès';
          this.otpMessageType = 'success';
        },
        error: (error) => {
          this.otpMessageType = 'error';

          if (error.status === 400) {
            this.passwordError = 'Mot de passe incorrect';
          } else if (error.status === 401) {
            this.otpMessage = 'Session expirée';
          } else {
            this.otpMessage = "Erreur lors de l'envoi du code";
          }

          this.isSendingOtp = false;
        },
        complete: () => {
          this.isSendingOtp = false;
        },
      });
  }

  //* Verify code
  verifyOtp(): void {
    if (!this.passwordData.otpCode?.trim()) {
      this.otpMessage = 'Veuillez entrer le code';
      this.otpMessageType = 'error';
      return;
    }

    this.isVerifyingOtp = true;

    this.changePasswordService
      .verifyOtp({ otpCode: this.passwordData.otpCode })
      .subscribe({
        next: () => {
          this.otpVerified = true;
          this.otpMessage = 'Code validé avec succès';
          this.otpMessageType = 'success';
        },
        error: (error) => {
          this.otpVerified = false;
          this.otpMessageType = 'error';

          this.otpMessage =
            error.status === 400
              ? 'Code incorrect ou expiré'
              : 'Erreur lors de la validation du code';

          this.isVerifyingOtp = false;
        },
        complete: () => {
          this.isVerifyingOtp = false;
        },
      });
  }

  //* Change password
  changePassword(): void {
    this.passwordChangeMessage = '';

    if (!this.otpVerified) {
      this.passwordChangeMessage = 'Veuillez valider le code';
      this.passwordChangeType = 'error';
      return;
    }

    if (!this.passwordData.newPassword || !this.passwordData.confirmPassword) {
      this.passwordChangeMessage = 'Tous les champs sont obligatoires';
      this.passwordChangeType = 'error';
      return;
    }

    if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
      this.passwordChangeMessage = 'Les mots de passe ne correspondent pas';
      this.passwordChangeType = 'error';
      return;
    }

    if (this.strengthLevel !== 'heavy') {
      this.passwordChangeMessage = 'Mot de passe trop faible';
      this.passwordChangeType = 'error';
      return;
    }

    this.isChangingPassword = true;

    this.changePasswordService
      .confirmPassword({
        newPassword: this.passwordData.newPassword,
        confirmPassword: this.passwordData.confirmPassword,
      })
      .subscribe({
        next: () => {
          this.toastr.success('Mot de passe modifié avec succès');
          localStorage.removeItem('token');

          setTimeout(() => {
            window.location.href = '/login';
          }, 1500);
        },
        error: () => {
          this.toastr.error('Erreur lors du changement de mot de passe');
          this.isChangingPassword = false;
        },
        complete: () => {
          this.isChangingPassword = false;
        },
      });
  }

  //* Reset form
  reset(): void {
    this.passwordData = {
      currentPassword: '',
      otpCode: '',
      newPassword: '',
      confirmPassword: '',
    };

    this.otpSent = false;
    this.otpVerified = false;

    this.resetStrength();

    this.passwordError = '';
    this.passwordChangeMessage = '';
    this.passwordChangeType = '';
    this.otpMessage = '';
    this.otpMessageType = '';
  }
}
