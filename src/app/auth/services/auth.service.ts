import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root'//Ce service est disponible globalement dans toute l’application.
})//Cette classe peut être injectée comme dépendance.
export class AuthService {

  private apiUrl = 'http://localhost:5265/api/auth';

  constructor(private http: HttpClient) {}

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}`,
      data
    );
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

}
