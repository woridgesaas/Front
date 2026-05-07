import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { TokenService } from '../../auth/services/token.service';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private tokenService: TokenService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  canActivate(): boolean | UrlTree {
    if (!isPlatformBrowser(this.platformId)) {
      return true;
    }

    if (!this.tokenService.isAuthenticated()) {
      this.tokenService.clearToken();
      return true;
    }

    const role = this.tokenService.getRole();

    if (role === 'EMPLOYEE') {
      return this.router.createUrlTree(['/dashboard/employee']);
    }

    return this.router.createUrlTree(['/dashboard/admin']);
  }
}
