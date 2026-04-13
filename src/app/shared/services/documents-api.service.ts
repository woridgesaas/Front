// src/app/shared/services/documents-api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { RhDocumentDemande } from '../models/models';

// ✅ Interface exacte de ce que le backend retourne
export interface DocumentRequestApi {
  id: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  requestDate: string;
  documentCode: string;
  documentGroup: string;
  processingDate?: string;
  employeeCin?: string;
}

export interface DocumentTypeResponse {
  category: string;
  group: string;
  description: string;
}

export interface CreateDocumentRequestResponse {
  id: string;
  status: string;
  requestDate: string;
  documentCode: string;
  documentGroup: string;
}

export interface DocumentValidationResponse {
  requestId: string;
  employeeCin: string;
  documentCode: string;
  newStatus: string;
  processedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class DocumentsApiService {

  private baseUrl = 'http://localhost:8000/api/documents';

  constructor(private http: HttpClient) {}

  // ============================================================
  // EMPLOYEE — endpoints existants
  // ============================================================

  // GET /types → liste des types de documents disponibles
  getDocumentTypes(): Observable<DocumentTypeResponse[]> {
    return this.http.get<DocumentTypeResponse[]>(`${this.baseUrl}/types`);
  }

  // POST /requests → employé soumet une demande
  createDocumentRequest(documentCode: string): Observable<CreateDocumentRequestResponse> {
    return this.http.post<CreateDocumentRequestResponse>(
      `${this.baseUrl}/requests`,
      { documentCode }
    );
  }

  // GET /requests → employé voit ses propres demandes
  getMyRequests(): Observable<CreateDocumentRequestResponse[]> {
    return this.http.get<CreateDocumentRequestResponse[]>(`${this.baseUrl}/requests`);
  }

  

  // GET /requests/all → RH voit toutes les demandes
  getAllRequests(): Observable<RhDocumentDemande[]> {
    return this.http.get<DocumentRequestApi[]>(`${this.baseUrl}/requests/all`)
      .pipe(
        map(list => list.map(item => this.mapToRhDemande(item)))
      );
  }

  // PUT /requests/{id}/approve → RH approuve
  approveRequest(id: string): Observable<DocumentValidationResponse> {
    return this.http.put<DocumentValidationResponse>(
      `${this.baseUrl}/requests/${id}/approve`,
      {}
    );
  }

  // PUT /requests/{id}/reject → RH rejette
  rejectRequest(id: string): Observable<DocumentValidationResponse> {
    return this.http.put<DocumentValidationResponse>(
      `${this.baseUrl}/requests/${id}/reject`,
      {}
    );
  }

  
  // Conversion API → RhDocumentDemande 

  private mapToRhDemande(api: DocumentRequestApi): RhDocumentDemande {
    return {
      id: 0,
      uuid: api.id,          
      documentName: api.documentCode,
      description: '',
      category: api.documentGroup,
      requestDate: new Date(api.requestDate),
      processedDate: api.processingDate
        ? new Date(api.processingDate)
        : undefined,
      status: this.mapStatus(api.status),
      employeeId: 0,
      employeeName: api.employeeCin ?? 'Employé inconnu',
      employeeAvatar: undefined,
      employeeRole: '',
      employeeDepartment: '',
      employeeEmail: '',
      estimatedProcessingDays: 0,
      justification: ' ',
      processedBy: undefined
    };
  }

  private mapStatus(status: string): RhDocumentDemande['status'] {
    const map: Record<string, RhDocumentDemande['status']> = {
      'PENDING':  'pending',
      'APPROVED': 'accepted',
      'REJECTED': 'rejected'
    };
    return map[status] ?? 'pending';
  }
}