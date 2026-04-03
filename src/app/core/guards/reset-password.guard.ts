import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStateService } from '../../auth/services/auth-state.service';
import { routes } from '../../shared/routes/routes';

export const resetPasswordGuard: CanActivateFn = () => {
  const authStateService = inject(AuthStateService);
  const router = inject(Router);

  if (!authStateService.resetToken) {
    return router.createUrlTree([routes.forgotPassword]);
  }

  return true;
};
