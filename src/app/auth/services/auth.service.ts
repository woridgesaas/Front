import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import {
  LoginRequest,
  LoginResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private gatewayUrl = `${process.env['NG_APP_GATEWAY_URL']}/api/auth`;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.gatewayUrl}`, data);
  }

  requestPasswordReset(request: ForgotPasswordRequest): Observable<void> {
    return this.http.post<void>(`${this.gatewayUrl}/request`, request);
  }

  verifyOtpCode(verifyOtpRequest: VerifyOtpRequest): Observable<string> {
    return this.http
      .post<VerifyOtpResponse>(`${this.gatewayUrl}/verify`, verifyOtpRequest)
      .pipe(map((response) => response.data));
  }

  resetPassword(resetPasswordRequest: ResetPasswordRequest): Observable<void> {
    return this.http.post<void>(`${this.gatewayUrl}/reset`, resetPasswordRequest);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    const token = this.getToken();
    this.http
      .post(
        `${this.gatewayUrl}/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .subscribe({
        next: () => {
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        },
        error: () => {
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        },
      });
  }
}
