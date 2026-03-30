import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeInfoResponse, UpdatePromotionRequest } from '../models/models';

export interface PromotionRequest {
  CIN: string;
  bonus: number;
  newPostId?: string;
}
@Injectable({
  providedIn: 'root'
})
export class PromotionService {

private api = `http://localhost:8000/api/internal-users/promotions`;
  constructor(private http: HttpClient) {}

  // 🔹 Infos employé
  getEmployeeInfo(cin: string): Observable<EmployeeInfoResponse> {
  return this.http.get<EmployeeInfoResponse>(`${this.api}/${cin}`);
}

  // 🔹 Créer promotion
  createPromotion(data: PromotionRequest): Observable<any> {
    return this.http.post(this.api, data);
  }

  // 🔹 Lister toutes les promotions (SIMPLE)
  getAllPromotions(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }

  // 🔹 Update
  updatePromotion(id: string, data: UpdatePromotionRequest) {
  return this.http.put(`${this.api}/${id}`, data);
}
  
}