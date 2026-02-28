import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ChangePasswordRequest,ApiResponse } from '../models/ChangePasswordReques';
@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  private baseUrl = `${process.env['NG_APP_API_URL']}/api/auth`;

  constructor(private http: HttpClient) {}

  changePassword(payload: ChangePasswordRequest): Observable<ApiResponse> {
    return this.http
      .put<ApiResponse>(`${this.baseUrl}/change-password`, payload)
      .pipe(catchError(this.handleError));
  }

  getLastPasswordUpdate(): Observable<ApiResponse> {
    return this.http
      .get<ApiResponse>(`${this.baseUrl}/last-password-update`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unexpected error occurred';

    if (error.error?.message) {
      errorMessage = error.error.message;
    }

    return throwError(() => errorMessage);
  }
}