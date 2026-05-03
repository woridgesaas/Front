import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface AttendanceListResponse {
  workingDayId: string;
  employeeId: string;
  employeeName: string;
  departmentId: string;
  departmentName: string;
  date: string;
  checkInTime: string | null;
  checkOutTime: string | null;
  productionHours: number;
  status:
    | 'PRESENT'
    | 'ABSENT'
    | 'LATE'
    | 'EARLY_LEAVE'
    | 'HALF_DAY'
    | 'UNDER_TIME'
    | 'OVERTIME'
    | 'WEEKEND'
    | 'HOLIDAY';
  overtimeId: string | null;
  overtimeStatus: 'PENDING' | 'APPROVED' | 'REJECTED' | null;
  hasRfidCard: boolean;
}

interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AttendanceApiService {

  private readonly baseUrl = `${process.env['NG_APP_GATEWAY_URL']}/api/attendance`;

  // ✅ CORRECTION : /api/attendance/rfid et non /api/rfid
  private readonly rfidBaseUrl = `${process.env['NG_APP_GATEWAY_URL']}/api/attendance/rfid`;

  constructor(private http: HttpClient) {}

  getAttendanceList(
    startDate: string,
    endDate: string,
    departmentId?: string
  ): Observable<AttendanceListResponse[]> {
    let params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);
    if (departmentId) {
      params = params.set('departmentId', departmentId);
    }
    return this.http
      .get<ApiResponse<AttendanceListResponse[]> | AttendanceListResponse[]>(
        `${this.baseUrl}/list`,
        { params }
      )
      .pipe(
        map((res) => {
          if (Array.isArray(res)) return res;
          return (res as ApiResponse<AttendanceListResponse[]>).data ?? [];
        })
      );
  }

  approveOvertime(overtimeId: string): Observable<void> {
    return this.http.patch<void>(
      `${this.baseUrl}/overtimes/${overtimeId}/approve`,
      {}
    );
  }

  rejectOvertime(overtimeId: string, raison: string): Observable<void> {
    return this.http.patch<void>(
      `${this.baseUrl}/overtimes/${overtimeId}/reject`,
      { raison }
    );
  }

  checkEnrollmentStatus(employeeId: string): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.rfidBaseUrl}/enrollment/status/${employeeId}`
    );
  }

  deactivateCard(employeeId: string): Observable<void> {
    return this.http.put(
      `${this.rfidBaseUrl}/cards/${employeeId}/deactivate`,
      {},
      { responseType: 'text' }  // ✅le backend retourne du texte, pas du JSON
    ).pipe(map(() => void 0));
  }
}