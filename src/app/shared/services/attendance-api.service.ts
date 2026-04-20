// src/app/shared/services/attendance-api.service.ts

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

// ✅ Interface alignée avec AttendanceListResponse Java
export interface AttendanceListResponse {
  workingDayId: string;
  employeeId: string;
  employeeName: string;
  departmentId: string;
  departmentName: string;
  date: string;                    // "2026-04-20"
  checkInTime: string | null;      // "09:00:00"
  checkOutTime: string | null;
  productionHours: number;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EARLY_LEAVE' | 'HALF_DAY' | 'UNDER_TIME' | 'OVERTIME' | 'WEEKEND' | 'HOLIDAY';
  overtimeId: string | null;
  overtimeStatus: 'PENDING' | 'APPROVED' | 'REJECTED' | null;
  hasRfidCard: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AttendanceApiService {

  private baseUrl = `${process.env['NG_APP_GATEWAY_URL']}/api/attendance`;

  constructor(private http: HttpClient) {}

  // ✅ Liste des présences avec filtres
  getAttendanceList(
    startDate: string,    // format "YYYY-MM-DD"
    endDate: string,
    departmentId?: string
  ): Observable<AttendanceListResponse[]> {

    let params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);

    if (departmentId) {
      params = params.set('departmentId', departmentId);
    }

    return this.http.get<any>(`${this.baseUrl}/list`, { params }).pipe(
      map(res => res.data)
    );
  }

  // ✅ Approuver un overtime
  approveOvertime(overtimeId: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/overtimes/${overtimeId}/approve`, {});
  }

  // ✅ Refuser un overtime (avec raison)
  rejectOvertime(overtimeId: string, raison: string): Observable<any> {
    return this.http.patch(
      `${this.baseUrl}/overtimes/${overtimeId}/reject`,
      { raison }
    );
  }
}