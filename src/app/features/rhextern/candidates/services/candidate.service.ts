import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { 
  Candidate, 
  CandidateStatus, 
  CandidateApiResponse 
} from '../models/candidate.model';

/**
 * Service pour gérer toutes les opérations liées aux candidats
 */
@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor() {}

  /**
   * Récupère la liste de tous les candidats
  
   */
  getCandidates(): Observable<CandidateApiResponse> {
    // return this.http.get<CandidateApiResponse>('/api/candidates');
    
    return of({
      data: this.getMockData(),
      totalData: this.getMockData().length,
      success: true
    }).pipe(delay(300));
  }

  /**
   * Met à jour le statut d'un candidat
   
   */
  updateStatus(candidateId: string, newStatus: CandidateStatus): Observable<any> {
    // return this.http.patch(`/api/candidates/${candidateId}/status`, { status: newStatus });
    
    console.log(` Mise à jour statut: ${candidateId} → ${newStatus}`);
    return of({ success: true }).pipe(delay(200));
  }

  /**
   * Supprime un candidat
   
   */
  delete(candidateId: string): Observable<any> {
    // return this.http.delete(`/api/candidates/${candidateId}`);
    
    console.log(` Suppression: ${candidateId}`);
    return of({ success: true }).pipe(delay(200));
  }

  /**
   * Envoie un email au candidat
   
   */
  sendEmail(candidateId: string, type: 'hired' | 'rejected' | 'interview'): Observable<any> {
    // return this.http.post(`/api/candidates/${candidateId}/email`, { type });
    
    console.log(` Email ${type} envoyé: ${candidateId}`);
    return of({ success: true }).pipe(delay(150));
  }

  // ============ DONNÉES MOCK  ============
  
  private getMockData(): Candidate[] {
    return [
      {
        Cand_ID: 'C001',
        Candidate: 'Mohammed Alami',
        Email: 'mohammed.alami@email.com',
        Phone: '+212 6 12 34 56 78',
        Applied_Role: 'Développeur Full Stack',
        Applied_Date: '2024-12-15',
        Status: CandidateStatus.NEW,
        Image: 'user-01.jpg'
      },
      {
        Cand_ID: 'C002',
        Candidate: 'Fatima Zahra',
        Email: 'fatima.zahra@email.com',
        Phone: '+212 6 23 45 67 89',
        Applied_Role: 'Comptable',
        Applied_Date: '2024-12-18',
        Status: CandidateStatus.SCHEDULED,
        Image: 'user-02.jpg'
      },
      {
        Cand_ID: 'C003',
        Candidate: 'Youssef Benali',
        Email: 'youssef.benali@email.com',
        Phone: '+212 6 34 56 78 90',
        Applied_Role: 'Technicien IT',
        Applied_Date: '2024-12-20',
        Status: CandidateStatus.INTERVIEWED,
        Image: 'user-03.jpg'
      },
      {
        Cand_ID: 'C004',
        Candidate: 'Amina El Idrissi',
        Email: 'amina.idrissi@email.com',
        Phone: '+212 6 45 67 89 01',
        Applied_Role: 'Designer UI/UX',
        Applied_Date: '2024-12-22',
        Status: CandidateStatus.OFFERED,
        Image: 'user-04.jpg'
      },
      {
        Cand_ID: 'C005',
        Candidate: 'Karim Benjelloun',
        Email: 'karim.benjelloun@email.com',
        Phone: '+212 6 56 78 90 12',
        Applied_Role: 'Chef de Projet',
        Applied_Date: '2024-12-10',
        Status: CandidateStatus.HIRED,
        Image: 'user-05.jpg'
      }
    ];
  }
}