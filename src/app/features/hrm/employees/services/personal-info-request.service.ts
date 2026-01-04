import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface PersonalInfoChange {
  field: string;
  label: string;
  oldValue: string;
  newValue: string;
}

export interface PersonalInfoRequest {
  id: number;
  employeeId: number;
  employeeName: string;
  employeeRole: string;
  employeeImage?: string;
  modifiedDate: string;
  status: 'En attente' | 'Acceptée' | 'Refusée';
  changes: PersonalInfoChange[];
  submittedBy: string;
  processedDate?: string; // Date de traitement (acceptation/refus)
  processedBy?: string;   // Qui a traité la demande
}

@Injectable({
  providedIn: 'root'
})
export class PersonalInfoRequestService {
  private requests = new BehaviorSubject<PersonalInfoRequest[]>([]);
  private nextId = 1;

  constructor() {
    this.loadRequests();
  }

  /**
   * Soumettre une nouvelle demande de modification
   */
  submitRequest(
    employeeId: number,
    employeeName: string,
    employeeRole: string,
    employeeImage: string | undefined,
    changes: PersonalInfoChange[],
    submittedBy: string
  ): Observable<PersonalInfoRequest> {
    return new Observable(observer => {
      const newRequest: PersonalInfoRequest = {
        id: this.nextId++,
        employeeId,
        employeeName,
        employeeRole,
        employeeImage,
        modifiedDate: new Date().toISOString().split('T')[0],
        status: 'En attente',
        changes,
        submittedBy
      };

      const current = this.requests.value;
      this.requests.next([...current, newRequest]);
      this.saveRequests();

      observer.next(newRequest);
      observer.complete();
    });
  }

  /**
   * Obtenir toutes les demandes
   */
  getAllRequests(): Observable<PersonalInfoRequest[]> {
    return this.requests.asObservable();
  }

  /**
   * Obtenir les demandes pour un employé spécifique
   */
  getRequestsByEmployeeId(employeeId: number): PersonalInfoRequest[] {
    return this.requests.value.filter(r => r.employeeId === employeeId);
  }

  /**
   * Obtenir les demandes en attente pour un employé
   */
  getPendingRequestsByEmployeeId(employeeId: number): PersonalInfoRequest[] {
    return this.requests.value.filter(
      r => r.employeeId === employeeId && r.status === 'En attente'
    );
  }

  /**
   * Accepter une demande
   */
  acceptRequest(requestId: number, processedBy?: string): void {
    const current = this.requests.value;
    const updated = current.map(r => 
      r.id === requestId ? { 
        ...r, 
        status: 'Acceptée' as const,
        processedDate: new Date().toISOString().split('T')[0],
        processedBy: processedBy || 'RH'
      } : r
    );
    this.requests.next(updated);
    this.saveRequests();
  }

  /**
   * Refuser une demande
   */
  refuseRequest(requestId: number, processedBy?: string): void {
    const current = this.requests.value;
    const updated = current.map(r => 
      r.id === requestId ? { 
        ...r, 
        status: 'Refusée' as const,
        processedDate: new Date().toISOString().split('T')[0],
        processedBy: processedBy || 'RH'
      } : r
    );
    this.requests.next(updated);
    this.saveRequests();
  }

  /**
   * Supprimer une demande (après traitement)
   */
  deleteRequest(requestId: number): boolean {
    const current = this.requests.value;
    const requestToDelete = current.find(r => r.id === requestId);
    
    // Vérifier que la demande existe et qu'elle n'est pas en attente
    if (!requestToDelete) {
      console.warn('Demande non trouvée:', requestId);
      return false;
    }
    
    if (requestToDelete.status === 'En attente') {
      console.warn('Impossible de supprimer une demande en attente');
      return false;
    }

    // Supprimer la demande
    const updated = current.filter(r => r.id !== requestId);
    this.requests.next(updated);
    this.saveRequests();
    return true;
  }

  /**
   * Supprimer toutes les demandes traitées (Acceptées ou Refusées)
   */
  deleteProcessedRequests(): number {
    const current = this.requests.value;
    const updated = current.filter(r => r.status === 'En attente');
    const deletedCount = current.length - updated.length;
    
    this.requests.next(updated);
    this.saveRequests();
    
    return deletedCount;
  }

  /**
   * Obtenir une demande par ID
   */
  getRequestById(requestId: number): PersonalInfoRequest | undefined {
    return this.requests.value.find(r => r.id === requestId);
  }

  /**
   * Sauvegarder dans localStorage
   */
  private saveRequests(): void {
    localStorage.setItem(
      'personalInfoRequests',
      JSON.stringify(this.requests.value)
    );
  }

  /**
   * Charger depuis localStorage
   */
  private loadRequests(): void {
    const stored = localStorage.getItem('personalInfoRequests');
    if (stored) {
      const parsed = JSON.parse(stored);
      this.requests.next(parsed);
      this.nextId = Math.max(...parsed.map((r: PersonalInfoRequest) => r.id), 0) + 1;
    }
  }
}