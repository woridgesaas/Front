import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, debounceTime, switchMap } from 'rxjs';
import { LeaveType } from '../models/leave-type.enum';
import { CreateLeaveRequest } from '../models/create-leave-request.model';
import { SimulateLeaveResponse } from '../models/simulate-leave-response.model';
import { LeaveRequestResponse } from '../models/leave-request-response.model';

@Injectable({ providedIn: 'root' })
export class LeaveService {

  private readonly BASE_URL = 'http://localhost:8000/api/attendance/leave-requests';

  constructor(private http: HttpClient) {}

  simulate(
    leaveType: LeaveType,
    startDate: string,
    endDate: string
  ): Observable<SimulateLeaveResponse> {
    const params = new HttpParams()
      .set('leaveType', leaveType)
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.http.get<SimulateLeaveResponse>(
      `${this.BASE_URL}/simulate`, { params }
    );
  }

  createLeave(
    request: CreateLeaveRequest,
    justificationFile?: File | null
  ): Observable<LeaveRequestResponse> {
    const formData = new FormData();
    formData.append('data', JSON.stringify(request));
    if (justificationFile) {
      formData.append('justification', justificationFile);
    }
    return this.http.post<LeaveRequestResponse>(this.BASE_URL, formData);
  }
}
