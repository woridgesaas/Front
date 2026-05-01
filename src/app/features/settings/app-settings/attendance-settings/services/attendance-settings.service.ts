import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../../../../../shared/models/api-response.models';
import { ConfigureAbsenceJustificationRequest, ConfigureAlertThresholdRequest, ConfigureWorkScheduleRequest, GetAbsenceJustificationResponse, GetAlertThresholdResponse, GetWorkScheduleResponse } from '../models/attendance-settings.models';


@Injectable({ providedIn: 'root' })
export class AttendanceSettingsService {
  private readonly BASE_URL = `${process.env['NG_APP_GATEWAY_URL']}/api/settings`;

  constructor(private http: HttpClient) {}

  //* Absence justification
  configureAbsenceJustification(payload: ConfigureAbsenceJustificationRequest,): Observable<void> {
    return this.http.put<void>(`${this.BASE_URL}/absence-justifications`,payload,);
  }

  getAbsenceJustification(): Observable<GetAbsenceJustificationResponse> {
    return this.http
      .get<ApiResponse<GetAbsenceJustificationResponse>>(`${this.BASE_URL}/absence-justifications`)
      .pipe(map((response) => response.data));
  }

  //* Alert threshold
  configureAlertThreshold(payload: ConfigureAlertThresholdRequest,): Observable<void> {
    return this.http.put<void>(`${this.BASE_URL}/alert-thresholds`, payload);
  }

  getAlertThreshold(): Observable<GetAlertThresholdResponse> {
    return this.http
      .get<ApiResponse<GetAlertThresholdResponse>>(`${this.BASE_URL}/alert-thresholds`)
      .pipe(map((response) => response.data));
  }

  //* Work schedule
  configureWorkSchedule(payload: ConfigureWorkScheduleRequest,): Observable<void> {
    return this.http.put<void>(`${this.BASE_URL}/work-schedules`, payload);
  }

  getWorkSchedule(): Observable<GetWorkScheduleResponse> {
    return this.http
      .get<ApiResponse<GetWorkScheduleResponse>>(`${this.BASE_URL}/work-schedules`)
      .pipe(map((response) => response.data));
  }
}
