import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { routes } from '../../shared/routes/routes';
import { IllustrationComponent } from '../common/illustration/illustration.component';
import { LogoComponent } from '../common/logo/logo.component';
import { DescriptionComponent } from '../common/description/description.component';
import { FooterComponent } from '../common/footer/footer.component';
import { AuthService } from '../services/auth.service';
import { AuthStateService } from '../services/auth-state.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    IllustrationComponent,
    LogoComponent,
    DescriptionComponent,
    FooterComponent,
  ],
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  private emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  public routes = routes;
  email = '';
  isLoading = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private authStateService: AuthStateService,
    private toastr: ToastrService,
  ) {}

  private isValidEmail(email: string): boolean {
    return this.emailRegex.test(email.trim());
  }

  onSubmit() {
    const trimmedEmail = this.email.trim();

    if (!trimmedEmail) {
      this.toastr.warning('Veuillez entrer votre adresse email');
      return;
    }

    if (!this.isValidEmail(trimmedEmail)) {
      this.toastr.warning('Veuillez entrer une adresse email valide');
      return;
    }

    this.isLoading = true;

    this.authService.requestPasswordReset({ email: trimmedEmail }).subscribe({
      next: () => {
        this.toastr.success(
          'Si un compte existe, un code a été envoyé à votre adresse email',
        );

        this.authStateService.email = trimmedEmail;

        this.router.navigate([routes.emailVerification]);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 429) {
          this.toastr.warning(
            'Trop de tentatives, veuillez réessayer plus tard',
          );
        } else {
          this.toastr.error(
            'Une erreur est survenue, veuillez réessayer plus tard',
          );
        }
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    document.body.classList.add('bg-white');
    this.authStateService.clear();
  }

  ngOnDestroy(): void {
    document.body.classList.remove('bg-white');
  }
}
