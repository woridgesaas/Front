import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// ─── Interfaces API .NET ───

export interface JobOfferApiDto {
  id: string;
  title: string;
  description: string;
  location: string;
  salaryRange: string;
  yearsExperience: number;
  numberOfPositions: number;
  status: string;
  contractType: string;
  createdAt: string;
  updatedAt: string | null;
  jobTypeId: string;
  jobTypeName: string;
  jobTypeCategory: string;
  publicationCanals: PublicationCanalApiDto[];
}

export interface PublicationCanalApiDto {
  canalName: string;
  isPublished: boolean;
  isFeatured: boolean;
  publishedAt: string | null;
  errorMessage: string | null;
}

export interface CreateJobOfferApiDto {
  title: string;
  description: string;
  location: string;
  salaryRange: string | null;
  yearsExperience: number;
  numberOfPositions: number;
  contractType: number;
  jobTypeId: string;
  createdByUserId: string;
}

export interface UpdateJobOfferApiDto {
  title: string;
  description: string;
  location: string;
  salaryRange: string | null;
  yearsExperience: number;
  numberOfPositions: number;
  contractType: number;
  jobTypeId: string;
  updatedByUserId: string;
}

export interface PublishJobOfferApiDto {
  canalNames: string[];
  notifyHrTeam: boolean;
  isFeatured: boolean;
  publishedByUserId: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface JobTypeApiDto {
  id: string;
  name: string;
  category: string;
}

export interface CanalApiDto {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class JobOfferApiService {

  private readonly baseUrl: string;
  private readonly headers: HttpHeaders;

  constructor(private http: HttpClient) {
    const gatewayUrl = (import.meta as any).env['NG_APP_GATEWAY_URL'] 
      || 'http://localhost:8000';

    this.baseUrl = `${gatewayUrl}/api/joboffers`;

    // ← NE PAS mettre Authorization ici
    // L'intercepteur s'en charge automatiquement
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
     'X-Subdomain': 'dev-local' 
    });
  }
  // ─────────────────────────────────────────
  // GET ALL
  // ─────────────────────────────────────────
  getAll(filters?: {
    from?: string;
    to?: string;
    jobTypeId?: string;
    status?: string;
  }): Observable<ApiResponse<JobOfferApiDto[]>> {
    let params = new HttpParams();
    if (filters?.from) params = params.set('from', filters.from);
    if (filters?.to) params = params.set('to', filters.to);
    if (filters?.jobTypeId) params = params.set('jobTypeId', filters.jobTypeId);
    if (filters?.status) params = params.set('status', filters.status);

    return this.http.get<ApiResponse<JobOfferApiDto[]>>(
      this.baseUrl,
      { headers: this.headers, params }
    );
  }

  // ─────────────────────────────────────────
  // GET BY ID
  // ─────────────────────────────────────────
  getById(id: string): Observable<ApiResponse<JobOfferApiDto>> {
    return this.http.get<ApiResponse<JobOfferApiDto>>(
      `${this.baseUrl}/${id}`,
      { headers: this.headers }
    );
  }

  // ─────────────────────────────────────────
  // CREATE
  // ─────────────────────────────────────────
  create(dto: CreateJobOfferApiDto): Observable<ApiResponse<JobOfferApiDto>> {
    return this.http.post<ApiResponse<JobOfferApiDto>>(
      this.baseUrl,
      dto,
      { headers: this.headers }
    );
  }

  // ─────────────────────────────────────────
  // UPDATE
  // ─────────────────────────────────────────
  update(id: string, dto: UpdateJobOfferApiDto): Observable<ApiResponse<JobOfferApiDto>> {
    return this.http.put<ApiResponse<JobOfferApiDto>>(
      `${this.baseUrl}/${id}`,
      dto,
      { headers: this.headers }
    );
  }

  // ─────────────────────────────────────────
  // DELETE
  // ─────────────────────────────────────────
  delete(id: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(
      `${this.baseUrl}/${id}`,
      { headers: this.headers }
    );
  }

  // ─────────────────────────────────────────
  // PUBLISH
  // ─────────────────────────────────────────
  publish(id: string, dto: PublishJobOfferApiDto): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(
      `${this.baseUrl}/${id}/publish`,
      dto,
      { headers: this.headers }
    );
  }

  // ─────────────────────────────────────────
  // CLOSE
  // ─────────────────────────────────────────
  close(id: string, userId: string): Observable<ApiResponse<null>> {
    return this.http.post<ApiResponse<null>>(
      `${this.baseUrl}/${id}/close?userId=${userId}`,
      {},
      { headers: this.headers }
    );
  }

  // ─────────────────────────────────────────
  // GET JOB TYPES
  // ─────────────────────────────────────────
  getJobTypes(): Observable<ApiResponse<JobTypeApiDto[]>> {
    const gatewayUrl = (import.meta as any).env['NG_APP_GATEWAY_URL'] || 'http://localhost:8000';
    return this.http.get<ApiResponse<JobTypeApiDto[]>>(
      `${gatewayUrl}/api/jobtypes`,
      { headers: this.headers }
    );
  }

getCanals(): Observable<ApiResponse<CanalApiDto[]>> {
    const gatewayUrl = (import.meta as any).env['NG_APP_GATEWAY_URL'] || 'http://localhost:8000';
    return this.http.get<ApiResponse<CanalApiDto[]>>(
      `${gatewayUrl}/api/canals`,
      { headers: this.headers }
    );
  }
}