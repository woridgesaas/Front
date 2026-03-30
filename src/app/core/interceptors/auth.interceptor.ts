import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next(cloned).pipe(
      catchError((error) => {
        if (error.status === 401) {
          // ✅ Redirige vers login SEULEMENT si c'est 
          // une erreur d'authentification globale
          // pas une erreur d'API métier
          const isAuthError = error.error?.message === 'Token expired' ||
                              error.error?.message === 'Authorization header missing' ||
                              error.error?.message === 'Invalid token format';

          if (isAuthError) {
            localStorage.removeItem('token');
            router.navigate(['/login']);
          }
        }
        return throwError(() => error);
      })
    );
  }
  return next(req);
};