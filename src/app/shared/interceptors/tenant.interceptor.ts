import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TenantInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Check if the request is going to our internal API
    if (request.url.includes('/api/')) {
      const userStr = localStorage.getItem('userData');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          if (user && user.idUser) {
            // Clone the request and add the custom header
            const modifiedReq = request.clone({
              headers: request.headers.set('x-user-id', user.idUser.toString())
            });
            return next.handle(modifiedReq);
          }
        } catch (e) {
          // Ignore parsing errors
          console.error('Error parsing user data in TenantInterceptor', e);
        }
      }
    }
    
    // Pass the request unchanged if no token/userId is found or not an API call
    return next.handle(request);
  }
}
