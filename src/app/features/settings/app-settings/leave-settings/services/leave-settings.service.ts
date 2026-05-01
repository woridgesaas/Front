import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ConfigureAnnualBalanceRequest,
  GetAnnualBalanceResponse,
  GetExceptionalLeaveResponse,
  UpdateExceptionalLeavesRequest,
} from '../models/leave-settings.models';
import { ApiResponse } from '../../../../../shared/models/api-response.models';

@Injectable({ providedIn: 'root' })
export class LeaveSettingsService {
  private readonly BASE_URL = `${process.env['NG_APP_GATEWAY_URL']}/api/settings`;

  constructor(private http: HttpClient) {}

  //* Annual leave
  configureAnnualBalance(payload: ConfigureAnnualBalanceRequest,): Observable<void> {
    return this.http.put<void>(`${this.BASE_URL}/annual-leaves`, payload);
  }

  getAnnualBalance(): Observable<GetAnnualBalanceResponse> {
    return this.http
      .get<ApiResponse<GetAnnualBalanceResponse>>(`${this.BASE_URL}/annual-leaves`)
      .pipe(map((response) => response.data));
  }

  //* Exceptional leaves
  updateExceptionalLeaves(payload: UpdateExceptionalLeavesRequest,): Observable<void> {
    return this.http.put<void>(`${this.BASE_URL}/exceptional-leaves`, payload);
  }

  getAllExceptionalLeaves(): Observable<GetExceptionalLeaveResponse[]> {
    return this.http
      .get<ApiResponse<GetExceptionalLeaveResponse[]>>(`${this.BASE_URL}/exceptional-leaves`)
      .pipe(map((response) => response.data));
  }
}
