import { Injectable } from '@angular/core';
import { OnboardingProgress } from '../models/onboarding-progress.model';

@Injectable({ providedIn: 'root' })
export class OnboardingService {
  private state: OnboardingProgress = {
    ceoCreated: false,
    hrCreated: false,
    appConfigured: false,
  };

  get progress(): OnboardingProgress {
    return this.state;
  }

  markCeoCreated() {
    this.state.ceoCreated = true;
  }

  markHrCreated() {
    this.state.hrCreated = true;
  }

  markAppConfigured() {
    this.state.appConfigured = true;
  }
}
