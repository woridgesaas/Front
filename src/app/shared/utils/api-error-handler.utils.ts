import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { API_ERROR_MESSAGES } from '../enum/api-error-messages';

interface BackendErrorPayload {
  errorCode?: string;
  message?: string;
}

export class ApiErrorHandler {
  static handle(error: HttpErrorResponse, toastr: ToastrService): void {
    const backendError = error?.error as BackendErrorPayload | null;
    const code = backendError?.errorCode ?? '';
    const mappedMessage = API_ERROR_MESSAGES[code];

    //* Sensitive error codes (never expose details)
    const sensitiveCodes = [
      'EDUCATION_ID_MISMATCH',
      'BANK_INFORMATION_ID_MISMATCH',
      'PROFESSIONAL_EXPERIENCE_ID_MISMATCH',
      'EDUCATION_DOES_NOT_BELONG_TO_USER',
      'PROFESSIONAL_EXPERIENCE_DOES_NOT_BELONG_TO_USER',
    ];

    if (sensitiveCodes.includes(code)) {
      toastr.error('Une erreur est survenue, veuillez réessayer plus tard');
      return;
    }

    switch (error.status) {
      case 400:
      case 409:
      case 422:
        toastr.warning(mappedMessage || 'Données invalides');
        break;

      case 401:
        toastr.error('Session expirée, veuillez vous reconnecter');
        break;

      case 403:
        toastr.error('Accès refusé');
        break;

      case 404:
        toastr.error(mappedMessage || 'Ressource introuvable');
        break;

      case 500:
        toastr.error(
          'Une erreur serveur est survenue, veuillez réessayer plus tard',
        );
        break;

      default:
        toastr.error('Une erreur est survenue, veuillez réessayer plus tard');
        break;
    }
  }
}
