import { ErrorHandler, APP_INITIALIZER } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { CricketErrorHandler } from './error.service';
import { configFactory, ConfigService } from '../services/config.service';
import { LocalInterceptorFn } from './local.fn';
import { CricketInterceptorFn } from './http.fn';

// if standalone providers use this instead of core.module.ts

export const CoreProviders = [
   provideHttpClient(
      // do this, to keep using your class-based interceptors.
      withInterceptors([
         LocalInterceptorFn,
         CricketInterceptorFn
      ])
   ),
   Title,
   {
      provide: APP_INITIALIZER,
      useFactory: configFactory,
      multi: true,
      deps: [ConfigService]
   },
   { provide: ErrorHandler, useClass: CricketErrorHandler }
];
