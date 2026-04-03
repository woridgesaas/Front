import {
  Component,
  OnInit,
  OnDestroy,
  Renderer2,
  ViewChildren,
  QueryList,
  ElementRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { routes } from '../../shared/routes/routes';
import { IllustrationComponent } from '../Common/illustration/illustration.component';
import { LogoComponent } from '../Common/logo/logo.component';
import { DescriptionComponent } from '../Common/description/description.component';
import { FooterComponent } from '../Common/footer/footer.component';
import { AuthService } from '../services/auth.service';
import { AuthStateService } from '../services/auth-state.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IllustrationComponent,
    LogoComponent,
    DescriptionComponent,
    FooterComponent,
  ],
})
export class EmailVerificationComponent implements OnInit, OnDestroy {
  @ViewChildren('otpInput') inputs!: QueryList<ElementRef>;

  public routes = routes;
  readonly indices = [0, 1, 2, 3, 4, 5];

  email = '';
  maskedEmail = '';
  attemptsLeft = 3;
  otpValues: { [key: number]: string } = {
    0: '',
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
  };
  isLoading = false;
  isResending = false;
  timeLeft = 600;
  timerDisplay = '10:00';
  isExpired = false;

  private timerInterval: any;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private authService: AuthService,
    private authStateService: AuthStateService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'bg-white');
    this.email = this.authStateService.email;
    this.maskedEmail = this.maskEmail(this.email);
    this.startTimer();
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'bg-white');
    this.clearTimer();
  }

  get otpCode(): string {
    return this.indices.map((i) => this.otpValues[i]).join('');
  }

  isOtpComplete(): boolean {
    return this.indices.every((i) => /^\d$/.test(this.otpValues[i]));
  }

  onKeydown(event: KeyboardEvent, index: number): void {
    const inputsArray = this.inputs.toArray();

    if ((event.metaKey || event.ctrlKey) && event.key === 'v') {
      return;
    }

    if (/^\d$/.test(event.key)) {
      event.preventDefault();
      this.otpValues[index] = event.key;
      inputsArray[index].nativeElement.value = event.key;
      if (index < 5) inputsArray[index + 1].nativeElement.focus();
      return;
    }

    if (event.key === 'Backspace') {
      event.preventDefault();
      if (this.otpValues[index]) {
        this.otpValues[index] = '';
        inputsArray[index].nativeElement.value = '';
      } else if (index > 0) {
        this.otpValues[index - 1] = '';
        inputsArray[index - 1].nativeElement.value = '';
        inputsArray[index - 1].nativeElement.focus();
      }
      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      if (index > 0) inputsArray[index - 1].nativeElement.focus();
      return;
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      if (index < 5) inputsArray[index + 1].nativeElement.focus();
      return;
    }

    if (event.key.length === 1) event.preventDefault();
  }

  onInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const raw = input.value.replace(/\D/g, '');

    if (!raw) {
      input.value = this.otpValues[index] ?? '';
      return;
    }

    const digit = raw.slice(-1);
    this.otpValues[index] = digit;
    input.value = digit;

    if (index < 5) this.inputs.toArray()[index + 1].nativeElement.focus();
  }

  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    event.stopPropagation();

    const digits = (event.clipboardData?.getData('text/plain') ?? '')
      .replace(/\D/g, '')
      .slice(0, 6);

    if (!digits) return;

    const inputsArray = this.inputs.toArray();
    for (let i = 0; i < 6; i++) {
      this.otpValues[i] = digits[i] ?? '';
      inputsArray[i].nativeElement.value = digits[i] ?? '';
    }

    inputsArray[Math.min(digits.length, 5)].nativeElement.focus();
  }

  onSubmit(): void {
    if (this.isLoading) return;

    if (!this.isOtpComplete()) {
      this.toastr.warning('Veuillez entrer les 6 chiffres');
      return;
    }

    if (this.isExpired) {
      this.toastr.warning('Code expiré. Veuillez demander un nouveau code');
      return;
    }

    this.isLoading = true;

    this.authService
      .verifyOtpCode({ email: this.email, otpCode: this.otpCode })
      .subscribe({
        next: (resetToken: string) => {
          this.authStateService.resetToken = resetToken;
          this.authStateService.email = this.email;
          this.toastr.success('Code valide');
          this.router.navigate([routes.resetPassword]);
        },
        error: (error: HttpErrorResponse) => {
          this.isLoading = false;

          if (error.status === 400) {
            this.attemptsLeft--;
            this.toastr.error(
              `Code incorrect, il vous reste ${this.attemptsLeft} tentative${this.attemptsLeft > 1 ? 's' : ''}`,
            );
          } else if (error.status === 429) {
            this.toastr.warning(
              'Trop de tentatives, veuillez réessayer plus tard',
            );
          } else {
            this.toastr.error(
              'Une erreur est survenue, veuillez réessayer plus tard',
            );
          }
        },
      });
  }

  onResendCode(): void {
    if (this.isResending) return;
    this.isResending = true;

    this.authService.requestPasswordReset({ email: this.email }).subscribe({
      next: () => {
        this.toastr.success('Code renvoyé');
        this.resetInputs();
        this.attemptsLeft = 3;
        this.clearTimer();
        this.startTimer();
        this.inputs.toArray()[0]?.nativeElement.focus();
        this.isResending = false;
      },
      error: () => {
        this.toastr.error('Erreur lors du renvoi');
        this.isResending = false;
      },
    });
  }

  private resetInputs(): void {
    this.otpValues = { 0: '', 1: '', 2: '', 3: '', 4: '', 5: '' };
    this.inputs.toArray().forEach((ref) => (ref.nativeElement.value = ''));
  }

  private maskEmail(email: string): string {
    const [local, domain] = email.split('@');
    if (!local || !domain) return email;
    return `${local.slice(0, 2)}***@${domain}`;
  }

  private startTimer(): void {
    this.isExpired = false;
    this.timeLeft = 600;
    this.updateTimerDisplay();
    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      this.updateTimerDisplay();
      if (this.timeLeft <= 0) {
        this.isExpired = true;
        this.clearTimer();
      }
    }, 1000);
  }

  private clearTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  private updateTimerDisplay(): void {
    const m = Math.floor(this.timeLeft / 60);
    const s = this.timeLeft % 60;
    this.timerDisplay = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
}
