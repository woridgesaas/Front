import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../../auth/services/token.service';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  const role = tokenService.getRole();

  const allowedRoles: string[] = route.data?.['roles'] ?? [];

  if (role && allowedRoles.includes(role)) {
    return true;
  }

  router.navigate(['/error-404']);
  return false;
};
