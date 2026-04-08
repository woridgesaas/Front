import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Interview,
  CreateInterviewDto,
  UpdateInterviewDto,
  UpdateStatusDto,
  InterviewFilters,
  CreateEvaluationDto
} from '../models/interview.model';
import { Interviewer } from '../models/interviewer.model';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {
  private readonly baseUrl:          string;
  private readonly interviewersUrl:  string;
  private readonly headers:          HttpHeaders;

  constructor(private http: HttpClient) {
    const gatewayUrl = (import.meta as any).env['NG_APP_GATEWAY_URL']
      || 'http://localhost:8000';

    this.baseUrl         = `${gatewayUrl}/api/interviews`;
    this.interviewersUrl = `${gatewayUrl}/api/interviewers`;

    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Subdomain':  'dev-local'
    });
  }

  // ========== CRUD ==========

  getAll(filters?: InterviewFilters): Observable<Interview[]> {
    let params = new HttpParams();

    if (filters?.dateDebut)
      params = params.set('from', filters.dateDebut);
    if (filters?.dateFin)
      params = params.set('to', filters.dateFin);
    if (filters?.interviewerId)
      params = params.set('interviewerId', filters.interviewerId.toString());
    if (filters?.candidat)
      params = params.set('candidateName', filters.candidat);
    if (filters?.statut)
      params = params.set('status', filters.statut);

    return this.http.get<any[]>(this.baseUrl, {
      headers: this.headers,
      params
    }).pipe(
      map(interviews => interviews.map(i => this.mapInterview(i)))
    );
  }

  getById(id: number): Observable<Interview> {
    return this.http.get<any>(`${this.baseUrl}/${id}`, {
      headers: this.headers
    }).pipe(
      map(i => this.mapInterview(i))
    );
  }

  create(dto: CreateInterviewDto): Observable<Interview> {
    return this.http.post<any>(this.baseUrl, dto, {
      headers: this.headers
    }).pipe(
      map(i => this.mapInterview(i))
    );
  }

  update(id: number, dto: UpdateInterviewDto): Observable<Interview> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, dto, {
      headers: this.headers
    }).pipe(
      map(i => this.mapInterview(i))
    );
  }

  updateStatus(id: number, dto: UpdateStatusDto): Observable<Interview> {
    return this.http.patch<any>(`${this.baseUrl}/${id}/status`, dto, {
      headers: this.headers
    }).pipe(
      map(i => this.mapInterview(i))
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, {
      headers: this.headers
    });
  }

  // ========== INTERVIEWERS ==========

  getInterviewers(): Observable<Interviewer[]> {
    return this.http.get<any[]>(this.interviewersUrl, {
      headers: this.headers
    }).pipe(
      map(data => data.map(i => ({
        id:             i.id,
        externalUserId: i.externalUserId,
        fullName:       i.fullName,
        email:          i.email,
        role:           i.role,
        nom:            i.fullName,  // alias pour le select
        specialite:     i.role,      // alias pour le select
        photo:          'default-avatar.jpg',
        isActive:       i.isActive ?? true
      } as Interviewer)))
    );
  }

  // ========== MAPPER ==========

  private mapInterview(i: any): Interview {
    const typeMap: Record<number, string> = {
      0: 'Visioconference',
      1: 'Presentiel',
      2: 'Telephonique'
    };
    const statusMap: Record<number, string> = {
      0: 'Planifie',
      1: 'Confirme',
      2: 'EnCours',
      3: 'Termine',
      4: 'Reporte',
      5: 'Annule'
    };

    return {
      ...i,
      type:   typeMap[i.type]     ?? i.type,
      status: statusMap[i.status] ?? i.status
    } as Interview;
  }

  createEvaluation(interviewId: number, dto: CreateEvaluationDto): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/${interviewId}/evaluations`,
      dto,
      { headers: this.headers }
    );
  }
}