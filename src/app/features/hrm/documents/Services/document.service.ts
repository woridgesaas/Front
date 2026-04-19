import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import {
  DocumentRequestResponse,
  DocumentDemande,
} from '../models/document-request.model';

@Injectable({ providedIn: 'root' })
export class DocumentService {
  // Gateway port 8000 — le gateway injecte X-User-CIN depuis le JWT automatiquement
  private readonly baseUrl = 'http://localhost:8000/api/documents/requests';

  constructor(private http: HttpClient) {}

  // GET api/documents/requests/documents
  getMyRequests(): Observable<DocumentDemande[]> {
    return this.http
      .get<DocumentRequestResponse[]>(`${this.baseUrl}/documents`)
      .pipe(
        map((items) =>
          items.map((item) => ({
            id: item.id,
            documentName: item.documentName,
            category: item.category,
            requestDate: new Date(item.requestDate),
            processingDate: item.processingDate
              ? new Date(item.processingDate)
              : null,
            status: item.status,
            downloadable: item.downloadable,
            isSelected: false,
          }))
        )
      );
  }

  // GET api/documents/requests/{id}/download
  // Récupère le PDF depuis MinIO via le gateway et déclenche le téléchargement navigateur
  downloadDocument(id: string, documentName: string): void {
    this.http
      .get(`${this.baseUrl}/${id}/download`, { responseType: 'blob' })
      .subscribe({
        next: (blob) => {
          const blobUrl = window.URL.createObjectURL(blob);
          const fileName = `${documentName.replace(/\s+/g, '_')}.pdf`;
          const a = document.createElement('a');
          a.href = blobUrl;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(blobUrl);
        },
        error: (err) => {
          console.error('Erreur téléchargement document:', err);
        },
      });
  }
}
