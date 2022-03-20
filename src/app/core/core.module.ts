import { NgModule, APP_INITIALIZER, ErrorHandler } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CricketInterceptor } from './http';
import { LocalInterceptor } from './local.interceptor';
import { CricketErrorHandler } from './error.service';
import { configFactory, ConfigService } from '../services/config.service';



// services singletons here
@NgModule({
    imports: [CommonModule, HttpClientModule],
    providers: [Title,

        {
            provide: APP_INITIALIZER,
            useFactory: configFactory,
            multi: true,
            deps: [ConfigService]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LocalInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CricketInterceptor,
            multi: true,
        },
        { provide: ErrorHandler, useClass: CricketErrorHandler }]
})
export class CoreModule {

}
