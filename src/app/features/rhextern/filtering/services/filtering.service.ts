
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';
import { Candidate, CandidateStatus } from '../models/candidate.model';
import { FilterForm } from '../models/filter-form.model';

@Injectable({
  providedIn: 'root'
})
export class FiltrageService {

  private apiUrl = '/api/candidates';

  constructor(private http: HttpClient) {}

  /**
   * Filtrer les candidats
   */
  filterCandidates(filters: FilterForm): Observable<Candidate[]> {
   
    // return this.http.post<Candidate[]>(`${this.apiUrl}/filter`, filters);

    //  Mock
    const mockData = this.getMockData();
    return of(mockData).pipe(delay(2000));
  }

  /**
   * Mettre à jour le statut
   */
  updateStatus(id: number, status: CandidateStatus): Observable<any> {
   
    // return this.http.patch(`${this.apiUrl}/${id}/status`, { status });

    // Mock
    console.log(`✅ Statut ${id} → ${status}`);
    return of({ success: true }).pipe(delay(500));
  }

  /**
   * Télécharger CV
   */
  downloadCV(url: string): void {
    window.open(url, '_blank');
  }

  /**
   * DONNÉES MOCKÉES
   */
  private getMockData(): Candidate[] {
    return [
      {
        id: 1,
        candidateId: 'CAN-001',
        name: 'Youssef Benali',
        email: 'y.benali@email.com',
        phone: '+212 612-345-678',
        location: 'Casablanca',
        aiScore: 95,
        status: 'En attente',
        experienceYears: 5,
        skills: ['Angular', 'Node.js', 'TypeScript', 'MongoDB'],
        tools: ['Git', 'Docker', 'Jenkins'],
        diploma: 'Bac+5 (Master/Ingénieur)',
        certifications: ['AWS Certified'],
        languages: [
          { name: 'Français', level: 'Courant' },
          { name: 'Anglais', level: 'Avancé' }
        ],
        softSkills: ['Leadership', 'Communication'],
        cvUrl: '/assets/cv/youssef.pdf'
      },
      {
        id: 2,
        candidateId: 'CAN-002',
        name: 'Fatima El Amrani',
        email: 'f.elamrani@email.com',
        phone: '+212 698-765-432',
        location: 'Rabat',
        aiScore: 88,
        status: 'Accepté',
        experienceYears: 3,
        skills: ['React', 'UI/UX', 'Figma'],
        tools: ['Figma', 'Adobe XD'],
        diploma: 'Bac+3 (Licence)',
        certifications: ['UX Design'],
        languages: [
          { name: 'Français', level: 'Bilingue' },
          { name: 'Anglais', level: 'Intermédiaire' }
        ],
        softSkills: ['Créativité', 'Communication'],
        cvUrl: '/assets/cv/fatima.pdf'
      },
      {
        id: 3,
        candidateId: 'CAN-003',
        name: 'Mohammed Chakir',
        email: 'm.chakir@email.com',
        phone: '+212 656-789-012',
        location: 'Marrakech',
        aiScore: 92,
        status: 'Refusé',
        experienceYears: 7,
        skills: ['Python', 'Data Science', 'Machine Learning'],
        tools: ['Git', 'Docker', 'Jupyter'],
        diploma: 'Bac+5 (Master/Ingénieur)',
        certifications: ['AWS Solutions Architect'],
        languages: [
          { name: 'Français', level: 'Courant' },
          { name: 'Anglais', level: 'Courant' }
        ],
        softSkills: ['Résolution de problèmes', 'Autonomie'],
        cvUrl: '/assets/cv/mohammed.pdf'
      }
    ];
  }
}