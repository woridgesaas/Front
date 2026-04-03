import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthStateService {
  set email(value: string) {
    sessionStorage.setItem('auth_email', value);
  }

  get email(): string {
    return sessionStorage.getItem('auth_email') ?? '';
  }

  set resetToken(value: string) {
    sessionStorage.setItem('auth_reset_token', value);
  }

  get resetToken(): string {
    return sessionStorage.getItem('auth_reset_token') ?? '';
  }

  clear(): void {
    sessionStorage.removeItem('auth_email');
    sessionStorage.removeItem('auth_reset_token');
  }
}
