import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Resignation, UserSearch } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ResignationApiService {

  private apiUrl = 'http://localhost:8081/api/resignations';
  private userUrl = 'http://localhost:8081/api/user';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // ─── SEARCH USER BY CIN ────────────────────────────────
  searchUserByCin(cin: string): Observable<UserSearch> {
    return this.http.get<UserSearch>(
      `${this.userUrl}/search?cin=${cin}`,
      { headers: this.getHeaders() }
    );
  }

  // ─── GET ALL ───────────────────────────────────────────
  getAll(): Observable<Resignation[]> {
    return this.http.get<Resignation[]>(
      this.apiUrl,
      { headers: this.getHeaders() }
    );
  }

  // ─── CREATE ────────────────────────────────────────────
  create(item: Resignation, cin: string): Observable<Resignation> {
    return this.http.post<Resignation>(
        this.apiUrl,
        this.mapToBackend(item, cin),
        { headers: this.getHeaders() }
    );
}

  // ─── UPDATE ────────────────────────────────────────────
  update(id: string, item: Resignation): Observable<Resignation> {
    return this.http.put<Resignation>(
        `${this.apiUrl}/${id}`,
        this.mapToBackend(item, item.cin || ''), // ✅ CIN depuis l'item
        { headers: this.getHeaders() }
    );
}

  // ─── DELETE ────────────────────────────────────────────
  delete(id: string): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`,
      { headers: this.getHeaders() }
    );
  }

  // ─── MAPPING ───────────────────────────────────────────
  private mapToBackend(r: Resignation, cin: string): any {
    return {
        cin: cin,
        reason: r.reason,
        noticeDate: r.noticeDate ? this.formatDate(r.noticeDate as Date) : null,
        resignationDate: r.resignationDate ? this.formatDate(r.resignationDate as Date) : null
    };
}

  private formatDate(date: Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}