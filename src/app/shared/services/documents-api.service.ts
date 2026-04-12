import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class DocumentsApiService {
  private baseUrl = 'http://localhost:8000/api/documents';

  constructor(private http: HttpClient) {}

  getDocumentTypes(): Observable<DocumentTypeResponse[]> {
    return this.http.get<DocumentTypeResponse[]>(`${this.baseUrl}/types`);
  }

 createDocumentRequest(documentCode: string) {
  return this.http.post<CreateDocumentRequestResponse>(
    `${this.baseUrl}/requests`,
    { documentCode }
  );
}

  getMyRequests(): Observable<CreateDocumentRequestResponse[]> {
    return this.http.get<CreateDocumentRequestResponse[]>(`${this.baseUrl}/requests`);
  }
}