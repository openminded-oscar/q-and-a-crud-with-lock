import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class RateLimitInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const sameDomain = req.url.startsWith(window.location.origin);  // Check if the request is for the same domain

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (sameDomain && error.status === 429) {
          alert('Too many requests! Please try again later.');
        }
        return throwError(() => new Error(`Error ${JSON.stringify(error)}! Please try again later`));
      })
    );
  }
}
