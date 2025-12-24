import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideNgxMask } from 'ngx-mask';

registerLocaleData(localeFr);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    BsDatepickerModule.forRoot().providers!,
    provideAnimations(),
    provideHttpClient(),
    provideNgxMask(),

    { provide: LOCALE_ID, useValue: 'fr-FR' }
  ],
};
