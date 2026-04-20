import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

// Interface pour le tableau des demandes en attente
export interface LeaveApiResponse {
  id: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  numberOfDays: number;
  status: string;
  approvedBy: { fullName: string } | null;
}

//  Interface pour le calendrier (congés approuvés)
export interface CalendarLeaveResponse {
  leaveId: string;
  employeeId: string;
  employeeName: string;
  departmentId: string;
  startDate: string;     // format ISO : "2026-04-20"
  endDate: string;
  leaveType: 'ANNUEL' | 'MALADIE' | 'EXCEPTIONNEL';
}

@Injectable({
  providedIn: 'root'
})
export class LeaveApiService {

  private baseUrl = `${process.env['NG_APP_GATEWAY_URL']}/api/attendance/leaves`;

  constructor(private http: HttpClient) {}

  // ─── Liste des demandes en attente (tableau) ──────────────
  getPendingLeaves(): Observable<LeaveApiResponse[]> {
    return this.http.get<any>(`${this.baseUrl}/pending`).pipe(
      map(res => res.data)
    );
  }

  // ─── Refuser une demande ──────────────────────────────────
  rejectLeave(id: string) {
    return this.http.post(
      `${this.baseUrl}/${id}/reject`,
      {}
    );
  }

  // : Congés approuvés pour le calendrier (par mois)
  //  MODIFIÉ : accepte un departmentId optionnel
getCalendarLeaves(
  year: number,
  month: number,
  departmentId?: string
): Observable<CalendarLeaveResponse[]> {

  let params = new HttpParams()
    .set('year', year.toString())
    .set('month', month.toString());

  if (departmentId) {
    params = params.set('departmentId', departmentId);
  }

  return this.http.get<any>(`${this.baseUrl}/calendar`, { params }).pipe(
    map(res => res.data)
  );
}

// NOUVEAU : liste des départements (pour le filtre RH)
getDepartments(): Observable<string[]> {
  return this.http.get<any>(`${this.baseUrl}/calendar/departments`).pipe(
    map(res => res.data)
  );
}
}