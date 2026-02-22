import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ChangePasswordRequest,ApiResponse } from '../models/ChangePasswordReques';


@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  private apiUrl = 'http://localhost:5265/api/auth/change-password';

  constructor(private http: HttpClient) {}

  changePassword(payload: ChangePasswordRequest): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.apiUrl, payload)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unexpected error occurred';

    if (error.error?.message) {
      errorMessage = error.error.message;
    }

    return throwError(() => errorMessage);
  }
}