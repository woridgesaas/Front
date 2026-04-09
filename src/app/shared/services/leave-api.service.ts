import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface LeaveApiResponse {
  id: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  numberOfDays: number;
  status: string;
  approvedBy: { fullName: string } | null;
}

@Injectable({
  providedIn: 'root'
})
export class LeaveApiService {

  private baseUrl = `${process.env['NG_APP_GATEWAY_URL']}/api/attendance/leaves`;

  constructor(private http: HttpClient) {}

  getPendingLeaves(): Observable<LeaveApiResponse[]> {
    return this.http.get<any>(`${this.baseUrl}/pending`).pipe(
      map(res => res.data)
    );
  }
  rejectLeave(id: string) {
  return this.http.post(
    `${this.baseUrl}/${id}/reject`,
    {}
  );

}
}