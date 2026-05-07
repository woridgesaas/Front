import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, tap } from 'rxjs';
import { TokenService } from '../../../auth/services/token.service';
import { CurrentUserProfileResponse } from '../models/current-user-profile.model';
import { ApiResponse } from '../../../shared/models/api-response.models';

@Injectable({ providedIn: 'root' })
export class CurrentUserService {
  private readonly baseUrl = `${process.env['NG_APP_GATEWAY_URL']}/api/internal-users`;
  private cachedProfile: CurrentUserProfileResponse | null = null;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
  ) {}

  getProfile(): Observable<CurrentUserProfileResponse | null> {
    if (this.cachedProfile) {
      return of(this.cachedProfile);
    }

    const CIN = this.tokenService.getCIN();
    if (!CIN) return of(null);

    return this.http
      .get<ApiResponse<CurrentUserProfileResponse>>(`${this.baseUrl}/user/profile/${CIN}`)
      .pipe(
        map((response) => response.data),
        tap((profile) => (this.cachedProfile = profile)),
      );
  }

  clearCache(): void {
    this.cachedProfile = null;
  }
}
