import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const onboardingGuard: CanActivateFn = () => {
  const router = inject(Router);

  const onboardingDone = localStorage.getItem('onboarding_done') === 'true';

  if (onboardingDone) {
    return router.createUrlTree(['/error404']);
  }

  return true;
};
