import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PromotionRequest {
  cin: string;
  bonus: number;
  newPostId?: string;
}
@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  private api = 'http://localhost:8081/api/promotions';

  constructor(private http: HttpClient) {}

  // 🔹 Infos employé
  getEmployeeInfo(cin: string): Observable<any> {
    return this.http.get(`${this.api}/employee/${cin}`);
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
  updatePromotion(id: string, data: any) {
    return this.http.put(`${this.api}/${id}`, data);
  }
  deletePromotion(id: string) {
  return this.http.delete(`${this.api}/${id}`);
}
}