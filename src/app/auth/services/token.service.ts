import { Injectable } from '@angular/core';
import { TokenPayload } from '../models/token-payload.model';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  getPayload(): TokenPayload | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      return JSON.parse(atob(token.split('.')[1])) as TokenPayload;
    } catch {
      return null;
    }
  }

  getCIN(): string | null {
    return this.getPayload()?.sub ?? null;
  }

  getRole(): string | null {
    return this.getPayload()?.role ?? null;
  }

  isTokenExpired(): boolean {
    const exp = this.getPayload()?.exp;
    if (!exp) return true;
    return Date.now() >= exp * 1000;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    //return true; //yarbi n39l nrj3 nmodifiha
    return !!token && !!this.getPayload() && !this.isTokenExpired();
    
  }

  clearToken(): void {
    localStorage.removeItem('token');
  }
}
