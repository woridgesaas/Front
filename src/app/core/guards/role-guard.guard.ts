import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../../auth/services/token.service';

export const roleGuard: CanActivateFn = (route) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  if (!tokenService.isAuthenticated()) {
    tokenService.clearToken();
    return router.createUrlTree(['/login']);
  }

  const userRole = tokenService.getRole();
  const allowedRoles: string[] = route.data['roles'] ?? [];

  if (!userRole || !allowedRoles.includes(userRole)) {
    return router.createUrlTree(['/error-404']);
  }

  return true;
};
