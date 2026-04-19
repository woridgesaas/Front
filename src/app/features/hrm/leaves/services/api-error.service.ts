import { Injectable } from '@angular/core';
import { API_ERROR_MESSAGES } from '../../../../shared/enum/api-error-messages';

@Injectable({ providedIn: 'root' })
export class ApiErrorService {
  resolve(error: any): string {
    const errorCode = error?.error?.errorCode;
    if (errorCode && API_ERROR_MESSAGES[errorCode]) {
      return API_ERROR_MESSAGES[errorCode];
    }
    return 'Une erreur est survenue, veuillez réessayer';
  }
}
