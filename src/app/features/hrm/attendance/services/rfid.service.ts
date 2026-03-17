import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnrollResponse } from '../models/attendance.model';

@Injectable({
  providedIn: 'root'
})
export class RfidService {

  // ← changer selon ton environnement
  private apiUrl = 'http://localhost:8000/api/attendance/rfid';

  constructor(private http: HttpClient) {}

  // Activer mode enrollment pour un employé
  activateEnrollment(employeeId: string): Observable<string> {
    return this.http.put(
      `${this.apiUrl}/mode/enrollment`,
      { employeeId },
      { responseType: 'text' }
    );
  }

  // Revenir au mode attendance normal
  activateAttendance(): Observable<string> {
    return this.http.put(
      `${this.apiUrl}/mode/attendance`,
      {},
      { responseType: 'text' }
    );
  }

  // Voir le mode actuel
  getCurrentMode(): Observable<string> {
    return this.http.get(
      `${this.apiUrl}/mode`,
      { responseType: 'text' }
    );
  }

  // Vérifier si l'employé a une carte associée
checkEnrollmentDone(employeeId: string): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.apiUrl}/enrollment/status/${employeeId}`
    );
  }
}