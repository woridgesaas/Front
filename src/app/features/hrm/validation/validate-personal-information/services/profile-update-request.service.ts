import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../../../../../shared/models/api-response.models';
import {
  ProfileUpdateSummaryRequest,
  ProfileUpdateDetailsRequest,
  RequestStatus,
} from '../models/profile-update-request.model';

@Injectable({ providedIn: 'root' })
export class ProfileUpdateRequestService {
  private readonly baseUrl = `${process.env['NG_APP_GATEWAY_URL']}/api/internal-users/profile-update-requests`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ProfileUpdateSummaryRequest[]> {
    return this.http
      .get<ApiResponse<ProfileUpdateSummaryRequest[]>>(this.baseUrl)
      .pipe(map((res) => res.data));
  }

  getDetails(requestId: string): Observable<ProfileUpdateDetailsRequest> {
    return this.http.get<ApiResponse<ProfileUpdateDetailsRequest>>(`${this.baseUrl}/${requestId}`)
      .pipe(map((res) => res.data));
  }

  process(requestId: string, status: RequestStatus): Observable<void> {
    const params = new HttpParams().set('requestStatus', status);
    return this.http.patch<void>(`${this.baseUrl}/${requestId}`, null, {
      params,
    });
  }
}
