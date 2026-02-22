import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {  withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptor } from '../app/core/interceptors/auth.interceptor';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideNgxMask } from 'ngx-mask';
import { provideToastr } from 'ngx-toastr';

registerLocaleData(localeFr);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    BsDatepickerModule.forRoot().providers!,
    provideAnimations(),
provideHttpClient(
  withInterceptors([authInterceptor])
),
    provideNgxMask(),
    provideToastr({
  positionClass: 'toast-top-right',
  timeOut: 3000,
  closeButton: true,
  progressBar: true,
  preventDuplicates: true
}),
    { provide: LOCALE_ID, useValue: 'fr-FR' },
  ],
};
