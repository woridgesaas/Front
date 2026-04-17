import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from '../../shared/routes/routes';
import { AuthService } from '../services/auth.service';
import { AuthStateService } from '../services/auth-state.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IllustrationComponent } from '../common/illustration/illustration.component';
import { LogoComponent } from '../common/logo/logo.component';
import { DescriptionComponent } from '../common/description/description.component';
import { FooterComponent } from '../common/footer/footer.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IllustrationComponent,
    LogoComponent,
    DescriptionComponent,
    FooterComponent,
  ],
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  public routes = routes;

  password: boolean[] = [false, false];
  isLoading: boolean = false;

  newPassword: string = '';
  confirmPassword: string = '';

  strengthLevel: string = '';
  passwordInfoMessage: string = '';
  passwordInfoColor: string = '';

  private passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;

  constructor(
    private router: Router,
    private authService: AuthService,
    private authStateService: AuthStateService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    document.body.classList.add('bg-white');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('bg-white');
  }

  togglePassword(index: number): void {
    this.password[index] = !this.password[index];
  }

  onSubmit(): void {
    if (!this.validateForm()) {
      return;
    }

    const resetToken = this.authStateService.resetToken;

    if (!resetToken) {
      this.toastr.error('Session expirée, veuillez recommencer');
      this.router.navigate([routes.forgotPassword]);
      return;
    }

    this.isLoading = true;

    this.authService
      .resetPassword({
        resetToken,
        newPassword: this.newPassword,
        confirmPassword: this.confirmPassword,
      })
      .subscribe({
        next: () => {
          this.toastr.success('Mot de passe modifié avec succès');
          this.authStateService.clear();
          this.router.navigate([routes.success]);
        },
        error: (error) => {
          this.handleError(error);
          this.isLoading = false;
        },
      });
  }

  //* Password Strength checker (UX)
  checkPasswordStrength(event: Event): void {
    const password = (event.target as HTMLInputElement).value;
    this.newPassword = password;

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

  //* Helpers methods
  private validateForm(): boolean {
    const password = this.newPassword.trim();
    const confirm = this.confirmPassword.trim();

    if (!password) {
      this.toastr.warning('Nouveau mot de passe est obligatoire');
      return false;
    }
    if (!confirm) {
      this.toastr.warning('Confirmation du mot de passe est obligatoire');
      return false;
    }

    if (password !== confirm) {
      this.toastr.warning('Les mots de passe ne correspondent pas');
      return false;
    }

    if (!this.isPasswordValid(password)) {
      this.toastr.warning(
        'Mot de passe invalide (minimum 8 caractères, majuscule, minuscule, chiffre et symbole)',
      );
      return false;
    }

    return true;
  }

  private isPasswordValid(password: string): boolean {
    return password.length >= 8 && this.passwordPattern.test(password);
  }

  private handleError(error: any): void {
    if (error.status === 401) {
      this.toastr.error('Session expirée, veuillez recommencer');
    } else if (error.status === 400) {
      this.toastr.warning('Données invalides, veuillez vérifier votre saisie');
    } else {
      this.toastr.error('Une erreur est survenue, veuillez réessayer');
    }
  }

  private setStrength(level: string, message: string, color: string): void {
    this.strengthLevel = level;
    this.passwordInfoMessage = message;
    this.passwordInfoColor = color;
  }

  private resetStrength(): void {
    this.strengthLevel = '';
    this.passwordInfoMessage = '';
  }
}
