import { NgModule, APP_INITIALIZER } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CricketInterceptor } from './http';
import { ConfigService } from './services';
import {

} from './services';
import { LocalInterceptor } from './local.interceptor';
import { CricketErrorHandler } from './error.service';



// services singletons here
@NgModule({
    imports: [CommonModule, HttpClientModule],
    providers: [Title,

        {
            provide: APP_INITIALIZER,
            useFactory: ConfigService.configFactory,
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
