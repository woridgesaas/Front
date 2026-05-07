import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { TokenService } from '../../auth/services/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private tokenService: TokenService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  canActivate() :  boolean | UrlTree {
    if (!isPlatformBrowser(this.platformId)) {
      return this.router.createUrlTree(['/login']);
    }

    if (this.tokenService.isAuthenticated()) {
      return true;
    }

    this.tokenService.clearToken();
    return this.router.createUrlTree(['/login']);
  }
}
