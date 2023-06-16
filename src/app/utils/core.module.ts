import { NgModule, APP_INITIALIZER, ErrorHandler } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CricketInterceptor } from './http';
import { LocalInterceptor } from './local.interceptor';
import { CricketErrorHandler } from '../utils/error.service';
import { configFactory, ConfigService } from '../utils/config.service';



// services singletons here
@NgModule({
    imports: [HttpClientModule],
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
