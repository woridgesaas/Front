import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { OnboardingProgress } from '../models/onboarding-progress.model';

@Injectable({ providedIn: 'root' })
export class OnboardingService {
  private state: OnboardingProgress = {
    ceoCreated: false,
    appConfigured: false,
  };

  employeeCreated$ = new Subject<void>();

  get progress(): OnboardingProgress {
    return this.state;
  }

  markCeoCreated() {
    this.state.ceoCreated = true;
  }

  markAppConfigured() {
    this.state.appConfigured = true;
  }
}
