import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  ApiResponse,
  ConfirmChangePasswordRequest,
  RequestChangePasswordRequest,
  VerifyChangePasswordOtpRequest
} from '../models/ChangePasswordReques';

@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {
  private baseUrl = `${process.env['NG_APP_intern_URL']}/api/auth`;

  constructor(private http: HttpClient) {}

  requestOtp(payload: RequestChangePasswordRequest) {
    return this.http.post<ApiResponse<null>>(
      `${this.baseUrl}/change-password/request`,
      payload
    ).pipe(catchError(this.handleError));
  }

  verifyOtp(payload: VerifyChangePasswordOtpRequest) {
    return this.http.post<ApiResponse<null>>(
      `${this.baseUrl}/change-password/verify`,
      payload
    ).pipe(catchError(this.handleError));
  }

  confirmPassword(payload: ConfirmChangePasswordRequest) {
    return this.http.post<ApiResponse<null>>(
      `${this.baseUrl}/change-password/confirm`,
      payload
    ).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => error);
  }
}