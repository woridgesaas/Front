import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from '../../../../shared/data/data.service';
import { JobsInfo, ValidationResult } from '../models/jobs.model';

/**
 * Service pour gérer les offres d'emploi
 * 
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
      map(response => response.data)
    );
  }

  /**
   * Crée une nouvelle offre
   */
  createJob(job: JobsInfo): Observable<JobsInfo> {
   
    // return this.http.post<JobsInfo>('/api/jobs', job);
    
    //simuler data
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
    
    console.log('Modification de l\'offre:', job);
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
    
    console.log(' Suppression de l\'offre:', jobId);
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
    
    console.log(' Publication de l\'offre:', jobId, 'sur', platforms);
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
    return 'JOB-' + Date.now();
  }

  /**
   * Crée une offre vide
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
      isSelected: false,
    };
  }

  /**
   * Valide une offre
   */
  validateJob(job: JobsInfo): ValidationResult {
    const errors: string[] = [];

    if (!job.Job_Title || job.Job_Title.trim() === '') {
      errors.push('Le titre du poste est obligatoire');
    } else if (job.Job_Title.length < 5) {
      errors.push('Le titre doit contenir au moins 5 caractères');
    }

    if (!job.Category || job.Category.trim() === '') {
      errors.push('La catégorie est obligatoire');
    }

    if (!job.Location || job.Location.trim() === '') {
      errors.push('La localisation est obligatoire');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}