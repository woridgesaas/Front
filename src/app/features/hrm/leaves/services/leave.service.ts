import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LeaveType } from '../models/leave-type.enum';
import { CreateLeaveRequest } from '../models/create-leave-request.model';
import { SimulateLeaveResponse } from '../models/simulate-leave-response.model';
import { LeaveRequestResponse } from '../models/leave-request-response.model';
import { LeaveRequestListResponse } from '../models/leave-request-list-response.model';
import { LeaveRequestFilter } from '../models/leave-request-filter.model';

@Injectable({ providedIn: 'root' })
export class LeaveService {

  private readonly BASE_URL = 'http://localhost:8000/api/attendance/leave-requests';

  constructor(private http: HttpClient) {}

  getAll(filter?: LeaveRequestFilter): Observable<LeaveRequestListResponse[]> {
    let params = new HttpParams();

    if (filter) {
      if (filter.startDate)  params = params.set('startDate',  filter.startDate);
      if (filter.endDate)    params = params.set('endDate',    filter.endDate);
      if (filter.leaveType)  params = params.set('leaveType',  filter.leaveType);
      if (filter.approvedBy) params = params.set('approvedBy', filter.approvedBy);
      if (filter.status)     params = params.set('status',     filter.status);
      if (filter.sortBy)     params = params.set('sortBy',     filter.sortBy);
    }

    return this.http.get<LeaveRequestListResponse[]>(this.BASE_URL, { params });
  }

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
