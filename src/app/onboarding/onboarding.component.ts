import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OnboardingService } from './services/onboarding.service';
import { AppSettingsSetupComponent } from './app-settings-setup/app-settings-setup.component';
import { UserRole } from './enum/user-role.enum';
import { UserSetupComponent } from './user-setup/user-setup.component';
import { routes } from '../shared/routes/routes';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [CommonModule, UserSetupComponent, AppSettingsSetupComponent],
  templateUrl: './onboarding.component.html',
})
export class OnboardingComponent {
  currentStep = 1;
  readonly UserRole = UserRole;

  constructor(public onboarding: OnboardingService, private router: Router) {}

  onCeoCompleted(): void {
    this.onboarding.markCeoCreated();
    this.nextStep();
  }

  onHrCompleted(): void {
    this.onboarding.markHrCreated();
    this.nextStep();
  }

  nextStep(): void {
    //* Last step (redirect to dashboard)
    if (this.currentStep === 3) {
      this.redirectToDashboard();
      return;
    }

    this.currentStep++;
  }
  private redirectToDashboard(): void {
    this.router.navigate([routes.index]);
  }
}
