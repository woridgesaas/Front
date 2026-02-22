import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { resignation } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ResignationApiService {

  // URL de base de ton backend
  private apiUrl = 'http://localhost:8080/api/resignations';

  constructor(private http: HttpClient) {}

  // ─── GET ALL ───────────────────────────────────────────
  // Récupère toutes les résignations depuis le backend
  getAll(): Observable<resignation[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(data => data.map((r, index) => this.mapToFrontend(r, index)))
    );
  }

  // ─── CREATE ────────────────────────────────────────────
  // Envoie une nouvelle résignation au backend
  create(item: resignation): Observable<resignation> {
    return this.http.post<any>(this.apiUrl, this.mapToBackend(item)).pipe(
      map(r => this.mapToFrontend(r, 0))
    );
  }

  // ─── UPDATE ────────────────────────────────────────────
  // Modifie une résignation existante
  update(id: number, item: resignation): Observable<resignation> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, this.mapToBackend(item)).pipe(
      map(r => this.mapToFrontend(r, 0))
    );
  }

  // ─── DELETE ────────────────────────────────────────────
  // Supprime une résignation
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // ─── SEARCH ────────────────────────────────────────────
  // Recherche par nom ou département
  search(query: string): Observable<resignation[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search?q=${query}`).pipe(
      map(data => data.map((r, index) => this.mapToFrontend(r, index)))
    );
  }

  // ─── CONVERTISSEURS ────────────────────────────────────

  // Backend (camelCase) → Frontend (PascalCase)
  private mapToFrontend(r: any, index: number): resignation {
    return {
      sNo: r.id || index + 1,
      resignation: null,
      isSelected: false,
      Image: r.image || 'user-01.jpg',
      ResigningEmployee: r.resigningEmployee || '',
      Department: r.department || '',
      Reason: r.reason || '',
      NoticeDate: r.noticeDate ? new Date(r.noticeDate) : null,
      ResignationDate: r.resignationDate ? new Date(r.resignationDate) : null,
    };
  }

  // Frontend (PascalCase) → Backend (camelCase)
  private mapToBackend(r: resignation): any {
    return {
      image: r.Image,
      resigningEmployee: r.ResigningEmployee,
      department: r.Department,
      reason: r.Reason,
      noticeDate: r.NoticeDate ? this.formatDate(r.NoticeDate) : null,
      resignationDate: r.ResignationDate ? this.formatDate(r.ResignationDate) : null,
    };
  }

  // Formater une date en "YYYY-MM-DD" pour le backend Java
  private formatDate(date: Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}