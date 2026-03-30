import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PayrollDetail, PayrollSummary } from '../models/payroll.model';

@Injectable({
  providedIn: 'root'
})
export class PayrollService {

  private apiUrl = `${process.env['NG_APP_API_URL']}/api/internal-users/payrolls`;
// private apiUrl = "http://localhost:8081/api/internal-users/payrolls";

  constructor(private http: HttpClient) {}

  //  Employé — ses propres fiches
  getMyPayrolls(): Observable<PayrollSummary[]> {
    return this.http.get<PayrollSummary[]>(`${this.apiUrl}/mine`);
    // Le token JWT est ajouté automatiquement par authInterceptor
    // Kong extrait le CIN et l'envoie en header X-User-CIN
  }

  // Employé — télécharger une fiche PDF
  downloadPayroll(payrollId: string): Observable<Blob> {
    return this.http.get(
      `${this.apiUrl}/${payrollId}/download-payroll`,
      { responseType: 'blob' }  // blob = fichier binaire (PDF)
    );
  }

  //  RH — toutes les fiches d'un mois
  getAllPayrolls(month: number, year: number): Observable<PayrollSummary[]> {
    return this.http.get<PayrollSummary[]>(
      `${this.apiUrl}/all?month=${month}&year=${year}`
    );
  }

  //  RH — détail complet d'une fiche
  getPayrollDetail(payrollId: string): Observable<PayrollDetail> {
    return this.http.get<PayrollDetail>(`${this.apiUrl}/${payrollId}/detail`);
  }

  //  RH — valider une fiche
  validatePayroll(payrollId: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${payrollId}/validate`, {});
  }

  //  RH — rejeter une fiche
  rejectPayroll(payrollId: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${payrollId}/reject`, {});
  }

  //  RH — générer manuellement
  generatePayrolls(month: number, year: number): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/generate?month=${month}&year=${year}`, {}
    );
  }
}