import { Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserInterceptor } from './user.interceptor';

export const userInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: UserInterceptor,
  multi: true
};
