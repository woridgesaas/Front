import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../../auth/services/token.service';

export const defaultRedirectGuard: CanActivateFn = () => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  if (!tokenService.isAuthenticated()) {
    tokenService.clearToken();
    return router.createUrlTree(['/login']);
  }

  const role = tokenService.getRole();

  if (role === 'EMPLOYEE') {
    return router.createUrlTree(['/dashboard/employee']);
  }

  return router.createUrlTree(['/dashboard/admin']);
};
