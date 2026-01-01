import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from '../../../../shared/data/data.service';
import { JobsInfo, ValidationResult } from '../models/jobs.model';

/**
 * Service pour gérer les offres d'emploi
 */
@Injectable({
  providedIn: 'root'
})
export class JobsService {
  
  constructor(private dataService: DataService) {}
 
  // APPELS API
  
  /**
   * Récupère toutes les offres
   */
  getAllJobs(): Observable<JobsInfo[]> {
    return this.dataService.getJobList().pipe(
      map(response => response.data),
      // Migration automatique : ajoute Description si manquant
      map(jobs => jobs.map(job => this.ensureJobHasDescription(job)))
    );
  }

  /**
   * Crée une nouvelle offre
   */
  createJob(job: JobsInfo): Observable<JobsInfo> {
    // return this.http.post<JobsInfo>('/api/jobs', job);
    
    console.log('✅ Création de l\'offre:', job);
    return new Observable(observer => {
      observer.next(job);
      observer.complete();
    });
  }

  /**
   * Modifie une offre existante
   */
  updateJob(job: JobsInfo): Observable<JobsInfo> {
    // return this.http.put<JobsInfo>(`/api/jobs/${job.Job_ID}`, job);
    
    console.log('✏️ Modification de l\'offre:', job);
    return new Observable(observer => {
      observer.next(job);
      observer.complete();
    });
  }

  /**
   * Supprime une offre
   */
  deleteJob(jobId: string): Observable<boolean> {
    // return this.http.delete<boolean>(`/api/jobs/${jobId}`);
    
    console.log('🗑️ Suppression de l\'offre:', jobId);
    return new Observable(observer => {
      observer.next(true);
      observer.complete();
    });
  }

  /**
   * Publie une offre sur des plateformes
   */
  publishJob(jobId: string, platforms: string[]): Observable<boolean> {
    // return this.http.post<boolean>(`/api/jobs/${jobId}/publish`, { platforms });
    
    console.log('📢 Publication de l\'offre:', jobId, 'sur', platforms);
    return new Observable(observer => {
      observer.next(true);
      observer.complete();
    });
  }
 
  // FONCTIONS UTILES
 
  /**
   * Génère un ID unique
   */
  generateId(): string {
    return 'JOB-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Crée une offre vide avec tous les champs initialisés
   */
  createEmptyJob(): JobsInfo {
    return {
      Job_ID: '',
      Job_Title: '',
      Category: '',
      Location: '',
      Salary_Range: '',
      Posted_Date: new Date().toLocaleDateString('fr-FR'),
      Roll: '',
      Image: 'briefcase.svg',
      Experience: '',
      Description: '',           // ← AJOUTÉ pour CKEditor
      Number_of_Positions: 1,    // ← AJOUTÉ (optionnel)
      isSelected: false,
      sNo: 0
    };
  }

  /**
   * S'assure qu'un job a le champ Description
   * Utile pour la migration des données existantes
   */
  private ensureJobHasDescription(job: any): JobsInfo {
    return {
      ...job,
      Description: job.Description || '',
      Number_of_Positions: job.Number_of_Positions || 1
    };
  }

  /**
   * Clone un job (utile pour l'édition)
   */
  cloneJob(job: JobsInfo): JobsInfo {
    return {
      ...job,
      Description: job.Description || '',
      Number_of_Positions: job.Number_of_Positions || 1
    };
  }

  /**
   * Valide une offre avec tous les champs obligatoires
   */
  validateJob(job: JobsInfo): ValidationResult {
    const errors: string[] = [];

    // Titre du poste
    if (!job.Job_Title || job.Job_Title.trim() === '') {
      errors.push('Le titre du poste est obligatoire');
    } else if (job.Job_Title.length < 5) {
      errors.push('Le titre doit contenir au moins 5 caractères');
    }

    // Catégorie
    if (!job.Category || job.Category.trim() === '') {
      errors.push('La catégorie est obligatoire');
    }

    // Type de contrat
    if (!job.Roll || job.Roll.trim() === '') {
      errors.push('Le type de contrat est obligatoire');
    }

    // Localisation
    if (!job.Location || job.Location.trim() === '') {
      errors.push('La localisation est obligatoire');
    }

    // Description (optionnelle mais recommandée)
    if (job.Description && job.Description.length > 0 && job.Description.length < 20) {
      errors.push('La description doit contenir au moins 20 caractères si elle est renseignée');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Formate une date au format français
   */
  formatDate(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('fr-FR');
  }

  /**
   * Nettoie le HTML de la description CKEditor pour l'affichage
   */
  stripHtmlTags(html: string): string {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }

  /**
   * Tronque la description pour l'affichage dans la liste
   */
  getTruncatedDescription(description: string, maxLength: number = 150): string {
    const plainText = this.stripHtmlTags(description);
    if (plainText.length <= maxLength) {
      return plainText;
    }
    return plainText.substring(0, maxLength) + '...';
  }
}