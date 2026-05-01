import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../../../../../shared/models/api-response.models';
import {
  ConfigureRecruitmentSiteRequest,
  GetRecruitmentSiteResponse,
} from '../models/recruitment-settings.models';

@Injectable({ providedIn: 'root' })
export class RecruitmentSettingsService {
  private readonly BASE_URL = `${process.env['NG_APP_GATEWAY_URL']}/api/settings`;

  constructor(private http: HttpClient) {}

  configureRecruitmentSite(payload: ConfigureRecruitmentSiteRequest, logo: File | null): Observable<void> {
    const formData = new FormData();
    formData.append('primaryColor', payload.primaryColor);
    formData.append('secondaryColor', payload.secondaryColor);
    formData.append('description', payload.description);
    formData.append('foundedYear', payload.foundedYear);
    formData.append('email', payload.email);
    formData.append('phone', payload.phone);
    formData.append('address', payload.address);
    formData.append('linkedinUrl', payload.linkedinUrl);
    if (logo) {
      formData.append('logo', logo);
    }
    return this.http.put<void>(`${this.BASE_URL}/recruitment-sites`, formData);
  }

  getRecruitmentSite(): Observable<GetRecruitmentSiteResponse> {
    return this.http
      .get<ApiResponse<GetRecruitmentSiteResponse>>(`${this.BASE_URL}/recruitment-sites`)
      .pipe(map((response) => response.data));
  }

  getLogoUrl(): string {
    return `${this.BASE_URL}/recruitment-sites/logo`;
  }
}