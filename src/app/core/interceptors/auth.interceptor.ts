import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);

  const cloned = req.clone({
    setHeaders: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  return next(cloned).pipe(
    catchError((error) => {
      if (error.status === 401) {
        //  vérifie le type d'erreur
        const isAuthError =
          error.error?.message === 'Token expired' ||
          error.error?.message === 'Authorization header missing' ||
          error.error?.message === 'Invalid token format' ||
          error.error?.Message === 'Current password is incorrect';

        if (isAuthError) {
          //
          const modal = document.querySelector('.modal.show');
          if (modal) {
            (window as any).bootstrap.Modal.getInstance(modal)?.hide();
          }
          document.body.classList.remove('modal-open');
          const backdrops = document.querySelectorAll('.modal-backdrop');
          backdrops.forEach((el) => el.remove());

          // Supprime le token et redirige
          localStorage.removeItem('token');
          router.navigate(['/login']);
        }
      }
      return throwError(() => error);
    }),
  );
};
