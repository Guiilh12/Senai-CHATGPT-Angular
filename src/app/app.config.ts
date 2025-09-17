import { ApplicationConfig, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Router } from '@angular/router';

import { routes } from './app.routes';
import { HttpErrorResponse, HttpInterceptor, HttpInterceptorFn, provideHttpClient, withInterceptors } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) =>{

  const router = inject (Router);//direciona paras telas

  return next (req).pipe(
catchError ((err: HttpErrorResponse) => {
if( err.status == 401) {
  //token expirou
  localStorage.clear(); //limpa todos os dados do localstorage.
  router.navigate([`/login`]); //redireciona para login.
}

return throwError(() => err);
})
  );
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor]))]  // chama as rotastas

  
};
