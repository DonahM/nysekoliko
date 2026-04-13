import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, UrlSerializer } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { userInterceptorProvider } from './interceptors/user.interceptor.provider';
import { tenantInterceptorProvider } from './shared/interceptors/tenant.interceptor.provider';
import { CustomUrlSerializer } from './shared/utils/custom-url-serializer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    userInterceptorProvider,
    tenantInterceptorProvider,
    { provide: UrlSerializer, useClass: CustomUrlSerializer }
  ]
};
