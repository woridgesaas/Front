import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);

  let cin = '';

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      cin = payload?.sub || '';
    } catch (e) {
      console.error('Invalid token');
    }
  }

  const cloned = req.clone({
    setHeaders: {
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(cin && { 'X-User-CIN': cin })
    }
  });

  return next(cloned).pipe(
    catchError((error) => {
     if (error.status === 401) {

  const modal = document.querySelector('.modal.show');
  if (modal) {
    (window as any).bootstrap.Modal.getInstance(modal)?.hide();
  }

  document.body.classList.remove('modal-open');

  const backdrops = document.querySelectorAll('.modal-backdrop');
  backdrops.forEach(el => el.remove());

  localStorage.removeItem('token');
  router.navigate(['/login']);
}
      return throwError(() => error);
    })
  );
};