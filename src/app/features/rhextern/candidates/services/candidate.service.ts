import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Candidate,
  CandidateDetailResponse,
  CandidateStatus,
} from '../models/candidate.model';

@Injectable({ providedIn: 'root' })
export class CandidateService {
  private readonly baseUrl = 'http://localhost:8000/api/candidates';

  constructor(private http: HttpClient) {}

  getCandidates(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(this.baseUrl);
  }

  getById(id: number): Observable<CandidateDetailResponse> {
    return this.http.get<CandidateDetailResponse>(`${this.baseUrl}/${id}`);
  }

  updateStatus(id: number, status: CandidateStatus): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}/status`, { status });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Récupère l'URL présignée MinIO depuis le backend
  getCvUrl(id: number): Observable<string> {
    return this.http
      .get<{ url: string }>(`${this.baseUrl}/${id}/cv-url`)
      .pipe(map((res) => res.url));
  }

  // Ouvre le CV dans un nouvel onglet
  viewCV(id: number): void {
    this.getCvUrl(id).subscribe({
      next: (url) => window.open(url, '_blank'),
      error: () => alert('Impossible de charger le CV.'),
    });
  }

  // Télécharge le CV
  downloadCV(id: number, applicationName: string): void {
    this.getCvUrl(id).subscribe({
      next: (url) => {
        fetch(url)
          .then((res) => res.blob())
          .then((blob) => {
            const blobUrl = window.URL.createObjectURL(blob);
            const fileName = `CV_${applicationName.replace(/\s+/g, '_')}.pdf`;
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(blobUrl);
          })
          .catch(() => alert('Impossible de télécharger le CV.'));
      },
      error: () => alert("Impossible de récupérer l'URL du CV."),
    });
  }

  // sendEmail() — réservé pour plus tard (ms-notification à créer)
  // sendEmail(candidateId: number, type: 'hired' | 'rejected'): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/${candidateId}/email`, { type });
  // }
}
