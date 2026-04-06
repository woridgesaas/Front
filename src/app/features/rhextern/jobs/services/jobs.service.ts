import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { JobsInfo, ValidationResult } from '../models/jobs.model';
import {
  JobOfferApiService,
  JobOfferApiDto,
  CreateJobOfferApiDto,
  UpdateJobOfferApiDto,
  PublishJobOfferApiDto
} from './job-offer-api.service';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  private readonly devUserId = '00000000-0000-0000-0000-000000000001';
  private readonly defaultJobTypeId = '11111111-1111-1111-1111-111111111111';

  constructor(private apiService: JobOfferApiService) {}

  // ─────────────────────────────────────────
  // GET ALL
  // ─────────────────────────────────────────
  getAllJobs(): Observable<JobsInfo[]> {
    return this.apiService.getAll().pipe(
      map(response => response.data.map(dto => this.mapToJobsInfo(dto)))
    );
  }

  // ─────────────────────────────────────────
  // CREATE
  // ─────────────────────────────────────────
  createJob(job: JobsInfo): Observable<JobsInfo> {
    const dto: CreateJobOfferApiDto = {
      title: job.Job_Title,
      description: job.Description || '',
      location: job.Location,
      salaryRange: job.Salary_Range || null,
      yearsExperience: this.mapExperienceToNumber(job.Experience),
      numberOfPositions: job.Number_of_Positions || 1,
      contractType: this.mapContractType(job.Roll),
      jobTypeId: this.defaultJobTypeId,
      createdByUserId: this.devUserId
    };

    return this.apiService.create(dto).pipe(
      map(response => this.mapToJobsInfo(response.data))
    );
  }

  // ─────────────────────────────────────────
  // UPDATE
  // ─────────────────────────────────────────
  updateJob(job: JobsInfo): Observable<JobsInfo> {
    const dto: UpdateJobOfferApiDto = {
      title: job.Job_Title,
      description: job.Description || '',
      location: job.Location,
      salaryRange: job.Salary_Range || null,
      yearsExperience: this.mapExperienceToNumber(job.Experience),
      numberOfPositions: job.Number_of_Positions || 1,
      contractType: this.mapContractType(job.Roll),
      jobTypeId: this.defaultJobTypeId,
      updatedByUserId: this.devUserId
    };

    return this.apiService.update(job.Job_ID, dto).pipe(
      map(response => this.mapToJobsInfo(response.data))
    );
  }

  // ─────────────────────────────────────────
  // DELETE
  // ─────────────────────────────────────────
  deleteJob(jobId: string): Observable<boolean> {
    return this.apiService.delete(jobId).pipe(
      map(() => true)
    );
  }

  // ─────────────────────────────────────────
  // PUBLISH
  // ─────────────────────────────────────────
  publishJob(
    jobId: string,
    canalNames: string[],
    notifyHr: boolean,
    isFeatured: boolean
  ): Observable<any> {
    const dto: PublishJobOfferApiDto = {
      canalNames,
      notifyHrTeam: notifyHr,
      isFeatured,
      publishedByUserId: this.devUserId
    };
    return this.apiService.publish(jobId, dto);
  }

  // ─────────────────────────────────────────
  // MAPPER : API DTO → JobsInfo
  // ─────────────────────────────────────────
  private mapToJobsInfo(dto: JobOfferApiDto): JobsInfo {
    return {
      Job_ID: dto.id,
      Job_Title: dto.title,
      Category: dto.jobTypeName || '',
      Location: dto.location,
      Salary_Range: dto.salaryRange || '',
      Posted_Date: new Date(dto.createdAt).toLocaleDateString('fr-FR'),
      Roll: dto.contractType,
      Image: 'briefcase.svg',
      Experience: this.mapNumberToExperience(dto.yearsExperience),
      Description: dto.description || '',
      Number_of_Positions: dto.numberOfPositions,
      isSelected: false,
      sNo: 0
    };
  }

  // ─────────────────────────────────────────
  // HELPERS
  // ─────────────────────────────────────────
  private mapExperienceToNumber(experience: string): number {
    const map: Record<string, number> = {
      '0-1': 0, '1-3': 1, '3-5': 3, '5-10': 5, '10+': 10
    };
    return map[experience] ?? 0;
  }

  private mapContractType(roll: string): number {
    const map: Record<string, number> = {
      'CDI': 0, 'CDD': 1, 'Stage': 2, 'Freelance': 3, 'Alternance': 4
    };
    return map[roll] ?? 0;
  }

  generateId(): string {
    return 'JOB-' + Date.now();
  }

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
      Description: '',
      Number_of_Positions: 1,
      isSelected: false,
      sNo: 0
    };
  }

  cloneJob(job: JobsInfo): JobsInfo {
    return { ...job, Description: job.Description || '' };
  }

  validateJob(job: JobsInfo): ValidationResult {
    const errors: string[] = [];
    if (!job.Job_Title?.trim())
      errors.push('Le titre du poste est obligatoire');
    if (!job.Category?.trim())
      errors.push('La catégorie est obligatoire');
    if (!job.Roll?.trim())
      errors.push('Le type de contrat est obligatoire');
    if (!job.Location?.trim())
      errors.push('La localisation est obligatoire');
    return { isValid: errors.length === 0, errors };
  }

  private mapNumberToExperience(years: number): string {
    if (years === 0) return '0-1';
    if (years === 1) return '1-3';
    if (years === 3) return '3-5';
    if (years === 5) return '5-10';
    if (years >= 10) return '10+';
    return '0-1';
}
}