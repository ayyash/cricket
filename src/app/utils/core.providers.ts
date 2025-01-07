import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ErrorHandler, provideAppInitializer } from '@angular/core';
import { configFactory } from './config.service';
import { CricketErrorHandler } from './error.service';
import { CricketInterceptorFn } from './http.fn';
import { LocalInterceptorFn } from './local.fn';

// if standalone providers use this instead of core.module.ts

export const CoreProviders = [
  provideHttpClient(
    // do this, to keep using your class-based interceptors.
    withInterceptors([
      LocalInterceptorFn,
      CricketInterceptorFn
    ])
  ),
  provideAppInitializer(configFactory),
  { provide: ErrorHandler, useClass: CricketErrorHandler }
];
