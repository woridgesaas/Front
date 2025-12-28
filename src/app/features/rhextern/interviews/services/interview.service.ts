
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Interview, InterviewFilters } from '../models/interview.model';
import { Interviewer } from '../models/interviewer.model';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {
  private readonly API_URL = '/api/interviews'; // TODO: Configurer dans environment

  constructor(private http: HttpClient) {} // TODO: Injecter HttpClient

  // recuperer data
  getAll(): Observable<Interview[]> {
    //  return this.http.get<Interview[]>(this.API_URL);
    return of(this.getMockData()).pipe(delay(500));
  }


    // Récupère un entretien par ID
   
  getById(id: string): Observable<Interview | null> {
    // return this.http.get<Interview>(`${this.API_URL}/${id}`);
    return of(null).pipe(delay(300));
  }

  // Crée un nouvel entretien
  create(interview: Interview): Observable<Interview> {
    //  return this.http.post<Interview>(this.API_URL, interview);
    return of(interview).pipe(delay(1000));
  }

  // Met à jour un entretien
  update(id: string, interview: Partial<Interview>): Observable<Interview> {
    //  return this.http.put<Interview>(`${this.API_URL}/${id}`, interview);
    return of(interview as Interview).pipe(delay(1000));
  }

  // Supprime un entretien
  delete(id: string): Observable<void> {
    //  return this.http.delete<void>(`${this.API_URL}/${id}`);
    return of(void 0).pipe(delay(500));
  }

  /**
   * Met à jour le statut d'un entretien
   */
  updateStatus(id: string, statut: string): Observable<void> {
    //  return this.http.patch<void>(`${this.API_URL}/${id}/status`, { statut });
    return of(void 0).pipe(delay(500));
  }

  // ========== FILTRAGE ==========

  /**
   * Filtre les entretiens 
   
   */
  filter(interviews: Interview[], filters: InterviewFilters): Interview[] {
    return interviews.filter(interview => 
      this.matchesDateRange(interview, filters) &&
      this.matchesInterviewer(interview, filters) &&
      this.matchesCandidat(interview, filters) &&
      this.matchesStatut(interview, filters)
    );
  }

  private matchesDateRange(interview: Interview, filters: InterviewFilters): boolean {
    if (filters.dateDebut && interview.date < filters.dateDebut) return false;
    if (filters.dateFin && interview.date > filters.dateFin) return false;
    return true;
  }

  private matchesInterviewer(interview: Interview, filters: InterviewFilters): boolean {
    return !filters.interviewer || interview.interviewer.nom === filters.interviewer;
  }

  private matchesCandidat(interview: Interview, filters: InterviewFilters): boolean {
    return !filters.candidat || 
      interview.candidat.nom.toLowerCase().includes(filters.candidat.toLowerCase());
  }

  private matchesStatut(interview: Interview, filters: InterviewFilters): boolean {
    return !filters.statut || interview.statut === filters.statut;
  }

  // ========== INTERVIEWERS ==========

  /**
   * Récupère la liste des interviewers
   */
  getInterviewers(): Observable<Interviewer[]> {
    // return this.http.get<Interviewer[]>('/api/interviewers');
    return of(this.getMockInterviewers()).pipe(delay(300));
  }

  // ========== NOTIFICATIONS ==========

  /**
   * Envoie les invitations pour un entretien
   */
  sendInvitations(interview: Interview): Observable<boolean> {
    // return this.http.post<boolean>(`${this.API_URL}/${interview.id}/invitations`, {});
    console.log(' Envoi invitations:', interview.candidat.nom);
    return of(true).pipe(delay(1000));
  }

  /**
   * Envoie une notification de modification
   */
  sendUpdateNotification(interview: Interview): Observable<boolean> {
    // return this.http.post<boolean>(`${this.API_URL}/${interview.id}/notify-update`, {});
    console.log(' Notification modification:', interview.id);
    return of(true).pipe(delay(500));
  }

  /**
   * Envoie une notification d'annulation
   */
  sendCancellationNotification(interview: Interview, raison: string): Observable<boolean> {
    //  return this.http.post<boolean>(`${this.API_URL}/${interview.id}/notify-cancel`, { raison });
    console.log(' Notification annulation:', interview.id, raison);
    return of(true).pipe(delay(500));
  }

  // ========== MOCK DATA ==========

  private getMockData(): Interview[] {
    return [
      {
        id: 'ENT-001',
        candidat: {
          nom: 'Thomas Petit',
          email: 'thomas.petit@email.com',
          poste: 'Développeur Full Stack',
          photo: 'user-04.jpg'
        },
        interviewer: {
          nom: 'Marie Dubois',
          email: 'marie.dubois@entreprise.fr',
          photo: 'user-01.jpg'
        },
        date: '2024-12-20',
        heure: '14:00',
        duree: 60,
        type: 'Visioconférence',
        statut: 'Planifié',
        lienVisio: 'https://meet.google.com/abc-defg-hij',
        scoreIA: 85,
        validationIA: true,
        notes: "Candidat très prometteur"
      },
      {
        id: 'ENT-002',
        candidat: {
          nom: 'Julie Moreau',
          email: 'julie.moreau@email.com',
          poste: 'Designer UI/UX',
          photo: 'user-05.jpg'
        },
        interviewer: {
          nom: 'Jean Martin',
          email: 'jean.martin@entreprise.fr',
          photo: 'user-02.jpg'
        },
        date: '2024-12-21',
        heure: '10:30',
        duree: 45,
        type: 'Présentiel',
        statut: 'Confirmé',
        salle: 'Salle A',
        scoreIA: 92,
        validationIA: true,
        notes: 'Portfolio excellent'
      }
    ];
  }

  private getMockInterviewers(): Interviewer[] {
    return [
      { id: 'INT-001', nom: 'Marie Dubois', email: 'marie.dubois@entreprise.fr', photo: 'user-01.jpg', specialite: 'Développement' },
      { id: 'INT-002', nom: 'Jean Martin', email: 'jean.martin@entreprise.fr', photo: 'user-02.jpg', specialite: 'Design' },
      { id: 'INT-003', nom: 'Sophie Leroy', email: 'sophie.leroy@entreprise.fr', photo: 'user-03.jpg', specialite: 'RH' }
    ];
  }
}