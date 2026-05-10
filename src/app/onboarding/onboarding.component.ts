import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OnboardingService } from './services/onboarding.service';
import { AppSettingsSetupComponent } from './components/app-settings-setup/app-settings-setup.component';
import { UserSetupComponent } from './components/user-setup/user-setup.component';
import { routes } from '../shared/routes/routes';
import { Role } from '../features/hrm/models/role.enum';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [CommonModule, UserSetupComponent, AppSettingsSetupComponent],
  templateUrl: './onboarding.component.html',
})
export class OnboardingComponent {
  currentStep = 1;
  readonly Role = Role;

  constructor(
    public onboarding: OnboardingService,
    private router: Router,
  ) {}

  nextStep(): void {
    if (this.currentStep === 2) {
      this.redirectToLogin();
      return;
    }
    this.currentStep++;
  }

  onCeoCompleted(): void {
    this.onboarding.markCeoCreated();
    this.nextStep();
  }

  private redirectToLogin(): void {
    localStorage.setItem('onboarding_done', 'true');
    localStorage.removeItem('token');
    this.router.navigate([routes.login]);
  }
}
