import { Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TenantInterceptor } from './tenant.interceptor';

export const tenantInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: TenantInterceptor,
  multi: true
};
