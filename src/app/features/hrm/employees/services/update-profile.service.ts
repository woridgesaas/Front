import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../../../../auth/services/token.service';
import { UpdatePersonalInformationRequest } from '../models/update-personal-information.model';
import { AddBankInformationRequest } from '../models/add-bank-information.model';
import { UpdateBankInformationRequest } from '../models/update-bank-information.model';
import { AddEducationRequest } from '../models/add-education.model';
import { UpdateEducationRequest } from '../models/update-education.model';
import { AddProfessionalExperienceRequest } from '../models/add-professional-experience.model';
import { UpdateProfessionalExperienceRequest } from '../models/update-professional-experience.model';

@Injectable({ providedIn: 'root' })
export class UpdateProfileService {

  private readonly baseUrl = `${process.env['NG_APP_GATEWAY_URL']}/api/internal-users`;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
  ) {}

  canUpdateDirectly(): boolean {
    const role = this.tokenService.getRole();
    return role === 'HR' || role === 'CEO';
  }

  //* Personal information
  savePersonalInfo(userId: string, payload: UpdatePersonalInformationRequest): Observable<any> {
    if (this.canUpdateDirectly()) {
      return this.http.put(`${this.baseUrl}/user/${userId}`, payload);
    }
    return this.http.post(`${this.baseUrl}/user/submit/${userId}`, payload);
  }

  //* Bank information
  addBankInfo(userId: string, payload: AddBankInformationRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/bank-informations/${userId}`, payload);
  }

  saveBankInfo(userId: string, bankInfoId: string, payload: UpdateBankInformationRequest): Observable<any> {
    if (this.canUpdateDirectly()) {
      return this.http.put(`${this.baseUrl}/bank-informations/${userId}/${bankInfoId}`, payload);
    }
    return this.http.post(`${this.baseUrl}/bank-informations/submit/${userId}/${bankInfoId}`, payload);
  }

  //* Education
  addEducation(userId: string, payload: AddEducationRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/educations/${userId}`, payload);
  }

  saveEducation(userId: string, educationId: string, payload: UpdateEducationRequest): Observable<any> {
    if (this.canUpdateDirectly()) {
      return this.http.put(`${this.baseUrl}/educations/${userId}/${educationId}`, payload);
    }
    return this.http.post(`${this.baseUrl}/educations/submit/${userId}/${educationId}`, payload);
  }

  deleteEducation(educationId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/educations/${educationId}`);
  }

  //* Professional experience
  addExperience(userId: string, payload: AddProfessionalExperienceRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/professional-experiences/${userId}`, payload);
  }

  saveExperience(userId: string, experienceId: string, payload: UpdateProfessionalExperienceRequest): Observable<any> {
    if (this.canUpdateDirectly()) {
      return this.http.put(`${this.baseUrl}/professional-experiences/${userId}/${experienceId}`, payload);
    }
    return this.http.post(`${this.baseUrl}/professional-experiences/submit/${userId}/${experienceId}`, payload);
  }

  deleteExperience(experienceId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/professional-experiences/${experienceId}`);
  }
}
