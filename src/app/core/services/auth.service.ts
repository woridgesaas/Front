import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private getTokenPayload(): any {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return null;
    }
  }

  getUserRole(): string {
    return this.getTokenPayload()?.role || '';
  }

  getUserId(): string {
    return this.getTokenPayload()?.sub || '';
  }

  isHROrCEO(): boolean {
    const role = this.getUserRole();
    return role === 'HR' || role === 'CEO';
  }

  isManager(): boolean {
    return this.getUserRole() === 'MANAGER';
  }

  canManageInterviews(): boolean {
    return this.isHROrCEO();
  }

  canEvaluate(): boolean {
    return this.isHROrCEO() || this.isManager();
  }

  canChangeStatus(): boolean {
    return this.isHROrCEO() || this.isManager();
  }
}