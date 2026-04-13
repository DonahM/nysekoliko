import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UserInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let newRequest = request;
    const userDataStr = localStorage.getItem('userData');
    
    if (userDataStr) {
      try {
        const userData = JSON.parse(userDataStr);
        if (userData && userData.idUser) {
          newRequest = request.clone({
            headers: request.headers.set('X-User-Id', userData.idUser.toString())
          });
        }
      } catch (e) {
        console.error('Failed to parse userData for interceptor');
      }
    }
    
    return next.handle(newRequest);
  }
}
